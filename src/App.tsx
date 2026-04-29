import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileQuestion,
  FlaskConical,
  HeartPulse,
  Home,
  Library,
  Menu,
  Moon,
  Search,
  ShieldAlert,
  Shuffle,
  Sparkles,
  Star,
  Stethoscope,
  Sun,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  allFlashcards,
  allQuizQuestions,
  caseScenarios,
  conditions,
  investigationLibrary,
  medicalManagementTopics,
  outcomeMeasures,
  pathophysiologyTopics,
  redFlags,
  safetyReminder,
  sourceReferences,
} from "./data/content";
import {
  CaseScenario,
  Condition,
  ConfidenceStatus,
  MedicalManagementTopic,
  OutcomeMeasure,
  PathophysiologyTopic,
  RedFlag,
  SourceReference,
  Specialty,
  UserProgress,
} from "./types";

type Section =
  | "dashboard"
  | "conditions"
  | "conditionDetail"
  | "pathophysiology"
  | "medical"
  | "investigations"
  | "escalation"
  | "respiratory"
  | "outcomes"
  | "cases"
  | "quizzes"
  | "flashcards"
  | "favourites"
  | "weak"
  | "sources";

type SearchResult = {
  id: string;
  title: string;
  category: string;
  description: string;
  section: Section;
  conditionId?: string;
};

const navItems: Array<{ id: Section; label: string; icon: typeof Home; colour: string }> = [
  { id: "dashboard", label: "Dashboard", icon: Home, colour: "text-blue-600" },
  { id: "conditions", label: "Condition Library", icon: Library, colour: "text-blue-600" },
  { id: "pathophysiology", label: "Pathophysiology Library", icon: Brain, colour: "text-blue-600" },
  { id: "medical", label: "Medical Management Library", icon: Stethoscope, colour: "text-green-600" },
  { id: "investigations", label: "Investigations", icon: FlaskConical, colour: "text-blue-600" },
  { id: "escalation", label: "Red Flags and Escalation", icon: ShieldAlert, colour: "text-red-600" },
  { id: "respiratory", label: "Respiratory Physiotherapy Treatments", icon: HeartPulse, colour: "text-green-600" },
  { id: "outcomes", label: "Outcome Measures", icon: BarChart3, colour: "text-purple-600" },
  { id: "cases", label: "Case Scenarios", icon: ClipboardCheck, colour: "text-purple-600" },
  { id: "quizzes", label: "Quizzes", icon: CheckCircle2, colour: "text-purple-600" },
  { id: "flashcards", label: "Flashcards", icon: BookOpen, colour: "text-purple-600" },
  { id: "favourites", label: "Favourites", icon: Star, colour: "text-amber-600" },
  { id: "weak", label: "Weak Areas", icon: AlertTriangle, colour: "text-amber-600" },
  { id: "sources", label: "Sources and References", icon: FileQuestion, colour: "text-blue-600" },
];

const specialties: Array<"All" | Specialty> = [
  "All",
  "Musculoskeletal",
  "Neurology",
  "Respiratory",
  "Cardiorespiratory and acute care",
  "Older adult rehab",
  "Paediatrics",
  "Pelvic health",
];
const confidenceOptions: ConfidenceStatus[] = ["Not Started", "Learning", "Needs Review", "Confident"];

const blankProgress: UserProgress = {
  favourites: [],
  bookmarks: [],
  confidenceRatings: {},
  quizScores: {},
  recentlyViewed: [],
  weakAreas: [],
  flashcardSeen: {},
  streak: 0,
};

function readProgress(): UserProgress {
  try {
    const stored = localStorage.getItem("physiorevision-nhs-progress");
    return stored ? { ...blankProgress, ...JSON.parse(stored) } : blankProgress;
  } catch {
    return blankProgress;
  }
}

const todayKey = () => new Date().toISOString().slice(0, 10);
const textMatch = (value: unknown, query: string) => JSON.stringify(value).toLowerCase().includes(query.toLowerCase());
const parseRoute = (): { section: Section; conditionId?: string } => {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const conditionMatch = path.match(/^\/conditions\/([^/]+)$/);
  if (conditionMatch) {
    const condition = conditions.find((item) => item.id === conditionMatch[1]);
    return condition ? { section: "conditionDetail", conditionId: condition.id } : { section: "conditions" };
  }
  if (path === "/conditions") return { section: "conditions" };
  return { section: "dashboard" };
};

const pathForSection = (section: Section, conditionId?: string) => {
  if (section === "conditionDetail" && conditionId) return `/conditions/${conditionId}`;
  const paths: Partial<Record<Section, string>> = {
    dashboard: "/",
    conditions: "/conditions",
    pathophysiology: "/pathophysiology",
    medical: "/medical-management",
    investigations: "/investigations",
    escalation: "/red-flags",
    respiratory: "/respiratory-physiotherapy",
    outcomes: "/outcome-measures",
    cases: "/case-scenarios",
    quizzes: "/quizzes",
    flashcards: "/flashcards",
    favourites: "/favourites",
    weak: "/weak-areas",
    sources: "/sources",
  };
  return paths[section] ?? "/";
};

const badgeTone: Record<string, string> = {
  education: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-100",
  medical: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-100",
  surgical: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-100",
  physiotherapy: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-100",
  monitoring: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-100",
  escalation: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-100",
  revision: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-100",
};

