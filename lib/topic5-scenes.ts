// Inline SVG scenes for the Topic 5 interactive blocks — traffic flow,
// space/speed, passing/parking, freeways, and emergencies — in the same
// navy/yellow visual language established in topic3/4-scenes.ts.

const ROAD = "#c9cfda";
const LANE_LINE = "#ffffff";
const NAVY = "#0b2345";
const YELLOW = "#ffd400";
const CAR_A = "#0b2345";
const CAR_B = "#c4593b";
const CAR_C = "#2f8066";
const CAR_D = "#8a5d14";

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

function brakeLight(x: number, y: number): string {
  return `<circle cx="${x}" cy="${y}" r="4" fill="#e34b3c"/>`;
}

function svg(inner: string, viewBox = "0 0 400 300"): string {
  return `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" role="presentation">${inner}</svg>`;
}

function label(cx: number, y: number, text: string, color = NAVY, size = 12): string {
  return `<text x="${cx}" y="${y}" text-anchor="middle" font-family="Poppins,sans-serif" font-size="${size}" font-weight="700" fill="${color}">${text}</text>`;
}

function multilane(lanes = 3, h = 260): string {
  const laneW = 400 / lanes;
  let lines = "";
  for (let i = 1; i < lanes; i++) {
    lines += `<line x1="${i * laneW}" y1="0" x2="${i * laneW}" y2="${h}" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>`;
  }
  return `<rect x="0" y="0" width="400" height="${h}" fill="${ROAD}"/>${lines}`;
}

// ============================================================
// Chapter 1 — Moving With Traffic
// ============================================================

export const SCENE_T5_OPENING = svg(`
  <rect width="400" height="300" fill="#fff"/>
  ${multilane(3, 300)}
  ${car(30, 210, 46, 26, 0, CAR_A, "You")}
  ${car(150, 140, 46, 26, 0, CAR_B, "Braking ahead")}
  ${brakeLight(150, 140)}${brakeLight(196, 140)}
  ${car(280, 60, 26, 46, 90, CAR_C, "Merging in")}
  <circle cx="330" cy="200" r="9" fill="${CAR_D}"/>
  ${label(330, 225, "Motorcycle", NAVY, 10)}
  ${car(60, 20, 46, 26, 0, "#a3271e", "Signaling a turn")}
  <path d="M40 8 L20 8" stroke="${NAVY}" stroke-width="2" marker-end="url(#t5sig)"/>
  <defs><marker id="t5sig" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${NAVY}"/></marker></defs>
  ${car(340, 260, 46, 26, 180, "#6b4a2b", "Coming up fast")}
`);

export const SCENE_FLOW_SMOOTH = svg(`
  <rect width="400" height="220" fill="#fff"/>
  ${multilane(3, 220)}
  ${car(40, 160, 46, 26, 0, CAR_A, "A")}
  ${car(150, 160, 46, 26, 0, CAR_B, "B")}
  ${car(260, 160, 46, 26, 0, CAR_C, "C")}
  ${label(200, 205, "Even spacing, steady speed, predictable moves.", "#48597d", 12)}
`, "0 0 400 220");

export const SCENE_FLOW_DISRUPTED = svg(`
  <rect width="400" height="220" fill="#fff"/>
  ${multilane(3, 220)}
  ${car(40, 160, 46, 26, 0, CAR_A, "A")}
  ${brakeLight(40, 160)}${brakeLight(86, 160)}
  ${car(110, 160, 46, 26, 0, CAR_B, "B — braking hard")}
  ${car(220, 60, 46, 26, 0, CAR_C, "C — cutting across")}
  ${label(200, 205, "One sudden move ripples backward through traffic.", "#8a3a25", 12)}
`, "0 0 400 220");

export const SCENE_SIGNAL_EARLY = svg(`
  <rect width="400" height="220" fill="#fff"/>
  ${multilane(2, 220)}
  ${car(60, 160, 46, 26, 0, CAR_A, "You")}
  <path d="M0 6 L15 6" stroke="${NAVY}" stroke-width="3"/>
  <circle cx="18" cy="6" r="3" fill="${YELLOW}"/>
  ${label(200, 40, "Signal on well before the move", NAVY, 12)}
`, "0 0 400 220");

