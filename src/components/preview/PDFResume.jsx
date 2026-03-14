import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#334155',
  },
  header: {
    paddingVertical: 35,
    paddingHorizontal: 30,
    backgroundColor: '#0ea5e9',
    color: 'white',
  },
  name: {
    fontSize: 26,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  jobTitle: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.95,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
    gap: 12,
    fontSize: 8,
  },
  main: {
    flexDirection: 'row',
    flex: 1,
  },
  leftColumn: {
    width: '64%',
    padding: 30,
    paddingRight: 15,
  },
  rightColumnContainer: {
    width: '36%',
    backgroundColor: '#f8fafc',
  },
  rightColumn: {
    padding: 30,
    paddingLeft: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    borderBottomWidth: 1.5,
    paddingBottom: 5,
    marginBottom: 12,
  },
  sidebarTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  experienceItem: {
    marginBottom: 15,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  company: {
    fontSize: 10,
    fontWeight: 700,
    color: '#1e293b',
  },
  role: {
    fontSize: 9,
    fontWeight: 600,
    color: '#475569',
    marginBottom: 4,
  },
  date: {
    fontSize: 8,
    color: '#64748b',
    fontWeight: 700,
  },
  text: {
    fontSize: 9,
    color: '#475569',
    lineHeight: 1.5,
    marginBottom: 3,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
    paddingLeft: 5,
  },
  bulletPoint: {
    width: 10,
    fontSize: 9,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: '#475569',
    lineHeight: 1.5,
  },
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skillItem: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 4,
    fontSize: 8,
    color: '#475569',
    marginBottom: 5,
  },
  eduItem: {
    marginBottom: 12,
  },
  eduDegree: {
    fontSize: 9,
    fontWeight: 700,
    color: '#1e293b',
  },
  eduSchool: {
    fontSize: 8,
    color: '#64748b',
    marginTop: 1,
  },
  eduDate: {
    fontSize: 7,
    color: '#94a3b8',
    fontWeight: 700,
    marginTop: 2,
  },
});

const FormattedText = ({ text }) => {
  if (!text) return null;
  
  // Split by newline and filter empty lines
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  
  return (
    <View>
      {lines.map((line, index) => {
        const trimmedLine = line.trim();
        const isBullet = trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*');
        
        if (isBullet) {
          // Remove bullet character and trim
          const cleanLine = trimmedLine.replace(/^[•\-\*]\s*/, '');
          return (
            <View key={index} style={styles.bulletRow}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.bulletText}>{cleanLine}</Text>
            </View>
          );
        }
        
        return <Text key={index} style={styles.text}>{trimmedLine}</Text>;
      })}
    </View>
  );
};

const PDFResume = ({ data }) => {
  const { basics, sections, settings } = data;
  const primaryColor = settings?.color || '#0ea5e9';

  const experience = sections.find(s => s.id === 'experience')?.items || [];
  const education = sections.find(s => s.id === 'education')?.items || [];
  const skills = sections.find(s => s.id === 'skills')?.items || [];
  const customSections = sections.filter(s => !['basics', 'experience', 'education', 'skills'].includes(s.id));

  return (
    <Document title={`${basics.name || 'Resume'} - CareerCraft Pro`}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: primaryColor }]}>
          <Text style={styles.name}>{basics.name || 'Your Name'}</Text>
          <Text style={styles.jobTitle}>{basics.title || 'Software Engineer'}</Text>
          <View style={styles.contactRow}>
            {basics.email && <Text>• {basics.email}</Text>}
            {basics.phone && <Text>• {basics.phone}</Text>}
            {basics.location && <Text>• {basics.location}</Text>}
          </View>
        </View>

        <View style={styles.main}>
          {/* Main Column */}
          <View style={styles.leftColumn}>
            {/* Summary */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: '#f1f5f9' }]}>Summary</Text>
              <FormattedText text={basics.summary} />
            </View>

            {/* Experience */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: '#f1f5f9' }]}>Experience</Text>
              {experience.map((item, i) => (
                <View key={i} style={styles.experienceItem} wrap={false}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.company}>{item.company}</Text>
                    <Text style={styles.date}>{item.startDate} - {item.endDate}</Text>
                  </View>
                  <Text style={styles.role}>{item.position}</Text>
                  <FormattedText text={item.description} />
                </View>
              ))}
            </View>

            {/* Custom Sections (Projects) */}
            {customSections.map(section => (
              <View key={section.id} style={styles.section} wrap={false}>
                <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: '#f1f5f9' }]}>{section.title}</Text>
                {section.items.map((item, i) => (
                  <View key={i} style={styles.experienceItem}>
                    <Text style={styles.company}>{item.title}</Text>
                    <FormattedText text={item.content || item.description} />
                  </View>
                ))}
              </View>
            ))}
          </View>

          {/* Sidebar Area */}
          <View style={styles.rightColumnContainer}>
            <View style={styles.rightColumn}>
              <View style={styles.section}>
                <Text style={styles.sidebarTitle}>Skills</Text>
                <View style={styles.skillContainer}>
                  {skills.map((skill, i) => (
                    <Text key={i} style={styles.skillItem}>{skill}</Text>
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sidebarTitle}>Education</Text>
                {education.map((item, i) => (
                  <View key={i} style={styles.eduItem}>
                    <Text style={styles.eduDegree}>{item.degree}</Text>
                    <Text style={styles.eduSchool}>{item.institution}</Text>
                    <Text style={styles.eduDate}>{item.startDate} - {item.endDate}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFResume;
