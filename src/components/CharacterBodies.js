import React from 'react';
import { motion } from 'framer-motion';

const pivotBottom = { transformBox: 'fill-box', transformOrigin: '50% 100%' };
// Pivot desde el hombro: top-center del bounding box del brazo
const pivotShoulder = { transformBox: 'fill-box', transformOrigin: '50% 0%' };

/* === Bob Esponja: cuerpo completo ===
   modes:
     'jump' (1°)  → salta + brazos arriba
     'wave' (2°)  → saluda con un brazo
     'sad'  (3°)  → triste, cabeza agachada, cara llorosa */
export const SpongeBobBody = ({ mode = 'idle' }) => {
  const isJump = mode === 'jump';
  const isWave = mode === 'wave';
  const isSad = mode === 'sad';

  const bodyAnim = isJump
    ? { y: [0, -14, 0, -8, 0], rotate: [0, -3, 3, -2, 0] }
    : isSad
    ? { rotate: -3, y: 3 }
    : { y: 0, rotate: 0 };

  const bodyTrans = isJump
    ? { duration: 0.85, repeat: Infinity, ease: 'easeInOut' }
    : { duration: 0.5 };

  // Brazo izquierdo: rotate positivo => arriba-izquierda (afuera del cuerpo)
  const leftArmAnim = isJump
    ? { rotate: [135, 165, 135] }
    : isWave
    ? { rotate: [95, 135, 95] }
    : isSad
    ? { rotate: -8 }
    : {};
  const leftArmTrans = isJump || isWave ? { duration: 0.85, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.4 };

  // Brazo derecho: rotate negativo => arriba-derecha (afuera del cuerpo)
  const rightArmAnim = isJump ? { rotate: [-135, -165, -135] } : isSad ? { rotate: 8 } : {};
  const rightArmTrans = isJump ? { duration: 0.85, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.4 };

  return (
    <svg viewBox="0 0 100 140" className="char-body-svg" preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id="bb-yellow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffea00" />
          <stop offset="100%" stopColor="#ddc000" />
        </linearGradient>
      </defs>

      <ellipse cx="50" cy="138" rx="36" ry="2.5" fill="rgba(0,0,0,0.35)" />

      <motion.g style={pivotBottom} animate={bodyAnim} transition={bodyTrans}>
        {/* brazo izquierdo: pivota desde el hombro (parte superior) */}
        <motion.g style={pivotShoulder} animate={leftArmAnim} transition={leftArmTrans}>
          <rect x="10" y="56" width="10" height="32" fill="url(#bb-yellow)" stroke="#a07a00" strokeWidth="0.8" />
          <ellipse cx="15" cy="89" rx="6" ry="5" fill="#fff" stroke="#222" strokeWidth="0.7" />
        </motion.g>
        {/* brazo derecho */}
        <motion.g style={pivotShoulder} animate={rightArmAnim} transition={rightArmTrans}>
          <rect x="80" y="56" width="10" height="32" fill="url(#bb-yellow)" stroke="#a07a00" strokeWidth="0.8" />
          <ellipse cx="85" cy="89" rx="6" ry="5" fill="#fff" stroke="#222" strokeWidth="0.7" />
        </motion.g>

        {/* cuerpo amarillo */}
        <rect x="20" y="22" width="60" height="68" rx="2" fill="url(#bb-yellow)" stroke="#a07a00" strokeWidth="1.2" />
        {/* poros */}
        {[
          [28, 32], [42, 36], [60, 30], [72, 42],
          [32, 56], [55, 60], [68, 70], [40, 78],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={1.6} fill="#cca800" opacity="0.5" />
        ))}

        {/* cejas: tristes si sad, normales si no */}
        {isSad ? (
          <>
            <path d="M 28 33 Q 33 36 38 33" fill="none" stroke="#332200" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M 62 33 Q 67 36 72 33" fill="none" stroke="#332200" strokeWidth="1.4" strokeLinecap="round" />
          </>
        ) : (
          <>
            <path d="M 28 32 Q 33 30 38 32" fill="none" stroke="#332200" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 62 32 Q 67 30 72 32" fill="none" stroke="#332200" strokeWidth="1.2" strokeLinecap="round" />
          </>
        )}

        {/* ojos */}
        <circle cx="35" cy="42" r="8" fill="#fff" stroke="#222" strokeWidth="0.9" />
        <circle cx="65" cy="42" r="8" fill="#fff" stroke="#222" strokeWidth="0.9" />
        <circle cx="36" cy={isSad ? 44 : 43} r="4" fill="#1ea7ff" />
        <circle cx="66" cy={isSad ? 44 : 43} r="4" fill="#1ea7ff" />
        <circle cx="36" cy={isSad ? 44 : 43} r="2.4" fill="#0a0a0a" />
        <circle cx="66" cy={isSad ? 44 : 43} r="2.4" fill="#0a0a0a" />
        <circle cx="37" cy={isSad ? 43 : 42} r="1" fill="#fff" />
        <circle cx="67" cy={isSad ? 43 : 42} r="1" fill="#fff" />

        {/* mejillas */}
        <ellipse cx="22" cy="56" rx="3" ry="2" fill={isSad ? '#88aacc' : '#ffaaaa'} opacity="0.65" />
        <ellipse cx="78" cy="56" rx="3" ry="2" fill={isSad ? '#88aacc' : '#ffaaaa'} opacity="0.65" />

        {/* boca */}
        {isSad ? (
          <path d="M 32 62 Q 50 50 68 62" fill="none" stroke="#aa3322" strokeWidth="2" strokeLinecap="round" />
        ) : (
          <>
            <path d="M 32 56 Q 50 70 68 56" fill="none" stroke="#aa3322" strokeWidth="2" strokeLinecap="round" />
            <rect x="42" y="58" width="6" height="8" rx="1" fill="#fff" stroke="#aa3322" strokeWidth="0.7" />
            <rect x="51" y="58" width="6" height="8" rx="1" fill="#fff" stroke="#aa3322" strokeWidth="0.7" />
          </>
        )}

        {/* lágrimas si triste */}
        {isSad && (
          <>
            <motion.path
              d="M 35 50 q -1.5 3 0 6 q 1.5 -3 0 -6 z"
              fill="#5fc6ff"
              stroke="#1e88e5"
              strokeWidth="0.5"
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 1, 0], y: [0, 12, 24] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeIn' }}
            />
            <motion.path
              d="M 65 50 q -1.5 3 0 6 q 1.5 -3 0 -6 z"
              fill="#5fc6ff"
              stroke="#1e88e5"
              strokeWidth="0.5"
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 1, 0], y: [0, 12, 24] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeIn', delay: 0.6 }}
            />
          </>
        )}

        {/* camisa blanca */}
        <rect x="20" y="84" width="60" height="8" fill="#fff" stroke="#888" strokeWidth="0.6" />
        {/* corbata */}
        <path d="M 46 84 L 54 84 L 56 100 L 50 105 L 44 100 Z" fill="#cc0000" stroke="#770000" strokeWidth="0.6" />

        {/* pantalón */}
        <rect x="22" y="92" width="56" height="20" fill="#a0651a" stroke="#5a3308" strokeWidth="1" />
        <rect x="22" y="92" width="56" height="2" fill="#7a4a0c" />
        {/* cinturón */}
        <rect x="22" y="108" width="56" height="3" fill="#1a1a1a" />
        <rect x="48" y="108" width="4" height="3" fill="#bbb" />

        {/* piernas */}
        <rect x="32" y="111" width="9" height="13" fill="#fff" stroke="#888" strokeWidth="0.5" />
        <rect x="59" y="111" width="9" height="13" fill="#fff" stroke="#888" strokeWidth="0.5" />
        <rect x="32" y="117" width="9" height="2" fill="#1a4a8a" />
        <rect x="32" y="120" width="9" height="2" fill="#cc2222" />
        <rect x="59" y="117" width="9" height="2" fill="#1a4a8a" />
        <rect x="59" y="120" width="9" height="2" fill="#cc2222" />
        {/* zapatos */}
        <ellipse cx="36" cy="127" rx="6" ry="3" fill="#0a0a0a" />
        <ellipse cx="63" cy="127" rx="6" ry="3" fill="#0a0a0a" />
      </motion.g>
    </svg>
  );
};

