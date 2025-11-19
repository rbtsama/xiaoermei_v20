/**
 * 积分系统 Mock 数据
 * 模拟真实酒店行业场景：参考美团、携程、华住会、万豪、亚朵
 */

import type {
  PointsRuleConfig,
  UserPointsAccount,
  PointsDetail,
  Hotel,
  Order
} from '../../types/points.types'
import { PointsChangeType } from '../../types/points.types'

// ==================== 积分规则配置 ====================

export const mockPointsRuleConfig: PointsRuleConfig = {
  id: 'RULE_DEFAULT',
  earnRule: {
    earnRatio: 1, // 1元 = 1积分（参考美团）
    minOrderAmount: 50, // 满50元起算
    delayHours: 24, // 订单完成后24小时发放（参考携程）
    excludeCoupon: true, // 优惠券金额不计入
    excludeCommission: true // 平台佣金不计入
  },
  redeemRule: {
    redeemRatio: 100, // 100积分 = 1元（参考京东）
    maxRedeemPercent: 30, // 最多抵扣30%（参考携程）
    minRedeemPoints: 100 // 至少100积分起用
  },
  expiryRule: {
    baseExpiryMonths: 12, // 基础有效期12个月（保证至少1年）
    expiryNodes: [
      { month: 1, day: 1, label: '春节过期' },
      { month: 7, day: 1, label: '年中过期' }
    ],
    calcRule: 'base_plus_node', // 计算规则：基础有效期+最近节点
    reminderDays: 30 // 到期前30天提醒
  },
  updatedAt: '01/10/25 10:00:00',
  updatedBy: '平台管理员'
}

// ==================== 酒店数据 ====================

export const mockHotels: Hotel[] = [
  {
    hotelId: 'HOTEL_001',
    hotelName: '亚朵酒店·上海新天地店',
    roomType: '大床房',
    pricePerNight: 458,
    location: '上海黄浦区',
    category: '中端商务'
  },
  {
    hotelId: 'HOTEL_002',
    hotelName: '全季酒店·北京三里屯店',
    roomType: '商务双床房',
    pricePerNight: 398,
    location: '北京朝阳区',
    category: '中端商务'
  },
  {
    hotelId: 'HOTEL_003',
    hotelName: '汉庭酒店·杭州西湖断桥店',
    roomType: '标准双床房',
    pricePerNight: 238,
    location: '杭州西湖区',
    category: '经济型'
  },
  {
    hotelId: 'HOTEL_004',
    hotelName: '如家酒店·成都春熙路店',
    roomType: '经济大床房',
    pricePerNight: 168,
    location: '成都锦江区',
    category: '经济型'
  },
  {
    hotelId: 'HOTEL_005',
    hotelName: '山野·莫干山云栖民宿',
    roomType: '山景大床房',
    pricePerNight: 680,
    location: '德清莫干山',
    category: '精品民宿'
  },
  {
    hotelId: 'HOTEL_006',
    hotelName: '柏悦酒店·上海浦东店',
    roomType: '豪华江景房',
    pricePerNight: 1280,
    location: '上海浦东新区',
    category: '高端酒店'
  }
]

// ==================== 用户积分账户 ====================

