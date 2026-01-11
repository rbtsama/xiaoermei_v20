/**
 * 活动管理 - 服务层
 */

import dayjs from 'dayjs'
import type {
  Activity,
  ActivityStatus,
  MerchantActivityCode,
  CouponDistributionDetail,
  ActivityDataStats,
  PaginationParams,
  PaginatedResult
} from '../types/activity.types'
import { mockActivities, mockMerchants, mockActivityDataStats, generateMockQRCode } from './mocks'

/**
 * 活动管理服务类
 */
class ActivityService {
  private activities: Activity[] = [...mockActivities]

  /**
   * 计算活动状态
   * @param {Activity} activity - 活动对象
   * @returns {ActivityStatus} 活动状态
   * @private
   */
  private calculateActivityStatus(activity: Activity): ActivityStatus {
    const now = dayjs()
    const start = dayjs(activity.startTime)
    const end = dayjs(activity.endTime)

    if (now.isBefore(start)) {
      return 'not_started'
    } else if (now.isAfter(end)) {
      return 'ended'
    } else {
      return 'in_progress'
    }
  }

  /**
   * 获取活动列表（带状态计算和分页）
   * @param {PaginationParams} params - 分页参数
   * @returns {Promise<PaginatedResult<Activity>>} 分页结果
   */
  async getActivities(params?: PaginationParams): Promise<PaginatedResult<Activity>> {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 300))

    // 计算每个活动的状态
    const activitiesWithStatus = this.activities.map(activity => ({
      ...activity,
      status: this.calculateActivityStatus(activity)
    }))

    // 按创建时间倒序排列
    const sorted = activitiesWithStatus.sort((a, b) =>
      dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix()
    )

    // 分页处理
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const start = (page - 1) * pageSize
    const end = start + pageSize

    return {
      data: sorted.slice(start, end),
      total: sorted.length,
      page,
      pageSize,
      totalPages: Math.ceil(sorted.length / pageSize)
    }
  }

  /**
   * 根据ID获取活动详情
   * @param {string} id - 活动ID
   * @returns {Promise<Activity | null>} 活动对象或null
   */
  async getActivityById(id: string): Promise<Activity | null> {
    await new Promise(resolve => setTimeout(resolve, 200))

    const activity = this.activities.find(a => a.id === id)
    if (!activity) return null

    return {
      ...activity,
      status: this.calculateActivityStatus(activity)
    }
  }

  /**
   * 创建活动
   * @param {Partial<Activity>} data - 活动数据
   * @returns {Promise<Activity>} 创建后的活动对象
   */
  async createActivity(data: Partial<Activity>): Promise<Activity> {
    await new Promise(resolve => setTimeout(resolve, 400))

    // 生成新ID（递增）
    const newId = `act${1000 + this.activities.length}`

    // 构建新活动对象
    const newActivity: Activity = {
      id: newId,
      name: data.name!,
      startTime: data.startTime!,
      endTime: data.endTime!,
      rules: data.rules!,
      participationConditions: data.participationConditions!,
      couponIds: data.couponIds!,
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      createdBy: 'admin001' // TODO: 从登录用户获取
    }

    // 添加到列表开头
    this.activities.unshift(newActivity)

    return {
      ...newActivity,
      status: this.calculateActivityStatus(newActivity)
    }
  }

  /**
   * 更新活动（所有状态均可编辑）
   * @param {string} id - 活动ID
   * @param {Partial<Activity>} data - 更新数据
   * @returns {Promise<Activity>} 更新后的活动对象
   * @throws {Error} 如果活动不存在
   */
  async updateActivity(id: string, data: Partial<Activity>): Promise<Activity> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const index = this.activities.findIndex(a => a.id === id)
    if (index === -1) {
      throw new Error('活动不存在')
    }

    const activity = this.activities[index]

    // 更新活动数据（保留id、createdAt、createdBy）
    this.activities[index] = {
      ...activity,
      name: data.name !== undefined ? data.name : activity.name,
      startTime: data.startTime !== undefined ? data.startTime : activity.startTime,
      endTime: data.endTime !== undefined ? data.endTime : activity.endTime,
      rules: data.rules !== undefined ? data.rules : activity.rules,
      participationConditions: data.participationConditions !== undefined ? data.participationConditions : activity.participationConditions,
      couponIds: data.couponIds !== undefined ? data.couponIds : activity.couponIds
    }

    return {
      ...this.activities[index],
      status: this.calculateActivityStatus(this.activities[index])
    }
  }

  /**
   * 获取商户活动码列表
   * @param {string} activityId - 活动ID
   * @returns {Promise<MerchantActivityCode[]>} 商户活动码列表
   */
  async getMerchantCodes(activityId: string): Promise<MerchantActivityCode[]> {
    await new Promise(resolve => setTimeout(resolve, 300))

    // 为每个商户生成专属二维码
    return mockMerchants.map(merchant => ({
      merchantId: merchant.id,
      merchantName: merchant.merchantName,
      storeName: merchant.storeName,
      qrCode: generateMockQRCode(activityId, merchant.id),
      activityId
    }))
  }

  /**
   * 获取优惠券发放明细（T-1数据）
   * @param {string} activityId - 活动ID
   * @returns {Promise<CouponDistributionDetail[]>} 优惠券发放明细列表
   */
  async getCouponDistributionDetails(activityId: string): Promise<CouponDistributionDetail[]> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const stats = mockActivityDataStats.find(s => s.activityId === activityId)
    return stats ? stats.details : []
  }

  /**
   * 获取T-1日期（昨日）
   * @returns {string} 昨日日期，格式：YYYY-MM-DD
   */
  getT1Date(): string {
    return dayjs().subtract(1, 'day').format('YYYY-MM-DD')
  }
}

// 导出单例
export default new ActivityService()
