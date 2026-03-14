import React from 'react';

const FunctionalTemplate = ({ data }) => {
  const { basics, sections, settings } = data;
  const experience = sections.find(s => s.id === 'experience')?.items || [];
  const skills = sections.find(s => s.id === 'skills')?.items || [];
  const education = sections.find(s => s.id === 'education')?.items || [];
  const otherSections = sections.filter(s => !['basics', 'experience', 'education', 'skills'].includes(s.id));

  return (
    <div className="min-h-full bg-white flex" style={{ fontFamily: settings.font }}>
      {/* Dynamic Content Area (Left) */}
      <div className="flex-1 p-12 pr-6 border-r-2 border-slate-50">
        <header className="mb-12 border-b-2 border-slate-50 pb-10">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">{basics.name}</h1>
          <p className="text-lg font-bold uppercase tracking-widest leading-none" style={{ color: settings.color }}>{basics.title}</p>
          <div className="flex gap-4 mt-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>{basics.email}</span>
            <span>•</span>
            <span>{basics.phone}</span>
            <span>•</span>
            <span>{basics.location}</span>
          </div>
        </header>

        <section className="mb-12">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 mb-6 font-bold">Summary</h2>
          <p className="text-sm font-medium text-slate-600 leading-relaxed border-l-4 pl-6" style={{ borderColor: settings.color }}>{basics.summary}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 mb-8 font-bold">Experience</h2>
          <div className="space-y-12">
            {experience.map((item, i) => (
              <div key={i} className="relative">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-black text-slate-800 leading-none">{item.company}</h3>
                  <span className="text-[10px] font-black text-slate-300 uppercase shrink-0 mt-1">{item.startDate} — {item.endDate}</span>
                </div>
                <p className="text-[11px] font-black uppercase tracking-wider mb-4" style={{ color: settings.color }}>{item.position}</p>
                <div className="text-slate-500 text-xs leading-relaxed whitespace-pre-wrap pl-4 border-l border-slate-100">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {otherSections.map(section => (
          <section key={section.id} className="mb-12">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 mb-8 font-bold">{section.title}</h2>
            <div className="space-y-8">
              {section.items.map((item, i) => (
                <div key={i}>
                  <h3 className="text-lg font-black text-slate-800 leading-none mb-2">{item.title || item.company}</h3>
                  <div className="text-slate-500 text-xs leading-relaxed whitespace-pre-wrap pl-4 border-l border-slate-100">
                    {item.content || item.description}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Structured Sidebar (Right) */}
      <div className="w-[280px] bg-slate-50/50 p-12 pl-6 flex flex-col gap-16 shrink-0">
        <section>
          <div className="flex flex-col gap-10">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Skills</h2>
            <div className="flex flex-col gap-8">
              {skills.map((skill, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-800 leading-none">{skill}</span>
                  <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full w-4/5 rounded-full" style={{ backgroundColor: settings.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-10">Education</h2>
          <div className="space-y-8">
            {education.map((edu, i) => (
              <div key={i} className="group">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-800 mb-1 group-hover:translate-x-1 transition-transform">{edu.degree}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-2">{edu.institution}</p>
                <span className="text-[9px] font-black uppercase text-slate-200">{edu.startDate} — {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FunctionalTemplate;
