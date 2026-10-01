import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Check, Code2, LockKeyhole, LogOut, Save, X } from 'lucide-react';
import { authenticateAdmin } from '../services/portfolioApi';
import type { PortfolioData } from '../types';

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
  portfolio: PortfolioData;
  token: string;
  onAuthenticated: (token: string) => void;
  onSignOut: () => void;
  onSave: (data: PortfolioData) => Promise<void>;
  onEditingChange: (editing: boolean) => void;
  editing: boolean;
}

export function AdminPanel({ open, onClose, portfolio, token, onAuthenticated, onSignOut, onSave, onEditingChange, editing }: AdminPanelProps) {
  const [password, setPassword] = useState('');
  const [json, setJson] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { setJson(JSON.stringify(portfolio, null, 2)); }, [portfolio, open]);

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    try {
      onAuthenticated(await authenticateAdmin(password));
      setPassword('');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to sign in.');
    }
  };

  const save = async () => {
    setError('');
    let parsed: PortfolioData;
    try {
      parsed = JSON.parse(json) as PortfolioData;
      if (!parsed.name || !parsed.contact?.email || !Array.isArray(parsed.projects) || !Array.isArray(parsed.experience) || !Array.isArray(parsed.skills)) {
        throw new Error('Include a name, contact email, projects, experience, and skills.');
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Portfolio JSON is not valid.');
      return;
    }
    setSaving(true);
    try {
      await onSave(parsed);
      onClose();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to save changes.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`admin-backdrop ${open ? 'admin-backdrop-open' : ''}`} aria-hidden={!open} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <aside className="admin-panel" role="dialog" aria-modal="true" aria-label="Portfolio editor">
        <div className="admin-header"><div className="admin-heading-icon"><Code2 size={18} /></div><div><span className="card-kicker">PORTFOLIO CMS</span><h2>Content editor</h2></div><button className="icon-button admin-close" onClick={onClose} aria-label="Close editor"><X size={18} /></button></div>
        {!token ? (
          <form className="admin-login" onSubmit={login}>
            <span className="login-lock"><LockKeyhole size={20} /></span><h3>Admin access</h3><p>Sign in to edit and publish your portfolio content.</p>
            <label htmlFor="admin-password">Admin password</label><input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            {error && <p className="admin-error" role="alert">{error}</p>}<button className="button button-primary admin-submit" type="submit">Sign in <span>→</span></button>
            <p className="admin-hint">Configure <code>ADMIN_PASSWORD</code> and <code>JWT_SECRET</code> on your API server.</p>
          </form>
        ) : (
          <div className="admin-editor">
            <div className="admin-auth-status"><span className="status-dot" /> Authenticated as administrator<button onClick={onSignOut}><LogOut size={14} /> Sign out</button></div>
            <div className="admin-editor-intro"><h3>Edit your content</h3><p>Use inline editing for your intro and bio, or update your complete portfolio JSON here.</p></div>
            <button className={`inline-mode-button ${editing ? 'inline-mode-active' : ''}`} onClick={() => onEditingChange(!editing)}><span>{editing ? <Check size={15} /> : <Code2 size={15} />}</span>{editing ? 'Inline editing enabled' : 'Enable inline editing'}<span className="mode-switch">{editing ? 'ON' : 'OFF'}</span></button>
            <label className="json-label" htmlFor="portfolio-json">PORTFOLIO DATA <span>JSON</span></label>
            <textarea id="portfolio-json" className="json-editor" spellCheck={false} value={json} onChange={(event) => setJson(event.target.value)} />
            <div className="admin-editor-footer"><span className="admin-security-note"><LockKeyhole size={13} /> Protected by JWT authentication</span><button className="button button-primary" onClick={save} disabled={saving}><Save size={15} /> {saving ? 'Saving…' : 'Save changes'}</button></div>
            {error && <p className="admin-error" role="alert">{error}</p>}
          </div>
        )}
      </aside>
    </div>
  );
}
