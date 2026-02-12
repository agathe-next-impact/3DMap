'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { STOPS } from '@/lib/stops';
import { GameState } from '@/lib/game-state';

interface LeafletMapProps {
  gameState: GameState;
  previousScreen: string;
  onTryGuess: (idx: number) => void;
  onShowReveal: (idx: number) => void;
  onGoBack: () => void;
  onGoToClue: () => void;
  onStartGame: () => void;
}

export default function LeafletMap({
  gameState,
  previousScreen,
  onTryGuess,
  onShowReveal,
  onGoBack,
  onGoToClue,
  onStartGame,
}: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<(L.Marker | L.Polyline)[]>([]);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const watchIdRef = useRef<number | null>(null);

  // Expose callbacks on window for popup onclick (Leaflet popups use raw HTML)
  useEffect(() => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const w = window as any;
    w.__mapTryGuess = onTryGuess;
    w.__mapShowReveal = onShowReveal;
    w.__mapGoBack = onGoBack;
    w.__mapGoToClue = onGoToClue;
    w.__mapStartGame = onStartGame;
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }, [onTryGuess, onShowReveal, onGoBack, onGoToClue, onStartGame]);

  // Init map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      zoomControl: true,
      attributionControl: true,
    }).setView([49.4368, 3.1283], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Geolocation
  useEffect(() => {
    if (!navigator.geolocation || !mapRef.current) return;
    const map = mapRef.current;
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const latlng = L.latLng(latitude, longitude);
        if (userMarkerRef.current) {
          userMarkerRef.current.setLatLng(latlng);
        } else {
          const icon = L.divIcon({
            className: '',
            html: '<div class="user-location"></div>',
            iconSize: [16, 16],
            iconAnchor: [8, 8],
          });
          userMarkerRef.current = L.marker(latlng, { icon, zIndexOffset: 1000 }).addTo(map);
          userMarkerRef.current.bindTooltip('Vous', { direction: 'top', offset: [0, -10] });
        }
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
    return () => {
      if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, []);

  // Update markers whenever game state changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const order = gameState.shuffleOrder || STOPS.map((_, i) => i);
    const isViewOnly = previousScreen === 'reveal';

    // Visited coords in play order
    const visitedCoords: [number, number][] = [];
    order.forEach((si) => {
      if (gameState.visitedIndices.includes(si)) {
        visitedCoords.push([STOPS[si].lat, STOPS[si].lng]);
      }
    });

    STOPS.forEach((stop, i) => {
      const isVisited = gameState.visitedIndices.includes(i);
      const isWrongGuess = gameState.wrongGuesses.includes(i);

      const markerClass = isVisited ? 'marker-visited' : isWrongGuess ? 'marker-wrong-guess' : 'marker-locked';
      const markerContent = isVisited ? '&#x2714;' : isWrongGuess ? '&#x2716;' : '&#x1F512;';

      const icon = L.divIcon({
        className: '',
        html: `<div class="custom-marker ${markerClass}" style="width:32px;height:32px;">${markerContent}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([stop.lat, stop.lng], { icon }).addTo(map);

      let popupHTML = '';
      if (isVisited) {
        popupHTML = `<div class="popup-content">
          <h3>${stop.emoji} ${stop.name}</h3>
          <p>${stop.category}</p>
          <button class="btn btn-success btn-sm" onclick="window.__mapShowReveal(${i})">Revoir le contenu</button>
        </div>`;
      } else if (gameState.completed) {
        popupHTML = `<div class="popup-content">
          <h3>${stop.name}</h3>
          <p>Parcours termine</p>
        </div>`;
      } else if (!gameState.started) {
        popupHTML = `<div class="popup-content">
          <h3>&#x1F512; Lieu mystere</h3>
          <p>Lancez le parcours pour decouvrir ce lieu !</p>
          <button class="btn btn-primary btn-sm" onclick="window.__mapGoBack(); window.__mapStartGame();">
            Commencer l'aventure &#x2794;
          </button>
        </div>`;
      } else if (isViewOnly) {
        popupHTML = `<div class="popup-content">
          <h3>&#x1F512; Lieu mystere</h3>
          <p>Vous devez afficher l'indice suivant</p>
          <button class="btn btn-outline btn-sm" onclick="window.__mapGoBack();">
            &#x2190; Retour
          </button>
        </div>`;
      } else if (isWrongGuess) {
        popupHTML = `<div class="popup-content">
          <h3>&#x2716; Lieu mystere</h3>
          <p>Vous avez deja teste ce lieu, ce n'est pas le bon.</p>
          <button class="btn btn-outline btn-sm" onclick="window.__mapGoToClue();">&#x1F50D; Revoir l'indice</button>
        </div>`;
      } else {
        popupHTML = `<div class="popup-content">
          <h3>&#x1F512; Lieu mystere</h3>
          <p>Est-ce le lieu de l'indice ?</p>
          <button class="btn btn-primary btn-sm" onclick="window.__mapTryGuess(${i})">C'est ici !</button>
        </div>`;
      }

      marker.bindPopup(popupHTML);
      markersRef.current.push(marker);
    });

    // Polyline
    if (visitedCoords.length > 1) {
      const polyline = L.polyline(visitedCoords, {
        color: '#56939f',
        weight: 3,
        opacity: 0.6,
        dashArray: '8, 8',
      }).addTo(map);
      markersRef.current.push(polyline);
    }

    // Center on last discovered pinpoint
    let lastVisited: typeof STOPS[0] | null = null;
    for (let s = order.length - 1; s >= 0; s--) {
      if (gameState.visitedIndices.includes(order[s])) {
        lastVisited = STOPS[order[s]];
        break;
      }
    }
    if (lastVisited) {
      map.setView([lastVisited.lat, lastVisited.lng], 17);
    } else {
      const bounds = L.latLngBounds(STOPS.map((s) => [s.lat, s.lng] as [number, number]));
      map.fitBounds(bounds, { padding: [40, 40] });
    }

    setTimeout(() => map.invalidateSize(), 100);
  }, [gameState, previousScreen]);

  return <div ref={containerRef} id="map-container" style={{ flex: 1, minHeight: 0, position: 'relative', zIndex: 1 }} />;
}
