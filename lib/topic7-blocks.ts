// Structured curriculum data for Topic 7's interactive blocks —
// Cooperating with Other Roadway Users, built on the Easy Way Interactive
// Lesson Standard used for Topics 3-6.
//
// Every legal claim below (crash-scene duties, Good Samaritan protection,
// bicycle law, safety belts, safety chains, work-zone penalties, the
// Texas Driving with Disabilities Program) was verified against the
// current Texas Transportation Code, Civil Practice & Remedies Code, and
// TDLR's own live curriculum-resources page before writing — see the
// Topic 7 audit report for exact sources. The Community Safety Education
// Act video is TDLR's actual official "Flashing Lights" video, embedded
// directly (youtu.be/wn9NegqFqlk, confirmed against TDLR's current page),
// not a summary or substitute.
//
// POI note: every block is tagged with the topic-level POI code "4.1.7"
// rather than invented letter subsections. Metadata only, never shown to
// students.

import type { DecisionChallengeProps } from "@/components/course/DecisionChallenge";
import type { CompareScenesProps } from "@/components/course/CompareScenes";
import type { DecisionSequenceProps } from "@/components/course/DecisionSequence";
import type { HotspotSceneProps } from "@/components/course/HotspotScene";
import type { StagedScenarioProps } from "@/components/course/StagedScenario";
import type { RecapAccordionProps } from "@/components/course/RecapAccordion";
import type { LessonScreenProps } from "@/components/course/LessonScreen";
import type { VideoLessonProps } from "@/components/course/VideoLesson";
import {
  SCENE_T7_OPENING,
  SCENE_CAT_MOTOR,
  SCENE_CAT_VULNERABLE,
  SCENE_VULN_CAR,
  SCENE_VULN_MOTO,
  SCENE_VULN_PED,
  SCENE_MOTO_MIRROR,
  SCENE_MOTO_DISTANCE,
  SCENE_BICYCLE_SQUEEZE,
  SCENE_BICYCLE_CLEAR,
  SCENE_PEDESTRIAN_TURN,
  SCENE_VULN_MISTAKE_1,
  SCENE_TRUCK_BLINDAREA,
  SCENE_WIDE_TURN,
  SCENE_PASS_TRUCK,
  SCENE_SLOW_HORSE_RAIL,
  SCENE_CRASH_SCENE,
  SCENE_TRAFFIC_STOP,
  SCENE_RESTRAINTS,
  SCENE_TOWING_CHAINS,
  SCENE_TOWING_DYNAMICS,
  SCENE_CO_OUTDOOR,
  SCENE_CO_GARAGE,
  SCENE_WORKZONE_LAB,
  SCENE_WORKZONE_FOLLOW,
  SCENE_WORKZONE_PASS,
  SCENE_WZ_ADVANCE,
  SCENE_WZ_CLOSURE,
  SCENE_WZ_FLAGGER,
  SCENE_WZ_WORKERS,
  SCENE_WZ_BACKUP,
  SCENE_WZ_EXIT,
  SCENE_DISABILITIES_ID,
  SCENE_COOPERATION_INTEGRATED,
  SCENE_ROADWAY_MISTAKE_2,
} from "./topic7-scenes";

const POI = "4.1.7";

export const TOPIC7_CHAPTERS: { title: string; blockIds: string[] }[] = [
  { title: "Sharing the Road", blockIds: ["T7-L00", "T7-B00", "T7-L01", "T7-B01", "T7-B02"] },
  { title: "Vulnerable Road Users", blockIds: ["T7-L02", "T7-B03", "T7-B04", "T7-B05", "T7-B06", "T7-B07"] },
  { title: "Large & Unusual Roadway Users", blockIds: ["T7-L03", "T7-B08", "T7-B09", "T7-B10", "T7-B11"] },
  {
    title: "Crashes, Law Enforcement & Community Safety",
    blockIds: ["T7-L04", "T7-B12", "T7-B13", "T7-L05", "T7-B14", "T7-B15", "T7-B16"],
  },
  {
    title: "People, Passengers & Vehicle Responsibilities",
    blockIds: ["T7-L06", "T7-B17", "T7-B18", "T7-B19", "T7-L07", "T7-B20", "T7-B21", "T7-B22"],
  },
  {
    title: "Work Zones & Communication",
    blockIds: ["T7-L08", "T7-B23", "T7-B24", "T7-B25", "T7-B26", "T7-L09", "T7-B27", "T7-B28", "T7-B29", "T7-B30"],
  },
];

export const TOPIC7_PRACTICE_BLOCK_IDS = ["T7-B05", "T7-B08", "T7-B15", "T7-B22", "T7-B26", "T7-B28"];

export type Topic7Block =
  | { id: string; kind: "decision"; poi: string[]; estimatedMinutes: number; props: DecisionChallengeProps }
  | { id: string; kind: "compare"; poi: string[]; estimatedMinutes: number; props: CompareScenesProps }
  | { id: string; kind: "sequence"; poi: string[]; estimatedMinutes: number; props: DecisionSequenceProps }
  | { id: string; kind: "hotspot"; poi: string[]; estimatedMinutes: number; props: HotspotSceneProps }
  | { id: string; kind: "staged"; poi: string[]; estimatedMinutes: number; props: StagedScenarioProps }
  | { id: string; kind: "recap"; poi: string[]; estimatedMinutes: number; props: RecapAccordionProps }
  | { id: string; kind: "learn"; poi: string[]; estimatedMinutes: number; props: LessonScreenProps }
  | { id: string; kind: "video"; poi: string[]; estimatedMinutes: number; props: VideoLessonProps };

