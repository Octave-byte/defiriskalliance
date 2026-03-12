# DeFi Risk Alliance

The DeFi Risk Alliance is a credibly neutral initiative that rates the risk of DeFi yield strategies by aggregating scores from multiple independent external raters. Every strategy is decomposed into layers (Assets, Markets, Vaults) and evaluated on three axes (Security, Operations, Economics), producing a transparent, composable score on a 0–10 scale. The methodology, weights, and aggregation rules are fully open and challengeable.

This repository contains the Alliance charter website, the scoring methodology documentation, and the operational backend for ingestion, scoring, and alerts.

## Documentation

For the full methodology, market/vault definitions, and rater integration guide, see the [docs/](docs/) folder.

## Operational Backend

Scoring ingestion, analytics API, and rating alerts live under [services/](services/). See [services/README.md](services/README.md) for how to run them.

## Structure

```
├── index.html      # Main HTML file (styling and layout)
├── content.md      # Manifesto content in Markdown (edit this!)
├── assets/
│   └── logo.png    # DeFi Risk Alliance logo
├── docs/           # Methodology and provider integration (separate from website)
│   ├── README.md
│   ├── METHODOLOGY.md
│   ├── MARKETS-VS-VAULTS.md
│   └── PROVIDER-INTEGRATION.md
├── services/       # Operational backend: ingestion, API, signals
│   ├── README.md
│   ├── ingestion/
│   ├── api/
│   ├── signals/
│   └── shared/
└── README.md       # This file
```

## Editing Content

To update the manifesto text, simply edit `content.md` directly on GitHub. The markdown will be automatically rendered on the site.

### Formatting Guide

- `# Heading` for the main title
- `## Heading` for section titles
- `### Heading` for subsections
- `**bold text**` for emphasis
- `> blockquote` for highlighted statements
- `- item` for bullet lists
- `---` separates the intro section from the "Read More" content

## Updating Links

To change the Forum, Docs, or Twitter links, edit `index.html` and find the `right-sidebar` section near the top of the `<body>`.

## Deployment

This site is designed for GitHub Pages:

1. Push this repository to GitHub
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and `/ (root)` folder
5. Save

Your site will be live at `https://yourusername.github.io/repository-name/`
