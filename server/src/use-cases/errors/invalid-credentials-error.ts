export class InvalidCredentialsError extends Error {
  constructor() {
    super('Usuario ou senha inválidos')
  }
}
