import React from 'react';
import { motion } from 'framer-motion';

const wheelStyle = { transformBox: 'fill-box', transformOrigin: 'center' };

const Wheel = ({ cx, cy, r = 11, rimId }) => (
  <g className="svg-wheel" style={wheelStyle}>
    <circle cx={cx} cy={cy} r={r} fill="#0a0a0a" stroke="#333" strokeWidth="1.5" />
    <circle cx={cx} cy={cy} r={r * 0.6} fill={`url(#${rimId})`} />
    <circle cx={cx} cy={cy} r={r * 0.18} fill="#222" />
    <line x1={cx - r * 0.6} y1={cy} x2={cx + r * 0.6} y2={cy} stroke="#444" strokeWidth="1.2" />
    <line x1={cx} y1={cy - r * 0.6} x2={cx} y2={cy + r * 0.6} stroke="#444" strokeWidth="1.2" />
    <line x1={cx - r * 0.42} y1={cy - r * 0.42} x2={cx + r * 0.42} y2={cy + r * 0.42} stroke="#444" strokeWidth="1" />
    <line x1={cx + r * 0.42} y1={cy - r * 0.42} x2={cx - r * 0.42} y2={cy + r * 0.42} stroke="#444" strokeWidth="1" />
  </g>
);

const SimpleWheel = ({ cx, cy, r = 9 }) => (
  <g className="svg-wheel" style={wheelStyle}>
    <circle cx={cx} cy={cy} r={r} fill="#0d0d0d" stroke="#000" strokeWidth="1" />
    <circle cx={cx} cy={cy} r={r * 0.5} fill="#3a3a3a" />
    <circle cx={cx} cy={cy} r={r * 0.18} fill="#1a1a1a" />
  </g>
);

const RimGradient = ({ id }) => (
  <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stopColor="#eaeaea" />
    <stop offset="55%" stopColor="#9a9a9a" />
    <stop offset="100%" stopColor="#5a5a5a" />
  </linearGradient>
);

/* === Muscle Car ===
   Gana → llamas crecen y vibran (motor a tope)
   Pierde → humo gris saliendo del capó (motor jodido) */
export const MuscleCar = ({ status }) => {
  const flameAnim =
    status === 'winner'
      ? { scale: [1, 1.35, 0.95, 1.4, 1] }
      : { scale: 1 };
  const flameTransition =
    status === 'winner'
      ? { duration: 0.45, repeat: Infinity, ease: 'easeInOut' }
      : { duration: 0.3 };

  return (
    <svg viewBox="0 -10 150 75" className="car-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="muscle-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff3a4a" />
          <stop offset="55%" stopColor="#dd1424" />
          <stop offset="100%" stopColor="#7a0010" />
        </linearGradient>
        <linearGradient id="muscle-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cfe6ff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#3a5a85" stopOpacity="0.85" />
        </linearGradient>
        <RimGradient id="muscle-rim" />
      </defs>

      <ellipse cx="75" cy="60" rx="62" ry="3" fill="rgba(0,0,0,0.35)" />

      {/* Humo del capó si pierde (sale antes para quedar detrás del carro) */}
      {status === 'loser' &&
        [0, 1, 2].map((i) => (
          <motion.circle
            key={`smoke-${i}`}
            cx={120 - i * 3}
            cy={22}
            r={3.5}
            fill={i % 2 ? '#aaa' : '#777'}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{ opacity: [0, 0.75, 0], scale: [0.4, 2, 3.6], y: [0, -22, -42] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.55, ease: 'easeOut' }}
          />
        ))}

      <path
        d="M 5 45 L 8 32 Q 10 26 18 24 L 46 24 L 56 11 Q 60 8 68 8 L 104 8 Q 113 8 118 14 L 128 24 L 142 26 Q 148 29 148 36 L 148 47 Q 148 50 145 50 L 8 50 Q 5 50 5 47 Z"
        fill="url(#muscle-body)"
        stroke="#3a0008"
        strokeWidth="1.2"
      />

      <path
        d="M 57 22 L 62 13 Q 65 10 70 10 L 103 10 Q 110 10 113 16 L 118 22 Z"
        fill="url(#muscle-glass)"
        stroke="#222"
        strokeWidth="0.6"
      />

      <line x1="87" y1="22" x2="87" y2="46" stroke="rgba(0,0,0,0.45)" strokeWidth="0.8" />

      {/* Llamas (animadas si gana) */}
      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
        animate={flameAnim}
        transition={flameTransition}
      >
        <path
          d="M 18 39 L 30 33 L 26 39 L 38 35 L 32 40 L 46 37 L 38 42 L 54 39 L 46 44 L 18 44 Z"
          fill="#ffd400"
          stroke="#ff6a00"
          strokeWidth="0.6"
        />
        <path
          d="M 22 41 L 30 38 L 26 41 L 36 39 L 32 42 L 22 43 Z"
          fill="#ff6a00"
          opacity="0.9"
        />
      </motion.g>

      <circle cx="143" cy="33" r="2.8" fill="#fffbb0" stroke="#cc9900" strokeWidth="0.6" />
      <rect x="6" y="30" width="3" height="6" rx="1" fill="#ffaa00" />
      <rect x="2" y="27" width="10" height="2.5" rx="1" fill="#220000" />

      <Wheel cx={32} cy={49} rimId="muscle-rim" />
      <Wheel cx={118} cy={49} rimId="muscle-rim" />
    </svg>
  );
};

