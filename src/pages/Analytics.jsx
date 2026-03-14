import React from 'react';
import { BarChart3, TrendingUp, Eye, Download, Share2, Clock, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const data = [
  { day: 'Mon', views: 12 }, { day: 'Tue', views: 28 }, { day: 'Wed', views: 19 },
  { day: 'Thu', views: 35 }, { day: 'Fri', views: 42 }, { day: 'Sat', views: 31 }, { day: 'Sun', views: 20 },
];
const maxViews = Math.max(...data.map(d => d.views));

const stats = [
  { label: 'Total Views',     value: '2,847', icon: Eye,       delta: '+12%', color: 'text-sky-600',     bg: 'bg-sky-50' },
  { label: 'Downloads',       value: '341',   icon: Download,  delta: '+8%',  color: 'text-violet-600',  bg: 'bg-violet-50' },
  { label: 'Active Shares',   value: '57',    icon: Share2,    delta: '+24%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Profile Viewers', value: '1,204', icon: Users,     delta: '+5%',  color: 'text-rose-600',    bg: 'bg-rose-50' },
];

const Analytics = () => (
  <div className="p-8 max-w-5xl mx-auto">
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Analytics</h1>
      <p className="text-slate-500 mt-1.5 text-sm">Track how your resume is performing across platforms.</p>
    </motion.div>

    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {stats.map((s, i) => (
        <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="card-premium p-5">
          <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center mb-3`}>
            <s.icon size={20} />
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{s.label}</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{s.value}</p>
          <p className={`text-xs font-bold mt-1 flex items-center gap-1 ${s.color}`}>
            <TrendingUp size={11} /> {s.delta} this month
          </p>
        </motion.div>
      ))}
    </div>

    {/* Chart */}
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card-premium p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Weekly Views</h2>
          <p className="text-sm text-slate-400">Last 7 days of resume views</p>
        </div>
        <div className="badge-primary"><BarChart3 size={12} /> This Week</div>
      </div>
      <div className="flex items-end gap-3 h-40">
        {data.map((d, i) => (
          <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(d.views / maxViews) * 100}%` }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.5, ease: 'easeOut' }}
              className="w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-xl"
              style={{ minHeight: 4 }}
            />
            <span className="text-[10px] font-bold text-slate-400">{d.day}</span>
          </div>
        ))}
      </div>
    </motion.div>

    {/* Recent Activity */}
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="card-premium p-6">
      <h2 className="text-lg font-bold text-slate-800 mb-5">Recent Activity</h2>
      <div className="space-y-4">
        {[
          { icon: Eye,      text: 'Your resume was viewed by a recruiter at Google', time: '2 hours ago',  color: 'bg-sky-50 text-sky-600' },
          { icon: Download, text: 'Resume downloaded from LinkedIn application',      time: '5 hours ago',  color: 'bg-violet-50 text-violet-600' },
          { icon: Share2,   text: 'Public link accessed 12 times today',              time: '1 day ago',    color: 'bg-emerald-50 text-emerald-600' },
          { icon: Zap,      text: 'ATS score improved to 92/100',                    time: '2 days ago',   color: 'bg-amber-50 text-amber-600' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
            <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
              <item.icon size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-700">{item.text}</p>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1"><Clock size={10} /> {item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);

export default Analytics;
