import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import PortalShell from "./portal-shell";

// Always live, per-student data — never statically prerendered.
export const dynamic = "force-dynamic";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session) redirect("/login");

  const student = await prisma.student.findUnique({
    where: { id: session.sub },
    select: { firstName: true, lastName: true, email: true },
  });
  if (!student) redirect("/login");

  return (
    <PortalShell firstName={student.firstName} lastName={student.lastName} email={student.email}>
      {children}
    </PortalShell>
  );
}
