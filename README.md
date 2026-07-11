# frontend — React

> ⚛️ The **frontend** of the Book Platform. Calls the **[backend](https://github.com/malikjakexgroup/backend)** API — never Google directly.
> Repos: **frontend** · [backend](https://github.com/malikjakexgroup/backend) · [api](https://github.com/malikjakexgroup/api)

[![CI](https://github.com/malikjakexgroup/frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/malikjakexgroup/frontend/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](package.json)

React (Vite) frontend. Calls **only** the WordPress backend REST API
(`/wp-json/books/v1/*`) — never Google directly.

Stack: React 18, React Router, TanStack Query, Tailwind v4.

## Pages
- **Search** (`/`) — query the backend, render results.
- **Book details** (`/book/:id`).
- **Favorites** (`/favorites`) — localStorage only (no user backend in v1).

## Run
```bash
npm install
cp .env.example .env    # VITE_API_URL -> WordPress site (default http://localhost:8080)
npm run dev
```
Requires the WordPress backend (book-backend plugin activated) running.
