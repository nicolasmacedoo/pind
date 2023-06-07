import { ItenOrder, Prisma, Product } from '@prisma/client'

export interface ProductsRepository {
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>
  findProductInOnrder(productId: string): Promise<ItenOrder | null>
  fetchProducts(userId: string): Promise<Product[]>
  delete(productId: string): Promise<void>
  update(
    productId: string,
    data: Prisma.ProductUncheckedUpdateInput,
  ): Promise<Product>
}
