import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Use local worker from node_modules for reliability
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

/**
 * Enhanced Resume Parser Service
 * Performs real text extraction from PDF/DOCX and uses patterns to detect fields.
 */
export const resumeParser = {
  async parseFile(file) {
    let text = '';
    const fileType = file.name.split('.').pop().toLowerCase();

    try {
      console.log(`[ResumeParser] Starting parse for file: ${file.name} (${fileType})`);
      
      if (fileType === 'pdf') {
        text = await this.extractTextFromPDF(file);
      } else if (fileType === 'docx' || fileType === 'doc') {
        text = await this.extractTextFromDOCX(file);
      } else {
        text = await this.readAsText(file);
      }

      console.log(`[ResumeParser] Raw text extracted (${text.length} chars)`);
      const result = this.analyzeText(text, file.name);
      console.log(`[ResumeParser] Final parsed result:`, result);
      
      return result;
    } catch (error) {
      console.error('Error parsing file:', error);
      // Fallback to basic extraction if full parsing fails
      return this.getFallbackData(file.name);
    }
  },

  async extractTextFromPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      
      // Sort items by Y descending (top to bottom) then X (left to right)
      const items = content.items.sort((a, b) => {
        if (Math.abs(b.transform[5] - a.transform[5]) > 5) {
          return b.transform[5] - a.transform[5];
        }
        return a.transform[4] - b.transform[4];
      });

      let pageText = '';
      let lastY = -1;
      
      for (const item of items) {
        if (lastY !== -1 && Math.abs(item.transform[5] - lastY) > 5) {
          pageText += '\n';
        } else if (lastY !== -1) {
          pageText += ' ';
        }
        pageText += item.str;
        lastY = item.transform[5];
      }
      
      fullText += pageText + '\n';
    }
    return fullText;
  },

  async extractTextFromDOCX(file) {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  },

  readAsText(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsText(file);
    });
  },

  analyzeText(text, fileName) {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const fullText = text.toLowerCase();

    // 1. Basic Info Extraction
    const email = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)?.[0] || '';
    const phone = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{4}/g)?.[0] || '';
    const linkedin = text.match(/linkedin\.com\/in\/[a-zA-Z0-9-]+/gi)?.[0] || '';
    
    // Name heuristic: First line often name, second often title
    const name = lines[0]?.length < 40 ? lines[0] : fileName.split('.')[0];
    const title = lines[1]?.length < 60 && !lines[1].includes('@') ? lines[1] : '';
    
    // Location heuristic
    const locationPattern = /([A-Z][a-z]+(?:,\s*[A-Z][a-z]+)+)/g;
    const locationMatches = text.match(locationPattern);
    const location = locationMatches ? locationMatches[0] : '';

    // 2. Section Chunking (Robust Detection)
    const headerDefs = [
      { id: 'summary', regex: /^(?:(?:professional\s+)?summary|profile|objective)$/i },
      { id: 'experience', regex: /^(?:(?:professional\s+)?experience|employment|work history)$/i },
      { id: 'skills', regex: /^(?:(?:top\s+)?skills|expertise|technical\s+skills|technical\s+expertise|technical\s+background)$/i },
      { id: 'projects', regex: /^(?:(?:featured\s+)?projects|portfolio)$/i },
      { id: 'education', regex: /^(?:(?:academic\s+)?education|academic)$/i }
    ];

    const chunks = {};
    let currentChunkId = 'header';
    chunks[currentChunkId] = [];

    lines.forEach(line => {
      // A line is likely a header IF it's short, has 1-3 words, AND matches a header regex
      const isShort = line.length < 35;
      const wordCount = line.split(/\s+/).length;
      let foundHeaderId = null;
      
      if (isShort && wordCount <= 3) {
        for (const h of headerDefs) {
          if (h.regex.test(line)) {
            foundHeaderId = h.id;
            break;
          }
        }
      }

      if (foundHeaderId) {
        currentChunkId = foundHeaderId;
        chunks[currentChunkId] = chunks[currentChunkId] || [];
      } else {
        chunks[currentChunkId].push(line);
      }
    });

    console.log(`[ResumeParser] Section chunks identified:`, Object.keys(chunks));
    console.log(`[ResumeParser] Chunk contents:`, chunks);

    // 3. Process Chunks
    
    // Summary
    const summary = chunks.summary?.join('\n') || '';

    // Experience
    const formattedExperience = [];
    if (chunks.experience) {
      let currentItem = null;
      // Common location patterns to ignore for company/role
      const locationFilter = /lahore|pakistan|faisalabad|punjab/i;

      chunks.experience.forEach(line => {
        const datePattern = /(\d{1,2}\/\d{4})\s*[\-–—\s]+\s*(Present|\d{1,2}\/\d{4})/i;
        const dateMatch = line.match(datePattern);
        
        if (dateMatch) {
          if (currentItem) formattedExperience.push(currentItem);
          const remainingText = line.replace(dateMatch[0], '').replace(/[|–—\-\s,]+/g, ' ').trim();
          currentItem = {
            id: crypto.randomUUID(),
            company: remainingText || '', 
            position: '', 
            startDate: dateMatch[1],
            endDate: dateMatch[2],
            description: ''
          };
        } else if (currentItem) {
          const isBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('*');
          
          // Clean location text from line instead of skipping
          let cleanedLine = line.replace(/lahore|pakistan|faisalabad|punjab/gi, '').replace(/,\s*,/g, ',').trim();
          if (cleanedLine.startsWith(',')) cleanedLine = cleanedLine.substring(1).trim();
          if (cleanedLine.endsWith(',')) cleanedLine = cleanedLine.slice(0, -1).trim();

          if (isBullet) {
            currentItem.description += (currentItem.description ? '\n' : '') + line;
          } else if (cleanedLine.length > 3) {
            if (!currentItem.company) {
              currentItem.company = cleanedLine;
            } else if (!currentItem.position) {
              currentItem.position = cleanedLine;
            } else {
              // Continuation of bullet or description
              currentItem.description += (currentItem.description ? '\n' : '') + line;
            }
          }
        }
      });
      if (currentItem) formattedExperience.push(currentItem);
    }

    // Skills
    let detectedSkills = [];
    if (chunks.skills) {
      chunks.skills.forEach(line => {
        // Split by bullets, commas, or multiple spaces
        const parts = line.split(/[•,;|\t]|\s{2,}/).map(p => p.trim()).filter(p => p.length > 1);
        detectedSkills.push(...parts);
      });
      // Fallback for space-delimited dense skills
      if (detectedSkills.length < 5 && chunks.skills.length > 0) {
         const allSkillsText = chunks.skills.join(' ');
         const techKeywords = [
           'react', 'javascript', 'node', 'typescript', 'python', 'java', 'sql', 'angular', 'nestjs', 'nest.js', 'mongodb', 
           'docker', 'aws', 'agile', 'figma', 'git', 'microfrontend', 'electron.js', 'redux', 'material ui', 'bootstrap',
           'prisma', 'mern', 'mean', 'nest.js', 'rest apis', 'mysql', 'postgresql', 'sqlite', 'mqtt'
         ];
         techKeywords.forEach(k => {
           const escapedK = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
           if (new RegExp(`\\b${escapedK}\\b`, 'i').test(allSkillsText)) {
             detectedSkills.push(k);
           }
         });
      }
    }
    detectedSkills = [...new Set(detectedSkills)];

    // Projects
    const formattedProjects = [];
    if (chunks.projects) {
       let currentProj = null;
       chunks.projects.forEach(line => {
         const dateMatch = line.match(/(\d{1,2}\/\d{4})/);
         if (dateMatch && line.length < 120) {
            if (currentProj) formattedProjects.push(currentProj);
            // Title is usually the part after the date
            let title = line.replace(/(\d{1,2}\/\d{4})\s*[\-–—\s]+\s*(Present|\d{1,2}\/\d{4})/i, '').trim();
            if (title.startsWith('–') || title.startsWith('-') || title.startsWith('—')) {
              title = title.substring(1).trim();
            }
            currentProj = { id: crypto.randomUUID(), title: title || 'Project', content: '' };
         } else if (currentProj) {
            currentProj.content += (currentProj.content ? '\n' : '') + line;
         }
       });
       if (currentProj) formattedProjects.push(currentProj);
    }

    // Education
    const formattedEducation = [];
    if (chunks.education) {
       let currentEdu = null;
       chunks.education.forEach(line => {
         const datePattern = /(\d{1,2}\/\d{4})\s*[\-–—\s]+\s*(\d{1,2}\/\d{4})/;
         const dateMatch = line.match(datePattern);
         
         if (dateMatch) {
            if (currentEdu) formattedEducation.push(currentEdu);
            const degreeText = line.replace(dateMatch[0], '').replace(/[|–—\-\s,]+/g, ' ').trim();
            currentEdu = { 
              id: crypto.randomUUID(), 
              institution: '', 
              degree: degreeText || '', 
              startDate: dateMatch[1], 
              endDate: dateMatch[2]
            };
         } else if (currentEdu) {
            if (!currentEdu.institution || currentEdu.institution === 'Institution') {
               currentEdu.institution = line;
            } else {
               currentEdu.degree += (currentEdu.degree ? ', ' : '') + line;
            }
         }
       });
       if (currentEdu) formattedEducation.push(currentEdu);
    }

    return {
      basics: {
        name,
        title,
        email,
        phone,
        location,
        summary: summary || chunks.header?.slice(3).join(' ') || '' // Smarter summary fallback
      },
      experience: formattedExperience,
      education: formattedEducation,
      skills: detectedSkills,
      sections: [
        { id: 'basics', title: 'Personal Info', type: 'basics', items: [] },
        { id: 'experience', title: 'Experience', type: 'list', items: formattedExperience },
        { id: 'education', title: 'Education', type: 'list', items: formattedEducation },
        { id: 'skills', title: 'Skills', type: 'tags', items: detectedSkills },
        ...(formattedProjects.length > 0 ? [{ id: 'projects', title: 'Projects', type: 'list', items: formattedProjects }] : [])
      ]
    };
  },

  getFallbackData(fileName) {
    return {
      basics: {
        name: fileName.split('.')[0],
        email: 'user@example.com',
        phone: '',
        location: '',
        summary: 'Resume uploaded but detailed parsing failed due to file format complexity.'
      },
      experience: [],
      education: [],
      skills: [],
      projects: []
    };
  }
};
