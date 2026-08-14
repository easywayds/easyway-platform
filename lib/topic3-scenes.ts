// Inline SVG road scenes for the Topic 3 interactive blocks — top-down,
// consistent car/road/label style throughout (per the brief's visual
// consistency requirement). Vehicles are always labeled "Vehicle A/B/C"
// in the SVG itself, never distinguished by color alone, per the
// accessibility requirement against color-only distinctions.

const ROAD = "#c9cfda";
const LANE_LINE = "#ffffff";
const NAVY = "#0b2345";
const YELLOW = "#ffd400";
const CAR_A = "#0b2345";
const CAR_B = "#c4593b";
const CAR_C = "#2f8066";

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

// --- 3.0 Opening challenge: uncontrolled intersection, Vehicle A (you) and
// Vehicle B approaching from the right, arriving about the same time. ---
export const SCENE_OPENING = svg(`
  <rect width="400" height="300" fill="#fff"/>
  <rect x="0" y="120" width="400" height="60" fill="${ROAD}"/>
  <rect x="170" y="0" width="60" height="300" fill="${ROAD}"/>
  <line x1="0" y1="150" x2="400" y2="150" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <line x1="200" y1="0" x2="200" y2="300" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${car(90, 156, 46, 26, 0, CAR_A, "Vehicle A (you)")}
  ${car(206, 40, 26, 46, 0, CAR_B, "Vehicle B")}
`);

// --- 3.2 Controlled vs uncontrolled intersection tabs ---
export const SCENE_CONTROLLED = svg(`
  <rect width="400" height="300" fill="#fff"/>
  <rect x="0" y="120" width="400" height="60" fill="${ROAD}"/>
  <rect x="170" y="0" width="60" height="300" fill="${ROAD}"/>
  <line x1="0" y1="150" x2="400" y2="150" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <line x1="200" y1="0" x2="200" y2="300" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <polygon points="90,80 105,86 105,101 90,107 75,101 75,86" fill="#c4593b"/>
  <text x="90" y="98" text-anchor="middle" font-family="Poppins,sans-serif" font-size="10" font-weight="700" fill="#fff">STOP</text>
  <polygon points="310,192 325,198 325,213 310,219 295,213 295,198" fill="#c4593b"/>
  <text x="310" y="210" text-anchor="middle" font-family="Poppins,sans-serif" font-size="10" font-weight="700" fill="#fff">STOP</text>
  <circle cx="200" cy="60" r="12" fill="${NAVY}"/>
  <circle cx="200" cy="60" r="5" fill="${YELLOW}"/>
  <text x="200" y="42" text-anchor="middle" font-family="Poppins,sans-serif" font-size="10" font-weight="700" fill="${NAVY}">Signal</text>
`);

export const SCENE_UNCONTROLLED = svg(`
  <rect width="400" height="300" fill="#fff"/>
  <rect x="0" y="120" width="400" height="60" fill="${ROAD}"/>
  <rect x="170" y="0" width="60" height="300" fill="${ROAD}"/>
  <line x1="0" y1="150" x2="400" y2="150" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <line x1="200" y1="0" x2="200" y2="300" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <text x="200" y="270" text-anchor="middle" font-family="Poppins,sans-serif" font-size="12" font-weight="600" fill="#8a3a25">No signs. No signals.</text>
`);

// --- 3.3 All-way stop lab, 3 rounds ---
export const SCENE_STOP_ARRIVAL_ORDER = svg(`
  <rect width="400" height="300" fill="#fff"/>
  <rect x="0" y="120" width="400" height="60" fill="${ROAD}"/>
  <rect x="170" y="0" width="60" height="300" fill="${ROAD}"/>
  <line x1="0" y1="150" x2="400" y2="150" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <line x1="200" y1="0" x2="200" y2="300" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${["90,80 105,86 105,101 90,107 75,101 75,86", "310,80 325,86 325,101 310,107 295,101 295,86", "90,192 105,198 105,213 90,219 75,213 75,198", "310,192 325,198 325,213 310,219 295,213 295,198"]
    .map((pts) => `<polygon points="${pts}" fill="#c4593b"/>`)
    .join("")}
  ${car(20, 156, 46, 26, 0, CAR_A, "Red — 1st")}
  ${car(206, 20, 26, 46, 0, CAR_B, "Blue — 2nd")}
  ${car(334, 156, 46, 26, 180, CAR_C, "Yellow — 3rd")}
`);

