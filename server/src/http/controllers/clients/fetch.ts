import { makeFetchClientUseCase } from '@/use-cases/factories/make-fetch-clients-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchClients = makeFetchClientUseCase()

  const { clients } = await fetchClients.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send(clients)
}
