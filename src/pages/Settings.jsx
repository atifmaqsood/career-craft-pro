import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User, Bell, Shield, Palette, Globe, ChevronRight, Camera, Check, LogOut, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockDatabaseService } from '../services/mockDatabase';
import { updateAuthUser, logoutAction } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Section = ({ title, children }) => (
  <div className="card-premium p-6 mb-5">
    <h3 className="text-base font-bold text-slate-800 mb-5 pb-4 border-b border-slate-100">{title}</h3>
    {children}
  </div>
);

const SettingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { user } = useSelector(state => state.auth);
  
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    title: user?.title || 'Professional User',
    location: user?.location || 'Global',
    photo: user?.photo || ''
  });
  
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({ views: true, downloads: true, weekly: false });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    // Mimic API delay
    await new Promise(r => setTimeout(r, 600));
    
    const updatedUser = mockDatabaseService.updateUserProfile(profile);
    if (updatedUser) {
      dispatch(updateAuthUser(updatedUser));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    mockDatabaseService.logout();
    dispatch(logoutAction());
    navigate('/auth');
  };

  return (
    <div className="p-8 max-w-3xl mx-auto pb-24">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
          <p className="text-slate-500 mt-1.5 text-sm">Manage your account preferences and profile.</p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 font-bold text-sm transition-colors border border-transparent hover:border-red-100"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </motion.div>

      {/* Profile */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Section title="Profile Information">
          <div className="flex items-center gap-6 mb-8 p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50">
            <div className="relative group">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white shadow-xl overflow-hidden ring-4 ring-white">
                {profile.photo ? (
                  <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-bold">{profile.name.charAt(0)}</span>
                )}
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 w-9 h-9 bg-white rounded-xl border border-slate-200 shadow-xl flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-all hover:scale-110"
              >
                <Camera size={18} />
              </button>
              <input 
                type="file" 
                hidden 
                ref={fileInputRef} 
                accept="image/*" 
                onChange={handlePhotoUpload} 
              />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-slate-900 leading-tight">{profile.name}</h4>
              <p className="text-sm text-slate-500 font-medium">{profile.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="badge-primary py-0.5 px-2 text-[10px] uppercase font-bold tracking-wider">
                  {user?.plan || 'Free'} Plan
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Member since 2026</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="label">Full Name</label>
              <input 
                type="text" 
                value={profile.name} 
                onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} 
                className="input-field" 
              />
            </div>
            <div>
              <label className="label">Email Address</label>
              <input 
                type="email" 
                value={profile.email} 
                disabled
                className="input-field bg-slate-50 cursor-not-allowed opacity-70" 
              />
            </div>
            <div>
              <label className="label">Job Title / Headline</label>
              <input 
                type="text" 
                value={profile.title} 
                onChange={e => setProfile(p => ({ ...p, title: e.target.value }))} 
                className="input-field" 
                placeholder="e.g. Senior Product Designer"
              />
            </div>
            <div>
              <label className="label">Location</label>
              <input 
                type="text" 
                value={profile.location} 
                onChange={e => setProfile(p => ({ ...p, location: e.target.value }))} 
                className="input-field" 
                placeholder="e.g. London, UK"
              />
            </div>
          </div>
        </Section>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Section title="Notification Preferences">
          {[
            { key: 'views', label: 'Profile Views', desc: 'Get notified when potential employers view your profile' },
            { key: 'downloads', label: 'PDF Downloads', desc: 'Receive alerts when your resume is downloaded' },
            { key: 'weekly', label: 'Weekly Performance', desc: 'A weekly summary of your resume analytics' },
          ].map(n => (
            <div key={n.key} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0 group">
              <div className="max-w-[80%]">
                <p className="text-sm font-bold text-slate-700">{n.label}</p>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{n.desc}</p>
              </div>
              <button 
                onClick={() => setNotifications(p => ({ ...p, [n.key]: !p[n.key] }))}
                className={`w-11 h-6 rounded-full transition-all flex items-center p-1 ${notifications[n.key] ? 'bg-primary-600' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${notifications[n.key] ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          ))}
        </Section>
      </motion.div>

      {/* Security & System */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Section title="Security & Preferences">
          {[
            { icon: Shield,  label: 'Password & Security', desc: 'Last updated 3 months ago', action: 'Update' },
            { icon: Globe,   label: 'Interface Language',  desc: 'English (United Kingdom)',   action: 'Change' },
            { icon: Palette, label: 'Visual Theme',         desc: 'Standard Light Mode',      action: 'Change' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0 group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                  <item.icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">{item.label}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
              <button className="text-xs font-bold text-primary-600 flex items-center gap-1 hover:bg-primary-50 px-3 py-1.5 rounded-lg transition-colors">
                {item.action} <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </Section>
      </motion.div>

      {/* Floating Save Button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 z-20">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-2xl transition-all ${
            saved ? 'bg-emerald-600 text-white shadow-emerald-200' : 'bg-slate-900 text-white shadow-slate-200 hover:bg-slate-800'
          }`}
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : saved ? (
            <>
              <Check size={20} /> Changes Saved Successfully
            </>
          ) : (
            'Save Profile Preferences'
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default SettingsPage;
