import { ProdcutsRepository } from '@/repositories/products-repository'
import { Product } from '@prisma/client'

interface CreateProductUseCaseRequest {
  name: string
  price: number
  quantity: number
  unit_measurement: string
  userId: string
}

interface CreateProductUseCaseResponse {
  product: Product
}

export class CreateProductUseCase {
  constructor(private productsRepository: ProdcutsRepository) {}

  async execute({
    name,
    price,
    quantity,
    unit_measurement,
    userId,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const product = await this.productsRepository.create({
      name,
      price,
      quantity,
      unit_measurement,
      user_id: userId,
    })

    return {
      product,
    }
  }
}
