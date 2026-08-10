"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const NAV_GROUPS: {
  label: string | null;
  items: { href: string; label: string }[];
}[] = [
  { label: null, items: [{ href: "/admin", label: "Dashboard" }] },
  { label: null, items: [{ href: "/admin/students", label: "Students" }] },
  {
    label: "Course",
    items: [
      { href: "/admin/course-content", label: "Topics & Content" },
      { href: "/admin/certificate-numbers", label: "Certificate Numbers" },
    ],
  },
  { label: null, items: [{ href: "/admin/school-settings", label: "School Settings" }] },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">Easy Way Admin</div>
        <nav className="admin-sidebar-nav">
          {NAV_GROUPS.map((group, i) => (
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
      <main className="admin-main">{children}</main>
    </div>
  );
}
