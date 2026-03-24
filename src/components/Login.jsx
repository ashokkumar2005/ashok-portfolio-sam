import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api'; // ✅ FIXED

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await loginUser(form); // ✅ FIXED API CALL

      login(res.token); // ✅ FIXED TOKEN ACCESS
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setError('Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      padding: 24
    }}>
      <div className="grid-bg" />
      <div className="orb orb-1" />

      <div style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}>

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate('/')}
          style={{
            fontFamily: 'var(--font-code)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 28,
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          ← Back to Portfolio
        </button>

        <div className="card" style={{ padding: '36px 32px' }}>

          <h1 style={{
            fontFamily: 'var(--font-head)',
            fontSize: '1.6rem',
            fontWeight: 800,
            marginBottom: 6,
            color: 'var(--text)'
          }}>
            Admin Login
          </h1>

          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.88rem',
            marginBottom: 28
          }}>
            Sign in to manage your portfolio
          </p>

          {/* ERROR */}
          {error && (
            <div style={{
              background: 'rgba(248,113,113,0.1)',
              border: '1px solid rgba(248,113,113,0.3)',
              borderRadius: 8,
              padding: '10px 14px',
              marginBottom: 18,
              color: '#f87171',
              fontSize: '0.85rem'
            }}>
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              style={{ width: '100%', marginBottom: 12, padding: 10 }}
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              style={{ width: '100%', marginBottom: 12, padding: 10 }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: 12,
                background: '#6366f1',
                color: '#fff',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
