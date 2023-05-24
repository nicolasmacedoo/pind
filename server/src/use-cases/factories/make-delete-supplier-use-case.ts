import { PrismaSuppliersRepository } from '@/repositories/prisma/prisma-supplier-repository'
import { DeleteSupplierUseCase } from '../delete-supplier'

export function makeDeleteSupplierUseCase() {
  const prismaSupplierRepository = new PrismaSuppliersRepository()
  const deleteSupplierUseCase = new DeleteSupplierUseCase(
    prismaSupplierRepository,
  )

  return deleteSupplierUseCase
}
