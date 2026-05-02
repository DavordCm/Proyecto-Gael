import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Countdown from './Countdown';
import CarRace from './CarRace';
import Confetti from 'react-confetti';
import { MuscleCar } from './Cars';
import '../styles/Invitation.css';

const BIRTHDAY_DATE = new Date(2025, 4, 31, 18, 0, 0);
const ENTRANCE_DURATION = 3.2;

const formatDateLabel = (date) =>
  date.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });

const formatTimeLabel = (date) =>
  date.toLocaleTimeString('es-PE', { hour: 'numeric', minute: '2-digit', hour12: true });

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });
  useEffect(() => {
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return size;
};

const Invitation = () => {
  const [arrived, setArrived] = useState(false);
  const [showRace, setShowRace] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsAudioUnlock, setNeedsAudioUnlock] = useState(false);
  const audioRef = useRef(null);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Autoplay: intenta sonar, y si el navegador bloquea, espera al primer gesto del usuario
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setNeedsAudioUnlock(false);
      } catch {
        setNeedsAudioUnlock(true);
      }
    };

    tryPlay();

    // Fallback: cualquier gesto del usuario desbloquea el audio
    const unlockOnGesture = async () => {
      if (!audio.paused) return;
      try {
        await audio.play();
        setIsPlaying(true);
        setNeedsAudioUnlock(false);
      } catch {
        /* no-op */
      }
    };

    window.addEventListener('pointerdown', unlockOnGesture, { once: true });
    window.addEventListener('keydown', unlockOnGesture, { once: true });

    return () => {
      window.removeEventListener('pointerdown', unlockOnGesture);
      window.removeEventListener('keydown', unlockOnGesture);
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
        setNeedsAudioUnlock(false);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch {
      setIsPlaying(false);
    }
  };

  // Trayectoria fluida: 8 keyframes con curvas suaves; el auto se inclina como en una pista real
  const carPath = {
    x: [
      width * 1.25,
      width * 0.55,
      width * 0.32,
      width * 0.12,
      -width * 0.08,
      -width * 0.04,
      width * 0.02,
      0,
    ],
    y: [10, -55, 40, -35, 25, -10, 8, 0],
    rotate: [0, -8, 9, -7, 6, -3, 2, 0],
    scale: [0.85, 0.92, 0.96, 1, 1.02, 1.01, 1, 1],
  };

  return (
    <div className="stage">
      <div className="stage-bg" aria-hidden="true">
        <div className="stage-line stage-line-top" />
        <div className="stage-line stage-line-bottom" />
        <div className="stage-vignette" />
      </div>

      {arrived && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={220}
          recycle={false}
          gravity={0.25}
          colors={['#ff0033', '#00ff66', '#3399ff', '#ffd700', '#ffa500', '#ffffff']}
        />
      )}

      <audio ref={audioRef} src="/HotWheels.mp3" loop preload="auto" />

      {/* Auto que entra haciendo curvas */}
      <div className="entrance-anchor">
        <motion.div
          className="entrance-car running"
          initial={{ x: width * 1.25, y: 10, rotate: 0, scale: 0.85 }}
          animate={carPath}
          transition={{
            duration: ENTRANCE_DURATION,
            ease: [0.22, 0.61, 0.36, 1],
            times: [0, 0.18, 0.34, 0.5, 0.66, 0.8, 0.92, 1],
          }}
        >
          {/* Líneas de velocidad detrás del auto */}
          <motion.div
            className="speed-lines"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.9, 0.4, 0] }}
            transition={{
              duration: ENTRANCE_DURATION,
              times: [0, 0.15, 0.6, 0.85, 1],
            }}
          />
          {/* Humo de derrape al frenar */}
          <motion.div
            className="skid-smoke"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: [0, 0, 0, 0, 0.8, 0.5, 0],
              scale: [0.4, 0.4, 0.4, 0.4, 1.1, 1.5, 1.9],
            }}
            transition={{
              duration: ENTRANCE_DURATION,
              times: [0, 0.5, 0.7, 0.82, 0.88, 0.95, 1],
            }}
          />
          <MuscleCar />
        </motion.div>
      </div>

      {/* Tarjeta de invitación */}
      <motion.div
        className="invitation-card"
        initial={{ scale: 0, rotate: -25, opacity: 0, y: 260 }}
        animate={{ scale: 1, rotate: 0, opacity: 1, y: 0 }}
        transition={{
          delay: ENTRANCE_DURATION - 0.1,
          type: 'spring',
          stiffness: 160,
          damping: 13,
          mass: 0.9,
        }}
        onAnimationComplete={() => setArrived(true)}
      >
        <div className="card-corner top-left" />
        <div className="card-corner top-right" />
        <div className="card-corner bottom-left" />
        <div className="card-corner bottom-right" />

        <div className="card-stamp">
          <span className="stamp-flame">🔥</span>
          HOT WHEELS PARTY
          <span className="stamp-flame">🔥</span>
        </div>

        <div className="card-photo-frame">
          <img src="/gael.jpg" alt="Cumpleañero Gael" className="card-photo" />
          <div className="card-photo-ring" />
        </div>

        <h1 className="card-title">¡Estás invitado!</h1>
        <p className="card-subtitle">
          al cumpleaños de <strong>Gael</strong>
        </p>

        <div className="card-details">
          <div className="detail-row">
            <span className="detail-icon">📅</span>
            <span>{formatDateLabel(BIRTHDAY_DATE)}</span>
          </div>
          <div className="detail-divider" />
          <div className="detail-row">
            <span className="detail-icon">🕕</span>
            <span>{formatTimeLabel(BIRTHDAY_DATE)}</span>
          </div>
        </div>

        <Countdown targetDate={BIRTHDAY_DATE} />

        <div className="card-actions">
          <button
            onClick={() => setShowLocation((v) => !v)}
            className="card-btn"
            aria-expanded={showLocation}
          >
            <span className="btn-icon">📍</span>
            <span>Lugar</span>
          </button>
          <button onClick={toggleMusic} className="card-btn music" aria-pressed={isPlaying}>
            <span className="btn-icon">{isPlaying ? '⏸️' : '▶️'}</span>
            <span>Música</span>
          </button>
          <button
            onClick={() => setShowRace((v) => !v)}
            className="card-btn race"
            aria-expanded={showRace}
          >
            <span className="btn-icon">🏁</span>
            <span>Carrera</span>
          </button>
        </div>

        <div className="volume-row">
          <span>🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            aria-label="Volumen"
          />
          <span className="volume-value">{Math.round(volume * 100)}%</span>
        </div>

        <AnimatePresence>
          {showLocation && (
            <motion.div
              key="loc"
              className="location-box"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.35 }}
            >
              <strong>El cumpleañero te espera en:</strong>
              <br />Buenos Aires de Villa Mz 44 Lt 12, Chorrillos<br />
              <button
                onClick={() => setShowMap((v) => !v)}
                className="card-btn small"
                style={{ marginTop: 10 }}
              >
                {showMap ? 'Ocultar mapa' : 'Ver mapa'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showMap && (
            <motion.div
              key="map"
              className="map-container"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
            >
              <iframe
                title="Mapa ubicación cumpleaños"
                src="https://www.google.com/maps/embed?pb=!4v1748654004255!6m8!1m7!1sRxVIM7OFI8rLRSIrQo1fOA!2m2!1d-12.18859419911167!2d-76.99979579504422!3f283.12500616179625!4f-30.508168153515328!5f0.7820865974627469"
                width="100%"
                height="260"
                style={{ border: '2px solid #ff9800', borderRadius: '10px', marginTop: '10px' }}
                allowFullScreen=""
                loading="lazy"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Aviso de audio bloqueado: aparece solo si el navegador no dejó autoplay */}
      <AnimatePresence>
        {needsAudioUnlock && arrived && !isPlaying && (
          <motion.button
            className="audio-unlock"
            onClick={toggleMusic}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            🔊 Toca para activar la música
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRace && (
          <motion.div
            className="race-popup"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
          >
            <CarRace />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Invitation;
