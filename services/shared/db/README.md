# Shared DB

DB client and migrations for the operational pipeline. Ingestion writes **ingested inputs** (per entity, per provider, timestamp) and **computed Alliance scores** (per entity, timestamp). The API reads from the same store.

- **Ingested inputs:** Dimension names + values (our schema), optional provenance (which provider supplied which input). Optional: raw provider response for audit.
- **Alliance score:** entity_id, score_letter, score_numeric (0–100), methodology_version, timestamp. For **vaults** we store the **main metric** (strategy: letter + numeric) and the **sub-component** (infra: letter + numeric).

Storage: SQLite (file) or Postgres for hosted deploy. Configure via environment (e.g. `DATABASE_URL`).
