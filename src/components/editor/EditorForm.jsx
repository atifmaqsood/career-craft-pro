import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Target, 
  Code2, 
  Plus,
  Trash2,
  GripVertical,
  Camera,
  X
} from 'lucide-react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { 
  updateBasics, 
  addExperience, 
  removeExperience, 
  addEducation, 
  removeEducation,
  updateExperience,
  updateEducation,
  setSkills,
  updateSectionOrder,
  addSectionItem,
  removeSectionItem,
  removeSection
} from '../../store/slices/resumeSlice';

const SortableSection = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group/section">
      <div 
        {...attributes} 
        {...listeners} 
        className="absolute -left-8 top-12 cursor-grab active:cursor-grabbing opacity-0 group-hover/section:opacity-100 transition-opacity p-2 text-slate-300 hover:text-primary-400"
      >
        <GripVertical size={20} />
      </div>
      {children}
    </div>
  );
};

const SectionHeader = ({ id, title, icon: Icon, onRemove }) => (
  <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100 mt-10 first:mt-0">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center">
        <Icon size={18} />
      </div>
      <h3 className="text-xl font-bold text-slate-800">{title}</h3>
    </div>
    {onRemove && (
      <button 
        onClick={() => onRemove(id)}
        className="text-slate-300 hover:text-red-500 transition-colors p-1"
        title="Remove entire section"
      >
        <Trash2 size={16} />
      </button>
    )}
  </div>
);

/* ── Photo-aware Basics Section ──────────────────────────────── */
const BasicsSection = ({ basics, onChange }) => {
  const photoRef = useRef();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange('photo', reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-5">
      {/* Photo Upload */}
      <div className="flex items-center gap-5">
        <div className="relative shrink-0">
          {basics.photo
            ? <img src={basics.photo} alt="Profile" className="w-20 h-20 rounded-full object-cover border-4 border-slate-100 shadow" />
            : <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center border-4 border-slate-100 shadow">
                <User size={28} className="text-slate-400" />
              </div>
          }
          <button onClick={() => photoRef.current.click()}
            className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary-700 transition-colors"
          >
            <Camera size={13} />
          </button>
          {basics.photo && (
            <button onClick={() => onChange('photo', '')}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white shadow hover:bg-red-600 transition-colors"
            >
              <X size={10} />
            </button>
          )}
          <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-700">Profile Photo</p>
          <p className="text-xs text-slate-400 mt-0.5">JPG, PNG or WebP. Max 2MB.<br/>Appears on compatible templates.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="label">Full Name</label>
          <input type="text" value={basics.name} onChange={e => onChange('name', e.target.value)} className="input-field" placeholder="e.g. John Doe" />
        </div>
        <div className="col-span-2">
          <label className="label">Job Title / Headline</label>
          <input type="text" value={basics.title || ''} onChange={e => onChange('title', e.target.value)} className="input-field" placeholder="e.g. Senior Software Engineer" />
        </div>
        <div>
          <label className="label">Email</label>
          <input type="email" value={basics.email} onChange={e => onChange('email', e.target.value)} className="input-field" placeholder="john@example.com" />
        </div>
        <div>
          <label className="label">Phone</label>
          <input type="tel" value={basics.phone} onChange={e => onChange('phone', e.target.value)} className="input-field" placeholder="+1 (555) 000-0000" />
        </div>
        <div className="col-span-2">
          <label className="label">Location</label>
          <input type="text" value={basics.location || ''} onChange={e => onChange('location', e.target.value)} className="input-field" placeholder="City, Country" />
        </div>
        <div className="col-span-2">
          <label className="label">Professional Summary</label>
          <textarea rows={4} value={basics.summary} onChange={e => onChange('summary', e.target.value)} className="input-field resize-none" placeholder="Write a compelling 2-3 sentence summary..." />
        </div>
      </div>
    </div>
  );
};

