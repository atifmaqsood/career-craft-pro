import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Lock, User, ArrowRight, Sparkles, AlertCircle, 
  CheckCircle2, Zap, Layout, BarChart, ShieldCheck, 
  Star, Quote, Github
} from 'lucide-react';
import { mockDatabaseService } from '../services/mockDatabase';
import { setAuth } from '../store/slices/authSlice';

const FeatureItem = ({ icon: Icon, title, desc }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    className="flex gap-4 items-start"
  >
    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 shadow-lg">
      <Icon size={20} className="text-white" />
    </div>
    <div>
      <h4 className="text-white font-bold">{title}</h4>
      <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise(r => setTimeout(r, 1000));

    let result;
    if (isLogin) {
      result = mockDatabaseService.login(formData.email, formData.password);
    } else {
      result = mockDatabaseService.signup(formData.name, formData.email, formData.password);
    }

    if (result.success) {
      dispatch(setAuth(result.user));
      navigate('/');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-white overflow-hidden font-sans">
      
      {/* ── Visual Sidebar (Hidden on mobile) ── */}
      <div className="hidden lg:flex w-1/2 relative bg-[#0f172a] overflow-hidden flex-col justify-between p-12">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-primary-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-accent-600/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        </div>

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
            <Zap size={20} className="text-white fill-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">CareerCraft <span className="text-primary-400">Pro</span></span>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-lg">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white leading-[1.1] mb-8 tracking-tight"
          >
            The world's most <span className="text-primary-400">powerful</span> resume engine.
          </motion.h2>
          
          <div className="space-y-8">
            <FeatureItem 
              icon={Sparkles} 
              title="AI Content Generation" 
              desc="Leverage the latest GPT models to craft compelling bullet points and professional summaries in seconds." 
            />
            <FeatureItem 
              icon={Layout} 
              title="Industry-Standard Templates" 
              desc="10+ meticulously designed templates optimized for both human eyes and ATS software." 
            />
            <FeatureItem 
              icon={BarChart} 
              title="Real-time Analytics" 
              desc="Track who views and downloads your resume with specialized sharing links and high-res exports." 
            />
          </div>
        </div>

        {/* Testimonial */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          <Quote className="text-primary-500 mb-4" size={24} />
          <p className="text-white/80 text-lg italic leading-relaxed mb-4">
            "This tool helped me secure interviews at Google and Stripe within two weeks. The ATS optimization is a game changer."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white text-sm">JS</div>
            <div>
              <p className="text-white font-bold text-sm">James Sutherland</p>
              <p className="text-white/40 text-xs">Senior Engineer at Vercel</p>
            </div>
            <div className="ml-auto flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Form Section ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="absolute lg:hidden top-8 left-8 flex items-center gap-2">
           <Zap size={20} className="text-primary-600 fill-primary-600" />
           <span className="font-bold text-slate-900 tracking-tight">CareerCraft Pro</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              {isLogin ? 'Welcome back' : 'Start your journey'}
            </h1>
            <p className="text-slate-500 font-medium">
              {isLogin ? 'Enter your credentials to access your dashboard.' : 'The first step towards your dream career starts here.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                    <input 
                      type="text" 
                      required 
                      className="input-field pl-12 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all" 
                      placeholder="Atif Maqsood"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                <input 
                  type="email" 
                  required 
                  className="input-field pl-12 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all" 
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Password</label>
                {isLogin && <button type="button" className="text-xs font-bold text-primary-600 hover:text-primary-700">Forgot password?</button>}
              </div>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                <input 
                  type="password" 
                  required 
                  className="input-field pl-12 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all" 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-red-50 text-red-600 text-sm font-bold flex items-center gap-3 border border-red-100"
              >
                <AlertCircle size={18} /> {error}
              </motion.div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full h-14 text-base font-bold shadow-xl shadow-primary-500/20 active:scale-[0.98] transition-all"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   <span>Authenticating...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {isLogin ? 'Sign In' : 'Create Free Account'} <ArrowRight size={20} />
                </span>
              )}
            </button>
          </form>

          <div className="mt-12">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-slate-400 font-bold tracking-widest">or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <button className="flex items-center justify-center gap-2 h-12 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-slate-700 transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 h-12 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-slate-700 transition-colors">
                <Github size={20} /> GitHub
              </button>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-slate-500 font-medium">
              {isLogin ? "New to CareerCraft?" : "Already have an account?"}{' '}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="font-bold text-primary-600 hover:text-primary-700 underline"
              >
                {isLogin ? 'Sign up for free' : 'Sign in back'}
              </button>
            </p>
          </div>

          <div className="mt-16 flex items-center justify-center gap-6">
             <div className="flex items-center gap-1.5 grayscale opacity-50">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Enterprise Secure</span>
             </div>
             <div className="flex items-center gap-1.5 grayscale opacity-50">
                <CheckCircle2 size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">GDPR Compliant</span>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
