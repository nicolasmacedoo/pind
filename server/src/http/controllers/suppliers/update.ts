import { makeUpdateSupplierUseCase } from '@/use-cases/factories/make-update-supplier-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateSupplierParamsSchema = z.object({
    id: z.string(),
  })

  const updateSupplierBodySchema = z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    cnpj: z.string(),
    phone: z.string(),
  })

  const { id } = updateSupplierParamsSchema.parse(request.params)
  const { name, cnpj, phone } = updateSupplierBodySchema.parse(request.body)

  const updateSupplier = makeUpdateSupplierUseCase()

  const { supplier } = await updateSupplier.execute({
    supplierId: id,
    data: {
      name,
      cnpj,
      phone,
    },
  })

  console.log(supplier)

  return reply.status(200).send(supplier)
}
