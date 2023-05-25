import { TransactionsRepository } from '@/repositories/transactions-repository'
import { Transaction } from '@prisma/client'

interface FetchTransactionUseCaseRequest {
  userId: string
}

interface FetchTransactionUseCaseResponse {
  transactions: Transaction[]
}

export class FetchTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    userId,
  }: FetchTransactionUseCaseRequest): Promise<FetchTransactionUseCaseResponse> {
    const transactions = await this.transactionsRepository.fetchTransactions(
      userId,
    )

    return {
      transactions,
    }
  }
}
