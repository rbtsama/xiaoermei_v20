/**
 * 账号管理 Mock 数据
 * 模拟真实酒店SAAS后台的账号体系
 */

import type { Account, MenuItem, OperationLog, PermissionConfig } from '../../types/account.types'
import { AccountStatus, AccountRole, OperationType } from '../../types/account.types'

// ==================== 系统菜单列表 ====================

export const mockMenuItems: MenuItem[] = [
  // 积分系统
  { menuId: 'points_rule', parentMenu: '积分系统', menuName: '积分规则配置', path: '/points-system/rule-config' },
  { menuId: 'points_user', parentMenu: '积分系统', menuName: '用户积分管理', path: '/points-system/user-account' },

  // 会员体系
  { menuId: 'member_level', parentMenu: '会员体系', menuName: '会员等级配置', path: '/member/level-config' },
  { menuId: 'member_benefits', parentMenu: '会员体系', menuName: '会员权益管理', path: '/member/benefits' },

  // 优惠券系统
  { menuId: 'coupon_config', parentMenu: '优惠券系统', menuName: '优惠券配置', path: '/coupon/config' },
  { menuId: 'coupon_grant', parentMenu: '优惠券系统', menuName: '优惠券发放', path: '/coupon/grant' },
  { menuId: 'coupon_verify', parentMenu: '优惠券系统', menuName: '核销记录', path: '/coupon/verify' },

  // 订单系统
  { menuId: 'order_list', parentMenu: '订单系统', menuName: '订单列表', path: '/order/list' },
  { menuId: 'order_detail', parentMenu: '订单系统', menuName: '订单详情', path: '/order/detail' },
  { menuId: 'order_refund', parentMenu: '订单系统', menuName: '退款管理', path: '/order/refund' },

  // 账号管理
  { menuId: 'account_list', parentMenu: '账号管理', menuName: '账号列表', path: '/account/list' }
]

// ==================== 权限预设模板 ====================

/** 超级管理员权限（全部权限） */
const superAdminPermissions: PermissionConfig = {
  points_rule: { canView: true, canEdit: true },
  points_user: { canView: true, canEdit: true },
  member_level: { canView: true, canEdit: true },
  member_benefits: { canView: true, canEdit: true },
  coupon_config: { canView: true, canEdit: true },
  coupon_grant: { canView: true, canEdit: true },
  coupon_verify: { canView: true, canEdit: true },
  order_list: { canView: true, canEdit: true },
  order_detail: { canView: true, canEdit: true },
  order_refund: { canView: true, canEdit: true },
  account_list: { canView: true, canEdit: true }
}

/** 运营经理权限（积分、会员、优惠券全权限） */
const operationManagerPermissions: PermissionConfig = {
  points_rule: { canView: true, canEdit: true },
  points_user: { canView: true, canEdit: true },
  member_level: { canView: true, canEdit: true },
  member_benefits: { canView: true, canEdit: true },
  coupon_config: { canView: true, canEdit: true },
  coupon_grant: { canView: true, canEdit: true },
  coupon_verify: { canView: true, canEdit: true },
  order_list: { canView: true, canEdit: false },
  order_detail: { canView: true, canEdit: false },
  order_refund: { canView: false, canEdit: false },
  account_list: { canView: false, canEdit: false }
}

/** 客服主管权限（用户积分、订单有权限） */
const customerServicePermissions: PermissionConfig = {
  points_rule: { canView: true, canEdit: false },
  points_user: { canView: true, canEdit: true },
  member_level: { canView: true, canEdit: false },
  member_benefits: { canView: true, canEdit: false },
  coupon_config: { canView: false, canEdit: false },
  coupon_grant: { canView: true, canEdit: true },
  coupon_verify: { canView: true, canEdit: false },
  order_list: { canView: true, canEdit: true },
  order_detail: { canView: true, canEdit: true },
  order_refund: { canView: true, canEdit: true },
  account_list: { canView: false, canEdit: false }
}

/** 财务专员权限（仅查看订单、积分数据） */
const financeStaffPermissions: PermissionConfig = {
  points_rule: { canView: true, canEdit: false },
  points_user: { canView: true, canEdit: false },
  member_level: { canView: false, canEdit: false },
  member_benefits: { canView: false, canEdit: false },
  coupon_config: { canView: false, canEdit: false },
  coupon_grant: { canView: false, canEdit: false },
  coupon_verify: { canView: true, canEdit: false },
  order_list: { canView: true, canEdit: false },
  order_detail: { canView: true, canEdit: false },
  order_refund: { canView: true, canEdit: false },
  account_list: { canView: false, canEdit: false }
}

/** 数据分析师权限（全部仅查看） */
const dataAnalystPermissions: PermissionConfig = {
  points_rule: { canView: true, canEdit: false },
  points_user: { canView: true, canEdit: false },
  member_level: { canView: true, canEdit: false },
  member_benefits: { canView: true, canEdit: false },
  coupon_config: { canView: true, canEdit: false },
  coupon_grant: { canView: true, canEdit: false },
  coupon_verify: { canView: true, canEdit: false },
  order_list: { canView: true, canEdit: false },
  order_detail: { canView: true, canEdit: false },
  order_refund: { canView: true, canEdit: false },
  account_list: { canView: false, canEdit: false }
}

// ==================== 预置账号（6个） ====================

