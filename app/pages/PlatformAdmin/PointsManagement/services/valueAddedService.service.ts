/**
 * 平台后台 - 积分增值服务管理服务
 */

import type { PointsRewardItem, PointsExchangeItem } from '../types/valueAddedService.types'
import { mockPointsRewards, mockPointsExchanges } from './mocks'

class ValueAddedServiceService {
  private rewardItems = [...mockPointsRewards]
  private exchangeItems = [...mockPointsExchanges]

  // ==================== 积分奖励服务 ====================

  /**
   * 获取所有积分奖励服务
   */
  async getRewardServices(): Promise<PointsRewardItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...this.rewardItems]
  }

  /**
   * 创建积分奖励服务
   */
  async createRewardService(data: Partial<PointsRewardItem>): Promise<PointsRewardItem> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    // 生成新ID
    const maxId = Math.max(
      ...this.rewardItems.map((item) => parseInt(item.id.replace('PR', ''), 10)),
      0
    )
    const newId = `PR${String(maxId + 1).padStart(3, '0')}`

    const now = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/\//g, '/').replace(/(\d+)\/(\d+)\/(\d+)/, '$1/$2/$3')

    const newItem: PointsRewardItem = {
      id: newId,
      serviceName: data.serviceName || '',
      serviceDescription: data.serviceDescription || '',
      pointsReward: data.pointsReward || 0,
      status: data.status || 'active',
      createdAt: now,
      updatedAt: now,
    }

    this.rewardItems.push(newItem)
    return { ...newItem }
  }

  /**
   * 更新积分奖励服务
   */
  async updateRewardService(id: string, data: Partial<PointsRewardItem>): Promise<PointsRewardItem | null> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const index = this.rewardItems.findIndex((item) => item.id === id)
    if (index === -1) return null

    const now = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/\//g, '/').replace(/(\d+)\/(\d+)\/(\d+)/, '$1/$2/$3')

    this.rewardItems[index] = {
      ...this.rewardItems[index],
      ...data,
      id, // 确保ID不被修改
      updatedAt: now,
    }

    return { ...this.rewardItems[index] }
  }

  /**
   * 删除积分奖励服务
   */
  async deleteRewardService(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const index = this.rewardItems.findIndex((item) => item.id === id)
    if (index === -1) return false

    this.rewardItems.splice(index, 1)
    return true
  }

  /**
   * 切换积分奖励服务状态
   */
  async toggleRewardServiceStatus(id: string): Promise<PointsRewardItem | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const index = this.rewardItems.findIndex((item) => item.id === id)
    if (index === -1) return null

    const newStatus = this.rewardItems[index].status === 'active' ? 'inactive' : 'active'

    const now = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/\//g, '/').replace(/(\d+)\/(\d+)\/(\d+)/, '$1/$2/$3')

    this.rewardItems[index] = {
      ...this.rewardItems[index],
      status: newStatus,
      updatedAt: now,
    }

    return { ...this.rewardItems[index] }
  }

  // ==================== 积分换购服务 ====================

  /**
   * 获取所有积分换购服务
   */
  async getExchangeServices(): Promise<PointsExchangeItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...this.exchangeItems].sort((a, b) => a.序号 - b.序号)
  }

  /**
   * 创建积分换购服务
   */
  async createExchangeService(data: Partial<PointsExchangeItem>): Promise<PointsExchangeItem> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    // 生成新ID
    const maxId = Math.max(
      ...this.exchangeItems.map((item) => parseInt(item.id.replace('PE', ''), 10)),
      0
    )
    const newId = `PE${String(maxId + 1).padStart(3, '0')}`

    // 生成新序号
    const maxOrder = Math.max(...this.exchangeItems.map((item) => item.序号), 0)

    const now = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/\//g, '/').replace(/(\d+)\/(\d+)\/(\d+)/, '$1/$2/$3')

    const newItem: PointsExchangeItem = {
      id: newId,
      序号: data.序号 || maxOrder + 1,
      serviceName: data.serviceName || '',
      serviceDescription: data.serviceDescription || '',
      pointsCost: data.pointsCost || 0,
      status: data.status || 'active',
      createdAt: now,
      updatedAt: now,
    }

    this.exchangeItems.push(newItem)
    return { ...newItem }
  }

  /**
   * 更新积分换购服务
   */
  async updateExchangeService(id: string, data: Partial<PointsExchangeItem>): Promise<PointsExchangeItem | null> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const index = this.exchangeItems.findIndex((item) => item.id === id)
    if (index === -1) return null

    const now = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/\//g, '/').replace(/(\d+)\/(\d+)\/(\d+)/, '$1/$2/$3')

    this.exchangeItems[index] = {
      ...this.exchangeItems[index],
      ...data,
      id, // 确保ID不被修改
      updatedAt: now,
    }

    return { ...this.exchangeItems[index] }
  }

  /**
   * 删除积分换购服务
   */
  async deleteExchangeService(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const index = this.exchangeItems.findIndex((item) => item.id === id)
    if (index === -1) return false

    this.exchangeItems.splice(index, 1)
    return true
  }

  /**
   * 切换积分换购服务状态
   */
  async toggleExchangeServiceStatus(id: string): Promise<PointsExchangeItem | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const index = this.exchangeItems.findIndex((item) => item.id === id)
    if (index === -1) return null

    const newStatus = this.exchangeItems[index].status === 'active' ? 'inactive' : 'active'

    const now = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/\//g, '/').replace(/(\d+)\/(\d+)\/(\d+)/, '$1/$2/$3')

    this.exchangeItems[index] = {
      ...this.exchangeItems[index],
      status: newStatus,
      updatedAt: now,
    }

    return { ...this.exchangeItems[index] }
  }

  /**
   * 重新排序积分换购服务
   */
  async reorderExchangeServices(ids: string[]): Promise<PointsExchangeItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    // 验证所有ID都存在
    const allIdsExist = ids.every((id) => this.exchangeItems.some((item) => item.id === id))
    if (!allIdsExist) {
      throw new Error('部分服务ID不存在')
    }

    // 更新序号
    ids.forEach((id, index) => {
      const item = this.exchangeItems.find((item) => item.id === id)
      if (item) {
        item.序号 = index + 1
      }
    })

    return this.getExchangeServices()
  }
}

export default new ValueAddedServiceService()