export const SCENE_SIGNAL_LATE = svg(`
  <rect width="400" height="220" fill="#fff"/>
  ${multilane(2, 220)}
  ${car(150, 160, 46, 26, 0, CAR_A, "You")}
  <circle cx="153" cy="146" r="3" fill="${YELLOW}"/>
  ${label(200, 40, "Signal appears as the vehicle is already moving over", "#8a3a25", 12)}
`, "0 0 400 220");

export const SCENE_BLINDSPOT_ZONES = svg(`
  <rect width="400" height="300" fill="#fff"/>
  ${multilane(3, 300)}
  ${car(177, 137, 46, 26, 0, CAR_A, "You")}
`);

export const SCENE_BLINDSPOT_MOTORCYCLE = svg(`
  <rect width="400" height="220" fill="#fff"/>
  ${multilane(2, 220)}
  ${car(60, 160, 46, 26, 0, CAR_A, "You — mirrors look clear")}
  <circle cx="260" cy="173" r="8" fill="${CAR_C}"/>
  ${label(260, 200, "Motorcycle in your blind spot", NAVY, 10)}
`, "0 0 400 220");

// ============================================================
// Chapter 2 — Space, Speed & Stopping
// ============================================================

function intervalScene(note: string, gapColor: string): string {
  return svg(`
    <rect width="400" height="200" fill="#fff"/>
    ${multilane(1, 200)}
    ${car(40, 87, 46, 26, 0, CAR_A, "You")}
    ${car(240, 87, 46, 26, 0, CAR_B, "Lead vehicle")}
    <line x1="86" y1="100" x2="240" y2="100" stroke="${gapColor}" stroke-width="3" stroke-dasharray="6,6"/>
    <line x1="330" y1="0" x2="330" y2="200" stroke="${NAVY}" stroke-width="2" stroke-dasharray="4,4"/>
    ${label(330, 190, "fixed point", NAVY, 10)}
    ${label(200, 30, note, "#48597d", 12)}
  `, "0 0 400 200");
}

export const SCENE_INTERVAL_GOOD = intervalScene("Good conditions — dry, light traffic", "#1b7a3d");
export const SCENE_INTERVAL_RAIN = intervalScene("Rain — reduced traction", "#8a3a25");
export const SCENE_INTERVAL_TRAFFIC = intervalScene("Heavy traffic, reduced visibility", "#8a3a25");

export const SCENE_STOPPING_LOW = svg(`
  <rect width="400" height="180" fill="#fff"/>
  ${multilane(1, 180)}
  ${car(30, 77, 40, 24, 0, CAR_A, "Lower speed")}
  <circle cx="330" cy="89" r="9" fill="#e34b3c"/>
  <line x1="70" y1="89" x2="330" y2="89" stroke="${NAVY}" stroke-width="2" stroke-dasharray="5,5"/>
  ${label(200, 30, "Hazard → perception → reaction → braking → stop", "#48597d", 11)}
`, "0 0 400 180");

export const SCENE_STOPPING_HIGH = svg(`
  <rect width="400" height="180" fill="#fff"/>
  ${multilane(1, 180)}
  ${car(30, 77, 40, 24, 0, CAR_B, "Higher speed")}
  <circle cx="330" cy="89" r="9" fill="#e34b3c"/>
  <line x1="70" y1="89" x2="400" y2="89" stroke="#8a3a25" stroke-width="2" stroke-dasharray="5,5"/>
  ${label(200, 30, "Same hazard — much more roadway used before the stop", "#8a3a25", 11)}
`, "0 0 400 180");

export const SCENE_RAIN_SPEED = svg(`
  <rect width="400" height="200" fill="#fff"/>
  ${multilane(2, 200)}
  ${car(150, 87, 46, 26, 0, CAR_A, "You")}
  ${Array.from({ length: 20 }, (_, i) => `<line x1="${(i * 37) % 400}" y1="${(i * 53) % 200}" x2="${((i * 37) % 400) - 6}" y2="${((i * 53) % 200) + 12}" stroke="#7c93c0" stroke-width="1.5"/>`).join("")}
  ${label(200, 30, "Posted limit unchanged — rain just started", NAVY, 12)}
`, "0 0 400 200");

// ============================================================
// Chapter 3 — Passing, Turning & Parking
// ============================================================

