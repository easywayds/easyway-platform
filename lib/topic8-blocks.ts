// Structured curriculum data for Topic 8's interactive blocks — Managing
// Risk, built on the Easy Way Interactive Lesson Standard used for
// Topics 3-7.
//
// Legal claims (wireless-device law, street racing, safety belts) were
// verified against the current Texas Transportation Code before writing.
// The human-trafficking hotline number and indicators were verified
// against the National Human Trafficking Hotline's own current published
// material. Three unsourced statistics from the prior flat content
// (a reaction-time-doubles-crash-odds figure, an ejection-death-multiplier
// figure, and an uncited "13%" new-driver figure) could not be verified
// against an authoritative source in the time available and were
// deliberately dropped rather than carried forward — see the Topic 8
// audit report for details.
//
// POI note: every block is tagged with the topic-level POI code "4.1.8"
// rather than invented letter subsections. Metadata only, never shown to
// students.

import type { DecisionChallengeProps } from "@/components/course/DecisionChallenge";
import type { CompareScenesProps } from "@/components/course/CompareScenes";
import type { DecisionSequenceProps } from "@/components/course/DecisionSequence";
import type { HotspotSceneProps } from "@/components/course/HotspotScene";
import type { StagedScenarioProps } from "@/components/course/StagedScenario";
import type { RecapAccordionProps } from "@/components/course/RecapAccordion";
import type { LessonScreenProps } from "@/components/course/LessonScreen";
import type { RiskStackProps } from "@/components/course/RiskStack";
import {
  SCENE_T8_OPENING,
  SCENE_KEEP_OPTIONS_A,
  SCENE_KEEP_OPTIONS_B,
  SCENE_LATE_SPEED,
  SCENE_LANE_WEAVE,
  SCENE_YELLOW_FAR,
  SCENE_FATIGUE_SIGNS,
  SCENE_ILLNESS,
  SCENE_ATTENTION_ROAD,
  SCENE_ATTENTION_PHONE,
  SCENE_LOOK_AWAY_SEQUENCE,
  SCENE_PASSENGER_LOOK,
  SCENE_SPEED_DRY,
  SCENE_SPEED_RAIN,
  SCENE_SPEED_NIGHT,
  SCENE_STREET_RACING,
  SCENE_SHORT_TRIP,
  SCENE_DAY_VIEW,
  SCENE_NIGHT_VIEW,
  SCENE_GLARE,
  SCENE_FINAL_CHALLENGE,
  SCENE_MISTAKE_RISK_A,
  SCENE_MISTAKE_RISK_B,
} from "./topic8-scenes";

const POI = "4.1.8";

export const TOPIC8_CHAPTERS: { title: string; blockIds: string[] }[] = [
  { title: "How Risk Builds", blockIds: ["T8-L00", "T8-B00", "T8-L01", "T8-B01", "T8-B02"] },
  { title: "When the Driver Becomes the Risk", blockIds: ["T8-L02", "T8-B03", "T8-B04", "T8-B05"] },
  {
    title: "Where Is Your Attention?",
    blockIds: ["T8-L03", "T8-B06", "T8-B07", "T8-B08", "T8-B09", "T8-B10", "T8-L04", "T8-B11"],
  },
  {
    title: "Speed & Protection",
    blockIds: ["T8-L05", "T8-B12", "T8-L06", "T8-B13", "T8-L07", "T8-B14"],
  },
  { title: "Driving After Dark", blockIds: ["T8-L08", "T8-B15", "T8-B16"] },
  {
    title: "Awareness & Final Application",
    blockIds: ["T8-L09", "T8-B17", "T8-B18", "T8-B19", "T8-B20", "T8-B21", "T8-B22"],
  },
];

export const TOPIC8_PRACTICE_BLOCK_IDS = ["T8-B01", "T8-B06", "T8-B08", "T8-B12", "T8-B15", "T8-B20"];

export type Topic8Block =
  | { id: string; kind: "decision"; poi: string[]; estimatedMinutes: number; props: DecisionChallengeProps }
  | { id: string; kind: "compare"; poi: string[]; estimatedMinutes: number; props: CompareScenesProps }
  | { id: string; kind: "sequence"; poi: string[]; estimatedMinutes: number; props: DecisionSequenceProps }
  | { id: string; kind: "hotspot"; poi: string[]; estimatedMinutes: number; props: HotspotSceneProps }
  | { id: string; kind: "staged"; poi: string[]; estimatedMinutes: number; props: StagedScenarioProps }
  | { id: string; kind: "recap"; poi: string[]; estimatedMinutes: number; props: RecapAccordionProps }
  | { id: string; kind: "learn"; poi: string[]; estimatedMinutes: number; props: LessonScreenProps }
  | { id: string; kind: "riskstack"; poi: string[]; estimatedMinutes: number; props: RiskStackProps };

