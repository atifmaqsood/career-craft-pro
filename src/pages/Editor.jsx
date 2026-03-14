import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  ChevronLeft, 
  Eye, 
  EyeOff, 
  Save, 
  Download, 
  Sparkles,
  Layout,
  LineChart as ChartIcon,
  Zap,
  Compass,
  FileText
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

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentResume } = useSelector(state => state.resume);
  
  const [activeTab, setActiveTab] = useState('content');
  const [showPreview, setShowPreview] = useState(true);
  const [showAI, setShowAI] = useState(false);

  useEffect(() => {
    if (id) {
      const resume = mockDatabaseService.getResumeById(id);
      if (resume) {
        dispatch(setResume(resume));
      }
    }
  }, [id, dispatch]);

  const handleSave = () => {
    mockDatabaseService.saveResume(currentResume);
    alert('Resume saved successfully!');
  };

  const handleExport = async () => {
    const filename = `${currentResume.basics.name?.replace(/\s+/g, '_') || 'my'}_resume.pdf`;
    await exportToPDF(currentResume, filename);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* Top Navigation */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-30 shadow-sm no-print">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="h-6 w-px bg-slate-200 mx-2" />
          <input 
            type="text" 
            value={currentResume.title}
            onChange={(e) => dispatch(setResume({ ...currentResume, title: e.target.value }))}
            className="text-lg font-bold text-slate-900 border-none bg-transparent focus:ring-0 w-64 p-0"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl mr-4 overflow-x-auto max-w-[500px] scrollbar-hide">
            {[
              { id: 'content', label: 'Content', icon: FileText },
              { id: 'templates', label: 'Themes', icon: Layout },
              { id: 'scoring', label: 'ATS Score', icon: ChartIcon },
              { id: 'optimizer', label: 'Optimizer', icon: Zap },
              { id: 'advisor', label: 'Advisor', icon: Compass },
              { id: 'letter', label: 'Cover Letter', icon: Sparkles }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-white shadow-sm text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => setShowAI(!showAI)}
            className={`btn-secondary gap-2 border-primary-200 text-primary-600 ${showAI ? 'bg-primary-50' : ''}`}
          >
            <Sparkles size={18} />
          </button>
          
          <button onClick={handleSave} className="btn-secondary gap-2 border-slate-200">
            <Save size={18} />
          </button>
          
          <button onClick={handleExport} className="btn-primary gap-2 shadow-primary-200">
            <Download size={18} /> Export
          </button>
        </div>
      </header>
      
      {/* Editor Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editing Area */}
        <div className={`flex-1 overflow-y-auto bg-white transition-all duration-500 no-print ${showPreview ? 'w-1/2 border-r border-slate-200' : 'w-full'}`}>
          <div className="max-w-3xl mx-auto py-12 px-10">
            <AnimatePresence mode="wait">
              {activeTab === 'content' && (
                <motion.div key="content" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <EditorForm />
                </motion.div>
              )}
              {activeTab === 'templates' && (
                <motion.div key="templates" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <TemplateSwitcher />
                </motion.div>
              )}
              {activeTab === 'scoring' && (
                <motion.div key="scoring" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <ATSScoring />
                </motion.div>
              )}
              {activeTab === 'optimizer' && (
                <motion.div key="optimizer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <KeywordOptimizer />
                </motion.div>
              )}
              {activeTab === 'advisor' && (
                <motion.div key="advisor" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <ResumeAdvisor />
                </motion.div>
              )}
              {activeTab === 'letter' && (
                <motion.div key="letter" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <CoverLetterGenerator />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Preview Area */}
        {showPreview && (
          <div className="flex-1 bg-slate-100 overflow-y-auto py-12 px-10">
            <div className="max-w-A4 mx-auto sticky top-0">
              <ResumePreview />
            </div>
          </div>
        )}
        
        {/* Preview Toggle */}
        <button 
          onClick={() => setShowPreview(!showPreview)}
          className="fixed bottom-8 right-8 w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group no-print"
        >
          {showPreview ? <EyeOff size={24} /> : <Eye size={24} />}
          <span className="absolute right-16 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Toggle Live Preview
          </span>
        </button>
      </div>

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
