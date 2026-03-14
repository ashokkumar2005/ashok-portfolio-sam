const skillCategories = [
  { key: 'frontend', label: 'Frontend',         icon: '🎨', color: '#f472b6' },
  { key: 'backend',  label: 'Backend',           icon: '⚙️', color: '#38bdf8' },
  { key: 'database', label: 'Database',          icon: '🗄️', color: '#34d399' },
  { key: 'features', label: 'Backend Features',  icon: '🛡️', color: '#818cf8' },
  { key: 'tools',    label: 'Tools',             icon: '🔧', color: '#fbbf24' },
];

export default function Skills({ profile }) {
  const skills = profile?.skills || {
    frontend: ['HTML','CSS','JavaScript','React (basic)'],
    backend:  ['Node.js','Express.js','REST API Development'],
    database: ['MongoDB','Mongoose'],
    features: ['JWT Authentication','Middleware','Error Handling','File Upload (Multer)','Logging (Morgan)','Security (Helmet, CORS)'],
    tools:    ['Git','GitHub','Postman','VS Code'],
  };

  return (
    <section id="skills">
      <div className="container" style={{ position:'relative', zIndex:1 }}>
        <div style={{ textAlign:'center', marginBottom:64 }}>
          <div className="section-label" style={{ justifyContent:'center' }}>
            Tech Stack
          </div>
          <h2 className="section-title" style={{ textAlign:'center' }}>Skills &amp; Expertise</h2>
          <p className="section-desc" style={{ margin:'0 auto', textAlign:'center' }}>
            Technologies I use to build robust, scalable applications from front to back.
          </p>
        </div>

        {/* Skills Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:20 }}>
          {skillCategories.map((cat) => {
            const items = skills[cat.key] || [];
            return (
              <div key={cat.key} className="card" style={{ padding:'28px 24px' }}>
                {/* Header */}
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
                  <div style={{
                    width:42, height:42, borderRadius:10,
                    background:`${cat.color}18`,
                    border:`1px solid ${cat.color}30`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'1.2rem'
                  }}>
                    {cat.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily:'var(--font-head)', fontWeight:700, fontSize:'1rem', color:'var(--text)' }}>
                      {cat.label}
                    </div>
                    <div style={{ fontFamily:'var(--font-code)', fontSize:'0.72rem', color:'var(--text-muted)' }}>
                      {items.length} {items.length === 1 ? 'skill' : 'skills'}
                    </div>
                  </div>
                </div>

                {/* Skill Pills */}
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {items.map((skill, i) => (
                    <span key={i} style={{
                      display:'inline-flex', alignItems:'center', gap:6,
                      padding:'6px 14px',
                      background:`${cat.color}10`,
                      border:`1px solid ${cat.color}25`,
                      borderRadius:999,
                      fontFamily:'var(--font-code)',
                      fontSize:'0.78rem',
                      color: cat.color,
                      transition:'all 0.2s',
                      cursor:'default',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = `${cat.color}22`;
                      e.currentTarget.style.borderColor = `${cat.color}50`;
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = `${cat.color}10`;
                      e.currentTarget.style.borderColor = `${cat.color}25`;
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}>
                      <span style={{ width:5, height:5, borderRadius:'50%', background:cat.color, opacity:0.7 }} />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="card" style={{ marginTop:28, padding:'20px 28px',
          background:'linear-gradient(135deg, rgba(56,189,248,0.06), rgba(129,140,248,0.06))',
          display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ fontSize:'1.5rem' }}>🚀</span>
            <div>
              <div style={{ fontFamily:'var(--font-head)', fontWeight:700, color:'var(--text)', fontSize:'0.95rem' }}>
                Always Learning
              </div>
              <div style={{ fontFamily:'var(--font-code)', fontSize:'0.78rem', color:'var(--text-muted)' }}>
                Continuously expanding MERN stack knowledge
              </div>
            </div>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            {['MongoDB','Express','React','Node.js'].map((t,i) => (
              <span key={i} className="tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
