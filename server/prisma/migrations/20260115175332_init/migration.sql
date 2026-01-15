-- CreateTable
CREATE TABLE "cvs" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "template" VARCHAR(50) NOT NULL DEFAULT 'modern',
    "data" JSONB NOT NULL,
    "userId" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cvs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "cvs_name_idx" ON "cvs"("name");

-- CreateIndex
CREATE INDEX "cvs_userId_idx" ON "cvs"("userId");

-- CreateIndex
CREATE INDEX "cvs_created_at_idx" ON "cvs"("created_at");
