// 会员等级类型定义

export interface MemberLevel {
  id: string
  isDefault: boolean // 是否默认
  levelName: string // 会员等级名称
  upgradeCondition: string // 获得等级条件（描述性文字）
  levelBenefits: string // 会员权益（描述性文字）
  validityPeriod: string // 等级有效期（如：1年、2年、永久）

  // 升级规则
  requiredNights: number // 预订订单要求（住宿次数）
  requiredAmount?: number // 消费金额要求（可选）

  // 折扣规则
  discountRangeMin: number // 折扣范围最小值（如 80 表示 8折）
  discountRangeMax: number // 折扣范围最大值（如 95 表示 9.5折）
  discountPercentage: number // 当前折扣百分比（如 85 表示 8.5折）

  // 积分汇率（消费 1 元 = X 积分）
  pointsEarnRatio: number // 积分获取比例（如 1 表示 1元=1积分，2 表示 1元=2积分）

  // 升级奖励
  upgradeGiftSets: number // 获得等级后赠送的套餐数量

  status: 'active' | 'inactive' // 状态
  createdAt: string
  updatedAt?: string
}

export interface MemberLevelFilterParams {
  levelName?: string
  status?: 'active' | 'inactive'
}

// 会员等级编辑表单
export interface MemberLevelFormData {
  levelName: string
  upgradeCondition: string
  levelBenefits: string
  validityPeriod: string
  requiredNights: number
  requiredAmount?: number
  discountRangeMin: number
  discountRangeMax: number
  discountPercentage: number
  pointsEarnRatio: number
  upgradeGiftSets: number
  status: 'active' | 'inactive'
}
