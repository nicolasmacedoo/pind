import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { CreateTransactionUseCase } from '../create-transaction'

export function makeCreateTransactionUseCase() {
  const prismaTransactionRepository = new PrismaTransactionsRepository()
  const createTransactionUseCase = new CreateTransactionUseCase(
    prismaTransactionRepository,
  )

  return createTransactionUseCase
}
