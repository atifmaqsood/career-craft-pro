import React from 'react';

const ModernTemplate = ({ data }) => {
  const { basics, sections, settings } = data;
  const experience = sections.find(s => s.id === 'experience')?.items || [];
  const skills = sections.find(s => s.id === 'skills')?.items || [];
  const education = sections.find(s => s.id === 'education')?.items || [];
  const otherSections = sections.filter(s => !['basics', 'experience', 'education', 'skills'].includes(s.id));

  return (
    <div 
      className="min-h-full bg-white flex flex-col"
      style={{ fontFamily: settings.font, fontSize: settings.spacing === 'compact' ? '0.8rem' : settings.spacing === 'relaxed' ? '1rem' : '0.9rem' }}
    >
      {/* Header */}
      <div 
        className="p-10 text-white"
        style={{ backgroundColor: settings.color }}
      >
        <h1 className="text-4xl font-bold tracking-tight">{basics.name}</h1>
        <p className="mt-2 text-white/80 font-medium">{basics.title}</p>
        <div className="flex flex-wrap gap-4 mt-6 text-sm text-white/90">
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.location && <span>{basics.location}</span>}
        </div>
      </div>

      <div className="flex flex-1">
        {/* Left Column */}
        <div className="w-2/3 p-10 pr-6 border-r border-slate-100">
          <section className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: settings.color }}>Summary</h2>
            <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">{basics.summary}</div>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: settings.color }}>Experience</h2>
            <div className="space-y-6">
              {experience.map((item, i) => (
                <div key={i} className="relative pl-4 border-l-2 border-slate-50">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: settings.color }} />
                  <h3 className="font-bold text-slate-800">{item.company}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm font-semibold text-slate-500">{item.position}</span>
                    <span className="text-xs font-bold text-slate-400 shrink-0 ml-4">{item.startDate} - {item.endDate}</span>
                  </div>
                  <div className="mt-2 text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Dynamic Sections */}
          {otherSections.map(section => (
            <section key={section.id} className="mt-8">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: settings.color }}>{section.title}</h2>
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
        </div>

        {/* Right Column */}
        <div className="w-1/3 p-10 pl-6 bg-slate-50/50">
          <section className="mb-10">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4 text-slate-400">Skills</h2>
            <div className="flex flex-wrap gap-2 text-xs">
              {skills.map((skill, i) => (
                <span 
                  key={i} 
                  className="px-2 py-1 bg-white border border-slate-200 text-slate-700 rounded-md font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4 text-slate-400">Education</h2>
            <div className="space-y-4">
              {education.map((item, i) => (
                <div key={i}>
                  <h3 className="text-sm font-bold text-slate-800">{item.degree}</h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">{item.institution}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{item.startDate} - {item.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
