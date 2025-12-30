/**
 * 会员服务相关 Mock 数据
 */

import type {
  PointsServiceItem,
  PointsServiceConfig,
  InviteRecord,
  CommissionRecord,
} from '@/types/memberService'
import { PointsServiceType, AccountStatus } from '@/types/memberService'

/**
 * 环保奖励服务 Mock
 */
export const mockEcoRewards: PointsServiceItem[] = [
  {
    id: 'eco-1',
    type: PointsServiceType.ECO_REWARD,
    typeName: '环保奖励',
    serviceName: '自带拖鞋',
    pointsAmount: -5, // 负数表示奖励
    description: '支持环保，自带拖鞋可获得积分奖励',
    enabled: true,
    createdAt: '2025-10-01 10:00:00',
    updatedAt: '2025-11-01 14:30:00',
  },
  {
    id: 'eco-2',
    type: PointsServiceType.ECO_REWARD,
    typeName: '环保奖励',
    serviceName: '自带牙刷',
    pointsAmount: -3,
    description: '环保从小事做起，自带牙刷获得积分',
    enabled: true,
    createdAt: '2025-10-01 10:00:00',
    updatedAt: '2025-11-01 14:30:00',
  },
  {
    id: 'eco-3',
    type: PointsServiceType.ECO_REWARD,
    typeName: '环保奖励',
    serviceName: '自带毛巾',
    pointsAmount: -5,
    description: '自带毛巾，共建绿色酒店',
    enabled: false,
    createdAt: '2025-10-01 10:00:00',
    updatedAt: '2025-10-15 09:20:00',
  },
]

/**
 * 增值服务 Mock
 */
export const mockValueAddedServices: PointsServiceItem[] = [
  {
    id: 'service-1',
    type: PointsServiceType.VALUE_ADDED,
    typeName: '增值服务',
    serviceName: '单人早餐',
    pointsAmount: 20,
    description: '含单人自助早餐，早餐时间7:00-10:00',
    enabled: true,
    createdAt: '2025-10-01 10:00:00',
    updatedAt: '2025-11-01 14:30:00',
  },
  {
    id: 'service-2',
    type: PointsServiceType.VALUE_ADDED,
    typeName: '增值服务',
    serviceName: '双人早餐',
    pointsAmount: 35,
    description: '含双人自助早餐，早餐时间7:00-10:00',
    enabled: true,
    createdAt: '2025-10-01 10:00:00',
    updatedAt: '2025-11-01 14:30:00',
  },
  {
    id: 'service-3',
    type: PointsServiceType.VALUE_ADDED,
    typeName: '增值服务',
    serviceName: '延迟退房（2小时）',
    pointsAmount: 15,
    description: '最晚可延迟至14:00退房',
    enabled: true,
    createdAt: '2025-10-01 10:00:00',
    updatedAt: '2025-11-01 14:30:00',
  },
  {
    id: 'service-4',
    type: PointsServiceType.VALUE_ADDED,
    typeName: '增值服务',
    serviceName: '洗衣服务',
    pointsAmount: 10,
    description: '提供当日洗衣服务',
    enabled: false,
    createdAt: '2025-10-01 10:00:00',
    updatedAt: '2025-10-10 11:00:00',
  },
]

/**
 * 积分服务配置 Mock
 */
export const mockPointsServiceConfig: PointsServiceConfig = {
  storeId: 'store-1',
  storeName: 'XX豪华酒店',
  ecoRewards: mockEcoRewards,
  valueAddedServices: mockValueAddedServices,
}

/**
 * 邀请记录 Mock
 */
export const mockInviteRecords: InviteRecord[] = [
  {
    id: 'invite-1',
    inviteePhone: '13800138001',
    invitedAt: '2025-12-30 14:30:00',
    accountStatus: AccountStatus.REGISTERED,
    vipLevel: 3
  },
  {
    id: 'invite-2',
    inviteePhone: '13800138002',
    invitedAt: '2025-12-30 10:15:00',
    accountStatus: AccountStatus.PRE_REGISTERED,
    vipLevel: 2
  },
  {
    id: 'invite-3',
    inviteePhone: '13800138003',
    invitedAt: '2025-12-29 16:45:00',
    accountStatus: AccountStatus.REGISTERED,
    vipLevel: 1
  },
  {
    id: 'invite-4',
    inviteePhone: '13800138004',
    invitedAt: '2025-12-29 09:20:00',
    accountStatus: AccountStatus.PRE_REGISTERED,
    vipLevel: 0
  },
  {
    id: 'invite-5',
    inviteePhone: '13800138005',
    invitedAt: '2025-12-28 18:30:00',
    accountStatus: AccountStatus.REGISTERED,
    vipLevel: 3
  }
]

/**
 * 分销奖励记录 Mock
 */
export const mockCommissionRecords: CommissionRecord[] = [
  {
    id: 'commission-1',
    orderNo: 'ORD20251230001',
    inviteePhone: '13800138001',
    orderTime: '2025-12-30 15:30:00',
    paymentAmount: 1280.00
  },
  {
    id: 'commission-2',
    orderNo: 'ORD20251230002',
    inviteePhone: '13800138003',
    orderTime: '2025-12-30 11:20:00',
    paymentAmount: 980.00
  },
  {
    id: 'commission-3',
    orderNo: 'ORD20251229001',
    inviteePhone: '13800138001',
    orderTime: '2025-12-29 14:15:00',
    paymentAmount: 1580.00
  },
  {
    id: 'commission-4',
    orderNo: 'ORD20251229002',
    inviteePhone: '13800138005',
    orderTime: '2025-12-29 10:30:00',
    paymentAmount: 2200.00
  },
  {
    id: 'commission-5',
    orderNo: 'ORD20251228001',
    inviteePhone: '13800138003',
    orderTime: '2025-12-28 16:45:00',
    paymentAmount: 1450.00
  }
]

