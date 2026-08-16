// Structured curriculum data for Topic 4's interactive blocks — Traffic
// Control Devices, built on the same Easy Way Interactive Lesson Standard
// used for Topic 3. Legal content lives here, separate from the reusable
// UI components in components/course/*.
//
// POI note: every block below is tagged with the topic-level POI code
// "4.1.4" rather than an invented letter subsection, since a granular
// (A)-(D) breakdown for Topic 4 hasn't been verified in this project.
// These tags are audit metadata only — never shown to students.

import type { DecisionChallengeProps } from "@/components/course/DecisionChallenge";
import type { CompareScenesProps } from "@/components/course/CompareScenes";
import type { DecisionSequenceProps } from "@/components/course/DecisionSequence";
import type { HotspotSceneProps } from "@/components/course/HotspotScene";
import type { StagedScenarioProps } from "@/components/course/StagedScenario";
import type { RecapAccordionProps } from "@/components/course/RecapAccordion";
import type { LessonScreenProps } from "@/components/course/LessonScreen";
import {
  SCENE_T4_OPENING,
  SCENE_CAT_REGULATE,
  SCENE_CAT_WARN,
  SCENE_CAT_GUIDE,
  SCENE_SHAPE_OCTAGON,
  SCENE_SHAPE_TRIANGLE,
  SCENE_SHAPE_DIAMOND,
  SCENE_SHAPE_PENTAGON,
  SCENE_SHAPE_ROUND,
  SCENE_COLOR_RED,
  SCENE_COLOR_WHITE,
  SCENE_COLOR_YELLOW,
  SCENE_COLOR_ORANGE,
  SCENE_COLOR_GREEN,
  SCENE_COLOR_BLUE,
  SCENE_COLOR_BROWN,
  SCENE_ORANGE_DIAMOND,
  SCENE_YELLOW_DIAMOND_MATCH,
  SCENE_SIGNAL_GREEN_CLEARING,
  SCENE_SIGNAL_YELLOW_APPROACH,
  SCENE_SIGNAL_RED,
  SCENE_FLASH_RED,
  SCENE_FLASH_YELLOW,
  SCENE_SIGNAL_VS_OFFICER,
  SCENE_LINE_BROKEN_YELLOW,
  SCENE_LINE_SOLID_YELLOW,
  SCENE_LINE_DOUBLE_YELLOW,
  SCENE_LANE_APPROACH,
  SCENE_LANE_LEFT_ONLY,
  SCENE_STOPLINE_CROSSWALK,
  SCENE_RAILROAD_DEVICES,
  SCENE_WORKZONE_DEVICES,
  SCENE_FLAGGER_STOP,
  SCENE_HABIT_VS_DEVICE,
  SCENE_T4_MISTAKE_SPOTTER,
  SCENE_SAFE_TC_INTERSECTION,
} from "./topic4-scenes";

const POI = "4.1.4";

export const TOPIC4_CHAPTERS: { title: string; blockIds: string[] }[] = [
  { title: "How the Road Communicates", blockIds: ["T4-L00", "T4-B00", "T4-L01", "T4-B01"] },
  { title: "Sign Shapes & Colors", blockIds: ["T4-L02", "T4-B02", "T4-B03", "T4-B04"] },
  { title: "Traffic Signals", blockIds: ["T4-L03", "T4-B05", "T4-B06", "T4-B07"] },
  { title: "Pavement Markings", blockIds: ["T4-L04", "T4-B08", "T4-B09", "T4-B10"] },
  { title: "Special & Temporary Controls", blockIds: ["T4-L05", "T4-B11", "T4-B12", "T4-B13", "T4-B14"] },
  { title: "Read the Road as a System", blockIds: ["T4-L06", "T4-B15", "T4-B16", "T4-B17", "T4-B18"] },
];

export const TOPIC4_PRACTICE_BLOCK_IDS = ["T4-B02", "T4-B05", "T4-B08", "T4-B11", "T4-B12", "T4-B15"];

export type Topic4Block =
  | { id: string; kind: "decision"; poi: string[]; estimatedMinutes: number; props: DecisionChallengeProps }
  | { id: string; kind: "compare"; poi: string[]; estimatedMinutes: number; props: CompareScenesProps }
  | { id: string; kind: "sequence"; poi: string[]; estimatedMinutes: number; props: DecisionSequenceProps }
  | { id: string; kind: "hotspot"; poi: string[]; estimatedMinutes: number; props: HotspotSceneProps }
  | { id: string; kind: "staged"; poi: string[]; estimatedMinutes: number; props: StagedScenarioProps }
  | { id: string; kind: "recap"; poi: string[]; estimatedMinutes: number; props: RecapAccordionProps }
  | { id: string; kind: "learn"; poi: string[]; estimatedMinutes: number; props: LessonScreenProps };

