# Signals — Rating-decrease notifications

When a vault's **main metric** (vault strategy score: vault + assets + markets) decreases greatly (see [rules.md](rules.md)), we emit a signal: webhook or notification. We do not alert on the vault infra sub-component alone.

## Rules

See [rules.md](rules.md). Summary: alert if grade drop ≥ 2, or numeric drop > 20, or score below 50 (configurable).

## Mechanism

- **Input:** Latest and previous **vault strategy scores** per vault (from shared DB; same data ingestion writes).
- **Process:** After each ingestion run (or a dedicated job), compare latest vs previous strategy score for each vault; if the rule triggers, call webhook or push to queue.
- **Output:** Webhook payload (e.g. `{ entity_id, previous_strategy_score_letter, previous_strategy_score_numeric, current_strategy_score_letter, current_strategy_score_numeric, rule_triggered }`) or integration-specific format.

## Running

- Option A: Run as part of the ingestion job (after persist step).
- Option B: Separate script/job that reads last two scores per vault from DB and emits. See [implementation/](implementation/) for an optional script that checks one vault and logs "would alert" so the flow is clear.

## Config

- `SIGNALS_WEBHOOK_URL` — Optional. If set, POST payload to this URL when rule triggers.
- Rule thresholds (grade drop, numeric drop, minimum score) can be env or config file; document when fixed.
