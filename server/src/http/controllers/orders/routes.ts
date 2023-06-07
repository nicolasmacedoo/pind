import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { fetch } from './fetch'

export async function orderRoutes(app: FastifyInstance) {
  app.post('/orders', { onRequest: [verifyJWT] }, create)
  app.get('/orders', { onRequest: [verifyJWT] }, fetch)
}