const EditorForm = () => {

  const dispatch = useDispatch();
  const { currentResume } = useSelector(state => state.resume);
  const { basics, sections } = currentResume;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = sections.findIndex(s => s.id === active.id);
      const newIndex = sections.findIndex(s => s.id === over.id);
      dispatch(updateSectionOrder(arrayMove(sections, oldIndex, newIndex)));
    }
  };

  const handleBasicsChange = (field, value) => {
    dispatch(updateBasics({ [field]: value }));
  };

  const handleSkillChange = (e) => {
    const skillsArray = e.target.value.split(',').map(s => s.trim());
    dispatch(setSkills(skillsArray));
  };

  const renderSectionContent = (section) => {
    switch (section.id) {
      case 'basics':
        return <BasicsSection basics={basics} onChange={handleBasicsChange} />;
      case 'experience':
        return (
          <div className="space-y-6">
            {section.items.map((item) => (
              <div key={item.id} className="p-5 border border-slate-100 rounded-xl bg-slate-50/50 relative group">
                <button 
                  onClick={() => dispatch(removeExperience(item.id))}
                  className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Company</label>
                    <input 
                      type="text" 
                      value={item.company}
                      onChange={(e) => dispatch(updateExperience({ ...item, company: e.target.value }))}
                      className="input-field bg-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Position</label>
                    <input 
                      type="text" 
                      value={item.position}
                      onChange={(e) => dispatch(updateExperience({ ...item, position: e.target.value }))}
                      className="input-field bg-white" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Start</label>
                      <input 
                        type="text" 
                        value={item.startDate}
                        onChange={(e) => dispatch(updateExperience({ ...item, startDate: e.target.value }))}
                        className="input-field bg-white" 
                        placeholder="MM/YYYY"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">End</label>
                      <input 
                        type="text" 
                        value={item.endDate}
                        onChange={(e) => dispatch(updateExperience({ ...item, endDate: e.target.value }))}
                        className="input-field bg-white" 
                        placeholder="MM/YYYY or Present"
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Description</label>
                    <textarea 
                      rows={3}
                      value={item.description}
                      onChange={(e) => dispatch(updateExperience({ ...item, description: e.target.value }))}
                      className="input-field bg-white resize-none" 
                    />
                  </div>
                </div>
              </div>
            ))}
            <button 
              onClick={() => dispatch(addExperience({ company: '', position: '', startDate: '', endDate: '', description: '' }))}
              className="w-full border-2 border-dashed border-slate-200 py-4 rounded-xl text-slate-400 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={18} /> Add Experience Item
            </button>
          </div>
        );
      case 'education':
        return (
          <div className="space-y-6">
             {section.items.map((item) => (
              <div key={item.id} className="p-5 border border-slate-100 rounded-xl bg-slate-50/50 relative group">
                <button 
                  onClick={() => dispatch(removeEducation(item.id))}
                  className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Institution</label>
                    <input 
                      type="text" 
                      value={item.institution}
                      onChange={(e) => dispatch(updateEducation({ ...item, institution: e.target.value }))}
                      className="input-field bg-white" 
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Degree</label>
                    <input 
                      type="text" 
                      value={item.degree}
                      onChange={(e) => dispatch(updateEducation({ ...item, degree: e.target.value }))}
                      className="input-field bg-white" 
                    />
                  </div>
                </div>
              </div>
            ))}
            <button 
              onClick={() => dispatch(addEducation({ institution: '', degree: '', startDate: '', endDate: '' }))}
              className="w-full border-2 border-dashed border-slate-200 py-4 rounded-xl text-slate-400 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={18} /> Add Education Item
            </button>
          </div>
        );
      case 'skills':
        return (
          <div className="p-5 border border-slate-100 rounded-xl bg-slate-50/50">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Technical Skills (comma separated)</label>
            <input 
              type="text" 
              value={section.items.join(', ')}
              onChange={handleSkillChange}
              className="input-field bg-white" 
              placeholder="React, Node.js, TypeScript..."
            />
          </div>
        );
      default:
        // Generic list section for recommended sections
        return (
          <div className="space-y-4">
             {section.items?.map((item, idx) => (
               <div key={item.id || idx} className="p-4 bg-white border border-slate-100 rounded-xl group relative">
                 <button 
                  onClick={() => dispatch(removeSectionItem({ sectionId: section.id, itemId: item.id }))}
                  className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                 >
                  <Trash2 size={14} />
                 </button>
                 <input 
                  className="w-full font-bold text-slate-800 outline-none mb-1 border-none p-0 bg-transparent" 
                  value={item.title || ''} 
                  onChange={(e) => {}} // Placeholder for updateSectionItem if needed
                  placeholder="Title (e.g. Project Name)" 
                 />
                 <textarea 
                  className="w-full text-sm text-slate-600 outline-none h-16 resize-none border-none p-0 bg-transparent" 
                  value={item.content || ''} 
                  placeholder="Describe your achievement..." 
                 />
               </div>
             ))}
             <button 
              onClick={() => dispatch(addSectionItem({ sectionId: section.id, item: { title: '', content: '' } }))}
              className="text-primary-600 text-sm font-bold flex items-center gap-1 hover:underline"
             >
               <Plus size={14} /> Add {section.title} Item
             </button>
          </div>
        );
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'basics': return User;
      case 'experience': return Briefcase;
      case 'education': return GraduationCap;
      case 'skills': return Code2;
      default: return Target;
    }
  };

  return (
    <div className="space-y-4 pb-20">
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={sections.map(s => s.id)}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((section) => (
            <SortableSection key={section.id} id={section.id}>
              <SectionHeader 
                id={section.id}
                title={section.title} 
                icon={getIcon(section.id)} 
                onRemove={!['basics', 'experience', 'education', 'skills'].includes(section.id) ? (id) => dispatch(removeSection(id)) : null}
              />
              {renderSectionContent(section)}
            </SortableSection>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default EditorForm;
