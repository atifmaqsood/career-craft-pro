import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const base = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 9, backgroundColor: '#ffffff' },
  row: { flexDirection: 'row' },
  col: { flexDirection: 'column' },
});

/* ── Bullet-aware text renderer ─────────────────────────────── */
const Txt = ({ t = '', style }) => {
  const lines = String(t).split('\n').filter(l => l.trim());
  return (
    <View>
      {lines.map((l, i) => {
        const isBullet = /^[•\-\*]/.test(l.trim());
        const clean = l.trim().replace(/^[•\-\*]\s*/, '');
        return isBullet
          ? <View key={i} style={{ flexDirection: 'row', marginBottom: 2 }}>
              <Text style={[{ width: 10, fontSize: 9 }, style]}>•</Text>
              <Text style={[{ flex: 1, lineHeight: 1.4 }, style]}>{clean}</Text>
            </View>
          : <Text key={i} style={[{ lineHeight: 1.4, marginBottom: 2 }, style]}>{l.trim()}</Text>;
      })}
    </View>
  );
};

/* ══════════════════════════════════════════════════════════════
   1. EXECUTIVE  ── white bg, thick colored bottom-border header,
      25/75 two-col layout, dark footer for skills
══════════════════════════════════════════════════════════════ */
const PdfExecutive = ({ basics: B, experience: E, education: Ed, skills: Sk, other: O, color: C }) => (
  <View style={{ flex: 1, padding: 40, borderTop: `12 solid #f8fafc` }}>
    {/* Header */}
    <View style={{ borderBottom: `4 solid ${C}`, paddingBottom: 24, marginBottom: 32 }}>
      <Text style={{ fontSize: 38, fontWeight: 'bold', color: '#0f172a', textTransform: 'uppercase', letterSpacing: -1 }}>{B.name}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, alignItems: 'flex-end' }}>
        <Text style={{ fontSize: 16, color: '#64748b', fontStyle: 'italic', maxWidth: '60%' }}>{B.title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 15 }}>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2 }}>{B.location}</Text>
            <Text style={{ fontSize: 9, color: '#1e293b', marginTop: 2 }}>{B.email}</Text>
            <Text style={{ fontSize: 9, color: '#1e293b', marginTop: 1 }}>{B.phone}</Text>
          </View>
          {B.photo && <Image src={{ uri: B.photo }} style={{ width: 50, height: 50, borderRadius: 25, border: '2 solid #f8fafc' }} />}
        </View>
      </View>
    </View>

    {/* Profile */}
    <SectionRow label="Profile">
      <Text style={{ fontSize: 11, color: '#475569', fontStyle: 'italic', lineHeight: 1.7, borderLeft: '2 solid #f1f5f9', paddingLeft: 16 }}>{B.summary}</Text>
    </SectionRow>

    {/* Experience */}
    <SectionRow label="Experience">
      {E.map((x, i) => (
        <View key={i} style={{ marginBottom: 20 }} wrap={false}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#0f172a' }}>{x.company}</Text>
            <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#cbd5e1' }}>{x.startDate} // {x.endDate}</Text>
          </View>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: C, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{x.position}</Text>
          <View style={{ borderLeft: '2 solid #f8fafc', paddingLeft: 14 }}><Txt t={x.description} style={{ color: '#475569', fontSize: 9 }} /></View>
        </View>
      ))}
    </SectionRow>

    {/* Custom sections */}
    {O.map(s => (
      <SectionRow key={s.id} label={s.title}>
        {s.items.map((x, i) => (
          <View key={i} style={{ marginBottom: 16 }} wrap={false}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#0f172a', marginBottom: 4 }}>{x.title || x.company}</Text>
            <View style={{ borderLeft: '2 solid #f8fafc', paddingLeft: 14 }}><Txt t={x.content || x.description} style={{ color: '#475569', fontSize: 9 }} /></View>
          </View>
        ))}
      </SectionRow>
    ))}

    {/* Skills – dark footer */}
    <View style={{ backgroundColor: '#0f172a', marginHorizontal: -40, marginTop: 20, padding: 28 }}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ width: '25%', fontSize: 8, fontWeight: 'bold', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: 2 }}>Skills</Text>
        <View style={{ width: '75%', flexDirection: 'row', flexWrap: 'wrap', gap: 14 }}>
          {Sk.map((s, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: C }} />
              <Text style={{ fontSize: 8, fontWeight: 'bold', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' }}>{s}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>

    {/* Education */}
    <SectionRow label="Education">
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
        {Ed.map((e, i) => (
          <View key={i} style={{ width: '45%' }}>
            <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#0f172a', textTransform: 'uppercase' }}>{e.degree}</Text>
            <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#64748b', marginTop: 2, textTransform: 'uppercase' }}>{e.institution}</Text>
            <Text style={{ fontSize: 7, color: '#cbd5e1', marginTop: 3, textTransform: 'uppercase' }}>{e.startDate} — {e.endDate}</Text>
          </View>
        ))}
      </View>
    </SectionRow>
  </View>
);

/* ── Helper: 25/75 section row ─ */
const SectionRow = ({ label, children }) => (
  <View style={{ flexDirection: 'row', gap: 24, marginBottom: 28 }}>
    <Text style={{ width: '22%', fontSize: 7, fontWeight: 'bold', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 2, paddingTop: 2 }}>{label}</Text>
    <View style={{ flex: 1 }}>{children}</View>
  </View>
);

/* ══════════════════════════════════════════════════════════════
   2. PROFESSIONAL  ── centered header, colored left-border headings
══════════════════════════════════════════════════════════════ */
const PdfProfessional = ({ basics: B, experience: E, education: Ed, skills: Sk, other: O, color: C }) => {
  const heading = (label) => (
    <Text style={{ fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', borderLeft: `4 solid ${C}`, paddingLeft: 10, marginBottom: 12, color: '#1e293b', letterSpacing: 1 }}>{label}</Text>
  );
  return (
    <View style={{ flex: 1, padding: 35 }}>
      {/* Header – centered */}
      <View style={{ alignItems: 'center', borderBottom: '2 solid #f1f5f9', paddingBottom: 20, marginBottom: 25 }}>
        {B.photo ? (
          <Image src={{ uri: B.photo }} style={{ width: 60, height: 60, borderRadius: 30, marginBottom: 12, border: '2 solid #f1f5f9' }} />
        ) : (
          <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: C, alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{B.name.charAt(0)}</Text>
          </View>
        )}
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#1e293b' }}>{B.name}</Text>
        <Text style={{ fontSize: 13, fontWeight: 'bold', color: C, marginTop: 5, textTransform: 'uppercase' }}>{B.title}</Text>
        <View style={{ flexDirection: 'row', gap: 15, marginTop: 12, fontSize: 8, color: '#64748b' }}>
          <Text>{B.email}</Text><Text>•</Text><Text>{B.phone}</Text><Text>•</Text><Text>{B.location}</Text>
        </View>
      </View>

      {/* Summary */}
      <View style={{ marginBottom: 22 }}>
        {heading('Summary')}
        <Text style={{ fontSize: 10, color: '#475569', lineHeight: 1.6 }}>{B.summary}</Text>
      </View>

      {/* Experience */}
      <View style={{ marginBottom: 22 }}>
        {heading('Experience')}
        {E.map((x, i) => (
          <View key={i} style={{ marginBottom: 18 }} wrap={false}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#f8fafc', padding: '5 8', marginBottom: 4, borderRadius: 4 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#0f172a' }}>{x.company}</Text>
              <Text style={{ fontSize: 8, color: '#94a3b8', fontWeight: 'bold' }}>{x.startDate} — {x.endDate}</Text>
            </View>
            <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#64748b', marginBottom: 6, paddingLeft: 8 }}>{x.position}</Text>
            <View style={{ paddingLeft: 8 }}><Txt t={x.description} style={{ color: '#475569', fontSize: 9 }} /></View>
          </View>
        ))}
      </View>

      {/* Custom sections */}
      {O.map(s => (
        <View key={s.id} style={{ marginBottom: 22 }}>
          {heading(s.title)}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {s.items.map((x, i) => (
              <View key={i} style={{ width: '47%', backgroundColor: '#f8fafc', padding: 12, borderRadius: 8, border: '1 solid #f1f5f9', marginBottom: 8 }}>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#1e293b', marginBottom: 4 }}>{x.title || x.company}</Text>
                <Txt t={x.content || x.description} style={{ color: '#475569', fontSize: 8 }} />
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* Skills + Education – 2 col */}
      <View style={{ flexDirection: 'row', gap: 30, borderTop: '1 solid #f1f5f9', paddingTop: 20 }}>
        <View style={{ flex: 1 }}>
          {heading('Skills')}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
            {Sk.map((s, i) => <Text key={i} style={{ fontSize: 8, backgroundColor: '#f1f5f9', color: '#475569', padding: '4 8', borderRadius: 10, fontWeight: 'bold', textTransform: 'uppercase' }}>{s}</Text>)}
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {heading('Education')}
          {Ed.map((e, i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#1e293b' }}>{e.degree}</Text>
              <Text style={{ fontSize: 8, color: '#64748b' }}>{e.institution}</Text>
              <Text style={{ fontSize: 7, color: '#94a3b8', marginTop: 2 }}>{e.startDate} — {e.endDate}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

/* ══════════════════════════════════════════════════════════════
   3. CORPORATE  ── centered all-caps name, diamond skills
══════════════════════════════════════════════════════════════ */
const PdfCorporate = ({ basics: B, experience: E, education: Ed, skills: Sk, other: O, color: C }) => {
  const hr = (label) => (
    <Text style={{ fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, color: C, borderBottom: `1 solid ${C}20`, paddingBottom: 3, marginBottom: 12 }}>{label}</Text>
  );
  return (
    <View style={{ flex: 1, padding: 35 }}>
      <View style={{ alignItems: 'center', borderBottom: '2 solid #0f172a', paddingBottom: 20, marginBottom: 25 }}>
        {B.photo && <Image src={{ uri: B.photo }} style={{ width: 50, height: 50, borderRadius: 25, marginBottom: 12 }} />}
        <Text style={{ fontSize: 28, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, color: '#0f172a' }}>{B.name}</Text>
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 10, fontSize: 8, color: '#475569', fontWeight: 'bold' }}>
          <Text>{B.email}</Text><Text>•</Text><Text>{B.phone}</Text><Text>•</Text><Text>{B.location}</Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', marginBottom: 22 }}>
        <Text style={{ fontSize: 10, color: '#475569', fontStyle: 'italic', lineHeight: 1.6, textAlign: 'center', maxWidth: 400 }}>{B.summary}</Text>
      </View>
      <View style={{ marginBottom: 22 }}>
        {hr('Experience')}
        {E.map((x, i) => (
          <View key={i} style={{ marginBottom: 15 }} wrap={false}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#0f172a' }}>{x.company}</Text>
              <Text style={{ fontSize: 8, color: '#64748b', fontWeight: 'bold' }}>{x.startDate} — {x.endDate}</Text>
            </View>
            <Text style={{ fontSize: 9, fontStyle: 'italic', fontWeight: 'bold', color: '#64748b', marginBottom: 5, marginTop: 2 }}>{x.position}</Text>
            <Txt t={x.description} style={{ color: '#475569', fontSize: 9 }} />
          </View>
        ))}
      </View>
      {O.map(s => (
        <View key={s.id} style={{ marginBottom: 22 }}>
          {hr(s.title)}
          {s.items.map((x, i) => (
            <View key={i} style={{ marginBottom: 14 }} wrap={false}>
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#0f172a', marginBottom: 4 }}>{x.title || x.company}</Text>
              <Txt t={x.content || x.description} style={{ color: '#475569', fontSize: 9 }} />
            </View>
          ))}
        </View>
      ))}
      <View style={{ flexDirection: 'row', gap: 30, marginTop: 'auto' }}>
        <View style={{ flex: 1 }}>
          {hr('Skills')}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {Sk.map((s, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <View style={{ width: 5, height: 5, backgroundColor: '#94a3b8', transform: 'rotate(45deg)' }} />
                <Text style={{ fontSize: 8, color: '#334155' }}>{s}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {hr('Education')}
          {Ed.map((e, i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#0f172a' }}>{e.degree}</Text>
              <Text style={{ fontSize: 8, color: '#475569', fontWeight: 'bold' }}>{e.institution}</Text>
              <Text style={{ fontSize: 7, color: '#94a3b8' }}>{e.startDate} — {e.endDate}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

/* ══════════════════════════════════════════════════════════════
   4. MODERN  ── colored header banner, 2/3 + 1/3 columns
══════════════════════════════════════════════════════════════ */
const PdfModern = ({ basics: B, experience: E, education: Ed, skills: Sk, other: O, color: C }) => (
  <View style={{ flex: 1 }}>
    {/* Colored header */}
    <View style={{ backgroundColor: C, padding: 30, paddingBottom: 25, flexDirection: 'row', gap: 20, alignItems: 'center' }}>
      {B.photo && <Image src={{ uri: B.photo }} style={{ width: 60, height: 60, borderRadius: 30, border: '2 solid rgba(255,255,255,0.3)' }} />}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>{B.name}</Text>
        <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', fontWeight: 'bold', marginTop: 4 }}>{B.title}</Text>
        <View style={{ flexDirection: 'row', gap: 15, marginTop: 10, fontSize: 8, color: 'rgba(255,255,255,0.9)' }}>
          <Text>{B.email}</Text><Text>|</Text><Text>{B.phone}</Text><Text>|</Text><Text>{B.location}</Text>
        </View>
      </View>
    </View>
    {/* Body */}
    <View style={{ flexDirection: 'row', flex: 1 }}>
      {/* Left 65% */}
      <View style={{ width: '65%', padding: 25, borderRight: '1 solid #f1f5f9' }}>
        {/* Summary */}
        <Text style={{ fontSize: 8, fontWeight: 'bold', color: C, textTransform: 'uppercase', marginBottom: 6 }}>Summary</Text>
        <Text style={{ fontSize: 9, color: '#475569', lineHeight: 1.6, marginBottom: 20 }}>{B.summary}</Text>

        {/* Experience */}
        <Text style={{ fontSize: 8, fontWeight: 'bold', color: C, textTransform: 'uppercase', marginBottom: 10 }}>Experience</Text>
        {E.map((x, i) => (
          <View key={i} style={{ marginBottom: 16, borderLeft: '2 solid #f1f5f9', paddingLeft: 10 }} wrap={false}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#0f172a' }}>{x.company}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 3 }}>
              <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#64748b' }}>{x.position}</Text>
              <Text style={{ fontSize: 7, color: '#94a3b8' }}>{x.startDate} — {x.endDate}</Text>
            </View>
            <Txt t={x.description} style={{ color: '#475569', fontSize: 8 }} />
          </View>
        ))}
        {O.map(s => (
          <View key={s.id} style={{ marginTop: 16 }}>
            <Text style={{ fontSize: 8, fontWeight: 'bold', color: C, textTransform: 'uppercase', marginBottom: 10 }}>{s.title}</Text>
            {s.items.map((x, j) => (
              <View key={j} style={{ marginBottom: 12 }} wrap={false}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#0f172a', marginBottom: 4 }}>{x.title || x.company}</Text>
                <Txt t={x.content || x.description} style={{ color: '#475569', fontSize: 8 }} />
              </View>
            ))}
          </View>
        ))}
      </View>
      {/* Right 35% */}
      <View style={{ width: '35%', padding: 20, backgroundColor: '#f9fafb' }}>
        <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: 10 }}>Skills</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginBottom: 24 }}>
          {Sk.map((s, i) => <Text key={i} style={{ fontSize: 7, backgroundColor: 'white', border: '1 solid #e2e8f0', padding: '3 6', borderRadius: 4, color: '#334155', fontWeight: 'bold' }}>{s}</Text>)}
        </View>
        <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: 10 }}>Education</Text>
        {Ed.map((e, i) => (
          <View key={i} style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#1e293b' }}>{e.degree}</Text>
            <Text style={{ fontSize: 8, color: '#64748b', marginTop: 2 }}>{e.institution}</Text>
            <Text style={{ fontSize: 7, color: '#94a3b8', marginTop: 2 }}>{e.startDate} — {e.endDate}</Text>
          </View>
        ))}
      </View>
    </View>
  </View>
);

/* ══════════════════════════════════════════════════════════════
   5. STARTUP  ── dark left sidebar, italic summary quote
══════════════════════════════════════════════════════════════ */
const PdfStartup = ({ basics: B, experience: E, education: Ed, skills: Sk, other: O, color: C }) => (
  <View style={{ flex: 1, flexDirection: 'row' }}>
    <View style={{ width: '28%', backgroundColor: '#0f172a', padding: 22, color: 'white' }}>
      <View style={{ width: 22, height: 5, backgroundColor: C, marginBottom: 16 }} />
      {B.photo && <Image src={{ uri: B.photo }} style={{ width: 60, height: 60, borderRadius: 30, marginBottom: 15, border: `1 solid ${C}` }} />}
      <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white', lineHeight: 1.15 }}>{B.name}</Text>
      <Text style={{ fontSize: 8, color: C, fontWeight: 'bold', marginTop: 6, textTransform: 'uppercase' }}>{B.title}</Text>
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 7, color: '#475569', fontWeight: 'bold', marginBottom: 8, textTransform: 'uppercase' }}>Contact</Text>
        <Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>{B.email}</Text>
        <Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>{B.phone}</Text>
        <Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.5)' }}>{B.location}</Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 7, color: '#475569', fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase' }}>Stack</Text>
        {Sk.map((s, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginRight: 8 }} />
            <Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.8)', fontWeight: 'bold', textTransform: 'uppercase' }}>{s}</Text>
          </View>
        ))}
      </View>
      <View style={{ marginTop: 'auto' }}>
        <Text style={{ fontSize: 7, color: '#475569', fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase' }}>Academy</Text>
        {Ed.map((e, i) => (
          <View key={i} style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 8, color: C, fontWeight: 'bold' }}>{e.degree}</Text>
            <Text style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)', marginTop: 2, textTransform: 'uppercase' }}>{e.institution}</Text>
          </View>
        ))}
      </View>
    </View>
    <View style={{ flex: 1, padding: 30 }}>
      <Text style={{ fontSize: 18, color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.5, marginBottom: 25 }}>"{B.summary}"</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#1e293b', textTransform: 'uppercase' }}>Experience</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: '#f1f5f9' }} />
      </View>
      {E.map((x, i) => (
        <View key={i} style={{ marginBottom: 20 }} wrap={false}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#0f172a' }}>{x.company}</Text>
            <Text style={{ fontSize: 8, color: '#cbd5e1' }}>{x.startDate} — {x.endDate}</Text>
          </View>
          <Text style={{ fontSize: 8, fontWeight: 'bold', color: C, marginBottom: 6, textTransform: 'uppercase' }}>{x.position}</Text>
          <View style={{ borderLeft: `2 solid ${C}20`, paddingLeft: 10 }}><Txt t={x.description} style={{ color: '#475569', fontSize: 8 }} /></View>
        </View>
      ))}
      {O.map(s => (
        <View key={s.id} style={{ marginTop: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#1e293b', textTransform: 'uppercase' }}>{s.title}</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: '#f1f5f9' }} />
          </View>
          {s.items.map((x, j) => (
            <View key={j} style={{ marginBottom: 14 }} wrap={false}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#0f172a', marginBottom: 4 }}>{x.title || x.company}</Text>
              <View style={{ borderLeft: `2 solid ${C}20`, paddingLeft: 10 }}><Txt t={x.content || x.description} style={{ color: '#475569', fontSize: 8 }} /></View>
            </View>
          ))}
        </View>
      ))}
    </View>
  </View>
);

/* ══════════════════════════════════════════════════════════════
   6. SWISS  ── grid 25/75, outer slate-50 bg, border grid
══════════════════════════════════════════════════════════════ */
const PdfSwiss = ({ basics: B, experience: E, education: Ed, skills: Sk, other: O, color: C }) => {
  const Label = ({ t }) => <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 2 }}>{t}</Text>;
  const Row = ({ label, children, last }) => (
    <View style={{ flexDirection: 'row', borderBottom: last ? '0' : '1 solid #f1f5f9' }}>
      <View style={{ width: '25%', backgroundColor: '#fbfcfd', padding: 14 }}><Label t={label} /></View>
      <View style={{ flex: 1, padding: 16 }}>{children}</View>
    </View>
  );
  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb', padding: 20 }}>
      <View style={{ flex: 1, backgroundColor: 'white', border: '1 solid #e2e8f0' }}>
        {/* Header row */}
        <View style={{ flexDirection: 'row', borderBottom: '1 solid #f1f5f9' }}>
          <View style={{ width: '65%', padding: 28 }}>
            <Text style={{ fontSize: 40, fontWeight: 'bold', letterSpacing: -2, color: '#0f172a' }}>{B.name}<Text style={{ color: C }}>.</Text></Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 3, marginTop: 12 }}>{B.title}</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: '#fbfcfd', padding: 20, borderLeft: '1 solid #f1f5f9', justifyContent: 'center', alignItems: 'flex-end', gap: 5 }}>
            {B.photo && <Image src={{ uri: B.photo }} style={{ width: 40, height: 40, borderRadius: 20, marginBottom: 5 }} />}
            <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#0f172a', textAlign: 'right' }}>{B.email}</Text>
            <Text style={{ fontSize: 8, color: '#64748b', textAlign: 'right' }}>{B.phone}</Text>
            <Text style={{ fontSize: 8, color: '#94a3b8', textAlign: 'right' }}>{B.location}</Text>
          </View>
        </View>
        <Row label="Summary"><Text style={{ fontSize: 10, color: '#334155', lineHeight: 1.7, fontWeight: 'bold' }}>{B.summary}</Text></Row>
        <Row label="Experience">
          {E.map((x, i) => (
            <View key={i} style={{ marginBottom: 18 }} wrap={false}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#0f172a' }}>{x.company}</Text>
                <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#cbd5e1', textTransform: 'uppercase' }}>{x.startDate} — {x.endDate}</Text>
              </View>
              <Text style={{ fontSize: 8, fontWeight: 'bold', backgroundColor: '#f1f5f9', padding: '2 8', marginBottom: 6, color: '#475569', textTransform: 'uppercase', borderRadius: 2 }}>{x.position}</Text>
              <Txt t={x.description} style={{ color: '#64748b', fontSize: 8 }} />
            </View>
          ))}
        </Row>
        {O.map(s => (
          <Row key={s.id} label={s.title}>
            {s.items.map((x, i) => (
              <View key={i} style={{ marginBottom: 14 }} wrap={false}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#0f172a', marginBottom: 4 }}>{x.title || x.company}</Text>
                <Txt t={x.content || x.description} style={{ color: '#64748b', fontSize: 8 }} />
              </View>
            ))}
          </Row>
        ))}
        <Row label="Skills">
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {Sk.map((s, i) => (
              <View key={i} style={{ flexDirection: 'column', gap: 3 }}>
                <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#334155', textTransform: 'uppercase' }}>{s}</Text>
                <View style={{ height: 2, width: 40, backgroundColor: '#f1f5f9' }}><View style={{ height: 2, width: 26, backgroundColor: C }} /></View>
              </View>
            ))}
          </View>
        </Row>
        <Row label="Education" last>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
            {Ed.map((e, i) => (
              <View key={i} style={{ width: '45%' }}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#0f172a' }}>{e.degree}</Text>
                <Text style={{ fontSize: 8, color: '#64748b', fontWeight: 'bold', marginTop: 2, textTransform: 'uppercase' }}>{e.institution}</Text>
                <Text style={{ fontSize: 7, color: '#cbd5e1', marginTop: 3, textTransform: 'uppercase' }}>{e.startDate} — {e.endDate}</Text>
              </View>
            ))}
          </View>
        </Row>
      </View>
    </View>
  );
};

/* ══════════════════════════════════════════════════════════════
   7. CREATIVE  ── colored sidebar with initial circle
══════════════════════════════════════════════════════════════ */
const PdfCreative = ({ basics: B, experience: E, education: Ed, skills: Sk, other: O, color: C }) => (
  <View style={{ flex: 1, flexDirection: 'row' }}>
    <View style={{ width: '80pt', backgroundColor: C, alignItems: 'center', padding: 16 }}>
      {B.photo ? (
        <Image src={{ uri: B.photo }} style={{ width: 50, height: 50, borderRadius: 25, marginBottom: 35, border: '2 solid rgba(255,255,255,0.3)' }} />
      ) : (
        <View style={{ width: 42, height: 42, borderRadius: 21, border: '2 solid rgba(255,255,255,0.45)', alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{B.name.charAt(0)}</Text>
        </View>
      )}
      <View style={{ transform: 'rotate(-90deg)', width: 80 }}><Text style={{ fontSize: 9, fontWeight: 'bold', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 3 }}>EXPERIENCE</Text></View>
      <View style={{ transform: 'rotate(-90deg)', width: 80, marginTop: 90 }}><Text style={{ fontSize: 9, fontWeight: 'bold', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 3 }}>EDUCATION</Text></View>
    </View>
    <View style={{ flex: 1, padding: 30 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#0f172a', textTransform: 'uppercase' }}>{B.name}</Text>
      <Text style={{ fontSize: 13, fontWeight: 'bold', color: C, marginTop: 4 }}>{B.title}</Text>
      <View style={{ flexDirection: 'row', gap: 12, marginVertical: 14, fontSize: 7, color: '#94a3b8', fontWeight: 'bold' }}>
        <Text>{B.email}</Text><Text>|</Text><Text>{B.phone}</Text><Text>|</Text><Text>{B.location}</Text>
      </View>
      <View style={{ borderLeft: `4 solid ${C}`, paddingLeft: 12, marginBottom: 22 }}>
        <Text style={{ fontSize: 10, fontStyle: 'italic', color: '#334155', lineHeight: 1.6 }}>{B.summary}</Text>
      </View>
      {/* Experience */}
      <View style={{ marginBottom: 18 }}>
        {E.map((x, i) => (
          <View key={i} style={{ marginBottom: 14 }} wrap={false}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 3 }}>
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#1e293b' }}>{x.position}</Text>
              <View style={{ flex: 1, height: 1, backgroundColor: '#f1f5f9' }} />
            </View>
            <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#94a3b8', marginBottom: 5, textTransform: 'uppercase' }}>{x.company} | {x.startDate}</Text>
            <Txt t={x.description} style={{ color: '#475569', fontSize: 8 }} />
          </View>
        ))}
      </View>
      {/* Custom sections */}
      {O.map(s => (
        <View key={s.id} style={{ marginBottom: 18 }}>
          <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#0f172a', borderBottom: '1 solid #0f172a', paddingBottom: 3, marginBottom: 10, textTransform: 'uppercase' }}>{s.title}</Text>
          {s.items.map((x, j) => (
            <View key={j} style={{ marginBottom: 10 }} wrap={false}>
              <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#1e293b', marginBottom: 3 }}>{x.title || x.company}</Text>
              <Txt t={x.content || x.description} style={{ color: '#475569', fontSize: 8 }} />
            </View>
          ))}
        </View>
      ))}
      {/* Skills & Education row */}
      <View style={{ flexDirection: 'row', gap: 20, marginTop: 'auto' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#0f172a', borderBottom: '1 solid #0f172a', paddingBottom: 3, marginBottom: 8, textTransform: 'uppercase' }}>Skills</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
            {Sk.map((s, i) => <Text key={i} style={{ fontSize: 7, backgroundColor: C, color: 'white', padding: '2 5', fontWeight: 'bold', borderRadius: 2 }}>{s}</Text>)}
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#0f172a', borderBottom: '1 solid #0f172a', paddingBottom: 3, marginBottom: 8, textTransform: 'uppercase' }}>Education</Text>
          {Ed.map((e, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#1e293b' }}>{e.degree}</Text>
              <Text style={{ fontSize: 7, color: '#64748b' }}>{e.institution}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  </View>
);

/* ══════════════════════════════════════════════════════════════
   8. MINIMAL  ── ultra-clean, left labels 25%, text right
══════════════════════════════════════════════════════════════ */
const PdfMinimal = ({ basics: B, experience: E, education: Ed, skills: Sk, other: O, color: C }) => {
  const MRow = ({ label, children }) => (
    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
      <Text style={{ width: '22%', fontSize: 7, fontWeight: 'bold', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 2, paddingTop: 1 }}>{label}</Text>
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
  return (
    <View style={{ flex: 1, padding: 44 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <View>
          <Text style={{ fontSize: 26, fontWeight: 'light', color: '#0f172a', marginBottom: 4 }}>{B.name}</Text>
          <Text style={{ fontSize: 9, fontWeight: 'bold', color: C, textTransform: 'uppercase', letterSpacing: 2 }}>{B.title}</Text>
        </View>
        {B.photo && <Image src={{ uri: B.photo }} style={{ width: 50, height: 50, borderRadius: 25 }} />}
      </View>
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 28, fontSize: 8, color: '#64748b' }}>
        <Text>{B.email}</Text><Text style={{ color: '#e2e8f0' }}>/</Text><Text>{B.phone}</Text><Text style={{ color: '#e2e8f0' }}>/</Text><Text>{B.location}</Text>
      </View>
      <MRow label="Summary"><Text style={{ fontSize: 9, color: '#475569', lineHeight: 1.7 }}>{B.summary}</Text></MRow>
      <MRow label="Experience">
        {E.map((x, i) => (
          <View key={i} style={{ marginBottom: 14 }} wrap={false}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#1e293b' }}>{x.company}</Text>
              <Text style={{ fontSize: 7, color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase' }}>{x.startDate} — {x.endDate}</Text>
            </View>
            <Text style={{ fontSize: 8, fontWeight: 'bold', color: C, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 5 }}>{x.position}</Text>
            <Txt t={x.description} style={{ color: '#64748b', fontSize: 8 }} />
          </View>
        ))}
      </MRow>
      {O.map(s => (
        <MRow key={s.id} label={s.title}>
          {s.items.map((x, i) => (
            <View key={i} style={{ marginBottom: 12 }} wrap={false}>
              <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#1e293b', marginBottom: 3 }}>{x.title || x.company}</Text>
              <Txt t={x.content || x.description} style={{ color: '#64748b', fontSize: 8 }} />
            </View>
          ))}
        </MRow>
      ))}
      <MRow label="Skills">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {Sk.map((s, i) => <Text key={i} style={{ fontSize: 8, fontWeight: 'bold', color: '#334155', backgroundColor: '#f8fafc', padding: '3 8', borderRadius: 3, textTransform: 'uppercase' }}>{s}</Text>)}
        </View>
      </MRow>
      <MRow label="Education">
        {Ed.map((e, i) => (
          <View key={i} style={{ marginBottom: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#1e293b' }}>{e.degree}</Text>
              <Text style={{ fontSize: 7, color: '#94a3b8', fontWeight: 'bold' }}>{e.endDate}</Text>
            </View>
            <Text style={{ fontSize: 8, color: '#64748b', marginTop: 2, textTransform: 'uppercase', letterSpacing: 1 }}>{e.institution}</Text>
          </View>
        ))}
      </MRow>
    </View>
  );
};

/* ══════════════════════════════════════════════════════════════
   9. ELEGANT  ── centered everything, dividers between sections
══════════════════════════════════════════════════════════════ */
const PdfElegant = ({ basics: B, experience: E, education: Ed, skills: Sk, other: O, color: C }) => {
  const Divider = ({ label }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 18, marginTop: 10 }}>
      <View style={{ flex: 1, height: 1, backgroundColor: '#f1f5f9' }} />
      <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 4 }}>{label}</Text>
      <View style={{ flex: 1, height: 1, backgroundColor: '#f1f5f9' }} />
    </View>
  );
  return (
    <View style={{ flex: 1, padding: 44, backgroundColor: '#fdfcfb', alignItems: 'center' }}>
      <View style={{ width: '100%', maxWidth: 480 }}>
        {/* Header */}
        <View style={{ alignItems: 'center', marginBottom: 28 }}>
          {B.photo && <Image src={{ uri: B.photo }} style={{ width: 60, height: 60, borderRadius: 30, marginBottom: 15 }} />}
          <Text style={{ fontSize: 30, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 5 }}>{B.name}<Text style={{ color: C }}>*</Text></Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 }}>
            <View style={{ width: 24, height: 1, backgroundColor: '#e2e8f0' }} />
            <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2 }}>{B.title}</Text>
            <View style={{ width: 24, height: 1, backgroundColor: '#e2e8f0' }} />
          </View>
          <Text style={{ fontSize: 8, color: '#64748b', fontStyle: 'italic', marginTop: 10 }}>{B.email}  /  {B.phone}  /  {B.location}</Text>
        </View>
        <Text style={{ fontSize: 10, color: '#475569', fontStyle: 'italic', lineHeight: 1.8, textAlign: 'center', marginBottom: 20 }}>{B.summary}</Text>
        <Divider label="Experience" />
        {E.map((x, i) => (
          <View key={i} style={{ marginBottom: 20, alignItems: 'center' }} wrap={false}>
            <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 5 }}>{x.startDate} — {x.endDate}</Text>
            <Text style={{ fontSize: 16, color: '#0f172a', marginBottom: 3 }}>{x.company}</Text>
            <Text style={{ fontSize: 8, fontWeight: 'bold', color: C, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>{x.position}</Text>
            <Txt t={x.description} style={{ color: '#64748b', fontSize: 8, textAlign: 'center' }} />
          </View>
        ))}
        {O.map(s => (
          <View key={s.id}>
            <Divider label={s.title} />
            {s.items.map((x, i) => (
              <View key={i} style={{ alignItems: 'center', marginBottom: 16 }} wrap={false}>
                <Text style={{ fontSize: 14, color: '#0f172a', marginBottom: 5 }}>{x.title || x.company}</Text>
                <Txt t={x.content || x.description} style={{ color: '#64748b', fontSize: 8, textAlign: 'center' }} />
              </View>
            ))}
          </View>
        ))}
        <Divider label="Skills" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
          {Sk.map((s, i) => (
            <View key={i} style={{ alignItems: 'center', gap: 3 }}>
              <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#334155', textTransform: 'uppercase', letterSpacing: 2 }}>{s}</Text>
              <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: C }} />
            </View>
          ))}
        </View>
        <Divider label="Education" />
        {Ed.map((e, i) => (
          <View key={i} style={{ alignItems: 'center', marginBottom: 14 }}>
            <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }}>{e.startDate} — {e.endDate}</Text>
            <Text style={{ fontSize: 13, color: '#0f172a' }}>{e.degree}</Text>
            <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginTop: 3 }}>{e.institution}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

/* ══════════════════════════════════════════════════════════════
   10. FUNCTIONAL  ── main left col, structured right sidebar
══════════════════════════════════════════════════════════════ */
const PdfFunctional = ({ basics: B, experience: E, education: Ed, skills: Sk, other: O, color: C }) => (
  <View style={{ flex: 1, flexDirection: 'row' }}>
    {/* Main */}
    <View style={{ flex: 1, padding: 30, borderRight: '2 solid #f8fafc' }}>
      <View style={{ borderBottom: '2 solid #f8fafc', paddingBottom: 20, marginBottom: 22, flexDirection: 'row', gap: 15, alignItems: 'center' }}>
      {B.photo && <Image src={{ uri: B.photo }} style={{ width: 50, height: 50, borderRadius: 25 }} />}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#0f172a' }}>{B.name}</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: C, textTransform: 'uppercase', letterSpacing: 2, marginTop: 5 }}>{B.title}</Text>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 10, fontSize: 7, color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase' }}>
            <Text>{B.email}</Text><Text>•</Text><Text>{B.phone}</Text><Text>•</Text><Text>{B.location}</Text>
          </View>
        </View>
      </View>
      <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 8 }}>Summary</Text>
      <View style={{ borderLeft: `4 solid ${C}`, paddingLeft: 12, marginBottom: 22 }}>
        <Text style={{ fontSize: 9, color: '#475569', lineHeight: 1.6 }}>{B.summary}</Text>
      </View>
      <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 12 }}>Experience</Text>
      {E.map((x, i) => (
        <View key={i} style={{ marginBottom: 18 }} wrap={false}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#1e293b' }}>{x.company}</Text>
            <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#cbd5e1', textTransform: 'uppercase' }}>{x.startDate} — {x.endDate}</Text>
          </View>
          <Text style={{ fontSize: 8, fontWeight: 'bold', color: C, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 6 }}>{x.position}</Text>
          <View style={{ borderLeft: '1 solid #f1f5f9', paddingLeft: 10 }}><Txt t={x.description} style={{ color: '#64748b', fontSize: 8 }} /></View>
        </View>
      ))}
      {O.map(s => (
        <View key={s.id} style={{ marginTop: 14 }}>
          <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 10 }}>{s.title}</Text>
          {s.items.map((x, j) => (
            <View key={j} style={{ marginBottom: 14 }} wrap={false}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#1e293b', marginBottom: 4 }}>{x.title || x.company}</Text>
              <View style={{ borderLeft: '1 solid #f1f5f9', paddingLeft: 10 }}><Txt t={x.content || x.description} style={{ color: '#64748b', fontSize: 8 }} /></View>
            </View>
          ))}
        </View>
      ))}
    </View>
    {/* Sidebar */}
    <View style={{ width: '30%', backgroundColor: '#f9fafb', padding: 20 }}>
      <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>Core Stack</Text>
      {Sk.map((s, i) => (
        <View key={i} style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#1e293b', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 3 }}>{s}</Text>
          <View style={{ height: 3, backgroundColor: '#e2e8f0', borderRadius: 2 }}><View style={{ height: 3, width: '80%', backgroundColor: C, borderRadius: 2 }} /></View>
        </View>
      ))}
      <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12, marginTop: 24 }}>Credentials</Text>
      {Ed.map((e, i) => (
        <View key={i} style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#1e293b', textTransform: 'uppercase', letterSpacing: 1 }}>{e.degree}</Text>
          <Text style={{ fontSize: 7, fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginTop: 2 }}>{e.institution}</Text>
          <Text style={{ fontSize: 6, fontWeight: 'bold', color: '#cbd5e1', textTransform: 'uppercase', marginTop: 2 }}>{e.startDate} — {e.endDate}</Text>
        </View>
      ))}
    </View>
  </View>
);

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════ */
const PDFResume = ({ data }) => {
  const { basics, sections, settings, templateId } = data;
  const C = settings?.color || '#0ea5e9';
  const experience = sections.find(s => s.id === 'experience')?.items || [];
  const education  = sections.find(s => s.id === 'education')?.items  || [];
  const skills     = sections.find(s => s.id === 'skills')?.items     || [];
  const other      = sections.filter(s => !['basics','experience','education','skills'].includes(s.id));
  const p = { basics, experience, education, skills, other, color: C };

  return (
    <Document title={`${basics.name} - Resume`}>
      <Page size="A4" style={base.page}>
        {templateId === 'executive'    && <PdfExecutive    {...p} />}
        {templateId === 'professional' && <PdfProfessional {...p} />}
        {templateId === 'corporate'    && <PdfCorporate    {...p} />}
        {templateId === 'modern'       && <PdfModern       {...p} />}
        {templateId === 'startup'      && <PdfStartup      {...p} />}
        {templateId === 'swiss'        && <PdfSwiss        {...p} />}
        {templateId === 'creative'     && <PdfCreative     {...p} />}
        {templateId === 'minimal'      && <PdfMinimal      {...p} />}
        {templateId === 'elegant'      && <PdfElegant      {...p} />}
        {templateId === 'functional'   && <PdfFunctional   {...p} />}
        {!['executive','professional','corporate','modern','startup','swiss','creative','minimal','elegant','functional'].includes(templateId) && <PdfProfessional {...p} />}
      </Page>
    </Document>
  );
};

export default PDFResume;
