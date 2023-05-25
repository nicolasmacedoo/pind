import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { DeleteTransactionUseCase } from '../delete-transaction'

export function makeDeleteTransactionUseCase() {
  const prismaTransactionRepository = new PrismaTransactionsRepository()
  const deleteTransactionUseCase = new DeleteTransactionUseCase(
    prismaTransactionRepository,
  )

  return deleteTransactionUseCase
}
