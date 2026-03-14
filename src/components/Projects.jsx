export default function Projects({ projects = [] }) {
  if (!projects.length) return null;

  return (
    <section id="projects" style={{ background:'var(--bg-2)' }}>
      <div className="divider" />
      <div className="container" style={{ padding:'100px 24px', position:'relative', zIndex:1 }}>
        <div style={{ marginBottom:56 }}>
          <div className="section-label">Portfolio</div>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-desc">
            Real-world applications built to solve problems and sharpen skills.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:24 }}>
          {projects.map((proj, i) => (
            <div key={proj._id} className="card" style={{ padding:0, overflow:'hidden', display:'flex', flexDirection:'column' }}>
              {/* Project Image */}
              <div style={{ width:'100%', height:180, overflow:'hidden',
                background:'linear-gradient(135deg, var(--bg), var(--bg-card))',
                display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
                {proj.image ? (
                  <img src={proj.image} alt={proj.title}
                    style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                ) : (
                  <div style={{ textAlign:'center' }}>
                    <div style={{ fontSize:'3rem', marginBottom:8, opacity:0.3 }}>{'</>'}</div>
                    <div style={{ fontFamily:'var(--font-code)', fontSize:'0.75rem', color:'var(--text-muted)' }}>
                      No preview
                    </div>
                  </div>
                )}
                {/* Number badge */}
                <div style={{ position:'absolute', top:12, right:12,
                  background:'rgba(6,13,26,0.8)', border:'1px solid var(--border)',
                  borderRadius:6, padding:'3px 10px',
                  fontFamily:'var(--font-code)', fontSize:'0.72rem', color:'var(--primary)' }}>
                  {String(i+1).padStart(2,'0')}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding:'22px 24px', flex:1, display:'flex', flexDirection:'column' }}>
                <h3 style={{ fontFamily:'var(--font-head)', fontSize:'1.1rem', fontWeight:700,
                  color:'var(--text)', marginBottom:10 }}>
                  {proj.title}
                </h3>
                <p style={{ fontSize:'0.88rem', color:'var(--text-muted)', lineHeight:1.7, flex:1, marginBottom:16 }}>
                  {proj.description}
                </p>

                {/* Tech stack tags */}
                {proj.tech?.length > 0 && (
                  <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:16 }}>
                    {proj.tech.map((t, j) => (
                      <span key={j} className="tag" style={{ fontSize:'0.7rem', padding:'3px 10px' }}>{t}</span>
                    ))}
                  </div>
                )}

                {/* Links */}
                <div style={{ display:'flex', gap:10, marginTop:'auto' }}>
                  {proj.github && (
                    <a href={proj.github} target="_blank" rel="noopener noreferrer"
                      className="btn btn-outline"
                      style={{ padding:'8px 16px', fontSize:'0.78rem', flex:1, justifyContent:'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      Code
                    </a>
                  )}
                  {proj.demo && (
                    <a href={proj.demo} target="_blank" rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ padding:'8px 16px', fontSize:'0.78rem', flex:1, justifyContent:'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="divider" />
    </section>
  );
}
