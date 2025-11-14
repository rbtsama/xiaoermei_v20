/**
 * 账号管理服务层
 */

import type {
  Account,
  MenuItem,
  OperationLog,
  CreateAccountRequest,
  UpdateAccountRequest,
  UpdatePermissionRequest,
  ChangePasswordRequest,
  ResetPasswordRequest,
  PermissionConfig
} from '../types/account.types'
import { AccountStatus, OperationType } from '../types/account.types'
import { mockAccounts, mockMenuItems, mockOperationLogs } from './mocks'

class AccountService {
  private accounts: Account[] = [...mockAccounts]
  private menuItems: MenuItem[] = [...mockMenuItems]
  private operationLogs: OperationLog[] = [...mockOperationLogs]

  // ==================== 账号管理 ====================

  /**
   * 获取所有账号
   */
  async getAllAccounts(): Promise<Account[]> {
    await new Promise(resolve => setTimeout(resolve, 400))
    return this.accounts.map(acc => ({ ...acc }))
  }

  /**
   * 获取单个账号
   */
  async getAccountById(accountId: string): Promise<Account | null> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const account = this.accounts.find(acc => acc.accountId === accountId)
    return account ? { ...account } : null
  }

  /**
   * 创建账号
   */
  async createAccount(request: CreateAccountRequest): Promise<Account> {
    await new Promise(resolve => setTimeout(resolve, 600))

    // 检查用户名是否已存在
    if (this.accounts.find(acc => acc.username === request.username)) {
      throw new Error('用户名已存在')
    }

    const newAccount: Account = {
      accountId: `ACC_${String(Date.now()).slice(-6)}`,
      username: request.username,
      password: `hashed_${request.password}`, // 模拟密码加密
      realName: request.realName,
      department: request.department,
      role: request.role,
      status: AccountStatus.ACTIVE,
      permissions: request.permissions,
      isSuperAdmin: false,
      createdAt: new Date().toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(',', ''),
      createdBy: request.operatorName
    }

    this.accounts.push(newAccount)

    // 记录操作日志
    this.addOperationLog({
      operationType: OperationType.CREATE_ACCOUNT,
      targetAccountId: newAccount.accountId,
      targetAccountName: newAccount.realName,
      description: `创建账号：${newAccount.realName}（${newAccount.department}）`,
      operatorId: request.operatorId,
      operatorName: request.operatorName
    })

    return { ...newAccount }
  }

  /**
   * 更新账号信息
   */
  async updateAccount(request: UpdateAccountRequest): Promise<Account> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const index = this.accounts.findIndex(acc => acc.accountId === request.accountId)
    if (index === -1) throw new Error('账号不存在')

    const account = this.accounts[index]

    this.accounts[index] = {
      ...account,
      realName: request.realName || account.realName,
      department: request.department || account.department,
      updatedAt: new Date().toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(',', ''),
      updatedBy: request.operatorName
    }

    // 记录操作日志
    this.addOperationLog({
      operationType: OperationType.UPDATE_ACCOUNT,
      targetAccountId: request.accountId,
      targetAccountName: account.realName,
      description: `更新账号信息：${account.realName}`,
      operatorId: request.operatorId,
      operatorName: request.operatorName
    })

    return { ...this.accounts[index] }
  }

  /**
   * 更新账号权限
   */
  async updatePermission(request: UpdatePermissionRequest): Promise<Account> {
    await new Promise(resolve => setTimeout(resolve, 600))

    const index = this.accounts.findIndex(acc => acc.accountId === request.accountId)
    if (index === -1) throw new Error('账号不存在')

    const account = this.accounts[index]

    // 超级管理员不允许修改权限
    if (account.isSuperAdmin) {
      throw new Error('超级管理员权限不可修改')
    }

    const oldPermissions = { ...account.permissions }

    this.accounts[index] = {
      ...account,
      permissions: request.permissions,
      updatedAt: new Date().toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(',', ''),
      updatedBy: request.operatorName
    }

    // 记录操作日志
    this.addOperationLog({
      operationType: OperationType.UPDATE_PERMISSION,
      targetAccountId: request.accountId,
      targetAccountName: account.realName,
      description: `修改权限：${account.realName}`,
      changeDetail: JSON.stringify({ before: oldPermissions, after: request.permissions }),
      operatorId: request.operatorId,
      operatorName: request.operatorName
    })

    return { ...this.accounts[index] }
  }

  /**
   * 启用/禁用账号
   */
  async toggleAccountStatus(accountId: string, operatorId: string, operatorName: string): Promise<Account> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const index = this.accounts.findIndex(acc => acc.accountId === accountId)
    if (index === -1) throw new Error('账号不存在')

    const account = this.accounts[index]

    // 超级管理员不允许禁用
    if (account.isSuperAdmin) {
      throw new Error('超级管理员不可禁用')
    }

    const newStatus = account.status === AccountStatus.ACTIVE ? AccountStatus.DISABLED : AccountStatus.ACTIVE

    this.accounts[index] = {
      ...account,
      status: newStatus,
      updatedAt: new Date().toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(',', ''),
      updatedBy: operatorName
    }

    // 记录操作日志
    this.addOperationLog({
      operationType: newStatus === AccountStatus.ACTIVE ? OperationType.ENABLE_ACCOUNT : OperationType.DISABLE_ACCOUNT,
      targetAccountId: accountId,
      targetAccountName: account.realName,
      description: `${newStatus === AccountStatus.ACTIVE ? '启用' : '禁用'}账号：${account.realName}`,
      operatorId,
      operatorName
    })

    return { ...this.accounts[index] }
  }

  /**
   * 删除账号
   */
  async deleteAccount(accountId: string, operatorId: string, operatorName: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const index = this.accounts.findIndex(acc => acc.accountId === accountId)
    if (index === -1) throw new Error('账号不存在')

    const account = this.accounts[index]

    // 超级管理员不允许删除
    if (account.isSuperAdmin) {
      throw new Error('超级管理员不可删除')
    }

    // 记录操作日志
    this.addOperationLog({
      operationType: OperationType.DELETE_ACCOUNT,
      targetAccountId: accountId,
      targetAccountName: account.realName,
      description: `删除账号：${account.realName}（${account.department}）`,
      operatorId,
      operatorName
    })

    this.accounts.splice(index, 1)
  }

  /**
   * 修改密码
   */
  async changePassword(request: ChangePasswordRequest): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const index = this.accounts.findIndex(acc => acc.accountId === request.accountId)
    if (index === -1) throw new Error('账号不存在')

    const account = this.accounts[index]

    // 验证旧密码（简化处理）
    if (account.password !== `hashed_${request.oldPassword}`) {
      throw new Error('原密码错误')
    }

    // 密码强度检查（至少6位）
    if (request.newPassword.length < 6) {
      throw new Error('密码长度至少6位')
    }

    this.accounts[index] = {
      ...account,
      password: `hashed_${request.newPassword}`,
      updatedAt: new Date().toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(',', ''),
      updatedBy: request.operatorName
    }

    // 记录操作日志
    this.addOperationLog({
      operationType: OperationType.CHANGE_PASSWORD,
      targetAccountId: request.accountId,
      targetAccountName: account.realName,
      description: `修改密码`,
      operatorId: request.operatorId,
      operatorName: request.operatorName
    })
  }

  /**
   * 重置密码（管理员操作）
   */
  async resetPassword(request: ResetPasswordRequest): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const index = this.accounts.findIndex(acc => acc.accountId === request.accountId)
    if (index === -1) throw new Error('账号不存在')

    const account = this.accounts[index]

    // 超级管理员不允许被重置密码
    if (account.isSuperAdmin && request.operatorId !== account.accountId) {
      throw new Error('超级管理员密码只能自己修改')
    }

    this.accounts[index] = {
      ...account,
      password: `hashed_${request.newPassword}`,
      updatedAt: new Date().toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(',', ''),
      updatedBy: request.operatorName
    }

    // 记录操作日志
    this.addOperationLog({
      operationType: OperationType.RESET_PASSWORD,
      targetAccountId: request.accountId,
      targetAccountName: account.realName,
      description: `重置密码：${account.realName}`,
      operatorId: request.operatorId,
      operatorName: request.operatorName
    })
  }

  // ==================== 权限相关 ====================

  /**
   * 获取所有菜单项
   */
  async getMenuItems(): Promise<MenuItem[]> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return [...this.menuItems]
  }

  /**
   * 检查账号是否有某个菜单的权限
   */
  hasPermission(account: Account, menuId: string, type: 'view' | 'edit'): boolean {
    if (account.isSuperAdmin) return true
    if (!account.permissions[menuId]) return false
    return type === 'view' ? account.permissions[menuId].canView : account.permissions[menuId].canEdit
  }

  // ==================== 操作日志 ====================

  /**
   * 添加操作日志
   */
  private addOperationLog(params: {
    operationType: OperationType
    targetAccountId: string
    targetAccountName: string
    description: string
    changeDetail?: string
    operatorId: string
    operatorName: string
  }): void {
    const log: OperationLog = {
      logId: `LOG_${Date.now()}`,
      operationType: params.operationType,
      targetAccountId: params.targetAccountId,
      targetAccountName: params.targetAccountName,
      description: params.description,
      changeDetail: params.changeDetail,
      operatorId: params.operatorId,
      operatorName: params.operatorName,
      operatedAt: new Date().toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(',', ''),
      operatorIp: '192.168.1.' + Math.floor(Math.random() * 255) // 模拟IP
    }

    this.operationLogs.unshift(log)
  }

  /**
   * 获取操作日志（支持按账号筛选）
   */
  async getOperationLogs(targetAccountId?: string): Promise<OperationLog[]> {
    await new Promise(resolve => setTimeout(resolve, 300))

    if (targetAccountId) {
      return this.operationLogs.filter(log => log.targetAccountId === targetAccountId)
    }

    return [...this.operationLogs]
  }

  /**
   * 获取最近操作日志（用于页面底部显示）
   */
  async getRecentLogs(limit: number = 5): Promise<OperationLog[]> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.operationLogs.slice(0, limit)
  }
}

export default new AccountService()
