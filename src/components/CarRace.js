import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CARS } from './Cars';
import Podium from './Podium';
import '../styles/CarRace.css';

const CarLane = ({ car, duration, racing, winner }) => {
  const { Component } = car;
  const status = winner ? (winner.name === car.name ? 'winner' : 'loser') : null;

  return (
    <div className="track-lane">
      <div
        className={`car ${racing ? 'running' : ''} ${status || ''}`}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="car-inner">
          <Component status={status} />
        </div>

        <AnimatePresence>
          {status === 'winner' && (
            <motion.div
              key="win"
              className="status-overlay winner-overlay"
              initial={{ scale: 0, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 14 }}
            >
              <span className="trophy">🏆</span>
              <span className="status-text win-text">¡GANADOR!</span>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.span
                  key={i}
                  className="sparkle"
                  style={{
                    left: `${10 + i * 16}%`,
                    top: i % 2 ? '-12px' : '12px',
                  }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
                >
                  ✨
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const CarRace = () => {
  const [racing, setRacing] = useState(false);
  const [winner, setWinner] = useState(null);
  const [ranking, setRanking] = useState(null);
  const [showPodium, setShowPodium] = useState(false);
  const [durations, setDurations] = useState(() => CARS.map(() => 4));
  const winnerTimeoutRef = useRef(null);
  const podiumTimeoutRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => () => {
    clearTimeout(winnerTimeoutRef.current);
    clearTimeout(podiumTimeoutRef.current);
  }, []);

  // Mide el ancho real del carril para que el carro corra hasta la línea de meta
  // (antes usaba 100vw, lo que sacaba el carro fuera del popup centrado)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const updateDistance = () => {
      const lane = track.querySelector('.track-lane');
      if (!lane) return;
      // El carro inicia en left:12 con ancho ~150 (~120 mobile). La meta está a right:16-30.
      // Distancia que debe recorrer ≈ ancho_lane − ancho_carro − 35 de margen
      const carWidth = window.innerWidth < 600 ? 120 : 150;
      const distance = Math.max(lane.offsetWidth - carWidth - 35, 100);
      track.style.setProperty('--lane-distance', `${distance}px`);
    };
    updateDistance();
    const ro = new ResizeObserver(updateDistance);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  const isRunning = racing && !winner;

  const startRace = () => {
    if (isRunning) return;
    clearTimeout(winnerTimeoutRef.current);
    clearTimeout(podiumTimeoutRef.current);
    setRacing(false);
    setWinner(null);
    setRanking(null);
    setShowPodium(false);

    setTimeout(() => {
      const newDurations = CARS.map(() => +(3 + Math.random() * 3).toFixed(2));
      setDurations(newDurations);
      setRacing(true);

      const sortedRanking = newDurations
        .map((d, i) => ({ car: CARS[i], duration: d }))
        .sort((a, b) => a.duration - b.duration);

      const minDuration = sortedRanking[0].duration;

      winnerTimeoutRef.current = setTimeout(() => {
        setWinner(sortedRanking[0].car);
        setRanking(sortedRanking);
        // Espera a que se aprecien las animaciones de win/loss antes del podio
        podiumTimeoutRef.current = setTimeout(() => setShowPodium(true), 1800);
      }, minDuration * 1000);
    }, 80);
  };

  return (
    <div className="race-section">
      <button onClick={startRace} className="race-btn" disabled={isRunning}>
        {isRunning
          ? '🏎️ Corriendo...'
          : winner
          ? '🔄 Otra carrera'
          : '🏁 ¡Iniciar carrera!'}
      </button>

      <AnimatePresence>
        {winner && (
          <motion.div
            key="winner-banner"
            className="winner-banner"
            initial={{ scale: 0, rotate: -8, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 14 }}
          >
            🏆 ¡Ganó <strong>{winner.label}</strong>!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="race-track" ref={trackRef}>
        {CARS.map((car, i) => (
          <CarLane
            key={car.name}
            car={car}
            duration={durations[i]}
            racing={racing}
            winner={winner}
          />
        ))}
      </div>

      {showPodium && ranking && (
        <Podium ranking={ranking} onClose={() => setShowPodium(false)} />
      )}
    </div>
  );
};

export default CarRace;
