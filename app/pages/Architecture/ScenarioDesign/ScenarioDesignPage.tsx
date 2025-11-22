/**
 * 场景设计页面 - 展示核心业务场景的三端系统交互流程
 */

import { Link } from '@remix-run/react'
import type { Scenario } from './types/scenario.types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import LearningModal from './components/LearningModal'
import { ArrowRight, Users, TrendingUp, UserPlus, Store, ShoppingCart, LogOut, FileText } from 'lucide-react'

interface ScenarioDesignPageProps {
  scenarios: Scenario[]
  isLearningMode?: boolean
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

export default function ScenarioDesignPage({ scenarios, isLearningMode = true }: ScenarioDesignPageProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* 页面头部 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">场景设计</h1>
            <p className="text-slate-600 mt-2">
              核心业务场景的三端系统交互流程（平台后台、商户端、C端）
            </p>
          </div>
          <LearningModal title="场景设计 - 学习内容" isLearningMode={isLearningMode}>
            <div className="space-y-4">
              <section>
                <h3 className="text-lg font-semibold mb-2">什么是场景设计？</h3>
                <p className="text-slate-600">
                  场景设计是将复杂的业务流程拆解为具体的用户操作步骤，清晰展示平台后台、商户端、C端三个系统之间的交互关系。
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">为什么需要场景设计？</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li>帮助开发团队理解完整的业务流程</li>
                  <li>明确各端系统的职责边界</li>
                  <li>确保数据流转的准确性</li>
                  <li>作为开发和测试的参考文档</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">如何阅读场景设计？</h3>
                <ol className="list-decimal list-inside space-y-2 text-slate-600">
                  <li>从上至下按步骤顺序阅读</li>
                  <li>关注每个步骤的系统标识（平台后台/商户端/C端）</li>
                  <li>理解步骤之间的数据传递关系</li>
                  <li>注意"关键要点"中的特殊规则和约束</li>
                </ol>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">三端系统职责</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-primary">平台后台：</span>
                    <span className="text-slate-600 ml-2">
                      制定规则（积分汇率、会员等级、折扣范围）、数据统计、用户管理
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-secondary">商户端：</span>
                    <span className="text-slate-600 ml-2">
                      执行配置（积分服务、差异化折扣、代客下单）、订单管理、入住离店
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-accent">C端：</span>
                    <span className="text-slate-600 ml-2">
                      体验使用（查看权益、浏览酒店、预订支付、消费积分）
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </LearningModal>
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

        {/* 底部说明 */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">提示：</span>
            点击任意场景卡片可查看详细的交互流程。所有场景基于 PRD 文档
            《酒店管理系统积分、会员、代客下单功能》设计。
          </p>
        </div>
      </div>
    </div>
  )
}
