# Project context: Atlys design assignment

Working log for the product design assignment. Covers what was done, what exists in the repo, what is still open, and the decisions made along the way.

Repo: `shivamkumartestingacc-maker/atlys`
Working branch: `claude/elegant-allen-nnh9wn`

---

## 1. Assignment (two parts)

**Part A: Atlys design taste.** Study the Atlys app (screenshots and screen recordings) and the Navi case study, then produce:
- an app UI design language (`design/atlys.md`)
- a documentation deck design language (`design/atlys-deck.md`)

**Part B: Group Chat to Group Trip.** A product design case study that helps groups of friends move from "we should go somewhere" to a trip plan everyone agreed to. It has two modes:
- **Presentation:** story-led walkthrough of 15 sections.
- **Documentation:** deeper reasoning, research approach, assumptions and decisions. It adds context and does not repeat the presentation.

It is deployed as a static site (intended for Vercel).

---

## 2. Repo layout

```
atlys/
├── README.md                     # Original design assignment README (scaffold)
├── CONTEXT.md                    # This file
├── Atlys media/                  # Source reference material
│   ├── Atlys 1.mp4               # Screen recording 1 (27s)
│   ├── Atlys_2_comp.mp4          # Screen recording 2 (4m46s)
│   ├── Atlys_3_1_1.mp4           # Screen recording 3 (3m51s)
│   └── ss 1,5,6,7,9,11.jpeg      # App screenshots
├── navi case study/              # Navi deck reference slides (01-cover … 15-old-vs-new)
├── design/
│   ├── atlys.md                  # APPROVED app UI guidelines
│   ├── atlys-deck.md             # APPROVED deck guidelines (Deck A)
│   └── reference/
│       ├── atlys-design-system.html   # Approved app design system page (+ img/)
│       ├── atlys-deck-directions.html # Deck A/B/C comparison board (+ deckimg/)
│       ├── img/                       # Images used by the design system page
│       └── deckimg/                   # Screens used by the deck directions page
└── case-study/                   # Interactive case study site (static)
    ├── index.html                # 15 sections + prototype overlay
    ├── styles.css                # Tokens + layout + prototype styles
    ├── proto.js                  # "Trip Room" prototype engine
    ├── main.js                   # Mode switch, reveal, overlay, demos
    ├── README.md                 # Deploy notes (Vercel: root = case-study, preset = Other)
    └── assets/                   # Cropped Atlys photos used in the site
```

Commits on the branch (newest first): `dcc752d` case study rebuild on 15-section content · `b110ca6` redesign layout · `5f247bb` first case study site · `4146b8d` deck guidelines · `0f0b593`/`5da099c` atlys.md rename · `1be0e9b` app guidelines · `8cec437` Navi slides · `5ef8dff` recordings.

---

## 3. What was done, in order

