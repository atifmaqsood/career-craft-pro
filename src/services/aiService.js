/**
 * Enhanced Mock AI Assistant Service
 * Simulates content generation for summaries, bullet points, keywords, 
 * keyword optimization, section suggestions, and cover letter generation.
 */
export const aiService = {
  generateSummary(profile) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Highly motivated ${profile.role || 'professional'} with expertise in ${profile.skills?.slice(0, 3).join(', ') || 'multiple domains'}. Proven track record of delivering high-quality results and driving business growth through technical innovation and strategic execution.`);
      }, 1000);
    });
  },

  improveBulletPoint(bullet) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Strategically ${bullet.toLowerCase().startsWith('managed') ? 'optimized' : 'spearheaded'} the ${bullet}, resulting in a 25% increase in operational efficiency and significant cost savings.`);
      }, 800);
    });
  },

  suggestKeywords(experience) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const keywords = ['Agile Methodology', 'Team Leadership', 'Strategic Planning', 'Problem Solving', 'Data Analysis', 'Project Management', 'Cross-functional Collaboration'];
        resolve(keywords);
      }, 1200);
    });
  },

  optimizeKeywords(text) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const weakPhrases = ['helped with', 'responsible for', 'worked on', 'handled'];
        const actionVerbs = ['orchestrated', 'spearheaded', 'pioneered', 'implemented'];
        
        let optimized = text;
        const suggestions = [];
        
        weakPhrases.forEach((phrase, i) => {
          if (text.toLowerCase().includes(phrase)) {
            suggestions.push({ original: phrase, suggested: actionVerbs[i] });
          }
        });
        
        resolve({ optimized, suggestions });
      }, 1000);
    });
  },

  suggestSections(skills, experience) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allSuggestions = [
          { id: 'projects', title: 'Featured Projects', description: 'Showcase your best work samples.' },
          { id: 'certificates', title: 'Certifications', description: 'Highlight relevant industry certificates.' },
          { id: 'languages', title: 'Languages', description: 'List languages you are proficient in.' },
          { id: 'volunteering', title: 'Volunteering', description: 'Show your social contributions.' }
        ];
        resolve(allSuggestions.slice(0, 2)); // Return top 2 suggestions
      }, 900);
    });
  },

  generateCoverLetter(resumeData, jobDescription) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const letter = `Dear Hiring Manager,

I am writing to express my strong interest in the role mentioned in your recent job description. Based on my background as a ${resumeData.sections.find(s => s.id === 'experience')?.items[0]?.position || 'professional'}, I am confident that I can add significant value to your team.

My technical skills in ${resumeData.sections.find(s => s.id === 'skills')?.items.slice(0, 4).join(', ')} align perfectly with your requirements. In my previous role at ${resumeData.sections.find(s => s.id === 'experience')?.items[0]?.company || 'my last company'}, I successfully delivered projects that mirror the challenges your team is currently tackling.

Thank you for your time and consideration.

Best regards,
${resumeData.basics.name}`;
        
        resolve(letter);
      }, 1500);
    });
  }
};
