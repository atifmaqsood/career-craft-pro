import React from 'react';

const ElegantTemplate = ({ data }) => {
  const { basics, sections, settings } = data;
  const experience = sections.find(s => s.id === 'experience')?.items || [];
  const skills = sections.find(s => s.id === 'skills')?.items || [];
  const education = sections.find(s => s.id === 'education')?.items || [];
  const otherSections = sections.filter(s => !['basics', 'experience', 'education', 'skills'].includes(s.id));

  return (
    <div className="min-h-full bg-[#fdfcfb] p-16 flex flex-col items-center" style={{ fontFamily: settings.font }}>
      <div className="max-w-[700px] w-full">
        {/* Elegant Centered Header */}
        <header className="text-center mb-24">
          <h1 className="text-5xl font-light text-slate-900 tracking-[0.15em] uppercase mb-4">{basics.name}<span className="text-primary-500" style={{ color: settings.color }}>*</span></h1>
          <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-[.3em] mb-12">
            <div className="h-px w-8 bg-slate-200" />
            <span>{basics.title}</span>
            <div className="h-px w-8 bg-slate-200" />
          </div>
          <div className="space-y-2 text-sm text-slate-500 font-medium lowercase italic">
            <p>{basics.email} / {basics.phone}</p>
            <p>{basics.location}</p>
          </div>
        </header>

        <section className="mb-24 px-12 text-center">
          <p className="text-xl text-slate-600 leading-[1.8] font-light italic whitespace-pre-wrap">{basics.summary}</p>
        </section>

        <div className="space-y-24">
          <section>
            <div className="flex items-center justify-center gap-10 mb-16">
              <div className="h-px w-full bg-slate-100" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 shrink-0">Experience</h2>
              <div className="h-px w-full bg-slate-100" />
            </div>
            <div className="space-y-16">
              {experience.map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-6 leading-none">{item.startDate} — {item.endDate}</span>
                  <h3 className="text-3xl font-light text-slate-900 mb-2 tracking-tight">{item.company}</h3>
                  <p className="text-sm font-bold uppercase tracking-[.25em] mb-6" style={{ color: settings.color }}>{item.position}</p>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-lg whitespace-pre-wrap">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {otherSections.map(section => (
            <section key={section.id}>
              <div className="flex items-center justify-center gap-10 mb-16">
                <div className="h-px w-full bg-slate-100" />
                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 shrink-0">{section.title}</h2>
                <div className="h-px w-full bg-slate-100" />
              </div>
              <div className="space-y-12 flex flex-col items-center">
                {section.items.map((item, i) => (
                  <div key={i} className="text-center">
                    <h3 className="text-2xl font-light text-slate-900 mb-2 tracking-tight">{item.title || item.company}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-lg whitespace-pre-wrap">
                      {item.content || item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section>
            <div className="flex items-center justify-center gap-10 mb-16">
              <div className="h-px w-full bg-slate-100" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 shrink-0">Skills</h2>
              <div className="h-px w-full bg-slate-100" />
            </div>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 max-w-md mx-auto">
              {skills.map((skill, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-800 leading-none">{skill}</span>
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: settings.color }} />
                </div>
              ))}
            </div>
          </section>

          <section className="pb-16 text-center">
            <div className="flex items-center justify-center gap-10 mb-16">
              <div className="h-px w-full bg-slate-100" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 shrink-0">Education</h2>
              <div className="h-px w-full bg-slate-100" />
            </div>
            <div className="space-y-12">
              {education.map((edu, i) => (
                <div key={i}>
                  <p className="text-xs font-black text-slate-300 uppercase tracking-widest mb-4 leading-none">{edu.startDate} — {edu.endDate}</p>
                  <h3 className="text-xl font-light text-slate-900 mb-1 tracking-tight">{edu.degree}</h3>
                  <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">{edu.institution}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ElegantTemplate;
