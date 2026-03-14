import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileEdit, 
  Settings, 
  BarChart3, 
  User, 
  Sparkles,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

const SidebarLink = ({ to, icon: Icon, children, active }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? 'bg-primary-50 text-primary-600 font-semibold' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    <Icon size={20} />
    <span>{children}</span>
    {active && (
      <motion.div 
        layoutId="active-pill"
        className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-600"
      />
    )}
  </Link>
);

const DashboardLayout = () => {
  const location = useLocation();
  
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col p-4">
        <div className="flex items-center gap-2 px-4 py-6 mb-8">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-200">
            <Zap className="fill-current" size={24} />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600">
            CareerCraft Pro
          </span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <SidebarLink to="/" icon={LayoutDashboard} active={location.pathname === '/'}>
            Dashboard
          </SidebarLink>
          <SidebarLink to="/editor" icon={FileEdit} active={location.pathname.startsWith('/editor')}>
            Builder
          </SidebarLink>
          <SidebarLink to="/analytics" icon={BarChart3} active={location.pathname === '/analytics'}>
            Analytics
          </SidebarLink>
          <SidebarLink to="/ai-assistant" icon={Sparkles} active={location.pathname === '/ai-assistant'}>
            AI Tools
          </SidebarLink>
        </nav>
        
        <div className="mt-auto pt-4 border-t border-slate-100">
          <SidebarLink to="/settings" icon={Settings} active={location.pathname === '/settings'}>
            Settings
          </SidebarLink>
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative">
            <div className="relative z-10">
              <p className="text-xs text-slate-400 font-medium">YOUR PLAN</p>
              <p className="text-sm font-bold mt-1">Premium Pro</p>
              <button className="mt-3 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">
                Manage Plan
              </button>
            </div>
            <Sparkles className="absolute -bottom-2 -right-2 text-white/10 w-16 h-16" />
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
