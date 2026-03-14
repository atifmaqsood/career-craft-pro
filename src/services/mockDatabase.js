const DB_KEY = 'career_craft_pro_db';

const initialData = {
  resumes: [],
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    plan: 'Premium'
  },
  analytics: {
    views: 124,
    downloads: 45,
    shares: 12
  }
};

export const mockDatabaseService = {
  init() {
    if (!localStorage.getItem(DB_KEY)) {
      localStorage.setItem(DB_KEY, JSON.stringify(initialData));
    }
  },

  getData() {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : initialData;
  },

  saveData(data) {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  },

  // Resumes
  getResumes() {
    return this.getData().resumes;
  },

  getResumeById(id) {
    return this.getResumes().find(r => r.id === id);
  },

  saveResume(resume) {
    const data = this.getData();
    const index = data.resumes.findIndex(r => r.id === resume.id);
    
    if (index > -1) {
      data.resumes[index] = { ...resume, updatedAt: new Date().toISOString() };
    } else {
      data.resumes.push({ 
        ...resume, 
        id: resume.id || crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString() 
      });
    }
    
    this.saveData(data);
    return resume;
  },

  deleteResume(id) {
    const data = this.getData();
    data.resumes = data.resumes.filter(r => r.id !== id);
    this.saveData(data);
  },

  // Analytics
  getAnalytics() {
    return this.getData().analytics;
  },

  incrementMetric(metric) {
    const data = this.getData();
    if (data.analytics[metric] !== undefined) {
      data.analytics[metric]++;
      this.saveData(data);
    }
  }
};
