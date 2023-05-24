import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients-repository'
import { FetchClientsUseCase } from '../fetch-client'

export function makeFetchClientUseCase() {
  const prismaClientRepository = new PrismaClientsRepository()
  const fetchClientUseCase = new FetchClientsUseCase(prismaClientRepository)

  return fetchClientUseCase
}
