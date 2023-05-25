import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify/types/instance'
import { create } from './create'
import { fetch } from './fetch'
import { update } from './update'
import { exclude } from './delete'

export async function transactionRoute(app: FastifyInstance) {
  app.post('/transactions', { onRequest: [verifyJWT] }, create)
  app.get('/transactions', { onRequest: [verifyJWT] }, fetch)
  app.put('/transactions/:id', { onRequest: [verifyJWT] }, update)
  app.delete('/transactions/:id', { onRequest: [verifyJWT] }, exclude)
}
