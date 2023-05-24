import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { fetch } from './fetch'
import { update } from './update'
import { exclude } from './delete'

export async function clientRoutes(app: FastifyInstance) {
  app.post('/clients', { onRequest: [verifyJWT] }, create)
  app.get('/clients', { onRequest: [verifyJWT] }, fetch)
  app.put('/clients/:id', { onRequest: [verifyJWT] }, update)
  app.delete('/clients/:id', { onRequest: [verifyJWT] }, exclude)
}
