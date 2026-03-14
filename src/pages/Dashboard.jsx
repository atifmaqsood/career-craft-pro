import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, FileText, MoreVertical, Eye, Download,
  Share2, TrendingUp, Clock, Sparkles, ArrowRight,
  Upload, Briefcase, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockDatabaseService } from '../services/mockDatabase';
import { resumeParser } from '../services/resumeParser';
import { setResume } from '../store/slices/resumeSlice';

/* ── Stat Card ─────────────────────────────────── */
const StatCard = ({ title, value, icon: Icon, trend, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="card-premium p-6"
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-4xl font-bold mt-2 text-slate-900">{value}</h3>
        {trend && (
          <p className="text-emerald-600 text-xs font-bold mt-2 flex items-center gap-1">
            <TrendingUp size={12} /> +{trend} this month
          </p>
        )}
      </div>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
        <Icon size={22} />
      </div>
    </div>
  </motion.div>
);

/* ── Template Badge ────────────────────────────── */
const templateColors = {
  modern:       'from-sky-500 to-blue-600',
  professional: 'from-emerald-500 to-teal-600',
  corporate:    'from-slate-600 to-slate-800',
  startup:      'from-rose-500 to-pink-600',
  swiss:        'from-indigo-500 to-violet-600',
  executive:    'from-purple-500 to-purple-700',
  elegant:      'from-pink-400 to-rose-500',
  functional:   'from-slate-500 to-slate-700',
  creative:     'from-orange-400 to-red-500',
  minimal:      'from-gray-400 to-slate-500',
};

/* ── Resume Card ───────────────────────────────── */
const ResumeCard = ({ resume, onDelete, delay = 0 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const gradient = templateColors[resume.templateId] || 'from-slate-400 to-slate-600';

  const handleEdit = () => {
    dispatch(setResume(resume));
    navigate(`/editor/${resume.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="card-premium group overflow-hidden flex flex-col"
    >
      {/* Preview area */}
      <div
        className={`aspect-[3/4] bg-gradient-to-br ${gradient} relative overflow-hidden cursor-pointer`}
        onClick={handleEdit}
      >
        {/* Paper lines simulation */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-px bg-white mx-6 mb-5 mt-0" style={{ marginTop: i === 0 ? 40 : 0 }} />
          ))}
        </div>
        <div className="absolute inset-0 flex flex-col items-start justify-start p-8">
          <div className="w-2/3 h-2 bg-white/70 rounded mb-2" />
          <div className="w-1/2 h-1.5 bg-white/40 rounded mb-8" />
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`h-1 bg-white/30 rounded mb-2 ${i % 3 === 0 ? 'w-full' : i % 3 === 1 ? 'w-4/5' : 'w-3/5'}`} />
          ))}
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
          <button
            onClick={handleEdit}
            className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-xl hover:scale-110 transition-transform"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(`${window.location.origin}/share/${resume.id}`); alert('Link copied!'); }}
            className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-xl hover:scale-110 transition-transform"
          >
            <Share2 size={18} />
          </button>
        </div>
        {/* Template badge */}
        <div className="absolute top-3 left-3 badge-primary bg-white/15 text-white border-white/20 text-[10px] capitalize backdrop-blur-sm">
          {resume.templateId}
        </div>
      </div>
      {/* Footer */}
      <div className="p-4 flex justify-between items-center border-t border-slate-50">
        <div className="min-w-0">
          <h4 className="font-bold text-slate-800 text-sm truncate">{resume.title}</h4>
          <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1.5 font-medium">
            <Clock size={10} /> Updated recently
          </p>
        </div>
        <div className="relative">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <MoreVertical size={16} />
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                className="absolute right-0 bottom-8 w-40 card shadow-xl z-50 p-1.5 border border-slate-100"
              >
                <button onClick={handleEdit} className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-slate-50 text-slate-700 font-medium">
                  <Eye size={14} /> Open Editor
                </button>
                <button className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-slate-50 text-slate-700 font-medium">
                  <Download size={14} /> Download PDF
                </button>
                <button className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-red-50 text-red-600 font-medium">
                  <FileText size={14} /> Delete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Dashboard ─────────────────────────────────── */
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile, analytics } = useSelector(state => state.user);
  const [resumes, setResumes] = useState([]);
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => {
    setResumes(mockDatabaseService.getResumes());
  }, []);

  const handleCreateNew = () => {
    const newResume = {
      id: crypto.randomUUID(),
      title: 'My New Resume',
      templateId: 'modern',
      basics: { name: profile.name, email: profile.email, phone: '', location: '', summary: '', title: '' },
      sections: [
        { id: 'basics', title: 'Personal Info', type: 'basics' },
        { id: 'experience', title: 'Experience', type: 'list', items: [] },
        { id: 'education', title: 'Education', type: 'list', items: [] },
        { id: 'skills', title: 'Skills', type: 'tags', items: [] }
      ],
      settings: { color: '#0ea5e9', font: 'Inter', spacing: 'medium' }
    };
    mockDatabaseService.saveResume(newResume);
    dispatch(setResume(newResume));
    navigate(`/editor/${newResume.id}`);
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsImporting(true);
    try {
      const extractedData = await resumeParser.parseFile(file);
      const newResume = {
        id: crypto.randomUUID(),
        title: `Imported – ${file.name.split('.')[0]}`,
        templateId: 'professional',
        basics: extractedData.basics,
        sections: extractedData.sections.map(s => ({ id: s.id, title: s.title, type: s.type, items: s.items || [] })),
        settings: { color: '#0ea5e9', font: 'Inter', spacing: 'medium' }
      };
      mockDatabaseService.saveResume(newResume);
      dispatch(setResume(newResume));
      navigate(`/editor/${newResume.id}`);
    } catch {
      alert('Failed to parse resume. Please try again.');
    } finally {
      setIsImporting(false);
    }
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="min-h-full p-8 max-w-7xl mx-auto">

      {/* ── Hero Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="badge-primary text-xs">
              <Star size={10} className="fill-primary-500" /> Premium
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            {greeting}, {profile.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-slate-500 mt-1.5 text-sm">Your professional toolkit is ready. Let's build something great.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <label className="btn-secondary cursor-pointer">
            <Upload size={16} />
            {isImporting ? 'Parsing…' : 'Import Resume'}
            <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleImport} disabled={isImporting} />
          </label>
          <button onClick={handleCreateNew} className="btn-primary">
            <Plus size={16} /> New Resume
          </button>
        </div>
      </motion.div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <StatCard title="Resume Views" value={analytics.views} icon={Eye} trend="12%" color="bg-sky-50 text-sky-600" delay={0} />
        <StatCard title="Downloads" value={analytics.downloads} icon={Download} trend="8%" color="bg-violet-50 text-violet-600" delay={0.05} />
        <StatCard title="Active Shares" value={analytics.shares} icon={Share2} trend="24%" color="bg-emerald-50 text-emerald-600" delay={0.1} />
      </div>

      {/* ── Quick Actions ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
      >
        {[
          { icon: Sparkles, label: 'AI Resume Writer', desc: 'Generate a resume with AI', color: 'text-violet-600', bg: 'bg-violet-50 border-violet-100', action: handleCreateNew },
          { icon: Briefcase, label: 'Job Targeting', desc: 'Tailor resume to job offer', color: 'text-sky-600', bg: 'bg-sky-50 border-sky-100', action: handleCreateNew },
          { icon: TrendingUp, label: 'ATS Optimizer', desc: 'Beat applicant tracking', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100', action: handleCreateNew },
        ].map((qa, i) => (
          <button
            key={i}
            onClick={qa.action}
            className={`flex items-center gap-4 p-4 rounded-2xl border ${qa.bg} text-left hover:-translate-y-0.5 hover:shadow-md transition-all duration-200`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${qa.bg} ${qa.color} shrink-0`}>
              <qa.icon size={20} />
            </div>
            <div className="min-w-0">
              <p className={`text-sm font-bold ${qa.color}`}>{qa.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{qa.desc}</p>
            </div>
            <ArrowRight size={14} className="ml-auto text-slate-300 shrink-0" />
          </button>
        ))}
      </motion.div>

      {/* ── Resumes Grid ── */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900">Your Resumes</h2>
          <button className="text-sm text-primary-600 font-semibold hover:underline flex items-center gap-1">
            Browse templates <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {/* Create New */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleCreateNew}
            className="aspect-[3/4] rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-primary-400 hover:text-primary-500 hover:bg-primary-50/50 transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-slate-100 group-hover:bg-primary-100 flex items-center justify-center transition-colors">
              <Plus size={28} />
            </div>
            <span className="text-sm font-bold">Create New</span>
          </motion.button>

          {resumes.map((resume, i) => (
            <ResumeCard key={resume.id} resume={resume} delay={i * 0.05} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
