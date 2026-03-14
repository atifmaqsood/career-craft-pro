import React from 'react';
import { useSelector } from 'react-redux';
import ModernTemplate from './templates/ModernTemplate';
import CorporateTemplate from './templates/CorporateTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

const ResumePreview = () => {
  const { currentResume } = useSelector(state => state.resume);
  const { templateId } = currentResume;

  const renderTemplate = () => {
    switch (templateId) {
      case 'modern':
        return <ModernTemplate data={currentResume} />;
      case 'corporate':
        return <CorporateTemplate data={currentResume} />;
      case 'creative':
        return <CreativeTemplate data={currentResume} />;
      case 'minimal':
        return <MinimalTemplate data={currentResume} />;
      default:
        return <ModernTemplate data={currentResume} />;
    }
  };

  return (
    <div id="resume-preview" className="resume-preview-container overflow-hidden">
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;
