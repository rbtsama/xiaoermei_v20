/**
 * 积分规则配置 - 修改记录Mock数据
 */

import type { ChangeLogEntry } from '~/pages/SharedTypes/changeLog.types'

export const pointsRuleChangeLogs: ChangeLogEntry[] = [
  {
    id: '1',
    changes: [
      { field: '注册奖励积分', oldValue: '50积分', newValue: '100积分' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/22 10:30:15'
  },
  {
    id: '2',
    changes: [
      { field: '邀请奖励积分', oldValue: '30积分', newValue: '50积分' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/20 14:20:30'
  },
  {
    id: '3',
    changes: [
      { field: '积分兑换汇率', oldValue: '50积分 = 1元', newValue: '100积分 = 1元' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/18 16:45:10'
  },
  {
    id: '4',
    changes: [
      { field: '注册奖励积分', oldValue: '100积分', newValue: '50积分' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/15 09:15:22'
  },
  {
    id: '5',
    changes: [
      { field: '积分兑换汇率', oldValue: '100积分 = 1元', newValue: '50积分 = 1元' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/10 11:20:18'
  },
  {
    id: '6',
    changes: [
      { field: '邀请奖励积分', oldValue: '50积分', newValue: '30积分' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/08 15:10:45'
  },
  {
    id: '7',
    changes: [
      { field: '注册奖励积分', oldValue: '0积分', newValue: '100积分' },
      { field: '邀请奖励积分', oldValue: '0积分', newValue: '50积分' }
    ],
    operator: '兔子',
    operatedAt: '2025/01/05 08:00:00'
  }
]
