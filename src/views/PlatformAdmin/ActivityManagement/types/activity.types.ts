/**
 * 活动管理 - 类型定义
 */

/**
 * 活动状态（根据时间自动计算）
 */
export type ActivityStatus = 'not_started' | 'in_progress' | 'ended'

/**
 * 活动主体
 */
export interface Activity {
  id: string                      // 活动ID，act1000开始
  name: string                    // 活动名称，最长50字符
  startTime: string               // 开始时间，格式：'YYYY-MM-DD HH:mm:ss'
  endTime: string                 // 结束时间，格式：'YYYY-MM-DD HH:mm:ss'
  rules: string                   // 活动规则（普通文本），最长500字符
  participationConditions: string[] // 参与条件（会员等级ID数组），如['VIP0','VIP1','VIP2']
  couponIds: string[]             // 派发优惠券ID数组
  status?: ActivityStatus         // 状态（计算属性，查询时动态计算）
  createdAt: string               // 创建时间
  createdBy: string               // 创建人
}

/**
 * 商户活动码
 */
export interface MerchantActivityCode {
  merchantId: string              // 商户ID
  merchantName: string            // 商户名称
  storeName: string               // 门店名称
  qrCode: string                  // 二维码图片（base64格式）
  activityId: string              // 关联活动ID
}

/**
 * 优惠券发放明细（T-1数据）
 */
export interface CouponDistributionDetail {
  couponId: string                // 优惠券ID
  couponName: string              // 优惠券名称
  distributionCount: number       // 发放数量
  date: string                    // 统计日期（YYYY-MM-DD）
}

/**
 * 活动数据统计
 */
export interface ActivityDataStats {
  activityId: string              // 活动ID
  date: string                    // 统计日期（T-1）
  details: CouponDistributionDetail[] // 优惠券发放明细列表
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
