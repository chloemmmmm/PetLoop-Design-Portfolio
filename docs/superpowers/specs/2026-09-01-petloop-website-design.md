# PetLoop Independent Website — Design Specification

**Status:** Approved (Sections 01–05)
**Date:** 2026-09-01
**Repository:** `chloemmmmm/PetLoop-Project`

## 1. Project Positioning

PetLoop is an independent portfolio case-study website for a connected pet experience system combining a pet wearable device, behavioral/emotional interpretation, a desktop robot, and a product interface.

The website must present PetLoop as a coherent system rather than a single object, dashboard, or course presentation. The primary portfolio narrative is:

**Research → System Thinking → Industrial Design → Physical Prototype → GUI / UX → Interactive Prototype → Design-to-Code**

Primary audience: design recruiters and hiring teams. Chinese is the main narrative language; English is used for headings, product terminology, labels, and visual rhythm.

## 2. Site Architecture

The website contains two primary experiences:

- `/` — PetLoop Case Study
- `/demo` — Interactive PetLoop Console concept demo

### Case Study sections

1. Hero
2. Project Overview
3. Why PetLoop
4. Research & Insights
5. User & Pet Persona
6. Opportunity
7. PetLoop System
8. Data & Emotion Pipeline
9. Wearable Device
10. Desktop Robot
11. Product Experience
12. Prototype & Making
13. Final Experience
14. Reflection

Persistent navigation should remain restrained: PetLoop wordmark, Overview, Research, System, Product, Prototype, and `Open Demo ↗`.

### Case Study purpose

The case study should communicate why the project exists, how research informed decisions, how the hardware and data system work together, how physical prototypes were built, and how the system becomes a usable digital experience.

It must not reproduce presentation slides as a slide gallery. Existing project assets should be extracted, cropped, and recomposed into a web-native editorial narrative wherever practical.

## 3. Core Narrative

The primary problem statement is that pets continuously express behavioral and physical states, while owners lack a reliable, continuous, and understandable feedback channel.

The narrative should emphasize three design problems:

- **Invisible:** changes in behavior and condition can be difficult to notice continuously.
- **Hard to interpret:** owners may struggle to understand what behavior or vocalization means.
- **Hard to respond:** even after a change is noticed, timely interaction may still be difficult.

The central system proposition is an emotional feedback loop:

**Pet → Wearable → Data / Interpretation → PetLoop Console → Owner → Desktop Robot → Pet**

PetLoop should be presented as this connected loop, not merely as a wearable or robot.

## 4. Visual Direction

### Art direction

**Editorial Product Design × Soft Pet Tech**

The site should feel like a mature product/industrial-design case study rather than a student course report or generic green SaaS template.

### Color system

- PetLoop Forest: `#42543A`
- Soft Sage: `#DDE6D3`
- Mist Green: `#EEF2E9`
- Warm Ivory: `#F7F5EE`
- Charcoal: `#20241F`
- Soft Grey: `#777C74`

Warm Ivory is the dominant page background. Forest green is reserved for identity, calls to action, system emphasis, and selected UI states. Photography and physical materials provide warmth and life.

### Typography

Chinese is used for explanatory copy. English is used strongly for display headings, section labels, product naming, and UI terminology.

Representative hierarchy:

```text
04 / SYSTEM
BUILDING THE
EMOTIONAL LOOP
从“感知宠物”到“回应宠物”
```

### Layout

Desktop uses a 12-column editorial grid with varied compositions rather than a single centered content column. Research sections may be denser; industrial-design sections should become more image-led and spacious. Mobile collapses to a deliberate single-column narrative.

### Photography and existing assets

Use project-source photography, sketches, research imagery, wearable prototypes, pet-wearing photos, robot build photographs, and existing UI references. Do not simply embed full PDF pages where individual assets can be recomposed.

## 5. Motion and Interaction Style

Animation must be restrained and supportive rather than decorative.

Approved interaction patterns:

- Scroll reveal for text and imagery
- Animated system-loop progression
- Sticky product-story sections where useful
- Small state transitions and micro-interactions
- `prefers-reduced-motion` support

Avoid heavy 3D/WebGL unless a later requirement specifically justifies it.

## 6. Hero Direction

The hero should establish PetLoop as a pet + physical product + emotional interaction project before showing dashboard UI.

Primary content:

```text
PETLOOP
人宠情感闭环系统
HUMAN–PET EMOTIONAL LOOP
Pet Wearable × Desktop Robot × Emotional Computing
```

Primary actions:

- `Explore Project ↓`
- `Open Interactive Demo ↗`

The first screen should favor strong pet/product imagery. GUI should appear later as the result of the physical/data system.

## 7. Hardware Storytelling

### Wearable Device

The section should communicate form exploration, wearability, sensors, data collection, CMF/material decisions, prototypes, and pet-wearing validation. Presentation should use large product imagery, details, and focused design decisions rather than dashboard cards.

### Desktop Robot

The robot is framed as a tangible pet-presence proxy that turns interpreted state into an owner-triggered response. The narrative should cover structure, assembly, prototype evolution, and interaction intent.

## 8. GUI Transition

The transition from physical product to interface should be intentional. A visual pivot such as:

**DATA BECOMES EXPERIENCE.**

should introduce the PetLoop Console.

