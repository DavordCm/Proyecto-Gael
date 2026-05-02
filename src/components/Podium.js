import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpongeBobBody, CreeperBody, MuscleDriver } from './CharacterBodies';
import { MuscleCar, MinecartCreeper, SpongeBobCar } from './Cars';
import '../styles/Podium.css';

const BODIES = {
  muscle: MuscleDriver,
  creeper: CreeperBody,
  spongebob: SpongeBobBody,
};

const CARS_BY_NAME = {
  muscle: MuscleCar,
  creeper: MinecartCreeper,
  spongebob: SpongeBobCar,
};

const MEDALS = { 1: '🥇', 2: '🥈', 3: '🥉' };

const PodiumPosition = ({ entry, place }) => {
  const Body = BODIES[entry.car.name];
  const Car = CARS_BY_NAME[entry.car.name];
  // 1° celebra (jump). 2° saluda (wave) — pero Creeper siempre salta. 3° triste (sad).
  let mode;
  if (place === 1) mode = 'jump';
  else if (place === 2) mode = entry.car.name === 'creeper' ? 'jump' : 'wave';
  else mode = 'sad';

  return (
    <motion.div
      className={`podium-pos pos-${place}`}
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.25 + (3 - place) * 0.2, duration: 0.45, ease: 'easeOut' }}
    >
      <div className="char-stack">
        <div className="char-body-wrap">
          <Body mode={mode} />
        </div>
        <div className="car-mini-wrap">
          <Car />
        </div>
      </div>
      <div className={`step step-${place}`}>
        <span className="step-medal">{MEDALS[place]}</span>
        <span className="step-num">{place}°</span>
      </div>
    </motion.div>
  );
};

const Podium = ({ ranking, onClose }) => (
  <AnimatePresence>
    {ranking && (
      <motion.div
        className="podium-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="podium-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.7, y: 60 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.7, y: 60, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        >
          <button className="podium-close" onClick={onClose} aria-label="Cerrar">
            ×
          </button>
          <h3 className="podium-title">🏆 PODIO FINAL 🏆</h3>
          <p className="podium-subtitle">Ganó <strong>{ranking[0].car.label}</strong></p>

          <div className="podium-stage">
            <PodiumPosition entry={ranking[1]} place={2} />
            <PodiumPosition entry={ranking[0]} place={1} />
            <PodiumPosition entry={ranking[2]} place={3} />
          </div>

          <button className="podium-action" onClick={onClose}>
            Cerrar
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Podium;
