import { OrderRepository } from '@/repositories/order-repository'
import { Order } from '@prisma/client'

interface CreateOrderUseCaseRequest {
  clientId: string
  userId: string
  total: number
  products: {
    id: string
    quantity: number
  }[]
}

interface CreateOrderUseCaseResponse {
  order: Order
}

export class CreateOrderUseCase {
  constructor(private ordersRepository: OrderRepository) {}

  async execute({
    clientId,
    userId,
    total,
    products,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = await this.ordersRepository.create({
      clientId,
      userId,
      total,
      products,
    })

    return {
      order,
    }
  }
}
