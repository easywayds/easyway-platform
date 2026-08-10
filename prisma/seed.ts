import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Source: TDLR POI-Adult Six-Hour (16 TAC §84.502), May 2022 revision.
// These are fixed by regulation — do not edit without confirming against
// the current TDLR POI document.
const TOPICS = [
  { number: 1, title: "Course Introduction", minMinutes: 10 },
  { number: 2, title: "Your License to Drive", minMinutes: 20 },
  { number: 3, title: "Right-of-Way", minMinutes: 45 },
  { number: 4, title: "Traffic Control Devices", minMinutes: 40 },
  { number: 5, title: "Controlling Traffic Flow", minMinutes: 35 },
  { number: 6, title: "Alcohol and Other Drugs", minMinutes: 40 },
  { number: 7, title: "Cooperating with Other Roadway Users", minMinutes: 50 },
  {
    number: 8,
    title: "Managing Risk (incl. human trafficking awareness)",
    minMinutes: 40,
  },
  {
    number: 9,
    title: "Classroom Progress Assessment (DPS exam)",
    minMinutes: 25,
  },
];

// ---------------------------------------------------------------------------
// DRAFT QUESTION BANK — NOT REVIEWED, NOT APPROVED FOR LIVE USE
//
// These are original, general-knowledge traffic-law questions written to
// make the assessment engine fully testable end to end. They are a
// starting point only. Per the build plan (Section 7), Easy Way's
// compliance-responsible person must review and sign off on the real
// question bank — drafted from the Texas Driver Handbook — before this
// is ever used with a real, certifying student.
// ---------------------------------------------------------------------------
const QUESTIONS: {
  questionText: string;
  choices: string[];
  correctIndex: number;
  topicNumber?: number;
}[] = [
  {
    questionText: "At a four-way stop where all vehicles arrive at the same time, who has the right-of-way?",
    choices: [
      "The vehicle on the right",
      "The largest vehicle",
      "Whoever honks first",
      "The vehicle turning left",
    ],
    correctIndex: 0,
    topicNumber: 3,
  },
  {
    questionText: "A steady yellow traffic light means:",
    choices: [
      "Speed up to clear the intersection",
      "The signal is about to change to red — stop if you can do so safely",
      "Yield only to pedestrians",
      "Proceed with caution, no other rules apply",
    ],
    correctIndex: 1,
    topicNumber: 4,
  },
  {
    questionText: "A pentagon-shaped (five-sided) road sign indicates:",
    choices: ["A railroad crossing", "A school zone", "A hospital ahead", "A no-passing zone"],
    correctIndex: 1,
    topicNumber: 4,
  },
  {
    questionText: "When approaching a roundabout, drivers should generally yield to:",
    choices: [
      "Traffic already in the roundabout",
      "Traffic waiting to enter",
      "Whoever arrived first regardless of position",
      "No one — roundabouts have no yield rule",
    ],
    correctIndex: 0,
    topicNumber: 5,
  },
  {
    questionText: "The safe following distance in good conditions is often described as:",
    choices: ["1 second", "3 seconds", "10 seconds", "There is no standard guideline"],
    correctIndex: 1,
    topicNumber: 5,
  },
  {
    questionText: "In Texas, a driver under 21 found with any detectable amount of alcohol in their system can be charged under:",
    choices: [
      "The general DWI law only",
      "Zero Tolerance laws for minors",
      "No law — the limit is the same as for adults",
      "Only civil traffic code, not criminal law",
    ],
    correctIndex: 1,
    topicNumber: 6,
  },
  {
    questionText: "Alcohol primarily affects driving ability by:",
    choices: [
      "Improving reaction time",
      "Impairing judgment, coordination, and reaction time",
      "Only affecting vision, nothing else",
      "Having no measurable effect below the legal limit",
    ],
    correctIndex: 1,
    topicNumber: 6,
  },
  {
    questionText: "When a driver notices an aggressive driver behind them, the recommended response is to:",
    choices: [
      "Speed up to get away",
      "Brake-check them",
      "Stay calm, avoid eye contact, and let them pass when safe",
      "Match their speed to discourage tailgating",
    ],
    correctIndex: 2,
    topicNumber: 7,
  },
  {
    questionText: "Before changing lanes, a driver should:",
    choices: [
      "Rely on mirrors only",
      "Check mirrors and blind spots, then signal",
      "Signal only, no need to check further",
      "Change first, then signal",
    ],
    correctIndex: 1,
    topicNumber: 7,
  },
  {
    questionText: "Which of these is a recognized sign that someone may be a victim of human trafficking?",
    choices: [
      "They have their own valid ID readily available",
      "They appear to come and go freely and independently",
      "They seem coached on what to say or someone else answers for them",
      "They are traveling alone with no luggage",
    ],
    correctIndex: 2,
    topicNumber: 8,
  },
  {
    questionText: "Managing driving risk includes:",
    choices: [
      "Ignoring weather conditions since roads are engineered for all conditions",
      "Adjusting speed and following distance for conditions like rain or low visibility",
      "Only slowing down if a police vehicle is visible",
      "Driving at the posted speed limit regardless of conditions",
    ],
    correctIndex: 1,
    topicNumber: 8,
  },
  {
    questionText: "A solid yellow line on your side of the center line means:",
    choices: [
      "Passing is permitted when safe",
      "Passing is not permitted",
      "The lane is closed ahead",
      "You must pull over",
    ],
    correctIndex: 1,
    topicNumber: 4,
  },
  {
    questionText: "When an emergency vehicle approaches with lights and sirens active, a driver should:",
    choices: [
      "Speed up to clear the intersection first",
      "Pull to the right and stop, if it can be done safely",
      "Stop immediately in the current lane, blocking traffic",
      "Ignore it unless it is directly behind you",
    ],
    correctIndex: 1,
    topicNumber: 7,
  },
  {
    questionText: "A flashing red traffic signal should be treated the same as:",
    choices: ["A yield sign", "A stop sign", "A green light", "A do-not-enter sign"],
    correctIndex: 1,
    topicNumber: 4,
  },
  {
    questionText: "When two vehicles arrive at an uncontrolled intersection (no signs or signals) at the same time:",
    choices: [
      "The vehicle on the left must yield to the vehicle on the right",
      "The faster vehicle has the right-of-way",
      "Whoever is turning has automatic right-of-way",
      "There is no rule — drivers must negotiate",
    ],
    correctIndex: 0,
    topicNumber: 3,
  },
  {
    questionText: "Texting while driving in Texas is:",
    choices: [
      "Legal everywhere in the state",
      "Illegal statewide for reading, writing, or sending electronic messages while driving",
      "Only illegal in school zones",
      "Only illegal for drivers under 18",
    ],
    correctIndex: 1,
    topicNumber: 2,
  },
  {
    questionText: "A driver's license can typically be suspended for:",
    choices: [
      "Accumulating excessive traffic violations or a DWI conviction",
      "Driving a car more than five years old",
      "Parking in a private lot",
      "Having more than one passenger",
    ],
    correctIndex: 0,
    topicNumber: 2,
  },
  {
    questionText: "When driving in fog, a driver should use:",
    choices: [
      "High-beam headlights for maximum visibility",
      "Low-beam headlights, and slow down",
      "No headlights, to avoid glare",
      "Hazard lights while driving at normal speed",
    ],
    correctIndex: 1,
    topicNumber: 8,
  },
  {
    questionText: "A diamond-shaped road sign generally indicates:",
    choices: ["A warning of a hazard or condition ahead", "A regulatory speed limit", "A route marker", "A service sign, like a gas station"],
    correctIndex: 0,
    topicNumber: 4,
  },
  {
    questionText: "When merging onto a highway, a driver should:",
    choices: [
      "Stop at the end of the ramp and wait for a gap",
      "Match the speed of highway traffic and merge smoothly when there is a safe gap",
      "Merge as slowly as possible regardless of traffic speed",
      "Always have the right-of-way over merging traffic",
    ],
    correctIndex: 1,
    topicNumber: 5,
  },
  {
    questionText: "Road rage is best described as:",
    choices: [
      "A legal driving technique to assert right-of-way",
      "Aggressive or angry behavior by a driver, often escalating a situation",
      "A required response to being cut off",
      "A traffic control device",
    ],
    correctIndex: 1,
    topicNumber: 7,
  },
  {
    questionText: "In a school zone with a posted reduced speed limit during school hours, a driver must:",
    choices: [
      "Follow the reduced limit only if children are visibly present",
      "Follow the posted reduced limit during the indicated hours, regardless of visibility",
      "Ignore the sign if running late",
      "Only slow down for buses, not the posted limit",
    ],
    correctIndex: 1,
    topicNumber: 2,
  },
  {
    questionText: "A driver approaching a stopped school bus with flashing red lights on a two-lane road must:",
    choices: [
      "Stop, regardless of direction of travel, until lights stop flashing",
      "Slow down but may continue past",
      "Only stop if directly behind the bus",
      "Proceed if no children are visible",
    ],
    correctIndex: 0,
    topicNumber: 7,
  },
  {
    questionText: "Defensive driving primarily means:",
    choices: [
      "Driving aggressively to avoid being taken advantage of",
      "Anticipating hazards and the mistakes of others to avoid collisions",
      "Only following traffic laws when convenient",
      "Driving as fast as conditions technically allow",
    ],
    correctIndex: 1,
    topicNumber: 8,
  },
];

