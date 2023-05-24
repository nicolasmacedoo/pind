import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { fetch } from './fetch'
import { exclude } from './delete'
import { update } from './update'

export async function productRoutes(app: FastifyInstance) {
  /** Authenticated routes */
  app.post('/products', { onRequest: [verifyJWT] }, create)
  app.get('/products', { onRequest: [verifyJWT] }, fetch)
  app.delete('/products/:id', { onRequest: [verifyJWT] }, exclude)
  app.put('/products/:id', { onRequest: [verifyJWT] }, update)
}
