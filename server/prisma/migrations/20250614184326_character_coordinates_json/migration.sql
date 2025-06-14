/*
  Warnings:

  - You are about to drop the column `xCoord` on the `CharacterCoordinates` table. All the data in the column will be lost.
  - You are about to drop the column `yCoord` on the `CharacterCoordinates` table. All the data in the column will be lost.
  - Added the required column `coordinates` to the `CharacterCoordinates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CharacterCoordinates" DROP COLUMN "xCoord",
DROP COLUMN "yCoord",
ADD COLUMN     "coordinates" JSONB NOT NULL;
