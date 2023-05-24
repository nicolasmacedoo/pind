import { ClientsRepository } from '@/repositories/client-repository'

interface DeleteClientUseCaseRequest {
  clientId: string
}

export class DeleteClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({ clientId }: DeleteClientUseCaseRequest): Promise<void> {
    await this.clientsRepository.delete(clientId)
  }
}
