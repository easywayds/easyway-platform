// Structured curriculum data for Topic 3's interactive blocks — the Easy
// Way Interactive Lesson Standard v1.0 pilot. Legal content is kept out of
// the components themselves (DecisionChallenge, CompareScenes,
// DecisionSequence, HotspotScene, StagedScenario, RecapAccordion) so
// curriculum can be audited and updated here without touching UI code.
//
// Chapter grouping (student-facing nav) and REQUIRED_BLOCKS enforcement
// live in lib/topic-blocks.ts.

import type { DecisionChallengeProps } from "@/components/course/DecisionChallenge";
import type { CompareScenesProps } from "@/components/course/CompareScenes";
import type { DecisionSequenceProps } from "@/components/course/DecisionSequence";
import type { HotspotSceneProps } from "@/components/course/HotspotScene";
import type { StagedScenarioProps } from "@/components/course/StagedScenario";
import type { RecapAccordionProps } from "@/components/course/RecapAccordion";
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
  SCENE_LEFT_TURN_CAR,
  SCENE_LEFT_TURN_MOTORCYCLE,
  SCENE_DRIVEWAY,
  SCENE_T_INTERSECTION,
  SCENE_T_INTERSECTION_MISLEADING,
  SCENE_LANES_DIFFERENT,
  SCENE_PAVEMENT_DIFFERENT,
  SCENE_ROUNDABOUT_APPROACH,
  SCENE_ROUNDABOUT_CIRCULATING,
  SCENE_ROUNDABOUT_GAP,
  SCENE_ROUNDABOUT_ENTER,
  SCENE_ROUNDABOUT_NAVIGATE,
  SCENE_ROUNDABOUT_EXIT,
  SCENE_FREEWAY_ENTRY,
  SCENE_WORKZONE_FLAGGER,
  SCENE_RAILROAD_GATE,
  SCENE_RAILROAD_NO_ROOM,
  SCENE_EMERGENCY_APPROACHING,
  SCENE_EMERGENCY_STOPPED,
  SCENE_MOTORCYCLE_HAZARD,
  SCENE_PEDESTRIAN_TURN,
  SCENE_PEDESTRIAN_SIGNAL,
  SCENE_MISTAKE_SPOTTER,
  SCENE_SAFE_INTERSECTION,
} from "./topic3-scenes";

// Student-facing chapter grouping — 19 blocks are too many to list
// individually in a nav; group into 6 chapters instead.
export const TOPIC3_CHAPTERS: { title: string; blockIds: string[] }[] = [
  { title: "Who Goes First?", blockIds: ["T3-B00", "T3-B01", "T3-B02", "T3-B03"] },
  { title: "Turns, Entries & Intersections", blockIds: ["T3-B04", "T3-B05", "T3-B06", "T3-B07"] },
  { title: "Roundabouts, Highways & Work Zones", blockIds: ["T3-B08", "T3-B09", "T3-B10"] },
  { title: "Railroad & Emergency Situations", blockIds: ["T3-B11", "T3-B12"] },
  { title: "Sharing Right-of-Way", blockIds: ["T3-B13", "T3-B14", "T3-B15"] },
  { title: "Put It All Together", blockIds: ["T3-B16", "T3-B17", "T3-B18"] },
];

// Curated subset offered on the "Keep Practicing" screen — not every
// block, just the substantial replayable activities.
export const TOPIC3_PRACTICE_BLOCK_IDS = ["T3-B03", "T3-B08", "T3-B15", "T3-B11", "T3-B12", "T3-B16"];

