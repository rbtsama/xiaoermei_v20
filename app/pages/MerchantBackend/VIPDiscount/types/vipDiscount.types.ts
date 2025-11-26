/**
 * 商户端 - VIP等级折扣类型定义
 */

/**
 * 时段类型
 */
export enum PeriodType {
  WEEKDAY = 'weekday', // 平日
  WEEKEND = 'weekend', // 周末
  HOLIDAY = 'holiday', // 节假日
}

/**
 * VIP等级折扣配置
 */
export interface VIPLevelDiscount {
  id: string
  level: number
  levelName: string
  platformDiscount: number // 平台会员折扣（只读，商户不可修改）
  weekdayDiscount: number // 平日折扣（可编辑，必须 <= platformDiscount）
  weekendDiscount: number // 周末折扣（可编辑，必须 <= platformDiscount）
  holidayDiscount: number // 节假日折扣（可编辑，必须 <= platformDiscount）
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
