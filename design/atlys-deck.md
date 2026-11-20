# atlys-deck.md · Documentation Deck Guidelines

The guideline for the case-study deck. The approved direction is **Deck A, Editorial white**. Open `design/reference/atlys-deck-directions.html` and look at the first board to see it rendered.

The deck uses the same tokens as the app (`design/atlys.md`). The slides should feel like the app: white, calm, serif, with one prism moment per slide. The structure follows the Navi case study: real screens, annotated findings, numbers up front.

---

## 1. Principles

1. **One idea per slide.** The title says the idea and everything else supports it.
2. **Screens are the evidence.** Every claim about the product sits next to a real screen: the current app on the left or "before", the new design on the right or "after".
3. **Numbers first.** Metrics, odds and impact get the biggest type on their slide.
4. **Quiet frame, loud content.** The slide chrome (eyebrow, footer, cards) stays grey and small so the screens and the one prism phrase carry the slide.
5. **Readable as a PDF.** Every slide must make sense with no presenter.

---

## 2. Canvas

| Property | Value |
|---|---|
| Size | 16:9, 1920 × 1080 (export at 2×) |
| Background | `#FFFFFF` on every slide |
| Margins | 115px left/right (6%), 104px top (5.4%), 88px bottom (4.6%) |
| Grid | 12 columns, 24px gutter inside the margins |
| Footer | Mono 19px (1%), `#7A7D86`, letter-spacing 0.08em: "ATLYS · CASE STUDY" on the left, the slide number "01" on the right, 50px from the bottom |

Sizes below are given at 1920 wide. The same values as a share of slide width are in brackets, for Figma frames of any size.

---

## 3. Colour

The app palette, used more sparingly on slides.

| Token | Hex | Slide use |
|---|---|---|
| Ink | `#0B0B0C` | Titles, key numbers, HMW bar, number badges |
| Ink 2 | `#3D4049` | Body and note text |
| Muted | `#7A7D86` | Eyebrows, footers, captions, labels |
| Line | `#ECEDF0` | Dividers, pill outlines, chapter rules |
| Fill | `#F5F6F8` | Note cards, change cards, funnel card, chip box |
| Indigo | `#4F57E8` | Heuristic tags in notes, first funnel dot |
| Indigo soft | `#EEF0FE` | Target box under the funnel |
| Red | `#E5484D` | Drop-offs in the funnel, annotation boxes on screens |
| Green | `#22A06B` | Positive deltas, when needed |
| Crop marks | `#C9CBD2` | Dashed guides around hero phones |
| Prism | `linear-gradient(90deg, #2E3192, #6C4BD8 30%, #D9486B 62%, #EE8A4F 82%, #E9B949)` | One phrase per slide, text only |

**Prism rules**
- Put prism on **one phrase per slide**, in the title, the problem statement or an impact number.
- Use it on the word that carries the meaning ("every traveller's visa", "problem", "after", "+25%").
- Not every slide needs one. The metrics and heuristic slides run without.
- Never use prism on body text, notes, chips or backgrounds.

---

## 4. Typography

| Style | Font | Size @1920 | Line height | Tracking | Use |
|---|---|---|---|---|---|
| Cover title | Serif 500 | 108px (5.6%) | 1.0 | -0.03em | Cover, chapter dividers |
| Slide title | Serif 500 | 81px (4.2%) | 1.04 | -0.025em | Every content slide |
| Statement | Serif 500 | 65px (3.4%) | 1.12 | -0.02em | Problem statement |
| Impact number | Serif 500 | 104px (5.4%) | 0.9 | -0.03em | Impact stats |
| Funnel number | Sans 700 | 46px (2.4%) | 1.1 | 0 | Funnel values |
| Lead | Sans 400 | 33px (1.7%) | 1.45 | 0 | Subtitles, one-line context |
| Body / change | Sans 400 | 27px (1.4%) | 1.4 | 0 | Change notes, funnel labels |
| Note title | Sans 600 | 27px (1.4%) | 1.3 | 0 | Heading inside a note card |
| Note body | Sans 400 | 24px (1.25%) | 1.4 | 0 | Note card text |
| Eyebrow | Sans 600, UPPERCASE | 24px (1.25%) | 1.2 | 0.16em | Above every title ("LET'S TALK BUSINESS") |
| Tag | Sans 700, UPPERCASE | 18px (0.95%) | 1.2 | 0.12em | Heuristic name inside notes (indigo) |
| Mono | Mono 400 | 19–31px | 1.2 | 0.08em | Footer, chapter counter "01 / 04" |

Fonts: Newsreader (serif), Inter (sans) and JetBrains Mono (mono). These are stand-ins; use Atlys's licensed faces if you have them.

**Eyebrow pattern:** a short uppercase phrase that frames the slide, for example "LET'S TALK BUSINESS", "BEHIND THE SCREENS", "WHAT WE ACHIEVED" or "01 · CURRENT APP". It replaces the Navi deck's "~ tilde ~" eyebrows.

---

## 5. Components

