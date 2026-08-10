import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export function getStripeClient(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set.");
  }
  return new Stripe(key);
}

// Fallback price if the admin hasn't set one in School Settings yet.
// Whole dollars, e.g. 25 = $25.00.
export const DEFAULT_COURSE_PRICE_USD = 25;
export const COURSE_NAME = "TDLR 6-Hour Adult Driver Education Course";

export async function getCoursePriceUsd(): Promise<number> {
  const settings = await prisma.schoolSettings.findUnique({ where: { id: "default" } });
  return settings?.coursePriceUsd ?? DEFAULT_COURSE_PRICE_USD;
}