export const mockUserAccounts: UserPointsAccount[] = [
  {
    userId: 'UID_2025001',
    userName: '张经理',
    phone: '13812345678',
    availablePoints: 15680,
    frozenPoints: 500,
    totalEarned: 58900,
    totalSpent: 43220,
    expiringPoints: 200,
    expiringDate: '02/15/25',
    memberLevel: '金卡会员',
    registerDate: '03/15/24',
    lastOrderDate: '01/10/25',
    orderCount: 47
  },
  {
    userId: 'UID_2025128',
    userName: '李女士',
    phone: '18698765432',
    availablePoints: 880,
    frozenPoints: 0,
    totalEarned: 2360,
    totalSpent: 1480,
    expiringPoints: 0,
    registerDate: '09/20/24',
    lastOrderDate: '12/28/24',
    orderCount: 8
  },
  {
    userId: 'UID_2025456',
    userName: '王先生',
    phone: '15234567890',
    availablePoints: 0,
    frozenPoints: 0,
    totalEarned: 0,
    totalSpent: 0,
    expiringPoints: 0,
    registerDate: '01/15/25',
    lastOrderDate: undefined,
    orderCount: 0
  },
  {
    userId: 'UID_2024888',
    userName: '陈总',
    phone: '13987654321',
    availablePoints: 28560,
    frozenPoints: 1200,
    totalEarned: 125800,
    totalSpent: 97240,
    expiringPoints: 500,
    expiringDate: '02/28/25',
    memberLevel: '钻石会员',
    registerDate: '01/08/24',
    lastOrderDate: '01/14/25',
    orderCount: 96
  },
  {
    userId: 'UID_2025200',
    userName: '刘小姐',
    phone: '15876543210',
    availablePoints: 3200,
    frozenPoints: 0,
    totalEarned: 8900,
    totalSpent: 5700,
    expiringPoints: 100,
    expiringDate: '03/10/25',
    memberLevel: '银卡会员',
    registerDate: '06/12/24',
    lastOrderDate: '01/05/25',
    orderCount: 18
  }
]

// ==================== 积分明细（张经理的完整流水） ====================

export const mockPointsDetails: PointsDetail[] = [
  {
    id: 'PT_20250115001',
    userId: 'UID_2025001',
    changeType: PointsChangeType.ORDER_COMPLETE,
    points: 458,
    balance: 15680,
    orderId: 'HT20250115001',
    description: '入住"亚朵酒店·上海新天地店"，消费¥458',
    operator: '系统自动',
    createdAt: '01/15/25 14:32:15'
  },
  {
    id: 'PT_20250114002',
    userId: 'UID_2025001',
    changeType: PointsChangeType.REDEEM,
    points: -500,
    balance: 15222,
    orderId: 'HT20250114056',
    description: '订单使用500积分抵扣¥5',
    operator: '系统自动',
    createdAt: '01/14/25 09:18:42'
  },
  {
    id: 'PT_20250112003',
    userId: 'UID_2025001',
    changeType: PointsChangeType.MANUAL_ADJUST,
    points: 500,
    balance: 15722,
    orderId: undefined,
    description: '客服补偿：房间WiFi故障影响办公',
    operator: '客服-王小美',
    createdAt: '01/12/25 16:45:00'
  },
  {
    id: 'PT_20250110004',
    userId: 'UID_2025001',
    changeType: PointsChangeType.REFUND,
    points: -238,
    balance: 15222,
    orderId: 'HT20250108023',
    description: '订单取消退款，扣回已发放积分',
    operator: '系统自动',
    createdAt: '01/10/25 11:20:33'
  },
  {
    id: 'PT_20250108005',
    userId: 'UID_2025001',
    changeType: PointsChangeType.ORDER_COMPLETE,
    points: 238,
    balance: 15460,
    orderId: 'HT20250108023',
    description: '入住"汉庭酒店·杭州西湖断桥店"，消费¥238',
    operator: '系统自动',
    createdAt: '01/08/25 10:15:00'
  },
  {
    id: 'PT_20250105006',
    userId: 'UID_2025001',
    changeType: PointsChangeType.ORDER_COMPLETE,
    points: 398,
    balance: 15222,
    orderId: 'HT20250105012',
    description: '入住"全季酒店·北京三里屯店"，消费¥398',
    operator: '系统自动',
    createdAt: '01/05/25 16:30:00'
  },
  {
    id: 'PT_20250102007',
    userId: 'UID_2025001',
    changeType: PointsChangeType.REDEEM,
    points: -1000,
    balance: 14824,
    orderId: 'HT20250102008',
    description: '订单使用1000积分抵扣¥10',
    operator: '系统自动',
    createdAt: '01/02/25 14:20:00'
  },
  {
    id: 'PT_20250101008',
    userId: 'UID_2025001',
    changeType: PointsChangeType.RETURN,
    points: 500,
    balance: 15824,
    orderId: 'HT20241228050',
    description: '订单取消，积分退回账户',
    operator: '系统自动',
    createdAt: '01/01/25 10:00:00'
  },
  {
    id: 'PT_20241228009',
    userId: 'UID_2025001',
    changeType: PointsChangeType.REDEEM,
    points: -500,
    balance: 15324,
    orderId: 'HT20241228050',
    description: '订单使用500积分抵扣¥5',
    operator: '系统自动',
    createdAt: '12/28/24 09:30:00'
  },
  {
    id: 'PT_20241215010',
    userId: 'UID_2025001',
    changeType: PointsChangeType.EXPIRE,
    points: -200,
    balance: 15824,
    orderId: undefined,
    description: '2023年12月获得的积分已过期',
    operator: '系统自动',
    createdAt: '12/15/24 00:00:01'
  },
  {
    id: 'PT_20241210011',
    userId: 'UID_2025001',
    changeType: PointsChangeType.ORDER_COMPLETE,
    points: 680,
    balance: 16024,
    orderId: 'HT20241210033',
    description: '入住"山野·莫干山云栖民宿"，消费¥680',
    operator: '系统自动',
    createdAt: '12/10/24 11:45:00'
  },
  {
    id: 'PT_20241205012',
    userId: 'UID_2025001',
    changeType: PointsChangeType.ORDER_COMPLETE,
    points: 1280,
    balance: 15344,
    orderId: 'HT20241205018',
    description: '入住"柏悦酒店·上海浦东店"，消费¥1280',
    operator: '系统自动',
    createdAt: '12/05/24 15:20:00'
  },
  {
    id: 'PT_20241125013',
    userId: 'UID_2025001',
    changeType: PointsChangeType.MANUAL_ADJUST,
    points: 1000,
    balance: 14064,
    orderId: undefined,
    description: '运营活动：双11消费达标奖励',
    operator: '运营-李主管',
    createdAt: '11/25/24 10:00:00'
  },
  {
    id: 'PT_20241120014',
    userId: 'UID_2025001',
    changeType: PointsChangeType.ORDER_COMPLETE,
    points: 458,
    balance: 13064,
    orderId: 'HT20241120025',
    description: '入住"亚朵酒店·上海新天地店"，消费¥458',
    operator: '系统自动',
    createdAt: '11/20/24 13:15:00'
  },
  {
    id: 'PT_20241115015',
    userId: 'UID_2025001',
    changeType: PointsChangeType.REDEEM,
    points: -2000,
    balance: 12606,
    orderId: 'HT20241115040',
    description: '订单使用2000积分抵扣¥20',
    operator: '系统自动',
    createdAt: '11/15/24 08:30:00'
  }
]

