# Rating-decrease signals — When to alert

We emit a signal when a strategy's **overall score** (composed from asset, market, and vault layers) **decreases greatly**. Alerts are based on the Alliance's computed score only, not on individual provider inputs.

## Definition of "decrease greatly"

One or more of the following (configurable):

1. **Grade drop** — Strategy letter grade drops by **>= 2** (e.g. A -> C, B+ -> D).
2. **Numeric drop** — Strategy score (0–10) drops by **more than 2.0 points** in one run (e.g. 8.5 -> 6.0).
3. **Below threshold** — Strategy score falls **below** a safety threshold after the run:
   - Letter below **C** (i.e. D or F), or
   - Numeric below **4.0**.

**Default rule:** Alert if **(grade drop >= 2) OR (numeric drop > 2.0) OR (strategy score < 4.0)**.

## Comparison

- Compare **latest** strategy score (current run) with **previous** strategy score (last stored for that entity).
- If no previous score exists, do not alert (first run).

## Mechanism

- Run after each ingestion run (or as a dedicated job that reads from DB).
- For each strategy that has a new score and a previous score, apply the rules above.
- If triggered: call a **webhook** (e.g. Slack, Discord, custom endpoint) or push to a queue for email/notification. Payload: entity_id, previous score (letter + numeric), current score (letter + numeric), rule triggered.
- Document webhook URL and format in [README.md](README.md) or env (e.g. `SIGNALS_WEBHOOK_URL`).
