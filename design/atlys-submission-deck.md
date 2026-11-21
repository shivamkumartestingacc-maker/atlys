# Atlys submission deck: structure and content

Slide-by-slide plan for the submission deck. It follows the structure of the Navi case study (`navi case study/`) and uses the product framing from the master brief. Visual rules are in `atlys-deck.md`. Approved deck direction: **Deck A, Editorial white**.

Labels used throughout:
- **From brief**: given in the assignment.
- **Desk research**: from public material. Cite the source on the slide.
- **Assumption**: believed, not checked.
- **Hypothesis**: to be tested by the prototype or by users.
- **Placeholder**: needed for submission, but no real data exists yet. Do not fill with invented numbers.

---

## 1. What the Navi deck does, and what to copy

Navi's deck works because:

1. **Each slide makes one point.** The title says the point. The visual proves it.
2. **Real screens are the evidence.** Current product on one side, the redesign on the other. Red annotation boxes point at the exact problem.
3. **Numbers come first.** The funnel slide puts the drop-off numbers in large type and the target underneath.
4. **Structure is visible.** Short eyebrow labels ("Let's talk business", "01 · Current app") tell the reader where they are.
5. **Findings are short.** Each note is a heading and one or two lines.
6. **Problem to solution is a clear arc.** Problem statement, metrics, research, evaluation, journey, benchmarking, UI, iterations, edge cases, impact, testing.

Copy these. Do not copy Navi's content, numbers or screens.

---

## 2. Deck arc

| # | Slide | Navi equivalent | Purpose |
|---|---|---|---|
| 01 | Cover | Cover | Name and one-line promise |
| 02 | Product vision | About | What we're building and why it matters |
| 03 | The problem brief | Problem statement (brief) | Restate the assignment in one screen |
| 04 | Primary user | User research | Who we designed for, and why this user |
| 05 | Problem framing | Problem statement | Symptoms vs underlying problem; core insight |
| 06 | Problem statement and HMW | Problem statement | The sentence the rest of the deck answers |
| 07 | Jobs to be done | Metrics (funnel) | The one job the product is built around |
| 08 | Research and insights | User research | Evidence, with honest labels |
| 09 | Benchmarking | Benchmarking | How existing tools handle this |
| 10 | Product principles and pillars | Strategy | Three pillars, and the design rules |
| 11 | Core user journey | Journey mapping | The eight steps, conversation to commitment |
| 12 | When chat becomes a trip | Journey mapping (detail) | The consent moment |
| 13 | AI decision-support model | Strategy (detail) | Understand, structure, reconcile, recommend |
| 14 | How AI handles conflict | Heuristic evaluation | The five-friend example |
| 15 | Information architecture | Journey (structure) | Groups, chat and trip workspace in one model |
| 16 | Prototype scenario | UI variations | The December Getaway flow |
| 17 | Key screens | UI iterations | High-fidelity screens, before and after |
| 18 | Edge cases and AI behaviour | Edge cases | Missing budget, no consensus, and similar |
| 19 | Growth loop | Impact (framing) | The invitation loop, built into the product |
| 20 | Metrics | Metrics (funnel) | North Star and supporting metrics |
| 21 | Assumptions challenged | User testing insights | Five challenges and what we decided |
| 22 | Product decisions | Old vs new | The five decisions and the reasoning |
| 23 | Learnings and next steps | Impact and results | What's proven, what's not, what's next |

Keep it to 23 main slides. Put the detailed reasoning in an appendix, in the same style as the documentation mode of the case study site.

---

## 3. Slide-by-slide content

### 01 · Cover
- Title: **From Group Chat to Group Trip**
- Line: *Turning scattered travel conversations into plans everyone agrees on.*
- Pills: UX research · AI interaction · Prototype · Growth
- Visual: two screens from the prototype (Groups Home and Trip Workspace), in crop marks.

### 02 · Product vision
- Title: **Spend less time coordinating. Spend more time looking forward to the trip.**
- Vision (one sentence): *A collaborative travel-planning experience that helps groups turn scattered conversations into shared decisions and actionable trip plans.*
- Three pillars, shown as three columns:

| Pillar | Responsibility |
|---|---|
| Conversation | Bring friends together |
| Intelligence | Understand preferences and resolve uncertainty |
| Workspace | Turn decisions into an actionable plan |

- Callout: *The workspace is not a replacement for chat. It is the structured outcome of chat.*

