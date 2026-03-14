/**
 * Mock AI Assistant Service
 * Simulates content generation for summaries, bullet points, and keywords.
 */
export const aiService = {
  generateSummary(profile) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Highly motivated ${profile.role || 'professional'} with expertise in ${profile.skills?.slice(0, 3).join(', ') || 'multiple domains'}. Proven track record of delivering high-quality results and driving business growth.`);
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
        const keywords = ['Agile Methodology', 'Team Leadership', 'Strategic Planning', 'Problem Solving', 'Data Analysis'];
        resolve(keywords);
      }, 1200);
    });
  }
};
