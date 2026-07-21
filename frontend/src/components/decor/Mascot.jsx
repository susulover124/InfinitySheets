import React from 'react';

/*
 * Sheety v2 — the InfinitySheets mascot, redesigned to match the new
 * character sheet:
 *   • Dark navy body/helmet with a bright silver/chrome frame around the
 *     visor.
 *   • Big glowing blue infinity face as the single dominant expression.
 *   • Dark navy spiky hair tuft, blue-lit ear pods, dark navy hoodie
 *     with an infinity chest logo, navy/white sneakers.
 *
 * Poses (unchanged API so all landing usages keep working):
 *   • wave    – excited greeting, star-sparkles around, one arm up
 *   • peek    – curious head + gloves peeking over an edge (winking)
 *   • sit     – thinking pose, hand near the chin, legs dangling
 *   • float   – happy floating with sparkles
 *
 * Motion is CSS-driven (mascot-bob / -wave / -kick / -sparkle / -blink
 * / -pulse) and always respects prefers-reduced-motion.
 */

const NAVY_DEEP = '#0B1732';   // helmet outer body
const NAVY_MID = '#14264A';    // hoodie / accents
const NAVY_SOFT = '#1E3A8A';   // ear-pod interior
const CHROME_LIGHT = '#F1F4F9';
const CHROME_MID = '#C7CFDD';
const CHROME_DARK = '#8892A6';
const BLUE = '#4CA0FF';        // glowing infinity
const BLUE_DEEP = '#1E5BFF';
const ICE = '#BFE0FF';
const INK = '#050B1C';

/* Lemniscate (infinity) — filled, glowing. */
function InfinityGlow({ x = 0, y = 0, s = 1, strokeWidth = 4.2 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className="mascot-pulse">
      {/* outer soft glow */}
      <path
        d="M0 0 C-5 -9 -17 -9 -17 0 C-17 9 -5 9 0 0 C5 -9 17 -9 17 0 C17 9 5 9 0 0 Z"
        fill="none" stroke={BLUE} strokeOpacity="0.35" strokeWidth={strokeWidth + 4}
        strokeLinecap="round" strokeLinejoin="round"
      />
      {/* main stroke */}
      <path
        d="M0 0 C-5 -9 -17 -9 -17 0 C-17 9 -5 9 0 0 C5 -9 17 -9 17 0 C17 9 5 9 0 0 Z"
        fill="none" stroke={BLUE} strokeWidth={strokeWidth}
        strokeLinecap="round" strokeLinejoin="round"
      />
      {/* inner highlight */}
      <path
        d="M0 0 C-5 -9 -17 -9 -17 0 C-17 9 -5 9 0 0 C5 -9 17 -9 17 0 C17 9 5 9 0 0 Z"
        fill="none" stroke="#DCEBFF" strokeWidth={strokeWidth * 0.35}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </g>
  );
}

/*
 * Head, centred on (cx, cy).
 *   variant — 'happy' (default): symmetric infinity
 *             'wink'  : same infinity, mouth slightly open (thinking)
 *             'star'  : star sparkles above the infinity (excited)
 */
