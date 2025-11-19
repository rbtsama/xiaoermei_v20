/**
 * 产品架构总图页面 - 高保真设计版
 * 三端系统完整功能架构 + 订单主线流程
 * 配色系统：#2C5F8D(主色) #C67A28(强调) #4A8FBF(辅助) #5A8A65(成功)
 */

import Sidebar, { menuConfig } from '~/pages/PointsSystem/components/Sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { ShoppingCart, ArrowRight, Code, Database, Server, ExternalLink } from 'lucide-react'
import { Link } from '@remix-run/react'
import DefectsList from './components/DefectsList'
import SystemArchitecture from './components/SystemArchitecture'
import { useViewMode } from '~/contexts/ViewModeContext'

export default function OverviewPage() {
  const { isSidebarCollapsed } = useViewMode()

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F6F3]">
      <Sidebar menuItems={menuConfig} />
      <div className="flex-1 overflow-y-auto transition-all duration-300">
        <div className="p-8 space-y-8 max-w-[1800px] mx-auto">
          {/* 页面标题 - 高保真版 */}
          <div className="text-center space-y-4 py-6">
            <h1 className="text-5xl font-bold text-[#2A2A2A] tracking-tight">
              酒店SAAS平台 - 产品架构总图
            </h1>
            <p className="text-xl text-[#6B6B6B] font-medium">
              三端系统完整功能架构 & 订单主线流程
            </p>
          </div>

          {/* 系统架构脑图 - 紧凑版 */}
          <SystemArchitecture />

          {/* 订单主线流程 - 高保真版 */}
          <Card className="border-2 border-[#C67A28] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-[#C67A28] to-[#E89A3E] text-white py-5 rounded-t-xl">
              <CardTitle className="text-2xl flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <ShoppingCart className="w-7 h-7" />
                </div>
                订单主线流程
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-white">
              {/* 三阶段流程 - 高保真卡片 */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                {/* 订单前 - 使用辅助色 #4A8FBF */}
                <div className="p-5 bg-[#4A8FBF]/5 rounded-xl border-2 border-[#4A8FBF]/30 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <h4 className="font-bold text-base text-[#4A8FBF] mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#4A8FBF]"></span>
                    订单前：获客转化
                  </h4>
                  <div className="space-y-2 text-sm text-[#2A2A2A]">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A8FBF]/60"></span>
                      门店信息展示
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A8FBF]/60"></span>
                      房型价格管理
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A8FBF]/60"></span>
                      库存控制
                    </div>
                  </div>
                </div>

                {/* 订单中 - 使用主色 #2C5F8D */}
                <div className="p-5 bg-[#2C5F8D]/5 rounded-xl border-2 border-[#2C5F8D]/30 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <h4 className="font-bold text-base text-[#2C5F8D] mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2C5F8D]"></span>
                    订单中：履约交付
                  </h4>
                  <div className="space-y-2 text-sm text-[#2A2A2A]">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2C5F8D]/60"></span>
                      下单支付
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2C5F8D]/60"></span>
                      PMS同步
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2C5F8D]/60"></span>
                      入住服务退房
                    </div>
                  </div>
                </div>

                {/* 订单后 - 使用成功色 #5A8A65 */}
                <div className="p-5 bg-[#5A8A65]/5 rounded-xl border-2 border-[#5A8A65]/30 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <h4 className="font-bold text-base text-[#5A8A65] mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#5A8A65]"></span>
                    订单后：复购运营
                  </h4>
                  <div className="space-y-2 text-sm text-[#2A2A2A]">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5A8A65]/60"></span>
                      评价积分
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5A8A65]/60"></span>
                      会员权益
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5A8A65]/60"></span>
                      营销触达
                    </div>
                  </div>
                </div>
              </div>

              {/* 核心链路 - 高保真流程 */}
              <div className="bg-gradient-to-r from-[#2C5F8D]/10 via-[#4A8FBF]/10 to-[#5A8A65]/10 p-6 rounded-xl border-2 border-[#E5E5E5] shadow-inner">
                <div className="flex items-center gap-3 flex-wrap justify-center">
                  <Badge className="bg-[#4A8FBF] hover:bg-[#4A8FBF]/90 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-all duration-300">
                    C端浏览
                  </Badge>
                  <ArrowRight className="w-5 h-5 text-[#6B6B6B]" />
                  <Badge className="bg-[#C67A28] hover:bg-[#C67A28]/90 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-all duration-300">
                    选房下单
                  </Badge>
                  <ArrowRight className="w-5 h-5 text-[#6B6B6B]" />
                  <Badge className="bg-[#2C5F8D] hover:bg-[#2C5F8D]/90 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-all duration-300">
                    支付锁库存
                  </Badge>
                  <ArrowRight className="w-5 h-5 text-[#6B6B6B]" />
                  <Badge className="bg-[#4A8FBF] hover:bg-[#4A8FBF]/90 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-all duration-300">
                    酒店确认
                  </Badge>
                  <ArrowRight className="w-5 h-5 text-[#6B6B6B]" />
                  <Badge className="bg-[#5A8A65] hover:bg-[#5A8A65]/90 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-all duration-300">
                    入住服务
                  </Badge>
                  <ArrowRight className="w-5 h-5 text-[#6B6B6B]" />
                  <Badge className="bg-[#2C5F8D] hover:bg-[#2C5F8D]/90 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-all duration-300">
                    评价积分
                  </Badge>
                  <ArrowRight className="w-5 h-5 text-[#6B6B6B]" />
                  <Badge className="bg-[#C67A28] hover:bg-[#C67A28]/90 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-all duration-300">
                    会员复购
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 技术架构概览 - 新增 */}
          <Card className="border-2 border-[#2C5F8D] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-[#2C5F8D] to-[#4A8FBF] text-white py-5 rounded-t-xl">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Code className="w-7 h-7" />
                  </div>
                  技术架构概览
                </CardTitle>
                <Link to="/architecture/technical">
                  <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
                    查看详情
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-6 bg-white">
              <div className="grid grid-cols-3 gap-6">
                {/* 前端技术栈 */}
                <div className="p-5 bg-[#4A8FBF]/5 rounded-xl border-2 border-[#4A8FBF]/30 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <h4 className="font-bold text-base text-[#4A8FBF] mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#4A8FBF]"></span>
                    前端技术栈
                  </h4>
                  <div className="space-y-2 text-sm text-[#2A2A2A]">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A8FBF]/60"></span>
                      React 18 + Remix v2
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A8FBF]/60"></span>
                      TypeScript 5.6
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A8FBF]/60"></span>
                      Tailwind CSS + shadcn/ui
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A8FBF]/60"></span>
                      微信小程序原生框架
                    </div>
                  </div>
                </div>

                {/* 后端技术栈 */}
                <div className="p-5 bg-[#5A8A65]/5 rounded-xl border-2 border-[#5A8A65]/30 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <h4 className="font-bold text-base text-[#5A8A65] mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#5A8A65]"></span>
                    后端技术栈
                  </h4>
                  <div className="space-y-2 text-sm text-[#2A2A2A]">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5A8A65]/60"></span>
                      Node.js + Express
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5A8A65]/60"></span>
                      PostgreSQL 15 + Redis 7
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5A8A65]/60"></span>
                      RabbitMQ + Elasticsearch
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5A8A65]/60"></span>
                      微信支付 + 阿里云
                    </div>
                  </div>
                </div>

                {/* 核心能力 */}
                <div className="p-5 bg-[#C67A28]/5 rounded-xl border-2 border-[#C67A28]/30 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <h4 className="font-bold text-base text-[#C67A28] mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C67A28]"></span>
                    核心能力
                  </h4>
                  <div className="space-y-2 text-sm text-[#2A2A2A]">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C67A28]/60"></span>
                      RESTful API 设计（60+ 接口）
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C67A28]/60"></span>
                      数据库设计（15+ 核心表）
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C67A28]/60"></span>
                      业务时序图（预订/退款/仲裁）
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C67A28]/60"></span>
                      Docker + K8s 容器化
                    </div>
                  </div>
                </div>
              </div>

              {/* 架构亮点 */}
              <div className="mt-6 p-4 bg-gradient-to-r from-[#2C5F8D]/10 via-[#4A8FBF]/10 to-[#5A8A65]/10 rounded-xl border-2 border-[#E5E5E5]">
                <div className="flex items-center gap-4 flex-wrap justify-center text-sm">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-[#2C5F8D]" />
                    <span className="text-[#6B6B6B]">SSR 优先架构</span>
                  </div>
                  <span className="text-[#E5E5E5]">|</span>
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#5A8A65]" />
                    <span className="text-[#6B6B6B]">事务一致性保障</span>
                  </div>
                  <span className="text-[#E5E5E5]">|</span>
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-[#4A8FBF]" />
                    <span className="text-[#6B6B6B]">TypeScript 全栈类型安全</span>
                  </div>
                  <span className="text-[#E5E5E5]">|</span>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-[#C67A28]" />
                    <span className="text-[#6B6B6B]">消息队列异步解耦</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 设计缺陷清单 */}
          <DefectsList />

        </div>
      </div>
    </div>
  )
}
