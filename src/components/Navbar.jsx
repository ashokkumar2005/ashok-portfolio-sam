import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ profileName }) {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const { isAdmin, logout }         = useAuth();
  const navigate                    = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(6,13,26,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(56,189,248,0.08)' : 'none',
    }}>
      <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:68 }}>
        {/* Logo */}
        <a href="#hero" style={{ fontFamily:'var(--font-code)', fontSize:'1rem', fontWeight:600, color:'var(--primary)' }}>
          <span style={{ opacity:0.5, color:'var(--text-dim)' }}>&lt;</span>
          {profileName?.split(' ')[0] || 'Ashok'}
          <span style={{ color:'var(--accent)', marginLeft:2 }}>/</span>
          <span style={{ opacity:0.5, color:'var(--text-dim)' }}>&gt;</span>
        </a>

        {/* Desktop Links */}
        <ul style={{ display:'flex', gap:8, listStyle:'none' }} className="desktop-nav">
          {links.map((l, i) => (
            <li key={i}>
              <a href={l.href} style={{
                fontFamily:'var(--font-code)', fontSize:'0.82rem',
                color:'var(--text-dim)', padding:'8px 14px', borderRadius:8,
                transition:'all 0.2s', display:'block'
              }}
              onMouseEnter={e => { e.target.style.color='var(--primary)'; e.target.style.background='var(--primary-g)'; }}
              onMouseLeave={e => { e.target.style.color='var(--text-dim)'; e.target.style.background='transparent'; }}>
                <span style={{ color:'var(--primary)', marginRight:4, opacity:0.7 }}>{String(i+1).padStart(2,'0')}.</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          {isAdmin ? (
            <>
              <button className="btn btn-outline" style={{ padding:'7px 16px', fontSize:'0.8rem' }}
                onClick={() => navigate('/admin')}>Dashboard</button>
              <button className="btn btn-ghost" onClick={logout}>Logout</button>
            </>
          ) : null}
          {/* Hamburger */}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}
            style={{ display:'none', flexDirection:'column', gap:5, padding:8 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ width:22, height:2, background:'var(--text)', borderRadius:2, display:'block',
                transition:'all 0.3s',
                transform: menuOpen
                  ? i===0 ? 'rotate(45deg) translate(5px,5px)'
                  : i===1 ? 'scaleX(0)'
                  : 'rotate(-45deg) translate(5px,-5px)'
                  : 'none'
              }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ background:'var(--bg-2)', borderTop:'1px solid var(--border)', padding:'12px 24px 20px' }}>
          {links.map((l, i) => (
            <a key={i} href={l.href} style={{ display:'block', padding:'12px 0', color:'var(--text-dim)',
              fontFamily:'var(--font-code)', fontSize:'0.9rem', borderBottom:'1px solid var(--border)' }}
              onClick={() => setMenuOpen(false)}>
              <span style={{ color:'var(--primary)', marginRight:8 }}>{String(i+1).padStart(2,'0')}.</span>{l.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
