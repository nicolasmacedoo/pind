import { Prisma, Product } from '@prisma/client'
import { ProdcutsRepository } from '../products-repository'
import { prisma } from '@/lib/prisma'

export class PrismaProductsRepository implements ProdcutsRepository {
  async create(data: Prisma.ProductUncheckedCreateInput): Promise<Product> {
    const user = await prisma.product.create({ data })

    return user
  }
}
