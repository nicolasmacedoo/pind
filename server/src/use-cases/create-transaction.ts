import { TransactionsRepository } from '@/repositories/transactions-repository'
import { Transaction } from '@prisma/client'

interface CreateTransactionUseCaseRequest {
  userId: string
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface CreateTransactionUseCaseResponse {
  transaction: Transaction
}

export class CreateTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    userId,
    description,
    price,
    category,
    type,
  }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
    const transaction = await this.transactionsRepository.create({
      description,
      price,
      category,
      type,
      user_id: userId,
    })

    return {
      transaction,
    }
  }
}