/* === Creeper cuerpo completo ===
   modes:
     'jump' → salta (es su naturaleza, lo usa también en 2° lugar)
     'sad'  → cabeza agachada */
export const CreeperBody = ({ mode = 'idle' }) => {
  const isJump = mode === 'jump';
  const isSad = mode === 'sad';

  const bodyAnim = isJump ? { y: [0, -16, 0, -8, 0] } : isSad ? { y: 2 } : {};
  const bodyTrans = isJump
    ? { duration: 0.6, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }
    : { duration: 0.5 };

  const headAnim = isSad ? { rotate: 22, y: 4 } : { rotate: 0, y: 0 };

  return (
    <svg viewBox="0 0 80 140" className="char-body-svg" preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id="cb-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#88d34a" />
          <stop offset="100%" stopColor="#4f9526" />
        </linearGradient>
      </defs>

      <ellipse cx="40" cy="138" rx="30" ry="2.5" fill="rgba(0,0,0,0.35)" />

      <motion.g style={pivotBottom} animate={bodyAnim} transition={bodyTrans}>
        {/* tronco */}
        <rect x="22" y="50" width="36" height="58" fill="url(#cb-green)" stroke="#2f5e15" strokeWidth="1" />
        <rect x="24" y="52" width="4" height="4" fill="#7bc83e" />
        <rect x="52" y="58" width="4" height="4" fill="#5fa42b" />
        <rect x="38" y="76" width="3" height="3" fill="#9be060" />
        <rect x="28" y="92" width="3" height="3" fill="#7bc83e" />
        <rect x="50" y="98" width="3" height="3" fill="#5fa42b" />

        {/* patas */}
        <rect x="22" y="108" width="14" height="22" fill="url(#cb-green)" stroke="#2f5e15" strokeWidth="1" />
        <rect x="44" y="108" width="14" height="22" fill="url(#cb-green)" stroke="#2f5e15" strokeWidth="1" />
        <rect x="22" y="108" width="14" height="2" fill="#3f7c1c" />
        <rect x="44" y="108" width="14" height="2" fill="#3f7c1c" />

        {/* cabeza (se inclina si triste) */}
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
          animate={headAnim}
          transition={{ duration: 0.6 }}
        >
          <rect x="14" y="6" width="52" height="46" fill="url(#cb-green)" stroke="#2f5e15" strokeWidth="1.2" />
          <rect x="16" y="8" width="6" height="6" fill="#7bc83e" />
          <rect x="56" y="10" width="6" height="6" fill="#5fa42b" />
          <rect x="22" y="44" width="4" height="4" fill="#5fa42b" />
          <rect x="56" y="46" width="4" height="4" fill="#7bc83e" />
          <rect x="32" y="6" width="3" height="3" fill="#9be060" />
          {/* cara */}
          <rect x="22" y="20" width="11" height="11" fill="#0f0f0f" />
          <rect x="46" y="20" width="11" height="11" fill="#0f0f0f" />
          <rect x="28" y="34" width="22" height="6" fill="#0f0f0f" />
          <rect x="28" y="40" width="6" height="10" fill="#0f0f0f" />
          <rect x="44" y="40" width="6" height="10" fill="#0f0f0f" />
        </motion.g>
      </motion.g>
    </svg>
  );
};

