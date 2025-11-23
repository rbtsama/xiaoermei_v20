/**
 * 修改记录通用类型定义
 */

export interface ChangeLogEntry {
  id: string
  changes: ChangeDetail[] // 修改内容列表
  operator: string // 修改人
  operatedAt: string // 修改时间 (格式: 2025/5/31 23:17:14)
}

export interface ChangeDetail {
  field: string // 字段名称（中文）
  oldValue: string // 修改前的值
  newValue: string // 修改后的值
}

export interface ChangeLogPagination {
  total: number // 总记录数
  pageSize: number // 每页条数
  currentPage: number // 当前页码
  totalPages: number // 总页数
  data: ChangeLogEntry[] // 当前页数据
}
