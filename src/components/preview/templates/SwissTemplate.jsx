import React from 'react';

const SwissTemplate = ({ data }) => {
  const { basics, sections, settings } = data;
  const experience = sections.find(s => s.id === 'experience')?.items || [];
  const skills = sections.find(s => s.id === 'skills')?.items || [];
  const education = sections.find(s => s.id === 'education')?.items || [];
  const otherSections = sections.filter(s => !['basics', 'experience', 'education', 'skills'].includes(s.id));

  return (
    <div className="min-h-full bg-slate-50 p-12 overflow-hidden" style={{ fontFamily: settings.font }}>
      <div className="bg-white shadow-[0_0_100px_rgba(0,0,0,0.02)] min-h-full flex flex-col">
        {/* The Grid Header */}
        <div className="grid grid-cols-12 border-b border-slate-100">
          <div className="col-span-8 p-16 pb-12">
            <h1 className="text-7xl font-bold tracking-[-0.05em] leading-[0.85] text-slate-900">{basics.name}<span style={{ color: settings.color }}>.</span></h1>
            <p className="text-xl font-bold uppercase tracking-[0.2em] text-slate-300 mt-8 leading-none">{basics.title}</p>
          </div>
          <div className="col-span-4 p-16 pb-12 bg-slate-50/50 flex flex-col justify-end text-right border-l border-slate-100">
            <p className="text-sm font-bold text-slate-900">{basics.email}</p>
            <p className="text-sm font-medium text-slate-500 mt-1">{basics.phone}</p>
            <p className="text-sm font-medium text-slate-400 mt-1">{basics.location}</p>
          </div>
        </div>

        {/* Professional Summary Grid */}
        <div className="grid grid-cols-12 border-b border-slate-100">
          <div className="col-span-4 p-12 py-10 bg-slate-50/30">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300">Summary</h2>
          </div>
          <div className="col-span-8 p-12 py-10">
            <p className="text-lg leading-relaxed text-slate-600 font-medium whitespace-pre-wrap">{basics.summary}</p>
          </div>
        </div>

        {/* Experience Grid */}
        <div className="grid grid-cols-12 border-b border-slate-100">
          <div className="col-span-4 p-12 py-10 bg-slate-50/30">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300">Experience</h2>
          </div>
          <div className="col-span-8 p-12 py-10 space-y-12">
            {experience.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{item.company}</h3>
                  <span className="text-xs font-black text-slate-300 shrink-0 mt-2 uppercase tracking-widest">{item.startDate} — {item.endDate}</span>
                </div>
                <div className="mb-4">
                  <span className="text-xs font-black uppercase tracking-[0.2em] px-3 py-1 bg-slate-100 rounded text-slate-500">{item.position}</span>
                </div>
                <div className="text-slate-500 text-sm leading-relaxed whitespace-pre-wrap max-w-xl">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Sections Grid */}
        {otherSections.map(section => (
          <div key={section.id} className="grid grid-cols-12 border-b border-slate-100">
            <div className="col-span-4 p-12 py-10 bg-slate-50/30">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300">{section.title}</h2>
            </div>
            <div className="col-span-8 p-12 py-10 space-y-10">
              {section.items.map((item, i) => (
                <div key={i}>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">{item.title || item.company}</h3>
                  <div className="text-slate-500 text-sm leading-relaxed whitespace-pre-wrap max-w-xl">
                    {item.content || item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Skills Grid */}
        <div className="grid grid-cols-12 border-b border-slate-100">
          <div className="col-span-4 p-12 py-10 bg-slate-50/30">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300">Skills</h2>
          </div>
          <div className="col-span-8 p-12 py-10">
            <div className="grid grid-cols-3 gap-y-6 gap-x-12">
              {skills.map((skill, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-widest leading-none">{skill}</span>
                  <div className="h-0.5 w-full bg-slate-100 overflow-hidden">
                    <div className="h-full w-2/3" style={{ backgroundColor: settings.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-12 flex-1">
          <div className="col-span-4 p-12 py-10 bg-slate-50/30">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300">Education</h2>
          </div>
          <div className="col-span-8 p-12 py-10 grid grid-cols-2 gap-12">
            {education.map((edu, i) => (
              <div key={i}>
                <h3 className="font-bold text-slate-900 text-base">{edu.degree}</h3>
                <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-tighter">{edu.institution}</p>
                <p className="text-[10px] font-black mt-2 tracking-widest text-slate-300 uppercase leading-none">{edu.startDate} — {edu.endDate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwissTemplate;
