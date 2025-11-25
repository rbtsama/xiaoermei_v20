/**
 * 争议处理相关类型定义
 */

// 退款申请状态
export enum RefundStatus {
  PENDING_MERCHANT = 'pending_merchant',  // 待商家处理
  ARBITRATING = 'arbitrating',            // 仲裁中（系统外微信群进行）
  REFUNDED = 'refunded',                  // 已退款
  REJECTED = 'rejected',                  // 已驳回
}

// 退款渠道
export enum RefundChannel {
  MERCHANT = 'merchant',  // 商家退款
  PLATFORM = 'platform',  // 平台退款
}

// 退款申请
export interface RefundRequest {
  id: string
  orderId: string                    // 订单ID
  orderNumber: string                // 订单号
  userId: string                     // 用户ID
  hotelName: string                  // 酒店名称
  actualPaid: number                 // 用户实付金额
  refundRatio: number                // 退款比例(0-100)
  refundAmount: number               // 申请退款金额
  userReason: string                 // 用户申请理由
  userEvidence: string[]             // 用户上传的证据图片
  status: RefundStatus               // 申请状态
  merchantResponse?: string          // 商家回复理由
  merchantEvidence?: string[]        // 商家上传的图片
  merchantResponseAt?: string        // 商家回复时间
  merchantApproved?: boolean         // 商家是否同意
  // 仲裁相关（仲裁在系统外进行）
  arbitrationResult?: 'approved' | 'rejected'  // 仲裁结果
  arbitrationRemark?: string         // 平台备注
  refundChannel?: RefundChannel      // 退款渠道
  completedAt?: string               // 完成时间
  createdAt: string                  // 申请时间
  updatedAt: string                  // 更新时间
}

// 退款申请表单数据（用户端）
export interface RefundRequestFormData {
  orderId: string
  refundRatio: number
  reason: string
  evidence: string[]
}

// 商家回复数据
export interface MerchantResponseData {
  approved: boolean
  response: string
  evidence?: string[]
}

// 平台处理数据
export interface PlatformActionData {
  action: 'reject' | 'merchant_refund' | 'platform_refund'
  arbitrationResult?: 'approved' | 'rejected'
  remark?: string
}
