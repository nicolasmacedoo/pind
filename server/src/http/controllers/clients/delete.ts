import { makeDeleteClientUseCase } from '@/use-cases/factories/make-delete-clients-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function exclude(request: FastifyRequest, reply: FastifyReply) {
  const deleteClientParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = deleteClientParamsSchema.parse(request.params)

  const deleteClient = makeDeleteClientUseCase()

  await deleteClient.execute({
    clientId: id,
  })

  return reply.status(204).send()
}
