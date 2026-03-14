import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer 
} from 'recharts';
import { CheckCircle2, AlertCircle, Info, Sparkles, Target, RefreshCw } from 'lucide-react';
import { scoringEngine } from '../../services/scoringEngine';

const ATSScoring = () => {
  const { currentResume } = useSelector(state => state.resume);
  const [jd, setJd] = useState('');
  const [matchResult, setMatchResult] = useState(null);
  const [isMatching, setIsMatching] = useState(false);
  
  const scoreData = useMemo(() => {
    return scoringEngine.calculateScore(currentResume);
  }, [currentResume]);

  const handleAnalyzeMatch = () => {
    if (!jd) return;
    setIsMatching(true);
    setTimeout(() => {
      const skills = currentResume.sections.find(s => s.id === 'skills')?.items || [];
      const result = scoringEngine.calculateMatch(skills, jd);
      setMatchResult(result);
      setIsMatching(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-bold text-slate-900">ATS Optimization</h3>
          <p className="text-slate-500 mt-2">Analyze how well your resume performs against Applicant Tracking Systems.</p>
        </div>
        <div className="relative flex items-center justify-center">
          <svg className="w-24 h-24 transform -rotate-90">
            <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-100" />
            <circle
              cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="10" fill="transparent"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 - (251.2 * scoreData.total) / 100}
              className="text-primary-600 transition-all duration-1000"
            />
          </svg>
          <span className="absolute text-2xl font-black text-slate-800">{scoreData.total}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={scoreData.breakdown}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
              <Radar name="Score" dataKey="score" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-slate-800 flex items-center gap-2">
            <Info size={18} className="text-primary-500" /> Improvement Suggestions
          </h4>
          <div className="space-y-3">
            {scoreData.suggestions.map((suggestion, idx) => (
              <div key={idx} className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600 font-medium">{suggestion}</p>
              </div>
            ))}
            {scoreData.suggestions.length === 0 && (
              <div className="flex gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-700 font-bold">Your resume is highly optimized!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card-premium p-8 bg-gradient-to-br from-primary-600 to-accent-600 text-white border-none overflow-hidden relative">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h4 className="text-2xl font-bold mb-2">Job Description Matcher</h4>
              <p className="text-primary-50/80 max-w-lg text-sm">Paste a job description to calculate your match score and find missing keywords.</p>
            </div>
            {matchResult && (
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center border border-white/30">
                <p className="text-xs font-bold uppercase tracking-widest text-white/70">Match Score</p>
                <h3 className="text-3xl font-black mt-1">{matchResult.score}%</h3>
              </div>
            )}
          </div>
          
          <textarea 
            rows={4}
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/40 outline-none focus:bg-white/20 transition-all font-sans text-sm"
            placeholder="Paste job description here..."
          />
          
          <div className="flex gap-3 mt-4">
            <button 
              onClick={handleAnalyzeMatch}
              disabled={isMatching || !jd}
              className="bg-white text-primary-600 font-bold py-2 px-6 rounded-lg hover:bg-primary-50 transition-colors flex items-center gap-2"
            >
              {isMatching ? <RefreshCw className="animate-spin" size={18} /> : <Target size={18} />}
              Analyze Match
            </button>
          </div>

          {matchResult && (
            <div className="mt-8 animate-slide-up space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-emerald-500/20 rounded-xl p-4 border border-emerald-500/30">
                  <h5 className="text-xs font-bold uppercase tracking-widest text-emerald-200 mb-2">Matched Keywords</h5>
                  <div className="flex flex-wrap gap-2">
                    {matchResult.matched.map((k, i) => (
                      <span key={i} className="px-2 py-0.5 bg-emerald-500/30 rounded-md text-[10px] font-bold">{k}</span>
                    ))}
                    {matchResult.matched.length === 0 && <span className="text-xs text-white/50 italic">No matches found yet.</span>}
                  </div>
                </div>
                <div className="bg-red-500/20 rounded-xl p-4 border border-red-500/30">
                  <h5 className="text-xs font-bold uppercase tracking-widest text-red-200 mb-2">Missing Keywords</h5>
                  <div className="flex flex-wrap gap-2">
                    {matchResult.missing.map((k, i) => (
                      <span key={i} className="px-2 py-0.5 bg-red-500/30 rounded-md text-[10px] font-bold">{k}</span>
                    ))}
                    {matchResult.missing.length === 0 && <span className="text-xs text-white/50 italic">None! Great job coverage.</span>}
                  </div>
                </div>
              </div>
              <p className="text-sm font-medium italic text-primary-50">{matchResult.suggestion}</p>
            </div>
          )}
        </div>
        <Sparkles className="absolute -bottom-10 -right-10 text-white/10 w-48 h-48" />
      </div>
    </div>
  );
};

export default ATSScoring;
