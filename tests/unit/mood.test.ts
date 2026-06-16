import { describe, expect, it } from 'vitest';
import { fixtureTitles } from '../../src/data/providers/fixtures';
import { pickTonight, scoreForMood } from '../../src/lib/mood';

describe('mood picker', () => {
  it('returns three picks', () => {
    expect(pickTonight(fixtureTitles, ['thrilling'])).toHaveLength(3);
  });

  it('preserves locked picks first', () => {
    const picks = pickTonight(fixtureTitles, ['chill'], [fixtureTitles[2].id]);
    expect(picks[0].id).toBe(fixtureTitles[2].id);
  });

  it('scores by rating and mood text', () => {
    expect(scoreForMood(fixtureTitles[0], ['thrilling'])).toBeGreaterThan(8);
  });
});
