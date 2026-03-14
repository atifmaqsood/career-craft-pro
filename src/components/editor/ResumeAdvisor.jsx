import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Compass, 
  Sparkles, 
  Plus, 
  PlusCircle,
  Trophy,
  Globe,
  Award,
  BookOpen,
  Users,
  Heart,
  Briefcase,
  History,
  FileText,
  Lightbulb,
  RefreshCw,
  X
} from 'lucide-react';
import { addCustomSection } from '../../store/slices/resumeSlice';

const STANDARD_SECTIONS = [
  { id: 'projects', title: 'Projects', description: 'Showcase your personal or professional projects.', icon: FileText },
  { id: 'certificates', title: 'Certifications', description: 'List your industry certifications.', icon: Award },
  { id: 'languages', title: 'Languages', description: 'Specify your language proficiency levels.', icon: Globe },
  { id: 'awards', title: 'Awards & Honors', description: 'Highlight your professional achievements.', icon: Trophy },
  { id: 'volunteering', title: 'Volunteer Work', description: 'Share your social contributions.', icon: Heart },
  { id: 'publications', title: 'Publications', description: 'Research papers or articles you authored.', icon: BookOpen },
  { id: 'references', title: 'References', description: 'Contact info for professional references.', icon: Users },
  { id: 'interests', title: 'Interests', description: 'Personal hobbies that show character.', icon: History },
  { id: 'courses', title: 'Courses', description: 'Relevant coursework for your field.', icon: History }
];

const ResumeAdvisor = () => {
  const dispatch = useDispatch();
  const { currentResume } = useSelector(state => state.resume);
  const [customTitle, setCustomTitle] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleAddSection = (section) => {
    dispatch(addCustomSection({ title: section.title, type: 'list' }));
  };

  const handleAddCustom = () => {
    if (customTitle.trim()) {
      dispatch(addCustomSection({ title: customTitle, type: 'list' }));
      setCustomTitle('');
      setShowCustomInput(false);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <div>
        <h3 className="text-2xl font-bold text-slate-800">Add Sections</h3>
        <p className="text-slate-500 text-sm">Choose from industry-standard sections or create your own.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STANDARD_SECTIONS.map((s) => {
          const isAdded = currentResume.sections.some(existing => existing.id === s.id);
          return (
            <div 
              key={s.id} 
              className={`p-5 rounded-2xl border-2 transition-all group ${
                isAdded ? 'border-primary-100 bg-primary-50/30 opacity-60' : 'border-slate-100 bg-white hover:border-primary-200 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isAdded ? 'bg-primary-100 text-primary-600' : 'bg-slate-50 text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600'}`}>
                  <s.icon size={20} />
                </div>
                {!isAdded && (
                  <button 
                    onClick={() => handleAddSection(s)}
                    className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Plus size={18} />
                  </button>
                )}
                {isAdded && (
                  <div className="text-primary-600 font-bold text-xs uppercase tracking-widest px-2 py-1 bg-white rounded-lg border border-primary-100">
                    Added
                  </div>
                )}
              </div>
              <h4 className="font-bold text-slate-900">{s.title}</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">{s.description}</p>
            </div>
          );
        })}

        {/* Custom Section Card */}
        {!showCustomInput ? (
          <button 
            onClick={() => setShowCustomInput(true)}
            className="p-5 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center text-slate-400 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50 transition-all min-h-[160px]"
          >
            <PlusCircle size={32} className="mb-3" />
            <span className="font-bold">Add Custom Section</span>
          </button>
        ) : (
          <div className="p-5 rounded-2xl border-2 border-primary-400 bg-primary-50 flex flex-col justify-between min-h-[160px] animate-fade-in">
             <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-primary-900">New Custom Section</h4>
                  <button onClick={() => setShowCustomInput(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
                </div>
                <input 
                  autoFocus
                  type="text" 
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. Exhibitions, References"
                  className="w-full bg-white border border-primary-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCustom()}
                />
             </div>
             <button 
              onClick={handleAddCustom}
              className="btn-primary w-full mt-4"
             >
               Create Section
             </button>
          </div>
        )}
      </div>

      <div className="p-6 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
            <Lightbulb className="text-amber-400" size={24} />
          </div>
          <div>
            <h5 className="font-bold text-lg mb-2">Structure Matters</h5>
            <p className="text-sm text-indigo-100 leading-relaxed font-light">
              For tech roles, <strong>Projects</strong> should come immediately after Skills. For executive roles, <strong>Awards</strong> and <strong>Certifications</strong> carry more weight. Organize your sections based on your target seniority.
            </p>
          </div>
        </div>
        <Sparkles className="absolute -bottom-10 -right-10 text-white/5 w-48 h-48" />
      </div>
    </div>
  );
};

export default ResumeAdvisor;
