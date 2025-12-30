/**
 * 会员服务相关 API
 */

import type {
  PointsServiceConfig,
  InviteRecord,
} from '@/types/memberService'
import {
  mockPointsServiceConfig,
  mockInviteRecords,
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
 * 获取邀请记录列表
 */
export function getInviteRecords(): Promise<InviteRecord[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockInviteRecords)
    }, 300)
  })
}

/**
 * 生成邀请会员二维码
 */
export function generateInviteQRCode(): Promise<{ qrCodeUrl: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        qrCodeUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      })
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