/* === Bob Esponja ===
   Gana → todo el cuerpo baila (rota lado a lado con bounce)
   Pierde → lágrimas salen de los ojos + boca de tristeza + cejas tristes */
export const SpongeBobCar = ({ status }) => {
  const bobAnim =
    status === 'winner'
      ? { rotate: [0, -7, 7, -5, 5, 0], y: [0, -3, -3, -2, -2, 0] }
      : status === 'loser'
      ? { rotate: -4, y: 3 }
      : { rotate: 0, y: 0 };

  const bobTransition =
    status === 'winner'
      ? { duration: 1, repeat: Infinity, ease: 'easeInOut' }
      : { duration: 0.5 };

  const isLoser = status === 'loser';

  return (
    <svg viewBox="0 -22 150 88" className="car-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="bob-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dadada" />
        </linearGradient>
        <linearGradient id="bob-yellow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffea00" />
          <stop offset="100%" stopColor="#ddc000" />
        </linearGradient>
        <RimGradient id="bob-rim" />
      </defs>

      <ellipse cx="75" cy="60" rx="62" ry="3" fill="rgba(0,0,0,0.4)" />

      {/* Bob entero, animado según status */}
      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
        animate={bobAnim}
        transition={bobTransition}
      >
        <rect x="50" y="-20" width="42" height="44" rx="2" fill="url(#bob-yellow)" stroke="#a07a00" strokeWidth="1.2" />

        {/* poros de esponja */}
        <circle cx="56" cy="-13" r="1.7" fill="#cca800" opacity="0.55" />
        <circle cx="68" cy="-16" r="2.2" fill="#cca800" opacity="0.55" />
        <circle cx="84" cy="-11" r="1.6" fill="#cca800" opacity="0.55" />
        <circle cx="86" cy="-18" r="1.2" fill="#cca800" opacity="0.55" />
        <circle cx="60" cy="-3" r="1.5" fill="#cca800" opacity="0.55" />
        <circle cx="74" cy="-1" r="2" fill="#cca800" opacity="0.55" />
        <circle cx="58" cy="9" r="1.3" fill="#cca800" opacity="0.55" />
        <circle cx="84" cy="14" r="1.6" fill="#cca800" opacity="0.55" />
        <circle cx="80" cy="-6" r="1" fill="#fff5a0" opacity="0.7" />

        {/* Cejas: tristes (V invertida) si pierde, normales si no */}
        {isLoser ? (
          <>
            <path d="M 56 -13 Q 60 -11 64 -14" fill="none" stroke="#332200" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 76 -14 Q 80 -11 84 -13" fill="none" stroke="#332200" strokeWidth="1.2" strokeLinecap="round" />
          </>
        ) : (
          <>
            <path d="M 56 -14 Q 60 -16 64 -14" fill="none" stroke="#332200" strokeWidth="1" strokeLinecap="round" />
            <path d="M 76 -14 Q 80 -16 84 -14" fill="none" stroke="#332200" strokeWidth="1" strokeLinecap="round" />
          </>
        )}

        {/* ojos blancos */}
        <circle cx="62" cy="-8" r="6" fill="#fff" stroke="#222" strokeWidth="0.8" />
        <circle cx="78" cy="-8" r="6" fill="#fff" stroke="#222" strokeWidth="0.8" />
        {/* iris */}
        <circle cx="63" cy={isLoser ? '-6' : '-7'} r="3" fill="#1ea7ff" />
        <circle cx="79" cy={isLoser ? '-6' : '-7'} r="3" fill="#1ea7ff" />
        {/* pupilas */}
        <circle cx="63" cy={isLoser ? '-6' : '-7'} r="1.7" fill="#0a0a0a" />
        <circle cx="79" cy={isLoser ? '-6' : '-7'} r="1.7" fill="#0a0a0a" />
        {/* brillos */}
        <circle cx="63.7" cy={isLoser ? '-6.6' : '-7.6'} r="0.7" fill="#fff" />
        <circle cx="79.7" cy={isLoser ? '-6.6' : '-7.6'} r="0.7" fill="#fff" />

        {/* mejillas: rosadas si normal, azuladas si llora */}
        <ellipse cx="54" cy="3" rx="3" ry="2" fill={isLoser ? '#88aacc' : '#ffaaaa'} opacity="0.65" />
        <ellipse cx="88" cy="3" rx="3" ry="2" fill={isLoser ? '#88aacc' : '#ffaaaa'} opacity="0.65" />

        {/* Boca: triste si pierde, sonrisa con dientes si no */}
        {isLoser ? (
          <path d="M 60 8 Q 71 -2 84 8" fill="none" stroke="#aa3322" strokeWidth="1.6" strokeLinecap="round" />
        ) : (
          <>
            <path d="M 60 1 Q 71 9 84 1" fill="none" stroke="#aa3322" strokeWidth="1.6" strokeLinecap="round" />
            <rect x="66" y="2.5" width="4" height="5.5" rx="0.5" fill="#fff" stroke="#aa3322" strokeWidth="0.6" />
            <rect x="71.5" y="2.5" width="4" height="5.5" rx="0.5" fill="#fff" stroke="#aa3322" strokeWidth="0.6" />
          </>
        )}

        {/* Lágrimas si pierde */}
        {isLoser && (
          <>
            <motion.path
              d="M 62 -2 q -1.4 3 0 6 q 1.4 -3 0 -6 z"
              fill="#5fc6ff"
              stroke="#1e88e5"
              strokeWidth="0.5"
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 1, 0], y: [0, 8, 18] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeIn' }}
            />
            <motion.path
              d="M 78 -2 q -1.4 3 0 6 q 1.4 -3 0 -6 z"
              fill="#5fc6ff"
              stroke="#1e88e5"
              strokeWidth="0.5"
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 1, 0], y: [0, 8, 18] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeIn', delay: 0.5 }}
            />
          </>
        )}

        {/* camisa + corbata */}
        <rect x="54" y="20" width="34" height="5" fill="#fff" stroke="#888" strokeWidth="0.6" />
        <path d="M 69 20 L 73 20 L 75 28 L 71 30 L 67 28 Z" fill="#cc0000" stroke="#770000" strokeWidth="0.5" />
      </motion.g>

      {/* Carrito blanco descapotable (estático) */}
      <path
        d="M 8 38 Q 10 28 22 26 L 46 25 Q 75 23 104 25 L 128 26 Q 140 28 142 38 L 142 50 Q 140 53 135 53 L 15 53 Q 10 53 8 50 Z"
        fill="url(#bob-body)"
        stroke="#888"
        strokeWidth="1.2"
      />
      <path d="M 44 24 Q 48 20 54 20 L 88 20 Q 94 20 98 24 L 98 32 L 44 32 Z" fill="#7ec8ff" opacity="0.35" />
      <path
        d="M 32 26 L 40 20 Q 42 19 45 19 L 49 19 L 49 26 Z"
        fill="#cdedff"
        opacity="0.7"
        stroke="#666"
        strokeWidth="0.5"
      />
      <rect x="8" y="46" width="134" height="6" rx="2" fill="#cc0000" />
      <path d="M 2 30 L 10 28 L 13 32 L 10 36 L 2 34 Z" fill="#d8d8d8" stroke="#777" strokeWidth="0.5" />
      <path d="M -2 32 L 4 28 L 4 36 Z" fill="#aaa" />
      <circle cx="5" cy="32" r="0.8" fill="#000" />
      <circle cx="138" cy="36" r="2.5" fill="#fff5b0" stroke="#888" strokeWidth="0.5" />

      <Wheel cx={32} cy={50} r={11} rimId="bob-rim" />
      <Wheel cx={118} cy={50} r={11} rimId="bob-rim" />
    </svg>
  );
};

