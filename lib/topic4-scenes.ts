// Inline SVG scenes for the Topic 4 interactive blocks — signs, signals,
// and pavement markings, in the same navy/yellow visual language and
// top-down road style established in topic3-scenes.ts. Vehicles are
// always labeled "Vehicle A/B", never distinguished by color alone.

const ROAD = "#c9cfda";
const LANE_LINE = "#ffffff";
const NAVY = "#0b2345";
const YELLOW = "#ffd400";
const CAR_A = "#0b2345";
const CAR_B = "#c4593b";
const CAR_C = "#2f8066";
const SIGN_RED = "#b3261e";
const SIGN_ORANGE = "#d9720b";
const SIGN_GREEN = "#1b6b3a";
const SIGN_BLUE = "#1a4f9c";
const SIGN_BROWN = "#6b4a2b";
const SIGN_YG = "#c6e21e"; // fluorescent yellow-green, school/ped signs

function car(x: number, y: number, w: number, h: number, rotate: number, fill: string, label: string): string {
  const cx = x + w / 2;
  const cy = y + h / 2;
  return `
    <g transform="rotate(${rotate} ${cx} ${cy})">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}" />
      <rect x="${x + 4}" y="${y + 4}" width="${w - 8}" height="${h * 0.35}" rx="2" fill="rgba(255,255,255,0.35)" />
    </g>
    <text x="${cx}" y="${cy + h / 2 + 14}" text-anchor="middle" font-family="Poppins,sans-serif" font-size="11" font-weight="700" fill="${NAVY}">${label}</text>
  `;
}

function svg(inner: string, viewBox = "0 0 400 300"): string {
  return `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" role="presentation">${inner}</svg>`;
}

function label(cx: number, y: number, text: string, color = NAVY, size = 12): string {
  return `<text x="${cx}" y="${y}" text-anchor="middle" font-family="Poppins,sans-serif" font-size="${size}" font-weight="700" fill="${color}">${text}</text>`;
}

// --- Sign glyphs, centered at (cx, cy) ---
function octagon(cx: number, cy: number, r: number, fill: string, stroke: string): string {
  const pts = Array.from({ length: 8 }, (_, i) => {
    const a = (Math.PI / 8) + (i * Math.PI) / 4;
    return `${cx + r * Math.sin(a)},${cy - r * Math.cos(a)}`;
  }).join(" ");
  return `<polygon points="${pts}" fill="${fill}" stroke="${stroke}" stroke-width="4"/>`;
}

function triangleDown(cx: number, cy: number, r: number, fill: string, stroke: string): string {
  const h = r * 1.6;
  return `<polygon points="${cx - r},${cy - h / 2} ${cx + r},${cy - h / 2} ${cx},${cy + h / 2}" fill="${fill}" stroke="${stroke}" stroke-width="6"/>`;
}

function diamond(cx: number, cy: number, r: number, fill: string, stroke: string): string {
  return `<rect x="${cx - r}" y="${cy - r}" width="${r * 2}" height="${r * 2}" transform="rotate(45 ${cx} ${cy})" fill="${fill}" stroke="${stroke}" stroke-width="4"/>`;
}