// ---------------------------------------------------------------------------
// DRAFT LESSON CONTENT — grounded in the real, current TDLR POI-Adult
// Six-Hour document (fetched directly from tdlr.texas.gov), which lists
// exactly what each topic must cover. Still a DRAFT: it is original writing
// in Claude's own words, not copied from the POI or the Texas Driver
// Handbook, and it has NOT been checked against the current Texas Driver
// Handbook chapters the POI references for specific facts, figures, and
// statute citations. Easy Way's compliance-responsible person must review
// this against the current Handbook and POI before real, certifying
// students rely on it.
//
// IMPORTANT — SB 1366 (89th Texas Legislature): every driver education
// course completed on or after September 1, 2026 must include content on
// construction/maintenance work zone dangers and penalties (added to
// Topic 7 below). Separately, TDLR required providers to submit an
// updated curriculum outline via the Online Statement of Assurance system
// by August 1, 2026 — Easy Way should confirm directly with TDLR that
// this administrative step is complete, independent of the content itself.
// ---------------------------------------------------------------------------
const LESSON_CONTENT: { topicNumber: number; body: string }[] = [
  // Topic 1 — Course Introduction (10 min)
  {
    topicNumber: 1,
    body: "Welcome to the Texas Adult Driver Education course. This course satisfies the 6-hour classroom requirement set by the Texas Department of Licensing and Regulation (TDLR) for adults completing driver education. It gives you the foundation of knowledge every new driver needs — not just to pass a test, but to keep building safer habits over your entire driving life.",
  },
  {
    topicNumber: 1,
    body: "Driving is a privilege, not a right — one that comes with real responsibilities, obligations, and consequences. A solid foundation in traffic law gives you what you need to make informed, legal, and responsible decisions that reduce risk every time you're behind the wheel. Keep that framing in mind as you move through the next 8 topics: each one is here because it addresses a real, common cause of risk on Texas roads.",
  },

  // Topic 2 — Your License to Drive (20 min)
  {
    topicNumber: 2,
    body: "Obtaining a Texas driver license requires applying in person, providing proof of identity and Texas residency, a Social Security number, and passing the required knowledge and driving tests. Texas licenses fall into classes — Class A, B, and C for standard vehicles of increasing size and weight, and Class M for motorcycles and mopeds — with the class you need depending on what you'll drive. A learner license (instruction permit) allows supervised practice driving before a full license is issued, and applicants under 25 are generally required to complete an approved driver education course.",
  },
  {
    topicNumber: 2,
    body: "A license can carry restriction codes — for example, requiring corrective lenses, daytime-only driving, or an automatic transmission only — and driving outside those restrictions is itself a violation, separate from any other offense. Most non-commercial licenses are valid for six years; a change of name or address must be reported within 30 days, and a lost or damaged license should be replaced promptly rather than driving without a valid card.",
  },
  {
    topicNumber: 2,
    body: "Certain convictions trigger a mandatory license suspension — including DWI, intoxication manslaughter or assault, failure to stop and render aid after a crash, evading arrest, and driving while your license is already invalid. DPS can also suspend or revoke a license administratively for a pattern of repeated violations, for causing a serious crash, or for failing a required test. Texas's Driver Responsibility Program can add point-based and conviction-based surcharges on top of any court fine — so a single serious conviction, like a DWI, can carry real costs well beyond the initial ticket.",
  },
  {
    topicNumber: 2,
    body: "Vehicles registered in Texas must pass an annual safety inspection and carry current registration, shown by a windshield sticker; driving with an expired inspection or registration is its own citation, independent of anything related to your license. Separately, the Texas Motor Vehicle Safety Responsibility Act requires drivers to carry at least the state-minimum liability insurance and be able to show evidence of that coverage to a law enforcement officer, or to another driver, after a crash — confirm the current required minimum amounts, since they can change by legislative action.",
  },

  // Topic 3 — Right-of-Way (45 min)
  {
    topicNumber: 3,
    body: "Right-of-way is something the law grants or requires you to yield — never something to take by force of speed or size. If another driver fails to follow right-of-way rules, the safe move is still to yield to them rather than insist on what's technically yours; a collision doesn't care who was legally correct. Failing to yield when it causes injury to another person carries its own separate fine on top of any other charges from the crash.",
  },
  {
    topicNumber: 3,
    body: "At an intersection controlled by signs or signals, simply obey them. Where a single- or two-lane road meets a divided road or one with three or more lanes, the smaller road yields. Where an unpaved road meets a paved one, the unpaved road yields. At an uncontrolled intersection with no signs, signals, or lane-count difference, yield to any vehicle already at or approaching the intersection from your right — and even if you technically have the right-of-way, don't proceed until you're sure the other driver is actually yielding to you.",
  },
  {
    topicNumber: 3,
    body: "When turning left, yield to all oncoming traffic going straight. When entering or crossing a road from a private driveway, alley, or lot, you must yield to all approaching vehicles and pedestrians on the public road. At a T-intersection, traffic ending at the intersection yields to through traffic. On a frontage road alongside a controlled-access highway, yield to vehicles entering from or exiting to the highway. On a multi-lane one-way road, a vehicle merging in from the right yields to one merging in from the left into the same lane.",
  },
  {
    topicNumber: 3,
    body: "At a railroad grade crossing, you're required to stop between 15 and 50 feet from the nearest rail whenever a signal, lowered gate, flag person, or an approaching train warns you to — and you must stay stopped until it's safe to proceed. Never stop on the tracks; if your vehicle stalls there, get everyone out and clear of the tracks immediately, moving toward an oncoming train's direction (not away from it) to avoid flying debris if it strikes the vehicle. Trains cannot stop for you — always assume one has the right-of-way.",
  },
  {
    topicNumber: 3,
    body: "You must yield to police, fire, and other emergency vehicles running lights or siren — pull to the right and stop if traffic allows, and never follow within 500 feet of a responding fire truck or ambulance. Texas's move-over law requires drivers approaching a stopped emergency vehicle with lights active to change out of the lane closest to it when possible, or slow down significantly (to a specific reduced speed depending on the posted limit) if changing lanes isn't safe. You must also stop for a school bus showing alternating flashing red lights, in both directions on most roads, and not proceed until the lights stop, the bus moves, or the driver signals you on. Pedestrians in a crosswalk — signaled or not — generally have the right-of-way, and a driver's obligation to watch for them never goes away.",
  },

  // Topic 4 — Traffic Control Devices (40 min)
  {
    topicNumber: 4,
    body: "Traffic signs use consistent shapes so drivers recognize them at a glance, even at speed: an octagon is exclusively for stop signs, an equilateral triangle exclusively for yield signs, a diamond exclusively warns of a hazard, a pentagon marks school zones, a round sign warns of a railroad crossing ahead, and a pennant-shaped sign gives advance warning of a no-passing zone. Vertical rectangles are typically regulatory signs (telling you what you must do), while horizontal rectangles are typically guide signs (giving directions or information).",
  },
  {
    topicNumber: 4,
    body: "Color carries meaning too: red means stop or prohibited, yellow is a general warning, orange marks construction or maintenance zones, green shows permitted movement or direction guidance, blue marks motorist services (like hospitals or rest areas), brown marks public recreation or scenic guidance, and black or white are used on regulatory signs. When you see a warning sign, the expected response is the same every time: pay attention, follow its instruction, and reduce speed appropriately for the condition it's flagging.",
  },
  {
    topicNumber: 4,
    body: "Traffic signals follow a consistent, required response: a steady red light means stop before the crosswalk or intersection (a right turn on red is generally allowed unless posted otherwise, after stopping); a flashing red light means stop completely, then proceed only when safe; a steady yellow light warns that red is coming and you should stop if you safely can; a flashing yellow light means proceed with caution; a flashing yellow arrow allows a left turn but only after yielding to oncoming traffic; and a steady green light means proceed if it's clear, watching for pedestrians and vehicles still finishing their crossing. A green arrow shown at the same time as a red light means you may proceed carefully in the arrow's direction, after yielding to other traffic and pedestrians already in the intersection.",
  },
  {
    topicNumber: 4,
    body: "Pavement markings carry the same weight as signs. A solid yellow line means no passing on that side; a broken (dashed) yellow line permits passing when clear. White lines separate same-direction lanes — solid white discourages lane changes through that stretch, broken white permits them. These markings work together with signs and signals, not instead of them — always obey the more restrictive of the two if they ever seem to conflict, and default to caution.",
  },

  // Topic 5 — Controlling Traffic Flow (35 min)
  {
    topicNumber: 5,
    body: "Traffic flow refers to how vehicles move through the road system in relation to one another, and it's managed jointly by traffic control devices, law enforcement, and the coordinated behavior of drivers themselves. Communicating your intentions clearly — signaling before turns or lane changes, and adjusting speed predictably — is one of the most basic things you can do to keep flow safe. Signaling shows your intent; it is not permission to move until you've confirmed it's safe.",
  },
  {
    topicNumber: 5,
    body: "Before changing lanes, check your mirrors and your blind spot (the area not visible in mirrors, generally toward the rear corners of your vehicle) by glancing over your shoulder. Maintain a safe following interval — commonly taught as at least 3 seconds behind the vehicle ahead in good conditions — and increase that gap in rain, low visibility, or heavy traffic, since your actual stopping distance depends heavily on road conditions, not just your speed.",
  },
  {
    topicNumber: 5,
    body: "Texas sets both minimum and maximum speed limits on many roadways — driving unreasonably slowly can be as much a hazard as speeding. Some Texas beaches allow vehicle traffic and have their own posted speed limits; always follow local posted signs. Headlights and other vehicle lights are legally required to be used from dusk to dawn and any time visibility is reduced (rain, fog).",
  },
  {
    topicNumber: 5,
    body: "Freeway entry and exit are common crash points: when entering, match the speed of traffic already on the highway and merge into a safe gap rather than stopping at the end of the ramp; when exiting, signal early and reduce speed only after you've moved into the exit lane. Watch for driver fatigue on long or monotonous drives — sometimes called 'highway hypnosis' — and pull over to rest rather than push through drowsiness.",
  },
  {
    topicNumber: 5,
    body: "If your vehicle breaks down, move as far off the roadway as possible, turn on hazard lights, and stay clear of moving traffic while waiting for help. If you experience a skid, ease off the accelerator and steer smoothly in the direction you want the vehicle to go rather than braking hard. Brake failure, running off the pavement, a tire blowout, and driving down a steep grade each call for staying calm, avoiding sudden steering or braking inputs, and gradually regaining control. Winter conditions (ice, snow) reduce traction significantly — slow down well before curves or stops, and increase following distance further.",
  },

  // Topic 6 — Alcohol and Other Drugs (40 min)
  {
    topicNumber: 6,
    body: "Texas law defines intoxication as not having the normal use of mental or physical faculties due to alcohol, a controlled substance, a drug, or a combination of those — or having a blood alcohol concentration (BAC) of 0.08% or higher. Impairment doesn't begin at the legal limit; alcohol affects judgment, reaction time, and coordination well before BAC reaches 0.08%, and those effects worsen as BAC rises.",
  },
  {
    topicNumber: 6,
    body: "For drivers 21 and over, Texas law covers a range of offenses connected to impaired driving: improper use of a driver license, Driving Under the Influence, Public Intoxication, Driving While Intoxicated (DWI), Intoxication Assault, and Intoxication Manslaughter — each carrying its own penalties, which escalate sharply when a crash causes injury or death.",
  },
  {
    topicNumber: 6,
    body: "For drivers under 21, Texas applies a Zero Tolerance standard: Driving Under the Influence by a Minor makes it illegal to drive with any detectable amount of alcohol, regardless of impairment. Minors also face Public Intoxication and Minor in Possession laws, and are subject to the same DWI, Intoxication Assault, and Intoxication Manslaughter statutes that apply to adults if their impairment rises to that level.",
  },
  {
    topicNumber: 6,
    body: "Texas's Open Container Law prohibits an open container of alcohol in the passenger area of a vehicle on a public roadway, with an enhancement that increases penalties when combined with certain other offenses. Administrative License Revocation and Implied Consent laws mean that by driving in Texas, you've already agreed to submit to testing if lawfully arrested for DWI — refusing that test carries its own separate license consequences, independent of the DWI charge itself.",
  },

  // Topic 7 — Cooperating with Other Roadway Users (50 min)
  {
    topicNumber: 7,
    body: "Roadway users fall into several categories beyond passenger vehicles: bicyclists, motorcyclists, pedestrians, large trucks, light rail, riders on horseback or horse-drawn conveyances, slow-moving vehicles, and workers in construction/work zones. Each has different rights, vulnerabilities, and predictable behaviors — recognizing which category you're dealing with helps you respond correctly.",
  },
  {
    topicNumber: 7,
    body: "Texas's Good Samaritan Law provides legal protection to people who, in good faith, render emergency care at the scene of a crash. If you're at a crash scene, prioritize your own safety and that of others, call for emergency help, and assist within your ability without moving injured people unless there's an immediate danger (like fire).",
  },
  {
    topicNumber: 7,
    body: "Give bicyclists and motorcyclists a full lane's width and extra following distance — both are harder to see and more vulnerable in a collision than a car. Around large trucks, stay out of their blind spots ('no-zones'): if you can't see the truck driver's mirror, they likely can't see you. Slow down and be prepared to stop for light rail vehicles, horse-drawn conveyances or riders on horseback, other slow-moving vehicles, and workers in marked construction or work zones.",
  },
  {
    topicNumber: 7,
    body: "Occupant restraint laws require seat belts for drivers and most passengers; riding in an open truck bed is restricted by law and carries real injury risk. If you're stopped by law enforcement, Texas's Community Safety Education Act (Senate Bill 30) outlines expected conduct for both drivers and officers during a traffic stop — keep your hands visible, follow instructions calmly, and retrieve documents only when asked.",
  },
  {
    topicNumber: 7,
    body: "Aggressive driving means operating a vehicle in a way that endangers others through impatience, hostility, or intent to intimidate — tailgating, weaving through traffic, or brake-checking are examples. If you encounter an aggressive driver, don't engage: avoid eye contact, don't match their speed, and let them pass when safe. When transporting cargo, secure loads properly and use safety chains when towing. A running vehicle in an enclosed space (like a closed garage) can produce dangerous levels of carbon monoxide — a colorless, odorless gas — quickly; never let an engine run in an unventilated enclosed space.",
  },
  {
    topicNumber: 7,
    body: "Construction and maintenance work zones carry real, elevated danger for both drivers and the workers present — reduced lanes, shifted traffic patterns, and workers close to moving vehicles all raise the risk of a serious crash. Slow down to the posted work zone speed, increase your following distance, merge early when a lane closure is signed ahead, and stay alert for sudden stops or workers and equipment entering the roadway. Texas law provides for enhanced penalties — meaning higher fines than the same violation elsewhere — for offenses like speeding or reckless driving committed within a marked construction or maintenance work zone, particularly when workers are present. A crash that injures or kills a worker in a work zone can carry serious criminal consequences on top of any civil liability.",
  },

  // Topic 8 — Managing Risk (incl. human trafficking awareness) (40 min)
  {
    topicNumber: 8,
    body: "Most serious crashes trace back to a chain of small, avoidable decisions rather than one single cause. Poor decision-making and risk-taking — speeding, following too closely, ignoring signals — compound each other and sharply raise the odds of a collision. Reduced-risk driving means actively managing these factors rather than reacting only after something goes wrong.",
  },
  {
    topicNumber: 8,
    body: "Impairment isn't limited to alcohol and drugs — mental, emotional, and physical fatigue or illness measurably reduce driving performance too. Common distractions include navigation and music systems, vehicle controls, mobile phones, passengers, and pets; text messaging, eating or drinking, personal grooming, multitasking, working, or reading while driving are all specific behaviors that meaningfully increase crash risk by taking attention off the road.",
  },
  {
    topicNumber: 8,
    body: "Speed reduces the time you have to react and increases the distance needed to stop — both go up sharply, not just proportionally, as speed increases. Street racing carries its own serious legal consequences under Texas law, on top of the obvious safety risk. Failing to wear a safety belt significantly increases injury severity in a crash, and driving at night carries added risk from reduced visibility and more tired or impaired drivers on the road.",
  },
  {
    topicNumber: 8,
    body: "Driver education programs are also positioned to help drivers recognize signs of human trafficking, since trafficking situations sometimes intersect with transportation. Activities commonly associated with trafficking can include a person who appears coached on what to say or has someone else answer for them, shows signs of fear or avoids eye contact, lacks control of their own identification or money, or appears to be closely monitored by another person. If you suspect trafficking, don't confront the situation directly — contact the National Human Trafficking Hotline (1-888-373-7888) or local law enforcement to report it.",
  },

  // Topic 9 — Classroom Progress Assessment (25 min)
  {
    topicNumber: 9,
    body: "You've now covered all 9 required topics. This final assessment is modeled on the Texas Department of Public Safety's Highway Sign and Traffic Law Examination, and covers material from across the course — right-of-way, traffic control devices, controlling traffic flow, alcohol and drug law, sharing the road, and managing risk.",
  },
  {
    topicNumber: 9,
    body: "A score of 70% or higher is required to pass. Take your time, read each question fully before answering, and rely on what you've worked through in the previous topics. If you don't pass on your first attempt, you can retake the assessment with a freshly shuffled set of questions.",
  },
];

