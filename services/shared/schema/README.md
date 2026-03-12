# Shared schema

This folder holds the **Alliance input schema** and entity ID definitions used by ingestion (adapters, scoring engine) and the API.

- **Input dimensions** — Per-layer axes (asset, market, vault) as defined in [docs/METHODOLOGY.md](../../docs/METHODOLOGY.md). Each layer has three axes: `security`, `operations`, `economics` — each a numeric **0–10** (higher = safer) or `null`.
- **Entity identity** — asset = chain_id + token_address (or symbol); market = chain_id + protocol_slug + market_id; vault = chain_id + vault_address (or protocol + vault_id).

The **strategy score** is computed from layer scores (asset, market, vault), each of which is a weighted average of its three axes. Both the strategy score and layer scores are 0–10 numeric + letter grade, tagged with `methodology_version`.
