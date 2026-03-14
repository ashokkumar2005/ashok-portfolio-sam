import { useEffect, useState } from 'react';

const roles = [
  'MERN Stack Developer',
  'Backend Specialist',
  'Node.js Engineer',
  'API Architect',
];

export default function Hero({ profile }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIdx];
    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => { setDisplayed(current.slice(0, charIdx+1)); setCharIdx(c=>c+1); }, 80);
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => { setDisplayed(current.slice(0, charIdx-1)); setCharIdx(c=>c-1); }, 40);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setRoleIdx(i => (i+1) % roles.length);
    }
  }, [charIdx, deleting, roleIdx]);

  const imgSrc = profile?.profileImage
    ? profile.profileImage
    : null;

  return (
    <section id="hero" style={{ minHeight:'100vh', display:'flex', alignItems:'center', padding:'120px 0 80px' }}>
      <div className="container" style={{ position:'relative', zIndex:1 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:60, alignItems:'center' }}>
          {/* Left Content */}
          <div style={{ animation:'fadeUp 0.8s ease both' }}>
            {/* Greeting */}
            <div style={{ fontFamily:'var(--font-code)', fontSize:'0.88rem', color:'var(--primary)',
              display:'flex', alignItems:'center', gap:10, marginBottom:24 }}>
              <span style={{ display:'inline-block', width:8, height:8, borderRadius:'50%',
                background:'var(--accent2)', animation:'pulse-ring 2s infinite' }} />
              Available for opportunities
            </div>

            {/* Name */}
            <h1 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight:800, lineHeight:1.1, color:'var(--text)', marginBottom:16,
              animation:'fadeUp 0.8s 0.1s ease both', opacity:0, animationFillMode:'both' }}>
              {profile?.name || 'Ashokkumar T'}
            </h1>

            {/* Typewriter Role */}
            <div style={{ fontFamily:'var(--font-code)', fontSize:'clamp(1.1rem, 2.5vw, 1.4rem)',
              color:'var(--primary)', marginBottom:28, minHeight:'2em',
              animation:'fadeUp 0.8s 0.2s ease both', opacity:0, animationFillMode:'both' }}>
              &gt; {displayed}
              <span style={{ animation:'blink 1s step-end infinite', color:'var(--primary)' }}>|</span>
            </div>

            {/* Bio */}
            <p style={{ fontSize:'1.05rem', color:'var(--text-dim)', lineHeight:1.8, maxWidth:540,
              marginBottom:40, animation:'fadeUp 0.8s 0.3s ease both', opacity:0, animationFillMode:'both' }}>
              {profile?.bio || 'Passionate developer focused on building scalable backend systems using Node.js, Express, and MongoDB.'}
            </p>

            {/* CTA Buttons */}
            <div style={{ display:'flex', gap:16, flexWrap:'wrap',
              animation:'fadeUp 0.8s 0.4s ease both', opacity:0, animationFillMode:'both' }}>
              <a href="#contact" className="btn btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.1 1.22 2 2 0 012.11 0h3a2 2 0 012 1.72c.12.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 7.91A16 16 0 0016.09 18l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0124 19z"/>
                </svg>
                Get In Touch
              </a>
              <a href="#projects" className="btn btn-outline">
                View Projects
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              {profile?.resume && (
                <a href={profile.resume} download className="btn btn-ghost">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  Resume
                </a>
              )}
            </div>

            {/* Stats */}
            <div style={{ display:'flex', gap:32, marginTop:52,
              animation:'fadeUp 0.8s 0.5s ease both', opacity:0, animationFillMode:'both' }}>
              {[
                { num:'1+', label:'Year Experience' },
                { num:'5+', label:'Projects Built' },
                { num:'REST', label:'API Specialist' },
              ].map((s, i) => (
                <div key={i} style={{ borderLeft:'2px solid var(--primary)', paddingLeft:16 }}>
                  <div style={{ fontFamily:'var(--font-head)', fontSize:'1.4rem', fontWeight:700, color:'var(--primary)' }}>{s.num}</div>
                  <div style={{ fontSize:'0.78rem', color:'var(--text-muted)', fontFamily:'var(--font-code)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Profile Image */}
          <div style={{ animation:'fadeUp 0.8s 0.2s ease both', opacity:0, animationFillMode:'both' }}
            className="hero-img-wrap">
            <div style={{ position:'relative', width:280, height:280 }}>
              {/* Rotating ring */}
              <div style={{ position:'absolute', inset:-16, borderRadius:'50%',
                border:'1px dashed rgba(56,189,248,0.3)',
                animation:'spin 20s linear infinite' }} />
              <div style={{ position:'absolute', inset:-30, borderRadius:'50%',
                border:'1px dashed rgba(129,140,248,0.15)',
                animation:'spin 35s linear infinite reverse' }} />
              {/* Corner accents */}
              {[[-6,-6,'0 0'], [-6,'auto','0 auto'], ['auto',-6,'auto 0'], ['auto','auto','auto']].map(([t,r,br],i) => (
                <div key={i} style={{ position:'absolute', top:t, right:r,
                  width:20, height:20,
                  borderTop: i < 2 ? '2px solid var(--primary)' : 'none',
                  borderBottom: i >= 2 ? '2px solid var(--primary)' : 'none',
                  borderLeft: i%2===0 ? '2px solid var(--primary)' : 'none',
                  borderRight: i%2===1 ? '2px solid var(--primary)' : 'none',
                }} />
              ))}
              {/* Image circle */}
              <div style={{ width:'100%', height:'100%', borderRadius:'50%',
                overflow:'hidden', border:'3px solid rgba(56,189,248,0.25)',
                background:'var(--bg-card)',
                boxShadow:'0 0 60px rgba(56,189,248,0.15)',
                animation:'float 4s ease-in-out infinite',
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                {imgSrc ? (
                  <img src={imgSrc} alt="Profile" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                ) : (
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="1">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/>
                    </svg>
                    <span style={{ fontFamily:'var(--font-code)', fontSize:'0.7rem', color:'var(--text-muted)' }}>Upload photo</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:'absolute', bottom:-20, left:'50%', transform:'translateX(-50%)',
          display:'flex', flexDirection:'column', alignItems:'center', gap:6,
          animation:'fadeIn 1s 1s ease both', opacity:0, animationFillMode:'both' }}>
          <span style={{ fontFamily:'var(--font-code)', fontSize:'0.7rem', color:'var(--text-muted)' }}>scroll</span>
          <div style={{ width:1, height:50, background:'linear-gradient(var(--primary), transparent)',
            animation:'float 2s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-img-wrap { display: none; }
          #hero > .container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
