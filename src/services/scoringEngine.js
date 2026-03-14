/**
 * ATS Scoring Engine
 * Analyzes resume content for structure, keyword density, completeness, and length.
 */
export const scoringEngine = {
  calculateScore(resumeData) {
    const { basics, experience, education, skills } = resumeData;
    
    // 1. Structure (25%)
    const structureScore = basics.name && basics.email && basics.summary ? 25 : 15;
    
    // 2. Keyword Density (25%)
    const keywordCount = (skills?.length || 0) * 2;
    const keywordScore = Math.min(25, keywordCount);
    
    // 3. Completeness (25%)
    let completenessCount = 0;
    if (experience?.length > 0) completenessCount += 10;
    if (education?.length > 0) completenessCount += 10;
    if (basics.phone) completenessCount += 5;
    const completenessScore = completenessCount;
    
    // 4. Length (25%)
    // Mocking length check based on experience items
    const lengthScore = experience?.length >= 2 ? 25 : 15;
    
    const totalScore = structureScore + keywordScore + completenessScore + lengthScore;
    
    return {
      total: totalScore,
      breakdown: [
        { name: 'Structure', score: structureScore, max: 25 },
        { name: 'Keywords', score: keywordScore, max: 25 },
        { name: 'Completeness', score: completenessScore, max: 25 },
        { name: 'Length', score: lengthScore, max: 25 }
      ],
      suggestions: this.getSuggestions(resumeData, { structureScore, keywordScore, completenessScore, lengthScore })
    };
  },

  getSuggestions(data, scores) {
    const suggestions = [];
    
    if (scores.structureScore < 25) {
      suggestions.push('Add a professional summary to improve your resume structure.');
    }
    
    if (scores.keywordScore < 20) {
      suggestions.push('Include more industry-specific technical skills to pass ATS filters.');
    }
    
    if (scores.completenessScore < 25) {
      suggestions.push('Ensure your contact details like phone number are complete.');
    }
    
    if (scores.lengthScore < 25) {
      suggestions.push('Detail more of your professional experience to show depth.');
    }
    
    return suggestions;
  },

  calculateMatch(resumeSkills, jobDescription) {
    if (!jobDescription) return 0;
    
    const jdWords = jobDescription.toLowerCase().split(/\W+/);
    const matchedSkills = resumeSkills.filter(skill => 
      jdWords.includes(skill.toLowerCase())
    );
    
    return Math.round((matchedSkills.length / Math.max(1, resumeSkills.length)) * 100);
  }
};
