import { ClientsRepository } from '@/repositories/client-repository'
import { Client, Prisma } from '@prisma/client'

interface UpdateClientUseCaseRequest {
  clientId: string
  data: Prisma.ClientUncheckedUpdateInput
}

interface UpdateClientUseCaseResponse {
  client: Client
}

export class UpdateClientUseCase {
  constructor(private clientRepository: ClientsRepository) {}

  async execute({
    clientId,
    data,
  }: UpdateClientUseCaseRequest): Promise<UpdateClientUseCaseResponse> {
    const client = await this.clientRepository.update(clientId, data)

    return { client }
  }
}
