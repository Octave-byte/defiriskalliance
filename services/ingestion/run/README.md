# Run — Ingestion job entrypoint

Orchestrates one ingestion run:

1. Load adapters (mock + real when configured).
2. For each entity in scope, call each adapter; collect our input schema per (entity, provider).
3. Merge inputs per dimension (min / average / prefer rule per methodology).
4. Run Alliance scoring formula (see docs/METHODOLOGY.md); get letter + 0–100.
5. Call store to persist inputs and computed score.

Can be invoked by cron (e.g. `node run/index.js` or `python run/main.py`). When real adapters and DB are wired, this will read entity list from config or DB and write to shared DB.
