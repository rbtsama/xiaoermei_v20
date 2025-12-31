import type { Order, OrderListResponse } from '@/views/PlatformAdmin/OrderManagement/types/order.types'
import type { OrderListFilterParams } from '../types/orderList.types'
import { mockOrderListData } from './mocks'

class OrderListService {
  private mockData = [...mockOrderListData]

  async getOrderList(params?: OrderListFilterParams): Promise<OrderListResponse> {
    await new Promise(resolve => setTimeout(resolve, 300))

    let filtered = [...this.mockData]

    // 房型筛选
    if (params?.roomType) {
      filtered = filtered.filter(order =>
        order.roomType.toLowerCase().includes(params.roomType!.toLowerCase())
      )
    }

    // 日期范围筛选
    if (params?.startDate) {
      filtered = filtered.filter(order =>
        order.checkInDate >= params.startDate!
      )
    }
    if (params?.endDate) {
      filtered = filtered.filter(order =>
        order.checkOutDate <= params.endDate!
      )
    }

    // 支付状态筛选
    if (params?.paymentStatus) {
      filtered = filtered.filter(order => order.paymentStatus === params.paymentStatus)
    }

    // 入住状态筛选
    if (params?.checkInStatus) {
      filtered = filtered.filter(order => order.checkInStatus === params.checkInStatus)
    }

    // 分页
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const total = filtered.length
    const totalPages = Math.ceil(total / pageSize)
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const orders = filtered.slice(startIndex, endIndex)

    return {
      orders,
      total,
      page,
      pageSize,
      totalPages
    }
  }

  async getOrderById(id: string): Promise<Order | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.mockData.find(order => order.id === id) || null
  }

  async updateOrder(id: string, updates: Partial<Order>): Promise<Order | null> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const index = this.mockData.findIndex(order => order.id === id)
    if (index === -1) return null

    this.mockData[index] = {
      ...this.mockData[index],
      ...updates
    }

    return this.mockData[index]
  }

  async deleteOrder(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const index = this.mockData.findIndex(order => order.id === id)
    if (index === -1) return false

    this.mockData.splice(index, 1)
    return true
  }

  /**
   * 取消订单
   * @param orderId 订单ID
   * @returns 是否成功
   */
  async cancelOrder(orderId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const order = this.mockData.find(o => o.id === orderId)
    if (!order) return false

    // 只有待入住状态可以取消
    if (order.status !== 'pending_checkin') {
      throw new Error('只有待入住订单可以取消')
    }

    // 更新订单状态
    order.status = 'cancelled' as any
    order.cancelledAt = new Date().toISOString().replace('T', ' ').substring(0, 19)
    order.cancelledBy = '商户'

    return true
  }

  /**
   * 更新商家备注
   * @param orderId 订单ID
   * @param note 备注内容
   * @returns 是否成功
   */
  async updateMerchantNote(orderId: string, note: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const order = this.mockData.find(o => o.id === orderId)
    if (!order) return false

    order.merchantNote = note
    return true
  }

  /**
   * 获取所有房型列表（用于筛选）
   * @returns 房型列表
   */
  async getRoomTypes(): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 100))

    // 从Mock数据中提取所有唯一房型
    const roomTypes = [...new Set(this.mockData.map(order => order.roomType))]
    return roomTypes.sort()
  }
}

export default new OrderListService()
