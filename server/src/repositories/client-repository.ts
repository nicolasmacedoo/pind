import { Client, Prisma } from '@prisma/client'

export interface ClientsRepository {
  create(data: Prisma.ClientUncheckedCreateInput): Promise<Client>
  fetchClients(userId: string): Promise<Client[]>
  delete(clientId: string): Promise<void>
  update(
    clientId: string,
    data: Prisma.ClientUncheckedUpdateInput,
  ): Promise<Client>
}
