/**
 * 活动管理 - Mock数据
 */

import type { Activity, MerchantActivityCode, ActivityDataStats } from '../../types/activity.types'

/**
 * Mock活动列表（15条数据）
 * 状态分布：5个未开始 / 5个进行中 / 5个已结束
 */
export const mockActivities: Activity[] = [
  // ==================== 未开始的活动（5个）====================
  {
    id: 'act1000',
    name: '春节新春大促',
    startTime: '2026-02-01 00:00:00',
    endTime: '2026-02-28 23:59:59',
    rules: '活动期间，通过专属二维码预订享受春节特惠优惠券。每位会员限领1次，优惠券有效期30天。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2', 'VIP3'],
    couponIds: ['cp1005', 'cp1013'], // 春节特惠满1000减200 + 满1500减300大额券
    createdAt: '2025-12-28 10:00:00',
    createdBy: '张明'
  },
  {
    id: 'act1001',
    name: '情人节浪漫套餐',
    startTime: '2026-02-10 00:00:00',
    endTime: '2026-02-20 23:59:59',
    rules: '活动期间，通过专属二维码预订享受情人节特惠优惠券。每位会员限领1次，优惠券有效期7天。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2', 'VIP3'],
    couponIds: ['cp1003'], // 情人节特惠满500减80
    createdAt: '2025-12-25 13:45:00',
    createdBy: '李娜'
  },
  {
    id: 'act1002',
    name: 'VIP会员专享月',
    startTime: '2026-01-25 00:00:00',
    endTime: '2026-02-25 23:59:59',
    rules: '活动期间，通过专属二维码预订享受VIP专属优惠券。限VIP2及以上会员参与，每位会员限领1次，优惠券有效期60天。',
    participationConditions: ['VIP2', 'VIP3'],
    couponIds: ['cp1006', 'cp1004'], // 生日专享7折券 + 会员专享9折券
    createdAt: '2025-12-20 11:00:00',
    createdBy: '王强'
  },
  {
    id: 'act1003',
    name: '寒假亲子游活动',
    startTime: '2026-01-20 00:00:00',
    endTime: '2026-02-15 23:59:59',
    rules: '活动期间，通过专属二维码预订享受寒假特惠优惠券。所有会员均可参与，每位会员限领1次，优惠券有效期30天。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2', 'VIP3'],
    couponIds: ['cp1012', 'cp1010'], // 寒假特惠9折券 + 满600减100
    createdAt: '2025-12-15 14:30:00',
    createdBy: '张明'
  },
  {
    id: 'act1004',
    name: '三月踏青季',
    startTime: '2026-03-01 00:00:00',
    endTime: '2026-03-31 23:59:59',
    rules: '活动期间，通过专属二维码预订享受春季踏青优惠券。所有会员均可参与，每位会员限领1次，优惠券有效期30天。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2', 'VIP3'],
    couponIds: ['cp1001', 'cp1010'], // 周末特惠8折券 + 满600减100
    createdAt: '2025-12-18 09:30:00',
    createdBy: '李娜'
  },

  // ==================== 进行中的活动（5个）====================
  {
    id: 'act1005',
    name: '新年开门红',
    startTime: '2026-01-01 00:00:00',
    endTime: '2026-01-20 23:59:59',
    rules: '活动期间，通过专属二维码预订享受新年特惠优惠券。所有会员均可参与，每位会员限领1次，优惠券有效期30天。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2', 'VIP3'],
    couponIds: ['cp1000', 'cp1011'], // 新用户满300减50 + 立减20新人券
    createdAt: '2025-11-25 10:00:00',
    createdBy: '王强'
  },
  {
    id: 'act1006',
    name: '会员日专属福利',
    startTime: '2026-01-05 00:00:00',
    endTime: '2026-01-18 23:59:59',
    rules: '活动期间，通过专属二维码预订享受会员日特惠优惠券。限VIP1及以上会员参与，每位会员限领1次，优惠券有效期30天。',
    participationConditions: ['VIP1', 'VIP2', 'VIP3'],
    couponIds: ['cp1009', 'cp1004'], // 会员日85折券 + 会员专享9折券
    createdAt: '2025-11-28 14:20:00',
    createdBy: '李娜'
  },
  {
    id: 'act1007',
    name: '冬季暖心优惠',
    startTime: '2025-12-20 00:00:00',
    endTime: '2026-01-15 23:59:59',
    rules: '活动期间，通过专属二维码预订享受冬季特惠优惠券。所有会员均可参与，每位会员限领1次，优惠券有效期14天。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2'],
    couponIds: ['cp1007', 'cp1010'], // 立减50 + 满600减100
    createdAt: '2025-11-15 09:30:00',
    createdBy: '张明'
  },
  {
    id: 'act1008',
    name: '生日月特惠',
    startTime: '2026-01-01 00:00:00',
    endTime: '2026-01-31 23:59:59',
    rules: '活动期间，通过专属二维码预订享受生日特惠优惠券。限VIP1及以上会员参与，每位会员限领1次，优惠券有效期30天。',
    participationConditions: ['VIP1', 'VIP2', 'VIP3'],
    couponIds: ['cp1006'], // 生日专享7折券
    createdAt: '2025-11-22 16:00:00',
    createdBy: '王强'
  },
  {
    id: 'act1009',
    name: '周年庆预热活动',
    startTime: '2026-01-08 00:00:00',
    endTime: '2026-01-25 23:59:59',
    rules: '活动期间，通过专属二维码预订享受周年庆特惠优惠券。所有会员均可参与，每位会员限领1次，优惠券有效期30天。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2', 'VIP3'],
    couponIds: ['cp1014'], // 周年庆6折券
    createdAt: '2025-11-30 10:15:00',
    createdBy: '李娜'
  },

  // ==================== 已结束的活动（5个）====================
  {
    id: 'act1010',
    name: '圣诞狂欢节',
    startTime: '2025-12-20 00:00:00',
    endTime: '2025-12-26 23:59:59',
    rules: '活动期间，通过专属二维码预订享受圣诞特惠优惠券。所有会员均可参与，每位会员限领1次，优惠券有效期7天。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2', 'VIP3'],
    couponIds: ['cp1001', 'cp1002'], // 周末特惠8折券 + 立减30元
    createdAt: '2025-11-10 11:00:00',
    createdBy: '张明'
  },
  {
    id: 'act1011',
    name: '双12购物节',
    startTime: '2025-12-10 00:00:00',
    endTime: '2025-12-15 23:59:59',
    rules: '活动期间，通过专属二维码预订享受双12特惠优惠券。所有会员均可参与，每位会员限领1次，优惠券有效期7天。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2'],
    couponIds: ['cp1010', 'cp1000'], // 满600减100 + 新用户满300减50
    createdAt: '2025-11-05 09:00:00',
    createdBy: '李娜'
  },
  {
    id: 'act1012',
    name: '感恩节回馈活动',
    startTime: '2025-11-25 00:00:00',
    endTime: '2025-11-30 23:59:59',
    rules: '活动期间，通过专属二维码预订享受感恩特惠优惠券。限VIP2及以上会员参与，每位会员限领1次，优惠券有效期7天。',
    participationConditions: ['VIP2', 'VIP3'],
    couponIds: ['cp1004', 'cp1009'], // 会员专享9折券 + 会员日85折券
    createdAt: '2025-10-28 14:30:00',
    createdBy: '王强'
  },
  {
    id: 'act1013',
    name: '黑五限时抢购',
    startTime: '2025-11-28 00:00:00',
    endTime: '2025-11-29 23:59:59',
    rules: '活动期间，通过专属二维码预订享受黑五特惠优惠券。所有会员均可参与，每位会员限领1次，优惠券有效期3天。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2', 'VIP3'],
    couponIds: ['cp1007', 'cp1011'], // 立减50 + 立减20新人券
    createdAt: '2025-10-25 10:00:00',
    createdBy: '李娜'
  },
  {
    id: 'act1014',
    name: '元旦跨年促销',
    startTime: '2025-12-28 00:00:00',
    endTime: '2026-01-05 23:59:59',
    rules: '活动期间，通过专属二维码预订享受元旦特惠优惠券。所有会员均可参与，每位会员限领1次，优惠券有效期7天。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2'],
    couponIds: ['cp1008', 'cp1002'], // 元旦特惠满800减120 + 立减30元
    createdAt: '2025-11-18 09:15:00',
    createdBy: '张明'
  }
]

