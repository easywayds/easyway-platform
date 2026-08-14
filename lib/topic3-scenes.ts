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

// --- 4.1.3.1(C) Left turns & oncoming traffic ---
export const SCENE_LEFT_TURN_CAR = svg(`
  <rect width="400" height="260" fill="#fff"/>
  <rect x="0" y="100" width="400" height="60" fill="${ROAD}"/>
  <line x1="0" y1="130" x2="400" y2="130" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${car(30, 106, 46, 26, 0, CAR_A, "You — turning left")}
  <path d="M76 119 Q 180 119 250 60" stroke="${NAVY}" stroke-width="2" fill="none" stroke-dasharray="5,5" marker-end="url(#a1)"/>
  <defs><marker id="a1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${NAVY}"/></marker></defs>
  ${car(300, 106, 46, 26, 180, CAR_B, "Oncoming vehicle")}
`);

export const SCENE_LEFT_TURN_MOTORCYCLE = svg(`
  <rect width="400" height="260" fill="#fff"/>
  <rect x="0" y="100" width="400" height="60" fill="${ROAD}"/>
  <line x1="0" y1="130" x2="400" y2="130" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${car(30, 106, 46, 26, 0, CAR_A, "You — turning left")}
  <path d="M76 119 Q 180 119 250 60" stroke="${NAVY}" stroke-width="2" fill="none" stroke-dasharray="5,5" marker-end="url(#a2)"/>
  <defs><marker id="a2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${NAVY}"/></marker></defs>
  <circle cx="320" cy="119" r="9" fill="${CAR_C}"/>
  <text x="320" y="146" text-anchor="middle" font-family="Poppins,sans-serif" font-size="11" font-weight="700" fill="${NAVY}">Oncoming motorcycle</text>
`);

// --- 4.1.3.1(C) Entering from a driveway / private road ---
export const SCENE_DRIVEWAY = svg(`
  <rect width="400" height="260" fill="#fff"/>
  <rect x="0" y="180" width="400" height="55" fill="${ROAD}"/>
  <line x1="0" y1="207" x2="400" y2="207" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <rect x="150" y="60" width="100" height="120" fill="#dfe3ee"/>
  <rect x="175" y="150" width="50" height="30" fill="${ROAD}"/>
  <rect x="170" y="176" width="60" height="10" fill="#e4dbc7"/>
  ${car(178, 120, 44, 26, 90, CAR_A, "You")}
  <circle cx="205" cy="185" r="7" fill="${CAR_C}"/>
  ${car(20, 186, 44, 24, 0, CAR_B, "From the left")}
  ${car(336, 186, 44, 24, 180, "#8a5d14", "From the right")}
`);

// --- 4.1.3.1(C) T-intersection ---
export const SCENE_T_INTERSECTION = svg(`
  <rect width="400" height="260" fill="#fff"/>
  <rect x="0" y="110" width="400" height="60" fill="${ROAD}"/>
  <rect x="170" y="110" width="60" height="150" fill="${ROAD}"/>
  <line x1="0" y1="140" x2="400" y2="140" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <text x="200" y="240" text-anchor="middle" font-family="Poppins,sans-serif" font-size="12" font-weight="700" fill="${NAVY}">Terminating roadway</text>
  <text x="60" y="100" text-anchor="middle" font-family="Poppins,sans-serif" font-size="12" font-weight="700" fill="${NAVY}">Through roadway</text>
  ${car(180, 190, 40, 24, 90, CAR_A, "You")}
  ${car(300, 116, 44, 24, 0, CAR_B, "Through traffic")}
`);

export const SCENE_T_INTERSECTION_MISLEADING = svg(`
  <rect width="400" height="260" fill="#fff"/>
  <rect x="0" y="95" width="400" height="90" fill="${ROAD}"/>
  <rect x="180" y="95" width="40" height="165" fill="${ROAD}"/>
  <line x1="0" y1="140" x2="400" y2="140" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <text x="200" y="240" text-anchor="middle" font-family="Poppins,sans-serif" font-size="12" font-weight="700" fill="#8a3a25">Narrow — but still the terminating road</text>
  <text x="60" y="85" text-anchor="middle" font-family="Poppins,sans-serif" font-size="12" font-weight="700" fill="#1b4d3b">Wide — but still the through road</text>
`);

