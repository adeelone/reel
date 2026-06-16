# Contributing

## Development

Run `npm install`, copy `.env.example` to `.env`, then start with `npm run dev`.

Before opening a pull request, run:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Pull Requests

Keep PRs focused, describe user-visible behavior, and include tests for data contracts, list behavior, filters, and route interactions.

## Code Style

Use strict TypeScript, keep provider code behind interfaces, and store URL-owned state in route search params.
