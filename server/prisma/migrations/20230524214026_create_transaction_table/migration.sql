-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" MONEY NOT NULL,
    "categoria" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
