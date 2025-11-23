/**
 * 修改记录 Mock 数据
 */

import type { ChangeLogEntry, ChangeLogPagination } from './changeLog.types'

// 会员等级设置修改记录示例
export const mockMemberLevelChangeLogs: ChangeLogEntry[] = [
  {
    id: '1',
    changes: [
      { field: '当前折扣', oldValue: '85%', newValue: '90%' },
      { field: '积分汇率', oldValue: '1 : 1', newValue: '1 : 1.2' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/15 14:23:10'
  },
  {
    id: '2',
    changes: [
      { field: '等级名称', oldValue: 'VIP会员', newValue: 'VIP1' },
      { field: '升级条件', oldValue: '预订3次及以上', newValue: '预订1次及以上' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/10 09:15:30'
  },
  {
    id: '3',
    changes: [
      { field: '折扣范围', oldValue: '85% ~ 95%', newValue: '80% ~ 95%' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/08 16:45:22'
  },
  {
    id: '4',
    changes: [
      { field: '升级奖励', oldValue: '0套', newValue: '1套' },
      { field: '会员权益', oldValue: '享受订房折扣', newValue: '享受订房折扣、额外积分奖励' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/05 11:30:45'
  },
  {
    id: '5',
    changes: [
      { field: '有效期', oldValue: '1年', newValue: '2年' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/03 10:20:15'
  },
  {
    id: '6',
    changes: [
      { field: '消费金额要求', oldValue: '¥300', newValue: '¥500' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/02 15:10:33'
  },
  {
    id: '7',
    changes: [
      { field: '状态', oldValue: '停用', newValue: '启用' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/01 08:00:00'
  },
  {
    id: '8',
    changes: [
      { field: '预订次数要求', oldValue: '0次', newValue: '1次' },
      { field: '折扣范围', oldValue: '0% ~ 0%', newValue: '80% ~ 95%' }
    ],
    operator: '兔子',
    operatedAt: '2024/12/30 17:25:50'
  },
  {
    id: '9',
    changes: [
      { field: '等级名称', oldValue: '普通会员', newValue: 'VIP会员' }
    ],
    operator: '兔子',
    operatedAt: '2024/12/28 13:40:20'
  },
  {
    id: '10',
    changes: [
      { field: '积分汇率', oldValue: '1 : 0.5', newValue: '1 : 1' }
    ],
    operator: '兔子',
    operatedAt: '2024/12/25 10:15:08'
  },
  {
    id: '11',
    changes: [
      { field: '当前折扣', oldValue: '95%', newValue: '85%' }
    ],
    operator: '兔子',
    operatedAt: '2024/12/20 14:50:12'
  },
  {
    id: '12',
    changes: [
      { field: '会员权益', oldValue: '基础权益', newValue: '享受订房折扣' }
    ],
    operator: '兔子',
    operatedAt: '2024/12/15 09:30:45'
  }
]

// 积分规则配置修改记录示例
export const mockPointsRuleChangeLogs: ChangeLogEntry[] = [
  {
    id: '1',
    changes: [
      { field: '消费兑换比例', oldValue: '1元 = 1积分', newValue: '1元 = 2积分' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/20 10:30:15'
  },
  {
    id: '2',
    changes: [
      { field: '积分有效期', oldValue: '1年', newValue: '2年' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/18 14:20:30'
  },
  {
    id: '3',
    changes: [
      { field: '兑换比例', oldValue: '100积分 = 1元', newValue: '100积分 = 2元' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/15 16:45:10'
  }
]

/**
 * 获取分页的修改记录
 */
export function getChangeLogsPaginated(
  logs: ChangeLogEntry[],
  page: number = 1,
  pageSize: number = 10
): ChangeLogPagination {
  const total = logs.length
  const totalPages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const data = logs.slice(start, end)

  return {
    total,
    pageSize,
    currentPage: page,
    totalPages,
    data
  }
}
