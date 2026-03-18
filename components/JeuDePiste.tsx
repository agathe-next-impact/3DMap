'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { STOPS } from '@/lib/stops';
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

type Screen = 'welcome' | 'instructions' | 'clue' | 'map' | 'reveal' | 'end';

// Smooth cubic-bezier for natural motion
const smooth = [0.25, 0.1, 0.25, 1] as const;
const snappy = [0.4, 0, 0.2, 1] as const;

// Only opacity + GPU-accelerated transforms, no layout-triggering props
const fadeSlideUp = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const fadeOnly = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function JeuDePiste() {
  const [gs, setGs] = useState<GameState | null>(null);
  const [screen, setScreen] = useState<Screen>('welcome');
  const [prevScreen, setPrevScreen] = useState<string>('clue');
  const [arrivalModal, setArrivalModal] = useState<{ text: string } | null>(null);
  const [wrongModal, setWrongModal] = useState<string | null>(null);
  const [revealIdx, setRevealIdx] = useState(0);
  const [isReview, setIsReview] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBar, setShowInstallBar] = useState(false);
  const installDismissed = useRef(false);
  const hintRef = useRef<HTMLDivElement>(null);
  const [hintHeight, setHintHeight] = useState(0);

  // Measure hint content height for smooth animation
  useEffect(() => {
    if (hintRef.current) {
      setHintHeight(hintRef.current.scrollHeight);
    }
  }, [showHint, gs]);

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
    if (to === 'clue') setShowHint(false);
    setScreen((current) => {
      if (current !== 'map') setPrevScreen(current);
      return to;
    });
    window.scrollTo(0, 0);
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
    const firstIdx = STOPS.findIndex((s) => s.id === 'grande-maison');
    const lastIdx = STOPS.findIndex((s) => s.id === 'mere-mitage');
    const middle = STOPS.map((_, i) => i).filter((i) => i !== firstIdx && i !== lastIdx);
    const order = [firstIdx, ...shuffleArray(middle), lastIdx];
    update((s) => ({
      ...s,
      started: true,
      shuffleOrder: order,
    }));
    navigate('instructions');
  }

  function startFirstStop() {
    // Grande maison: no clue/guessing, auto-validate and show reveal directly
    const stopIdx = state.shuffleOrder ? state.shuffleOrder[state.currentIndex] : state.currentIndex;
    const score = computeScore(1);
    update((s) => ({
      ...s,
      attempts: 1,
      visitedIndices: [...s.visitedIndices, stopIdx],
      scores: [...s.scores, { stopIndex: stopIdx, attempts: 1, points: score.points, stars: score.stars }],
    }));
    setIsReview(false);
    setRevealIdx(stopIdx);
    navigate('reveal');
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
      setWrongModal("Ce n'est pas le bon lieu ! Relisez bien l'indice et essayez un autre point !");
    }
    navigate('map');
  }

  function revealCurrentPoint() {
    setArrivalModal(null);
    setIsReview(false);
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

  const clueTitle = state.currentIndex === STOPS.length - 1
    ? 'Dernier indice'
    : `Indice ${state.currentIndex + 1}`;

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
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* ── WELCOME ── */}
        {screen === 'welcome' && (
          <motion.div
            key="welcome"
            id="welcome"
            className="screen active"
            {...fadeSlideUp}
            transition={{ duration: 0.3, ease: smooth }}
          >
            <div className="welcome-icon">{'\u{1F3F0}'}</div>
            <h1> L’HERMITAGE, TOUTE UNE HISTOIRE !</h1>
            <p className="subtitle">
              {"Bienvenue \u00e0 l\u2019Hermitage, un lieu charg\u00e9 d\u2019Histoire(s). Nous vous proposons d\u2019aller \u00e0 la recherche des traces laiss\u00e9es par le temps sur le site\u00a0: autant d\u2019indices pour d\u00e9couvrir l\u2019histoire du domaine et des personnes qui l\u2019ont fa\u00e7onn\u00e9. Votre voyage \u00e0 l\u2019Hermitage commence maintenant\u00a0!"}
            </p>
            <div className="welcome-stats">
              <motion.div
                className="welcome-stat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.25, ease: smooth }}
              >
                <span className="num">{STOPS.length}</span>
                <span className="label">Etapes</span>
              </motion.div>
              <motion.div
                className="welcome-stat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.25, ease: smooth }}
              >
                <span className="num">~2 km</span>
                <span className="label">Parcours</span>
              </motion.div>
            </div>
            <motion.button className="btn btn-primary" onClick={startGame} whileTap={{ scale: 0.97 }}>
              {"Commencer l\u2019aventure"} {'\u{2794}'}
            </motion.button>
            <div style={{ marginTop: '1rem' }}>
              <motion.button className="btn btn-secondary btn-sm" onClick={() => navigate('map')} whileTap={{ scale: 0.97 }}>
                {'\u{1F5FA}'} Voir la carte
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ── INSTRUCTIONS ── */}
        {screen === 'instructions' && (
          <motion.div
            key="instructions"
            id="instructions"
            className="screen active"
            {...fadeSlideUp}
            transition={{ duration: 0.3, ease: smooth }}
          >
            <div className="welcome-icon"></div>
            <h1>Instructions</h1>
            <div className="instructions-list">
              <div className="instruction-item">
                <span className="instruction-num">{'\u{1F3E0}'}</span>
                <p>Votre premier indice se trouve devant la <strong>grande maison</strong>, amusez-vous bien et soyez vigilant, l{'\u2019'}Histoire est pleine de rebondissements.</p>
              </div>
              <div className="instruction-item">
                <span className="instruction-num">{'\u{1F4F1}'}</span>
                <p>Pour trouver vos indices, cherchez les <strong>QR-codes</strong>, scannez-les, entrez le num{'\u00e9'}ro de votre {'\u00e9'}quipe et mettez en route vos jambes et vos m{'\u00e9'}ninges.</p>
              </div>
              <div className="instruction-item">
                <span className="instruction-num">{'\u{1F91D}'}</span>
                <p><strong>{'\u00C9'}changez les r{'\u00f4'}les</strong> dans l{'\u2019'}{'\u00e9'}quipe, tout le monde peut scanner et r{'\u00e9'}fl{'\u00e9'}chir{'\u00a0'}!</p>
              </div>
            </div>
            <div className="instructions-tip">
              <strong>{'\u{1F4DE}'} Num{'\u00e9'}ro d{'\u2019'}urgence</strong> : 06.34.50.29.63
            </div>
            <motion.button className="btn btn-primary" onClick={startFirstStop} whileTap={{ scale: 0.97 }}>
              {"C\u2019est parti !"} {'\u{2794}'}
            </motion.button>
          </motion.div>
        )}

        {/* ── CLUE ── */}
        {screen === 'clue' && (
          <motion.div
            key={'clue-' + state.currentIndex}
            id="clue-screen"
            className="screen active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: snappy }}
          >
            <div className="clue-header" style={{ top: topOffset }}>
              <span className="step-badge">Etape {state.currentIndex + 1}/{STOPS.length}</span>
              <div className="progress-dots">
                {order.map((stopIdx: number, step: number) => {
                  let cls = 'progress-dot';
                  if (state.visitedIndices.includes(stopIdx)) cls += ' done';
                  else if (step === state.currentIndex) cls += ' current';
                  return <div key={step} className={cls} />;
                })}
              </div>
              <motion.button className="btn btn-outline btn-sm" onClick={() => navigate('map')} whileTap={{ scale: 0.97 }}>
                {'\u{1F5FA}'} Carte
              </motion.button>
            </div>
            <div className="clue-image-container">
              <img src={currentStopData.image} alt="Image indice - lieu a decouvrir" className="clue-image blurred" />
              <div className="clue-image-overlay" />
            </div>
            <motion.div
              className="clue-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.25, ease: smooth }}
            >
              <h2 className="clue-title">{clueTitle}</h2>
              <div className="clue-text"><p>{currentStopData.clueText}</p></div>
              {currentStopData.clueHint && (
                <motion.button
                  className="btn btn-outline btn-sm"
                  style={{ border: 'none' }}
                  onClick={() => setShowHint(!showHint)}
                  whileTap={{ scale: 0.97 }}
                >
                  {showHint ? "Masquer l\u2019aide" : "Besoin d\u2019aide ?"}
                </motion.button>
              )}
              {currentStopData.clueHint && (
                <motion.div
                  initial={false}
                  animate={{
                    height: showHint ? hintHeight : 0,
                    opacity: showHint ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: snappy }}
                  style={{ overflow: 'hidden' }}
                >
                  <div ref={hintRef}>
                    <p className="clue-hint">{currentStopData.clueHint}</p>
                  </div>
                </motion.div>
              )}
              {state.attempts > 0 && (
                <div className="attempts-counter">
                  {'\u{1F3AF}'} Tentatives : <strong>{state.attempts}</strong>
                </div>
              )}
              <div className="clue-actions">
                <motion.button className="btn btn-primary" onClick={() => navigate('map')} whileTap={{ scale: 0.97 }}>
                  {'\u{1F5FA}'} Voir la carte
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ── MAP ── */}
        {screen === 'map' && (
          <motion.div
            key="map"
            id="map-screen"
            className="screen active"
            {...fadeOnly}
            transition={{ duration: 0.2, ease: snappy }}
          >
            <div className="map-header" style={{ marginTop: topOffset }}>
              <motion.button className="btn btn-outline btn-sm" onClick={() => navigate(prevScreen as Screen)} whileTap={{ scale: 0.97 }}>
                {'\u{2190}'} Retour
              </motion.button>
              <h2>Carte du parcours</h2>
              <span className="step-badge">{state.currentIndex + 1}/{STOPS.length}</span>
            </div>
            <LeafletMap
              gameState={state}
              previousScreen={prevScreen}
              onTryGuess={tryGuess}
              onShowReveal={(idx) => { setIsReview(true); setRevealIdx(idx); navigate('reveal'); }}
              onGoBack={() => navigate(prevScreen as Screen)}
              onGoToClue={() => navigate('clue')}
              onStartGame={startGame}
            />
            <div className="map-legend">
              <div className="legend-item"><div className="legend-dot visited" /><span>Decouvert</span></div>
              <div className="legend-item"><div className="legend-dot locked" /><span>A trouver</span></div>
            </div>
          </motion.div>
        )}

        {/* ── REVEAL ── */}
        {screen === 'reveal' && (() => {
          const stop = STOPS[revealIdx];
          const isLast = state.currentIndex >= STOPS.length - 1;
          return (
            <motion.div
              key="reveal"
              id="reveal-screen"
              className="screen active"
              {...fadeOnly}
              transition={{ duration: 0.25, ease: smooth }}
            >
              <div className="reveal-image-container" style={{ position: 'relative' }}>
                <img src={stop.image} alt={stop.name} className="reveal-image" />
                <motion.div
                  className="reveal-badge"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.25, ease: smooth }}
                >
                  {'\u{2714}'} Decouvert
                </motion.div>
              </div>
              <motion.div
                className="reveal-body"
                style={{ paddingTop: `calc(1.5rem + ${topOffset}px)` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3, ease: smooth }}
              >
                <span className="reveal-category">{stop.category}</span>
                <h2>{stop.name}</h2>
                <p className="reveal-description">{stop.description}</p>
                {stop.history && (
                  <div className="reveal-history">
                    <h3>{'\u{1F4DC}'} Bonus</h3>
                    <p>{stop.history}</p>
                  </div>
                )}
                <div className="reveal-actions">
                  {isReview ? (
                    <>
                      <motion.button className="btn btn-primary" onClick={() => navigate('clue')} whileTap={{ scale: 0.97 }}>
                        {'\u{1F50D}'} {"Retour \u00e0 l\u2019indice en cours"}
                      </motion.button>
                      <motion.button className="btn btn-outline btn-sm" style={{ marginTop: '0.5rem' }} onClick={() => navigate('map')} whileTap={{ scale: 0.97 }}>
                        {'\u{1F5FA}'} Retour {'\u00e0'} la carte
                      </motion.button>
                    </>
                  ) : (
                    <motion.button className="btn btn-primary" onClick={isLast ? finishGame : nextClue} whileTap={{ scale: 0.97 }}>
                      {isLast ? <>{"Terminer le parcours"} {'\u{1F389}'}</> : <>{"Indice suivant"} {'\u{2794}'}</>}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })()}

        {/* ── END ── */}
        {screen === 'end' && (() => {
          const level = getFinalLevel(total, max);
          return (
            <motion.div
              key="end"
              id="end-screen"
              className="screen active"
              {...fadeSlideUp}
              transition={{ duration: 0.35, ease: smooth }}
            >
              <motion.div
                className="end-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3, ease: smooth }}
              >
                {'\u{1F3C6}'}
              </motion.div>
              <h1>Parcours termine !</h1>
              <p className="subtitle">{"Vous avez explore tous les lieux du domaine de l\u2019Hermitage."}</p>
              <motion.div
                className="end-total-score"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3, ease: smooth }}
              >
                <span className="total-pts">{total} / {max} pts</span>
                <span className="total-max" dangerouslySetInnerHTML={{ __html: renderStars(Math.round(total / max * 3)) }} />
                <span className={`end-level ${level.cls}`}>{level.label}</span>
              </motion.div>
              <div className="end-recap">
                {order.map((stopIdx: number, i: number) => {
                  const s = STOPS[stopIdx];
                  const stopScore = state.scores.find((sc) => sc.stopIndex === stopIdx);
                  return (
                    <motion.div
                      key={stopIdx}
                      className="end-recap-item"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.25 + i * 0.05, duration: 0.2, ease: smooth }}
                    >
                      <span className="emoji">{s.emoji}</span>
                      <span className="name">{s.name}</span>
                      {stopScore && (
                        <span className="score-inline"
                          dangerouslySetInnerHTML={{
                            __html: `<span class="stars">${renderStars(stopScore.stars)}</span><span class="pts">${stopScore.points} pts</span>`
                          }} />
                      )}
                    </motion.div>
                  );
                })}
              </div>
              <motion.button className="btn btn-primary" onClick={resetGame} style={{ marginTop: '1.5rem' }} whileTap={{ scale: 0.97 }}>
                Recommencer {'\u{1F504}'}
              </motion.button>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* ── ARRIVAL MODAL ── */}
      <AnimatePresence>
        {arrivalModal && (
          <motion.div
            className="modal-overlay active"
            {...fadeOnly}
            transition={{ duration: 0.2, ease: snappy }}
          >
            <motion.div
              className="modal"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: smooth }}
            >
              <div className="modal-icon">{'\u{1F389}'}</div>
              <h3>Vous etes arrive !</h3>
              <p dangerouslySetInnerHTML={{ __html: arrivalModal.text }} />
              <motion.button className="btn btn-success" onClick={revealCurrentPoint} whileTap={{ scale: 0.97 }}>
                Decouvrir ce lieu {'\u{2794}'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── WRONG MODAL ── */}
      <AnimatePresence>
        {wrongModal && (
          <motion.div
            className="modal-overlay active"
            {...fadeOnly}
            transition={{ duration: 0.2, ease: snappy }}
          >
            <motion.div
              className="modal modal-wrong"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: smooth }}
            >
              <div className="modal-icon">{'\u{274C}'}</div>
              <h3>{"Ce n\u2019est pas le bon lieu !"}</h3>
              <p>{wrongModal}</p>
              <motion.button className="btn btn-outline" style={{ border: 'none' }} onClick={closeWrongModal} whileTap={{ scale: 0.97 }}>
                Reessayer sur la carte
              </motion.button>
              <div style={{ marginTop: '0.6rem' }}>
                <motion.button className="btn btn-primary btn-sm" onClick={goToClue} whileTap={{ scale: 0.97 }}>
                  {'\u{1F50D}'} {"Revoir l\u2019indice"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Type for beforeinstallprompt
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: string }>;
}