export const TOPIC4_BLOCKS: Topic4Block[] = [
  // ============================================================
  // Chapter 1 — How the Road Communicates
  // ============================================================
  {
    id: "T4-L00",
    kind: "learn",
    poi: ["Topic 4 introduction"],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Topic 4 — Traffic Control Devices",
      title: "Read the Road Before the Road Surprises You",
      previewPoints: [
        "Recognize common sign shapes and understand sign colors",
        "Distinguish regulatory, warning, guide, and construction signs",
        "Respond correctly to traffic signals, including flashing signals",
        "Understand pavement-line colors, patterns, and lane arrows",
        "Respond to railroad warning devices and work-zone controls",
        "Recognize when a police officer or authorized person is directing traffic",
      ],
      sections: [
        {
          heading: "A Driver Talking to You Without Saying Anything",
          body: [
            "Traffic-control devices communicate with you long before another driver does. A sign may warn you about a curve. A signal may tell you when to stop. A pavement marking may tell you whether traffic is moving with you or against you. A temporary device may completely change the normal traffic pattern.",
            "Every sign, signal, and painted line is a driver talking to you without saying anything. Learn the underlying system — shapes and colors mean specific things — and you can read almost any sign correctly the first time you see it, even ones you've never memorized.",
          ],
        },
      ],
      ruleCard: {
        title: "EASY WAY PRINCIPLE",
        lines: ["SEE THE CONTROL", "UNDERSTAND THE MESSAGE", "RESPOND EARLY"],
      },
    },
  },
  {
    id: "T4-B00",
    kind: "hotspot",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Opening Scene — Before Your Best Guess",
      prompt:
        "Take a look at this intersection. How many different traffic-control messages can you find before entering it? Tap everything you can spot — there's no penalty for missing one.",
      visual: SCENE_T4_OPENING,
      mode: "identify-all",
      hotspots: [
        { id: "signal", label: "Traffic signal", x: 50, y: 18, explanation: "A signal — it controls who may move and when." },
        { id: "warn", label: "Yellow warning sign", x: 18, y: 30, explanation: "A yellow warning sign — it tells you what to prepare for ahead." },
        { id: "yield", label: "Yield sign", x: 82, y: 73, explanation: "A yield sign — a regulatory device telling you who must give way." },
        { id: "arrow", label: "Pavement arrow", x: 15, y: 75, explanation: "A pavement arrow — it tells you which movement this lane is for." },
        { id: "centerline", label: "Double yellow centerline", x: 50, y: 92, explanation: "A double yellow centerline — it tells you passing isn't permitted from either direction here." },
        { id: "workzone", label: "Temporary work-zone sign", x: 87, y: 12, explanation: "A temporary orange sign in the distance — it warns that the normal pattern is about to change ahead." },
      ],
    },
  },
  {
    id: "T4-L01",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 3,
    props: {
      eyebrow: "Chapter 1 — What You'll Learn",
      title: "What Is a Traffic-Control Device?",
      previewPoints: [
        "What counts as an official traffic-control device",
        "Why not every device creates the same kind of instruction",
      ],
      sections: [
        {
          heading: "A Driver May Process Several Messages in Seconds",
          body: [
            "You just found several traffic-control messages in one scene — a driver may process that many within only a few seconds of real driving. This chapter teaches you how to recognize them early enough to respond safely.",
          ],
        },
        {
          heading: "What Traffic-Control Devices Do",
          body: [
            "An official traffic-control device is a sign, signal, marking, or device used to regulate, warn, or guide traffic. Devices can regulate movement, warn about conditions, guide drivers, assign lanes, or communicate a temporary change. Examples include signs, traffic signals, pavement markings, arrow boards, lane-control signals, railroad warning devices, and construction-zone devices.",
          ],
        },
        {
          heading: "Not Every Device Creates the Same Instruction",
          body: [
            "Some traffic-control devices tell you what you must do. Others warn you about what you should prepare for. Others simply guide you toward a destination or roadway. Reading a device correctly starts with recognizing which of those three jobs it's doing.",
          ],
        },
      ],
      commonMistakes: [
        "Treating every sign as if it carries the same legal weight, instead of checking what kind of message it's actually sending.",
      ],
    },
  },
  {
    id: "T4-B01",
    kind: "compare",
    poi: [POI],
    estimatedMinutes: 3,
    props: {
      eyebrow: "Three Kinds of Messages",
      prompt: "Does every road sign create the same type of instruction? Compare the three categories.",
      tabs: [
        { label: "Regulate", visual: SCENE_CAT_REGULATE, caption: "Regulatory devices tell you what the law requires — like STOP, a speed limit, or ONE WAY." },
        { label: "Warn", visual: SCENE_CAT_WARN, caption: "Warning devices tell you what to prepare for ahead — like a curve, a merge, or a pedestrian crossing." },
        { label: "Guide", visual: SCENE_CAT_GUIDE, caption: "Guide devices direct you toward a destination or roadway — like a route or exit sign." },
      ],
      ruleCard: {
        title: "THREE JOBS, ONE SYSTEM",
        lines: ["Regulate: what you must do.", "Warn: what to prepare for.", "Guide: where to go."],
      },
    },
  },

  // ============================================================
  // Chapter 2 — Sign Shapes & Colors
  // ============================================================
  {
    id: "T4-L02",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 3.5,
    props: {
      eyebrow: "Chapter 2 — What You'll Learn",
      title: "Why Shape and Color Matter",
      previewPoints: [
        "The major sign shapes used on Texas roadways",
        "What each shape family is reserved for",
        "The general purpose behind common sign colors",
      ],
      sections: [
        {
          heading: "Sometimes You Recognize a Sign Before You Can Read It",
          body: [
            "Traffic-sign shapes provide an extra visual cue — from a distance, in bad weather, or at a glance, you can often recognize the type of message before you can read a single word.",
          ],
        },
        {
          heading: "The Shape Families",
          body: [
            "The octagon is reserved for one sign only: STOP. The downward-pointing triangle is reserved for one sign only: YIELD.",
            "The diamond is the general warning-sign shape — curves, merges, pedestrians, and most other hazard warnings all use it. A round sign is the advance warning for a railroad crossing. A pentagon shows up in school-related warning and crossing contexts.",
          ],
        },
        {
          heading: "Color Adds a Second Layer",
          body: [
            "Red generally marks a stop or a prohibition. White generally marks a regulatory requirement. Yellow generally marks a general warning, while orange marks a construction or work-zone warning specifically. Green and blue generally carry guide and service information, and brown marks recreational or scenic areas.",
          ],
        },
      ],
      instructorTip: "Shape and color are redundant on purpose — if one is hard to see, the other still tells you what kind of message you're looking at.",
      commonMistakes: [
        "Waiting to read the words on a sign instead of using its shape and color to recognize the message type first.",
        "Assuming yellow and orange diamonds carry the same warning — orange specifically flags construction/work-zone conditions.",
      ],
    },
  },
  {
    id: "T4-B02",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 4,
    props: {
      ruleCardTitle: "SIGN SHAPES",
      ruleCardLines: [
        "Octagon — STOP, and only STOP.",
        "Downward triangle — YIELD, and only YIELD.",
        "Diamond — a general warning.",
        "Pentagon — school-related warning/crossing.",
        "Round — advance railroad warning.",
      ],
      rounds: [
        {
          eyebrow: "Shape Recognition — Round 1",
          visual: SCENE_SHAPE_OCTAGON,
          prompt: "What type of sign is this shape?",
          choices: [
            { text: "STOP.", correct: true, feedback: "Right. The octagon shape is reserved for the STOP sign — no other sign uses it." },
            { text: "Yield.", correct: false, feedback: "Yield uses a downward triangle, not an octagon." },
            { text: "A warning.", correct: false, feedback: "Warning signs use a diamond, not an octagon." },
          ],
        },
        {
          eyebrow: "Shape Recognition — Round 2",
          visual: SCENE_SHAPE_TRIANGLE,
          prompt: "What type of sign is this shape?",
          choices: [
            { text: "STOP.", correct: false, feedback: "STOP uses an octagon, not a triangle." },
            { text: "Yield.", correct: true, feedback: "Right. The downward-pointing triangle is reserved for YIELD." },
            { text: "A guide sign.", correct: false, feedback: "Guide signs are typically rectangular, not triangular." },
          ],
        },
        {
          eyebrow: "Shape Recognition — Round 3",
          visual: SCENE_SHAPE_DIAMOND,
          prompt: "What type of sign is this shape?",
          choices: [
            { text: "A warning.", correct: true, feedback: "Right. The diamond is the general warning-sign shape — curves, merges, pedestrians, and more." },
            { text: "A regulatory requirement.", correct: false, feedback: "Regulatory signs are typically rectangular, not diamond-shaped." },
            { text: "A railroad crossing.", correct: false, feedback: "The railroad advance warning uses a round shape, not a diamond." },
          ],
        },
        {
          eyebrow: "Shape Recognition — Round 4",
          visual: SCENE_SHAPE_PENTAGON,
          prompt: "What type of sign is this shape?",
          choices: [
            { text: "A school-related warning/crossing sign.", correct: true, feedback: "Right. The pentagon shows up in school-related warning and crossing contexts." },
            { text: "STOP.", correct: false, feedback: "STOP uses an octagon, not a pentagon." },
            { text: "A service sign.", correct: false, feedback: "Service signs are typically rectangular, not pentagon-shaped." },
          ],
        },
        {
          eyebrow: "Shape Recognition — Round 5",
          visual: SCENE_SHAPE_ROUND,
          prompt: "What type of sign is this shape?",
          choices: [
            { text: "Advance railroad warning.", correct: true, feedback: "Right. A round sign is the advance warning for a railroad crossing ahead." },
            { text: "Yield.", correct: false, feedback: "Yield uses a downward triangle, not a round shape." },
            { text: "A guide sign.", correct: false, feedback: "Guide signs are typically rectangular, not round." },
          ],
        },
      ],
    },
  },
  {
    id: "T4-B03",
    kind: "compare",
    poi: [POI],
    estimatedMinutes: 4,
    props: {
      eyebrow: "Sign Colors",
      prompt: "Tap through each color to see its general purpose and a real sign example.",
      tabs: [
        { label: "Red", visual: SCENE_COLOR_RED, caption: "Red generally marks a stop or a prohibition." },
        { label: "White", visual: SCENE_COLOR_WHITE, caption: "White generally marks a regulatory requirement, like a speed limit." },
        { label: "Yellow", visual: SCENE_COLOR_YELLOW, caption: "Yellow generally marks a general warning about conditions ahead." },
        { label: "Orange", visual: SCENE_COLOR_ORANGE, caption: "Orange specifically marks a construction or work-zone warning." },
        { label: "Green", visual: SCENE_COLOR_GREEN, caption: "Green generally carries guide and directional information." },
        { label: "Blue", visual: SCENE_COLOR_BLUE, caption: "Blue generally marks motorist services, like hospitals or rest areas." },
        { label: "Brown", visual: SCENE_COLOR_BROWN, caption: "Brown generally marks recreational or scenic areas." },
      ],
    },
  },
  {
    id: "T4-B04",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 3,
    props: {
      rounds: [
        {
          eyebrow: "Color + Shape — Orange Diamond",
          visual: SCENE_ORANGE_DIAMOND,
          prompt: "You spot this shape and color together. What kind of message should you expect?",
          choices: [
            { text: "A construction/work-zone warning.", correct: true, feedback: "Right. Orange plus the warning diamond shape together mean a construction or work-zone condition ahead." },
            { text: "A general, non-construction warning.", correct: false, feedback: "A general warning would be yellow, not orange — the orange color specifically flags work-zone conditions." },
            { text: "A regulatory requirement.", correct: false, feedback: "Regulatory signs are typically white, not orange, and usually rectangular rather than diamond-shaped." },
          ],
        },
        {
          eyebrow: "Color + Shape — Yellow Diamond",
          visual: SCENE_YELLOW_DIAMOND_MATCH,
          prompt: "Now the same diamond shape, but yellow instead of orange. Does the message change?",
          choices: [
            { text: "Yes — it's now a general warning, not specifically a work zone.", correct: true, feedback: "Right. Same shape, different color — yellow is a general warning about roadway conditions or hazards ahead, without the work-zone-specific meaning orange carries." },
            { text: "No — orange and yellow diamonds mean exactly the same thing.", correct: false, feedback: "The shape is the same, but the color still matters — orange specifically flags construction/work-zone conditions, which yellow does not." },
          ],
        },
      ],
    },
  },

  // ============================================================
  // Chapter 3 — Traffic Signals
  // ============================================================
  {
    id: "T4-L03",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 3.5,
    props: {
      eyebrow: "Chapter 3 — What You'll Learn",
      title: "Signals: More Than Just Colors",
      previewPoints: [
        "What steady red, yellow, and green each require",
        "The difference between flashing red and flashing yellow",
        "What to do when a signal and a police officer disagree",
      ],
      sections: [
        {
          heading: "Signals Control Who May Move — Not Whether It's Safe",
          body: [
            "A signal controls who may move and when. But a signal alone does not guarantee the intersection is safe. A green indication doesn't mean \"accelerate without checking\" — before entering, observe the intersection, watch for pedestrians, watch for vehicles still clearing, and proceed only when it's actually appropriate and safe. This is the same defensive-driving principle from Topic 3, applied to signals.",
          ],
        },
        {
          heading: "Flashing Signals Aren't the Same as Steady Ones",
          body: [
            "A steady red means stop, full stop. A flashing red works like a stop sign — stop, then proceed when clear. A flashing yellow means slow down and proceed with caution, no full stop required. Mixing these two up is one of the most common signal mistakes.",
          ],
        },
        {
          heading: "An Officer Directing Traffic Overrides the Signal",
          body: [
            "Traffic signals must be obeyed — except when a law-enforcement officer is directing traffic. If an officer's direction conflicts with what the signal shows, follow the officer.",
          ],
        },
      ],
      commonMistakes: [
        "Accelerating the moment a light turns green without checking that the intersection is actually clear.",
        "Treating flashing red and flashing yellow as if they require the same response.",
      ],
    },
  },
  {
    id: "T4-B05",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 3.5,
    props: {
      rounds: [
        {
          eyebrow: "Signal Lab — Green, But Traffic Is Still Clearing",
          visual: SCENE_SIGNAL_GREEN_CLEARING,
          prompt: "Your signal changes to green, but cross traffic appears to still be clearing the intersection. Do you immediately accelerate into it?",
          choices: [
            { text: "Yes — green means go.", correct: false, feedback: "A green indication doesn't guarantee the intersection is clear. Accelerating into traffic that's still clearing is exactly the risk this habit creates." },
            { text: "No — confirm the intersection is actually clear first.", correct: true, feedback: "Right. Green gives you permission to proceed when it's safe — it doesn't override what you can actually see happening in front of you." },
          ],
        },
        {
          eyebrow: "Signal Lab — Approaching Yellow",
          visual: SCENE_SIGNAL_YELLOW_APPROACH,
          prompt: "You're approaching an intersection and the signal changes to yellow. What's the safer response?",
          choices: [
            { text: "Speed up to beat the red.", correct: false, feedback: "Racing a yellow light increases risk right at the point where cross traffic is about to get a green — that's not the safer response." },
            { text: "Prepare to stop if you can do so safely; proceed only if you're already too close to stop safely.", correct: true, feedback: "Right. A yellow indication is a warning that the light is about to change — respond by preparing to stop, not by accelerating." },
          ],
        },
        {
          eyebrow: "Signal Lab — Steady Red",
          visual: SCENE_SIGNAL_RED,
          prompt: "The signal ahead is a steady red. What does that require?",
          choices: [
            { text: "A full stop, and remain stopped until the signal changes or you may lawfully proceed.", correct: true, feedback: "Right. Steady red means stop, full stop." },
            { text: "Slow down and proceed with caution if the way looks clear.", correct: false, feedback: "That's the response to a flashing yellow, not a steady red. A steady red requires a full stop." },
          ],
        },
      ],
    },
  },
  {
    id: "T4-B06",
    kind: "compare",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Flashing Red vs. Flashing Yellow",
      prompt: "Same-looking intersection, two different flashing signals. What's different about your required response?",
      tabs: [
        { label: "Flashing Red", visual: SCENE_FLASH_RED, caption: "Flashing red works like a stop sign — stop, then proceed only when clear." },
        { label: "Flashing Yellow", visual: SCENE_FLASH_YELLOW, caption: "Flashing yellow means slow down and proceed with caution — no full stop required." },
      ],
    },
  },
  {
    id: "T4-B07",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Signal vs. Officer",
      visual: SCENE_SIGNAL_VS_OFFICER,
      prompt: "Your signal is green, but an officer at the intersection is directing you to stop. Which instruction do you follow?",
      choices: [
        { text: "The green signal — it's the official traffic-control device.", correct: false, feedback: "Signals must be obeyed except when a law-enforcement officer is directing traffic. When the two conflict, the officer's direction controls." },
        { text: "The officer's direction.", correct: true, feedback: "Right. Traffic signals must be obeyed except when a law-enforcement officer is directing traffic — the officer's direction overrides the signal." },
      ],
    },
  },

  // ============================================================
  // Chapter 4 — Pavement Markings
  // ============================================================
  {
    id: "T4-L04",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 3.5,
    props: {
      eyebrow: "Chapter 4 — What You'll Learn",
      title: "Why Pavement Markings Matter",
      previewPoints: [
        "What yellow vs. white lines tell you about traffic direction",
        "What broken, solid, and double solid lines mean for passing",
        "How lane arrows and turn lanes restrict your movement",
        "Why a stopping position matters as much as stopping at all",
      ],
      sections: [
        {
          heading: "The Lines Under Your Vehicle Are Already Talking",
          body: [
            "Before you see a sign, the lines under your vehicle may already tell you how the road is organized. Yellow lines separate traffic moving in opposite directions. White lines separate traffic moving in the same direction, or define the roadway's edges.",
          ],
        },
        {
          heading: "Broken, Solid, and Double Solid",
          body: [
            "A broken (dashed) line means you may cross it when it's safe to do so. A solid line means don't cross it — no passing. Double solid yellow means neither direction may pass.",
          ],
        },
        {
          heading: "Lane Arrows Tell You What a Lane Is For",
          body: [
            "Painted lane arrows and lane-use signs tell you what movement a lane is restricted to. A lane marked left-turn-only is for turning left — not for continuing straight.",
          ],
        },
        {
          heading: "Where You Stop Matters",
          body: [
            "A stop line marks where your vehicle should actually stop — short of the crosswalk. Stopping beyond the line and into the crosswalk crowds pedestrian space and can block the visibility other drivers and pedestrians need.",
          ],
        },
      ],
      commonMistakes: [
        "Treating white and yellow lines as if they mean the same thing.",
        "Assuming every broken line means you may cross it, without checking which side of the line you're actually on.",
        "Continuing straight from a lane that's marked for turning only.",
      ],
    },
  },
  {
    id: "T4-B08",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 3.5,
    props: {
      ruleCardTitle: "CENTERLINES & PASSING",
      ruleCardLines: [
        "Broken yellow on your side: you may pass when it's safe.",
        "Solid yellow on your side: passing is prohibited.",
        "Double solid yellow: neither direction may pass.",
      ],
      rounds: [
        {
          eyebrow: "Centerline Lab — Broken Yellow",
          visual: SCENE_LINE_BROKEN_YELLOW,
          prompt: "The centerline on your side is broken yellow. Can you cross it to pass when it's safe?",
          choices: [
            { text: "Yes, when it's safe to do so.", correct: true, feedback: "Right. A broken (dashed) line means you may cross it when it's safe." },
            { text: "No — yellow always means no passing.", correct: false, feedback: "The color tells you it separates opposite-direction traffic; whether you can cross it depends on broken vs. solid — broken means you may, when safe." },
          ],
        },
        {
          eyebrow: "Centerline Lab — Solid Yellow",
          visual: SCENE_LINE_SOLID_YELLOW,
          prompt: "Now the centerline on your side is solid yellow. Can you pass?",
          choices: [
            { text: "Yes, if no oncoming traffic is visible.", correct: false, feedback: "A solid line means don't cross it — no passing, regardless of whether oncoming traffic is currently visible." },
            { text: "No — a solid line means don't cross it.", correct: true, feedback: "Right. A solid line means passing is prohibited." },
          ],
        },
        {
          eyebrow: "Centerline Lab — Double Solid Yellow",
          visual: SCENE_LINE_DOUBLE_YELLOW,
          prompt: "The centerline is double solid yellow. What does that mean for passing?",
          choices: [
            { text: "Neither direction may pass.", correct: true, feedback: "Right. Double solid yellow means neither direction may pass." },
            { text: "Only the faster driver may pass.", correct: false, feedback: "Double solid yellow prohibits passing from either direction — it has nothing to do with which driver is faster." },
          ],
        },
      ],
    },
  },
  {
    id: "T4-B09",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 3,
    props: {
      rounds: [
        {
          eyebrow: "Lane Arrows — Choosing a Lane",
          visual: SCENE_LANE_APPROACH,
          prompt: "You're approaching this three-lane intersection and want to continue straight. Which lane should you be in?",
          choices: [
            { text: "The left lane.", correct: false, feedback: "The left lane is marked for left turns only, based on its painted arrow." },
            { text: "The middle lane.", correct: true, feedback: "Right. The middle lane's painted arrow marks it for going straight." },
            { text: "The right lane.", correct: false, feedback: "The right lane is marked for right turns only, based on its painted arrow." },
          ],
        },
        {
          eyebrow: "Lane Arrows — A Restriction, Not a Suggestion",
          visual: SCENE_LANE_LEFT_ONLY,
          prompt: "You're in a lane marked LEFT TURN ONLY. Can you continue straight through the intersection instead?",
          choices: [
            { text: "No — the lane marking restricts you to the movement it shows.", correct: true, feedback: "Right. A lane marked left-turn-only is for turning left — not for continuing straight." },
            { text: "Yes, as long as no other traffic is affected.", correct: false, feedback: "The lane-use marking restricts what movement is legal from that lane, regardless of whether other traffic happens to be affected." },
          ],
        },
      ],
    },
  },
  {
    id: "T4-B10",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Stop Lines & Crosswalks",
      visual: SCENE_STOPLINE_CROSSWALK,
      prompt: "This driver stopped beyond the stop line, partially into the crosswalk. What problem did that create?",
      choices: [
        { text: "None — as long as the vehicle is stopped, position doesn't matter.", correct: false, feedback: "Position does matter. Stopping into the crosswalk crowds the space pedestrians need and can block the visibility other drivers and pedestrians rely on." },
        { text: "It reduced pedestrian space and visibility at the intersection.", correct: true, feedback: "Right. The stop line marks where you should actually stop — short of the crosswalk — precisely so pedestrians have room and sightlines stay clear." },
      ],
    },
  },

  // ============================================================
  // Chapter 5 — Special & Temporary Controls
  // ============================================================
  {
    id: "T4-L05",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 3.5,
    props: {
      eyebrow: "Chapter 5 — What You'll Learn",
      title: "Railroad Devices & Work Zones",
      previewPoints: [
        "How to recognize railroad warning devices before you need them",
        "The common devices you'll see in a work zone",
        "Why today's temporary controls matter more than yesterday's habit",
      ],
      sections: [
        {
          heading: "Recognizing Railroad Devices",
          body: [
            "A round advance warning sign appears before the crossing itself. A crossbuck marks the crossing directly. Flashing signals and a lowered gate are active warnings — Topic 3 already covered how to respond to them; here, the goal is simply recognizing each device on sight.",
          ],
        },
        {
          heading: "Work-Zone Devices",
          body: [
            "A work zone uses several devices together: orange warning signs, cones and drums that channel traffic away from the work area, arrow boards that show a lane shift, portable message signs, temporary lane markings, and flaggers.",
          ],
        },
        {
          heading: "A Flagger's Paddle",
          body: [
            "A flagger controls traffic using a paddle with two sides — the STOP side means stop, the SLOW side means slow down and proceed with caution.",
          ],
        },
        {
          heading: "Follow the Controls That Exist Right Now",
          body: [
            "A temporary lane closure or redirected arrows can completely change a road you drive every day. Drive according to the traffic controls and conditions that exist now — not the pattern you remember from yesterday.",
          ],
        },
      ],
      commonMistakes: [
        "Assuming a familiar road can't have changed since yesterday.",
        "Treating a flagger as optional because the road's permanent signs say something different.",
      ],
    },
  },
  {
    id: "T4-B11",
    kind: "hotspot",
    poi: [POI],
    estimatedMinutes: 3,
    props: {
      eyebrow: "Railroad Device Recognition",
      prompt: "Tap each railroad traffic-control device to see what it tells you.",
      visual: SCENE_RAILROAD_DEVICES,
      mode: "identify-all",
      hotspots: [
        { id: "crossbuck", label: "Crossbuck", x: 22, y: 32, explanation: "The crossbuck marks the railroad crossing itself and is a regulatory device — like a yield sign for the crossing." },
        { id: "signal", label: "Flashing signal", x: 60, y: 20, explanation: "Flashing railroad signals are an active warning — a train is approaching." },
        { id: "gate", label: "Lowered gate", x: 83, y: 22, explanation: "A lowered gate is a physical barrier warning that a train is approaching — never go around it." },
      ],
    },
  },
  {
    id: "T4-B12",
    kind: "hotspot",
    poi: [POI],
    estimatedMinutes: 3.5,
    props: {
      eyebrow: "Work-Zone Device Recognition",
      prompt: "Tap each work-zone traffic-control device to see what it tells you.",
      visual: SCENE_WORKZONE_DEVICES,
      mode: "identify-all",
      hotspots: [
        { id: "sign", label: "Orange warning sign", x: 10, y: 18, explanation: "An orange sign warns that a work zone is ahead, before you reach it." },
        { id: "cones", label: "Cones/drums", x: 38, y: 42, explanation: "Cones and drums channel traffic away from the work area." },
        { id: "board", label: "Arrow board", x: 70, y: 30, explanation: "An arrow board shows which way traffic needs to shift." },
        { id: "flagger", label: "Flagger", x: 87, y: 68, explanation: "A flagger provides temporary human direction that can override the normal traffic pattern." },
      ],
    },
  },
  {
    id: "T4-B13",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Flagger Signals",
      visual: SCENE_FLAGGER_STOP,
      prompt: "A flagger is holding a paddle showing its STOP side toward you. What should you do?",
      choices: [
        { text: "Stop.", correct: true, feedback: "Right. The STOP side of a flagger's paddle means stop." },
        { text: "Slow down and proceed with caution.", correct: false, feedback: "That's the response to the paddle's SLOW side. The STOP side means come to a stop." },
      ],
    },
  },
  {
    id: "T4-B14",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "When Devices Conflict With Habit",
      visual: SCENE_HABIT_VS_DEVICE,
      prompt: "You drive this road every day. Today, a lane is temporarily closed and arrows redirect traffic. Should you follow yesterday's normal lane pattern or today's traffic-control devices?",
      choices: [
        { text: "Yesterday's pattern — I know this road.", correct: false, feedback: "Familiarity with a road doesn't override what's actually there today. Following an outdated mental pattern instead of the current controls is exactly how this kind of mistake happens." },
        { text: "Today's traffic-control devices.", correct: true, feedback: "Right. Drive according to the traffic controls and conditions that exist now, not the pattern you remember from yesterday." },
      ],
    },
  },

  // ============================================================
  // Chapter 6 — Read the Road as a System
  // ============================================================
  {
    id: "T4-L06",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Chapter 6 — What You'll Learn",
      title: "Put It All Together: The S.A.F.E. Framework",
      previewPoints: [
        "Applying every device type together, the way real driving does",
      ],
      sections: [
        {
          heading: "One System, Not a Flashcard Deck",
          body: [
            "Signs, signals, and pavement markings rarely appear one at a time in real driving — they show up together, and reading them as one system is the actual skill. The activities in this chapter mix concepts together the way real intersections do.",
          ],
        },
        {
          heading: "S.A.F.E. — An Easy Way Teaching Framework",
          body: [
            "SEE: what control devices are present? ANTICIPATE: what could change? FIND SPACE: what safety margin do you need? EXECUTE SAFELY: what legal, safe action should you take?",
            "S.A.F.E. is an Easy Way teaching framework to help the ideas stick — it isn't Texas law or a TDLR/DPS term.",
          ],
        },
      ],
    },
  },
  {
    id: "T4-B15",
    kind: "hotspot",
    poi: [POI],
    estimatedMinutes: 3,
    props: {
      eyebrow: "Traffic-Control Mistake Spotter",
      prompt: "Look at this intersection. Which driver is about to ignore or misunderstand a traffic-control device?",
      visual: SCENE_T4_MISTAKE_SPOTTER,
      mode: "pick-one",
      wrongPickFeedback: "That road user isn't the one making the mistake here — look for who's disregarding the signal.",
      hotspots: [
        { id: "car1", label: "Car 1", x: 30, y: 51, explanation: "Car 1 is stopped correctly for the red signal." },
        {
          id: "car2",
          label: "Car 2 — rolling through on red",
          x: 60,
          y: 51,
          explanation:
            "Car 2 is rolling through the intersection on a steady red instead of coming to a full stop — that's the traffic-control mistake. Rule: a steady red requires a full stop. The defensive response for everyone else: expect it, and be ready to react even though the legal fault is Car 2's.",
          isTarget: true,
        },
        { id: "ped", label: "Pedestrian", x: 82, y: 76, explanation: "The pedestrian isn't the one making a traffic-control mistake here." },
        { id: "yield", label: "Yield sign", x: 18, y: 76, explanation: "The yield sign is a device, not a road user — it's not the one making a mistake." },
      ],
    },
  },
  {
    id: "T4-B16",
    kind: "staged",
    poi: [POI],
    estimatedMinutes: 4,
    props: {
      eyebrow: "Easy Way SAFE Application",
      completionTitle: "S.A.F.E.",
      completionLines: [
        "SEE: identify every control device present.",
        "ANTICIPATE: expect the realistic mistake another road user might make.",
        "FIND SPACE: keep enough margin to respond if it happens.",
        "EXECUTE SAFELY: apply what you saw — don't just react.",
        "SAFE is an Easy Way teaching framework, not Texas law or a TDLR/DPS term.",
      ],
      stages: [
        {
          kind: "decision",
          label: "S — SEE",
          visual: SCENE_SAFE_TC_INTERSECTION,
          prompt: "Approaching this intersection, what control devices should you actively be scanning for?",
          choices: [
            { text: "The signal, the warning sign, the pedestrian at the corner, and the pavement markings.", correct: true, feedback: "Right — SEE means actively scanning for every control device present, not just the one directly in front of you." },
            { text: "Just the signal.", correct: false, feedback: "Only watching the signal misses the warning sign and the pedestrian, both of which affect what you should do next." },
          ],
        },
        {
          kind: "decision",
          label: "A — ANTICIPATE",
          prompt: "What could another road user in this scene realistically do that would affect you?",
          choices: [
            { text: "The pedestrian could step into the crosswalk, or another driver could misjudge the warning sign's message.", correct: true, feedback: "Right — anticipating means expecting the realistic mistakes other road users might make, before they happen." },
            { text: "Nothing — a green signal means everyone else will behave predictably.", correct: false, feedback: "A green signal doesn't guarantee predictable behavior from everyone else — that assumption is exactly what ANTICIPATE guards against." },
          ],
        },
        {
          kind: "decision",
          label: "F — FIND SPACE",
          prompt: "Where's your safety margin if someone else misreads a device here?",
          choices: [
            { text: "Enough following and side distance to brake or adjust without a collision.", correct: true, feedback: "Right — finding space means keeping enough margin that someone else's misread doesn't become your crash." },
            { text: "I don't need extra space if I read every device correctly myself.", correct: false, feedback: "Reading the devices correctly yourself doesn't protect you from someone else misreading them — that's exactly what margin is for." },
          ],
        },
        {
          kind: "decision",
          label: "E — EXECUTE SAFELY",
          prompt: "Given all of that, what's your best action through this intersection?",
          choices: [
            { text: "Proceed at a controlled speed, ready to yield or stop if the pedestrian or another driver moves unexpectedly.", correct: true, feedback: "Right — executing safely means actually applying what you saw, anticipated, and made space for." },
            { text: "Accelerate through before anything can happen.", correct: false, feedback: "Speeding up removes your margin right when you might need it most." },
          ],
        },
      ],
    },
  },
  {
    id: "T4-B17",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 3,
    props: {
      rounds: [
        {
          eyebrow: "Rapid Recognition — Round 1",
          visual: SCENE_SHAPE_OCTAGON,
          prompt: "Quick check: what does this shape mean?",
          choices: [
            { text: "STOP.", correct: true, feedback: "Right — octagon means STOP." },
            { text: "Yield.", correct: false, feedback: "Yield is a downward triangle, not an octagon." },
          ],
        },
        {
          eyebrow: "Rapid Recognition — Round 2",
          visual: SCENE_YELLOW_DIAMOND_MATCH,
          prompt: "Quick check: what does this sign generally indicate?",
          choices: [
            { text: "A warning about roadway conditions or hazards ahead.", correct: true, feedback: "Right — a yellow diamond is a general warning sign." },
            { text: "A regulatory requirement.", correct: false, feedback: "Regulatory signs are typically white, not yellow diamonds." },
          ],
        },
        {
          eyebrow: "Rapid Recognition — Round 3",
          visual: SCENE_FLASH_RED,
          prompt: "Quick check: what does a flashing red signal require?",
          choices: [
            { text: "Stop, then proceed when clear — like a stop sign.", correct: true, feedback: "Right — flashing red works like a stop sign." },
            { text: "Slow down and proceed with caution, no stop required.", correct: false, feedback: "That's flashing yellow, not flashing red." },
          ],
        },
        {
          eyebrow: "Rapid Recognition — Round 4",
          visual: SCENE_FLASH_YELLOW,
          prompt: "Quick check: what does a flashing yellow signal require?",
          choices: [
            { text: "Slow down and proceed with caution, no full stop required.", correct: true, feedback: "Right — flashing yellow means slow down and use caution." },
            { text: "A full stop.", correct: false, feedback: "A full stop is required for flashing red (or steady red), not flashing yellow." },
          ],
        },
        {
          eyebrow: "Rapid Recognition — Round 5",
          visual: SCENE_LINE_DOUBLE_YELLOW,
          prompt: "Quick check: what does a double solid yellow centerline mean?",
          choices: [
            { text: "Neither direction may pass.", correct: true, feedback: "Right — double solid yellow prohibits passing from either direction." },
            { text: "Passing is allowed for both directions.", correct: false, feedback: "Double solid yellow means the opposite — no passing from either direction." },
          ],
        },
        {
          eyebrow: "Rapid Recognition — Round 6",
          visual: SCENE_LINE_BROKEN_YELLOW,
          prompt: "Quick check: what does a broken (dashed) line on your side generally allow?",
          choices: [
            { text: "Crossing it when it's safe — for example, to pass.", correct: true, feedback: "Right — a broken line means you may cross it when safe." },
            { text: "Nothing — broken lines still prohibit crossing.", correct: false, feedback: "A broken line is the one that permits crossing when safe; a solid line is the one that prohibits it." },
          ],
        },
      ],
    },
  },
  {
    id: "T4-B18",
    kind: "recap",
    poi: ["All Topic 4 review"],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Topic 4 Recap",
      prompt: "Tap each section for a quick review before the quiz.",
      sections: [
        {
          title: "Sign Shapes",
          points: [
            "Octagon: STOP, and only STOP.",
            "Downward triangle: YIELD, and only YIELD.",
            "Diamond: general warning. Pentagon: school-related context. Round: railroad advance warning.",
          ],
        },
        {
          title: "Sign Colors",
          points: [
            "Red: stop/prohibition. White: regulatory. Yellow: general warning. Orange: construction/work-zone.",
            "Green/blue: guide/service information. Brown: recreational/scenic.",
          ],
        },
        {
          title: "Regulatory & Warning Signs",
          points: [
            "Regulatory signs tell you what the law requires.",
            "Warning signs tell you what to prepare for ahead.",
          ],
        },
        {
          title: "Traffic Signals",
          points: [
            "Steady red: full stop. Flashing red: stop, then proceed when clear.",
            "Flashing yellow: slow down, proceed with caution, no full stop required.",
            "An officer directing traffic overrides the signal.",
          ],
        },
        {
          title: "Pavement Markings",
          points: [
            "Yellow separates opposite-direction traffic; white separates same-direction traffic.",
            "Broken: may cross when safe. Solid: no passing. Double solid: no passing from either direction.",
            "A lane's painted arrow restricts you to that movement.",
          ],
        },
        {
          title: "Special & Temporary Controls",
          points: [
            "Recognize railroad devices — crossbuck, flashing signal, gate — before you need to react to them.",
            "A flagger's STOP/SLOW paddle can override the normal traffic pattern.",
            "Follow the controls that exist right now, not the pattern you remember from yesterday.",
          ],
        },
      ],
    },
  },
];
