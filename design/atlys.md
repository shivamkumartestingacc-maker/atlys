# atlys.md · App UI Guidelines

The design system for every app screen in this assignment. It was approved from the "Atlys Design System" artifact. The source page is at `design/reference/atlys-design-system.html`; open it to see every token and component rendered.

The system comes from the Atlys app as it ships today: screenshots and screen recordings in `Atlys media/`. Where the app has no screen for something, the rules here decide.

---

## 1. Principles

1. **White first.** Screens sit on white. Colour comes from photography and from small, meaningful accents, not from UI chrome.
2. **Serif speaks, sans works.** Headlines use the serif. Names, numbers, labels and buttons use the sans.
3. **One prism moment per screen.** The prism gradient is the Atlys signature. Use it once per screen, on the phrase that carries the emotion.
4. **Hierarchy through size and space.** Prefer bigger type and more whitespace over borders, boxes and colour.
5. **Only blocked items get a button.** When a list mixes done and pending items, done items go quiet and only actionable rows get a CTA.
6. **Show the outcome.** Lead with what the user gets ("Visa on 30 Nov, 9:28 am", "You're going.") before the process behind it.

---

## 2. Colour

### Neutrals

| Token | Hex | Use |
|---|---|---|
| `surface` | `#FFFFFF` | Screen background, sheets, tab bar |
| `fill` | `#F5F6F8` | Card and grouped-list background (no border) |
| `ground` | `#F2F2F4` | Page ground behind white cards, when needed |
| `line` | `#ECEDF0` | Dividers, outline buttons, round icon buttons |
| `muted` | `#7A7D86` | Secondary text, captions, placeholders |
| `ink-2` | `#3D4049` | Body text on grey fills |
| `ink` | `#0B0B0C` | Primary text, primary buttons, active tab |

### Accents

Use accents for state, not decoration.

| Token | Solid | Soft bg | Text on soft | Use |
|---|---|---|---|---|
| `indigo` | `#4F57E8` | `#EEF0FE` | `#3D44C9` | Transaction CTA (Start now, Submit), selected date, current step, OTP boxes, "In review" |
| `green` | `#22A06B` | `#E9F6F0` | `#178556` | Approved, good odds, data bars, "Eligible" |
| `orange` | `#E8833A` | `#FDF1E7` | `#B4531A` | Needs action, expiring soon |
| `red` | `#E5484D` | `#FDECEC` | `#C8363B` | Error, rejected, rejection-reason bars, field validation |

### Material surfaces (signature cards)

| Token | Value | Use |
|---|---|---|
| `pass` | `#0E0F12` | Worldpass card, fast-track card |
| `navy` | `linear-gradient(170deg, #03050C 30%, #12324F)` | Trips card |
| `steel` | `conic-gradient(from 210deg at 70% 55%, #E9EBEF, #B9BDC4, #F4F5F7, #A8ACB4, #E2E4E8, #C3C6CC, #E9EBEF)` | Document vault card |

### Prism gradient

| Token | Value |
|---|---|
| `prism-deep` | `linear-gradient(90deg, #2E3192, #6C4BD8 30%, #D9486B 62%, #EE8A4F 82%, #E9B949)` |
| `prism-pastel` | `linear-gradient(90deg, #D9D6FB, #E9C7DE 40%, #F0BBA4 70%, #F6EDCB)` |

Rules:
- **`prism-deep`** is for text only (clipped to text), on one phrase of a serif headline per screen: "Vietnam, *in 18 days*", "*Vietnam, here you come.*", "*Pack your bags*". It may also fill a 4–5px progress bar.
- **`prism-pastel`** is for worldpass and benefits activation buttons only ("Confirm Details & Activate Benefits", "Claim Benefits").
- Never use prism on body text, icons, chips, data or more than one element per screen.

---

## 3. Typography

Atlys uses a high-contrast serif and a neutral grotesk. The prototype uses these stand-ins: **Newsreader** (serif), **Inter** (sans) and **JetBrains Mono** (mono). Swap in the licensed faces if you have them.

| Style | Font | Size / line height | Weight | Tracking | Use |
|---|---|---|---|---|---|
| Display | Serif | 40 / 1.0 | 500 | -0.02em | Celebration headline ("You're going.") |
| Screen title | Serif | 32 / 1.02 | 500 | -0.02em | Top of each screen |
| Section title | Serif | 26 / 1.08 | 500 | -0.02em | "Price details", "Your visa's timeline" |
| Sub-section | Serif | 22 / 1.1 | 500 | -0.02em | "What Vietnam travellers are saying" |
| Big number | Serif | 40–56 / 1.0 | 500 | -0.02em | Approval odds, "91.7%" |
| Name | Sans | 20 / 1.2 | 700 | -0.02em | "Vietnam Visa", card titles |
| Body L | Sans | 15 / 1.45 | 400–600 | 0 | Lead text, list titles |
| Body | Sans | 14 / 1.45 | 400 | 0 | Default |
| Small | Sans | 13 / 1.4 | 400–500 | 0 | Captions, secondary rows |
| Caption | Sans | 12 / 1.35 | 400 | 0 | Meta, timestamps |
| Label | Sans | 11 / 1.2 | 600 | 0.14em, UPPERCASE | Card headers ("RIYA'S DOCUMENT VAULT"), eyebrows |
| Mono | Mono | 12 | 400 | 0.14em | Worldpass number, visa numbers |
| Button | Sans | 15 (13 small) | 600 | 0 | All buttons |

