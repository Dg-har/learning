import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, staggerItem } from '../animations/variants';

const COMMANDS = {
  help: {
    output: `Available commands:
  help        — show this list
  whoami      — find out who made this
  about       — a bit about Safal
  skills      — tech I work with
  projects    — stuff I've built
  contact     — how to reach me
  coffee      — essential
  status      — current mode
  clear       — clear terminal
  joke        — developer joke`,
    type: 'info',
  },
  whoami: {
    output: 'Safal Neupane\nFull-Stack Developer\nNepal 🇳🇵',
    type: 'output',
  },
  about: {
    output: `I'm a full-stack developer who likes turning ideas into
working software. React, Node, MongoDB — that's my stack.
Coffee — that's my fuel.
Curiosity — that's my superpower.`,
    type: 'output',
  },
  skills: {
    output: `Frontend  → React, Next.js, React Native, TypeScript
Backend   → Node.js, Express.js, REST APIs
Database  → MongoDB, Mongoose
Tools     → Git, VS Code, Figma, Postman`,
    type: 'output',
  },
  projects: {
    output: `[01] NEPORA        — AI Travel Companion (React Native + Node + AI)
[02] DEVFOLIO      — This portfolio (React + Vite + Node + MongoDB)
[03] ??? TOP SECRET — Coming soon...`,
    type: 'output',
  },
  contact: {
    output: 'Scroll down to the contact section or email me directly.\nLet\'s build something cool together.',
    type: 'info',
  },
  coffee: {
    output: `☕ Loading coffee...
██████████████████████ 100%
☕ Coffee ready. Now we can code.`,
    type: 'output',
  },
  status: {
    output: `> CURRENT STATUS: Building cool stuff
> MOOD: Caffeinated
> BUGS: In progress of fixing
> SHIPPING: Always`,
    type: 'output',
  },
  clear: { output: '__CLEAR__', type: 'clear' },
  joke: {
    output: `Why do programmers prefer dark mode?
Because light attracts bugs. 🐛`,
    type: 'output',
  },
};

const TerminalSection = () => {
  const ref = useRef(null);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const [history, setHistory] = useState([
    { type: 'info', text: 'SAFAL_OS v2.6.0 — Terminal\nType "help" to see available commands.' },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const scrollToBottom = useCallback(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => { scrollToBottom(); }, [history, scrollToBottom]);

  const runCommand = useCallback((cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setCmdHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const result = COMMANDS[trimmed];

    if (!result) {
      setHistory((prev) => [
        ...prev,
        { type: 'command', text: trimmed },
        { type: 'error', text: `Command not found: "${trimmed}". Type "help" for options.` },
      ]);
      return;
    }

    if (result.type === 'clear') {
      setHistory([]);
      return;
    }

    setHistory((prev) => [
      ...prev,
      { type: 'command', text: trimmed },
      { type: result.type, text: result.output },
    ]);
  }, []);

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, cmdHistory.length - 1);
      setHistoryIndex(newIndex);
      setInput(cmdHistory[newIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setInput(newIndex === -1 ? '' : cmdHistory[newIndex]);
    }
  };

  return (
    <section
      ref={ref}
      style={{
        background: 'transparent',
        padding: 'var(--section-padding) clamp(1.5rem, 5vw, 6rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p variants={staggerItem} className="section-label" style={{ color: 'var(--neon-green)' }}>
            // terminal.sh
          </motion.p>

          <motion.h2
            variants={staggerItem}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              fontWeight: 900,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '2rem',
            }}
          >
            INTERACTIVE{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--neon-green), var(--sky-blue))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              TERMINAL
            </span>
          </motion.h2>

          <motion.div variants={staggerItem} className="terminal-window">
            {/* Terminal header */}
            <div className="terminal-header">
              <div className="terminal-dot" style={{ background: '#FF5F57' }} />
              <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
              <div className="terminal-dot" style={{ background: '#28C840' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#8b949e', marginLeft: '0.5rem' }}>
                safal@dev:~$
              </span>
            </div>

            {/* Terminal body */}
            <div className="terminal-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
              {history.map((item, i) => (
                <div key={i} style={{ marginBottom: '0.25rem' }}>
                  {item.type === 'command' ? (
                    <div className="terminal-line">
                      <span className="terminal-prompt">$</span>
                      <span className="terminal-output" style={{ color: 'white' }}>{item.text}</span>
                    </div>
                  ) : (
                    <pre
                      className={`terminal-output ${item.type === 'error' ? 'terminal-error' : item.type === 'info' ? 'terminal-info' : ''}`}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                        lineHeight: 1.7,
                        marginLeft: '1.25rem',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {item.text}
                    </pre>
                  )}
                </div>
              ))}

              {/* Input line */}
              <div className="terminal-input-line">
                <span className="terminal-prompt">$</span>
                <input
                  ref={inputRef}
                  className="terminal-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="type a command..."
                  autoComplete="off"
                  spellCheck="false"
                  aria-label="Terminal input"
                />
              </div>
            </div>
          </motion.div>

          <motion.p
            variants={staggerItem}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.2)',
              marginTop: '1rem',
            }}
          >
            // tip: use ↑ ↓ arrow keys for command history
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default TerminalSection;
