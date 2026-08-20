// Structured curriculum data for Topic 2's interactive blocks — Your
// License to Drive.
//
// Repository audit findings (see the KEEP/EXPAND/REPLACE/ADD/VERIFY report
// delivered to the user before this file was written): the existing 7 flat
// TopicContent rows were factually decent but far too thin for the
// 35-minute curriculum allocation, had no interactivity, and had two real
// legal-currency problems that are corrected here:
//   - "Impact Texas Drivers (ITD)" was replaced with the correct
//     adult-specific "Impact Texas Adult Drivers (ITAD)" terminology
//     (1 hour, 3 modules, distinct from the teen ITTD course).
//   - The Texas Driving with Disability Program description was rewritten
//     for the DPS card-design update announced May 19, 2026: a qualifying
//     participant's chosen indicator ("Communication Impediment" or the
//     new "Deaf/Hard of Hearing" option) is now shown prominently on the
//     FRONT of the DL/ID card, not the back, and either option is
//     available (previously Communication Impediment only). Form DL-101
//     (Physician/Psychiatrist's Statement) is still required at an
//     in-person DPS appointment.
// The existing inspection/registration content and the suspension/
// revocation trigger list were both already accurate and are preserved.
// Financial Responsibility (POI E) and the integrated driver-responsibility
// scenario (POI F) did not exist in the prior content at all and are new.
//
// Verified facts and sources (WebSearch, cross-referenced against DPS/TxDMV
// pages and Transportation Code citations):
//   - Noncommercial safety inspection eliminated statewide Jan 1, 2025
//     (HB 3297); commercial vehicles still require passing inspection;
//     designated emissions counties (including Bexar County starting
//     2026) still require an emissions test. Source: dps.texas.gov.
//   - Minimum liability limits remain 30/60/25 (Transportation Code
//     §601.072), unchanged since 2011.
//   - Adults 18+ are not required to hold an instruction permit before
//     the driving skills exam, unlike the teen GDL pathway — this file
//     deliberately does not present permit content as a mandatory adult
//     step.
//
// POI note: every block is tagged with the topic-level POI code
// "4.1.2.1" plus the relevant letter subsection, matching the mapping the
// user's spec itself provided (section 71) rather than an invented one.

import type { DecisionChallengeProps } from "@/components/course/DecisionChallenge";
import type { CompareScenesProps } from "@/components/course/CompareScenes";
import type { DecisionSequenceProps } from "@/components/course/DecisionSequence";
import type { StagedScenarioProps } from "@/components/course/StagedScenario";
import type { RecapAccordionProps } from "@/components/course/RecapAccordion";
import type { LessonScreenProps } from "@/components/course/LessonScreen";
import {
  SCENE_THREE_DRIVERS,
  SCENE_LICENSE_CARD_BASIC,
  SCENE_PERMIT_CARD,
  SCENE_VEHICLE_SEDAN,
  SCENE_VEHICLE_MOTORCYCLE,
  SCENE_VEHICLE_COMMERCIAL,
  SCENE_RESTRICTION_LENSES,
  SCENE_STATUS_ROW,
  SCENE_DRIVER_VS_VEHICLE,
  SCENE_NO_EMISSIONS_COUNTY,
  SCENE_EMISSIONS_COUNTY,
  SCENE_COMMERCIAL_INSPECTION,
  SCENE_MONEY_STACK,
  SCENE_PROOF_CARD,
  SCENE_DISABILITY_CARD,
  SCENE_DL101_FORM,
  SCENE_TRAFFIC_STOP_COMM,
  SCENE_INTEGRATED_STATUS,
} from "./topic2-scenes";

const POI = "4.1.2.1";

export const TOPIC2_CHAPTERS: { title: string; blockIds: string[] }[] = [
  { title: "Chapter 1 — Your Privilege to Drive", blockIds: ["T2-B00", "T2-B01", "T2-B02"] },
  { title: "Chapter 2 — Getting a Texas Driver License", blockIds: ["T2-B03", "T2-B04", "T2-B04b", "T2-B05", "T2-B06", "T2-B07"] },
  { title: "Chapter 3 — Types, Restrictions & Endorsements", blockIds: ["T2-B08", "T2-B09", "T2-B10", "T2-B11", "T2-B12", "T2-B13"] },
  { title: "Chapter 4 — Keeping Your Driving Privilege", blockIds: ["T2-B14", "T2-B16", "T2-B17", "T2-B18"] },
  { title: "Chapter 5 — Your Vehicle Must Be Legal Too", blockIds: ["T2-B19", "T2-B20", "T2-B21", "T2-B22", "T2-B23"] },
  { title: "Chapter 6 — Financial Responsibility", blockIds: ["T2-B24", "T2-B26", "T2-B27", "T2-B28"] },
  { title: "Chapter 7 — Driving with Disability Program", blockIds: ["T2-B29", "T2-B31", "T2-B32", "T2-B33"] },
  { title: "Review & Knowledge Check", blockIds: ["T2-B34", "T2-B35"] },
];