export const SCENE_PASS_PROHIBITED = svg(`
  <rect width="400" height="200" fill="#fff"/>
  ${multilane(1, 200)}
  <line x1="0" y1="100" x2="400" y2="100" stroke="#e8c22a" stroke-width="3"/>
  ${car(40, 87, 40, 24, 0, CAR_A, "You")}
  ${car(160, 87, 40, 24, 0, CAR_B, "Slower vehicle")}
  ${label(200, 30, "Solid line — passing prohibited here", "#8a3a25", 12)}
`, "0 0 400 200");

export const SCENE_PASS_UNSAFE_GAP = svg(`
  <rect width="400" height="200" fill="#fff"/>
  ${multilane(1, 200)}
  <line x1="0" y1="100" x2="400" y2="100" stroke="#e8c22a" stroke-width="3" stroke-dasharray="14,10"/>
  ${car(40, 87, 40, 24, 0, CAR_A, "You")}
  ${car(160, 87, 40, 24, 0, CAR_B, "Slower vehicle")}
  ${car(340, 30, 40, 24, 180, CAR_C, "Oncoming")}
  ${label(200, 30, "Legal to pass here — but is it safe right now?", NAVY, 12)}
`, "0 0 400 200");

export const SCENE_BEING_PASSED = svg(`
  <rect width="400" height="200" fill="#fff"/>
  ${multilane(1, 200)}
  <line x1="0" y1="100" x2="400" y2="100" stroke="#e8c22a" stroke-width="3" stroke-dasharray="14,10"/>
  ${car(160, 87, 40, 24, 0, CAR_A, "You — being passed")}
  ${car(60, 30, 40, 24, 0, CAR_B, "Passing vehicle")}
`, "0 0 400 200");

export const SCENE_TURN_GOOD = svg(`
  <rect width="400" height="200" fill="#fff"/>
  ${multilane(2, 200)}
  ${car(150, 87, 40, 24, 0, CAR_A, "Signals early, slows gradually")}
  <path d="M190 99 Q 260 99 300 40" stroke="${NAVY}" stroke-width="2" fill="none" stroke-dasharray="5,5"/>
`, "0 0 400 200");

export const SCENE_TURN_LATE = svg(`
  <rect width="400" height="200" fill="#fff"/>
  ${multilane(2, 200)}
  ${car(260, 87, 40, 24, 0, CAR_B, "Signals as brakes lock up")}
  ${brakeLight(260, 87)}${brakeLight(292, 87)}
  ${label(200, 30, "Sudden braking, signal comes on late", "#8a3a25", 12)}
`, "0 0 400 200");

export const SCENE_PARKING_CHOICES = svg(`
  <rect width="400" height="260" fill="#fff"/>
  <rect x="0" y="0" width="400" height="260" fill="${ROAD}"/>
  <rect x="150" y="0" width="60" height="260" fill="#dfe3ee"/>
  <circle cx="70" cy="130" r="10" fill="#a3271e"/>
  ${label(70, 155, "Fire hydrant", "#fff", 9)}
  <rect x="170" y="150" width="20" height="40" fill="#5a4426"/>
  ${label(180, 205, "Railroad", "#fff", 9)}
  <rect x="280" y="10" width="60" height="10" fill="#fff"/>
  ${label(310, 35, "Crosswalk", NAVY, 9)}
  <rect x="330" y="180" width="50" height="60" fill="#8fbf9a"/>
  ${label(355, 245, "Open legal curb", NAVY, 9)}
`);

export const SCENE_HILL_UPGRADE = svg(`
  <rect width="300" height="220" fill="#fff"/>
  <polygon points="0,220 300,60 300,220" fill="${ROAD}"/>
  ${car(90, 150, 46, 26, -25, CAR_A, "")}
  ${label(150, 200, "Facing uphill — wheels turned away from curb", NAVY, 11)}
`, "0 0 300 220");

export const SCENE_HILL_DOWNGRADE = svg(`
  <rect width="300" height="220" fill="#fff"/>
  <polygon points="0,60 300,220 0,220" fill="${ROAD}"/>
  ${car(80, 150, 46, 26, 25, CAR_A, "")}
  ${label(150, 200, "Facing downhill — wheels turned toward curb", NAVY, 11)}
`, "0 0 300 220");

