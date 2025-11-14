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
import LogicPanel, { LogicTable, LogicList, LogicHighlight, LogicCode } from '../PointsSystem/components/LogicPanel'
import PermissionMatrix, { PermissionQuickActions } from './components/PermissionMatrix'
import { roleLabels, statusLabels } from './services/mocks/account.mock'

interface AccountListPageProps {
  accounts: Account[]
  menuItems: MenuItem[]
  operationLogs: OperationLog[]
}

export default function AccountListPage({ accounts, menuItems, operationLogs }: AccountListPageProps) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'disabled'>('all')
  const [searchKeyword, setSearchKeyword] = useState('')

  // 权限配置弹窗
  const [showPermissionDialog, setShowPermissionDialog] = useState(false)
  const [currentAccount, setCurrentAccount] = useState<Account | null>(null)
  const [editingPermissions, setEditingPermissions] = useState<PermissionConfig>({})

  // 修改密码弹窗
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  // 筛选账号
  const filteredAccounts = accounts.filter(acc => {
    if (filterStatus !== 'all' && acc.status !== filterStatus) return false
    if (searchKeyword && !acc.realName.includes(searchKeyword) && !acc.username.includes(searchKeyword)) return false
    return true
  })

  // 打开权限配置
  const openPermissionDialog = (account: Account) => {
    setCurrentAccount(account)
    setEditingPermissions({ ...account.permissions })
    setShowPermissionDialog(true)
  }

  // 打开修改密码
  const openPasswordDialog = (account: Account) => {
    setCurrentAccount(account)
    setOldPassword('')
    setNewPassword('')
    setShowPasswordDialog(true)
  }

  // 保存权限
  const handleSavePermission = () => {
    alert(`已保存 ${currentAccount?.realName} 的权限配置`)
    setShowPermissionDialog(false)
  }

  // 修改密码
  const handleChangePassword = () => {
    if (!oldPassword || !newPassword) {
      alert('请填写完整')
      return
    }
    if (newPassword.length < 6) {
      alert('密码长度至少6位')
      return
    }
    alert('密码修改成功')
    setShowPasswordDialog(false)
  }

  // 更新权限
  const updatePermission = (menuId: string, type: 'view' | 'edit', value: boolean) => {
    setEditingPermissions(prev => ({
      ...prev,
      [menuId]: {
        ...prev[menuId],
        canView: type === 'view' ? value : (prev[menuId]?.canView || false),
        canEdit: type === 'edit' ? value : (prev[menuId]?.canEdit || false)
      }
    }))
  }

  // 全选
  const handleSelectAll = () => {
    const allSelected: PermissionConfig = {}
    menuItems.forEach(item => {
      allSelected[item.menuId] = { canView: true, canEdit: true }
    })
    setEditingPermissions(allSelected)
  }

  // 清空
  const handleClearAll = () => {
    const allCleared: PermissionConfig = {}
    menuItems.forEach(item => {
      allCleared[item.menuId] = { canView: false, canEdit: false }
    })
    setEditingPermissions(allCleared)
  }

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">账号管理</h1>
              <p className="text-slate-600 mt-2">管理后台账号、配置权限、查看操作日志</p>
            </div>

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

        {/* 右侧：产品&业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="账号管理"
            sections={[
              {
                title: '业务场景',
                content: (
                  <>
                    <p className="font-semibold mb-2">在酒店SAAS行业的使用：</p>
                    <LogicList
                      items={[
                        <><strong>美团商家后台</strong>：主账号+子账号，权限分为老板、店长、客服、财务等角色</>,
                        <><strong>携程EBK后台</strong>：酒店可创建多个员工账号，前台只能看订单，财务能看报表</>,
                        <><strong>华住PMS系统</strong>：总经理、副总、前台主管、收银员，权限精细到功能点</>,
                        <><strong>你的平台</strong>：撮合平台后台，给运营、客服、财务、数据等角色分配权限</>
                      ]}
                    />
                  </>
                )
              },
              {
                title: '解决的问题',
                content: (
                  <>
                    <p className="font-semibold mb-2">权限分离：</p>
                    <LogicList
                      items={[
                        '客服不能修改积分规则配置（只能查看和手动调整用户积分）',
                        '财务只能查看数据，不能编辑（防止数据篡改）',
                        '数据分析师能看所有模块，但不能做任何修改'
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">数据安全：</p>
                    <LogicList
                      items={[
                        '离职员工立即禁用账号（不删除，保留历史操作记录）',
                        '敏感操作有日志可追溯（谁在什么时候做了什么）',
                        '超级管理员不可删除、不可禁用（防止误操作导致无人能管理）'
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">审计需求：</p>
                    <LogicList
                      items={[
                        '每次权限变更都有日志记录',
                        '可追溯"谁给谁分配了什么权限"',
                        '密码修改有记录（但不记录具体密码内容）'
                      ]}
                    />
                  </>
                )
              },
              {
                title: '产品逻辑',
                content: (
                  <>
                    <p className="font-semibold mb-2">为什么超级管理员不可删除？</p>
                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        如果唯一的超级管理员被误删除，整个系统将无人能管理，造成严重事故。
                        <br />
                        行业惯例：至少保留1个不可删除的超管账号。
                      </p>
                    </LogicHighlight>

                    <p className="font-semibold mt-4 mb-2">为什么权限要细化到"查看"和"编辑"？</p>
                    <LogicList
                      items={[
                        '最小权限原则：只给用户必需的权限',
                        '数据透明：财务需要看数据做报表，但不能改（防止篡改）',
                        '灵活组合：可以"能看不能改"、"能看能改"、"不能看不能改"'
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">为什么禁用而不是删除？</p>
                    <LogicCode>
{`场景：员工离职

方案A：直接删除账号
  ✗ 历史操作日志中"操作人"字段会显示"已删除用户"
  ✗ 无法追溯该员工曾经做过什么操作
  ✗ 数据完整性被破坏

方案B：禁用账号
  ✓ 保留账号信息，但无法登录
  ✓ 历史操作日志完整可查
  ✓ 可以随时查看该员工的权限配置历史`}
                    </LogicCode>
                  </>
                )
              },
              {
                title: '字段说明',
                content: (
                  <LogicTable
                    headers={['字段名', '类型', '含义', '示例']}
                    rows={[
                      ['accountId', 'string', '账号唯一标识', 'ACC_000001'],
                      ['username', 'string', '登录账号名', 'admin'],
                      ['password', 'string', '密码（加密存储）', 'hashed_xxx'],
                      ['realName', 'string', '真实姓名', '张总'],
                      ['department', 'string', '所属部门', 'CEO办公室'],
                      ['role', 'enum', '角色类型', 'super_admin / operation_manager 等'],
                      ['status', 'enum', '账号状态', 'active 启用 / disabled 禁用'],
                      ['permissions', 'object', '权限配置（JSON）', '{points_rule: {canView:true, canEdit:true}}'],
                      ['isSuperAdmin', 'boolean', '是否超级管理员', 'true（不可删除、不可禁用）'],
                      ['createdAt', 'string', '创建时间', '01/15/25 10:00:00'],
                      ['updatedBy', 'string', '最后修改人', '张总']
                    ]}
                  />
                )
              },
              {
                title: '权限矩阵设计（RBAC模型）',
                content: (
                  <>
                    <p className="font-semibold mb-2">权限设计原则：</p>
                    <LogicList
                      items={[
                        <><strong>最小权限原则</strong>：只分配必需的权限，不多给</>,
                        <><strong>职责分离</strong>：财务不能改订单，客服不能看财务数据</>,
                        <><strong>权限继承</strong>：编辑权限自动包含查看权限</>,
                        <><strong>细粒度控制</strong>：精确到二级菜单（例如：能看"积分规则配置"但不能改）</>
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">权限矩阵示例（客服主管）：</p>
                    <LogicTable
                      headers={['模块', '二级菜单', '查看', '编辑']}
                      rows={[
                        ['积分系统', '积分规则配置', '✓', '✗'],
                        ['积分系统', '用户积分管理', '✓', '✓'],
                        ['订单系统', '订单列表', '✓', '✓'],
                        ['订单系统', '退款管理', '✓', '✓'],
                        ['账号管理', '账号列表', '✗', '✗']
                      ]}
                    />

                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>为什么客服能"手动调整积分"但不能"修改规则"？</strong>
                        <br />
                        • 手动调整积分：日常客服工作（补偿用户），有操作日志可追溯
                        <br />• 修改规则：影响全平台，只能运营经理以上操作
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '异常处理',
                content: (
                  <LogicTable
                    headers={['场景', '处理逻辑']}
                    rows={[
                      ['修改自己的权限', '不允许（防止提权攻击）'],
                      ['最后一个超管账号被禁用', '不允许（确保至少有1个超管）'],
                      ['删除账号后的历史操作日志', '保留操作日志，显示"已删除用户"'],
                      ['重置密码', '生成临时密码，发送短信通知，首次登录强制修改'],
                      ['密码错误次数过多', '锁定账号30分钟（防止暴力破解）'],
                      ['同时登录限制', '同一账号只能1个设备登录（可选配置）']
                    ]}
                  />
                )
              },
              {
                title: '行业最佳实践',
                content: (
                  <>
                    <p className="font-semibold mb-2">携程EBK：</p>
                    <LogicList
                      items={[
                        '提供角色模板（店长、前台、财务），快速分配权限',
                        '权限变更需要主账号审批（双重确认）',
                        '操作日志可导出，用于审计'
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">华住PMS：</p>
                    <LogicList
                      items={[
                        '权限配置可复制（新建账号时复制某个账号的权限）',
                        '敏感操作（删除账号）需要输入管理员密码二次确认',
                        '操作日志保留6个月，定期归档'
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">美团商家后台：</p>
                    <LogicList
                      items={[
                        '支持批量导入账号（适合连锁酒店）',
                        '账号到期自动禁用（临时员工）',
                        '登录地点异常提醒（防止账号被盗）'
                      ]}
                    />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>你可以借鉴的点</strong>：
                        <br />
                        1. 权限配置提供"角色模板"，快速分配
                        <br />
                        2. 操作日志显示在页面底部，随时可查
                        <br />
                        3. 删除/禁用操作需要二次确认
                        <br />
                        4. 密码强度要求固定（至少6位），不需要太复杂
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '密码管理',
                content: (
                  <>
                    <p className="font-semibold mb-2">密码安全策略：</p>
                    <LogicTable
                      headers={['策略', '说明', '行业参考']}
                      rows={[
                        ['密码长度', '至少6位（固定要求）', '美团6位、携程8位'],
                        ['密码加密', '使用bcrypt加密存储', '行业标准'],
                        ['修改密码', '需要验证原密码', '所有平台通用'],
                        ['重置密码', '管理员可重置他人密码', '携程、华住支持'],
                        ['密码过期', '可选：90天强制修改', '部分平台有，可选配置']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">密码修改流程：</p>
                    <LogicCode>
{`用户修改密码：
1. 输入原密码
2. 输入新密码（至少6位）
3. 验证原密码正确性
4. 更新密码（加密存储）
5. 记录操作日志
6. 提示"修改成功，请重新登录"

管理员重置密码：
1. 选择目标账号
2. 生成临时密码（随机6位）
3. 短信/邮件通知用户
4. 用户首次登录强制修改密码
5. 记录操作日志`}
                    </LogicCode>
                  </>
                )
              },
              {
                title: '操作日志设计',
                content: (
                  <>
                    <p className="font-semibold mb-2">日志记录内容：</p>
                    <LogicTable
                      headers={['字段', '说明', '示例']}
                      rows={[
                        ['操作时间', '精确到秒', '01/15/25 14:32:15'],
                        ['操作人', '姓名+账号', '李经理 (operation_manager)'],
                        ['操作类型', '创建/更新/删除/禁用等', '修改权限'],
                        ['目标账号', '被操作的账号', '王主管'],
                        ['变更详情', 'JSON格式记录变更前后', '{before:{...}, after:{...}}'],
                        ['操作IP', '记录IP地址', '192.168.1.100']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">日志展示方式：</p>
                    <LogicList
                      items={[
                        '每个模块页面底部显示"最近操作记录"（最近5条）',
                        '隐秘但易查：不占主要空间，但随时可看',
                        '点击可展开详情（查看变更前后对比）',
                        '支持按时间、操作人、操作类型筛选'
                      ]}
                    />

                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>为什么每个模块都要有操作日志？</strong>
                        <br />
                        场景：用户投诉"我的积分怎么少了200？"
                        <br />
                        → 客服打开"用户积分管理"页面
                        <br />
                        → 底部操作日志显示："12/20/24 李经理 手动调整积分 -200"
                        <br />→ 快速定位问题原因
                      </p>
                    </LogicHighlight>
                  </>
                )
              }
            ]}
          />
        </div>
      </div>
    </MainLayout>
  )
}
