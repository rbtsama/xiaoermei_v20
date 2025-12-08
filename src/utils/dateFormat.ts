/**
 * 日期时间格式化工具函数
 * 统一全局日期时间格式化逻辑
 */

import dayjs from 'dayjs'

/**
 * 格式化日期（YYYY-MM-DD）
 * @param datetime - 日期时间字符串
 * @returns 格式化后的日期，无效值返回 '-'
 */
export function formatDate(datetime: string | null | undefined): string {
  if (!datetime) return '-'
  return dayjs(datetime).format('YYYY-MM-DD')
}

/**
 * 格式化时间（HH:mm:ss）
 * @param datetime - 日期时间字符串
 * @returns 格式化后的时间，无效值返回 '-'
 */
export function formatTime(datetime: string | null | undefined): string {
  if (!datetime) return '-'
  return dayjs(datetime).format('HH:mm:ss')
}

/**
 * 格式化完整日期时间（YYYY-MM-DD HH:mm:ss）
 * @param datetime - 日期时间字符串
 * @returns 格式化后的日期时间，无效值返回 '-'
 */
export function formatDateTime(datetime: string | null | undefined): string {
  if (!datetime) return '-'
  return dayjs(datetime).format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 格式化日期时间（用于文件名，YYYYMMDD-HHmmss）
 * @param datetime - 日期时间字符串，不传则使用当前时间
 * @returns 格式化后的日期时间
 */
export function formatDateTimeForFilename(datetime?: string | null): string {
  if (!datetime) return dayjs().format('YYYYMMDD-HHmmss')
  return dayjs(datetime).format('YYYYMMDD-HHmmss')
}
