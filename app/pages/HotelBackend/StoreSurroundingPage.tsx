/**
 * 周边信息配置页面
 */

import { Form } from '@remix-run/react'
import type { SurroundingInfo } from './types/hotel-backend.types'
import { SurroundingCategory, DistanceType } from './types/hotel-backend.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import MainLayout from '../PointsSystem/components/MainLayout'

interface StoreSurroundingPageProps {
  surrounding: SurroundingInfo
}

const categoryLabels = {
  [SurroundingCategory.TRANSPORTATION]: '交通',
  [SurroundingCategory.ATTRACTION]: '景点',
  [SurroundingCategory.FOOD]: '逛吃',
}

export default function StoreSurroundingPage({ surrounding }: StoreSurroundingPageProps) {
  const categories = Object.values(SurroundingCategory)

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto bg-slate-50 p-6">
        <div className="space-y-6 max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">周边信息</h1>
            <p className="text-sm text-slate-500 mt-1">配置门店周边的交通、景点和美食信息</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">修改</Button>
            <Button variant="outline">刷新</Button>
          </div>
        </div>

        <Form method="post" className="space-y-6">
          {categories.map((category) => {
            const items = surrounding.items.filter((item) => item.category === category)

            return (
              <Card key={category}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {categoryLabels[category]} <span className="text-red-500">*</span>
                    </CardTitle>
                    <Button type="button" variant="outline" size="sm">
                      + 添加
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded">
                      <span className="text-sm text-slate-600">离</span>
                      <Input defaultValue={item.placeName} className="w-40" placeholder="地点名称" />
                      <select className="px-3 py-2 border rounded text-sm" defaultValue={item.distanceType}>
                        <option value={DistanceType.DRIVING}>驾驶距离</option>
                        <option value={DistanceType.WALKING}>步行距离</option>
                      </select>
                      <span className="text-sm text-slate-600">约</span>
                      <Input type="number" defaultValue={item.distanceKm} className="w-20" />
                      <span className="text-sm text-slate-600">公里,用时约</span>
                      <Input type="number" defaultValue={item.timeMinutes} className="w-20" />
                      <span className="text-sm text-slate-600">分钟</span>
                      <Button type="button" variant="ghost" size="sm" className="text-red-600">
                        删除
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          })}

          {/* 旅游交通图 */}
          <Card>
            <CardHeader>
              <CardTitle>旅游交通图</CardTitle>
            </CardHeader>
            <CardContent>
              {surrounding.tourismMapImage && (
                <img
                  src={surrounding.tourismMapImage}
                  alt="旅游交通图"
                  className="w-64 border rounded mb-3"
                />
              )}
              <Input name="tourismMapImage" type="url" placeholder="上传交通图URL" />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg">保存周边信息</Button>
          </div>
        </Form>
        </div>
        </div>
        </div>
    </MainLayout>
  )
}
