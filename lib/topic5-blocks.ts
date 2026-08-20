// Structured curriculum data for Topic 5's interactive blocks — Controlling
// Traffic Flow, built on the Easy Way Interactive Lesson Standard used for
// Topics 3 and 4. Legal content lives here, separate from the reusable UI
// components in components/course/*.
//
// Legal/statutory facts below (speed limits, vehicle lights, turn-signal
// distance, passing, coasting, parking/standing/stopping distances) were
// verified against the current Texas Transportation Code before writing —
// see the Topic 5 audit report for sources and section numbers. Nothing
// here was generated from memory.
//
// POI note: every block is tagged with the topic-level POI code "4.1.5"
// rather than invented letter subsections beyond what's already used
// elsewhere in this project, since a granular audit mapping is metadata
// only and never shown to students.

import type { DecisionChallengeProps } from "@/components/course/DecisionChallenge";
import type { CompareScenesProps } from "@/components/course/CompareScenes";
import type { DecisionSequenceProps } from "@/components/course/DecisionSequence";
import type { HotspotSceneProps } from "@/components/course/HotspotScene";
import type { StagedScenarioProps } from "@/components/course/StagedScenario";
import type { RecapAccordionProps } from "@/components/course/RecapAccordion";
import type { LessonScreenProps } from "@/components/course/LessonScreen";
import {
  SCENE_T5_OPENING,
  SCENE_FLOW_SMOOTH,
  SCENE_FLOW_DISRUPTED,
  SCENE_SIGNAL_EARLY,
  SCENE_SIGNAL_LATE,
  SCENE_BLINDSPOT_ZONES,
  SCENE_BLINDSPOT_MOTORCYCLE,
  SCENE_INTERVAL_GOOD,
  SCENE_INTERVAL_RAIN,
  SCENE_STOPPING_LOW,
  SCENE_STOPPING_HIGH,
  SCENE_RAIN_SPEED,
  SCENE_PASS_PROHIBITED,
  SCENE_PASS_UNSAFE_GAP,
  SCENE_BEING_PASSED,
  SCENE_TURN_GOOD,
  SCENE_TURN_LATE,
  SCENE_PARKING_CHOICES,
  SCENE_BACKING_LOT,
  SCENE_LEAVING_SPACE,
  SCENE_COASTING_DOWNGRADE,
  SCENE_MERGE_GAP_A,
  SCENE_MERGE_GAP_B,
  SCENE_FREEWAY_BUILDUP,
  SCENE_EXIT_LATE,
  SCENE_ROUTE_STORM,
  SCENE_MONOTONOUS_ROAD,
  SCENE_BREAKDOWN_SHOULDER,
  SCENE_BREAKDOWN_LIVE_LANE,
  SCENE_BREAKDOWN_INTERSECTION,
  SCENE_SKID,
  SCENE_BRAKE_FAILURE,
  SCENE_OFF_PAVEMENT,
  SCENE_BLOWOUT,
  SCENE_STEEP_DOWNGRADE,
  SCENE_DRY_ROAD,
  SCENE_ICY_ROAD,
  SCENE_WORKZONE_ADVANCE,
  SCENE_WORKZONE_SHIFT,
  SCENE_WORKZONE_WORKERS,
  SCENE_WORKZONE_BACKUP,
  SCENE_T5_MISTAKE_SPOTTER,
  SCENE_FLOW_CHALLENGE,
} from "./topic5-scenes";

const POI = "4.1.5";

export const TOPIC5_CHAPTERS: { title: string; blockIds: string[] }[] = [
  { title: "Moving With Traffic", blockIds: ["T5-L00", "T5-B00", "T5-L01", "T5-B01", "T5-B02", "T5-B03"] },
  { title: "Space, Speed & Stopping", blockIds: ["T5-L02", "T5-B04", "T5-B05", "T5-B06", "T5-B07"] },
  { title: "Passing, Turning & Parking", blockIds: ["T5-L03", "T5-B08", "T5-B09", "T5-B10", "T5-B11", "T5-B12", "T5-B13"] },
  { title: "Freeway Flow", blockIds: ["T5-L04", "T5-B14", "T5-B15", "T5-B16", "T5-B17"] },
  { title: "When Conditions Change", blockIds: ["T5-L05", "T5-B18", "T5-B19", "T5-B20", "T5-B21", "T5-B22"] },
  { title: "Work Zones & Putting It Together", blockIds: ["T5-L06", "T5-B23", "T5-B24", "T5-B25", "T5-B26"] },
];

export const TOPIC5_PRACTICE_BLOCK_IDS = ["T5-B03", "T5-B08", "T5-B14", "T5-B20", "T5-B24", "T5-B25"];

export type Topic5Block =
  | { id: string; kind: "decision"; poi: string[]; estimatedMinutes: number; props: DecisionChallengeProps }
  | { id: string; kind: "compare"; poi: string[]; estimatedMinutes: number; props: CompareScenesProps }
  | { id: string; kind: "sequence"; poi: string[]; estimatedMinutes: number; props: DecisionSequenceProps }
  | { id: string; kind: "hotspot"; poi: string[]; estimatedMinutes: number; props: HotspotSceneProps }
  | { id: string; kind: "staged"; poi: string[]; estimatedMinutes: number; props: StagedScenarioProps }
  | { id: string; kind: "recap"; poi: string[]; estimatedMinutes: number; props: RecapAccordionProps }
  | { id: string; kind: "learn"; poi: string[]; estimatedMinutes: number; props: LessonScreenProps };