export const TOPIC8_BLOCKS: Topic8Block[] = [
  // ============================================================
  // Chapter 1 — How Risk Builds
  // ============================================================
  {
    id: "T8-L00",
    kind: "learn",
    poi: ["Topic 8 introduction"],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Topic 8 — Managing Risk",
      title: "Every Drive Contains Risk",
      previewPoints: [
        "Recognize risk before it becomes an emergency",
        "Understand how poor decisions increase collision risk",
        "Identify signs that fatigue or illness may affect driving",
        "Control distractions inside your vehicle",
        "Understand speed, street racing, safety belts, and night driving",
        "Recognize potential human-trafficking indicators and know how to respond",
      ],
      sections: [
        {
          heading: "You Can't Control Everything — But You Can Control a Lot",
          body: [
            "You can't control every hazard around you. You can control many of the decisions that determine how much risk you accept — and how much margin you have left when something unexpected happens.",
          ],
        },
      ],
      ruleCard: {
        title: "EASY WAY PRINCIPLE",
        lines: ["SEE THE RISK", "REDUCE THE RISK", "KEEP YOUR OPTIONS OPEN"],
      },
    },
  },
  {
    id: "T8-B00",
    kind: "hotspot",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Opening Risk Scan",
      prompt: "How many risks can you find in this scene? Tap everything you can spot.",
      visual: SCENE_T8_OPENING,
      mode: "identify-all",
      hotspots: [
        { id: "dark", label: "Darkness", x: 10, y: 15, explanation: "Reduced visibility is its own risk factor, before anything else is added." },
        { id: "wet", label: "Wet roadway", x: 50, y: 60, explanation: "Rain reduces traction and increases stopping distance." },
        { id: "phone", label: "Phone notification", x: 20, y: 32, explanation: "A notification competes for attention the moment it appears — before you've even decided whether to look." },
        { id: "ahead", label: "Vehicle ahead", x: 68, y: 58, explanation: "Another vehicle's speed and spacing affect your own following decisions." },
        { id: "intersection", label: "Intersection ahead", x: 50, y: 90, explanation: "An upcoming intersection adds a decision point on top of everything else already happening." },
      ],
    },
  },
  {
    id: "T8-L01",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Chapter 1 — What You'll Learn",
      title: "What Is Risk?",
      previewPoints: [
        "What actually makes driving risk go up",
        "What you can change to bring it back down",
      ],
      sections: [
        {
          heading: "Risk Is Part of Driving",
          body: [
            "The goal isn't pretending risk doesn't exist — it's managing it. Driving risk increases when conditions reduce your time, space, visibility, traction, attention, or vehicle control.",
          ],
        },
        {
          heading: "What You Can Change",
          body: [
            "A driver can often reduce risk by changing speed, space, position, attention, route, timing, or — sometimes — the decision to drive at all. Every topic in this course so far has touched one of these levers: right-of-way, traffic control devices, traffic flow, impairment, cooperation with other road users. Topic 8 is about recognizing when several of them need adjusting at once.",
          ],
        },
      ],
    },
  },
  {
    id: "T8-B01",
    kind: "riskstack",
    poi: [POI],
    estimatedMinutes: 3.5,
    props: {
      eyebrow: "The Risk Stack",
      prompt: "Watch what happens as risk factors add up. Start with one.",
      steps: [
        { addFactor: "Night driving", note: "One factor on its own — reduced visibility, manageable with attention and appropriate speed." },
        { addFactor: "Rain", note: "Now traction is reduced too — stopping takes longer, and visibility drops further." },
        { addFactor: "Fatigue", note: "Reaction time and attention are both already compromised before anything even happens." },
        { addFactor: "Phone notification", note: "A pull on attention arrives exactly when there's the least margin to spare it." },
        { addFactor: "Higher speed", note: "Less time to recognize a hazard, less distance to stop, and a harder impact if you can't." },
      ],
      closingNote: "No single factor here is unmanageable alone. Together, they leave very little margin for anything unexpected.",
    },
  },
  {
    id: "T8-B02",
    kind: "compare",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Keep Your Options Open",
      prompt: "Which driver has more options if something unexpected happens?",
      tabs: [
        { label: "Driver A", visual: SCENE_KEEP_OPTIONS_A, caption: "Following closely, looking at a phone. Little space, little attention — few options left if traffic ahead changes." },
        { label: "Driver B", visual: SCENE_KEEP_OPTIONS_B, caption: "Maintaining space and watching traffic ahead. More time to recognize a hazard, and more room to respond to it." },
      ],
      ruleCard: {
        title: "PRESERVING OPTIONS",
        lines: ["Space gives more response time.", "Appropriate speed gives more time to recognize and react.", "Attention helps you identify a developing hazard before it's urgent."],
      },
    },
  },

  // ============================================================
  // Chapter 2 — When the Driver Becomes the Risk
  // ============================================================
  {
    id: "T8-L02",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 3,
    props: {
      eyebrow: "Chapter 2 — What You'll Learn",
      title: "When the Driver Becomes the Risk",
      previewPoints: [
        "How a decision — not a mechanical failure — starts most collisions",
        "Warning signs that fatigue is becoming a real risk",
        "Why your own condition matters as much as any outside hazard",
      ],
      sections: [
        {
          heading: "It Usually Starts With a Decision",
          body: [
            "Many collisions don't begin with something mechanical going wrong. They begin with a decision — rushing, an unsafe pass, accepting a small gap, driving through fatigue, continuing when conditions suggest delaying. Decision reduces the safety margin, a hazard appears, and there's less time to respond than there would have been otherwise.",
          ],
        },
        {
          heading: "Recognizing Fatigue as a Collision Risk",
          body: [
            "Warning signs that driving ability may be deteriorating include repeated yawning, difficulty concentrating, lane-position problems, missing signs or exits, difficulty remembering the last stretch of road, and heavy eyelids. The right response is addressing the fatigue itself — stopping to rest — not masking it with music, an open window, or pushing through because the destination is close.",
          ],
        },
        {
          heading: "Your Own Condition",
          body: [
            "A driver can be unsafe without alcohol or fatigue being involved at all — illness, dizziness, reduced concentration, and certain physical limitations can all affect driving ability. The question isn't whether your schedule allows you to keep driving — it's whether your current condition is compatible with driving safely right now.",
          ],
        },
      ],
    },
  },
  {
    id: "T8-B03",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 3,
    props: {
      rounds: [
        {
          eyebrow: "Risk-Taking — Running Late",
          visual: SCENE_LATE_SPEED,
          prompt: "You're late for work. The speed limit hasn't changed. Does being late change the amount of roadway risk you should accept?",
          choices: [
            { text: "No — the appropriate risk level doesn't change because you're in a hurry.", correct: true, feedback: "Right. Time pressure doesn't change the roadway, the traffic, or what a safe speed actually is." },
            { text: "Yes — being late justifies accepting more risk.", correct: false, feedback: "Being late is a scheduling problem, not a reason the roadway has become any safer to drive faster on." },
          ],
        },
        {
          eyebrow: "Risk-Taking — Lane Weaving",
          visual: SCENE_LANE_WEAVE,
          prompt: "Traffic is slow, and you're considering weaving between lanes to get ahead. Is repeated lane changing necessarily getting you there faster and more safely?",
          choices: [
            { text: "No — it adds risk with little real time benefit in slow traffic.", correct: true, feedback: "Right. In slow, congested traffic, weaving usually creates more conflict points for very little actual time saved." },
            { text: "Yes — more lane changes mean more progress.", correct: false, feedback: "Each lane change is its own added risk — in slow traffic, the actual time saved rarely justifies it." },
          ],
        },
        {
          eyebrow: "Risk-Taking — A Yellow Signal",
          visual: SCENE_YELLOW_FAR,
          prompt: "A signal turns yellow while you're still far enough away that continuing at your current speed isn't a safe way to make it through. What's the reduced-risk response?",
          choices: [
            { text: "Prepare to stop.", correct: true, feedback: "Right — the same principle from Topic 5 applies here: a yellow signal is a warning to prepare to stop, not a challenge to beat." },
            { text: "Speed up to clear the intersection before red.", correct: false, feedback: "Speeding up to beat a signal you're not close enough to clear safely is exactly the kind of decision that reduces your margin." },
          ],
        },
      ],
    },
  },
  {
    id: "T8-B04",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Fatigue Decision",
      visual: SCENE_FATIGUE_SIGNS,
      prompt: "Late at night, you notice repeated yawning, difficulty focusing, and you've just missed your exit. Which decision actually reduces the risk?",
      choices: [
        { text: "Turn the music up louder.", correct: false, feedback: "Louder music doesn't address the underlying fatigue." },
        { text: "Open the window for fresh air.", correct: false, feedback: "Fresh air can feel refreshing for a moment, but it doesn't reverse real fatigue." },
        { text: "Continue since the destination is close.", correct: false, feedback: "Proximity to the destination doesn't reduce how impaired your judgment and reaction time already are." },
        { text: "Stop driving and address the fatigue safely.", correct: true, feedback: "Right. Address the fatigue itself — rest — rather than trying to mask it with a temporary alertness trick." },
      ],
    },
  },
  {
    id: "T8-B05",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Driver Condition",
      visual: SCENE_ILLNESS,
      prompt: "You feel dizzy and are having difficulty concentrating. Should your schedule determine whether you continue driving?",
      choices: [
        { text: "No — your actual condition should guide the decision, not the schedule.", correct: true, feedback: "Right. Whether you're safe to drive depends on your condition right now, not on what you had planned." },
        { text: "Yes — if you're already on the road, finish the trip as planned.", correct: false, feedback: "A schedule doesn't change whether you're actually able to drive safely." },
      ],
    },
  },

  // ============================================================
  // Chapter 3 — Where Is Your Attention?
  // ============================================================
  {
    id: "T8-L03",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Chapter 3 — What You'll Learn",
      title: "Distraction Is More Than Texting",
      previewPoints: [
        "The three categories distraction actually falls into",
        "Why a distraction is defined by what it takes, not by whether a phone is involved",
      ],
      sections: [
        {
          heading: "Three Categories",
          body: [
            "Visual: your eyes leave the driving task. Manual: your hands leave the driving controls. Cognitive: your mind leaves the driving task, even if your eyes and hands don't. A single distraction can involve more than one category at once — reading a text pulls all three.",
          ],
        },
      ],
    },
  },
  {
    id: "T8-B06",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 3,
    props: {
      ruleCardTitle: "DISTRACTION CATEGORIES",
      ruleCardLines: [
        "Visual: eyes away from driving.",
        "Manual: hands away from the controls.",
        "Cognitive: mind away from the driving task.",
        "Many distractions involve more than one category at once.",
      ],
      rounds: [
        {
          eyebrow: "Distraction Sorter — Reading a Text",
          prompt: "Which category (or categories) does reading a text message involve?",
          choices: [
            { text: "Visual and cognitive — and manual if you're holding the phone.", correct: true, feedback: "Right. Reading a text pulls your eyes and mind away, and usually your hand as well." },
            { text: "Visual only.", correct: false, feedback: "It's more than visual — your mind is processing the message too, and often a hand is holding the phone." },
          ],
        },
        {
          eyebrow: "Distraction Sorter — An Emotionally Upset Passenger",
          prompt: "A passenger is upset and talking to you about something serious. Which category does this involve?",
          choices: [
            { text: "Cognitive — your mind is on the conversation, even with your eyes on the road.", correct: true, feedback: "Right. Your eyes can stay on the road while your attention is genuinely somewhere else — that's a cognitive distraction." },
            { text: "None — talking doesn't count as distraction.", correct: false, feedback: "An emotionally engaging conversation can pull real attention away from driving, even without touching your hands or eyes." },
          ],
        },
        {
          eyebrow: "Distraction Sorter — Reaching for an Object",
          prompt: "You reach for something that fell onto the passenger floor. Which category does this involve?",
          choices: [
            { text: "Manual and visual — and likely cognitive too, if you're focused on finding it.", correct: true, feedback: "Right. Reaching for an object typically pulls your hand, your eyes, and your attention all at once." },
            { text: "Manual only.", correct: false, feedback: "You're also likely looking for the object and thinking about finding it — more than one category is usually involved." },
          ],
        },
        {
          eyebrow: "Distraction Sorter — An Unrestrained Pet",
          prompt: "A pet moves around the vehicle and needs managing. Which category does this involve?",
          choices: [
            { text: "Potentially all three, depending on what managing the pet requires.", correct: true, feedback: "Right. Depending on the situation, an unrestrained pet can pull your eyes, your hands, and your attention all at once." },
            { text: "None — pets aren't a real distraction category.", correct: false, feedback: "A pet interfering with driving control or attention is a real, multi-category distraction risk." },
          ],
        },
      ],
    },
  },
  {
    id: "T8-B07",
    kind: "compare",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Phone Notification Challenge",
      prompt: "A notification arrives as traffic ahead begins to change. Compare what happens depending on where your attention goes.",
      tabs: [
        { label: "Eyes on the Road", visual: SCENE_ATTENTION_ROAD, caption: "Brake lights ahead are noticed immediately — there's time to respond." },
        { label: "Eyes on the Phone", visual: SCENE_ATTENTION_PHONE, caption: "The same brake lights appear — but they're missed until it's later than it should be. The roadway didn't wait." },
      ],
    },
  },
  {
    id: "T8-B08",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Looking Away Doesn't Pause the Roadway",
      visual: SCENE_LOOK_AWAY_SEQUENCE,
      prompt: "While your eyes are away from the road, what happens to your vehicle and the roadway around it?",
      choices: [
        { text: "Both keep moving and changing, whether you're watching or not.", correct: true, feedback: "Right. Looking away doesn't pause the vehicle or the roadway — conditions keep changing during every second your attention is elsewhere." },
        { text: "Nothing changes as long as you look back quickly.", correct: false, feedback: "The vehicle and the traffic around it don't wait for your attention to return." },
      ],
    },
  },
  {
    id: "T8-B09",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Navigation & Vehicle Controls",
      prompt: "You need to change your navigation destination while driving. What's the appropriate approach?",
      choices: [
        { text: "Set the destination before driving when practical, and make complex adjustments only when safely stopped.", correct: true, feedback: "Right. Technology can assist driving, but complicated input while moving still creates real distraction — hands-free doesn't remove the cognitive part." },
        { text: "Voice control eliminates any distraction risk, so input it however is convenient.", correct: false, feedback: "Hands-free or voice-based technology reduces some distraction, but it doesn't eliminate the cognitive attention a complex task still requires." },
      ],
    },
  },
  {
    id: "T8-B10",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Passengers & Pets",
      visual: SCENE_PASSENGER_LOOK,
      prompt: "A passenger says, \"Look at this,\" pointing at something outside the vehicle. What should remain your priority?",
      choices: [
        { text: "The driving task.", correct: true, feedback: "Right. Passengers can help, distract, or create pressure — the driving task stays the priority regardless." },
        { text: "Whatever the passenger is pointing at, briefly.", correct: false, feedback: "Even a brief look away is a real distraction — the driving task comes first." },
      ],
    },
  },
  {
    id: "T8-L04",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 3,
    props: {
      eyebrow: "Chapter 3 — Texas Wireless-Device Law",
      title: "What Texas Law Actually Requires",
      previewPoints: [
        "The statewide electronic-messaging rule",
        "Stricter rules for drivers under 18 and in school zones",
      ],
      sections: [
        {
          heading: "Electronic Messaging — Any Age",
          body: [
            "Texas law prohibits reading, writing, or sending an electronic message — texts, email, social media — while operating a vehicle, unless the vehicle is stopped (Transportation Code §545.4251). Exceptions include hands-free use, GPS/navigation, reporting a crime or emergency, and a message reasonably believed to concern an emergency. A first offense is a fine of $25–$99; a repeat offense $100–$200; if the violation causes death or serious bodily injury, it becomes a Class A misdemeanor with a fine up to $4,000 and up to a year in jail.",
          ],
        },
        {
          heading: "Under 18: No Wireless Device at All",
          body: [
            "A driver under 18 may not use a wireless communication device while driving at all — not just for messaging — except in an emergency (§545.424). Same fine structure as the general rule.",
          ],
        },
        {
          heading: "School Crossing Zones",
          body: [
            "No driver may use a wireless communication device while operating a vehicle within a school crossing zone, and no one may use one while driving a school or passenger bus with a minor aboard unless the bus is stopped (§545.425).",
          ],
        },
      ],
    },
  },
  {
    id: "T8-B11",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Law vs. Safe Choice",
      prompt: "A behavior isn't prohibited by law in every circumstance you can think of. Does that automatically mean it's low-risk?",
      choices: [
        { text: "No — legal doesn't automatically mean low-risk.", correct: true, feedback: "Right. A hands-free call is legal almost everywhere, but it still uses real cognitive attention — legal and low-risk aren't the same question." },
        { text: "Yes — if it's legal, it's safe.", correct: false, feedback: "The law sets a floor, not a safety guarantee — plenty of legal behaviors still create real distraction." },
      ],
    },
  },

  // ============================================================
  // Chapter 4 — Speed & Protection
  // ============================================================
  {
    id: "T8-L05",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Chapter 4 — What You'll Learn",
      title: "Speed as a Risk Multiplier",
      previewPoints: [
        "How speed affects reaction time, maneuvering margin, and collision severity",
      ],
      sections: [
        {
          heading: "More Than Just a Rule",
          body: [
            "Higher or inappropriate speed reduces the time you have to recognize and react to a hazard, reduces your margin to maneuver around it, and increases how severe a collision is if you can't avoid it. Topic 5 already covered how speed affects stopping distance — Topic 8's point is that speed doesn't just change one thing, it multiplies the effect of every other risk already present.",
          ],
        },
      ],
    },
  },
  {
    id: "T8-B12",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      rounds: [
        {
          eyebrow: "Speed Decision Lab — Dry & Clear",
          visual: SCENE_SPEED_DRY,
          prompt: "Should a driver's speed decision be based only on the posted maximum?",
          choices: [
            { text: "No — actual conditions and applicable law both matter.", correct: true, feedback: "Right, even in good conditions — the posted number is a ceiling, not automatically the right speed for every moment." },
            { text: "Yes — the posted maximum is always the right speed.", correct: false, feedback: "The posted maximum is a legal ceiling, not a guarantee that it's the appropriate speed for the moment." },
          ],
        },
        {
          eyebrow: "Speed Decision Lab — Heavy Rain",
          visual: SCENE_SPEED_RAIN,
          prompt: "Same road, now in heavy rain. Does the posted maximum change what's actually appropriate?",
          choices: [
            { text: "No — conditions require a lower speed even though the posted number hasn't changed.", correct: true, feedback: "Right. The legal ceiling stays the same; the appropriate speed for these conditions is lower." },
            { text: "Yes — you can drive the posted maximum regardless of rain.", correct: false, feedback: "Reduced traction means the posted maximum is no longer the safe choice, even though it's still legal up to that point." },
          ],
        },
        {
          eyebrow: "Speed Decision Lab — Night, Poor Visibility",
          visual: SCENE_SPEED_NIGHT,
          prompt: "Now it's night with poor visibility. What should guide the speed decision?",
          choices: [
            { text: "Actual visibility and conditions — not just the posted limit.", correct: true, feedback: "Right — the same principle every time: the driver has to account for actual conditions and applicable law together, not the posted number alone." },
            { text: "The posted maximum, since it's the same road as during the day.", correct: false, feedback: "The road is the same; the driver's ability to see it isn't — speed needs to reflect that." },
          ],
        },
      ],
    },
  },
  {
    id: "T8-L06",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      eyebrow: "Chapter 4 — Street Racing",
      title: "A Public Roadway Is Not a Closed Course",
      previewPoints: [
        "What conduct Texas law actually prohibits",
        "Why it's treated as a serious offense, not just reckless driving",
      ],
      visual: SCENE_STREET_RACING,
      sections: [
        {
          heading: "What's Prohibited",
          body: [
            "Texas Transportation Code §545.420 prohibits racing, a speed or acceleration contest, a drag race, a test of a vehicle operator's physical endurance, and speed-record attempts connected to these — on a public roadway, where other traffic and road users are genuinely unpredictable.",
          ],
        },
        {
          heading: "The Consequences Escalate",
          body: [
            "A basic offense is a Class B misdemeanor. It becomes a Class A misdemeanor with a prior conviction, or if the driver was intoxicated or had an open container. Two or more prior convictions make it a state jail felony. If the conduct causes bodily injury, it's a third-degree felony; if it causes serious bodily injury or death, a second-degree felony. Vehicles used in the offense are subject to mandatory impoundment.",
          ],
        },
      ],
    },
  },
  {
    id: "T8-B13",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Street-Racing Law Explorer",
      prompt: "Two drivers on a public road start speeding up to see who can pull ahead first. Is this just reckless driving, or something more?",
      choices: [
        { text: "Just reckless driving — no different from speeding.", correct: false, feedback: "Racing-related conduct on a public roadway is its own specific offense under Texas law, with its own escalating penalty structure — not just ordinary reckless driving." },
        { text: "A specific, separate offense under Texas law, with real legal consequences.", correct: true, feedback: "Right. It's prohibited conduct in its own right, with penalties that can escalate to a felony depending on prior history or outcome." },
      ],
    },
  },
  {
    id: "T8-L07",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Chapter 4 — Safety Belts",
      title: "Managing the Consequences, Not Just the Odds",
      previewPoints: [
        "What a safety belt actually does in a collision",
      ],
      sections: [
        {
          heading: "Protection When a Collision Happens",
          body: [
            "A safety belt doesn't prevent a collision — it helps manage the consequences when one happens, by keeping an occupant positioned and restrained instead of thrown against the interior or out of the vehicle. Proper use, every trip, for every occupant the vehicle has a belt for, is what makes that protection actually available when it's needed.",
          ],
        },
      ],
    },
  },
  {
    id: "T8-B14",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "\"Just a Short Trip\" Myth",
      visual: SCENE_SHORT_TRIP,
      prompt: "Your destination is only a few blocks away. Is a safety belt unnecessary because the trip is short?",
      choices: [
        { text: "No — trip length doesn't eliminate collision risk.", correct: true, feedback: "Right. A collision can happen in the first block just as easily as the fiftieth." },
        { text: "Yes — a short, familiar trip doesn't need one.", correct: false, feedback: "Distance doesn't change whether a collision could happen — the protection matters on every trip." },
      ],
    },
  },

  // ============================================================
  // Chapter 5 — Driving After Dark
  // ============================================================
  {
    id: "T8-L08",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Chapter 5 — What You'll Learn",
      title: "What Changes at Night?",
      previewPoints: [
        "How night driving reduces the information you have available",
        "How it interacts with the other risks already covered",
      ],
      sections: [
        {
          heading: "The Roadway Doesn't Change — Your View of It Does",
          body: [
            "Night driving can reduce visibility, the distance at which you detect a hazard, and how much visual detail you actually pick up. It also interacts with fatigue, glare, speed, and weather — another example of risk stacking, not a separate, unrelated risk.",
          ],
        },
      ],
    },
  },
  {
    id: "T8-B15",
    kind: "compare",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Day vs. Night Comparison",
      prompt: "Same roadway. What changed?",
      tabs: [
        { label: "Day View", visual: SCENE_DAY_VIEW, caption: "A pedestrian and an upcoming curve are both visible well in advance." },
        { label: "Night View", visual: SCENE_NIGHT_VIEW, caption: "The roadway itself hasn't changed — but the driver's available visual information has. Only what's within headlight range is really visible." },
      ],
    },
  },
  {
    id: "T8-B16",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Headlight Visibility, Speed & Glare",
      visual: SCENE_GLARE,
      prompt: "Night, rain, and limited visibility — plus glare from an oncoming vehicle's headlights. Which action increases your safety margin?",
      choices: [
        { text: "Reduce speed, increase following space, and glance toward the right edge of your lane rather than at the oncoming lights.", correct: true, feedback: "Right. Lower speed and more space give you the margin these conditions are taking away, and looking toward your own lane's edge — not directly at the glare — helps maintain your position without being blinded." },
        { text: "Stare directly at the oncoming headlights to track the other vehicle's position.", correct: false, feedback: "Looking directly into glare temporarily reduces your own vision further — use your lane position instead." },
      ],
    },
  },

  // ============================================================
  // Chapter 6 — Awareness & Final Application
  // ============================================================
  {
    id: "T8-L09",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 3.5,
    props: {
      eyebrow: "Chapter 6 — Human Trafficking Awareness",
      title: "Recognizing Concern, Responding Safely",
      previewPoints: [
        "What indicators are actually worth taking seriously",
        "Why appearance and stereotypes are not reliable indicators",
        "The appropriate, safe way to respond",
      ],
      sections: [
        {
          heading: "What to Watch For",
          body: [
            "Potential indicators include someone showing fear or anxiety around a controlling companion, being unable to speak for themselves or having someone else answer for them, visible signs of physical abuse or exhaustion, and appearing unable to come and go freely. No single indicator proves anything on its own — they're worth taking seriously in context, not treated as proof by themselves.",
          ],
        },
        {
          heading: "Not About Stereotypes",
          body: [
            "A potential victim can't be reliably identified by race, gender, clothing, nationality, or appearance alone. These indicators are about behavior and context — not who someone looks like.",
          ],
        },
        {
          heading: "The Safe Response",
          body: [
            "Don't put yourself or a potential victim in greater danger — that means no confrontation, no following a suspected trafficker, no attempting a rescue, and no investigating on your own. If someone is in immediate danger, call 911. Otherwise, the National Human Trafficking Hotline is available 24/7: call 1-888-373-7888 or text 233733.",
          ],
        },
      ],
    },
  },
  {
    id: "T8-B17",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 2.5,
    props: {
      rounds: [
        {
          eyebrow: "Indicator or Assumption? — Fear & Control",
          prompt: "A person appears fearful and won't speak without a companion answering for them. Is this a potential indicator worth taking seriously, or an unsupported assumption?",
          choices: [
            { text: "A potential indicator worth taking seriously.", correct: true, feedback: "Right — this is one of the behavior-based indicators recognized by official trafficking-awareness resources." },
            { text: "An unsupported assumption.", correct: false, feedback: "This specific pattern — visible fear, being unable to speak for oneself — is a recognized behavioral indicator, not a stereotype." },
          ],
        },
        {
          eyebrow: "Indicator or Assumption? — Appearance",
          prompt: "A person's nationality or the way they're dressed. Indicator, or assumption?",
          choices: [
            { text: "An unsupported assumption.", correct: true, feedback: "Right. Appearance, nationality, and clothing are not reliable indicators — relying on them is exactly the profiling this training warns against." },
            { text: "A potential indicator worth taking seriously.", correct: false, feedback: "Appearance alone isn't a real indicator — official guidance is explicit that this isn't a reliable basis for concern." },
          ],
        },
        {
          eyebrow: "Indicator or Assumption? — Traveling Alone",
          prompt: "A person is simply traveling alone. Indicator, or assumption?",
          choices: [
            { text: "An unsupported assumption.", correct: true, feedback: "Right. Traveling alone is completely ordinary — it isn't a trafficking indicator by itself." },
            { text: "A potential indicator worth taking seriously.", correct: false, feedback: "There's nothing inherently concerning about traveling alone — this isn't a real indicator." },
          ],
        },
      ],
    },
  },
  {
    id: "T8-B18",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Safe Response",
      prompt: "You notice a concerning situation that includes several recognized indicators. What's the appropriate role of an ordinary member of the public?",
      choices: [
        { text: "Recognize the concern and use the appropriate official reporting or assistance resource, without creating additional danger.", correct: true, feedback: "Right. Report through the appropriate channel — don't confront, follow, or investigate on your own." },
        { text: "Confront the people involved directly to find out what's happening.", correct: false, feedback: "Direct confrontation can put both you and a potential victim in greater danger — that's exactly what the safe-response guidance warns against." },
      ],
    },
  },
  {
    id: "T8-B19",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Human Trafficking Scenario",
      prompt: "At a rest stop, you notice someone who appears fearful, avoids eye contact, and doesn't speak when a companion is present — the companion answers every question for them. What should guide your next step?",
      choices: [
        { text: "\"Is this person definitely being trafficked?\" — you need certainty before doing anything.", correct: false, feedback: "Indicators don't prove a crime by themselves, and waiting for certainty isn't the standard — reporting a genuine concern is appropriate even without proof." },
        { text: "These are real indicators worth reporting through the appropriate resource, even without certainty.", correct: true, feedback: "Right. You're not expected to confirm what's happening — recognizing the indicators and using the appropriate reporting channel is the actual role of a member of the public here." },
      ],
    },
  },
  {
    id: "T8-B20",
    kind: "staged",
    poi: [POI],
    estimatedMinutes: 4,
    props: {
      eyebrow: "Final Risk-Management Challenge",
      completionTitle: "RISK MANAGEMENT IS ACTIVE",
      completionLines: [
        "You continuously notice, evaluate, adjust, and re-evaluate.",
        "No single decision here fixed everything — each one restored a little more margin.",
      ],
      stages: [
        {
          kind: "decision",
          label: "What Risk Do You Notice First?",
          visual: SCENE_FINAL_CHALLENGE,
          prompt: "Driving home after a long day: it's nighttime, rain is starting, a phone notification arrives, you feel tired, traffic ahead is slowing, and a passenger is talking. What do you notice first?",
          choices: [
            { text: "All of it — this is exactly how risk stacks in real driving.", correct: true, feedback: "Right. Naming the whole picture, not just one piece, is the first step of active risk management." },
            { text: "Only the phone notification, since that's the most obvious distraction.", correct: false, feedback: "Focusing on only one factor misses how the others — night, rain, fatigue, slowing traffic — are stacking at the same time." },
          ],
        },
        {
          kind: "decision",
          label: "What Can You Change?",
          prompt: "Of everything present, what's actually within your control right now?",
          choices: [
            { text: "Your speed, your following space, and where your attention goes.", correct: true, feedback: "Right. You can't control the rain or the passenger's mood, but you can control your own speed, space, and attention." },
            { text: "Nothing — the conditions are what they are.", correct: false, feedback: "Several things here are genuinely within your control, even though the weather and traffic aren't." },
          ],
        },
        {
          kind: "decision",
          label: "What Should Receive Your Attention?",
          prompt: "The phone notification is still there. What should get your attention right now?",
          choices: [
            { text: "The driving task — the notification can wait.", correct: true, feedback: "Right. Nothing about this notification outweighs the driving task in this moment." },
            { text: "A quick glance at the phone, since traffic is already slow.", correct: false, feedback: "Slow traffic doesn't mean low risk — a glance away is still a glance away from a developing situation." },
          ],
        },
        {
          kind: "decision",
          label: "Should Speed or Space Change?",
          prompt: "Rain has started and traffic is slowing. Should your speed or following space change?",
          choices: [
            { text: "Yes — reduce speed and increase following space for the rain and the slowing traffic.", correct: true, feedback: "Right. Both conditions call for the same adjustment: more space, less speed." },
            { text: "No — the posted limit hasn't changed, so neither should your speed.", correct: false, feedback: "The posted limit is a ceiling, not a target — actual conditions call for a real adjustment here." },
          ],
        },
        {
          kind: "decision",
          label: "If Fatigue Becomes Significant, What's the Safest Plan?",
          prompt: "The tiredness you noticed earlier is getting worse. What's the safest plan?",
          choices: [
            { text: "Stop somewhere safe and address the fatigue directly, rather than pushing through.", correct: true, feedback: "Right. Recognizing that fatigue has become significant — and actually stopping to address it — is the same principle from Chapter 2, now applied under real pressure." },
            { text: "Push through since you're almost home.", correct: false, feedback: "Being close to the destination doesn't make significant fatigue any less dangerous." },
          ],
        },
      ],
    },
  },
  {
    id: "T8-B21",
    kind: "compare",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Risk Mistake Spotter",
      prompt: "Two drivers, same conditions. Which one has preserved more options if something unexpected happens?",
      tabs: [
        { label: "Scene A", visual: SCENE_MISTAKE_RISK_A, caption: "Phone in hand, following closely, nighttime, rain — very little space or attention left to respond with." },
        { label: "Scene B", visual: SCENE_MISTAKE_RISK_B, caption: "Appropriate space, phone untouched, attention forward, appropriate speed — real margin available if something changes." },
      ],
    },
  },
  {
    id: "T8-B22",
    kind: "recap",
    poi: ["All Topic 8 review"],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Topic 8 Recap",
      prompt: "Tap each section for a quick review before the quiz.",
      sections: [
        {
          title: "Risk",
          points: [
            "Risk increases when conditions reduce time, space, visibility, traction, attention, or control.",
            "Risks stack — no single factor tells the whole story.",
          ],
        },
        {
          title: "Driver Condition",
          points: [
            "Most collisions start with a decision, not a mechanical failure.",
            "Fatigue and illness both call for addressing the actual condition, not masking or scheduling around it.",
          ],
        },
        {
          title: "Distraction",
          points: [
            "Visual, manual, and cognitive — a single distraction can involve more than one.",
            "Texas law bans electronic messaging while driving; drivers under 18 can't use a wireless device at all.",
          ],
        },
        {
          title: "Speed & Protection",
          points: [
            "Speed multiplies risk — less reaction time, less margin, harder impact.",
            "Street racing is its own serious offense, escalating up to a felony.",
            "Safety belts manage the consequences of a collision, on every trip.",
          ],
        },
        {
          title: "Night Driving",
          points: [
            "The roadway doesn't change at night — your available visual information does.",
          ],
        },
        {
          title: "Human Trafficking",
          points: [
            "Indicators are behavior-based, not appearance-based, and don't prove anything alone.",
            "Report through the appropriate channel — 1-888-373-7888 or text 233733 — without confronting anyone directly.",
          ],
        },
      ],
    },
  },
];