// --- 4.1.3.1(C) Different lane counts / pavement surfaces ---
export const SCENE_LANES_DIFFERENT = svg(`
  <rect width="400" height="260" fill="#fff"/>
  <rect x="0" y="100" width="400" height="60" fill="${ROAD}"/>
  <rect x="150" y="0" width="100" height="260" fill="${ROAD}"/>
  <line x1="0" y1="130" x2="400" y2="130" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <line x1="185" y1="0" x2="185" y2="260" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <line x1="215" y1="0" x2="215" y2="260" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <text x="80" y="90" text-anchor="middle" font-family="Poppins,sans-serif" font-size="11" font-weight="700" fill="${NAVY}">2 lanes</text>
  <text x="200" y="30" text-anchor="middle" font-family="Poppins,sans-serif" font-size="11" font-weight="700" fill="${NAVY}">4 lanes</text>
`);

export const SCENE_PAVEMENT_DIFFERENT = svg(`
  <rect width="400" height="260" fill="#fff"/>
  <rect x="0" y="100" width="400" height="60" fill="${ROAD}"/>
  <line x1="0" y1="130" x2="400" y2="130" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <rect x="170" y="0" width="60" height="260" fill="#cbb896"/>
  <text x="80" y="90" text-anchor="middle" font-family="Poppins,sans-serif" font-size="11" font-weight="700" fill="${NAVY}">Paved road</text>
  <text x="200" y="30" text-anchor="middle" font-family="Poppins,sans-serif" font-size="11" font-weight="700" fill="#6b5230">Gravel road</text>
`);

// --- 4.1.3.1(C) Roundabout, multi-stage ---
export const SCENE_ROUNDABOUT_APPROACH = svg(`
  <rect width="400" height="280" fill="#fff"/>
  <circle cx="200" cy="140" r="90" fill="${ROAD}"/>
  <circle cx="200" cy="140" r="40" fill="#8fbf9a"/>
  ${car(30, 128, 44, 24, 0, CAR_A, "You — approaching")}
`);

export const SCENE_ROUNDABOUT_CIRCULATING = svg(`
  <rect width="400" height="280" fill="#fff"/>
  <circle cx="200" cy="140" r="90" fill="${ROAD}"/>
  <circle cx="200" cy="140" r="40" fill="#8fbf9a"/>
  ${car(30, 128, 44, 24, 0, CAR_A, "You")}
  ${car(185, 30, 26, 44, 90, CAR_B, "Circulating")}
  ${car(340, 128, 26, 44, 90, CAR_C, "Circulating")}
`);

export const SCENE_ROUNDABOUT_GAP = svg(`
  <rect width="400" height="280" fill="#fff"/>
  <circle cx="200" cy="140" r="90" fill="${ROAD}"/>
  <circle cx="200" cy="140" r="40" fill="#8fbf9a"/>
  ${car(30, 128, 44, 24, 0, CAR_A, "You")}
  ${car(340, 128, 26, 44, 90, CAR_C, "Circulating — passing")}
  <text x="200" y="270" text-anchor="middle" font-family="Poppins,sans-serif" font-size="11" font-weight="700" fill="#1b4d3b">Left side of the circle is clear</text>
`);

export const SCENE_ROUNDABOUT_ENTER = svg(`
  <rect width="400" height="280" fill="#fff"/>
  <circle cx="200" cy="140" r="90" fill="${ROAD}"/>
  <circle cx="200" cy="140" r="40" fill="#8fbf9a"/>
  ${car(90, 128, 44, 24, 20, CAR_A, "Entering")}
`);

export const SCENE_ROUNDABOUT_NAVIGATE = svg(`
  <rect width="400" height="280" fill="#fff"/>
  <circle cx="200" cy="140" r="90" fill="${ROAD}"/>
  <circle cx="200" cy="140" r="40" fill="#8fbf9a"/>
  ${car(185, 40, 26, 44, 0, CAR_A, "You — circulating")}
`);

export const SCENE_ROUNDABOUT_EXIT = svg(`
  <rect width="400" height="280" fill="#fff"/>
  <circle cx="200" cy="140" r="90" fill="${ROAD}"/>
  <circle cx="200" cy="140" r="40" fill="#8fbf9a"/>
  ${car(300, 128, 44, 24, 20, CAR_A, "Signaling to exit")}
`);

// --- 4.1.3.1(C) Controlled-access road / freeway entry ---
export const SCENE_FREEWAY_ENTRY = svg(`
  <rect width="400" height="260" fill="#fff"/>
  <rect x="0" y="60" width="400" height="90" fill="${ROAD}"/>
  <line x1="0" y1="90" x2="400" y2="90" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <line x1="0" y1="120" x2="400" y2="120" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <path d="M0 230 L 150 150" stroke="${ROAD}" stroke-width="40" fill="none"/>
  ${car(60, 190, 44, 24, -35, CAR_A, "You — entering")}
  ${car(220, 96, 44, 24, 0, CAR_B, "Highway traffic")}
`);

