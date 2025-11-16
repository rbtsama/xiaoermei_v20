/**
 * 产品架构总图页面
 * 展示整个酒店SAAS学习平台的完整功能架构脑图和深度分析
 */

import { useViewMode } from '~/contexts/ViewModeContext'
import Sidebar, { menuConfig } from '~/pages/PointsSystem/components/Sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { AlertTriangle, CheckCircle2, XCircle, Lightbulb, TrendingUp, Database, Users, Hotel, CreditCard, Gift, FileText, Settings, Shield } from 'lucide-react'

export default function OverviewPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menuItems={menuConfig} />
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="p-8 space-y-12 max-w-[1600px] mx-auto">
          {/* 页面标题 */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-foreground">酒店SAAS学习平台</h1>
            <p className="text-2xl text-muted-foreground">完整功能架构总图 & 深度分析</p>

            {/* 统计概览 */}
            <div className="flex gap-6 justify-center mt-8 flex-wrap">
              <div className="px-6 py-4 bg-blue-50 dark:bg-blue-950 rounded-lg border-2 border-blue-200">
                <div className="text-3xl font-bold text-blue-600">2</div>
                <div className="text-sm text-blue-600">一级模块</div>
              </div>
              <div className="px-6 py-4 bg-purple-50 dark:bg-purple-950 rounded-lg border-2 border-purple-200">
                <div className="text-3xl font-bold text-purple-600">16</div>
                <div className="text-sm text-purple-600">二级分类</div>
              </div>
              <div className="px-6 py-4 bg-green-50 dark:bg-green-950 rounded-lg border-2 border-green-200">
                <div className="text-3xl font-bold text-green-600">42</div>
                <div className="text-sm text-green-600">功能页面</div>
              </div>
              <div className="px-6 py-4 bg-orange-50 dark:bg-orange-950 rounded-lg border-2 border-orange-200">
                <div className="text-3xl font-bold text-orange-600">19</div>
                <div className="text-sm text-orange-600">LogicPanel</div>
              </div>
              <div className="px-6 py-4 bg-pink-50 dark:bg-pink-950 rounded-lg border-2 border-pink-200">
                <div className="text-3xl font-bold text-pink-600">152</div>
                <div className="text-sm text-pink-600">代码文件</div>
              </div>
            </div>
          </div>

          {/* 功能架构脑图 */}
          <Card className="border-4 border-primary/20">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <CardTitle className="text-3xl">🧠 功能架构脑图</CardTitle>
              <p className="text-white/80 mt-2">系统模块全景图 - 数据流转关系</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-2 gap-8">
                {/* 左侧：平台后台 */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-4 h-20 bg-blue-500 rounded-full"></div>
                    <div>
                      <h2 className="text-3xl font-bold text-blue-600">平台后台</h2>
                      <p className="text-sm text-muted-foreground">Platform Backend - B端运营管理</p>
                    </div>
                  </div>

                  {/* 积分系统 */}
                  <div className="p-6 bg-blue-50 dark:bg-blue-950 rounded-xl border-2 border-blue-200">
                    <div className="flex items-center gap-2 mb-4">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                      <h3 className="text-xl font-bold">积分系统</h3>
                      <Badge className="bg-green-500">2页</Badge>
                    </div>
                    <div className="space-y-2 text-sm ml-8">
                      <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>积分规则配置</span>
                        <Badge className="ml-auto bg-green-500 text-white text-xs">Logic✓</Badge>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>用户积分管理</span>
                        <Badge className="ml-auto bg-green-500 text-white text-xs">Logic✓</Badge>
                      </div>
                    </div>
                  </div>

                  {/* 会员管理 */}
                  <div className="p-6 bg-purple-50 dark:bg-purple-950 rounded-xl border-2 border-purple-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-6 h-6 text-purple-600" />
                      <h3 className="text-xl font-bold">会员管理</h3>
                      <Badge className="bg-green-500">2页</Badge>
                    </div>
                    <div className="space-y-2 text-sm ml-8">
                      <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>会员等级配置</span>
                        <Badge className="ml-auto bg-green-500 text-white text-xs">Logic✓</Badge>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>会员管理</span>
                        <Badge className="ml-auto bg-green-500 text-white text-xs">Logic✓</Badge>
                        <Badge className="ml-auto bg-blue-500 text-white text-xs">Detail✓</Badge>
                      </div>
                    </div>
                  </div>

                  {/* 优惠券系统 */}
                  <div className="p-6 bg-pink-50 dark:bg-pink-950 rounded-xl border-2 border-pink-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Gift className="w-6 h-6 text-pink-600" />
                      <h3 className="text-xl font-bold">优惠券系统</h3>
                      <Badge className="bg-green-500">3页</Badge>
                    </div>
                    <div className="space-y-2 text-sm ml-8">
                      <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span>优惠券配置</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span>优惠券发放</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span>核销记录</span>
                      </div>
                    </div>
                  </div>

                  {/* 其他平台功能 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Hotel className="w-5 h-5 text-slate-600" />
                        <h4 className="font-bold text-sm">酒店管理</h4>
                      </div>
                      <div className="text-xs text-muted-foreground">4页</div>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-slate-600" />
                        <h4 className="font-bold text-sm">订单管理</h4>
                      </div>
                      <div className="text-xs text-muted-foreground">3页</div>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5 text-slate-600" />
                        <h4 className="font-bold text-sm">争议处理</h4>
                      </div>
                      <div className="text-xs text-muted-foreground">3页</div>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Settings className="w-5 h-5 text-slate-600" />
                        <h4 className="font-bold text-sm">系统设置</h4>
                      </div>
                      <div className="text-xs text-muted-foreground">5页</div>
                    </div>
                  </div>
                </div>

                {/* 右侧：酒店后台 */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-4 h-20 bg-purple-500 rounded-full"></div>
                    <div>
                      <h2 className="text-3xl font-bold text-purple-600">酒店后台</h2>
                      <p className="text-sm text-muted-foreground">Hotel Backend - 商家端运营</p>
                    </div>
                  </div>

                  {/* 门店管理 */}
                  <div className="p-6 bg-purple-50 dark:bg-purple-950 rounded-xl border-2 border-purple-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Hotel className="w-6 h-6 text-purple-600" />
                      <h3 className="text-xl font-bold">门店管理</h3>
                      <Badge className="bg-green-500">7页</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs ml-8">
                      <div className="p-2 bg-white dark:bg-slate-800 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                        基本信息
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-800 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                        酒店政策
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-800 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                        门店设施
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-800 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                        周边信息
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-800 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                        早餐/加床政策
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-800 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                        门店图片
                      </div>
                    </div>
                  </div>

                  {/* 房型管理 */}
                  <div className="p-6 bg-indigo-50 dark:bg-indigo-950 rounded-xl border-2 border-indigo-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Database className="w-6 h-6 text-indigo-600" />
                      <h3 className="text-xl font-bold">房型管理</h3>
                      <Badge className="bg-green-500">4页</Badge>
                      <Badge className="bg-orange-500 text-white">核心</Badge>
                    </div>
                    <div className="space-y-2 text-sm ml-8">
                      <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span>房型列表</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span>房型图片</span>
                        <Badge className="ml-auto bg-green-500 text-white text-xs">Logic✓</Badge>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span>非房产品</span>
                        <Badge className="ml-auto bg-green-500 text-white text-xs">Logic✓</Badge>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span>PMS对接</span>
                        <Badge className="ml-auto bg-green-500 text-white text-xs">Logic✓</Badge>
                      </div>
                    </div>
                  </div>

                  {/* 房务管理 */}
                  <div className="p-6 bg-green-50 dark:bg-green-950 rounded-xl border-2 border-green-200">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                      <h3 className="text-xl font-bold">房务管理</h3>
                      <Badge className="bg-green-500">6页</Badge>
                      <Badge className="bg-orange-500 text-white">核心</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs ml-8">
                      <div className="p-2 bg-white dark:bg-slate-800 rounded flex justify-between items-center">
                        <span>房价日历</span>
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-800 rounded flex justify-between items-center">
                        <span>库存日历</span>
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-800 rounded flex justify-between items-center">
                        <span>订单日历</span>
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-800 rounded flex justify-between items-center">
                        <span>订单列表</span>
                        <Badge className="bg-blue-500 text-white text-[10px]">Detail</Badge>
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-800 rounded flex justify-between items-center">
                        <span>客诉退款</span>
                        <Badge className="bg-blue-500 text-white text-[10px]">Detail</Badge>
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-800 rounded flex justify-between items-center">
                        <span>用户点赞</span>
                        <Badge className="bg-blue-500 text-white text-[10px]">Detail</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 数据流转关系图 */}
              <div className="mt-12 p-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 rounded-2xl border-2 border-dashed">
                <h3 className="text-2xl font-bold mb-6 text-center">核心业务数据流</h3>

                {/* 订单流转链路 */}
                <div className="mb-8">
                  <h4 className="font-semibold mb-4 text-lg">📦 订单完整生命周期</h4>
                  <div className="flex items-center justify-between gap-2 flex-wrap bg-white dark:bg-slate-800 p-6 rounded-xl">
                    <div className="text-center">
                      <div className="px-4 py-3 bg-yellow-500 text-white rounded-lg font-bold shadow-md">用户下单</div>
                      <div className="text-xs text-muted-foreground mt-2">C端用户</div>
                    </div>
                    <div className="text-2xl text-muted-foreground">→</div>
                    <div className="text-center">
                      <div className="px-4 py-3 bg-red-500 text-white rounded-lg font-bold shadow-md">库存扣减</div>
                      <div className="text-xs text-muted-foreground mt-2">库存日历</div>
                    </div>
                    <div className="text-2xl text-muted-foreground">→</div>
                    <div className="text-center">
                      <div className="px-4 py-3 bg-blue-500 text-white rounded-lg font-bold shadow-md">订单创建</div>
                      <div className="text-xs text-muted-foreground mt-2">订单列表</div>
                    </div>
                    <div className="text-2xl text-muted-foreground">→</div>
                    <div className="text-center">
                      <div className="px-4 py-3 bg-purple-500 text-white rounded-lg font-bold shadow-md">PMS同步</div>
                      <div className="text-xs text-muted-foreground mt-2">PMS对接</div>
                    </div>
                    <div className="text-2xl text-muted-foreground">→</div>
                    <div className="text-center">
                      <div className="px-4 py-3 bg-green-500 text-white rounded-lg font-bold shadow-md">办理入住</div>
                      <div className="text-xs text-muted-foreground mt-2">订单日历</div>
                    </div>
                    <div className="text-2xl text-muted-foreground">→</div>
                    <div className="text-center">
                      <div className="px-4 py-3 bg-indigo-500 text-white rounded-lg font-bold shadow-md">积分发放</div>
                      <div className="text-xs text-muted-foreground mt-2">积分系统</div>
                    </div>
                  </div>
                </div>

                {/* 会员成长路径 */}
                <div>
                  <h4 className="font-semibold mb-4 text-lg">👤 会员成长体系</h4>
                  <div className="flex items-center justify-between gap-2 flex-wrap bg-white dark:bg-slate-800 p-6 rounded-xl">
                    <div className="text-center">
                      <div className="px-4 py-3 bg-slate-400 text-white rounded-lg font-bold shadow-md">注册</div>
                      <div className="text-xs text-muted-foreground mt-2">Level 0</div>
                    </div>
                    <div className="text-2xl text-muted-foreground">→</div>
                    <div className="text-center">
                      <div className="px-4 py-3 bg-blue-500 text-white rounded-lg font-bold shadow-md">首次预订</div>
                      <div className="text-xs text-muted-foreground mt-2">订单系统</div>
                    </div>
                    <div className="text-2xl text-muted-foreground">→</div>
                    <div className="text-center">
                      <div className="px-4 py-3 bg-purple-500 text-white rounded-lg font-bold shadow-md">升级VIP1</div>
                      <div className="text-xs text-muted-foreground mt-2">会员等级</div>
                    </div>
                    <div className="text-2xl text-muted-foreground">→</div>
                    <div className="text-center">
                      <div className="px-4 py-3 bg-orange-500 text-white rounded-lg font-bold shadow-md">享受折扣</div>
                      <div className="text-xs text-muted-foreground mt-2">会员权益</div>
                    </div>
                    <div className="text-2xl text-muted-foreground">→</div>
                    <div className="text-center">
                      <div className="px-4 py-3 bg-pink-500 text-white rounded-lg font-bold shadow-md">积分奖励</div>
                      <div className="text-xs text-muted-foreground mt-2">积分系统</div>
                    </div>
                    <div className="text-2xl text-muted-foreground">→</div>
                    <div className="text-center">
                      <div className="px-4 py-3 bg-green-500 text-white rounded-lg font-bold shadow-md">持续复购</div>
                      <div className="text-xs text-muted-foreground mt-2">会员管理</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 深度分析 */}
          <Card className="border-4 border-orange-500">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Lightbulb className="w-8 h-8" />
                深度分析：设计缺陷 & 优化建议
              </CardTitle>
              <p className="text-white/80 mt-2">基于酒店行业实践的专业评估</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">

              {/* 严重问题 */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <XCircle className="w-8 h-8 text-red-500" />
                  <h3 className="text-2xl font-bold text-red-600">🚨 严重设计缺陷（必须修复）</h3>
                </div>

                <div className="space-y-6">
                  {/* 问题1 */}
                  <div className="p-6 bg-red-50 dark:bg-red-950 border-l-4 border-red-500 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-red-700">❌ 问题1：订单管理功能重复且职责不清</h4>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-white dark:bg-slate-900 rounded">
                        <p className="font-semibold mb-2">现状：</p>
                        <ul className="space-y-1 ml-4">
                          <li>• 平台后台有 "订单管理" → `/order/list`</li>
                          <li>• 酒店后台也有 "订单列表" → `/hotel-backend/order-list`</li>
                          <li>• 两个页面功能几乎相同，数据可能不一致</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-white dark:bg-slate-900 rounded">
                        <p className="font-semibold mb-2 text-red-600">问题：</p>
                        <ul className="space-y-1 ml-4">
                          <li>• 平台运营看不到酒店后台的订单？数据孤岛</li>
                          <li>• 酒店商家能看到其他酒店的订单吗？权限漏洞</li>
                          <li>• 两个系统如何同步？数据一致性风险</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-950 rounded border border-green-300">
                        <p className="font-semibold mb-2 text-green-700">✅ 建议方案：</p>
                        <ul className="space-y-1 ml-4">
                          <li>• <strong>统一订单中心</strong>：一个订单表，通过 hotel_id 区分不同酒店</li>
                          <li>• <strong>权限隔离</strong>：平台后台可以看全部订单，酒店后台只能看自己的（WHERE hotel_id = current_user.hotel_id）</li>
                          <li>• <strong>删除重复</strong>：删除 `/order/list`，统一用 `/hotel-backend/order-list`，平台用户也访问这个页面（数据过滤）</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 问题2 */}
                  <div className="p-6 bg-red-50 dark:bg-red-950 border-l-4 border-red-500 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-red-700">❌ 问题2：会员体系混乱，平台会员 vs 酒店会员？</h4>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-white dark:bg-slate-900 rounded">
                        <p className="font-semibold mb-2">现状：</p>
                        <ul className="space-y-1 ml-4">
                          <li>• 平台后台有 "会员管理" → `/member-management/members`（10650个会员）</li>
                          <li>• 酒店后台也有 "会员管理" → `/hotel-backend/members`</li>
                          <li>• 会员等级在平台后台配置，但折扣由酒店后台设置？</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-white dark:bg-slate-900 rounded">
                        <p className="font-semibold mb-2 text-red-600">问题：</p>
                        <ul className="space-y-1 ml-4">
                          <li>• 是"平台统一会员"（所有酒店共享）还是"酒店独立会员"（各管各的）？</li>
                          <li>• 如果是统一会员，为什么酒店后台也有会员管理？</li>
                          <li>• 用户在A酒店是VIP，到B酒店也是VIP吗？</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-950 rounded border border-green-300">
                        <p className="font-semibold mb-2 text-green-700">✅ 建议方案（参考携程/美团）：</p>
                        <ul className="space-y-2 ml-4">
                          <li>• <strong>平台统一会员</strong>：用户是小而美平台会员，可以在所有酒店使用（类似携程会员）</li>
                          <li>• <strong>等级全局统一</strong>：VIP等级在平台后台配置，所有酒店生效</li>
                          <li>• <strong>折扣酒店自定义</strong>：酒店可以设置自己的会员折扣（在平台规定范围内，如8-9.5折）</li>
                          <li>• <strong>删除酒店后台的"会员管理"</strong>：酒店只能看自己酒店的订单会员，不能管理会员等级</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 问题3 */}
                  <div className="p-6 bg-red-50 dark:bg-red-950 border-l-4 border-red-500 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-red-700">❌ 问题3：非房产品缺少核心字段 - 无法售卖</h4>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-white dark:bg-slate-900 rounded">
                        <p className="font-semibold mb-2">现状：</p>
                        <ul className="space-y-1 ml-4">
                          <li>• 非房产品只有：产品分类、产品名、产品描述、应用设置</li>
                          <li>• <strong className="text-red-600">缺少价格字段！</strong></li>
                          <li>• 用户看到"SPA按摩"，但不知道多少钱</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-white dark:bg-slate-900 rounded">
                        <p className="font-semibold mb-2 text-red-600">问题：</p>
                        <ul className="space-y-1 ml-4">
                          <li>• 产品无法定价，等于无法售卖（业务闭环断裂）</li>
                          <li>• "应用设置"字段含义模糊（是价格？是使用规则？）</li>
                          <li>• 缺少库存管理（SPA师只有2人，能接10单吗？）</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-950 rounded border border-green-300">
                        <p className="font-semibold mb-2 text-green-700">✅ 建议补充字段：</p>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs border-collapse">
                            <thead className="bg-green-100 dark:bg-green-900">
                              <tr>
                                <th className="border p-2">新增字段</th>
                                <th className="border p-2">类型</th>
                                <th className="border p-2">示例</th>
                                <th className="border p-2">必填</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border p-2">price</td>
                                <td className="border p-2">number</td>
                                <td className="border p-2">88元</td>
                                <td className="border p-2">✓</td>
                              </tr>
                              <tr>
                                <td className="border p-2">pricingType</td>
                                <td className="border p-2">enum</td>
                                <td className="border p-2">按次/按小时/按人</td>
                                <td className="border p-2">✓</td>
                              </tr>
                              <tr>
                                <td className="border p-2">inventory</td>
                                <td className="border p-2">number</td>
                                <td className="border p-2">每日可售10份</td>
                                <td className="border p-2">✓</td>
                              </tr>
                              <tr>
                                <td className="border p-2">duration</td>
                                <td className="border p-2">number</td>
                                <td className="border p-2">60分钟</td>
                                <td className="border p-2">可选</td>
                              </tr>
                              <tr>
                                <td className="border p-2">needsAppointment</td>
                                <td className="border p-2">boolean</td>
                                <td className="border p-2">是否需要提前预约</td>
                                <td className="border p-2">✓</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 次要问题 */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-8 h-8 text-yellow-500" />
                  <h3 className="text-2xl font-bold text-yellow-600">⚠️ 次要问题（建议优化）</h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* 问题4 */}
                  <div className="p-6 bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-500 rounded-lg">
                    <h4 className="font-bold mb-3">📅 三个日历页面割裂</h4>
                    <p className="text-sm mb-3">房价日历、库存日历、订单日历是独立页面，用户需要频繁切换。</p>
                    <div className="p-3 bg-white dark:bg-slate-900 rounded text-xs">
                      <p className="font-semibold mb-2">建议：</p>
                      <p>合并成一个"房务日历"页面，用Tab切换视图（房价/库存/订单），三个维度联动查看。参考美团商家后台的"日历管理"。</p>
                    </div>
                  </div>

                  {/* 问题5 */}
                  <div className="p-6 bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-500 rounded-lg">
                    <h4 className="font-bold mb-3">🔄 PMS同步时机不明确</h4>
                    <p className="text-sm mb-3">PMS对接配置完成了，但何时同步？实时还是定时批量？</p>
                    <div className="p-3 bg-white dark:bg-slate-900 rounded text-xs">
                      <p className="font-semibold mb-2">建议：</p>
                      <p>• 实时同步（Webhook）：下单时立即同步到PMS<br/>• 定时全量对账：每小时校准一次库存<br/>• 显示最后同步时间，允许手动触发同步</p>
                    </div>
                  </div>

                  {/* 问题6 */}
                  <div className="p-6 bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-500 rounded-lg">
                    <h4 className="font-bold mb-3">⚖️ 退款权限边界模糊</h4>
                    <p className="text-sm mb-3">客诉退款流程中，商家拒绝退款后，平台如何裁决？需要什么证据？</p>
                    <div className="p-3 bg-white dark:bg-slate-900 rounded text-xs">
                      <p className="font-semibold mb-2">建议：</p>
                      <p>明确退款规则：<br/>• 商家责任：房间问题→商家承担100%<br/>• 客人责任：行程取消→按政策扣款<br/>• 争议案件：平台介入，要求双方提供证据（照片、聊天记录）</p>
                    </div>
                  </div>

                  {/* 问题7 */}
                  <div className="p-6 bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-500 rounded-lg">
                    <h4 className="font-bold mb-3">📊 缺少数据看板</h4>
                    <p className="text-sm mb-3">42个功能页面，但没有首页Dashboard，数据分散查看效率低。</p>
                    <div className="p-3 bg-white dark:bg-slate-900 rounded text-xs">
                      <p className="font-semibold mb-2">建议：</p>
                      <p>新增"数据概览"页面，展示核心指标：<br/>• 今日订单数、入住率、RevPAR<br/>• 待处理事项（退款申请、评价回复）<br/>• 数据趋势图（过去7天/30天）</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 逻辑错误 */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <XCircle className="w-8 h-8 text-red-500" />
                  <h3 className="text-2xl font-bold text-red-600">🐛 业务逻辑错误</h3>
                </div>

                <div className="space-y-4">
                  <div className="p-6 bg-red-50 dark:bg-red-950 border-l-4 border-red-500 rounded-lg">
                    <h4 className="font-bold mb-3">错误1：库存扣减顺序错误</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-white dark:bg-slate-900 rounded">
                        <p className="text-red-600 font-semibold mb-2">❌ 当前设计：</p>
                        <pre className="text-xs">
{`1. 用户下单
2. 扣减库存
3. 创建订单
4. 等待支付（15分钟）
5. 支付超时 → 取消订单`}
                        </pre>
                        <p className="text-red-600 mt-2 text-xs">问题：库存已扣，但用户未支付，导致其他人无法预订（假性满房）</p>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-950 rounded border border-green-300">
                        <p className="text-green-700 font-semibold mb-2">✅ 正确流程：</p>
                        <pre className="text-xs">
{`1. 用户下单
2. 锁定库存（临时占用，15分钟）
3. 创建订单（待支付）
4. 支付成功 → 扣减库存
5. 支付超时 → 释放锁定库存`}
                        </pre>
                        <p className="text-green-700 mt-2 text-xs">使用Redis分布式锁实现临时占用，避免超售也避免假性满房</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-red-50 dark:bg-red-950 border-l-4 border-red-500 rounded-lg">
                    <h4 className="font-bold mb-3">错误2：会员升级条件不合理</h4>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-white dark:bg-slate-900 rounded">
                        <p className="font-semibold mb-2">现状：</p>
                        <p>• VIP1：预定1次及以上<br/>• VIP2：预定5次及以上<br/>• VIP3：预定10次及以上</p>
                      </div>
                      <div className="p-3 bg-red-50 dark:bg-red-950 rounded">
                        <p className="text-red-600 font-semibold mb-2">问题：</p>
                        <p>• 只看预订次数，不看消费金额？<br/>• 订一次1000元的套房 = 订一次100元的经济房？<br/>• VIP门槛太低（1次就是VIP1），会员权益贬值</p>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-950 rounded border border-green-300">
                        <p className="text-green-700 font-semibold mb-2">建议：</p>
                        <p>• VIP1：预订3次 <strong>或</strong> 消费满1000元<br/>• VIP2：预订10次 <strong>或</strong> 消费满5000元<br/>• VIP3：预订30次 <strong>或</strong> 消费满20000元<br/>• 参考携程：结合消费金额+间夜数综合评定</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 优化建议 */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                  <h3 className="text-2xl font-bold text-green-600">💡 产品优化建议</h3>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200">
                    <h4 className="font-bold mb-2 text-blue-700">建议1：增加数据大屏</h4>
                    <p className="text-xs text-muted-foreground">
                      为酒店经理提供实时数据大屏：今日入住率、待入住提醒、收入趋势图。参考美团商家版首页。
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200">
                    <h4 className="font-bold mb-2 text-purple-700">建议2：房务三合一</h4>
                    <p className="text-xs text-muted-foreground">
                      合并房价日历、库存日历、订单日历为"房务日历"，Tab切换，提升操作效率。
                    </p>
                  </div>

                  <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg border border-pink-200">
                    <h4 className="font-bold mb-2 text-pink-700">建议3：智能定价建议</h4>
                    <p className="text-xs text-muted-foreground">
                      基于历史数据+竞品价格，AI推荐房价（携程已实现），帮助商家提升RevPAR。
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200">
                    <h4 className="font-bold mb-2 text-green-700">建议4：移动端支持</h4>
                    <p className="text-xs text-muted-foreground">
                      前台员工需要用手机查订单、办入住。当前是PC端设计，建议响应式适配或开发小程序。
                    </p>
                  </div>

                  <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200">
                    <h4 className="font-bold mb-2 text-orange-700">建议5：自动化运营</h4>
                    <p className="text-xs text-muted-foreground">
                      自动发送入住提醒、退房提醒、评价邀请。减少人工操作，提升客户体验。
                    </p>
                  </div>

                  <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg border border-indigo-200">
                    <h4 className="font-bold mb-2 text-indigo-700">建议6：导出功能</h4>
                    <p className="text-xs text-muted-foreground">
                      所有列表页支持Excel导出（订单、会员、退款记录），方便对账和分析。
                    </p>
                  </div>
                </div>
              </div>

              {/* 架构优化 */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Database className="w-8 h-8 text-indigo-500" />
                  <h3 className="text-2xl font-bold text-indigo-600">🏗️ 技术架构建议</h3>
                </div>

                <div className="space-y-4">
                  <div className="p-6 bg-indigo-50 dark:bg-indigo-950 rounded-lg border border-indigo-200">
                    <h4 className="font-bold mb-3">1. 数据库设计优化</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold mb-2 text-red-600">❌ 当前问题：</p>
                        <ul className="space-y-1 ml-4 text-xs">
                          <li>• 订单表可能重复（平台订单 vs 酒店订单）</li>
                          <li>• 会员表可能重复（平台会员 vs 酒店会员）</li>
                          <li>• 缺少外键约束（订单-房型-酒店关系）</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2 text-green-600">✅ 建议方案：</p>
                        <ul className="space-y-1 ml-4 text-xs">
                          <li>• <strong>统一订单表</strong>：orders (hotel_id, room_type_id, user_id)</li>
                          <li>• <strong>统一会员表</strong>：users (平台会员) + user_hotel_preferences (偏好)</li>
                          <li>• <strong>添加索引</strong>：hotel_id + check_in_date 联合索引（加速查询）</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-indigo-50 dark:bg-indigo-950 rounded-lg border border-indigo-200">
                    <h4 className="font-bold mb-3">2. 权限系统缺失</h4>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-white dark:bg-slate-900 rounded">
                        <p className="text-red-600 font-semibold mb-2">当前问题：</p>
                        <p className="text-xs">• 平台运营和酒店商家访问相同路由，如何区分权限？<br/>• 酒店A的员工能看到酒店B的订单吗？<br/>• 没有角色管理（超级管理员、运营、财务、客服、商家、前台）</p>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-950 rounded border border-green-300">
                        <p className="text-green-700 font-semibold mb-2">建议实现RBAC：</p>
                        <pre className="text-xs mt-2 overflow-x-auto">
{`角色定义：
1. 平台超级管理员 - 全部权限
2. 平台运营 - 查看所有数据，无法删除
3. 酒店管理员 - 管理自己酒店的全部数据
4. 酒店前台 - 仅订单查询和入住操作

路由守卫：
if (user.role === 'hotel_admin') {
  // 仅返回 hotel_id = user.hotel_id 的数据
}
if (user.role === 'platform_admin') {
  // 返回所有数据
}`}
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-indigo-50 dark:bg-indigo-950 rounded-lg border border-indigo-200">
                    <h4 className="font-bold mb-3">3. 缺少操作日志</h4>
                    <div className="space-y-3 text-sm">
                      <p className="text-xs">所有关键操作（修改价格、取消订单、退款审批）都应该记录操作日志，包括：谁、什么时间、做了什么、原因。</p>
                      <div className="p-3 bg-green-50 dark:bg-green-950 rounded border border-green-300">
                        <p className="font-semibold mb-2 text-green-700">建议：</p>
                        <p className="text-xs">• 新建 operation_logs 表<br/>• 字段：operator_id, action_type, target_id, before_value, after_value, reason, ip, created_at<br/>• 在详情页显示"操作历史"Tab，追溯所有变更</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 功能缺失 */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-8 h-8 text-orange-500" />
                  <h3 className="text-2xl font-bold text-orange-600">📋 功能缺失清单</h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200">
                    <h4 className="font-bold mb-3 text-orange-700">缺失功能（酒店刚需）</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">财务报表</p>
                          <p className="text-xs text-muted-foreground">日报、月报、年报（收入、支出、利润）</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">房态图（Housekeeping）</p>
                          <p className="text-xs text-muted-foreground">每间房的实时状态（空净、空脏、住净、住脏、维修）</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">客史档案</p>
                          <p className="text-xs text-muted-foreground">客人历史入住记录、偏好、备注</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">夜审（Night Audit）</p>
                          <p className="text-xs text-muted-foreground">每日营业数据汇总和对账</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">发票管理</p>
                          <p className="text-xs text-muted-foreground">开具电子发票、发票记录</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200">
                    <h4 className="font-bold mb-3 text-blue-700">缺失功能（体验提升）</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">消息通知中心</p>
                          <p className="text-xs text-muted-foreground">新订单、退款申请、差评预警的实时通知</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">待办事项</p>
                          <p className="text-xs text-muted-foreground">今日待办：12间待入住、3个退款待处理</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">智能推荐</p>
                          <p className="text-xs text-muted-foreground">根据用户画像推荐房型（亲子游→推荐家庭房）</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">OTA渠道管理</p>
                          <p className="text-xs text-muted-foreground">统一管理携程/美团/飞猪的上架状态和佣金</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">数据导出</p>
                          <p className="text-xs text-muted-foreground">订单、会员、财务数据导出Excel（对账必需）</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 最终评分 */}
              <div className="p-8 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-2xl">
                <h3 className="text-3xl font-bold mb-6 text-center">📊 系统设计评分</h3>
                <div className="grid grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2">85/100</div>
                    <div className="text-sm">整体评分</div>
                  </div>
                  <div>
                    <div className="text-lg mb-2">✅ 优点</div>
                    <ul className="text-xs space-y-1 opacity-90">
                      <li>• 模块化设计优秀</li>
                      <li>• LogicPanel教学完整</li>
                      <li>• UI/UX专业</li>
                      <li>• 参考行业标准</li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-lg mb-2">❌ 缺点</div>
                    <ul className="text-xs space-y-1 opacity-90">
                      <li>• 功能重复（订单/会员）</li>
                      <li>• 权限系统缺失</li>
                      <li>• 非房产品无定价</li>
                      <li>• 财务模块缺失</li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-lg mb-2">🎯 优先级</div>
                    <ul className="text-xs space-y-1 opacity-90">
                      <li>• P0: 修复订单/会员重复</li>
                      <li>• P0: 非房产品加价格</li>
                      <li>• P1: 权限系统</li>
                      <li>• P1: 数据大屏</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-white/10 rounded-xl">
                  <p className="text-center text-lg font-semibold mb-3">💬 总体评价</p>
                  <p className="text-sm opacity-90 leading-relaxed">
                    这是一个<strong>优秀的学习型项目</strong>，完整实现了酒店SAAS的核心功能，
                    LogicPanel的设计非常创新，教学价值极高。但作为<strong>生产环境系统</strong>，
                    存在一些关键缺陷需要修复：订单/会员数据重复、权限系统缺失、非房产品无法售卖。
                    修复这些问题后，可以达到<strong>95分</strong>，成为可商用的系统。
                  </p>
                </div>
              </div>

              {/* 参考对比 */}
              <div>
                <h3 className="text-2xl font-bold mb-6">🔍 对标分析：与主流OTA平台对比</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead className="bg-slate-100 dark:bg-slate-800">
                      <tr>
                        <th className="border p-3 text-left">功能模块</th>
                        <th className="border p-3">携程EBK</th>
                        <th className="border p-3">美团商家版</th>
                        <th className="border p-3">飞猪卖家中心</th>
                        <th className="border p-3">本系统</th>
                        <th className="border p-3">差距</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-3 font-semibold">房价管理</td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-xs">持平，缺AI定价</td>
                      </tr>
                      <tr>
                        <td className="border p-3 font-semibold">库存管理</td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-xs">持平</td>
                      </tr>
                      <tr>
                        <td className="border p-3 font-semibold">订单管理</td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-xs">持平，有详情页</td>
                      </tr>
                      <tr className="bg-red-50 dark:bg-red-950">
                        <td className="border p-3 font-semibold">财务报表</td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-center"><XCircle className="w-5 h-5 text-red-500 mx-auto" /></td>
                        <td className="border p-3 text-xs text-red-600">缺失！</td>
                      </tr>
                      <tr>
                        <td className="border p-3 font-semibold">会员系统</td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-xs">持平</td>
                      </tr>
                      <tr className="bg-red-50 dark:bg-red-950">
                        <td className="border p-3 font-semibold">数据大屏</td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-center"><XCircle className="w-5 h-5 text-red-500 mx-auto" /></td>
                        <td className="border p-3 text-xs text-red-600">缺失！</td>
                      </tr>
                      <tr className="bg-yellow-50 dark:bg-yellow-950">
                        <td className="border p-3 font-semibold">权限管理</td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-center"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                        <td className="border p-3 text-xs text-yellow-600">简单实现</td>
                      </tr>
                      <tr>
                        <td className="border p-3 font-semibold">PMS对接</td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                        <td className="border p-3 text-xs">持平</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 结论与下一步 */}
              <div className="p-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl">
                <h3 className="text-3xl font-bold mb-6 text-center">🎯 结论与行动计划</h3>

                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="bg-white/10 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">立即修复（P0）</h4>
                    <ul className="text-sm space-y-1">
                      <li>1. 统一订单/会员数据表</li>
                      <li>2. 非房产品添加价格字段</li>
                      <li>3. 修复库存扣减逻辑</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">尽快补充（P1）</h4>
                    <ul className="text-sm space-y-1">
                      <li>1. 实现RBAC权限系统</li>
                      <li>2. 新增数据大屏首页</li>
                      <li>3. 财务报表模块</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">长期规划（P2）</h4>
                    <ul className="text-sm space-y-1">
                      <li>1. AI智能定价</li>
                      <li>2. 移动端小程序</li>
                      <li>3. 多语言国际化</li>
                    </ul>
                  </div>
                </div>

                <div className="text-center pt-6 border-t border-white/20">
                  <p className="text-lg font-semibold mb-2">🌟 系统潜力评估</p>
                  <p className="text-sm opacity-90">
                    修复P0/P1问题后，本系统可以成为<strong>中小型酒店集团的标准PMS</strong>。
                    建议对标携程EBK（轻量版），目标客户：10-50家门店的连锁酒店或精品民宿集团。
                    预估市场规模：中国有<strong>30万+</strong>家单体/小连锁酒店，年均IT支出5-10万元，市场空间百亿级。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
