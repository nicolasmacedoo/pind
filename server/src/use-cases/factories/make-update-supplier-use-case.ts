import { PrismaSuppliersRepository } from '@/repositories/prisma/prisma-supplier-repository'
import { UpdateSupplierUseCase } from '../update-supplier'

export function makeUpdateSupplierUseCase() {
  const prismaSupplierRepository = new PrismaSuppliersRepository()
  const updateSupplierUseCase = new UpdateSupplierUseCase(
    prismaSupplierRepository,
  )

  return updateSupplierUseCase
}
