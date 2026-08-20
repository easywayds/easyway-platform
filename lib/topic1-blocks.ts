// Structured curriculum data for Topic 1's interactive blocks — Welcome to
// Easy Way.
//
// Unlike Topics 3-8, Topic 1 has no pre-existing locked instructional text
// anywhere in this repository — the live DB content under this topic
// number was a different, older draft ("Course Introduction": a welcome
// video, a DPS-test-equivalence note, a crash-rate stat, no SAFE
// framework, 3 quiz questions) that doesn't match the seven-lesson/SAFE
// structure described in the Topic 1 build spec. Per the user's own
// decision after the repository audit surfaced this gap, this file's
// lesson text is authored fresh from the spec's stated purpose for each
// lesson, not copied from a locked source that doesn't exist in the repo.
//
// Two verified regulatory facts carried forward from the old content
// (confirmed current via WebSearch against idrivesafely.com,
// texasapprovedcourses.com, and mydrivinglogic.com coverage of TDLR rules):
//   - First-time Texas driver-license applicants ages 18-24 must complete
//     a TDLR-approved 6-hour adult driver-education course (exemptions:
//     valid out-of-state license holders, applicants 25+, and military
//     members/dependents with a valid out-of-state license).
//   - Passing the course's final assessment substitutes for the DPS Class C
//     written knowledge test — it does not replace the separate driving
//     skills test.
// The old content's specific "4.8x" crash-rate statistic was NOT carried
// forward (unverified in the time available, and the spec explicitly
// warns against introducing unsupported numerical statistics) — the
// underlying point (newer drivers face elevated risk) is instead stated
// qualitatively in the risk lesson.
//
// The Easy Way SAFE framework (SEE / ANTICIPATE / FIND SPACE / EXECUTE
// SAFELY) already exists in this codebase, introduced independently in
// Topics 3 and 4 and referenced once in Topic 7 — each with the identical
// disclaimer used here ("an Easy Way teaching framework... not Texas law
// or a TDLR/DPS term"). Per the user's explicit decision, Topics 3/4/7 are
// NOT being changed to reference back to this Topic 1 origin — they keep
// their own full re-introductions exactly as already shipped.
//
// POI note: every block is tagged with the topic-level POI code
// "4.1.1.1" rather than invented letter-subsection codes, consistent with
// every other topic in this course.

import type { DecisionChallengeProps } from "@/components/course/DecisionChallenge";
import type { CompareScenesProps } from "@/components/course/CompareScenes";
import type { DecisionSequenceProps } from "@/components/course/DecisionSequence";
import type { HotspotSceneProps } from "@/components/course/HotspotScene";
import type { StagedScenarioProps } from "@/components/course/StagedScenario";
import type { RecapAccordionProps } from "@/components/course/RecapAccordion";
import type { LessonScreenProps } from "@/components/course/LessonScreen";
import {
  SCENE_T1_INTERSECTION,
  SCENE_WHO_IS_AFFECTED,
  SCENE_RISK_LAYERS,
  SCENE_TRAFFIC_CHAOS,
  SCENE_TRAFFIC_ORGANIZED,
  SCENE_LATE_CHOICE,
  SCENE_TRAFFIC_SLOWING,
  SCENE_SAFE_SEE,
  SCENE_SAFE_ANTICIPATE,
  SCENE_SAFE_SPACE,
  SCENE_SAFE_EXECUTE,
} from "./topic1-scenes";

const POI = "4.1.1.1";

export const TOPIC1_CHAPTERS: { title: string; blockIds: string[] }[] = [
  { title: "1.1 — Welcome to Easy Way", blockIds: ["T1-B00", "T1-L01", "T1-B01", "T1-B02"] },
  { title: "1.2 — Driving Is a Privilege", blockIds: ["T1-L02", "T1-B03", "T1-B04", "T1-B04b"] },
  { title: "1.3 — Understanding Driving Risk", blockIds: ["T1-L03", "T1-B05", "T1-B06", "T1-B07"] },
  { title: "1.4 — Traffic Laws Are Decision Tools", blockIds: ["T1-L04", "T1-B08", "T1-B09", "T1-B10"] },
  { title: "1.5 — Your Choices Have Consequences", blockIds: ["T1-L05", "T1-B11", "T1-B12"] },
  { title: "1.6 — The Easy Way SAFE System", blockIds: ["T1-L06", "T1-B13", "T1-B14", "T1-B15"] },
  { title: "1.7 — Learning Doesn't End Here", blockIds: ["T1-L07", "T1-B16", "T1-B17"] },
  { title: "Module 1 Summary", blockIds: ["T1-L08", "T1-B18"] },
];

