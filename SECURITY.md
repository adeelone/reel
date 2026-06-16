# Security Policy

## Supported Versions

The `main` branch receives security fixes.

## Reporting a Vulnerability

Open a private security advisory or contact the repository owner. Do not publish exploit details before a fix is available.

## Secrets

Do not commit `.env` files or private keys. `VITE_TMDB_API_KEY` should be a read-only public key. Server-side credentials must be kept out of the client bundle.
