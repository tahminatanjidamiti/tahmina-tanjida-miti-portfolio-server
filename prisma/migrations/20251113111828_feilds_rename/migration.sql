/*
  Warnings:

  - You are about to drop the column `ClientSite` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `ServerSite` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "ClientSite",
DROP COLUMN "ServerSite",
ADD COLUMN     "clientSite" TEXT,
ADD COLUMN     "serverSite" TEXT;
