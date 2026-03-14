import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

export default function Login() {
  const [form, setForm]     = useState({ username: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const { login }           = useAuth();
  const navigate            = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await api.post('/auth/login', form);
      login(res.data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center',
      justifyContent:'center', background:'var(--bg)', padding:24 }}>
      {/* BG grid */}
      <div className="grid-bg" />
      <div className="orb orb-1" />

      <div style={{ width:'100%', maxWidth:400, position:'relative', zIndex:1 }}>
        {/* Back */}
        <button onClick={() => navigate('/')}
          style={{ fontFamily:'var(--font-code)', fontSize:'0.8rem', color:'var(--text-muted)',
            display:'flex', alignItems:'center', gap:8, marginBottom:28, transition:'color 0.2s',
            background:'none', border:'none', cursor:'pointer' }}
          onMouseEnter={e => e.currentTarget.style.color='var(--primary)'}
          onMouseLeave={e => e.currentTarget.style.color='var(--text-muted)'}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Portfolio
        </button>

        <div className="card" style={{ padding:'36px 32px' }}>
          {/* Icon */}
          <div style={{ width:56, height:56, borderRadius:14, background:'var(--primary-g)',
            border:'1px solid var(--border-h)', display:'flex', alignItems:'center',
            justifyContent:'center', marginBottom:24 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          </div>

          <h1 style={{ fontFamily:'var(--font-head)', fontSize:'1.6rem', fontWeight:800, marginBottom:6, color:'var(--text)' }}>
            Admin Login
          </h1>
          <p style={{ color:'var(--text-muted)', fontSize:'0.88rem', marginBottom:28 }}>
            Sign in to manage your portfolio content.
          </p>

          {error && (
            <div style={{ background:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.3)',
              borderRadius:8, padding:'10px 14px', marginBottom:18,
              color:'#f87171', fontSize:'0.85rem', fontFamily:'var(--font-code)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="label">Username</label>
              <input className="input" type="text" placeholder="Enter username"
                value={form.username} onChange={e => setForm({...form, username: e.target.value})}
                required autoFocus />
            </div>
            <div className="form-group">
              <label className="label">Password</label>
              <input className="input" type="password" placeholder="Enter password"
                value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                required />
            </div>
            <button type="submit" className="btn btn-primary"
              style={{ width:'100%', justifyContent:'center', marginTop:8, padding:'13px' }}
              disabled={loading}>
              {loading ? <><div className="spinner" />Signing in...</> : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Setup hint */}
        <p style={{ textAlign:'center', marginTop:20, fontFamily:'var(--font-code)',
          fontSize:'0.75rem', color:'var(--text-muted)' }}>
          First time? POST to{' '}
          <code style={{ color:'var(--primary)', background:'var(--primary-g)',
            padding:'2px 6px', borderRadius:4 }}>
            /api/auth/setup
          </code>{' '}to create admin account
        </p>
      </div>
    </div>
  );
}
