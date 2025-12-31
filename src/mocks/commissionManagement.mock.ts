/**
 * 平台后台 - 分销管理 Mock 数据
 */

import type { CommissionRecord } from '@/types/memberService'
import { OrderStatus } from '@/types/memberService'

/**
 * 分销奖励记录 Mock（平台后台，包含商户名称）
 */
export const mockPlatformCommissionRecords: CommissionRecord[] = [
  {
    id: 'commission-1',
    merchantName: '西湖山居民宿',
    inviteePhone: '13912345678',
    orderNo: '20251230100001',
    orderStatus: OrderStatus.CHECKED_OUT,
    customerName: '张三'
  },
  {
    id: 'commission-2',
    merchantName: '原乡芦茨',
    inviteePhone: '13734567890',
    orderNo: '20251230100002',
    orderStatus: OrderStatus.CHECKED_OUT,
    customerName: '李四'
  },
  {
    id: 'commission-3',
    merchantName: '西湖山居民宿',
    inviteePhone: '13912345678',
    orderNo: '20251229100001',
    orderStatus: OrderStatus.CHECKED_OUT,
    customerName: '张三'
  },
  {
    id: 'commission-4',
    merchantName: '莫干山云上',
    inviteePhone: '13556789012',
    orderNo: '20251229100002',
    orderStatus: OrderStatus.CHECKED_OUT,
    customerName: '王五'
  },
  {
    id: 'commission-5',
    merchantName: '原乡芦茨',
    inviteePhone: '13734567890',
    orderNo: '20251228100001',
    orderStatus: OrderStatus.CHECKED_OUT,
    customerName: '李四'
  },
  {
    id: 'commission-6',
    merchantName: '千岛湖度假村',
    inviteePhone: '13378901234',
    orderNo: '20251228100002',
    orderStatus: OrderStatus.CHECKED_OUT,
    customerName: '赵六'
  },
  {
    id: 'commission-7',
    merchantName: '西湖山居民宿',
    inviteePhone: '13289012345',
    orderNo: '20251227100001',
    orderStatus: OrderStatus.CHECKED_OUT,
    customerName: '孙七'
  },
  {
    id: 'commission-8',
    merchantName: '莫干山云上',
    inviteePhone: '13912345678',
    orderNo: '20251227100002',
    orderStatus: OrderStatus.CHECKED_OUT,
    customerName: '张三'
  },
  {
    id: 'commission-9',
    merchantName: '千岛湖度假村',
    inviteePhone: '13734567890',
    orderNo: '20251226100001',
    orderStatus: OrderStatus.CHECKED_OUT,
    customerName: '李四'
  },
  {
    id: 'commission-10',
    merchantName: '原乡芦茨',
    inviteePhone: '13556789012',
    orderNo: '20251226100002',
    orderStatus: OrderStatus.CHECKED_OUT,
    customerName: '王五'
  }
]
