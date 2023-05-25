import { makeCreateTransactionUseCase } from '@/use-cases/factories/make-create-transaction-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createTransactionBodySchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
  })

  const { description, price, category, type } =
    createTransactionBodySchema.parse(request.body)

  const createTransaction = makeCreateTransactionUseCase()

  const { transaction } = await createTransaction.execute({
    description,
    price,
    category,
    type,
    userId: request.user.sub,
  })

  return reply.status(201).send(transaction)
}
