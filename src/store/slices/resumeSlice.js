import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentResume: {
    id: null,
    title: 'Untitled Resume',
    templateId: 'modern',
    basics: {
      name: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    sections: [
      { id: 'basics', title: 'Personal Info', type: 'basics' },
      { id: 'experience', title: 'Experience', type: 'list', items: [] },
      { id: 'education', title: 'Education', type: 'list', items: [] },
      { id: 'skills', title: 'Skills', type: 'tags', items: [] }
    ],
    settings: {
      color: '#0ea5e9',
      font: 'Inter',
      spacing: 'medium'
    }
  },
  savedResumes: [],
  loading: false,
  error: null
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setResume: (state, action) => {
      state.currentResume = action.payload;
    },
    updateBasics: (state, action) => {
      state.currentResume.basics = { ...state.currentResume.basics, ...action.payload };
    },
    updateSettings: (state, action) => {
      state.currentResume.settings = { ...state.currentResume.settings, ...action.payload };
    },
    updateSectionOrder: (state, action) => {
      state.currentResume.sections = action.payload;
    },
    addExperience: (state, action) => {
      const section = state.currentResume.sections.find(s => s.id === 'experience');
      section.items.unshift({ id: crypto.randomUUID(), ...action.payload });
    },
    updateExperience: (state, action) => {
      const section = state.currentResume.sections.find(s => s.id === 'experience');
      const index = section.items.findIndex(i => i.id === action.payload.id);
      if (index > -1) section.items[index] = action.payload;
    },
    removeExperience: (state, action) => {
      const section = state.currentResume.sections.find(s => s.id === 'experience');
      section.items = section.items.filter(i => i.id !== action.payload);
    },
    addEducation: (state, action) => {
      const section = state.currentResume.sections.find(s => s.id === 'education');
      section.items.unshift({ id: crypto.randomUUID(), ...action.payload });
    },
    updateEducation: (state, action) => {
      const section = state.currentResume.sections.find(s => s.id === 'education');
      const index = section.items.findIndex(i => i.id === action.payload.id);
      if (index > -1) section.items[index] = action.payload;
    },
    removeEducation: (state, action) => {
      const section = state.currentResume.sections.find(s => s.id === 'education');
      section.items = section.items.filter(i => i.id !== action.payload);
    },
    setSkills: (state, action) => {
      const section = state.currentResume.sections.find(s => s.id === 'skills');
      section.items = action.payload;
    },
    setTemplate: (state, action) => {
      state.currentResume.templateId = action.payload;
    }
  }
});

export const { 
  setResume, 
  updateBasics, 
  updateSettings, 
  updateSectionOrder,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
  setSkills,
  setTemplate
} = resumeSlice.actions;

export default resumeSlice.reducer;