The product interface should visually inherit the existing PetLoop GUI direction: cream/ivory base, forest green identity, soft sage states, rounded controls, pet photography, compact data visualization, and responsive multi-device patterns.

## 9. Interactive Demo

`/demo` is a real front-end interaction prototype using simulated local data. It is not a static screenshot gallery and must not pretend to be connected to real hardware or live pet data.

### Core screens

1. Dashboard / Today Overview
2. Pet Profile / Evidence & Trends
3. Robot / Emotion Interaction

### Core user journey

**Discover state → inspect evidence → understand change → choose response → robot action → interaction recorded**

### Required interactions

- Navigation among Overview / My Pet / Emotion / Robot
- Time-range switching: Today / 7 Days / 30 Days
- Metric-card drill-down
- Behavior Timeline event selection
- Evidence panel for selected events
- Four response modes: Companion / Comfort / Call / Play
- Robot state progression: Idle → Selected → Connecting → Active → Complete
- Completed interaction appended to timeline
- `← Back to Case Study` navigation

V1 fully supports one pet profile, Momo. UI may include a pet selector, but it must not imply multiple complete profiles if they are not implemented.

### Data disclosure

All concept metrics (emotion percentages, sleep values, trend curves, timeline readings) are simulated unless directly backed by source project data.

The demo must visibly disclose:

**Simulated Data · Concept Demo**

and may include:

> Conceptual interface using simulated data, developed from PetLoop's physical prototype and interaction research.

No diagnostic or medical claims should be invented.

## 10. Responsive Behavior

Target ranges:

- Desktop: `>= 1200px`
- Tablet: `768–1199px`
- Mobile: `< 768px`

The case study should adapt its editorial grid into a deliberate mobile narrative, not merely shrink the desktop layout.

The demo should transform desktop sidebar navigation into mobile bottom navigation and stack content into touch-friendly cards/views.

System diagrams should become readable vertical flows on small screens rather than being scaled down until illegible.

## 11. Technical Architecture

### Stack

- React
- TypeScript
- Vite
- GitHub Pages
- GitHub Actions

No backend is required for V1.

### Routes

- `/` — Case Study
- `/demo` — Interactive Product Demo

GitHub Pages must support direct access/reload for the demo route. The implementation must account for project-site base paths from the beginning.

Repository base path is:

`/PetLoop-Project/`

### Suggested source organization

```text
src/
├── app/
├── pages/
│   ├── CaseStudyPage.tsx
│   └── DemoPage.tsx
├── sections/
├── demo/
├── components/
├── data/
│   ├── project.ts
│   └── demo.ts
├── assets/
│   ├── research/
│   ├── wearable/
│   ├── robot/
│   ├── ui/
│   └── brand/
└── styles/
    ├── tokens.css
    └── global.css
```

Components should be split by clear responsibility; avoid a single monolithic app file.

## 12. Design System in Code

The approved visual language must be represented as reusable CSS/design tokens rather than scattered literal values.

At minimum define tokens for:

- PetLoop Forest
- Soft Sage
- Mist Green
- Warm Ivory
- Charcoal
- Soft Grey
- spacing scale
- card/control radii
- typography hierarchy

The Case Study and Demo should share the same brand tokens while allowing different information density.

## 13. Demo Data Architecture

Simulated data must live in a structured local data module instead of being hard-coded directly into UI components.

The data model must support:

- Pet identity
- Current emotion/state
- Activity
- Sleep
- Vocalization/behavior events
- Robot online/state information
- Time-series/trend values by range
- Timeline events
- Appended interaction events

The UI should be designed so the static data layer could later be replaced by a real API without rewriting all presentation components.

## 14. Deployment

GitHub Actions deployment flow:

**Push to main → install dependencies → test/verify → build → deploy GitHub Pages**

Vite base path must be correctly configured for `/PetLoop-Project/`.

The deployed target is expected to be under:

`https://chloemmmmm.github.io/PetLoop-Project/`

## 15. Performance and Accessibility

### Performance

- Optimize large imagery for actual display size
- Prefer modern web image formats where practical
- Lazy-load non-critical imagery
- Prioritize the hero image
- Avoid shipping full-resolution presentation pages as routine page assets

### Accessibility

- Semantic controls and navigation
- Keyboard-accessible interactive elements
- Visible focus states
- Meaningful alt text
- Readable color contrast
- Reduced-motion support

## 16. Quality Gate

Before the V1 site is considered complete, verify at minimum:

- Case Study renders correctly on desktop and mobile
- `/demo` route works from navigation and on direct reload
- Time-range switching changes demo content
- Metric drill-down works
- Timeline evidence selection works
- All four robot response actions work
- Robot state progression is visible
- Completed response is written into the visible timeline state
- Return to Case Study works
- Vite base path is correct
- Automated tests/build pass
- GitHub Pages deployment succeeds
- Deployed public URL is manually checked

## 17. Source Fidelity Rule

The website may refine language, composition, hierarchy, and visual presentation, but it must not fabricate project achievements, validation counts, model accuracy, clinical conclusions, live hardware integration, or unsupported metrics.

Where the product demo requires illustrative values, label them clearly as simulated concept data.

---

This specification records the design decisions approved in conversation as Sections 01–05 and is the source of truth for the implementation plan.
