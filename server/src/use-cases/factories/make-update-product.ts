import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { UpdateProductUseCase } from '../update-product'

export function makeUpdateProductsUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository()
  const updateProductsUseCase = new UpdateProductUseCase(
    prismaProductsRepository,
  )

  return updateProductsUseCase
}
