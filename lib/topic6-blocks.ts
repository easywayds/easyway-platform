// Structured curriculum data for Topic 6's interactive blocks — Alcohol
// and Other Drugs, built on the Easy Way Interactive Lesson Standard used
// for Topics 3-5. Legal content lives here, separate from the reusable UI
// components in components/course/*.
//
// Every numerical legal claim below (intoxication definition, DWI/DUI
// penalty tiers, open container, ALR suspension periods) was verified
// against the current Texas Penal Code, Alcoholic Beverage Code,
// Transportation Code, and the official TxDPS ALR page before writing —
// see the Topic 6 audit report for exact sources and section numbers.
// Nothing here was generated from memory.
//
// POI note: every block is tagged with the topic-level POI code "4.1.6"
// rather than invented letter subsections, matching the pattern already
// used elsewhere in this project. Metadata only, never shown to students.

import type { DecisionChallengeProps } from "@/components/course/DecisionChallenge";
import type { CompareScenesProps } from "@/components/course/CompareScenes";
import type { DecisionSequenceProps } from "@/components/course/DecisionSequence";
import type { HotspotSceneProps } from "@/components/course/HotspotScene";
import type { StagedScenarioProps } from "@/components/course/StagedScenario";
import type { RecapAccordionProps } from "@/components/course/RecapAccordion";
import type { LessonScreenProps } from "@/components/course/LessonScreen";
import {
  SCENE_LEAVING_EVENT,
  SCENE_NORMAL_SCAN,
  SCENE_IMPAIRED_SCAN,
  SCENE_CONFIDENT_DRIVER,
  SCENE_LABEL_DROWSY,
  SCENE_LABEL_MACHINERY,
  SCENE_LABEL_DIZZY,
  SCENE_VEHICLE_INTERIOR,
  SCENE_ALR_FLOW,
  SCENE_MISTAKE_CARDS,
  SCENE_FRIEND_KEYS,
  SCENE_SAFE_PLAN,
} from "./topic6-scenes";

const POI = "4.1.6";

export const TOPIC6_CHAPTERS: { title: string; blockIds: string[] }[] = [
  { title: "How Impairment Changes Driving", blockIds: ["T6-L00", "T6-B00", "T6-L01", "T6-B01", "T6-B02"] },
  { title: "BAC & Texas Intoxication Law", blockIds: ["T6-L02", "T6-B03", "T6-B04"] },
  { title: "Alcohol Isn't the Only Risk", blockIds: ["T6-L03", "T6-B05", "T6-B06", "T6-B07"] },
  { title: "Texas Law & Consequences", blockIds: ["T6-L04", "T6-B08", "T6-L05", "T6-B09", "T6-L06", "T6-B10"] },
  { title: "Open Container, Implied Consent & ALR", blockIds: ["T6-L07", "T6-B11", "T6-B12", "T6-B13", "T6-B14"] },
  {
    title: "The Decision Before Driving",
    blockIds: ["T6-L08", "T6-B15", "T6-B16", "T6-B17", "T6-B18", "T6-B19", "T6-B20", "T6-B21", "T6-B22", "T6-B23"],
  },
];

export const TOPIC6_PRACTICE_BLOCK_IDS = ["T6-B04", "T6-B06", "T6-B09", "T6-B12", "T6-B15", "T6-B22"];

export type Topic6Block =
  | { id: string; kind: "decision"; poi: string[]; estimatedMinutes: number; props: DecisionChallengeProps }
  | { id: string; kind: "compare"; poi: string[]; estimatedMinutes: number; props: CompareScenesProps }
  | { id: string; kind: "sequence"; poi: string[]; estimatedMinutes: number; props: DecisionSequenceProps }
  | { id: string; kind: "hotspot"; poi: string[]; estimatedMinutes: number; props: HotspotSceneProps }
  | { id: string; kind: "staged"; poi: string[]; estimatedMinutes: number; props: StagedScenarioProps }
  | { id: string; kind: "recap"; poi: string[]; estimatedMinutes: number; props: RecapAccordionProps }
  | { id: string; kind: "learn"; poi: string[]; estimatedMinutes: number; props: LessonScreenProps };

