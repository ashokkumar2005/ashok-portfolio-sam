import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Footer({ profile }) {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  return (
    <footer style={{ background:'var(--bg)', borderTop:'1px solid var(--border)', position:'relative', zIndex:1 }}>
      <div className="container" style={{ padding:'48px 24px' }}>
        {/* Top row */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
          flexWrap:'wrap', gap:20, marginBottom:32 }}>
          {/* Logo */}
          <div style={{ fontFamily:'var(--font-code)', fontSize:'1.1rem', fontWeight:600, color:'var(--primary)' }}>
            <span style={{ opacity:0.5, color:'var(--text-dim)' }}>&lt;</span>
            {profile?.name?.split(' ')[0] || 'Ashok'}
            <span style={{ color:'var(--accent)', marginLeft:2 }}>/</span>
            <span style={{ opacity:0.5, color:'var(--text-dim)' }}>&gt;</span>
          </div>

          {/* Nav */}
          <nav style={{ display:'flex', gap:24 }}>
            {['#about','#skills','#projects','#contact'].map((href, i) => (
              <a key={i} href={href} style={{ fontFamily:'var(--font-code)', fontSize:'0.8rem',
                color:'var(--text-muted)', transition:'color 0.2s' }}
                onMouseEnter={e => e.target.style.color='var(--primary)'}
                onMouseLeave={e => e.target.style.color='var(--text-muted)'}>
                {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div style={{ height:1, background:'linear-gradient(90deg, transparent, var(--border), transparent)',
          marginBottom:24 }} />

        {/* Bottom row */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
          flexWrap:'wrap', gap:16 }}>
          <p style={{ fontFamily:'var(--font-code)', fontSize:'0.78rem', color:'var(--text-muted)' }}>
            © {new Date().getFullYear()} {profile?.name || 'Ashokkumar T'} · Built with{' '}
            <span style={{ color:'#f472b6' }}>♥</span> using MERN Stack
          </p>

          {/* Admin Login */}
          <button
            onClick={() => navigate(isAdmin ? '/admin' : '/login')}
            style={{
              fontFamily:'var(--font-code)', fontSize:'0.75rem',
              color:'var(--text-muted)', padding:'6px 14px',
              border:'1px solid rgba(100,116,139,0.2)', borderRadius:6,
              background:'transparent', cursor:'pointer', transition:'all 0.2s',
              display:'flex', alignItems:'center', gap:8
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--primary)';
              e.currentTarget.style.borderColor = 'var(--border-h)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.borderColor = 'rgba(100,116,139,0.2)';
            }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
            {isAdmin ? 'Dashboard' : 'Admin Login'}
          </button>
        </div>
      </div>
    </footer>
  );
}
