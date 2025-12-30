/**
 * 会员服务相关 API
 */

import type {
  PointsServiceConfig,
} from '@/types/memberService'
import {
  mockPointsServiceConfig,
} from '@/mocks/memberService.mock'

/**
 * 获取积分服务配置
 */
export function getPointsServiceConfig(): Promise<PointsServiceConfig> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPointsServiceConfig)
    }, 300)
  })
}

/**
 * 生成代客下单付款码
 * @param orderData - 订单数据对象
 * @returns Promise<{qrCodeUrl: string}> - 返回二维码图片URL（Base64格式）
 */
export function generateAgentOrderQRCode(orderData: any): Promise<{ qrCodeUrl: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // TODO: 接入真实API生成付款二维码
      resolve({
        qrCodeUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      })
    }, 300)
  })
}
