import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { FetchProductsUseCase } from '../fetch-products'

export function makeFetchProductsUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository()
  const fetchProductsUseCase = new FetchProductsUseCase(
    prismaProductsRepository,
  )

  return fetchProductsUseCase
}