export const TOPIC1_PRACTICE_BLOCK_IDS = ["T1-B06", "T1-B07", "T1-B13", "T1-B14", "T1-B18"];

export type Topic1Block =
  | { id: string; kind: "decision"; poi: string[]; estimatedMinutes: number; props: DecisionChallengeProps }
  | { id: string; kind: "compare"; poi: string[]; estimatedMinutes: number; props: CompareScenesProps }
  | { id: string; kind: "sequence"; poi: string[]; estimatedMinutes: number; props: DecisionSequenceProps }
  | { id: string; kind: "hotspot"; poi: string[]; estimatedMinutes: number; props: HotspotSceneProps }
  | { id: string; kind: "staged"; poi: string[]; estimatedMinutes: number; props: StagedScenarioProps }
  | { id: string; kind: "recap"; poi: string[]; estimatedMinutes: number; props: RecapAccordionProps }
  | { id: string; kind: "learn"; poi: string[]; estimatedMinutes: number; props: LessonScreenProps };

export const TOPIC1_BLOCKS: Topic1Block[] = [
  // ============================================================
  // Opening hook — before Lesson 1.1, ungraded
  // ============================================================
  {
    id: "T1-B00",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 1,
    props: {
      eyebrow: "Before We Begin",
      visual: SCENE_T1_INTERSECTION,
      prompt: "A driver approaches this intersection. What is the driver actually doing?",
      choices: [
        { text: "Only steering the vehicle.", correct: false, feedback: "Steering is one small part of it — there's a lot more happening than just the wheel." },
        { text: "Only following traffic signs.", correct: false, feedback: "Signs are one input among several — the driver is taking in far more than that." },
        { text: "Constantly observing, evaluating, and making decisions.", correct: true, feedback: "Right. Driving may look like steering, accelerating, and braking — but underneath those actions is a continuous series of decisions." },
        { text: "Waiting for another driver to tell them what to do.", correct: false, feedback: "A responsible driver doesn't wait for cues from other drivers to know what to do next." },
      ],
    },
  },

  // ============================================================
  // Lesson 1.1 — Welcome to Easy Way
  // ============================================================
  {
    id: "T1-L01",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Lesson 1.1",
      title: "Welcome to Easy Way",
      previewPoints: ["Why you're taking this course", "What this course actually allows you to do"],
      sections: [
        {
          heading: "Why Am I Taking This Course?",
          body: [
            "Easy Way Driving School is an approved Texas Adult Driver Education provider (TDLR license C3677). This course is built to give you the knowledge and judgment for responsible, reduced-risk driving on Texas roadways — not just to check a box.",
          ],
        },
        {
          heading: "Who This Course Is For",
          body: [
            "Texas requires first-time driver-license applicants ages 18 through 24 to complete a TDLR-approved adult driver-education course before applying for a license. (Exemptions apply for valid out-of-state license holders, applicants 25 and older, and military members or dependents with a valid out-of-state license.)",
          ],
        },
        {
          heading: "What Completing This Course Allows",
          body: [
            "Passing this course's required final assessment satisfies the driver-education requirement and lets an eligible student take the applicable knowledge examination through the approved course — meaning you won't need to separately take the written knowledge test at a DPS office. It doesn't replace the separate driving skills test.",
          ],
        },
      ],
    },
  },
  {
    id: "T1-B01",
    kind: "recap",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Your Course Journey",
      prompt: "Here's everything ahead. Tap each stage for a one-sentence preview.",
      sections: [
        { title: "Your License", points: ["Understand the responsibilities that come with becoming a Texas driver."] },
        { title: "Right-of-Way", points: ["Learn how drivers determine who proceeds and who yields."] },
        { title: "Traffic Control", points: ["Understand the signs, signals, and markings that organize roadway movement."] },
        { title: "Traffic Flow", points: ["Learn how speed, space, and positioning help keep traffic moving safely."] },
        { title: "Alcohol & Other Drugs", points: ["Understand impairment, Texas law, and responsible choices."] },
        { title: "Sharing the Road", points: ["Learn how to cooperate with other roadway users."] },
        { title: "Managing Risk", points: ["Learn how drivers recognize and reduce developing risks."] },
        { title: "Final Assessment", points: ["Demonstrate what you've learned."] },
      ],
    },
  },
  {
    id: "T1-B02",
    kind: "recap",
    poi: [POI],
    estimatedMinutes: 1,
    props: {
      eyebrow: "How This Course Works",
      prompt: "A quick look at how the course is structured. Tap each step.",
      sections: [
        { title: "Progress", points: ["The course tracks your progress as you go, so nothing is lost between sessions."] },
        { title: "Required Course Time", points: ["Texas Adult Driver Education is a required instructional course. Easy Way tracks valid course participation while you complete the learning activities."] },
        { title: "Learning Activities & Quizzes", points: ["Some activities are required to unlock the next Topic. Short quizzes along the way help check your understanding."] },
        { title: "Final Assessment & Progress Saving", points: ["The course concludes with the required assessment process. Your valid progress is saved, so you can pick up right where you left off."] },
      ],
    },
  },

  // ============================================================
  // Lesson 1.2 — Driving Is a Privilege
  // ============================================================
  {
    id: "T1-L02",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Lesson 1.2",
      title: "Driving Is a Privilege",
      previewPoints: ["What driving gives you", "What driving requires from you in return"],
      sections: [
        {
          heading: "A Privilege, Not a Guarantee",
          body: [
            "Texas extends the privilege of driving to you — it isn't an automatic right. That privilege comes with real responsibilities, obligations, and potential consequences attached to how you use it.",
          ],
        },
        {
          heading: "What This Means for You",
          body: [
            "Every rule you'll learn in this course exists because someone's safety depends on you knowing it. This course isn't about memorizing rules to pass a test — it's about becoming someone Texas, and the people around you on the road, can trust with a license.",
          ],
        },
      ],
    },
  },
  {
    id: "T1-B03",
    kind: "recap",
    poi: [POI],
    estimatedMinutes: 1,
    props: {
      eyebrow: "Privilege vs. Responsibility",
      prompt: "Driving is both of these at once. Tap each side.",
      sections: [
        {
          title: "Driving Gives You",
          points: ["Mobility", "Independence", "Access", "Convenience"],
        },
        {
          title: "Driving Also Requires",
          points: [
            "Following traffic law",
            "Protecting other roadway users",
            "Maintaining control of your vehicle",
            "Making responsible decisions",
            "Accepting the consequences of those decisions",
          ],
        },
      ],
    },
  },
  {
    id: "T1-B04",
    kind: "hotspot",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Who Is Affected by Your Decisions?",
      prompt: "Tap everyone your driving decisions could affect.",
      visual: SCENE_WHO_IS_AFFECTED,
      mode: "identify-all",
      hotspots: [
        { id: "driver", label: "Driver (you)", x: 25, y: 55, explanation: "You're always affected by your own decisions first." },
        { id: "passenger", label: "Passenger", x: 55, y: 24, explanation: "Anyone riding with you shares the outcome of your decisions." },
        { id: "pedestrian", label: "Pedestrian", x: 50, y: 68, explanation: "A pedestrian has no protection from a vehicle — your decisions directly affect their safety." },
        { id: "bicyclist", label: "Bicyclist", x: 82, y: 74, explanation: "A bicyclist shares the roadway and is affected by how much space and attention you give them." },
        { id: "other-driver", label: "Other driver", x: 68, y: 30, explanation: "Every other driver on the road is affected by whether your decisions are predictable and legal." },
        { id: "road-worker", label: "Road worker", x: 8, y: 30, explanation: "Anyone working near the roadway depends on drivers making careful, attentive decisions." },
      ],
    },
  },
  {
    id: "T1-B04b",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 0.5,
    props: {
      eyebrow: "Responsibility Reflection",
      prompt: "Which statement best describes responsible driving?",
      choices: [
        { text: "Driving however you prefer as long as you avoid a ticket.", correct: false, feedback: "Avoiding a ticket isn't the same as driving responsibly — plenty of risky choices never get a driver pulled over." },
        { text: "Knowing the law and making decisions that reduce unnecessary risk.", correct: true, feedback: "Right. Responsible driving combines legal knowledge with decisions that actively reduce risk, not just decisions that avoid getting caught." },
        { text: "Following other drivers even when they are unsafe.", correct: false, feedback: "Copying an unsafe driver just adds your own vehicle to the same risk." },
        { text: "Driving faster when you're late.", correct: false, feedback: "Being late doesn't change what a safe speed actually is." },
      ],
    },
  },

  // ============================================================
  // Lesson 1.3 — Understanding Driving Risk
  // ============================================================
  {
    id: "T1-L03",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 1,
    props: {
      eyebrow: "Lesson 1.3",
      title: "Understanding Driving Risk",
      previewPoints: ["What driving risk actually is", "Why newer drivers tend to face more of it"],
      sections: [
        {
          heading: "Risk Is Always Present",
          body: [
            "Driving always involves some level of risk — the amount and type changes with the environment, traffic, visibility, other roadway users, and the decisions a driver makes.",
          ],
        },
        {
          heading: "Why This Matters for New Drivers",
          body: [
            "Drivers with less experience behind the wheel tend to face a higher risk of a crash — not because they're reckless, but because the instincts that come from time and practice behind the wheel simply haven't developed yet. This course is built to close that gap by building the judgment that experience would otherwise take time to teach.",
          ],
        },
      ],
    },
  },
  {
    id: "T1-B05",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 0.75,
    props: {
      eyebrow: "Risk Is Always Present",
      visual: SCENE_RISK_LAYERS,
      prompt: "Clear daylight becomes traffic, a pedestrian, light rain, and a construction zone. Did driving suddenly become \"dangerous,\" or did something else happen?",
      choices: [
        { text: "It suddenly became dangerous out of nowhere.", correct: false, feedback: "Driving didn't switch from \"safe\" to \"dangerous\" all at once — risk isn't that binary." },
        { text: "The amount and type of risk changed as conditions changed.", correct: true, feedback: "Right. Risk changes with environment, traffic, visibility, roadway users, and driver decisions — it's not something that's simply \"on\" or \"off.\"" },
      ],
    },
  },
  {
    id: "T1-B06",
    kind: "sequence",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      ruleCardTitle: "CONTROL VS. CANNOT CONTROL",
      ruleCardLines: [
        "You can control your attention, speed decisions, following decisions, and whether you obey traffic law.",
        "You cannot fully control another driver's decisions, sudden weather changes, or someone else's mistake.",
        "Responsible driving focuses on controlling your own choices while preparing for things you cannot control.",
      ],
      rounds: [
        {
          eyebrow: "Can You Control This? — Your Attention",
          prompt: "Whether you stay focused on the driving task.",
          choices: [
            { text: "Yes — this is within your control.", correct: true, feedback: "Right. Where your attention goes is your own decision." },
            { text: "No — this is outside your control.", correct: false, feedback: "Attention is actually one of the things most fully within your control." },
          ],
        },
        {
          eyebrow: "Can You Control This? — Another Driver's Mistake",
          prompt: "Whether another driver runs a stop sign near you.",
          choices: [
            { text: "Yes — this is within your control.", correct: false, feedback: "You can't control what another driver decides to do." },
            { text: "No — this is outside your control.", correct: true, feedback: "Right. You can't control another driver's decisions — but you can control how much margin you leave in case they make a mistake." },
          ],
        },
        {
          eyebrow: "Can You Control This? — Sudden Weather",
          prompt: "Whether it suddenly starts raining while you're driving.",
          choices: [
            { text: "Yes — this is within your control.", correct: false, feedback: "The weather itself isn't something a driver controls." },
            { text: "No — this is outside your control.", correct: true, feedback: "Right. Weather is outside your control — but how you respond to it (speed, space, attention) is squarely within it." },
          ],
        },
        {
          eyebrow: "Can You Control This? — Following Distance",
          prompt: "How much space you leave behind the vehicle ahead of you.",
          choices: [
            { text: "Yes — this is within your control.", correct: true, feedback: "Right. Following distance is entirely your own decision." },
            { text: "No — this is outside your control.", correct: false, feedback: "Following distance is actually one of the clearest things a driver controls directly." },
          ],
        },
      ],
    },
  },
  {
    id: "T1-B07",
    kind: "compare",
    poi: [POI],
    estimatedMinutes: 0.75,
    props: {
      eyebrow: "Small Decision, Big Difference",
      prompt: "Same roadway, two drivers. Which one has more options if something changes?",
      tabs: [
        { label: "Driver A", caption: "Distracted, following closely. If traffic ahead changes suddenly, there's very little time or space to respond." },
        { label: "Driver B", caption: "Attentive, maintaining appropriate space. If traffic ahead changes, there's real time and room to respond safely." },
      ],
      ruleCard: {
        title: "PRESERVING OPTIONS",
        lines: ["Attention and space are decisions you make before anything happens.", "Those decisions determine how many options you have left when something does."],
      },
    },
  },

  // ============================================================
  // Lesson 1.4 — Traffic Laws Are Decision Tools
  // ============================================================
  {
    id: "T1-L04",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Lesson 1.4",
      title: "Traffic Laws Are Decision Tools",
      previewPoints: ["Why traffic laws exist in the first place", "How a law becomes an actual driving decision"],
      sections: [
        {
          heading: "Not Just Rules to Memorize",
          body: [
            "Traffic law helps drivers make predictable, legal decisions — it isn't a list of facts to memorize just because they're on a test. Knowing the law helps you choose an appropriate action instead of guessing.",
          ],
        },
        {
          heading: "A Shared System of Expectations",
          body: [
            "Signals, stop signs, lane markings, and speed limits all give every road user the same shared system of expectations — they help drivers anticipate what others are expected to do next.",
          ],
        },
      ],
    },
  },
  {
    id: "T1-B08",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 0.75,
    props: {
      eyebrow: "Why Do Traffic Laws Exist?",
      prompt: "What do shared rules like signals, stop signs, lane markings, and speed limits actually give road users?",
      choices: [
        { text: "A guarantee that no one will ever make a mistake.", correct: false, feedback: "No rule can guarantee that — traffic law reduces conflict, it doesn't eliminate human error." },
        { text: "A shared system of expectations.", correct: true, feedback: "Right. Traffic laws give every road user a common framework so they can anticipate what others are expected to do." },
        { text: "Something that only matters when a police officer is watching.", correct: false, feedback: "Traffic law matters because it organizes real roadway behavior — not just because someone might be watching." },
      ],
    },
  },
  {
    id: "T1-B09",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 0.5,
    props: {
      eyebrow: "Law → Decision",
      prompt: "A traffic law only reduces conflict once a driver does two things with it: understand the rule, and then recognize the situation it applies to. What comes right after recognizing the situation?",
      choices: [
        { text: "Make the legal decision.", correct: true, feedback: "Right — the chain is: understand the rule, recognize the situation, make the legal decision, reduce conflict." },
        { text: "Wait to see what other drivers do.", correct: false, feedback: "Waiting on other drivers replaces your own understanding of the rule with a guess about theirs." },
      ],
    },
  },
  {
    id: "T1-B10",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 0.5,
    props: {
      eyebrow: "Rule or Guess?",
      prompt: "At a four-way stop, one driver simply follows the car beside them because that driver moved. Another driver understands the actual right-of-way rule and decides accordingly. Which approach is more reliable?",
      choices: [
        { text: "Following what another driver does.", correct: false, feedback: "Another driver might be wrong, distracted, or breaking the rule themselves — copying them is a guess, not a decision." },
        { text: "Understanding and applying the actual rule.", correct: true, feedback: "Right. Later in this course, you'll learn the actual right-of-way rules that apply to situations like this one." },
      ],
    },
  },

  // ============================================================
  // Lesson 1.5 — Your Choices Have Consequences
  // ============================================================
  {
    id: "T1-L05",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Lesson 1.5",
      title: "Your Choices Have Consequences",
      previewPoints: ["How one choice can lead to a chain of results", "The different kinds of consequences a driving choice can create"],
      sections: [
        {
          heading: "Choice → Result",
          body: [
            "Every driving decision sits at the start of a chain: a situation, a choice, an immediate result, and a possible consequence. Reducing risk often just means recognizing that chain before it plays out.",
          ],
        },
        {
          heading: "Consequences Aren't Only Tickets",
          body: [
            "A driving decision can create legal consequences (tickets, license-related outcomes where applicable), financial consequences (costs tied to a violation or collision where applicable), safety consequences (injury or property damage), and personal consequences (loss of mobility or other effects depending on circumstances).",
          ],
        },
      ],
    },
  },
  {
    id: "T1-B11",
    kind: "staged",
    poi: [POI],
    estimatedMinutes: 1.75,
    props: {
      eyebrow: "Consequence Chain",
      completionTitle: "SITUATION → CHOICE → RESULT → CONSEQUENCE",
      completionLines: [
        "Every driving decision starts a chain like this one.",
        "Recognizing the chain before it plays out is what reduces risk.",
      ],
      stages: [
        {
          kind: "info",
          label: "Situation",
          visual: SCENE_LATE_CHOICE,
          text: "A driver is running late for an appointment.",
        },
        {
          kind: "info",
          label: "Choice",
          text: "The driver chooses to drive well above the speed limit to make up time.",
        },
        {
          kind: "decision",
          label: "Immediate Result",
          prompt: "What does driving well above the speed limit actually reduce?",
          choices: [
            { text: "Reaction time and stopping distance.", correct: true, feedback: "Right. Higher speed leaves less time to recognize a hazard and less distance to stop." },
            { text: "Nothing — speed doesn't affect how quickly a driver can respond.", correct: false, feedback: "Speed directly affects both reaction time and stopping distance." },
          ],
        },
        {
          kind: "decision",
          label: "Possible Consequence",
          prompt: "Given less time and distance to respond, what's a realistic possible consequence of this choice?",
          choices: [
            { text: "A greater risk of a violation or a collision.", correct: true, feedback: "Right. Being late is a scheduling problem — choosing excessive speed turns it into a safety and legal risk instead." },
            { text: "None — arriving on time outweighs any risk.", correct: false, feedback: "Arriving a few minutes earlier doesn't offset a real increase in collision or violation risk." },
          ],
        },
      ],
    },
  },
  {
    id: "T1-B12",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 0.5,
    props: {
      eyebrow: "Choose the Next Step",
      visual: SCENE_TRAFFIC_SLOWING,
      prompt: "Traffic ahead slows unexpectedly. What's the reduced-risk choice?",
      choices: [
        { text: "Look at your phone since traffic is slow anyway.", correct: false, feedback: "Slow traffic can change again just as unexpectedly as it slowed — looking away doesn't reduce that." },
        { text: "Move closer to the vehicle ahead.", correct: false, feedback: "Closing the gap in slowing traffic reduces your own response time, not increases it." },
        { text: "Maintain attention and appropriate space.", correct: true, feedback: "Right — your decision preserved options. If traffic changes again, you still have room and time to respond." },
      ],
    },
  },

  // ============================================================
  // Lesson 1.6 — The Easy Way SAFE System
  // ============================================================
  {
    id: "T1-L06",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Lesson 1.6",
      title: "The Easy Way SAFE System",
      previewPoints: ["A simple framework you'll use throughout this entire course", "Four steps: SEE, ANTICIPATE, FIND SPACE, EXECUTE SAFELY"],
      sections: [
        {
          heading: "S.A.F.E. — An Easy Way Teaching Framework",
          body: [
            "SEE: actively scan what's happening — vehicles, pedestrians, signals, roadway conditions — not just what's directly ahead of you.",
            "ANTICIPATE: expect what could realistically happen next, rather than assuming everything will stay the same.",
            "FIND SPACE: identify your safety margin — following distance, lane options, room to respond.",
            "EXECUTE SAFELY: make the legal, controlled response — apply what you saw and anticipated instead of just reacting at the last second.",
            "S.A.F.E. is an Easy Way teaching framework to help the ideas stick — it isn't Texas law or a TDLR/DPS term.",
          ],
        },
      ],
    },
  },
  {
    id: "T1-B13",
    kind: "staged",
    poi: [POI],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Introducing S.A.F.E.",
      completionTitle: "S — A — F — E",
      completionLines: [
        "SEE what's happening.",
        "ANTICIPATE what could change.",
        "FIND SPACE for your margin.",
        "EXECUTE SAFELY when it's time to act.",
      ],
      stages: [
        { kind: "info", label: "S — SEE", visual: SCENE_SAFE_SEE, text: "What is happening right now? Scan the whole scene — vehicles, pedestrians, the signal, and the roadway condition." },
        { kind: "info", label: "A — ANTICIPATE", visual: SCENE_SAFE_ANTICIPATE, text: "What could happen next? A vehicle may stop, a pedestrian may cross, a signal may change." },
        { kind: "info", label: "F — FIND SPACE", visual: SCENE_SAFE_SPACE, text: "Where is your safety margin? Following space, lane options, and room to respond all count." },
        { kind: "info", label: "E — EXECUTE SAFELY", visual: SCENE_SAFE_EXECUTE, text: "Make the legal, controlled response — using what you saw and anticipated." },
      ],
    },
  },
  {
    id: "T1-B14",
    kind: "staged",
    poi: [POI],
    estimatedMinutes: 2,
    props: {
      eyebrow: "S.A.F.E. Walkthrough",
      completionTitle: "S.A.F.E. IN ACTION",
      completionLines: [
        "SEE, ANTICIPATE, FIND SPACE, EXECUTE SAFELY — applied to one real scenario, step by step.",
      ],
      stages: [
        {
          kind: "decision",
          label: "S — SEE",
          visual: SCENE_SAFE_SEE,
          prompt: "A vehicle ahead approaches an intersection where a pedestrian stands near the crossing. What should you be scanning for first?",
          choices: [
            { text: "The vehicle ahead, the pedestrian near the crossing, and the signal.", correct: true, feedback: "Right — SEE means scanning the whole scene, not just the car in front of you." },
            { text: "Only the vehicle directly ahead.", correct: false, feedback: "Watching only the car ahead misses the pedestrian and signal that actually decide what happens next." },
          ],
        },
        {
          kind: "decision",
          label: "A — ANTICIPATE",
          prompt: "What could realistically change in the next few seconds?",
          choices: [
            { text: "The vehicle ahead may stop, or the pedestrian may step into the crossing.", correct: true, feedback: "Right — anticipating means expecting a realistic change, not assuming everything stays the same." },
            { text: "Nothing — the situation will stay exactly as it is.", correct: false, feedback: "Assuming nothing will change is exactly what ANTICIPATE guards against." },
          ],
        },
        {
          kind: "decision",
          label: "F — FIND SPACE",
          prompt: "Which gives you more room to respond if the vehicle ahead stops suddenly?",
          choices: [
            { text: "Maintaining a following distance you can stop within.", correct: true, feedback: "Right — that following distance is your safety margin." },
            { text: "Closing the gap so you don't fall behind.", correct: false, feedback: "Closing the gap removes the exact margin FIND SPACE is meant to preserve." },
          ],
        },
        {
          kind: "decision",
          label: "E — EXECUTE SAFELY",
          prompt: "Given all of that, what's your best action approaching this intersection?",
          choices: [
            { text: "Cover the brake, maintain space, and be ready to stop for the pedestrian.", correct: true, feedback: "Right — that's SEE, ANTICIPATE, and FIND SPACE all coming together in one controlled response." },
            { text: "Maintain your current speed and assume the pedestrian will wait.", correct: false, feedback: "Assuming the pedestrian will wait is a guess, not a decision built on what you saw and anticipated." },
          ],
        },
      ],
    },
  },
  {
    id: "T1-B15",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 1,
    props: {
      eyebrow: "S.A.F.E. Is a Thinking Process",
      title: "A Cycle, Not a One-Time Step",
      previewPoints: ["Why SAFE repeats instead of stopping after one use"],
      sections: [
        {
          heading: "SEE → Anticipate → Find Space → Execute Safely → See Again",
          body: [
            "SAFE isn't something you use only in emergencies. Driving continuously changes, so the process repeats — SEE again, ANTICIPATE again, and so on. You'll see this same framework applied throughout the rest of this course as new situations come up.",
          ],
        },
      ],
    },
  },

  // ============================================================
  // Lesson 1.7 — Learning Doesn't End Here
  // ============================================================
  {
    id: "T1-L07",
    kind: "learn",
    poi: [POI],
    estimatedMinutes: 1,
    props: {
      eyebrow: "Lesson 1.7",
      title: "Learning Doesn't End Here",
      previewPoints: ["Why passing this course isn't the end of learning to drive"],
      sections: [
        {
          heading: "A Foundation, Not a Finish Line",
          body: [
            "Passing this course is not the end of learning to drive. Real driving ability develops through knowledge, observation, responsible practice, and continued experience — this course gives you the foundation the rest of that development builds on.",
          ],
        },
      ],
    },
  },
  {
    id: "T1-B16",
    kind: "recap",
    poi: [POI],
    estimatedMinutes: 1,
    props: {
      eyebrow: "What Happens Next?",
      prompt: "Tap each stage.",
      sections: [
        { title: "Learn the Foundation", points: ["This course — the knowledge and judgment this course is built to give you."] },
        { title: "Understand Texas Rules", points: ["The specific right-of-way, traffic-control, and traffic-flow rules covered in the Topics ahead."] },
        { title: "Practice Decisions", points: ["Applying what you've learned to realistic scenarios throughout this course."] },
        { title: "Build Experience", points: ["Real time behind the wheel, after this course, builds the instincts experience provides."] },
        { title: "Continue Learning", points: ["Responsible driving is something you keep learning well beyond this course."] },
      ],
    },
  },
  {
    id: "T1-B17",
    kind: "decision",
    poi: [POI],
    estimatedMinutes: 0.5,
    props: {
      eyebrow: "Future You",
      prompt: "Six months from now, what do you want to remember from this course?",
      choices: [
        { text: "Just enough to have passed the quizzes.", correct: false, feedback: "Passing a quiz is a checkpoint, not the actual goal of this course." },
        { text: "Watch what other drivers do and copy them.", correct: false, feedback: "Other drivers aren't always making good decisions — copying them isn't a reliable standard." },
        { text: "Make legal, informed, reduced-risk decisions.", correct: true, feedback: "Right. That's exactly what this entire course is built toward." },
      ],
    },
  },

  // ============================================================
  // Module 1 Summary
  // ============================================================
  {
    id: "T1-L08",
    kind: "learn",
    poi: ["All Topic 1 review"],
    estimatedMinutes: 1,
    props: {
      eyebrow: "Module 1 Summary",
      title: "What You've Learned",
      previewPoints: [],
      sections: [
        {
          heading: "Driving Is a Privilege",
          body: ["It comes with real responsibility, obligations, and potential consequences."],
        },
        {
          heading: "Driving Involves Risk",
          body: ["Risk is always present, and it changes with conditions, roadway users, and driver decisions."],
        },
        {
          heading: "Traffic Laws Guide Decisions",
          body: ["They give every road user a shared system of expectations."],
        },
        {
          heading: "Choices Have Consequences",
          body: ["Legal, financial, safety, and personal — a single decision can lead anywhere on that list."],
        },
        {
          heading: "S.A.F.E. Helps Organize Your Thinking",
          body: ["SEE → ANTICIPATE → FIND SPACE → EXECUTE SAFELY — a cycle you'll keep using throughout this course."],
        },
      ],
    },
  },
  {
    id: "T1-B18",
    kind: "staged",
    poi: ["All Topic 1 review"],
    estimatedMinutes: 2,
    props: {
      eyebrow: "Final Topic 1 Decision",
      completionTitle: "HERE'S A FRAMEWORK FOR MAKING THOSE DECISIONS",
      completionLines: [
        "Driving involves constant decisions — SAFE is how you make them well.",
        "Topic 2 begins applying this foundation to the actual Texas rules for right-of-way.",
      ],
      stages: [
        {
          kind: "decision",
          label: "S — SEE",
          visual: SCENE_T1_INTERSECTION,
          prompt: "Back to the intersection from the start of this Topic. What should a responsible driver actively be scanning for?",
          choices: [
            { text: "The vehicle ahead, the pedestrian, the signal, and the cross traffic.", correct: true, feedback: "Right — SEE means the whole scene, exactly like it did at the very start of this Topic." },
            { text: "Only the posted speed limit.", correct: false, feedback: "The speed limit is one piece of information among several that matter here." },
          ],
        },
        {
          kind: "decision",
          label: "A — ANTICIPATE",
          prompt: "What should this driver anticipate?",
          choices: [
            { text: "The pedestrian could step into the crossing, or cross traffic could enter before it's clear.", correct: true, feedback: "Right — anticipating the realistic possibility, not assuming everything stays the same." },
            { text: "Nothing — everyone else will behave exactly as expected.", correct: false, feedback: "Assuming perfect behavior from everyone else is exactly what ANTICIPATE guards against." },
          ],
        },
        {
          kind: "decision",
          label: "F — FIND SPACE",
          prompt: "What gives this driver the most room to respond if something changes?",
          choices: [
            { text: "Appropriate following distance and a speed matched to conditions.", correct: true, feedback: "Right — that combination is the driver's safety margin here." },
            { text: "Driving as close as possible to the vehicle ahead to keep up with traffic.", correct: false, feedback: "Closing the gap removes the exact margin this driver needs." },
          ],
        },
        {
          kind: "decision",
          label: "E — EXECUTE SAFELY",
          prompt: "Given everything you've seen and anticipated, what's the responsible driver's best action here?",
          choices: [
            { text: "A controlled, legal response — ready to yield or stop if the situation calls for it.", correct: true, feedback: "Right. That's SEE, ANTICIPATE, and FIND SPACE all coming together — exactly what this course is built to teach you to do, every time you drive." },
            { text: "Proceed at full speed and react only if something goes wrong.", correct: false, feedback: "Reacting only after something goes wrong is exactly what SAFE is designed to prevent." },
          ],
        },
      ],
    },
  },
];
