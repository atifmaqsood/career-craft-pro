import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Download, 
  RefreshCw,
  Send,
  MessageSquareQuote
} from 'lucide-react';
import { aiService } from '../../services/aiService';

const CoverLetterGenerator = () => {
  const { currentResume } = useSelector(state => state.resume);
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState('');

  const handleGenerate = async () => {
    if (!jd) {
      alert('Please paste a job description first.');
      return;
    }
    setLoading(true);
    const result = await aiService.generateCoverLetter(currentResume, jd);
    setLetter(result);
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(letter);
    alert('Copied to clipboard!');
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-slate-800">Cover Letter AI</h3>
        <p className="text-slate-500 text-sm">Generate a tailored cover letter using your resume data and job details.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="card-premium p-6 border-slate-100 bg-white">
          <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
            <Send size={16} className="text-primary-600" /> Job Description
          </label>
          <textarea 
            rows={5}
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            className="input-field bg-slate-50/50" 
            placeholder="Paste the target job description here..."
          />
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="btn-primary w-full mt-4 gap-2 py-3"
          >
            {loading ? <RefreshCw className="animate-spin" size={18} /> : <Sparkles size={18} />}
            Generate Tailored Cover Letter
          </button>
        </div>

        {letter && (
          <div className="card-premium p-8 border-slate-200 bg-white relative animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                  <CheckCircle2 size={16} />
                </div>
                <h4 className="font-bold text-slate-900">AI Generated Result</h4>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={copyToClipboard}
                  className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy size={18} />
                </button>
                <button 
                  className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  title="Download as PDF"
                >
                  <Download size={18} />
                </button>
              </div>
            </div>

            <div className="whitespace-pre-wrap text-slate-700 leading-relaxed font-sans text-sm p-6 bg-slate-50 border border-slate-100 rounded-2xl italic">
              {letter}
            </div>
            
            <div className="mt-6 flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
              <MessageSquareQuote size={20} className="text-amber-600 shrink-0" />
              <p className="text-xs text-amber-800 italic">
                Tip: AI generation is a starting point. Make sure to personalize the specific details about why you want to work for this company specifically.
              </p>
            </div>
          </div>
        )}
      </div>
      
      {!letter && (
        <div className="flex flex-col items-center justify-center py-10 opacity-30 select-none">
          <FileText size={64} className="text-slate-300 mb-4" />
          <p className="text-slate-400 font-bold">Your cover letter will appear here</p>
        </div>
      )}
    </div>
  );
};

// Internal Import for icons
const CheckCircle2 = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default CoverLetterGenerator;
