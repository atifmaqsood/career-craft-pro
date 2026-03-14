import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Target, 
  Code2, 
  Plus,
  Trash2,
  GripVertical
} from 'lucide-react';
import { 
  updateBasics, 
  addExperience, 
  removeExperience, 
  addEducation, 
  removeEducation,
  updateExperience,
  updateEducation,
  setSkills
} from '../../store/slices/resumeSlice';

const SectionHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-100 mt-10 first:mt-0">
    <div className="w-8 h-8 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center">
      <Icon size={18} />
    </div>
    <h3 className="text-xl font-bold text-slate-800">{title}</h3>
  </div>
);

const EditorForm = () => {
  const dispatch = useDispatch();
  const { currentResume } = useSelector(state => state.resume);
  const { basics, sections } = currentResume;

  const handleBasicsChange = (field, value) => {
    dispatch(updateBasics({ [field]: value }));
  };

  const handleSkillChange = (e) => {
    const skillsArray = e.target.value.split(',').map(s => s.trim());
    dispatch(setSkills(skillsArray));
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Basics */}
      <section>
        <SectionHeader title="Personal Information" icon={User} />
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
            <input 
              type="text" 
              value={basics.name}
              onChange={(e) => handleBasicsChange('name', e.target.value)}
              className="input-field" 
              placeholder="e.g. John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
            <input 
              type="email" 
              value={basics.email}
              onChange={(e) => handleBasicsChange('email', e.target.value)}
              className="input-field" 
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Phone</label>
            <input 
              type="tel" 
              value={basics.phone}
              onChange={(e) => handleBasicsChange('phone', e.target.value)}
              className="input-field" 
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Summary</label>
            <textarea 
              rows={4}
              value={basics.summary}
              onChange={(e) => handleBasicsChange('summary', e.target.value)}
              className="input-field resize-none" 
              placeholder="Professional summary..."
            />
          </div>
        </div>
      </section>

      {/* Experience */}
      <section>
        <div className="flex justify-between items-center mb-6 mt-10 border-b border-slate-100 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center">
              <Briefcase size={18} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Experience</h3>
          </div>
          <button 
            onClick={() => dispatch(addExperience({ company: '', position: '', startDate: '', endDate: '', description: '' }))}
            className="text-primary-600 hover:bg-primary-50 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
          >
            <Plus size={16} /> Add Experience
          </button>
        </div>
        
        <div className="space-y-6">
          {sections.find(s => s.id === 'experience').items.map((item, index) => (
            <div key={item.id} className="p-5 border border-slate-100 rounded-xl bg-slate-50/50 relative group">
              <button 
                onClick={() => dispatch(removeExperience(item.id))}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Company</label>
                  <input 
                    type="text" 
                    value={item.company}
                    onChange={(e) => dispatch(updateExperience({ ...item, company: e.target.value }))}
                    className="input-field bg-white" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Position</label>
                  <input 
                    type="text" 
                    value={item.position}
                    onChange={(e) => dispatch(updateExperience({ ...item, position: e.target.value }))}
                    className="input-field bg-white" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Start</label>
                    <input 
                      type="text" 
                      value={item.startDate}
                      onChange={(e) => dispatch(updateExperience({ ...item, startDate: e.target.value }))}
                      className="input-field bg-white" 
                      placeholder="MM/YYYY"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">End</label>
                    <input 
                      type="text" 
                      value={item.endDate}
                      onChange={(e) => dispatch(updateExperience({ ...item, endDate: e.target.value }))}
                      className="input-field bg-white" 
                      placeholder="MM/YYYY or Present"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Description</label>
                  <textarea 
                    rows={3}
                    value={item.description}
                    onChange={(e) => dispatch(updateExperience({ ...item, description: e.target.value }))}
                    className="input-field bg-white resize-none" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <SectionHeader title="Skills" icon={Code2} />
        <div className="p-5 border border-slate-100 rounded-xl bg-slate-50/50">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Technical Skills (comma separated)</label>
          <input 
            type="text" 
            value={sections.find(s => s.id === 'skills').items.join(', ')}
            onChange={handleSkillChange}
            className="input-field bg-white" 
            placeholder="React, Node.js, TypeScript..."
          />
          <div className="flex flex-wrap gap-2 mt-4">
            {sections.find(s => s.id === 'skills').items.map((skill, i) => (
              skill && (
                <span key={i} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-bold">
                  {skill}
                </span>
              )
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditorForm;
