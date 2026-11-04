import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

// ─── Sidebar ────────────────────────────────────────────
const Sidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const items = [
    { id: 'dashboard', label: 'DASHBOARD', icon: '▣' },
    { id: 'projects', label: 'PROJECTS', icon: '🧪' },
    { id: 'messages', label: 'MESSAGES', icon: '📬' },
    { id: 'settings', label: 'SETTINGS', icon: '⚙' },
  ];

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <aside className="admin-sidebar">
      {/* Logo */}
      <div style={{
        padding: '1.5rem 1.25rem',
        borderBottom: '1px solid #30363d',
        fontFamily: 'var(--font-mono)',
      }}>
        <div style={{ fontSize: '0.65rem', color: '#30363d', marginBottom: '0.25rem' }}>╔════════════════╗</div>
        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--neon-green)' }}>SAFAL_OS</div>
        <div style={{ fontSize: '0.65rem', color: '#30363d', marginTop: '0.1rem' }}>╚════════════════╝</div>
        <div style={{ fontSize: '0.65rem', color: '#8b949e', marginTop: '0.5rem' }}>Admin Control Panel</div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '1rem 0' }}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`admin-nav-item ${active === item.id ? 'active' : ''}`}
            style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
          >
            <span>{item.icon}</span>
            <span>{'>'} {item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ position: 'absolute', bottom: '1.5rem', left: 0, width: '100%', padding: '0 1rem' }}>
        <button
          onClick={logout}
          style={{
            width: '100%',
            background: 'rgba(255,45,120,0.1)',
            border: '1px solid rgba(255,45,120,0.3)',
            borderRadius: '6px',
            color: 'var(--hot-pink)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            fontWeight: 600,
            padding: '0.6rem',
            cursor: 'pointer',
          }}
        >
          {'>'} LOGOUT
        </button>
        <a
          href="/"
          style={{
            display: 'block',
            textAlign: 'center',
            marginTop: '0.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: '#30363d',
            textDecoration: 'none',
          }}
        >
          ← back to portfolio
        </a>
      </div>
    </aside>
  );
};

// ─── Dashboard Tab ───────────────────────────────────────
const DashboardTab = ({ messageCount, projectCount }) => (
  <div>
    <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', color: 'var(--neon-green)', marginBottom: '1.5rem', fontWeight: 700 }}>
      {'>'} DASHBOARD
    </h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
      {[
        { label: 'PROJECTS', value: projectCount, color: 'var(--sky-blue)' },
        { label: 'MESSAGES', value: messageCount, color: 'var(--neon-green)' },
        { label: 'STATUS', value: 'ONLINE', color: 'var(--hot-pink)' },
      ].map((stat) => (
        <div key={stat.label} style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid #30363d',
          borderRadius: '10px',
          padding: '1.25rem',
        }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#8b949e', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            {stat.label}
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 900, color: stat.color }}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
    <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(57,255,20,0.05)', border: '1px solid rgba(57,255,20,0.2)', borderRadius: '8px' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--neon-green)' }}>
        ■ System operational. All services running smoothly.
      </p>
    </div>
  </div>
);

