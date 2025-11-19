/**
 * 积分系统服务层
 * 模拟真实业务逻辑
 */

import type {
  PointsRuleConfig,
  UserPointsAccount,
  PointsDetail,
  UserSearchParams,
  PointsDetailQuery,
  ManualAdjustRequest
} from '../types/points.types'
import { PointsChangeType } from '../types/points.types'
import {
  mockPointsRuleConfig,
  mockUserAccounts,
  mockPointsDetails
} from './mocks'

class PointsService {
  private ruleConfig: PointsRuleConfig = { ...mockPointsRuleConfig }
  private userAccounts: UserPointsAccount[] = [...mockUserAccounts]
  private pointsDetails: PointsDetail[] = [...mockPointsDetails]

  // ==================== 积分规则配置 ====================

  /**
   * 获取当前积分规则配置
   */
  async getRuleConfig(): Promise<PointsRuleConfig> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return { ...this.ruleConfig }
  }

  /**
   * 更新积分规则配置
   */
  async updateRuleConfig(config: Partial<PointsRuleConfig>): Promise<PointsRuleConfig> {
    await new Promise(resolve => setTimeout(resolve, 500))
    this.ruleConfig = {
      ...this.ruleConfig,
      ...config,
      updatedAt: new Date().toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(',', '')
    }
    return { ...this.ruleConfig }
  }

  // ==================== 用户积分账户 ====================

  /**
   * 搜索用户积分账户
   */
  async searchUserAccount(params: UserSearchParams): Promise<UserPointsAccount | null> {
    await new Promise(resolve => setTimeout(resolve, 400))

    let result: UserPointsAccount | undefined

    if (params.phone) {
      result = this.userAccounts.find(u => u.phone === params.phone)
    } else if (params.userId) {
      result = this.userAccounts.find(u => u.userId === params.userId)
    } else if (params.userName) {
      result = this.userAccounts.find(u => u.userName.includes(params.userName!))
    }

    return result ? { ...result } : null
  }

  /**
   * 获取所有用户账户（用于列表展示）
   */
  async getAllUserAccounts(): Promise<UserPointsAccount[]> {
    await new Promise(resolve => setTimeout(resolve, 500))
    return this.userAccounts.map(u => ({ ...u }))
  }

  /**
   * 手动调整用户积分
   */
  async adjustUserPoints(request: ManualAdjustRequest): Promise<{ success: boolean; newBalance: number }> {
    await new Promise(resolve => setTimeout(resolve, 600))

    const userIndex = this.userAccounts.findIndex(u => u.userId === request.userId)
    if (userIndex === -1) {
      throw new Error('用户不存在')
    }

    const user = this.userAccounts[userIndex]
    const pointsChange = request.type === 'increase' ? request.points : -request.points

    // 检查余额是否足够（减少时）
    if (pointsChange < 0 && user.availablePoints < Math.abs(pointsChange)) {
      throw new Error('用户积分余额不足')
    }

    // 更新账户
    user.availablePoints += pointsChange
    if (pointsChange > 0) {
      user.totalEarned += pointsChange
    } else {
      user.totalSpent += Math.abs(pointsChange)
    }

    // 创建明细记录
    const detail: PointsDetail = {
      id: `PT_${Date.now()}`,
      userId: request.userId,
      changeType: PointsChangeType.MANUAL_ADJUST,
      points: pointsChange,
      balance: user.availablePoints,
      orderId: undefined,
      description: `手动调整：${request.description}`,
      operator: request.operator,
      createdAt: new Date().toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(',', '')
    }

    this.pointsDetails.unshift(detail)

    return {
      success: true,
      newBalance: user.availablePoints
    }
  }

  // ==================== 积分明细 ====================

  /**
   * 查询用户积分明细
   */
  async getUserPointsDetails(query: PointsDetailQuery): Promise<{
    details: PointsDetail[]
    total: number
    page: number
    pageSize: number
  }> {
    await new Promise(resolve => setTimeout(resolve, 500))

    // 筛选用户的明细
    let filtered = this.pointsDetails.filter(d => d.userId === query.userId)

    // 按变动类型筛选
    if (query.changeType) {
      filtered = filtered.filter(d => d.changeType === query.changeType)
    }

    // 按订单号筛选
    if (query.orderId) {
      filtered = filtered.filter(d => d.orderId === query.orderId)
    }

    // 按时间范围筛选（简化处理，实际应该解析日期）
    if (query.dateRange) {
      // 这里简化处理，实际应该根据 dateRange 计算日期范围
      // filtered = filtered.filter(d => ...)
    }

    // 分页
    const page = query.page || 1
    const pageSize = query.pageSize || 10
    const total = filtered.length
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const details = filtered.slice(start, end)

    return {
      details,
      total,
      page,
      pageSize
    }
  }

  /**
   * 获取积分变动类型的中文名称
   */
  getChangeTypeLabel(type: PointsChangeType): string {
    const labels: Record<PointsChangeType, string> = {
      [PointsChangeType.ORDER_COMPLETE]: '订单完成',
      [PointsChangeType.REDEEM]: '积分抵扣',
      [PointsChangeType.REFUND]: '订单退款',
      [PointsChangeType.EXPIRE]: '积分过期',
      [PointsChangeType.MANUAL_ADJUST]: '手动调整',
      [PointsChangeType.RETURN]: '积分退回'
    }
    return labels[type] || type
  }
}

export default new PointsService()
