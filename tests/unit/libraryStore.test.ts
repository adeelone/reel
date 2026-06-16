import { afterEach, describe, expect, it } from 'vitest';
import { exportLetterboxdCsv } from '../../src/data/repo/libraryStore';
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
});
