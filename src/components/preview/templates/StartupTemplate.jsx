import React from 'react';

const StartupTemplate = ({ data }) => {
  const { basics, sections, settings } = data;
  const experience = sections.find(s => s.id === 'experience')?.items || [];
  const skills = sections.find(s => s.id === 'skills')?.items || [];
  const education = sections.find(s => s.id === 'education')?.items || [];
  const otherSections = sections.filter(s => !['basics', 'experience', 'education', 'skills'].includes(s.id));

  return (
    <div className="min-h-full bg-white flex" style={{ fontFamily: settings.font }}>
      {/* Dynamic Sidebar - Left side FAANG/Startup vibe */}
      <div className="w-[300px] bg-slate-900 text-white p-12 flex flex-col justify-between shrink-0">
        <div>
          <div className="w-20 h-2 bg-white mb-8" style={{ backgroundColor: settings.color }} />
          <h1 className="text-4xl font-black leading-[0.9] tracking-tighter mb-4">
            {basics.name.split(' ')[0]}<br/>
            {basics.name.split(' ').slice(1).join(' ')}
          </h1>
          <p className="font-bold text-xs uppercase tracking-[0.2em] opacity-40 mb-10">{basics.title || 'Full Stack Builder'}</p>
          
          <div className="space-y-6 mt-20">
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mb-4">Contact</h2>
              <div className="space-y-2 text-xs font-bold text-white/70">
                <p className="break-all">{basics.email}</p>
                <p>{basics.phone}</p>
                <p className="leading-relaxed">{basics.location}</p>
              </div>
            </section>

            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mb-6">Stack</h2>
              <div className="flex flex-col gap-3">
                {skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-0.5 flex-1 bg-white/10" />
                    <span className="text-[10px] uppercase font-black tracking-widest text-white/80">{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <section className="mt-20">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mb-6">Academy</h2>
          <div className="space-y-6">
            {education.map((edu, i) => (
              <div key={i}>
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: settings.color }}>{edu.degree}</p>
                <p className="text-[10px] font-bold text-white/50 mt-1 uppercase leading-tight">{edu.institution}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-16 overflow-y-auto">
        <section className="mb-20">
          <p className="text-4xl font-medium text-slate-400 italic leading-[1.3]">&ldquo;{basics.summary}&rdquo;</p>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-xl font-black uppercase tracking-[0.2em] text-slate-800 shrink-0">Experience</h2>
            <div className="h-px w-full bg-slate-100" />
          </div>
          
          <div className="space-y-16">
            {experience.map((item, i) => (
              <div key={i} className="relative">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 leading-none mb-1">{item.company}</h3>
                    <p className="font-black text-xs uppercase tracking-widest" style={{ color: settings.color }}>{item.position}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-slate-300 uppercase leading-none">{item.startDate} — {item.endDate}</span>
                  </div>
                </div>
                <div className="text-slate-500 text-sm leading-relaxed whitespace-pre-wrap max-w-2xl border-l-4 pl-8" style={{ borderColor: settings.color + '20' }}>
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {otherSections.map(section => (
          <section key={section.id} className="mb-16">
            <div className="flex items-center gap-6 mb-12">
              <h2 className="text-xl font-black uppercase tracking-[0.2em] text-slate-800 shrink-0">{section.title}</h2>
              <div className="h-px w-full bg-slate-100" />
            </div>
            
            <div className="space-y-12">
              {section.items.map((item, i) => (
                <div key={i} className="relative">
                  <h3 className="text-xl font-black text-slate-900 mb-2">{item.title || item.company}</h3>
                  <div className="text-slate-500 text-sm leading-relaxed whitespace-pre-wrap max-w-2xl border-l-4 pl-8" style={{ borderColor: settings.color + '20' }}>
                    {item.content || item.description}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default StartupTemplate;
