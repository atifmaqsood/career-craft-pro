import React from 'react';

const ExecutiveTemplate = ({ data }) => {
  const { basics, sections, settings } = data;
  const experience = sections.find(s => s.id === 'experience')?.items || [];
  const skills = sections.find(s => s.id === 'skills')?.items || [];
  const education = sections.find(s => s.id === 'education')?.items || [];
  const otherSections = sections.filter(s => !['basics', 'experience', 'education', 'skills'].includes(s.id));

  return (
    <div className="min-h-full bg-white p-16 border-[12px] border-slate-50" style={{ fontFamily: settings.font }}>
      {/* Executive Header */}
      <div className="border-b-4 pb-12 mb-12" style={{ borderColor: settings.color }}>
        <h1 className="text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">{basics.name}</h1>
        <div className="flex justify-between items-end mt-8">
          <p className="text-2xl font-light text-slate-500 max-w-md italic">{basics.title}</p>
          <div className="flex items-end gap-5">
            <div className="text-right space-y-1">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-[.25em]">{basics.location}</p>
              <p className="text-sm font-medium text-slate-800">{basics.email}</p>
              <p className="text-sm font-medium text-slate-800">{basics.phone}</p>
            </div>
            {basics.photo && (
              <img src={basics.photo} alt={basics.name} className="w-20 h-20 rounded-full object-cover border-4 border-slate-100 shadow-xl" />
            )}
          </div>
        </div>
      </div>


      <div className="space-y-16">
        <section>
          <div className="flex gap-12">
            <div className="w-1/4">
              <h2 className="text-sm font-black uppercase tracking-[.3em] text-slate-300">Profile</h2>
            </div>
            <div className="w-3/4">
              <p className="text-xl font-light leading-relaxed text-slate-700 italic border-l-2 pl-8 border-slate-100 whitespace-pre-wrap">{basics.summary}</p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex gap-12">
            <div className="w-1/4">
              <h2 className="text-sm font-black uppercase tracking-[.3em] text-slate-300">Experience</h2>
            </div>
            <div className="w-3/4 space-y-12">
              {experience.map((item, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:translate-x-1 transition-transform">{item.company}</h3>
                    <span className="text-sm font-black text-slate-300 uppercase">{item.startDate} // {item.endDate}</span>
                  </div>
                  <p className="text-lg font-bold uppercase tracking-widest mb-4" style={{ color: settings.color }}>{item.position}</p>
                  <div className="text-slate-600 whitespace-pre-wrap leading-relaxed border-l-2 border-slate-50 pl-6">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {otherSections.map(section => (
          <section key={section.id}>
            <div className="flex gap-12">
              <div className="w-1/4">
                <h2 className="text-sm font-black uppercase tracking-[.3em] text-slate-300">{section.title}</h2>
              </div>
              <div className="w-3/4 space-y-10">
                {section.items.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{item.title || item.company}</h3>
                    <div className="text-slate-600 whitespace-pre-wrap leading-relaxed border-l-2 border-slate-50 pl-6 text-sm">
                      {item.content || item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="bg-slate-900 text-white -mx-16 p-16">
          <div className="flex gap-12">
            <div className="w-1/4">
              <h2 className="text-sm font-black uppercase tracking-[.3em] opacity-30">Skills</h2>
            </div>
            <div className="w-3/4">
              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                {skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: settings.color }} />
                    <span className="font-bold text-sm tracking-widest uppercase opacity-80">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex gap-12">
            <div className="w-1/4">
              <h2 className="text-sm font-black uppercase tracking-[.3em] text-slate-300">Education</h2>
            </div>
            <div className="w-3/4 grid grid-cols-2 gap-12">
              {education.map((edu, i) => (
                <div key={i}>
                  <h3 className="font-bold text-slate-900 text-lg uppercase tracking-tight">{edu.degree}</h3>
                  <p className="text-slate-500 font-bold mt-1 uppercase tracking-tighter text-sm">{edu.institution}</p>
                  <p className="text-xs font-black mt-2 tracking-widest opacity-30 uppercase">{edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
