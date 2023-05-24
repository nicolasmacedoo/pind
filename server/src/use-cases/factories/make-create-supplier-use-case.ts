import { CreateSupplierUseCase } from '../create-supplier'
import { PrismaSuppliersRepository } from '@/repositories/prisma/prisma-supplier-repository'

export function makeCreateSupplierUseCase() {
  const prismaSupplierRepository = new PrismaSuppliersRepository()
  const createSupplierUseCase = new CreateSupplierUseCase(
    prismaSupplierRepository,
  )

  return createSupplierUseCase
}
