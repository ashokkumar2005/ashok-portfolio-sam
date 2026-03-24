export default function Contact({ profile }) {
  const contact = profile?.contact || {
    email: 'ashokkumar@example.com',
    github: 'https://github.com/ashokkumar',
    location: 'Ariyalur, Tamil Nadu',
  };

  const links = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      color: '#f472b6',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      ),
      label: 'GitHub',
      value: contact.github?.replace('https://',''),
      href: contact.github,
      color: '#818cf8',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: 'Location',
      value: contact.location,
      href: null,
      color: '#34d399',
    },
  ];

  return (
    <section id="contact" style={{ background:'var(--bg-2)' }}>
      <div className="divider" />
      <div className="container" style={{ padding:'100px 24px', position:'relative', zIndex:1 }}>
        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:64 }}>
          <div className="section-label" style={{ justifyContent:'center' }}>Let's Connect</div>
          <h2 className="section-title" style={{ textAlign:'center' }}>Get In Touch</h2>
          <p className="section-desc" style={{ margin:'0 auto', textAlign:'center' }}>
            I'm open to full-time roles, freelance projects, and collaborations.
            Don't hesitate to reach out!
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, maxWidth:860, margin:'0 auto' }}
          className="contact-grid">
          {/* Left: Contact cards */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {links.map((link, i) => (
              <div key={i} className="card" style={{ padding:'22px 24px' }}
                onClick={() => link.href && window.open(link.href, '_blank')}>
                <div style={{ display:'flex', alignItems:'center', gap:16, cursor: link.href ? 'pointer' : 'default' }}>
                  <div style={{
                    width:48, height:48, borderRadius:12,
                    background:`${link.color}12`,
                    border:`1px solid ${link.color}25`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color: link.color, flexShrink:0
                  }}>
                    {link.icon}
                  </div>
                  <div style={{ overflow:'hidden' }}>
                    <div style={{ fontFamily:'var(--font-code)', fontSize:'0.72rem',
                      color:'var(--text-muted)', marginBottom:3 }}>
                      {link.label}
                    </div>
                    <div style={{ fontFamily:'var(--font-head)', fontSize:'0.95rem', fontWeight:600,
                      color: link.href ? link.color : 'var(--text)',
                      overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {link.value}
                    </div>
                  </div>
                  {link.href && (
                    <div style={{ marginLeft:'auto', color:'var(--text-muted)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right: CTA card */}
          <div className="card" style={{
            background:'linear-gradient(135deg, rgba(56,189,248,0.06), rgba(129,140,248,0.06))',
            border:'1px solid rgba(56,189,248,0.15)',
            display:'flex', flexDirection:'column', alignItems:'center',
            justifyContent:'center', textAlign:'center', padding:'40px 28px', gap:20
          }}>
            <div style={{ fontSize:'3rem' }}>🤝</div>
            <h3 style={{ fontFamily:'var(--font-head)', fontSize:'1.3rem', fontWeight:700, color:'var(--text)' }}>
              Let's Build Something
            </h3>
            <p style={{ color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:1.7 }}>
              Whether you have a project idea, a job opportunity, or just want to connect — my inbox is always open.
            </p>
            <a href={`mailto:${contact.email}`} className="btn btn-primary" style={{ width:'100%', justifyContent:'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.1 1.22 2 2 0 012.11 0h3a2 2 0 012 1.72c.12.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 7.91A16 16 0 0016.09 18l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0124 19z"/>
              </svg>
              Say Hello 👋
            </a>
            {profile?.resume && (
              <a href={profile.resume} download className="btn btn-outline" style={{ width:'100%', justifyContent:'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                Download Resume
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="divider" />

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
