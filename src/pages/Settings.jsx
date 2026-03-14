import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Globe, ChevronRight, Camera, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const Section = ({ title, children }) => (
  <div className="card-premium p-6 mb-5">
    <h3 className="text-base font-bold text-slate-800 mb-5 pb-4 border-b border-slate-100">{title}</h3>
    {children}
  </div>
);

const SettingsPage = () => {
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({ name: 'Atif Maqsood', email: 'atif@example.com', title: 'Senior Software Engineer', location: 'Lahore, Pakistan' });
  const [notifications, setNotifications] = useState({ views: true, downloads: true, weekly: false });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 mt-1.5 text-sm">Manage your account preferences and profile.</p>
      </motion.div>

      {/* Profile */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Section title="Profile">
          <div className="flex items-center gap-5 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {profile.name.charAt(0)}
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full border border-slate-200 shadow flex items-center justify-center text-slate-600 hover:bg-slate-50">
                <Camera size={14} />
              </button>
            </div>
            <div>
              <p className="font-bold text-slate-900">{profile.name}</p>
              <p className="text-sm text-slate-500">{profile.email}</p>
              <span className="badge-primary mt-1 text-xs">Premium Plan</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Full Name', field: 'name', type: 'text' },
              { label: 'Email', field: 'email', type: 'email' },
              { label: 'Job Title', field: 'title', type: 'text' },
              { label: 'Location', field: 'location', type: 'text' },
            ].map(f => (
              <div key={f.field}>
                <label className="label">{f.label}</label>
                <input type={f.type} value={profile[f.field]} onChange={e => setProfile(p => ({ ...p, [f.field]: e.target.value }))} className="input-field" />
              </div>
            ))}
          </div>
        </Section>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Section title="Notifications">
          {[
            { key: 'views', label: 'Resume Views', desc: 'Notify when someone views your resume' },
            { key: 'downloads', label: 'Downloads', desc: 'Notify when someone downloads your PDF' },
            { key: 'weekly', label: 'Weekly Report', desc: 'Receive a weekly analytics summary' },
          ].map(n => (
            <div key={n.key} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
              <div>
                <p className="text-sm font-semibold text-slate-700">{n.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{n.desc}</p>
              </div>
              <button onClick={() => setNotifications(p => ({ ...p, [n.key]: !p[n.key] }))}
                className={`w-12 h-6 rounded-full transition-all ${notifications[n.key] ? 'bg-primary-600' : 'bg-slate-200'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform mx-0.5 ${notifications[n.key] ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          ))}
        </Section>
      </motion.div>

      {/* Appearance */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Section title="Appearance">
          {[
            { icon: Palette, label: 'Theme',    desc: 'Light mode active',   action: 'Switch to Dark' },
            { icon: Globe,   label: 'Language', desc: 'English (US)',         action: 'Change' },
            { icon: Shield,  label: 'Privacy',  desc: 'Profile is public',    action: 'Manage' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500">
                  <item.icon size={17} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
              </div>
              <button className="text-xs font-bold text-primary-600 flex items-center gap-1 hover:underline">
                {item.action} <ChevronRight size={13} />
              </button>
            </div>
          ))}
        </Section>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        onClick={handleSave}
        className={`btn-primary w-full py-3 text-base ${saved ? 'bg-emerald-600 hover:bg-emerald-600' : ''}`}
      >
        {saved ? <><Check size={18} /> Saved!</> : 'Save Changes'}
      </motion.button>
    </div>
  );
};

export default SettingsPage;
