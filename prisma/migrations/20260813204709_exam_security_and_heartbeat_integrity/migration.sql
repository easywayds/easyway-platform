-- Exam security + heartbeat integrity + quiz completion tracking

ALTER TABLE "topic_progress" ADD COLUMN "lastHeartbeatAt" TIMESTAMP(3);
ALTER TABLE "topic_progress" ADD COLUMN "quizCompletedAt" TIMESTAMP(3);

ALTER TABLE "assessment_attempts" ADD COLUMN "assignedQuestionIds" JSONB;
ALTER TABLE "assessment_attempts" ALTER COLUMN "scorePercent" DROP NOT NULL;
ALTER TABLE "assessment_attempts" ALTER COLUMN "passed" DROP NOT NULL;
ALTER TABLE "assessment_attempts" ALTER COLUMN "answers" DROP NOT NULL;
