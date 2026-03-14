import { pdf } from '@react-pdf/renderer';
import React from 'react';
import PDFResume from '../components/preview/PDFResume';

export const exportToPDF = async (data, filename = 'resume.pdf') => {
  try {
    console.log('[pdfExport] Generating PDF with data:', data);
    
    // Create the PDF blob directly using react-pdf's engine
    // Use React.createElement to avoid JSX parsing errors in a .js file
    const doc = React.createElement(PDFResume, { data });
    const blob = await pdf(doc).toBlob();
    
    // Create download link and trigger it
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Cleanup
    URL.revokeObjectURL(url);
    
    console.log('[pdfExport] PDF generated and download triggered successfully.');
  } catch (error) {
    console.error('Error generating PDF with react-pdf:', error);
  }
};
