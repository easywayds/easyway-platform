import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdminPage, type AdminRole } from "@/lib/admin-auth";
import AdminShell from "./admin-shell";

// Live counts — never statically prerendered.
export const dynamic = "force-dynamic";

type Card = {
  href: string;
  title: string;
  description: string;
  stat: string | null;
  alert?: string | null;
  color: string;
  roles: AdminRole[];
};

export default async function AdminDashboardPage() {
  const session = await requireAdminPage();

  const [studentCount, certificatesIssued, numbersAvailable, pendingStudents, paidCount, unpaidCount] =
    await Promise.all([
      prisma.student.count(),
      prisma.certificate.count(),
      prisma.certificateNumber.count({ where: { status: "available" } }),
      prisma.enrollment.count({
        where: { assessmentPassedAt: { not: null }, certificateId: null },
      }),
      prisma.enrollment.count({ where: { paidAt: { not: null } } }),
      prisma.enrollment.count({ where: { paidAt: null } }),
    ]);

  const cards: Card[] = [
    {
      href: "/admin/students",
      title: "Students",
      description: "View every student's progress, exam status, and certificate.",
      stat: `${studentCount} enrolled`,
      color: "var(--admin-panel-students)",
      roles: ["master_admin", "student_admin"],
    },
    {
      href: "/admin/payments",
      title: "Payments",
      description: "Paid vs. unpaid enrollments, with manual override.",
      stat: `${paidCount} paid · ${unpaidCount} unpaid`,
      color: "var(--admin-panel-payments)",
      roles: ["master_admin", "payment_admin"],
    },
    {
      href: "/admin/certificate-numbers",
      title: "Certificate Numbers",
      description: "Add TDLR-purchased certificate numbers to the pool.",
      stat: `${numbersAvailable} available`,
      alert: pendingStudents > 0 ? `${pendingStudents} student(s) waiting on a number` : null,
      color: "var(--admin-panel-payments)",
      roles: ["master_admin", "payment_admin"],
    },
    {
      href: "/admin/course-content",
      title: "Topics & Content",
      description: "Manage lesson text, bullets, stats, and quizzes for the 9 topics.",
      stat: null,
      color: "var(--admin-panel-curriculum)",
      roles: ["master_admin", "curriculum_admin"],
    },
    {
      href: "/admin/school-settings",
      title: "School Settings",
      description: "TDLR Number, school name, and instructor signatures.",
      stat: null,
      color: "var(--admin-panel-settings)",
      roles: ["master_admin"],
    },
    {
      href: "/admin/admins",
      title: "Admins",
      description: "Create and manage panel-admin accounts.",
      stat: null,
      color: "var(--admin-panel-admins)",
      roles: ["master_admin"],
    },
  ];

  const visibleCards = cards.filter((c) => session.role === "master_admin" || c.roles.includes(session.role));
  const firstName = session.name.split(" ")[0];

  return (
    <AdminShell session={session}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 28px 40px" }}>
        <div className="admin-panel-intro" style={{ ["--intro-color" as any]: "var(--admin-panel-dashboard)" }}>
          <h1>Welcome back, {firstName}</h1>
          <p>
            {certificatesIssued} certificate{certificatesIssued === 1 ? "" : "s"} issued so far ·{" "}
            {studentCount} student{studentCount === 1 ? "" : "s"} enrolled.
          </p>
        </div>

        <div className="admin-card-grid">
          {visibleCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="admin-card"
              style={{ ["--card-color" as any]: card.color }}
            >
              <h2>{card.title}</h2>
              <p>{card.description}</p>
              {card.stat && <div className="admin-card-stat">{card.stat}</div>}
              {card.alert && <div className="admin-card-alert">{card.alert}</div>}
            </Link>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
