/**
 * 优惠券管理 - 类型定义
 *
 * 本文件定义了优惠券管理系统的所有TypeScript类型
 * 包括：优惠券、场景发放、发放记录、操作日志等
 */

/**
 * 优惠券类型枚举
 * - full_reduction: 满减券（满X元减Y元）
 * - discount: 折扣券（打X折，最高优惠Y元）
 * - instant_reduction: 立减券（直接减Y元）
 */
export type CouponType = 'full_reduction' | 'discount' | 'instant_reduction'

/**
 * 优惠券状态枚举
 * - enabled: 已启用（可以发放和使用）
 * - disabled: 已停用（不可发放和使用）
 */
export type CouponStatus = 'enabled' | 'disabled'

/**
 * 发放类型枚举
 * - registration: 注册发放（新用户注册时自动发放）
 * - checkout: 离店发放（订单离店时自动发放）
 * - manual_vip: 手动发放-按VIP等级（后台手动按VIP等级批量发放）
 * - manual_phone: 手动发放-按手机号（后台手动按手机号批量发放）
 */
export type DistributionType = 'registration' | 'checkout' | 'manual_vip' | 'manual_phone'

/**
 * 手动发放方式枚举
 * - by_phone: 按手机号发放
 * - by_vip_level: 按VIP等级发放
 */
export type ManualDistributionMode = 'by_phone' | 'by_vip_level'

/**
 * 优惠券实体
 *
 * 代表一个完整的优惠券对象，包含所有必要信息
 */
export interface Coupon {
  /** 优惠券ID（格式：cp1000, cp1001...） */
  id: string
  /** 优惠券名称（用户可见，例如"新用户专享满300减50"） */
  name: string
  /** 优惠券类型 */
  type: CouponType

  // === 优惠内容（根据type不同，使用不同字段） ===
  /** 使用门槛金额（仅满减券使用） */
  threshold?: number
  /** 减免金额（满减券和立减券使用） */
  amount?: number
  /** 折扣率（仅折扣券使用，1-99表示几折，如85表示8.5折） */
  discount?: number
  /** 最高优惠金额（仅折扣券使用） */
  maxDiscount?: number

  // === 配置信息 ===
  /** 是否发送短信通知（true=发放时发送短信） */
  smsNotify: boolean
  /** 平台承担比例（0-100，例如50表示平台承担50%） */
  platformRatio: number
  /** 商户承担比例（自动计算 = 100 - platformRatio） */
  merchantRatio: number

  // === 有效期设置（validDays和validDateRange二选一） ===
  /** 有效天数（0=永久有效，其他=发放后N天23:59过期） */
  validDays?: number
  /** 有效日期范围（限制下单时间，格式：["2025-01-01", "2025-12-31"]） */
  validDateRange?: [string, string]
  /** 可订日期范围（限制入住日期，格式：["2025-01-01", "2025-12-31"]） */
  bookableDateRange?: [string, string]

  /** 库存数量（0=不限制，其他=可发放数量） */
  stock: number
  /** 使用规则说明（用户可见，例如"仅限周末使用"） */
  usageRules?: string
  /** 备注说明（仅后台可见，用于内部备注） */
  remark?: string

  // === 元数据 ===
  /** 当前状态 */
  status: CouponStatus
  /** 创建时间（格式："2025/01/16 10:30:00"） */
  createdAt: string
  /** 创建人（账号名） */
  createdBy: string
}

/**
 * 优惠券筛选参数
 *
 * 用于优惠券列表的搜索和筛选
 */
export interface CouponFilterParams {
  /** 搜索关键词（匹配优惠券名称） */
  search?: string
  /** 按类型筛选（'all'表示不筛选） */
  type?: CouponType | 'all'
  /** 按状态筛选（'all'表示不筛选） */
  status?: CouponStatus | 'all'
  /** 创建时间起始（格式："2025-01-01"） */
  createdFrom?: string
  /** 创建时间截止（格式："2025-12-31"） */
  createdTo?: string
}

