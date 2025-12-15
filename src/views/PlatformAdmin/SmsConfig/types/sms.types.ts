/**
 * 短信配置 - 类型定义
 */

// 短信模板状态
export type SmsTemplateStatus = 'enabled' | 'disabled'

/**
 * 短信模板
 */
export interface SmsTemplate {
  // 短信模板ID（系统自动生成，格式：SMS0001）
  templateId: string
  // 短信模板内容
  content: string
  // 状态
  status: SmsTemplateStatus
  // 更新时间
  updatedAt: string
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