### Phone mock-ups
- **New screens:** export each app screen from Figma inside the phone frame: an 8px `#111214` bezel at 376×780 and a 48px corner radius.
- **Current Atlys screens:** a real capture inside the same bezel, scaled to match.
- **Heights:** the hero phone is 58–69% of slide height (cover, heuristic). Supporting phones are 50–58%. Rows of three are 46–54%, with the middle one taller.
- **Crop marks:** dashed 1px `#C9CBD2` lines that run past the phone group by about 27px on each side, placed 27px out from the phones. Use them on the cover and on any slide where the phone is the hero.
- **Annotations:** red `#E5484D` boxes, 4px stroke, 15px radius, drawn over the part of the screen a finding refers to. Use at most 3 per screen.

### Note card (findings)
- `#F5F6F8` fill, 23px radius, 29px × 33px padding, no border, no shadow.
- Content, top to bottom: the indigo uppercase **tag** (heuristic name), the **note title** (sans 600), then **note body** (sans 400, ink 2) in 1–2 lines.
- Stack them in two columns beside the phone, 2 per side. Keep each note to 25 words or fewer.

### Change card (before and after)
- `#F5F6F8` fill, 23px radius, a black number badge (46px circle, white numeral) on the left.
- The bold first phrase states the change and the rest gives the reason: "**Only blocked rows get a button.** The eye goes straight to 'Fix'."
- Use 3 cards, stacked between the before and after phones.

### Chip box and HMW bar (problem slide)
- **Chip box:** a `#F5F6F8` pill reading "Problem statement" in sans, ink 2, with a 1px `#ECEDF0` vertical line below it (96px tall).
- **HMW bar:** a black pill with white text in sans, 31px, containing one "How might we…" question.

### Funnel (metrics slide)
- One `#F5F6F8` card at 31px radius with 4 columns: the value or red drop line, a 31px dot (indigo for the first step, ink for the rest), and a two-line label.
- A dotted `#B9BCC5` connector runs between the dots.
- Beneath it sits an **indigo-soft target box**: "**Target: X% (current Y%).** One-line goal."

### Stat row (impact slide)
- A hairline `#ECEDF0` above each row, then the serif impact number on the left (only one of them in prism) and a muted one-line explanation on the right.
- Use 3 rows, with three phones on the right showing where each result lives.

### Pills (cover)
- Outline pills (`#ECEDF0` border, ink text, 27px) list the scope: "UX research · App UI · Prototype · B2C".

### Chapter rule (divider)
- The mono counter "01 / 04", a cover-size serif title, then a row of upcoming sections, each under a 1px top rule.

---

## 6. Slide templates

Build every slide from these 7 templates.

| # | Template | Layout |
|---|---|---|
| 1 | **Cover** | Left 55%: eyebrow, cover title (2 lines, second line prism), lead (2 lines), scope pills. Right: 2 new phones in crop marks, the second taller. |
| 2 | **Chapter divider** | Bottom-left aligned: counter, cover title with one prism word, chapter list with rules. No images. |
| 3 | **Statement** | Centred: chip box, vertical line, statement (2 lines max, prism on the cause), HMW bar. |
| 4 | **Metrics** | Eyebrow, title, one-line lead, funnel card, target box. |
| 5 | **Evaluation** | Eyebrow, title. A 3-column grid: 2 notes, the annotated current screen, 2 notes. |
| 6 | **Before / after** | Eyebrow, title (prism on "after"). The BEFORE phone, 3 change cards, then the AFTER phone. Label each phone with a muted uppercase caption above it. |
| 7 | **Impact** | Eyebrow, title, 3 stat rows on the left, 3 phones on the right. |

Reuse templates 4–6 for other content. For example, journey mapping goes in the Evaluation layout with a wide board image in place of the phone, user testing goes in a table on a Metrics-style card, and UI iterations go in a row of 5–7 phones under a title.

### Suggested running order
1. Cover
2. About the product / context
3. Chapter: Understanding the problem
4. Problem statement
5. Metrics
6. User research methods
7. Heuristic evaluation (1–2 slides)
8. Journey mapping and pain points
9. Benchmarking
10. Chapter: Designing the solution
11. UI variations / iterations
12. User testing insights
13. Before / after
14. Edge cases
15. Chapter: Outcome
16. Impact and results
17. Thank you / next steps

This mirrors the Navi case study (see `navi case study/`) with chapter dividers added.

---

## 7. Writing on slides

- Titles: 1–4 words ("The metrics", "Heuristic evaluation", "Before and after").
- Statements and leads are one sentence, written in plain language.
- Use real numbers with units. Write "~" for estimates; never invent precision.
- Use a bold first phrase for the point, then normal text for the reason.
- No emoji. Use emphasis sparingly; prism and bold do the work.

---

## 8. Don'ts

- Don't use dark slides. (Deck C's black dividers weren't chosen.)
- Don't use sticky-note yellow, tilde eyebrows or bold sans titles. Those were Deck B.
- Don't put more than one prism phrase on a slide.
- Don't use mock-ups without the bezel, or tilt or put perspective on phones.
- Don't add shadows to cards; the grey fill does the separation.
- Don't use more than 4 notes or 3 annotations per screen.
- Don't put text smaller than 18px at 1920 width.
