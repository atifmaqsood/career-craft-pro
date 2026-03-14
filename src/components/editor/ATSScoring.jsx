import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer 
} from 'recharts';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { scoringEngine } from '../../services/scoringEngine';

const ATSScoring = () => {
  const { currentResume } = useSelector(state => state.resume);
  
  const scoreData = useMemo(() => {
    return scoringEngine.calculateScore(currentResume);
  }, [currentResume]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-bold text-slate-900">ATS Optimization</h3>
          <p className="text-slate-500 mt-2">Analyze how well your resume performs against Applicant Tracking Systems.</p>
        </div>
        <div className="relative flex items-center justify-center">
          <svg className="w-24 h-24 transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              className="text-slate-100"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
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
              <Radar
                name="Score"
                dataKey="score"
                stroke="#0ea5e9"
                fill="#0ea5e9"
                fillOpacity={0.6}
              />
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
                <p className="text-sm text-emerald-700 font-bold">Your resume is highly optimized! Great job!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card-premium p-8 bg-gradient-to-br from-primary-600 to-accent-600 text-white border-none overflow-hidden relative">
        <div className="relative z-10">
          <h4 className="text-xl font-bold mb-2">Job Matcher</h4>
          <p className="text-primary-50/80 mb-6 max-w-lg">Paste a job description below to see how well your resume matches the specific requirements.</p>
          <textarea 
            rows={4}
            className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/40 outline-none focus:bg-white/20"
            placeholder="Paste job description here..."
          />
          <button className="mt-4 bg-white text-primary-600 font-bold py-2 px-6 rounded-lg hover:bg-primary-50 transition-colors">
            Analyze Match
          </button>
        </div>
        <ChartIcon className="absolute -bottom-10 -right-10 text-white/10 w-48 h-48" />
      </div>
    </div>
  );
};

export default ATSScoring;
