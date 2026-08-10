import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getOrCreateActiveEnrollment, getTopicsWithProgress } from "@/lib/enrollment";
import TopicViewer from "./topic-viewer";

export default async function TopicPage({
  params,
}: {
  params: { number: string };
}) {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session) redirect("/login");

  const student = await prisma.student.findUnique({ where: { id: session.sub } });
  if (!student) redirect("/login");

  const topicNumber = Number(params.number);
  if (!Number.isInteger(topicNumber) || topicNumber < 1 || topicNumber > 9) {
    notFound();
  }

  const enrollment = await getOrCreateActiveEnrollment(student.id);
  const topics = await getTopicsWithProgress(enrollment.id, Boolean(enrollment.paidAt));
  const topic = topics.find((t) => t.number === topicNumber);
  if (!topic) notFound();

  // A student who bookmarks or manually types a locked topic's URL gets
  // bounced back to the dashboard — the "Next Topic" button already
  // prevents this in normal use, but this is the actual enforcement point.
  if (!topic.unlocked) {
    redirect("/dashboard");
  }

  const nextTopic = topics.find((t) => t.number === topicNumber + 1) ?? null;

  const topicRecord = await prisma.topic.findUnique({ where: { number: topicNumber } });
  const content = topicRecord
    ? await prisma.topicContent.findMany({
        where: { topicId: topicRecord.id },
        orderBy: { sortOrder: "asc" },
      })
    : [];

  return (
    <TopicViewer
      topic={{
        number: topic.number,
        title: topic.title,
        minMinutes: topic.minMinutes,
        secondsActive: topic.secondsActive,
        status: topic.status,
      }}
      content={content.map((c) => ({
        id: c.id,
        contentType: c.contentType as "text" | "video" | "image",
        body: c.body,
      }))}
      nextTopicNumber={nextTopic?.number ?? null}
    />
  );
}
