/**
 * 会员服务相关 Mock 数据
 */

import type {
  PointsServiceItem,
  PointsServiceConfig,
} from '@/types/memberService'
import { PointsServiceType } from '@/types/memberService'

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

