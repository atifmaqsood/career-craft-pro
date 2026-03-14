import React from 'react';

const MinimalTemplate = ({ data }) => {
  const { basics, sections, settings } = data;
  const experience = sections.find(s => s.id === 'experience')?.items || [];
  const skills = sections.find(s => s.id === 'skills')?.items || [];
  const education = sections.find(s => s.id === 'education')?.items || [];

  return (
    <div 
      className="bg-white p-16 flex flex-col min-h-full"
      style={{ fontFamily: settings.font, fontSize: settings.spacing === 'compact' ? '0.8rem' : settings.spacing === 'relaxed' ? '1rem' : '0.9rem' }}
    >
      <header className="mb-14">
        <h1 className="text-3xl font-light text-slate-900 tracking-tight">{basics.name || 'Your Name'}</h1>
        <div className="flex gap-4 mt-4 text-[11px] text-slate-400 font-medium">
          {basics.email && <span>{basics.email}</span>}
          <span className="text-slate-200">/</span>
          {basics.phone && <span>{basics.phone}</span>}
          <span className="text-slate-200">/</span>
          {basics.location && <span>{basics.location}</span>}
        </div>
      </header>

      <div className="space-y-12">
        <section>
          <div className="flex">
            <h2 className="w-32 shrink-0 text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em]">Summary</h2>
            <div className="flex-1 text-slate-600 leading-relaxed font-light whitespace-pre-wrap">{basics.summary || 'Summary goes here...'}</div>
          </div>
        </section>

        <section>
          <div className="flex">
            <h2 className="w-32 shrink-0 text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em]">Experience</h2>
            <div className="flex-1 space-y-8">
              {experience.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-semibold text-slate-800">{item.company}</h3>
                    <span className="text-[10px] text-slate-400 tabular-nums">{item.startDate} — {item.endDate}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">{item.position}</p>
                  <div className="mt-4 text-sm text-slate-500 font-light leading-relaxed whitespace-pre-wrap">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Sections */}
        {sections.filter(s => !['basics', 'experience', 'education', 'skills'].includes(s.id)).map(section => (
          <section key={section.id}>
            <div className="flex">
              <h2 className="w-32 shrink-0 text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em]">{section.title}</h2>
              <div className="flex-1 space-y-8">
                {section.items.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-sm font-semibold text-slate-800">{item.title}</h3>
                    <div className="mt-2 text-sm text-slate-500 font-light leading-relaxed whitespace-pre-wrap">
                      {item.content || item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section>
          <div className="flex">
            <h2 className="w-32 shrink-0 text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em]">Skills</h2>
            <div className="flex-1 flex flex-wrap gap-x-6 gap-y-2">
              {skills.map((skill, i) => (
                <span key={i} className="text-xs text-slate-600 font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex">
            <h2 className="w-32 shrink-0 text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em]">Education</h2>
            <div className="flex-1 space-y-4">
              {education.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-semibold text-slate-800">{item.degree}</h3>
                    <span className="text-[10px] text-slate-400 tabular-nums">{item.endDate}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">{item.institution}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MinimalTemplate;
