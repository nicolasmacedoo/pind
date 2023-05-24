import { makeCreateClientUseCase } from '@/use-cases/factories/make-create-clients-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createClientBodySchema = z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    cpf: z.string(),
    phone: z.string(),
  })

  const { name, cpf, phone } = createClientBodySchema.parse(request.body)

  const createClient = makeCreateClientUseCase()

  const { client } = await createClient.execute({
    name,
    cpf,
    phone,
    userId: request.user.sub,
  })

  return reply.status(201).send(client)
}
