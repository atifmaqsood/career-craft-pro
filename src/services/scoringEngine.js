/**
 * Enhanced ATS Scoring Engine
 * Analyzes resume content for structure, keyword density, completeness, and length.
 * Provides detailed suggestions and job matching.
 */
export const scoringEngine = {
  calculateScore(resumeData) {
    const { basics, experience, education, sections } = resumeData;
    const skills = sections.find(s => s.id === 'skills')?.items || [];
    
    // 1. Structure (25%)
    let structureScore = 0;
    if (basics.name) structureScore += 5;
    if (basics.email) structureScore += 5;
    if (basics.phone) structureScore += 5;
    if (basics.summary) structureScore += 10;
    
    // 2. Keyword Density (25%)
    const keywordScore = Math.min(25, (skills.length) * 2.5);
    
    // 3. Completeness (25%)
    let completenessScore = 0;
    if (experience?.length > 0) completenessScore += 10;
    if (education?.length > 0) completenessScore += 10;
    if (sections.length > 4) completenessScore += 5;
    
    // 4. Length (25%)
    const totalWords = (basics.summary?.split(' ').length || 0) + 
                      (experience?.reduce((acc, exp) => acc + (exp.description?.split(' ').length || 0), 0) || 0);
    
    let lengthScore = 0;
    if (totalWords > 200 && totalWords < 1000) lengthScore = 25;
    else if (totalWords > 50) lengthScore = 15;
    else lengthScore = 5;
    
    const total = structureScore + keywordScore + completenessScore + lengthScore;
    
    return {
      total,
      breakdown: [
        { name: 'Structure', score: structureScore, max: 25 },
        { name: 'Keywords', score: keywordScore, max: 25 },
        { name: 'Completeness', score: completenessScore, max: 25 },
        { name: 'Length', score: lengthScore, max: 25 }
      ],
      suggestions: this.getSuggestions(resumeData, { structureScore, keywordScore, completenessScore, lengthScore, totalWords })
    };
  },

  getSuggestions(data, scores) {
    const suggestions = [];
    
    if (scores.structureScore < 25) {
      if (!data.basics.summary) suggestions.push('Add a professional summary to help recruiter ATS scanning.');
      if (!data.basics.phone) suggestions.push('Missing phone number - recruiters often prefer direct contact.');
    }
    
    if (scores.keywordScore < 20) {
      suggestions.push('Low keyword density. Add technical skills like "API Design", "Cloud Architecture" or industry specific terms.');
    }
    
    if (scores.completenessScore < 25) {
      if (data.experience?.length < 2) suggestions.push('Resume feels thin. Add more professional experience if available.');
    }
    
    if (scores.totalWords < 200) {
      suggestions.push('Resume too short. Aim for at least 300 words for better searchability.');
    } else if (scores.totalWords > 1000) {
      suggestions.push('Resume might be too long. Keep it concise (1-2 pages).');
    }
    
    return suggestions;
  },

  calculateMatch(resumeSkills, jobDescription) {
    if (!jobDescription) return { score: 0, missingKeywords: [] };
    
    const jdKeywords = this.extractKeywords(jobDescription);
    const matched = jdKeywords.filter(k => 
      resumeSkills.some(rs => rs.toLowerCase().includes(k.toLowerCase()))
    );
    const missing = jdKeywords.filter(k => 
      !resumeSkills.some(rs => rs.toLowerCase().includes(k.toLowerCase()))
    );
    
    const score = Math.round((matched.length / Math.max(1, jdKeywords.length)) * 100);
    
    return {
      score,
      matched,
      missing: missing.slice(0, 5), // Return top 5 missing
      suggestion: score < 70 ? 'Try incorporating some of the missing keywords naturally into your experience.' : 'Good match!'
    };
  },

  extractKeywords(text) {
    // Simple mock extraction based on capitalized words and known tech terms
    const techTerms = ['react', 'node', 'javascript', 'typescript', 'aws', 'docker', 'kubernetes', 'python', 'java', 'sql', 'nosql', 'agile', 'scrum'];
    const words = text.toLowerCase().split(/\W+/);
    const foundTerms = techTerms.filter(term => words.includes(term));
    
    // Add unique terms found
    return [...new Set(foundTerms)];
  }
};
