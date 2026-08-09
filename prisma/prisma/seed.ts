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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
