# Ingestion — Provider data to Alliance score

Fetch from provider APIs, map responses into **our input schema** (see [docs/METHODOLOGY.md](../../docs/METHODOLOGY.md)), merge inputs per dimension, run **our** scoring formula, and persist Alliance score + ingested inputs (and optional provenance).

## Flow

1. **Fetch** — For each entity (asset, market, vault) we care about, call each provider's API (or use adapters that already have data).
2. **Adapt** — Each adapter outputs **our input schema** (dimension names + values) per entity, per provider. We do not store the provider's own composite score as our output.
3. **Merge** — For each dimension, apply the merge rule when multiple integrators supply it (e.g. minimum, average, or primary). Any dimension still missing after merge is default-to-worse. See [METHODOLOGY.md — Multiple integrators and their influence](../../docs/METHODOLOGY.md#multiple-integrators-and-their-influence).
4. **Score** — Run the Alliance scoring formula on the merged inputs. For **vaults**, compute the **main metric** (vault strategy score) and its **sub-component** (vault infra score). Output: letter + 0–100 per score, tagged with `methodology_version`.
5. **Persist** — Store ingested inputs (per entity, per provider, timestamp) and computed Alliance scores. For **vaults** we store the **main metric** (vault strategy score) and the **sub-component** (vault infra score) per entity, timestamp. Optionally store provenance (which provider supplied which input).

## Schedule

Run ingestion on a schedule (e.g. daily or every 6h). Use cron, a job queue, or a manual trigger. Document the schedule here when fixed.

## Adapters

Adapters live in [adapters/](adapters/). Each adapter:

- Takes provider API config (e.g. base URL, API key from env).
- Fetches data for one or more entities.
- Returns a list of **our input records**: entity_type, entity_id, provider, dimensions (key-value per our schema), timestamp.

**Per-category completeness:** To be taken into account in a **category** (asset, market, or vault), an adapter must supply **every dimension** of that category. Each dimension must be present with a value or explicitly **null** (if the integrator does not know it). Omitting a dimension disqualifies that adapter’s submission for that category. For dimensions set to **null**, the pipeline uses the **mean** of the values supplied by other adapters for that dimension; if no other adapter supplies it, the dimension is missing overall and **default-to-worse** applies. An adapter can contribute to only some categories (e.g. only vault, not asset) but within a category must supply all dimensions (or null). See [METHODOLOGY.md — Multiple integrators and their influence](../../docs/METHODOLOGY.md#multiple-integrators-and-their-influence).

See [adapters/mock.js](adapters/mock.js) for a full example and `getVaultInputsWithNulls()` for an example that supplies every vault dimension with some set to `null`.

## Store

[store/](store/) writes to the shared DB: save inputs, save computed score, optional provenance. The API reads from the same DB.

## Run

Entrypoint: [run/](run/) (e.g. `node run/index.js` or `python run/main.py`). Runs all adapters, merges, scores, persists.
