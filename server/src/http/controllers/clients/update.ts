import { makeUpdateClientUseCase } from '@/use-cases/factories/make-update-clients-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateClientParamsSchema = z.object({
    id: z.string(),
  })

  const updateClientBodySchema = z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    cpf: z.string(),
    phone: z.string(),
  })

  const { id } = updateClientParamsSchema.parse(request.params)
  const { name, cpf, phone } = updateClientBodySchema.parse(request.body)

  const updateClient = makeUpdateClientUseCase()

  const { client } = await updateClient.execute({
    clientId: id,
    data: {
      name,
      cpf,
      phone,
    },
  })

  console.log(client)

  return reply.status(200).send(client)
}
