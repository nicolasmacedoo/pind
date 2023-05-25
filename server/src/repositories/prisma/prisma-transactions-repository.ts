import { Prisma, Transaction } from '@prisma/client'
import { TransactionsRepository } from '../transactions-repository'
import { prisma } from '@/lib/prisma'

export class PrismaTransactionsRepository implements TransactionsRepository {
  async create(
    data: Prisma.TransactionUncheckedCreateInput,
  ): Promise<Transaction> {
    const transaction = await prisma.transaction.create({ data })

    return transaction
  }

  async fetchTransactions(userId: string): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: {
        user_id: userId,
      },
    })

    return transactions
  }

  async delete(transactionId: string): Promise<void> {
    await prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    })
  }

  async update(
    transactionId: string,
    data: Prisma.TransactionUncheckedUpdateInput,
  ): Promise<Transaction> {
    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data,
    })

    return updatedTransaction
  }
}