function App() {
  const initialRoute = parseRoute();
  const [section, setSection] = useState<Section>(initialRoute.section);
  const [selectedConditionId, setSelectedConditionId] = useState(initialRoute.conditionId ?? conditions[0].id);
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState<"All" | Specialty>("All");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("physiorevision-nhs-theme") === "dark");
  const [progress, setProgress] = useState<UserProgress>(readProgress);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [simpleMode, setSimpleMode] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showFlashcardAnswer, setShowFlashcardAnswer] = useState(false);

  const selectedCondition = conditions.find((condition) => condition.id === selectedConditionId) ?? conditions[0];
  const dailyTopic = conditions[new Date().getDate() % conditions.length];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("physiorevision-nhs-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("physiorevision-nhs-progress", JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    const onPopState = () => {
      const route = parseRoute();
      setSection(route.section);
      if (route.conditionId) setSelectedConditionId(route.conditionId);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const last = progress.lastRevisionDate;
    if (last !== todayKey()) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const streak = last === yesterday.toISOString().slice(0, 10) ? progress.streak + 1 : 1;
      setProgress((current) => ({ ...current, streak, lastRevisionDate: todayKey() }));
    }
  }, []);

  const filteredConditions = useMemo(
    () =>
      conditions.filter(
        (condition) =>
          (specialty === "All" || condition.specialty === specialty) &&
          textMatch(condition, query),
      ),
    [specialty, query],
  );

  const searchResults = useMemo(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) return [];

    const conditionResults: SearchResult[] = conditions
      .filter((condition) => textMatch(condition, trimmed))
      .map((condition) => ({
        id: `condition-${condition.id}`,
        title: condition.title,
        category: "Condition",
        description: `${condition.specialty} | ${condition.overview.definition}`,
        section: "conditions" as const,
        conditionId: condition.id,
      }));

    const pathophysiologyResults: SearchResult[] = pathophysiologyTopics
      .filter((topic) => textMatch(topic, trimmed))
      .map((topic) => ({
        id: `pathophysiology-${topic.id}`,
        title: topic.title,
        category: "Pathophysiology",
        description: topic.simpleExplanation,
        section: "pathophysiology" as const,
      }));

    const medicalResults: SearchResult[] = medicalManagementTopics
      .filter((topic) => textMatch(topic, trimmed))
      .map((topic) => ({
        id: `medical-${topic.id}`,
        title: topic.title,
        category: "Medical management",
        description: topic.whyUsed,
        section: "medical" as const,
      }));

    const redFlagResults: SearchResult[] = redFlags
      .filter((item) => textMatch(item, trimmed))
      .map((item) => ({
        id: `red-${item.id}`,
        title: item.title,
        category: "Red flag",
        description: item.warningSigns.slice(0, 3).join("; "),
        section: "escalation" as const,
      }));

    const investigationResults: SearchResult[] = investigationLibrary
      .filter((item) => textMatch(item, trimmed))
      .map((item) => ({
        id: `investigation-${item.id}`,
        title: item.title,
        category: "Investigation",
        description: item.whyUseful,
        section: "investigations" as const,
      }));

    const outcomeResults: SearchResult[] = outcomeMeasures
      .filter((item) => textMatch(item, trimmed))
      .map((item) => ({
        id: `outcome-${item.id}`,
        title: item.title,
        category: "Outcome measure",
        description: item.whatItMeasures,
        section: "outcomes" as const,
      }));

    const caseResults: SearchResult[] = caseScenarios
      .filter((item) => textMatch(item, trimmed))
      .map((item) => ({
        id: `case-${item.id}`,
        title: item.title,
        category: "Case scenario",
        description: item.patientStory,
        section: "cases" as const,
      }));

    return [
      ...conditionResults,
      ...pathophysiologyResults,
      ...medicalResults,
      ...redFlagResults,
      ...investigationResults,
      ...outcomeResults,
      ...caseResults,
    ].slice(0, 12);
  }, [query]);

  const navigateSection = (next: Section) => {
    setSection(next);
    window.history.pushState(null, "", pathForSection(next));
  };

  const openCondition = (condition: Condition) => {
    setSelectedConditionId(condition.id);
    setSection("conditionDetail");
    window.history.pushState(null, "", pathForSection("conditionDetail", condition.id));
    setProgress((current) => ({
      ...current,
      recentlyViewed: [condition.id, ...current.recentlyViewed.filter((id) => id !== condition.id)].slice(0, 8),
    }));
    setMobileOpen(false);
  };

  const openSearchResult = (result: SearchResult) => {
    if (result.conditionId) {
      const condition = conditions.find((item) => item.id === result.conditionId);
      if (condition) {
        openCondition(condition);
        return;
      }
    }
    navigateSection(result.section);
    setMobileOpen(false);
  };

  const setConfidence = (id: string, value: ConfidenceStatus) => {
    setProgress((current) => ({
      ...current,
      confidenceRatings: { ...current.confidenceRatings, [id]: value },
      weakAreas: value === "Needs Review" ? Array.from(new Set([...current.weakAreas, id])) : current.weakAreas,
    }));
  };

  const toggleList = (key: "favourites" | "bookmarks" | "weakAreas", id: string) => {
    setProgress((current) => {
      const exists = current[key].includes(id);
      return { ...current, [key]: exists ? current[key].filter((item) => item !== id) : [...current[key], id] };
    });
  };

  const saveQuizScore = () => {
    const score = selectedCondition.quizQuestions.reduce((total, question) => total + (quizAnswers[question.id] === question.correctAnswer ? 1 : 0), 0);
    setProgress((current) => ({ ...current, quizScores: { ...current.quizScores, [selectedCondition.id]: score } }));
  };

  const exportNotes = () => {
    const lines = conditions
      .filter((condition) => progress.favourites.includes(condition.id) || progress.weakAreas.includes(condition.id))
      .map((condition) => {
        const summary = condition.revisionSummary;
        return [
          condition.title,
          `Confidence: ${progress.confidenceRatings[condition.id] ?? "Not Started"}`,
          `Pathophysiology: ${summary.pathophysiologyPoints.join("; ")}`,
          `Medical management: ${summary.medicalManagementPoints.join("; ")}`,
          `Escalation: ${condition.redFlags.join("; ")}`,
        ].join("\n");
      })
      .join("\n\n");
    const blob = new Blob([lines || "No favourites or weak areas saved yet."], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "physiorevision-nhs-notes.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const randomCondition = () => openCondition(conditions[Math.floor(Math.random() * conditions.length)]);

  const content = {
    dashboard: (
      <Dashboard
        progress={progress}
        dailyTopic={dailyTopic}
        openCondition={openCondition}
        randomCondition={randomCondition}
        setSection={navigateSection}
      />
    ),
    conditions: (
      <ConditionLibrary
        conditions={filteredConditions}
        openCondition={openCondition}
      />
    ),
    conditionDetail: (
      <ConditionDetail
        condition={selectedCondition}
        progress={progress}
        setConfidence={setConfidence}
        toggleList={toggleList}
        simpleMode={simpleMode}
        setSimpleMode={setSimpleMode}
        backToLibrary={() => navigateSection("conditions")}
      />
    ),
    pathophysiology: <TopicGrid items={pathophysiologyTopics.filter((item) => textMatch(item, query))} kind="pathophysiology" />,
    medical: <MedicalGrid items={medicalManagementTopics.filter((item) => textMatch(item, query))} />,
    investigations: <InvestigationGrid query={query} />,
    escalation: <RedFlagGrid items={redFlags.filter((item) => textMatch(item, query))} />,
    respiratory: <RespiratoryTreatments />,
    outcomes: <OutcomeGrid items={outcomeMeasures.filter((item) => textMatch(item, query))} />,
    cases: <CaseGrid items={caseScenarios.filter((item) => textMatch(item, query))} />,
    quizzes: (
      <QuizMode
        selected={selectedCondition}
        answers={quizAnswers}
        setAnswers={setQuizAnswers}
        saveQuizScore={saveQuizScore}
        savedScore={progress.quizScores[selectedCondition.id]}
      />
    ),
    flashcards: (
      <FlashcardMode
        index={flashcardIndex}
        setIndex={setFlashcardIndex}
        showAnswer={showFlashcardAnswer}
        setShowAnswer={setShowFlashcardAnswer}
      />
    ),
    favourites: <SavedConditions ids={progress.favourites} title="Favourites" openCondition={openCondition} exportNotes={exportNotes} />,
    weak: <SavedConditions ids={progress.weakAreas} title="Weak Areas" openCondition={openCondition} exportNotes={exportNotes} />,
    sources: <SourceRegistry items={sourceReferences.filter((item) => textMatch(item, query))} />,
  } satisfies Record<Section, ReactNode>;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-[1500px] items-center gap-3 px-3 py-3 lg:px-5">
          <button className="icon-btn lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation">
            <Menu size={20} />
          </button>
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-blue-700 text-white">
              <HeartPulse size={22} />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-black">PhysioRevision NHS</h1>
              <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">Revision only. Check local policy, current guidance and senior advice.</p>
            </div>
          </div>
          <div className="hidden min-w-[280px] max-w-xl flex-1 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900 md:flex">
            <Search size={18} className="text-slate-400" />
            <input className="w-full bg-transparent text-sm outline-none" placeholder="Search conditions, red flags, medicines..." value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
          <button className="btn" onClick={randomCondition}>
            <Shuffle size={18} /> Random
          </button>
          <button className="icon-btn" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle dark mode">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        <div className="border-t border-slate-200 px-3 py-2 dark:border-slate-800 md:hidden">
          <div className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
            <Search size={18} className="text-slate-400" />
            <input className="w-full bg-transparent text-sm outline-none" placeholder="Search..." value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] gap-4 px-3 py-4 lg:grid-cols-[290px_1fr] lg:px-5">
        <aside className="hidden lg:block">
          <Navigation section={section} setSection={navigateSection} />
        </aside>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/50 lg:hidden">
            <aside className="h-full w-[86vw] max-w-sm overflow-auto bg-white p-3 dark:bg-slate-950">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-black">Navigation</span>
                <button className="icon-btn" onClick={() => setMobileOpen(false)} aria-label="Close navigation">
                  <X size={20} />
                </button>
              </div>
              <Navigation
                section={section}
                setSection={(next) => {
                  navigateSection(next);
                  setMobileOpen(false);
                }}
              />
            </aside>
          </div>
        )}
        <main className="space-y-4">
          <SafetyBanner />
          <LiveSearchPanel query={query} setQuery={setQuery} results={searchResults} openResult={openSearchResult} />
          {section === "conditions" && <FilterBar specialty={specialty} setSpecialty={setSpecialty} />}
          {content[section]}
        </main>
      </div>
    </div>
  );
}