function pentagon(cx: number, cy: number, r: number, fill: string, stroke: string): string {
  const pts = Array.from({ length: 5 }, (_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
  return `<polygon points="${pts}" fill="${fill}" stroke="${stroke}" stroke-width="4"/>`;
}

function roundSign(cx: number, cy: number, r: number, fill: string, stroke: string): string {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="4"/>`;
}

function rectSign(cx: number, cy: number, w: number, h: number, fill: string, stroke: string): string {
  return `<rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="4"/>`;
}

function crossbuck(cx: number, cy: number): string {
  return `
    <g stroke="${NAVY}" stroke-width="3">
      <line x1="${cx - 70}" y1="${cy + 16}" x2="${cx + 70}" y2="${cy - 16}" />
      <line x1="${cx - 70}" y1="${cy - 16}" x2="${cx + 70}" y2="${cy + 16}" />
    </g>
    <rect x="${cx - 74}" y="${cy - 10}" width="148" height="20" fill="#fff" stroke="${NAVY}" stroke-width="3" transform="rotate(-13 ${cx} ${cy})"/>
    <rect x="${cx - 74}" y="${cy - 10}" width="148" height="20" fill="#fff" stroke="${NAVY}" stroke-width="3" transform="rotate(13 ${cx} ${cy})"/>
    <text x="${cx}" y="${cy - 22}" text-anchor="middle" font-family="Poppins,sans-serif" font-size="9" font-weight="700" fill="${NAVY}" transform="rotate(-13 ${cx} ${cy - 22})">RAILROAD</text>
    <text x="${cx}" y="${cy + 30}" text-anchor="middle" font-family="Poppins,sans-serif" font-size="9" font-weight="700" fill="${NAVY}" transform="rotate(13 ${cx} ${cy + 30})">CROSSING</text>
  `;
}

// A single sign, centered, with a caption below — used for shape/color
// recognition rounds where the sign itself is the whole scene.
function signCard(glyph: string, caption: string): string {
  return svg(`
    <rect width="400" height="280" fill="#fff"/>
    ${glyph}
    <text x="200" y="255" text-anchor="middle" font-family="Poppins,sans-serif" font-size="13" font-weight="600" fill="#48597d">${caption}</text>
  `, "0 0 400 280");
}

function roadRow(y = 120, h = 60): string {
  return `<rect x="0" y="${y}" width="400" height="${h}" fill="${ROAD}"/><line x1="0" y1="${y + h / 2}" x2="400" y2="${y + h / 2}" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>`;
}

function signalStack(cx: number, cy: number, active: "red" | "yellow" | "green" | null): string {
  const dim = (c: string, on: boolean) => (on ? c : "#3a4a6b");
  return `
    <rect x="${cx - 16}" y="${cy - 44}" width="32" height="88" rx="6" fill="${NAVY}"/>
    <circle cx="${cx}" cy="${cy - 28}" r="11" fill="${dim(SIGN_RED, active === "red")}"/>
    <circle cx="${cx}" cy="${cy}" r="11" fill="${dim("#e8c22a", active === "yellow")}"/>
    <circle cx="${cx}" cy="${cy + 28}" r="11" fill="${dim(SIGN_GREEN, active === "green")}"/>
  `;
}

// ============================================================
// Chapter 1 — How the Road Communicates
// ============================================================

export const SCENE_T4_OPENING = svg(`
  <rect width="400" height="300" fill="#fff"/>
  ${roadRow(150, 60)}
  <rect x="170" y="0" width="60" height="300" fill="${ROAD}"/>
  <line x1="200" y1="0" x2="200" y2="300" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${signalStack(200, 55, "green")}
  ${diamond(70, 90, 20, "#fff", "#e8c22a")}
  ${triangleDown(330, 220, 18, "#fff", SIGN_RED)}
  <rect x="0" y="255" width="400" height="45" fill="${ROAD}"/>
  <line x1="200" y1="255" x2="200" y2="300" stroke="#e8c22a" stroke-width="3"/>
  <path d="M60 240 L60 200" stroke="#fff" stroke-width="3" marker-end="url(#t4arrow1)"/>
  <defs><marker id="t4arrow1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#fff"/></marker></defs>
  <rect x="330" y="10" width="34" height="34" transform="rotate(45 347 27)" fill="${SIGN_ORANGE}" stroke="${NAVY}" stroke-width="2"/>
  ${label(200, 285, "Signal · warning sign · yield sign · pavement arrow · double yellow · work-zone sign ahead", "#48597d", 10)}
`);

export const SCENE_CAT_REGULATE = signCard(
  `${octagon(200, 110, 60, SIGN_RED, "#fff")}<text x="200" y="120" text-anchor="middle" font-family="Poppins,sans-serif" font-size="20" font-weight="800" fill="#fff">STOP</text>`,
  "Tells you what the law requires you to do."
);

export const SCENE_CAT_WARN = signCard(
  `${diamond(200, 110, 55, "#fff", "#e8c22a")}<text x="200" y="118" text-anchor="middle" font-family="Poppins,sans-serif" font-size="13" font-weight="800" fill="#3a2f00">CURVE</text>`,
  "Tells you what to prepare for ahead."
);

export const SCENE_CAT_GUIDE = signCard(
  `${rectSign(200, 110, 150, 60, SIGN_GREEN, "#fff")}<text x="200" y="120" text-anchor="middle" font-family="Poppins,sans-serif" font-size="14" font-weight="800" fill="#fff">Austin 12</text>`,
  "Guides you toward a destination or route."
);

// ============================================================
// Chapter 2 — Sign Shapes & Colors
// ============================================================

export const SCENE_SHAPE_OCTAGON = signCard(octagon(200, 110, 65, SIGN_RED, "#fff"), "Octagon — reserved for one sign only.");
export const SCENE_SHAPE_TRIANGLE = signCard(triangleDown(200, 115, 68, "#fff", SIGN_RED), "Downward triangle — reserved for one sign only.");
export const SCENE_SHAPE_DIAMOND = signCard(diamond(200, 110, 60, "#fff", "#e8c22a"), "Diamond — the general warning-sign shape.");
export const SCENE_SHAPE_PENTAGON = signCard(pentagon(200, 100, 62, SIGN_YG, NAVY), "Pentagon — school-related warning/crossing context.");
export const SCENE_SHAPE_ROUND = signCard(roundSign(200, 110, 62, "#e8c22a", NAVY) + label(200, 118, "RR", NAVY, 22), "Round — advance railroad warning.");

export const SCENE_COLOR_RED = signCard(
  `${octagon(200, 110, 60, SIGN_RED, "#fff")}<text x="200" y="120" text-anchor="middle" font-family="Poppins,sans-serif" font-size="20" font-weight="800" fill="#fff">STOP</text>`,
  "Red — stop or a prohibition."
);
export const SCENE_COLOR_WHITE = signCard(
  `${rectSign(200, 110, 100, 130, "#fff", NAVY)}${label(200, 90, "SPEED", NAVY, 14)}${label(200, 130, "LIMIT", NAVY, 14)}${label(200, 165, "45", SIGN_RED, 28)}`,
  "White — a regulatory requirement."
);
export const SCENE_COLOR_YELLOW = signCard(diamond(200, 110, 60, "#fff", "#e8c22a"), "Yellow — a general warning.");
export const SCENE_COLOR_ORANGE = signCard(diamond(200, 110, 60, SIGN_ORANGE, NAVY), "Orange — construction/work-zone warning.");
export const SCENE_COLOR_GREEN = signCard(
  `${rectSign(200, 110, 160, 65, SIGN_GREEN, "#fff")}${label(200, 120, "Exit 12", "#fff", 16)}`,
  "Green — guide/directional information."
);
export const SCENE_COLOR_BLUE = signCard(
  `${rectSign(200, 110, 150, 65, SIGN_BLUE, "#fff")}${label(200, 120, "Hospital", "#fff", 15)}`,
  "Blue — motorist services."
);
export const SCENE_COLOR_BROWN = signCard(
  `${rectSign(200, 110, 150, 65, SIGN_BROWN, "#fff")}${label(200, 120, "Park", "#fff", 15)}`,
  "Brown — recreational/scenic areas."
);

export const SCENE_ORANGE_DIAMOND = signCard(diamond(200, 110, 60, SIGN_ORANGE, NAVY), "Orange diamond — what kind of message should you expect?");
export const SCENE_YELLOW_DIAMOND_MATCH = signCard(diamond(200, 110, 60, "#fff", "#e8c22a"), "Yellow diamond — what kind of message should you expect?");

// ============================================================
// Chapter 3 — Traffic Signals
// ============================================================

export const SCENE_SIGNAL_GREEN_CLEARING = svg(`
  <rect width="400" height="300" fill="#fff"/>
  ${roadRow(150, 60)}
  <rect x="170" y="0" width="60" height="300" fill="${ROAD}"/>
  <line x1="200" y1="0" x2="200" y2="300" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${signalStack(70, 55, "green")}
  ${car(150, 156, 46, 26, 0, CAR_A, "You (green)")}
  ${car(206, 210, 26, 46, 0, CAR_B, "Still clearing")}
`);

export const SCENE_SIGNAL_YELLOW_APPROACH = svg(`
  <rect width="400" height="300" fill="#fff"/>
  ${roadRow(150, 60)}
  <rect x="170" y="0" width="60" height="300" fill="${ROAD}"/>
  <line x1="200" y1="0" x2="200" y2="300" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${signalStack(70, 55, "yellow")}
  ${car(60, 156, 46, 26, 0, CAR_A, "You — approaching")}
`);

export const SCENE_SIGNAL_RED = svg(`
  <rect width="400" height="300" fill="#fff"/>
  ${roadRow(150, 60)}
  <rect x="170" y="0" width="60" height="300" fill="${ROAD}"/>
  <line x1="200" y1="0" x2="200" y2="300" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${signalStack(70, 55, "red")}
  ${car(120, 156, 46, 26, 0, CAR_A, "You — stopped")}
`);

export const SCENE_FLASH_RED = svg(`
  <rect width="400" height="300" fill="#fff"/>
  ${roadRow(150, 60)}
  <rect x="170" y="0" width="60" height="300" fill="${ROAD}"/>
  <line x1="200" y1="0" x2="200" y2="300" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <rect x="184" y="16" width="32" height="88" rx="6" fill="${NAVY}"/>
  <circle cx="200" cy="32" r="11" fill="${SIGN_RED}" opacity="0.55"/>
  <circle cx="200" cy="32" r="11" fill="none" stroke="${SIGN_RED}" stroke-width="2"/>
  ${label(200, 8, "FLASHING RED", SIGN_RED, 11)}
  ${car(120, 156, 46, 26, 0, CAR_A, "You")}
`);

export const SCENE_FLASH_YELLOW = svg(`
  <rect width="400" height="300" fill="#fff"/>
  ${roadRow(150, 60)}
  <rect x="170" y="0" width="60" height="300" fill="${ROAD}"/>
  <line x1="200" y1="0" x2="200" y2="300" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <rect x="184" y="16" width="32" height="88" rx="6" fill="${NAVY}"/>
  <circle cx="200" cy="60" r="11" fill="#e8c22a" opacity="0.55"/>
  <circle cx="200" cy="60" r="11" fill="none" stroke="#e8c22a" stroke-width="2"/>
  ${label(200, 8, "FLASHING YELLOW", "#8a6a00", 11)}
  ${car(120, 156, 46, 26, 0, CAR_A, "You")}
`);

export const SCENE_SIGNAL_VS_OFFICER = svg(`
  <rect width="400" height="300" fill="#fff"/>
  ${roadRow(150, 60)}
  <rect x="170" y="0" width="60" height="300" fill="${ROAD}"/>
  <line x1="200" y1="0" x2="200" y2="300" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${signalStack(70, 55, "green")}
  ${car(120, 156, 46, 26, 0, CAR_A, "You (signal is green)")}
  <circle cx="230" cy="150" r="10" fill="${NAVY}"/>
  <rect x="222" y="160" width="16" height="26" fill="${NAVY}"/>
  <rect x="205" y="163" width="50" height="6" fill="${SIGN_RED}"/>
  ${label(230, 205, "Officer signals STOP", SIGN_RED, 11)}
`);

// ============================================================
// Chapter 4 — Pavement Markings
// ============================================================

function centerlineScene(pattern: string, note: string): string {
  return svg(`
    <rect width="400" height="220" fill="#fff"/>
    <rect x="0" y="60" width="400" height="120" fill="${ROAD}"/>
    ${pattern}
    ${car(40, 100, 46, 26, 0, CAR_A, "You")}
    ${car(300, 134, 46, 26, 180, CAR_B, "Oncoming")}
    ${label(200, 205, note, "#48597d", 12)}
  `, "0 0 400 220");
}

export const SCENE_LINE_BROKEN_YELLOW = centerlineScene(
  `<line x1="0" y1="120" x2="400" y2="120" stroke="#e8c22a" stroke-width="3" stroke-dasharray="14,10"/>`,
  "Broken yellow on your side."
);
export const SCENE_LINE_SOLID_YELLOW = centerlineScene(
  `<line x1="0" y1="120" x2="400" y2="120" stroke="#e8c22a" stroke-width="3"/>`,
  "Solid yellow on your side."
);
export const SCENE_LINE_DOUBLE_YELLOW = centerlineScene(
  `<line x1="0" y1="116" x2="400" y2="116" stroke="#e8c22a" stroke-width="3"/><line x1="0" y1="124" x2="400" y2="124" stroke="#e8c22a" stroke-width="3"/>`,
  "Double solid yellow."
);

export const SCENE_LANE_APPROACH = svg(`
  <rect width="400" height="260" fill="#fff"/>
  <rect x="0" y="0" width="400" height="260" fill="${ROAD}"/>
  <line x1="133" y1="0" x2="133" y2="260" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <line x1="267" y1="0" x2="267" y2="260" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <path d="M66 220 L66 120" stroke="#fff" stroke-width="4" marker-end="url(#lta1)"/>
  <path d="M66 220 L20 170" stroke="#fff" stroke-width="4" marker-end="url(#lta2)"/>
  <path d="M200 220 L200 110" stroke="#fff" stroke-width="4" marker-end="url(#lta3)"/>
  <path d="M334 220 L334 120" stroke="#fff" stroke-width="4" marker-end="url(#lta4)"/>
  <path d="M334 220 L380 170" stroke="#fff" stroke-width="4" marker-end="url(#lta5)"/>
  <defs>
    <marker id="lta1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#fff"/></marker>
    <marker id="lta2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#fff"/></marker>
    <marker id="lta3" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#fff"/></marker>
    <marker id="lta4" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#fff"/></marker>
    <marker id="lta5" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#fff"/></marker>
  </defs>
  ${label(66, 250, "Left only", "#fff", 11)}
  ${label(200, 250, "Straight", "#fff", 11)}
  ${label(334, 250, "Right only", "#fff", 11)}
  ${car(180, 15, 40, 24, 180, CAR_A, "You — approaching")}
`);

export const SCENE_LANE_LEFT_ONLY = svg(`
  <rect width="400" height="260" fill="#fff"/>
  <rect x="0" y="0" width="400" height="260" fill="${ROAD}"/>
  <line x1="200" y1="0" x2="200" y2="260" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <path d="M100 220 L100 120" stroke="#fff" stroke-width="4" marker-end="url(#llo1)"/>
  <path d="M100 220 L54 170" stroke="#fff" stroke-width="4" marker-end="url(#llo2)"/>
  <defs>
    <marker id="llo1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#fff"/></marker>
    <marker id="llo2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#fff"/></marker>
  </defs>
  ${label(100, 250, "LEFT TURN ONLY", "#fff", 10)}
  ${car(180, 15, 40, 24, 180, CAR_A, "You — in this lane")}
`);

export const SCENE_STOPLINE_CROSSWALK = svg(`
  <rect width="400" height="260" fill="#fff"/>
  ${roadRow(140, 70)}
  <rect x="170" y="0" width="60" height="260" fill="${ROAD}"/>
  <line x1="200" y1="0" x2="200" y2="260" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${Array.from({ length: 6 }, (_, i) => `<rect x="${172 + i * 10}" y="126" width="6" height="14" fill="#fff"/>`).join("")}
  <line x1="170" y1="112" x2="230" y2="112" stroke="#fff" stroke-width="4"/>
  ${car(120, 90, 40, 24, 90, CAR_A, "You — stopped too far forward")}
  ${label(200, 245, "Stop line vs. crosswalk", "#48597d", 12)}
`);

// ============================================================
// Chapter 5 — Special & Temporary Controls
// ============================================================

export const SCENE_RAILROAD_DEVICES = svg(`
  <rect width="400" height="280" fill="#fff"/>
  <rect x="0" y="150" width="400" height="10" fill="#8a6a3a"/>
  <rect x="0" y="170" width="400" height="10" fill="#8a6a3a"/>
  ${Array.from({ length: 10 }, (_, i) => `<rect x="${i * 42}" y="148" width="10" height="34" fill="#5a4426"/>`).join("")}
  ${crossbuck(90, 90)}
  <rect x="240" y="40" width="14" height="120" fill="${NAVY}"/>
  <circle cx="247" cy="45" r="9" fill="${SIGN_RED}"/>
  <circle cx="230" cy="60" r="9" fill="${SIGN_RED}"/>
  <rect x="330" y="30" width="10" height="150" fill="${NAVY}"/>
  <rect x="300" y="60" width="70" height="10" fill="${SIGN_RED}" transform="rotate(-25 335 65)"/>
`, "0 0 400 280");

export const SCENE_WORKZONE_DEVICES = svg(`
  <rect width="400" height="260" fill="#fff"/>
  <rect x="0" y="90" width="400" height="90" fill="${ROAD}"/>
  <line x1="0" y1="135" x2="400" y2="135" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${diamond(40, 40, 26, SIGN_ORANGE, NAVY)}
  ${Array.from({ length: 4 }, (_, i) => `<circle cx="${110 + i * 28}" cy="${95 + (i % 2) * 6}" r="9" fill="${SIGN_ORANGE}" stroke="${NAVY}" stroke-width="1.5"/>`).join("")}
  <rect x="250" y="55" width="60" height="34" fill="${NAVY}"/>
  <path d="M255 72 L305 72 L295 62 M305 72 L295 82" stroke="${YELLOW}" stroke-width="3" fill="none"/>
  <g transform="translate(350,140)"><rect x="-8" y="-24" width="16" height="24" fill="${SIGN_ORANGE}"/><circle cx="0" cy="-32" r="8" fill="#e9c9a0"/><rect x="-6" y="-2" width="4" height="18" fill="${NAVY}"/><rect x="2" y="-2" width="4" height="18" fill="${NAVY}"/><rect x="-14" y="-20" width="24" height="10" fill="#fff" stroke="${NAVY}"/></g>
  ${label(350, 175, "Flagger", NAVY, 10)}
  ${label(40, 78, "Sign", NAVY, 10)}
  ${label(150, 122, "Cones/drums", NAVY, 10)}
  ${label(280, 100, "Arrow board", NAVY, 10)}
  ${label(200, 240, "Temporary lane shift", "#48597d", 12)}
`, "0 0 400 260");

export const SCENE_FLAGGER_STOP = svg(`
  <rect width="400" height="260" fill="#fff"/>
  ${roadRow(150, 60)}
  <g transform="translate(230,140)">
    <rect x="-8" y="-30" width="16" height="30" fill="${SIGN_ORANGE}"/>
    <circle cx="0" cy="-40" r="9" fill="#e9c9a0"/>
    <rect x="-6" y="0" width="4" height="20" fill="${NAVY}"/>
    <rect x="2" y="0" width="4" height="20" fill="${NAVY}"/>
    <rect x="-16" y="-26" width="26" height="12" fill="#fff" stroke="${NAVY}" stroke-width="2"/>
    <text x="-3" y="-17" font-family="Poppins,sans-serif" font-size="7" font-weight="800" fill="${SIGN_RED}">STOP</text>
  </g>
  ${car(60, 156, 46, 26, 0, CAR_A, "You")}
  ${label(230, 200, "Flagger showing the STOP side", NAVY, 11)}
`);

export const SCENE_HABIT_VS_DEVICE = svg(`
  <rect width="400" height="260" fill="#fff"/>
  <rect x="0" y="90" width="400" height="90" fill="${ROAD}"/>
  <line x1="0" y1="135" x2="400" y2="135" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="6,6" opacity="0.35"/>
  <path d="M40 100 Q 200 100 240 160 L 400 160" stroke="${YELLOW}" stroke-width="4" fill="none" stroke-dasharray="12,8"/>
  ${Array.from({ length: 5 }, (_, i) => `<circle cx="${60 + i * 70}" cy="${102 + i * 12}" r="7" fill="${SIGN_ORANGE}" stroke="${NAVY}" stroke-width="1.5"/>`).join("")}
  ${car(50, 140, 46, 26, 0, CAR_A, "You")}
  ${label(200, 225, "Yesterday's lane vs. today's temporary shift", "#48597d", 12)}
`, "0 0 400 260");

// ============================================================
// Chapter 6 — Read the Road as a System
// ============================================================

export const SCENE_T4_MISTAKE_SPOTTER = svg(`
  <rect width="400" height="300" fill="#fff"/>
  ${roadRow(150, 60)}
  <rect x="170" y="0" width="60" height="300" fill="${ROAD}"/>
  <line x1="200" y1="0" x2="200" y2="300" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${signalStack(70, 55, "red")}
  ${car(120, 156, 46, 26, 0, CAR_A, "Car 1")}
  ${car(240, 156, 46, 26, 0, CAR_B, "Car 2 — rolling through")}
  <circle cx="330" cy="230" r="8" fill="${CAR_C}"/>
  ${triangleDown(70, 230, 16, "#fff", SIGN_RED)}
`);

export const SCENE_SAFE_TC_INTERSECTION = svg(`
  <rect width="400" height="300" fill="#fff"/>
  ${roadRow(150, 60)}
  <rect x="170" y="0" width="60" height="300" fill="${ROAD}"/>
  <line x1="200" y1="0" x2="200" y2="300" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${signalStack(70, 55, "green")}
  ${diamond(330, 90, 18, "#fff", "#e8c22a")}
  ${car(120, 156, 46, 26, 0, CAR_A, "You")}
  <circle cx="330" cy="230" r="8" fill="${CAR_C}"/>
  ${label(330, 250, "Pedestrian at corner", NAVY, 10)}
  <line x1="0" y1="256" x2="400" y2="256" stroke="#e8c22a" stroke-width="3"/>
`);
