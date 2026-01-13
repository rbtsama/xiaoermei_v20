/**
 * 活动管理 - Mock数据
 */

import type { Activity } from '../../types/activity.types'

/**
 * Mock活动列表（8条数据）
 * 状态分布：4个已启用 / 4个已禁用
 */
export const mockActivities: Activity[] = [
  // ==================== 已启用的活动（4个）====================
  {
    id: 'act1000',
    name: '新春活动',
    startTime: '2026-02-01 00:00:00',
    endTime: '2026-02-14 23:59:59',
    status: 'enabled',
    participationConditions: ['VIP0', 'VIP1', 'VIP2', 'VIP3'],
    platformBudget: 100000,
    remainingBudget: 3982.72,
    strategies: [
      { name: '策略1', platformDiscount: 25, merchantDiscount: 25 },
      { name: '策略2', platformDiscount: 25, merchantDiscount: 0 },
      { name: '策略3', platformDiscount: 25, merchantDiscount: 25 }
    ],
    applicableStores: ['store-001', 'store-004', 'store-005'],
    bookingRestrictions: [
      { dateRange: ['2026-02-01', '2026-02-09'], strategyName: '策略1' },
      { dateRange: ['2026-02-10', '2026-02-14'], strategyName: '策略2' }
    ],
    createdAt: '2025-12-28 10:00:00',
    createdBy: '张明'
  },
  {
    id: 'act1001',
    name: '踏青特惠',
    startTime: '2026-03-01 00:00:00',
    endTime: '2026-03-31 23:59:59',
    status: 'enabled',
    participationConditions: ['VIP1', 'VIP2', 'VIP3'],
    platformBudget: 50000,
    remainingBudget: 15000,
    strategies: [
      { name: '策略1', platformDiscount: 20, merchantDiscount: 15 },
      { name: '策略2', platformDiscount: 30, merchantDiscount: 10 }
    ],
    applicableStores: ['store-002', 'store-003', 'store-006'],
    bookingRestrictions: [
      { dateRange: ['2026-03-01', '2026-03-15'], strategyName: '策略1' },
      { dateRange: ['2026-03-16', '2026-03-31'], strategyName: '策略2' }
    ],
    createdAt: '2026-01-05 14:30:00',
    createdBy: '李娜'
  },
  {
    id: 'act1002',
    name: '清明小长假',
    startTime: '2026-04-03 00:00:00',
    endTime: '2026-04-05 23:59:59',
    status: 'enabled',
    participationConditions: ['VIP2', 'VIP3'],
    platformBudget: 80000,
    remainingBudget: 52800,
    strategies: [
      { name: '策略1', platformDiscount: 30, merchantDiscount: 20 }
    ],
    applicableStores: ['store-001', 'store-002', 'store-003', 'store-004'],
    bookingRestrictions: [
      { dateRange: ['2026-04-03', '2026-04-05'], strategyName: '策略1' }
    ],
    createdAt: '2026-01-10 09:15:00',
    createdBy: '王强'
  },
  {
    id: 'act1003',
    name: '五一黄金周',
    startTime: '2026-05-01 00:00:00',
    endTime: '2026-05-05 23:59:59',
    status: 'enabled',
    participationConditions: ['VIP0', 'VIP1', 'VIP2', 'VIP3', 'VIP4'],
    platformBudget: 200000,
    remainingBudget: 185000,
    strategies: [
      { name: '策略1', platformDiscount: 15, merchantDiscount: 10 },
      { name: '策略2', platformDiscount: 20, merchantDiscount: 15 },
      { name: '策略3', platformDiscount: 25, merchantDiscount: 20 }
    ],
    applicableStores: ['store-001', 'store-002', 'store-003', 'store-004', 'store-005'],
    bookingRestrictions: [
      { dateRange: ['2026-05-01', '2026-05-02'], strategyName: '策略1' },
      { dateRange: ['2026-05-03', '2026-05-04'], strategyName: '策略2' },
      { dateRange: ['2026-05-05', '2026-05-05'], strategyName: '策略3' }
    ],
    createdAt: '2026-01-08 11:00:00',
    createdBy: '张明'
  },

  // ==================== 已禁用的活动（4个）====================
  {
    id: 'act1004',
    name: '元旦迎新',
    startTime: '2026-01-01 00:00:00',
    endTime: '2026-01-03 23:59:59',
    status: 'disabled',
    participationConditions: ['VIP1', 'VIP2', 'VIP3'],
    platformBudget: 60000,
    remainingBudget: 8500,
    strategies: [
      { name: '策略1', platformDiscount: 20, merchantDiscount: 20 }
    ],
    applicableStores: ['store-004', 'store-005', 'store-006'],
    bookingRestrictions: [
      { dateRange: ['2026-01-01', '2026-01-03'], strategyName: '策略1' }
    ],
    createdAt: '2025-11-20 10:00:00',
    createdBy: '王强'
  },
  {
    id: 'act1005',
    name: '寒假亲子游',
    startTime: '2026-01-20 00:00:00',
    endTime: '2026-02-15 23:59:59',
    status: 'disabled',
    participationConditions: ['VIP0', 'VIP1', 'VIP2', 'VIP3'],
    platformBudget: 120000,
    remainingBudget: 45000,
    strategies: [
      { name: '策略1', platformDiscount: 18, merchantDiscount: 12 },
      { name: '策略2', platformDiscount: 22, merchantDiscount: 18 }
    ],
    applicableStores: ['store-007', 'store-008', 'store-009'],
    bookingRestrictions: [
      { dateRange: ['2026-01-20', '2026-01-31'], strategyName: '策略1' },
      { dateRange: ['2026-02-01', '2026-02-15'], strategyName: '策略2' }
    ],
    createdAt: '2025-12-05 13:45:00',
    createdBy: '李娜'
  },
  {
    id: 'act1006',
    name: '周年庆典',
    startTime: '2026-06-01 00:00:00',
    endTime: '2026-06-30 23:59:59',
    status: 'disabled',
    participationConditions: ['VIP0', 'VIP1', 'VIP2', 'VIP3', 'VIP4', 'VIP5'],
    platformBudget: 150000,
    remainingBudget: 150000,
    strategies: [
      { name: '策略1', platformDiscount: 28, merchantDiscount: 22 },
      { name: '策略2', platformDiscount: 25, merchantDiscount: 25 },
      { name: '策略3', platformDiscount: 30, merchantDiscount: 20 },
      { name: '策略4', platformDiscount: 20, merchantDiscount: 30 }
    ],
    applicableStores: ['store-001', 'store-002', 'store-003', 'store-004', 'store-005', 'store-006'],
    bookingRestrictions: [
      { dateRange: ['2026-06-01', '2026-06-10'], strategyName: '策略1' },
      { dateRange: ['2026-06-11', '2026-06-20'], strategyName: '策略2' },
      { dateRange: ['2026-06-21', '2026-06-30'], strategyName: '策略3' }
    ],
    createdAt: '2026-01-12 15:20:00',
    createdBy: '张明'
  },
  {
    id: 'act1007',
    name: '会员感恩月',
    startTime: '2026-07-01 00:00:00',
    endTime: '2026-07-31 23:59:59',
    status: 'disabled',
    participationConditions: ['VIP2', 'VIP3', 'VIP4', 'VIP5', 'VIP6'],
    platformBudget: 90000,
    remainingBudget: 90000,
    strategies: [
      { name: '策略1', platformDiscount: 15, merchantDiscount: 15 }
    ],
    applicableStores: ['store-004', 'store-005'],
    bookingRestrictions: [
      { dateRange: ['2026-07-01', '2026-07-31'], strategyName: '策略1' }
    ],
    createdAt: '2026-01-14 10:30:00',
    createdBy: '王强'
  },
  {
    id: 'act1008',
    name: '暑期特惠季',
    startTime: '2026-08-01 00:00:00',
    endTime: '2026-08-31 23:59:59',
    status: 'enabled',
    participationConditions: ['VIP5', 'VIP6', 'VIP7', 'VIP8', 'VIP9'],
    platformBudget: 180000,
    remainingBudget: 120000,
    strategies: [
      { name: '策略1', platformDiscount: 35.5, merchantDiscount: 20.5 },
      { name: '策略2', platformDiscount: 28.8, merchantDiscount: 25.2 }
    ],
    applicableStores: ['store-001', 'store-003', 'store-005', 'store-007', 'store-009'],
    bookingRestrictions: [
      { dateRange: ['2026-08-01', '2026-08-15'], strategyName: '策略1' },
      { dateRange: ['2026-08-16', '2026-08-31'], strategyName: '策略2' }
    ],
    createdAt: '2026-01-13 16:20:00',
    createdBy: '李娜'
  },
  {
    id: 'act1009',
    name: '中秋国庆双节',
    startTime: '2026-09-25 00:00:00',
    endTime: '2026-10-08 23:59:59',
    status: 'disabled',
    participationConditions: ['VIP0', 'VIP1', 'VIP2', 'VIP3', 'VIP4', 'VIP5', 'VIP6', 'VIP7', 'VIP8', 'VIP9'],
    platformBudget: 300000,
    remainingBudget: 300000,
    strategies: [
      { name: '策略1', platformDiscount: 25, merchantDiscount: 20 },
      { name: '策略2', platformDiscount: 30, merchantDiscount: 25 },
      { name: '策略3', platformDiscount: 35, merchantDiscount: 30 },
      { name: '策略4', platformDiscount: 40, merchantDiscount: 35 },
      { name: '策略5', platformDiscount: 22.5, merchantDiscount: 17.5 }
    ],
    applicableStores: ['store-001', 'store-002', 'store-003', 'store-004', 'store-005', 'store-006', 'store-007', 'store-008', 'store-009', 'store-010'],
    bookingRestrictions: [
      { dateRange: ['2026-09-25', '2026-09-29'], strategyName: '策略1' },
      { dateRange: ['2026-09-30', '2026-10-02'], strategyName: '策略2' },
      { dateRange: ['2026-10-03', '2026-10-05'], strategyName: '策略3' },
      { dateRange: ['2026-10-06', '2026-10-08'], strategyName: '策略4' }
    ],
    createdAt: '2026-01-14 14:45:00',
    createdBy: '张明'
  }
]
