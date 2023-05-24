import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients-repository'
import { UpdateClientUseCase } from '../update-client'

export function makeUpdateClientUseCase() {
  const prismaClientRepository = new PrismaClientsRepository()
  const updateClientUseCase = new UpdateClientUseCase(prismaClientRepository)

  return updateClientUseCase
}