Use sentence case everywhere except labels. Titles end without a full stop, except emotional lines ("You're going.").

---

## 4. Layout, spacing, radius, elevation

- **Frame:** 360–390pt wide. Screen gutter is **18pt**.
- **Spacing:** use a 4pt grid (4, 8, 12, 16, 20, 24, 32). Put 20–24pt between sections and 8–12pt inside groups.
- **Card padding:** 16–18pt.

| Radius | Use |
|---|---|
| 8 | Text fields, document thumbnails |
| 12–14 | Small tiles, icon squares, holiday card |
| 16–20 | Cards, photo cards, perk cards |
| 24 | Hero images, trip image |
| 28 | Bottom sheets (top corners), home sheet over photo |
| 999 | Buttons, chips, search, tab bar, toggles |

**Elevation:** flat by default. Shadows go only on things that float.

| Element | Shadow |
|---|---|
| Tab bar | `0 8px 24px rgba(0,0,0,.10)` |
| OTP box | `0 6px 14px rgba(79,87,232,.30)` |
| Filter button on photo | `0 4px 12px rgba(0,0,0,.12)` |

Cards on white use the `fill` colour with **no border and no shadow**.

---

## 5. Components

### Buttons
| Type | Style | When |
|---|---|---|
| Primary | `ink` fill, white text, pill, 14×18 padding, full width at the bottom | Continue, Apply, Download, Use from vault |
| Transaction | `indigo` fill, white text, pill | Start now, Submit: the step that commits money or an application |
| Activation | `prism-pastel` fill, ink text, pill | Worldpass / benefits activation only |
| Secondary | White, 1px `ink` outline, pill | Clear Filters, View documents, Auto-fill |
| Text link | Underlined, 3px offset, 13–14 / 500 | "I don't want any benefits", "Don't have it handy?", "or free" |
| Disabled | Primary at 30% opacity | Until the form is valid |
| Small | 9×14 padding, 13pt | Inline row actions: Fix, Install, Resume |

Use one primary per screen. Put the secondary action as a text link under the primary.

### Chips and status
- **Filter chip:** white, 1px `line`, pill, with a 20pt coloured circle icon on the left. When selected it's an `ink` fill with white text.
- **Status pill:** soft background, coloured text and a 6pt dot. Variants: Approved (green), In review (indigo), Needs action (orange), Rejected (red).
- **Mode toggle:** a white pill with a black dot and a label ("Tourist" / "Work"), top-right over photos.
- **Location chip:** frosted glass (white at 22% + blur 8 + 1px white at 45%), white text, over photos.
- **List chip:** white, `line` border, with an orb and the text "What this takes off your **list** ›".

### Inputs
- **Search:** white pill, centred magnifier and placeholder. The round filter button beside it has a black count badge.
- **Text field:** an uppercase label (11 / 700 / 0.1em) over a dotted underline. Errors turn the underline red and show 11pt red helper text ("This field is required").
- **OTP:** 6 boxes, 38×44, radius 12. Filled boxes are `indigo` with white digits and a shadow; empty boxes are white with a `line` border.
- **Stepper:** − value +, round 24pt buttons.
- **Calendar:** 7 columns. Today has a 1.5px ink ring, the selected day an ink (or indigo) fill. Ranges sit in a grey `#ECECEF` capsule. On-time odds show as a green or red tint with a dot.

### Cards
- **Photo card:** a destination photo, radius 20, with flag + serif uppercase name centred and a "VALID · 90 DAYS" footer. A caption below reads "Visa by 20 Nov 2026, 09:53 AM".
- **Fill card:** `fill` background, radius 20, no border. Use it for grouped lists, forecasts and fee breakdowns.
- **Worldpass:** `pass` background, radius 22. It shows "+ atlys worldpass" at 45% opacity, a dotted globe, the name, and a mono number above a hairline. Frame it with **dashed crop marks** when it is the hero object.
- **Trips:** `navy` card with a label header, a hairline, then big numbers and a dotted globe at the bottom-right.
- **Vault:** `steel` card with a dial graphic, a label header and big count.
- **Fast-track:** `pass` card with a green "Eligible" or "Booked" pill and a serif one-liner.
- **Perk card:** radius 18, a soft accent fill or full photo, a title and a one-line benefit.

