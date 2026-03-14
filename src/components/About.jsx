export default function About({ profile }) {
  const about = profile?.about ||
    `Ashokkumar T is a MERN stack developer from Ariyalur, Tamil Nadu. He focuses mainly on backend development using Node.js and Express.js while building full stack applications with MongoDB and React.

He has practical experience building REST APIs, implementing authentication with JWT, handling file uploads using Multer, and applying security practices like Helmet, CORS, and rate limiting.

Ashokkumar continuously improves his backend development skills by building real-world projects and learning scalable API design.`;

  const highlights = [
    { icon: '⚡', title: 'Backend Focus',  desc: 'Node.js & Express.js expert' },
    { icon: '🛡️', title: 'Security First', desc: 'JWT, Helmet, CORS, Rate Limiting' },
    { icon: '📦', title: 'API Design',     desc: 'RESTful architecture patterns' },
    { icon: '🚀', title: 'Full Stack',     desc: 'MongoDB + React + Node.js' },
  ];

  return (
    <section id="about" style={{ background:'var(--bg-2)' }}>
      <div className="divider" />
      <div className="container" style={{ padding:'100px 24px', position:'relative', zIndex:1 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'start' }}
          className="about-grid">
          {/* Left: Text */}
          <div>
            <div className="section-label">About Me</div>
            <h2 className="section-title">Building Scalable<br/>Backend Systems</h2>
            <div style={{ marginTop:24 }}>
              {about.split('\n\n').filter(Boolean).map((para, i) => (
                <p key={i} style={{ color:'var(--text-dim)', lineHeight:1.9, fontSize:'0.97rem',
                  marginBottom:18, padding: i===0?'16px 20px 0':0,
                  borderLeft: i===0 ? '3px solid var(--primary)' : 'none',
                  paddingLeft: i===0 ? 20 : 0 }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Code snippet */}
            <div className="card" style={{ marginTop:28, fontFamily:'var(--font-code)', fontSize:'0.82rem' }}>
              <div style={{ display:'flex', gap:8, marginBottom:14 }}>
                {['#ff5f57','#febc2e','#28c840'].map((c,i) => (
                  <div key={i} style={{ width:10, height:10, borderRadius:'50%', background:c }} />
                ))}
              </div>
              <div style={{ color:'var(--text-muted)', lineHeight:2 }}>
                <span style={{ color:'#818cf8' }}>const</span>{' '}
                <span style={{ color:'var(--primary)' }}>developer</span>{' '}
                <span style={{ color:'var(--text-dim)' }}>=</span>{' '}<span style={{ color:'#f472b6' }}>{'{'}</span>
                <br />
                {'  '}<span style={{ color:'var(--accent2)' }}>name</span>
                <span style={{ color:'var(--text-dim)' }}>:</span>{' '}
                <span style={{ color:'#fbbf24' }}>"{profile?.name || 'Ashokkumar T'}"</span>,
                <br />
                {'  '}<span style={{ color:'var(--accent2)' }}>focus</span>
                <span style={{ color:'var(--text-dim)' }}>:</span>{' '}
                <span style={{ color:'#fbbf24' }}>"Backend Development"</span>,
                <br />
                {'  '}<span style={{ color:'var(--accent2)' }}>stack</span>
                <span style={{ color:'var(--text-dim)' }}>:</span>{' '}
                <span style={{ color:'var(--text-dim)' }}>[</span>
                <span style={{ color:'#fbbf24' }}>"MERN"</span>
                <span style={{ color:'var(--text-dim)' }}>],</span>
                <br />
                {'  '}<span style={{ color:'var(--accent2)' }}>available</span>
                <span style={{ color:'var(--text-dim)' }}>:</span>{' '}
                <span style={{ color:'#34d399' }}>true</span>
                <br />
                <span style={{ color:'#f472b6' }}>{'}'}</span>
              </div>
            </div>
          </div>

          {/* Right: Highlights */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            {highlights.map((h, i) => (
              <div key={i} className="card" style={{
                animationDelay:`${i*0.1}s`, textAlign:'left',
                padding:'24px 20px', cursor:'default'
              }}>
                <div style={{ fontSize:'1.8rem', marginBottom:12, lineHeight:1 }}>{h.icon}</div>
                <div style={{ fontFamily:'var(--font-head)', fontSize:'0.95rem', fontWeight:700,
                  color:'var(--text)', marginBottom:6 }}>{h.title}</div>
                <div style={{ fontSize:'0.8rem', color:'var(--text-muted)', fontFamily:'var(--font-code)' }}>{h.desc}</div>
              </div>
            ))}

            {/* Location card */}
            <div className="card" style={{ gridColumn:'span 2', padding:'20px 24px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:36, height:36, borderRadius:8, background:'var(--primary-g)',
                  border:'1px solid var(--border-h)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize:'0.78rem', color:'var(--text-muted)', fontFamily:'var(--font-code)' }}>Based in</div>
                  <div style={{ fontSize:'0.95rem', fontWeight:600, color:'var(--text)' }}>
                    {profile?.contact?.location || 'Ariyalur, Tamil Nadu, India'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="divider" />

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
