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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
