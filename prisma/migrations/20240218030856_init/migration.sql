/*
  Warnings:

  - You are about to drop the column `authorId` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `body` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `content` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `published_at` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school_id` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_authorId_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "authorId",
DROP COLUMN "body",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "published_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "school_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "School" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "cnpj_escola" TEXT NOT NULL,
    "nome_fantasia" TEXT NOT NULL,
    "descricao_curso" TEXT NOT NULL,
    "sigla_curso" TEXT NOT NULL,
    "tipo_curso" TEXT NOT NULL,
    "data_validade_curso" TIMESTAMP(3) NOT NULL,
    "situacao_curso" TEXT NOT NULL,
    "coordenador_curso" TEXT NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "School_cnpj_escola_key" ON "School"("cnpj_escola");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
