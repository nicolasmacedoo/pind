import { ProductsRepository } from '@/repositories/products-repository'
import { DeleteProductInOrder } from './errors/delete-product-in-order-error'

interface DeleteProductUseCaseRequest {
  productId: string
}

export class DeleteProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ productId }: DeleteProductUseCaseRequest) {
    const produtctInOrder = await this.productsRepository.findProductInOnrder(
      productId,
    )

    if (produtctInOrder) {
      throw new DeleteProductInOrder()
    }

    await this.productsRepository.delete(productId)
  }
}
