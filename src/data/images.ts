export const tmdbImageBase = 'https://image.tmdb.org/t/p';

export function imageUrl(path?: string, size = 'w342') {
  if (!path) return `https://placehold.co/500x750/121216/f4f4f5?text=Reel`;
  if (path.startsWith('http')) return path;
  return `${tmdbImageBase}/${size}${path}`;
}

export function imageSrcSet(path?: string, sizes = ['w185', 'w342', 'w500', 'w780']) {
  if (!path) return '';
  return sizes.map((size) => `${imageUrl(path, size)} ${size.replace('w', '')}w`).join(', ');
}