### 03 · The problem brief
- Quote-style statement: *Planning a trip with friends sounds exciting. Getting everyone to agree on a destination, dates, budget and itinerary is a different story.*
- Three short lines: conversations are scattered; preferences conflict; decisions get delayed and trips often never happen.
- Outcome: *Turn vague travel ideas into concrete trip plans that groups are excited to take.*
- Source: **From brief**.

### 04 · Primary user
- Title: **The informal trip organiser**
- Profile card: *Young working professional, 23–30. Frequently initiates plans with friends.*
- Behaviour list (from the brief): initiates group trips, shares destinations and reels, coordinates dates and budgets, follows up on silent members, ends up doing most of the planning.
- Frustration quote: **"Everyone wants to go, but nobody wants to make the decisions."**
- Secondary users, shown as five small cards: budget-conscious, spontaneous, limited availability, comfort-oriented, passive. Label: *Behavioural archetypes, not separate personas.*
- Why the organiser: *They feel the coordination burden most. If we solve their problem, they have a reason to invite everyone else.*
- Label the persona as **Assumption** until tested.

### 05 · Problem framing
- Title: **People don't struggle to find destinations. They struggle to find one that works for everyone.**
- Table, symptoms to underlying problems:

| What users experience | Underlying problem |
|---|---|
| Endless messages | No structured decision-making |
| Different destinations | Preferences aren't understood collectively |
| Unclear budget | Financial constraints aren't visible |
| Nobody confirms dates | Availability isn't consolidated |
| Repeated discussions | Decisions aren't preserved |
| One person does everything | Planning responsibility is uneven |

- Core insight (large type): *Finding a destination is easy. Finding a destination, date and budget that work for everyone is not.*

### 06 · Problem statement and opportunity
- Use the Navi problem statement layout: chip box, vertical line, statement, HMW bar.
- Problem statement: *Group trip organisers need a way to consolidate their friends' preferences, constraints and decisions, because existing messaging tools support conversation but don't help groups progress towards a shared commitment.*
- HMW: *How might we turn unstructured group conversations into transparent, collaborative decisions without forcing friends into a rigid planning process?*

### 07 · Jobs to be done
- Title: **One primary job, three supporting groups**
- Primary JTBD (large): *When my friends and I start discussing a trip, I want to bring everyone's preferences and constraints together, so that we can agree on a realistic plan without endless coordination.*
- Table of supporting jobs:

| Type | Job |
|---|---|
| Functional | Understand everyone's budget and availability |
| Functional | Compare destinations against group preferences |
| Functional | Preserve decisions in one place |
| Emotional | Feel that the trip is actually going to happen |
| Social | Make everyone feel included in the decision |
| Emotional | Avoid becoming the person responsible for everything |

- Callout, **the hidden job**: *The organiser doesn't want AI to plan the whole trip. They want AI to stop them repeatedly asking people for information and chasing decisions.* This sentence should shape the interaction model on slides 12–13.

### 08 · Research and insights
- Title: **What we know, what we're guessing**
- Two columns: **Desk research** (cited, with source names and dates) and **Assumptions** (labelled).
- Do not present findings from interviews, surveys or user tests unless they were run. None are in this brief.
- Placeholder if the reviewer asks for research: *Planned: 5–8 organiser interviews, prototype walkthrough with 3 friend groups.* Mark it as planned, not done.

### 09 · Benchmarking
- Title: **Existing tools handle conversation or planning, not the decision between them**
- Compare: group messengers (conversation, no decisions), in-chat polls (votes, no constraints), shared itinerary apps (planning, usually assumes the decision is made), and Trip Room (the decision between them).
- Use short notes, not scores. Source every observation. The brief lists "competitor research" as a Day 1 task, so note which products were reviewed and when.
- Placeholder: **[Add the products you reviewed, with the date]**.

### 10 · Product principles
- Title: **Five rules the design follows**
- Principles, one line each:
  1. Start where the group already is: the chat.
  2. Separate constraints from preferences.
  3. Show trade-offs before asking for agreement.
  4. AI suggests. People decide.
  5. Nothing is final until everyone confirms.
- Show the three pillars from slide 02 as the frame.

### 11 · Core user journey
- Title: **From conversation to commitment**
- Eight steps as a horizontal or vertical journey, each with an outcome:

