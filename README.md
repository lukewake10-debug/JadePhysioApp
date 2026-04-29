# PhysioRevision NHS

PhysioRevision NHS is a responsive React + TypeScript revision app for physiotherapists working mainly in NHS settings. It focuses on condition pathophysiology, medical management, clinical presentation, investigations, escalation and safety, with concise physiotherapy relevance and more detailed respiratory physiotherapy content where clinically important.

This app is for revision only. It does not replace clinical judgement, supervision, senior advice, current NICE/CSP/NHS guidance, local NHS trust policies or local escalation pathways.

## Tech Stack

- React with TypeScript
- Vite
- Tailwind CSS
- Local TypeScript data files, structured for later API/CMS replacement
- Browser `localStorage` for user progress
- PWA manifest and service worker

## Features

- Dashboard with daily topic, random condition generator, recent views and revision streak.
- Main navigation for dashboard, condition library, pathophysiology, medical management, investigations, red flags, respiratory treatments, outcome measures, cases, quizzes, flashcards, favourites, weak areas and sources.
- 500+ condition pages across NHS physiotherapy-relevant specialties. Core conditions include detailed pages; specialist and red-flag entries include concise revision summaries, escalation prompts, flashcards, quiz questions and source placeholders.
- Detailed core sample content includes:
  - COPD exacerbation
  - Pneumonia
  - Bronchiectasis
  - Asthma
  - Pulmonary embolism
  - Stroke
  - Parkinson's disease
  - Low back pain
  - Sciatica
  - Heart failure
  - Sepsis
  - Hip fracture
- Structured catalogue for the full requested specialty condition list, ready for content expansion.
- Dedicated libraries for pathophysiology, medical management, investigations, red flags, outcome measures, cases, quizzes and flashcards.
- Respiratory physiotherapy treatment cards covering positioning, ACBT, PEP, huffing/supported cough and monitored early mobilisation.
- Local progress tracking for favourites, bookmarks, weak areas, confidence ratings, quiz scores, recently viewed pages, flashcard progress and streaks.
- Global search plus specialty and difficulty filters.
- Dark mode.
- Exportable notes as plain text for saved favourites and weak areas.
- Source registry with reference metadata and placeholders for governance review.
- Priority and setting tags such as core NHS physio condition, common ward-based condition, common outpatient condition, specialist but important, and red flag or urgent escalation condition.

## Important Clinical Safety Note

Content is paraphrased educational revision material. It should be reviewed before clinical use and checked against:

- Current NICE guidance
- NHS resources
- CSP guidance
- Local NHS trust policies
- Local escalation pathways
- Senior or specialist advice

Do not use the app as definitive clinical guidance.

## Setup

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

On Windows PowerShell, if scripts are blocked, use:

```bash
npm.cmd run dev
npm.cmd run build
```

## Content Structure

Core files:

- `src/types.ts` defines the app data model.
- `src/data/content.ts` contains local seed content and source registry entries.
- `src/services/contentRepository.ts` provides a small repository abstraction for future API/database replacement.

The key data types include:

- `Condition`
- `PathophysiologyTopic`
- `MedicalManagementTopic`
- `Investigation`
- `TreatmentReasoningEntry`
- `RespiratoryPhysioTreatment`
- `AssessmentFramework`
- `RedFlag`
- `OutcomeMeasure`
- `CaseScenario`
- `Flashcard`
- `QuizQuestion`
- `SourceReference`
- `UserProgress`

## Expanding Content

Add a new condition by appending a `Condition` object to `conditions` in `src/data/content.ts`. Each condition supports:

- overview
- detailed pathophysiology
- clinical presentation
- investigations
- medical management and medication summaries
- physiotherapy relevance
- respiratory physiotherapy treatments where applicable
- treatment reasoning table
- red flags and escalation
- NHS-specific considerations
- revision summary
- flashcards
- quiz questions
- source references

For production use, replace placeholder sources with approved local and national references, add review ownership, and run clinical governance checks.
