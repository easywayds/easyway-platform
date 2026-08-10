import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminShell from "./admin-shell";

export default async function AdminDashboardPage() {
  const [studentCount, certificatesIssued, numbersAvailable, pendingStudents] =
    await Promise.all([
      prisma.student.count(),
      prisma.certificate.count(),
      prisma.certificateNumber.count({ where: { status: "available" } }),
      prisma.enrollment.count({
        where: { assessmentPassedAt: { not: null }, certificateId: null },
      }),
    ]);

  const cards = [
    {
      href: "/admin/students",
      title: "Students",
      description: "View every student's progress, exam status, and certificate.",
      stat: `${studentCount} enrolled`,
    },
    {
      href: "/admin/certificate-numbers",
      title: "Certificate Numbers",
      description: "Add TDLR-purchased certificate numbers to the pool.",
      stat: `${numbersAvailable} available`,
      alert: pendingStudents > 0 ? `${pendingStudents} student(s) waiting on a number` : null,
    },
    {
      href: "/admin/school-settings",
      title: "School Settings",
      description: "TDLR Number, school name, and instructor signatures.",
      stat: null,
    },
    {
      href: "/admin/course-content",
      title: "Course Content",
      description: "Manage lesson text, images, and videos for the 9 topics.",
      stat: null,
    },
  ];

  return (
    <AdminShell>
      <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 24px" }}>
        <h1>Dashboard</h1>
        <p style={{ color: "#666" }}>
          {certificatesIssued} certificate{certificatesIssued === 1 ? "" : "s"} issued so far.
        </p>

        <div className="admin-card-grid">
          {cards.map((card) =>
            card.disabled ? (
              <div key={card.title} className="admin-card admin-card-disabled">
                <h2>{card.title}</h2>
                <p>{card.description}</p>
                {card.stat && <div className="admin-card-stat">{card.stat}</div>}
              </div>
            ) : (
              <Link key={card.title} href={card.href} className="admin-card">
                <h2>{card.title}</h2>
                <p>{card.description}</p>
                {card.stat && <div className="admin-card-stat">{card.stat}</div>}
                {card.alert && <div className="admin-card-alert">{card.alert}</div>}
              </Link>
            )
          )}
        </div>
      </div>
    </AdminShell>
  );
}
