# PetLoop Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy the approved PetLoop independent case-study website plus an interactive `/demo` product experience on GitHub Pages.

**Architecture:** React + TypeScript + Vite single-page app with browser routing, shared brand/design tokens, structured local project/demo data, modular case-study sections, and an interactive concept-demo state machine. GitHub Pages project-site routing is handled with a SPA fallback so `/PetLoop-Project/demo` can be opened and refreshed directly.

**Tech Stack:** React, TypeScript, Vite, React Router, Vitest, Testing Library, CSS, GitHub Actions, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-01-petloop-website-design.md`

## Global Constraints

- Repository: `chloemmmmm/PetLoop-Project`
- Base path: `/PetLoop-Project/`
- Primary routes: `/` and `/demo`
- Chinese is the main narrative language; English is used for headings, product terminology, labels, and visual rhythm.
- Visual direction: Editorial Product Design × Soft Pet Tech.
- Core palette: Forest `#42543A`, Soft Sage `#DDE6D3`, Mist Green `#EEF2E9`, Warm Ivory `#F7F5EE`, Charcoal `#20241F`, Soft Grey `#777C74`.
- Demo uses simulated local data only and must visibly disclose `Simulated Data · Concept Demo`.
- Do not fabricate model accuracy, validation counts, medical claims, live hardware integration, or unsupported metrics.
- Desktop `>=1200px`, Tablet `768–1199px`, Mobile `<768px`.
- Support keyboard navigation, visible focus, semantic controls, alt text, readable contrast, and `prefers-reduced-motion`.
- Use TDD for behavior-bearing components and routes; run tests before implementation commits.
- Each task ends in an independently testable state and should be committed separately.

---

## File Map

### App foundation

- `package.json` — scripts and dependencies.
- `vite.config.ts` — Vite base path and test configuration.
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` — TypeScript configuration.
- `index.html` — app entry and GitHub Pages SPA path-restoration script.
- `public/404.html` — GitHub Pages redirect for direct route refreshes.
- `src/main.tsx` — React bootstrap.
- `src/app/App.tsx` — router composition only.
- `src/app/routes.tsx` — route table for Case Study and Demo.

### Shared visual system

- `src/styles/tokens.css` — brand, spacing, type, radius, shadow, motion tokens.
- `src/styles/global.css` — reset, body, layout helpers, accessibility, reduced motion.
- `src/components/SiteHeader.tsx` — persistent case-study navigation.
- `src/components/SectionHeading.tsx` — editorial section heading pattern.
- `src/components/MediaFrame.tsx` — consistent image/media frame.

### Case study

- `src/data/project.ts` — approved copy and structured project content.
- `src/pages/CaseStudyPage.tsx` — section composition only.
- `src/sections/HeroSection.tsx`
- `src/sections/OverviewSection.tsx`
- `src/sections/ResearchSection.tsx`
- `src/sections/PersonaSection.tsx`
- `src/sections/SystemLoopSection.tsx`
- `src/sections/WearableSection.tsx`
- `src/sections/RobotSection.tsx`
- `src/sections/ProductExperienceSection.tsx`
- `src/sections/PrototypeSection.tsx`
- `src/sections/ReflectionSection.tsx`

### Demo

- `src/data/demo.ts` — simulated Momo data and ranges.
- `src/demo/types.ts` — demo domain types.
- `src/demo/demoState.ts` — pure reducer/state machine for selected range, event, metric, robot action, and timeline append.
- `src/pages/DemoPage.tsx` — demo layout and state wiring.
- `src/demo/DemoNav.tsx`
- `src/demo/DashboardView.tsx`
- `src/demo/PetProfileView.tsx`
- `src/demo/EmotionView.tsx`
- `src/demo/RobotView.tsx`
- `src/demo/MetricCard.tsx`
- `src/demo/TrendChart.tsx`
- `src/demo/BehaviorTimeline.tsx`
- `src/demo/EvidencePanel.tsx`
- `src/demo/RobotActionPanel.tsx`

### Tests

- `src/app/App.test.tsx`
- `src/demo/demoState.test.ts`
- `src/pages/CaseStudyPage.test.tsx`
- `src/pages/DemoPage.test.tsx`
- `src/demo/RobotActionPanel.test.tsx`

### Assets and deployment

- `public/assets/brand/`
- `public/assets/research/`
- `public/assets/wearable/`
- `public/assets/robot/`
- `public/assets/ui/`
- `.github/workflows/deploy-pages.yml`
- `README.md`

---

### Task 1: Scaffold the Vite/React app, routing, tests, and GitHub Pages base path

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `public/404.html`
- Create: `src/main.tsx`
- Create: `src/app/App.tsx`
- Create: `src/app/routes.tsx`
- Create: `src/app/App.test.tsx`

**Interfaces:**
- Produces: `App(): JSX.Element`
- Produces routes: case study path `/`, demo path `/demo`
- Produces project base path `/PetLoop-Project/`

- [ ] **Step 1: Write the failing router test**

```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from './routes'

