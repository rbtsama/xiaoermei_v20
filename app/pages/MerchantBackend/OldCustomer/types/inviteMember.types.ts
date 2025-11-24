/**
 * 商户端 - 邀请会员类型定义
 */

/**
 * 邀请记录
 * 说明：受邀人在接受邀请后生成记录，显示为用户ID
 */
export interface InviteRecord {
  id: string
  inviteeId: string // 受邀人用户ID（6位数字格式）
  invitedAt: string // 接受邀请时间
}
