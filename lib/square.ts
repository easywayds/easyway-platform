import { SquareClient, SquareEnvironment } from "square";
import { prisma } from "@/lib/prisma";

export function getSquareClient(): SquareClient {
  const token = process.env.SQUARE_ACCESS_TOKEN;
  if (!token) {
    throw new Error("SQUARE_ACCESS_TOKEN is not set.");
  }
  const env = process.env.SQUARE_ENVIRONMENT === "production"
    ? SquareEnvironment.Production
    : SquareEnvironment.Sandbox;

  return new SquareClient({ token, environment: env });
}

export function getSquareLocationId(): string {
  const locationId = process.env.SQUARE_LOCATION_ID;
  if (!locationId) {
    throw new Error("SQUARE_LOCATION_ID is not set.");
  }
  return locationId;
}

// Fallback price if the admin hasn't set one in School Settings yet.
// Whole dollars, e.g. 25 = $25.00.
export const DEFAULT_COURSE_PRICE_USD = 25;
export const COURSE_NAME = "TDLR 6-Hour Adult Driver Education Course";

export async function getCoursePriceUsd(): Promise<number> {
  const settings = await prisma.schoolSettings.findUnique({ where: { id: "default" } });
  return settings?.coursePriceUsd ?? DEFAULT_COURSE_PRICE_USD;
}
