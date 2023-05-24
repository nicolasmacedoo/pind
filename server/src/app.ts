import fastifyJwt from '@fastify/jwt'
import { fastifyCors } from '@fastify/cors'
import fastify from 'fastify'
import { userRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from './env'
import { productRoutes } from './http/controllers/products/routes'

export const app = fastify()

app.register(fastifyCors, {
  origin: true,
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  },
})

// app.register(fastifyJwt, {
//   secret: env.JWT_SECRET,
//   cookie: {
//     cookieName: 'refreshToken',
//     signed: false,
//   },
//   sign: {
//     expiresIn: '10m',
//   },
// })

// app.register(fastifyCookie)

app.register(userRoutes)
app.register(productRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external service like Sentry
  }

  return reply.status(500).send({ message: '☢️ Internal server error' })
})
