import { TransactionsRepository } from '@/repositories/transactions-repository'
import { Prisma, Transaction } from '@prisma/client'

interface UdpdateTransactionUseCaseRequest {
  transactionId: string
  data: Prisma.TransactionUncheckedUpdateInput
}

interface UdpdateTransactionUseCaseResponse {
  transaction: Transaction
}

export class UpdateTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    transactionId,
    data,
  }: UdpdateTransactionUseCaseRequest): Promise<UdpdateTransactionUseCaseResponse> {
    const transaction = await this.transactionsRepository.update(
      transactionId,
      data,
    )

    return {
      transaction,
    }
  }
}