function Head({ cx = 60, cy = 42, variant = 'happy' }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {/* hair tuft — three dark spikes swept back-right */}
      <path
        d="M-16 -30 C-18 -42 -10 -48 -6 -40 L-3 -34 C-3 -44 6 -50 8 -41 L9 -34 C13 -44 20 -42 16 -32 L12 -28 Z"
        fill={INK}
      />

      {/* ear pods (dark navy shell with bright blue inner) */}
      <g>
        <rect x="-44" y="-12" width="13" height="24" rx="6.5" fill={NAVY_DEEP} stroke={INK} strokeWidth="2.4" />
        <rect x="31" y="-12" width="13" height="24" rx="6.5" fill={NAVY_DEEP} stroke={INK} strokeWidth="2.4" />
        <rect x="-42" y="-8" width="9" height="16" rx="4.5" fill={NAVY_SOFT} />
        <rect x="33" y="-8" width="9" height="16" rx="4.5" fill={NAVY_SOFT} />
        <circle cx="-37.5" cy="0" r="2.4" fill={BLUE} className="mascot-pulse" />
        <circle cx="37.5" cy="0" r="2.4" fill={BLUE} className="mascot-pulse" />
      </g>

      {/* helmet outer (dark navy body) */}
      <rect x="-35" y="-32" width="70" height="64" rx="24" fill={NAVY_DEEP} stroke={INK} strokeWidth="2.6" />
      {/* subtle top highlight streak */}
      <path d="M-24 -28 Q0 -34 24 -28" stroke={CHROME_DARK} strokeOpacity="0.55" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* silver/chrome frame around the visor */}
      <rect x="-30" y="-27" width="60" height="54" rx="20" fill={CHROME_MID} stroke={INK} strokeWidth="2" />
      <rect x="-27" y="-24" width="54" height="48" rx="17.5" fill={CHROME_LIGHT} />
      {/* dark visor inside the frame */}
      <rect x="-25" y="-22" width="50" height="44" rx="15" fill={INK} />
      {/* soft top-edge shine on visor */}
      <path d="M-19 -18 Q0 -24 19 -18" stroke={BLUE_DEEP} strokeOpacity="0.55" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* glowing face */}
      <g className="mascot-glow">
        {variant === 'star' ? (
          <>
            {/* excited stars flanking a smile-arc */}
            <path d="M-11 -3 l1.6 4 4.2 1.4 -4.2 1.4 -1.6 4 -1.6 -4 -4.2 -1.4 4.2 -1.4 z" fill={BLUE} />
            <path d="M11 -3 l1.6 4 4.2 1.4 -4.2 1.4 -1.6 4 -1.6 -4 -4.2 -1.4 4.2 -1.4 z" fill={BLUE} />
            <path d="M-8 9 q8 7 16 0" fill="none" stroke={ICE} strokeWidth="3" strokeLinecap="round" />
          </>
        ) : variant === 'wink' ? (
          <>
            {/* wink: left eye is a dot, right side infinity loop */}
            <circle cx="-9" cy="-3" r="2.8" fill={BLUE} />
            <path
              d="M2 -3 C-2 -10 12 -10 12 -3 C12 4 -2 4 2 -3 Z"
              fill="none" stroke={BLUE} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"
            />
            <path d="M-4 10 q4 4 8 0" fill="none" stroke={ICE} strokeWidth="2.6" strokeLinecap="round" />
          </>
        ) : (
          <>
            <InfinityGlow x={0} y={-2} s={1} />
            {/* subtle smile arc under the infinity */}
            <path d="M-8 12 q8 5 16 0" fill="none" stroke={ICE} strokeWidth="2.4" strokeLinecap="round" opacity="0.85" />
          </>
        )}
      </g>

      {/* blinking sheen strip over the visor */}
      <rect x="-25" y="-22" width="50" height="44" rx="15" fill="url(#sheen)" opacity="0.55" className="mascot-blink" />
    </g>
  );
}

/* Hoodie torso centred under a Head. */
function Torso({ cx = 60, top = 72, width: w = 62, height: h = 40 }) {
  const hw = w / 2;
  return (
    <g transform={`translate(${cx} ${top})`}>
      {/* backpack straps */}
      <path d={`M${-hw + 6} 4 q-6 10 -3 ${h - 8}`} fill="none" stroke={NAVY_SOFT} strokeWidth="6" strokeLinecap="round" />
      <path d={`M${hw - 6} 4 q6 10 3 ${h - 8}`} fill="none" stroke={NAVY_SOFT} strokeWidth="6" strokeLinecap="round" />
      {/* hoodie body */}
      <path
        d={`M${-hw} 8 Q0 -2 ${hw} 8 L${hw + 4} ${h} Q0 ${h + 8} ${-hw - 4} ${h} Z`}
        fill={NAVY_MID} stroke={INK} strokeWidth="2.6" strokeLinejoin="round"
      />
      {/* subtle side shadow */}
      <path d={`M${-hw + 3} 12 Q${-hw + 6} ${h - 4} ${-hw + 2} ${h}`} stroke="#0A1B36" strokeOpacity="0.55" strokeWidth="3" fill="none" />
      {/* drawstrings */}
      <path d="M-6 8 l-1.5 10" stroke="#EAF1FF" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M6 8 l1.5 10" stroke="#EAF1FF" strokeWidth="2.2" strokeLinecap="round" />
      {/* chest infinity glow */}
      <g className="mascot-glow">
        <InfinityGlow x={0} y={h / 2 + 4} s={0.7} strokeWidth={3.6} />
      </g>
    </g>
  );
}

function Glove({ x, y, r = 8.5 }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#F5F7FC" stroke={INK} strokeWidth="2.6" />
      <circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.25} fill="#fff" opacity="0.9" />
    </g>
  );
}

/* Sneaker: navy body, white sole + toe cap with a blue accent. */
function Shoe({ x, y, flip = false }) {
  return (
    <g transform={`translate(${x} ${y})${flip ? ' scale(-1 1)' : ''}`}>
      <path d="M-9 -4 Q-9 -10 -2 -10 L7 -10 Q12 -10 12 -4 L12 0 L-9 0 Z" fill={NAVY_MID} stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
      <rect x="-10" y="-1" width="23" height="5" rx="2.5" fill="#F5F7FC" stroke={INK} strokeWidth="2.2" />
      <path d="M4 -10 L12 -4" stroke={ICE} strokeWidth="2" strokeLinecap="round" />
      <circle cx="-2" cy="-4" r="1.4" fill={BLUE} />
    </g>
  );
}

