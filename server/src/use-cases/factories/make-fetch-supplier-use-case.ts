import { PrismaSuppliersRepository } from '@/repositories/prisma/prisma-supplier-repository'
import { FetchSupplierUseCase } from '../fetch-supplier'

export function makeFetchSupplierUseCase() {
  const prismaSupplierRepository = new PrismaSuppliersRepository()
  const fetchSupplierUseCase = new FetchSupplierUseCase(
    prismaSupplierRepository,
  )

  return fetchSupplierUseCase
}
