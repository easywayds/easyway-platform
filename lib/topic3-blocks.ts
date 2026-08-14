// Structured curriculum data for Topic 3's interactive blocks — the four
// core-prototype blocks built in Phase B of the Easy Way Interactive
// Lesson Standard v1.0 redesign. Legal content is kept out of the
// components themselves (DecisionChallenge, CompareScenes, AllWayStopLab)
// so curriculum can be audited and updated here without touching UI code.
//
// Block IDs and required-block enforcement live in lib/topic-blocks.ts.
// Only T3-B00, T3-B02, T3-B03, T3-B15 exist so far — the remaining ~16
// blocks in the full 20-block brief are a later phase.

import type { DecisionChallengeProps } from "@/components/course/DecisionChallenge";
import type { CompareScenesProps } from "@/components/course/CompareScenes";
import type { AllWayStopLabProps } from "@/components/course/AllWayStopLab";
import {
  SCENE_OPENING,
  SCENE_CONTROLLED,
  SCENE_UNCONTROLLED,
  SCENE_STOP_ARRIVAL_ORDER,
  SCENE_STOP_SIMULTANEOUS,
  SCENE_STOP_LEFT_TURN,
  SCENE_BUS_UNDIVIDED,
  SCENE_BUS_TURN_LANE,
  SCENE_BUS_DIVIDED,
} from "./topic3-scenes";

export type Topic3Block =
  | { id: string; kind: "decision"; poi: string[]; estimatedMinutes: number; props: DecisionChallengeProps }
  | { id: string; kind: "compare"; poi: string[]; estimatedMinutes: number; props: CompareScenesProps }
  | { id: string; kind: "stopLab"; poi: string[]; estimatedMinutes: number; props: AllWayStopLabProps };

