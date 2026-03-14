import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Compass, 
  Sparkles, 
  Plus, 
  Check, 
  Info,
  Lightbulb,
  RefreshCw
} from 'lucide-react';
import { aiService } from '../../services/aiService';
import { updateSectionOrder } from '../../store/slices/resumeSlice';

const ResumeAdvisor = () => {
  const dispatch = useDispatch();
  const { currentResume } = useSelector(state => state.resume);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleGetSuggestions = async () => {
    setLoading(true);
    const result = await aiService.suggestSections(
      currentResume.sections.find(s => s.id === 'skills')?.items || [],
      currentResume.sections.find(s => s.id === 'experience')?.items || []
    );
    setSuggestions(result);
    setLoading(false);
  };

  const addSection = (suggestion) => {
    const newSection = {
      id: suggestion.id,
      title: suggestion.title,
      type: 'list',
      items: []
    };
    
    // Check if section already exists
    if (currentResume.sections.some(s => s.id === suggestion.id)) {
      alert('Section already exists!');
      return;
    }

    const updatedSections = [...currentResume.sections, newSection];
    dispatch(updateSectionOrder(updatedSections));
    setSuggestions(suggestions.filter(s => s.id !== suggestion.id));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Dynamic Advisor</h3>
          <p className="text-slate-500 text-sm">Strategic recommendations for your professional level.</p>
        </div>
        <button 
          onClick={handleGetSuggestions}
          disabled={loading}
          className="btn-secondary text-xs px-4 py-2 border-primary-100 text-primary-600"
        >
          {loading ? <RefreshCw className="animate-spin" size={12} /> : <Compass size={14} />}
          Get Strategy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((s) => (
          <div key={s.id} className="card-premium p-6 border-slate-100 bg-white group hover:border-primary-200 transition-all border-l-4 border-l-primary-500">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <button 
                onClick={() => addSection(s)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:bg-primary-600 hover:text-white flex items-center justify-center transition-all"
              >
                <Plus size={18} />
              </button>
            </div>
            <h4 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{s.title}</h4>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">{s.description}</p>
          </div>
        ))}
      </div>

      {suggestions.length === 0 && !loading && (
        <div className="bg-slate-50 rounded-2xl p-8 border border-dashed border-slate-200 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100 text-slate-300">
            <Compass size={32} />
          </div>
          <p className="text-slate-400 font-bold mb-4">Click "Get Strategy" to see section recommendations.</p>
          <button 
            onClick={handleGetSuggestions}
            className="btn-primary mx-auto"
          >
            Run AI Analysis
          </button>
        </div>
      )}

      {loading && (
        <div className="space-y-4">
          <div className="h-32 bg-slate-50 animate-pulse rounded-2xl" />
          <div className="h-32 bg-slate-50 animate-pulse rounded-2xl" />
        </div>
      )}

      <div className="p-6 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
            <Lightbulb className="text-amber-400" size={24} />
          </div>
          <div>
            <h5 className="font-bold text-lg mb-2">Did you know?</h5>
            <p className="text-sm text-indigo-100 leading-relaxed font-light">
              Including a <strong>Projects</strong> section is the #1 way for entry-level developers to overcome the "lack of experience" hurdle in ATS filters.
            </p>
          </div>
        </div>
        <Sparkles className="absolute -bottom-10 -right-10 text-white/5 w-48 h-48" />
      </div>
    </div>
  );
};

export default ResumeAdvisor;