export const mockAccounts: Account[] = [
  {
    accountId: 'ACC_000001',
    username: 'admin',
    password: 'hashed_admin_password_123', // 实际应该是加密后的密码
    realName: '张总',
    department: 'CEO办公室',
    role: AccountRole.SUPER_ADMIN,
    status: AccountStatus.ACTIVE,
    permissions: superAdminPermissions,
    isSuperAdmin: true,
    createdAt: '01/01/24 00:00:00',
    createdBy: '系统初始化',
    lastLoginAt: '01/15/25 09:30:00'
  },
  {
    accountId: 'ACC_000002',
    username: 'admin001',
    password: 'hashed_admin_password_456',
    realName: '李经理',
    department: '运营部',
    role: AccountRole.ADMIN,
    status: AccountStatus.ACTIVE,
    permissions: operationManagerPermissions,
    isSuperAdmin: false,
    createdAt: '02/15/24 10:00:00',
    createdBy: '张总',
    updatedAt: '01/10/25 14:20:00',
    updatedBy: '张总',
    lastLoginAt: '01/15/25 10:15:00'
  },
  {
    accountId: 'ACC_000003',
    username: 'admin002',
    password: 'hashed_admin_password_789',
    realName: '王主管',
    department: '客服部',
    role: AccountRole.ADMIN,
    status: AccountStatus.ACTIVE,
    permissions: customerServicePermissions,
    isSuperAdmin: false,
    createdAt: '03/20/24 11:00:00',
    createdBy: '张总',
    lastLoginAt: '01/15/25 08:45:00'
  },
  {
    accountId: 'ACC_000004',
    username: 'user001',
    password: 'hashed_user_password_101',
    realName: '赵会计',
    department: '财务部',
    role: AccountRole.USER,
    status: AccountStatus.ACTIVE,
    permissions: financeStaffPermissions,
    isSuperAdmin: false,
    createdAt: '04/10/24 09:30:00',
    createdBy: '张总',
    lastLoginAt: '01/14/25 16:00:00'
  },
  {
    accountId: 'ACC_000005',
    username: 'user002',
    password: 'hashed_user_password_202',
    realName: '刘分析师',
    department: '数据部',
    role: AccountRole.USER,
    status: AccountStatus.ACTIVE,
    permissions: dataAnalystPermissions,
    isSuperAdmin: false,
    createdAt: '05/15/24 10:00:00',
    createdBy: '张总',
    lastLoginAt: '01/15/25 11:30:00'
  },
  {
    accountId: 'ACC_000006',
    username: 'former_staff',
    password: 'hashed_former_password_303',
    realName: '陈专员',
    department: '运营部',
    role: AccountRole.ADMIN,
    status: AccountStatus.DISABLED,
    permissions: operationManagerPermissions,
    isSuperAdmin: false,
    createdAt: '06/01/24 09:00:00',
    createdBy: '张总',
    updatedAt: '12/20/24 17:00:00',
    updatedBy: '李经理',
    lastLoginAt: '12/19/24 18:30:00'
  }
]

// ==================== 操作日志 ====================

export const mockOperationLogs: OperationLog[] = [
  {
    logId: 'LOG_20250115001',
    operationType: OperationType.DISABLE_ACCOUNT,
    targetAccountId: 'ACC_000006',
    targetAccountName: '陈专员',
    description: '禁用账号：员工离职',
    operatorId: 'ACC_000002',
    operatorName: '李经理',
    operatedAt: '12/20/24 17:00:00',
    operatorIp: '192.168.1.100'
  },
  {
    logId: 'LOG_20250110002',
    operationType: OperationType.UPDATE_PERMISSION,
    targetAccountId: 'ACC_000002',
    targetAccountName: '李经理',
    description: '修改权限：增加优惠券配置编辑权限',
    changeDetail: JSON.stringify({
      before: { coupon_config: { canView: true, canEdit: false } },
      after: { coupon_config: { canView: true, canEdit: true } }
    }),
    operatorId: 'ACC_000001',
    operatorName: '张总',
    operatedAt: '01/10/25 14:20:00',
    operatorIp: '192.168.1.10'
  },
  {
    logId: 'LOG_20250105003',
    operationType: OperationType.CHANGE_PASSWORD,
    targetAccountId: 'ACC_000003',
    targetAccountName: '王主管',
    description: '修改密码',
    operatorId: 'ACC_000003',
    operatorName: '王主管',
    operatedAt: '01/05/25 09:15:00',
    operatorIp: '192.168.1.120'
  },
  {
    logId: 'LOG_20241225004',
    operationType: OperationType.CREATE_ACCOUNT,
    targetAccountId: 'ACC_000005',
    targetAccountName: '刘分析师',
    description: '创建账号：数据分析师',
    operatorId: 'ACC_000001',
    operatorName: '张总',
    operatedAt: '05/15/24 10:00:00',
    operatorIp: '192.168.1.10'
  }
]

// ==================== 角色名称映射 ====================

export const roleLabels: Record<AccountRole, string> = {
  [AccountRole.SUPER_ADMIN]: '超级管理员',
  [AccountRole.ADMIN]: '管理员',
  [AccountRole.USER]: '用户'
}

export const statusLabels: Record<AccountStatus, string> = {
  [AccountStatus.ACTIVE]: '启用',
  [AccountStatus.DISABLED]: '已禁用'
}
