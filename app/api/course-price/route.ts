import { NextResponse } from "next/server";
import { getCoursePriceUsd, COURSE_NAME } from "@/lib/square";

export async function GET() {
  const priceUsd = await getCoursePriceUsd();
  return NextResponse.json({ priceUsd, courseName: COURSE_NAME });
}
