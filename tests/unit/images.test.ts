import { describe, expect, it } from 'vitest';
import { imageSrcSet, imageUrl } from '../../src/data/images';

describe('image utilities', () => {
  it('builds TMDB URLs', () => {
    expect(imageUrl('/poster.jpg', 'w500')).toBe('https://image.tmdb.org/t/p/w500/poster.jpg');
  });

  it('builds srcset values', () => {
    expect(imageSrcSet('/poster.jpg')).toContain('w342/poster.jpg 342w');
  });
});
