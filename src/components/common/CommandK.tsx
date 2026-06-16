import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type CommandKProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CommandK({ open, onOpenChange }: CommandKProps) {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onClick={() => onOpenChange(false)}>
      <div
        className="command-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Quick actions"
        onClick={(event) => event.stopPropagation()}
      >
        <Search size={18} aria-hidden="true" />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const trimmed = value.trim();
            if (!trimmed) return;
            const tmdbMatch = trimmed.match(/(?:movie|tv)\/(\d+)/);
            if (tmdbMatch) {
              navigate(`/movie/${tmdbMatch[1]}`);
            } else {
              navigate(`/search?q=${encodeURIComponent(trimmed)}`);
            }
            onOpenChange(false);
          }}
        >
          <input
            autoFocus
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Search titles, people, or paste a TMDB URL"
          />
        </form>
      </div>
    </div>
  );
}
