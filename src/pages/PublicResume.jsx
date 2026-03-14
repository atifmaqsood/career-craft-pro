import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Zap, Download, Share2, ChevronLeft } from 'lucide-react';
import { mockDatabaseService } from '../services/mockDatabase';
import ResumePreview from '../components/preview/ResumePreview';
import { useDispatch } from 'react-redux';
import { setResume } from '../store/slices/resumeSlice';

const PublicResume = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [resume, setResumeState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from a public API
    const data = mockDatabaseService.getResumeById(id);
    if (data) {
      setResumeState(data);
      dispatch(setResume(data));
      // Increment views count
      mockDatabaseService.incrementMetric('views');
    }
    setLoading(false);
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <p className="text-slate-500 font-bold">Loading Resume...</p>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-6xl font-black text-slate-200 mb-4 font-display">404</h1>
          <p className="text-slate-500 mb-8">This resume page doesn't exist or has been made private.</p>
          <Link to="/" className="btn-primary">
            <ChevronLeft size={20} /> Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 pb-20">
      {/* Public Header */}
      <nav className="h-16 bg-white/10 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-8 sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
            <Zap size={18} fill="currentColor" />
          </div>
          <span className="text-white font-black text-lg">CareerCraft</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <button className="text-white/70 hover:text-white transition-colors">
            <Share2 size={20} />
          </button>
          <button className="btn-primary py-2 text-sm">
            <Download size={18} /> Download PDF
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto mt-12 px-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
          <ResumePreview />
        </div>
        
        <div className="mt-12 text-center text-white/40 text-xs font-medium flex flex-col items-center gap-4">
          <p>Powered by CareerCraft Pro AI Resume Builder</p>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-primary-400">Build your own</Link>
            <Link to="/" className="hover:text-primary-400">Templates</Link>
            <Link to="/" className="hover:text-primary-400">Pricing</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicResume;