export const TOPIC6_BLOCKS: Topic6Block[] = [
  // ============================================================
  // Chapter 1 — How Impairment Changes Driving
  // ============================================================
  {
    id: "T6-L00",
    kind: "learn",
    poi: ["Topic 6 introduction"],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Topic 6 — Alcohol and Other Drugs",
      title: "Driving Is a Decision-Making Task",
      previewPoints: [
        "How alcohol and drugs affect driving",
        "What Texas means by \"intoxicated\"",
        "The difference between DUI rules for minors and DWI",
        "Texas DWI consequences, open-container law, and implied consent / ALR",
        "Why common \"sobering up\" tricks don't work",
        "How to make a safer plan before impairment becomes a driving problem",
      ],
      sections: [
        {
          heading: "Every Safe-Driving Skill Depends on a Working System",
          body: [
            "Every safe driving skill you've built so far depends on your ability to see clearly, process information, judge speed and distance, react, coordinate movement, control emotion, and make responsible decisions. Alcohol and other impairing drugs can interfere with those abilities — often before a driver notices anything has changed.",
          ],
        },
      ],
      ruleCard: {
        title: "EASY WAY PRINCIPLE",
        lines: ["MAKE THE SAFE DRIVING DECISION", "BEFORE IMPAIRMENT MAKES THE DECISION FOR YOU."],
      },
    },
  },
  {
    id: "T6-B00",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Opening Decision",
      visual: SCENE_LEAVING_EVENT,
      prompt:
        "You're leaving a social event where you had a few drinks. Your vehicle is right outside. A friend says, \"You look fine — it's only a short drive.\" What matters most right now?",
      choices: [
        { text: "The trip is only 10 minutes.", correct: false, feedback: "Trip length doesn't change whether you can drive safely and legally." },
        { text: "You feel normal.", correct: false, feedback: "Feeling normal isn't a reliable measure of impairment — that's exactly the problem this topic addresses." },
        { text: "Whether you can drive safely and legally.", correct: true, feedback: "Right. Trip length, how you feel, and how light traffic looks don't answer the one question that actually matters — can you drive safely and legally right now." },
        { text: "Whether traffic looks light.", correct: false, feedback: "Light traffic doesn't reduce the legal or safety risk of driving impaired." },
      ],
    },
  },
  {
    id: "T6-L01",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Chapter 1 — What You'll Learn",
      title: "Driving Requires a Working System",
      previewPoints: [
        "The abilities driving depends on, working together",
        "Why impairment can affect your own judgment about your impairment",
      ],
      sections: [
        {
          heading: "Six Abilities, Working Together",
          body: [
            "Driving requires vision (detecting vehicles, pedestrians, signals, hazards), attention (noticing what matters), judgment (deciding when to stop, whether a gap is safe, how fast to go), reaction (responding when conditions change), coordination (steering, braking, accelerating), and self-control (avoiding aggressive or overconfident decisions).",
            "Alcohol and other impairing substances can interfere with any or all of these — and the danger isn't only what you see. It's also how well you process and respond to what's happening.",
          ],
        },
      ],
    },
  },
  {
    id: "T6-B01",
    kind: "compare",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Impairment Visualizer",
      prompt: "Same intersection, same information available. Compare how it's actually processed.",
      tabs: [
        { label: "Full Attention", visual: SCENE_NORMAL_SCAN, caption: "Signal, pedestrian, and gap are all noticed and responded to in time." },
        { label: "Impaired", visual: SCENE_IMPAIRED_SCAN, caption: "The same pedestrian and signal are there — but recognition and reaction both arrive late. Impairment doesn't affect every person identically, but slower recognition, missed peripheral information, and delayed decisions are common effects." },
      ],
    },
  },
  {
    id: "T6-B02",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Judgment Can Change First",
      visual: SCENE_CONFIDENT_DRIVER,
      prompt:
        "This driver thinks, \"I'm okay.\" But you can see delayed reaction, poor lane position, and following too closely. Which opinion should control the decision to drive?",
      choices: [
        { text: "How confident the driver feels.", correct: false, feedback: "One of the dangerous features of impairment is that a person may become less capable of accurately evaluating their own condition — confidence isn't a safety test." },
        { text: "Whether the driver can actually, safely and legally, operate the vehicle.", correct: true, feedback: "Right. What a driver can actually do — not how capable they feel — is what determines whether driving is safe and legal." },
      ],
    },
  },

  // ============================================================
  // Chapter 2 — BAC & Texas Intoxication Law
  // ============================================================
  {
    id: "T6-L02",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 3.5,
    props: {
      eyebrow: "Chapter 2 — What You'll Learn",
      title: "BAC and Texas's Definition of Intoxication",
      previewPoints: [
        "What BAC represents, without turning it into a personal calculator",
        "Texas's two-part legal definition of intoxication",
        "Why 0.08 is not a driving goal",
        "Why alcohol affects different people differently",
      ],
      sections: [
        {
          heading: "BAC — Blood Alcohol Concentration",
          body: [
            "BAC is a measurement of how much alcohol is in a person's bloodstream. This topic won't teach you how to estimate your own BAC from a number of drinks — that turns into exactly the wrong instructional goal, treating impairment as something you can calculate your way around.",
          ],
        },
        {
          heading: "Texas's Definition of Intoxication",
          body: [
            "Under Texas law, a person is intoxicated if they don't have the normal use of mental or physical faculties by reason of alcohol, drugs, a controlled substance, a dangerous drug, or a combination of these — or if their alcohol concentration is 0.08 or more (Penal Code §49.01). Either one is enough on its own.",
            "That means a driver can be legally intoxicated below 0.08 if alcohol or drugs have visibly impaired their normal faculties — 0.08 is a threshold in the law, not a line that makes everything below it automatically safe.",
          ],
        },
        {
          heading: "0.08 Is Not a Driving Goal",
          body: [
            "A person doesn't need to \"aim below 0.08\" and treat that as a safe-driving plan. If alcohol or another impairing substance may affect your ability to drive, the safe plan is simply: don't drive — not estimating where a number might land.",
          ],
        },
        {
          heading: "Effects Vary From Person to Person",
          body: [
            "How alcohol affects someone can depend on the amount consumed, time, individual body characteristics, food, medications, health, and other substances. That variation is exactly why self-estimation is unreliable — there's no formula that reliably tells you what's \"safe\" for you personally.",
          ],
        },
      ],
      commonMistakes: [
        "Treating 0.08 as a target to stay under rather than a legal threshold.",
        "Assuming a formula based on weight, drinks, and time can tell you it's safe to drive.",
      ],
    },
  },
  {
    id: "T6-B03",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "BAC Misconception",
      prompt: "\"I'm under .08, so I'm automatically safe to drive.\" Is that statement accurate?",
      choices: [
        { text: "Yes — Texas law only cares about the 0.08 threshold.", correct: false, feedback: "Texas intoxication law has a second path: loss of normal use of mental or physical faculties. A driver can be intoxicated below 0.08 if alcohol or drugs have visibly impaired them." },
        { text: "No — you can be legally intoxicated below 0.08 if your normal faculties are impaired.", correct: true, feedback: "Right. Texas defines intoxication as loss of normal faculties, or a 0.08+ alcohol concentration — either one is enough." },
      ],
    },
  },
  {
    id: "T6-B04",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 3,
    props: {
      ruleCardTitle: "MYTH LAB — WHAT ACTUALLY SOBERS YOU UP",
      ruleCardLines: [
        "Nothing on this list removes alcohol from your body faster.",
        "Feeling more awake is not the same as being less impaired.",
        "Only time actually reduces BAC.",
      ],
      rounds: [
        {
          eyebrow: "Myth Lab — Coffee",
          prompt: "Will black coffee sober you up?",
          choices: [
            { text: "Yes, it sobers you up.", correct: false, feedback: "The current Texas Driver Handbook specifically warns that coffee doesn't make a person sober — it can make you feel more awake without actually reducing impairment." },
            { text: "No, it doesn't sober you up.", correct: true, feedback: "Right. Coffee doesn't remove alcohol from your body — it just adds caffeine on top of impairment." },
          ],
        },
        {
          eyebrow: "Myth Lab — Cold Shower",
          prompt: "Will a cold shower sober you up?",
          choices: [
            { text: "Yes, it sobers you up.", correct: false, feedback: "A cold shower can feel jarring, but it doesn't lower your BAC or restore impaired judgment." },
            { text: "No, it doesn't sober you up.", correct: true, feedback: "Right. Like coffee, a cold shower changes how alert you feel — not how impaired you actually are." },
          ],
        },
        {
          eyebrow: "Myth Lab — Exercise",
          prompt: "Will exercising sober you up?",
          choices: [
            { text: "Yes, it sobers you up.", correct: false, feedback: "Exercise doesn't speed up how your body processes alcohol — it can even make some effects worse." },
            { text: "No, it doesn't sober you up.", correct: true, feedback: "Right. The Handbook specifically warns that exercise doesn't make a person sober." },
          ],
        },
        {
          eyebrow: "Myth Lab — Energy Drink",
          prompt: "Will an energy drink sober you up?",
          choices: [
            { text: "Yes, it sobers you up.", correct: false, feedback: "An energy drink can mask feeling tired while your judgment and coordination are still impaired — a genuinely risky combination." },
            { text: "No, it doesn't sober you up.", correct: true, feedback: "Right. Feeling wired isn't the same as being unimpaired." },
          ],
        },
        {
          eyebrow: "Myth Lab — Time",
          prompt: "Does simply waiting sober you up?",
          choices: [
            { text: "Yes — time is the one thing that actually reduces BAC.", correct: true, feedback: "Right. Unlike coffee, cold showers, or exercise, time is what actually allows your body to process alcohol — though this topic isn't going to give you a countdown clock to plan around." },
            { text: "No — nothing actually helps.", correct: false, feedback: "Time is different from the other options — it's the one thing that genuinely reduces BAC, even though there's no simple, reliable countdown to rely on." },
          ],
        },
      ],
    },
  },

  // ============================================================
  // Chapter 3 — Alcohol Isn't the Only Risk
  // ============================================================
  {
    id: "T6-L03",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Chapter 3 — What You'll Learn",
      title: "Impairment Isn't Only Alcohol",
      previewPoints: [
        "Why a legal prescription doesn't automatically mean safe to drive",
        "How to read a medication warning label",
        "Why mixing substances multiplies risk instead of just adding to it",
      ],
      sections: [
        {
          heading: "A Driver Doesn't Have to Be Drinking to Be Impaired",
          body: [
            "Some prescription medications may impair driving. Some over-the-counter medications can cause drowsiness, dizziness, or slower reactions. Illegal or controlled substances may impair judgment, perception, coordination, or reaction. And combining substances — including mixing any of these with alcohol — can create risk beyond what either substance would cause on its own.",
          ],
        },
      ],
      commonMistakes: [
        "Assuming a medication is safe to drive on just because it's legal or prescribed.",
      ],
    },
  },
  {
    id: "T6-B05",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Legal Doesn't Mean Safe to Drive",
      prompt: "A driver has a legally prescribed medication. Its label warns: \"May cause drowsiness. Use caution when operating a vehicle.\" The medication is legal — does that automatically mean driving is safe?",
      choices: [
        { text: "Yes — a legal prescription means it's fine to drive.", correct: false, feedback: "Legality and driving safety are two different questions. The relevant question is whether the substance affects this person's ability to drive safely right now." },
        { text: "No — legal doesn't automatically mean safe to drive.", correct: true, feedback: "Right. Whether a substance is legal and whether it currently affects your ability to drive safely are separate questions." },
      ],
    },
  },
  {
    id: "T6-B06",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      rounds: [
        {
          eyebrow: "Medication Label Challenge",
          visual: SCENE_LABEL_DROWSY,
          prompt: "This label reads \"May cause drowsiness.\" What should the driver do before driving?",
          choices: [
            { text: "Understand how it affects them before getting behind the wheel — and avoid driving if impaired.", correct: true, feedback: "Right. Read the warning, understand how the medication actually affects you, and don't drive if it impairs you." },
            { text: "Ignore it — drowsiness warnings are just standard legal disclaimers.", correct: false, feedback: "A drowsiness warning is a real driving-safety signal, not boilerplate to ignore." },
          ],
        },
        {
          eyebrow: "Medication Label Challenge",
          visual: SCENE_LABEL_MACHINERY,
          prompt: "This label reads \"Do not operate machinery until you know how this medication affects you.\" What does that mean for driving?",
          choices: [
            { text: "A vehicle counts as machinery — don't drive until you know how it affects you.", correct: true, feedback: "Right. A vehicle is exactly the kind of machinery this warning is about." },
            { text: "It only applies to industrial equipment, not cars.", correct: false, feedback: "This warning is about your ability to safely operate any machinery — a vehicle included." },
          ],
        },
        {
          eyebrow: "Medication Label Challenge",
          visual: SCENE_LABEL_DIZZY,
          prompt: "This label reads \"May cause dizziness.\" What's the appropriate response?",
          choices: [
            { text: "Read the warning, follow the directions, and avoid driving if it's actually affecting you.", correct: true, feedback: "Right. The same principle applies across every warning label — understand the risk, then make the driving decision based on how it actually affects you." },
            { text: "Take it right before driving to \"get it over with.\"", correct: false, feedback: "Timing a medication around a drive you already know may be affected by it isn't a safe-driving decision." },
          ],
        },
      ],
    },
  },
  {
    id: "T6-B07",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Mixing Substances",
      prompt: "A driver combines alcohol with an impairing medication, assuming the effects just add up like normal. Is that a safe assumption?",
      choices: [
        { text: "No — combining substances can make effects greater and less predictable, not just additive.", correct: true, feedback: "Right. Mixing alcohol with an impairing substance can increase impairment and make the effects less predictable than either substance alone." },
        { text: "Yes — two mild effects just add up to one moderate effect.", correct: false, feedback: "Combining impairing substances doesn't behave like simple addition — the risk can be greater and harder to predict than either substance by itself." },
      ],
    },
  },

  // ============================================================
  // Chapter 4 — Texas Law & Consequences
  // ============================================================
  {
    id: "T6-L04",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 3,
    props: {
      eyebrow: "Chapter 4 — What You'll Learn",
      title: "DUI vs. DWI: Don't Confuse Them",
      previewPoints: [
        "Why \"DUI\" and \"DWI\" aren't just younger and older versions of the same rule",
        "Texas's zero-tolerance rule for drivers under 21",
      ],
      sections: [
        {
          heading: "Two Different Rules, Not One Rule at Two Ages",
          body: [
            "Texas has a specific rule for drivers under 21: driving with any detectable amount of alcohol in your system is its own offense (Alcoholic Beverage Code §106.041) — the driver doesn't need to meet the adult intoxication standard at all.",
            "DWI (Driving While Intoxicated) is the separate, generally applicable offense: operating a motor vehicle in a public place while intoxicated under the definition you just learned (Penal Code §49.04) — it applies regardless of age.",
          ],
        },
        {
          heading: "Zero Tolerance for Minors",
          body: [
            "Under 21, plus any detectable alcohol, plus driving, is enough to trigger consequences — even far below a 0.08 BAC. 0.08 is not a threshold a minor may drive up to; for a minor, any detectable amount is already the line.",
          ],
        },
      ],
      commonMistakes: [
        "Treating DUI as just \"DWI for a minor\" — they're separate offenses with separate legal standards.",
        "Assuming a minor is fine to drive as long as they're under 0.08.",
      ],
    },
  },
  {
    id: "T6-B08",
    kind: "compare",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "DUI vs. DWI",
      prompt: "Compare the two rules directly.",
      tabs: [
        { label: "Under 21 — Zero Tolerance", caption: "Any detectable amount of alcohol while driving is its own offense — the adult intoxication standard doesn't apply. First offense is a Class C misdemeanor (Alcoholic Beverage Code §106.041)." },
        { label: "DWI — Any Age", caption: "Operating a motor vehicle in a public place while intoxicated (loss of normal faculties, or 0.08+) is DWI, regardless of age (Penal Code §49.04)." },
      ],
    },
  },
  {
    id: "T6-L05",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 3.5,
    props: {
      eyebrow: "Chapter 4 — Adult DWI Law",
      title: "DWI Consequences",
      previewPoints: [
        "How the consequences escalate with repeat offenses",
        "What changes when intoxicated driving causes injury or death",
      ],
      sections: [
        {
          heading: "Consequences Escalate",
          body: [
            "A first DWI is a Class B misdemeanor with a minimum of 72 hours confinement (up to 180 days) and a fine up to $2,000. A second DWI is a Class A misdemeanor with a minimum of 30 days confinement (up to a year) and a fine up to $4,000. A third or later DWI is a third-degree felony — 2 to 10 years, fine up to $10,000. A conviction also comes with a license suspension set by the court.",
          ],
        },
        {
          heading: "When a Child Is in the Vehicle",
          body: [
            "DWI with a passenger younger than 15 is its own offense — a state jail felony, 180 days to 2 years, fine up to $10,000 (Penal Code §49.045) — regardless of whether this would otherwise be a first offense.",
          ],
        },
        {
          heading: "When Someone Is Hurt or Killed",
          body: [
            "If intoxicated driving causes serious bodily injury to another person, the offense becomes Intoxication Assault — a third-degree felony, 2 to 10 years, fine up to $10,000. If it causes death, it becomes Intoxication Manslaughter — a second-degree felony, 2 to 20 years, fine up to $10,000. Distance doesn't reduce this risk: \"I only have a few miles to drive\" doesn't make a life-changing collision less possible.",
          ],
        },
        {
          heading: "Consequences Beyond the Courtroom",
          body: [
            "Beyond the listed criminal penalty, impaired driving can carry legal, financial, driver-license, personal, and other-road-user consequences that extend well past the courtroom. The exact financial or personal impact varies by situation — the criminal penalty is only part of the real cost.",
          ],
        },
      ],
    },
  },
  {
    id: "T6-B09",
    kind: "compare",
    poi: [POI],
    estimatedMinutes: 3.5,
    props: {
      eyebrow: "Penalty Explorer",
      prompt: "Tap through each tier to see how DWI consequences escalate.",
      tabs: [
        { label: "First DWI", caption: "Class B misdemeanor. Minimum 72 hours confinement, up to 180 days. Fine up to $2,000." },
        { label: "Second DWI", caption: "Class A misdemeanor. Minimum 30 days confinement, up to 1 year. Fine up to $4,000." },
        { label: "Third+ DWI", caption: "Third-degree felony. 2 to 10 years confinement. Fine up to $10,000." },
        { label: "Child Passenger", caption: "State jail felony when a passenger is younger than 15 — regardless of prior offenses. 180 days to 2 years. Fine up to $10,000." },
        { label: "Intoxication Assault", caption: "Third-degree felony when intoxicated driving causes serious bodily injury to another. 2 to 10 years. Fine up to $10,000." },
        { label: "Intoxication Manslaughter", caption: "Second-degree felony when intoxicated driving causes death. 2 to 20 years. Fine up to $10,000." },
      ],
      ruleCard: {
        title: "OPEN CONTAINER RAISES THE FLOOR",
        lines: ["An open container present during a first DWI raises the mandatory minimum confinement from 72 hours to 6 days."],
      },
    },
  },
  {
    id: "T6-L06",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Chapter 4 — Two More Required Areas",
      title: "Public Intoxication & Driver-License Misuse",
      previewPoints: [
        "What public intoxication covers, separate from driving",
        "Why misusing a driver license is its own offense",
      ],
      sections: [
        {
          heading: "Public Intoxication",
          body: [
            "Appearing in a public place intoxicated to a degree that you may endanger yourself or someone else is its own offense in Texas — a Class C misdemeanor, fine up to $500 — and it doesn't require a vehicle to be involved at all (Penal Code §49.02).",
          ],
        },
        {
          heading: "Driver-License Misuse",
          body: [
            "Using a driver license fraudulently — including an altered license, someone else's license, or a fake ID to misrepresent age — is a separate legal violation from any alcohol offense, and can add its own consequences on top of whatever else occurred.",
          ],
        },
      ],
    },
  },
  {
    id: "T6-B10",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Public Intoxication Check",
      prompt: "A person is visibly intoxicated in public, endangering themselves — but they aren't driving and don't have a vehicle nearby. Can this still be a legal issue in Texas?",
      choices: [
        { text: "Yes — public intoxication is its own offense, separate from driving.", correct: true, feedback: "Right. Public intoxication applies to appearing in public intoxicated to a degree that endangers yourself or someone else — no vehicle required." },
        { text: "No — Texas alcohol law only applies to driving.", correct: false, feedback: "Public intoxication is a real, separate offense in Texas, regardless of whether a vehicle is involved." },
      ],
    },
  },

  // ============================================================
  // Chapter 5 — Open Container, Implied Consent & ALR
  // ============================================================
  {
    id: "T6-L07",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 3.5,
    props: {
      eyebrow: "Chapter 5 — What You'll Learn",
      title: "Open Container, Implied Consent & ALR",
      previewPoints: [
        "What counts as the \"passenger area\" for open-container purposes",
        "Why refusing a test doesn't mean nothing happens",
        "How the administrative process is separate from the criminal case",
      ],
      visual: SCENE_ALR_FLOW,
      sections: [
        {
          heading: "Open Container Law",
          body: [
            "Texas prohibits knowingly possessing an open container of alcohol in the passenger area of a vehicle on a public highway — whether the vehicle is operating, stopped, or parked, and even if the driver isn't the one drinking (Penal Code §49.031). It's a Class C misdemeanor, fine up to $500.",
            "\"Passenger area\" doesn't include a locked glove compartment, the trunk, or (in a vehicle without a trunk) the area behind the last upright seat.",
          ],
        },
        {
          heading: "Open Container Enhancement",
          body: [
            "When an open container is present during a first DWI, it raises the mandatory minimum confinement from 72 hours to 6 days (§49.04(c)) — a real, specific effect, not a blanket rule that every open container automatically increases every DWI penalty.",
          ],
        },
        {
          heading: "Implied Consent",
          body: [
            "By driving in Texas, a driver has already agreed to a breath or blood specimen if lawfully arrested for suspected intoxication under qualifying circumstances. Refusing a test doesn't mean nothing happens — it triggers its own administrative license consequence, separate from whatever happens with the criminal case.",
          ],
        },
        {
          heading: "ALR — Administrative License Revocation",
          body: [
            "ALR is an administrative process, related to but distinct from criminal DWI prosecution. It can suspend a license based on a qualifying test result or refusal, running on its own timeline alongside — not instead of — whatever happens in court.",
          ],
        },
      ],
    },
  },
  {
    id: "T6-B11",
    kind: "hotspot",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Open-Container Hotspot",
      prompt: "Tap the one location where an open container would NOT create a legal issue.",
      visual: SCENE_VEHICLE_INTERIOR,
      mode: "pick-one",
      wrongPickFeedback: "That's part of the passenger area — an open container there is a legal issue. Look for the location Texas law excludes from \"passenger area.\"",
      hotspots: [
        { id: "cup", label: "Cup holder", x: 30, y: 43, explanation: "The cup holder is part of the passenger area — an open container here is a legal issue." },
        { id: "glove", label: "Locked glove box", x: 69, y: 33, explanation: "A locked glove compartment is specifically excluded from \"passenger area\" under Texas law — not a legal issue here.", isTarget: true },
        { id: "floor", label: "Passenger floor", x: 25, y: 80, explanation: "The passenger floor is part of the passenger area — an open container here is a legal issue." },
        { id: "trunk", label: "Trunk", x: 74, y: 82, explanation: "The trunk is excluded from \"passenger area\" too — but the glove compartment is the one to tap here." },
      ],
    },
  },
  {
    id: "T6-B12",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Open Container Enhancement",
      prompt: "An open container is present in the vehicle during a first DWI arrest. What actually happens to the mandatory minimum confinement?",
      choices: [
        { text: "It raises the mandatory minimum from 72 hours to 6 days.", correct: true, feedback: "Right — a specific, verified effect under §49.04(c), not a vague \"it gets worse.\"" },
        { text: "Nothing changes — open container is a completely separate charge with no effect on the DWI.", correct: false, feedback: "An open container present during a DWI has a specific enhancement effect on the DWI's own mandatory minimum confinement." },
      ],
    },
  },
  {
    id: "T6-B13",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Implied Consent",
      prompt: "A driver refuses a requested breath test after a lawful arrest for suspected intoxication. Does refusing mean nothing happens?",
      choices: [
        { text: "Correct — refusal avoids consequences entirely.", correct: false, feedback: "Refusal doesn't avoid consequences — it triggers its own administrative license consequence." },
        { text: "No — refusal triggers its own administrative license consequence.", correct: true, feedback: "Right. Implied consent means refusing doesn't mean nothing happens — it has its own separate administrative outcome." },
      ],
    },
  },
  {
    id: "T6-B14",
    kind: "compare",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Refuse vs. Fail — ALR Suspension Periods",
      prompt: "The administrative consequence depends on whether a driver refused or failed the test — and on age.",
      tabs: [
        { label: "Adult — Test Failure", caption: "First: 90-day suspension. Second or subsequent (within the applicable look-back period): 1-year suspension." },
        { label: "Adult — Refusal", caption: "First: 180-day suspension. Second or subsequent: 2-year suspension." },
        { label: "Minor — Any Detectable Alcohol", caption: "First: 60-day suspension. Subsequent: 120 to 180 days, depending on prior history." },
        { label: "Minor — Refusal", caption: "Same as adult refusal: 180 days first, 2 years for a second or subsequent refusal." },
      ],
    },
  },

  // ============================================================
  // Chapter 6 — The Decision Before Driving
  // ============================================================
  {
    id: "T6-L08",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Chapter 6 — What You'll Learn",
      title: "The Decision Before Driving",
      previewPoints: [
        "Why self-perception isn't a substitute for a real plan",
        "How to build a safe plan before you ever need one",
      ],
      sections: [
        {
          heading: "The Decision Point Comes Before the Vehicle Moves",
          body: [
            "Every scenario in this chapter comes back to the same idea: there's a decision point before the vehicle ever starts moving. The safest impaired-driving decision is the one made before drinking begins, not the one made in the driveway afterward.",
          ],
        },
      ],
    },
  },
  {
    id: "T6-B15",
    kind: "hotspot",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Impairment Mistake Spotter",
      prompt: "Four statements. Which one reflects a sound decision?",
      visual: SCENE_MISTAKE_CARDS,
      mode: "pick-one",
      wrongPickFeedback: "That statement reflects one of the common myths this topic covers — look for the one that describes planning ahead.",
      hotspots: [
        { id: "coffee", label: "\"Coffee will sober me up.\"", x: 26, y: 25, explanation: "This is a myth — coffee makes you feel more awake without actually reducing impairment." },
        { id: "rx", label: "\"Prescription means safe to drive.\"", x: 74, y: 25, explanation: "This is a myth — legal and prescribed doesn't automatically mean safe to drive; it depends on how the medication actually affects you." },
        { id: "under08", label: "\"I'm under .08, so I'm automatically safe.\"", x: 26, y: 67, explanation: "This is a myth — Texas intoxication also includes loss of normal faculties, which can happen below 0.08." },
        {
          id: "sober-ride",
          label: "\"I should arrange a sober ride before I need one.\"",
          x: 74,
          y: 67,
          explanation: "This is the sound decision — planning transportation before drinking starts is exactly the kind of decision that prevents the problem in the first place.",
          isTarget: true,
        },
      ],
    },
  },
  {
    id: "T6-B16",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "\"I Feel Fine\" Challenge",
      prompt: "A person who's been drinking says, \"I don't feel drunk.\" Is that enough information to decide to drive?",
      choices: [
        { text: "No — self-perception isn't a reliable substitute for a safe plan.", correct: true, feedback: "Right. How someone feels isn't a reliable measure of their actual ability to drive safely and legally." },
        { text: "Yes — if you don't feel impaired, you're probably fine.", correct: false, feedback: "Feeling fine isn't a reliable test — impairment can affect a person's ability to judge their own condition." },
      ],
    },
  },
  {
    id: "T6-B17",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Short-Drive Myth",
      prompt: "Home is 1.8 miles away. Does a short trip make impaired driving safe?",
      choices: [
        { text: "No — collision risk exists from the moment the vehicle starts moving.", correct: true, feedback: "Right. Distance doesn't reduce the legal or safety risk — it exists as soon as the vehicle is in motion." },
        { text: "Yes — a short, familiar drive is low risk.", correct: false, feedback: "Trip length doesn't change whether a driver is impaired, legally or in terms of actual crash risk." },
      ],
    },
  },
  {
    id: "T6-B18",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Build the Safe Plan",
      visual: SCENE_SAFE_PLAN,
      prompt: "Before you start drinking, which decision actually builds a safe plan?",
      choices: [
        { text: "Arrange a designated sober driver or another safe ride ahead of time.", correct: true, feedback: "Right. A safe plan made before drinking starts is what actually prevents the problem — a designated driver, an arranged ride, staying where it's safe to stay, or not drinking if you'll need to drive are all real options." },
        { text: "Decide you'll figure out a ride later if you end up needing one.", correct: false, feedback: "\"Figuring it out later\" is exactly the plan that fails — the decision needs to happen before impairment is part of the equation." },
      ],
    },
  },
  {
    id: "T6-B19",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Friend Decision",
      visual: SCENE_FRIEND_KEYS,
      prompt: "Your friend has been drinking and reaches for their keys. What's the constructive response?",
      choices: [
        { text: "\"They know themselves\" — let them decide.", correct: false, feedback: "Self-perception isn't reliable for the person driving, and it isn't a reason to stay uninvolved as their friend." },
        { text: "\"It's only a short trip\" — let it go.", correct: false, feedback: "Trip length doesn't make the drive safer — this isn't a reason to step back." },
        { text: "Help arrange a safe alternative.", correct: true, feedback: "Right. Helping arrange a safe ride is constructive intervention — no confrontation needed, just a better option offered." },
        { text: "Follow them in your own car in case something happens.", correct: false, feedback: "Following doesn't prevent the impaired driving itself — it doesn't remove the risk to your friend or anyone else on the road." },
      ],
    },
  },
  {
    id: "T6-B20",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "The Next Morning",
      prompt: "Someone drank heavily late at night and wakes up early for work. Does waking up mean the alcohol is automatically gone from their system?",
      choices: [
        { text: "No — time matters, and a subjective feeling of being fine isn't reliable either.", correct: true, feedback: "Right. Sleep doesn't guarantee sobriety — how much time has actually passed matters, and feeling awake isn't the same as being unimpaired." },
        { text: "Yes — a night's sleep clears it out.", correct: false, feedback: "Sleep alone doesn't guarantee the alcohol is gone — it depends on how much time has actually passed, not just whether you slept." },
      ],
    },
  },
  {
    id: "T6-B21",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      rounds: [
        {
          eyebrow: "Lower-Risk or High-Risk? — Transportation",
          prompt: "\"Arrange transportation before drinking\" vs. \"Drive because you feel okay\" — which is the lower-risk decision?",
          choices: [
            { text: "Arrange transportation before drinking.", correct: true, feedback: "Right — a plan made in advance, before impairment is part of the picture, is the lower-risk decision." },
            { text: "Drive because you feel okay.", correct: false, feedback: "Feeling okay isn't a reliable safety test — this is the higher-risk decision." },
          ],
        },
        {
          eyebrow: "Lower-Risk or High-Risk? — Medication",
          prompt: "\"Read medication warnings\" vs. \"Mix alcohol and medication without considering impairment\" — which is lower-risk?",
          choices: [
            { text: "Read medication warnings.", correct: true, feedback: "Right — understanding how a substance affects you before driving is the lower-risk decision." },
            { text: "Mix alcohol and medication without considering impairment.", correct: false, feedback: "Combining substances without considering the effect is exactly the higher-risk decision." },
          ],
        },
        {
          eyebrow: "Lower-Risk or High-Risk? — After Drinking",
          prompt: "\"Let a sober driver drive\" vs. \"Try coffee before driving\" — which is lower-risk?",
          choices: [
            { text: "Let a sober driver drive.", correct: true, feedback: "Right — an actually-unimpaired driver is the lower-risk choice." },
            { text: "Try coffee before driving.", correct: false, feedback: "Coffee doesn't reduce impairment — relying on it before driving is the higher-risk decision." },
          ],
        },
      ],
    },
  },
  {
    id: "T6-B22",
    kind: "staged",
    poi: [POI],
    estimatedMinutes: 3.5,
    props: {
      eyebrow: "Real-World Decision Lab",
      completionTitle: "THE DECISION BEFORE DRIVING",
      completionLines: [
        "The safest impaired-driving decision happens before the vehicle moves.",
        "Self-perception, trip length, and legal medication are not safety tests.",
        "Plan transportation before drinking — not after.",
      ],
      stages: [
        {
          kind: "decision",
          label: "Round 1 — Social Event",
          prompt: "You've had a few drinks at a social event and need to get home. What's your best choice?",
          choices: [
            { text: "Use the ride you arranged before you started drinking.", correct: true, feedback: "Right — this is exactly why the plan gets made in advance." },
            { text: "Drive carefully and slowly.", correct: false, feedback: "Driving more slowly doesn't remove impairment — it's not a substitute for a real safe-transportation plan." },
          ],
        },
        {
          kind: "decision",
          label: "Round 2 — Medication",
          prompt: "Your medication's warning label says it may cause drowsiness, and you feel fine. Do you drive?",
          choices: [
            { text: "No — the warning label matters more than how you currently feel.", correct: true, feedback: "Right — a warning label is a real signal, and \"feeling fine\" isn't a reliable test of impairment." },
            { text: "Yes — you feel completely normal.", correct: false, feedback: "Feeling normal isn't a reliable measure, especially with a specific drowsiness warning already on the label." },
          ],
        },
        {
          kind: "decision",
          label: "Round 3 — A Friend",
          prompt: "A friend who's been drinking wants to drive home. What do you do?",
          choices: [
            { text: "Help arrange a safe alternative for them.", correct: true, feedback: "Right — constructive intervention, not confrontation, is the safer response for everyone involved." },
            { text: "Assume it's not your responsibility.", correct: false, feedback: "Stepping back doesn't reduce the risk to your friend or to other road users — helping arrange a safe alternative does." },
          ],
        },
      ],
    },
  },
  {
    id: "T6-B23",
    kind: "recap",
    poi: ["All Topic 6 review"],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Topic 6 Recap",
      prompt: "Tap each section for a quick review before the quiz.",
      sections: [
        {
          title: "Impairment",
          points: [
            "Driving depends on vision, attention, judgment, reaction, coordination, and self-control working together.",
            "Impairment can affect a person's ability to judge their own impairment.",
          ],
        },
        {
          title: "Texas Intoxication Law",
          points: [
            "Intoxication means loss of normal mental/physical faculties, or a 0.08+ alcohol concentration — either is enough.",
            "0.08 is a legal threshold, not a safe-driving target.",
          ],
        },
        {
          title: "Under 21",
          points: [
            "Any detectable alcohol while driving under 21 is its own offense — a separate rule from adult DWI, not a younger version of it.",
          ],
        },
        {
          title: "DWI & Consequences",
          points: [
            "Penalties escalate from a Class B misdemeanor (1st) through a third-degree felony (3rd+).",
            "A child passenger, serious injury, or death each trigger their own more serious offense.",
          ],
        },
        {
          title: "Open Container / Implied Consent / ALR",
          points: [
            "Open container applies to the passenger area — not a locked glove box or trunk.",
            "Refusing a test doesn't avoid consequences — it triggers its own administrative license outcome, separate from any criminal case.",
          ],
        },
        {
          title: "Safe Plan",
          points: [
            "The safest decision happens before the vehicle moves — arrange transportation before drinking starts.",
          ],
        },
      ],
    },
  },
];
