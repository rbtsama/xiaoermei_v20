/**
 * 协议管理系统类型定义
 * 协议模板管理 + 签约记录管理
 */

// ==================== 协议模板 ====================

/**
 * 协议模板状态
 */
export enum TemplateStatus {
  /** 草稿 */
  DRAFT = 'draft',
  /** 生效中 */
  ACTIVE = 'active',
  /** 已停用 */
  INACTIVE = 'inactive'
}

/**
 * 协议模板
 */
export interface ContractTemplate {
  /** 模板ID */
  templateId: string
  /** 协议类型 */
  contractType: string
  /** 版本号 */
  version: string
  /** 协议标题 */
  title: string
  /** 协议内容（完整文本） */
  content: string
  /** 模板状态 */
  status: TemplateStatus
  /** 生效日期 */
  effectiveDate: string
  /** 创建时间 */
  createdAt: string
  /** 创建人 */
  createdBy: string
  /** 最后修改时间 */
  updatedAt?: string
  /** 最后修改人 */
  updatedBy?: string
  /** 使用次数（多少个商家签署了这个版本） */
  usageCount: number
}

// ==================== 签约记录 ====================

/**
 * 签约记录
 */
export interface SigningRecord {
  /** 签约记录ID */
  recordId: string
  /** 关联的申请ID */
  applicationId: string
  /** 酒店名称 */
  hotelName: string
  /** 使用的协议模板ID */
  templateId: string
  /** 协议类型 */
  contractType: string
  /** 协议版本 */
  version: string
  /** 签约人 */
  signerName: string
  /** 签约账号（手机号） */
  signerPhone: string
  /** 签约时间 */
  signedAt: string
  /** 签约IP */
  signerIp?: string
  /** 协议内容快照（签约时的协议内容，防止模板后续修改） */
  contractSnapshot: string
  /** 操作人（平台方） */
  operatorName: string
}

// ==================== 查询参数 ====================

/**
 * 协议模板查询参数
 */
export interface TemplateQuery {
  /** 协议类型 */
  contractType?: string
  /** 模板状态 */
  status?: TemplateStatus
}

/**
 * 签约记录查询参数
 */
export interface SigningRecordQuery {
  /** 酒店名称模糊搜索 */
  hotelName?: string
  /** 签约时间范围（开始） */
  signedStart?: string
  /** 签约时间范围（结束） */
  signedEnd?: string
  /** 协议版本 */
  version?: string
}
