/**
 * 用户管理类型定义
 */

// 会员等级
export type MemberLevel = '普通会员' | '银卡会员' | '金卡会员' | '白金会员' | '钻石会员'

// 用户状态
export type UserStatus = 'active' | 'disabled'

// 用户基本信息
export interface User {
  userId: string
  nickname: string // 微信昵称，可为空
  phone: string
  memberLevel: MemberLevel
  currentPoints: number
  registeredAt: string
  status: UserStatus
}

// 用户完整信息（详情页）
export interface UserDetail extends User {
  // 会员信息
  memberInfo: {
    level: MemberLevel
    levelProgress: {
      current: number // 当前累计消费金额
      required: number // 升级所需金额
      percentage: number // 进度百分比
    }
    retentionProgress: {
      current: number // 本年度消费金额
      required: number // 保级所需金额
      percentage: number // 进度百分比
    }
    validUntil: string // 会员有效期
    joinedAt: string // 成为会员时间
  }
  // 积分信息
  pointsInfo: {
    current: number // 当前积分
    totalEarned: number // 累计获得
    totalSpent: number // 累计消耗
    deductibleAmount: number // 可抵扣金额
    lastUpdated: string // 最后更新时间
  }
  // 订单历史
  recentOrders: OrderSummary[]
}

// 订单摘要
export interface OrderSummary {
  orderId: string
  hotelName: string
  roomType: string
  checkIn: string
  checkOut: string
  amount: number
  pointsEarned: number
  status: 'completed' | 'cancelled' | 'upcoming'
}

// 用户筛选参数
export interface UserFilterParams {
  search?: string // 搜索关键词（用户ID、手机号、昵称）
  memberLevel?: MemberLevel // 会员等级筛选
  status?: UserStatus // 状态筛选
  registeredFrom?: string // 注册起始日期
  registeredTo?: string // 注册结束日期
}

// 积分调整记录
export interface PointsAdjustmentRecord {
  id: string
  userId: string
  userNickname: string // 用户昵称，可为空
  amount: number // 正数为增加，负数为减少
  reason: string
  operator: string
  operatedAt: string
}

// 等级调整记录
export interface LevelAdjustmentRecord {
  id: string
  userId: string
  userNickname: string // 用户昵称，可为空
  fromLevel: MemberLevel
  toLevel: MemberLevel
  reason: string
  operator: string
  operatedAt: string
}
