import type { Order } from '../types/order.types'
import { mockOrders } from './mocks'

class OrderService {
  private orders: Order[] = [...mockOrders]

  async getAllOrders(): Promise<Order[]> {
    await new Promise(resolve => setTimeout(resolve, 500))
    return [...this.orders]
  }
}

export default new OrderService()
