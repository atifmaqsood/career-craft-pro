import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Zap, 
  Lightbulb, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { aiService } from '../../services/aiService';
import { updateExperience } from '../../store/slices/resumeSlice';

const KeywordOptimizer = () => {
  const dispatch = useDispatch();
  const { currentResume } = useSelector(state => state.resume);
  const experiences = currentResume.sections.find(s => s.id === 'experience')?.items || [];
  
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const analyzeExperience = async (id, text) => {
    setLoading(id);
    const result = await aiService.optimizeKeywords(text);
    setAnalysis({ id, ...result });
    setLoading(false);
  };

  const applyOptimization = (id, originalText, suggestion) => {
    const newText = originalText.replace(new RegExp(suggestion.original, 'gi'), suggestion.suggested);
    const item = experiences.find(e => e.id === id);
    if (item) {
      dispatch(updateExperience({ ...item, description: newText }));
      // Clear analysis for this item if all suggestions applied
      setAnalysis(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Keyword Optimizer</h3>
          <p className="text-slate-500 text-sm">Convert weak phrases into high-impact action verbs.</p>
        </div>
        <div className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold border border-amber-100 flex items-center gap-1">
          <Zap size={12} className="fill-current" /> AI Powered
        </div>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="card-premium p-5 border-slate-100 bg-white">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-bold text-slate-900">{exp.company}</h4>
                <p className="text-xs text-slate-500 font-medium">{exp.position}</p>
              </div>
              <button 
                onClick={() => analyzeExperience(exp.id, exp.description)}
                disabled={loading === exp.id}
                className="text-xs font-bold text-primary-600 hover:bg-primary-50 px-3 py-1.5 rounded-lg border border-primary-100 transition-colors flex items-center gap-1"
              >
                {loading === exp.id ? <RefreshCw className="animate-spin" size={12} /> : <Zap size={12} />}
                Optimize
              </button>
            </div>

            <p className="text-sm text-slate-600 mb-4 bg-slate-50 p-3 rounded-xl italic">
              "{exp.description || 'No description provided.'}"
            </p>

            {analysis && analysis.id === exp.id && analysis.suggestions.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-50">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Suggestions</p>
                {analysis.suggestions.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="flex-1 flex items-center gap-2 p-2 bg-red-50/50 rounded-lg line-through text-red-400 text-sm">
                      {s.original}
                    </div>
                    <ArrowRight size={14} className="text-slate-300" />
                    <button 
                      onClick={() => applyOptimization(exp.id, exp.description, s)}
                      className="flex-1 flex items-center justify-between p-2 bg-emerald-50 rounded-lg text-emerald-700 text-sm font-bold border border-emerald-100 hover:bg-emerald-100 transition-colors"
                    >
                      {s.suggested}
                      <CheckCircle2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {analysis && analysis.id === exp.id && analysis.suggestions.length === 0 && (
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm mt-4">
                <CheckCircle2 size={16} /> All keywords are optimized!
              </div>
            )}
          </div>
        ))}

        {experiences.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-slate-400">
            <AlertCircle size={40} className="mb-4 opacity-20" />
            <p className="font-medium font-display">No experiences found to optimize.</p>
          </div>
        )}
      </div>
      
      <div className="bg-primary-50 p-4 rounded-2xl border border-primary-100 mt-8">
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary-600 shrink-0 shadow-sm border border-primary-50">
            <Lightbulb size={20} />
          </div>
          <div>
            <h5 className="font-bold text-primary-900 text-sm">Pro Tip</h5>
            <p className="text-xs text-primary-700 mt-1 leading-relaxed">
              Applicant Tracking Systems (ATS) look for "Action Verbs" like <strong>Orchestrated</strong>, <strong>Pioneered</strong>, and <strong>Spearheaded</strong> to grade the seniority of your contributions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordOptimizer;
