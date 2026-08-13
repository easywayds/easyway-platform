import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const ADMIN_SESSION_COOKIE = "easyway_admin_session";
const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

export type AdminRole = "master_admin" | "student_admin" | "payment_admin" | "curriculum_admin";

export type AdminSession = {
  sub: string; // AdminUser id
  email: string;
  name: string;
  role: AdminRole;
};

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not set.");
  }
  return new TextEncoder().encode(secret);
}

export async function createAdminSessionToken(admin: {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
}): Promise<string> {
  return new SignJWT({ email: admin.email, name: admin.name, role: admin.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(admin.id)
    .setIssuedAt()
    .setExpirationTime(`${ADMIN_SESSION_TTL_SECONDS}s`)
    .sign(getSecret());
}

export async function verifyAdminSessionToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (
      !payload.sub ||
      typeof payload.email !== "string" ||
      typeof payload.name !== "string" ||
      typeof payload.role !== "string"
    ) {
      return null;
    }
    return {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role as AdminRole,
    };
  } catch {
    return null;
  }
}

export const adminSessionCookieOptions = {
  name: ADMIN_SESSION_COOKIE,
  httpOnly: true as const,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: ADMIN_SESSION_TTL_SECONDS,
};

// Reads the admin session from the request and confirms both the token is
// valid AND the account is still active (a deactivated admin's old token
// stops working immediately, not just at next login). Pass `allowedRoles`
// to additionally gate by panel — omit it to just require *some* valid
// admin session, master_admin always passes any role check.
export async function requireAdmin(
  req: NextRequest,
  allowedRoles?: AdminRole[]
): Promise<AdminSession | null> {
  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await verifyAdminSessionToken(token);
  if (!session) return null;

  // Re-check against the DB, not just the signed token, so revoking an
  // admin's access takes effect on their very next request.
  const record = await prisma.adminUser.findUnique({ where: { id: session.sub } });
  if (!record || !record.active) return null;

  if (allowedRoles && session.role !== "master_admin" && !allowedRoles.includes(session.role)) {
    return null;
  }

  return session;
}

// Server Component equivalent of requireAdmin, for page.tsx files (which
// read the request cookie jar via next/headers rather than a NextRequest).
export async function getAdminSession(): Promise<AdminSession | null> {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await verifyAdminSessionToken(token);
  if (!session) return null;

  const record = await prisma.adminUser.findUnique({ where: { id: session.sub } });
  if (!record || !record.active) return null;

  return session;
}

// Call at the top of a protected admin page. Redirects to /admin/login if
// not signed in, or to /admin (with access denied there) if signed in but
// not permitted to see this particular panel.
export async function requireAdminPage(allowedRoles?: AdminRole[]): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  if (allowedRoles && session.role !== "master_admin" && !allowedRoles.includes(session.role)) {
    redirect("/admin?denied=1");
  }

  return session;
}
