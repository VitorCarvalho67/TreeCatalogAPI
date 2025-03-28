/*
  Warnings:

  - Added the required column `userId` to the `Tree` table without a default value. This is not possible if the table is not empty.

*/
-- Primeiro, vamos criar um usuário padrão se não existir
INSERT INTO "User" (id, email, password, "createdAt", "updatedAt")
SELECT 'default-user', 'default@example.com', '$2a$10$default', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "User" WHERE id = 'default-user');

-- Agora vamos adicionar a coluna userId com o valor padrão
ALTER TABLE "Tree" ADD COLUMN "userId" TEXT NOT NULL DEFAULT 'default-user';

-- Adicionar a foreign key
ALTER TABLE "Tree" ADD CONSTRAINT "Tree_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
