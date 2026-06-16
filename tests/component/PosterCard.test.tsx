import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { PosterCard } from '../../src/components/media/PosterCard';
import { fixtureTitles } from '../../src/data/providers/fixtures';

describe('PosterCard', () => {
  it('links to the detail page', () => {
    render(<PosterCard item={fixtureTitles[0]} />, { wrapper: MemoryRouter });
    expect(screen.getByRole('link', { name: /open midnight archive/i })).toHaveAttribute('href', '/movie/movie-550');
  });
});