// --- 4.1.3.1(C) Construction / maintenance work-zone right-of-way ---
export const SCENE_WORKZONE_FLAGGER = svg(`
  <rect width="400" height="220" fill="#fff"/>
  <rect x="0" y="80" width="400" height="70" fill="${ROAD}"/>
  <line x1="0" y1="115" x2="170" y2="115" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <rect x="170" y="80" width="60" height="70" fill="#e8d9a6"/>
  <circle cx="200" cy="100" r="9" fill="#e8a63c" stroke="#8a5d14" stroke-width="1.5"/>
  <circle cx="200" cy="130" r="9" fill="#e8a63c" stroke="#8a5d14" stroke-width="1.5"/>
  <circle cx="255" cy="110" r="10" fill="${NAVY}"/>
  <text x="255" y="114" text-anchor="middle" font-size="9" font-weight="700" fill="${YELLOW}">STOP</text>
  <text x="255" y="140" text-anchor="middle" font-family="Poppins,sans-serif" font-size="10" font-weight="700" fill="${NAVY}">Flagger</text>
  ${car(30, 90, 44, 24, 0, CAR_A, "You")}
`);

// --- 4.1.3.1(C) Railroad decision lab ---
export const SCENE_RAILROAD_GATE = svg(`
  <rect width="400" height="220" fill="#fff"/>
  <rect x="0" y="80" width="400" height="70" fill="${ROAD}"/>
  <rect x="170" y="0" width="60" height="220" fill="#8a8f9c"/>
  <line x1="180" y1="0" x2="180" y2="220" stroke="#5b5f6b" stroke-width="3"/>
  <line x1="220" y1="0" x2="220" y2="220" stroke="#5b5f6b" stroke-width="3"/>
  <rect x="150" y="60" width="90" height="8" fill="#c4593b" transform="rotate(-20 195 64)"/>
  <circle cx="150" cy="60" r="6" fill="#e8a63c"/>
  ${car(30, 90, 44, 24, 0, CAR_A, "You")}
  <text x="255" y="115" text-anchor="middle" font-family="Poppins,sans-serif" font-size="11" font-weight="700" fill="#8a3a25">Gate down, lights flashing</text>
`);

export const SCENE_RAILROAD_NO_ROOM = svg(`
  <rect width="400" height="220" fill="#fff"/>
  <rect x="0" y="80" width="400" height="70" fill="${ROAD}"/>
  <rect x="170" y="0" width="60" height="220" fill="#8a8f9c"/>
  <line x1="180" y1="0" x2="180" y2="220" stroke="#5b5f6b" stroke-width="3"/>
  <line x1="220" y1="0" x2="220" y2="220" stroke="#5b5f6b" stroke-width="3"/>
  ${car(30, 90, 44, 24, 0, CAR_A, "You")}
  ${car(240, 90, 44, 24, 0, CAR_B, "Stopped traffic ahead")}
  <text x="200" y="205" text-anchor="middle" font-family="Poppins,sans-serif" font-size="11" font-weight="700" fill="#8a3a25">No train visible — but no room to clear the tracks</text>
`);

// --- 4.1.3.1(D-E) Emergency vehicles ---
export const SCENE_EMERGENCY_APPROACHING = svg(`
  <rect width="400" height="200" fill="#fff"/>
  <rect x="0" y="80" width="400" height="60" fill="${ROAD}"/>
  <line x1="0" y1="110" x2="400" y2="110" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${car(40, 88, 44, 24, 0, CAR_A, "You")}
  ${car(320, 88, 50, 24, 180, "#c4593b", "Ambulance (lights + siren)")}
`);

export const SCENE_EMERGENCY_STOPPED = svg(`
  <rect width="400" height="200" fill="#fff"/>
  <rect x="0" y="80" width="400" height="70" fill="${ROAD}"/>
  <line x1="0" y1="115" x2="400" y2="115" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${car(280, 90, 50, 24, 0, "#c4593b", "Stopped, lights on")}
  ${car(40, 118, 44, 24, 0, CAR_A, "You")}
`);