| Step | Moment | Outcome |
|---|---|---|
| 1 Discover | Understands the product | Product understood |
| 2 Create a group | "December Getaway", five invites | Group formed |
| 3 Start a conversation | Ideas, reels, first preferences | Travel intent emerges |
| 4 Create a workspace | Turned from chat, with consent | Shared planning space |
| 5 Collect preferences | Budget, dates, travel style | Individual constraints visible |
| 6 Explore possibilities | Shortlist for group compatibility | Two or three realistic options |
| 7 Resolve conflicts | Compare trade-offs, discuss, vote | Group-approved direction |
| 8 Create a trip plan | Editable itinerary | Progress towards an actual trip |

- Navi's journey slide shows the path. Use the same structure: one row per step, with a screen thumbnail.

### 12 · When chat becomes a trip
- Title: **The AI asks before it acts**
- Left: illustrative chat, with the Coorg / Goa message and the limited budget line.
- Right: the AI card, *"Looks like this group is starting to plan a December trip. Would you like me to create a shared trip workspace?"* with the two buttons: **Create trip workspace** and **Not now**.
- Note: *Conceptual prototype interaction. The consent step makes the AI feel helpful rather than intrusive.*
- Do not auto-create trips on any mention of a place. Say this explicitly.

### 13 · AI decision-support model
- Title: **Four stages. The group keeps the final say.**
- Four columns: **Understand** (read authorised trip messages, links and explicit preferences; extract intent, dates, destinations, budget, activities), **Structure** (turn information into an editable brief; separate confirmed details, suggestions and unknowns), **Reconcile** (find conflicts, gaps and compatible alternatives; explain trade-offs), **Recommend** (generate a shortlist; members approve).
- Footer: *The AI never optimises for majority satisfaction alone. A trip is a shared commitment, not a popularity contest.*

### 14 · How AI handles conflict
- Title: **Five friends, three different wants**
- Table of the five members:

| Member | Preference |
|---|---|
| A | Mountains |
| B | Beaches |
| C | Mountains, budget ₹6,000 |
| D | Beaches, budget ₹10,000 |
| E | Doesn't mind, budget ₹7,000 |

- What the AI sees: two mountains, two beaches, one flexible, budget ₹6,000–₹10,000.
- Three candidate options (shown as options, not recommendations): a mountain destination within the lower budget; a beach destination with a cost-conscious itinerary; a compromise destination.
- Footnote, required: *Candidate options. Travel cost, transport and availability must be checked before any option is presented as feasible.*
- Use this slide as the Navi-style heuristic slide. Two red annotations on the screen: "votes ≠ decision" and "budget range hidden".

### 15 · Information architecture
- Title: **One data model, two views**
- Three navigation blocks, from the brief: **Home** (groups, trips), **Group space** (chat, activity, members, AI assistant), **Trip workspace** (overview, itinerary, decisions, budget).
- Key message: *A destination shared in chat can be added to the workspace. A confirmed date in the workspace appears in the conversation.*
- Visual: a diagram with one shared data box between the two spaces.

### 16 · The prototype scenario
- Title: **The December Getaway**
- Setup card: five friends, Bengaluru, December, Coorg / Goa / Gokarna, budgets ₹6,000–₹10,000, mixed preferences.
- Seven numbered steps, matching the prototype:
  1. Organiser creates a group and invites friends.
  2. Friends exchange messages.
  3. AI extracts trip information.
  4. Members correct and confirm preferences.
  5. AI identifies conflicts and recommends alternatives.
  6. Members vote on destinations.
  7. The winning option becomes an editable trip plan.
- Endpoint: *Group-approved trip direction.*

### 17 · Key screens
- Title: **Four screens carry the story**
- Show the screens in the prototype that cover the brief's functional list: group creation, the AI trip brief, preferences with edit, destination comparison with fit, the vote, the trip workspace.
- Use the Navi "current vs new" pattern: a short before-state (a messy chat) beside the after-state (the structured workspace). Mark the before as an illustration.
- Note the prototype limits: mock AI responses, simulated share link, no live booking.

### 18 · Edge cases and AI behaviour
- Title: **What the AI does when things go wrong**
- Table from the brief:

| Situation | Expected behaviour |
|---|---|
| Missing budget | Ask the relevant members |
| Uncertain dates | Mark as tentative |
| Conflicting preferences | Explain the conflict |
| Poor recommendations | Allow refinement |
| Incorrect extraction | Allow editing |
| Minority disagreement | Preserve dissent |
| No group consensus | Show unresolved decisions |

- Callout: *Unresolved is an allowed state. The product does not force a winner.*

