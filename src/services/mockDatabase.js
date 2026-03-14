const DB_KEY = 'career_craft_pro_db_v2';

const initialData = {
  users: [
    { 
      id: '1', 
      name: 'Atif Maqsood', 
      email: 'atif@example.com', 
      password: 'password123', 
      photo: '',
      plan: 'Premium'
    }
  ],
  currentUser: null, // Stores the user object if logged in
  resumes: [],
  analytics: {
    views: 124,
    downloads: 45,
    shares: 12
  }
};

export const mockDatabaseService = {
  init() {
    const data = localStorage.getItem(DB_KEY);
    if (!data) {
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

  // Auth Methods
  login(email, password) {
    const data = this.getData();
    const user = data.users.find(u => u.email === email && u.password === password);
    if (user) {
      data.currentUser = user;
      this.saveData(data);
      return { success: true, user };
    }
    return { success: false, message: 'Invalid email or password' };
  },

  signup(name, email, password) {
    const data = this.getData();
    if (data.users.find(u => u.email === email)) {
      return { success: false, message: 'Email already exists' };
    }
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      photo: '',
      plan: 'Free'
    };
    data.users.push(newUser);
    data.currentUser = newUser;
    this.saveData(data);
    return { success: true, user: newUser };
  },

  logout() {
    const data = this.getData();
    data.currentUser = null;
    this.saveData(data);
  },

  getCurrentUser() {
    return this.getData().currentUser;
  },

  updateUserProfile(updates) {
    const data = this.getData();
    if (!data.currentUser) return null;

    // Update in users list
    const userIndex = data.users.findIndex(u => u.id === data.currentUser.id);
    if (userIndex > -1) {
      data.users[userIndex] = { ...data.users[userIndex], ...updates };
      data.currentUser = data.users[userIndex];
      this.saveData(data);
      return data.currentUser;
    }
    return null;
  },

  // Resumes
  getResumes() {
    const data = this.getData();
    const currentUserId = data.currentUser?.id;
    if (!currentUserId) return [];
    // Filter resumes by current user (in a real app)
    // For this mock, we'll just show all for now or add userId to resumes
    return data.resumes.filter(r => r.userId === currentUserId || !r.userId);
  },

  getResumeById(id) {
    return this.getData().resumes.find(r => r.id === id);
  },

  saveResume(resume) {
    const data = this.getData();
    const currentUserId = data.currentUser?.id;
    const index = data.resumes.findIndex(r => r.id === resume.id);
    
    const resumeData = {
      ...resume,
      userId: currentUserId,
      updatedAt: new Date().toISOString()
    };

    if (index > -1) {
      data.resumes[index] = resumeData;
    } else {
      resumeData.id = resume.id || crypto.randomUUID();
      resumeData.createdAt = new Date().toISOString();
      data.resumes.push(resumeData);
    }
    
    this.saveData(data);
    return resumeData;
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
