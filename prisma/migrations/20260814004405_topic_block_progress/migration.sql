-- Topic block progress (interactive-lesson block completion tracking)

CREATE TABLE "topic_block_progress" (
    "id" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "topicNumber" INTEGER NOT NULL,
    "blockId" TEXT NOT NULL,
    "openedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "topic_block_progress_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "topic_block_progress_enrollmentId_blockId_key" ON "topic_block_progress"("enrollmentId", "blockId");
CREATE INDEX "topic_block_progress_enrollmentId_topicNumber_idx" ON "topic_block_progress"("enrollmentId", "topicNumber");

ALTER TABLE "topic_block_progress" ADD CONSTRAINT "topic_block_progress_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "enrollments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
