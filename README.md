# Easy Way Driving School — Phase 1 (Foundation)

This is the Phase 1 scaffold from the build plan: Next.js project, Prisma schema
+ migration, Postgres (Neon) connection, register/login/logout auth, and the
9 TDLR topics seeded.

## What's here

- `prisma/schema.prisma` — full data model from the build plan (Student, Enrollment,
  Topic, TopicContent, TopicProgress, AssessmentAttempt, Certificate, AdminUser).
  Only Student, Topic, and AdminUser are actually used in Phase 1 — the rest are
  defined now so later phases don't need a schema rewrite.
- `prisma/seed.ts` — seeds the 9 fixed TDLR topics with their minimum minutes.
- `lib/auth.ts` — password hashing (bcrypt) + signed session-cookie JWTs (jose).
- `middleware.ts` — redirects unauthenticated users away from `/dashboard`.
- `app/api/auth/*` — register, login, logout, me.
- `app/register`, `app/login`, `app/dashboard` — minimal pages to exercise the flow.

## Setup

1. **Install dependencies** (requires network access — not available in this sandbox):
   ```bash
   npm install
   ```

2. **Create a Neon Postgres project** at https://neon.tech if you don't have one.
   Grab both the pooled and direct connection strings.

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Fill in `DATABASE_URL`, `DIRECT_URL`, and generate a `SESSION_SECRET`:
   ```bash
   openssl rand -base64 32
   ```

4. **Run the migration and seed the topics:**
   ```bash
   npx prisma migrate dev --name init
   npm run prisma:seed
   ```

5. **Start the dev server:**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000 — you should be able to register, get redirected
   to `/dashboard`, and see the 9 seeded topics listed.

## Notes / things to revisit

- `Student.isAgeEligible` is stored as a boolean confirmation rather than raw
  date of birth, per the build plan's PII-minimization note. If the school
  later needs to verify age independently (not just self-attested), that's a
  bigger decision worth its own discussion.
- Session is a signed JWT in an HTTP-only cookie, not a DB-backed session table.
  This is fine at this scale and keeps `middleware.ts` fast (no DB call on every
  request), but there's no way to force-revoke a single session server-side —
  only rotate `SESSION_SECRET` to invalidate all of them. Worth flagging to the
  school if that matters to them.
- The dashboard page is a placeholder. Phase 2 replaces the topic list with the
  real time-tracking, heartbeat, and sequential-unlock UI described in the build plan.
- Admin auth (`AdminUser`) is modeled but has no routes yet — that's Phase 4.

## Next: Phase 2

Topic viewer with heartbeat-based `secondsActive` tracking, sequential unlock
logic gated on time thresholds, and a real student dashboard.
