/**
 * 订单管理类型定义
 */

// ==================== 订单 ====================

/**
 * 订单状态
 */
export enum OrderStatus {
  /** 待支付 */
  PENDING_PAYMENT = 'pending_payment',
  /** 待确认（已支付，等酒店确认） */
  PENDING_CONFIRM = 'pending_confirm',
  /** 待入住 */
  PENDING_CHECKIN = 'pending_checkin',
  /** 已入住 */
  CHECKED_IN = 'checked_in',
  /** 已完成 */
  COMPLETED = 'completed',
  /** 已取消 */
  CANCELLED = 'cancelled'
}

/**
 * 支付方式
 */
export enum PaymentMethod {
  /** 微信支付 */
  WECHAT = 'wechat',
  /** 支付宝 */
  ALIPAY = 'alipay',
  /** 银行卡 */
  BANK_CARD = 'bank_card'
}

/**
 * 订单
 */
export interface Order {
  /** 订单号 */
  orderId: string
  /** 下单时间 */
  createdAt: string
  /** 用户ID */
  userId: string
  /** 用户名 */
  userName: string
  /** 用户手机号 */
  userPhone: string
  /** 酒店ID */
  hotelId: string
  /** 酒店名称 */
  hotelName: string
  /** 房型 */
  roomType: string
  /** 入住日期 */
  checkInDate: string
  /** 退房日期 */
  checkOutDate: string
  /** 间夜数 */
  nights: number
  /** 入住人数 */
  guestCount: number
  /** 房费小计 */
  roomPrice: number
  /** 优惠券优惠 */
  couponDiscount: number
  /** 积分抵扣 */
  pointsDiscount: number
  /** 会员折扣 */
  memberDiscount: number
  /** 实付金额 */
  actualAmount: number
  /** 平台佣金（5%） */
  commission: number
  /** 商家实收 */
  merchantAmount: number
  /** 支付方式 */
  paymentMethod: PaymentMethod
  /** 订单状态 */
  status: OrderStatus
  /** 支付时间 */
  paidAt?: string
  /** 确认时间 */
  confirmedAt?: string
  /** 入住时间 */
  checkedInAt?: string
  /** 完成时间 */
  completedAt?: string
}

// ==================== 退款 ====================

/**
 * 退款状态
 */
export enum RefundStatus {
  /** 待审核 */
  PENDING = 'pending',
  /** 已同意 */
  APPROVED = 'approved',
  /** 已拒绝 */
  REJECTED = 'rejected',
  /** 退款中 */
  REFUNDING = 'refunding',
  /** 已退款 */
  REFUNDED = 'refunded'
}

/**
 * 退款申请
 */
export interface RefundRequest {
  /** 退款ID */
  refundId: string
  /** 订单号 */
  orderId: string
  /** 酒店名称 */
  hotelName: string
  /** 用户名 */
  userName: string
  /** 申请时间 */
  requestedAt: string
  /** 退款原因 */
  reason: string
  /** 申请退款金额 */
  requestAmount: number
  /** 实际退款金额 */
  actualRefundAmount?: number
  /** 退款状态 */
  status: RefundStatus
  /** 审核人 */
  reviewerName?: string
  /** 审核时间 */
  reviewedAt?: string
  /** 审核备注 */
  reviewNote?: string
}