export const TOPIC5_BLOCKS: Topic5Block[] = [
  // ============================================================
  // Chapter 1 — Moving With Traffic
  // ============================================================
  {
    id: "T5-L00",
    kind: "learn",
    poi: ["Topic 5 introduction"],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Topic 5 — Controlling Traffic Flow",
      title: "Good Driving Is More Than Staying Between the Lines",
      previewPoints: [
        "Communicate your intentions and manage the space around your vehicle",
        "Use safer following intervals and understand how speed affects stopping",
        "Pass, be passed, turn, stop, park, and back responsibly",
        "Enter, travel on, and exit freeways",
        "Adjust to weather, fatigue, and vehicle emergencies",
        "Travel safely through construction and maintenance work zones",
      ],
      sections: [
        {
          heading: "Every Movement Affects Traffic Around You",
          body: [
            "When you slow down, change lanes, turn, merge, pass, stop, park, back, or enter a freeway, other drivers have to understand what you're doing — and at the same time, you need enough time and space to respond when traffic changes unexpectedly.",
            "Controlling traffic flow isn't one rule — it's how communication, space, speed, and predictability work together every mile you drive.",
          ],
        },
      ],
      ruleCard: {
        title: "EASY WAY PRINCIPLE",
        lines: ["COMMUNICATE EARLY", "CREATE SPACE", "CONTROL SPEED", "STAY PREDICTABLE"],
      },
    },
  },
  {
    id: "T5-B00",
    kind: "hotspot",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Opening Scene — Who's Communicating With You?",
      prompt: "How many drivers are communicating with you right now — even though none of them are speaking? Tap everything you can spot.",
      visual: SCENE_T5_OPENING,
      mode: "identify-all",
      hotspots: [
        { id: "brake", label: "Brake lights ahead", x: 40, y: 47, explanation: "Brake lights — that driver is slowing down, and you need to be ready to slow too." },
        { id: "merge", label: "Vehicle merging in", x: 76, y: 27, explanation: "A merging vehicle — its position change is telling you it needs space." },
        { id: "moto", label: "Motorcycle alongside", x: 82, y: 67, explanation: "A motorcycle riding alongside — easy to lose track of if you stop scanning." },
        { id: "signal", label: "Turn signal", x: 20, y: 12, explanation: "A turn signal — an early warning of what that driver is about to do." },
        { id: "fast", label: "Faster vehicle approaching from behind", x: 90, y: 89, explanation: "A vehicle closing in from behind — its speed is telling you it wants to pass." },
      ],
    },
  },
  {
    id: "T5-L01",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 3,
    props: {
      eyebrow: "Chapter 1 — What You'll Learn",
      title: "Traffic Flow, Communication & Blind Spots",
      previewPoints: [
        "What \"traffic flow\" actually means",
        "How your vehicle communicates for you",
        "Why your mirrors don't show everything beside your vehicle",
      ],
      sections: [
        {
          heading: "Traffic Flow Is Drivers Responding Predictably",
          body: [
            "Traffic flow describes the movement and interaction of road users through the roadway system — light or heavy, steady or slowing, merging, stopping, or changing lanes. Safe flow depends on drivers responding appropriately to traffic-control devices, other vehicles, law enforcement, flaggers, and changing road conditions.",
            "Your driving decisions affect more than your own vehicle. One driver braking suddenly, changing lanes without signaling, or following too closely can ripple backward through traffic behind them.",
          ],
        },
        {
          heading: "Other Drivers Can't Read Your Mind",
          body: [
            "Your vehicle has to communicate for you — through turn signals, brake lights, and predictable changes in position and speed. Communicate early enough for the drivers around you to actually understand and respond, not at the moment you're already moving.",
          ],
        },
        {
          heading: "Mirrors Don't Show Everything",
          body: [
            "A blind spot is an area beside your vehicle that isn't adequately covered by your mirrors. A motorcycle, a car, or a cyclist can occupy that space without appearing in either mirror. The habit that closes the gap: mirror, signal, a quick glance over your shoulder to confirm the blind spot is actually clear, then move.",
          ],
        },
      ],
      commonMistakes: [
        "Signaling only after a lane change has already begun, instead of before it.",
        "Assuming a clear mirror means a clear lane.",
      ],
    },
  },
  {
    id: "T5-B01",
    kind: "compare",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Smooth vs. Disrupted Traffic Flow",
      prompt: "Same road, two different outcomes. Compare what changes.",
      tabs: [
        { label: "Smooth Flow", visual: SCENE_FLOW_SMOOTH, caption: "Drivers maintain space, signal, change speed gradually, and merge predictably. Traffic keeps moving." },
        { label: "Disrupted Flow", visual: SCENE_FLOW_DISRUPTED, caption: "One vehicle brakes suddenly or changes lanes without signaling — and the effect spreads backward through every driver behind it." },
      ],
    },
  },
  {
    id: "T5-B02",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      ruleCardTitle: "COMMUNICATING SPEED & POSITION",
      ruleCardLines: [
        "Signal continuously for at least the last 100 feet before you turn (Transportation Code §545.104).",
        "Communicate early enough for others to actually understand and respond.",
        "Cancel the signal once you're through — a signal left on tells everyone the wrong thing.",
      ],
      rounds: [
        {
          eyebrow: "Communicating Early",
          visual: SCENE_SIGNAL_EARLY,
          prompt: "You plan to move one lane left. When should the drivers around you first learn what you intend to do?",
          choices: [
            { text: "Early — before you start moving, giving others time to respond.", correct: true, feedback: "Right. Communicate early enough for other road users to understand and respond appropriately, not at the moment you're already crossing the line." },
            { text: "It doesn't matter, as long as you signal at some point.", correct: false, feedback: "Timing matters — a signal that arrives after you've already started moving gives surrounding drivers no real time to respond." },
          ],
        },
        {
          eyebrow: "Communicating Late",
          visual: SCENE_SIGNAL_LATE,
          prompt: "This driver's signal appears only after the vehicle is already crossing into the next lane. Does this give surrounding traffic the same warning?",
          choices: [
            { text: "No — by the time the signal appears, the move is already happening.", correct: true, feedback: "Right. A late signal isn't really communication anymore — it's just confirming a move that already started." },
            { text: "Yes — a signal is a signal no matter when it appears.", correct: false, feedback: "The whole point of signaling is to give others time to react before the move — a signal that appears mid-maneuver doesn't do that." },
          ],
        },
      ],
    },
  },
  {
    id: "T5-B03",
    kind: "hotspot",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Blind-Spot Lab",
      prompt: "Your mirrors look clear. Tap the spot where a vehicle could still be hiding from you.",
      visual: SCENE_BLINDSPOT_MOTORCYCLE,
      mode: "pick-one",
      wrongPickFeedback: "That's not where a vehicle disappears from your mirrors — look just behind and to the side of your vehicle.",
      hotspots: [
        { id: "ahead", label: "Straight ahead", x: 22, y: 73, explanation: "The area straight ahead is already covered by your windshield view — not a blind spot." },
        { id: "moto", label: "Just behind, alongside", x: 65, y: 78, explanation: "This is the classic blind spot — just behind and to the side of your vehicle, where your mirrors don't reach. A motorcycle's smaller profile makes it especially easy to lose track of here.", isTarget: true },
        { id: "farback", label: "Far behind", x: 88, y: 92, explanation: "Your rearview mirror already covers traffic well behind you." },
      ],
    },
  },

  // ============================================================
  // Chapter 2 — Space, Speed & Stopping
  // ============================================================
  {
    id: "T5-L02",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 3.5,
    props: {
      eyebrow: "Chapter 2 — What You'll Learn",
      title: "Following Interval, Stopping, and Speed",
      previewPoints: [
        "How to create real time and space by following farther back",
        "Why a vehicle doesn't stop the instant you see danger",
        "The difference between the posted limit and a safe speed",
        "When headlights are legally required",
      ],
      sections: [
        {
          heading: "Space Creates Time",
          body: [
            "For speeds of 30 mph or under, keep at least a 2-second gap from the vehicle ahead; above 30 mph, make it 4 seconds — the higher speed needs more room to react. Pick a fixed point ahead and count from when the vehicle ahead passes it to when you do. In rain, heavy traffic, or low visibility, add more time on top of that.",
          ],
        },
        {
          heading: "A Vehicle Doesn't Stop Instantly",
          body: [
            "Stopping is a process: perceive the hazard, react, brake, and only then actually stop. Speed determines how much roadway is consumed during that whole process — a higher speed doesn't just hit harder, it eats the distance you have to avoid the crash in the first place. Wet pavement, worn tires, a downhill grade, and reduced visibility all extend it further.",
          ],
        },
        {
          heading: "Legal Isn't Always Safe",
          body: [
            "Driving exactly at the posted limit is always legal — except when conditions like fog, rain, or heavy traffic make that speed unsafe. Texas law expects you to adjust for conditions, not just the sign. Unless posted otherwise: 30 mph in an urban district, 15 mph in an alley, 15 mph on beaches and adjacent county roads, 70 mph on numbered highways outside a city, 60 mph on unnumbered ones (Transportation Code §545.352). Whatever's actually posted always controls.",
          ],
        },
        {
          heading: "Headlights Aren't Just for Seeing",
          body: [
            "Texas law requires headlights from 30 minutes after sunset until 30 minutes before sunrise, or anytime you can't clearly see a person or vehicle 1,000 feet ahead — rain, fog, or dust count (§541.401, §547.302). Switch to low beams within 500 feet of an oncoming vehicle, or within 300 feet of one you're following, so you're not blinding the driver ahead of or facing you (§547.333).",
          ],
        },
      ],
      commonMistakes: [
        "Treating the posted speed limit as always safe, regardless of rain, fog, or traffic.",
        "Following at the same distance in heavy rain as on a clear, dry road.",
      ],
    },
  },
  {
    id: "T5-B04",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      rounds: [
        {
          eyebrow: "Following Interval — Good Conditions",
          visual: SCENE_INTERVAL_GOOD,
          prompt: "Dry road, light traffic. You're timing your gap against a fixed point ahead. What's the minimum interval above 30 mph?",
          choices: [
            { text: "2 seconds.", correct: false, feedback: "2 seconds is the guidance at 30 mph or under — above 30 mph, make it 4 seconds." },
            { text: "4 seconds.", correct: true, feedback: "Right. Above 30 mph, keep at least a 4-second gap — the higher speed needs more room to react." },
          ],
        },
        {
          eyebrow: "Following Interval — Rain",
          visual: SCENE_INTERVAL_RAIN,
          prompt: "Now it's raining. Would you keep the exact same gap you'd use on a dry road?",
          choices: [
            { text: "Yes — the legal minimum doesn't change with weather.", correct: false, feedback: "The legal minimum is a floor, not a target — reduced traction in rain means you need more margin, not the same amount." },
            { text: "No — add more space on top of the usual interval.", correct: true, feedback: "Right. In rain, heavy traffic, or low visibility, add more time on top of the normal interval." },
          ],
        },
      ],
    },
  },
  {
    id: "T5-B05",
    kind: "compare",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Speed Changes Stopping Distance",
      prompt: "Same hazard, same driver, two different starting speeds.",
      tabs: [
        { label: "Lower Speed", visual: SCENE_STOPPING_LOW, caption: "Hazard appears → perceive → react → brake → stop, all within a shorter distance." },
        { label: "Higher Speed", visual: SCENE_STOPPING_HIGH, caption: "The same hazard, the same reaction time — but far more roadway is consumed before the vehicle actually stops." },
      ],
    },
  },
  {
    id: "T5-B06",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Conditions vs. the Posted Limit",
      visual: SCENE_RAIN_SPEED,
      prompt: "You're driving into heavy rain. The posted limit hasn't changed. Should your driving speed necessarily stay exactly the same?",
      choices: [
        { text: "Yes — the posted limit is the posted limit.", correct: false, feedback: "The posted limit is legal to drive up to when conditions allow it — it doesn't mean that speed is always safe." },
        { text: "No — speed has to be appropriate for actual conditions.", correct: true, feedback: "Right. Driving at the limit is legal, but Texas law expects your speed to be appropriate for the conditions you're actually in." },
      ],
    },
  },
  {
    id: "T5-B07",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      rounds: [
        {
          eyebrow: "Speed Limits — Urban District",
          prompt: "No signs posted, and you're on a city street (not an alley). What's the default legal maximum?",
          choices: [
            { text: "30 mph.", correct: true, feedback: "Right — 30 mph in an urban district on a street other than an alley, unless posted otherwise." },
            { text: "15 mph.", correct: false, feedback: "15 mph is the default for an alley, not a regular urban street." },
            { text: "60 mph.", correct: false, feedback: "That's the default for an unnumbered highway outside an urban district, not a city street." },
          ],
        },
        {
          eyebrow: "Speed Limits — Texas Beach",
          prompt: "You're driving on a public Texas beach. What's the default legal maximum?",
          choices: [
            { text: "15 mph.", correct: true, feedback: "Right — 15 mph on beaches, and on county roads adjacent to a public beach when declared by the commissioners court." },
            { text: "30 mph.", correct: false, feedback: "That's the urban-district default — beaches have their own lower limit." },
            { text: "Whatever feels safe, since it's sand.", correct: false, feedback: "Beaches have an actual posted legal default (15 mph) — it isn't left to judgment alone." },
          ],
        },
      ],
    },
  },

  // ============================================================
  // Chapter 3 — Passing, Turning & Parking
  // ============================================================
  {
    id: "T5-L03",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 4,
    props: {
      eyebrow: "Chapter 3 — What You'll Learn",
      title: "Passing, Turning, Parking & Backing",
      previewPoints: [
        "When passing is legal — and when it's still not safe",
        "What's required of you when another driver passes you",
        "How to turn, park, and leave a space predictably",
        "Why coasting in neutral on a downgrade is illegal",
      ],
      sections: [
        {
          heading: "Passing Creates Multiple Conflicts at Once",
          body: [
            "Passing means managing the vehicle ahead, adjacent traffic, oncoming traffic, blind spots, and closing speed all at the same time. Pass to the left at a safe distance, and don't return to the right until safely clear of the vehicle you passed. Texas law permits passing on the right only when the vehicle ahead is turning left, and only on a road with unobstructed pavement wide enough for two or more lines of moving traffic in each direction, or on a one-way street wide enough for two or more lines of traffic (§545.057). Legal permission and a safe opportunity are both required — being delayed isn't a reason to pass where it's prohibited or unsafe.",
          ],
        },
        {
          heading: "Being Passed",
          body: [
            "When another vehicle is passing you, stay predictable: don't increase your speed until the other vehicle has completely passed (§545.053). Turning the moment into a race is exactly the behavior that makes a passing maneuver dangerous for everyone involved.",
          ],
        },
        {
          heading: "Turns: Communication, Positioning, Speed",
          body: [
            "Before the turn: signal, check traffic, adjust speed, and position correctly. During the turn: maintain control and watch for conflicts. After the turn: complete the movement smoothly, cancel the signal, and re-establish your normal lane position. A predictable approach gives surrounding traffic far more time to respond than sudden braking with a signal that comes on late.",
          ],
        },
        {
          heading: "Parking Without Creating a Hazard",
          body: [
            "Texas law prohibits standing or parking in specific places because of the conflict they'd create: within 15 feet of a fire hydrant, within 20 feet of a crosswalk at an intersection, within 30 feet of the approach to a stop sign, yield sign, or signal, within 50 feet of a railroad crossing, and always in an intersection, crosswalk, or on a sidewalk (§545.302). When leaving a parking space, check your surroundings, check blind spots, signal where appropriate, and yield before entering traffic — a parked position doesn't protect you from a hidden pedestrian or cyclist.",
          ],
        },
        {
          heading: "Backing",
          body: [
            "Backing reduces how much you can see and predict. Inspect the area before you start moving, look behind you, back slowly, and keep scanning the whole time. A backup camera or sensor can help, but it doesn't replace actually looking.",
          ],
        },
        {
          heading: "Coasting Is Illegal on a Downgrade",
          body: [
            "Texas law prohibits coasting with the gears or transmission in neutral while moving on a downgrade — and separately prohibits a truck, tractor, or bus from coasting with the clutch disengaged on a downgrade (§545.406). Coasting reduces your ability to control the vehicle's speed exactly when a downgrade already demands more control, not less.",
          ],
        },
      ],
      commonMistakes: [
        "Passing on the right outside the specific situations where it's actually legal.",
        "Speeding up while another driver is in the middle of passing you.",
        "Parking close enough to a hydrant, crosswalk, or intersection to create a sightline or access problem.",
      ],
    },
  },
  {
    id: "T5-B08",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      rounds: [
        {
          eyebrow: "Passing — Prohibited Markings",
          visual: SCENE_PASS_PROHIBITED,
          prompt: "A slower vehicle is ahead, and the pavement markings prohibit passing here. Is being delayed a reason to pass anyway?",
          choices: [
            { text: "No — a prohibited passing zone is prohibited regardless of how slow traffic is.", correct: true, feedback: "Right. Delay isn't a legal or safe justification for passing where it's prohibited." },
            { text: "Yes, if no one else is around.", correct: false, feedback: "The marking prohibits passing regardless of how much traffic happens to be around at the moment." },
          ],
        },
        {
          eyebrow: "Passing — Legal, But Is It Safe?",
          visual: SCENE_PASS_UNSAFE_GAP,
          prompt: "This time passing is legally permitted here — but oncoming traffic is approaching. Should you pass?",
          choices: [
            { text: "No — legal permission alone isn't enough; the gap has to actually be safe.", correct: true, feedback: "Right. Legal permission and a safe opportunity are both necessary before you commit to a pass." },
            { text: "Yes, since passing is legally allowed at this spot.", correct: false, feedback: "Being legally permitted to pass here doesn't mean the current gap in oncoming traffic is actually safe." },
          ],
        },
      ],
    },
  },
  {
    id: "T5-B09",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Being Passed",
      visual: SCENE_BEING_PASSED,
      prompt: "Another vehicle is in the middle of passing you. What action would make the situation more dangerous?",
      choices: [
        { text: "Accelerating to prevent the other driver from completing the maneuver.", correct: true, feedback: "Right. Speeding up turns a routine pass into a race and can trap the passing driver alongside oncoming or adjacent traffic." },
        { text: "Holding your current speed and staying in your lane.", correct: false, feedback: "That's the predictable, lower-risk response — staying steady lets the other driver complete the maneuver as expected." },
      ],
    },
  },
  {
    id: "T5-B10",
    kind: "compare",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Good Turn vs. Late Turn",
      prompt: "Two drivers, the same turn. Which gives surrounding traffic more time to respond?",
      tabs: [
        { label: "Good Turn", visual: SCENE_TURN_GOOD, caption: "Signals early, slows gradually, positions correctly before the turn begins." },
        { label: "Late Turn", visual: SCENE_TURN_LATE, caption: "Sudden hard braking, with the signal appearing only as the vehicle is already committed to the turn." },
      ],
    },
  },
  {
    id: "T5-B11",
    kind: "hotspot",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Where Would You Park?",
      prompt: "Tap the one legal place to park in this scene.",
      visual: SCENE_PARKING_CHOICES,
      mode: "pick-one",
      wrongPickFeedback: "That spot is one of the prohibited locations — look for the open curb space, clear of the hydrant, railroad crossing, and crosswalk.",
      hotspots: [
        { id: "hydrant", label: "Near the fire hydrant", x: 18, y: 50, explanation: "Prohibited — standing or parking within 15 feet of a fire hydrant isn't allowed (§545.302)." },
        { id: "rr", label: "Near the railroad crossing", x: 45, y: 65, explanation: "Prohibited — parking within 50 feet of the nearest rail of a railroad crossing isn't allowed (§545.302)." },
        { id: "crosswalk", label: "Next to the crosswalk", x: 78, y: 12, explanation: "Prohibited — standing or parking within 20 feet of a crosswalk at an intersection isn't allowed (§545.302)." },
        { id: "open", label: "Open curb space", x: 89, y: 82, explanation: "This is a legal, open curb space — clear of the hydrant, the crossing, and the crosswalk.", isTarget: true },
      ],
    },
  },
  {
    id: "T5-B12",
    kind: "hotspot",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Backing & Leaving a Space",
      prompt: "Before this vehicle starts moving, tap every hazard it needs to identify first.",
      visual: SCENE_BACKING_LOT,
      mode: "identify-all",
      hotspots: [
        { id: "ped", label: "Pedestrian", x: 22, y: 76, explanation: "A pedestrian crossing behind the vehicle — easy to miss without a full look, not just mirrors." },
        { id: "moving", label: "Moving vehicle", x: 75, y: 82, explanation: "A vehicle already moving through the lot — its path could cross yours." },
        { id: "cart", label: "Shopping cart / obstruction", x: 17, y: 42, explanation: "A stray obstruction — easy to clip if you're only watching for other vehicles." },
      ],
    },
  },
  {
    id: "T5-B13",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Coasting on a Downgrade",
      visual: SCENE_COASTING_DOWNGRADE,
      prompt: "You're heading down a long grade and shift into neutral to save fuel, letting the vehicle coast. Is this legal?",
      choices: [
        { text: "Yes — coasting saves fuel and the vehicle is still under control.", correct: false, feedback: "It's not legal. Texas law prohibits coasting with the gears or transmission in neutral while moving on a downgrade (§545.406) — and it reduces your control exactly when the downgrade demands more." },
        { text: "No — coasting in neutral on a downgrade is prohibited.", correct: true, feedback: "Right. Texas law prohibits coasting in neutral on a downgrade — stay in gear so you keep engine braking and full control." },
      ],
    },
  },

  // ============================================================
  // Chapter 4 — Freeway Flow
  // ============================================================
  {
    id: "T5-L04",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Chapter 4 — What You'll Learn",
      title: "Freeway Entry, Travel, Exit & Route Planning",
      previewPoints: [
        "How to merge without forcing anyone into an emergency maneuver",
        "What to watch for as you travel a freeway",
        "Why missing an exit is safer than a last-second lane change",
        "When to change your plans instead of pushing through poor conditions",
      ],
      sections: [
        {
          heading: "Entering: Match Speed, Then Merge",
          body: [
            "Observe freeway traffic early, use the acceleration lane to actually build speed, identify a gap, and merge smoothly — don't ease in at a crawl and force the traffic already there to react to you.",
          ],
        },
        {
          heading: "Traveling: Stay Aware, Not Just Fast",
          body: [
            "Hold a steady speed, keep at least a 4-second gap in poor weather, watch entrances and exits, and avoid unnecessary lane changes. Watching farther down the road than just the car ahead — brake lights, merging traffic, a lane-closure sign — gives you time to respond before traffic actually changes.",
          ],
        },
        {
          heading: "Exiting: Get Over Early",
          body: [
            "Identify your exit early, position in the appropriate lane, signal, and adjust speed in the exit lane itself. If you realize your exit is close but you're several lanes away, missing it and taking the next one is safer than a last-second multi-lane crossing.",
          ],
        },
        {
          heading: "Sometimes the Answer Is Not to Drive",
          body: [
            "Before a trip, weather, visibility, road closures, traffic, and your own vehicle's or your own condition are all worth considering. A safe decision can be changing your route, delaying the trip, slowing down, or simply not driving — continuing the original plan unchanged isn't the only option.",
          ],
        },
      ],
      commonMistakes: [
        "Merging at a crawl instead of matching the speed of freeway traffic already there.",
        "Crossing several lanes at the last second rather than taking the next exit.",
      ],
    },
  },
  {
    id: "T5-B14",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      rounds: [
        {
          eyebrow: "Freeway Merge — Gap A",
          visual: SCENE_MERGE_GAP_A,
          prompt: "This gap is barely a car length. Should you merge into it?",
          choices: [
            { text: "Yes — any gap works if you're quick.", correct: false, feedback: "A gap that tight doesn't leave room to match speed safely — forcing it risks a rear-end conflict." },
            { text: "No — wait for a bigger gap.", correct: true, feedback: "Right. This gap doesn't give you room to merge without forcing traffic behind you to react." },
          ],
        },
        {
          eyebrow: "Freeway Merge — Gap B",
          visual: SCENE_MERGE_GAP_B,
          prompt: "Now there's real room between vehicles. What should you do?",
          choices: [
            { text: "Match the traffic's speed and merge smoothly into the gap.", correct: true, feedback: "Right. This gap gives you room to match speed and merge without forcing anyone into an emergency maneuver." },
            { text: "Ease in slowly and let traffic adjust to you.", correct: false, feedback: "Even with a good gap, entering below the flow of traffic still forces other drivers to react to you." },
          ],
        },
      ],
    },
  },
  {
    id: "T5-B15",
    kind: "hotspot",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Freeway Travel — What Clues Tell You Traffic Is About to Change?",
      prompt: "Tap every clue in this scene that traffic flow may be about to change.",
      visual: SCENE_FREEWAY_BUILDUP,
      mode: "identify-all",
      hotspots: [
        { id: "brake1", label: "Brake lights", x: 40, y: 45, explanation: "Brake lights ahead — the clearest early sign that traffic is slowing." },
        { id: "brake2", label: "More brake lights", x: 60, y: 40, explanation: "A second vehicle braking — the slowdown is spreading, not a one-off." },
        { id: "sign", label: "Lane-closure sign", x: 79, y: 8, explanation: "A posted warning — traffic ahead is about to be squeezed into fewer lanes." },
        { id: "ramp", label: "Merging ramp", x: 90, y: 15, explanation: "An entrance ramp — expect vehicles merging into your lane soon." },
      ],
    },
  },
  {
    id: "T5-B16",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Freeway Exit — Don't Cut Across",
      visual: SCENE_EXIT_LATE,
      prompt: "You realize your exit is very close, but you're several lanes away. Should you cut across at the last moment?",
      choices: [
        { text: "Yes — missing the exit means a long detour.", correct: false, feedback: "A last-second multi-lane crossing is a dangerous maneuver for everyone around you — missing the exit is the safer outcome." },
        { text: "No — take the next exit instead.", correct: true, feedback: "Right. Missing an exit is safer than creating a dangerous last-second maneuver — this is an Easy Way safety principle, not a shortcut worth the risk." },
      ],
    },
  },
  {
    id: "T5-B17",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Route Planning",
      visual: SCENE_ROUTE_STORM,
      prompt: "Heavy storm, an unfamiliar road, and low visibility. Is continuing your original plan your only option?",
      choices: [
        { text: "No — you could delay, change your route, slow down, or decide not to drive.", correct: true, feedback: "Right. Weather, visibility, and unfamiliar roads are all reasons to reconsider the plan — not just push through it unchanged." },
        { text: "Yes — once you've started, you should finish the trip as planned.", correct: false, feedback: "Conditions can change enough mid-trip that the original plan is no longer the safest option." },
      ],
    },
  },

  // ============================================================
  // Chapter 5 — When Conditions Change
  // ============================================================
  {
    id: "T5-L05",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 3.5,
    props: {
      eyebrow: "Chapter 5 — What You'll Learn",
      title: "Fatigue, Breakdowns & Losing Control",
      previewPoints: [
        "How to recognize fatigue and highway hypnosis before they become dangerous",
        "How to handle a breakdown safely",
        "What to do if you lose control of the vehicle",
        "How winter conditions change everything about your driving",
      ],
      sections: [
        {
          heading: "Highway Hypnosis",
          body: [
            "Long, monotonous stretches of driving can induce a kind of trance — highway hypnosis — where attention drifts without the driver noticing. Watch for difficulty concentrating, repeated yawning, wandering attention, or trouble remembering the last stretch of road. The fix is rest and active engagement, not louder music, an open window, or driving faster.",
          ],
        },
        {
          heading: "Breakdowns",
          body: [
            "Get off the pavement if you can, turn on your hazards (taillights at night), and get everyone out and away from traffic if the car won't move. A breakdown in a live traffic lane is far more dangerous than one on the shoulder — moving to safer ground, when it's possible to do so safely, is the priority.",
          ],
        },
        {
          heading: "Losing Control",
          body: [
            "Skid: ease off the gas — don't stab the brakes — and steer gently toward the direction the back of the car is sliding. Brake failure: pump the brakes, downshift, and apply the parking brake carefully. Blowout: don't brake hard; ease off the gas and steer straight until you can safely pull over. Off-pavement: if your wheels leave the roadway, ease off the gas and steer back on gradually — jerking the wheel back can cause a far worse loss of control than easing back over.",
          ],
        },
        {
          heading: "Winter Driving",
          body: [
            "There's no safe fixed speed on ice or snow — slow down until you've felt out how much traction you actually have, and give yourself far more following distance than usual. Watch for ice on bridges and shaded spots even when the rest of the road looks clear.",
          ],
        },
      ],
      commonMistakes: [
        "Treating loud music or an open window as a substitute for actually resting.",
        "Stabbing the brakes during a skid instead of easing off the gas.",
        "Jerking the wheel back hard when a wheel drops off the pavement edge.",
      ],
    },
  },
  {
    id: "T5-B18",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Recognizing Fatigue",
      visual: SCENE_MONOTONOUS_ROAD,
      prompt: "You notice you're struggling to stay focused on a long, repetitive stretch of road. What's the appropriate response?",
      choices: [
        { text: "Turn the music up louder to stay alert.", correct: false, feedback: "Louder music doesn't address the underlying fatigue — it's not a substitute for rest." },
        { text: "Stop for a real break — get out, move around, rest.", correct: true, feedback: "Right. Stop every two hours or 100 miles, get out and move, and don't rely on music, air, or speed to substitute for actual rest." },
        { text: "Drive faster to reach your destination sooner.", correct: false, feedback: "Driving faster while fatigued increases risk — it doesn't solve the underlying attention problem." },
      ],
    },
  },
  {
    id: "T5-B19",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      rounds: [
        {
          eyebrow: "Breakdown — Which Location Is Riskiest?",
          prompt: "Compare three breakdown locations: the shoulder, a live traffic lane, and an intersection. Which creates the greatest immediate traffic conflict?",
          visual: SCENE_BREAKDOWN_LIVE_LANE,
          choices: [
            { text: "A live traffic lane.", correct: true, feedback: "Right — a vehicle stopped in a live lane sits directly in the path of moving traffic, the most dangerous of the three." },
            { text: "The shoulder.", correct: false, feedback: "The shoulder is the safest of the three — it's outside the flow of moving traffic." },
            { text: "They're all equally risky.", correct: false, feedback: "Location matters a great deal — a live lane is meaningfully more dangerous than the shoulder." },
          ],
        },
        {
          eyebrow: "Breakdown — What Should You Do?",
          visual: SCENE_BREAKDOWN_SHOULDER,
          prompt: "Your car breaks down. What's the approved response?",
          choices: [
            { text: "Get off the pavement if possible, turn on hazards, and move people away from traffic if the car won't move.", correct: true, feedback: "Right. Move to safer ground when you can, make yourself visible, and keep people out of the traffic lanes." },
            { text: "Stay in the vehicle in the travel lane until help arrives.", correct: false, feedback: "Staying stopped in a live lane leaves you directly in the path of moving traffic — get off the pavement when it's safe to do so." },
          ],
        },
      ],
    },
  },
  {
    id: "T5-B20",
    kind: "staged",
    poi: [POI],
    estimatedMinutes: 4.5,
    props: {
      eyebrow: "Loss-of-Control Lab",
      completionTitle: "LOSS OF CONTROL",
      completionLines: [
        "Skid: ease off the gas, steer gently toward the slide.",
        "Brake failure: pump the brakes, downshift, apply the parking brake carefully.",
        "Off-pavement: ease back on gradually — never jerk the wheel.",
        "Tire blowout: ease off the gas, steer straight, avoid hard braking.",
        "Steep downgrade: lower gear, controlled braking — never coast in neutral.",
      ],
      stages: [
        {
          kind: "decision",
          label: "Skid",
          visual: SCENE_SKID,
          prompt: "The rear of your vehicle starts sliding. What's the correct response?",
          choices: [
            { text: "Ease off the gas and steer gently toward the direction the rear is sliding.", correct: true, feedback: "Right. Stabbing the brakes or overcorrecting the steering makes a skid worse, not better." },
            { text: "Brake hard immediately.", correct: false, feedback: "Hard braking during a skid can make the loss of control worse — ease off the gas instead." },
          ],
        },
        {
          kind: "decision",
          label: "Brake Failure",
          visual: SCENE_BRAKE_FAILURE,
          prompt: "The brake pedal goes to the floor with no response. What should you do?",
          choices: [
            { text: "Pump the brakes, downshift, and carefully apply the parking brake.", correct: true, feedback: "Right. Pumping may rebuild some pressure, downshifting uses engine braking, and the parking brake is a separate system." },
            { text: "Turn off the engine immediately.", correct: false, feedback: "Turning off the engine can disable power steering and complicate control — pump the brakes and downshift first." },
          ],
        },
        {
          kind: "decision",
          label: "Off-Pavement",
          visual: SCENE_OFF_PAVEMENT,
          prompt: "Your right wheels drop off the edge of the pavement. Should you jerk the wheel back onto the roadway immediately?",
          choices: [
            { text: "No — ease off the gas and steer back on gradually.", correct: true, feedback: "Right. A sudden hard steering correction can cause the vehicle to swerve sharply across the road — ease back on instead." },
            { text: "Yes — get back on the road as fast as possible.", correct: false, feedback: "Jerking the wheel back is exactly the reaction that turns a manageable situation into a loss of control." },
          ],
        },
        {
          kind: "decision",
          label: "Tire Blowout",
          visual: SCENE_BLOWOUT,
          prompt: "A tire suddenly blows out. What's the correct response?",
          choices: [
            { text: "Ease off the gas, steer straight, and avoid hard braking until you can safely pull over.", correct: true, feedback: "Right. Hard braking during a blowout can pull the vehicle sharply to one side." },
            { text: "Brake hard immediately to stop as fast as possible.", correct: false, feedback: "Braking hard right after a blowout risks pulling the vehicle out of control — ease off the gas instead." },
          ],
        },
        {
          kind: "decision",
          label: "Steep Downgrade",
          visual: SCENE_STEEP_DOWNGRADE,
          prompt: "You're facing a long, steep downgrade. What keeps you in control?",
          choices: [
            { text: "A lower gear and controlled braking — never coasting in neutral.", correct: true, feedback: "Right. Coasting in neutral on a downgrade is illegal in Texas and removes engine braking exactly when you need it most." },
            { text: "Shift to neutral to save the brakes.", correct: false, feedback: "Coasting in neutral on a downgrade is prohibited by Texas law and takes away control, not just braking." },
          ],
        },
      ],
    },
  },
  {
    id: "T5-B21",
    kind: "compare",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Dry Road vs. Icy Road",
      prompt: "Same route, two very different surfaces. What changes?",
      tabs: [
        { label: "Dry Road", visual: SCENE_DRY_ROAD, caption: "Normal speed, normal following distance, and predictable braking." },
        { label: "Icy / Winter Road", visual: SCENE_ICY_ROAD, caption: "Slow down until you've felt out your actual traction, add much more following distance, and use gentle, gradual braking." },
      ],
    },
  },
  {
    id: "T5-B22",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Deteriorating Conditions",
      prompt: "Conditions are getting worse before your trip even starts. What are your choices?",
      choices: [
        { text: "Only one — go as originally planned.", correct: false, feedback: "That's exactly the assumption to avoid — deteriorating conditions open up real alternatives worth considering." },
        { text: "Delay, change your route, or decide not to drive at all.", correct: true, feedback: "Right. Adjusting speed, changing your route, or choosing not to drive are all legitimate responses to poor conditions." },
      ],
    },
  },

  // ============================================================
  // Chapter 6 — Work Zones & Putting It Together
  // ============================================================
  {
    id: "T5-L06",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Chapter 6 — What You'll Learn",
      title: "Work Zones & Bringing It All Together",
      previewPoints: [
        "How a work zone changes the traffic environment",
        "What unsafe driving in a work zone can actually cost",
      ],
      sections: [
        {
          heading: "A Work Zone Changes More Than the Lane Layout",
          body: [
            "It changes available space, traffic speed, driver workload, the position of workers and equipment, and stopping patterns. Recognize the environment early, obey temporary traffic controls and flaggers, reduce speed as appropriate, leave extra space, and expect sudden backups.",
          ],
        },
        {
          heading: "The Real Consequences",
          body: [
            "Unsafe or illegal driving in a construction or maintenance zone can result in bodily injury or death to drivers, passengers, workers, and other roadway users, and in property damage to vehicles, equipment, and traffic-control devices. Under Transportation Code §542.404, both the minimum and maximum fine for an applicable traffic offense are doubled when workers are present and the zone is properly posted with its speed limit.",
          ],
        },
      ],
      commonMistakes: [
        "Assuming reduced work-zone speed limits only apply when workers are visibly present.",
      ],
    },
  },
  {
    id: "T5-B23",
    kind: "staged",
    poi: [POI],
    estimatedMinutes: 3.5,
    props: {
      eyebrow: "Work-Zone Drive-Through",
      completionTitle: "WORK ZONES",
      completionLines: [
        "Advance warning: start adjusting before you reach the zone.",
        "Lane shift: follow the temporary markings, not memory.",
        "Workers/equipment: leave extra space and reduce speed.",
        "Backup: expect sudden stops well before you reach one.",
      ],
      stages: [
        {
          kind: "decision",
          label: "Stage 1 — Advance Warning",
          visual: SCENE_WORKZONE_ADVANCE,
          prompt: "You see a work-zone warning sign ahead. What should you start doing now?",
          choices: [
            { text: "Begin reducing speed and increasing your following space.", correct: true, feedback: "Right. Advance warning exists so you can adjust before you're actually in the zone." },
            { text: "Keep your speed the same until you see cones.", correct: false, feedback: "Waiting until you see the cones means adjusting too late — start responding at the warning sign." },
          ],
        },
        {
          kind: "decision",
          label: "Stage 2 — Lane Shift",
          visual: SCENE_WORKZONE_SHIFT,
          prompt: "The temporary markings shift your lane away from where it normally runs. What do you follow?",
          choices: [
            { text: "The temporary markings currently in place.", correct: true, feedback: "Right. Temporary traffic control governs a work zone, even when it doesn't match the road's normal layout." },
            { text: "Where the lane usually is, since you know this road.", correct: false, feedback: "Familiarity with the road doesn't override what's actually marked right now." },
          ],
        },
        {
          kind: "decision",
          label: "Stage 3 — Workers & Equipment",
          visual: SCENE_WORKZONE_WORKERS,
          prompt: "Workers are close to your lane. What should you do?",
          choices: [
            { text: "Reduce speed further and leave as much space as the lane allows.", correct: true, feedback: "Right. Extra space and reduced speed protect both the workers and you if something changes suddenly." },
            { text: "Maintain your current speed since you're staying in your lane.", correct: false, feedback: "Staying in your lane doesn't remove the risk — reduce speed and add space near workers." },
          ],
        },
        {
          kind: "decision",
          label: "Stage 4 — Backup",
          visual: SCENE_WORKZONE_BACKUP,
          prompt: "Traffic ahead is suddenly stopping. What does a work zone make more likely?",
          choices: [
            { text: "A sudden backup you need to be ready to stop for.", correct: true, feedback: "Right. Work zones frequently produce sudden backups — expect one, don't just react to one." },
            { text: "Nothing different from normal traffic.", correct: false, feedback: "Work zones specifically increase the chance of sudden backups — treat the possibility as expected, not surprising." },
          ],
        },
      ],
    },
  },
  {
    id: "T5-B24",
    kind: "hotspot",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Traffic-Flow Mistake Spotter",
      prompt: "Which driver is creating the highest immediate traffic-flow risk in this scene?",
      visual: SCENE_T5_MISTAKE_SPOTTER,
      mode: "pick-one",
      wrongPickFeedback: "That's not the highest immediate risk here — look for who's following too closely.",
      hotspots: [
        { id: "signaling", label: "Vehicle signaling properly", x: 30, y: 70, explanation: "This driver is signaling correctly — not the risk here." },
        {
          id: "tailgate",
          label: "Vehicle following too closely",
          x: 55,
          y: 70,
          explanation: "Following too closely removes this driver's own response margin — if the vehicle ahead brakes, there's no time or space left to react. Rule: keep at least a 4-second gap above 30 mph, more in poor conditions.",
          isTarget: true,
        },
        { id: "moto", label: "Motorcycle in blind spot", x: 82, y: 55, explanation: "Being in a blind spot is a risk to watch for, but it's not itself unsafe driving by the motorcyclist." },
        { id: "workzone", label: "Work-zone warning ahead", x: 79, y: 15, explanation: "A warning sign is information, not a driver behavior — not the mistake here." },
      ],
    },
  },
  {
    id: "T5-B25",
    kind: "staged",
    poi: [POI],
    estimatedMinutes: 3.5,
    props: {
      eyebrow: "Easy Way Flow Challenge",
      completionTitle: "COMMUNICATE · CREATE SPACE · CONTROL SPEED · STAY PREDICTABLE",
      completionLines: [
        "Communicate what you're about to do, early.",
        "Create the space you need before you need it.",
        "Control your speed for the conditions, not just the sign.",
        "Stay predictable so everyone around you can respond.",
      ],
      stages: [
        {
          kind: "decision",
          label: "1 — Communicate",
          visual: SCENE_FLOW_CHALLENGE,
          prompt: "Traffic ahead is slowing, a vehicle is merging, and your exit is coming up. What will you communicate first?",
          choices: [
            { text: "Your intention early — signal for the lane or exit you'll need before you need it.", correct: true, feedback: "Right — early communication gives everyone around you time to respond to what you're about to do." },
            { text: "Nothing yet — wait until you're already moving.", correct: false, feedback: "Waiting until you're already moving turns communication into an announcement instead of a warning." },
          ],
        },
        {
          kind: "decision",
          label: "2 — Create Space",
          prompt: "A motorcycle is sitting in your blind spot. Where do you need more room?",
          choices: [
            { text: "Beside you, before changing lanes — and ahead, since traffic is slowing.", correct: true, feedback: "Right — you need room both to your side, for the blind-spot hazard, and ahead, for the traffic that's already slowing." },
            { text: "You don't need to adjust space if you're not changing lanes yet.", correct: false, feedback: "Space needs to exist before you need it — waiting until the moment of the lane change is too late." },
          ],
        },
        {
          kind: "decision",
          label: "3 — Control Speed",
          prompt: "Rain is beginning as traffic ahead slows. What needs to change?",
          choices: [
            { text: "Reduce speed and increase your following interval for the rain.", correct: true, feedback: "Right — rain reduces traction, so both your speed and your following gap need to adjust." },
            { text: "Keep the same speed since you haven't reached the wet pavement yet.", correct: false, feedback: "Waiting until you're already on wet pavement to slow down removes the margin the adjustment is supposed to create." },
          ],
        },
        {
          kind: "decision",
          label: "4 — Stay Predictable",
          prompt: "Given everything happening at once, what maneuver avoids unnecessary conflict?",
          choices: [
            { text: "A smooth, signaled lane change into the space you created, at a matched speed.", correct: true, feedback: "Right — smooth and signaled is what lets a merging vehicle, a slowing lane, and a blind-spot motorcycle all resolve without conflict." },
            { text: "A quick, unsignaled move to get ahead of the slowdown.", correct: false, feedback: "An unsignaled, abrupt move is exactly what removes predictability from a traffic-flow situation, increasing risk for everyone nearby." },
          ],
        },
      ],
    },
  },
  {
    id: "T5-B26",
    kind: "recap",
    poi: ["All Topic 5 review"],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Topic 5 Recap",
      prompt: "Tap each section for a quick review before the quiz.",
      sections: [
        {
          title: "Traffic Communication",
          points: [
            "Signal continuously for at least 100 feet before turning.",
            "Communicate early enough for others to actually respond.",
            "A signal shows intent — it doesn't by itself make a move safe.",
          ],
        },
        {
          title: "Space & Speed",
          points: [
            "2 seconds at 30 mph or under, 4 seconds above — more in poor conditions.",
            "Speed determines how much roadway is used before you actually stop.",
            "The posted limit is legal; conditions decide whether it's actually safe.",
          ],
        },
        {
          title: "Passing & Position",
          points: [
            "Passing on the right is legal only when the vehicle ahead is turning left and the road is wide enough.",
            "Don't speed up while being passed.",
            "Check your blind spot — mirrors alone don't cover it.",
          ],
        },
        {
          title: "Parking & Backing",
          points: [
            "No standing/parking within 15 ft of a hydrant, 20 ft of a crosswalk, 30 ft of a stop/yield/signal, or 50 ft of a railroad crossing.",
            "Coasting in neutral on a downgrade is illegal.",
            "Inspect, look, and back slowly — technology doesn't replace observation.",
          ],
        },
        {
          title: "Freeways",
          points: [
            "Match speed before merging — don't force traffic to react to you.",
            "Missing an exit beats a last-second multi-lane crossing.",
            "Poor conditions can mean delaying, rerouting, or not driving.",
          ],
        },
        {
          title: "Conditions & Emergencies",
          points: [
            "Rest and engagement fix fatigue — not music, air, or speed.",
            "Skid: ease off the gas. Blowout: ease off, steer straight. Off-pavement: ease back gradually.",
            "Work-zone fines double when workers are present and the zone is properly posted.",
          ],
        },
      ],
    },
  },
];
