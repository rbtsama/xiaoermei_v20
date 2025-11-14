/**
 * 积分系统类型定义
 * 参考行业标准：美团、携程、华住会、万豪、亚朵
 */

// ==================== 积分规则配置 ====================

/**
 * 积分获取规则
 */
export interface PointsEarnRule {
  /** 消费金额与积分的兑换比例（例如：1元=1积分） */
  earnRatio: number
  /** 最低起算金额（例如：订单满50元才计算积分） */
  minOrderAmount: number
  /** 发放时机（小时）：订单完成后多久发放积分 */
  delayHours: number
  /** 是否排除优惠券金额 */
  excludeCoupon: boolean
  /** 是否排除平台佣金 */
  excludeCommission: boolean
}

/**
 * 积分消耗规则
 */
export interface PointsRedeemRule {
  /** 积分与金额的兑换比例（例如：100积分=1元） */
  redeemRatio: number
  /** 单笔订单最多抵扣比例（例如：30%） */
  maxRedeemPercent: number
  /** 单次最少使用积分（例如：100积分起用） */
  minRedeemPoints: number
}

/**
 * 积分过期节点（统一过期日期）
 */
export interface ExpiryNode {
  /** 月份（1-12） */
  month: number
  /** 日期（1-31） */
  day: number
  /** 描述（例如："春节过期"、"年中过期"） */
  label: string
}

/**
 * 积分有效期规则
 */
export interface PointsExpiryRule {
  /** 基础有效期（月）：保证积分至少有效多久 */
  baseExpiryMonths: number
  /** 统一过期节点：每年的过期日期列表 */
  expiryNodes: ExpiryNode[]
  /** 计算规则：获得日期 + 基础有效期，之后最近的过期节点 */
  calcRule: 'base_plus_node'
  /** 到期提醒天数（例如：30天前提醒） */
  reminderDays: number
}

/**
 * 积分规则配置（完整）
 */
export interface PointsRuleConfig {
  id: string
  earnRule: PointsEarnRule
  redeemRule: PointsRedeemRule
  expiryRule: PointsExpiryRule
  updatedAt: string
  updatedBy: string
}

// ==================== 用户积分账户 ====================

/**
 * 用户积分账户
 */
export interface UserPointsAccount {
  userId: string
  userName: string
  phone: string
  /** 当前可用积分 */
  availablePoints: number
  /** 冻结中积分（待确认订单） */
  frozenPoints: number
  /** 累计获得积分 */
  totalEarned: number
  /** 累计消耗积分 */
  totalSpent: number
  /** 即将过期积分 */
  expiringPoints: number
  /** 即将过期日期 */
  expiringDate?: string
  /** 会员等级（预留字段） */
  memberLevel?: string
  /** 注册日期 */
  registerDate: string
  /** 最后订单日期 */
  lastOrderDate?: string
  /** 订单总数 */
  orderCount: number
}

// ==================== 积分明细 ====================

/**
 * 积分变动类型
 */
export enum PointsChangeType {
  /** 订单完成 */
  ORDER_COMPLETE = 'order_complete',
  /** 积分抵扣 */
  REDEEM = 'redeem',
  /** 订单退款 */
  REFUND = 'refund',
  /** 积分过期 */
  EXPIRE = 'expire',
  /** 手动调整 */
  MANUAL_ADJUST = 'manual_adjust',
  /** 积分退回 */
  RETURN = 'return'
}

/**
 * 积分明细记录
 */
export interface PointsDetail {
  id: string
  userId: string
  /** 变动类型 */
  changeType: PointsChangeType
  /** 积分变动量（正数=增加，负数=减少） */
  points: number
  /** 变动后余额 */
  balance: number
  /** 关联订单号 */
  orderId?: string
  /** 变动说明 */
  description: string
  /** 操作人（系统自动/客服姓名） */
  operator: string
  /** 创建时间 */
  createdAt: string
}

// ==================== 酒店&订单相关 ====================

/**
 * 酒店信息
 */
export interface Hotel {
  hotelId: string
  hotelName: string
  roomType: string
  pricePerNight: number
  location: string
  category: '经济型' | '中端商务' | '高端酒店' | '精品民宿'
}

/**
 * 订单信息
 */
export interface Order {
  orderId: string
  userId: string
  hotelId: string
  hotelName: string
  roomType: string
  checkInDate: string
  checkOutDate: string
  nights: number
  totalAmount: number
  /** 使用积分数量 */
  pointsUsed: number
  /** 积分抵扣金额 */
  pointsDiscount: number
  /** 实付金额 */
  actualAmount: number
  status: 'pending' | 'completed' | 'cancelled' | 'refunded'
  createdAt: string
}

// ==================== 手动调整积分 ====================

/**
 * 手动调整类型
 */
export enum ManualAdjustType {
  /** 增加积分 */
  INCREASE = 'increase',
  /** 减少积分 */
  DECREASE = 'decrease'
}

/**
 * 手动调整原因
 */
export enum ManualAdjustReason {
  /** 客服补偿 */
  CUSTOMER_COMPENSATION = 'customer_compensation',
  /** 运营活动 */
  MARKETING_ACTIVITY = 'marketing_activity',
  /** 异常扣除 */
  ABNORMAL_DEDUCTION = 'abnormal_deduction',
  /** 系统错误修正 */
  SYSTEM_ERROR_FIX = 'system_error_fix'
}

/**
 * 手动调整积分请求
 */
export interface ManualAdjustRequest {
  userId: string
  type: ManualAdjustType
  points: number
  reason: ManualAdjustReason
  description: string
  operator: string
}

// ==================== 查询参数 ====================

/**
 * 积分明细查询参数
 */
export interface PointsDetailQuery {
  userId: string
  /** 时间范围（天）：最近7天、30天、90天 */
  dateRange?: 7 | 30 | 90
  /** 变动类型筛选 */
  changeType?: PointsChangeType
  /** 关联订单号 */
  orderId?: string
  /** 页码 */
  page?: number
  /** 每页数量 */
  pageSize?: number
}

/**
 * 用户搜索参数
 */
export interface UserSearchParams {
  /** 手机号 */
  phone?: string
  /** 用户ID */
  userId?: string
  /** 用户名 */
  userName?: string
}
