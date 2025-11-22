/**
 * 场景详情页面 - 展示单个场景的完整交互流程
 */

import { Link } from '@remix-run/react'
import type { Scenario } from './types/scenario.types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import { ArrowLeft, ArrowDown, Server, Store, Smartphone } from 'lucide-react'

interface ScenarioDetailPageProps {
  scenario: Scenario
}

// 系统颜色映射
const systemColors: Record<string, string> = {
  平台后台: 'bg-primary/10 text-primary border-primary',
  商户端: 'bg-secondary/10 text-secondary border-secondary',
  C端: 'bg-accent/12 text-accent border-accent',
}

// 系统图标映射
const systemIcons: Record<string, React.ReactNode> = {
  平台后台: <Server className="w-4 h-4" />,
  商户端: <Store className="w-4 h-4" />,
  C端: <Smartphone className="w-4 h-4" />,
}

export default function ScenarioDetailPage({ scenario }: ScenarioDetailPageProps) {
  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-5xl mx-auto p-6">
          {/* 返回按钮 */}
          <div className="mb-6">
            <Link to="/architecture/scenario">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                返回场景列表
              </Button>
            </Link>
          </div>

          {/* 场景标题和描述 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">{scenario.title}</CardTitle>
              <CardDescription className="text-base">{scenario.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Badge variant="outline">{scenario.flowSteps.length} 个步骤</Badge>
                <span>•</span>
                <span>涉及 {new Set(scenario.flowSteps.map((s) => s.system)).size} 个系统</span>
              </div>
            </CardContent>
          </Card>

          {/* 流程步骤 */}
          <div className="space-y-4">
            {scenario.flowSteps.map((step, index) => (
              <div key={step.id}>
                <Card className="overflow-hidden">
                  <div className={`border-l-4 ${systemColors[step.system]}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              variant="outline"
                              className={`gap-1 ${systemColors[step.system]}`}
                            >
                              {systemIcons[step.system]}
                              {step.system}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                          <CardDescription>{step.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-2 text-sm">
                            <span className="text-slate-400 mt-1">•</span>
                            <span className="text-slate-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>
                </Card>

                {/* 流程箭头 */}
                {index < scenario.flowSteps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <ArrowDown className="w-6 h-6 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 关键要点 */}
          {scenario.keyPoints.length > 0 && (
            <Card className="mt-6 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">关键要点</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {scenario.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-blue-800">
                      <span className="font-semibold mt-0.5">{index + 1}.</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* 底部导航 */}
          <div className="mt-8 flex justify-between">
            <Link to="/architecture/scenario">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                返回场景列表
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
