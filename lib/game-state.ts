import { STOPS } from './stops';

export interface GameState {
  currentIndex: number;
  visitedIndices: number[];
  wrongGuesses: number[];
  attempts: number;
  scores: StopScore[];
  started: boolean;
  completed: boolean;
  shuffleOrder: number[] | null;
}

export interface StopScore {
  stopIndex: number;
  attempts: number;
  points: number;
  stars: number;
}

interface ScoreLevel {
  maxAttempts: number;
  stars: number;
  points: number;
  label: string;
}

const STORAGE_KEY = 'jeuDePiste';

export const SCORE_LEVELS: ScoreLevel[] = [
  { maxAttempts: 1, stars: 3, points: 100, label: 'Parfait !' },
  { maxAttempts: 2, stars: 2, points: 50, label: 'Bien joue !' },
  { maxAttempts: Infinity, stars: 1, points: 25, label: 'Trouve !' }
];

export function createInitialState(): GameState {
  return {
    currentIndex: 0,
    visitedIndices: [],
    wrongGuesses: [],
    attempts: 0,
    scores: [],
    started: false,
    completed: false,
    shuffleOrder: null
  };
}

export function saveState(state: GameState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* ignore quota errors */ }
}

export function loadState(): GameState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const state: GameState = JSON.parse(saved);
      // Reset if shuffleOrder doesn't match current STOPS count (e.g. stops were added/removed)
      if (state.started && state.shuffleOrder && state.shuffleOrder.length !== STOPS.length) {
        return createInitialState();
      }
      if (state.started && !state.shuffleOrder) {
        state.shuffleOrder = STOPS.map((_, i) => i);
      }
      return state;
    }
  } catch { /* ignore parse errors */ }
  return createInitialState();
}

export function shuffleArray(arr: number[]): number[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function computeScore(attempts: number): ScoreLevel {
  for (const level of SCORE_LEVELS) {
    if (attempts <= level.maxAttempts) return { ...level };
  }
  return { ...SCORE_LEVELS[2] };
}

export function getTotalScore(state: GameState): number {
  return state.scores.reduce((sum, s) => sum + s.points, 0);
}

export function getMaxScore(): number {
  return STOPS.length * SCORE_LEVELS[0].points;
}

export function getFinalLevel(total: number, max: number): { label: string; cls: string } {
  const pct = total / max;
  if (pct >= 0.8) return { label: "Explorateur d'elite", cls: 'gold' };
  if (pct >= 0.5) return { label: 'Bon promeneur', cls: 'silver' };
  return { label: 'Apprenti explorateur', cls: 'bronze' };
}

export function renderStars(count: number): string {
  let html = '';
  for (let i = 0; i < 3; i++) {
    html += i < count ? '\u{2B50}' : '<span class="star-off">\u{2B50}</span>';
  }
  return html;
}
