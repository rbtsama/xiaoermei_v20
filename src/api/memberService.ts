/**
 * 会员服务相关 API
 */

import type {
  PointsServiceConfig,
  InviteRecord,
  CommissionRecord,
} from '@/types/memberService'
import {
  mockPointsServiceConfig,
  mockInviteRecords,
  mockCommissionRecords,
} from '@/mocks/memberService.mock'
import { mockPlatformCommissionRecords } from '@/mocks/commissionManagement.mock'

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
 * 批量邀请会员
 * @param phones - 手机号数组
 * @param vipLevel - 赠送的VIP等级（0-3）
 */
export function batchInviteMembers(phones: string[], vipLevel: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // TODO: 接入真实API
      resolve()
    }, 500)
  })
}

/**
 * 获取邀请记录列表
 * @param page - 页码
 * @param pageSize - 每页数量
 */
export function getInviteRecords(page: number, pageSize: number): Promise<{ records: InviteRecord[], total: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * pageSize
      const end = start + pageSize
      resolve({
        records: mockInviteRecords.slice(start, end),
        total: mockInviteRecords.length
      })
    }, 300)
  })
}

/**
 * 获取分销奖励列表
 * @param page - 页码
 * @param pageSize - 每页数量
 */
export function getCommissionRecords(page: number, pageSize: number): Promise<{ records: CommissionRecord[], total: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 按离店时间倒序排列
      const sorted = [...mockCommissionRecords].sort((a, b) =>
        new Date(b.checkOutTime).getTime() - new Date(a.checkOutTime).getTime()
      )
      const start = (page - 1) * pageSize
      const end = start + pageSize
      resolve({
        records: sorted.slice(start, end),
        total: sorted.length
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

/**
 * 获取平台分销奖励列表（平台后台）
 * @param page - 页码
 * @param pageSize - 每页数量
 */
export function getPlatformCommissionRecords(page: number, pageSize: number): Promise<{ records: CommissionRecord[], total: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 按离店时间倒序排列
      const sorted = [...mockPlatformCommissionRecords].sort((a, b) =>
        new Date(b.checkOutTime).getTime() - new Date(a.checkOutTime).getTime()
      )
      const start = (page - 1) * pageSize
      const end = start + pageSize
      resolve({
        records: sorted.slice(start, end),
        total: sorted.length
      })
    }, 300)
  })
}

/**
 * 导出分销奖励数据（平台后台）
 */
export function exportCommissionRecords(): Promise<Blob> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // TODO: 接入真实API导出Excel
      const csvContent = '商户名称,订单号,受邀会员,下单时间,支付金额\n'
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      resolve(blob)
    }, 500)
  })
}
