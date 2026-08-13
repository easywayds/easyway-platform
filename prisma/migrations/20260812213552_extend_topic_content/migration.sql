-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ContentType" ADD VALUE 'bullets';
ALTER TYPE "ContentType" ADD VALUE 'stat';
ALTER TYPE "ContentType" ADD VALUE 'custom_visual';
ALTER TYPE "ContentType" ADD VALUE 'check';

-- AlterTable
ALTER TABLE "topic_content" ADD COLUMN     "heading" TEXT,
ADD COLUMN     "meta" JSONB,
ADD COLUMN     "route" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tag" TEXT,
ALTER COLUMN "body" DROP NOT NULL;

