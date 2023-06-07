import { Order } from '@prisma/client'
import { CreateOrder, FetchOrders, OrderRepository } from '../order-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrdersRepository implements OrderRepository {
  async fetchOrders(userId: string): Promise<FetchOrders[]> {
    const orders = await prisma.order.findMany({
      where: {
        user_id: userId,
      },
      select: {
        client: {
          select: {
            name: true,
            cpf: true,
          },
        },
        id: true,
        total: true,
        date: true,
      },
    })

    const formatedOrders = orders.map((order) => {
      return {
        ...order,
        total: order.total.toNumber(),
      }
    })

    return formatedOrders
  }

  async create(data: CreateOrder): Promise<Order> {
    // const order = await prisma.order.create({
    //   data: {
    //     user_id: data.userId,
    //     client_id: data.clientId,
    //     total: data.total,
    //     ItenOrder: {
    //       create: data.products.map((product) => ({
    //         quantity: product.quantity,
    //         product: {
    //           connect: {
    //             id: product.id,
    //           },
    //         },
    //       })),
    //     },
    //   },
    // })

    const [order, transaction] = await prisma.$transaction([
      prisma.order.create({
        data: {
          user_id: data.userId,
          client_id: data.clientId,
          total: data.total,
          ItenOrder: {
            create: data.products.map((product) => ({
              quantity: product.quantity,
              product: {
                connect: {
                  id: product.id,
                },
              },
            })),
          },
        },
      }),
      prisma.transaction.create({
        data: {
          description: 'Venda de produtos n° 1',
          price: data.total,
          type: 'income',
          category: 'Vendas',
          user_id: data.userId,
        },
      }),
    ])

    return order
  }
}

// export class PrismaOrdersRepository implements OrderRepository {
//   async create(data: Prisma.OrderUncheckedCreateInput): Promise<Order> {
//     const order = await prisma.order.create({
//       data,
//     })

//     return order
//   }
// }
