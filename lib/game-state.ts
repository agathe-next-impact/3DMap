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
    completedAt: null
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
  return STOPS.length * SCORE_LEVELS[0].points + 500;
}

export function getFinalLevel(total: number, max: number): { label: string; cls: string } {
  const pct = total / max;
  if (pct >= 0.8) return { label: "Explorateur d'elite", cls: 'gold' };
  if (pct >= 0.5) return { label: 'Bon promeneur', cls: 'silver' };
  return { label: 'Apprenti explorateur', cls: 'bronze' };
}

/** Haversine distance between two GPS points, returns meters */
function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Total path distance in meters following the stop order */
export function getPathDistance(order: number[]): number {
  let dist = 0;
  for (let i = 1; i < order.length; i++) {
    const a = STOPS[order[i - 1]];
    const b = STOPS[order[i]];
    dist += haversineDistance(a.lat, a.lng, b.lat, b.lng);
  }
  return dist;
}

/** Format duration in seconds to "Xh Ymin Zs" or "Ymin Zs" */
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}h ${m.toString().padStart(2, '0')}min`;
  if (m > 0) return `${m}min ${s.toString().padStart(2, '0')}s`;
  return `${s}s`;
}

/** Speed bonus: based on average speed (km/h). 4 km/h = max bonus (500 pts), scales linearly */
export function computeSpeedBonus(distanceMeters: number, durationSeconds: number): number {
  if (durationSeconds <= 0 || distanceMeters <= 0) return 0;
  const speedKmh = (distanceMeters / 1000) / (durationSeconds / 3600);
  // 4 km/h = 500 pts (max), scale linearly below
  const bonus = Math.round(speedKmh * 125);
  return Math.min(Math.max(bonus, 20), 500);
}

export function renderStars(count: number): string {
  let html = '';
  for (let i = 0; i < 3; i++) {
    html += i < count ? '\u{2B50}' : '<span class="star-off">\u{2B50}</span>';
  }
  return html;
}
