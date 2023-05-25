import { SuppliersRepository } from '@/repositories/supplier-repository'
import { Supplier } from '@prisma/client'

interface FetchSupplierUseCaseRequest {
  userId: string
}

interface FetchSupplierUseCaseResponse {
  suppliers: Supplier[]
}

export class FetchSupplierUseCase {
  constructor(private supplierRepository: SuppliersRepository) {}
  async execute({
    userId,
  }: FetchSupplierUseCaseRequest): Promise<FetchSupplierUseCaseResponse> {
    const suppliers = await this.supplierRepository.fetchSuppliers(userId)

    return {
      suppliers,
    }
  }
}
