-- DropIndex
DROP INDEX "Conversation_id_key";

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN "name" TEXT;
