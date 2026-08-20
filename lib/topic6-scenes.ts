// Inline SVG scenes for the Topic 6 interactive blocks — Alcohol and Other
// Drugs. Deliberately fewer, calmer visuals than Topics 3-5: this topic is
// about decisions, not roadway mechanics, and the tone standard explicitly
// rules out crash/gore imagery and dramatization. Same navy/yellow visual
// language as the rest of the Easy Way Interactive Lesson Standard.

const NAVY = "#0b2345";
const YELLOW = "#ffd400";
const CAR_A = "#0b2345";
const ROAD = "#c9cfda";
const LANE_LINE = "#ffffff";

function svg(inner: string, viewBox = "0 0 400 260"): string {
  return `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" role="presentation">${inner}</svg>`;
}

function label(cx: number, y: number, text: string, color = NAVY, size = 12): string {
  return `<text x="${cx}" y="${y}" text-anchor="middle" font-family="Poppins,sans-serif" font-size="${size}" font-weight="700" fill="${color}">${text}</text>`;
}

function person(cx: number, cy: number, fill = NAVY): string {
  return `<circle cx="${cx}" cy="${cy - 22}" r="10" fill="${fill}"/><rect x="${cx - 10}" y="${cy - 10}" width="20" height="30" rx="8" fill="${fill}"/>`;
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

// ============================================================
// Chapter 1 — How Impairment Changes Driving
// ============================================================

export const SCENE_LEAVING_EVENT = svg(`
  <rect width="400" height="260" fill="#fff"/>
  <rect x="0" y="0" width="400" height="150" fill="#f2ecdd"/>
  <rect x="0" y="150" width="400" height="110" fill="${ROAD}"/>
  ${person(120, 100)}
  ${person(190, 105)}
  <rect x="150" y="60" width="30" height="20" rx="3" fill="#c9a63d"/>
  ${label(165, 55, "glass", NAVY, 8)}
  ${car(280, 175, 60, 34, 0, CAR_A, "Your vehicle")}
  ${label(155, 130, "“You look fine. It's only a short drive.”", "#48597d", 11)}
`);

export const SCENE_NORMAL_SCAN = svg(`
  <rect width="400" height="220" fill="#fff"/>
  <rect x="0" y="80" width="400" height="60" fill="${ROAD}"/>
  <line x1="0" y1="110" x2="400" y2="110" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${car(60, 86, 46, 26, 0, CAR_A, "You")}
  <circle cx="330" cy="60" r="12" fill="${NAVY}"/><circle cx="330" cy="60" r="5" fill="#1b7a3d"/>
  <circle cx="340" cy="150" r="8" fill="#2f8066"/>
  ${label(340, 175, "Pedestrian", NAVY, 9)}
  ${label(200, 30, "Full scan: signal, pedestrian, gap all noticed in time", "#1b7a3d", 11)}
`, "0 0 400 220");

export const SCENE_IMPAIRED_SCAN = svg(`
  <rect width="400" height="220" fill="#fff"/>
  <rect x="0" y="80" width="400" height="60" fill="${ROAD}"/>
  <line x1="0" y1="110" x2="400" y2="110" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${car(60, 86, 46, 26, 0, CAR_A, "You")}
  <circle cx="330" cy="60" r="12" fill="${NAVY}"/><circle cx="330" cy="60" r="5" fill="#1b7a3d"/>
  <circle cx="340" cy="150" r="8" fill="#2f8066" opacity="0.35"/>
  <text x="340" y="175" text-anchor="middle" font-family="Poppins,sans-serif" font-size="9" font-weight="700" fill="#8a3a25">Pedestrian — noticed late</text>
  <path d="M106 99 L 300 99" stroke="#8a3a25" stroke-width="2" stroke-dasharray="3,5"/>
  ${label(200, 30, "Same scene — recognition and reaction both arrive late", "#8a3a25", 11)}
`, "0 0 400 220");

export const SCENE_CONFIDENT_DRIVER = svg(`
  <rect width="400" height="220" fill="#fff"/>
  <rect x="0" y="80" width="400" height="60" fill="${ROAD}"/>
  <line x1="0" y1="110" x2="400" y2="110" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${car(60, 86, 46, 26, 8, CAR_A, "“I'm okay”")}
  ${label(200, 40, "Delayed reaction · drifting position · following too closely", "#8a3a25", 11)}
`, "0 0 400 220");

// ============================================================
// Chapter 3 — Alcohol Isn't the Only Risk
// ============================================================

function medLabel(text: string): string {
  return svg(`
    <rect width="360" height="180" fill="#fff"/>
    <rect x="30" y="20" width="300" height="140" rx="10" fill="#fdf7e3" stroke="${NAVY}" stroke-width="2"/>
    <rect x="30" y="20" width="300" height="34" rx="10" fill="${NAVY}"/>
    ${label(180, 43, "WARNING LABEL", "#fff", 12)}
    <text x="180" y="110" text-anchor="middle" font-family="Poppins,sans-serif" font-size="13" font-weight="600" fill="${NAVY}">${text}</text>
  `, "0 0 360 180");
}

export const SCENE_LABEL_DROWSY = medLabel("May cause drowsiness");
export const SCENE_LABEL_MACHINERY = medLabel("Do not operate machinery until you know how this medication affects you");
export const SCENE_LABEL_DIZZY = medLabel("May cause dizziness");

function statementCard(x: number, y: number, w: number, h: number, text: string[]): string {
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#f6f7fb" stroke="${NAVY}" stroke-width="1.5"/>
    ${text.map((line, i) => label(x + w / 2, y + h / 2 - (text.length - 1) * 7 + i * 14, line, NAVY, 10)).join("")}
  `;
}

// Four-statement grid for the mistake-spotter hotspot — matches the
// pick-one hotspot's x/y percentages laid out as a simple 2x2 card grid.
export const SCENE_MISTAKE_CARDS = svg(`
  <rect width="400" height="260" fill="#fff"/>
  ${statementCard(20, 20, 170, 90, ["“Coffee will", "sober me up.”"])}
  ${statementCard(210, 20, 170, 90, ["“Prescription means", "safe to drive.”"])}
  ${statementCard(20, 130, 170, 90, ["“I'm under .08, so", "I'm automatically safe.”"])}
  ${statementCard(210, 130, 170, 90, ["“I should arrange a", "sober ride before I", "need one.”"])}
`);

// ============================================================
// Chapter 5 — Open Container, Implied Consent & ALR
// ============================================================

export const SCENE_VEHICLE_INTERIOR = svg(`
  <rect width="400" height="260" fill="#fff"/>
  <rect x="40" y="40" width="320" height="180" rx="20" fill="#eef1f7" stroke="${NAVY}" stroke-width="2"/>
  <line x1="200" y1="40" x2="200" y2="220" stroke="${NAVY}" stroke-width="1.5" stroke-dasharray="4,4"/>
  <circle cx="120" cy="90" r="14" fill="#dfe3ee" stroke="${NAVY}" stroke-width="1.5"/>
  ${label(120, 130, "Cup holder", NAVY, 9)}
  <rect x="255" y="70" width="40" height="26" rx="4" fill="#dfe3ee" stroke="${NAVY}" stroke-width="1.5"/>
  ${label(275, 112, "Glove box (locked)", NAVY, 9)}
  <rect x="80" y="180" width="40" height="20" fill="#dfe3ee" stroke="${NAVY}" stroke-width="1.5"/>
  ${label(100, 214, "Passenger floor", NAVY, 9)}
  <rect x="250" y="170" width="90" height="30" fill="#dfe3ee" stroke="${NAVY}" stroke-width="1.5"/>
  ${label(295, 214, "Trunk", NAVY, 9)}
`);

export const SCENE_ALR_FLOW = svg(`
  <rect width="400" height="240" fill="#fff"/>
  ${[
    { y: 20, text: "Arrest / qualifying event" },
    { y: 80, text: "Breath or blood test — or refusal" },
    { y: 140, text: "Administrative process (separate from court)" },
    { y: 200, text: "Possible license suspension" },
  ]
    .map(
      (row, i, arr) => `
      <rect x="40" y="${row.y}" width="320" height="42" rx="10" fill="${i === arr.length - 1 ? "#fff7e0" : "#eef1f7"}" stroke="${NAVY}" stroke-width="1.5"/>
      ${label(200, row.y + 26, row.text, NAVY, 11)}
      ${i < arr.length - 1 ? `<line x1="200" y1="${row.y + 42}" x2="200" y2="${row.y + 60}" stroke="${NAVY}" stroke-width="2" marker-end="url(#alrArrow)"/>` : ""}
    `
    )
    .join("")}
  <defs><marker id="alrArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${NAVY}"/></marker></defs>
`, "0 0 400 240");

// ============================================================
// Chapter 6 — The Decision Before Driving
// ============================================================

export const SCENE_FRIEND_KEYS = svg(`
  <rect width="400" height="220" fill="#fff"/>
  ${person(130, 110)}
  ${person(230, 115)}
  <rect x="175" y="150" width="20" height="10" fill="${YELLOW}" stroke="${NAVY}" stroke-width="1"/>
  ${label(185, 175, "keys", NAVY, 9)}
  ${label(200, 30, "Your friend reaches for their keys after drinking", "#8a3a25", 11)}
`, "0 0 400 220");

export const SCENE_SAFE_PLAN = svg(`
  <rect width="400" height="200" fill="#fff"/>
  ${person(90, 100)}
  ${car(200, 90, 60, 34, 0, "#2f8066", "Sober driver")}
  ${label(200, 170, "Plan made before drinking started", "#1b7a3d", 12)}
`, "0 0 400 200");
