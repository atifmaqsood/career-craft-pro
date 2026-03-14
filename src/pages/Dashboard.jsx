import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  FileText, 
  MoreVertical, 
  Eye, 
  Download, 
  Share2,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { mockDatabaseService } from '../services/mockDatabase';
import { resumeParser } from '../services/resumeParser';
import { setResume } from '../store/slices/resumeSlice';

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
  <div className="card-premium p-6">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold mt-2">{value}</h3>
        {trend && (
          <p className="text-emerald-600 text-xs font-semibold mt-2 flex items-center gap-1">
            <TrendingUp size={12} /> {trend} since last month
          </p>
        )}
      </div>
      <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

const ResumeCard = ({ resume, onDelete }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setResume(resume));
    navigate(`/editor/${resume.id}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-premium group overflow-hidden"
    >
      <div className="aspect-[3/4] bg-slate-100 flex items-center justify-center relative overflow-hidden">
        <FileText className="text-slate-300 w-24 h-24 group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-primary-600/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button 
            onClick={handleEdit}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-xl hover:scale-110 transition-transform"
          >
            <Eye size={20} />
          </button>
          <button 
            onClick={() => {
              const url = `${window.location.origin}/share/${resume.id}`;
              navigator.clipboard.writeText(url);
              alert('Public link copied to clipboard!');
            }}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-xl hover:scale-110 transition-transform"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>
      <div className="p-4 flex justify-between items-center">
        <div>
          <h4 className="font-bold text-slate-800 line-clamp-1">{resume.title}</h4>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <Clock size={12} /> Updated 2 hours ago
          </p>
        </div>
        <button className="text-slate-400 hover:text-slate-600 p-1">
          <MoreVertical size={20} />
        </button>
      </div>
    </motion.div>
  );
};

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
      basics: { name: profile.name, email: profile.email, phone: '', location: '', summary: '' },
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
        title: `Imported - ${file.name.split('.')[0]}`,
        templateId: 'modern',
        basics: extractedData.basics,
        sections: [
          { id: 'basics', title: 'Personal Info', type: 'basics' },
          { id: 'experience', title: 'Experience', type: 'list', items: extractedData.experience },
          { id: 'education', title: 'Education', type: 'list', items: extractedData.education },
          { id: 'skills', title: 'Skills', type: 'tags', items: extractedData.skills }
        ],
        settings: { color: '#0ea5e9', font: 'Inter', spacing: 'medium' }
      };
      mockDatabaseService.saveResume(newResume);
      dispatch(setResume(newResume));
      navigate(`/editor/${newResume.id}`);
    } catch (error) {
      console.error('Import failed', error);
      alert('Failed to parse resume. Please try again.');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Welcome back, {profile.name}!</h1>
          <p className="text-slate-500 mt-2">Manage your professional identity and track your performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="btn-secondary px-6 cursor-pointer">
            <FileText size={20} /> {isImporting ? 'Parsing...' : 'Import Resume'}
            <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleImport} disabled={isImporting} />
          </label>
          <button 
            onClick={handleCreateNew}
            className="btn-primary px-6"
          >
            <Plus size={20} /> Create New Resume
          </button>
        </div>
      </header>
      
      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard 
          title="Total Views" 
          value={analytics.views} 
          icon={Eye} 
          trend="12%" 
          color="primary" 
        />
        <StatCard 
          title="Total Downloads" 
          value={analytics.downloads} 
          icon={Download} 
          trend="8%" 
          color="accent" 
        />
        <StatCard 
          title="Active Shares" 
          value={analytics.shares} 
          icon={Share2} 
          trend="24%" 
          color="slate" 
        />
      </div>
      
      {/* Resumes List */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Your Resumes</h2>
          <button className="text-primary-600 font-semibold text-sm hover:underline">View All</button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Create New Placeholder */}
          <button 
            onClick={handleCreateNew}
            className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 text-slate-400 hover:border-primary-400 hover:text-primary-500 hover:bg-primary-50 transition-all duration-300 aspect-[3/4]"
          >
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Plus size={32} />
            </div>
            <span className="font-semibold text-lg">Create New</span>
          </button>
          
          {resumes.map(resume => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
