// prisma/seed.ts
//
// Seeds all 9 Topics, their scene-by-scene content, per-topic quiz questions,
// and the 30-question Module 9 final exam bank from seed-data.json.
//
// Run with: npx prisma db seed
// (requires "prisma": { "seed": "ts-node prisma/seed.ts" } in package.json,
//  or the equivalent for your runner — Claude Code will wire this up.)

import { PrismaClient, type ContentType } from "@prisma/client";
import seedData from "./seed-data.json";

const prisma = new PrismaClient();

async function main() {
  console.log(`Seeding ${seedData.topics.length} topics...`);

  // 1. Topics first — everything else references topic by number, resolved to id here.
  const topicIdByNumber = new Map<number, string>();
  for (const t of seedData.topics) {
    const topic = await prisma.topic.upsert({
      where: { number: t.number },
      update: { title: t.title, minMinutes: t.minMinutes, sortOrder: t.sortOrder },
      create: {
        number: t.number,
        title: t.title,
        minMinutes: t.minMinutes,
        sortOrder: t.sortOrder,
      },
    });
    topicIdByNumber.set(t.number, topic.id);
  }

  // 2. Scene-by-scene content, in order, per topic. Content is now managed
  // live via /admin/course-content, so this only bootstraps an empty table
  // (fresh DB) — once any rows exist, re-running the seed leaves them alone
  // instead of wiping out edits made through the admin panel.
  const existingContentCount = await prisma.topicContent.count();
  if (existingContentCount === 0) {
    console.log(`Seeding ${seedData.topicContent.length} content rows (first run)...`);
    for (const row of seedData.topicContent) {
      const topicId = topicIdByNumber.get(row.topicNumber);
      if (!topicId) {
        console.warn(`Skipping content row — no topic found for number ${row.topicNumber}`);
        continue;
      }
      await prisma.topicContent.create({
        data: {
          topicId,
          contentType: row.contentType as ContentType,
          tag: row.tag ?? null,
          route: row.route ?? false,
          heading: row.heading ?? null,
          body: row.body ?? null,
          meta: row.meta ?? undefined,
          sortOrder: row.sortOrder,
        },
      });
    }
  } else {
    console.log(
      `Skipping topic content seed — ${existingContentCount} rows already exist and are managed via /admin/course-content.`
    );
  }

  // 3. Per-topic ungraded quiz questions.
  console.log(`Seeding ${seedData.topicQuiz.length} topic-quiz questions...`);
  await prisma.topicQuizQuestion.deleteMany({});
  for (const q of seedData.topicQuiz) {
    const topicId = topicIdByNumber.get(q.topicNumber);
    if (!topicId) {
      console.warn(`Skipping quiz question — no topic found for number ${q.topicNumber}`);
      continue;
    }
    await prisma.topicQuizQuestion.create({
      data: {
        topicId,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        visualKey: q.visualKey ?? null,
        sortOrder: q.sortOrder,
      },
    });
  }

  // 4. The 30-question graded final exam (Module 9).
  console.log(`Seeding ${seedData.examQuestions.length} final exam questions...`);
  await prisma.examQuestion.deleteMany({});
  for (const q of seedData.examQuestions) {
    await prisma.examQuestion.create({
      data: {
        sourceTopicNumber: q.sourceTopicNumber,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        sortOrder: q.sortOrder,
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
