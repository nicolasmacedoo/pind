/*
  Warnings:

  - Added the required column `cpf` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "cep" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "complement" TEXT,
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT,
ADD COLUMN     "number" INTEGER,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "state" CHAR(2),
ADD COLUMN     "street" TEXT;
