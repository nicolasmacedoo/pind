import { SuppliersRepository } from '@/repositories/supplier-repository'
import { Supplier } from '@prisma/client'

interface CreateSupplierUseCaseRequest {
  name: string
  cnpj: string
  phone: string
  userId: string
}

interface CreateSupplierUseCaseResponse {
  supplier: Supplier
}

export class CreateSupplierUseCase {
  constructor(private supplierRepository: SuppliersRepository) {}

  async execute({
    name,
    cnpj,
    phone,
    userId,
  }: CreateSupplierUseCaseRequest): Promise<CreateSupplierUseCaseResponse> {
    const supplier = await this.supplierRepository.create({
      name,
      cnpj,
      phone,
      user_id: userId,
    })

    return { supplier }
  }
}
