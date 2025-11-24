/**
 * 平台后台 - 用户列表页面
 */

import { useState } from 'react'
import { Form, Link } from '@remix-run/react'
import type { User, MemberLevel, UserStatus } from './types/user.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Search, Eye, Ban, CheckCircle } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface UserListPageProps {
  users: User[]
  memberLevels: MemberLevel[]
}

export default function UserListPage({ users, memberLevels }: UserListPageProps) {
  const [searchValue, setSearchValue] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  // 获取会员等级徽章颜色
  const getLevelBadgeClass = (level: MemberLevel) => {
    switch (level) {
      case '钻石会员':
        return 'border-purple-300 text-purple-700 bg-purple-50'
      case '白金会员':
        return 'border-slate-400 text-slate-700 bg-slate-100'
      case '金卡会员':
        return 'border-amber-300 text-amber-700 bg-amber-50'
      case '银卡会员':
        return 'border-slate-300 text-slate-600 bg-slate-50'
      case '普通会员':
        return 'border-slate-300 text-slate-600 bg-white'
      default:
        return 'border-slate-300 text-slate-600 bg-white'
    }
  }

  // 获取状态徽章
  const getStatusBadge = (status: UserStatus) => {
    if (status === 'active') {
      return (
        <Badge className="border-green-300 text-green-700 bg-green-50">
          <CheckCircle className="w-3 h-3 mr-1" />
          正常
        </Badge>
      )
    }
    return (
      <Badge className="border-red-300 text-red-700 bg-red-50">
        <Ban className="w-3 h-3 mr-1" />
        已禁用
      </Badge>
    )
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* 页面标题 */}
          <div>
            <h1 className="text-2xl font-bold text-slate-900">用户列表</h1>
            <p className="text-sm text-slate-500 mt-1">
              查看和管理所有平台用户
            </p>
          </div>

          {/* 搜索和筛选 */}
          <Card className="rounded-xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">搜索筛选</CardTitle>
            </CardHeader>
            <CardContent>
              <Form method="get" className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  {/* 搜索框 */}
                  <div className="col-span-2">
                    <Label htmlFor="search" className="text-sm font-medium text-slate-700">
                      搜索用户
                    </Label>
                    <Input
                      id="search"
                      name="search"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="用户ID、手机号或姓名"
                      className="h-9 mt-1.5 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>

                  {/* 会员等级筛选 */}
                  <div>
                    <Label htmlFor="memberLevel" className="text-sm font-medium text-slate-700">
                      会员等级
                    </Label>
                    <Select
                      name="memberLevel"
                      value={selectedLevel}
                      onValueChange={setSelectedLevel}
                    >
                      <SelectTrigger className="h-9 mt-1.5 border-slate-300">
                        <SelectValue placeholder="全部等级" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部等级</SelectItem>
                        {memberLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* 状态筛选 */}
                  <div>
                    <Label htmlFor="status" className="text-sm font-medium text-slate-700">
                      账号状态
                    </Label>
                    <Select
                      name="status"
                      value={selectedStatus}
                      onValueChange={setSelectedStatus}
                    >
                      <SelectTrigger className="h-9 mt-1.5 border-slate-300">
                        <SelectValue placeholder="全部状态" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部状态</SelectItem>
                        <SelectItem value="active">正常</SelectItem>
                        <SelectItem value="disabled">已禁用</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* 时间范围筛选 */}
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="registeredFrom" className="text-sm font-medium text-slate-700">
                      注册起始日期
                    </Label>
                    <Input
                      id="registeredFrom"
                      name="registeredFrom"
                      type="date"
                      className="h-9 mt-1.5 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <Label htmlFor="registeredTo" className="text-sm font-medium text-slate-700">
                      注册结束日期
                    </Label>
                    <Input
                      id="registeredTo"
                      name="registeredTo"
                      type="date"
                      className="h-9 mt-1.5 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>

                  <div className="col-span-2 flex items-end gap-2">
                    <Button
                      type="submit"
                      className="h-9 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm flex-1"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      搜索
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setSearchValue('')
                        setSelectedLevel('all')
                        setSelectedStatus('all')
                      }}
                      className="h-9 border-slate-300 hover:border-slate-400"
                    >
                      重置
                    </Button>
                  </div>
                </div>
              </Form>
            </CardContent>
          </Card>

          {/* 用户列表 */}
          <Card className="rounded-xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-slate-900">
                  用户列表
                  <span className="ml-2 text-sm font-normal text-slate-500">
                    共 {users.length} 位用户
                  </span>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-slate-200 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200 bg-slate-50">
                      <TableHead className="text-slate-900 font-semibold">用户ID</TableHead>
                      <TableHead className="text-slate-900 font-semibold">姓名</TableHead>
                      <TableHead className="text-slate-900 font-semibold">手机号</TableHead>
                      <TableHead className="text-slate-900 font-semibold">会员等级</TableHead>
                      <TableHead className="text-slate-900 font-semibold">当前积分</TableHead>
                      <TableHead className="text-slate-900 font-semibold">注册时间</TableHead>
                      <TableHead className="text-slate-900 font-semibold">状态</TableHead>
                      <TableHead className="text-slate-900 font-semibold text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.userId} className="hover:bg-slate-50 transition-colors border-slate-200">
                        <TableCell className="font-medium text-slate-900">
                          {user.userId}
                        </TableCell>
                        <TableCell className="text-slate-900">
                          {user.name}
                        </TableCell>
                        <TableCell className="text-slate-900">
                          {user.phone}
                        </TableCell>
                        <TableCell>
                          <Badge className={getLevelBadgeClass(user.memberLevel)}>
                            {user.memberLevel}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-blue-600">
                          {user.currentPoints.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-sm text-slate-900">
                          {user.registeredAt}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(user.status)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to={`/platform-admin/user-management/detail/${user.userId}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              查看详情
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {users.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  暂无用户数据
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
