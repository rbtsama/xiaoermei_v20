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
    inviteePhone: '13912345678',
    invitedAt: '2025-12-30 14:30:25',
    accountStatus: AccountStatus.REGISTERED,
    vipLevel: 3
  },
  {
    id: 'invite-2',
    inviteePhone: '13823456789',
    invitedAt: '2025-12-30 10:15:40',
    accountStatus: AccountStatus.PRE_REGISTERED,
    vipLevel: 2
  },
  {
    id: 'invite-3',
    inviteePhone: '13734567890',
    invitedAt: '2025-12-29 16:45:18',
    accountStatus: AccountStatus.REGISTERED,
    vipLevel: 1
  },
  {
    id: 'invite-4',
    inviteePhone: '13645678901',
    invitedAt: '2025-12-29 09:20:33',
    accountStatus: AccountStatus.PRE_REGISTERED,
    vipLevel: 0
  },
  {
    id: 'invite-5',
    inviteePhone: '13556789012',
    invitedAt: '2025-12-28 18:30:55',
    accountStatus: AccountStatus.REGISTERED,
    vipLevel: 3
  },
  {
    id: 'invite-6',
    inviteePhone: '13467890123',
    invitedAt: '2025-12-28 11:25:12',
    accountStatus: AccountStatus.PRE_REGISTERED,
    vipLevel: 2
  },
  {
    id: 'invite-7',
    inviteePhone: '13378901234',
    invitedAt: '2025-12-27 20:15:48',
    accountStatus: AccountStatus.REGISTERED,
    vipLevel: 1
  },
  {
    id: 'invite-8',
    inviteePhone: '13289012345',
    invitedAt: '2025-12-27 15:40:22',
    accountStatus: AccountStatus.REGISTERED,
    vipLevel: 0
  }
]

/**
 * 分销奖励记录 Mock（商户端）
 */
export const mockCommissionRecords: CommissionRecord[] = [
  {
    id: 'commission-1',
    orderNo: '20251230100001',
    inviteePhone: '13912345678',
    orderTime: '2025-12-28 15:30:25',
    checkOutTime: '2025-12-30 12:00:00',
    paymentAmount: 1280.00
  },
  {
    id: 'commission-2',
    orderNo: '20251230100002',
    inviteePhone: '13734567890',
    orderTime: '2025-12-28 11:20:40',
    checkOutTime: '2025-12-30 11:00:00',
    paymentAmount: 980.00
  },
  {
    id: 'commission-3',
    orderNo: '20251229100001',
    inviteePhone: '13912345678',
    orderTime: '2025-12-27 14:15:18',
    checkOutTime: '2025-12-29 12:00:00',
    paymentAmount: 1580.00
  },
  {
    id: 'commission-4',
    orderNo: '20251229100002',
    inviteePhone: '13556789012',
    orderTime: '2025-12-27 10:30:55',
    checkOutTime: '2025-12-29 11:00:00',
    paymentAmount: 2200.00
  },
  {
    id: 'commission-5',
    orderNo: '20251228100001',
    inviteePhone: '13734567890',
    orderTime: '2025-12-26 16:45:33',
    checkOutTime: '2025-12-28 12:00:00',
    paymentAmount: 1450.00
  },
  {
    id: 'commission-6',
    orderNo: '20251228100002',
    inviteePhone: '13378901234',
    orderTime: '2025-12-26 09:20:12',
    checkOutTime: '2025-12-28 11:00:00',
    paymentAmount: 880.00
  },
  {
    id: 'commission-7',
    orderNo: '20251227100001',
    inviteePhone: '13289012345',
    orderTime: '2025-12-25 18:50:45',
    checkOutTime: '2025-12-27 12:00:00',
    paymentAmount: 1680.00
  }
]