export const SCENE_LEAVING_SPACE = svg(`
  <rect width="400" height="220" fill="#fff"/>
  ${multilane(1, 220)}
  ${car(160, 87, 46, 26, 0, CAR_A, "You — pulling out")}
  <circle cx="60" cy="60" r="8" fill="${CAR_C}"/>
  ${label(60, 40, "Approaching bicyclist", NAVY, 10)}
`, "0 0 400 220");

export const SCENE_BACKING_LOT = svg(`
  <rect width="400" height="260" fill="#fff"/>
  <rect width="400" height="260" fill="#dfe3ee"/>
  ${car(170, 60, 46, 26, 180, CAR_A, "You — backing out")}
  <circle cx="90" cy="180" r="8" fill="${CAR_C}"/>
  ${label(90, 200, "Pedestrian", NAVY, 9)}
  ${car(280, 190, 40, 24, 90, CAR_B, "")}
  ${label(300, 225, "Moving vehicle", NAVY, 9)}
  <rect x="60" y="90" width="20" height="24" fill="${CAR_D}"/>
  ${label(70, 130, "Cart", NAVY, 9)}
`);

export const SCENE_COASTING_DOWNGRADE = svg(`
  <rect width="300" height="220" fill="#fff"/>
  <polygon points="0,60 300,220 0,220" fill="${ROAD}"/>
  ${car(90, 150, 46, 26, 25, CAR_A, "Shifted to neutral")}
  ${label(150, 30, "Downgrade — gears in neutral", "#8a3a25", 11)}
`, "0 0 300 220");

// ============================================================
// Chapter 4 — Freeway Flow
// ============================================================

export const SCENE_MERGE_GAP_A = svg(`
  <rect width="400" height="220" fill="#fff"/>
  ${multilane(2, 220)}
  <polygon points="0,220 120,220 0,160" fill="${ROAD}"/>
  ${car(30, 190, 40, 24, -20, CAR_A, "You")}
  ${car(150, 60, 46, 26, 0, CAR_B, "")}
  ${car(210, 60, 46, 26, 0, CAR_C, "")}
  ${label(200, 200, "Gap A — barely a car length", "#8a3a25", 12)}
`, "0 0 400 220");

export const SCENE_MERGE_GAP_B = svg(`
  <rect width="400" height="220" fill="#fff"/>
  ${multilane(2, 220)}
  <polygon points="0,220 120,220 0,160" fill="${ROAD}"/>
  ${car(30, 190, 40, 24, -20, CAR_A, "You")}
  ${car(150, 60, 46, 26, 0, CAR_B, "")}
  ${car(320, 60, 46, 26, 0, CAR_C, "")}
  ${label(200, 200, "Gap B — room to match speed and merge", "#1b7a3d", 12)}
`, "0 0 400 220");

export const SCENE_FREEWAY_BUILDUP = svg(`
  <rect width="400" height="220" fill="#fff"/>
  ${multilane(3, 220)}
  ${car(40, 160, 46, 26, 0, CAR_A, "You")}
  ${car(140, 100, 46, 26, 0, CAR_B, "")}
  ${brakeLight(140, 100)}${brakeLight(172, 100)}
  ${car(220, 90, 46, 26, 0, CAR_C, "")}
  ${brakeLight(220, 90)}${brakeLight(252, 90)}
  <polygon points="330,0 400,0 400,60" fill="#dfe3ee"/>
  ${label(360, 30, "Ramp", NAVY, 9)}
  <rect x="300" y="0" width="34" height="34" transform="rotate(45 317 17)" fill="#d9720b" stroke="${NAVY}" stroke-width="2"/>
`, "0 0 400 220");

export const SCENE_EXIT_LATE = svg(`
  <rect width="400" height="220" fill="#fff"/>
  ${multilane(3, 220)}
  ${car(50, 160, 46, 26, 0, CAR_A, "You")}
  <polygon points="330,0 400,0 400,60" fill="#dfe3ee"/>
  ${label(360, 30, "Exit — right here", NAVY, 9)}
  ${label(200, 200, "Exit is close, but you're several lanes away", "#8a3a25", 12)}
`, "0 0 400 220");

