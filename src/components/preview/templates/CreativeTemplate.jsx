import React from 'react';

const CreativeTemplate = ({ data }) => {
  const { basics, sections, settings } = data;
  const experience = sections.find(s => s.id === 'experience')?.items || [];
  const skills = sections.find(s => s.id === 'skills')?.items || [];
  const education = sections.find(s => s.id === 'education')?.items || [];

  return (
    <div 
      className="h-full bg-white flex"
      style={{ fontFamily: settings.font, fontSize: settings.spacing === 'compact' ? '0.8rem' : settings.spacing === 'relaxed' ? '1rem' : '0.9rem' }}
    >
      <div 
        className="w-[120px] h-full flex flex-col items-center py-10 gap-12"
        style={{ backgroundColor: settings.color }}
      >
        <div className="w-16 h-16 rounded-full border-2 border-white/50 flex items-center justify-center text-white font-black text-2xl">
          {basics.name?.charAt(0) || '?'}
        </div>
        <div className="flex flex-col gap-10 items-center justify-center">
           <div className="rotate-[-90deg] whitespace-nowrap text-white/40 font-black text-4xl uppercase tracking-[0.3em]">
             EXPERIENCE
           </div>
           <div className="rotate-[-90deg] whitespace-nowrap text-white/40 font-black text-4xl uppercase tracking-[0.3em] mt-24">
             EDUCATION
           </div>
        </div>
      </div>

      <div className="flex-1 p-12 overflow-hidden">
        <header className="mb-12">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">{basics.name || 'Your Name'}</h1>
          <p className="text-xl font-bold mt-2" style={{ color: settings.color }}>Expert UI/UX Designer</p>
          <div className="mt-8 grid grid-cols-3 gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <div>{basics.email}</div>
            <div>{basics.phone}</div>
            <div>{basics.location}</div>
          </div>
        </header>

        <section className="mb-10">
          <p className="text-lg text-slate-600 font-medium leading-relaxed border-l-4 pl-6" style={{ borderColor: settings.color }}>
            {basics.summary || 'Summary goes here...'}
          </p>
        </section>

        <div className="grid grid-cols-5 gap-10">
          <div className="col-span-3 space-y-8">
            <div className="space-y-6">
              {experience.map((item, i) => (
                <div key={i} className="group">
                  <div className="flex items-center gap-3">
                    <h3 className="font-black text-slate-800 uppercase tracking-tight">{item.position}</h3>
                    <div className="h-px flex-1 bg-slate-100 group-hover:bg-primary-100 transition-colors" />
                  </div>
                  <p className="text-xs font-bold text-slate-400 mt-1 uppercase">{item.company} | {item.startDate} - {item.endDate}</p>
                  <p className="mt-3 text-sm text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2 space-y-10">
            <section>
              <h2 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-6 border-b-2 border-slate-900 pb-2">Top Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 text-white text-[10px] font-black uppercase tracking-tighter rounded-sm"
                    style={{ backgroundColor: settings.color }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-6 border-b-2 border-slate-900 pb-2">Education</h2>
              <div className="space-y-4">
                {education.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-sm font-black text-slate-800 uppercase leading-tight">{item.degree}</h3>
                    <p className="text-[10px] text-slate-500 font-bold mt-1">{item.institution}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;
