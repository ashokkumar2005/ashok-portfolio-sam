export default function Address({ profile }) {
  const addr = profile?.address || {
    street: 'East Street, Kazhumangalam',
    post: 'Udayarpalayam Post',
    district: 'Ariyalur District',
    state: 'Tamil Nadu',
    pincode: '621 806',
    country: 'India',
  };

  return (
    <section id="address">
      <div className="container" style={{ position:'relative', zIndex:1 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}
          className="address-grid">
          {/* Left */}
          <div>
            <div className="section-label">Location</div>
            <h2 className="section-title">Address</h2>
            <p style={{ color:'var(--text-muted)', fontSize:'0.95rem', lineHeight:1.8, marginBottom:32 }}>
              Currently based in Tamil Nadu, India. Open to remote opportunities worldwide.
            </p>

            {/* Address card */}
            <div className="card" style={{ padding:'28px 24px' }}>
              <div style={{ display:'flex', gap:16 }}>
                <div style={{ width:44, height:44, borderRadius:10, background:'var(--primary-g)',
                  border:'1px solid var(--border-h)', display:'flex', alignItems:'center',
                  justifyContent:'center', flexShrink:0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div style={{ fontFamily:'var(--font-code)', fontSize:'0.88rem', lineHeight:2, color:'var(--text-dim)' }}>
                  <div style={{ color:'var(--text)', fontWeight:600, marginBottom:4, fontFamily:'var(--font-head)' }}>
                    Permanent Address
                  </div>
                  <div>{addr.street}</div>
                  <div>{addr.post}</div>
                  <div>{addr.district}</div>
                  <div>
                    <span style={{ color:'var(--primary)' }}>{addr.state}</span>
                    {addr.pincode && <span> – {addr.pincode}</span>}
                  </div>
                  <div>{addr.country}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map placeholder + details */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {/* Stylized map card */}
            <div className="card" style={{ height:220, position:'relative', overflow:'hidden',
              display:'flex', alignItems:'center', justifyContent:'center' }}>
              {/* Grid background */}
              <div style={{ position:'absolute', inset:0,
                backgroundImage:'linear-gradient(rgba(56,189,248,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.05) 1px, transparent 1px)',
                backgroundSize:'30px 30px' }} />
              {/* Pin */}
              <div style={{ position:'relative', textAlign:'center' }}>
                <div style={{ width:56, height:56, borderRadius:'50%', background:'var(--primary-g)',
                  border:'2px solid var(--primary)', display:'flex', alignItems:'center',
                  justifyContent:'center', margin:'0 auto 12px', animation:'pulse-ring 2.5s infinite' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div style={{ fontFamily:'var(--font-code)', fontSize:'0.8rem', color:'var(--primary)' }}>
                  Ariyalur, Tamil Nadu
                </div>
                <div style={{ fontFamily:'var(--font-code)', fontSize:'0.72rem', color:'var(--text-muted)', marginTop:4 }}>
                  India 🇮🇳
                </div>
              </div>
            </div>

            {/* Info chips */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              {[
                { icon:'🌐', label:'Open to Remote', val:'Worldwide' },
                { icon:'⏰', label:'Timezone',       val:'IST (UTC+5:30)' },
                { icon:'💬', label:'Languages',      val:'Tamil, English' },
                { icon:'✈️', label:'Availability',   val:'Immediate' },
              ].map((item, i) => (
                <div key={i} className="card" style={{ padding:'14px 16px' }}>
                  <div style={{ fontSize:'1.2rem', marginBottom:4 }}>{item.icon}</div>
                  <div style={{ fontFamily:'var(--font-code)', fontSize:'0.7rem', color:'var(--text-muted)' }}>
                    {item.label}
                  </div>
                  <div style={{ fontFamily:'var(--font-head)', fontSize:'0.82rem', fontWeight:600, color:'var(--text)' }}>
                    {item.val}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .address-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
