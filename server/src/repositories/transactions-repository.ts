import { Prisma, Transaction } from '@prisma/client'

export interface TransactionsRepository {
  create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>
  fetchTransactions(userId: string): Promise<Transaction[]>
  delete(transactionId: string): Promise<void>
  update(
    transactionId: string,
    data: Prisma.TransactionUncheckedUpdateInput,
  ): Promise<Transaction>
}
