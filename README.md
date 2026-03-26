# Cooren API

[![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh)
[![ElysiaJS](https://img.shields.io/badge/ElysiaJS-%23FEEB00.svg?style=for-the-badge&logo=elysiajs&logoColor=black)](https://elysiajs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg?style=for-the-badge)](LICENSE)

Cooren is an open-source, high-performance, and scalable scraping engine designed to collect, organize, and deliver structured data from across the world of anime, movies, manga, and music.

Developed and maintained by [CoorenLabs](https://coorenlabs.com).

---

## Quick Links

- [Website](https://coorenlabs.com)
- [Documentation](https://docs.coorenlabs.com)
- [GitHub](https://github.com/CoorenLabs/CoorenLabs)

---

## Features

- **Unified Media Ecosystem**: Anime, Manga, Movies, TV, and Music.
- **Open Source**: Fully community-driven.
- **High Performance**: Powered by Bun and ElysiaJS.
- **Advanced Scraping**: Cheerio, Puppeteer, and Axios.
- **Developer Friendly**: TypeScript and modular architecture.

---

## Tech Stack

- **Runtime**: Bun
- **Framework**: ElysiaJS
- **Language**: TypeScript
- **Scraping**: Cheerio, Puppeteer
- **Database/Cache**: Upstash Redis
- **Validation**: Zod

---

## Getting Started

### Prerequisites

Install [Bun](https://bun.sh).

### Installation

```bash
git clone https://github.com/CoorenLabs/CoorenLabs.git
cd CoorenLabs
bun install
```

### Running the Server

```bash
bun run dev      # or bun run hot
```

### Build for Production

```bash
bun run build:bun   # Optimized for Bun
bun run build:node  # Compile to Node
```

---

## Project Structure

```
src/
├── core/         # Config, logger, routes
├── providers/    # Individual media providers
```

---

## Creating a New Provider

```
src/providers/<name>/
├── route.ts
├── <name>.ts
└── types.ts
```

### Example: route.ts

```ts
import Elysia from "elysia";
import { FlixHQ } from "./flixhq";

export const flixhqRoutes = new Elysia({ prefix: "/flixhq" })
  .get("/home", async () => await FlixHQ.home())
  .get("/search/:query", async ({ params: { query } }) => await FlixHQ.search(query));
```

---

## Testing & Linting

```bash
bun run test
bun run lint
bun run lint:fix
```

---

## Deploying on Vercel

This repository includes a Vercel function entry at `api/index.ts` and route rewrites in `vercel.json`.

### Required Environment Variables

Set these in Vercel Project Settings -> Environment Variables:

```env
SERVER_ORIGIN=https://your-deployment-url.vercel.app
ENABLE_CACHE=false
NODE_ENV=production
```

### Optional Cache Settings (Upstash)

If you enable cache in Vercel, use Upstash settings:

```env
ENABLE_CACHE=true
CACHE_PROVIDER=uptash
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

Do not use `CACHE_PROVIDER=default` on Vercel unless the runtime is Bun and Redis is reachable from your deployment.

### Post-Deploy Checks

1. Open `/` and verify a JSON status response.
2. Open `/docs` and verify OpenAPI loads.
3. Test one provider route end-to-end.
4. If you still see `FUNCTION_INVOCATION_FAILED`, inspect Vercel Runtime Logs for the first thrown error.

---

## License

This project is licensed under the [GPL-3.0 License](LICENSE).

---