### Navigation
- **Tab bar:** a floating white pill 14pt from the screen edges with 3 items: Explore (paper plane), Home, Profile (avatar). The active item is a black pill with icon and label.
- **Underline tabs:** 12.5pt, `muted`. The active tab is `ink` / 600 with a 2px ink underline. They scroll horizontally.
- **Round icon button:** 40pt, white, 1.5px `line` border. Use it for back, share, bell, add, or as a 52pt black filter FAB.
- **Step dashes:** 14×3 bars. Completed ones are 22pt wide and `ink`.

### Sheets and feedback
- **Bottom sheet:** white, 28pt top radius, a 38×4 handle, and a 45% ink scrim over the screen behind it. Actions are pinned at the bottom.
- **Sticky booking bar:** white, with a top hairline. It shows "Visa on 30 Nov, 9:28 am" with "On time, or free" (shield + underline) under it, and an indigo **Start now** button.
- **Toast:** `#18191C`, radius 16, a small icon, the message and an underlined action ("Undo"). It sits above the tab bar.
- **Skeleton:** `#EEEFF2 → #F7F7F9` shimmer at 1.4s, matching the final layout's shapes.
- **Progress:** a 5px rounded track in `line`, filled with `prism-deep`.
- **Data bars:** 8–10px rounded tracks. Green for odds, indigo for forecasts, soft red for rejection reasons. The value sits on the right, bold.

---

## 6. Screen patterns

| Pattern | Structure |
|---|---|
| **Discovery (home)** | Full-bleed photo hero, Explore/Events toggle, white serif question, search + filter, location chip. A white 28pt sheet slides over it with a 2-column grid of photo cards. Floating tab bar. |
| **Detail (visa page)** | Photo strip at the top. A white sheet holds flag + bold name + underlined category, then underline tabs and serif section titles. Sticky booking bar. |
| **Flow step** | Round back button, step dashes centred, a centred title, a one-line explanation, the list chip, the main interaction, then the primary button + text link. |
| **Status / hub** | Label eyebrow, a serif title with one prism phrase, a hero object (image or worldpass in crop marks), then a fill-card list with status pills. Only blocked rows get a button. |
| **Celebration** | Orb, serif display line, prism second line, stamped worldpass in crop marks, perk carousel, primary download + share link. |
| **Checklist** | Label with time and route, serif question title, prism progress, a highlighted material card for the key item, then a fill-card checklist. |

Every list of travellers, documents or tasks uses the same row: avatar or thumbnail, a title and caption, then a status pill **or** a small action button on the right, never both.

---

## 7. Motion

| Moment | Behaviour | Timing |
|---|---|---|
| Sheet open | Slides up over the photo; the scrim fades in | 320ms ease-out |
| Hero collapse | The photo scales and fades with scroll; the sheet takes the screen | scroll-linked |
| Story focus | The active row's orb grows and its text fills with prism; other rows fade to 45% | 400ms spring |
| Name on worldpass | Text types onto the card | 40ms per character |
| Search placeholder | Cycles through "a cafe", "an activity", "a location" | 2.5s per item |
| Toast | Rises from the bottom and auto-hides | in 240ms, stays 4s |
| Status change | The pill cross-fades; the progress bar animates to its new value | 300ms |

Respect reduced-motion: swap movement for fades.

---

## 8. Imagery and iconography

- **Photos:** bright, saturated destination photography (sea, karst, skylines). Use full-bleed on heroes and radius 20–24 on cards. Add a bottom gradient (transparent → 45–55% black) only where text sits on the photo.
- **Orbs:** glossy circular badges for worldpass benefits and the list chip. Use them sparingly.
- **3D objects:** shield, safe and similar, only on onboarding and empty states.
- **Icons:** solid black glyphs at 18–20pt (plane, home, shield, bell). Draw outline glyphs at 1.8–2pt stroke inside round buttons. A single black icon centred above a title is a recurring motif.

---

## 9. Voice

- Speak to the traveller in short, confident sentences: "You're going.", "Pack your bags", "Taken once. Used for every visa after."
- Lead with dates and outcomes: "Visa on 30 Nov, 9:28 am", "All visas by 4 Dec".
- Name the promise plainly: "On time, or free".
- Explain problems with the fix in the same breath: "Bank statement is 4 months old" → **Fix**.
- Don't use exclamation marks, jargon ("biometric pending") or blame.

---

## 10. Accessibility

- Body text contrast ≥ 4.5:1. `muted` on white passes for 13pt and up; don't use it under 12pt.
- Make touch targets ≥ 44pt; small buttons get padding to reach this.
- Pair status colour with text (pill label) and an icon or dot; never use colour alone.
- Prism text must stay ≥ 22pt so the lightest stop stays readable.
- Use real labels on form fields; errors appear as text under the field.

---

## 11. Don'ts

- Don't put prism on more than one element per screen, or on small text.
- Don't use dark screens for flows; dark is for material cards and the events hero only.
- Don't put borders and shadows on cards sitting on white. Use `fill` instead.
- Don't use more than one primary button per screen, or an indigo button for anything except committing an application or payment.
- Don't use emoji in UI, generic illustrations or stock icons in colour.