// --- 4.1.3.1(A) Motorcycle left-turn hazard ---
export const SCENE_MOTORCYCLE_HAZARD = svg(`
  <rect width="400" height="260" fill="#fff"/>
  <rect x="0" y="100" width="400" height="60" fill="${ROAD}"/>
  <line x1="0" y1="130" x2="400" y2="130" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${car(30, 106, 46, 26, 0, CAR_A, "You — turning left")}
  <circle cx="330" cy="119" r="9" fill="${CAR_C}"/>
  <text x="330" y="146" text-anchor="middle" font-family="Poppins,sans-serif" font-size="11" font-weight="700" fill="${NAVY}">Approaching motorcycle</text>
`);

// --- 4.1.3.1(D) Pedestrians ---
export const SCENE_PEDESTRIAN_TURN = svg(`
  <rect width="400" height="260" fill="#fff"/>
  <rect x="0" y="100" width="400" height="60" fill="${ROAD}"/>
  <rect x="170" y="0" width="60" height="260" fill="${ROAD}"/>
  <rect x="170" y="90" width="60" height="12" fill="#fff" opacity="0.7"/>
  <rect x="170" y="158" width="60" height="12" fill="#fff" opacity="0.7"/>
  ${car(90, 106, 44, 24, 0, CAR_A, "You — turning right")}
  <circle cx="200" cy="96" r="7" fill="${CAR_C}"/>
  <text x="200" y="76" text-anchor="middle" font-family="Poppins,sans-serif" font-size="11" font-weight="700" fill="${NAVY}">Pedestrian crossing</text>
`);

export const SCENE_PEDESTRIAN_SIGNAL = svg(`
  <rect width="400" height="260" fill="#fff"/>
  <rect x="0" y="100" width="400" height="60" fill="${ROAD}"/>
  <rect x="170" y="0" width="60" height="260" fill="${ROAD}"/>
  <rect x="170" y="90" width="60" height="12" fill="#fff" opacity="0.7"/>
  <circle cx="255" cy="60" r="12" fill="${NAVY}"/>
  <circle cx="255" cy="60" r="5" fill="${CAR_C}"/>
  ${car(90, 106, 44, 24, 0, CAR_A, "You — going straight")}
  <circle cx="200" cy="96" r="7" fill="${CAR_C}"/>
  <text x="200" y="76" text-anchor="middle" font-family="Poppins,sans-serif" font-size="10" font-weight="700" fill="${NAVY}">Walk signal on</text>
`);

// --- Right-of-way mistake spotter — a busy intersection with multiple
// elements; hotspot coordinates (percent) are defined alongside the block
// data in lib/topic3-blocks.ts, keyed against this same scene. ---
export const SCENE_MISTAKE_SPOTTER = svg(`
  <rect width="400" height="300" fill="#fff"/>
  <rect x="0" y="130" width="400" height="60" fill="${ROAD}"/>
  <rect x="170" y="0" width="60" height="300" fill="${ROAD}"/>
  <line x1="0" y1="160" x2="400" y2="160" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <line x1="200" y1="0" x2="200" y2="300" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${car(90, 136, 46, 26, 0, CAR_A, "Car 1")}
  ${car(206, 220, 26, 46, 0, CAR_B, "Car 2 — turning left, accelerating")}
  <circle cx="150" cy="120" r="7" fill="${CAR_C}"/>
  <text x="150" y="105" text-anchor="middle" font-family="Poppins,sans-serif" font-size="10" font-weight="700" fill="${NAVY}">Pedestrian</text>
  <circle cx="260" cy="145" r="6" fill="#8a5d14"/>
  <text x="260" y="112" text-anchor="middle" font-family="Poppins,sans-serif" font-size="10" font-weight="700" fill="${NAVY}">Motorcycle</text>
`);

// --- SAFE decision challenge — reused across all 4 stages ---
export const SCENE_SAFE_INTERSECTION = svg(`
  <rect width="400" height="300" fill="#fff"/>
  <rect x="0" y="130" width="400" height="60" fill="${ROAD}"/>
  <rect x="170" y="0" width="60" height="300" fill="${ROAD}"/>
  <line x1="0" y1="160" x2="400" y2="160" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  <line x1="200" y1="0" x2="200" y2="300" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>
  ${car(90, 136, 46, 26, 0, CAR_A, "You")}
  ${car(206, 40, 26, 46, 0, CAR_B, "Cross traffic")}
  <circle cx="255" cy="150" r="7" fill="${CAR_C}"/>
  <text x="255" y="120" text-anchor="middle" font-family="Poppins,sans-serif" font-size="10" font-weight="700" fill="${NAVY}">Pedestrian at corner</text>
`);
