/**
 * 商户端 - 邀请会员 Mock 数据
 */

import type { InviteRecord } from '../../types/inviteMember.types'

/**
 * 邀请记录 Mock
 * 说明：受邀人在接受邀请后生成记录，显示为用户ID
 */
export const mockInviteRecords: InviteRecord[] = [
  {
    id: 'invite-1',
    inviteeId: '100086',
    invitedAt: '2025/11/24 15:30:25',
  },
  {
    id: 'invite-2',
    inviteeId: '100087',
    invitedAt: '2025/11/24 14:20:15',
  },
  {
    id: 'invite-3',
    inviteeId: '100088',
    invitedAt: '2025/11/24 12:45:50',
  },
  {
    id: 'invite-4',
    inviteeId: '100089',
    invitedAt: '2025/11/24 11:10:35',
  },
  {
    id: 'invite-5',
    inviteeId: '100090',
    invitedAt: '2025/11/24 09:25:10',
  },
  {
    id: 'invite-6',
    inviteeId: '100091',
    invitedAt: '2025/11/23 18:50:22',
  },
  {
    id: 'invite-7',
    inviteeId: '100092',
    invitedAt: '2025/11/23 16:35:40',
  },
  {
    id: 'invite-8',
    inviteeId: '100093',
    invitedAt: '2025/11/23 14:15:30',
  },
]
