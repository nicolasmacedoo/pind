import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { update } from './update'
import { fetch } from './fetch'
import { exclude } from './delete'

export async function supplierRoutes(app: FastifyInstance) {
  app.post('/suppliers', { onRequest: [verifyJWT] }, create)
  app.get('/suppliers', { onRequest: [verifyJWT] }, fetch)
  app.put('/suppliers/:id', { onRequest: [verifyJWT] }, update)
  app.delete('/suppliers/:id', { onRequest: [verifyJWT] }, exclude)
}
