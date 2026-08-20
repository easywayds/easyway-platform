// Inline SVG scenes for the Topic 8 interactive blocks — Managing Risk.
// Visual identity is deliberately different from Topics 3-7: risk
// stacking, attention, and changing conditions rather than intersections
// or sign shapes. Same navy/yellow visual language throughout.

const NAVY = "#0b2345";
const YELLOW = "#ffd400";
const ROAD = "#c9cfda";
const LANE_LINE = "#ffffff";
const CAR_A = "#0b2345";
const CAR_B = "#c4593b";

function svg(inner: string, viewBox = "0 0 400 260"): string {
  return `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" role="presentation">${inner}</svg>`;
}

function label(cx: number, y: number, text: string, color = NAVY, size = 11): string {
  return `<text x="${cx}" y="${y}" text-anchor="middle" font-family="Poppins,sans-serif" font-size="${size}" font-weight="700" fill="${color}">${text}</text>`;
}

function car(x: number, y: number, w: number, h: number, rotate: number, fill: string, tag: string): string {
  const cx = x + w / 2;
  const cy = y + h / 2;
  return `
    <g transform="rotate(${rotate} ${cx} ${cy})">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}" />
      <rect x="${x + 4}" y="${y + 4}" width="${w - 8}" height="${h * 0.35}" rx="2" fill="rgba(255,255,255,0.35)" />
    </g>
    ${tag ? label(cx, cy + h / 2 + 14, tag, NAVY, 10) : ""}
  `;
}

function rain(seed = 0): string {
  return Array.from({ length: 24 }, (_, i) => {
    const x = (i * 37 + seed) % 400;
    const y = (i * 53 + seed) % 260;
    return `<line x1="${x}" y1="${y}" x2="${x - 6}" y2="${y + 14}" stroke="#7c93c0" stroke-width="1.5"/>`;
  }).join("");
}

// ============================================================
// Chapter 1 — Risk Builds
// ============================================================

export const SCENE_T8_OPENING = svg(`
  <rect width="400" height="260" fill="#12192b"/>
  <rect x="0" y="120" width="400" height="60" fill="#2a3350"/>
  <line x1="0" y1="150" x2="400" y2="150" stroke="#5a6habb" stroke-width="2" stroke-dasharray="10,8"/>
  ${rain(10)}
  ${car(40, 130, 46, 26, 0, "#ffd400", "You")}
  ${car(220, 130, 46, 26, 0, "#c4593b", "Vehicle ahead")}
  <circle cx="80" cy="90" r="10" fill="#fff" opacity="0.85"/>
  ${label(80, 75, "Phone notification", "#fff", 9)}
  <rect x="0" y="200" width="400" height="60" fill="#0b2345"/>
  ${label(200, 235, "Intersection ahead", "#fff", 10)}
`);

export const SCENE_KEEP_OPTIONS_A = svg(`
  <rect width="360" height="140" fill="#fff"/>
  ${car(60, 55, 40, 24, 0, CAR_A, "Following closely")}
  ${car(160, 55, 40, 24, 0, CAR_B, "")}
  <circle cx="90" cy="30" r="7" fill="#7c93c0"/>
  ${label(90, 20, "Looking at phone", NAVY, 9)}
`, "0 0 360 140");

export const SCENE_KEEP_OPTIONS_B = svg(`
  <rect width="360" height="140" fill="#fff"/>
  ${car(50, 55, 40, 24, 0, CAR_A, "Maintaining space")}
  ${car(220, 55, 40, 24, 0, CAR_B, "")}
  ${label(50, 25, "Watching traffic ahead", "#1b7a3d", 9)}
`, "0 0 360 140");

// ============================================================
// Chapter 2 — When the Driver Becomes the Risk
// ============================================================

export const SCENE_LATE_SPEED = svg(`
  <rect width="360" height="140" fill="#fff"/>
  ${car(150, 60, 46, 26, 0, CAR_A, "You — running late")}
  ${label(180, 25, "Posted limit hasn't changed", NAVY, 10)}
`, "0 0 360 140");

