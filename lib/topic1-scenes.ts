// Inline SVG scenes for the Topic 1 interactive blocks — Welcome to Easy
// Way. Same navy/yellow/Poppins visual language as Topics 3-8. Topic 1's
// opening and closing scenes are deliberately the same intersection — the
// spec calls for a full-circle "open with a decision, close by applying a
// framework to that same decision" structure.

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

function person(cx: number, cy: number, color = "#2f8066", tag = ""): string {
  return `
    <circle cx="${cx}" cy="${cy}" r="7" fill="${color}" />
    <rect x="${cx - 5}" y="${cy + 7}" width="10" height="16" rx="3" fill="${color}" />
    ${tag ? label(cx, cy - 12, tag, NAVY, 9) : ""}
  `;
}

// ============================================================
// Opening / Closing — the intersection the Topic returns to
// ============================================================

export const SCENE_T1_INTERSECTION = svg(`
  <rect width="400" height="260" fill="#fff"/>
  <rect width="400" height="260" fill="${ROAD}"/>
  <rect x="0" y="100" width="400" height="60" fill="#e8ebf1"/>
  <rect x="170" y="0" width="60" height="260" fill="#e8ebf1"/>
  <line x1="0" y1="130" x2="400" y2="130" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <line x1="200" y1="0" x2="200" y2="260" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${car(40, 108, 44, 24, 0, "#ffd400", "You")}
  ${car(280, 108, 44, 24, 180, CAR_B, "Vehicle ahead")}
  ${car(184, 20, 24, 40, 90, CAR_A, "")}
  ${label(196, 12, "Approaching cross traffic", NAVY, 9)}
  ${person(150, 90, "#2f8066", "Pedestrian")}
  <rect x="230" y="30" width="14" height="40" rx="6" fill="${NAVY}"/>
  <circle cx="237" cy="42" r="5" fill="#2f8066"/>
  ${label(237, 20, "Signal", NAVY, 9)}
  <circle cx="330" cy="70" r="16" fill="#fff" stroke="${NAVY}" stroke-width="2"/>
  ${label(330, 68, "30", NAVY, 12)}
  ${label(330, 80, "SPEED LIMIT", NAVY, 6)}
`);

// ============================================================
// Lesson 1.2 — Driving Is a Privilege
// ============================================================

export const SCENE_WHO_IS_AFFECTED = svg(`
  <rect width="400" height="260" fill="#fff"/>
  <rect width="400" height="260" fill="${ROAD}"/>
  <rect x="0" y="0" width="70" height="260" fill="#e8ebf1"/>
  ${car(90, 110, 46, 26, 0, "#ffd400", "")}
  ${car(260, 60, 40, 24, 0, CAR_B, "")}
  ${person(200, 170, "#2f8066", "")}
  ${person(30, 60, "#8a5d14", "")}
  <circle cx="330" cy="180" r="9" fill="#3a6ea5"/>
  <rect x="322" y="188" width="16" height="6" fill="#3a6ea5"/>
  <circle cx="200" cy="30" r="8" fill="#c4593b"/>
  <rect x="192" y="20" width="16" height="10" fill="#e8c22a"/>
`);

// ============================================================
// Lesson 1.3 — Understanding Driving Risk
// ============================================================

export const SCENE_RISK_LAYERS = svg(`
  <rect width="400" height="220" fill="#e9ecf2"/>
  ${car(160, 90, 46, 26, 0, CAR_A, "You")}
  ${car(280, 90, 40, 24, 0, CAR_B, "")}
  ${person(80, 80, "#2f8066", "")}
  <g opacity="0.7">
    <line x1="20" y1="20" x2="14" y2="34" stroke="#7c93c0" stroke-width="1.5"/>
    <line x1="50" y1="15" x2="44" y2="30" stroke="#7c93c0" stroke-width="1.5"/>
    <line x1="90" y1="10" x2="84" y2="26" stroke="#7c93c0" stroke-width="1.5"/>
  </g>
  <rect x="330" y="130" width="50" height="40" fill="#e8c22a" opacity="0.85"/>
  ${label(355, 125, "Construction", NAVY, 8)}
`, "0 0 400 220");

// ============================================================
// Lesson 1.4 — Traffic Laws Are Decision Tools
// ============================================================

