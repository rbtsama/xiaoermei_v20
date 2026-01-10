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
    rules: '活动期间，凡通过专属二维码预订的订单，均可享受专属优惠券。每个会员限领1次，优惠券有效期30天。春节期间入住享受额外优惠，先到先得。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2', 'VIP3'],
    couponIds: ['cp1005', 'cp1013'], // 春节特惠满1000减200 + 满1500减300大额券
    createdAt: '2026-01-10 10:00:00',
    createdBy: 'admin001'
  },
  {
    id: 'act1001',
    name: '寒假亲子套餐活动',
    startTime: '2026-01-20 00:00:00',
    endTime: '2026-02-15 23:59:59',
    rules: '针对家庭出游用户，扫描专属二维码后可领取亲子套餐优惠券组合。限VIP1及以上会员参与。优惠券可叠加使用，畅享家庭欢乐时光。',
    participationConditions: ['VIP1', 'VIP2', 'VIP3'],
    couponIds: ['cp1012', 'cp1010'], // 寒假特惠9折券 + 满600减100
    createdAt: '2026-01-08 14:30:00',
    createdBy: 'admin002'
  },
  {
    id: 'act1002',
    name: '情人节浪漫套餐',
    startTime: '2026-02-10 00:00:00',
    endTime: '2026-02-20 23:59:59',
    rules: '情人节特别企划，情侣专属优惠。通过专属二维码预订情侣房型，享受浪漫优惠。所有会员均可参与，优惠券有效期7天。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2', 'VIP3'],
    couponIds: ['cp1003'], // 情人节特惠满500减80
    createdAt: '2026-01-25 13:45:00',
    createdBy: 'admin001'
  },
  {
    id: 'act1003',
    name: 'VIP尊享月',
    startTime: '2026-01-25 00:00:00',
    endTime: '2026-02-25 23:59:59',
    rules: 'VIP高级会员专享活动，限VIP2及以上会员。扫码领取高额折扣券，尊享尊贵体验。每位会员限领一次，优惠券有效期60天。',
    participationConditions: ['VIP2', 'VIP3'],
    couponIds: ['cp1006', 'cp1013', 'cp1004'], // 生日专享7折券 + 满1500减300 + 会员专享9折券
    createdAt: '2026-01-12 11:00:00',
    createdBy: 'admin002'
  },
  {
    id: 'act1004',
    name: '三月踏青季',
    startTime: '2026-03-01 00:00:00',
    endTime: '2026-03-31 23:59:59',
    rules: '春暖花开，踏青出游。活动期间通过专属二维码预订，享受春季特惠。所有会员等级均可参与，多重优惠券组合使用。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2', 'VIP3'],
    couponIds: ['cp1001', 'cp1009', 'cp1010'], // 周末特惠8折券 + 会员日85折券 + 满600减100
    createdAt: '2026-02-15 09:30:00',
    createdBy: 'admin003'
  },

  // ==================== 进行中的活动（5个）====================
  {
    id: 'act1005',
    name: '新年开门红',
    startTime: '2026-01-01 00:00:00',
    endTime: '2026-01-20 23:59:59',
    rules: '新年首月特惠，所有会员扫码即享新年礼包。优惠券组合丰富，满足不同消费需求。限时抢购，数量有限。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2', 'VIP3'],
    couponIds: ['cp1000', 'cp1002', 'cp1011'], // 新用户满300减50 + 立减30 + 立减20新人券
    createdAt: '2025-12-15 10:00:00',
    createdBy: 'admin003'
  },
  {
    id: 'act1006',
    name: '会员日专属福利',
    startTime: '2026-01-05 00:00:00',
    endTime: '2026-01-18 23:59:59',
    rules: '每月18号会员日活动，VIP1及以上会员专享。多张优惠券可叠加使用，享受最大优惠。扫码即领，限量发放。',
    participationConditions: ['VIP1', 'VIP2', 'VIP3'],
    couponIds: ['cp1009', 'cp1004'], // 会员日85折券 + 会员专享9折券
    createdAt: '2025-12-28 14:20:00',
    createdBy: 'admin002'
  },
  {
    id: 'act1007',
    name: '冬季暖心优惠',
    startTime: '2025-12-20 00:00:00',
    endTime: '2026-01-15 23:59:59',
    rules: '冬季特惠，暖心价格。所有等级会员均可参与，扫码领券立减。优惠券有效期14天，全场民宿通用。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2'],
    couponIds: ['cp1007', 'cp1010'], // 立减50 + 满600减100
    createdAt: '2025-12-10 09:30:00',
    createdBy: 'admin001'
  },
  {
    id: 'act1008',
    name: '生日月特惠',
    startTime: '2026-01-01 00:00:00',
    endTime: '2026-01-31 23:59:59',
    rules: '生日当月会员专享，凭生日信息验证后领取生日专属优惠券。需上传身份证验证，审核通过后发放。限VIP1及以上会员。',
    participationConditions: ['VIP1', 'VIP2', 'VIP3'],
    couponIds: ['cp1006'], // 生日专享7折券
    createdAt: '2025-12-18 16:00:00',
    createdBy: 'admin003'
  },
  {
    id: 'act1009',
    name: '周年庆预热',
    startTime: '2026-01-08 00:00:00',
    endTime: '2026-01-25 23:59:59',
    rules: '平台周年庆预热活动，提前领券享优惠。限时抢购，先到先得。所有会员等级均可参与，优惠券数量有限。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2', 'VIP3'],
    couponIds: ['cp1014'], // 周年庆6折券
    createdAt: '2026-01-02 10:15:00',
    createdBy: 'admin002'
  },

  // ==================== 已结束的活动（5个）====================
  {
    id: 'act1010',
    name: '圣诞狂欢节',
    startTime: '2025-12-20 00:00:00',
    endTime: '2025-12-26 23:59:59',
    rules: '圣诞特惠，扫码领券享折扣。所有会员均可参与，优惠券有效期7天。活动期间预订享受双倍优惠，错过等一年。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2', 'VIP3'],
    couponIds: ['cp1001', 'cp1002'], // 周末特惠8折券 + 立减30元
    createdAt: '2025-12-10 11:00:00',
    createdBy: 'admin001'
  },
  {
    id: 'act1011',
    name: '双12购物节',
    startTime: '2025-12-10 00:00:00',
    endTime: '2025-12-15 23:59:59',
    rules: '双12特惠，全场满减。通过专属二维码预订，享受双倍优惠。新老会员均享优惠，先到先得，售完即止。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2'],
    couponIds: ['cp1010', 'cp1000'], // 满600减100 + 新用户满300减50
    createdAt: '2025-12-01 09:00:00',
    createdBy: 'admin002'
  },
  {
    id: 'act1012',
    name: '感恩节回馈',
    startTime: '2025-11-25 00:00:00',
    endTime: '2025-11-30 23:59:59',
    rules: '感恩回馈老会员，扫码领取感恩优惠券。限VIP2及以上老会员参与，优惠力度空前，感恩有你一路相伴。',
    participationConditions: ['VIP2', 'VIP3'],
    couponIds: ['cp1004', 'cp1009'], // 会员专享9折券 + 会员日85折券
    createdAt: '2025-11-15 14:30:00',
    createdBy: 'admin003'
  },
  {
    id: 'act1013',
    name: '黑五限时抢购',
    startTime: '2025-11-28 00:00:00',
    endTime: '2025-11-29 23:59:59',
    rules: '黑五24小时限时抢购，优惠券数量有限，先到先得。所有会员等级均可参与，每人限领一次，仅限当天使用。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2', 'VIP3'],
    couponIds: ['cp1007', 'cp1011'], // 立减50 + 立减20新人券
    createdAt: '2025-11-20 10:00:00',
    createdBy: 'admin001'
  },
  {
    id: 'act1014',
    name: '元旦跨年促销',
    startTime: '2025-12-28 00:00:00',
    endTime: '2026-01-05 23:59:59',
    rules: '元旦跨年特惠活动，通过商户专属二维码预订，立享优惠券福利。新老会员均可参与，优惠券有效期7天。',
    participationConditions: ['VIP0', 'VIP1', 'VIP2'],
    couponIds: ['cp1008', 'cp1002'], // 元旦特惠满800减120 + 立减30元
    createdAt: '2025-12-20 09:15:00',
    createdBy: 'admin001'
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
