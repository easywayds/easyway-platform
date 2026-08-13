"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import type { AdminRole } from "@/lib/admin-auth";

type NavItem = { href: string; label: string; roles: AdminRole[] };
type NavGroup = { label: string | null; color: string; items: NavItem[] };

const ALL: AdminRole[] = ["master_admin", "student_admin", "payment_admin", "curriculum_admin"];

const NAV_GROUPS: NavGroup[] = [
  { label: null, color: "var(--admin-panel-dashboard)", items: [{ href: "/admin", label: "Dashboard", roles: ALL }] },
  {
    label: null,
    color: "var(--admin-panel-students)",
    items: [{ href: "/admin/students", label: "Students", roles: ["master_admin", "student_admin"] }],
  },
  {
    label: "Payments",
    color: "var(--admin-panel-payments)",
    items: [
      { href: "/admin/payments", label: "Payments", roles: ["master_admin", "payment_admin"] },
      { href: "/admin/certificate-numbers", label: "Certificate Numbers", roles: ["master_admin", "payment_admin"] },
    ],
  },
  {
    label: "Curriculum",
    color: "var(--admin-panel-curriculum)",
    items: [{ href: "/admin/course-content", label: "Topics & Content", roles: ["master_admin", "curriculum_admin"] }],
  },
  {
    label: null,
    color: "var(--admin-panel-settings)",
    items: [{ href: "/admin/school-settings", label: "School Settings", roles: ["master_admin"] }],
  },
  {
    label: null,
    color: "var(--admin-panel-admins)",
    items: [{ href: "/admin/admins", label: "Admins", roles: ["master_admin"] }],
  },
];

const ROLE_LABELS: Record<AdminRole, string> = {
  master_admin: "Master Admin",
  student_admin: "Student Admin",
  payment_admin: "Payment Admin",
  curriculum_admin: "Curriculum Admin",
};

const ROLE_BADGE_COLORS: Record<AdminRole, string> = {
  master_admin: "#4f46e5",
  student_admin: "#2563eb",
  payment_admin: "#059669",
  curriculum_admin: "#7c3aed",
};

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "");
}

export default function AdminShell({
  children,
  session,
}: {
  children: React.ReactNode;
  session: { name: string; role: AdminRole };
}) {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const visibleGroups = NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => session.role === "master_admin" || item.roles.includes(session.role)),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">Easy Way Admin</div>
        <nav className="admin-sidebar-nav">
          {visibleGroups.map((group, i) => (
            <div key={i} className="admin-sidebar-group">
              {group.label && <div className="admin-sidebar-group-label">{group.label}</div>}
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`admin-sidebar-link ${
                    pathname === item.href ? "admin-sidebar-link-active" : ""
                  }`}
                >
                  <span className="admin-sidebar-dot" style={{ ["--dot-color" as any]: group.color }} />
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <button onClick={handleLogout} className="admin-sidebar-logout">
          Log out
        </button>
      </aside>
      <div className="admin-main">
        <div className="admin-topbar">
          <div style={{ textAlign: "right" }}>
            <div className="admin-topbar-name">{session.name}</div>
            <span className="admin-role-badge" style={{ ["--badge-color" as any]: ROLE_BADGE_COLORS[session.role] }}>
              {ROLE_LABELS[session.role]}
            </span>
          </div>
          <div className="admin-avatar">{initials(session.name).toUpperCase() || "A"}</div>
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
}