export type Topic3Block =
  | { id: string; kind: "decision"; poi: string[]; estimatedMinutes: number; props: DecisionChallengeProps }
  | { id: string; kind: "compare"; poi: string[]; estimatedMinutes: number; props: CompareScenesProps }
  | { id: string; kind: "sequence"; poi: string[]; estimatedMinutes: number; props: DecisionSequenceProps }
  | { id: string; kind: "hotspot"; poi: string[]; estimatedMinutes: number; props: HotspotSceneProps }
  | { id: string; kind: "staged"; poi: string[]; estimatedMinutes: number; props: StagedScenarioProps }
  | { id: string; kind: "recap"; poi: string[]; estimatedMinutes: number; props: RecapAccordionProps };

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
    id: "T3-B01",
    kind: "compare",
    poi: ["4.1.3.1(A)"],
    estimatedMinutes: 3,
    props: {
      eyebrow: "What Right-of-Way Really Means",
      prompt:
        "Right-of-way is a legal system for deciding who goes first — not something to defend at all costs. Compare what the law expects with what actually keeps you safe.",
      tabs: [
        {
          label: "What's Legally Expected",
          caption:
            "Right-of-way means the lawful priority to proceed before another road user. When the rules say it's your turn, you may go.",
        },
        {
          label: "The Safest Decision",
          caption:
            "A driver may technically have the right-of-way and still need to yield anyway. If another driver starts to go when they shouldn't, slowing down and letting them pass is the safer call — even though you were \"right.\" Knowing the law helps you predict traffic; defensive driving covers you when someone else breaks it.",
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
    kind: "sequence",
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
            { text: "Red — the vehicle that stopped first.", correct: true, feedback: "At an all-way stop, arrival order controls. The first vehicle to stop normally proceeds first." },
            { text: "Blue, because it's in the through lane.", correct: false, feedback: "Lane position doesn't override arrival order at an all-way stop — the first vehicle stopped still goes first." },
            { text: "Whichever driver moves first.", correct: false, feedback: "All-way stops aren't first-to-move — they're first-to-arrive. Red stopped first and has priority." },
          ],
        },
        {
          eyebrow: "Round 2 — Arriving at the Same Time",
          prompt: "Red and Blue stop at about the same time. Red is on Blue's left. Who proceeds first?",
          visual: SCENE_STOP_SIMULTANEOUS,
          choices: [
            { text: "Red, because it's on the left side of the intersection.", correct: false, feedback: "It's the opposite — when two vehicles stop at the same time, the driver on the left yields to the vehicle on the right." },
            { text: "Blue — the vehicle on Red's right.", correct: true, feedback: "When arrival is essentially simultaneous, the driver on the left yields to the vehicle on the right. Since Red is on the left, Blue goes first." },
            { text: "Whichever vehicle is bigger.", correct: false, feedback: "Vehicle size has nothing to do with right-of-way. Apply the left-yields-to-right rule instead." },
          ],
        },
        {
          eyebrow: "Round 3 — A Left-Turning Vehicle",
          prompt: "Vehicle B wants to turn left. Does that automatically give it priority?",
          visual: SCENE_STOP_LEFT_TURN,
          choices: [
            { text: "Yes — left-turning traffic always goes first.", correct: false, feedback: "Wanting to turn left doesn't create priority. The same arrival-order and left-yields-to-right rules still apply." },
            { text: "No — the normal all-way-stop rules still apply.", correct: true, feedback: "Correct. A left turn doesn't change who has the right-of-way — it's still decided by arrival order, or by yielding to the vehicle on the right when arrival is simultaneous." },
          ],
        },
      ],
    },
  },
  {
    id: "T3-B04",
    kind: "sequence",
    poi: ["4.1.3.1(C)"],
    estimatedMinutes: 3.5,
    props: {
      ruleCardTitle: "LEFT TURNS",
      ruleCardLines: [
        "A left-turning driver yields to oncoming traffic already in or approaching the intersection.",
        "A green light or clear signal doesn't cancel that duty — it just allows the turn once the way is actually clear.",
        "Motorcycles get the same right-of-way as any other vehicle — but take an extra look before you commit to the turn.",
      ],
      rounds: [
        {
          eyebrow: "Left Turn — Oncoming Traffic",
          visual: SCENE_LEFT_TURN_CAR,
          prompt: "Your light is green and you want to turn left. An oncoming vehicle is going straight through. Can you turn now?",
          choices: [
            { text: "Yes — green means I automatically have the right-of-way.", correct: false, feedback: "A green light gives you permission to proceed when it's clear — it doesn't authorize turning directly into oncoming traffic. Legal permission plus a safe gap is what allows the turn." },
            { text: "Only when I can complete the turn legally and safely, yielding to oncoming traffic first.", correct: true, feedback: "Right. A left-turning driver yields to oncoming traffic already in or approaching the intersection. Turn once there's a safe gap — not just because the signal is green." },
            { text: "Never — oncoming traffic always has priority no matter what.", correct: false, feedback: "Not quite — you can turn left once oncoming traffic clears or a safe gap opens. The signal doesn't ban the turn; it just doesn't override yielding to traffic already there." },
          ],
        },
        {
          eyebrow: "Left Turn — An Oncoming Motorcycle",
          visual: SCENE_LEFT_TURN_MOTORCYCLE,
          prompt: "Now an oncoming motorcycle is approaching instead of a car. Does the rule change?",
          choices: [
            { text: "Yes — motorcycles don't count as oncoming traffic for this rule.", correct: false, feedback: "It doesn't change. Motorcyclists have the same right-of-way protections as any other vehicle — you still yield before turning." },
            { text: "No — the same yield-before-turning rule applies, and a motorcycle can be harder to judge for speed and distance.", correct: true, feedback: "Correct. Same rule, extra caution — a motorcycle's smaller profile makes speed and distance easier to misjudge, so look twice before turning." },
          ],
        },
      ],
    },
  },
  {
    id: "T3-B05",
    kind: "hotspot",
    poi: ["4.1.3.1(C)"],
    estimatedMinutes: 3,
    props: {
      eyebrow: "Entering From a Driveway",
      prompt: "You're leaving a shopping-center driveway onto the public road. What do you need to check before entering?",
      visual: SCENE_DRIVEWAY,
      mode: "identify-all",
      hotspots: [
        { id: "ped", label: "Pedestrian on the sidewalk", x: 51, y: 71, explanation: "A pedestrian crossing the driveway mouth has priority — check for foot traffic before you roll through the sidewalk line." },
        { id: "left", label: "Vehicle approaching from the left", x: 10, y: 76, explanation: "Traffic approaching from your left needs a clear check too — confirm it's clear or far enough away before you enter." },
        { id: "right", label: "Vehicle approaching from the right", x: 90, y: 76, explanation: "A driveway has no signal or stop sign protecting you — the full roadway, including traffic from the right, is your responsibility to clear." },
      ],
    },
  },
  {
    id: "T3-B06",
    kind: "sequence",
    poi: ["4.1.3.1(C)"],
    estimatedMinutes: 3,
    props: {
      ruleCardTitle: "T-INTERSECTIONS",
      ruleCardLines: [
        "Traffic on the continuous through roadway has the right-of-way.",
        "A driver on the road that ends at the T yields before entering.",
        "A road's width, condition, or apparent importance doesn't change this — check the actual configuration and any signs or signals.",
      ],
      rounds: [
        {
          eyebrow: "T-Intersection — Who Yields?",
          visual: SCENE_T_INTERSECTION,
          prompt: "You're on the roadway that ends at this T-intersection. Who generally has the right-of-way?",
          choices: [
            { text: "Traffic on the through roadway.", correct: true, feedback: "Right. The continuous through road keeps the right-of-way; a driver on the road that ends yields before entering." },
            { text: "Whoever arrives first.", correct: false, feedback: "Arrival order decides ties at an all-way stop — but at a plain T-intersection, the through roadway has priority regardless of who got there first." },
            { text: "Whoever is turning right.", correct: false, feedback: "Turning right doesn't create priority. The through roadway still has the right-of-way." },
          ],
        },
        {
          eyebrow: "T-Intersection — Don't Judge by Appearance",
          visual: SCENE_T_INTERSECTION_MISLEADING,
          prompt: "This time the terminating road looks wider and busier than the through road. Does that change who yields?",
          choices: [
            { text: "Yes — the wider road has priority.", correct: false, feedback: "A road's width or how busy it looks doesn't change the rule. The terminating road still yields, no matter how it appears." },
            { text: "No — the terminating road still yields, regardless of appearance.", correct: true, feedback: "Correct. Look for the actual road configuration and any traffic-control devices — not how wide or important a road looks — to know who yields." },
          ],
        },
      ],
    },
  },
  {
    id: "T3-B07",
    kind: "compare",
    poi: ["4.1.3.1(C)"],
    estimatedMinutes: 3,
    props: {
      eyebrow: "Different Lane Counts & Pavement Surfaces",
      prompt:
        "Different lane counts and different pavement don't create a special right-of-way rule of their own — the same intersection rules still apply. Compare two situations.",
      tabs: [
        {
          label: "Different Lane Counts",
          visual: SCENE_LANES_DIFFERENT,
          caption:
            "A 2-lane road meeting a 4-lane road doesn't automatically give the bigger road priority. If it's controlled, follow the sign or signal. If it's uncontrolled, the standard right-of-way rules still decide who goes — not the number of lanes.",
        },
        {
          label: "Different Pavement Surfaces",
          visual: SCENE_PAVEMENT_DIFFERENT,
          caption:
            "A paved road meeting a gravel or unpaved road works the same way — the surface itself doesn't grant right-of-way. Obey any traffic-control device, and where there isn't one, apply the standard right-of-way rules.",
        },
      ],
    },
  },
  {
    id: "T3-B08",
    kind: "staged",
    poi: ["4.1.3.1(C)"],
    estimatedMinutes: 5,
    props: {
      eyebrow: "Roundabout Interactive",
      completionTitle: "ROUNDABOUTS",
      completionLines: [
        "Yield to traffic already circulating in the roundabout before you enter.",
        "Enter only when there's an actual safe gap — signaling doesn't create one.",
        "Signal your exit and watch for pedestrians on the way out.",
      ],
      stages: [
        {
          kind: "info",
          label: "Step 1 — Approach",
          visual: SCENE_ROUNDABOUT_APPROACH,
          text: "As you approach a roundabout, slow down and get ready to yield — traffic already inside the circle has the right-of-way.",
        },
        {
          kind: "decision",
          label: "Step 2 — Identify Circulating Traffic",
          visual: SCENE_ROUNDABOUT_CIRCULATING,
          prompt: "Which traffic do you need to watch before entering?",
          choices: [
            { text: "Traffic already circulating inside the roundabout.", correct: true, feedback: "Right — circulating traffic has priority. You're watching for a safe gap in that traffic, not worrying about other approaches." },
            { text: "Traffic waiting at other entry points.", correct: false, feedback: "Other approaching drivers matter, but they're not the traffic with priority — the vehicles already circulating are what you have to yield to." },
          ],
        },
        {
          kind: "decision",
          label: "Step 3 — Find a Safe Gap",
          visual: SCENE_ROUNDABOUT_GAP,
          prompt: "Is there a safe opportunity to enter?",
          choices: [
            { text: "Yes — the near side of the circle is clear, so I can enter now.", correct: true, feedback: "Correct. Once circulating traffic is clear or far enough away, you can enter without forcing anyone to slow down." },
            { text: "It doesn't matter — I have priority once I signal.", correct: false, feedback: "Signaling doesn't create priority. You still need an actual safe gap in circulating traffic before entering." },
          ],
        },
        {
          kind: "info",
          label: "Step 4 — Enter",
          visual: SCENE_ROUNDABOUT_ENTER,
          text: "Enter in the direction of traffic flow, merging smoothly into the gap you identified.",
        },
        {
          kind: "decision",
          label: "Step 5 — Navigate",
          visual: SCENE_ROUNDABOUT_NAVIGATE,
          prompt: "While circulating, what's your main responsibility?",
          choices: [
            { text: "Stay in my lane and keep watching for pedestrians and other vehicles until my exit.", correct: true, feedback: "Right — hold your lane, keep scanning, and don't cut across other traffic to reach your exit early." },
            { text: "Speed up to clear the roundabout as fast as possible.", correct: false, feedback: "Roundabouts work best at a steady, controlled speed — rushing increases the chance of a lane-change or pedestrian conflict." },
          ],
        },
        {
          kind: "decision",
          label: "Step 6 — Exit",
          visual: SCENE_ROUNDABOUT_EXIT,
          prompt: "What should you do before exiting?",
          choices: [
            { text: "Signal your exit and check for pedestrians in the crosswalk on the way out.", correct: true, feedback: "Correct. Signal before your exit and watch for pedestrians crossing the exit leg — they may not expect a vehicle leaving the circle." },
            { text: "Nothing extra — once I'm circulating, I have the right-of-way over everyone.", correct: false, feedback: "You still owe pedestrians and cross-traffic at your exit the same care as any other intersection — circulating doesn't cancel that." },
          ],
        },
      ],
    },
  },
  {
    id: "T3-B09",
    kind: "sequence",
    poi: ["4.1.3.1(C)"],
    estimatedMinutes: 3,
    props: {
      ruleCardTitle: "FREEWAY ENTRY",
      ruleCardLines: [
        "The entering driver adjusts to merge safely into existing highway traffic, not the other way around.",
        "A turn signal communicates intent — it doesn't obligate anyone to yield or open a gap.",
        "Merge only when you have an actual safe gap, matching the flow of traffic.",
      ],
      rounds: [
        {
          eyebrow: "Freeway Entry — Who Adjusts?",
          visual: SCENE_FREEWAY_ENTRY,
          prompt: "You're entering a freeway from an on-ramp. Highway traffic is already flowing. Who has to adjust to make the merge safe?",
          choices: [
            { text: "The entering driver — merge into a gap in the existing traffic.", correct: true, feedback: "Right. Traffic already on the highway generally keeps its lane and speed; the entering driver is responsible for finding and merging into a safe gap." },
            { text: "Highway traffic must always move over for merging vehicles.", correct: false, feedback: "Highway traffic isn't obligated to make room — the entering driver has to find a safe gap and adjust speed to merge into it." },
            { text: "Whoever is going faster.", correct: false, feedback: "Speed doesn't decide this — the vehicle entering the highway is responsible for merging safely into existing traffic." },
          ],
        },
        {
          eyebrow: "Does Signaling Create Right-of-Way?",
          prompt: "You switch on your turn signal to merge. Does that mean highway traffic must immediately make space for you?",
          choices: [
            { text: "Yes — a signal means other drivers have to yield.", correct: false, feedback: "A signal only communicates your intent. It doesn't obligate anyone to open a gap — you still need to find one and merge into it safely." },
            { text: "No — a signal shows your intent, but you still have to find and use a safe gap yourself.", correct: true, feedback: "Correct. Don't force the gap — a signal is a heads-up, not a right-of-way." },
          ],
        },
      ],
    },
  },
  {
    id: "T3-B10",
    kind: "decision",
    poi: ["4.1.3.1(C)"],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Work Zone — What Controls the Situation?",
      visual: SCENE_WORKZONE_FLAGGER,
      prompt:
        "The normal lane markings suggest you should continue straight through — but a flagger is signaling STOP. Which instruction do you follow?",
      choices: [
        { text: "The lane markings — they're the permanent, official rule.", correct: false, feedback: "In a work zone, temporary traffic control overrides the normal markings. An authorized flagger's instruction is what controls right now." },
        { text: "The flagger's instruction — it overrides the normal markings in a work zone.", correct: true, feedback: "Right. Temporary traffic control — flaggers, cones, temporary signs, and lane shifts — governs a work zone, even when it contradicts the permanent pavement markings." },
        { text: "Whichever one lets me keep moving.", correct: false, feedback: "Following whichever instruction is more convenient isn't the rule — an authorized flagger's direction controls a work zone, full stop." },
      ],
    },
  },
  {
    id: "T3-B11",
    kind: "sequence",
    poi: ["4.1.3.1(C)"],
    estimatedMinutes: 3.5,
    props: {
      ruleCardTitle: "RAILROAD CROSSINGS",
      ruleCardLines: [
        "A lowered gate or active signal means stop and stay stopped — never go around it.",
        "Never enter a crossing unless you can see there's enough room to completely clear it.",
        "If traffic ahead would leave you stuck on the tracks, wait before the crossing, not on it.",
      ],
      rounds: [
        {
          eyebrow: "Railroad — Gate Down",
          visual: SCENE_RAILROAD_GATE,
          prompt: "The gate is down and lights are flashing at the crossing ahead. What do you do?",
          choices: [
            { text: "Stop and wait until the gate rises and lights stop flashing.", correct: true, feedback: "Right. A lowered gate or active signal means stop and stay stopped — no judgment calls, no gaps to guess at." },
            { text: "Go around the gate if no train is visible yet.", correct: false, feedback: "Never go around a lowered gate — trains can be closer and faster than they appear, and a gate down means stop regardless of what you can see." },
            { text: "Proceed slowly since you don't hear a train.", correct: false, feedback: "The gate and lights are the signal to stop, not your own judgment about what you can hear — wait until they clear." },
          ],
        },
        {
          eyebrow: "Railroad — No Train Visible, But No Room",
          visual: SCENE_RAILROAD_NO_ROOM,
          prompt:
            "No train is visible right now, but traffic ahead means there isn't enough room to completely clear the tracks if you cross. Should you enter the crossing?",
          choices: [
            { text: "Yes, as long as no train is coming right now.", correct: false, feedback: "Even with no train in sight, entering when you can't fully clear the tracks risks getting stuck on them. Wait before the crossing instead." },
            { text: "No — never enter a crossing unless you can completely clear it.", correct: true, feedback: "Correct. Wait until there's enough room on the other side to fully clear the tracks before you cross — being stuck on the rails is exactly what this rule prevents." },
          ],
        },
      ],
    },
  },
  {
    id: "T3-B12",
    kind: "sequence",
    poi: ["4.1.3.1(D)", "4.1.3.1(E)"],
    estimatedMinutes: 4,
    props: {
      rounds: [
        {
          eyebrow: "Situation A — Emergency Vehicle Approaching",
          visual: SCENE_EMERGENCY_APPROACHING,
          prompt: "An ambulance is approaching from behind with lights and siren active. What should you do?",
          choices: [
            { text: "Pull toward the right edge of the roadway and yield the right-of-way until it passes.", correct: true, feedback: "Right. Move as far right as safely possible and yield until the emergency vehicle has passed." },
            { text: "Speed up to clear the intersection before it catches up.", correct: false, feedback: "Speeding up puts you in its path instead of out of it — yield and let it pass instead." },
            { text: "Keep going at the same speed since it will go around you.", correct: false, feedback: "Don't assume it will maneuver around you — yield the right-of-way so it can pass safely." },
          ],
        },
        {
          eyebrow: "Situation B — Emergency Vehicle Stopped Roadside",
          visual: SCENE_EMERGENCY_STOPPED,
          prompt:
            "A police car is stopped on the shoulder with its lights on. This is a different situation from one approaching you — what does Texas's Move Over or Slow Down law require?",
          choices: [
            { text: "Move out of the lane closest to the vehicle when it's safe, or slow down as required by law if you can't change lanes.", correct: true, feedback: "Correct — that's the Move Over or Slow Down requirement for a stopped emergency, tow, utility, or TxDOT vehicle with warning lights active." },
            { text: "Nothing — this rule only applies to fire trucks.", correct: false, feedback: "It covers police, fire, ambulance, tow, utility, and TxDOT vehicles alike, all displaying the required warning signals." },
            { text: "Just honk to let them know you see them.", correct: false, feedback: "A horn doesn't satisfy the legal requirement — you need to actually move over a lane when safe, or slow down as the law requires." },
          ],
        },
      ],
    },
  },
  {
    id: "T3-B13",
    kind: "decision",
    poi: ["4.1.3.1(A)"],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Motorcycle Left-Turn Hazard",
      visual: SCENE_MOTORCYCLE_HAZARD,
      prompt: "You're waiting to turn left. A motorcycle is approaching from the opposite direction. Would you make the turn now?",
      choices: [
        {
          text: "Yes — it's small and far enough away.",
          correct: false,
          feedback:
            "A motorcycle's smaller profile makes speed and distance genuinely harder to judge — \"it looks far away\" is exactly the misjudgment that causes left-turn crashes with motorcyclists. Look again before committing.",
        },
        {
          text: "Look, look again, and turn only once you're sure it's actually safe.",
          correct: true,
          feedback:
            "Right. Motorcyclists get the same right-of-way protections as any other vehicle, but their size makes them easy to misjudge — a second look is the habit that prevents this exact crash.",
        },
      ],
    },
  },
  {
    id: "T3-B14",
    kind: "sequence",
    poi: ["4.1.3.1(D)"],
    estimatedMinutes: 3.5,
    props: {
      ruleCardTitle: "PEDESTRIANS",
      ruleCardLines: [
        "A driver must yield to a pedestrian lawfully in a crosswalk, marked or unmarked.",
        "A green light or the right-of-way in other respects doesn't cancel that duty.",
        "Pedestrians have responsibilities too — but when one is already in your path, yield until they're clear.",
      ],
      rounds: [
        {
          eyebrow: "Pedestrian — Turning Right",
          visual: SCENE_PEDESTRIAN_TURN,
          prompt: "You're turning right and a pedestrian is lawfully crossing in the crosswalk you're turning into. What should you do?",
          choices: [
            { text: "Complete the turn quickly before they reach your path.", correct: false, feedback: "Racing a pedestrian to the spot is exactly the risk this rule exists to prevent — wait instead." },
            { text: "Yield until the pedestrian has cleared your path, then complete the turn.", correct: true, feedback: "Right. A driver must yield to a pedestrian lawfully in the crosswalk — complete the turn only once their path is clear." },
            { text: "Proceed since you have a green light.", correct: false, feedback: "A green light doesn't cancel your duty to yield to a pedestrian already in the crosswalk." },
          ],
        },
        {
          eyebrow: "Pedestrian — Signal and Crosswalk",
          visual: SCENE_PEDESTRIAN_SIGNAL,
          prompt: "At a signalized intersection, the walk signal is on and a pedestrian has started crossing. Does your green light change anything?",
          choices: [
            { text: "No — you still yield to the pedestrian already in the crosswalk.", correct: true, feedback: "Correct. A driver's green light doesn't override a pedestrian's lawful use of the crosswalk — yield until they're clear." },
            { text: "Yes — your green light means you go first.", correct: false, feedback: "A green light for you doesn't cancel a pedestrian's right to finish crossing once they've lawfully entered the crosswalk." },
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
  {
    id: "T3-B16",
    kind: "hotspot",
    poi: ["4.1.3.1(F)", "4.1.3.1(G)"],
    estimatedMinutes: 3,
    props: {
      eyebrow: "Right-of-Way Mistake Spotter",
      prompt: "Look at this intersection. Which road user is about to make the dangerous right-of-way mistake?",
      visual: SCENE_MISTAKE_SPOTTER,
      mode: "pick-one",
      wrongPickFeedback: "That road user isn't the one making the mistake here — look for who's turning or entering without yielding.",
      hotspots: [
        { id: "car1", label: "Car 1", x: 28, y: 50, explanation: "Car 1 is proceeding normally.", isTarget: false },
        {
          id: "car2",
          label: "Car 2 — turning left, accelerating",
          x: 55,
          y: 81,
          explanation:
            "Car 2 is turning left while accelerating instead of yielding to oncoming or cross traffic — that's the right-of-way mistake. Rule: a left-turning driver yields to traffic already in or approaching the intersection. The defensive response for everyone else: expect it, and be ready to brake even though the legal fault is Car 2's.",
          isTarget: true,
        },
        { id: "ped", label: "Pedestrian", x: 38, y: 40, explanation: "The pedestrian isn't the one making a right-of-way mistake here.", isTarget: false },
        { id: "moto", label: "Motorcycle", x: 65, y: 48, explanation: "The motorcycle is proceeding normally — not the mistake here.", isTarget: false },
      ],
    },
  },
  {
    id: "T3-B17",
    kind: "staged",
    poi: ["4.1.3.1(F)", "4.1.3.1(G)"],
    estimatedMinutes: 4,
    props: {
      eyebrow: "Easy Way SAFE Decision Challenge",
      completionTitle: "S.A.F.E.",
      completionLines: [
        "SEE: actively scan the whole scene, not just the car ahead.",
        "ANTICIPATE: expect the realistic mistake another road user might make.",
        "FIND SPACE: keep enough margin to respond if it happens.",
        "EXECUTE SAFELY: apply what you saw — don't just react.",
        "SAFE is an Easy Way teaching framework, not Texas law or a TDLR/DPS term.",
      ],
      stages: [
        {
          kind: "decision",
          label: "S — SEE",
          visual: SCENE_SAFE_INTERSECTION,
          prompt: "You're approaching a busy intersection. What should you actively be scanning for first?",
          choices: [
            { text: "Other vehicles, a pedestrian at the corner, and any traffic-control devices.", correct: true, feedback: "Right — SEE means actively scanning the whole scene: vehicles, vulnerable road users, and controls, not just the car in front of you." },
            { text: "Just the vehicle directly ahead of me.", correct: false, feedback: "Only watching the car ahead misses the pedestrian and cross traffic that actually decide what happens next — scan the whole scene." },
          ],
        },
        {
          kind: "decision",
          label: "A — ANTICIPATE",
          prompt: "What could another road user in this scene realistically do that would affect you?",
          choices: [
            { text: "The pedestrian could step into the crosswalk, or cross traffic could pull out before it's clear.", correct: true, feedback: "Right — anticipating means expecting the realistic mistakes other road users might make, before they happen." },
            { text: "Nothing — everyone else will follow the rules perfectly.", correct: false, feedback: "Assuming everyone else drives perfectly is exactly what ANTICIPATE guards against — plan for the realistic mistake, not the ideal case." },
          ],
        },
        {
          kind: "decision",
          label: "F — FIND SPACE",
          prompt: "Where's your safety margin if someone else makes that mistake?",
          choices: [
            { text: "Enough following and side distance to brake or adjust without a collision.", correct: true, feedback: "Right — finding space means keeping enough margin that someone else's mistake doesn't become your crash." },
            { text: "I don't need extra space if I'm following the rules myself.", correct: false, feedback: "Following the rules yourself doesn't protect you from someone else's mistake — that's exactly what margin is for." },
          ],
        },
        {
          kind: "decision",
          label: "E — EXECUTE SAFELY",
          prompt: "Given all of that, what's your best action through this intersection?",
          choices: [
            { text: "Proceed at a controlled speed, ready to yield or stop if the pedestrian or cross traffic moves unexpectedly.", correct: true, feedback: "Right — executing safely means actually applying what you saw, anticipated, and made space for, not just driving on autopilot." },
            { text: "Speed up to clear the intersection before anything can happen.", correct: false, feedback: "Speeding up removes your margin right when you might need it most — controlled and ready beats fast and committed." },
          ],
        },
      ],
    },
  },
  {
    id: "T3-B18",
    kind: "recap",
    poi: ["All Topic 3 review"],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Topic 3 Recap",
      prompt: "Tap each section for a quick review before the quiz.",
      sections: [
        {
          title: "Intersections",
          points: [
            "Controlled intersections: obey the sign, signal, or device.",
            "Uncontrolled intersections: yield to the vehicle on your right when arrival is about the same time.",
            "All-way stops: first to stop goes first; if simultaneous, left yields to right.",
            "T-intersections: the terminating road yields to the through road, regardless of appearance.",
          ],
        },
        {
          title: "Turns & Entries",
          points: [
            "Left turns: yield to oncoming traffic already in or approaching the intersection.",
            "Entering from a driveway: check pedestrians and traffic from both directions — nothing protects you automatically.",
            "A green light or turn signal doesn't cancel your duty to yield.",
          ],
        },
        {
          title: "Roundabouts & Merging",
          points: [
            "Yield to traffic already circulating before you enter.",
            "Enter only with an actual safe gap — signaling doesn't create one.",
            "Entering highway traffic must merge into existing traffic, not the other way around.",
          ],
        },
        {
          title: "Railroad Crossings",
          points: [
            "A lowered gate or active signal means stop and stay stopped.",
            "Never enter a crossing unless you can completely clear it.",
          ],
        },
        {
          title: "Emergency Vehicles",
          points: [
            "An approaching emergency vehicle: yield and move right until it passes.",
            "A stopped emergency/service vehicle with lights on: move over a lane when safe, or slow down as the law requires.",
          ],
        },
        {
          title: "School Buses, Pedestrians & Motorcyclists",
          points: [
            "School bus stop arm: both directions stop, except across a physical median.",
            "Pedestrians lawfully in a crosswalk: yield until they're clear — not an unconditional \"always.\"",
            "Motorcyclists get the same right-of-way protections — look twice before turning.",
          ],
        },
      ],
    },
  },
];
