import type { Order, OrderFilterParams, OrderListResponse } from '../types/order.types'
import { mockOrderListData } from './mocks/order.mock'

/**
 * 平台后台 - 订单Service
 * 提供订单的CRUD操作
 */
class OrderService {
  private mockData = [...mockOrderListData]

  /**
   * 获取订单列表（支持筛选和分页）- 按PRD优化
   */
  async getOrderList(params?: OrderFilterParams): Promise<OrderListResponse> {
    await new Promise(resolve => setTimeout(resolve, 300))

    let filtered = [...this.mockData]

    // 1. 订单状态筛选
    if (params?.orderStatus && params.orderStatus !== 'all') {
      filtered = filtered.filter(order => order.status === params.orderStatus)
    }

    // 2. 下单时间范围筛选
    if (params?.orderCreatedStart) {
      filtered = filtered.filter(order =>
        order.createdAt >= params.orderCreatedStart!
      )
    }
    if (params?.orderCreatedEnd) {
      filtered = filtered.filter(order =>
        order.createdAt <= params.orderCreatedEnd! + ' 23:59:59'
      )
    }

    // 3. 入住时间范围筛选
    if (params?.checkInStart) {
      filtered = filtered.filter(order =>
        order.checkInDate >= params.checkInStart!
      )
    }
    if (params?.checkInEnd) {
      filtered = filtered.filter(order =>
        order.checkInDate <= params.checkInEnd!
      )
    }

    // 4. 酒店名称模糊搜索
    if (params?.hotelName) {
      filtered = filtered.filter(order =>
        order.hotelName.toLowerCase().includes(params.hotelName!.toLowerCase())
      )
    }

    // 5. 订单号/手机号搜索
    if (params?.searchKeyword) {
      const keyword = params.searchKeyword.trim()
      filtered = filtered.filter(order =>
        order.orderNumber.includes(keyword) ||
        order.guestPhone.includes(keyword)
      )
    }

    // 默认按下单时间倒序排列
    filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt))

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

  /**
   * 根据ID获取订单详情
   */
  async getOrderById(id: string): Promise<Order | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.mockData.find(order => order.id === id) || null
  }

  /**
   * 更新订单
   */
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

  /**
   * 删除订单
   */
  async deleteOrder(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const index = this.mockData.findIndex(order => order.id === id)
    if (index === -1) return false

    this.mockData.splice(index, 1)
    return true
  }
}

export default new OrderService()
