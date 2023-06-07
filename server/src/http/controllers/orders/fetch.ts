import { makeFetchOrdersUseCase } from '@/use-cases/factories/make-fetch-orders-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fecthOrders = makeFetchOrdersUseCase()

  const { orders } = await fecthOrders.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send(orders)
}
