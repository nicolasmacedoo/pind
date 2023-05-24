import { SuppliersRepository } from '@/repositories/supplier-repository'

interface DeleteSupplierUseCaseRequest {
  supplierId: string
}

export class DeleteSupplierUseCase {
  constructor(private suppliersRepository: SuppliersRepository) {}

  async execute({ supplierId }: DeleteSupplierUseCaseRequest) {
    await this.suppliersRepository.delete(supplierId)
  }
}
