import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Check } from 'lucide-react';
import { setTemplate, updateSettings } from '../../store/slices/resumeSlice';

const templates = [
  { id: 'modern', name: 'Modern Pro', description: 'Clean, minimalist design for modern tech roles.', previewColor: '#0ea5e9' },
  { id: 'professional', name: 'FAANG Standard', description: 'Industry-standard tech resume, optimized for big tech.', previewColor: '#10b981' },
  { id: 'corporate', name: 'Executive Corporate', description: 'Traditional and authoritative for management.', previewColor: '#1e293b' },
  { id: 'startup', name: 'Startup Builder', description: 'Bold, asymmetric design for fast-paced startups.', previewColor: '#f43f5e' },
  { id: 'swiss', name: 'Swiss Grid', description: 'Clean, structured, and highly readable typography.', previewColor: '#6366f1' },
  { id: 'executive', name: 'Luxury Executive', description: 'Premium feel with elegant borders and branding.', previewColor: '#a855f7' },
  { id: 'elegant', name: 'Refined Branding', description: 'Soft, minimalist aesthetic for creative leads.', previewColor: '#ec4899' },
  { id: 'functional', name: 'Technical Lead', description: 'High data density for senior technical roles.', previewColor: '#334155' },
  { id: 'creative', name: 'Creative Portfolio', description: 'Bold and unique for designers and artists.', previewColor: '#6366f1' },
  { id: 'minimal', name: 'Minimalist Slate', description: 'Strict focus on content with elegant type.', previewColor: '#64748b' }
];

const colors = [
  { name: 'Sky Blue', hex: '#0ea5e9' },
  { name: 'Indigo', hex: '#6366f1' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Slate', hex: '#475569' },
  { name: 'Rose', hex: '#f43f5e' },
  { name: 'Amber', hex: '#f59e0b' }
];

const TemplateCard = ({ template, isActive, onSelect }) => (
  <button 
    onClick={() => onSelect(template.id)}
    className={`w-full p-4 rounded-2xl border-2 transition-all text-left relative ${
      isActive ? 'border-primary-600 bg-primary-50' : 'border-slate-100 hover:border-slate-200 bg-white'
    }`}
  >
    <div className="flex justify-between items-start mb-3">
      <div 
        className="w-12 h-16 rounded-lg shadow-sm"
        style={{ backgroundColor: template.previewColor }}
      />
      {isActive && (
        <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white">
          <Check size={14} />
        </div>
      )}
    </div>
    <h4 className={`font-bold ${isActive ? 'text-primary-900' : 'text-slate-900'}`}>{template.name}</h4>
    <p className="text-xs text-slate-500 mt-1">{template.description}</p>
  </button>
);

const TemplateSwitcher = () => {
  const dispatch = useDispatch();
  const { currentResume } = useSelector(state => state.resume);
  const { templateId, settings } = currentResume;

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-6">Choose a Template</h3>
        <div className="grid grid-cols-2 gap-4">
          {templates.map(tmp => (
            <TemplateCard 
              key={tmp.id} 
              template={tmp} 
              isActive={templateId === tmp.id}
              onSelect={(id) => dispatch(setTemplate(id))}
            />
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-6">Theme Settings</h3>
        <div className="card-premium p-6">
          <p className="text-sm font-semibold text-slate-700 mb-4">Primary Color</p>
          <div className="flex flex-wrap gap-3">
            {colors.map(color => (
              <button
                key={color.hex}
                onClick={() => dispatch(updateSettings({ color: color.hex }))}
                className={`w-10 h-10 rounded-full border-4 transition-transform hover:scale-110 ${
                  settings.color === color.hex ? 'border-primary-200' : 'border-transparent'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Typography</label>
              <select 
                value={settings.font}
                onChange={(e) => dispatch(updateSettings({ font: e.target.value }))}
                className="input-field"
              >
                <option value="Inter">Inter (Default)</option>
                <option value="Outfit">Outfit (Modern)</option>
                <option value="serif">Merriweather (Classic)</option>
                <option value="mono">JetBrains Mono (Tech)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Spacing</label>
              <select 
                value={settings.spacing}
                onChange={(e) => dispatch(updateSettings({ spacing: e.target.value }))}
                className="input-field"
              >
                <option value="compact">Compact</option>
                <option value="medium">Medium</option>
                <option value="relaxed">Relaxed</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSwitcher;
