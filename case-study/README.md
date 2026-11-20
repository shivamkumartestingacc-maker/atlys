# From Group Chat to Group Trip · case study site

An interactive web case study with two reading modes (Presentation and Documentation) and a working prototype (Trip Room) in an overlay.

Plain HTML, CSS and JavaScript. No build step and no dependencies.

## Files

| File | What it does |
|---|---|
| `index.html` | All 12 sections. Documentation content lives in `.doc` blocks inside each section. |
| `styles.css` | Page and prototype styles. Tokens follow `design/atlys.md` and `design/atlys-deck.md`. |
| `proto.js` | Trip Room prototype: one data-driven component, used for the autoplay demos and the interactive overlay. Scenario data (chat, constraints, options, votes) sits at the top of the file. |
| `main.js` | Mode switch, section rail, scroll progress, reveal on scroll, overlay. |
| `assets/` | Destination photos cropped from the Atlys recordings. |

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve case-study
```

## Deploy on Vercel

1. Import the repository in Vercel.
2. Set **Root Directory** to `case-study`.
3. Set **Framework Preset** to `Other`. Leave the build command and output directory empty.
4. Deploy.

The site is fully static, so it also works on any static host.

## Useful links

- `index.html?mode=doc` opens straight into Documentation mode.
- Press `J` / `K` to move between sections.
- `Esc` closes the prototype.

## What is mock

- All chat messages, names, prices and votes are mock data.
- The AI is simulated with rules in `proto.js`. There are no network calls.
- No research participants, survey results or metrics are claimed anywhere. Evidence is labelled as from the brief, desk research, an assumption or a hypothesis.
