import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  createSessionToken,
  hashPassword,
  sessionCookieOptions,
} from "@/lib/auth";

function calculateAge(dob: Date): number {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  lastName: z.string().min(1, "Last name is required"),
  firstName: z.string().min(1, "First name is required"),
  middleInitial: z.string().max(1).optional().or(z.literal("")),
  // Sent as "YYYY-MM-DD" from a native date input.
  dateOfBirth: z.string().refine((v) => !isNaN(Date.parse(v)), "Invalid date of birth"),
  sex: z.enum(["Male", "Female"]),
  phone: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = RegisterSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { email, password, lastName, firstName, middleInitial, dateOfBirth, sex, phone } =
    parsed.data;

  const dob = new Date(dateOfBirth);
  if (calculateAge(dob) < 18) {
    return NextResponse.json(
      { error: "You must be at least 18 years old to take this course." },
      { status: 400 }
    );
  }

  const existing = await prisma.student.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists." },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(password);

  const student = await prisma.student.create({
    data: {
      email,
      passwordHash,
      lastName,
      firstName,
      middleInitial: middleInitial || null,
      dateOfBirth: dob,
      sex,
      phone,
    },
  });

  const token = await createSessionToken({ sub: student.id, email: student.email });

  const res = NextResponse.json({
    id: student.id,
    email: student.email,
    firstName: student.firstName,
    lastName: student.lastName,
  });
  res.cookies.set(sessionCookieOptions.name, token, sessionCookieOptions);
  return res;
}
