/*
  Warnings:

  - You are about to drop the column `projectLinks` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `techStack` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "projectLinks",
DROP COLUMN "techStack",
ADD COLUMN     "ClientSite" TEXT,
ADD COLUMN     "ServerSite" TEXT;
