/**
 * Mock Resume Parser Service
 * Simulates OCR and NLP extraction from a file object.
 */
export const resumeParser = {
  parseFile(file) {
    return new Promise((resolve) => {
      // Simulate network/processing delay
      setTimeout(() => {
        const mockExtractedData = {
          basics: {
            name: file.name.split('.')[0] || 'Extracted Name',
            email: 'parsed.user@example.com',
            phone: '+1 (555) 000-0000',
            location: 'San Francisco, CA',
            summary: 'Experienced professional with a strong background in software engineering and product development.'
          },
          experience: [
            {
              id: crypto.randomUUID(),
              company: 'Tech Solutions Inc.',
              position: 'Senior Software Engineer',
              startDate: '2020-01',
              endDate: 'Present',
              description: 'Led a team of 5 developers to build a modern SaaS platform.'
            },
            {
              id: crypto.randomUUID(),
              company: 'Global Systems',
              position: 'Software Developer',
              startDate: '2017-06',
              endDate: '2019-12',
              description: 'Developed and maintained core API services using Node.js.'
            }
          ],
          education: [
            {
              id: crypto.randomUUID(),
              institution: 'University of Technology',
              degree: 'Bachelor of Science in Computer Science',
              startDate: '2013-09',
              endDate: '2017-05'
            }
          ],
          skills: ['React', 'JavaScript', 'Node.js', 'TypeScript', 'TailwindCSS', 'AWS'],
          projects: []
        };
        
        resolve(mockExtractedData);
      }, 1500);
    });
  }
};
