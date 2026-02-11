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
  startedAt: number | null;
  completedAt: number | null;
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
    shuffleOrder: null,
    startedAt: null,
    completedAt: null,
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

export function getGuessScore(state: GameState): number {
  return state.scores.reduce((sum, s) => sum + s.points, 0);
}

export function getMaxGuessScore(): number {
  return STOPS.length * SCORE_LEVELS[0].points;
}

// Time bonus brackets: every 5 minutes reduces the bonus
// Max time bonus equals max guess score so each is 50% of final score
const TIME_BRACKETS: { maxMinutes: number; points: number }[] = [
  { maxMinutes: 5, points: 700 },
  { maxMinutes: 10, points: 600 },
  { maxMinutes: 15, points: 500 },
  { maxMinutes: 20, points: 400 },
  { maxMinutes: 25, points: 300 },
  { maxMinutes: 30, points: 200 },
  { maxMinutes: 35, points: 100 },
];
const TIME_BONUS_MIN = 50;

export function getMaxTimeBonus(): number {
  return TIME_BRACKETS[0].points;
}

export function computeTimeBonus(elapsedMs: number): { points: number; label: string; bracket: string } {
  const minutes = elapsedMs / 60000;
  for (const b of TIME_BRACKETS) {
    if (minutes <= b.maxMinutes) {
      return {
        points: b.points,
        label: b.points === TIME_BRACKETS[0].points ? 'Temps parfait !' : 'Bon rythme !',
        bracket: `< ${b.maxMinutes} min`,
      };
    }
  }
  return { points: TIME_BONUS_MIN, label: 'Promenade tranquille', bracket: '> 35 min' };
}

export function getElapsedMs(state: GameState): number {
  if (!state.startedAt) return 0;
  const end = state.completedAt || Date.now();
  return end - state.startedAt;
}

export function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function getTotalScore(state: GameState): number {
  return getGuessScore(state) + computeTimeBonus(getElapsedMs(state)).points;
}

export function getMaxScore(): number {
  return getMaxGuessScore() + getMaxTimeBonus();
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

export function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
