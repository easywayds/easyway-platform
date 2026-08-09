"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/students", label: "Students" },
  { href: "/admin/certificate-numbers", label: "Certificate Numbers" },
  { href: "/admin/school-settings", label: "School Settings" },
];

export default function AdminNav() {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-nav">
      <div className="admin-nav-inner">
        <span className="admin-nav-brand">Easy Way Admin</span>
        <div className="admin-nav-links">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`admin-nav-link ${pathname === link.href ? "admin-nav-link-active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button onClick={handleLogout} className="admin-nav-logout">
          Log out
        </button>
      </div>
    </div>
  );
}