/**
 * Mock商户列表（8个商户）
 */
export const mockMerchants = [
  { id: 'merchant-001', merchantName: '商户001', storeName: '原乡芦茨' },
  { id: 'merchant-002', merchantName: '商户002', storeName: '云栖山居' },
  { id: 'merchant-003', merchantName: '商户003', storeName: '溪山行旅' },
  { id: 'merchant-004', merchantName: '商户004', storeName: '桐庐山庄' },
  { id: 'merchant-005', merchantName: '商户005', storeName: '富春江畔' },
  { id: 'merchant-006', merchantName: '商户006', storeName: '山水间客栈' },
  { id: 'merchant-007', merchantName: '商户007', storeName: '竹林小筑' },
  { id: 'merchant-008', merchantName: '商户008', storeName: '梅岭驿站' }
]

/**
 * Mock优惠券发放明细（T-1数据）
 * 仅为进行中和已结束的活动提供数据
 */
export const mockActivityDataStats: ActivityDataStats[] = [
  {
    activityId: 'act1005',
    date: '2026-01-10', // T-1
    details: [
      { couponId: 'cp1000', couponName: '新用户专享满300减50', distributionCount: 28, date: '2026-01-10' },
      { couponId: 'cp1002', couponName: '立减30元优惠券', distributionCount: 45, date: '2026-01-10' },
      { couponId: 'cp1011', couponName: '立减20元新人券', distributionCount: 38, date: '2026-01-10' }
    ]
  },
  {
    activityId: 'act1006',
    date: '2026-01-10',
    details: [
      { couponId: 'cp1009', couponName: '会员日85折券', distributionCount: 22, date: '2026-01-10' },
      { couponId: 'cp1004', couponName: '会员专享9折券', distributionCount: 19, date: '2026-01-10' }
    ]
  },
  {
    activityId: 'act1007',
    date: '2026-01-10',
    details: [
      { couponId: 'cp1007', couponName: '立减50元优惠券', distributionCount: 35, date: '2026-01-10' },
      { couponId: 'cp1010', couponName: '满600减100优惠券', distributionCount: 27, date: '2026-01-10' }
    ]
  },
  {
    activityId: 'act1008',
    date: '2026-01-10',
    details: [
      { couponId: 'cp1006', couponName: '生日专享7折券', distributionCount: 15, date: '2026-01-10' }
    ]
  },
  {
    activityId: 'act1009',
    date: '2026-01-10',
    details: [
      { couponId: 'cp1014', couponName: '周年庆6折券', distributionCount: 42, date: '2026-01-10' }
    ]
  },
  {
    activityId: 'act1010',
    date: '2025-12-26', // 活动结束当天
    details: [
      { couponId: 'cp1001', couponName: '周末特惠8折券', distributionCount: 56, date: '2025-12-26' },
      { couponId: 'cp1002', couponName: '立减30元优惠券', distributionCount: 63, date: '2025-12-26' }
    ]
  },
  {
    activityId: 'act1011',
    date: '2025-12-15',
    details: [
      { couponId: 'cp1010', couponName: '满600减100优惠券', distributionCount: 48, date: '2025-12-15' },
      { couponId: 'cp1000', couponName: '新用户专享满300减50', distributionCount: 32, date: '2025-12-15' }
    ]
  },
  {
    activityId: 'act1012',
    date: '2025-11-30',
    details: [
      { couponId: 'cp1004', couponName: '会员专享9折券', distributionCount: 25, date: '2025-11-30' },
      { couponId: 'cp1009', couponName: '会员日85折券', distributionCount: 18, date: '2025-11-30' }
    ]
  },
  {
    activityId: 'act1013',
    date: '2025-11-29',
    details: [
      { couponId: 'cp1007', couponName: '立减50元优惠券', distributionCount: 78, date: '2025-11-29' },
      { couponId: 'cp1011', couponName: '立减20元新人券', distributionCount: 95, date: '2025-11-29' }
    ]
  },
  {
    activityId: 'act1014',
    date: '2026-01-05',
    details: [
      { couponId: 'cp1008', couponName: '元旦特惠满800减120', distributionCount: 41, date: '2026-01-05' },
      { couponId: 'cp1002', couponName: '立减30元优惠券', distributionCount: 52, date: '2026-01-05' }
    ]
  }
]

/**
 * 生成商户活动码（模拟二维码）
 * @param activityId - 活动ID
 * @param merchantId - 商户ID
 * @returns base64格式的二维码图片
 */
export const generateMockQRCode = (activityId: string, merchantId: string): string => {
  // 实际应调用二维码生成库或API
  // 这里返回一个1x1像素的占位图片base64
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
}