### Part A: Atlys design language
1. **Reviewed the material.** Pulled key frames from the three recordings (scene-change and fixed-interval contact sheets) and the six screenshots. Atlys's website returned 403 to all automated access, so the design language comes from the app only.
2. **Extracted language.** Colour (white and soft-grey grounds, black pills, indigo for active state, prism gradient for emphasis only, green and orange for status), serif headlines with a sans UI, borderless cards on grey fills, photo heroes with a white sheet over them, crop-mark guides around hero objects, floating tab bar.
3. **App design system approved.** Built as a single reference page with tokens, components and six new screens for a family visa flow. User approved it. Written up as `design/atlys.md` (principles, colour, type, layout, components, screen patterns, motion, imagery, voice, accessibility, don'ts). Renamed from `app-design.md` to `atlys.md` at the user's request.
4. **Deck directions.** Built three deck options (A editorial white, B Navi-faithful with yellow stickies, C black cover and dividers), each with the same seven slides. User picked **Deck A**. Written up as `design/atlys-deck.md` (canvas, colour, type, components, seven templates, running order, writing rules, don'ts).
5. **Cover options.** Three cover variations were made (classic split, full-bleed photo, typographic). User has not picked one yet; the cover template in `atlys-deck.md` is not updated for it.

### Part B: Case study site
1. **First site build.** Static site with 12 sections, presentation and documentation modes, and the "Trip Room" prototype. Prototype started as a group-chat flow with an AI trip brief, a 4-question check-in, conflicts, options, a consent vote and confirmation.
2. **Fixes along the way.** Chat bubbles were replaying their fade-in on every render (fixed by animating only new items), plan cards were squashing in the scroll area (fixed with flex-shrink), the rail labels overlapped text (moved to hover), and the mobile top bar overflowed (compacted).
3. **Layout redesign.** The first version was judged 3/10 for UI, with broken layouts and too much copy. Rewrote the page to an editorial two-column grid with hairline rows, specimen stages for key visuals, a dark "ticket" and a stacked North Star card. Copy roughly halved. Inspiration from two user references (a flight-ticket card and a BMW asset card).
4. **Content rebuild (current).** User supplied a 15-section master content set. Site rebuilt to match: title, problem brief, brief to problem statement, target users and moment, research, JTBD, questions and assumptions, scope, ideation, solution strategy, product experience, alternatives, growth strategy, success measurement, learnings. Prototype extended to eight screens: Groups Home, Group Conversation, AI Trip Brief, Preferences and Constraints, Group Alignment, Destination Comparison, Collaborative Decision, Trip Workspace.

### Verification done
- End-to-end click-through of both prototype scenarios with zero console errors.
- Documentation mode renders.
- No horizontal overflow at 390px.
- Screenshots of every section reviewed at 1440px.

---

## 4. Decisions and their reasons

| Decision | Reason |
|---|---|
| Design language built from app, not website | Website returns 403 to automated access. Be explicit about this in the case study. |
| Real Atlys photos cropped from recordings, not drawn in code | User feedback: drawn placeholders made the look far from the real app. Recordings are 576px wide, so crops are soft at large sizes. |
| Prism gradient restricted to one phrase per screen or slide | Keeps the signature without it becoming rainbow noise. User feedback asked for less rainbow, then asked for it back in key places. |
| Deck A chosen | User preference after comparing A, B, C. |
| Consensus model: constraints filter, then consent vote ("can't" is a veto) | Majority voting overrides hard limits. Covered in the brief's alternatives section. |
| Private budget, public cap | Lets people answer honestly without exposing their exact number. Assumption, to be tested. |
| AI never confirms, never picks a winner | Brief principle: keep final decisions under group control. |
| Everything marked as assumption, hypothesis or desk research | Brief forbids invented research, statistics or validation outcomes. No metric targets set. |
| Metrics show "NO DATA" and "Target TBD" | Same reason: no invented numbers. |
| Prototype is a mobile UI shown on desktop | Brief asks for a working prototype within a scoped build. |
| Plain HTML/CSS/JS, no build step | Fast to ship, trivially deployable on Vercel as a static site. |

---

## 5. Known gaps and open items

**Decisions still open with the user**
- Cover variation: V1, V2 or V3 (or a mix). Not chosen.
- Whether the cover template in `atlys-deck.md` should be updated for the chosen cover.
- Final assignment title. "From Group Chat to Group Trip" is used on the site. The cover variations used a placeholder ("One trip, every traveller's visa").

**Content and assets**
- Images are cropped from 576px recordings. Full-resolution screenshots would sharpen them.
- The home and work-mode heroes in the case study are video frames with Atlys's own UI text baked in.
- Destinations, prices, names and dates in the prototype are mock.
- The tracker and approval-intelligence screens in the Atlys app design are my compositions, not from the recordings.
- Fonts are stand-ins: Newsreader (serif), Inter (sans), JetBrains Mono (mono), Doto (dot-matrix, case study only). Swap to Atlys's licensed faces if available.

**Case study site**
- The published Claude artifact (https://claude.ai/artifact/2VdLS7r8WBZvczQMHStjsH) is a preview copy. The repo is the source of truth.
- Deployment to Vercel is not done. The steps are in `case-study/README.md`.
- The prototype only covers the core journey. Re-planning when someone drops out is not designed.
- Scenario A (known destination) reuses the same flow with Vietnam options, so it is less developed than Scenario B.

**Deck**
- `atlys-deck.md` describes the approved deck style, but no actual submission deck has been built yet. Only the sample slides on the directions board exist.
- The deck's 17-slide running order is a suggestion based on the Navi case study.

---

## 6. Next steps (suggested)

1. Pick a cover variation and confirm the final title.
2. Build the actual submission deck in Figma (or the Claude Design tool) using `design/atlys-deck.md`, with the case study's content.
3. Deploy `case-study/` to Vercel (root directory `case-study`, preset Other).
4. Do a final review of the case study for copy accuracy against the 15-section brief.
5. Consider getting full-resolution Atlys screenshots to replace the video crops.

---

## 7. How to work in this repo

- Work on `claude/elegant-allen-nnh9wn`. Commit and push there.
- Design-language changes go in `design/`. Case-study changes go in `case-study/`.
- `design/reference/` is the visual record of what was approved. Update it only when the approved design changes.
- Keep evidence labels honest: from brief, desk research, assumption, hypothesis. Never add research findings or numbers that were not supplied.
