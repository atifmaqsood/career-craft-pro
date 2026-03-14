import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Sparkles, 
  X, 
  Wand2, 
  RefreshCw, 
  Check, 
  Copy,
  Zap,
  MessageSquare,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { aiService } from '../../services/aiService';
import { updateBasics, addExperience } from '../../store/slices/resumeSlice';

const AIAssistant = ({ onClose }) => {
  const dispatch = useDispatch();
  const { currentResume } = useSelector(state => state.resume);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [activeTool, setActiveTool] = useState('summary');

  const handleGenerateSummary = async () => {
    setLoading(true);
    const summary = await aiService.generateSummary({ 
      role: currentResume.sections.find(s => s.id === 'experience').items[0]?.position || 'Professional',
      skills: currentResume.sections.find(s => s.id === 'skills').items 
    });
    setResult(summary);
    setLoading(false);
  };

  const applySummary = () => {
    dispatch(updateBasics({ summary: result }));
    onClose();
  };

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed top-16 right-0 bottom-0 w-[400px] bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col"
    >
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center text-white">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">AI Assistant</h3>
            <p className="text-xs text-slate-500">Powered by CareerCraft AI</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-2 gap-3 mb-8">
          <button 
            onClick={() => setActiveTool('summary')}
            className={`p-4 rounded-2xl border-2 transition-all text-center flex flex-col items-center gap-2 ${activeTool === 'summary' ? 'border-primary-600 bg-primary-50' : 'border-slate-100 hover:border-slate-200'}`}
          >
            <FileText size={24} className={activeTool === 'summary' ? 'text-primary-600' : 'text-slate-400'} />
            <span className="text-sm font-bold">Summary Gen</span>
          </button>
          <button 
            onClick={() => setActiveTool('bullets')}
            className={`p-4 rounded-2xl border-2 transition-all text-center flex flex-col items-center gap-2 ${activeTool === 'bullets' ? 'border-primary-600 bg-primary-50' : 'border-slate-100 hover:border-slate-200'}`}
          >
            <Zap size={24} className={activeTool === 'bullets' ? 'text-primary-600' : 'text-slate-400'} />
            <span className="text-sm font-bold">Bullet Booster</span>
          </button>
        </div>

        <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
          {activeTool === 'summary' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800">Generate Summary</h4>
              <p className="text-sm text-slate-500 line-clamp-2">Based on your experience and skills, our AI will craft a high-impact professional summary.</p>
              
              {result && (
                <div className="p-4 bg-white border border-primary-100 rounded-xl animate-fade-in">
                  <p className="text-sm text-slate-700 leading-relaxed italic">"{result}"</p>
                </div>
              )}
              
              <div className="flex gap-2">
                <button 
                  onClick={handleGenerateSummary}
                  disabled={loading}
                  className="btn-primary flex-1 gap-2"
                >
                  {loading ? <RefreshCw className="animate-spin" size={18} /> : <Wand2 size={18} />}
                  {result ? 'Regenerate' : 'Generate'}
                </button>
                {result && (
                  <button onClick={applySummary} className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg transition-colors">
                    <Check size={20} />
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTool === 'bullets' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800">Improve Bullet Points</h4>
              <input 
                type="text" 
                placeholder="Paste a resume bullet point..."
                className="input-field bg-white"
              />
              <button className="btn-primary w-full gap-2">
                <Sparkles size={18} /> Enhance Impact
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 border-t border-slate-100">
        <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-xl text-primary-700 border border-primary-100">
          <MessageSquare size={20} />
          <p className="text-xs font-medium">Need help? Ask our AI coach for personalized career advice.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AIAssistant;
