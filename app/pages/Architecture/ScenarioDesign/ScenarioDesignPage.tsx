/**
 * 场景设计页面 - 展示核心业务场景的三端系统交互流程
 */

import { Link } from '@remix-run/react'
import type { Scenario } from './types/scenario.types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import { ArrowRight, Users, TrendingUp, UserPlus, Store, ShoppingCart, LogOut, FileText } from 'lucide-react'

interface ScenarioDesignPageProps {
  scenarios: Scenario[]
}

// 场景图标映射
const scenarioIcons: Record<string, React.ReactNode> = {
  user_registration: <Users className="w-6 h-6" />,
  member_level: <TrendingUp className="w-6 h-6" />,
  invite_friend: <UserPlus className="w-6 h-6" />,
  browse_hotel: <Store className="w-6 h-6" />,
  order_payment: <ShoppingCart className="w-6 h-6" />,
  checkout_reward: <LogOut className="w-6 h-6" />,
  agent_order: <FileText className="w-6 h-6" />,
}

export default function ScenarioDesignPage({ scenarios }: ScenarioDesignPageProps) {
  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-7xl mx-auto p-6">
          {/* 页面头部 */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900">场景设计</h1>
            <p className="text-slate-600 mt-2">
              核心业务场景的三端系统交互流程（平台后台、商户端、C端）
            </p>
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>说明：</strong>
                本模块展示积分、会员、代客下单三大核心功能的完整业务流程。每个场景都包含平台后台、商户端、C端的详细交互步骤。
                点击任意场景卡片可查看详细流程。
              </p>
            </div>
          </div>

          {/* 场景列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scenarios.map((scenario) => (
              <Link
                key={scenario.id}
                to={`/architecture/scenario/${scenario.id}`}
                className="block transition-transform hover:scale-[1.02]"
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        {scenarioIcons[scenario.type]}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{scenario.title}</CardTitle>
                        <CardDescription>{scenario.description}</CardDescription>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {/* 流程步骤数量 */}
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Badge variant="outline" className="font-normal">
                          {scenario.flowSteps.length} 个步骤
                        </Badge>
                        <span>•</span>
                        <span>涉及 {new Set(scenario.flowSteps.map((s) => s.system)).size} 个系统</span>
                      </div>

                      {/* 关键要点预览 */}
                      {scenario.keyPoints.length > 0 && (
                        <div className="text-sm">
                          <span className="font-semibold text-slate-700">关键要点：</span>
                          <span className="text-slate-600 ml-2">{scenario.keyPoints[0]}</span>
                          {scenario.keyPoints.length > 1 && (
                            <span className="text-slate-400 ml-1">等 {scenario.keyPoints.length} 项</span>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