async function main() {
  for (const topic of TOPICS) {
    await prisma.topic.upsert({
      where: { number: topic.number },
      update: {
        title: topic.title,
        minMinutes: topic.minMinutes,
        sortOrder: topic.number,
      },
      create: {
        number: topic.number,
        title: topic.title,
        minMinutes: topic.minMinutes,
        sortOrder: topic.number,
      },
    });
  }
  console.log(`Seeded ${TOPICS.length} topics.`);

  // Only seed questions if the bank is empty, so re-running seed doesn't
  // pile up duplicates.
  const existingQuestionCount = await prisma.question.count();
  if (existingQuestionCount === 0) {
    await prisma.question.createMany({
      data: QUESTIONS.map((q, i) => ({
        questionText: q.questionText,
        choices: q.choices,
        correctIndex: q.correctIndex,
        topicNumber: q.topicNumber,
        sortOrder: i,
      })),
    });
    console.log(
      `Seeded ${QUESTIONS.length} DRAFT questions — needs compliance review before real use.`
    );
  } else {
    console.log(`Question bank already has ${existingQuestionCount} questions — skipped.`);
  }

  // Only seed lesson content if none exists yet, so re-running seed
  // doesn't duplicate content an admin has already customized.
  const existingContentCount = await prisma.topicContent.count();
  if (existingContentCount === 0) {
    for (const [i, item] of LESSON_CONTENT.entries()) {
      const topic = await prisma.topic.findUnique({ where: { number: item.topicNumber } });
      if (!topic) continue;
      await prisma.topicContent.create({
        data: {
          topicId: topic.id,
          contentType: "text",
          body: item.body,
          sortOrder: i,
        },
      });
    }
    console.log(
      `Seeded ${LESSON_CONTENT.length} DRAFT lesson content blocks — needs compliance review against the real POI and Texas Driver Handbook before real use.`
    );
  } else {
    console.log(`Lesson content already has ${existingContentCount} blocks — skipped.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
