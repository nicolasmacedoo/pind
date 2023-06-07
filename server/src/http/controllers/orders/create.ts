import { makeCreateOrderUseCase } from '@/use-cases/factories/make-create-order-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrderBodySchema = z.object({
    clientId: z.string(),
    total: z.number(),
    products: z.array(
      z.object({
        id: z.string(),
        quantity: z.number(),
      }),
    ),
  })

  const { clientId, total, products } = createOrderBodySchema.parse(
    request.body,
  )

  const createOrder = makeCreateOrderUseCase()

  const { order } = await createOrder.execute({
    userId: request.user.sub,
    clientId,
    total,
    products,
  })

  return reply.status(201).send(order)
}