/* === Minecart Creeper ===
   Gana → la cabeza salta arriba/abajo
   Pierde → la cabeza se inclina hacia adelante (agacha) */
export const MinecartCreeper = ({ status }) => {
  const stoneShades = ['#d8d8d8', '#a8a8a8', '#bcbcbc', '#909090', '#c4c4c4', '#999999'];
  const cells = [];
  const cols = 10;
  const rows = 3;
  const cellW = 11;
  const cellH = 11;
  const startX = 20;
  const startY = 24;
  let seed = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      seed = (seed * 9301 + 49297) % 233280;
      const shade = stoneShades[(c + r * 3 + Math.floor(seed / 46656)) % stoneShades.length];
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={startX + c * cellW}
          y={startY + r * cellH}
          width={cellW}
          height={cellH}
          fill={shade}
        />
      );
    }
  }

  const headAnim =
    status === 'winner'
      ? { y: [0, -9, 0, -5, 0] }
      : status === 'loser'
      ? { rotate: 28, y: 6, x: 4 }
      : { y: 0, rotate: 0, x: 0 };

  const headTransition =
    status === 'winner'
      ? { duration: 0.55, repeat: Infinity, ease: 'easeOut' }
      : { duration: 0.6, ease: 'easeOut' };

  return (
    <svg viewBox="0 -18 150 80" className="car-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="creeper-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#88d34a" />
          <stop offset="100%" stopColor="#4f9526" />
        </linearGradient>
      </defs>

      <ellipse cx="75" cy="60" rx="60" ry="3" fill="rgba(0,0,0,0.4)" />

      {/* Cabeza del Creeper, animada según status */}
      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
        animate={headAnim}
        transition={headTransition}
      >
        <rect x="56" y="-15" width="38" height="40" fill="url(#creeper-body)" stroke="#2f5e15" strokeWidth="1.2" />
        {/* pixeles textura */}
        <rect x="58" y="-13" width="6" height="6" fill="#7bc83e" />
        <rect x="86" y="-13" width="6" height="6" fill="#5fa42b" />
        <rect x="58" y="19" width="5" height="5" fill="#5fa42b" />
        <rect x="88" y="19" width="5" height="5" fill="#7bc83e" />
        <rect x="60" y="0" width="3" height="3" fill="#9be060" />
        <rect x="86" y="6" width="3" height="3" fill="#3f7c1c" />
        <rect x="74" y="-13" width="3" height="3" fill="#9be060" />
        <rect x="80" y="22" width="3" height="3" fill="#3f7c1c" />

        {/* cara: ojos */}
        <rect x="62" y="-7" width="9" height="9" fill="#0f0f0f" />
        <rect x="79" y="-7" width="9" height="9" fill="#0f0f0f" />
        {/* boca */}
        <rect x="66" y="6" width="18" height="6" fill="#0f0f0f" />
        <rect x="66" y="12" width="6" height="9" fill="#0f0f0f" />
        <rect x="78" y="12" width="6" height="9" fill="#0f0f0f" />
      </motion.g>

      {/* Vagón */}
      <rect x="18" y="22" width="114" height="34" rx="2" fill="#a0a0a0" stroke="#555" strokeWidth="1.5" />
      <clipPath id="cart-clip">
        <rect x="20" y="24" width="110" height="32" rx="1" />
      </clipPath>
      <g clipPath="url(#cart-clip)">{cells}</g>
      <g stroke="rgba(0,0,0,0.2)" strokeWidth="0.5">
        <line x1="20" y1="35" x2="130" y2="35" />
        <line x1="20" y1="46" x2="130" y2="46" />
        <line x1="42" y1="22" x2="42" y2="56" />
        <line x1="64" y1="22" x2="64" y2="56" />
        <line x1="86" y1="22" x2="86" y2="56" />
        <line x1="108" y1="22" x2="108" y2="56" />
      </g>
      <rect x="20" y="22" width="110" height="3.5" fill="rgba(0,0,0,0.45)" />
      <rect x="20" y="22" width="110" height="1" fill="rgba(255,255,255,0.4)" />
      <rect x="30" y="54" width="6" height="4" fill="#444" />
      <rect x="114" y="54" width="6" height="4" fill="#444" />

      <SimpleWheel cx={36} cy={56} r={9} />
      <SimpleWheel cx={114} cy={56} r={9} />
    </svg>
  );
};

export const CARS = [
  { name: 'muscle', label: 'Muscle Rojo', Component: MuscleCar },
  { name: 'creeper', label: 'Minecart Creeper', Component: MinecartCreeper },
  { name: 'spongebob', label: 'Bob Esponja', Component: SpongeBobCar },
];
