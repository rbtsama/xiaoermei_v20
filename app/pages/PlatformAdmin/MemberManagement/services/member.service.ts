/**
 * 平台后台 - 会员管理服务
 */

import type {
  MemberLevelUpgradeRule,
  MemberLevelDiscountRule,
  UserMemberInfo,
  UserNightRecord,
  MemberLevelAdjustRecord,
} from '../types/member.types'
import {
  mockMemberLevelUpgradeRules,
  mockMemberLevelDiscountRules,
  mockUserMemberInfos,
  mockUserNightRecords,
  mockMemberLevelAdjustRecords,
} from './mocks'

class MemberManagementService {
  private upgradeRules = [...mockMemberLevelUpgradeRules]
  private discountRules = [...mockMemberLevelDiscountRules]
  private userInfos = [...mockUserMemberInfos]
  private nightRecords = [...mockUserNightRecords]
  private adjustRecords = [...mockMemberLevelAdjustRecords]

  /**
   * 获取所有升级规则
   */
  async getUpgradeRules(): Promise<MemberLevelUpgradeRule[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...this.upgradeRules]
  }

  /**
   * 更新升级规则
   */
  async updateUpgradeRule(
    level: number,
    data: Partial<MemberLevelUpgradeRule>
  ): Promise<MemberLevelUpgradeRule> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const index = this.upgradeRules.findIndex((r) => r.level === level)
    if (index !== -1) {
      this.upgradeRules[index] = {
        ...this.upgradeRules[index],
        ...data,
        updatedAt: new Date().toLocaleString('zh-CN'),
      }
      return { ...this.upgradeRules[index] }
    }
    throw new Error('等级不存在')
  }

  /**
   * 获取所有折扣规则
   */
  async getDiscountRules(): Promise<MemberLevelDiscountRule[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...this.discountRules]
  }

  /**
   * 更新折扣规则
   */
  async updateDiscountRule(
    level: number,
    data: Partial<MemberLevelDiscountRule>
  ): Promise<MemberLevelDiscountRule> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const index = this.discountRules.findIndex((r) => r.level === level)
    if (index !== -1) {
      this.discountRules[index] = {
        ...this.discountRules[index],
        ...data,
        updatedAt: new Date().toLocaleString('zh-CN'),
      }
      return { ...this.discountRules[index] }
    }
    throw new Error('等级不存在')
  }

  /**
   * 获取用户会员信息列表
   */
  async getUserInfos(params?: {
    phone?: string
    level?: number
    page?: number
    pageSize?: number
  }): Promise<{ list: UserMemberInfo[]; total: number }> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    let filtered = [...this.userInfos]

    if (params?.phone) {
      filtered = filtered.filter((u) => u.phone.includes(params.phone!))
    }
    if (params?.level !== undefined) {
      filtered = filtered.filter((u) => u.currentLevel === params.level)
    }

    return {
      list: filtered,
      total: filtered.length,
    }
  }

  /**
   * 获取用户详细信息
   */
  async getUserDetail(userId: string): Promise<{
    userInfo: UserMemberInfo | null
    nightRecords: UserNightRecord[]
    adjustRecords: MemberLevelAdjustRecord[]
  }> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const userInfo = this.userInfos.find((u) => u.userId === userId) || null
    const nightRecords = this.nightRecords.filter((r) => r.orderId.includes(userId))
    const adjustRecords = this.adjustRecords.filter((r) => r.userId === userId)

    return {
      userInfo,
      nightRecords,
      adjustRecords,
    }
  }

  /**
   * 手动调整用户会员等级
   */
  async adjustUserLevel(
    userId: string,
    toLevel: number,
    validityDays: number,
    reason: string,
    operator: string
  ): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const user = this.userInfos.find((u) => u.userId === userId)
    if (!user) throw new Error('用户不存在')

    const fromLevel = user.currentLevel
    user.currentLevel = toLevel
    user.currentLevelName = `VIP${toLevel}`
    const validityDate = new Date()
    validityDate.setDate(validityDate.getDate() + validityDays)
    user.validityDate = validityDate.toISOString().split('T')[0]
    user.maintainNights = 0

    const newRecord: MemberLevelAdjustRecord = {
      id: `adjust-${Date.now()}`,
      userId,
      userName: user.userName,
      fromLevel,
      toLevel,
      adjustType: 'manual',
      adjustTypeName: '手动调整',
      reason,
      operator,
      createdAt: new Date().toLocaleString('zh-CN'),
    }
    this.adjustRecords.unshift(newRecord)
  }
}

export default new MemberManagementService()