function Navigation({ section, setSection }: { section: Section; setSection: (section: Section) => void }) {
  return (
    <nav className="sticky top-[86px] space-y-1 rounded-lg border border-slate-200 bg-white p-2 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-semibold transition ${
              section === item.id ? "bg-blue-50 text-blue-900 dark:bg-blue-950/50 dark:text-blue-100" : "hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
            onClick={() => setSection(item.id)}
          >
            <Icon size={18} className={item.colour} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function SafetyBanner() {
  return (
    <section className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm font-semibold text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
      {safetyReminder} This app is for revision only and does not replace clinical judgement, supervision or local NHS escalation pathways.
    </section>
  );
}

function LiveSearchPanel({
  query,
  setQuery,
  results,
  openResult,
}: {
  query: string;
  setQuery: (value: string) => void;
  results: SearchResult[];
  openResult: (result: SearchResult) => void;
}) {
  if (query.trim().length < 2) return null;

  return (
    <section className="rounded-lg border border-blue-200 bg-white p-3 shadow-soft dark:border-blue-900 dark:bg-slate-900" aria-live="polite">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-black uppercase tracking-wide text-blue-700 dark:text-blue-300">Live Search</h2>
          <p className="text-sm text-slate-500">
            {results.length ? `${results.length} quick match${results.length === 1 ? "" : "es"} for "${query}"` : `No quick matches for "${query}"`}
          </p>
        </div>
        <button className="btn" onClick={() => setQuery("")}>
          <X size={16} /> Clear
        </button>
      </div>
      {!!results.length && (
        <div className="mt-3 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
          {results.map((result) => (
            <button
              key={result.id}
              className="rounded-md border border-slate-200 p-3 text-left transition hover:border-blue-400 hover:bg-blue-50 dark:border-slate-700 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
              onClick={() => openResult(result)}
            >
              <span className={`badge ${result.category === "Red flag" ? badgeTone.escalation : result.category === "Medical management" ? badgeTone.medical : result.category === "Pathophysiology" || result.category === "Condition" || result.category === "Investigation" ? badgeTone.education : badgeTone.revision}`}>
                {result.category}
              </span>
              <span className="mt-2 block font-black">{result.title}</span>
              <span className="mt-1 line-clamp-2 block text-sm leading-5 text-slate-600 dark:text-slate-300">{result.description}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

function FilterBar({
  specialty,
  setSpecialty,
}: {
  specialty: "All" | Specialty;
  setSpecialty: (value: "All" | Specialty) => void;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
      <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
        Specialty
        <select className="input mt-1" value={specialty} onChange={(event) => setSpecialty(event.target.value as "All" | Specialty)}>
          {specialties.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
    </section>
  );
}

function Dashboard({
  progress,
  dailyTopic,
  openCondition,
  randomCondition,
  setSection,
}: {
  progress: UserProgress;
  dailyTopic: Condition;
  openCondition: (condition: Condition) => void;
  randomCondition: () => void;
  setSection: (section: Section) => void;
}) {
  const recentlyViewed = progress.recentlyViewed.map((id) => conditions.find((condition) => condition.id === id)).filter(Boolean) as Condition[];
  return (
    <section className="space-y-4">
      <article className="card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className={`badge ${badgeTone.education}`}>{conditions.length} condition pages</span>
            <h2 className="mt-3 text-3xl font-black">PhysioRevision NHS</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              Search the library, open a condition page, or jump into a quick revision tool.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="btn btn-primary" onClick={() => setSection("conditions")}>
              Browse conditions
            </button>
            <button className="btn" onClick={randomCondition}>
              <Shuffle size={18} /> Random
            </button>
            <button className="btn" onClick={() => setSection("flashcards")}>
              Flashcards
            </button>
            <button className="btn" onClick={() => setSection("quizzes")}>
              Quizzes
            </button>
          </div>
        </div>
      </article>
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="card">
          <span className={`badge ${badgeTone.revision}`}>Daily topic</span>
          <h3 className="mt-3 text-xl font-black">{dailyTopic.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{dailyTopic.overview.definition}</p>
          <button className="btn btn-primary mt-4" onClick={() => openCondition(dailyTopic)}>
            Open condition page
          </button>
        </article>
        {recentlyViewed.length > 0 && (
          <article className="card">
            <h3 className="text-xl font-black">Recently viewed</h3>
            <div className="mt-3 space-y-2">
              {recentlyViewed.slice(0, 4).map((condition) => (
                <button key={condition.id} className="w-full rounded-md border border-slate-200 p-3 text-left hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800" onClick={() => openCondition(condition)}>
                  <span className="block font-bold">{condition.title}</span>
                  <span className="text-xs text-slate-500">{condition.specialty}</span>
                </button>
              ))}
            </div>
          </article>
        )}
      </div>
    </section>
  );
}

function ConditionLibrary({
  conditions,
  openCondition,
}: {
  conditions: Condition[];
  openCondition: (condition: Condition) => void;
}) {
  return (
    <section className="space-y-4">
      <div className="card">
        <h2 className="text-2xl font-black">Condition Library</h2>
        <p className="mt-1 text-sm text-slate-500">Select a condition to open its own revision page.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {conditions.map((condition) => (
          <button
            key={condition.id}
            className="rounded-lg border border-slate-200 bg-white p-4 text-left shadow-soft transition hover:border-blue-400 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
            onClick={() => openCondition(condition)}
          >
            <span className="block text-lg font-black">{condition.title}</span>
            <span className="mt-2 block text-xs text-slate-500">{condition.specialty}</span>
            <span className={`badge mt-3 ${condition.priority === "Red flag or urgent escalation condition" ? badgeTone.escalation : condition.priority === "Specialist but important" ? badgeTone.revision : condition.priority === "Common ward-based condition" ? badgeTone.caution : badgeTone.education}`}>
              {condition.priority}
            </span>
          </button>
        ))}
      </div>
      {!conditions.length && <p className="text-sm text-slate-500">No conditions match the current search and filters.</p>}
    </section>
  );
}

function ConditionDetail({
  condition,
  progress,
  setConfidence,
  toggleList,
  simpleMode,
  setSimpleMode,
  backToLibrary,
}: {
  condition: Condition;
  progress: UserProgress;
  setConfidence: (id: string, value: ConfidenceStatus) => void;
  toggleList: (key: "favourites" | "bookmarks" | "weakAreas", id: string) => void;
  simpleMode: boolean;
  setSimpleMode: (value: boolean) => void;
  backToLibrary?: () => void;
}) {
  const confidence = progress.confidenceRatings[condition.id] ?? "Not Started";
  return (
    <article className="space-y-4">
      <section className="card">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className={`badge ${badgeTone.education}`}>{condition.specialty}</span>
              <span className={`badge ${condition.priority === "Red flag or urgent escalation condition" ? badgeTone.escalation : condition.priority === "Specialist but important" ? badgeTone.revision : condition.priority === "Common ward-based condition" ? badgeTone.caution : badgeTone.education}`}>
                {condition.priority}
              </span>
              {condition.setting.slice(0, 3).map((setting) => (
                <span key={setting} className="badge bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  {setting}
                </span>
              ))}
            </div>
            <h2 className="mt-3 text-3xl font-black">{condition.title}</h2>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600 dark:text-slate-300">{condition.overview.definition}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {backToLibrary && (
              <button className="btn" onClick={backToLibrary}>
                Back to library
              </button>
            )}
            <button className={`btn ${progress.favourites.includes(condition.id) ? "btn-primary" : ""}`} onClick={() => toggleList("favourites", condition.id)}>
              <Star size={18} /> Favourite
            </button>
            <button className="btn" onClick={() => toggleList("bookmarks", condition.id)}>
              Bookmark
            </button>
            <button className="btn" onClick={() => setSimpleMode(!simpleMode)}>
              <Sparkles size={18} /> Explain simply
            </button>
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="text-sm font-bold">
            Confidence rating
            <select className="input mt-1" value={confidence} onChange={(event) => setConfidence(condition.id, event.target.value as ConfidenceStatus)}>
              {confidenceOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm dark:border-red-900 dark:bg-red-950/30">
            <strong>Before treating, check: </strong>
            {condition.physiotherapyRelevance.pauseOrEscalate.join("; ")}
          </div>
        </div>
      </section>

      {simpleMode && (
        <section className="card border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/30">
          <h3 className="text-lg font-black">Explain Simply</h3>
          <p className="mt-2 text-sm leading-6">
            In simple terms, {condition.title.toLowerCase()} affects function because {condition.pathophysiology.symptomLink.toLowerCase()} Medical management aims to stabilise the underlying problem first; physiotherapy then checks safety, function and treatment response.
          </p>
        </section>
      )}

      <Section title="Overview" tone="education">
        <InfoGrid
          items={[
            ["Common patient groups", condition.overview.commonPatientGroups.join("; ")],
            ["Common NHS settings", condition.overview.commonNhsSettings.join("; ")],
            ["Why physios need it", condition.overview.whyPhysiosNeedToUnderstandIt],
          ]}
        />
      </Section>

      <Section title="Pathophysiology" tone="education">
        <InfoGrid
          items={[
            ["Normal anatomy and physiology", condition.pathophysiology.normal],
            ["What goes wrong", condition.pathophysiology.whatGoesWrong],
            ["Disease mechanism", condition.pathophysiology.diseaseMechanism],
            ["Cellular, tissue, organ or system changes", condition.pathophysiology.levels],
            ["Acute versus chronic", condition.pathophysiology.acuteVsChronic],
            ["How it causes symptoms", condition.pathophysiology.symptomLink],
            ["How it affects function", condition.pathophysiology.functionLink],
            ["Prognosis", condition.pathophysiology.prognosis],
          ]}
        />
        <MiniList title="Common complications" items={condition.pathophysiology.complications} />
      </Section>

      <Section title="Clinical Presentation" tone="education">
        <MultiLists
          groups={[
            ["Symptoms", condition.clinicalPresentation.symptoms],
            ["Signs", condition.clinicalPresentation.signs],
            ["Subjective findings", condition.clinicalPresentation.subjectiveFindings],
            ["Objective findings", condition.clinicalPresentation.objectiveFindings],
            ["Functional impact", condition.clinicalPresentation.functionalImpact],
            ["Red flag symptoms", condition.clinicalPresentation.redFlagSymptoms],
            ["Differentials", condition.clinicalPresentation.differentials],
          ]}
        />
      </Section>

      <Section title="Investigations" tone="education">
        <div className="grid gap-3 lg:grid-cols-2">
          {condition.investigations.map((item) => (
            <InvestigationCard key={item.id} item={item} />
          ))}
        </div>
      </Section>

      <Section title="Medical Management" tone="medical">
        <MultiLists
          groups={[
            ["First-line medical management", condition.medicalManagement.firstLine],
            ["Monitoring considerations", condition.medicalManagement.monitoring],
            ["Escalation options", condition.medicalManagement.escalationOptions],
            ["MDT involvement", condition.medicalManagement.mdtInvolvement],
            ["Urgent medical review", condition.medicalManagement.urgentMedicalReview],
          ]}
        />
        {condition.medicalManagement.oxygenTherapy && <Callout title="Oxygen therapy" body={condition.medicalManagement.oxygenTherapy} tone="caution" />}
        {condition.medicalManagement.surgicalManagement && <Callout title="Surgical management" body={condition.medicalManagement.surgicalManagement} tone="medical" />}
        <div className="mt-3 grid gap-3 xl:grid-cols-2">
          {condition.medicalManagement.medications.map((med) => (
            <div key={med.drugClass} className="rounded-md border border-green-200 bg-green-50 p-3 text-sm dark:border-green-900 dark:bg-green-950/30">
              <h4 className="font-black">{med.drugClass}</h4>
              <p className="mt-1"><strong>Examples:</strong> {med.examples.join(", ")}</p>
              <p className="mt-1"><strong>Mechanism:</strong> {med.mechanism}</p>
              <p className="mt-1"><strong>Why used:</strong> {med.whyUsed}</p>
              <p className="mt-1"><strong>Side effects:</strong> {med.keySideEffects.join("; ")}</p>
              <p className="mt-1"><strong>Physio relevance:</strong> {med.physiotherapyRelevance}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Physiotherapy Relevance" tone="medical">
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{condition.physiotherapyRelevance.whyItMatters}</p>
        <MultiLists
          groups={[
            ["Assessment considerations", condition.physiotherapyRelevance.assessmentConsiderations],
            ["Treatment precautions", condition.physiotherapyRelevance.treatmentPrecautions],
            ["Rehab considerations", condition.physiotherapyRelevance.rehabilitationConsiderations],
            ["Discharge planning", condition.physiotherapyRelevance.dischargePlanning],
            ["Pause or escalate", condition.physiotherapyRelevance.pauseOrEscalate],
          ]}
        />
      </Section>

      {!!condition.respiratoryPhysioTreatments.length && (
        <Section title="Respiratory Physiotherapy Treatment" tone="medical">
          <div className="grid gap-3 lg:grid-cols-2">
            {condition.respiratoryPhysioTreatments.map((treatment) => (
              <RespiratoryTreatmentCard key={treatment.id} treatment={treatment} />
            ))}
          </div>
        </Section>
      )}

      <Section title="Treatment Reasoning Table" tone="medical">
        <ReasoningTable rows={condition.treatmentReasoningTable} />
      </Section>

      <Section title="Red Flags and Escalation" tone="red">
        <MultiLists
          groups={[
            ["Red flags", condition.redFlags],
            ["When to stop physiotherapy", condition.physiotherapyRelevance.pauseOrEscalate],
            ["What to document", ["Symptoms and observations", "Treatment stopped or modified", "Who was contacted", "Advice or plan received", "Patient response"]],
          ]}
        />
        <Callout title="NHS safety reminder" body={safetyReminder} tone="red" />
      </Section>

      <Section title="NHS-Specific Considerations" tone="caution">
        <MultiLists
          groups={[
            ["Common NHS setting", condition.nhsConsiderations.commonNhsSetting],
            ["Referral pathways", condition.nhsConsiderations.referralPathways],
            ["MDT roles", condition.nhsConsiderations.mdtRoles],
            ["Medical team involvement", condition.nhsConsiderations.medicalTeamInvolvement],
            ["Discharge planning points", condition.nhsConsiderations.dischargePlanningPoints],
            ["Local trust policy reminders", condition.nhsConsiderations.localTrustPolicyReminders],
            ["Patient education", condition.nhsConsiderations.patientEducationConsiderations],
          ]}
        />
      </Section>

      <Section title="Revision Summary" tone="revision">
        <MultiLists
          groups={[
            ["5 key pathophysiology points", condition.revisionSummary.pathophysiologyPoints],
            ["5 key medical management points", condition.revisionSummary.medicalManagementPoints],
            ["3 physiotherapy relevance points", condition.revisionSummary.physiotherapyRelevancePoints],
            ["Common mistakes", condition.revisionSummary.commonMistakes],
            ["Interview-style talking points", condition.revisionSummary.interviewTalkingPoints],
          ]}
        />
      </Section>

      <Section title="Flashcards and Quiz Preview" tone="revision">
        <div className="grid gap-3 xl:grid-cols-2">
          <div>
            <h4 className="font-black">Flashcards</h4>
            <div className="mt-2 space-y-2">
              {condition.flashcards.map((card) => (
                <details key={card.id} className="rounded-md border border-purple-200 p-3 dark:border-purple-800">
                  <summary className="cursor-pointer font-semibold">{card.front}</summary>
                  <p className="mt-2 text-sm">{card.back}</p>
                </details>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-black">Quiz questions</h4>
            <div className="mt-2 space-y-2">
              {condition.quizQuestions.map((question) => (
                <details key={question.id} className="rounded-md border border-purple-200 p-3 dark:border-purple-800">
                  <summary className="cursor-pointer font-semibold">{question.question}</summary>
                  <p className="mt-2 text-sm"><strong>Answer:</strong> {question.options[question.correctAnswer]}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{question.explanation}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Sources" tone="education">
        <SourceChips ids={condition.sources} />
      </Section>
    </article>
  );
}

function Section({ title, tone, children }: { title: string; tone: "education" | "medical" | "caution" | "red" | "revision"; children: ReactNode }) {
  const border =
    tone === "red" ? "border-red-200 dark:border-red-900" : tone === "caution" ? "border-amber-200 dark:border-amber-900" : tone === "medical" ? "border-green-200 dark:border-green-900" : tone === "revision" ? "border-purple-200 dark:border-purple-900" : "border-blue-200 dark:border-blue-900";
  return (
    <section className={`card ${border}`}>
      <h3 className="text-xl font-black">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function InfoGrid({ items }: { items: Array<[string, string]> }) {
  return (
    <dl className="grid gap-3 md:grid-cols-2">
      {items.map(([term, detail]) => (
        <div key={term} className="rounded-md bg-slate-50 p-3 text-sm dark:bg-slate-800">
          <dt className="font-black">{term}</dt>
          <dd className="mt-1 leading-6 text-slate-600 dark:text-slate-300">{detail}</dd>
        </div>
      ))}
    </dl>
  );
}

function MultiLists({ groups }: { groups: Array<[string, string[]]> }) {
  return (
    <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {groups.map(([title, items]) => (
        <MiniList key={title} title={title} items={items} />
      ))}
    </div>
  );
}

function MiniList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md border border-slate-200 p-3 dark:border-slate-700">
      <h4 className="font-black">{title}</h4>
      <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function Callout({ title, body, tone }: { title: string; body: string; tone: "medical" | "caution" | "red" }) {
  const toneClass = tone === "red" ? "border-red-200 bg-red-50 text-red-950 dark:border-red-900 dark:bg-red-950/30 dark:text-red-100" : tone === "caution" ? "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100" : "border-green-200 bg-green-50 text-green-950 dark:border-green-900 dark:bg-green-950/30 dark:text-green-100";
  return (
    <div className={`mt-3 rounded-md border p-3 text-sm ${toneClass}`}>
      <strong>{title}: </strong>
      {body}
    </div>
  );
}

function InvestigationCard({ item }: { item: (typeof investigationLibrary)[number] }) {
  return (
    <article className="rounded-md border border-blue-200 bg-blue-50 p-3 text-sm dark:border-blue-900 dark:bg-blue-950/30">
      <div className="flex items-center justify-between gap-2">
        <h4 className="font-black">{item.title}</h4>
        <span className={`badge ${badgeTone.education}`}>{item.category}</span>
      </div>
      <p className="mt-2"><strong>What it may show:</strong> {item.whatItShows}</p>
      <p className="mt-1"><strong>Why useful:</strong> {item.whyUseful}</p>
      <p className="mt-1 text-red-700 dark:text-red-200"><strong>Escalate:</strong> {item.escalationTriggers.join("; ")}</p>
    </article>
  );
}

function RespiratoryTreatmentCard({ treatment }: { treatment: Condition["respiratoryPhysioTreatments"][number] }) {
  return (
    <article className="rounded-md border border-green-200 bg-green-50 p-3 text-sm dark:border-green-900 dark:bg-green-950/30">
      <h4 className="font-black">{treatment.title}</h4>
      <p className="mt-2"><strong>What it is:</strong> {treatment.whatItIs}</p>
      <p className="mt-1"><strong>How to apply:</strong> {treatment.howToApply}</p>
      <p className="mt-1"><strong>Why it helps:</strong> {treatment.whyItHelps}</p>
      <p className="mt-1"><strong>When to use:</strong> {treatment.whenToUse}</p>
      <p className="mt-1 text-amber-800 dark:text-amber-200"><strong>Caution:</strong> {treatment.cautions}</p>
      <p className="mt-1 text-red-700 dark:text-red-200"><strong>Stop signs:</strong> {treatment.stopSigns.join("; ")}</p>
      <p className="mt-2 rounded-md bg-white p-2 dark:bg-slate-900"><strong>Documentation:</strong> {treatment.documentationExample}</p>
    </article>
  );
}

function ReasoningTable({ rows }: { rows: Condition["treatmentReasoningTable"] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[1050px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            {["Treatment or management option", "Type", "How it works", "Why used", "When used", "Cautions", "Physio relevance", "Documentation example"].map((heading) => (
              <th key={heading} className="p-2 font-black">{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-slate-100 align-top dark:border-slate-800">
              <td className="p-2 font-bold">{row.treatmentOrManagementOption}</td>
              <td className="p-2"><span className={`badge ${badgeTone[row.type]}`}>{row.type}</span></td>
              <td className="p-2">{row.howItWorks}</td>
              <td className="p-2">{row.whyUsed}</td>
              <td className="p-2">{row.whenUsed}</td>
              <td className="p-2 text-amber-800 dark:text-amber-200">{row.cautionsOrContraindications}</td>
              <td className="p-2">{row.physiotherapyRelevance}</td>
              <td className="p-2">{row.documentationExample}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TopicGrid({ items }: { items: PathophysiologyTopic[]; kind: "pathophysiology" }) {
  return (
    <section className="grid gap-3 lg:grid-cols-2">
      {items.map((topic) => (
        <article key={topic.id} className="card border-blue-200 dark:border-blue-900">
          <h2 className="text-xl font-black">{topic.title}</h2>
          <p className="mt-2 text-sm"><strong>Simple:</strong> {topic.simpleExplanation}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{topic.detailedExplanation}</p>
          <MultiLists groups={[["Linked conditions", topic.linkedConditions], ["Clinical signs", topic.clinicalSigns], ["Escalation points", topic.escalationPoints]]} />
          <Callout title="Why it matters for physiotherapy" body={topic.physioImportance} tone="medical" />
        </article>
      ))}
    </section>
  );
}

function MedicalGrid({ items }: { items: MedicalManagementTopic[] }) {
  return (
    <section className="grid gap-3 lg:grid-cols-2">
      {items.map((topic) => (
        <article key={topic.id} className="card border-green-200 dark:border-green-900">
          <h2 className="text-xl font-black">{topic.title}</h2>
          <InfoGrid
            items={[
              ["What it is", topic.whatItIs],
              ["How it works", topic.howItWorks],
              ["Why it is used", topic.whyUsed],
              ["Physiotherapy relevance", topic.physiotherapyRelevance],
            ]}
          />
          <MultiLists groups={[["Conditions commonly linked", topic.linkedConditions], ["Common side effects", topic.commonSideEffects], ["Red flags or escalation", topic.escalationPoints]]} />
        </article>
      ))}
    </section>
  );
}

function InvestigationGrid({ query }: { query: string }) {
  return (
    <section className="grid gap-3 lg:grid-cols-2">
      {investigationLibrary.filter((item) => textMatch(item, query)).map((item) => (
        <InvestigationCard key={item.id} item={item} />
      ))}
    </section>
  );
}

function RedFlagGrid({ items }: { items: RedFlag[] }) {
  return (
    <section className="grid gap-3 lg:grid-cols-2">
      {items.map((item) => (
        <article key={item.id} className="card border-red-200 dark:border-red-900">
          <h2 className="text-xl font-black text-red-700 dark:text-red-200">{item.title}</h2>
          <MultiLists groups={[["Warning signs", item.warningSigns], ["Immediate actions", item.immediateActions], ["Who to escalate to", item.whoToEscalateTo], ["Documentation", item.documentation]]} />
          <Callout title="NHS safety reminder" body={item.nhsSafetyReminder} tone="red" />
        </article>
      ))}
    </section>
  );
}

function RespiratoryTreatments() {
  const treatments = Array.from(new Map(conditions.flatMap((condition) => condition.respiratoryPhysioTreatments).map((treatment) => [treatment.id, treatment])).values());
  return (
    <section className="space-y-4">
      <article className="card border-green-200 dark:border-green-900">
        <h2 className="text-xl font-black">Respiratory Physiotherapy Treatments</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Detailed treatment cards are included for respiratory conditions where physiotherapy input is clinically important. Always check local competencies and policies.</p>
      </article>
      <div className="grid gap-3 lg:grid-cols-2">{treatments.map((treatment) => <RespiratoryTreatmentCard key={treatment.id} treatment={treatment} />)}</div>
    </section>
  );
}

function OutcomeGrid({ items }: { items: OutcomeMeasure[] }) {
  return (
    <section className="grid gap-3 lg:grid-cols-2">
      {items.map((item) => (
        <article key={item.id} className="card">
          <h2 className="text-xl font-black">{item.title}</h2>
          <InfoGrid
            items={[
              ["What it measures", item.whatItMeasures],
              ["When to use it", item.whenToUse],
              ["How to perform it", item.howToPerform],
              ["Scoring", item.scoring],
              ["Interpretation", item.interpretation],
              ["Limitations", item.limitations],
              ["Documentation example", item.documentationExample],
            ]}
          />
        </article>
      ))}
    </section>
  );
}

function CaseGrid({ items }: { items: CaseScenario[] }) {
  return (
    <section className="grid gap-3 xl:grid-cols-2">
      {items.map((item) => (
        <article key={item.id} className="card border-purple-200 dark:border-purple-900">
          <div className="flex flex-wrap gap-2">
            <span className={`badge ${badgeTone.revision}`}>{item.setting}</span>
          </div>
          <h2 className="mt-3 text-xl font-black">{item.title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.patientStory}</p>
          <MultiLists groups={[["Presentation", item.presentation], ["Investigations", item.investigations], ["Medical management", item.medicalManagement], ["Physio safety", item.physiotherapySafety], ["Escalation triggers", item.escalationTriggers], ["Questions", item.questions]]} />
          <Callout title="Pathophysiology reasoning" body={item.pathophysiologyReasoning} tone="caution" />
          <details className="mt-3 rounded-md border border-purple-200 p-3 dark:border-purple-800">
            <summary className="cursor-pointer font-black">Model answer</summary>
            <p className="mt-2 text-sm leading-6">{item.modelAnswer}</p>
          </details>
        </article>
      ))}
    </section>
  );
}

function QuizMode({
  selected,
  answers,
  setAnswers,
  saveQuizScore,
  savedScore,
}: {
  selected: Condition;
  answers: Record<string, number>;
  setAnswers: (answers: Record<string, number>) => void;
  saveQuizScore: () => void;
  savedScore?: number;
}) {
  const score = selected.quizQuestions.reduce((total, question) => total + (answers[question.id] === question.correctAnswer ? 1 : 0), 0);
  return (
    <section className="card border-purple-200 dark:border-purple-900">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-black">Quiz Mode: {selected.title}</h2>
          <p className="mt-1 text-sm text-slate-500">Current score {score}/{selected.quizQuestions.length}{savedScore !== undefined ? ` | saved score ${savedScore}/${selected.quizQuestions.length}` : ""}</p>
        </div>
        <div className="flex gap-2">
          <button className="btn" onClick={() => setAnswers({})}>Reset</button>
          <button className="btn btn-primary" onClick={saveQuizScore}>Save score</button>
        </div>
      </div>
      <div className="mt-4 space-y-4">
        {selected.quizQuestions.map((question, questionIndex) => (
          <div key={question.id} className="rounded-md border border-slate-200 p-3 dark:border-slate-700">
            <h3 className="font-black">{questionIndex + 1}. {question.question}</h3>
            <div className="mt-3 grid gap-2">
              {question.options.map((option, index) => {
                const chosen = answers[question.id] === index;
                const answered = answers[question.id] !== undefined;
                const correct = question.correctAnswer === index;
                return (
                  <button
                    key={option}
                    className={`rounded-md border px-3 py-2 text-left text-sm transition ${
                      chosen && correct ? "border-green-600 bg-green-50 dark:bg-green-950/40" : chosen && !correct ? "border-red-600 bg-red-50 dark:bg-red-950/40" : answered && correct ? "border-green-300 bg-green-50 dark:bg-green-950/30" : "border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                    }`}
                    onClick={() => setAnswers({ ...answers, [question.id]: index })}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {answers[question.id] !== undefined && (
              <p className="mt-3 rounded-md bg-slate-100 p-3 text-sm dark:bg-slate-800">
                <strong>{answers[question.id] === question.correctAnswer ? "Correct." : "Needs review."}</strong> {question.explanation}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function FlashcardMode({
  index,
  setIndex,
  showAnswer,
  setShowAnswer,
}: {
  index: number;
  setIndex: (index: number) => void;
  showAnswer: boolean;
  setShowAnswer: (value: boolean) => void;
}) {
  const card = allFlashcards[index % allFlashcards.length];
  return (
    <section className="card border-purple-200 dark:border-purple-900">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-black">Flashcard Mode</h2>
          <p className="text-sm text-slate-500">{card.conditionTitle} | {card.relatedTopic}</p>
        </div>
        <span className={`badge ${badgeTone.revision}`}>{index + 1}/{allFlashcards.length}</span>
      </div>
      <div className="mt-5 grid min-h-[220px] place-items-center rounded-lg border border-purple-200 bg-purple-50 p-6 text-center dark:border-purple-800 dark:bg-purple-950/30">
        <p className="max-w-3xl text-xl font-black leading-8">{showAnswer ? card.back : card.front}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="btn btn-primary" onClick={() => setShowAnswer(!showAnswer)}>{showAnswer ? "Show question" : "Show answer"}</button>
        <button className="btn" onClick={() => { setIndex((index + 1) % allFlashcards.length); setShowAnswer(false); }}>Next</button>
        <button className="btn" onClick={() => { setIndex(Math.floor(Math.random() * allFlashcards.length)); setShowAnswer(false); }}>Random</button>
      </div>
    </section>
  );
}

function SavedConditions({ ids, title, openCondition, exportNotes }: { ids: string[]; title: string; openCondition: (condition: Condition) => void; exportNotes: () => void }) {
  const saved = ids.map((id) => conditions.find((condition) => condition.id === id)).filter(Boolean) as Condition[];
  return (
    <section className="space-y-4">
      <div className="card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black">{title}</h2>
          <p className="text-sm text-slate-500">Saved locally on this device.</p>
        </div>
        <button className="btn" onClick={exportNotes}>
          <Download size={18} /> Export notes
        </button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {saved.length ? saved.map((condition) => (
          <button key={condition.id} className="card text-left hover:border-blue-400" onClick={() => openCondition(condition)}>
            <h3 className="font-black">{condition.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{condition.specialty} | {condition.priority}</p>
          </button>
        )) : <p className="text-sm text-slate-500">Nothing saved yet.</p>}
      </div>
    </section>
  );
}

function SourceRegistry({ items }: { items: SourceReference[] }) {
  return (
    <section className="space-y-4">
      <article className="card">
        <h2 className="text-2xl font-black">Sources and References</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Source entries are stored as data objects so each condition, medication, treatment, investigation, red flag, outcome measure and case can link back to references. Placeholder entries should be replaced during clinical governance review.
        </p>
      </article>
      <div className="grid gap-3 lg:grid-cols-2">
        {items.map((source) => (
          <article key={source.id} className="card">
            <div className="flex flex-wrap gap-2">
              <span className={`badge ${source.confidenceLevel === "High" ? badgeTone.education : source.confidenceLevel === "Moderate" ? badgeTone.caution : badgeTone.revision}`}>{source.confidenceLevel}</span>
              <span className="badge bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">{source.sourceType}</span>
            </div>
            <h3 className="mt-3 text-lg font-black">{source.sourceName}</h3>
            <p className="mt-1 text-sm text-slate-500">{source.authorOrOrganisation} | {source.year}</p>
            <p className="mt-2 text-sm leading-6">{source.notes}</p>
            {source.link !== "#" && (
              <a className="mt-3 inline-flex text-sm font-bold text-blue-700 underline dark:text-blue-300" href={source.link} target="_blank" rel="noreferrer">
                Open source
              </a>
            )}
            <p className="mt-2 text-xs text-slate-500">Last reviewed in app: {source.dateLastReviewed}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SourceChips({ ids }: { ids: string[] }) {
  const sources = ids.map((id) => sourceReferences.find((source) => source.id === id)).filter(Boolean) as SourceReference[];
  return (
    <div className="flex flex-wrap gap-2">
      {sources.map((source) => (
        <a key={source.id} className="badge bg-blue-100 text-blue-800 underline dark:bg-blue-950 dark:text-blue-100" href={source.link === "#" ? undefined : source.link} target="_blank" rel="noreferrer">
          {source.sourceName}
        </a>
      ))}
    </div>
  );
}

export default App;
