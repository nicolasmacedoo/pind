import { makeUpdateProductsUseCase } from '@/use-cases/factories/make-update-product'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateProductParamsSchema = z.object({
    id: z.string(),
  })

  const updateProductBodySchema = z.object({
    name: z.string().optional(),
    price: z.number().optional(),
    quantity: z.number().optional(),
    unitMeasurement: z.string().optional(),
  })

  const { id } = updateProductParamsSchema.parse(request.params)
  const { name, price, quantity, unitMeasurement } =
    updateProductBodySchema.parse(request.body)

  const updateProducts = makeUpdateProductsUseCase()

  const product = await updateProducts.execute({
    productId: id,
    data: {
      name,
      price,
      quantity,
      unit_measurement: unitMeasurement,
    },
  })

  console.log(product)

  return reply.status(200).send(product)
}
