import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  ChevronLeft, Eye, EyeOff, Save, Download, Sparkles,
  Layout, LineChart as ChartIcon, Zap, Compass, FileText,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { setResume } from '../store/slices/resumeSlice';
import { mockDatabaseService } from '../services/mockDatabase';
import { exportToPDF } from '../utils/pdfExport';
import EditorForm from '../components/editor/EditorForm';
import ResumePreview from '../components/preview/ResumePreview';
import TemplateSwitcher from '../components/editor/TemplateSwitcher';
import ATSScoring from '../components/editor/ATSScoring';
import AIAssistant from '../components/editor/AIAssistant';
import KeywordOptimizer from '../components/editor/KeywordOptimizer';
import ResumeAdvisor from '../components/editor/ResumeAdvisor';
import CoverLetterGenerator from '../components/editor/CoverLetterGenerator';

const tabs = [
  { id: 'content',   label: 'Content',      icon: FileText },
  { id: 'templates', label: 'Themes',        icon: Layout },
  { id: 'scoring',   label: 'ATS Score',     icon: ChartIcon },
  { id: 'optimizer', label: 'Keywords',      icon: Zap },
  { id: 'advisor',   label: 'Advisor',       icon: Compass },
  { id: 'letter',    label: 'Cover Letter',  icon: Sparkles },
];

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentResume } = useSelector(state => state.resume);
  
  const [activeTab, setActiveTab] = useState('content');
  const [showPreview, setShowPreview] = useState(true);
  const [showAI, setShowAI] = useState(false);
  const [saved, setSaved] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (id) {
      const resume = mockDatabaseService.getResumeById(id);
      if (resume) dispatch(setResume(resume));
    }
  }, [id, dispatch]);

  const renderPanel = () => (
    <AnimatePresence mode="wait">
      {tabs.map(tab =>
        activeTab === tab.id ? (
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {tab.id === 'content'   && <EditorForm />}
            {tab.id === 'templates' && <TemplateSwitcher />}
            {tab.id === 'scoring'   && <ATSScoring />}
            {tab.id === 'optimizer' && <KeywordOptimizer />}
            {tab.id === 'advisor'   && <ResumeAdvisor />}
            {tab.id === 'letter'    && <CoverLetterGenerator />}
          </motion.div>
        ) : null
      )}
    </AnimatePresence>
  );

  const handleSave = () => {
    mockDatabaseService.saveResume(currentResume);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  const handleExport = async () => {
    setExporting(true);
    const filename = `${currentResume.basics.name?.replace(/\s+/g, '_') || 'my'}_resume.pdf`;
    await exportToPDF(currentResume, filename);
    setExporting(false);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden">

      {/* ── Top Bar ─────────────────────────────── */}
      <header className="h-14 bg-white border-b border-slate-200/80 flex items-center justify-between px-4 z-30 shrink-0 no-print">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors shrink-0"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="h-5 w-px bg-slate-200" />
          <input
            type="text"
            value={currentResume.title}
            onChange={(e) => dispatch(setResume({ ...currentResume, title: e.target.value }))}
            className="text-sm font-bold text-slate-800 border-none bg-transparent focus:ring-0 outline-none w-48 truncate"
          />
        </div>

        {/* Center – Tabs */}
        <div className="flex items-center bg-slate-100 rounded-xl p-1 gap-0.5 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id ? 'tab-active' : 'tab'}
            >
              <tab.icon size={13} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Right – Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowAI(!showAI)}
            className={`p-2.5 rounded-xl transition-all ${showAI ? 'bg-violet-100 text-violet-600' : 'hover:bg-slate-100 text-slate-500'}`}
            title="AI Assistant"
          >
            <Sparkles size={18} />
          </button>

          <button
            onClick={handleSave}
            className={`p-2.5 rounded-xl transition-all ${saved ? 'bg-emerald-100 text-emerald-600' : 'hover:bg-slate-100 text-slate-500'}`}
            title="Save"
          >
            {saved ? <CheckCircle2 size={18} /> : <Save size={18} />}
          </button>

          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`p-2.5 rounded-xl transition-all ${showPreview ? 'bg-primary-100 text-primary-600' : 'hover:bg-slate-100 text-slate-500'}`}
            title={showPreview ? 'Hide Preview' : 'Show Preview'}
          >
            {showPreview ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>

          <button
            onClick={handleExport}
            disabled={exporting}
            className="btn-primary ml-1 px-4 py-2 text-sm"
          >
            <Download size={15} />
            {exporting ? 'Exporting…' : 'Export PDF'}
          </button>
        </div>
      </header>

      {/* ── Body ──────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">

        {/* Editor Panel */}
        <div className={`flex flex-col overflow-y-auto bg-white transition-all duration-300 no-print ${showPreview ? 'w-[45%] border-r border-slate-200' : 'w-full'}`}>
          <div className="max-w-2xl mx-auto w-full py-8 px-6">
            {renderPanel()}
          </div>
        </div>

        {/* Preview Panel */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="flex-1 bg-slate-100 overflow-y-auto"
            >
              {/* Preview header */}
              <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 bg-slate-100/90 backdrop-blur-sm border-b border-slate-200/60">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Preview</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-glow" />
                  <span className="text-xs text-slate-400 font-medium">Auto-updating</span>
                </div>
              </div>
              <div className="py-10 px-8 flex justify-center">
                <ResumePreview />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AI Drawer */}
      <AnimatePresence>
        {showAI && (
          <div className="no-print">
            <AIAssistant onClose={() => setShowAI(false)} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Editor;
