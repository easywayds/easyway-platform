import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import LogoutButton from "./logout-button";

export default async function DashboardPage() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session) redirect("/login");

  const student = await prisma.student.findUnique({
    where: { id: session.sub },
  });
  if (!student) redirect("/login");

  const topics = await prisma.topic.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div style={{ maxWidth: 640, margin: "40px auto", padding: "0 24px" }}>
      <h1>Welcome, {student.fullName}</h1>
      <p style={{ color: "#666" }}>
        This is a Phase 1 placeholder — topic time-tracking, sequential unlock,
        and real progress state land in Phase 2.
      </p>

      <h2 style={{ marginTop: 32 }}>Course topics</h2>
      <ol style={{ paddingLeft: 20 }}>
        {topics.map((t) => (
          <li key={t.id} style={{ marginBottom: 8 }}>
            {t.title} — <span style={{ color: "#666" }}>{t.minMinutes} min minimum</span>
          </li>
        ))}
      </ol>

      <div style={{ marginTop: 32 }}>
        <LogoutButton />
      </div>
    </div>
  );
}
