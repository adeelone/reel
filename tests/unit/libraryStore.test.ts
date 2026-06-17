import { afterEach, describe, expect, it } from 'vitest';
import { exportLetterboxdCsv, useLibraryStore } from '../../src/data/repo/libraryStore';
import { fixtureTitles } from '../../src/data/providers/fixtures';

describe('library exports', () => {
  afterEach(() => localStorage.clear());

  it('exports a Letterboxd-style CSV', () => {
    const item = fixtureTitles[0];
    localStorage.setItem(
      'reel.library.v1',
      JSON.stringify({
        items: { [item.id]: item },
        ratings: { [item.id]: 8 },
        watched: [item.id],
        notes: { [item.id]: 'quiet, tense' },
      }),
    );

    expect(exportLetterboxdCsv()).toContain('Title,Year,Rating,WatchedDate,Review');
    expect(exportLetterboxdCsv()).toContain('"quiet, tense"');
  });

  it('saves smart list URLs without duplicates', () => {
    const list = {
      id: 'smart-1',
      title: 'Discover: sci-fi',
      href: '/discover?genre=Sci-Fi',
      createdAt: '2026-06-16T00:00:00.000Z',
    };

    useLibraryStore.getState().saveSmartList(list);
    useLibraryStore.getState().saveSmartList({ ...list, id: 'smart-2' });

    expect(useLibraryStore.getState().smartLists).toHaveLength(1);
    expect(useLibraryStore.getState().smartLists[0].href).toBe('/discover?genre=Sci-Fi');
  });
});
