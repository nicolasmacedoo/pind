import { Prisma, Supplier } from '@prisma/client'

export interface SuppliersRepository {
  create(data: Prisma.SupplierUncheckedCreateInput): Promise<Supplier>
  fetchSuppliers(userId: string): Promise<Supplier[]>
  delete(supplierId: string): Promise<void>
  update(
    supplierId: string,
    data: Prisma.SupplierUncheckedUpdateInput,
  ): Promise<Supplier>
}
