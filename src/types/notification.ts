/**
 * 通知系统类型定义
 */

/**
 * 通知状态枚举
 */
export enum NotificationStatus {
  UNREAD = 'unread', // 未读
  READ = 'read', // 已读
  AGREED = 'agreed' // 已同意
}

/**
 * 订单变化类型枚举
 */
export enum OrderChangeType {
  NEW_ORDER = 'new_order', // 新订单
  ORDER_CANCELLED = 'order_cancelled' // 订单取消
}

/**
 * 商户端收到的通知
 */
export interface NotificationItem {
  id: string
  title: string
  content: string
  requireAgreement: boolean // 是否需要同意
  link?: string // 跳转链接（选填）
  status: NotificationStatus
  createdAt: string
}

/**
 * 订单变化通知
 */
export interface OrderChangeNotification {
  id: string
  type: OrderChangeType
  orderNo: string
  guestNames: string // 入住人姓名（逗号分隔）
  guestPhone: string
  checkInDate: string
  checkOutDate: string
  nights: number
  roomType: string
  totalAmount: number
  createdAt: string
}

/**
 * 平台后台创建通知任务表单
 */
export interface NotificationTaskForm {
  content: string
  requireAgreement: boolean // 是否需要同意
  hasLink: boolean // 是否有跳转链接
  link?: string // 跳转链接（如果hasLink为true则必填）
  merchantIds: string[] // 选中的商户ID列表
}

/**
 * 平台后台历史发送记录
 */
export interface NotificationRecord {
  id: string
  content: string
  requireAgreement: boolean // 是否需要同意
  link?: string // 跳转链接
  merchantList: string[] // 发送商户名称列表
  merchantCount: number // 发送商户数量
  senderName: string
  sentAt: string
}

/**
 * 商户信息（用于选择发送对象）
 */
export interface MerchantInfo {
  id: string
  storeName: string
  mainAccount: string
  onlineTime: string // 上线时间
}
