import { makeDeleteProductsUseCase } from '@/use-cases/factories/make-delete-product-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function exclude(request: FastifyRequest, reply: FastifyReply) {
  const deleteProductParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = deleteProductParamsSchema.parse(request.params)

  const deleteProducts = makeDeleteProductsUseCase()

  await deleteProducts.execute({ productId: id })

  return reply.status(204).send()
}
