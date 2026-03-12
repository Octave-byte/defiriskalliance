# DeFi Risk Alliance — Documentation

The DeFi Risk Alliance provides a credibly neutral, open-source methodology for scoring the risk of DeFi yield strategies. Scores are aggregated from multiple independent external raters and published transparently so that users, integrators, and institutions can make informed decisions.

## Contents

- **[METHODOLOGY.md](docs/METHODOLOGY.md)** — The risk-scoring methodology: three layers (Assets, Markets, Vaults) scored on three axes (Security, Operations, Economics), composition modes, multi-rater aggregation, and the output scale.

- **[PROVIDER-INTEGRATION.md](docs/PROVIDER-INTEGRATION.md)** — How external raters can participate: submission format, delivery options, onboarding process, and how scores are aggregated.

For the operational pipeline (ingestion, API, alerts), see [services/](services/).

## Repository Structure

```
├── docs/                          # Methodology and rater integration
│   ├── METHODOLOGY.md             # Scoring methodology (v2.1)
│   ├── PROVIDER-INTEGRATION.md    # Rater onboarding guide
│   └── README.md
├── services/                      # Operational backend
│   ├── ingestion/
│   │   └── adapters/              # Per-rater adapters (mock.js, ...)
│   ├── api/
│   │   ├── endpoints.md           # API spec
│   │   └── implementation/        # HTTP server
│   └── signals/
│       ├── rules.md               # Alert rules
│       └── implementation/        # Alert logic
├── index.html                     # Charter website (GitHub Pages)
├── content.md                     # Manifesto content
├── assets/
│   └── logo.png
└── README.md                      # This file
```