/* === Piloto del Muscle ===
   modes:
     'jump' (1°) → salta + brazo arriba (puño)
     'wave' (2°) → saluda con un brazo
     'sad'  (3°) → casco/cuerpo inclinado adelante, brazos caídos */
export const MuscleDriver = ({ mode = 'idle' }) => {
  const isJump = mode === 'jump';
  const isWave = mode === 'wave';
  const isSad = mode === 'sad';

  const bodyAnim = isJump
    ? { y: [0, -12, 0, -6, 0] }
    : isSad
    ? { rotate: -6, y: 4 }
    : {};
  const bodyTrans = isJump
    ? { duration: 0.7, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }
    : { duration: 0.5 };

  // Brazo izquierdo: rotate positivo => arriba-izquierda (afuera del cuerpo)
  const leftArmAnim = isJump
    ? { rotate: [155, 175, 155] }
    : isWave
    ? { rotate: [125, 160, 125] }
    : isSad
    ? { rotate: -10 }
    : {};
  const leftArmTrans = isJump || isWave ? { duration: 0.7, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.4 };

  // Brazo derecho: rotate negativo => arriba-derecha (afuera del cuerpo)
  const rightArmAnim = isJump
    ? { rotate: [-155, -175, -155] }
    : isSad
    ? { rotate: 10 }
    : {};
  const rightArmTrans = isJump ? { duration: 0.7, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.4 };

  return (
    <svg viewBox="0 0 70 140" className="char-body-svg" preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id="md-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff3a4a" />
          <stop offset="100%" stopColor="#aa1020" />
        </linearGradient>
      </defs>

      <ellipse cx="35" cy="138" rx="24" ry="2.5" fill="rgba(0,0,0,0.35)" />

      <motion.g style={pivotBottom} animate={bodyAnim} transition={bodyTrans}>
        {/* casco */}
        <ellipse cx="35" cy="22" rx="17" ry="19" fill="url(#md-red)" stroke="#5a0008" strokeWidth="1.2" />
        <path
          d="M 20 21 Q 20 14 35 14 Q 50 14 50 21 L 50 26 Q 35 30 20 26 Z"
          fill="#0a0a0a"
          stroke="#222"
          strokeWidth="0.6"
        />
        <path d="M 22 18 Q 30 16 40 17" fill="none" stroke="#fff" strokeWidth="0.7" opacity="0.55" />
        <rect x="18" y="6" width="34" height="2.5" fill="#fff" />
        <rect x="18" y="8.5" width="34" height="1.8" fill="#ffd700" />
        <path d="M 30 36 L 32 33 L 33 36 L 35 30 L 37 36 L 38 33 L 40 36 Z" fill="#ffd400" />

        {/* cuello */}
        <rect x="30" y="40" width="10" height="6" fill="#d4a86a" />

        {/* torso */}
        <rect x="14" y="44" width="42" height="50" rx="3" fill="url(#md-red)" stroke="#5a0008" strokeWidth="1.2" />
        <path d="M 14 60 L 56 50 L 56 56 L 14 66 Z" fill="#fff" />
        <text x="35" y="80" fontSize="6" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Arial, sans-serif">
          HW
        </text>

        {/* cinturón */}
        <rect x="14" y="92" width="42" height="4" fill="#1a1a1a" />
        <rect x="32" y="92" width="6" height="4" fill="#bbb" />

        {/* pantalón */}
        <rect x="15" y="96" width="40" height="22" fill="url(#md-red)" stroke="#5a0008" strokeWidth="1" />
        <line x1="35" y1="96" x2="35" y2="118" stroke="#5a0008" strokeWidth="0.8" />

        {/* brazo izquierdo: pivota desde el hombro */}
        <motion.g style={pivotShoulder} animate={leftArmAnim} transition={leftArmTrans}>
          <rect x="2" y="46" width="10" height="40" rx="3" fill="url(#md-red)" stroke="#5a0008" strokeWidth="0.8" />
          <ellipse cx="7" cy="86" rx="5" ry="4" fill="#fff" stroke="#222" strokeWidth="0.6" />
        </motion.g>
        {/* brazo derecho */}
        <motion.g style={pivotShoulder} animate={rightArmAnim} transition={rightArmTrans}>
          <rect x="58" y="46" width="10" height="40" rx="3" fill="url(#md-red)" stroke="#5a0008" strokeWidth="0.8" />
          <ellipse cx="63" cy="86" rx="5" ry="4" fill="#fff" stroke="#222" strokeWidth="0.6" />
        </motion.g>

        {/* botas */}
        <rect x="17" y="116" width="14" height="14" rx="2" fill="#0a0a0a" />
        <rect x="39" y="116" width="14" height="14" rx="2" fill="#0a0a0a" />
        <rect x="17" y="116" width="14" height="2.5" fill="#444" />
        <rect x="39" y="116" width="14" height="2.5" fill="#444" />
      </motion.g>
    </svg>
  );
};
