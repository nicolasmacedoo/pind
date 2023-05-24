import { ProductsRepository } from '@/repositories/products-repository'
import { Product } from '@prisma/client'

interface FetchProductsUseCaseRequest {
  userId: string
}
interface FetchProductsUseCaseResponse {
  products: Product[]
}

export class FetchProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    userId,
  }: FetchProductsUseCaseRequest): Promise<FetchProductsUseCaseResponse> {
    const products = await this.productsRepository.fetchProducts(userId)

    return {
      products,
    }
  }
}
