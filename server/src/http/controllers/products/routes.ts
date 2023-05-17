import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function productRoutes(app: FastifyInstance) {
  /** Authenticated routes */
  app.post('/products', { onRequest: [verifyJWT] }, create)
}