// ─── Projects Tab ────────────────────────────────────────
const ProjectsTab = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', stack: '', status: 'completed', liveUrl: '', githubUrl: '' });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/projects').then((r) => { setProjects(r.data.data || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const save = async (e) => {
    e.preventDefault();
    const data = { ...form, stack: form.stack.split(',').map(s => s.trim()).filter(Boolean) };
    if (editing) {
      const r = await api.put(`/projects/${editing}`, data);
      setProjects(p => p.map(x => x._id === editing ? r.data.data : x));
      setEditing(null);
    } else {
      const r = await api.post('/projects', data);
      setProjects(p => [...p, r.data.data]);
    }
    setForm({ title: '', description: '', stack: '', status: 'completed', liveUrl: '', githubUrl: '' });
  };

  const del = async (id) => {
    if (!confirm('Delete this project?')) return;
    await api.delete(`/projects/${id}`);
    setProjects(p => p.filter(x => x._id !== id));
  };

  const edit = (proj) => {
    setEditing(proj._id);
    setForm({ ...proj, stack: (proj.stack || []).join(', ') });
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid #30363d',
    borderRadius: '6px',
    padding: '0.5rem 0.75rem',
    color: '#e6edf3',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
    outline: 'none',
    width: '100%',
  };

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', color: 'var(--neon-green)', marginBottom: '1.5rem', fontWeight: 700 }}>
        {'>'} PROJECTS
      </h2>

      {/* Form */}
      <form onSubmit={save} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem', padding: '1.25rem', background: 'rgba(255,255,255,0.02)', border: '1px solid #30363d', borderRadius: '10px' }}>
        <div style={{ gridColumn: '1/-1', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#8b949e', marginBottom: '0.25rem' }}>
          {editing ? '> EDITING PROJECT' : '> ADD NEW PROJECT'}
        </div>
        {[
          { name: 'title', placeholder: 'Project title' },
          { name: 'description', placeholder: 'Short description' },
          { name: 'stack', placeholder: 'React, Node.js, MongoDB (comma separated)' },
          { name: 'liveUrl', placeholder: 'Live URL (optional)' },
          { name: 'githubUrl', placeholder: 'GitHub URL (optional)' },
        ].map(f => (
          <input key={f.name} style={inputStyle} placeholder={f.placeholder} value={form[f.name] || ''} onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))} />
        ))}
        <select style={inputStyle} value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
          <option value="coming-soon">Coming Soon</option>
          <option value="locked">Locked</option>
        </select>
        <div style={{ gridColumn: '1/-1', display: 'flex', gap: '0.5rem' }}>
          <button type="submit" style={{ ...inputStyle, width: 'auto', background: 'rgba(57,255,20,0.1)', borderColor: 'var(--neon-green)', color: 'var(--neon-green)', cursor: 'pointer', padding: '0.5rem 1.25rem' }}>
            {editing ? '> UPDATE' : '> ADD'}
          </button>
          {editing && (
            <button type="button" onClick={() => { setEditing(null); setForm({ title: '', description: '', stack: '', status: 'completed', liveUrl: '', githubUrl: '' }); }} style={{ ...inputStyle, width: 'auto', cursor: 'pointer', padding: '0.5rem 1rem' }}>
              CANCEL
            </button>
          )}
        </div>
      </form>

      {/* List */}
      {loading ? <p style={{ color: '#8b949e', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>Loading...</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {projects.map((p, i) => (
            <div key={p._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid #30363d', borderRadius: '8px', gap: '1rem' }}>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--sky-blue)', fontWeight: 700 }}>
                  [{String(i+1).padStart(2,'0')}] {p.title}
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#8b949e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.description}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                <button onClick={() => edit(p)} style={{ background: 'none', border: '1px solid #30363d', borderRadius: '4px', color: '#8b949e', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', padding: '0.3rem 0.6rem', cursor: 'pointer' }}>EDIT</button>
                <button onClick={() => del(p._id)} style={{ background: 'none', border: '1px solid rgba(255,45,120,0.3)', borderRadius: '4px', color: 'var(--hot-pink)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', padding: '0.3rem 0.6rem', cursor: 'pointer' }}>DEL</button>
              </div>
            </div>
          ))}
          {projects.length === 0 && <p style={{ color: '#8b949e', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>No projects yet.</p>}
        </div>
      )}
    </div>
  );
};

// ─── Messages Tab ────────────────────────────────────────
const MessagesTab = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.get('/contact').then(r => { setMessages(r.data.data || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const markRead = async (id) => {
    await api.patch(`/contact/${id}/read`);
    setMessages(m => m.map(x => x._id === id ? { ...x, read: true } : x));
  };

  const del = async (id) => {
    if (!confirm('Delete this message?')) return;
    await api.delete(`/contact/${id}`);
    setMessages(m => m.filter(x => x._id !== id));
    if (selected?._id === id) setSelected(null);
  };

  const unread = messages.filter(m => !m.read).length;

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', color: 'var(--neon-green)', marginBottom: '0.5rem', fontWeight: 700 }}>
        {'>'} MESSAGES
      </h2>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#8b949e', marginBottom: '1.5rem' }}>
        {unread} unread / {messages.length} total
      </p>

      {loading ? <p style={{ color: '#8b949e', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>Loading...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', minHeight: '300px' }}>
          {/* Message list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {messages.map((msg) => (
              <div
                key={msg._id}
                onClick={() => { setSelected(msg); markRead(msg._id); }}
                style={{
                  padding: '0.75rem 1rem',
                  background: selected?._id === msg._id ? 'rgba(57,255,20,0.08)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${msg.read ? '#30363d' : 'rgba(0,212,255,0.3)'}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: msg.read ? '#8b949e' : 'var(--sky-blue)', fontWeight: msg.read ? 400 : 700 }}>
                    {msg.name}
                  </p>
                  {!msg.read && <span style={{ width: '8px', height: '8px', background: 'var(--sky-blue)', borderRadius: '50%', flexShrink: 0 }} />}
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#8b949e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {msg.message}
                </p>
              </div>
            ))}
            {messages.length === 0 && <p style={{ color: '#8b949e', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>No messages yet.</p>}
          </div>

          {/* Message detail */}
          <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid #30363d', borderRadius: '10px' }}>
            {selected ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--sky-blue)', fontWeight: 700 }}>{selected.name}</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#8b949e' }}>{selected.email}</p>
                  </div>
                  <button onClick={() => del(selected._id)} style={{ background: 'none', border: '1px solid rgba(255,45,120,0.3)', borderRadius: '4px', color: 'var(--hot-pink)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', padding: '0.3rem 0.6rem', cursor: 'pointer' }}>DELETE</button>
                </div>
                {selected.project && (
                  <div style={{ marginBottom: '0.75rem', padding: '0.5rem', background: 'rgba(0,212,255,0.05)', borderRadius: '6px' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--sky-blue)', marginBottom: '0.2rem' }}>PROJECT IDEA</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#e6edf3' }}>{selected.project}</p>
                  </div>
                )}
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#8b949e', marginBottom: '0.4rem' }}>MESSAGE</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#e6edf3', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{selected.message}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#30363d', marginTop: '1rem' }}>
                  {new Date(selected.createdAt).toLocaleString()}
                </p>
              </>
            ) : (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#8b949e' }}>
                Select a message to view.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Settings Tab ────────────────────────────────────────
const SettingsTab = () => {
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get('/profile').then(r => setProfile(r.data.data)).catch(() => {});
  }, []);

  const save = async () => {
    setSaving(true);
    await api.put('/profile', profile);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!profile) return <p style={{ color: '#8b949e', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>Loading...</p>;

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid #30363d',
    borderRadius: '6px',
    padding: '0.5rem 0.75rem',
    color: '#e6edf3',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
    outline: 'none',
    width: '100%',
  };

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', color: 'var(--neon-green)', marginBottom: '1.5rem', fontWeight: 700 }}>
        {'>'} SETTINGS
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#8b949e', marginBottom: '0.4rem' }}>ABOUT TEXT</p>
          <textarea
            style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
            value={profile.about || ''}
            onChange={e => setProfile(p => ({ ...p, about: e.target.value }))}
          />
        </div>

        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#8b949e', marginBottom: '0.4rem' }}>CURRENTLY OBSESSED (comma separated)</p>
          <input
            style={inputStyle}
            value={(profile.currentlyObsessed || []).join(', ')}
            onChange={e => setProfile(p => ({ ...p, currentlyObsessed: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
          />
        </div>

        {['github', 'linkedin', 'twitter', 'email'].map(field => (
          <div key={field}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#8b949e', marginBottom: '0.4rem', textTransform: 'uppercase' }}>{field}</p>
            <input
              style={inputStyle}
              value={profile.socialLinks?.[field] || ''}
              onChange={e => setProfile(p => ({ ...p, socialLinks: { ...p.socialLinks, [field]: e.target.value } }))}
              placeholder={`${field} URL...`}
            />
          </div>
        ))}

        <button
          onClick={save}
          disabled={saving}
          style={{
            background: saved ? 'rgba(57,255,20,0.15)' : 'rgba(57,255,20,0.08)',
            border: '1px solid var(--neon-green)',
            borderRadius: '6px',
            color: 'var(--neon-green)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            fontWeight: 700,
            padding: '0.6rem 1.25rem',
            cursor: saving ? 'not-allowed' : 'pointer',
            alignSelf: 'flex-start',
          }}
        >
          {saving ? '> SAVING...' : saved ? '> SAVED ✓' : '> SAVE CHANGES'}
        </button>
      </div>
    </div>
  );
};

// ─── Main Admin Dashboard ────────────────────────────────
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('dashboard');
  const [projectCount, setProjectCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) { navigate('/admin'); return; }

    api.get('/auth/me').catch(() => { localStorage.removeItem('adminToken'); navigate('/admin'); });
    api.get('/projects').then(r => setProjectCount(r.data.data?.length || 0)).catch(() => {});
    api.get('/contact').then(r => setMessageCount(r.data.data?.length || 0)).catch(() => {});
  }, [navigate]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0d1117', color: '#e6edf3' }}>
      <Sidebar active={active} setActive={setActive} />

      <main className="admin-content" style={{ padding: '2rem', overflowY: 'auto' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {active === 'dashboard' && <DashboardTab projectCount={projectCount} messageCount={messageCount} />}
            {active === 'projects' && <ProjectsTab />}
            {active === 'messages' && <MessagesTab />}
            {active === 'settings' && <SettingsTab />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
