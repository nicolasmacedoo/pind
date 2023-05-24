import { ClientsRepository } from '@/repositories/client-repository'
import { Client } from '@prisma/client'

interface CreateClientUseCaseRequest {
  name: string
  cpf: string
  phone: string
  userId: string
}

interface CreateClientUseCaseResponse {
  client: Client
}

export class CreateClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    name,
    cpf,
    phone,
    userId,
  }: CreateClientUseCaseRequest): Promise<CreateClientUseCaseResponse> {
    const client = await this.clientsRepository.create({
      name,
      cpf,
      phone,
      user_id: userId,
    })

    return {
      client,
    }
  }
}
