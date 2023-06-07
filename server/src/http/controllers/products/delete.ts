import { DeleteProductInOrder } from '@/use-cases/errors/delete-product-in-order-error'
import { makeDeleteProductsUseCase } from '@/use-cases/factories/make-delete-product-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function exclude(request: FastifyRequest, reply: FastifyReply) {
  const deleteProductParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = deleteProductParamsSchema.parse(request.params)

  const deleteProducts = makeDeleteProductsUseCase()

  try {
    await deleteProducts.execute({ productId: id })
  } catch (err) {
    if (err instanceof DeleteProductInOrder) {
      return reply.status(400).send({
        message: err.message,
      })
    }
  }

  return reply.status(204).send()
}
