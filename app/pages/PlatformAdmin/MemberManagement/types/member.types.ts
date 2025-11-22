/**
 * 平台后台 - 会员管理类型定义
 */

/**
 * 会员等级升级规则
 */
export interface MemberLevelUpgradeRule {
  id: string
  level: number // VIP等级 0-9
  levelName: string // 等级名称
  upgradeNights: number // 升级所需累计间夜数
  validityDays: number // 会员有效期（天）
  maintainNights: number // 保级所需间夜数
  updatedAt: string
}

/**
 * 会员等级折扣规则
 */
export interface MemberLevelDiscountRule {
  id: string
  level: number // VIP等级 0-9
  levelName: string // 等级名称
  platformBaseDiscount: number // 平台基础折扣（0.5-1.0）
  merchantDiscountMin: number // 商户折扣最低值
  merchantDiscountMax: number // 商户折扣最高值（等于平台基础折扣）
  updatedAt: string
}

/**
 * 用户会员信息
 */
export interface UserMemberInfo {
  userId: string
  userName: string
  phone: string
  currentLevel: number
  currentLevelName: string
  totalNights: number // 累计总间夜数
  maintainNights: number // 保级间夜计数器（有效期内）
  validityDate: string // 会员有效期
  pointsBalance: number // 积分余额
  registeredAt: string
}

/**
 * 用户间夜记录
 */
export interface UserNightRecord {
  id: string
  orderId: string
  hotelName: string
  checkInDate: string
  checkOutDate: string
  nights: number
  createdAt: string
}

/**
 * 会员等级调整记录
 */
export interface MemberLevelAdjustRecord {
  id: string
  userId: string
  userName: string
  fromLevel: number
  toLevel: number
  adjustType: 'upgrade' | 'downgrade' | 'manual'
  adjustTypeName: string
  reason: string
  operator: string
  createdAt: string
}
