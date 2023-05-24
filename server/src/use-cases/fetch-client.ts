import { ClientsRepository } from '@/repositories/client-repository'
import { Client } from '@prisma/client'

interface FetchClientsUseCaseRequest {
  userId: string
}

interface FetchClientsUseCaseResponse {
  clients: Client[]
}

export class FetchClientsUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    userId,
  }: FetchClientsUseCaseRequest): Promise<FetchClientsUseCaseResponse> {
    const clients = await this.clientsRepository.fetchClients(userId)

    return {
      clients,
    }
  }
}
