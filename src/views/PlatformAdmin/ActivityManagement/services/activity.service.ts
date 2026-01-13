/**
 * 活动管理 - 服务层
 */

import dayjs from 'dayjs'
import type {
  Activity,
  PaginationParams,
  PaginatedResult
} from '../types/activity.types'
import { mockActivities } from './mocks/activity.mock'

/**
 * 活动管理服务类
 */
class ActivityService {
  private activities: Activity[] = [...mockActivities]

  /**
   * 获取活动列表（带分页）
   * @param {PaginationParams} params - 分页参数
   * @returns {Promise<PaginatedResult<Activity>>} 分页结果
   */
  async getActivities(params?: PaginationParams): Promise<PaginatedResult<Activity>> {
    await new Promise(resolve => setTimeout(resolve, 300))

    // 按创建时间倒序排列
    const sorted = this.activities.sort((a, b) =>
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
    return activity ? { ...activity } : null
  }

  /**
   * 创建活动
   * @param {Partial<Activity>} data - 活动数据
   * @returns {Promise<Activity>} 创建后的活动对象
   */
  async createActivity(data: Partial<Activity>): Promise<Activity> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const newId = `act${1000 + this.activities.length}`

    const newActivity: Activity = {
      id: newId,
      name: data.name!,
      startTime: data.startTime!,
      endTime: data.endTime!,
      status: 'disabled',  // 默认禁用
      participationConditions: data.participationConditions!,
      platformBudget: data.platformBudget!,
      remainingBudget: data.platformBudget!,  // 初始剩余=总预算
      strategies: data.strategies!,
      applicableStores: data.applicableStores!,
      bookingRestrictions: data.bookingRestrictions!,
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      createdBy: '系统管理员'
    }

    this.activities.unshift(newActivity)
    return { ...newActivity }
  }

  /**
   * 更新活动
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

    this.activities[index] = {
      ...activity,
      name: data.name !== undefined ? data.name : activity.name,
      startTime: data.startTime !== undefined ? data.startTime : activity.startTime,
      endTime: data.endTime !== undefined ? data.endTime : activity.endTime,
      participationConditions: data.participationConditions !== undefined ? data.participationConditions : activity.participationConditions,
      platformBudget: data.platformBudget !== undefined ? data.platformBudget : activity.platformBudget,
      strategies: data.strategies !== undefined ? data.strategies : activity.strategies,
      applicableStores: data.applicableStores !== undefined ? data.applicableStores : activity.applicableStores,
      bookingRestrictions: data.bookingRestrictions !== undefined ? data.bookingRestrictions : activity.bookingRestrictions
    }

    return { ...this.activities[index] }
  }

  /**
   * 切换活动启用/禁用状态
   * @param {string} id - 活动ID
   * @returns {Promise<Activity>} 更新后的活动对象
   * @throws {Error} 如果活动不存在
   */
  async toggleActivityStatus(id: string): Promise<Activity> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const index = this.activities.findIndex(a => a.id === id)
    if (index === -1) {
      throw new Error('活动不存在')
    }

    const activity = this.activities[index]
    activity.status = activity.status === 'enabled' ? 'disabled' : 'enabled'

    return { ...activity }
  }
}

// 导出单例
export default new ActivityService()
