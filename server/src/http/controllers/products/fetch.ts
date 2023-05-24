import { makeFetchProductsUseCase } from '@/use-cases/factories/make-fetch-products-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchProducts = makeFetchProductsUseCase()

  console.log(request.user.sub)

  const { products } = await fetchProducts.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send(products)
}