/**
 * 场景发放配置
 *
 * 代表一个自动发放场景的配置信息
 * 当用户触发特定场景时，系统会自动发放关联的优惠券
 */
export interface SceneDistribution {
  /** 配置ID（格式：SD001, SD002...） */
  id: string
  /**
   * 场景类型
   * - registration: 注册场景
   * - checkout: 离店场景
   * - first_order: 首单场景
   * - birthday: 生日场景
   * - activity_scan: 活动扫码场景
   */
  scene: 'registration' | 'checkout' | 'first_order' | 'birthday' | 'activity_scan'
  /** 场景名称（显示用，例如"注册发放"） */
  sceneName: string
  /** 触发时机描述（例如"新用户完成注册时"） */
  triggerDescription: string
  /** 关联的优惠券ID（未配置时为null） */
  couponId: string | null
  /** 关联的优惠券名称（用于显示，未配置时为null） */
  couponName: string | null
  /** 关联的优惠券备注（用于显示，未配置时为null） */
  couponRemark: string | null
  /** 每人限领次数（0表示不限制） */
  limitPerUser: number
  /** 是否发送短信通知 */
  smsNotify: boolean
  /** 当前状态（enabled=已启用，disabled=已停用） */
  status: 'enabled' | 'disabled'
}

/**
 * 优惠券发放记录
 *
 * 记录每一次优惠券发放的详细信息
 */
export interface CouponRecord {
  /** 优惠券ID */
  couponId: string
  /** 优惠券类型 */
  couponType: CouponType
  /** 优惠券名称 */
  couponName: string
  /** 发放类型 */
  distributionType: DistributionType
  /**
   * 用户手机号
   * - 单个手机号发放：显示具体手机号（如"13812348888"）
   * - 批量发放：显示"多手机号"
   */
  userPhone: string
  /** VIP等级数组（仅按VIP发放时有值，例如：["VIP2", "VIP3"]） */
  vipLevels?: string[]
  /** 手机号数组（仅按手机号批量发放时有值） */
  phones?: string[]
  /** 操作时间（格式："2025/01/16 10:30:00"） */
  operatedAt: string
  /** 操作人（自动发放时为"system"，手动发放时为账号名） */
  operatedBy: string
}

/**
 * VIP等级
 *
 * 表示一个会员等级的基本信息
 */
export interface VipLevel {
  /** 等级ID（格式：VIP0, VIP1...） */
  id: string
  /** 等级名称（显示用） */
  name: string
  /** 等级数值（0-9） */
  level: number
}

/**
 * 分页参数
 *
 * 用于API请求时传递分页信息
 */
export interface PaginationParams {
  /** 当前页码（从1开始） */
  page: number
  /** 每页条数 */
  pageSize: number
}

/**
 * 分页结果
 *
 * API返回的分页数据结构
 */
export interface PaginatedResult<T> {
  /** 当前页数据列表 */
  data: T[]
  /** 总记录数 */
  total: number
  /** 当前页码 */
  page: number
  /** 每页条数 */
  pageSize: number
  /** 总页数 */
  totalPages: number
}

/**
 * 操作类型枚举
 * - create: 创建操作
 * - edit: 编辑操作
 */
export type CouponOperationType = 'create' | 'edit'

/**
 * 优惠券操作记录
 *
 * 记录优惠券的创建和编辑历史
 */
export interface CouponOperationLog {
  /** 日志ID（格式：LOG001, LOG002...） */
  id: string
  /** 关联的优惠券ID（例如："cp1003"） */
  couponId: string
  /** 操作类型 */
  operationType: CouponOperationType
  /**
   * 操作详细内容
   * - 创建时：显示"创建优惠券"
   * - 编辑时：显示字段变更详情（例如："备注说明：新人专享 → VIP专享"）
   */
  operationContent: string
  /** 操作时间（格式："2025/01/16 10:30:00"） */
  operatedAt: string
  /** 操作人（账号名） */
  operatedBy: string
}
