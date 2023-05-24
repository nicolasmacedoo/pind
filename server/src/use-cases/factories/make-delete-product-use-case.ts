import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { DeleteProductUseCase } from '../delete-product'

export function makeDeleteProductsUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository()
  const deleteProductsUseCase = new DeleteProductUseCase(
    prismaProductsRepository,
  )

  return deleteProductsUseCase
}