export const TOPIC3_BLOCKS: Topic3Block[] = [
  {
    id: "T3-B00",
    kind: "decision",
    poi: ["4.1.3.1(F)", "4.1.3.1(G)"],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Right-of-Way — Opening Scenario",
      visual: SCENE_OPENING,
      prompt: "You both reach the intersection at about the same time. What do you do?",
      choices: [
        {
          text: "Go first because you're traveling straight.",
          correct: false,
          feedback:
            "Going straight doesn't create right-of-way at an uncontrolled intersection. With no sign or signal, right-of-way depends on the rules for that situation — here, on who's to the right.",
        },
        {
          text: "Yield to the vehicle on your right.",
          correct: true,
          feedback:
            "At an uncontrolled intersection, when two vehicles arrive at about the same time, the driver on the left yields to the vehicle on the right. Right-of-way isn't about being first, bigger, or more confident — it's a system for deciding who proceeds and who yields.",
        },
        {
          text: "Accelerate before the other driver enters.",
          correct: false,
          feedback:
            "Right-of-way isn't something to win by moving faster. Racing another driver into an intersection is exactly how uncontrolled-intersection crashes happen.",
        },
        {
          text: "Honk and proceed.",
          correct: false,
          feedback:
            "A horn doesn't grant right-of-way. It can warn another driver, but it doesn't change who's supposed to yield.",
        },
      ],
    },
  },
  {
    id: "T3-B02",
    kind: "compare",
    poi: ["4.1.3.1(B)", "4.1.3.1(C)"],
    estimatedMinutes: 4,
    props: {
      eyebrow: "Controlled vs. Uncontrolled Intersections",
      prompt: "Compare the same intersection with and without traffic-control devices.",
      tabs: [
        {
          label: "Controlled",
          visual: SCENE_CONTROLLED,
          caption:
            "A stop sign, yield sign, or traffic signal tells drivers exactly how to proceed. The traffic-control device — not guesswork — controls the intersection.",
        },
        {
          label: "Uncontrolled",
          visual: SCENE_UNCONTROLLED,
          caption:
            "No signs, no signals — right-of-way rules themselves now decide who goes first. This is where actually knowing the rules matters.",
        },
      ],
    },
  },
  {
    id: "T3-B03",
    kind: "stopLab",
    poi: ["4.1.3.1(C)"],
    estimatedMinutes: 4,
    props: {
      ruleCardTitle: "ALL-WAY STOP",
      ruleCardLines: [
        "Different arrival times: the first vehicle stopped normally proceeds first.",
        "Same time: the driver on the left generally yields to the vehicle on the right.",
        "Always: confirm the intersection is actually clear before you proceed.",
      ],
      rounds: [
        {
          eyebrow: "Round 1 — Different Arrival Times",
          prompt: "Red stops first. Blue stops second. Yellow stops third. Who proceeds first?",
          visual: SCENE_STOP_ARRIVAL_ORDER,
          choices: [
            {
              text: "Red — the vehicle that stopped first.",
              correct: true,
              feedback: "At an all-way stop, arrival order controls. The first vehicle to stop normally proceeds first.",
            },
            {
              text: "Blue, because it's in the through lane.",
              correct: false,
              feedback: "Lane position doesn't override arrival order at an all-way stop — the first vehicle stopped still goes first.",
            },
            {
              text: "Whichever driver moves first.",
              correct: false,
              feedback: "All-way stops aren't first-to-move — they're first-to-arrive. Red stopped first and has priority.",
            },
          ],
        },
        {
          eyebrow: "Round 2 — Arriving at the Same Time",
          prompt: "Red and Blue stop at about the same time. Red is on Blue's left. Who proceeds first?",
          visual: SCENE_STOP_SIMULTANEOUS,
          choices: [
            {
              text: "Red, because it's on the left side of the intersection.",
              correct: false,
              feedback: "It's the opposite — when two vehicles stop at the same time, the driver on the left yields to the vehicle on the right.",
            },
            {
              text: "Blue — the vehicle on Red's right.",
              correct: true,
              feedback: "When arrival is essentially simultaneous, the driver on the left yields to the vehicle on the right. Since Red is on the left, Blue goes first.",
            },
            {
              text: "Whichever vehicle is bigger.",
              correct: false,
              feedback: "Vehicle size has nothing to do with right-of-way. Apply the left-yields-to-right rule instead.",
            },
          ],
        },
        {
          eyebrow: "Round 3 — A Left-Turning Vehicle",
          prompt: "Vehicle B wants to turn left. Does that automatically give it priority?",
          visual: SCENE_STOP_LEFT_TURN,
          choices: [
            {
              text: "Yes — left-turning traffic always goes first.",
              correct: false,
              feedback: "Wanting to turn left doesn't create priority. The same arrival-order and left-yields-to-right rules still apply.",
            },
            {
              text: "No — the normal all-way-stop rules still apply.",
              correct: true,
              feedback: "Correct. A left turn doesn't change who has the right-of-way — it's still decided by arrival order, or by yielding to the vehicle on the right when arrival is simultaneous.",
            },
          ],
        },
      ],
    },
  },
  {
    id: "T3-B15",
    kind: "compare",
    poi: ["4.1.3.1(D)"],
    estimatedMinutes: 4,
    props: {
      eyebrow: "School Bus — Does the Roadway Change the Rule?",
      prompt: "The same school bus, three different roadways. Does opposing traffic always have to stop?",
      tabs: [
        {
          label: "Undivided",
          visual: SCENE_BUS_UNDIVIDED,
          caption:
            "Two-lane road, no median, no turn lane. Traffic in both directions must stop for the bus's flashing red lights and extended stop arm.",
        },
        {
          label: "Center Turn Lane",
          visual: SCENE_BUS_TURN_LANE,
          caption:
            "A center turn lane is not a physical barrier or intervening space. Traffic in both directions still must stop.",
        },
        {
          label: "Physically Divided",
          visual: SCENE_BUS_DIVIDED,
          caption:
            "A real physical median or intervening space separates the roadways. Traffic on the bus's side must stop — opposing traffic on the far side of the barrier does not.",
        },
      ],
    },
  },
];
