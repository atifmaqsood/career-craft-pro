import React from 'react';

const CorporateTemplate = ({ data }) => {
  const { basics, sections, settings } = data;
  const experience = sections.find(s => s.id === 'experience')?.items || [];
  const skills = sections.find(s => s.id === 'skills')?.items || [];
  const education = sections.find(s => s.id === 'education')?.items || [];
  const otherSections = sections.filter(s => !['basics', 'experience', 'education', 'skills'].includes(s.id));

  return (
    <div 
      className="bg-white p-12 flex flex-col min-h-full"
      style={{ fontFamily: settings.font, fontSize: settings.spacing === 'compact' ? '0.8rem' : settings.spacing === 'relaxed' ? '1rem' : '0.9rem' }}
    >
      <div className="text-center border-b-2 border-slate-900 pb-8 mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-[0.2em]">{basics.name}</h1>
        <div className="flex justify-center gap-6 mt-4 text-sm font-semibold text-slate-600 uppercase tracking-widest">
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.location && <span>{basics.location}</span>}
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-sm font-bold uppercase tracking-[0.3em] mb-4 text-center text-slate-900 border-b border-slate-100 pb-2">Profile</h2>
        <div className="text-slate-700 leading-relaxed text-center max-w-2xl mx-auto italic whitespace-pre-wrap">{basics.summary}</div>
      </section>

      <section className="mb-8">
        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-200 pb-1 mb-4" style={{ color: settings.color }}>Experience</h2>
        <div className="space-y-6">
          {experience.map((item, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-slate-800">{item.company}</h3>
                <span className="text-xs font-bold text-slate-500">{item.startDate} - {item.endDate}</span>
              </div>
              <p className="text-sm font-semibold text-slate-600 italic mt-0.5">{item.position}</p>
              <div className="mt-2 text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Sections */}
      {otherSections.map(section => (
        <section key={section.id} className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-200 pb-1 mb-4" style={{ color: settings.color }}>{section.title}</h2>
          <div className="space-y-6">
            {section.items.map((item, i) => (
              <div key={i}>
                <h3 className="font-bold text-slate-800 text-sm">{item.title || item.company}</h3>
                <div className="text-sm text-slate-600 mt-1 whitespace-pre-wrap leading-relaxed">
                  {item.content || item.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="grid grid-cols-2 gap-10 mt-auto">
        <section>
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] mb-4 text-slate-900 border-b border-slate-900 pb-1 w-fit">Skills</h2>
          <div className="grid grid-cols-2 gap-y-2 mt-4">
            {skills.map((skill, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                <div className="w-1.5 h-1.5 bg-slate-400 rotate-45 shrink-0" />
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] mb-4 text-slate-900 border-b border-slate-900 pb-1 w-fit">Education</h2>
          <div className="space-y-4 mt-4">
            {education.map((item, i) => (
              <div key={i}>
                <h3 className="text-sm font-bold text-slate-900">{item.degree}</h3>
                <p className="text-xs text-slate-600 mt-1 font-semibold">{item.institution}</p>
                <p className="text-[10px] text-slate-400 mt-1">{item.startDate} - {item.endDate}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CorporateTemplate;
