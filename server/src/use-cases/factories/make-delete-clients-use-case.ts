import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients-repository'
import { DeleteClientUseCase } from '../delete-client'

export function makeDeleteClientUseCase() {
  const prismaClientRepository = new PrismaClientsRepository()
  const deleteClientUseCase = new DeleteClientUseCase(prismaClientRepository)

  return deleteClientUseCase
}
