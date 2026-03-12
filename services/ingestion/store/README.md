# Store

Writes ingestion outputs to the shared DB:

- **Ingested inputs** — Per (entity_id, provider, timestamp): dimension key-value map (our schema). Optional: raw provider response, provenance.
- **Computed Alliance score** — Per (entity_id, timestamp): score_letter, score_numeric (0–100), methodology_version. For **vaults**: store the **main metric** (strategy: letter + numeric) and the **sub-component** (infra: letter + numeric).

Implement as a thin layer over [shared/db/](../../shared/db/). The scoring engine (in run/ or a separate module) computes infra and strategy scores from merged inputs; the store only persists.
