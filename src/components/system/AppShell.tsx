import { Film, Library, Moon, Search, Sparkles, SlidersHorizontal } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CommandK } from '../common/CommandK';

const links = [
  { to: '/', label: 'Home', icon: Film },
  { to: '/discover', label: 'Discover', icon: SlidersHorizontal },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/lists', label: 'Lists', icon: Library },
  { to: '/tonight', label: 'Tonight', icon: Sparkles }
];

export function AppShell() {
  const [commandOpen, setCommandOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isTyping = ['INPUT', 'TEXTAREA'].includes(target.tagName);
      if (event.key === '/' && !isTyping) {
        event.preventDefault();
        navigate('/search');
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen(true);
      }
      if (!isTyping && event.key.toLowerCase() === 'h' && event.altKey) navigate('/');
      if (!isTyping && event.key.toLowerCase() === 'd' && event.altKey) navigate('/discover');
      if (!isTyping && event.key.toLowerCase() === 'l' && event.altKey) navigate('/lists');
      if (!isTyping && event.key.toLowerCase() === 't' && event.altKey) navigate('/tonight');
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navigate]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink to="/" className="brand" aria-label="Reel home">
          <span className="brand-mark">R</span>
          <span>Reel</span>
        </NavLink>
        <nav className="nav-links" aria-label="Primary">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/'} className="nav-link">
              <Icon size={17} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <button className="icon-button" type="button" aria-label="Toggle theme">
          <Moon size={18} />
        </button>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">Reel keeps your library local unless you enable sync.</footer>
      <CommandK open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  );
}
