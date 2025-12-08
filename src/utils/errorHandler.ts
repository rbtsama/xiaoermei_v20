/**
 * 统一错误处理工具
 * 提供一致的错误日志和用户提示
 */

import { message } from 'ant-design-vue'

/**
 * 处理错误
 * @param error - 错误对象
 * @param userMessage - 展示给用户的错误消息
 * @param consoleLog - 是否在控制台输出（生产环境可配置为false）
 */
export function handleError(
  error: Error | any,
  userMessage: string,
  consoleLog: boolean = true
): void {
  if (consoleLog) {
    console.error(`[Error] ${userMessage}:`, error)
  }
  message.error(userMessage)
}

/**
 * 处理成功消息
 * @param successMessage - 成功提示消息
 */
export function handleSuccess(successMessage: string): void {
  message.success(successMessage)
}

/**
 * 处理警告消息
 * @param warningMessage - 警告提示消息
 */
export function handleWarning(warningMessage: string): void {
  message.warning(warningMessage)
}

/**
 * 处理信息消息
 * @param infoMessage - 信息提示消息
 */
export function handleInfo(infoMessage: string): void {
  message.info(infoMessage)
}
