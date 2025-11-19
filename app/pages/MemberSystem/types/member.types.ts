/**
 * 会员体系类型定义
 * 参考：万豪Bonvoy（年入住保级）、华住会（间夜数升降级）
 */

// ==================== 会员等级 ====================

/**
 * 会员等级状态
 */
export enum MemberLevelStatus {
  /** 上线 */
  ONLINE = 'online',
  /** 下线 */
  OFFLINE = 'offline'
}

/**
 * 会员等级配置
 */
export interface MemberLevel {
  /** 等级编号（0-9） */
  level: number
  /** 内部名称（系统内部使用） */
  internalName: string
  /** 外部名称（用户看到的名称） */
  externalName: string
  /** 有效期（年） */
  validityYears: number
  /** 升级所需间夜数 */
  upgradeNights: number
  /** 保级所需间夜数（每年） */
  maintainNights: number
  /** 积分倍率（1.0-2.0） */
  pointsMultiplier: number
  /** 平台最低折扣（%，例如：90表示最低9折） */
  minDiscount: number
  /** 会员卡封面图片URL */
  cardCoverImage: string
  /** 会员卡背景色 */
  cardBgColor: string
  /** 体验卡赠送数量（允许赠送几张体验卡） */
  trialCardCount: number
  /** 体验卡有效天数 */
  trialCardDays: number
  /** 会员卡售价（元） */
  price: number
  /** 会员卡划线价（原价，元） */
  originalPrice: number
  /** 会员卡促销价（特价，元） */
  promotionPrice: number
  /** 状态 */
  status: MemberLevelStatus
  /** 创建时间 */
  createdAt: string
  /** 最后修改时间 */
  updatedAt?: string
  /** 最后修改人 */
  updatedBy?: string
}

// ==================== 会员权益 ====================

/**
 * 权益类型
 */
export enum BenefitType {
  /** 积分倍率 */
  POINTS_MULTIPLIER = 'points_multiplier',
  /** 折扣优惠 */
  DISCOUNT = 'discount',
  /** 免费升房 */
  FREE_UPGRADE = 'free_upgrade',
  /** 延迟退房 */
  LATE_CHECKOUT = 'late_checkout',
  /** 欢迎礼 */
  WELCOME_GIFT = 'welcome_gift',
  /** 专属客服 */
  VIP_SERVICE = 'vip_service',
  /** 优先预订 */
  PRIORITY_BOOKING = 'priority_booking'
}

/**
 * 会员权益
 */
export interface MemberBenefit {
  /** 权益ID */
  benefitId: string
  /** 适用等级（可多选） */
  applicableLevels: number[]
  /** 权益类型 */
  benefitType: BenefitType
  /** 权益名称 */
  benefitName: string
  /** 权益描述 */
  description: string
  /** 权益内容（JSON格式，不同类型权益内容不同） */
  benefitContent: string
  /** 是否启用 */
  isActive: boolean
  /** 创建时间 */
  createdAt: string
  /** 创建人 */
  createdBy: string
}

// ==================== 用户会员信息 ====================

/**
 * 用户会员信息
 */
export interface UserMemberInfo {
  /** 用户ID */
  userId: string
  /** 用户名 */
  userName: string
  /** 当前等级 */
  currentLevel: number
  /** 当前等级名称 */
  currentLevelName: string
  /** 会员有效期 */
  expiryDate: string
  /** 本年度已入住间夜数 */
  currentYearNights: number
  /** 距离下一等级还需间夜数 */
  nightsToUpgrade: number
  /** 距离保级还需间夜数 */
  nightsToMaintain: number
  /** 会员注册时间 */
  memberSince: string
  /** 历史最高等级 */
  highestLevel: number
}

// ==================== 查询参数 ====================

/**
 * 会员等级查询参数
 */
export interface MemberLevelQuery {
  /** 状态筛选 */
  status?: MemberLevelStatus
}
