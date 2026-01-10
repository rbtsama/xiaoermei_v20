/**
 * 商户端 - 活动管理 - 服务层
 */

import type { Activity } from '../../../PlatformAdmin/ActivityManagement/types/activity.types'
import { mockMerchantActivities } from './mocks'

/**
 * 商户端活动管理服务类
 */
class MerchantActivityService {
  private activities: Activity[] = [...mockMerchantActivities]

  /**
   * 获取商户端活动列表
   * @returns {Promise<Activity[]>} 活动列表
   */
  async getActivities(): Promise<Activity[]> {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 300))

    // 按创建时间倒序返回
    return [...this.activities].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  /**
   * 切换活动启用/停用状态
   * @param {string} id - 活动ID
   * @returns {Promise<void>}
   */
  async toggleActivityStatus(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const activity = this.activities.find(a => a.id === id)
    if (activity) {
      activity.status = activity.status === 'enabled' ? 'disabled' : 'enabled'
    }
  }

  /**
   * 根据ID获取活动详情
   * @param {string} id - 活动ID
   * @returns {Promise<Activity | null>}
   */
  async getActivityById(id: string): Promise<Activity | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.activities.find(a => a.id === id) || null
  }
}

// 导出单例
export default new MerchantActivityService()
