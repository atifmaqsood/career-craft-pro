import React from 'react';

const ProfessionalTemplate = ({ data }) => {
  const { basics, sections, settings } = data;
  const experience = sections.find(s => s.id === 'experience')?.items || [];
  const skills = sections.find(s => s.id === 'skills')?.items || [];
  const education = sections.find(s => s.id === 'education')?.items || [];
  const otherSections = sections.filter(s => !['basics', 'experience', 'education', 'skills'].includes(s.id));

  return (
    <div className="min-h-full bg-white text-slate-900 p-12" style={{ fontFamily: settings.font }}>
      {/* Header - Single Column FAANG Style */}
      <div className="text-center mb-10 pb-10 border-b-2 border-slate-100">
        <h1 className="text-5xl font-bold tracking-tight text-slate-800">{basics.name}</h1>
        <p className="text-xl font-medium mt-2" style={{ color: settings.color }}>{basics.title}</p>
        <div className="flex justify-center gap-6 mt-6 text-sm font-semibold text-slate-500">
          <span>{basics.email}</span>
          <span>{basics.phone}</span>
          <span>{basics.location}</span>
        </div>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-lg font-bold uppercase tracking-widest mb-4 border-l-4 pl-4" style={{ borderColor: settings.color }}>Summary</h2>
          <p className="text-slate-600 leading-relaxed text-base whitespace-pre-wrap">{basics.summary}</p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-l-4 pl-4" style={{ borderColor: settings.color }}>Experience</h2>
          <div className="space-y-8">
            {experience.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-bold bg-slate-50 px-3 py-1 rounded-lg">{item.company}</h3>
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-tighter">{item.startDate} — {item.endDate}</span>
                </div>
                <p className="font-bold text-slate-600 mb-3 px-3">{item.position}</p>
                <div className="text-slate-600 space-y-2 whitespace-pre-wrap leading-relaxed px-3">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {otherSections.map(section => (
          <section key={section.id}>
            <h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-l-4 pl-4" style={{ borderColor: settings.color }}>{section.title}</h2>
            <div className="grid grid-cols-2 gap-8">
              {section.items.map((item, i) => (
                <div key={i} className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="font-bold text-slate-800 text-lg mb-2">{item.title || item.company}</h3>
                  <div className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">
                    {item.content || item.description}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="grid grid-cols-2 gap-12 pt-8 border-t border-slate-100">
          <section>
            <h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-l-4 pl-4" style={{ borderColor: settings.color }}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs uppercase tracking-tight">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-l-4 pl-4" style={{ borderColor: settings.color }}>Education</h2>
            <div className="space-y-6">
              {education.map((edu, i) => (
                <div key={i}>
                  <h3 className="font-bold text-slate-800">{edu.degree}</h3>
                  <p className="text-sm text-slate-500 font-medium">{edu.institution}</p>
                  <p className="text-xs text-slate-400 mt-1 font-bold">{edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
