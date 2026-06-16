import { Lock, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { PosterCard } from '../components/media/PosterCard';
import { fixtureTitles } from '../data/providers/fixtures';
import { useLibraryStore } from '../data/repo/libraryStore';
import { pickTonight } from '../lib/mood';

const moods = ['chill', 'thrilling', 'romantic', 'funny', 'mind-bending', 'nostalgic', 'short', 'long', 'kid-friendly'];

export function TonightRoute() {
  const [selected, setSelected] = useState<string[]>(['thrilling']);
  const [locked, setLocked] = useState<string[]>([]);
  const state = useLibraryStore();
  const libraryItems = state.watchlist.map((id) => state.items[id]).filter(Boolean);
  const source = libraryItems.length >= 3 ? libraryItems : fixtureTitles;
  const picks = useMemo(() => pickTonight(source, selected, locked), [source, selected, locked]);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Tonight</h1>
        <button type="button" onClick={() => setSelected([...selected].reverse())}>
          <RotateCcw size={18} /> Spin again
        </button>
      </div>
      <div className="chip-row">
        {moods.map((mood) => (
          <button
            key={mood}
            type="button"
            className={`chip ${selected.includes(mood) ? 'active' : ''}`}
            onClick={() =>
              setSelected((current) =>
                current.includes(mood) ? current.filter((entry) => entry !== mood) : [...current, mood],
              )
            }
          >
            {mood}
          </button>
        ))}
      </div>
      <div className="poster-grid">
        {picks.map((item) => (
          <div key={item.id}>
            <PosterCard item={item} />
            <button
              type="button"
              className="lock-button"
              onClick={() =>
                setLocked((current) =>
                  current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id],
                )
              }
            >
              <Lock size={16} /> Lock
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
