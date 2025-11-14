/**
 * 账号管理系统类型定义
 * 参考：美团商家后台、携程EBK、华住PMS
 */

// ==================== 权限定义 ====================

/**
 * 菜单项（二级菜单）
 */
export interface MenuItem {
  /** 菜单ID（唯一标识） */
  menuId: string
  /** 一级菜单名称 */
  parentMenu: string
  /** 二级菜单名称 */
  menuName: string
  /** 路由路径 */
  path: string
}

/**
 * 权限类型
 */
export interface Permission {
  /** 菜单ID */
  menuId: string
  /** 查看权限 */
  canView: boolean
  /** 编辑权限 */
  canEdit: boolean
}

/**
 * 完整的权限配置（按菜单组织）
 */
export interface PermissionConfig {
  [menuId: string]: {
    canView: boolean
    canEdit: boolean
  }
}

// ==================== 账号定义 ====================

/**
 * 账号状态
 */
export enum AccountStatus {
  /** 启用 */
  ACTIVE = 'active',
  /** 已禁用 */
  DISABLED = 'disabled'
}

/**
 * 账号角色类型（简化为3种）
 */
export enum AccountRole {
  /** 超级管理员 */
  SUPER_ADMIN = 'super_admin',
  /** 管理员 */
  ADMIN = 'admin',
  /** 用户 */
  USER = 'user'
}

/**
 * 后台账号
 */
export interface Account {
  /** 账号ID */
  accountId: string
  /** 登录账号名 */
  username: string
  /** 密码（加密后） */
  password: string
  /** 真实姓名 */
  realName: string
  /** 部门 */
  department: string
  /** 角色 */
  role: AccountRole
  /** 账号状态 */
  status: AccountStatus
  /** 权限配置 */
  permissions: PermissionConfig
  /** 是否超级管理员 */
  isSuperAdmin: boolean
  /** 创建时间 */
  createdAt: string
  /** 创建人 */
  createdBy: string
  /** 最后修改时间 */
  updatedAt?: string
  /** 最后修改人 */
  updatedBy?: string
  /** 最后登录时间 */
  lastLoginAt?: string
}

// ==================== 操作日志 ====================

/**
 * 操作类型
 */
export enum OperationType {
  /** 创建账号 */
  CREATE_ACCOUNT = 'create_account',
  /** 更新账号信息 */
  UPDATE_ACCOUNT = 'update_account',
  /** 修改权限 */
  UPDATE_PERMISSION = 'update_permission',
  /** 启用账号 */
  ENABLE_ACCOUNT = 'enable_account',
  /** 禁用账号 */
  DISABLE_ACCOUNT = 'disable_account',
  /** 删除账号 */
  DELETE_ACCOUNT = 'delete_account',
  /** 修改密码 */
  CHANGE_PASSWORD = 'change_password',
  /** 重置密码 */
  RESET_PASSWORD = 'reset_password'
}

/**
 * 操作日志
 */
export interface OperationLog {
  /** 日志ID */
  logId: string
  /** 操作类型 */
  operationType: OperationType
  /** 目标账号ID */
  targetAccountId: string
  /** 目标账号名 */
  targetAccountName: string
  /** 操作内容描述 */
  description: string
  /** 变更详情（JSON格式记录变更前后） */
  changeDetail?: string
  /** 操作人账号ID */
  operatorId: string
  /** 操作人姓名 */
  operatorName: string
  /** 操作时间 */
  operatedAt: string
  /** 操作IP */
  operatorIp?: string
}

// ==================== 请求参数 ====================

/**
 * 创建账号请求
 */
export interface CreateAccountRequest {
  username: string
  password: string
  realName: string
  department: string
  role: AccountRole
  permissions: PermissionConfig
  operatorId: string
  operatorName: string
}

/**
 * 更新账号请求
 */
export interface UpdateAccountRequest {
  accountId: string
  realName?: string
  department?: string
  operatorId: string
  operatorName: string
}

/**
 * 更新权限请求
 */
export interface UpdatePermissionRequest {
  accountId: string
  permissions: PermissionConfig
  operatorId: string
  operatorName: string
}

/**
 * 修改密码请求
 */
export interface ChangePasswordRequest {
  accountId: string
  oldPassword: string
  newPassword: string
  operatorId: string
  operatorName: string
}

/**
 * 重置密码请求
 */
export interface ResetPasswordRequest {
  accountId: string
  newPassword: string
  operatorId: string
  operatorName: string
}

// ==================== 通用操作日志类型（所有模块复用） ====================

/**
 * 通用操作日志（可用于任何模块）
 */
export interface CommonOperationLog {
  /** 日志ID */
  logId: string
  /** 模块名称 */
  moduleName: string
  /** 操作类型 */
  operationType: string
  /** 操作内容 */
  description: string
  /** 操作人 */
  operatorName: string
  /** 操作时间 */
  operatedAt: string
}
