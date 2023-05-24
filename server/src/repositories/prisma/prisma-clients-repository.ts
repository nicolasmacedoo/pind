import { Prisma, Client } from '@prisma/client'
import { ClientsRepository } from '../client-repository'
import { prisma } from '@/lib/prisma'

export class PrismaClientsRepository implements ClientsRepository {
  async create(data: Prisma.ClientUncheckedCreateInput): Promise<Client> {
    const client = await prisma.client.create({
      data,
    })

    return client
  }

  async fetchClients(userId: string): Promise<Client[]> {
    const clients = await prisma.client.findMany({
      where: {
        user_id: userId,
      },
    })

    return clients
  }

  async delete(clientId: string): Promise<void> {
    await prisma.client.delete({
      where: {
        id: clientId,
      },
    })
  }

  async update(
    clientId: string,
    data: Prisma.ClientUncheckedUpdateInput,
  ): Promise<Client> {
    const updatedClient = await prisma.client.update({
      where: {
        id: clientId,
      },
      data,
    })

    return updatedClient
  }
}
