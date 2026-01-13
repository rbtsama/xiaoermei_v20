/**
 * 活动管理 - 类型定义
 */

/**
 * 活动状态（手动启用/禁用）
 */
export type ActivityStatus = 'enabled' | 'disabled'

/**
 * 优惠策略
 */
export interface DiscountStrategy {
  name: string              // 策略名称，如"策略1"、"策略2"
  platformDiscount: number  // 平台优惠百分比（0-100）
  merchantDiscount: number  // 商户优惠百分比（0-100）
}

/**
 * 预订限制
 */
export interface BookingRestriction {
  dateRange: [string, string]  // 入住日期范围，格式：['YYYY-MM-DD', 'YYYY-MM-DD']
  strategyName: string         // 关联的策略名称，如"策略1"
}

/**
 * 活动主体
 */
export interface Activity {
  id: string                      // 活动ID，act1000开始
  name: string                    // 活动名称，最长50字符
  startTime: string               // 开始时间，格式：'YYYY-MM-DD HH:mm:ss'
  endTime: string                 // 结束时间，格式：'YYYY-MM-DD HH:mm:ss'
  status: ActivityStatus          // 活动状态：启用/禁用

  // 策略配置
  platformBudget: number          // 平台预算（元）
  remainingBudget: number         // 剩余预算（元，后端计算）
  strategies: DiscountStrategy[]  // 优惠策略数组（至少1条）

  // 预订限制
  applicableStores: string[]           // 适用门店ID数组
  bookingRestrictions: BookingRestriction[]  // 入住日期限制数组（至少1条）

  createdAt: string               // 创建时间
  createdBy: string               // 创建人
}

/**
 * 门店信息
 */
export interface Store {
  id: string
  name: string
  pinyin: string  // 拼音，用于排序
}

/**
 * 分页参数
 */
export interface PaginationParams {
  page: number
  pageSize: number
}

/**
 * 分页结果
 */
export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
