import { Prisma, Supplier } from '@prisma/client'
import { SuppliersRepository } from '../supplier-repository'
import { prisma } from '@/lib/prisma'

export class PrismaSuppliersRepository implements SuppliersRepository {
  async create(data: Prisma.SupplierUncheckedCreateInput): Promise<Supplier> {
    const supplier = await prisma.supplier.create({
      data,
    })

    return supplier
  }

  async fetchSuppliers(userId: string): Promise<Supplier[]> {
    const suppliers = await prisma.supplier.findMany({
      where: {
        user_id: userId,
      },
    })

    return suppliers
  }

  async delete(supplierId: string): Promise<void> {
    await prisma.supplier.delete({
      where: {
        id: supplierId,
      },
    })
  }

  async update(
    supplierId: string,
    data: Prisma.SupplierUncheckedUpdateInput,
  ): Promise<Supplier> {
    const updatedSupplier = await prisma.supplier.update({
      where: {
        id: supplierId,
      },
      data,
    })

    return updatedSupplier
  }
}
