import { makeFetchTransactionUseCase } from '@/use-cases/factories/make-fetch-transactions-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchTransaction = makeFetchTransactionUseCase()

  console.log(request.user.sub)

  const { transactions } = await fetchTransaction.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send(transactions)
}
