/**
 * 会员等级设置 - 修改记录Mock数据
 */

import type { ChangeLogEntry } from '~/pages/SharedTypes/changeLog.types'

export const memberLevelsChangeLogs: ChangeLogEntry[] = [
  {
    id: '1',
    changes: [
      { field: 'VIP1 展示名称', oldValue: 'VIP会员', newValue: 'VIP1' },
      { field: 'VIP1 升级间夜', oldValue: '1次', newValue: '3次' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/20 14:23:10'
  },
  {
    id: '2',
    changes: [
      { field: 'VIP2 折扣范围', oldValue: '85% ~ 95%', newValue: '80% ~ 90%' },
      { field: 'VIP2 积分汇率', oldValue: '1.2', newValue: '1.5' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/18 10:15:30'
  },
  {
    id: '3',
    changes: [
      { field: 'VIP3 保级间夜', oldValue: '2次', newValue: '3次' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/15 16:45:22'
  },
  {
    id: '4',
    changes: [
      { field: 'VIP5 有效期', oldValue: '365天', newValue: '730天' },
      { field: 'VIP5 积分汇率', oldValue: '2.5', newValue: '3.0' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/12 11:30:45'
  },
  {
    id: '5',
    changes: [
      { field: 'VIP0 状态', oldValue: '禁用', newValue: '启用' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/10 15:20:15'
  },
  {
    id: '6',
    changes: [
      { field: 'VIP9 折扣范围', oldValue: '50% ~ 75%', newValue: '45% ~ 70%' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/08 09:10:33'
  },
  {
    id: '7',
    changes: [
      { field: 'VIP1 状态', oldValue: '启用', newValue: '禁用' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/05 17:00:00'
  },
  {
    id: '8',
    changes: [
      { field: 'VIP4 升级间夜', oldValue: '10次', newValue: '12次' },
      { field: 'VIP4 保级间夜', oldValue: '3次', newValue: '4次' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/03 14:25:50'
  },
  {
    id: '9',
    changes: [
      { field: 'VIP7 有效期', oldValue: '730天', newValue: '1095天' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/01 13:40:20'
  },
  {
    id: '10',
    changes: [
      { field: 'VIP6 积分汇率', oldValue: '3.0', newValue: '3.5' }
    ],
    operator: '兔子',
    operatedAt: '2024/12/28 10:15:08'
  },
  {
    id: '11',
    changes: [
      { field: 'VIP8 折扣范围', oldValue: '55% ~ 80%', newValue: '50% ~ 75%' }
    ],
    operator: '兔子',
    operatedAt: '2024/12/25 09:50:12'
  },
  {
    id: '12',
    changes: [
      { field: 'VIP2 状态', oldValue: '禁用', newValue: '启用' }
    ],
    operator: '兔子',
    operatedAt: '2024/12/20 16:30:45'
  }
]