### 19 · Growth loop
- Title: **Participation is the growth engine**
- Loop: one person creates a group → invites friends → friends join to submit preferences → everyone takes part in the decision → another friend starts the next trip.
- Hypothesis (label it): *If each invited member's participation is needed to complete a shared decision, invitations become part of activation, not an optional referral.*
- Do not show referral banners. Say so.

### 20 · Metrics
- Title: **One number that matters most**
- North Star, large: **Group decision completion rate.** Percentage of created trip groups that confirm a destination and travel dates within seven days.
- Supporting metrics, from the brief:

| Funnel stage | Metric |
|---|---|
| Acquisition | Group invitation rate |
| Activation | Share of groups with 3+ active members |
| Engagement | Preference completion rate |
| Core value | Groups reaching a confirmed decision |
| Efficiency | Median time to group decision |
| Retention | Repeat trip creation rate |

- Label: **Hypothesis, to test.** Do not claim the design will raise any of these. Use "Target: TBD" with no number.

### 21 · Assumptions challenged
- Title: **Five assumptions, five challenges**
- Table from the brief:

| Assumption | Challenge |
|---|---|
| Friends want another group chat | Why would they leave WhatsApp? |
| AI should read every message | Would users consent to this? |
| Everyone will fill out preferences | What if 2 of 5 never respond? |
| Majority voting solves conflict | What if losing members withdraw? |
| AI can suggest the perfect destination | What evidence supports feasibility? |
| A generated itinerary means success | Has anyone actually agreed to travel? |

- Use this slide to show judgement. Each challenge should link to a product decision on slide 22.

### 22 · Product decisions
- Title: **Five decisions, with the reasoning**
- Decisions, from the brief:
  1. **Replace WhatsApp?** No. Invite by link. Don't require migration.
  2. **Proactive or reactive AI?** Hybrid. Detect intent, ask before creating a workspace.
  3. **What if people don't respond?** Show who has not answered. Let the organiser continue, and mark assumptions.
  4. **What if the group can't agree?** Don't force a winner. Show trade-offs and alternatives. Keep decisions open.
  5. **What is success?** A destination card is not success. Agreement on destination and dates is.

### 23 · Learnings and next steps
- Title: **What this proves, and what it doesn't yet**
- Two columns:
  - **Shown in the prototype:** the consent-based workspace, conflict surfacing, the vote, the editable plan.
  - **Not yet shown:** real user behaviour, real AI accuracy, real travel feasibility, willingness to switch from existing messengers.
- Next steps: test the decision model with real groups; check AI extraction accuracy on real chat exports (with consent); measure time to agreement; validate the consent prompt; test the invite loop with a live link.

---

## 4. Appendix (documentation mode)

Keep the main deck short. Put the reasoning here, one page each:

- **A1. How the brief was broken down**: from the ambiguous brief to the two problem signals.
- **A2. Research approach and evidence**: what was checked, what was not.
- **A3. Framing iterations**: the versions of the problem statement and why each changed.
- **A4. AI interaction alternatives**: bot member, silent summariser, auto-planner, facilitator, and why the facilitator won.
- **A5. Conflict-resolution approaches**: majority vote, averaging, ranked choice, constraints first, consent vote, minority preservation.
- **A6. Alternative UI explorations**: the vote-bar, fit-matrix and fit-ring options.
- **A7. Metric definitions**: exact formulas, time windows, and why each metric was picked.

---

## 5. Content gaps to fill before submission

| Gap | What to do |
|---|---|
| Competitor research | List the products reviewed, with dates. Keep notes to observations. |
| User research | None in the brief. Say so, and label the persona as an assumption. |
| Real AI behaviour | The prototype uses mock responses. Say so on slide 16 and 23. |
| Destination feasibility | Candidate options need a source for cost and availability before they are presented as real. |
| Metric targets | Leave as TBD. Do not invent baselines. |
| Visual consistency | The case study site uses Krabi, Vietnam and Bali with a ₹55k–₹60k budget. The brief uses Coorg, Goa, Gokarna and ₹6k–₹10k. Pick one set and update the site. |

---

## 6. Writing rules for this deck

- One idea per slide. Title states it.
- Numbers in large type. Source underneath.
- Labels on every claim: **From brief**, **Desk research**, **Assumption**, **Hypothesis**, **Placeholder**.
- No invented statistics, quotes, interviews or results.
- Short notes: a heading and one or two lines.
- Use the design rules in `atlys-deck.md`: one prism phrase per slide, grey fills for notes, dashed crop marks around hero phones.
