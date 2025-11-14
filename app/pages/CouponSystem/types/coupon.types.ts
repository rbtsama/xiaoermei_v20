/**
 * 优惠券系统类型定义
 * 基于电商行业通用优惠券设计
 */

// ==================== 优惠券配置 ====================

/**
 * 优惠券类型
 */
export enum CouponType {
  /** 满减券 */
  FULL_REDUCTION = 'full_reduction',
  /** 折扣券 */
  DISCOUNT = 'discount',
  /** 立减券 */
  DIRECT_REDUCTION = 'direct_reduction'
}

/**
 * 优惠券状态
 */
export enum CouponStatus {
  /** 草稿 */
  DRAFT = 'draft',
  /** 进行中 */
  ACTIVE = 'active',
  /** 已结束 */
  ENDED = 'ended'
}

/**
 * 优惠券配置
 */
export interface CouponConfig {
  /** 优惠券ID */
  couponId: string
  /** 优惠券名称 */
  couponName: string
  /** 优惠券类型 */
  couponType: CouponType
  /** 【满减券】满X元 */
  threshold?: number
  /** 【满减券】减Y元 */
  reductionAmount?: number
  /** 【折扣券】折扣（例如：85表示8.5折） */
  discountRate?: number
  /** 【立减券】立减金额 */
  directAmount?: number
  /** 有效天数（领取后多久过期） */
  validDays: number
  /** 是否可与积分叠加 */
  stackWithPoints: boolean
  /** 是否可与会员折扣叠加 */
  stackWithMemberDiscount: boolean
  /** 限定使用城市（空表示全部） */
  limitedCities: string[]
  /** 限定使用酒店（空表示全部） */
  limitedHotels: string[]
  /** 总发行量 */
  totalCount: number
  /** 已发放数量 */
  issuedCount: number
  /** 已使用数量 */
  usedCount: number
  /** 状态 */
  status: CouponStatus
  /** 创建时间 */
  createdAt: string
  /** 创建人 */
  createdBy: string
}

// ==================== 优惠券发放 ====================

/**
 * 发放渠道
 */
export enum IssueChannel {
  /** 手动发放 */
  MANUAL = 'manual',
  /** 新人注册 */
  NEW_USER = 'new_user',
  /** 会员升级 */
  MEMBER_UPGRADE = 'member_upgrade',
  /** 活动发放 */
  ACTIVITY = 'activity'
}

/**
 * 发放记录
 */
export interface IssueRecord {
  /** 记录ID */
  recordId: string
  /** 优惠券ID */
  couponId: string
  /** 优惠券名称 */
  couponName: string
  /** 发放渠道 */
  channel: IssueChannel
  /** 发放数量 */
  count: number
  /** 目标用户（如果是手动发放） */
  targetUsers?: string[]
  /** 发放时间 */
  issuedAt: string
  /** 操作人 */
  operatorName: string
}

// ==================== 优惠券核销 ====================

/**
 * 核销状态
 */
export enum VerifyStatus {
  /** 未使用 */
  UNUSED = 'unused',
  /** 已使用 */
  USED = 'used',
  /** 已过期 */
  EXPIRED = 'expired'
}

/**
 * 用户优惠券
 */
export interface UserCoupon {
  /** 用户券ID */
  userCouponId: string
  /** 用户ID */
  userId: string
  /** 用户名 */
  userName: string
  /** 优惠券ID */
  couponId: string
  /** 优惠券名称 */
  couponName: string
  /** 优惠券类型 */
  couponType: CouponType
  /** 优惠金额 */
  discountAmount: string
  /** 领取时间 */
  receivedAt: string
  /** 过期时间 */
  expireAt: string
  /** 使用状态 */
  status: VerifyStatus
  /** 使用时间 */
  usedAt?: string
  /** 使用订单号 */
  orderId?: string
}
