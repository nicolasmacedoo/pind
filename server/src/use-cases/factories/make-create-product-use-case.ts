import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { CreateProductUseCase } from '../create-product'

export function makeCreateProductUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository()
  const createProductUseCase = new CreateProductUseCase(
    prismaProductsRepository,
  )

  return createProductUseCase
}
