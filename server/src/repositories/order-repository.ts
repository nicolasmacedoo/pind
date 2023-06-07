import { Order } from '@prisma/client'

export interface CreateOrder {
  userId: string
  clientId: string
  total: number
  products: {
    id: string
    quantity: number
  }[]
}

export interface FetchOrders {
  id: string
  total: number
  date: Date
  client: {
    name: string
    cpf: string
  }
}

export interface OrderRepository {
  create(order: CreateOrder): Promise<Order>
  fetchOrders(userId: string): Promise<FetchOrders[]>
}
