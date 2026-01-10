/**
 * 商户端 - 活动管理 - Mock数据
 */

import type { Activity } from '../../../../PlatformAdmin/ActivityManagement/types/activity.types'

/**
 * 商户端活动列表（3条示例数据）
 * 商户看到的是平台创建的活动列表
 */
export const mockMerchantActivities: Activity[] = [
  {
    id: 'act1005',
    name: '新年开门红',
    startTime: '2026-01-01 00:00:00',
    endTime: '2026-01-20 23:59:59',
    rules: '新年首月特惠，所有会员扫码即享新年礼包。优惠券组合丰富，满足不同消费需求。限时抢购，数量有限。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2', 'VIP3'],
    couponIds: ['cp1000', 'cp1002', 'cp1011'], // 新用户满300减50 + 立减30 + 立减20新人券
    status: 'enabled', // 商户端需要状态字段（enabled/disabled）
    createdAt: '2025-12-15 10:00:00',
    createdBy: 'admin003'
  },
  {
    id: 'act1007',
    name: '冬季暖心优惠',
    startTime: '2025-12-20 00:00:00',
    endTime: '2026-01-15 23:59:59',
    rules: '冬季特惠，暖心价格。所有等级会员均可参与，扫码领券立减。优惠券有效期14天，全场民宿通用。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2'],
    couponIds: ['cp1007', 'cp1010'], // 立减50 + 满600减100
    status: 'enabled',
    createdAt: '2025-12-10 09:30:00',
    createdBy: 'admin001'
  },
  {
    id: 'act1009',
    name: '周年庆预热',
    startTime: '2026-01-08 00:00:00',
    endTime: '2026-01-25 23:59:59',
    rules: '平台周年庆预热活动，提前领券享优惠。限时抢购，先到先得。所有会员等级均可参与，优惠券数量有限。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2', 'VIP3'],
    couponIds: ['cp1014'], // 周年庆6折券
    status: 'disabled',
    createdAt: '2026-01-02 10:15:00',
    createdBy: 'admin002'
  }
]