// ==================== 订单数据 ====================

export const mockOrders: Order[] = [
  {
    orderId: 'HT20250115001',
    userId: 'UID_2025001',
    hotelId: 'HOTEL_001',
    hotelName: '亚朵酒店·上海新天地店',
    roomType: '大床房',
    checkInDate: '01/13/25',
    checkOutDate: '01/14/25',
    nights: 1,
    totalAmount: 458,
    pointsUsed: 0,
    pointsDiscount: 0,
    actualAmount: 458,
    status: 'completed',
    createdAt: '01/12/25 14:30:00'
  },
  {
    orderId: 'HT20250114056',
    userId: 'UID_2025001',
    hotelId: 'HOTEL_002',
    hotelName: '全季酒店·北京三里屯店',
    roomType: '商务双床房',
    checkInDate: '01/12/25',
    checkOutDate: '01/14/25',
    nights: 2,
    totalAmount: 796,
    pointsUsed: 500,
    pointsDiscount: 5,
    actualAmount: 791,
    status: 'completed',
    createdAt: '01/11/25 09:00:00'
  },
  {
    orderId: 'HT20250108023',
    userId: 'UID_2025001',
    hotelId: 'HOTEL_003',
    hotelName: '汉庭酒店·杭州西湖断桥店',
    roomType: '标准双床房',
    checkInDate: '01/06/25',
    checkOutDate: '01/07/25',
    nights: 1,
    totalAmount: 238,
    pointsUsed: 0,
    pointsDiscount: 0,
    actualAmount: 238,
    status: 'refunded',
    createdAt: '01/05/25 16:20:00'
  }
]
