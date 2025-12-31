/**
 * 会员服务相关类型定义
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

/**
 * VIP等级折扣配置
 */
export interface VIPLevelDiscount {
  id: string
  level: number
  levelName: string
  platformDiscount: number // 平台会员折扣（只读，商户不可修改）
  mondayDiscount: number    // 周一折扣（可编辑，必须 <= platformDiscount）
  tuesdayDiscount: number   // 周二折扣（可编辑，必须 <= platformDiscount）
  wednesdayDiscount: number // 周三折扣（可编辑，必须 <= platformDiscount）
  thursdayDiscount: number  // 周四折扣（可编辑，必须 <= platformDiscount）
  fridayDiscount: number    // 周五折扣（可编辑，必须 <= platformDiscount）
  saturdayDiscount: number  // 周六折扣（可编辑，必须 <= platformDiscount）
  sundayDiscount: number    // 周日折扣（可编辑，必须 <= platformDiscount）
  holidayDiscount: number   // 节假日折扣（可编辑，必须 <= platformDiscount，优先级最高）
  updatedAt: string
}

/**
 * 商户VIP折扣配置
 */
export interface MerchantVIPDiscountConfig {
  storeId: string
  storeName: string
  discounts: VIPLevelDiscount[]
}

/**
 * 账号状态
 */
export enum AccountStatus {
  PRE_REGISTERED = 'pre_registered', // 预注册（已邀请未注册）
  REGISTERED = 'registered'          // 已注册
}

/**
 * 邀请记录
 */
export interface InviteRecord {
  id: string
  inviteePhone: string        // 受邀会员手机号
  invitedAt: string           // 邀请时间
  accountStatus: AccountStatus // 账号状态
  vipLevel: number            // 会员等级（0-3）
}

/**
 * 订单状态枚举
 */
export enum OrderStatus {
  PENDING = 'pending',           // 待确认
  CONFIRMED = 'confirmed',       // 已确认
  CHECKED_IN = 'checked_in',     // 已入住
  CHECKED_OUT = 'checked_out',   // 已离店
  CANCELLED = 'cancelled'        // 已取消
}

/**
 * 分销奖励记录
 */
export interface CommissionRecord {
  id: string
  merchantName?: string   // 商户名称（平台后台需要）
  inviteePhone: string    // 受邀会员手机号
  orderNo: string         // 订单号
  orderStatus?: OrderStatus // 订单状态（平台后台需要）
  customerName?: string   // 下单人姓名（平台后台需要）
  guestName?: string      // 入住人姓名（平台后台需要）
  orderTime?: string      // 下单时间
  checkOutTime: string    // 离店时间（必填，用于排序）
  paymentAmount?: number  // 支付金额
}
