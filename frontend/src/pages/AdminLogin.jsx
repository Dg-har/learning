import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AdminLogin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d1117',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'var(--font-mono)',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: '100%',
          maxWidth: '400px',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div style={{
            fontSize: '0.7rem',
            color: 'var(--neon-green)',
            letterSpacing: '0.15em',
            marginBottom: '0.5rem',
          }}>
            ╔══════════════════════════════╗
          </div>
          <h1 style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.3rem',
            fontWeight: 700,
            color: 'var(--neon-green)',
            letterSpacing: '0.05em',
            marginBottom: '0.25rem',
          }}>
            AAYUSH_OS — ADMIN
          </h1>
          <p style={{ fontSize: '0.7rem', color: '#8b949e' }}>
            Restricted access. Authorized personnel only.
          </p>
          <div style={{
            fontSize: '0.7rem',
            color: 'var(--neon-green)',
            letterSpacing: '0.15em',
            marginTop: '0.5rem',
          }}>
            ╚══════════════════════════════╝
          </div>
        </div>

        {/* Form */}
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dot" style={{ background: '#FF5F57' }} />
            <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
            <div className="terminal-dot" style={{ background: '#28C840' }} />
            <span style={{ fontSize: '0.75rem', color: '#8b949e', marginLeft: '0.5rem' }}>
              login — admin@safal-os
            </span>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--neon-green)', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                $ USERNAME
              </label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm(p => ({ ...p, username: e.target.value }))}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid #30363d',
                  outline: 'none',
                  color: '#e6edf3',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  padding: '0.4rem 0',
                  caretColor: 'var(--neon-green)',
                }}
                placeholder="enter username..."
                autoFocus
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--neon-green)', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                $ PASSWORD
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid #30363d',
                  outline: 'none',
                  color: '#e6edf3',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  padding: '0.4rem 0',
                  caretColor: 'var(--neon-green)',
                }}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p style={{ fontSize: '0.8rem', color: 'var(--hot-pink)', fontFamily: 'var(--font-mono)' }}>
                ❌ {error}
              </p>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                marginTop: '0.5rem',
                background: 'rgba(57,255,20,0.1)',
                border: '1px solid var(--neon-green)',
                borderRadius: '6px',
                color: 'var(--neon-green)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 700,
                padding: '0.75rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                letterSpacing: '0.05em',
                transition: 'all 0.2s',
              }}
            >
              {loading ? '> AUTHENTICATING...' : '> ACCESS SYSTEM'}
            </motion.button>
          </form>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          fontSize: '0.7rem',
          color: '#30363d',
        }}>
          <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            ← back to portfolio
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
