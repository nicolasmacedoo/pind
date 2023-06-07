import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  lastname: string
  cpf: string
  phone?: string
  cep?: string
  street?: string
  number?: number
  neighborhood?: string
  complement?: string
  state?: string
  city?: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
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
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
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
      password_hash,
    })

    return {
      user,
    }
  }
}
