# DeFi Risk Alliance — Documentation

The DeFi Risk Alliance provides a credibly neutral, open-source methodology for scoring the risk of DeFi yield strategies. Scores are aggregated from multiple independent external raters and published transparently so that users, integrators, and institutions can make informed decisions.

This folder contains the methodology, definitions, and rater integration docs. These are **separate from the charter website** (see repo root for `index.html`, `content.md`, and the main site).

## Contents

- **[METHODOLOGY.md](METHODOLOGY.md)** — The risk-scoring methodology: three layers (Assets, Markets, Vaults) scored on three axes (Security, Operations, Economics), composition modes, multi-rater aggregation, and the output scale.

- **[MARKETS-VS-VAULTS.md](MARKETS-VS-VAULTS.md)** — Definitions of *markets* (e.g. Aave, Fluid lending) vs *vaults* (ERC-4626, strategy vaults, CDP-style), and why the distinction matters for scoring.

- **[PROVIDER-INTEGRATION.md](PROVIDER-INTEGRATION.md)** — How external raters can participate: submission format, delivery options, onboarding process, and how scores are aggregated.

For the operational pipeline (ingestion, API, alerts), see [../services/](../services/).
