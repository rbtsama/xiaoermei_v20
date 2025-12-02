/**
 * 平台后台 - 导航页面
 */

import { Link } from '@remix-run/react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

export default function PlatformAdminIndex() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white border-b border-slate-200 p-6 rounded-xl shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">平台后台管理</h1>
          <p className="text-slate-600 mt-2">选择功能模块进入管理</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 用户管理 */}
          <Card className="rounded-xl border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">用户管理</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link
                to="/platform-admin/user-management/list"
                className="block px-4 py-2 rounded hover:bg-slate-50 text-blue-600 hover:text-blue-700"
              >
                用户列表
              </Link>
            </CardContent>
          </Card>

          {/* 会员管理 */}
          <Card className="rounded-xl border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">会员管理</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link
                to="/platform-admin/member-management/upgrade-rules"
                className="block px-4 py-2 rounded hover:bg-slate-50 text-blue-600 hover:text-blue-700"
              >
                升级规则
              </Link>
              <Link
                to="/platform-admin/member-management/discount-rules"
                className="block px-4 py-2 rounded hover:bg-slate-50 text-blue-600 hover:text-blue-700"
              >
                折扣规则
              </Link>
              <Link
                to="/platform-admin/member-management/users"
                className="block px-4 py-2 rounded hover:bg-slate-50 text-blue-600 hover:text-blue-700"
              >
                会员用户
              </Link>
              <Link
                to="/platform-admin/member-management/invitations"
                className="block px-4 py-2 rounded hover:bg-slate-50 text-blue-600 hover:text-blue-700"
              >
                邀请记录
              </Link>
            </CardContent>
          </Card>

          {/* 积分管理 */}
          <Card className="rounded-xl border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">积分管理</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link
                to="/platform-admin/points-management/base-rule"
                className="block px-4 py-2 rounded hover:bg-slate-50 text-blue-600 hover:text-blue-700"
              >
                基础规则
              </Link>
              <Link
                to="/platform-admin/points-management/adjustment"
                className="block px-4 py-2 rounded hover:bg-slate-50 text-blue-600 hover:text-blue-700"
              >
                积分调整
              </Link>
              <Link
                to="/platform-admin/points-management/value-added"
                className="block px-4 py-2 rounded hover:bg-slate-50 text-blue-600 hover:text-blue-700"
              >
                增值服务
              </Link>
              <Link
                to="/platform-admin/points-management/level-rates"
                className="block px-4 py-2 rounded hover:bg-slate-50 text-blue-600 hover:text-blue-700"
              >
                等级倍率
              </Link>
            </CardContent>
          </Card>

          {/* 优惠券管理 */}
          <Card className="rounded-xl border-slate-200 hover:shadow-md transition-shadow cursor-pointer border-2 border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-blue-900 flex items-center gap-2">
                优惠券管理
                <span className="text-xs px-2 py-0.5 bg-blue-600 text-white rounded">NEW</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link
                to="/platform-admin/coupon-management/list"
                className="block px-4 py-2 rounded hover:bg-blue-100 text-blue-600 hover:text-blue-700 font-medium"
              >
                优惠券列表
              </Link>
              <Link
                to="/platform-admin/coupon-management/issue"
                className="block px-4 py-2 rounded hover:bg-blue-100 text-blue-600 hover:text-blue-700"
              >
                优惠券发放
              </Link>
            </CardContent>
          </Card>

          {/* 酒店管理 */}
          <Card className="rounded-xl border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">酒店管理</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link
                to="/platform-admin/hotel-monitor"
                className="block px-4 py-2 rounded hover:bg-slate-50 text-blue-600 hover:text-blue-700"
              >
                酒店监控
              </Link>
              <Link
                to="/platform-admin/hotel/rooms"
                className="block px-4 py-2 rounded hover:bg-slate-50 text-blue-600 hover:text-blue-700"
              >
                客房管理
              </Link>
              <Link
                to="/platform-admin/hotel/room-status"
                className="block px-4 py-2 rounded hover:bg-slate-50 text-blue-600 hover:text-blue-700"
              >
                房态管理
              </Link>
              <Link
                to="/platform-admin/hotel/reservations"
                className="block px-4 py-2 rounded hover:bg-slate-50 text-blue-600 hover:text-blue-700"
              >
                预订管理
              </Link>
              <Link
                to="/platform-admin/hotel/pricing"
                className="block px-4 py-2 rounded hover:bg-slate-50 text-blue-600 hover:text-blue-700"
              >
                价格管理
              </Link>
              <Link
                to="/platform-admin/hotel/check-in"
                className="block px-4 py-2 rounded hover:bg-slate-50 text-blue-600 hover:text-blue-700"
              >
                入住管理
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-slate-500 text-sm mt-8">
          <p>小而美民宿管理系统 - 平台后台</p>
        </div>
      </div>
    </div>
  )
}
