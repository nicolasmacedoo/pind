import { makeUpdateTransactionUseCase } from '@/use-cases/factories/make-update-transaction-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateTransactionParamsSchema = z.object({
    id: z.string(),
  })

  const updateTransactionBodySchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
  })

  const { id } = updateTransactionParamsSchema.parse(request.params)

  const { description, price, category, type } =
    updateTransactionBodySchema.parse(request.body)

  const updateTransaction = makeUpdateTransactionUseCase()

  const { transaction } = await updateTransaction.execute({
    transactionId: id,
    data: {
      description,
      price,
      category,
      type,
    },
  })

  return reply.status(200).send(transaction)
}
