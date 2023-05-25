import { makeFetchSupplierUseCase } from '@/use-cases/factories/make-fetch-supplier-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchSupplier = makeFetchSupplierUseCase()

  console.log(request.user.sub)

  const { suppliers } = await fetchSupplier.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send(suppliers)
}
