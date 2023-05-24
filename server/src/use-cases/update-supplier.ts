import { SuppliersRepository } from '@/repositories/supplier-repository'
import { Prisma, Supplier } from '@prisma/client'

interface UpdateSupplierUseCaseRequest {
  supplierId: string
  data: Prisma.SupplierUncheckedUpdateInput
}

interface UpdateSupplierUseCaseResponse {
  supplier: Supplier
}

export class UpdateSupplierUseCase {
  constructor(private supplierRepository: SuppliersRepository) {}

  async execute({
    supplierId,
    data,
  }: UpdateSupplierUseCaseRequest): Promise<UpdateSupplierUseCaseResponse> {
    const supplier = await this.supplierRepository.update(supplierId, data)

    return { supplier }
  }
}
