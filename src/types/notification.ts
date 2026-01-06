/**
 * 通知系统类型定义
 */

/**
 * 通知类型枚举
 */
export enum NotificationType {
  NOTIFICATION = 'notification', // 普通通知
  AGREEMENT_REQUIRED = 'agreement_required', // 需同意通知
  TASK = 'task' // 任务
}

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
  type: NotificationType
  title: string
  content: string
  link?: string // 任务类型的跳转链接
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
  type: NotificationType
  content: string
  link?: string // 任务类型需要填写链接
  merchantIds: string[] // 选中的商户ID列表
}

/**
 * 平台后台历史发送记录
 */
export interface NotificationRecord {
  id: string
  type: NotificationType
  content: string
  link?: string
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
