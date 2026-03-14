import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  LayoutDashboard, 
  FileEdit, 
  Settings, 
  BarChart3, 
  Sparkles,
  Zap,
  ChevronRight,
  Bell,
  Search,
  Crown
} from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/editor', icon: FileEdit, label: 'Resume Builder' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/ai-assistant', icon: Sparkles, label: 'AI Tools' },
];

const SidebarLink = ({ to, icon: Icon, label, active }) => (
  <Link to={to}>
    <motion.div
      whileHover={{ x: 2 }}
      className={active ? 'sidebar-link-active' : 'sidebar-link'}
    >
      <Icon size={18} />
      <span>{label}</span>
      {active && (
        <motion.div
          layoutId="active-indicator"
          className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500"
        />
      )}
    </motion.div>
  </Link>
);

const DashboardLayout = () => {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const { user } = useSelector(state => state.auth);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* ── Sidebar ─────────────────────────────── */}
      <aside className="w-64 shrink-0 border-r border-slate-200/80 bg-white flex flex-col no-print">
        {/* Logo */}
        <div className="px-5 py-6 flex items-center gap-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
            <Zap size={18} className="text-white fill-white" />
          </div>
          <div>
            <span className="font-bold text-slate-900 text-sm">CareerCraft</span>
            <span className="font-bold text-primary-600 text-sm"> Pro</span>
          </div>
        </div>

        {/* Search */}
        <div className="px-3 pt-4 pb-2">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 text-sm hover:border-slate-300 transition-colors"
          >
            <Search size={14} />
            <span className="text-sm">Quick search…</span>
            <span className="ml-auto font-mono text-xs bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded">⌘K</span>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 pt-4 space-y-0.5 overflow-y-auto">
          <p className="section-title px-4 mb-3">Menu</p>
          {navItems.map(item => (
            <SidebarLink
              key={item.to}
              {...item}
              active={item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to)}
            />
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-5 space-y-1">
          <SidebarLink to="/settings" icon={Settings} label="Settings" active={location.pathname === '/settings'} />

          {/* Upgrade card */}
          <div className="mt-3 mx-1 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 relative">
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle at 80% 10%, rgb(14 165 233) 0%, transparent 60%)',
              }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Crown size={14} className="text-amber-400" />
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Premium</span>
              </div>
              <p className="text-white text-sm font-bold leading-snug">All features unlocked</p>
              <p className="text-slate-400 text-xs mt-1">Renews March 2027</p>
              <button className="mt-3 w-full text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl transition-colors font-medium">
                Manage Plan
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-slate-200/80 flex items-center justify-between px-6 shrink-0 no-print">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="text-slate-600 font-medium">CareerCraft Pro</span>
            <ChevronRight size={14} />
            <span className="capitalize">{location.pathname === '/' ? 'Dashboard' : location.pathname.split('/')[1]?.replace('-', ' ')}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-500 border-2 border-white" />
            </button>
            <div className="flex items-center gap-2 ml-2 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold shadow-md overflow-hidden ring-2 ring-slate-50">
                {user?.photo ? (
                  <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user?.name?.charAt(0) || 'A'
                )}
              </div>
              <span className="text-sm font-semibold text-slate-700 hidden sm:block">
                {user?.name?.split(' ')[0] || 'User'}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
