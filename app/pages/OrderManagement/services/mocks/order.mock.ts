/**
 * 订单管理 Mock 数据
 */

import type { Order, RefundRequest } from '../../types/order.types'
import { OrderStatus, PaymentMethod, RefundStatus } from '../../types/order.types'

// ==================== 订单数据 ====================

export const mockOrders: Order[] = [
  {
    orderId: 'ORD_20250116001',
    createdAt: '01/16/25 14:30:00',
    userId: 'UID_2025001',
    userName: '张经理',
    userPhone: '13812345678',
    hotelId: 'HOTEL_001',
    hotelName: '亚朵酒店·上海新天地店',
    roomType: '大床房',
    checkInDate: '01/18/25',
    checkOutDate: '01/19/25',
    nights: 1,
    guestCount: 1,
    roomPrice: 458,
    couponDiscount: 30,
    pointsDiscount: 0,
    memberDiscount: 0,
    actualAmount: 428,
    commission: 21.4,
    merchantAmount: 406.6,
    paymentMethod: PaymentMethod.WECHAT,
    status: OrderStatus.PENDING_CHECKIN,
    paidAt: '01/16/25 14:35:00',
    confirmedAt: '01/16/25 15:00:00'
  },
  {
    orderId: 'ORD_20250115002',
    createdAt: '01/15/25 10:20:00',
    userId: 'UID_2025128',
    userName: '李女士',
    userPhone: '18698765432',
    hotelId: 'HOTEL_003',
    hotelName: '汉庭酒店·杭州西湖断桥店',
    roomType: '标准双床房',
    checkInDate: '01/16/25',
    checkOutDate: '01/18/25',
    nights: 2,
    guestCount: 2,
    roomPrice: 476,
    couponDiscount: 0,
    pointsDiscount: 5,
    memberDiscount: 23.8,
    actualAmount: 447.2,
    commission: 22.36,
    merchantAmount: 424.84,
    paymentMethod: PaymentMethod.ALIPAY,
    status: OrderStatus.CHECKED_IN,
    paidAt: '01/15/25 10:25:00',
    confirmedAt: '01/15/25 11:00:00',
    checkedInAt: '01/16/25 14:00:00'
  },
  {
    orderId: 'ORD_20250114003',
    createdAt: '01/14/25 09:15:00',
    userId: 'UID_2024888',
    userName: '陈总',
    userPhone: '13987654321',
    hotelId: 'HOTEL_001',
    hotelName: '亚朵酒店·上海新天地店',
    roomType: '行政套房',
    checkInDate: '01/12/25',
    checkOutDate: '01/14/25',
    nights: 2,
    guestCount: 1,
    roomPrice: 1280,
    couponDiscount: 0,
    pointsDiscount: 10,
    memberDiscount: 128,
    actualAmount: 1142,
    commission: 57.1,
    merchantAmount: 1084.9,
    paymentMethod: PaymentMethod.WECHAT,
    status: OrderStatus.COMPLETED,
    paidAt: '01/14/25 09:20:00',
    confirmedAt: '01/14/25 10:00:00',
    checkedInAt: '01/12/25 14:00:00',
    completedAt: '01/14/25 12:00:00'
  },
  {
    orderId: 'ORD_20250113004',
    createdAt: '01/13/25 16:40:00',
    userId: 'UID_2025456',
    userName: '王先生',
    userPhone: '15234567890',
    hotelId: 'HOTEL_004',
    hotelName: '山野·莫干山云栖民宿',
    roomType: '山景大床房',
    checkInDate: '01/20/25',
    checkOutDate: '01/22/25',
    nights: 2,
    guestCount: 2,
    roomPrice: 1360,
    couponDiscount: 0,
    pointsDiscount: 0,
    memberDiscount: 0,
    actualAmount: 1360,
    commission: 68,
    merchantAmount: 1292,
    paymentMethod: PaymentMethod.WECHAT,
    status: OrderStatus.CANCELLED,
    paidAt: '01/13/25 16:45:00'
  }
]

// ==================== 退款申请 ====================

export const mockRefundRequests: RefundRequest[] = [
  {
    refundId: 'REF_20250115001',
    orderId: 'ORD_20250113004',
    hotelName: '山野·莫干山云栖民宿',
    userName: '王先生',
    requestedAt: '01/15/25 10:00:00',
    reason: '临时有事无法前往',
    requestAmount: 1360,
    actualRefundAmount: 1088,
    status: RefundStatus.APPROVED,
    reviewerName: '客服-王小美',
    reviewedAt: '01/15/25 10:30:00',
    reviewNote: '距离入住5天，按80%退款'
  },
  {
    refundId: 'REF_20250114002',
    orderId: 'ORD_20250112005',
    hotelName: '全季酒店·北京三里屯店',
    userName: '刘小姐',
    requestedAt: '01/14/25 14:00:00',
    reason: '酒店设施与描述不符',
    requestAmount: 398,
    status: RefundStatus.PENDING,
  }
]

// ==================== 标签映射 ====================

export const orderStatusLabels: Record<OrderStatus, string> = {
  [OrderStatus.PENDING_PAYMENT]: '待支付',
  [OrderStatus.PENDING_CONFIRM]: '待确认',
  [OrderStatus.PENDING_CHECKIN]: '待入住',
  [OrderStatus.CHECKED_IN]: '已入住',
  [OrderStatus.COMPLETED]: '已完成',
  [OrderStatus.CANCELLED]: '已取消'
}

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  [PaymentMethod.WECHAT]: '微信支付',
  [PaymentMethod.ALIPAY]: '支付宝',
  [PaymentMethod.BANK_CARD]: '银行卡'
}

export const refundStatusLabels: Record<RefundStatus, string> = {
  [RefundStatus.PENDING]: '待审核',
  [RefundStatus.APPROVED]: '已同意',
  [RefundStatus.REJECTED]: '已拒绝',
  [RefundStatus.REFUNDING]: '退款中',
  [RefundStatus.REFUNDED]: '已退款'
}
