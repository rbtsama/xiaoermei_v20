/**
 * 平台后台 - 用户详情页面
 */

import { Link } from '@remix-run/react'
import type { UserDetail } from './types/user.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Progress } from '~/components/ui/progress'
import { ArrowLeft, Edit, Ban, CheckCircle, TrendingUp, Coins, ShoppingBag } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface UserDetailPageProps {
  user: UserDetail
}

export default function UserDetailPage({ user }: UserDetailPageProps) {
  // 获取会员等级徽章颜色
  const getLevelBadgeClass = (level: string) => {
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

  // 获取订单状态徽章
  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="border-green-300 text-green-700 bg-green-50">已完成</Badge>
      case 'cancelled':
        return <Badge className="border-red-300 text-red-700 bg-red-50">已取消</Badge>
      case 'upcoming':
        return <Badge className="border-blue-300 text-blue-700 bg-blue-50">待入住</Badge>
      default:
        return <Badge className="border-slate-300 text-slate-700 bg-slate-50">{status}</Badge>
    }
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* 页面标题和操作 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                to="/platform-admin/user-management/list"
                className="inline-flex items-center gap-1 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                返回列表
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">用户详情</h1>
                <p className="text-sm text-slate-500 mt-1">
                  查看和管理用户完整信息
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/platform-admin/points-management/adjustment?userId=${user.userId}`}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors"
              >
                <Coins className="w-4 h-4" />
                调整积分
              </Link>
              <Button
                variant="outline"
                className="border-slate-300 hover:border-slate-400"
              >
                <Edit className="w-4 h-4 mr-2" />
                调整等级
              </Button>
              {user.status === 'active' ? (
                <Button
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                >
                  <Ban className="w-4 h-4 mr-2" />
                  禁用账号
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="border-green-300 text-green-600 hover:bg-green-50 hover:border-green-400"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  启用账号
                </Button>
              )}
            </div>
          </div>

          {/* 基本信息 */}
          <Card className="rounded-xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">基本信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-6">
                <div>
                  <div className="text-sm text-slate-500">用户ID</div>
                  <div className="text-base font-semibold text-slate-900 mt-1">{user.userId}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">姓名</div>
                  <div className="text-base font-semibold text-slate-900 mt-1">{user.name}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">手机号</div>
                  <div className="text-base font-semibold text-slate-900 mt-1">{user.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">注册时间</div>
                  <div className="text-sm text-slate-900 mt-1">{user.registeredAt}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">账号状态</div>
                  <div className="mt-1">
                    {user.status === 'active' ? (
                      <Badge className="border-green-300 text-green-700 bg-green-50">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        正常
                      </Badge>
                    ) : (
                      <Badge className="border-red-300 text-red-700 bg-red-50">
                        <Ban className="w-3 h-3 mr-1" />
                        已禁用
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 会员信息 */}
          <Card className="rounded-xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                会员信息
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-slate-500">当前等级</div>
                  <Badge className={`${getLevelBadgeClass(user.memberInfo.level)} mt-2 text-base px-3 py-1`}>
                    {user.memberInfo.level}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm text-slate-500">成为会员时间</div>
                  <div className="text-sm text-slate-900 mt-1">{user.memberInfo.joinedAt}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">有效期</div>
                  <div className="text-sm text-slate-900 mt-1">{user.memberInfo.validUntil}</div>
                </div>
              </div>

              {user.memberInfo.level !== '普通会员' && (
                <>
                  {/* 升级进度 */}
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-slate-900">升级进度</div>
                      <div className="text-sm text-slate-500">
                        ¥{user.memberInfo.levelProgress.current.toLocaleString()} /
                        ¥{user.memberInfo.levelProgress.required.toLocaleString()}
                      </div>
                    </div>
                    <Progress value={user.memberInfo.levelProgress.percentage} className="h-2" />
                    <div className="text-xs text-slate-500 mt-1">
                      还需消费 ¥{(user.memberInfo.levelProgress.required - user.memberInfo.levelProgress.current).toLocaleString()} 即可升级
                    </div>
                  </div>

                  {/* 保级进度 */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-slate-900">保级进度</div>
                      <div className="text-sm text-slate-500">
                        ¥{user.memberInfo.retentionProgress.current.toLocaleString()} /
                        ¥{user.memberInfo.retentionProgress.required.toLocaleString()}
                      </div>
                    </div>
                    <Progress value={user.memberInfo.retentionProgress.percentage} className="h-2" />
                    <div className="text-xs text-slate-500 mt-1">
                      本年度还需消费 ¥{(user.memberInfo.retentionProgress.required - user.memberInfo.retentionProgress.current).toLocaleString()} 即可保级
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* 积分信息 */}
          <Card className="rounded-xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Coins className="w-5 h-5 text-amber-600" />
                积分信息
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-6">
                <div>
                  <div className="text-sm text-slate-500">当前积分</div>
                  <div className="text-2xl font-bold text-blue-600 mt-1">
                    {user.pointsInfo.current.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">累计获得</div>
                  <div className="text-lg font-semibold text-green-600 mt-1">
                    +{user.pointsInfo.totalEarned.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">累计消耗</div>
                  <div className="text-lg font-semibold text-orange-600 mt-1">
                    -{user.pointsInfo.totalSpent.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">可抵扣金额</div>
                  <div className="text-lg font-semibold text-slate-900 mt-1">
                    ¥{user.pointsInfo.deductibleAmount.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">最后更新</div>
                  <div className="text-sm text-slate-900 mt-1">
                    {user.pointsInfo.lastUpdated}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 订单历史 */}
          <Card className="rounded-xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-green-600" />
                订单历史
                <span className="text-sm font-normal text-slate-500">
                  （最近 {user.recentOrders.length} 笔订单）
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-slate-200 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200 bg-slate-50">
                      <TableHead className="text-slate-900 font-semibold">订单号</TableHead>
                      <TableHead className="text-slate-900 font-semibold">酒店名称</TableHead>
                      <TableHead className="text-slate-900 font-semibold">房型</TableHead>
                      <TableHead className="text-slate-900 font-semibold">入住日期</TableHead>
                      <TableHead className="text-slate-900 font-semibold">离店日期</TableHead>
                      <TableHead className="text-slate-900 font-semibold">订单金额</TableHead>
                      <TableHead className="text-slate-900 font-semibold">获得积分</TableHead>
                      <TableHead className="text-slate-900 font-semibold">状态</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user.recentOrders.map((order) => (
                      <TableRow key={order.orderId} className="hover:bg-slate-50 transition-colors border-slate-200">
                        <TableCell className="font-medium text-slate-900">
                          {order.orderId}
                        </TableCell>
                        <TableCell className="text-slate-900">
                          {order.hotelName}
                        </TableCell>
                        <TableCell className="text-slate-900">
                          {order.roomType}
                        </TableCell>
                        <TableCell className="text-sm text-slate-900">
                          {order.checkIn}
                        </TableCell>
                        <TableCell className="text-sm text-slate-900">
                          {order.checkOut}
                        </TableCell>
                        <TableCell className="font-semibold text-slate-900">
                          ¥{order.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="font-semibold text-blue-600">
                          +{order.pointsEarned.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {getOrderStatusBadge(order.status)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {user.recentOrders.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  暂无订单记录
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
