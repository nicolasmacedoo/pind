import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { FetchTransactionUseCase } from '../fetch-transactions'

export function makeFetchTransactionUseCase() {
  const prismaTransactionRepository = new PrismaTransactionsRepository()
  const fetchTransactionUseCase = new FetchTransactionUseCase(
    prismaTransactionRepository,
  )

  return fetchTransactionUseCase
}
