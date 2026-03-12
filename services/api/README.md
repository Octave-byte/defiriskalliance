# Analytics API

Read-only API: current Alliance score per vault (and optionally asset/market), history, and per-provider **input breakdown** (provenance). Reads from the same store ingestion writes to.

## Endpoints

See [endpoints.md](endpoints.md) for the full spec:

- `GET /vaults` — List vaults with **main metric** (vault strategy score) and **sub-component** (vault infra under `components.infra`).
- `GET /vaults/:id` — One vault: main score + components.infra, inputs by provider, optional composition.
- `GET /vaults/:id/history` — Time series of main metric and infra sub-component for charts.
- `GET /vaults/:id/providers` — Input breakdown by provider.

## Running

Minimal server in [implementation/](implementation/) returns mock or empty data until the shared DB and ingestion are wired. Start with e.g. `node implementation/server.js` or `python implementation/server.py` (see implementation folder). Port TBD (e.g. 3000 or env `PORT`).
