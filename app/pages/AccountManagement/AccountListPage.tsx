/**
 * 账号列表管理页面
 * 增删改查账号、配置权限、修改密码
 */

import { useState } from 'react'
import type { Account, MenuItem, OperationLog, PermissionConfig } from './types/account.types'
import { AccountStatus, AccountRole } from './types/account.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '../PointsSystem/components/MainLayout'

            {/* 筛选栏 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="flex gap-2">
                    <Button
                      variant={filterStatus === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterStatus('all')}
                    >
                      全部
                    </Button>
                    <Button
                      variant={filterStatus === 'active' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterStatus('active')}
                    >
                      启用中
                    </Button>
                    <Button
                      variant={filterStatus === 'disabled' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterStatus('disabled')}
                    >
                      已禁用
                    </Button>
                  </div>

                  <div className="flex-1">
                    <Input
                      placeholder="搜索账号或姓名..."
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                  </div>

                  <Button>+ 新增账号</Button>
                </div>
              </CardContent>
            </Card>

            {/* 账号列表 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>账号列表</CardTitle>
                    <CardDescription>共 {filteredAccounts.length} 个账号</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600">
                    📋 操作记录
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>账号</TableHead>
                      <TableHead>角色</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAccounts.map((account) => (
                      <TableRow key={account.accountId}>
                        <TableCell className="font-mono text-sm">
                          {account.username}
                          {account.isSuperAdmin && (
                            <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                              超管
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm">{roleLabels[account.role]}</TableCell>
                        <TableCell>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              account.status === AccountStatus.ACTIVE
                                ? 'bg-green-100 text-green-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {statusLabels[account.status]}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openPermissionDialog(account)}
                            >
                              配置权限
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openPasswordDialog(account)}
                            >
                              修改密码
                            </Button>
                            {!account.isSuperAdmin && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => alert(`${account.status === AccountStatus.ACTIVE ? '禁用' : '启用'}账号：${account.realName}`)}
                                >
                                  {account.status === AccountStatus.ACTIVE ? '禁用' : '启用'}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    if (confirm(`确定删除账号 ${account.realName} 吗？`)) {
                                      alert(`已删除账号：${account.realName}`)
                                    }
                                  }}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  删除
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 操作日志弹窗 */}
        <div className="hidden">
          {/* TODO: 操作日志弹窗，点击标题栏的"操作记录"按钮时显示 */}
        </div>

        {/* 权限配置弹窗 */}
        {showPermissionDialog && currentAccount && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>配置权限</CardTitle>
                    <CardDescription>
                      账号：{currentAccount.realName} ({currentAccount.username})
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setShowPermissionDialog(false)}>
                    ✕
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto pt-6">
                <div className="space-y-4">
                  {currentAccount.isSuperAdmin ? (
                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-center">
                      <p className="text-red-700 font-medium">超级管理员拥有全部权限，不可修改</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-slate-600">
                          为该账号分配菜单的查看和编辑权限（编辑权限自动包含查看权限）
                        </p>
                        <PermissionQuickActions
                          menuItems={menuItems}
                          onSelectAll={handleSelectAll}
                          onClearAll={handleClearAll}
                        />
                      </div>

                      <PermissionMatrix
                        menuItems={menuItems}
                        permissions={editingPermissions}
                        onChange={updatePermission}
                      />
                    </>
                  )}
                </div>
              </CardContent>

              <div className="border-t p-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowPermissionDialog(false)}>
                  取消
                </Button>
                {!currentAccount.isSuperAdmin && (
                  <Button onClick={handleSavePermission}>保存配置</Button>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* 修改密码弹窗 */}
        {showPasswordDialog && currentAccount && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>修改密码</CardTitle>
                <CardDescription>
                  账号：{currentAccount.realName} ({currentAccount.username})
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="oldPassword">原密码</Label>
                  <Input
                    id="oldPassword"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="请输入原密码"
                  />
                </div>

                <div>
                  <Label htmlFor="newPassword">新密码</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="至少6位字符"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    密码要求：至少6位字符
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded">
                  <p className="text-xs text-slate-600">
                    💡 提示：修改密码后需要重新登录
                  </p>
                </div>
              </CardContent>

              <div className="border-t p-4 flex gap-2">
                <Button variant="outline" onClick={() => setShowPasswordDialog(false)} className="flex-1">
                  取消
                </Button>
                <Button onClick={handleChangePassword} className="flex-1">
                  确认修改
                </Button>
              </div>
            </Card>
          </div>
        )}
        </div>
    </MainLayout>
  )
}
