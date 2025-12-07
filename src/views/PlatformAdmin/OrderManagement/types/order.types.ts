/**
 * 平台后台 - 订单管理类型定义
 * 基于 SharedTypes 的订单类型，适配 Vue2 + TypeScript
 */

// ========== 订单状态枚举 ==========

/**
 * 订单状态
 * 正常流程：待支付 → 待入住 → 入住中 → 已离店 → 已完成
 * 异常流程：支付取消、已取消、退款申请
 */
export enum OrderStatus {
  /** 待支付 - 订单已创建，等待用户支付 */
  PENDING_PAYMENT = 'pending_payment',
  /** 待入住 - 已支付，等待入住日期到来 */
  PENDING_CHECKIN = 'pending_checkin',
  /** 入住中 - 用户已办理入住，正在住店 */
  CHECKED_IN = 'checked_in',
  /** 已离店 - 用户已退房，7天内可申请退款 */
  CHECKED_OUT = 'checked_out',
  /** 已完成 - 离店+3天24:00自然完成，或退款流程结束后完成 */
  COMPLETED = 'completed',
  /** 支付取消 - 支付前取消（下单前），包含超时未支付和用户主动取消 */
  PAYMENT_CANCELLED = 'payment_cancelled',
  /** 已取消 - 支付后取消（履约中），入住之前主动取消订单 */
  CANCELLED = 'cancelled',
  /** 退款申请 - 已离店后7天内，用户发起退款申请 */
  REFUND_REQUESTED = 'refund_requested'
}

/**
 * 订单状态显示标签
 */
export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.PENDING_PAYMENT]: '待付款',
  [OrderStatus.PENDING_CHECKIN]: '待入住',
  [OrderStatus.CHECKED_IN]: '已入住',
  [OrderStatus.CHECKED_OUT]: '已离店',
  [OrderStatus.COMPLETED]: '已完成',
  [OrderStatus.PAYMENT_CANCELLED]: '支付取消',
  [OrderStatus.CANCELLED]: '已取消',
  [OrderStatus.REFUND_REQUESTED]: '退款申请'
}

/**
 * 订单状态颜色（用于UI显示）
 */
export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  [OrderStatus.PENDING_PAYMENT]: 'orange',
  [OrderStatus.PENDING_CHECKIN]: 'orange',
  [OrderStatus.CHECKED_IN]: 'blue',
  [OrderStatus.CHECKED_OUT]: 'blue',
  [OrderStatus.COMPLETED]: 'black',
  [OrderStatus.PAYMENT_CANCELLED]: 'slate',
  [OrderStatus.CANCELLED]: 'slate',
  [OrderStatus.REFUND_REQUESTED]: 'red'
}

// ========== 支付状态（向后兼容） ==========

export enum PaymentStatus {
  UNPAID = 'unpaid',
  PAID = 'paid',
  REFUNDED = 'refunded'
}

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  [PaymentStatus.UNPAID]: '未支付',
  [PaymentStatus.PAID]: '已支付',
  [PaymentStatus.REFUNDED]: '已退款'
}

// ========== 入住状态（向后兼容） ==========

export enum CheckInStatus {
  NOT_CHECKED_IN = 'not-checked-in',
  CHECKED_IN = 'checked-in',
  CHECKED_OUT = 'checked-out'
}

export const CHECK_IN_STATUS_LABELS: Record<CheckInStatus, string> = {
  [CheckInStatus.NOT_CHECKED_IN]: '未入住',
  [CheckInStatus.CHECKED_IN]: '已入住',
  [CheckInStatus.CHECKED_OUT]: '已离店'
}

// ========== 积分服务相关 ==========

/**
 * 积分服务项
 */
export interface PointsServiceItem {
  name: string
  points: number
}

/**
 * 订单积分服务
 */
export interface OrderPointsServices {
  rewards: PointsServiceItem[]    // 积分奖励
  exchanges: PointsServiceItem[]  // 积分换购
}

// ========== 退款记录相关 ==========

/**
 * 退款状态（完整5种）
 */
export type RefundStatus = '客人发起申诉' | '客人撤诉' | '门店退款' | '平台支持退款' | '平台拒绝退款'

/**
 * 退款记录
 */
export interface RefundRecord {
  status: RefundStatus
  amount?: number  // 客人撤诉时不显示金额
  time: string
}

// ========== 订单数据模型 ==========

/**
 * 订单
 */
export interface Order {
  // 基本信息
  id: string
  orderNumber: string
  createdAt: string

  // 关联信息
  userId: string
  userName: string
  userPhone: string
  hotelId: string
  hotelName: string

  // 房间信息
  roomTypeId: string
  roomTypeName: string
  roomType: string
  roomNumber?: string
  checkInDate: string
  checkOutDate: string
  nights: number
  roomCount: number
  guestCount: number

  // 客人信息
  guestName: string
  guestPhone: string

  // 金额信息
  roomPrice: number
  couponDiscount: number
  pointsDiscount: number
  memberDiscount: number
  actualAmount: number
  totalAmount: number
  commission: number
  merchantAmount: number

  // 状态信息
  status: OrderStatus
  paymentStatus: PaymentStatus
  checkInStatus: CheckInStatus

  // 时间信息
  paidAt?: string
  checkedInAt?: string
  checkedOutAt?: string
  completedAt?: string
  cancelledAt?: string

  // 退款信息
  hasRefundRequest: boolean
  refundRequestedAt?: string
  refundAmount?: number
  refundedAt?: string

  // 扩展信息（PRD新增）
  pointsServices?: OrderPointsServices  // 积分服务（可选，不含积分抵扣）
  refundRecords?: RefundRecord[]        // 退款记录（可选）
  merchantNote?: string                 // 商家备注（可选）
}

// ========== 筛选参数 ==========

/**
 * 订单列表筛选参数（按PRD优化）
 */
export interface OrderFilterParams {
  orderStatus?: string           // 订单状态
  orderCreatedStart?: string     // 下单开始时间
  orderCreatedEnd?: string       // 下单结束时间
  checkInStart?: string          // 入住开始时间
  checkInEnd?: string            // 入住结束时间
  hotelName?: string             // 酒店名称（模糊搜索）
  searchKeyword?: string         // 订单号/手机号搜索
  page?: number
  pageSize?: number
}

/**
 * 订单列表响应
 */
export interface OrderListResponse {
  orders: Order[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
