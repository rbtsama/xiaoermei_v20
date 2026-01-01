/**
 * 格式化工具函数
 * 统一的日期、时间、数字格式化方法
 */

import dayjs from 'dayjs'

/**
 * 格式化日期（YYYY-MM-DD）
 * @param datetime 日期时间字符串
 * @returns 格式化后的日期，如：2025-12-06
 */
export function formatDate(datetime: string | undefined | null): string {
  if (!datetime) return '-'
  return dayjs(datetime).format('YYYY-MM-DD')
}

/**
 * 格式化时间（HH:mm:ss）
 * @param datetime 日期时间字符串
 * @returns 格式化后的时间，如：14:30:25
 */
export function formatTime(datetime: string | undefined | null): string {
  if (!datetime) return '-'
  return dayjs(datetime).format('HH:mm:ss')
}

/**
 * 格式化日期时间（YYYY-MM-DD HH:mm:ss）
 * @param datetime 日期时间字符串
 * @returns 格式化后的日期时间，如：2025-12-06 14:30:25
 */
export function formatDateTime(datetime: string | undefined | null): string {
  if (!datetime) return '-'
  return dayjs(datetime).format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 格式化金额（保留两位小数）
 * @param amount 金额数字
 * @returns 格式化后的金额，如：¥1,234.56
 */
export function formatAmount(amount: number | undefined | null): string {
  if (amount === undefined || amount === null) return '-'
  return `¥${amount.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

/**
 * 格式化百分比
 * @param value 数值（0-100）
 * @returns 格式化后的百分比，如：95.5%
 */
export function formatPercent(value: number | undefined | null): string {
  if (value === undefined || value === null) return '-'
  return `${value}%`
}