export const TOPIC7_BLOCKS: Topic7Block[] = [
  // ============================================================
  // Chapter 1 — Sharing the Road
  // ============================================================
  {
    id: "T7-L00",
    kind: "learn",
    poi: ["Topic 7 introduction"],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Topic 7 — Cooperating with Other Roadway Users",
      title: "The Road Belongs to More Than Cars",
      previewPoints: [
        "Share the road with vulnerable users, motorcycles, and bicycles",
        "Understand large-truck blind spots and turning needs",
        "Respond safely after a crash and during a traffic stop",
        "Understand the Community Safety Education Act",
        "Avoid aggressive-driving conflicts and drive responsibly with passengers and cargo",
        "Navigate work zones and understand the Texas Driving with Disabilities Program",
      ],
      sections: [
        {
          heading: "I Do Not Drive Alone",
          body: [
            "A motorcycle can disappear into a blind spot. A large truck may need much more room to turn. A pedestrian has no vehicle around them for protection. A road worker may be only a few feet from moving traffic. Every road user has different visibility, stopping ability, maneuverability, protection, and communication needs — safe driving means adjusting to those differences.",
          ],
        },
      ],
      ruleCard: {
        title: "EASY WAY PRINCIPLE",
        lines: ["NOTICE THE DIFFERENCE", "CREATE SPACE", "COMMUNICATE", "COOPERATE"],
      },
    },
  },
  {
    id: "T7-B00",
    kind: "hotspot",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Opening Roadway Scan",
      prompt: "Who on this roadway needs your attention right now? Tap everyone you can spot.",
      visual: SCENE_T7_OPENING,
      mode: "identify-all",
      hotspots: [
        { id: "moto", label: "Motorcycle", x: 52, y: 92, explanation: "Smaller visual profile — easy to misjudge speed and distance." },
        { id: "bike", label: "Bicycle", x: 75, y: 69, explanation: "Smaller and more vulnerable in a collision." },
        { id: "ped", label: "Pedestrian", x: 22, y: 46, explanation: "No vehicle structure for protection." },
        { id: "truck", label: "Truck", x: 58, y: 15, explanation: "Large blind areas and different turning/stopping characteristics." },
        { id: "worker", label: "Worker", x: 85, y: 46, explanation: "May be operating only feet from moving traffic." },
        { id: "slow", label: "Slow-moving vehicle", x: 37, y: 23, explanation: "Moves well below the speed of surrounding traffic." },
      ],
    },
  },
  {
    id: "T7-L01",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Chapter 1 — What You'll Learn",
      title: "Categorizing Roadway Users",
      previewPoints: [
        "The rough categories roadway users fall into, and why it helps to think this way",
      ],
      sections: [
        {
          heading: "Motor Vehicles",
          body: [
            "Passenger cars, motorcycles, trucks, buses, slow-moving vehicles, and oversized vehicles are all motor vehicles — but they don't all see, turn, stop, or accelerate the same way.",
          ],
        },
        {
          heading: "Vulnerable Roadway Users",
          body: [
            "In this course, we'll group pedestrians, bicyclists, motorcyclists, roadway workers, and horseback riders together because they may require additional attention and space — they generally have far less physical protection than someone inside a car.",
          ],
        },
        {
          heading: "Special Operating Environments",
          body: [
            "Light rail, construction zones, and emergency scenes each change what's normal about a roadway — a category helps you predict what kind of space, visibility, or cooperation may be needed before you're already in the middle of it.",
          ],
        },
      ],
    },
  },
  {
    id: "T7-B01",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Defensive Cooperation",
      prompt: "A defensive driver doesn't rely only on what another road user should do. Which approach reflects real defensive cooperation?",
      choices: [
        { text: "Assume everyone else will follow the rules perfectly, and react only if they don't.", correct: false, feedback: "Waiting to react is exactly what defensive driving guards against — a defensive driver anticipates instead." },
        { text: "Observe who's around you, anticipate what could happen, create space, and be ready to adjust.", correct: true, feedback: "Right. This is the Easy Way SAFE framework applied to cooperation: SEE who's around you, ANTICIPATE what could happen, FIND SPACE for your margin, EXECUTE SAFELY when something changes." },
      ],
    },
  },
  {
    id: "T7-B02",
    kind: "compare",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Vulnerability Comparison",
      prompt: "The same driving error can create very different consequences depending on who's involved. Compare three road users.",
      tabs: [
        { label: "Passenger Vehicle", visual: SCENE_VULN_CAR, caption: "A vehicle structure, airbags, and crumple zones absorb much of a collision's force." },
        { label: "Motorcyclist", visual: SCENE_VULN_MOTO, caption: "A motorcyclist has far less physical protection than someone inside a car." },
        { label: "Pedestrian / Bicyclist", visual: SCENE_VULN_PED, caption: "No vehicle structure at all — the goal isn't ranking whose safety matters more, it's understanding why extra caution is warranted around them." },
      ],
    },
  },

  // ============================================================
  // Chapter 2 — Vulnerable Road Users
  // ============================================================
  {
    id: "T7-L02",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 3.5,
    props: {
      eyebrow: "Chapter 2 — What You'll Learn",
      title: "Motorcycles, Bicycles & Pedestrians",
      previewPoints: [
        "Why motorcycles are easy to misjudge, and how to check for them",
        "How to share the road with bicyclists",
        "Where pedestrian conflicts actually happen",
      ],
      sections: [
        {
          heading: "Motorcycles: How Do I Safely Share the Road?",
          body: [
            "Motorcycles are vehicles, but they're not visually identical to passenger cars — a smaller profile can affect how you perceive their speed and distance. Actively look for them, check your blind spots before changing lanes, and don't assume a whole lane is available just because a motorcycle only occupies part of its width.",
          ],
        },
        {
          heading: "Bicyclists: Legitimate Roadway Users",
          body: [
            "Bicyclists are legitimate roadway users entitled to appropriate clearance when passed. Texas doesn't set a specific statewide passing-distance number — some cities have their own local ordinances — but the underlying duty is the same: pass only when it can be done safely and legally, watch for bicycle movement at intersections and turns, and watch for a suddenly-opened vehicle door near parked cars.",
          ],
        },
        {
          heading: "Pedestrians: Not Just \"Right-of-Way\"",
          body: [
            "Pedestrian conflicts aren't only about crosswalks — they show up at turns, driveways, and low-visibility situations where a pedestrian's path crosses a driver's turning path. Don't focus only on traffic moving the same direction as your vehicle; check for people entering or near the roadway from any direction.",
          ],
        },
      ],
      instructorTip: "Look once for traffic. Look again for smaller roadway users.",
    },
  },
  {
    id: "T7-B03",
    kind: "hotspot",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Motorcycle Mirror Check",
      prompt: "Your mirror looks clear. Should you begin the lane change now? Tap the one location where a vehicle could still be hiding.",
      visual: SCENE_MOTO_MIRROR,
      mode: "pick-one",
      wrongPickFeedback: "Look for where a motorcycle could be hiding from your mirrors, not from your direct forward view.",
      hotspots: [
        { id: "ahead", label: "Directly ahead", x: 25, y: 40, explanation: "Your windshield already covers this — not where something would be hidden." },
        { id: "blindspot", label: "Blind spot", x: 65, y: 50, explanation: "Not until the appropriate checks confirm this space is clear — a mirror looking clear doesn't mean the blind spot actually is.", isTarget: true },
        { id: "farback", label: "Far behind", x: 90, y: 85, explanation: "Your rearview mirror already covers traffic well behind you." },
      ],
    },
  },
  {
    id: "T7-B04",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Motorcycle Perception Challenge",
      visual: SCENE_MOTO_DISTANCE,
      prompt: "A motorcycle and a passenger vehicle are at a comparable roadway position. Why might the motorcycle be easier to misjudge?",
      choices: [
        { text: "A smaller visual profile makes speed and distance genuinely harder to judge at a glance.", correct: true, feedback: "Right. This isn't about the motorcyclist doing anything wrong — a smaller object is simply harder for the human eye to judge speed and distance from." },
        { text: "Motorcycles are required to travel slower than other traffic.", correct: false, feedback: "Motorcycles aren't required to travel slower — the misjudgment risk comes from visual perception, not an actual speed difference." },
      ],
    },
  },
  {
    id: "T7-B05",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      rounds: [
        {
          eyebrow: "Bicycle Passing — Limited Space",
          visual: SCENE_BICYCLE_SQUEEZE,
          prompt: "A bicyclist is ahead, the line is solid, and oncoming traffic is close. The bicyclist is moving slowly. Should you squeeze past?",
          choices: [
            { text: "No — wait until the pass can be completed safely and legally.", correct: true, feedback: "Right. The bicyclist moving slowly isn't a reason to force a pass that isn't currently safe or legal." },
            { text: "Yes — a slow bicyclist justifies a quick squeeze past.", correct: false, feedback: "Slow speed doesn't create a safe passing opportunity — the solid line and oncoming traffic still control." },
          ],
        },
        {
          eyebrow: "Bicycle Passing — Conditions Change",
          visual: SCENE_BICYCLE_CLEAR,
          prompt: "A moment later, the oncoming traffic has cleared. Does that change the decision?",
          choices: [
            { text: "Yes — now that it can be done safely, the pass is appropriate.", correct: true, feedback: "Right. The situation changed, so the decision changes with it — this is exactly why waiting mattered a moment ago." },
            { text: "No — once you've decided to wait, you should keep waiting regardless.", correct: false, feedback: "Conditions changing is exactly what should update your decision — waiting was correct when it was unsafe, and passing is fine once it's actually safe." },
          ],
        },
      ],
    },
  },
  {
    id: "T7-B06",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Pedestrian Turning Conflict",
      visual: SCENE_PEDESTRIAN_TURN,
      prompt: "You're turning, and a pedestrian's crossing path intersects your turning path. What should guide your decision?",
      choices: [
        { text: "Only traffic moving in the same direction as you.", correct: false, feedback: "Focusing only on same-direction traffic misses the pedestrian conflict that's actually in front of you." },
        { text: "Every conflict your turning path creates, including a pedestrian crossing your path.", correct: true, feedback: "Right. A turn can create a conflict with a pedestrian even when no other vehicle is involved at all." },
      ],
    },
  },
  {
    id: "T7-B07",
    kind: "hotspot",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Vulnerable-User Mistake Spotter",
      prompt: "Which conflict should the driver address first?",
      visual: SCENE_VULN_MISTAKE_1,
      mode: "pick-one",
      wrongPickFeedback: "Consider which hazard is closest to becoming a collision right now.",
      hotspots: [
        { id: "moto", label: "Motorcycle in blind spot", x: 52, y: 77, explanation: "Real, but not the most immediate — this driver isn't actively changing lanes into it right now." },
        {
          id: "bike",
          label: "Bicyclist being approached too closely",
          x: 75,
          y: 50,
          explanation: "This is happening right now — closing space on a bicyclist is the most immediate conflict to address.",
          isTarget: true,
        },
        { id: "ped", label: "Pedestrian at driveway", x: 22, y: 23, explanation: "Worth watching, but not yet in the vehicle's path." },
      ],
    },
  },

  // ============================================================
  // Chapter 3 — Large & Unusual Roadway Users
  // ============================================================
  {
    id: "T7-L03",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 3.5,
    props: {
      eyebrow: "Chapter 3 — What You'll Learn",
      title: "Large, Slow & Unusual Roadway Users",
      previewPoints: [
        "Why large vehicles don't see, turn, or stop like passenger cars",
        "How to recognize and respond to oversize/overweight loads",
        "How to share the road with slow-moving vehicles, horseback riders, and light rail",
      ],
      sections: [
        {
          heading: "Large Trucks",
          body: [
            "Large vehicles have substantial blind areas, need longer stopping distances, and require wide turns. Maintain visibility, and avoid lingering beside a large vehicle longer than necessary.",
          ],
        },
        {
          heading: "Oversize / Overweight Vehicles",
          body: [
            "An oversize or overweight load takes up unusual width or length and leaves less available lane space around it — sometimes with an escort vehicle providing instructions. Give extra following margin, pass only when it's actually safe, and follow any temporary or escort instructions you're given.",
          ],
        },
        {
          heading: "Slow-Moving Vehicles",
          body: [
            "Farm equipment and other slow-moving vehicles travel well below normal traffic speed — some display a reflective slow-moving-vehicle emblem. A slow speed doesn't make an unsafe pass acceptable; the passing conditions still have to be safe and legal on their own.",
          ],
        },
        {
          heading: "Horseback & Horse-Drawn Users",
          body: [
            "A horse can behave less predictably than a motor vehicle. Avoid unnecessary noise or sudden movement, give appropriate room, and pass only when it's safe.",
          ],
        },
        {
          heading: "Light Rail",
          body: [
            "Never stop where your vehicle could interfere with light rail movement, watch for tracks and turning conflicts, and obey the traffic controls specific to the crossing.",
          ],
        },
      ],
    },
  },
  {
    id: "T7-B08",
    kind: "hotspot",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Truck Blind-Area Visualizer",
      prompt: "Tap the position where the truck driver can NOT see you.",
      visual: SCENE_TRUCK_BLINDAREA,
      mode: "pick-one",
      wrongPickFeedback: "If you can see the truck driver's mirror, they can generally see you — look for the position where that's not true.",
      hotspots: [
        { id: "cab", label: "Beside the cab", x: 15, y: 40, explanation: "Generally visible to the truck driver here." },
        { id: "behind", label: "Directly behind", x: 45, y: 78, explanation: "This position has limited direct visibility too, but the trailer-side position is the clearest blind area." },
        { id: "trailer", label: "Beside the trailer", x: 45, y: 12, explanation: "A rule of thumb: if you can't see the truck driver in their side mirror, they can't see you — this is exactly that position.", isTarget: true },
      ],
    },
  },
  {
    id: "T7-B09",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Wide-Turn Challenge",
      visual: SCENE_WIDE_TURN,
      prompt: "A truck is turning right and swings wide to complete it. A car tries to squeeze into the space between the truck and the curb. Safe or unsafe?",
      choices: [
        { text: "Safe — the space looks open.", correct: false, feedback: "Large vehicles may need that additional space specifically to complete the turn — what looks open can close as the trailer swings through." },
        { text: "Unsafe — large vehicles may require additional turning room.", correct: true, feedback: "Right. Don't pass between a turning truck and the curb — the space it appears to leave open may be exactly what it needs to complete the turn." },
      ],
    },
  },
  {
    id: "T7-B10",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Passing Large Vehicles",
      visual: SCENE_PASS_TRUCK,
      prompt: "You're passing a truck. When is it appropriate to return to your lane?",
      choices: [
        { text: "As soon as you can see the truck's cab in your mirror after passing.", correct: true, feedback: "Right. Once you can see the truck's cab in your mirror, you have enough clearance to move back over — don't cut in immediately after barely clearing the front of it." },
        { text: "Immediately after your vehicle is even with the front of the truck.", correct: false, feedback: "That's too soon — cutting in right after barely clearing the truck doesn't leave the truck driver adequate following space." },
      ],
    },
  },
  {
    id: "T7-B11",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      rounds: [
        {
          eyebrow: "Slow-Moving Vehicle",
          visual: SCENE_SLOW_HORSE_RAIL,
          prompt: "A slow-moving vehicle is ahead and the road isn't safe for passing right now. Does the slow speed itself make an unsafe pass acceptable?",
          choices: [
            { text: "No — the passing conditions still have to be safe and legal on their own.", correct: true, feedback: "Right. Slow speed doesn't override the normal passing rules." },
            { text: "Yes — a slow enough vehicle justifies passing regardless of conditions.", correct: false, feedback: "Speed alone never makes an otherwise-unsafe pass acceptable." },
          ],
        },
        {
          eyebrow: "Horseback Rider",
          prompt: "You're approaching a horseback rider from behind. What's the appropriate response?",
          choices: [
            { text: "Reduce noise and sudden movement, give appropriate room, and pass only when safe.", correct: true, feedback: "Right. A horse can react less predictably than a vehicle — reducing startling behavior and giving room reduces that risk." },
            { text: "Pass quickly to get the interaction over with.", correct: false, feedback: "A quick, close pass is more likely to startle the horse — reduce speed and noise instead." },
          ],
        },
        {
          eyebrow: "Light Rail",
          prompt: "Traffic ahead is backed up near a light rail crossing. Is it acceptable to stop your vehicle on the tracks while waiting?",
          choices: [
            { text: "No — never stop where your vehicle could interfere with rail movement.", correct: true, feedback: "Right. Wait until there's room to fully clear the tracks before entering, the same principle as a railroad crossing." },
            { text: "Yes, as long as you move once the train approaches.", correct: false, feedback: "A train can't stop or maneuver around you — never plan to be on the tracks and move later." },
          ],
        },
      ],
    },
  },

  // ============================================================
  // Chapter 4 — Crashes, Law Enforcement & Community Safety
  // ============================================================
  {
    id: "T7-L04",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 3,
    props: {
      eyebrow: "Chapter 4 — What You'll Learn",
      title: "After a Traffic Crash",
      previewPoints: [
        "What Texas law actually requires at a crash scene",
        "Why that's a different, separate question from Good Samaritan protection",
      ],
      sections: [
        {
          heading: "Crash-Scene Duties Are Required, Not Optional",
          body: [
            "If you're involved in a collision that results in — or is reasonably likely to result in — injury or death, Texas law requires you to stop at the scene (or as close as possible), determine whether anyone needs aid, and remain until you've provided the required information and assistance (Transportation Code §550.021, §550.023). Failing to do so is its own offense, with penalties that escalate from a Class C misdemeanor up to a second-degree felony depending on the outcome.",
          ],
        },
        {
          heading: "Good Samaritan Protection Is a Separate, Different Law",
          body: [
            "Good Samaritan protection (Civil Practice & Remedies Code §74.151) is about what happens if you choose to render aid: a person who in good faith administers emergency care at the scene isn't liable in civil damages for that assistance, unless the act is willfully or wantonly negligent. It doesn't cover someone acting for pay, or someone who regularly provides that kind of care in the ordinary course of their job — and it only protects against civil liability, not criminal conduct. \"If I help, I can never be sued\" is too absolute — the real protection is narrower and conditional.",
          ],
        },
      ],
    },
  },
  {
    id: "T7-B12",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Good Samaritan Scenario",
      prompt: "You stop to help at a crash and provide reasonable aid in good faith. Are you automatically protected from ever being sued, no matter what?",
      choices: [
        { text: "Yes — Good Samaritan protection is absolute.", correct: false, feedback: "That's too absolute. The protection doesn't apply if your action is willfully or wantonly negligent, or if you're acting for pay or as part of your regular job." },
        { text: "No — the protection is real but has real conditions and limits.", correct: true, feedback: "Right. Good Samaritan protection covers good-faith emergency care, but it's not unconditional." },
      ],
    },
  },
  {
    id: "T7-B13",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      ruleCardTitle: "AT A CRASH SCENE",
      ruleCardLines: [
        "Don't create additional danger.",
        "Summon appropriate emergency assistance.",
        "Provide reasonable assistance within your ability.",
        "This is safe prioritization, not medical training.",
      ],
      rounds: [
        {
          eyebrow: "Crash-Scene Decision — First Priority",
          visual: SCENE_CRASH_SCENE,
          prompt: "A collision has just happened ahead of you. What's your first priority?",
          choices: [
            { text: "Avoid creating additional roadway danger, and get emergency assistance moving.", correct: true, feedback: "Right. Preventing a second collision and getting real help on the way come before anything else you personally attempt." },
            { text: "Move directly into live traffic to reach the vehicles as fast as possible.", correct: false, feedback: "Moving into live traffic without regard for your own safety can create a second hazard instead of helping the first one." },
          ],
        },
        {
          eyebrow: "Crash-Scene Decision — Providing Help",
          prompt: "Once the scene is reasonably safe, what should your assistance look like?",
          choices: [
            { text: "Reasonable assistance within your actual ability — not attempting medical procedures beyond it.", correct: true, feedback: "Right. This course isn't medical training — provide what reasonable help you actually can, and let arriving responders handle the rest." },
            { text: "Attempt any medical procedure necessary, regardless of your training.", correct: false, feedback: "Attempting procedures beyond your ability can make things worse — reasonable help within your actual ability is the right standard." },
          ],
        },
      ],
    },
  },
  {
    id: "T7-L05",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Chapter 4 — Law-Enforcement Traffic Stop",
      title: "A Stop Is Easier When Both Sides Know What to Expect",
      previewPoints: [
        "What to do the moment you're signaled to stop",
        "What to do once the officer approaches",
      ],
      sections: [
        {
          heading: "When You're Signaled to Stop",
          body: [
            "Acknowledge the signal, and move to a safe, appropriate location to stop — not a dangerous travel lane, and not by continuing indefinitely hoping the officer gives up. Stay in the vehicle unless instructed otherwise.",
          ],
        },
        {
          heading: "When the Officer Approaches",
          body: [
            "Keep your hands visible, follow lawful instructions, and communicate before reaching for documents — telling the officer what you're about to do before you do it reduces confusion for both of you.",
          ],
        },
      ],
    },
  },
  {
    id: "T7-B14",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      rounds: [
        {
          eyebrow: "Traffic Stop — The Signal",
          visual: SCENE_TRAFFIC_STOP,
          prompt: "An officer activates emergency lights behind you. What should you do?",
          choices: [
            { text: "Stop immediately, wherever you happen to be, even in a live traffic lane.", correct: false, feedback: "Stopping in a dangerous travel lane creates a new hazard — acknowledge and move to safety instead." },
            { text: "Signal or acknowledge, then move to a safe, appropriate location to stop.", correct: true, feedback: "Right. Acknowledging the stop and choosing a safer stopping location protects both you and the officer." },
          ],
        },
        {
          eyebrow: "Traffic Stop — The Officer Approaches",
          prompt: "The officer is approaching your vehicle. What should you do with your hands?",
          choices: [
            { text: "Keep them visible.", correct: true, feedback: "Right. Visible hands reduce uncertainty for everyone during the stop." },
            { text: "Immediately start searching for your documents.", correct: false, feedback: "Communicate before reaching for anything — announce what you're doing before you do it." },
          ],
        },
        {
          eyebrow: "Traffic Stop — Documents",
          prompt: "The officer asks for your license and insurance. What's the appropriate way to retrieve them?",
          choices: [
            { text: "Tell the officer what you're about to do, then retrieve them.", correct: true, feedback: "Right. Communicating first — before reaching — is exactly the kind of clarity this chapter is about." },
            { text: "Reach for the glove compartment right away without saying anything.", correct: false, feedback: "An unannounced reach can create unnecessary uncertainty — say what you're doing first." },
          ],
        },
      ],
    },
  },
  {
    id: "T7-B15",
    kind: "video",
    poi: [POI],
    estimatedMinutes: 17,
    props: {
      eyebrow: "Community Safety Education Act — Required Material",
      title: "Flashing Lights: Creating Safe Interactions Between Citizens and Law Enforcement",
      durationLabel: "Official TDLR video — approximately 16 minutes",
      description: [
        "Texas's Community Safety Education Act (Senate Bill 30) requires every driver education and driving safety course to include this official video on citizen and law-enforcement interaction during traffic stops. Watch the full video below.",
      ],
      youtubeId: "wn9NegqFqlk",
      sourceLabel: "Source: Texas Department of Licensing and Regulation (tdlr.texas.gov) — official required material, not an Easy Way summary.",
    },
  },
  {
    id: "T7-B16",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      rounds: [
        {
          eyebrow: "CSEA Knowledge Check",
          prompt: "According to the video, where should you try to stop when signaled by law enforcement?",
          choices: [
            { text: "The safest available location, moving there promptly.", correct: true, feedback: "Right — the video's core message is choosing a safe stopping location, not stopping wherever you happen to be." },
            { text: "It doesn't matter, as long as you stop eventually.", correct: false, feedback: "Where you stop matters — a safe, appropriate location is part of what keeps a stop routine." },
          ],
        },
        {
          eyebrow: "CSEA Knowledge Check",
          prompt: "What does the video recommend about your hands during the interaction?",
          choices: [
            { text: "Keep them visible throughout.", correct: true, feedback: "Right — visible hands reduce uncertainty for both the driver and the officer." },
            { text: "Keep them out of sight until asked.", correct: false, feedback: "The opposite — visible hands are what the video emphasizes." },
          ],
        },
      ],
    },
  },

  // ============================================================
  // Chapter 5 — People, Passengers & Vehicle Responsibilities
  // ============================================================
  {
    id: "T7-L06",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 3.5,
    props: {
      eyebrow: "Chapter 5 — What You'll Learn",
      title: "Restraints, Open Beds & Aggressive Driving",
      previewPoints: [
        "Your responsibility to the people riding with you",
        "Texas's open-truck-bed law",
        "The difference between frustration and aggressive action",
      ],
      sections: [
        {
          heading: "Occupant Restraints — A Responsibility to Others",
          body: [
            "Texas requires occupants to be secured by a safety belt, with a separate, more specific requirement for children in a child passenger safety seat system (Transportation Code §545.412, §545.413). Topic 7's focus is a driver's responsibility to the other people in the vehicle — not just yourself.",
          ],
        },
        {
          heading: "Open Truck Beds",
          body: [
            "It's illegal to drive with anyone under 18 riding in an open truck bed or open flatbed trailer, with narrow statutory exceptions (such as certain parades or farm-to-market work).",
          ],
        },
        {
          heading: "Aggressive Driving",
          body: [
            "Aggressive driving includes tailgating, unsafe weaving, excessive confrontation, intentionally blocking another driver, and aggressive speed behavior. Feeling frustrated is not the same thing as choosing dangerous behavior — frustration is a feeling; aggressive driving is a decision.",
          ],
        },
      ],
    },
  },
  {
    id: "T7-B17",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Restraint Decision Scene",
      visual: SCENE_RESTRAINTS,
      prompt: "You have an adult passenger and a child in the vehicle, and someone is considering riding in the pickup bed. What responsibilities does the driver need to consider?",
      choices: [
        { text: "One universal rule covers everyone the same way.", correct: false, feedback: "It's not one universal rule — occupant restraint requirements and the open-truck-bed law are separate, specific rules with their own conditions." },
        { text: "Separate, specific responsibilities: restraint requirements for occupants, and the open-truck-bed restriction for anyone under 18.", correct: true, feedback: "Right. These are genuinely separate legal requirements, not one blanket rule." },
      ],
    },
  },
  {
    id: "T7-B18",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "De-Escalation Challenge",
      prompt: "A driver behind you follows closely, gestures, and tries to pass aggressively. What should you do?",
      choices: [
        { text: "Avoid confrontation, create space, and let them move away when practical.", correct: true, feedback: "Right. Don't brake-check, don't race, and don't follow the other driver — create space and let the conflict de-escalate on its own." },
        { text: "Match their speed to prevent them from passing.", correct: false, feedback: "Matching their behavior escalates the conflict instead of de-escalating it." },
      ],
    },
  },
  {
    id: "T7-B19",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Your Own Aggression",
      prompt: "You're running late, and the vehicle ahead is below your preferred speed. Which thought creates the safer response?",
      choices: [
        { text: "\"Time pressure does not change traffic law.\"", correct: true, feedback: "Right. Recognizing frustration and increasing patience keeps urgency from turning into risk." },
        { text: "\"I need to get around this car no matter what.\"", correct: false, feedback: "Turning urgency into an aggressive maneuver is exactly the pattern this lesson is about avoiding — including your own." },
      ],
    },
  },
  {
    id: "T7-L07",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 3,
    props: {
      eyebrow: "Chapter 5 — Cargo, Towing & Carbon Monoxide",
      title: "Vehicle Responsibilities",
      previewPoints: [
        "Your responsibility for cargo and load security",
        "What changes when you're towing",
        "Why carbon monoxide is a danger you can't see or smell",
      ],
      sections: [
        {
          heading: "Cargo & Load Security",
          body: [
            "A driver is responsible for securing cargo, maintaining vehicle balance, and preventing items from falling onto the roadway, in compliance with applicable law.",
          ],
        },
        {
          heading: "Towing & Safety Chains",
          body: [
            "A passenger car or light truck towing a trailer must have safety chains attached from the trailer to the towing vehicle, in a crossed (X) pattern under the tongue — strong enough to maintain the connection if the primary hitch fails (Transportation Code §545.410). Towing also changes how the whole system behaves: stopping, turning, acceleration, backing, and following space all need more margin than driving the same vehicle without a trailer.",
          ],
        },
        {
          heading: "Carbon Monoxide",
          body: [
            "Carbon monoxide is a poisonous gas associated with vehicle exhaust that you can't see or smell. Risk increases when an engine runs in an enclosed space, when exhaust enters an occupied area, or when the exhaust system is damaged — never let an engine idle in an enclosed space, even briefly.",
          ],
        },
      ],
    },
  },
  {
    id: "T7-B20",
    kind: "hotspot",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Towing & Safety Chains",
      prompt: "Tap the correct safety-chain configuration for towing a trailer.",
      visual: SCENE_TOWING_CHAINS,
      mode: "pick-one",
      wrongPickFeedback: "Look for the crossed (X) pattern under the hitch — that's what Texas law requires.",
      hotspots: [
        { id: "hitch", label: "Hitch only, no chains", x: 39, y: 45, explanation: "The hitch alone isn't enough — Texas law requires safety chains as a backup connection." },
        { id: "chains", label: "Crossed safety chains", x: 39, y: 78, explanation: "Right — safety chains crossed in an X pattern under the tongue, strong enough to maintain the connection if the hitch fails.", isTarget: true },
      ],
    },
  },
  {
    id: "T7-B21",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Towing Decision Lab",
      visual: SCENE_TOWING_DYNAMICS,
      prompt: "A trailer is now attached to your vehicle. What changes compared with driving the same vehicle without it?",
      choices: [
        { text: "Nothing meaningful — the vehicle drives the same.", correct: false, feedback: "Towing changes the whole system's behavior, not just the hitch mechanics." },
        { text: "Stopping, turning, acceleration, backing, and following space all need more margin.", correct: true, feedback: "Right. A trailer changes how the entire vehicle system behaves — plan for more space and more time in every one of these." },
      ],
    },
  },
  {
    id: "T7-B22",
    kind: "compare",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Carbon Monoxide Safety Scenario",
      prompt: "Same running engine, two different environments. Which one creates a serious buildup risk?",
      tabs: [
        { label: "Open Outdoor Environment", visual: SCENE_CO_OUTDOOR, caption: "Open air allows exhaust to disperse — much lower buildup risk." },
        { label: "Closed Garage", visual: SCENE_CO_GARAGE, caption: "An enclosed, inadequately ventilated space traps carbon monoxide — never let an engine idle here, even briefly." },
      ],
    },
  },

  // ============================================================
  // Chapter 6 — Work Zones & Communication
  // ============================================================
  {
    id: "T7-L08",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Chapter 6 — What You'll Learn",
      title: "What Makes a Work Zone Different?",
      previewPoints: [
        "What a work zone can change about the roadway",
        "What to expect and recognize as you approach one",
      ],
      sections: [
        {
          heading: "A Work Zone Changes the Environment",
          body: [
            "A work zone can change lanes, speed, traffic direction, roadway surface, visibility, available space, and the position of workers and equipment. Expect conditions to change, and recognize the advance warning area, lane shifts, closures, temporary barriers, workers, equipment, flaggers, and temporary traffic controls as you approach.",
          ],
        },
      ],
    },
  },
  {
    id: "T7-B23",
    kind: "hotspot",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Work-Zone Sign & Flagger Lab",
      prompt: "Tap each work-zone element to see what it tells you.",
      visual: SCENE_WORKZONE_LAB,
      mode: "identify-all",
      hotspots: [
        { id: "sign", label: "Orange warning sign", x: 79, y: 8, explanation: "Warns that a work zone is ahead, before you reach it." },
        { id: "flagger", label: "Flagger", x: 65, y: 65, explanation: "Provides temporary human direction that can override the normal traffic pattern." },
        { id: "cones", label: "Cones", x: 32, y: 78, explanation: "Channel traffic away from the work area." },
        { id: "arrowboard", label: "Arrow board", x: 16, y: 30, explanation: "Shows which way traffic needs to shift." },
        { id: "worker", label: "Worker", x: 85, y: 78, explanation: "May be working only a few feet from moving traffic — increase your attention and space here." },
      ],
    },
  },
  {
    id: "T7-B24",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Safe Following Through Work Zones",
      visual: SCENE_WORKZONE_FOLLOW,
      prompt: "Traffic ahead suddenly slows near a lane shift. What should already be true about your following space?",
      choices: [
        { text: "It should already include extra margin for sudden stopping and lane narrowing.", correct: true, feedback: "Right. Work zones bring sudden stops and narrowing lanes — the extra space needs to already be there, not added at the last second." },
        { text: "Normal following distance is enough since the posted speed is already reduced.", correct: false, feedback: "A reduced posted speed doesn't replace the need for extra following margin in a work zone." },
      ],
    },
  },
  {
    id: "T7-B25",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Work-Zone Passing / Lane-Change Decision",
      visual: SCENE_WORKZONE_PASS,
      prompt: "You want to pass slower traffic approaching a work-zone merge point, with a narrowing lane, barriers, and workers nearby. Is this the right time for an unnecessary passing maneuver?",
      choices: [
        { text: "No — the narrowing lane, barriers, and workers make this the wrong time.", correct: true, feedback: "Right. An unnecessary passing maneuver here adds risk right where space and reaction time are already reduced." },
        { text: "Yes — passing is always illegal in a work zone, so it doesn't matter.", correct: false, feedback: "Passing isn't automatically illegal everywhere in every work zone — but here, the narrowing lane and nearby workers make it the wrong decision regardless." },
      ],
    },
  },
  {
    id: "T7-B26",
    kind: "staged",
    poi: [POI],
    estimatedMinutes: 4.5,
    props: {
      eyebrow: "Work-Zone Drive-Through",
      completionTitle: "WORK ZONES",
      completionLines: [
        "Expect the pattern to change before you reach it.",
        "Follow current temporary controls, not memory of the road.",
        "Reduce speed and add space near workers and equipment.",
        "Stay cautious until you're fully clear of the work area.",
        "Violations here can mean bodily injury, death, or property damage — and doubled fines when workers are present and the zone is properly posted (Transportation Code §542.404).",
      ],
      stages: [
        {
          kind: "decision",
          label: "Stage 1 — Advance Warning",
          visual: SCENE_WZ_ADVANCE,
          prompt: "You see the advance warning sign. What should you do?",
          choices: [
            { text: "Begin reducing speed and increasing attention now.", correct: true, feedback: "Right — advance warning exists so you can adjust before you're actually in the zone." },
            { text: "Wait until you see cones to react.", correct: false, feedback: "Waiting until the cones means reacting too late — start adjusting at the warning sign." },
          ],
        },
        {
          kind: "decision",
          label: "Stage 2 — Lane Closure",
          visual: SCENE_WZ_CLOSURE,
          prompt: "A lane closure shifts traffic. What do you follow?",
          choices: [
            { text: "The temporary markings currently in place.", correct: true, feedback: "Right — temporary traffic control governs a work zone, even when it doesn't match the road's normal layout." },
            { text: "Where the lane usually runs.", correct: false, feedback: "Habit doesn't override what's actually marked right now." },
          ],
        },
        {
          kind: "decision",
          label: "Stage 3 — Flagger",
          visual: SCENE_WZ_FLAGGER,
          prompt: "A flagger signals STOP. What do you do?",
          choices: [
            { text: "Stop.", correct: true, feedback: "Right — a flagger's instruction overrides the normal traffic pattern in a work zone." },
            { text: "Proceed slowly since you don't see a hazard.", correct: false, feedback: "The flagger's signal controls regardless of what you can or can't see yourself." },
          ],
        },
        {
          kind: "decision",
          label: "Stage 4 — Workers & Equipment",
          visual: SCENE_WZ_WORKERS,
          prompt: "Workers are close to your lane. What should you do?",
          choices: [
            { text: "Reduce speed further and leave as much space as the lane allows.", correct: true, feedback: "Right — extra space and reduced speed protect both the workers and you." },
            { text: "Hold your current speed since you're staying in your lane.", correct: false, feedback: "Staying in your lane doesn't remove the risk near workers — slow down and add space." },
          ],
        },
        {
          kind: "decision",
          label: "Stage 5 — Traffic Backup",
          visual: SCENE_WZ_BACKUP,
          prompt: "Traffic ahead is suddenly stopping. What does a work zone make more likely?",
          choices: [
            { text: "A sudden backup you need to already be ready for.", correct: true, feedback: "Right — work zones frequently produce sudden backups. Expect one instead of just reacting to one." },
            { text: "Nothing different from normal traffic.", correct: false, feedback: "Work zones specifically increase the chance of a sudden backup." },
          ],
        },
        {
          kind: "decision",
          label: "Stage 6 — Exit the Work Area",
          visual: SCENE_WZ_EXIT,
          prompt: "You've passed the last visible sign of the work zone. Should you go back to normal driving immediately?",
          choices: [
            { text: "No — stay cautious until you're fully clear of the work area.", correct: true, feedback: "Right — equipment, workers, or a trailing control can still be just ahead even after the main zone appears to end." },
            { text: "Yes — the work zone is clearly over.", correct: false, feedback: "Relaxing too early is exactly when an unnoticed hazard near the end of a work zone catches a driver off guard." },
          ],
        },
      ],
    },
  },
  {
    id: "T7-L09",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 3,
    props: {
      eyebrow: "Chapter 6 — Texas Driving with Disabilities Program",
      title: "Supporting Clearer Communication with Law Enforcement",
      previewPoints: [
        "What the program is for",
        "How a driver voluntarily participates",
        "Where the designation appears",
      ],
      visual: SCENE_DISABILITIES_ID,
      sections: [
        {
          heading: "Purpose",
          body: [
            "The Texas Driving with Disabilities Program improves the interaction between law enforcement and drivers who have unique communication needs — including someone who may be slower to respond to commands, or who is deaf or hard of hearing.",
          ],
        },
        {
          heading: "Voluntary Participation",
          body: [
            "A Texan can choose to disclose a \"Communication Impediment\" designation directly on the front of their DPS-issued driver license or ID, or add it to their vehicle record when registering through TxDMV — either way, it alerts a trained officer to the situation before they even reach the window.",
          ],
        },
        {
          heading: "Documentation & Forms",
          body: [
            "Adding the designation to a DPS driver license or ID requires form DL-101, a physician's statement. Through TxDMV, a driver can use form VTR-216 (Communication Impediment, without a specialty plate) or form VTR-215 (Deaf Driver Awareness, with a specialty plate) to add the disclosure to a vehicle record.",
          ],
        },
      ],
    },
  },
  {
    id: "T7-B27",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Program Participation Check",
      prompt: "A driver wants to add a Communication Impediment designation directly to their DPS driver license. What does that require?",
      choices: [
        { text: "Form DL-101, a physician's statement.", correct: true, feedback: "Right — DL-101 is the DPS form used to add the designation to a driver license or ID." },
        { text: "Nothing — it's added automatically.", correct: false, feedback: "It's a voluntary program that requires actual documentation — DL-101, completed by a physician." },
      ],
    },
  },
  {
    id: "T7-B28",
    kind: "staged",
    poi: [POI],
    estimatedMinutes: 4,
    props: {
      eyebrow: "Cooperation Integrated Scenario",
      completionTitle: "SAFE DRIVING IS COOPERATIVE DRIVING",
      completionLines: [
        "Notice who's around you before it becomes a conflict.",
        "Give more space to those who need it most.",
        "Cooperation means adjusting your own behavior, not just reacting to others'.",
      ],
      stages: [
        {
          kind: "decision",
          label: "What Do You Notice?",
          visual: SCENE_COOPERATION_INTEGRATED,
          prompt: "This scene includes a cyclist, a large truck, a work zone, a stopped law-enforcement vehicle, and an aggressive driver. What should you notice first?",
          choices: [
            { text: "All of them — each one changes what space or attention you need.", correct: true, feedback: "Right. A complex scene like this needs a full scan, not a focus on just one element." },
            { text: "Only the vehicle directly ahead of you.", correct: false, feedback: "Focusing on just one vehicle misses the cyclist, the work zone, and the aggressive driver — all of which affect your decisions here." },
          ],
        },
        {
          kind: "decision",
          label: "Who Needs Additional Space?",
          prompt: "Given everyone in this scene, who most needs additional space from you?",
          choices: [
            { text: "The cyclist and the workers in the work zone.", correct: true, feedback: "Right — the most vulnerable road users in this scene need the most margin." },
            { text: "The aggressive driver, so they can pass faster.", correct: false, feedback: "Giving an aggressive driver room to de-escalate is reasonable, but the cyclist and workers are the ones who most need physical space for their own safety." },
          ],
        },
        {
          kind: "decision",
          label: "What Behavior Could Create Conflict?",
          prompt: "What behavior in this scene is most likely to create a conflict?",
          choices: [
            { text: "Passing the cyclist too closely while also reacting to the aggressive driver.", correct: true, feedback: "Right — trying to handle the aggressive driver and the cyclist pass at the same time is exactly when a mistake happens." },
            { text: "Slowing down near the work zone.", correct: false, feedback: "Slowing near a work zone is the correct, low-conflict response, not a risk in itself." },
          ],
        },
        {
          kind: "decision",
          label: "What Should You Do?",
          prompt: "Given everything happening at once, what's your best overall approach?",
          choices: [
            { text: "Slow down, create space for the cyclist and workers, and let the aggressive driver move on without engaging.", correct: true, feedback: "Right — this is cooperation in practice: adjusting your own driving for everyone in the scene, not reacting to just one element." },
            { text: "Speed up to get past everything as quickly as possible.", correct: false, feedback: "Speeding up through a scene this complex reduces your margin exactly when you need more of it." },
          ],
        },
      ],
    },
  },
  {
    id: "T7-B29",
    kind: "hotspot",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Roadway User Mistake Spotter",
      prompt: "Which driver behavior here is the biggest immediate risk?",
      visual: SCENE_ROADWAY_MISTAKE_2,
      mode: "pick-one",
      wrongPickFeedback: "Look for the driver actively cutting into the work-zone merge.",
      hotspots: [
        { id: "you", label: "You, driving normally", x: 15, y: 76, explanation: "Not the risk here — this vehicle is behaving normally." },
        {
          id: "cutting",
          label: "Vehicle cutting into the merge",
          x: 39,
          y: 76,
          explanation: "Cutting into a work-zone merge point near workers is the highest immediate risk in this scene — it reduces everyone's margin right where space is already limited.",
          isTarget: true,
        },
        { id: "worker", label: "Worker near the zone", x: 85, y: 60, explanation: "Not a driver mistake — the worker is exactly where they're expected to be." },
      ],
    },
  },
  {
    id: "T7-B30",
    kind: "recap",
    poi: ["All Topic 7 review"],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Topic 7 Recap",
      prompt: "Tap each section for a quick review before the quiz.",
      sections: [
        {
          title: "Vulnerable Road Users",
          points: [
            "Motorcycles are easy to misjudge — check blind spots, don't assume a clear mirror means a clear lane.",
            "Pass bicyclists only when it can be done safely and legally.",
            "Pedestrian conflicts happen at turns and driveways, not just crosswalks.",
          ],
        },
        {
          title: "Large & Unusual Vehicles",
          points: [
            "If you can't see the truck driver's mirror, they can't see you.",
            "Slow speed never makes an unsafe pass acceptable.",
            "Never stop where your vehicle could interfere with light rail.",
          ],
        },
        {
          title: "Crashes & Law Enforcement",
          points: [
            "Crash-scene duties (stop, aid, remain) are legally required — separate from Good Samaritan protection, which covers voluntary aid and has real limits.",
            "During a stop: acknowledge, move to safety, keep hands visible, communicate before reaching.",
          ],
        },
        {
          title: "Restraints & Aggression",
          points: [
            "Occupant restraints are a responsibility to others in the vehicle, not just yourself.",
            "Frustration is a feeling; aggressive driving is a decision — including your own.",
          ],
        },
        {
          title: "Vehicle Responsibilities",
          points: [
            "Safety chains must be crossed in an X pattern when towing.",
            "Never let an engine idle in an enclosed space — carbon monoxide is undetectable.",
          ],
        },
        {
          title: "Work Zones & Communication",
          points: [
            "Expect conditions to change; follow current controls, not memory.",
            "The Driving with Disabilities Program is a voluntary way to support clearer communication with officers.",
          ],
        },
      ],
    },
  },
];