export const SCENE_LANE_WEAVE = svg(`
  <rect width="360" height="140" fill="#fff"/>
  <rect width="360" height="140" fill="${ROAD}"/>
  <line x1="120" y1="0" x2="120" y2="140" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <line x1="240" y1="0" x2="240" y2="140" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${car(30, 55, 40, 24, 15, "#ffd400", "You — weaving")}
  ${car(150, 55, 36, 22, 0, "#8a97b8", "")}
  ${car(270, 55, 36, 22, 0, "#8a97b8", "")}
`, "0 0 360 140");

export const SCENE_YELLOW_FAR = svg(`
  <rect width="360" height="160" fill="#fff"/>
  <rect width="360" height="160" fill="${ROAD}"/>
  ${car(50, 65, 46, 26, 0, "#ffd400", "You")}
  <rect x="220" y="30" width="14" height="40" rx="6" fill="${NAVY}"/>
  <circle cx="227" cy="42" r="5" fill="#e8c22a"/>
  ${label(227, 20, "Signal changing", NAVY, 9)}
`, "0 0 360 160");

export const SCENE_FATIGUE_SIGNS = svg(`
  <rect width="360" height="160" fill="#12192b"/>
  <rect width="360" height="160" fill="#12192b"/>
  ${car(150, 65, 46, 26, 0, "#ffd400", "You — yawning, missed exit sign")}
`, "0 0 360 160");

export const SCENE_ILLNESS = svg(`
  <rect width="360" height="140" fill="#fff"/>
  ${car(150, 55, 46, 26, 0, CAR_A, "You — dizzy, hard to concentrate")}
`, "0 0 360 140");

// ============================================================
// Chapter 3 — Where Is Your Attention?
// ============================================================

export const SCENE_ATTENTION_ROAD = svg(`
  <rect width="360" height="160" fill="#fff"/>
  ${car(150, 65, 46, 26, 0, CAR_A, "Eyes on the road")}
  <rect x="260" y="30" width="30" height="30" fill="#e34b3c" opacity="0.9"/>
  ${label(275, 20, "Brake lights ahead", "#8a3a25", 9)}
`, "0 0 360 160");

export const SCENE_ATTENTION_PHONE = svg(`
  <rect width="360" height="160" fill="#fff"/>
  ${car(150, 65, 46, 26, 0, CAR_A, "Looking at phone")}
  <rect x="260" y="30" width="30" height="30" fill="#e34b3c" opacity="0.9"/>
  ${label(275, 20, "Brake lights — missed", "#8a3a25", 9)}
`, "0 0 360 160");

export const SCENE_LOOK_AWAY_SEQUENCE = svg(`
  <rect width="400" height="160" fill="#fff"/>
  ${car(30, 65, 40, 24, 0, CAR_A, "")}
  ${car(120, 65, 40, 24, 0, CAR_A, "")}
  ${car(220, 65, 40, 24, 0, CAR_A, "")}
  ${car(330, 65, 40, 24, 0, CAR_A, "")}
  <path d="M50 40 L350 40" stroke="${NAVY}" stroke-width="2" stroke-dasharray="4,6" marker-end="url(#t8arrow)"/>
  <defs><marker id="t8arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${NAVY}"/></marker></defs>
  ${label(200, 20, "The vehicle keeps moving while eyes are away", NAVY, 10)}
`, "0 0 400 160");

export const SCENE_PASSENGER_LOOK = svg(`
  <rect width="360" height="140" fill="#fff"/>
  ${car(150, 55, 46, 26, 0, CAR_A, "You")}
  <circle cx="240" cy="45" r="8" fill="#8a5d14"/>
  ${label(240, 25, "\\u201cLook at this.\\u201d", NAVY, 9)}
`, "0 0 360 140");

// ============================================================
// Chapter 4 — Speed & Protection
// ============================================================

export const SCENE_SPEED_DRY = svg(`<rect width="300" height="120" fill="#fff"/>${car(120,45,46,26,0,CAR_A,"")}${label(150,20,"Dry + clear",NAVY,10)}`, "0 0 300 120");
export const SCENE_SPEED_RAIN = svg(`<rect width="300" height="120" fill="#fff"/>${rain(4)}${car(120,45,46,26,0,CAR_A,"")}${label(150,20,"Heavy rain",NAVY,10)}`, "0 0 300 120");
export const SCENE_SPEED_NIGHT = svg(`<rect width="300" height="120" fill="#12192b"/>${car(120,45,46,26,0,"#ffd400","")}${label(150,20,"Night + poor visibility","#fff",10)}`, "0 0 300 120");

