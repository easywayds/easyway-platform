"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./portal.module.css";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/course", label: "My Course" },
  { href: "/dashboard/certificate", label: "Certificate" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/account", label: "Account & Security" },
  { href: "/dashboard/help", label: "Help & Support" },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname.startsWith(href);
}

export default function PortalShell({
  firstName,
  lastName,
  email,
  children,
}: {
  firstName: string;
  lastName: string;
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();

  async function handleSignOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  const nav = (
    <nav className={styles.nav} aria-label="Student portal navigation">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`${styles.navLink} ${isActive(pathname, item.href) ? styles.navLinkActive : ""}`}
          aria-current={isActive(pathname, item.href) ? "page" : undefined}
          onClick={() => setDrawerOpen(false)}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className={styles.root}>
      <div className={styles.shell}>
        <aside className={styles.sidebar}>
          <div className={styles.brand}>
            <div className={styles.brandMark}>E</div>
            <div className={styles.brandText}>
              Easy Way
              <br />
              Digital Academy
            </div>
          </div>
          {nav}
          <div className={styles.signOutRow}>
            <button type="button" className={styles.signOutBtn} onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </aside>

        <div className={styles.main}>
          <header className={styles.topHeader}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button
                type="button"
                className={styles.mobileMenuBtn}
                aria-label="Open menu"
                onClick={() => setDrawerOpen(true)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <span className={styles.headerBrandMobile}>Easy Way Digital Academy</span>
            </div>

            <div className={styles.avatarRow}>
              <button
                type="button"
                className={styles.avatarBtn}
                onClick={() => setMenuOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
              >
                <span className={styles.avatarCircle}>{initials}</span>
                <span className={styles.avatarName}>
                  {firstName} {lastName}
                </span>
              </button>
              {menuOpen && (
                <div className={styles.avatarMenu} role="menu">
                  <Link href="/dashboard/profile" className={styles.avatarMenuLink} role="menuitem" onClick={() => setMenuOpen(false)}>
                    Profile
                  </Link>
                  <Link href="/dashboard/account" className={styles.avatarMenuLink} role="menuitem" onClick={() => setMenuOpen(false)}>
                    Account
                  </Link>
                  <button
                    type="button"
                    className={styles.avatarMenuLink}
                    role="menuitem"
                    style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </header>

          <main className={styles.content}>{children}</main>
        </div>
      </div>

      {drawerOpen && (
        <div className={styles.drawerOverlay} onClick={() => setDrawerOpen(false)}>
          <div className={styles.drawerPanel} onClick={(e) => e.stopPropagation()}>
            <button type="button" className={styles.drawerCloseBtn} aria-label="Close menu" onClick={() => setDrawerOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div className={styles.brand}>
              <div className={styles.brandMark}>E</div>
              <div className={styles.brandText}>
                Easy Way
                <br />
                Digital Academy
              </div>
            </div>
            {nav}
            <div className={styles.signOutRow}>
              <button type="button" className={styles.signOutBtn} onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