export const SCENE_ROUTE_STORM = svg(`
  <rect width="400" height="220" fill="#fff"/>
  ${multilane(1, 220)}
  ${car(150, 87, 46, 26, 0, CAR_A, "You")}
  ${Array.from({ length: 30 }, (_, i) => `<line x1="${(i * 27) % 400}" y1="${(i * 41) % 220}" x2="${((i * 27) % 400) - 8}" y2="${((i * 41) % 220) + 16}" stroke="#7c93c0" stroke-width="1.5"/>`).join("")}
  ${label(200, 30, "Heavy storm, unfamiliar road, low visibility", "#8a3a25", 12)}
`, "0 0 400 220");

// ============================================================
// Chapter 5 — When Conditions Change
// ============================================================

export const SCENE_MONOTONOUS_ROAD = svg(`
  <rect width="400" height="220" fill="#fff"/>
  ${multilane(1, 220)}
  ${car(150, 87, 46, 26, 0, CAR_A, "You")}
  ${Array.from({ length: 8 }, (_, i) => `<line x1="${i * 50}" y1="100" x2="${i * 50 + 20}" y2="100" stroke="#fff" stroke-width="3"/>`).join("")}
  ${label(200, 30, "Same road, same speed, for a long time", "#48597d", 12)}
`, "0 0 400 220");

export const SCENE_BREAKDOWN_SHOULDER = svg(`
  <rect width="400" height="180" fill="#fff"/>
  ${multilane(2, 180)}
  <rect x="0" y="140" width="400" height="40" fill="#dfe3ee"/>
  ${car(280, 145, 46, 26, 0, CAR_A, "You — on the shoulder")}
`, "0 0 400 180");

export const SCENE_BREAKDOWN_LIVE_LANE = svg(`
  <rect width="400" height="180" fill="#fff"/>
  ${multilane(2, 180)}
  ${car(150, 40, 46, 26, 0, CAR_A, "You — stalled in traffic")}
  ${car(150, 100, 46, 26, 0, CAR_B, "Traffic approaching")}
`, "0 0 400 180");

export const SCENE_BREAKDOWN_INTERSECTION = svg(`
  <rect width="400" height="220" fill="#fff"/>
  ${multilane(2, 220)}
  <rect x="0" y="90" width="400" height="40" fill="${ROAD}"/>
  ${car(180, 95, 46, 26, 0, CAR_A, "You — stalled here")}
`, "0 0 400 220");

export const SCENE_SKID = svg(`
  <rect width="400" height="220" fill="#fff"/>
  ${multilane(1, 220)}
  ${car(150, 87, 46, 26, 25, CAR_A, "Rear sliding right")}
  ${label(200, 30, "Skid — rear of the vehicle sliding out", "#8a3a25", 12)}
`, "0 0 400 220");

export const SCENE_BRAKE_FAILURE = svg(`
  <rect width="400" height="220" fill="#fff"/>
  ${multilane(1, 220)}
  ${car(150, 87, 46, 26, 0, CAR_A, "Pedal goes to the floor")}
`, "0 0 400 220");

export const SCENE_OFF_PAVEMENT = svg(`
  <rect width="400" height="220" fill="#fff"/>
  <rect x="0" y="0" width="300" height="220" fill="${ROAD}"/>
  <rect x="300" y="0" width="100" height="220" fill="#c9b98a"/>
  ${car(240, 87, 46, 26, 0, CAR_A, "Right wheels off the pavement")}
`, "0 0 400 220");

export const SCENE_BLOWOUT = svg(`
  <rect width="400" height="220" fill="#fff"/>
  ${multilane(1, 220)}
  ${car(150, 87, 46, 26, 5, CAR_A, "Sudden tire failure")}
`, "0 0 400 220");

export const SCENE_STEEP_DOWNGRADE = svg(`
  <rect width="300" height="220" fill="#fff"/>
  <polygon points="0,40 300,220 0,220" fill="${ROAD}"/>
  ${car(70, 140, 46, 26, 30, CAR_A, "")}
  ${label(150, 30, "Long, steep downgrade ahead", NAVY, 12)}
`, "0 0 300 220");

export const SCENE_DRY_ROAD = svg(`
  <rect width="400" height="180" fill="#fff"/>
  ${multilane(1, 180)}
  ${car(150, 77, 46, 26, 0, CAR_A, "You")}
  ${label(200, 30, "Dry road", "#1b7a3d", 12)}
`, "0 0 400 180");

