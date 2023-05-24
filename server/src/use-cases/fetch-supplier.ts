import { SuppliersRepository } from '@/repositories/supplier-repository'
import { Supplier } from '@prisma/client'

interface FetchSupplierUseCaseRequest {
  supplierId: string
}

interface FetchSupplierUseCaseResponse {
  suppliers: Supplier[]
}

export class FetchSupplierUseCase {
  constructor(private supplierRepository: SuppliersRepository) {}
  async execute({
    supplierId,
  }: FetchSupplierUseCaseRequest): Promise<FetchSupplierUseCaseResponse> {
    const suppliers = await this.supplierRepository.fetchSuppliers(supplierId)

    return {
      suppliers,
    }
  }
}
