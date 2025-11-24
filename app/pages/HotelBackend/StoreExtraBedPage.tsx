import { Form } from '@remix-run/react'
import type { ExtraBedPolicy } from './types/hotel-backend.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import MainLayout from '../PointsSystem/components/MainLayout'

interface StoreExtraBedPageProps {
  policy: ExtraBedPolicy
  roomTypes: Array<{ id: string; name: string;院: string }>
}

export default function StoreExtraBedPage({ policy, roomTypes }: StoreExtraBedPageProps) {
  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto bg-slate-50 p-6">
        <div className="space-y-6">
        <h1 className="text-2xl font-bold">加床政策</h1>

        <div className="grid grid-cols-[400px,1fr] gap-6">
          {/* 左侧:规则配置 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle>加床收费规则</CardTitle>
                  <Button size="sm" variant="outline">+ 增加</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2 items-center pb-2 border-b font-medium text-slate-900">
                    <div className="w-16">按年龄定价</div>
                    <div className="w-20">收费标准</div>
                    <div className="w-16">固定金额</div>
                    <div className="w-20">每次入住</div>
                    <div className="flex-1">200元</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle>加婴儿床收费规则</CardTitle>
                  <Button size="sm" variant="outline">+ 增加</Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">暂无规则</p>
              </CardContent>
            </Card>
          </div>

          {/* 右侧:房型配置 */}
          <Card>
            <CardHeader>
              <CardTitle>房型加床配置</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="grid grid-cols-[2fr,2fr,2fr] gap-3 pb-2 border-b text-sm font-medium text-slate-900">
                  <div>房型</div>
                  <div>加床</div>
                  <div>婴儿床</div>
                </div>

                {roomTypes.map((rt) => (
                  <div key={rt.id} className="grid grid-cols-[2fr,2fr,2fr] gap-3 py-3 border-b items-center">
                    <div className="text-sm">
                      {rt.name} 【{rt.院}】
                    </div>
                    <select className="px-2 py-1 border rounded text-sm text-slate-400">
                      <option>不提供出加床</option>
                      <option>提供1张</option>
                      <option>提供2张</option>
                    </select>
                    <select className="px-2 py-1 border rounded text-sm text-slate-400">
                      <option>不提供加婴儿床</option>
                      <option>提供1张</option>
                    </select>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
        </div>
        </div>
    </MainLayout>
  )
}
