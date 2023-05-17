import { Prisma, Product } from '@prisma/client'

export interface ProdcutsRepository {
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>
}
