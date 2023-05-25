import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { UpdateTransactionUseCase } from '../update-transaction'

export function makeUpdateTransactionUseCase() {
  const prismaTransactionRepository = new PrismaTransactionsRepository()
  const updateTransactionUseCase = new UpdateTransactionUseCase(
    prismaTransactionRepository,
  )

  return updateTransactionUseCase
}
