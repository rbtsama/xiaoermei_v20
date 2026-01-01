/**
 * 优惠券相关常量定义
 * 统一管理优惠券类型、状态、操作等映射关系
 */

/**
 * 优惠券类型映射
 */
export const COUPON_TYPE_MAP: Record<string, string> = {
  full_reduction: '满减券',
  discount: '折扣券',
  instant_reduction: '立减券'
}

/**
 * 优惠券状态映射
 */
export const COUPON_STATUS_MAP: Record<string, string> = {
  draft: '草稿',
  active: '已启用',
  inactive: '已停用',
  expired: '已过期'
}

/**
 * 优惠券发放方式映射
 */
export const DISTRIBUTION_METHOD_MAP: Record<string, string> = {
  manual: '手动发放',
  auto: '自动发放',
  batch: '批量发放'
}

/**
 * 优惠券操作类型映射
 */
export const OPERATION_TYPE_MAP: Record<string, string> = {
  create: '创建',
  edit: '编辑',
  delete: '删除',
  enable: '启用',
  disable: '停用',
  issue: '发放'
}

/**
 * 发放状态映射
 */
export const ISSUE_STATUS_MAP: Record<string, string> = {
  pending: '待发放',
  processing: '发放中',
  completed: '已完成',
  failed: '失败'
}
