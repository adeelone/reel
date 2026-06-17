import { useState } from 'react';
import { useLibraryStore } from '../data/repo/libraryStore';
import { deleteRemoteLibrary, pullLibrarySnapshot, pushLibrarySnapshot, syncStatus } from '../data/sync/supabase';

export function SettingsRoute() {
  const preferences = useLibraryStore((state) => state.preferences);
  const updatePreferences = useLibraryStore((state) => state.updatePreferences);
  const [message, setMessage] = useState(syncStatus());
  const runSync = async (action: () => Promise<unknown>, success: string) => {
    try {
      await action();
      setMessage(success);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Sync failed');
    }
  };

  return (
    <div className="page settings-grid">
      <h1>Settings</h1>
      <label>
        Region
        <select value={preferences.region} onChange={(event) => updatePreferences({ region: event.target.value })}>
          <option value="US">United States</option>
          <option value="MX">Mexico</option>
          <option value="ES">Spain</option>
        </select>
      </label>
      <label>
        Language
        <select value={preferences.language} onChange={(event) => updatePreferences({ language: event.target.value })}>
          <option value="en-US">English</option>
          <option value="es-MX">Spanish</option>
        </select>
      </label>
      <label>
        Rating mode
        <select
          value={preferences.ratingMode}
          onChange={(event) => updatePreferences({ ratingMode: event.target.value as '10' | '5' })}
        >
          <option value="10">10 point</option>
          <option value="5">5 star</option>
        </select>
      </label>
      <label>
        Theme
        <select
          value={preferences.theme}
          onChange={(event) => updatePreferences({ theme: event.target.value as typeof preferences.theme })}
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="true-black">True black</option>
        </select>
      </label>
      <button type="button" onClick={() => localStorage.clear()}>
        Delete local data
      </button>
      <section className="settings-panel">
        <h2>Sync</h2>
        <p>{message}</p>
        <div className="button-row">
          <button type="button" onClick={() => runSync(pushLibrarySnapshot, 'Library pushed')}>
            Push
          </button>
          <button type="button" onClick={() => runSync(pullLibrarySnapshot, 'Library pulled')}>
            Pull
          </button>
          <button type="button" onClick={() => runSync(deleteRemoteLibrary, 'Remote data deleted')}>
            Delete remote
          </button>
        </div>
      </section>
    </div>
  );
}
