import { NextRequest, NextResponse } from "next/server";
import { createAdminSessionToken, adminSessionCookieOptions } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const password = json?.password;

  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) {
    return NextResponse.json(
      { error: "Admin access isn't configured yet. Set ADMIN_SECRET in Vercel." },
      { status: 500 }
    );
  }

  if (password !== adminSecret) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = await createAdminSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(adminSessionCookieOptions.name, token, adminSessionCookieOptions);
  return res;
}
