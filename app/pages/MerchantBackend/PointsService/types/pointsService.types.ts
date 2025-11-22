/**
 * 商户端 - 积分服务类型定义
 */

/**
 * 积分服务类型
 */
export enum PointsServiceType {
  ECO_REWARD = 'eco_reward', // 环保奖励（离店后发放）
  VALUE_ADDED = 'value_added', // 增值服务（下单时扣除）
}

/**
 * 积分服务项
 */
export interface PointsServiceItem {
  id: string
  type: PointsServiceType
  typeName: string
  serviceName: string // 服务名称（如"自带拖鞋"）
  pointsAmount: number // 积分数量（环保奖励为负数，增值服务为正数）
  description?: string // 服务说明
  enabled: boolean // 是否启用
  createdAt: string
  updatedAt: string
}

/**
 * 积分服务配置
 */
export interface PointsServiceConfig {
  storeId: string
  storeName: string
  ecoRewards: PointsServiceItem[] // 环保奖励列表
  valueAddedServices: PointsServiceItem[] // 增值服务列表
}
