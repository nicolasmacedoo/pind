import { CreateClientUseCase } from '../create-client'
import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients-repository'

export function makeCreateClientUseCase() {
  const prismaClientRepository = new PrismaClientsRepository()
  const createClientUseCase = new CreateClientUseCase(prismaClientRepository)

  return createClientUseCase
}
