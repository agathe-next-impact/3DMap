'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { STOPS } from '@/lib/stops';
import { generateSceneSVG } from '@/lib/svg-scenes';
import {
  GameState,
  loadState,
  saveState,
  createInitialState,
  shuffleArray,
  computeScore,
  getTotalScore,
  getMaxScore,
  getFinalLevel,
  renderStars,
  SCORE_LEVELS,
} from '@/lib/game-state';

const LeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false });

type Screen = 'welcome' | 'clue' | 'map' | 'reveal' | 'end';

export default function JeuDePiste() {
  const [gs, setGs] = useState<GameState | null>(null);
  const [screen, setScreen] = useState<Screen>('welcome');
  const [prevScreen, setPrevScreen] = useState<string>('clue');
  const [transitioning, setTransitioning] = useState(false);
  const [arrivalModal, setArrivalModal] = useState<{ text: string } | null>(null);
  const [wrongModal, setWrongModal] = useState<string | null>(null);
  const [revealIdx, setRevealIdx] = useState(0);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBar, setShowInstallBar] = useState(false);
  const installDismissed = useRef(false);
  const screenKey = useRef(0);

  // Load state on mount
  useEffect(() => {
    const state = loadState();
    setGs(state);
    if (state.completed) {
      setScreen('end');
    } else if (state.started) {
      setScreen('clue');
    } else {
      setScreen('welcome');
    }
    // Check install dismiss
    installDismissed.current = localStorage.getItem('pwaInstallDismissed') === '1';
  }, []);

  // PWA install prompt
  useEffect(() => {
    const isMobileOrTablet = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      || (navigator.maxTouchPoints > 0 && window.matchMedia('(max-width: 1024px)').matches);
    if (!isMobileOrTablet) return;
    const handler = (e: Event) => {
      e.preventDefault();
      const evt = e as BeforeInstallPromptEvent;
      setInstallPrompt(evt);
      if (!installDismissed.current) setShowInstallBar(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    const installed = () => { setShowInstallBar(false); setInstallPrompt(null); };
    window.addEventListener('appinstalled', installed);
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', installed);
    };
  }, []);

  // SW registration
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  // Persist state changes
  const update = useCallback((fn: (s: GameState) => GameState) => {
    setGs((prev) => {
      const next = fn(prev ?? createInitialState());
      saveState(next);
      return next;
    });
  }, []);

  const navigate = useCallback((to: Screen) => {
    setTransitioning(true);
    setTimeout(() => {
      setScreen((current) => {
        if (current !== 'map') setPrevScreen(current);
        return to;
      });
      screenKey.current += 1;
      setTransitioning(false);
    }, 250);
  }, []);

  // Loading
  if (!gs) return null;
  // Non-null alias for use in closures (safe because of early return above)
  const state = gs;

  const order = state.shuffleOrder || STOPS.map((_, i) => i);
  const currentStopIdx = state.shuffleOrder ? state.shuffleOrder[state.currentIndex] : state.currentIndex;
  const currentStopData = STOPS[currentStopIdx];

  // Scoring helpers
  const total = getTotalScore(state);
  const max = getMaxScore();
  const visited = state.visitedIndices.length;

  // --- Handlers ---
  function startGame() {
    update((s) => ({
      ...s,
      started: true,
      shuffleOrder: shuffleArray(STOPS.map((_, i) => i)),
    }));
    navigate('clue');
  }

  function tryGuess(idx: number) {
    const targetIdx = state.shuffleOrder ? state.shuffleOrder[state.currentIndex] : state.currentIndex;
    const newAttempts = state.attempts + 1;

    if (idx === targetIdx) {
      const score = computeScore(newAttempts);
      const newVisited = state.visitedIndices.includes(idx) ? state.visitedIndices : [...state.visitedIndices, idx];
      const newScores = [...state.scores, { stopIndex: idx, attempts: newAttempts, points: score.points, stars: score.stars }];
      update((s) => ({ ...s, attempts: newAttempts, visitedIndices: newVisited, scores: newScores }));
      const stop = STOPS[idx];
      setArrivalModal({
        text: `Bravo ! Vous avez trouve <strong>${stop.name}</strong>${newAttempts === 1 ? ' du premier coup !' : ` en ${newAttempts} tentatives.`}<br><br>
          <div class="score-stars">${renderStars(score.stars)}</div>
          <strong>+${score.points} pts</strong> &mdash; ${score.label}`,
      });
    } else {
      update((s) => ({
        ...s,
        attempts: newAttempts,
        wrongGuesses: [...s.wrongGuesses, idx],
      }));
      const wrongStop = STOPS[idx];
      setWrongModal(`"${wrongStop.name}" ne correspond pas a l'indice. Relisez bien et essayez un autre point !`);
    }
    navigate('map');
  }

  function revealCurrentPoint() {
    setArrivalModal(null);
    setRevealIdx(currentStopIdx);
    navigate('reveal');
  }

  function nextClue() {
    if (state.currentIndex < STOPS.length - 1) {
      update((s) => ({
        ...s,
        currentIndex: s.currentIndex + 1,
        wrongGuesses: [],
        attempts: 0,
      }));
      navigate('clue');
    } else {
      finishGame();
    }
  }

  function finishGame() {
    update((s) => ({ ...s, completed: true }));
    navigate('end');
  }

  function resetGame() {
    const fresh = createInitialState();
    saveState(fresh);
    setGs(fresh);
    navigate('welcome');
  }

  function closeWrongModal() {
    setWrongModal(null);
  }

  function goToClue() {
    closeWrongModal();
    navigate('clue');
  }

  const ordinals = ['Premier', 'Deuxieme', 'Troisieme', 'Quatrieme', 'Cinquieme', 'Sixieme', 'Septieme'];
  const clueTitle = state.currentIndex === STOPS.length - 1
    ? 'Dernier indice'
    : (ordinals[state.currentIndex] || `Indice ${state.currentIndex + 1}`) + ' indice';

  // Top offset calculation
  const hasInstallBar = showInstallBar;
  const hasScoreBar = state.started && screen !== 'welcome' && screen !== 'end';
  const topOffset = (hasInstallBar ? 36 : 0) + (hasScoreBar ? 30 : 0);

  return (
    <>
      {/* PWA Install Banner */}
      {showInstallBar && (
        <div className="pwa-install-bar visible">
          <span className="pwa-text">{'\u{1F4F2}'} Installer l&apos;application</span>
          <button className="pwa-btn" onClick={() => {
            if (!installPrompt) return;
            installPrompt.prompt();
            installPrompt.userChoice.then(() => {
              setInstallPrompt(null);
              setShowInstallBar(false);
            });
          }}>Installer</button>
          <button className="pwa-close" onClick={() => {
            setShowInstallBar(false);
            localStorage.setItem('pwaInstallDismissed', '1');
          }} aria-label="Fermer">{'\u{2715}'}</button>
        </div>
      )}

      {/* Score Bar */}
      {hasScoreBar && (
        <div className="score-bar visible" style={hasInstallBar ? { top: 36 } : undefined}>
          <div className="sb-score">
            <span className="sb-pts">{total}</span>
            <span className="sb-max">/ {max} pts</span>
          </div>
          <div className="sb-divider" />
          <div className="sb-stars" dangerouslySetInnerHTML={{
            __html: renderStars(visited > 0 ? Math.round((total / (visited * SCORE_LEVELS[0].points)) * 3) : 0)
          }} />
          <div className="sb-divider" />
          <span className="sb-step">
            {state.completed ? 'Termine !' : `Etape ${state.currentIndex + 1}/${STOPS.length}`}
          </span>
        </div>
      )}

      {/* ── WELCOME ── */}
      {screen === 'welcome' && (
        <div id="welcome" className={`screen active${transitioning ? ' screen-exit' : ' screen-enter'}`} key={`welcome-${screenKey.current}`}>
          <div className="welcome-icon stagger-1">{'\u{1F3F0}'}</div>
          <h1 className="stagger-2">Jeu de Piste</h1>
          <p className="subtitle stagger-3">
            Explorez l&apos;Hermitage et la foret de Laigue a travers un parcours de
            decouverte. Retrouvez chaque lieu grace aux indices et percez ses secrets !
          </p>
          <div className="welcome-stats stagger-4">
            <div className="welcome-stat">
              <span className="num">7</span>
              <span className="label">Etapes</span>
            </div>
            <div className="welcome-stat">
              <span className="num">~2 km</span>
              <span className="label">Parcours</span>
            </div>
          </div>
          <button className="btn btn-primary stagger-5" onClick={startGame}>
            Commencer l&apos;aventure {'\u{2794}'}
          </button>
          <div className="stagger-6" style={{ marginTop: '1rem' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => navigate('map')}>
              {'\u{1F5FA}'} Voir la carte
            </button>
          </div>
        </div>
      )}

      {/* ── CLUE ── */}
      {screen === 'clue' && (
        <div id="clue-screen" className={`screen active${transitioning ? ' screen-exit' : ' screen-enter'}`} key={`clue-${screenKey.current}`}>
          <div className="clue-header" style={{ top: topOffset }}>
            <span className="step-badge">Etape {state.currentIndex + 1}/{STOPS.length}</span>
            <div className="progress-dots">
              {order.map((stopIdx, step) => {
                let cls = 'progress-dot';
                if (state.visitedIndices.includes(stopIdx)) cls += ' done';
                else if (step === state.currentIndex) cls += ' current';
                return <div key={step} className={cls} />;
              })}
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('map')}>
              {'\u{1F5FA}'} Carte
            </button>
          </div>
          <div className="clue-image-container stagger-1">
            <div dangerouslySetInnerHTML={{ __html: generateSceneSVG(currentStopData).replace('class="svg-scene"', 'class="svg-scene clue-image blurred"') }} />
            <div className="clue-image-overlay">
              <div className="lock-icon">{'\u{1F50D}'}</div>
            </div>
          </div>
          <div className="clue-body">
            <h2 className="clue-title stagger-2">{clueTitle}</h2>
            <div className="clue-text stagger-3"><p>{currentStopData.clueText}</p></div>
            <p className="clue-hint stagger-4">{currentStopData.clueHint}</p>
            {state.attempts > 0 && (
              <div className="attempts-counter stagger-4">
                {'\u{1F3AF}'} Tentatives : <strong>{state.attempts}</strong>
              </div>
            )}
            <div className="clue-actions stagger-5">
              <button className="btn btn-primary" onClick={() => navigate('map')}>
                {'\u{1F5FA}'} Voir la carte
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MAP ── */}
      {screen === 'map' && (
        <div id="map-screen" className={`screen active${transitioning ? ' screen-exit' : ' screen-enter'}`} key={`map-${screenKey.current}`}>
          <div className="map-header" style={{ marginTop: topOffset }}>
            <button className="btn btn-outline btn-sm" onClick={() => navigate(prevScreen as Screen)}>
              {'\u{2190}'} Retour
            </button>
            <h2>Carte du parcours</h2>
            <span className="step-badge">{state.currentIndex + 1}/{STOPS.length}</span>
          </div>
          <LeafletMap
            gameState={state}
            previousScreen={prevScreen}
            onTryGuess={tryGuess}
            onShowReveal={(idx) => { setRevealIdx(idx); navigate('reveal'); }}
            onGoBack={() => navigate(prevScreen as Screen)}
            onGoToClue={() => navigate('clue')}
            onStartGame={startGame}
          />
          <div className="map-legend">
            <div className="legend-item"><div className="legend-dot visited" /><span>Decouvert</span></div>
            <div className="legend-item"><div className="legend-dot locked" /><span>A trouver</span></div>
          </div>
        </div>
      )}

      {/* ── REVEAL ── */}
      {screen === 'reveal' && (() => {
        const stop = STOPS[revealIdx];
        const isLast = state.currentIndex >= STOPS.length - 1;
        return (
          <div id="reveal-screen" className={`screen active${transitioning ? ' screen-exit' : ' screen-enter'}`} key={`reveal-${screenKey.current}`}>
            <div className="reveal-image-container reveal-unveil" style={{ position: 'relative' }}>
              <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                dangerouslySetInnerHTML={{ __html: generateSceneSVG(stop) }} />
              <div className="reveal-badge stagger-2">{'\u{2714}'} Decouvert</div>
            </div>
            <div className="reveal-body" style={{ paddingTop: `calc(1.5rem + ${topOffset}px)` }}>
              <span className="reveal-category stagger-2">{stop.categoryIcon} {stop.category}</span>
              <h2 className="stagger-3">{stop.name}</h2>
              <p className="reveal-description stagger-4">{stop.description}</p>
              <div className="reveal-history stagger-5">
                <h3>{'\u{1F4DC}'} Histoire</h3>
                <p>{stop.history}</p>
              </div>
              <div className="reveal-actions stagger-6">
                <button className="btn btn-outline" onClick={() => navigate('map')}>
                  {'\u{1F5FA}'} Voir la carte
                </button>
                <button className="btn btn-primary" onClick={isLast ? finishGame : nextClue}>
                  {isLast ? <>Terminer le parcours {'\u{1F389}'}</> : <>Indice suivant {'\u{2794}'}</>}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── END ── */}
      {screen === 'end' && (() => {
        const level = getFinalLevel(total, max);
        return (
          <div id="end-screen" className={`screen active${transitioning ? ' screen-exit' : ' screen-enter'}`} key={`end-${screenKey.current}`}>
            <div className="end-icon stagger-1">{'\u{1F3C6}'}</div>
            <h1 className="stagger-2">Parcours termine !</h1>
            <p className="subtitle stagger-3">Vous avez explore tous les lieux du domaine de l&apos;Hermitage.</p>
            <div className="end-total-score stagger-4">
              <span className="total-pts">{total} / {max} pts</span>
              <span className="total-max" dangerouslySetInnerHTML={{ __html: renderStars(Math.round(total / max * 3)) }} />
              <span className={`end-level ${level.cls}`}>{level.label}</span>
            </div>
            <div className="end-recap">
              {order.map((stopIdx, i) => {
                const s = STOPS[stopIdx];
                const stopScore = state.scores.find((sc) => sc.stopIndex === stopIdx);
                return (
                  <div key={stopIdx} className="end-recap-item" style={{ animationDelay: `${0.4 + i * 0.1}s` }}>
                    <span className="emoji">{s.emoji}</span>
                    <span className="name">{s.name}</span>
                    {stopScore && (
                      <span className="score-inline"
                        dangerouslySetInnerHTML={{
                          __html: `<span class="stars">${renderStars(stopScore.stars)}</span><span class="pts">${stopScore.points} pts</span>`
                        }} />
                    )}
                  </div>
                );
              })}
            </div>
            <button className="btn btn-primary stagger-6" onClick={resetGame} style={{ marginTop: '1.5rem' }}>
              Recommencer {'\u{1F504}'}
            </button>
          </div>
        );
      })()}

      {/* ── ARRIVAL MODAL ── */}
      {arrivalModal && (
        <div className="modal-overlay active">
          <div className="modal modal-success">
            <div className="modal-icon bounce-in">{'\u{1F389}'}</div>
            <h3>Vous etes arrive !</h3>
            <p dangerouslySetInnerHTML={{ __html: arrivalModal.text }} />
            <button className="btn btn-success" onClick={revealCurrentPoint}>
              Decouvrir ce lieu {'\u{2794}'}
            </button>
          </div>
        </div>
      )}

      {/* ── WRONG MODAL ── */}
      {wrongModal && (
        <div className="modal-overlay active">
          <div className="modal modal-wrong shake-in">
            <div className="modal-icon">{'\u{274C}'}</div>
            <h3>Ce n&apos;est pas le bon lieu !</h3>
            <p>{wrongModal}</p>
            <button className="btn btn-outline" onClick={closeWrongModal}>
              Reessayer sur la carte
            </button>
            <div style={{ marginTop: '0.6rem' }}>
              <button className="btn btn-primary btn-sm" onClick={goToClue}>
                {'\u{1F50D}'} Revoir l&apos;indice
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Type for beforeinstallprompt
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: string }>;
}
