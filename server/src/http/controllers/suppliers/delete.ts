import { makeDeleteSupplierUseCase } from '@/use-cases/factories/make-delete-supplier-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function exclude(request: FastifyRequest, reply: FastifyReply) {
  const deleteSupplierParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = deleteSupplierParamsSchema.parse(request.params)

  const deleteSupplier = makeDeleteSupplierUseCase()

  await deleteSupplier.execute({ supplierId: id })

  return reply.status(204).send()
}
