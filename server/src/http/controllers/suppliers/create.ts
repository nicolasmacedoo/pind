import { makeCreateSupplierUseCase } from '@/use-cases/factories/make-create-supplier-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createSupplierBodySchema = z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    cnpj: z.string(),
    phone: z.string(),
  })

  const { name, cnpj, phone } = createSupplierBodySchema.parse(request.body)

  const createSupplier = makeCreateSupplierUseCase()

  const { supplier } = await createSupplier.execute({
    name,
    cnpj,
    phone,
    userId: request.user.sub,
  })

  return reply.status(201).send(supplier)
}
