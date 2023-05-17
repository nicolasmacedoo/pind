import { makeCreateProductUseCase } from '@/use-cases/factories/make-create-product-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createProductBodySchema = z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    price: z.number(),
    quantity: z.number(),
    unitMeasurement: z.string(),
  })

  const { name, price, quantity, unitMeasurement } =
    createProductBodySchema.parse(request.body)

  const createProduct = makeCreateProductUseCase()

  const { product } = await createProduct.execute({
    name,
    price,
    quantity,
    unit_measurement: unitMeasurement,
    userId: request.user.sub,
  })

  return reply.status(201).send(product)
}
