// Inline SVG scenes for the Topic 2 interactive blocks — Your License to
// Drive. Deliberately different visual identity from the roadway-heavy
// Topics 3-8, per the Topic 2 spec: credential cards, badges, status
// timelines, and driver-vs-vehicle iconography instead of intersections.
// Same navy/yellow/Poppins visual language.

const NAVY = "#0b2345";
const YELLOW = "#ffd400";
const CARD_BG = "#ffffff";
const LINE = "#c9cfda";
const GREEN = "#1b7a3d";
const RED = "#a3271e";
const AMBER = "#8a6a00";

function svg(inner: string, viewBox = "0 0 400 260"): string {
  return `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" role="presentation">${inner}</svg>`;
}

function label(cx: number, y: number, text: string, color = NAVY, size = 11, weight = 700): string {
  return `<text x="${cx}" y="${y}" text-anchor="middle" font-family="Poppins,sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}">${text}</text>`;
}

// A stylized, clearly-illustrative credential card — not a reproduction of
// a real Texas license (no security features, no realistic layout).
function card(x: number, y: number, w: number, h: number, fill: string, headline: string, sub: string): string {
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${fill}" stroke="${NAVY}" stroke-width="1.5" />
    <rect x="${x + 12}" y="${y + 14}" width="${w * 0.28}" height="${h - 28}" rx="6" fill="rgba(11,35,69,0.12)" />
    ${label(x + w / 2 + w * 0.14, y + h / 2 - 4, headline, NAVY, 13)}
    ${sub ? label(x + w / 2 + w * 0.14, y + h / 2 + 14, sub, "#48597d", 9, 600) : ""}
  `;
}

function badge(cx: number, cy: number, r: number, fill: string, text: string): string {
  return `
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" />
    ${label(cx, cy + 4, text, "#fff", 11)}
  `;
}

function personIcon(cx: number, cy: number, color = NAVY): string {
  return `
    <circle cx="${cx}" cy="${cy - 10}" r="9" fill="${color}" />
    <path d="M${cx - 14} ${cy + 20} Q${cx} ${cy - 4} ${cx + 14} ${cy + 20} Z" fill="${color}" />
  `;
}

function carIcon(cx: number, cy: number, color = NAVY): string {
  return `
    <rect x="${cx - 22}" y="${cy - 8}" width="44" height="20" rx="6" fill="${color}" />
    <rect x="${cx - 16}" y="${cy - 14}" width="32" height="10" rx="3" fill="${color}" opacity="0.8" />
    <circle cx="${cx - 12}" cy="${cy + 12}" r="5" fill="${NAVY}" />
    <circle cx="${cx + 12}" cy="${cy + 12}" r="5" fill="${NAVY}" />
  `;
}

// ============================================================
// Chapter 1 — Your Privilege to Drive
// ============================================================

export const SCENE_THREE_DRIVERS = svg(`
  <rect width="400" height="220" fill="#f6f7fb"/>
  ${personIcon(80, 90, RED)}
  ${label(80, 140, "Driver A", NAVY, 11)}
  ${label(80, 156, "No valid license", "#8a3a25", 9, 600)}
  ${personIcon(200, 90, AMBER)}
  ${label(200, 140, "Driver B", NAVY, 11)}
  ${label(200, 156, "Valid, but ignores a restriction", AMBER, 9, 600)}
  ${personIcon(320, 90, GREEN)}
  ${label(320, 140, "Driver C", NAVY, 11)}
  ${label(320, 156, "Valid and compliant", GREEN, 9, 600)}
`, "0 0 400 220");

export const SCENE_LICENSE_CARD_BASIC = svg(`
  <rect width="360" height="160" fill="#f6f7fb"/>
  ${card(60, 40, 240, 90, CARD_BG, "TEXAS DL", "Class · Restrictions · Endorsements · Status")}
`, "0 0 360 160");

// ============================================================
// Chapter 2 — Getting a Texas Driver License
// ============================================================

export const SCENE_LICENSE_ROADMAP = svg(`
  <rect width="120" height="360" fill="#f6f7fb"/>
`, "0 0 120 360");

export const SCENE_PERMIT_CARD = svg(`
  <rect width="360" height="160" fill="#f6f7fb"/>
  ${card(60, 40, 240, 90, "#fff7e0", "INSTRUCTION PERMIT", "Limited — practice under conditions")}
`, "0 0 360 160");

export const SCENE_FULL_LICENSE_CARD = svg(`
  <rect width="360" height="160" fill="#f6f7fb"/>
  ${card(60, 40, 240, 90, "#eaf5ee", "DRIVER LICENSE", "Full driving privilege, subject to class/status")}
`, "0 0 360 160");

// ============================================================
// Chapter 3 — Types, Restrictions & Endorsements
// ============================================================

export const SCENE_VEHICLE_SEDAN = svg(`<rect width="300" height="120" fill="#f6f7fb"/>${carIcon(150, 60, NAVY)}${label(150, 100, "Passenger sedan", NAVY, 10)}`, "0 0 300 120");
export const SCENE_VEHICLE_MOTORCYCLE = svg(`
  <rect width="300" height="120" fill="#f6f7fb"/>
  <circle cx="120" cy="75" r="12" fill="none" stroke="${NAVY}" stroke-width="4"/>
  <circle cx="180" cy="75" r="12" fill="none" stroke="${NAVY}" stroke-width="4"/>
  <path d="M120 75 L150 45 L180 75" stroke="${NAVY}" stroke-width="4" fill="none"/>
  ${label(150, 105, "Motorcycle", NAVY, 10)}
`, "0 0 300 120");
export const SCENE_VEHICLE_COMMERCIAL = svg(`
  <rect width="300" height="120" fill="#f6f7fb"/>
  <rect x="90" y="40" width="120" height="34" rx="4" fill="${NAVY}"/>
  <rect x="60" y="50" width="34" height="24" rx="4" fill="${NAVY}"/>
  <circle cx="80" cy="80" r="7" fill="#48597d"/>
  <circle cx="150" cy="80" r="7" fill="#48597d"/>
  <circle cx="190" cy="80" r="7" fill="#48597d"/>
  ${label(150, 105, "Large commercial vehicle", NAVY, 10)}
`, "0 0 300 120");

export const SCENE_RESTRICTION_LENSES = svg(`
  <rect width="360" height="150" fill="#f6f7fb"/>
  ${card(60, 30, 240, 80, CARD_BG, "TEXAS DL", "Restriction: Corrective lenses")}
  ${personIcon(180, 128, NAVY)}
  ${label(180, 145, "Preparing to drive without lenses", "#8a3a25", 9, 600)}
`, "0 0 360 150");

// ============================================================
// Chapter 4 — Keeping Your Driving Privilege
// ============================================================

export const SCENE_STATUS_ROW = svg(`
  <rect width="400" height="120" fill="#f6f7fb"/>
  ${badge(60, 60, 34, GREEN, "VALID")}
  ${badge(160, 60, 34, AMBER, "RESTR.")}
  ${badge(260, 60, 34, RED, "SUSP.")}
  ${badge(360, 60, 34, "#6b7690", "EXP.")}
`, "0 0 400 120");

// ============================================================
// Chapter 5 — Your Vehicle Must Be Legal Too
// ============================================================

export const SCENE_DRIVER_VS_VEHICLE = svg(`
  <rect width="400" height="200" fill="#f6f7fb"/>
  <line x1="200" y1="20" x2="200" y2="180" stroke="${LINE}" stroke-width="2" stroke-dasharray="6,6"/>
  ${personIcon(100, 90, NAVY)}
  ${label(100, 150, "DRIVER", NAVY, 12)}
  ${label(100, 168, "Needs a valid license", "#48597d", 9, 600)}
  ${carIcon(300, 90, "#c4593b")}
  ${label(300, 150, "VEHICLE", NAVY, 12)}
  ${label(300, 168, "Needs registration, insurance, inspection as applicable", "#48597d", 9, 600)}
`, "0 0 400 200");

export const SCENE_NO_EMISSIONS_COUNTY = svg(`
  <rect width="300" height="130" fill="#f6f7fb"/>
  ${carIcon(150, 60, GREEN)}
  ${label(150, 100, "Non-emissions county", NAVY, 10)}
  ${label(150, 116, "No safety inspection required", GREEN, 9, 600)}
`, "0 0 300 130");

export const SCENE_EMISSIONS_COUNTY = svg(`
  <rect width="300" height="130" fill="#f6f7fb"/>
  ${carIcon(150, 60, AMBER)}
  ${label(150, 100, "Designated emissions county", NAVY, 10)}
  ${label(150, 116, "Emissions test required", AMBER, 9, 600)}
`, "0 0 300 130");

export const SCENE_COMMERCIAL_INSPECTION = svg(`
  <rect width="300" height="130" fill="#f6f7fb"/>
  ${carIcon(150, 60, RED)}
  ${label(150, 100, "Commercial vehicle", NAVY, 10)}
  ${label(150, 116, "Safety inspection still required", RED, 9, 600)}
`, "0 0 300 130");

// ============================================================
// Chapter 6 — Financial Responsibility
// ============================================================

export const SCENE_MONEY_STACK = svg(`
  <rect width="360" height="150" fill="#f6f7fb"/>
  <rect x="40" y="40" width="90" height="70" rx="8" fill="#eaf5ee" stroke="${GREEN}" stroke-width="1.5"/>
  ${label(85, 80, "$30,000", GREEN, 13)}
  ${label(85, 96, "one person", "#48597d", 8, 600)}
  <rect x="140" y="40" width="90" height="70" rx="8" fill="#eaf5ee" stroke="${GREEN}" stroke-width="1.5"/>
  ${label(185, 80, "$60,000", GREEN, 13)}
  ${label(185, 96, "two or more", "#48597d", 8, 600)}
  <rect x="240" y="40" width="90" height="70" rx="8" fill="#eaf5ee" stroke="${GREEN}" stroke-width="1.5"/>
  ${label(285, 80, "$25,000", GREEN, 13)}
  ${label(285, 96, "property damage", "#48597d", 8, 600)}
`, "0 0 360 150");

export const SCENE_PROOF_CARD = svg(`
  <rect width="360" height="140" fill="#f6f7fb"/>
  ${card(60, 30, 240, 80, "#eaf5ee", "PROOF OF FINANCIAL RESPONSIBILITY", "Paper or accepted electronic form")}
`, "0 0 360 140");

// ============================================================
// Chapter 7 — Driving with Disability Program
// ============================================================

export const SCENE_DISABILITY_CARD = svg(`
  <rect width="360" height="160" fill="#f6f7fb"/>
  <rect x="60" y="30" width="240" height="100" rx="10" fill="${CARD_BG}" stroke="${NAVY}" stroke-width="1.5"/>
  <rect x="72" y="44" width="60" height="72" rx="6" fill="rgba(11,35,69,0.12)"/>
  ${label(220, 65, "TEXAS DL / ID", NAVY, 11)}
  <rect x="150" y="78" width="140" height="20" rx="10" fill="${YELLOW}"/>
  ${label(220, 92, "COMMUNICATION IMPEDIMENT", NAVY, 7.5)}
  ${label(220, 112, "Voluntary — front of card", "#48597d", 8, 600)}
`, "0 0 360 160");

export const SCENE_DL101_FORM = svg(`
  <rect width="360" height="140" fill="#f6f7fb"/>
  <rect x="70" y="26" width="220" height="90" rx="8" fill="${CARD_BG}" stroke="${NAVY}" stroke-width="1.5"/>
  <line x1="90" y1="50" x2="270" y2="50" stroke="${LINE}" stroke-width="2"/>
  <line x1="90" y1="66" x2="270" y2="66" stroke="${LINE}" stroke-width="2"/>
  <line x1="90" y1="82" x2="230" y2="82" stroke="${LINE}" stroke-width="2"/>
  ${label(180, 20, "Form DL-101", NAVY, 11)}
  ${label(180, 104, "Physician / Psychiatrist's Statement", "#48597d", 8, 600)}
`, "0 0 360 140");

export const SCENE_TRAFFIC_STOP_COMM = svg(`
  <rect width="360" height="150" fill="#f6f7fb"/>
  ${carIcon(120, 80, NAVY)}
  ${personIcon(260, 60, "#3a6ea5")}
  ${label(260, 100, "Officer", NAVY, 9)}
  ${label(190, 130, "Clearer communication during the interaction", "#48597d", 9, 600)}
`, "0 0 360 150");

// ============================================================
// Integrated scenario (Chapter close)
// ============================================================

export const SCENE_INTEGRATED_STATUS = svg(`
  <rect width="360" height="170" fill="#f6f7fb"/>
  ${card(50, 20, 260, 46, CARD_BG, "LICENSE", "Valid · corrective lenses restriction")}
  ${card(50, 74, 260, 46, CARD_BG, "REGISTRATION", "Current")}
  ${card(50, 128, 260, 46, CARD_BG, "FINANCIAL RESPONSIBILITY", "Current")}
`, "0 0 360 170");
