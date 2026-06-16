import type { MediaSummary } from '../types/media';

const moodWeights: Record<string, string[]> = {
  chill: ['Drama', 'Animation'],
  thrilling: ['Thriller', 'Action'],
  romantic: ['Romance', 'Drama'],
  funny: ['Comedy', 'Animation'],
  'mind-bending': ['Sci-Fi', 'Mystery'],
  nostalgic: ['Adventure', 'Family'],
  short: ['Comedy'],
  long: ['Drama'],
  'kid-friendly': ['Animation', 'Family']
};

export function scoreForMood(item: MediaSummary, moods: string[]) {
  const base = item.voteAverage;
  const text = `${item.title} ${item.overview}`.toLowerCase();
  const moodBoost = moods.reduce((sum, mood) => {
    const matches = moodWeights[mood]?.some((keyword) => text.includes(keyword.toLowerCase())) ?? text.includes(mood);
    return sum + (matches ? 2 : 0);
  }, 0);
  return base + moodBoost;
}

export function pickTonight(items: MediaSummary[], moods: string[], locked: string[] = []) {
  const lockedSet = new Set(locked);
  const lockedItems = items.filter((item) => lockedSet.has(item.id));
  const candidates = items
    .filter((item) => !lockedSet.has(item.id))
    .sort((a, b) => scoreForMood(b, moods) - scoreForMood(a, moods));
  return [...lockedItems, ...candidates].slice(0, 3);
}
