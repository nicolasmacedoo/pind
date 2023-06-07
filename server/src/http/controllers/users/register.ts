import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    lastname: z.string({
      required_error: 'Lastname is required',
    }),
    cpf: z.string({
      required_error: 'CPF is required',
    }),
    phone: z.string(),
    cep: z.string(),
    street: z.string(),
    number: z.number(),
    neighborhood: z.string(),
    complement: z.string(),
    state: z.string(),
    city: z.string(),
    email: z.string(),
    password: z.string(),
    // email: z.string().email(),
    // password: z.string().min(6),
  })

  const {
    name,
    lastname,
    cpf,
    phone,
    cep,
    street,
    number,
    neighborhood,
    complement,
    state,
    city,
    email,
    password,
  } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      lastname,
      cpf,
      phone,
      cep,
      street,
      number,
      neighborhood,
      complement,
      state,
      city,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }

  return reply.status(201).send()
}
