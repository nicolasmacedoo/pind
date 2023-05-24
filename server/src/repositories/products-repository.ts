import { Prisma, Product } from '@prisma/client'

export interface ProductsRepository {
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>
  fetchProducts(userId: string): Promise<Product[]>
  delete(productId: string): Promise<void>
  update(
    productId: string,
    data: Prisma.ProductUncheckedUpdateInput,
  ): Promise<Product>
}
