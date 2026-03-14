import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  ChevronLeft, 
  Eye, 
  EyeOff, 
  Save, 
  Download, 
  Share2,
  Sparkles,
  Layout,
  LineChart as ChartIcon
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

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentResume } = useSelector(state => state.resume);
  
  const [activeTab, setActiveTab] = useState('content'); // content, templates, scoring
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
    const filename = `${currentResume.title.replace(/\s+/g, '_').toLowerCase()}_resume.pdf`;
    await exportToPDF('resume-preview', filename);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* Top Navigation */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-30">
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
          <div className="flex bg-slate-100 p-1 rounded-xl mr-4">
            <button 
              onClick={() => setActiveTab('content')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'content' ? 'bg-white shadow-sm text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Content
            </button>
            <button 
              onClick={() => setActiveTab('templates')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'templates' ? 'bg-white shadow-sm text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Templates
            </button>
            <button 
              onClick={() => setActiveTab('scoring')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'scoring' ? 'bg-white shadow-sm text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              ATS Score
            </button>
          </div>
          
          <button 
            onClick={() => setShowAI(!showAI)}
            className={`btn-secondary gap-2 border-primary-200 text-primary-600 ${showAI ? 'bg-primary-50' : ''}`}
          >
            <Sparkles size={18} /> AI Assist
          </button>
          
          <button onClick={handleSave} className="btn-secondary gap-2">
            <Save size={18} /> Save
          </button>
          
          <button onClick={handleExport} className="btn-primary gap-2">
            <Download size={18} /> Export PDF
          </button>
        </div>
      </header>
      
      {/* Editor Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editing Area */}
        <div className={`flex-1 overflow-y-auto bg-white transition-all duration-300 ${showPreview ? 'w-1/2 border-r border-slate-200' : 'w-full'}`}>
          <div className="max-w-3xl mx-auto py-10 px-8">
            <AnimatePresence mode="wait">
              {activeTab === 'content' && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <EditorForm />
                </motion.div>
              )}
              {activeTab === 'templates' && (
                <motion.div
                  key="templates"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <TemplateSwitcher />
                </motion.div>
              )}
              {activeTab === 'scoring' && (
                <motion.div
                  key="scoring"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <ATSScoring />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Preview Area */}
        {showPreview && (
          <div className="flex-1 bg-slate-100 overflow-y-auto py-10 px-8">
            <div className="max-w-A4 mx-auto">
              <ResumePreview />
            </div>
          </div>
        )}
        
        {/* Preview Toggle */}
        <button 
          onClick={() => setShowPreview(!showPreview)}
          className="fixed bottom-8 right-8 w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40"
        >
          {showPreview ? <EyeOff size={24} /> : <Eye size={24} />}
        </button>
      </div>

      {/* AI Assistant Drawer */}
      <AnimatePresence>
        {showAI && (
          <AIAssistant onClose={() => setShowAI(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Editor;