export const SCENE_STOP_SIMULTANEOUS = svg(`
  <rect width="400" height="300" fill="#fff"/>
  <rect x="0" y="120" width="400" height="60" fill="${ROAD}"/>
  <rect x="170" y="0" width="60" height="300" fill="${ROAD}"/>
  <line x1="0" y1="150" x2="400" y2="150" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <line x1="200" y1="0" x2="200" y2="300" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${car(20, 156, 46, 26, 0, CAR_A, "Vehicle A (Red)")}
  ${car(206, 20, 26, 46, 0, CAR_B, "Vehicle B (Blue)")}
  <text x="200" y="280" text-anchor="middle" font-family="Poppins,sans-serif" font-size="12" font-weight="600" fill="#48597d">Both stop at the same moment.</text>
`);

export const SCENE_STOP_LEFT_TURN = svg(`
  <rect width="400" height="300" fill="#fff"/>
  <rect x="0" y="120" width="400" height="60" fill="${ROAD}"/>
  <rect x="170" y="0" width="60" height="300" fill="${ROAD}"/>
  <line x1="0" y1="150" x2="400" y2="150" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <line x1="200" y1="0" x2="200" y2="300" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${car(20, 156, 46, 26, 0, CAR_A, "Vehicle A")}
  <path d="M66 169 Q 150 169 200 120" stroke="${NAVY}" stroke-width="2" fill="none" stroke-dasharray="5,5" marker-end="url(#arrowT3)"/>
  <defs><marker id="arrowT3" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${NAVY}"/></marker></defs>
  ${car(334, 156, 46, 26, 180, CAR_B, "Vehicle B (wants to turn left)")}
`);

// --- 3.15 School bus roadway comparison, 3 tabs ---
export const SCENE_BUS_UNDIVIDED = svg(`
  <rect width="400" height="200" fill="#fff"/>
  <rect x="0" y="70" width="400" height="60" fill="${ROAD}"/>
  <line x1="0" y1="100" x2="400" y2="100" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${car(40, 76, 60, 26, 0, "#e8a63c", "School Bus")}
  <circle cx="46" cy="72" r="4" fill="#c4593b"/>
  <circle cx="94" cy="72" r="4" fill="#c4593b"/>
  ${car(280, 106, 46, 24, 0, CAR_A, "Vehicle A")}
  ${car(280, 76, 46, 24, 180, CAR_B, "Vehicle B")}
  <text x="200" y="180" text-anchor="middle" font-family="Poppins,sans-serif" font-size="12" font-weight="600" fill="#8a3a25">Both directions — no median, no turn lane.</text>
`, "0 0 400 200");

export const SCENE_BUS_TURN_LANE = svg(`
  <rect width="400" height="220" fill="#fff"/>
  <rect x="0" y="60" width="400" height="100" fill="${ROAD}"/>
  <rect x="0" y="100" width="400" height="20" fill="#e8d9a6"/>
  <line x1="0" y1="80" x2="400" y2="80" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <line x1="0" y1="140" x2="400" y2="140" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${car(40, 66, 60, 26, 0, "#e8a63c", "School Bus")}
  <circle cx="46" cy="62" r="4" fill="#c4593b"/>
  <circle cx="94" cy="62" r="4" fill="#c4593b"/>
  ${car(280, 126, 46, 24, 0, CAR_A, "Vehicle A")}
  <text x="200" y="200" text-anchor="middle" font-family="Poppins,sans-serif" font-size="12" font-weight="600" fill="#8a3a25">Center turn lane only — not a physical barrier.</text>
`, "0 0 400 220");

export const SCENE_BUS_DIVIDED = svg(`
  <rect width="400" height="220" fill="#fff"/>
  <rect x="0" y="40" width="400" height="55" fill="${ROAD}"/>
  <rect x="0" y="95" width="400" height="30" fill="#8fbf9a"/>
  <rect x="0" y="125" width="400" height="55" fill="${ROAD}"/>
  <line x1="0" y1="67" x2="400" y2="67" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <line x1="0" y1="152" x2="400" y2="152" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${car(280, 46, 46, 24, 180, CAR_A, "Vehicle A")}
  ${car(40, 131, 60, 26, 0, "#e8a63c", "School Bus")}
  <circle cx="46" cy="127" r="4" fill="#c4593b"/>
  <circle cx="94" cy="127" r="4" fill="#c4593b"/>
  <text x="200" y="205" text-anchor="middle" font-family="Poppins,sans-serif" font-size="12" font-weight="600" fill="#1b4d3b">Physical median — opposite-side traffic doesn't have to stop.</text>
`, "0 0 400 220");
