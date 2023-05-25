import { TransactionsRepository } from '@/repositories/transactions-repository'

interface DeleteTransactionUseCaseRequest {
  transactionId: string
}

export class DeleteTransactionUseCase {
  constructor(private transactionRepository: TransactionsRepository) {}

  async execute({ transactionId }: DeleteTransactionUseCaseRequest) {
    await this.transactionRepository.delete(transactionId)
  }
}
