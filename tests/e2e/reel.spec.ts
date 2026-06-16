import { expect, test } from '@playwright/test';

test('home to detail and watchlist persistence', async ({ page }) => {
  await page.goto('/');
  await page
    .getByRole('link', { name: /open details/i })
    .first()
    .click();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('button', { name: 'Watchlist', exact: true }).click();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Watchlist', exact: true })).toBeVisible();
});

test('discover filters update the URL', async ({ page }) => {
  await page.goto('/discover');
  await page.getByLabel('Genre').selectOption('Sci-Fi');
  await expect(page).toHaveURL(/genre=Sci-Fi/);
});