function Sparkles({ cx = 60, positions }) {
  const pts = positions || [
    { x: cx - 46, y: 26, s: 3, o: 0.9 },
    { x: cx + 44, y: 12, s: 2.5, o: 0.7 },
    { x: cx + 50, y: 62, s: 2.2, o: 0.75 },
    { x: cx - 40, y: 68, s: 1.8, o: 0.55 },
  ];
  return (
    <g className="mascot-sparkle" fill={BLUE} aria-hidden="true">
      {pts.map((p, i) => (
        <path
          key={i}
          d={`M${p.x} ${p.y} l${p.s * 0.9} ${p.s * 2} ${p.s * 2} ${p.s * 0.9} -${p.s * 2} ${p.s * 0.9} -${p.s * 0.9} ${p.s * 2} -${p.s * 0.9} -${p.s * 2} -${p.s * 2} -${p.s * 0.9} ${p.s * 2} -${p.s * 0.9} z`}
          opacity={p.o}
        />
      ))}
    </g>
  );
}

/* Shared <defs>: visor sheen gradient used inside every pose. */
function Defs() {
  return (
    <defs>
      <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
        <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
    </defs>
  );
}

export default function Mascot({ pose = 'wave', width = 90, className = '' }) {
  if (pose === 'peek') {
    // Curious peek — winking expression, gloves gripping the edge.
    return (
      <svg viewBox="0 0 120 82" width={width} className={className} aria-hidden="true">
        <Defs />
        <Head cx={60} cy={46} variant="wink" />
        <Glove x={18} y={76} />
        <Glove x={102} y={76} />
      </svg>
    );
  }

  if (pose === 'sit') {
    // Thinking / sitting — hand-to-chin, dangling legs.
    return (
      <svg viewBox="0 0 120 152" width={width} className={className} aria-hidden="true">
        <Defs />
        <Head cx={60} cy={40} variant="wink" />
        <Torso cx={60} top={70} />
        {/* left glove rests, right glove up near the chin */}
        <Glove x={24} y={106} />
        <g>
          <path d="M96 106 Q90 84 78 74" fill="none" stroke={NAVY_MID} strokeWidth="9" strokeLinecap="round" />
          <Glove x={78} y={74} r={8.5} />
        </g>
        {/* dangling legs + sneakers */}
        <g className="mascot-leg-l" style={{ transformOrigin: '50px 114px' }}>
          <rect x="44" y="112" width="11" height="22" rx="5.5" fill={NAVY_MID} stroke={INK} strokeWidth="2.4" />
          <Shoe x={49} y={144} />
        </g>
        <g className="mascot-leg-r" style={{ transformOrigin: '70px 114px' }}>
          <rect x="65" y="112" width="11" height="22" rx="5.5" fill={NAVY_MID} stroke={INK} strokeWidth="2.4" />
          <Shoe x={71} y={144} flip />
        </g>
      </svg>
    );
  }

  if (pose === 'float') {
    // Happy floating with sparkles — used on landing accents.
    return (
      <svg viewBox="0 0 120 152" width={width} className={`mascot-bob ${className}`} aria-hidden="true">
        <Defs />
        <Sparkles cx={60} />
        <Head cx={60} cy={42} variant="happy" />
        <Torso cx={60} top={72} />
        <Glove x={22} y={102} />
        <Glove x={98} y={102} />
        {/* tucked legs */}
        <rect x="45" y="112" width="11" height="14" rx="5.5" fill={NAVY_MID} stroke={INK} strokeWidth="2.4" />
        <rect x="64" y="112" width="11" height="14" rx="5.5" fill={NAVY_MID} stroke={INK} strokeWidth="2.4" />
        <Shoe x={50} y={138} />
        <Shoe x={70} y={138} flip />
      </svg>
    );
  }

  // Default: wave — excited greeting with star sparkles + waving arm.
  return (
    <svg viewBox="0 0 130 152" width={width} className={className} aria-hidden="true">
      <Defs />
      <Sparkles cx={65} positions={[
        { x: 16, y: 30, s: 2.6, o: 0.8 },
        { x: 112, y: 22, s: 2.2, o: 0.7 },
        { x: 118, y: 96, s: 1.8, o: 0.6 },
      ]} />
      <Head cx={62} cy={42} variant="star" />
      <Torso cx={62} top={72} />
      {/* resting arm */}
      <Glove x={26} y={104} />
      {/* waving arm */}
      <g className="mascot-wave-arm" style={{ transformOrigin: '100px 94px' }}>
        <path d="M98 94 q6 -14 4 -28" fill="none" stroke={NAVY_MID} strokeWidth="9" strokeLinecap="round" />
        <Glove x={102} y={58} r={9} />
      </g>
      {/* standing legs + sneakers */}
      <rect x="48" y="114" width="11" height="20" rx="5.5" fill={NAVY_MID} stroke={INK} strokeWidth="2.4" />
      <rect x="66" y="114" width="11" height="20" rx="5.5" fill={NAVY_MID} stroke={INK} strokeWidth="2.4" />
      <Shoe x={53} y={144} />
      <Shoe x={73} y={144} flip />
    </svg>
  );
}