export const TOPIC2_PRACTICE_BLOCK_IDS = ["T2-B06", "T2-B09", "T2-B13", "T2-B22", "T2-B26", "T2-B28"];

export type Topic2Block =
  | { id: string; kind: "decision"; poi: string[]; estimatedMinutes: number; props: DecisionChallengeProps }
  | { id: string; kind: "compare"; poi: string[]; estimatedMinutes: number; props: CompareScenesProps }
  | { id: string; kind: "sequence"; poi: string[]; estimatedMinutes: number; props: DecisionSequenceProps }
  | { id: string; kind: "staged"; poi: string[]; estimatedMinutes: number; props: StagedScenarioProps }
  | { id: string; kind: "recap"; poi: string[]; estimatedMinutes: number; props: RecapAccordionProps }
  | { id: string; kind: "learn"; poi: string[]; estimatedMinutes: number; props: LessonScreenProps };

export const TOPIC2_BLOCKS: Topic2Block[] = [
  // ============================================================
  // Chapter 1 — Your Privilege to Drive
  // ============================================================
  {
    id: "T2-B00",
    kind: "decision",
    poi: [`${POI}(F)`],
    estimatedMinutes: 0.75,
    props: {
      eyebrow: "Topic 2 — Your License to Drive",
      visual: SCENE_THREE_DRIVERS,
      prompt: "Three people are preparing to drive. Which one is actually ready to drive legally?",
      choices: [
        { text: "Driver A — has driving experience, but no valid driving privilege.", correct: false, feedback: "Experience behind the wheel isn't the same as legal authorization to drive." },
        { text: "Driver B — has a valid license, but ignores a restriction printed on it.", correct: false, feedback: "A restriction is part of the driver's legal authorization — ignoring it means the driver isn't complying with their own license." },
        { text: "Driver C — has the appropriate license and complies with applicable restrictions.", correct: true, feedback: "Right. Knowing how to operate a vehicle is not the same as being legally authorized to operate it — Driver C has both." },
      ],
    },
  },
  {
    id: "T2-B01",
    kind: "learn",
    poi: [`${POI}(A)`],
    estimatedMinutes: 1,
    props: {
      eyebrow: "License = Authorization + Responsibility",
      title: "What a Driver License Actually Establishes",
      previewPoints: ["What a license authorizes", "Why it's an ongoing responsibility, not a one-time achievement"],
      visual: SCENE_LICENSE_CARD_BASIC,
      sections: [
        {
          heading: "A License Is a Conditional Authorization",
          body: [
            "A Texas driver license establishes your driving privilege — subject to its license class, any restrictions, any endorsements, its expiration and status, and applicable law. It isn't a blank check to drive any vehicle, any time, any way.",
          ],
        },
        {
          heading: "An Ongoing Responsibility",
          body: [
            "A license isn't permanent once you receive it. A driver is expected to possess the appropriate credential, understand its restrictions, keep it valid, comply with renewal requirements, and respond appropriately if driving privileges are ever suspended or revoked.",
          ],
        },
      ],
    },
  },
  {
    id: "T2-B02",
    kind: "decision",
    poi: [`${POI}(A)`],
    estimatedMinutes: 0.75,
    props: {
      eyebrow: "Who May Drive in Texas?",
      prompt: "Licensing requirements can differ for residents, new residents, nonresidents, and certain military situations. What's the one thing every driver actually needs to know?",
      choices: [
        { text: "Which Texas licensing requirements apply to their own situation.", correct: true, feedback: "Right. If you live and drive in Texas, you need to know which requirements actually apply to you — the details vary by circumstance, but that responsibility doesn't." },
        { text: "Nothing — Texas licensing rules are identical for every driver in every situation.", correct: false, feedback: "Licensing requirements aren't one-size-fits-all — they vary based on residency and circumstance." },
      ],
    },
  },

  // ============================================================
  // Chapter 2 — Getting a Texas Driver License
  // ============================================================
  {
    id: "T2-B03",
    kind: "recap",
    poi: [`${POI}(A)`],
    estimatedMinutes: 1,
    props: {
      eyebrow: "The Licensing Roadmap",
      prompt: "Here's the general path. Tap each stage — requirements vary by age, license type, and applicant circumstances.",
      sections: [
        { title: "Eligibility", points: ["Meeting the basic requirements to apply, based on age and circumstances."] },
        { title: "Required Driver Education", points: ["Completing driver education where it applies to your situation — like this course."] },
        { title: "Application / Documentation", points: ["Providing identity, eligibility, and residency documentation as applicable."] },
        { title: "Vision / Knowledge Requirements", points: ["Meeting applicable vision standards and passing the knowledge exam."] },
        { title: "Applicable Driving-Skills Requirement", points: ["Demonstrating safe vehicle operation where a driving exam applies."] },
        { title: "License Issuance", points: ["Receiving the appropriate driving privilege for your situation."] },
        { title: "Maintain / Renew", points: ["Keeping the license valid and complying with renewal requirements over time."] },
      ],
    },
  },
  {
    id: "T2-B04",
    kind: "learn",
    poi: [`${POI}(A)`],
    estimatedMinutes: 1,
    props: {
      eyebrow: "Instruction / Learner Permit",
      title: "A Limited Credential for Practice",
      previewPoints: ["What an instruction permit actually allows"],
      visual: SCENE_PERMIT_CARD,
      sections: [
        {
          heading: "Purpose",
          body: [
            "An instruction or learner permit is a limited driving credential that allows a qualifying driver to practice under applicable conditions and restrictions before receiving unrestricted driving privileges — commonly involving a supervision requirement.",
          ],
        },
        {
          heading: "Not Automatically Part of Every Adult's Path",
          body: [
            "Younger applicants generally go through a structured learner-permit stage. Adults 18 and older are not required to hold an instruction permit first — many complete driver education, pass the required exams, and go straight to the driving skills exam.",
          ],
        },
      ],
    },
  },
  {
    id: "T2-B04b",
    kind: "decision",
    poi: [`${POI}(A)`],
    estimatedMinutes: 0.5,
    props: {
      eyebrow: "Permit vs. Unrestricted License",
      prompt: "Does an instruction permit give the same driving privileges as an unrestricted driver license?",
      choices: [
        { text: "Yes — a permit and a full license authorize the same driving.", correct: false, feedback: "A permit is a limited credential — it comes with conditions and restrictions a full license doesn't have." },
        { text: "No — a permit is limited, subject to its own conditions and restrictions.", correct: true, feedback: "Right. A permit exists for practice under specific conditions, not for unrestricted driving." },
      ],
    },
  },
  {
    id: "T2-B05",
    kind: "learn",
    poi: [`${POI}(A)`],
    estimatedMinutes: 1,
    props: {
      eyebrow: "What Do You Need to Obtain a License?",
      title: "The General Categories",
      previewPoints: ["The categories every applicant works through — not a document checklist"],
      sections: [
        {
          heading: "Categories, Not a Fixed Checklist",
          body: [
            "Exact documents and fees change, so this course teaches the categories: proving your identity; lawful-presence or eligibility documentation as applicable; Texas residency as applicable; completing required driver education; passing required testing; meeting applicable vision requirements; and, where a driving exam applies, meeting any vehicle or financial-responsibility requirements connected to it — plus applicable fees.",
          ],
        },
        {
          heading: "Always Confirm Current Requirements",
          body: [
            "For the exact current documents and fees your situation requires, use current official DPS information rather than relying on a fixed list — these details are updated more often than the underlying categories change.",
          ],
        },
      ],
    },
  },
  {
    id: "T2-B06",
    kind: "sequence",
    poi: [`${POI}(A)`],
    estimatedMinutes: 1.5,
    props: {
      ruleCardTitle: "THE LICENSE PROCESS",
      ruleCardLines: [
        "Meet eligibility and documentation requirements.",
        "Complete applicable education.",
        "Complete applicable testing.",
        "Receive the appropriate driving privilege.",
        "Maintain and renew it.",
      ],
      rounds: [
        {
          eyebrow: "Process Builder — Step 1",
          prompt: "Before anything else, what does an applicant need to establish?",
          choices: [
            { text: "That they meet eligibility and documentation requirements.", correct: true, feedback: "Right — eligibility and documentation come first." },
            { text: "A finished driving exam.", correct: false, feedback: "The driving exam comes later — eligibility has to be established first." },
          ],
        },
        {
          eyebrow: "Process Builder — Step 2",
          prompt: "After eligibility is established, what comes next?",
          choices: [
            { text: "Completing applicable education, like this course.", correct: true, feedback: "Right — applicable driver education comes next." },
            { text: "Receiving the license immediately.", correct: false, feedback: "Education and testing both come before license issuance." },
          ],
        },
        {
          eyebrow: "Process Builder — Step 3",
          prompt: "After education, what comes next?",
          choices: [
            { text: "Completing applicable testing — knowledge, vision, and driving skills as required.", correct: true, feedback: "Right — testing follows education, before the license is issued." },
            { text: "Renewing the license.", correct: false, feedback: "Renewal only becomes relevant after a license has actually been issued." },
          ],
        },
        {
          eyebrow: "Process Builder — Step 4",
          prompt: "Once the appropriate driving privilege is issued, what's the driver's ongoing job?",
          choices: [
            { text: "Maintain and renew it.", correct: true, feedback: "Right — receiving the license isn't the end of the process, it's the start of an ongoing responsibility." },
            { text: "Nothing further is required, ever.", correct: false, feedback: "A license requires ongoing maintenance — renewal, staying compliant with restrictions, and keeping information current." },
          ],
        },
      ],
    },
  },
  {
    id: "T2-B07",
    kind: "learn",
    poi: [`${POI}(A)`],
    estimatedMinutes: 1,
    props: {
      eyebrow: "Knowledge, Vision & Driving Exam",
      title: "What Each Requirement Actually Checks",
      previewPoints: ["What the knowledge, vision, and driving requirements each verify"],
      sections: [
        {
          heading: "Knowledge",
          body: ["Confirms understanding of traffic laws and signs — the foundation this entire course is built on."],
        },
        {
          heading: "Vision",
          body: ["Confirms the applicant can meet applicable vision requirements, with restrictions or a referral where appropriate."],
        },
        {
          heading: "Driving Skills",
          body: ["Where required, confirms the applicant can actually demonstrate safe vehicle operation — not just describe it."],
        },
      ],
    },
  },

  // ============================================================
  // Chapter 3 — Types, Restrictions & Endorsements
  // ============================================================
  {
    id: "T2-B08",
    kind: "learn",
    poi: [`${POI}(B)`],
    estimatedMinutes: 1,
    props: {
      eyebrow: "License Types / Classes",
      title: "The Vehicle Must Match the License",
      previewPoints: ["Why license class exists at all"],
      sections: [
        {
          heading: "The Vehicle You Operate Must Match Your Authorized License Class",
          body: [
            "Texas licenses are organized into classes based on the type of vehicle authorized. A noncommercial passenger vehicle generally falls under a standard Class C license. Motorcycle operation requires its own Class M. Commercial vehicles have their own separate commercial license classes.",
          ],
        },
        {
          heading: "This Course Isn't CDL Training",
          body: [
            "This six-hour adult course teaches you to recognize that these categories exist and why they matter — it isn't commercial driver training. If commercial driving is part of your future, that requires its own dedicated instruction.",
          ],
        },
      ],
    },
  },
  {
    id: "T2-B09",
    kind: "sequence",
    poi: [`${POI}(B)`],
    estimatedMinutes: 1,
    props: {
      rounds: [
        {
          eyebrow: "Which License? — Passenger Sedan",
          visual: SCENE_VEHICLE_SEDAN,
          prompt: "What general credential category does this vehicle fall under?",
          choices: [
            { text: "A standard noncommercial license.", correct: true, feedback: "Right — an ordinary passenger vehicle is operated under a standard noncommercial license." },
            { text: "A commercial license.", correct: false, feedback: "A passenger sedan isn't a commercial vehicle — it doesn't require a commercial license." },
          ],
        },
        {
          eyebrow: "Which License? — Motorcycle",
          visual: SCENE_VEHICLE_MOTORCYCLE,
          prompt: "What does operating this vehicle require?",
          choices: [
            { text: "Its own motorcycle license class.", correct: true, feedback: "Right — motorcycle operation requires its own class, separate from a standard passenger-vehicle license." },
            { text: "The same license as a passenger sedan, with no distinction.", correct: false, feedback: "A motorcycle requires its own dedicated license class." },
          ],
        },
        {
          eyebrow: "Which License? — Large Commercial Vehicle",
          visual: SCENE_VEHICLE_COMMERCIAL,
          prompt: "What does operating this vehicle require?",
          choices: [
            { text: "A commercial license class, with its own separate requirements.", correct: true, feedback: "Right — commercial vehicles require their own commercial license class, well beyond what this course covers in depth." },
            { text: "A standard noncommercial license.", correct: false, feedback: "A large commercial vehicle isn't authorized under a standard noncommercial license." },
          ],
        },
      ],
    },
  },
  {
    id: "T2-B10",
    kind: "learn",
    poi: [`${POI}(B)`],
    estimatedMinutes: 0.75,
    props: {
      eyebrow: "Restrictions",
      title: "A Condition, Not Necessarily a Prohibition",
      previewPoints: ["What a restriction actually is"],
      sections: [
        {
          heading: "A Restriction Is a Condition on Driving Privileges",
          body: [
            "A restriction doesn't necessarily mean a person is prohibited from driving — it means driving is authorized only under a specified condition. Common examples include a corrective-lenses requirement, a licensed-operator or supervising-driver requirement, or a vehicle- or equipment-related condition.",
          ],
        },
      ],
    },
  },
  {
    id: "T2-B11",
    kind: "decision",
    poi: [`${POI}(B)`],
    estimatedMinutes: 0.75,
    props: {
      eyebrow: "Restriction Scenario",
      visual: SCENE_RESTRICTION_LENSES,
      prompt: "This driver's license requires corrective lenses. They're preparing to drive without them. Is the license valid for this drive?",
      choices: [
        { text: "Yes — the restriction is just a note, not a real requirement.", correct: false, feedback: "A restriction is part of the driver's legal driving authorization — it has to actually be followed." },
        { text: "No — the required condition isn't being met.", correct: true, feedback: "Right. A license restriction is part of the driver's legal driving authorization and must be followed." },
      ],
    },
  },
  {
    id: "T2-B12",
    kind: "learn",
    poi: [`${POI}(B)`],
    estimatedMinutes: 0.75,
    props: {
      eyebrow: "Endorsements",
      title: "Restriction vs. Endorsement",
      previewPoints: ["The difference between a restriction and an endorsement"],
      sections: [
        {
          heading: "Two Different Concepts",
          body: [
            "A restriction limits or conditions a driving privilege — something the driver must comply with. An endorsement authorizes an additional type of operation the driver wouldn't otherwise be authorized for, where applicable — for example, adding motorcycle authorization to an existing license.",
          ],
        },
      ],
    },
  },
  {
    id: "T2-B13",
    kind: "sequence",
    poi: [`${POI}(B)`],
    estimatedMinutes: 1,
    props: {
      ruleCardTitle: "RESTRICTION VS. ENDORSEMENT",
      ruleCardLines: [
        "A restriction limits or conditions a driving privilege.",
        "An endorsement authorizes an additional type of operation.",
      ],
      rounds: [
        {
          eyebrow: "Restriction or Endorsement? — Corrective Lenses",
          prompt: "A corrective-lenses requirement on a license. Which is it?",
          choices: [
            { text: "A restriction.", correct: true, feedback: "Right — it's a condition the driver must comply with, not additional authorization." },
            { text: "An endorsement.", correct: false, feedback: "This limits how the driver must drive — that makes it a restriction, not an endorsement." },
          ],
        },
        {
          eyebrow: "Restriction or Endorsement? — Motorcycle Authorization",
          prompt: "Motorcycle authorization added to an existing license. Which is it?",
          choices: [
            { text: "A restriction.", correct: false, feedback: "This adds new authorization rather than limiting the license — that makes it an endorsement." },
            { text: "An endorsement.", correct: true, feedback: "Right — it authorizes an additional type of operation the driver wasn't otherwise authorized for." },
          ],
        },
        {
          eyebrow: "Restriction or Endorsement? — Supervising-Driver Requirement",
          prompt: "A condition requiring a licensed supervising driver to be present. Which is it?",
          choices: [
            { text: "A restriction.", correct: true, feedback: "Right — it's a condition the driver must comply with while driving." },
            { text: "An endorsement.", correct: false, feedback: "This limits how the driver must drive — that makes it a restriction, not an endorsement." },
          ],
        },
      ],
    },
  },

  // ============================================================
  // Chapter 4 — Keeping Your Driving Privilege
  // ============================================================
  {
    id: "T2-B14",
    kind: "learn",
    poi: [`${POI}(C)`],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Suspension vs. Revocation",
      title: "Two Different Consequences",
      previewPoints: ["The difference between suspension and revocation", "The kinds of things that can affect a driving privilege"],
      sections: [
        {
          heading: "Suspension",
          body: [
            "A driving privilege is temporarily withdrawn for a specified circumstance or period, subject to applicable requirements before it's restored.",
          ],
        },
        {
          heading: "Revocation",
          body: [
            "A driving privilege is terminated or withdrawn under circumstances defined by law, and may require requalification or reapplication rather than simply waiting out a period.",
          ],
        },
        {
          heading: "What Can Affect a Driving Privilege",
          body: [
            "Rather than a giant violation table, think in categories: certain traffic offenses, certain alcohol- or drug-related matters, failure to comply with legal requirements, certain court or administrative actions, and other statutory reasons. The underlying point: driving privileges can change based on legal or administrative action — the specific detail of alcohol- and drug-related consequences is covered in depth later in this course.",
          ],
        },
      ],
    },
  },
  {
    id: "T2-B16",
    kind: "learn",
    poi: [`${POI}(C)`],
    estimatedMinutes: 0.75,
    props: {
      eyebrow: "Administrative vs. Criminal",
      title: "Not Every Consequence Comes From a Conviction",
      previewPoints: ["Why a license-status consequence doesn't always require a criminal conviction"],
      sections: [
        {
          heading: "Two Different Processes",
          body: [
            "Some driving-privilege consequences arise through the court or criminal process. Others arise through an administrative process that doesn't depend on a criminal conviction at all. A license-status consequence doesn't always follow the same process as a criminal case.",
          ],
        },
      ],
    },
  },
  {
    id: "T2-B17",
    kind: "decision",
    poi: [`${POI}(C)`],
    estimatedMinutes: 0.75,
    props: {
      eyebrow: "License Status Challenge",
      visual: SCENE_STATUS_ROW,
      prompt: "Valid, restricted, suspended, expired — which of these statuses gives a driver unrestricted permission to ignore legal requirements?",
      choices: [
        { text: "Valid status.", correct: false, feedback: "Even a valid license still requires complying with its class, restrictions, and applicable law." },
        { text: "None of them.", correct: true, feedback: "Right. Every status has meaning — the driver's responsibility is to know their current status and the conditions that come with it." },
        { text: "Restricted status, as long as the restriction seems minor.", correct: false, feedback: "No restriction is optional just because it seems minor — it's still part of the driver's legal authorization." },
      ],
    },
  },
  {
    id: "T2-B18",
    kind: "learn",
    poi: [`${POI}(A)`],
    estimatedMinutes: 0.75,
    props: {
      eyebrow: "Renewal Is Part of Responsibility",
      title: "Getting a License Isn't the Finish Line",
      previewPoints: ["What ongoing license management actually involves"],
      sections: [
        {
          heading: "An Ongoing Process",
          body: [
            "Receiving a license is not the end of the licensing process. Drivers are responsible for managing expiration and renewal, updating an address or name as applicable, replacing a lost or damaged card, and staying aware of their restrictions and current status.",
          ],
        },
      ],
    },
  },

  // ============================================================
  // Chapter 5 — Your Vehicle Must Be Legal Too
  // ============================================================
  {
    id: "T2-B19",
    kind: "decision",
    poi: [`${POI}(D)`],
    estimatedMinutes: 0.75,
    props: {
      eyebrow: "Driver vs. Vehicle Responsibility",
      visual: SCENE_DRIVER_VS_VEHICLE,
      prompt: "If your driver license is valid, does that automatically make any vehicle you drive legal to operate?",
      choices: [
        { text: "Yes — a valid license covers the vehicle too.", correct: false, feedback: "A driver license and a vehicle's legal status are two separate things." },
        { text: "No — the vehicle has its own separate requirements.", correct: true, feedback: "Right. The vehicle must meet its own applicable registration, insurance, and inspection requirements — a valid license doesn't cover that." },
      ],
    },
  },
  {
    id: "T2-B20",
    kind: "learn",
    poi: [`${POI}(D)`],
    estimatedMinutes: 0.75,
    props: {
      eyebrow: "Vehicle Registration",
      title: "Separate From Your Driver License",
      previewPoints: ["What registration actually establishes"],
      sections: [
        {
          heading: "The Vehicle's Own Legal Status",
          body: [
            "Vehicle registration establishes a vehicle's current registration status with Texas — separate from driver licensing. Registration must be maintained as required, proof and display requirements apply, and financial responsibility is connected to the registration process.",
          ],
        },
      ],
    },
  },
  {
    id: "T2-B21",
    kind: "learn",
    poi: [`${POI}(D)`],
    estimatedMinutes: 1,
    props: {
      eyebrow: "Vehicle Inspection — What Changed",
      title: "Not Every Vehicle Needs an Annual Inspection Anymore",
      previewPoints: ["What changed on January 1, 2025", "Which vehicles still need an inspection"],
      sections: [
        {
          heading: "Most Noncommercial Vehicles",
          body: [
            "As of January 1, 2025, most noncommercial vehicles no longer require a Texas safety inspection before registration — a real change from how this worked before.",
          ],
        },
        {
          heading: "Emissions Counties Still Require a Test",
          body: [
            "Noncommercial vehicles registered in a designated emissions county still need to meet applicable emissions-inspection requirements. Several North Texas counties — including Collin, Dallas, and Denton — are on that list, alongside other major metro-area counties. Emissions county coverage can change, so always verify current requirements for a vehicle's specific county rather than relying on a fixed list.",
          ],
        },
        {
          heading: "Commercial Vehicles",
          body: [
            "Commercial vehicles continue to have their own applicable safety-inspection requirements, statewide, regardless of county.",
          ],
        },
      ],
    },
  },
  {
    id: "T2-B22",
    kind: "compare",
    poi: [`${POI}(D)`],
    estimatedMinutes: 1,
    props: {
      eyebrow: "Inspection or Registration?",
      prompt: "Does the same inspection rule apply to all three of these vehicles?",
      tabs: [
        { label: "Scene A", visual: SCENE_NO_EMISSIONS_COUNTY, caption: "An ordinary noncommercial vehicle in a Texas county without an emissions requirement — no safety inspection needed before registration." },
        { label: "Scene B", visual: SCENE_EMISSIONS_COUNTY, caption: "A noncommercial vehicle in a designated emissions county — an emissions test is still required, even though the old statewide safety inspection is gone." },
        { label: "Scene C", visual: SCENE_COMMERCIAL_INSPECTION, caption: "A commercial vehicle — still subject to its own applicable safety-inspection requirements, in every county." },
      ],
      ruleCard: {
        title: "NO — THE RULE DEPENDS ON THE VEHICLE",
        lines: ["Most noncommercial vehicles: no safety inspection required.", "Emissions counties: emissions test still required.", "Commercial vehicles: safety inspection still required."],
      },
    },
  },
  {
    id: "T2-B23",
    kind: "learn",
    poi: [`${POI}(D)`],
    estimatedMinutes: 0.75,
    props: {
      eyebrow: "Registration Life Cycle",
      title: "A Cycle, Not a One-Time Task",
      previewPoints: ["The general order a vehicle's legal status follows"],
      sections: [
        {
          heading: "Obtain → Register → Meet Applicable Requirements → Maintain → Renew",
          body: [
            "A vehicle is titled as applicable, registered, brought into compliance with any applicable inspection or emissions requirement, kept insured under required financial responsibility, and then has its registration renewed — and the cycle continues.",
          ],
        },
      ],
    },
  },

  // ============================================================
  // Chapter 6 — Financial Responsibility
  // ============================================================
  {
    id: "T2-B24",
    kind: "learn",
    poi: [`${POI}(E)`],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "What Does Financial Responsibility Mean?",
      title: "The Safety Responsibility Act",
      previewPoints: ["What financial responsibility legally means", "The current minimum liability amounts"],
      sections: [
        {
          heading: "Texas's Motor Vehicle Safety Responsibility Framework",
          body: [
            "This framework is designed to ensure motorists can meet applicable financial responsibility for bodily injury, death, or property damage resulting from vehicle operation. For most drivers, this means maintaining required liability insurance — not protection that pays for every loss you personally suffer, but coverage for the harm your driving causes to others.",
          ],
        },
        {
          heading: "Current Minimum Liability Limits — 30 / 60 / 25",
          body: [
            "Texas law requires minimum liability coverage of $30,000 for injury or death of one person, $60,000 for injury or death of two or more persons, and $25,000 for property damage — often described as 30/60/25. These are minimum required coverage limits, not a guarantee that a policy will always pay exactly these amounts; actual coverage depends on the policy and the circumstances.",
          ],
        },
      ],
    },
  },
  {
    id: "T2-B26",
    kind: "recap",
    poi: [`${POI}(E)`],
    estimatedMinutes: 1,
    props: {
      eyebrow: "What Does 30 / 60 / 25 Mean?",
      prompt: "Tap each amount.",
      sections: [
        { title: "$30,000", points: ["The minimum required amount for injury or death of one person under the statutory minimum structure."] },
        { title: "$60,000", points: ["The minimum required aggregate amount for injury or death involving two or more people in the same crash."] },
        { title: "$25,000", points: ["The minimum required amount for property damage."] },
      ],
    },
  },
  {
    id: "T2-B27",
    kind: "learn",
    poi: [`${POI}(E)`],
    estimatedMinutes: 0.75,
    props: {
      eyebrow: "Proof of Financial Responsibility",
      title: "Being Ready to Show It",
      previewPoints: ["When proof of financial responsibility may be required"],
      visual: SCENE_PROOF_CARD,
      sections: [
        {
          heading: "Evidence, Not Just a Requirement to Have",
          body: [
            "Drivers and owners may be required to provide evidence of financial responsibility in applicable situations — a law-enforcement request, a crash, or certain licensing and registration procedures. Texas accepts both paper and legally accepted electronic proof — it isn't limited to one physical document format.",
          ],
        },
      ],
    },
  },
  {
    id: "T2-B28",
    kind: "staged",
    poi: [`${POI}(E)`, `${POI}(F)`],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "License + Registration + Financial Responsibility Challenge",
      completionTitle: "ALL THREE RESPONSIBILITIES MATTER",
      completionLines: [
        "A driver license, current registration, and required financial responsibility all have to hold up at the same time.",
        "Missing any one of them means something isn't in order.",
      ],
      stages: [
        {
          kind: "decision",
          label: "Check 1",
          prompt: "Driver license — valid. Registration — expired. Insurance — current. Is everything in order?",
          choices: [
            { text: "No — the registration is expired.", correct: true, feedback: "Right. An expired registration is a real problem, even if the license and insurance are both fine." },
            { text: "Yes — the license and insurance are what matter most.", correct: false, feedback: "All three have to hold up — an expired registration isn't covered by a valid license and current insurance." },
          ],
        },
        {
          kind: "decision",
          label: "Check 2",
          prompt: "License — valid. Registration — current. Required financial responsibility — missing. Is everything in order?",
          choices: [
            { text: "No — financial responsibility is missing.", correct: true, feedback: "Right. A valid license and current registration don't substitute for required financial responsibility." },
            { text: "Yes — registration and license cover it.", correct: false, feedback: "Financial responsibility is its own separate requirement — it isn't satisfied by having a valid license and current registration." },
          ],
        },
        {
          kind: "decision",
          label: "Check 3",
          prompt: "Appropriate license. Current registration. Required financial responsibility in place. Is everything in order?",
          choices: [
            { text: "Yes — all three responsibilities are satisfied.", correct: true, feedback: "Right. This is what it actually looks like when a driver and vehicle are fully legal to be on the road." },
            { text: "No — something is still missing.", correct: false, feedback: "All three requirements are actually satisfied here." },
          ],
        },
      ],
    },
  },

  // ============================================================
  // Chapter 7 — Driving with Disability Program
  // ============================================================
  {
    id: "T2-B29",
    kind: "learn",
    poi: [`${POI}(G)`],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Texas Driving with Disability Program",
      title: "Supporting Clear Communication",
      previewPoints: ["What the program is for", "Who it's designed to support"],
      visual: SCENE_TRAFFIC_STOP_COMM,
      sections: [
        {
          heading: "Purpose",
          body: [
            "The Texas Driving with Disability Program is designed to support safer, more effective communication between qualifying Texans and law enforcement during traffic stops and other roadside interactions. It is entirely voluntary.",
          ],
        },
        {
          heading: "What It Is Not",
          body: [
            "The program doesn't mean a disability prevents someone from driving, that every person with a disability needs it, or that participating means a person is unsafe. It's a communication tool — officers don't receive a private medical diagnosis from it, just a heads-up that supports a clearer interaction.",
          ],
        },
        {
          heading: "Who May Participate",
          body: [
            "A qualifying disability or health condition that may affect communication with a peace officer can make someone eligible. Participation requires the applicable current healthcare documentation — it isn't self-declared.",
          ],
        },
      ],
    },
  },
  {
    id: "T2-B31",
    kind: "learn",
    poi: [`${POI}(G)`],
    estimatedMinutes: 1.5,
    props: {
      eyebrow: "Current Participation Process",
      title: "How a Qualifying Driver Participates",
      previewPoints: ["What's currently required to participate", "What changed on the card itself in 2026"],
      visual: SCENE_DL101_FORM,
      sections: [
        {
          heading: "Form DL-101",
          body: [
            "Current DPS guidance requires a participating customer to bring a completed Physician/Psychiatrist's Statement — Form DL-101 — signed by the appropriate healthcare provider, along with standard DL/ID transaction documentation, to an in-person DPS appointment.",
          ],
        },
        {
          heading: "A 2026 Update to the Card Itself",
          body: [
            "DPS announced a card-design update in 2026: a qualifying participant's chosen indicator — \"Communication Impediment\" or the newer \"Deaf/Hard of Hearing\" option — now appears prominently on the front of the DL or ID card, expanding on the program's earlier, less visible design.",
          ],
        },
      ],
    },
  },
  {
    id: "T2-B32",
    kind: "learn",
    poi: [`${POI}(G)`],
    estimatedMinutes: 0.75,
    props: {
      eyebrow: "The Program Pathway",
      title: "From Documentation to the Roadside",
      previewPoints: [],
      visual: SCENE_DISABILITY_CARD,
      sections: [
        {
          heading: "Qualifying Need → Documentation → DPS Transaction → Voluntary Indicator → Clearer Communication",
          body: [
            "A driver with a qualifying communication need brings the current required healthcare documentation to a DPS driver license or ID transaction. The voluntary indicator is added to the card, supporting clearer communication the next time that driver interacts with law enforcement.",
          ],
        },
      ],
    },
  },
  {
    id: "T2-B33",
    kind: "decision",
    poi: [`${POI}(G)`],
    estimatedMinutes: 0.75,
    props: {
      eyebrow: "What This Program Does Not Do",
      prompt: "Does the voluntary communication indicator change a participant's driving privileges or exempt them from traffic law?",
      choices: [
        { text: "Yes — it functions like a special license class.", correct: false, feedback: "The indicator isn't a license class, and it isn't permission to ignore traffic law." },
        { text: "No — it exists only to support communication, not to change legal driving requirements.", correct: true, feedback: "Right. A voluntary communication indicator supports communication — it doesn't create a special license class, excuse a driver from traffic law, or suggest the driver is unsafe." },
      ],
    },
  },

  // ============================================================
  // Review & Knowledge Check
  // ============================================================
  {
    id: "T2-B34",
    kind: "sequence",
    poi: ["All Topic 2 review"],
    estimatedMinutes: 1.5,
    props: {
      rounds: [
        {
          eyebrow: "Driver Responsibility — Scenario 1",
          visual: SCENE_INTEGRATED_STATUS,
          prompt: "License: valid, with a corrective-lenses restriction. Driver: not wearing the required lenses. Registration: current. Financial responsibility: current. Is the driver ready to drive?",
          choices: [
            { text: "No — the driver isn't complying with the license restriction.", correct: true, feedback: "Right. Even with everything else in order, not following the restriction means the driver isn't legally ready to drive." },
            { text: "Yes — three out of four things are fine.", correct: false, feedback: "Legal driving depends on the entire system holding up, not just most of it — the restriction still has to be followed." },
          ],
        },
        {
          eyebrow: "Driver Responsibility — Scenario 2",
          prompt: "Now: appropriate license, restriction satisfied, registration current, required financial responsibility current. What changed?",
          choices: [
            { text: "The driver is now actually complying with every requirement at once.", correct: true, feedback: "Right. Legal driving depends on the entire system — license, restriction compliance, registration, and financial responsibility — holding up together." },
            { text: "Nothing meaningful changed.", correct: false, feedback: "Something did change — the driver is now complying with the restriction that was missing before." },
          ],
        },
      ],
    },
  },
  {
    id: "T2-B35",
    kind: "recap",
    poi: ["All Topic 2 review"],
    estimatedMinutes: 1,
    props: {
      eyebrow: "Topic 2 Recap",
      prompt: "Tap each section for a quick review before the quiz.",
      sections: [
        { title: "Your License", points: ["Obtain, possess, maintain, and renew the appropriate license — it's an ongoing responsibility, not a one-time achievement."] },
        { title: "License Type / Restrictions", points: ["Understand what your credential actually authorizes and requires — restrictions must be followed, endorsements add authorization."] },
        { title: "License Status", points: ["Suspension, revocation, and other status changes matter — no status gives unrestricted permission to ignore requirements."] },
        { title: "Your Vehicle", points: ["Registration and current inspection or emissions requirements must be understood — a valid license doesn't cover the vehicle."] },
        { title: "Financial Responsibility", points: ["Maintain the required financial responsibility — 30/60/25 minimum liability limits."] },
        { title: "Driving with Disability Program", points: ["Texas provides voluntary communication-support options for qualifying participants."] },
      ],
    },
  },
];
