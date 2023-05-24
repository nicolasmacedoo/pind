import { Prisma, Product } from '@prisma/client'
import { ProductsRepository } from '../products-repository'
import { prisma } from '@/lib/prisma'

export class PrismaProductsRepository implements ProductsRepository {
  async update(
    productId: string,
    data: Prisma.ProductUncheckedUpdateInput,
  ): Promise<Product> {
    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data,
    })

    return updatedProduct
  }

  async delete(productId: string): Promise<void> {
    await prisma.product.delete({
      where: {
        id: productId,
      },
    })
  }

  async fetchProducts(userId: string): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: { user_id: userId },
    })

    return products
  }

  async create(data: Prisma.ProductUncheckedCreateInput): Promise<Product> {
    const user = await prisma.product.create({ data })

    return user
  }
}