export const SCENE_ICY_ROAD = svg(`
  <rect width="400" height="180" fill="#fff"/>
  <rect x="0" y="0" width="400" height="180" fill="#dbe7f2"/>
  ${car(150, 77, 46, 26, 0, CAR_A, "You")}
  ${label(200, 30, "Icy / winter road", "#1a4f9c", 12)}
`, "0 0 400 180");

// ============================================================
// Chapter 6 — Work Zones & Putting It Together
// ============================================================

export const SCENE_WORKZONE_ADVANCE = svg(`
  <rect width="400" height="200" fill="#fff"/>
  ${multilane(2, 200)}
  ${car(150, 87, 46, 26, 0, CAR_A, "You")}
  <rect x="300" y="20" width="34" height="34" transform="rotate(45 317 37)" fill="#d9720b" stroke="${NAVY}" stroke-width="2"/>
  ${label(317, 15, "Road Work Ahead", NAVY, 9)}
`, "0 0 400 200");

export const SCENE_WORKZONE_SHIFT = svg(`
  <rect width="400" height="200" fill="#fff"/>
  ${multilane(2, 200)}
  <path d="M200 0 Q 260 100 200 200" stroke="${YELLOW}" stroke-width="4" fill="none" stroke-dasharray="12,8"/>
  ${car(150, 87, 46, 26, 10, CAR_A, "You")}
`, "0 0 400 200");

export const SCENE_WORKZONE_WORKERS = svg(`
  <rect width="400" height="200" fill="#fff"/>
  ${multilane(2, 200)}
  ${car(60, 87, 46, 26, 0, CAR_A, "You")}
  <circle cx="280" cy="90" r="8" fill="#d9720b"/>
  <circle cx="310" cy="95" r="8" fill="#d9720b"/>
  ${label(295, 120, "Workers near the lane", NAVY, 9)}
`, "0 0 400 200");

export const SCENE_WORKZONE_BACKUP = svg(`
  <rect width="400" height="200" fill="#fff"/>
  ${multilane(2, 200)}
  ${car(60, 87, 46, 26, 0, CAR_A, "You")}
  ${car(140, 87, 46, 26, 0, CAR_B, "")}
  ${brakeLight(140, 87)}${brakeLight(172, 87)}
  ${car(220, 87, 46, 26, 0, CAR_C, "")}
  ${brakeLight(220, 87)}${brakeLight(252, 87)}
  ${car(300, 87, 46, 26, 0, CAR_D, "")}
  ${brakeLight(300, 87)}${brakeLight(332, 87)}
`, "0 0 400 200");

export const SCENE_T5_MISTAKE_SPOTTER = svg(`
  <rect width="400" height="300" fill="#fff"/>
  ${multilane(3, 300)}
  ${car(30, 210, 46, 26, 0, CAR_A, "Following closely, signaling")}
  ${car(80, 210, 46, 26, 0, CAR_B, "Too close")}
  <circle cx="330" cy="140" r="9" fill="${CAR_D}"/>
  ${label(330, 165, "Motorcycle — blind spot", NAVY, 9)}
  <rect x="300" y="10" width="30" height="30" transform="rotate(45 315 25)" fill="#d9720b" stroke="${NAVY}" stroke-width="2"/>
  <polygon points="0,300 60,300 0,240" fill="${ROAD}"/>
  ${label(30, 285, "Freeway entrance", NAVY, 9)}
`);

export const SCENE_FLOW_CHALLENGE = svg(`
  <rect width="400" height="300" fill="#fff"/>
  ${multilane(3, 300)}
  ${car(60, 210, 46, 26, 0, CAR_A, "You")}
  ${car(140, 140, 46, 26, 0, CAR_B, "")}
  ${brakeLight(140, 140)}${brakeLight(172, 140)}
  ${car(280, 60, 26, 46, 90, CAR_C, "Merging")}
  <circle cx="320" cy="230" r="9" fill="${CAR_D}"/>
  ${label(320, 255, "Blind spot", NAVY, 9)}
  <polygon points="340,0 400,0 400,50" fill="#dfe3ee"/>
  ${label(370, 25, "Exit", NAVY, 9)}
  ${Array.from({ length: 12 }, (_, i) => `<line x1="${(i * 33) % 400}" y1="${(i * 47) % 300}" x2="${((i * 33) % 400) - 6}" y2="${((i * 47) % 300) + 10}" stroke="#7c93c0" stroke-width="1.2"/>`).join("")}
`);
