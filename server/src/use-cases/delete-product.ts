import { ProductsRepository } from '@/repositories/products-repository'

interface DeleteProductUseCaseRequest {
  productId: string
}

export class DeleteProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ productId }: DeleteProductUseCaseRequest) {
    await this.productsRepository.delete(productId)
  }
}