export const SCENE_STREET_RACING = svg(`
  <rect width="400" height="200" fill="#fff"/>
  <rect width="400" height="200" fill="${ROAD}"/>
  <line x1="0" y1="100" x2="400" y2="100" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${car(30, 40, 44, 24, 0, CAR_A, "")}
  ${car(30, 130, 44, 24, 0, CAR_B, "")}
  <circle cx="300" cy="60" r="8" fill="#2f8066"/>
  ${label(300, 40, "Unpredictable traffic", NAVY, 9)}
  ${label(200, 180, "Public roadway — not a closed course", "#8a3a25", 11)}
`, "0 0 400 200");

export const SCENE_SHORT_TRIP = svg(`
  <rect width="360" height="140" fill="#fff"/>
  ${car(150, 55, 46, 26, 0, CAR_A, "\\u201cIt's just a few blocks.\\u201d")}
`, "0 0 360 140");

// ============================================================
// Chapter 5 — Driving After Dark
// ============================================================

export const SCENE_DAY_VIEW = svg(`
  <rect width="360" height="180" fill="#fff"/>
  <rect width="360" height="180" fill="${ROAD}"/>
  ${car(150, 75, 46, 26, 0, CAR_A, "You")}
  <circle cx="280" cy="70" r="7" fill="#2f8066"/>
  ${label(280, 50, "Pedestrian", NAVY, 9)}
  <path d="M0 30 Q 180 0 360 40" stroke="${NAVY}" stroke-width="2" fill="none"/>
  ${label(180, 20, "Curve ahead", NAVY, 9)}
`, "0 0 360 180");

export const SCENE_NIGHT_VIEW = svg(`
  <rect width="360" height="180" fill="#0b0f1c"/>
  <rect x="0" y="90" width="360" height="90" fill="#161d33"/>
  ${car(150, 90, 46, 26, 0, "#ffd400", "You")}
  <path d="M172 90 L120 40 L224 40 Z" fill="rgba(255,212,0,0.15)"/>
  ${label(180, 20, "Only headlight range is visible", "#fff", 9)}
`, "0 0 360 180");

export const SCENE_GLARE = svg(`
  <rect width="360" height="160" fill="#0b0f1c"/>
  ${car(90, 90, 46, 26, 0, "#ffd400", "You")}
  ${car(230, 90, 46, 26, 180, "#c4593b", "Oncoming — bright headlights")}
  <circle cx="253" cy="103" r="14" fill="#fff" opacity="0.5"/>
  <circle cx="277" cy="103" r="14" fill="#fff" opacity="0.5"/>
`, "0 0 360 160");

// ============================================================
// Chapter 6 — Awareness & Final Application
// ============================================================

export const SCENE_INDICATOR_CARD = svg(`
  <rect width="320" height="120" fill="#fff"/>
  <rect x="10" y="10" width="300" height="100" rx="10" fill="#f6f7fb" stroke="${NAVY}" stroke-width="1.5"/>
`, "0 0 320 120");

export const SCENE_FINAL_CHALLENGE = svg(`
  <rect width="400" height="260" fill="#12192b"/>
  <rect x="0" y="140" width="400" height="60" fill="#2a3350"/>
  <line x1="0" y1="170" x2="400" y2="170" stroke="#5a6habb" stroke-width="2" stroke-dasharray="10,8"/>
  ${rain(6)}
  ${car(40, 150, 46, 26, 0, "#ffd400", "You — tired")}
  ${car(220, 150, 46, 26, 0, "#c4593b", "Traffic slowing")}
  <circle cx="90" cy="110" r="10" fill="#fff" opacity="0.85"/>
  ${label(90, 95, "Phone notification", "#fff", 9)}
  ${label(200, 230, "Passenger talking", "#fff", 10)}
`);

export const SCENE_MISTAKE_RISK_A = svg(`
  <rect width="360" height="160" fill="#12192b"/>
  ${rain(8)}
  ${car(150, 65, 46, 26, 0, "#ffd400", "Phone in hand, following closely")}
`, "0 0 360 160");

export const SCENE_MISTAKE_RISK_B = svg(`
  <rect width="360" height="160" fill="#fff"/>
  ${car(150, 65, 46, 26, 0, CAR_A, "Space maintained, attention forward")}
`, "0 0 360 160");
