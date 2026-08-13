-- Admin roles + individual identity (AdminUser table is confirmed empty)

ALTER TYPE "AdminRole" RENAME TO "AdminRole_old";
CREATE TYPE "AdminRole" AS ENUM ('master_admin', 'student_admin', 'payment_admin', 'curriculum_admin');

ALTER TABLE "admin_users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "admin_users" ALTER COLUMN "role" TYPE "AdminRole" USING ('student_admin'::text)::"AdminRole";
ALTER TABLE "admin_users" ALTER COLUMN "role" SET DEFAULT 'student_admin';

DROP TYPE "AdminRole_old";

ALTER TABLE "admin_users" ADD COLUMN "name" TEXT NOT NULL DEFAULT 'Admin';
ALTER TABLE "admin_users" ALTER COLUMN "name" DROP DEFAULT;
ALTER TABLE "admin_users" ADD COLUMN "active" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "admin_users" ADD COLUMN "lastLoginAt" TIMESTAMP(3);