it('renders the case study route', () => {
  render(<MemoryRouter initialEntries={['/']}><AppRoutes /></MemoryRouter>)
  expect(screen.getByRole('heading', { name: /petloop/i })).toBeInTheDocument()
})

it('renders the demo route', () => {
  render(<MemoryRouter initialEntries={['/demo']}><AppRoutes /></MemoryRouter>)
  expect(screen.getByText(/simulated data/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test -- --run src/app/App.test.tsx`

Expected: FAIL because routing/pages do not yet exist.

- [ ] **Step 3: Add the minimal Vite/React scaffold and route placeholders**

Use React Router `BrowserRouter` in `App.tsx`; keep actual route elements in `routes.tsx`.

```tsx
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1>PetLoop</h1>} />
      <Route path="/demo" element={<main><p>Simulated Data · Concept Demo</p></main>} />
    </Routes>
  )
}
```

Set Vite base:

```ts
export default defineConfig({
  base: '/PetLoop-Project/',
  plugins: [react()],
  test: { environment: 'jsdom', setupFiles: './src/test/setup.ts' },
})
```

- [ ] **Step 4: Add GitHub Pages SPA fallback**

`public/404.html` must redirect unknown paths back to the project root while encoding the requested path in a query parameter. `index.html` must restore that encoded path with `history.replaceState` before React mounts. Verify this preserves `/PetLoop-Project/demo` in the address bar after load.

- [ ] **Step 5: Run tests and production build**

Run:

```bash
npm test -- --run src/app/App.test.tsx
npm run build
```

Expected: PASS and `dist/` generated with asset URLs under `/PetLoop-Project/`.

- [ ] **Step 6: Commit**

```bash
git add package.json vite.config.ts tsconfig*.json index.html public/404.html src

git commit -m "chore: scaffold PetLoop React app"
```

---

### Task 2: Implement shared design tokens, global layout, and site navigation

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/components/SiteHeader.tsx`
- Create: `src/components/SectionHeading.tsx`
- Create: `src/components/MediaFrame.tsx`
- Modify: `src/main.tsx`
- Test: `src/pages/CaseStudyPage.test.tsx`

**Interfaces:**
- `SiteHeader({ onNavigate? }: { onNavigate?: (id: string) => void })`
- `SectionHeading({ eyebrow, title, subtitle? })`
- `MediaFrame({ src, alt, caption?, priority? })`

- [ ] **Step 1: Write the failing navigation/accessibility test**

```tsx
it('exposes semantic case-study navigation and demo CTA', () => {
  render(<CaseStudyPage />)
  expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /open demo/i })).toHaveAttribute('href', expect.stringContaining('/demo'))
})
```

- [ ] **Step 2: Run the test and confirm failure**

Run: `npm test -- --run src/pages/CaseStudyPage.test.tsx`

Expected: FAIL because shared layout does not exist.

- [ ] **Step 3: Implement tokens**

Define exact color tokens from the approved spec plus spacing, radii, type scale, container width, focus ring, and motion durations. Use `clamp()` for display sizing and never scatter approved brand hex values through components.

- [ ] **Step 4: Implement global styles and header**

Add warm ivory body background, charcoal text, 12-column desktop grid helper, mobile single-column behavior, skip-link support, visible `:focus-visible`, and reduced-motion override.

- [ ] **Step 5: Run test and build**

Run:

```bash
npm test -- --run src/pages/CaseStudyPage.test.tsx
npm run build
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/styles src/components src/main.tsx src/pages/CaseStudyPage.test.tsx

git commit -m "feat: add PetLoop design system foundation"
```

---

### Task 3: Prepare source-faithful content data and optimized project assets

**Files:**
- Create: `src/data/project.ts`
- Create/Populate: `public/assets/brand/`
- Create/Populate: `public/assets/research/`
- Create/Populate: `public/assets/wearable/`
- Create/Populate: `public/assets/robot/`
- Create/Populate: `public/assets/ui/`
- Create: `docs/asset-manifest.md`

**Interfaces:**
- Produces `projectContent` with section ids, bilingual labels, body copy, media refs, alt text, and source-note metadata.

- [ ] **Step 1: Build an asset manifest before page composition**

For each selected source image, record:

```md
| asset | section | source material | edit | alt text |
| --- | --- | --- | --- | --- |
| hero-pet.webp | Hero | PetLoop source presentation | crop/resize | Cat resting beside PetLoop concept context |
```

Only include project-supported material. Do not create unsupported result claims.

- [ ] **Step 2: Export web assets**

Crop/recompose source visuals where practical; avoid using entire presentation pages except when an information graphic cannot be meaningfully separated. Export display-sized WebP/PNG assets and preserve legibility.

- [ ] **Step 3: Implement `projectContent`**

Use structured objects rather than prose hard-coded across components. Include the approved narrative: Invisible → Hard to interpret → Hard to respond; system loop; wearable; robot; GUI transition; reflection.

- [ ] **Step 4: Verify source fidelity manually**

Check every claim against the approved source materials/spec. Remove or relabel any unsupported numerical claim.

- [ ] **Step 5: Build**

Run: `npm run build`

Expected: PASS and all asset paths resolve under the project base.

- [ ] **Step 6: Commit**

```bash
git add src/data/project.ts public/assets docs/asset-manifest.md

git commit -m "content: add PetLoop case study assets and copy"
```

---

### Task 4: Build the Case Study narrative from Hero through Research and Persona

**Files:**
- Create: `src/pages/CaseStudyPage.tsx`
- Create: `src/sections/HeroSection.tsx`
- Create: `src/sections/OverviewSection.tsx`
- Create: `src/sections/ResearchSection.tsx`
- Create: `src/sections/PersonaSection.tsx`
- Modify: `src/app/routes.tsx`
- Modify: `src/pages/CaseStudyPage.test.tsx`

**Interfaces:**
- Each section exports one React component and owns only its section layout.
- Section ids: `overview`, `research`, `system`, `product`, `prototype` must match header navigation anchors.

- [ ] **Step 1: Write failing content-order test**

```tsx
it('renders the approved early narrative in order', () => {
  render(<CaseStudyPage />)
  expect(screen.getByText(/human–pet emotional loop/i)).toBeInTheDocument()
  expect(screen.getByText(/why petloop/i)).toBeInTheDocument()
  expect(screen.getByText(/research/i)).toBeInTheDocument()
  expect(screen.getByText(/luna/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run and confirm failure**

Run: `npm test -- --run src/pages/CaseStudyPage.test.tsx`

- [ ] **Step 3: Implement Hero and Overview**

Hero content must include PetLoop identity, Chinese subtitle, `Pet Wearable × Desktop Robot × Emotional Computing`, `Explore Project ↓`, and `Open Interactive Demo ↗`. Hero imagery favors pet/physical product rather than dashboard UI.

- [ ] **Step 4: Implement Research and Persona**

Use editorial layouts, concise insight statements, project-supported visual evidence, and the existing Luna persona. Keep dense data secondary to decision-driving insights.

- [ ] **Step 5: Verify responsive behavior at 1440px, 1024px, and 390px**

Expected: no horizontal scroll; headings and media remain readable; mobile is intentionally stacked.

- [ ] **Step 6: Run tests/build and commit**

```bash
npm test -- --run src/pages/CaseStudyPage.test.tsx
npm run build
git add src/pages src/sections src/app/routes.tsx
git commit -m "feat: build PetLoop case study research narrative"
```

---

### Task 5: Build System Loop, Wearable, Robot, Product Experience, Prototype, and Reflection

**Files:**
- Create: `src/sections/SystemLoopSection.tsx`
- Create: `src/sections/WearableSection.tsx`
- Create: `src/sections/RobotSection.tsx`
- Create: `src/sections/ProductExperienceSection.tsx`
- Create: `src/sections/PrototypeSection.tsx`
- Create: `src/sections/ReflectionSection.tsx`
- Modify: `src/pages/CaseStudyPage.tsx`
- Modify: `src/pages/CaseStudyPage.test.tsx`

**Interfaces:**
- `SystemLoopSection` renders sequence: Pet → Wearable → Data / Interpretation → PetLoop Console → Owner → Desktop Robot → Pet.
- `ProductExperienceSection` provides a real link to `/demo`.

- [ ] **Step 1: Write failing system-loop and demo-link tests**

```tsx
it('shows the complete PetLoop feedback loop and demo entry', () => {
  render(<CaseStudyPage />)
  for (const label of ['Pet', 'Wearable', 'PetLoop Console', 'Owner', 'Desktop Robot']) {
    expect(screen.getByText(label)).toBeInTheDocument()
  }
  expect(screen.getByRole('link', { name: /launch interactive demo/i })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run and confirm failure**

Run: `npm test -- --run src/pages/CaseStudyPage.test.tsx`

- [ ] **Step 3: Implement System Loop**

Desktop: horizontal/loop composition with progressive visual emphasis. Mobile: readable vertical flow. Any scroll-based highlighting must preserve the same readable information without JavaScript animation.

- [ ] **Step 4: Implement Wearable and Robot storytelling**

Use larger media, fewer cards, clear design decisions, and process imagery. Wearable focuses on wearability/sensors/prototype; Robot focuses on structure/assembly/evolution/interaction intent.

- [ ] **Step 5: Implement GUI transition and remaining sections**

Use the approved visual pivot `DATA BECOMES EXPERIENCE.` before GUI. Product Experience shows existing Console/multi-device direction and launches `/demo`. Prototype and Reflection close the case study without inventing evaluation results.

- [ ] **Step 6: Add restrained motion**

Use CSS transitions/IntersectionObserver only where it improves hierarchy. Confirm `prefers-reduced-motion: reduce` disables nonessential movement.

- [ ] **Step 7: Run tests/build and commit**

```bash
npm test -- --run src/pages/CaseStudyPage.test.tsx
npm run build
git add src/sections src/pages/CaseStudyPage.tsx src/pages/CaseStudyPage.test.tsx
git commit -m "feat: complete PetLoop case study experience"
```

---

### Task 6: Define the demo domain model, simulated data, and reducer/state machine

**Files:**
- Create: `src/demo/types.ts`
- Create: `src/data/demo.ts`
- Create: `src/demo/demoState.ts`
- Create: `src/demo/demoState.test.ts`

**Interfaces:**

```ts
type TimeRange = 'today' | '7d' | '30d'
type DemoView = 'overview' | 'pet' | 'emotion' | 'robot'
type RobotMode = 'companion' | 'comfort' | 'call' | 'play'
type RobotPhase = 'idle' | 'selected' | 'connecting' | 'active' | 'complete'

type DemoState = {
  view: DemoView
  range: TimeRange
  selectedMetric: string | null
  selectedEventId: string | null
  selectedRobotMode: RobotMode | null
  robotPhase: RobotPhase
  timeline: TimelineEvent[]
}
```

Reducer actions must include `setView`, `setRange`, `selectMetric`, `selectEvent`, `selectRobotMode`, `advanceRobotPhase`, `completeInteraction`, `resetRobot`.

- [ ] **Step 1: Write failing reducer tests**

```ts
it('changes time range', () => {
  expect(demoReducer(initialDemoState, { type: 'setRange', range: '7d' }).range).toBe('7d')
})

it('appends a completed robot interaction to the timeline', () => {
  const state = { ...initialDemoState, selectedRobotMode: 'comfort', robotPhase: 'active' as const }
  const next = demoReducer(state, { type: 'completeInteraction', at: '16:05' })
  expect(next.robotPhase).toBe('complete')
  expect(next.timeline.at(-1)?.kind).toBe('interaction')
})
```

- [ ] **Step 2: Run and confirm failure**

Run: `npm test -- --run src/demo/demoState.test.ts`

- [ ] **Step 3: Add strongly typed simulated data**

Provide Momo identity, Today/7d/30d summaries, trend arrays, metric labels, evidence records, initial timeline, and robot online state. Keep all illustrative values in this module.

- [ ] **Step 4: Implement pure reducer**

No timers, DOM, or React imports in `demoState.ts`. Keep transitions deterministic and independently testable.

- [ ] **Step 5: Run tests and commit**

```bash
npm test -- --run src/demo/demoState.test.ts
git add src/demo/types.ts src/data/demo.ts src/demo/demoState.ts src/demo/demoState.test.ts
git commit -m "feat: add PetLoop demo state model"
```

---

### Task 7: Build Demo shell, navigation, dashboard, pet profile, and evidence flow

**Files:**
- Create: `src/pages/DemoPage.tsx`
- Create: `src/demo/DemoNav.tsx`
- Create: `src/demo/DashboardView.tsx`
- Create: `src/demo/PetProfileView.tsx`
- Create: `src/demo/EmotionView.tsx`
- Create: `src/demo/MetricCard.tsx`
- Create: `src/demo/TrendChart.tsx`
- Create: `src/demo/BehaviorTimeline.tsx`
- Create: `src/demo/EvidencePanel.tsx`
- Create: `src/pages/DemoPage.test.tsx`
- Modify: `src/app/routes.tsx`

**Interfaces:**
- `DemoPage` owns `useReducer(demoReducer, initialDemoState)` and passes state/actions downward.
- `TrendChart` consumes arrays from `demo.ts`; it must not invent values internally.
- `BehaviorTimeline` exposes selected event id and semantic buttons.

- [ ] **Step 1: Write failing page interaction tests**

```tsx
it('switches time range and exposes evidence for a timeline event', async () => {
  const user = userEvent.setup()
  render(<MemoryRouter initialEntries={['/demo']}><DemoPage /></MemoryRouter>)

  await user.click(screen.getByRole('button', { name: /7 days/i }))
  expect(screen.getByText(/7-day overview/i)).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /vocalization detected/i }))
  expect(screen.getByRole('region', { name: /evidence/i })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run and confirm failure**

Run: `npm test -- --run src/pages/DemoPage.test.tsx`

- [ ] **Step 3: Build desktop demo shell and disclosure**

Include `← Back to Case Study`, PetLoop identity, semantic navigation, Momo profile, and visible `Simulated Data · Concept Demo` disclosure.

- [ ] **Step 4: Implement time-range and metric interactions**

Today/7d/30d must change visible summaries/trend data. Metric cards must expose selected state and navigate or reveal the relevant evidence context.

- [ ] **Step 5: Implement timeline and evidence panel**

Selecting an event reveals audio/motion/duration/interpretation evidence. Language must remain behavior/emotion interpretation, not diagnosis.

- [ ] **Step 6: Implement mobile adaptation**

Below 768px, replace sidebar with bottom navigation; use stacked touch targets at least 44px high.

- [ ] **Step 7: Run tests/build and commit**

```bash
npm test -- --run src/pages/DemoPage.test.tsx
npm run build
git add src/pages/DemoPage.tsx src/demo src/app/routes.tsx
git commit -m "feat: build PetLoop interactive dashboard flow"
```

---

### Task 8: Implement Robot / Emotion interaction and timeline completion

**Files:**
- Create: `src/demo/RobotView.tsx`
- Create: `src/demo/RobotActionPanel.tsx`
- Create: `src/demo/RobotActionPanel.test.tsx`
- Modify: `src/pages/DemoPage.tsx`
- Modify: `src/pages/DemoPage.test.tsx`

**Interfaces:**
- `RobotActionPanel` props:

```ts
type Props = {
  mode: RobotMode | null
  phase: RobotPhase
  onSelectMode: (mode: RobotMode) => void
  onSend: () => void
  onReset: () => void
}
```

- [ ] **Step 1: Write failing robot-flow test**

```tsx
it('runs Comfort through the robot states and records the interaction', async () => {
  const user = userEvent.setup()
  render(<MemoryRouter initialEntries={['/demo']}><DemoPage /></MemoryRouter>)

  await user.click(screen.getByRole('button', { name: /robot/i }))
  await user.click(screen.getByRole('button', { name: /comfort/i }))
  await user.click(screen.getByRole('button', { name: /send comfort/i }))

  expect(await screen.findByText(/connecting/i)).toBeInTheDocument()
  expect(await screen.findByText(/comfort mode activated/i)).toBeInTheDocument()
  expect(await screen.findByText(/interaction recorded/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run and confirm failure**

Run: `npm test -- --run src/demo/RobotActionPanel.test.tsx src/pages/DemoPage.test.tsx`

- [ ] **Step 3: Implement all four response modes**

Modes: Companion, Comfort, Call, Play. The selected label controls copy and recorded timeline entry.

- [ ] **Step 4: Implement phase progression**

Use UI timers in the page/controller layer only:

`idle → selected → connecting → active → complete`

Do not hide core state behind animation. Each phase must have visible text and accessible status messaging (`aria-live="polite"`).

- [ ] **Step 5: Append completed interaction**

Dispatch `completeInteraction` once per successful sequence. Confirm the new entry is visible when returning to timeline/history.

- [ ] **Step 6: Run tests/build and commit**

```bash
npm test -- --run src/demo/RobotActionPanel.test.tsx src/pages/DemoPage.test.tsx
npm run build
git add src/demo/RobotView.tsx src/demo/RobotActionPanel* src/pages/DemoPage*
git commit -m "feat: add PetLoop robot interaction flow"
```

---

### Task 9: Finish responsive behavior, motion, accessibility, and visual polish

**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/global.css`
- Modify: section/demo component styles as needed
- Modify: tests where accessibility behavior is testable

**Interfaces:**
- No new domain interfaces; this task hardens presentation and access.

- [ ] **Step 1: Add/verify focus and keyboard behavior**

Tab through header links, range controls, timeline events, robot actions, and return link. Ensure selected states are not color-only.

- [ ] **Step 2: Add reduced-motion behavior**

Under `@media (prefers-reduced-motion: reduce)`, disable scroll reveal movement, loop animation movement, and robot decorative transitions while preserving immediate state changes.

- [ ] **Step 3: Check layouts at target widths**

Manual viewports: 1440×900, 1024×768, 390×844. Confirm no clipped system diagram, no horizontal scroll, readable GUI mockups, and usable mobile bottom nav.

- [ ] **Step 4: Check image loading**

Hero image loads eagerly/high priority; non-critical project imagery uses lazy loading. Confirm media dimensions reserve layout space to reduce shifts.

- [ ] **Step 5: Run full test suite and build**

Run:

```bash
npm test -- --run
npm run build
```

Expected: all tests PASS; build succeeds.

- [ ] **Step 6: Commit**

```bash
git add src

git commit -m "fix: polish responsive and accessible PetLoop UI"
```

---

### Task 10: Add GitHub Pages deployment workflow and verify routing in the built artifact

**Files:**
- Create: `.github/workflows/deploy-pages.yml`
- Modify: `README.md`

**Interfaces:**
- Deployment artifact: `dist/`
- Production URL: `https://chloemmmmm.github.io/PetLoop-Project/`
- Demo URL: `https://chloemmmmm.github.io/PetLoop-Project/demo`

- [ ] **Step 1: Add deployment workflow**

Workflow requirements:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

Build job must run install, tests, and build before `actions/upload-pages-artifact`. Deploy job uses `actions/deploy-pages` and environment `github-pages`.

- [ ] **Step 2: Validate workflow syntax and local build assumptions**

Run locally:

```bash
npm ci
npm test -- --run
npm run build
```

Expected: PASS.

- [ ] **Step 3: Inspect generated paths**

Confirm `dist/index.html` references assets under `/PetLoop-Project/assets/...` and `dist/404.html` exists.

- [ ] **Step 4: Update README**

Document project purpose, local commands, simulation disclosure, source-fidelity rule, and production URLs.

- [ ] **Step 5: Commit and push**

```bash
git add .github/workflows/deploy-pages.yml README.md

git commit -m "ci: deploy PetLoop to GitHub Pages"
git push origin main
```

---

### Task 11: Production verification and completion gate

**Files:**
- Modify only if verification exposes defects.

**Interfaces:**
- Production case study `/PetLoop-Project/`
- Production demo `/PetLoop-Project/demo`

- [ ] **Step 1: Verify GitHub Actions**

Confirm the deployment workflow completes successfully. If it fails, inspect the failing job and fix the root cause before continuing.

- [ ] **Step 2: Verify production case study**

Check Hero, navigation anchors, Research, System Loop, Wearable, Robot, Product Experience, Prototype, Reflection, and Demo CTA on desktop and mobile.

- [ ] **Step 3: Verify direct demo load and refresh**

Open the production `/demo` URL directly in a fresh tab, refresh it, and confirm the demo renders without a GitHub Pages 404.

- [ ] **Step 4: Verify complete demo journey**

Manually exercise:

```text
Dashboard
→ switch Today / 7 Days / 30 Days
→ select a metric
→ select a timeline event
→ inspect Evidence
→ open Robot
→ select Comfort
→ Send Comfort
→ observe Connecting / Active / Complete
→ confirm timeline record
→ Back to Case Study
```

Repeat one non-Comfort action to confirm mode-specific copy is wired correctly.

- [ ] **Step 5: Run final automated verification against the release commit**

Run:

```bash
npm test -- --run
npm run build
```

Expected: all PASS.

- [ ] **Step 6: Only then mark V1 complete**

Completion requires evidence of passing tests, successful build, successful GitHub Pages deployment, and manual verification of the public URLs. Do not claim completion from a green build alone.

---

## Self-Review

### Spec coverage

- Project positioning and bilingual narrative: Tasks 3–5.
- Editorial Product Design × Soft Pet Tech visual system: Tasks 2, 4, 5, 9.
- Full Case Study architecture: Tasks 4–5.
- Animated/readable system loop: Task 5 and reduced-motion hardening in Task 9.
- Wearable and robot physical-product storytelling: Task 5.
- GUI transition and product experience: Task 5.
- `/demo` screens and interactions: Tasks 6–8.
- Today / 7d / 30d switching: Tasks 6–7.
- Metric drill-down, timeline, evidence: Task 7.
- Four robot actions and state progression: Task 8.
- Timeline append after completion: Tasks 6 and 8.
- Simulated-data disclosure and no unsupported claims: Tasks 3, 6, 7.
- Responsive desktop/tablet/mobile behavior: Tasks 2, 4, 5, 7, 9.
- Accessibility and reduced motion: Tasks 2 and 9.
- GitHub Pages base path and direct `/demo` refresh: Tasks 1, 10, 11.
- Automated test/build/deploy quality gate: Tasks 1–11.

### Placeholder scan

No `TBD`, `TODO`, “implement later”, or unbounded “add error handling” steps remain. Asset preparation is explicitly constrained by `docs/asset-manifest.md` and the source-fidelity rule.

### Type consistency

`TimeRange`, `DemoView`, `RobotMode`, `RobotPhase`, `DemoState`, reducer action names, and `RobotActionPanel` props are defined once in Task 6/8 and reused consistently in later tasks.
