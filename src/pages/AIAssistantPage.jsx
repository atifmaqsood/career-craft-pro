import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, Lightbulb, Zap, FileText, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const suggestions = [
  { icon: Lightbulb, text: 'Improve my summary section',         color: 'text-amber-600',   bg: 'bg-amber-50' },
  { icon: TrendingUp, text: 'Make my experience more impactful', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Zap,        text: 'Optimize for ATS systems',          color: 'text-sky-600',     bg: 'bg-sky-50' },
  { icon: FileText,   text: 'Write a cover letter for me',       color: 'text-violet-600',  bg: 'bg-violet-50' },
];

const AIAssistantPage = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm your AI career assistant. I can help you craft a compelling resume, improve your writing, optimize for ATS, and more. What would you like to work on today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async (text) => {
    if (!text.trim()) return;
    const userMsg = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setMessages(prev => [...prev, {
      role: 'assistant',
      text: `Great question! Here's how I'd approach "${text}": Focus on quantifiable achievements, use strong action verbs, and tailor the language to your target role. I can help you expand on any specific section — just let me know!`
    }]);
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto h-full flex flex-col">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-200">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">AI Career Assistant</h1>
            <p className="text-slate-500 text-sm">Powered by advanced AI to supercharge your job search</p>
          </div>
        </div>
      </motion.div>

      {/* Quick suggestions */}
      {messages.length <= 1 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 gap-3 mb-6">
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => send(s.text)}
              className={`flex items-center gap-3 p-4 rounded-2xl border ${s.bg} border-transparent hover:-translate-y-0.5 hover:shadow-md transition-all text-left`}
            >
              <div className={`w-8 h-8 rounded-xl ${s.bg} ${s.color} flex items-center justify-center shrink-0`}>
                <s.icon size={16} />
              </div>
              <span className={`text-sm font-semibold ${s.color}`}>{s.text}</span>
            </button>
          ))}
        </motion.div>
      )}

      {/* Chat */}
      <div className="card-premium flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'bg-gradient-to-br from-violet-500 to-purple-600' : 'bg-gradient-to-br from-primary-500 to-sky-600'}`}>
                  {msg.role === 'assistant' ? <Bot size={16} className="text-white" /> : <User size={16} className="text-white" />}
                </div>
                <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'assistant' ? 'bg-slate-50 text-slate-700 rounded-tl-none' : 'bg-primary-600 text-white rounded-tr-none'}`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {loading && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-slate-50 rounded-2xl rounded-tl-none px-5 py-4 flex gap-1.5">
                  {[0, 0.15, 0.3].map((d, i) => (
                    <motion.div key={i} animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, delay: d, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-slate-400" />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Input */}
        <div className="border-t border-slate-100 p-4 flex gap-3">
          <input
            className="input-field flex-1"
            placeholder="Ask me anything about your resume…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send(input)}
          />
          <button onClick={() => send(input)} disabled={!input.trim() || loading} className="btn-primary px-4">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
