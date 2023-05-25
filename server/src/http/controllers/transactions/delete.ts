import { makeDeleteTransactionUseCase } from '@/use-cases/factories/make-delete-transaction-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function exclude(request: FastifyRequest, reply: FastifyReply) {
  const deleteTransactionParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = deleteTransactionParamsSchema.parse(request.params)

  const deleteTransaction = makeDeleteTransactionUseCase()

  await deleteTransaction.execute({ transactionId: id })

  return reply.status(204).send()
}
