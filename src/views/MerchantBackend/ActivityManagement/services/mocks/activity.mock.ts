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
    rules: '活动期间，通过专属二维码预订享受新年特惠优惠券。所有会员均可参与，每位会员限领1次，优惠券有效期30天。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2', 'VIP3'],
    couponIds: ['cp1000', 'cp1011'], // 新用户满300减50 + 立减20新人券
    status: 'enabled', // 商户端需要状态字段（enabled/disabled）
    createdAt: '2025-11-25 10:00:00',
    createdBy: '王强'
  },
  {
    id: 'act1007',
    name: '冬季暖心优惠',
    startTime: '2025-12-20 00:00:00',
    endTime: '2026-01-15 23:59:59',
    rules: '活动期间，通过专属二维码预订享受冬季特惠优惠券。所有会员均可参与，每位会员限领1次，优惠券有效期14天。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2'],
    couponIds: ['cp1007', 'cp1010'], // 立减50 + 满600减100
    status: 'enabled',
    createdAt: '2025-11-15 09:30:00',
    createdBy: '张明'
  },
  {
    id: 'act1009',
    name: '周年庆预热活动',
    startTime: '2026-01-08 00:00:00',
    endTime: '2026-01-25 23:59:59',
    rules: '活动期间，通过专属二维码预订享受周年庆特惠优惠券。所有会员均可参与，每位会员限领1次，优惠券有效期30天。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2', 'VIP3'],
    couponIds: ['cp1014'], // 周年庆6折券
    status: 'disabled',
    createdAt: '2025-11-30 10:15:00',
    createdBy: '李娜'
  }
]
