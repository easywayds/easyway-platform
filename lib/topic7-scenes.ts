// Inline SVG scenes for the Topic 7 interactive blocks — Cooperating with
// Other Roadway Users. Consistent road-user silhouettes reused across
// every block (car, motorcycle, bicycle, pedestrian, truck, horse, worker,
// police vehicle), matching the navy/yellow visual language already
// established in Topics 3-6.

const NAVY = "#0b2345";
const YELLOW = "#ffd400";
const ROAD = "#c9cfda";
const LANE_LINE = "#ffffff";
const CAR_A = "#0b2345";
const CAR_B = "#c4593b";
const CAR_C = "#2f8066";

function svg(inner: string, viewBox = "0 0 400 260"): string {
  return `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" role="presentation">${inner}</svg>`;
}

function label(cx: number, y: number, text: string, color = NAVY, size = 11): string {
  return `<text x="${cx}" y="${y}" text-anchor="middle" font-family="Poppins,sans-serif" font-size="${size}" font-weight="700" fill="${color}">${text}</text>`;
}

function road(h = 260, lanes = 2): string {
  const laneW = 400 / lanes;
  let lines = "";
  for (let i = 1; i < lanes; i++) {
    lines += `<line x1="${i * laneW}" y1="0" x2="${i * laneW}" y2="${h}" stroke="${LANE_LINE}" stroke-width="2" stroke-dasharray="10,8"/>`;
  }
  return `<rect x="0" y="0" width="400" height="${h}" fill="${ROAD}"/>${lines}`;
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

function truck(x: number, y: number, tag: string): string {
  return `
    <rect x="${x}" y="${y}" width="30" height="26" rx="4" fill="${NAVY}"/>
    <rect x="${x + 30}" y="${y - 4}" width="70" height="34" rx="4" fill="#48597d"/>
    ${tag ? label(x + 60, y + 46, tag, NAVY, 10) : ""}
  `;
}

function motorcycle(cx: number, cy: number, tag: string): string {
  return `<circle cx="${cx}" cy="${cy}" r="9" fill="${CAR_C}"/>${tag ? label(cx, cy + 24, tag, NAVY, 9) : ""}`;
}

function bicycle(cx: number, cy: number, tag: string): string {
  return `
    <circle cx="${cx - 8}" cy="${cy}" r="7" fill="none" stroke="${NAVY}" stroke-width="2"/>
    <circle cx="${cx + 8}" cy="${cy}" r="7" fill="none" stroke="${NAVY}" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy - 14}" r="4" fill="${CAR_C}"/>
    ${tag ? label(cx, cy + 24, tag, NAVY, 9) : ""}
  `;
}

function pedestrian(cx: number, cy: number, tag: string): string {
  return `
    <circle cx="${cx}" cy="${cy - 10}" r="6" fill="${NAVY}"/>
    <rect x="${cx - 6}" y="${cy - 4}" width="12" height="18" rx="5" fill="${NAVY}"/>
    ${tag ? label(cx, cy + 26, tag, NAVY, 9) : ""}
  `;
}

function horse(cx: number, cy: number, tag: string): string {
  return `
    <ellipse cx="${cx}" cy="${cy}" rx="16" ry="9" fill="#8a5d14"/>
    <circle cx="${cx + 16}" cy="${cy - 6}" r="6" fill="#8a5d14"/>
    ${tag ? label(cx, cy + 22, tag, NAVY, 9) : ""}
  `;
}

function worker(cx: number, cy: number, tag: string): string {
  return `
    <circle cx="${cx}" cy="${cy - 10}" r="6" fill="#d9720b"/>
    <rect x="${cx - 6}" y="${cy - 4}" width="12" height="18" rx="4" fill="#d9720b"/>
    ${tag ? label(cx, cy + 26, tag, NAVY, 9) : ""}
  `;
}

// ============================================================
// Chapter 1 — Sharing the Road
// ============================================================

export const SCENE_T7_OPENING = svg(`
  <rect width="400" height="300" fill="#fff"/>
  ${road(300, 3)}
  ${car(30, 220, 46, 26, 0, CAR_A, "You")}
  ${motorcycle(210, 240, "Motorcycle")}
  ${bicycle(300, 180, "Bicycle")}
  ${pedestrian(90, 120, "Pedestrian")}
  ${truck(230, 40, "Truck")}
  ${worker(340, 120, "Worker")}
  ${car(150, 60, 40, 24, 90, "#8a5d14", "Slow-moving")}
`);

export const SCENE_CAT_MOTOR = svg(`
  <rect width="360" height="140" fill="#fff"/>
  ${car(30, 40, 46, 26, 0, CAR_A, "Car")}
  ${motorcycle(150, 55, "Motorcycle")}
  ${truck(230, 30, "Truck")}
`, "0 0 360 140");

export const SCENE_CAT_VULNERABLE = svg(`
  <rect width="360" height="140" fill="#fff"/>
  ${pedestrian(60, 55, "Pedestrian")}
  ${bicycle(160, 55, "Bicycle")}
  ${worker(260, 55, "Worker")}
`, "0 0 360 140");

export const SCENE_VULN_CAR = svg(`
  <rect width="360" height="140" fill="#fff"/>
  ${car(150, 50, 60, 34, 0, CAR_A, "Passenger vehicle — structure, airbags, crumple zones")}
`, "0 0 360 140");

export const SCENE_VULN_MOTO = svg(`
  <rect width="360" height="140" fill="#fff"/>
  ${motorcycle(180, 55, "")}
  ${label(180, 100, "Motorcyclist — limited physical protection", NAVY, 10)}
`, "0 0 360 140");

export const SCENE_VULN_PED = svg(`
  <rect width="360" height="140" fill="#fff"/>
  ${pedestrian(180, 55, "")}
  ${label(180, 100, "Pedestrian/bicyclist — no vehicle structure at all", NAVY, 10)}
`, "0 0 360 140");

// ============================================================
// Chapter 2 — Vulnerable Road Users
// ============================================================

export const SCENE_MOTO_MIRROR = svg(`
  <rect width="400" height="220" fill="#fff"/>
  ${road(220, 2)}
  ${car(60, 96, 46, 26, 0, CAR_A, "You — mirror looks clear")}
  ${motorcycle(260, 108, "")}
  ${label(260, 132, "In your blind spot", NAVY, 10)}
`, "0 0 400 220");

export const SCENE_MOTO_DISTANCE = svg(`
  <rect width="400" height="180" fill="#fff"/>
  ${road(180, 1)}
  ${car(300, 77, 46, 26, 180, CAR_B, "Passenger vehicle")}
  ${motorcycle(90, 90, "Motorcycle — same distance")}
`, "0 0 400 180");

export const SCENE_BICYCLE_SQUEEZE = svg(`
  <rect width="400" height="200" fill="#fff"/>
  ${road(200, 1)}
  <line x1="0" y1="100" x2="400" y2="100" stroke="#e8c22a" stroke-width="3"/>
  ${car(30, 87, 40, 24, 0, CAR_A, "You")}
  ${bicycle(160, 100, "Bicyclist")}
  ${car(340, 30, 40, 24, 180, CAR_C, "Oncoming")}
  ${label(200, 30, "Limited space, solid line, oncoming traffic", "#8a3a25", 11)}
`, "0 0 400 200");

export const SCENE_BICYCLE_CLEAR = svg(`
  <rect width="400" height="200" fill="#fff"/>
  ${road(200, 1)}
  <line x1="0" y1="100" x2="400" y2="100" stroke="#e8c22a" stroke-width="3" stroke-dasharray="14,10"/>
  ${car(30, 87, 40, 24, 0, CAR_A, "You")}
  ${bicycle(160, 100, "Bicyclist")}
  ${label(200, 30, "Oncoming traffic has cleared", "#1b7a3d", 11)}
`, "0 0 400 200");

export const SCENE_PEDESTRIAN_TURN = svg(`
  <rect width="400" height="220" fill="#fff"/>
  ${road(220, 2)}
  <rect x="0" y="90" width="400" height="40" fill="${ROAD}"/>
  ${car(60, 95, 46, 26, 20, CAR_A, "You — turning")}
  ${pedestrian(220, 60, "Pedestrian crossing")}
`, "0 0 400 220");

export const SCENE_VULN_MISTAKE_1 = svg(`
  <rect width="400" height="260" fill="#fff"/>
  ${road(260, 3)}
  ${car(30, 190, 46, 26, 0, CAR_A, "You")}
  ${motorcycle(210, 200, "Motorcycle — blind spot")}
  ${bicycle(300, 130, "Bicyclist")}
  ${pedestrian(90, 60, "Pedestrian at driveway")}
`);

// ============================================================
// Chapter 3 — Large & Unusual Roadway Users
// ============================================================

export const SCENE_TRUCK_BLINDAREA = svg(`
  <rect width="400" height="260" fill="#fff"/>
  ${road(260, 1)}
  ${truck(150, 100, "Truck")}
  ${car(150, 200, 40, 24, 0, CAR_A, "Directly behind")}
  ${car(20, 100, 40, 24, 0, CAR_B, "Beside cab — visible")}
  ${car(150, 30, 40, 24, 0, CAR_C, "Beside trailer — hidden")}
`);

export const SCENE_WIDE_TURN = svg(`
  <rect width="400" height="220" fill="#fff"/>
  ${road(220, 2)}
  ${truck(140, 90, "Truck — turning right")}
  ${car(50, 160, 40, 24, 0, CAR_A, "Trying to squeeze past")}
`, "0 0 400 220");

export const SCENE_PASS_TRUCK = svg(`
  <rect width="400" height="200" fill="#fff"/>
  ${road(200, 1)}
  ${truck(60, 87, "Truck")}
  ${car(250, 87, 40, 24, 0, CAR_A, "You — passing")}
`, "0 0 400 200");

export const SCENE_SLOW_HORSE_RAIL = svg(`
  <rect width="400" height="220" fill="#fff"/>
  ${road(220, 1)}
  ${car(50, 20, 40, 24, 90, "#8a5d14", "Slow-moving vehicle")}
  ${horse(200, 90, "Horseback rider")}
  <rect x="0" y="150" width="400" height="10" fill="#8a6a3a"/>
  ${label(200, 200, "Light rail tracks", NAVY, 10)}
`, "0 0 400 220");

// ============================================================
// Chapter 4 — Crashes, Law Enforcement & Community Safety
// ============================================================

export const SCENE_CRASH_SCENE = svg(`
  <rect width="400" height="220" fill="#fff"/>
  ${road(220, 2)}
  ${car(150, 90, 46, 26, 15, CAR_B, "Collision")}
  ${car(230, 110, 46, 26, -10, CAR_C, "")}
  ${car(40, 190, 40, 24, 0, CAR_A, "You — arriving")}
`, "0 0 400 220");

export const SCENE_TRAFFIC_STOP = svg(`
  <rect width="400" height="200" fill="#fff"/>
  ${road(200, 1)}
  ${car(200, 130, 40, 24, 0, CAR_A, "You")}
  <rect x="240" y="30" width="10" height="90" fill="${NAVY}"/>
  <circle cx="245" cy="35" r="8" fill="#e34b3c"/>
  <circle cx="230" cy="45" r="8" fill="#1a4f9c"/>
  ${label(245, 20, "Officer signals", NAVY, 10)}
`, "0 0 400 200");

// ============================================================
// Chapter 5 — People, Passengers & Vehicle Responsibilities
// ============================================================

export const SCENE_RESTRAINTS = svg(`
  <rect width="360" height="160" fill="#fff"/>
  <rect x="60" y="30" width="240" height="100" rx="16" fill="#eef1f7" stroke="${NAVY}" stroke-width="2"/>
  ${pedestrian(120, 90, "Driver")}
  ${pedestrian(190, 90, "Adult passenger")}
  ${pedestrian(250, 100, "Child")}
`, "0 0 360 160");

export const SCENE_TOWING_CHAINS = svg(`
  <rect width="400" height="200" fill="#fff"/>
  <rect x="40" y="90" width="90" height="50" rx="6" fill="${CAR_A}"/>
  <rect x="180" y="100" width="120" height="40" rx="6" fill="#8a97b8"/>
  <line x1="130" y1="115" x2="180" y2="115" stroke="${NAVY}" stroke-width="3"/>
  <line x1="130" y1="120" x2="180" y2="105" stroke="#8a5d14" stroke-width="2"/>
  <line x1="130" y1="105" x2="180" y2="120" stroke="#8a5d14" stroke-width="2"/>
  ${label(155, 90, "Hitch", NAVY, 9)}
  ${label(155, 155, "Safety chains — crossed X pattern", NAVY, 10)}
`, "0 0 400 200");

export const SCENE_TOWING_DYNAMICS = svg(`
  <rect width="400" height="180" fill="#fff"/>
  ${road(180, 1)}
  ${car(80, 77, 46, 26, 0, CAR_A, "")}
  <rect x="130" y="82" width="70" height="24" rx="4" fill="#8a97b8"/>
  ${label(150, 40, "Longer, heavier, different stopping and turning", NAVY, 10)}
`, "0 0 400 180");

export const SCENE_CO_OUTDOOR = svg(`
  <rect width="360" height="160" fill="#fff"/>
  <rect width="360" height="160" fill="#eaf3ec"/>
  ${car(150, 60, 60, 34, 0, CAR_A, "Engine running — open air")}
`, "0 0 360 160");

export const SCENE_CO_GARAGE = svg(`
  <rect width="360" height="160" fill="#fff"/>
  <rect x="20" y="10" width="320" height="140" fill="#e7e2d3" stroke="${NAVY}" stroke-width="3"/>
  ${car(150, 65, 60, 34, 0, CAR_B, "Engine running — closed garage")}
`, "0 0 360 160");

// ============================================================
// Chapter 6 — Work Zones & Communication
// ============================================================

export const SCENE_WORKZONE_LAB = svg(`
  <rect width="400" height="260" fill="#fff"/>
  ${road(260, 2)}
  <rect x="300" y="10" width="34" height="34" transform="rotate(45 317 27)" fill="#d9720b" stroke="${NAVY}" stroke-width="2"/>
  ${label(317, 5, "Warning sign", NAVY, 9)}
  <g transform="translate(260,140)"><rect x="-8" y="-24" width="16" height="24" fill="#d9720b"/><circle cx="0" cy="-32" r="8" fill="#e9c9a0"/><rect x="-14" y="-20" width="24" height="10" fill="#fff" stroke="${NAVY}"/></g>
  ${label(260, 175, "Flagger", NAVY, 9)}
  ${Array.from({ length: 3 }, (_, i) => `<circle cx="${100 + i * 26}" cy="${190 + (i % 2) * 8}" r="8" fill="#d9720b" stroke="${NAVY}" stroke-width="1.5"/>`).join("")}
  ${label(126, 225, "Cones", NAVY, 9)}
  <rect x="40" y="60" width="50" height="30" fill="${NAVY}"/>
  ${label(65, 100, "Arrow board", NAVY, 9)}
  ${worker(340, 200, "Worker")}
`);

export const SCENE_WORKZONE_FOLLOW = svg(`
  <rect width="400" height="200" fill="#fff"/>
  ${road(200, 2)}
  ${car(150, 87, 46, 26, 0, CAR_A, "You")}
  ${car(230, 87, 40, 24, 0, CAR_B, "Slowing near lane shift")}
`, "0 0 400 200");

export const SCENE_WORKZONE_PASS = svg(`
  <rect width="400" height="200" fill="#fff"/>
  ${road(200, 2)}
  <path d="M200 0 Q 260 100 200 200" stroke="${YELLOW}" stroke-width="4" fill="none" stroke-dasharray="12,8"/>
  ${car(60, 130, 40, 24, 0, CAR_A, "You")}
  ${car(150, 130, 40, 24, 0, CAR_B, "Slower traffic")}
  ${worker(300, 90, "Worker")}
`, "0 0 400 200");

export const SCENE_WZ_ADVANCE = svg(`<rect width="360" height="160" fill="#fff"/><rect x="270" y="20" width="34" height="34" transform="rotate(45 287 37)" fill="#d9720b" stroke="${NAVY}" stroke-width="2"/>${car(60,110,46,26,0,CAR_A,"You")}${label(180,140,"Advance warning ahead",NAVY,10)}`, "0 0 360 160");
export const SCENE_WZ_CLOSURE = svg(`<rect width="360" height="160" fill="#fff"/><path d="M180 0 Q 220 80 180 160" stroke="${YELLOW}" stroke-width="4" fill="none" stroke-dasharray="10,8"/>${car(60,110,46,26,10,CAR_A,"You")}${label(180,20,"Lane closure",NAVY,10)}`, "0 0 360 160");
export const SCENE_WZ_FLAGGER = svg(`<rect width="360" height="160" fill="#fff"/><g transform="translate(220,110)"><rect x="-8" y="-24" width="16" height="24" fill="#d9720b"/><circle cx="0" cy="-32" r="8" fill="#e9c9a0"/><rect x="-14" y="-20" width="24" height="10" fill="#fff" stroke="${NAVY}"/></g>${car(60,110,46,26,0,CAR_A,"You")}${label(220,140,"Flagger",NAVY,10)}`, "0 0 360 160");
export const SCENE_WZ_WORKERS = svg(`<rect width="360" height="160" fill="#fff"/>${worker(220,100,"")}${worker(250,110,"")}${car(60,110,46,26,0,CAR_A,"You")}${label(235,140,"Workers close to the lane",NAVY,10)}`, "0 0 360 160");
export const SCENE_WZ_BACKUP = svg(`<rect width="360" height="160" fill="#fff"/>${car(60,110,46,26,0,CAR_A,"You")}${car(140,110,40,24,0,CAR_B,"")}${car(210,110,40,24,0,CAR_C,"")}${label(180,140,"Sudden traffic backup",NAVY,10)}`, "0 0 360 160");
export const SCENE_WZ_EXIT = svg(`<rect width="360" height="160" fill="#fff"/>${road(160,2)}${car(150,80,46,26,0,CAR_A,"You")}${label(180,20,"Clear of the work area — stay alert",NAVY,10)}`, "0 0 360 160");

export const SCENE_DISABILITIES_ID = svg(`
  <rect width="360" height="220" fill="#fff"/>
  <rect x="40" y="30" width="280" height="160" rx="14" fill="#eef1f7" stroke="${NAVY}" stroke-width="2"/>
  <rect x="60" y="55" width="70" height="70" rx="8" fill="#dfe3ee"/>
  <rect x="150" y="55" width="150" height="14" rx="4" fill="#c9cfda"/>
  <rect x="150" y="80" width="120" height="10" rx="3" fill="#dfe3ee"/>
  <rect x="150" y="98" width="120" height="10" rx="3" fill="#dfe3ee"/>
  <rect x="60" y="150" width="240" height="20" rx="4" fill="#fff7e0" stroke="#c9a63d"/>
  ${label(180, 164, "Communication Impediment", "#6b4c00", 10)}
`, "0 0 360 220");

export const SCENE_COOPERATION_INTEGRATED = svg(`
  <rect width="400" height="300" fill="#fff"/>
  ${road(300, 3)}
  ${car(30, 220, 46, 26, 0, CAR_A, "You")}
  ${bicycle(150, 230, "Cyclist")}
  ${truck(230, 60, "Truck")}
  <rect x="300" y="10" width="30" height="30" transform="rotate(45 315 25)" fill="#d9720b" stroke="${NAVY}" stroke-width="2"/>
  <rect x="10" y="60" width="10" height="80" fill="${NAVY}"/>
  <circle cx="15" cy="65" r="7" fill="#e34b3c"/>
  ${label(15, 155, "Law enforcement", NAVY, 8)}
  ${car(340, 190, 40, 24, 15, "#a3271e", "Aggressive driver")}
`);

export const SCENE_ROADWAY_MISTAKE_2 = svg(`
  <rect width="400" height="260" fill="#fff"/>
  ${road(260, 2)}
  ${car(60, 190, 46, 26, 0, CAR_A, "You")}
  ${car(150, 190, 40, 24, 10, CAR_B, "Cutting into work-zone merge")}
  <rect x="300" y="20" width="30" height="30" transform="rotate(45 315 35)" fill="#d9720b" stroke="${NAVY}" stroke-width="2"/>
  ${worker(330, 150, "Worker")}
`);
