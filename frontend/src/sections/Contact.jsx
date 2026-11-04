import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '../animations/variants';
import api from '../services/api';

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const [form, setForm] = useState({ name: '', email: '', project: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorMsg('Name, email, and message are required.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    try {
      await api.post('/contact', form);
      setStatus('success');
      setForm({ name: '', email: '', project: '', message: '' });
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Something went wrong. Try again.');
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: 'transparent',
        padding: 'var(--section-padding) clamp(1.5rem, 5vw, 6rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* BG blobs */}
      <div className="blob" style={{ position: 'absolute', width: '500px', height: '500px', background: 'var(--electric-purple)', top: '-150px', left: '-100px' }} />
      <div className="blob" style={{ position: 'absolute', width: '400px', height: '400px', background: 'var(--hot-pink)', bottom: '-100px', right: '-80px', animationDelay: '-5s' }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p variants={staggerItem} className="section-label" style={{ color: 'var(--hot-pink)' }}>
            // contact.init()
          </motion.p>

          <motion.h2
            variants={staggerItem}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
              fontWeight: 900,
              color: 'white',
              letterSpacing: '-0.02em',
              lineHeight: 1.0,
              marginBottom: '1rem',
            }}
          >
            GOT A{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--hot-pink), var(--electric-purple-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              CRAZY IDEA?
            </span>
          </motion.h2>

          {/* Conversation snippet */}
          <motion.div
            variants={staggerItem}
            style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            {[
              { speaker: 'You', text: '"I have an idea..."', align: 'left', color: 'var(--sky-blue)' },
              { speaker: 'Me', text: '"Interesting."', align: 'right', color: 'var(--hot-pink)' },
              { speaker: 'You', text: '"It might be impossible."', align: 'left', color: 'var(--sky-blue)' },
              { speaker: 'Me', text: '"Even better. 😈"', align: 'right', color: 'var(--hot-pink)' },
            ].map((bubble, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: bubble.align === 'right' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  background: `${bubble.color}18`,
                  border: `1.5px solid ${bubble.color}40`,
                  borderRadius: bubble.align === 'right' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  padding: '0.6rem 1rem',
                  maxWidth: '260px',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: bubble.color,
                    fontWeight: 700,
                    marginBottom: '0.1rem',
                    opacity: 0.6,
                  }}>
                    {bubble.speaker}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.85)',
                  }}>
                    {bubble.text}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: 'rgba(57,255,20,0.1)',
                  border: '2px solid rgba(57,255,20,0.4)',
                  borderRadius: '16px',
                  padding: '3rem 2rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  fontWeight: 900,
                  color: 'var(--neon-green)',
                  marginBottom: '0.5rem',
                }}>
                  MESSAGE SENT!
                </h3>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.6)',
                }}>
                  Now we wait for the magic. ✨
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn btn-neon"
                  style={{ marginTop: '1.5rem' }}
                >
                  SEND ANOTHER
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1.25rem' }}>
                  <motion.div variants={staggerItem} className="form-field">
                    <label className="form-label" style={{ color: 'rgba(255,255,255,0.5)' }}>NAME *</label>
                    <input
                      className="form-input"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="who are you?"
                      required
                      style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: 'white' }}
                    />
                  </motion.div>
                  <motion.div variants={staggerItem} className="form-field">
                    <label className="form-label" style={{ color: 'rgba(255,255,255,0.5)' }}>EMAIL *</label>
                    <input
                      className="form-input"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="where to reply?"
                      required
                      style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: 'white' }}
                    />
                  </motion.div>
                </div>

                <motion.div variants={staggerItem} className="form-field">
                  <label className="form-label" style={{ color: 'rgba(255,255,255,0.5)' }}>WHAT ARE WE BUILDING?</label>
                  <input
                    className="form-input"
                    name="project"
                    value={form.project}
                    onChange={handleChange}
                    placeholder="describe the crazy idea..."
                    style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: 'white' }}
                  />
                </motion.div>

                <motion.div variants={staggerItem} className="form-field">
                  <label className="form-label" style={{ color: 'rgba(255,255,255,0.5)' }}>MESSAGE *</label>
                  <textarea
                    className="form-input"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="let's make something cool..."
                    required
                    rows={5}
                    style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: 'white' }}
                  />
                </motion.div>

                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: 'var(--hot-pink)',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255,45,120,0.1)',
                      border: '1px solid rgba(255,45,120,0.3)',
                      borderRadius: '6px',
                    }}
                  >
                    ⚠️ {errorMsg}
                  </motion.p>
                )}

                <motion.button
                  variants={staggerItem}
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn btn-primary"
                  style={{
                    alignSelf: 'flex-start',
                    opacity: status === 'loading' ? 0.7 : 1,
                    fontSize: '1rem',
                    padding: '0.85rem 2rem',
                  }}
                  whileHover={status !== 'loading' ? { scale: 1.04 } : {}}
                  whileTap={status !== 'loading' ? { scale: 0.97 } : {}}
                >
                  {status === 'loading' ? '⏳ SENDING...' : '🚀 SEND IT'}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Social links */}
          <motion.div
            variants={staggerItem}
            style={{
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            {[
              { label: '🐙 GitHub', href: 'https://github.com/safal' },
              { label: '💼 LinkedIn', href: 'https://linkedin.com/in/safal' },
              { label: '🐦 Twitter', href: 'https://twitter.com/safal' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  padding: '0.4rem 0.75rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--hot-pink)'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