export const SCENE_TRAFFIC_CHAOS = svg(`
  <rect width="360" height="150" fill="#fff"/>
  ${car(30, 30, 40, 22, 20, CAR_A, "")}
  ${car(150, 20, 40, 22, -15, CAR_B, "")}
  ${car(250, 60, 40, 22, 35, CAR_A, "")}
  ${car(80, 90, 40, 22, -25, CAR_B, "")}
  ${car(200, 100, 40, 22, 10, CAR_A, "")}
  ${label(180, 135, "No shared rules — no one knows what to expect", "#8a3a25", 10)}
`, "0 0 360 150");

export const SCENE_TRAFFIC_ORGANIZED = svg(`
  <rect width="360" height="150" fill="#fff"/>
  <rect width="360" height="150" fill="${ROAD}"/>
  <line x1="180" y1="0" x2="180" y2="150" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${car(40, 60, 44, 24, 0, CAR_A, "")}
  ${car(240, 60, 44, 24, 180, CAR_B, "")}
  <rect x="160" y="20" width="14" height="36" rx="6" fill="${NAVY}"/>
  <circle cx="167" cy="32" r="5" fill="#c4593b"/>
  ${label(180, 135, "Shared expectations — everyone knows what to expect", "#1b7a3d", 10)}
`, "0 0 360 150");

// ============================================================
// Lesson 1.5 — Your Choices Have Consequences
// ============================================================

export const SCENE_LATE_CHOICE = svg(`
  <rect width="360" height="140" fill="#fff"/>
  ${car(150, 55, 46, 26, 0, "#ffd400", "You — running late")}
  ${label(180, 20, "Posted limit hasn't changed", NAVY, 10)}
`, "0 0 360 140");

export const SCENE_TRAFFIC_SLOWING = svg(`
  <rect width="360" height="140" fill="#fff"/>
  ${car(140, 55, 46, 26, 0, CAR_A, "You")}
  ${car(250, 55, 40, 24, 0, CAR_B, "Traffic ahead slowing")}
`, "0 0 360 140");

// ============================================================
// Lesson 1.6 — The Easy Way SAFE System
// ============================================================

export const SCENE_SAFE_SEE = svg(`
  <rect width="360" height="160" fill="#fff"/>
  <rect width="360" height="160" fill="${ROAD}"/>
  ${car(150, 65, 46, 26, 0, CAR_A, "You")}
  ${car(260, 30, 36, 22, 0, CAR_B, "")}
  ${person(90, 40, "#2f8066", "")}
  <rect x="230" y="90" width="14" height="34" rx="6" fill="${NAVY}"/>
  <circle cx="237" cy="100" r="5" fill="#e8c22a"/>
  ${label(180, 20, "SEE — what's actually happening?", NAVY, 10)}
`, "0 0 360 160");

export const SCENE_SAFE_ANTICIPATE = svg(`
  <rect width="360" height="160" fill="#fff"/>
  <rect width="360" height="160" fill="${ROAD}"/>
  ${car(150, 65, 46, 26, 0, CAR_A, "You")}
  ${person(90, 40, "#2f8066", "May step out")}
  <path d="M90 47 L90 65" stroke="#8a3a25" stroke-width="2" stroke-dasharray="3,4" marker-end="url(#t1arrow)"/>
  <defs><marker id="t1arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#8a3a25"/></marker></defs>
  ${label(180, 20, "ANTICIPATE — what could change next?", NAVY, 10)}
`, "0 0 360 160");

export const SCENE_SAFE_SPACE = svg(`
  <rect width="360" height="160" fill="#fff"/>
  <rect width="360" height="160" fill="${ROAD}"/>
  ${car(60, 65, 46, 26, 0, CAR_A, "You")}
  ${car(230, 65, 40, 24, 0, CAR_B, "")}
  <path d="M108 78 L228 78" stroke="${NAVY}" stroke-width="2" marker-end="url(#t1arrow2)" marker-start="url(#t1arrow2s)"/>
  <defs>
    <marker id="t1arrow2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${NAVY}"/></marker>
    <marker id="t1arrow2s" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 Z" fill="${NAVY}"/></marker>
  </defs>
  ${label(180, 20, "FIND SPACE — where's your margin?", NAVY, 10)}
`, "0 0 360 160");

export const SCENE_SAFE_EXECUTE = svg(`
  <rect width="360" height="160" fill="#fff"/>
  <rect width="360" height="160" fill="${ROAD}"/>
  ${car(60, 65, 46, 26, 0, "#1b7a3d", "You — controlled response")}
  ${label(180, 20, "EXECUTE SAFELY — the legal, controlled response", NAVY, 10)}
`, "0 0 360 160");
