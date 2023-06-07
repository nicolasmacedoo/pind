import { FetchOrders, OrderRepository } from '@/repositories/order-repository'

interface FetchOrdersUseCaseRequest {
  userId: string
}

interface FetchOrdersUseCaseResponse {
  orders: FetchOrders[]
}

export class FetchOrdersUseCase {
  constructor(private ordersRepository: OrderRepository) {}

  async execute({
    userId,
  }: FetchOrdersUseCaseRequest): Promise<FetchOrdersUseCaseResponse> {
    const orders = await this.ordersRepository.fetchOrders(userId)

    return {
      orders,
    }
  }
}
