/**
 * 门店管理页面
 */

import type { Store } from './types/hotel-backend.types'
import { StoreStatus } from './types/hotel-backend.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import MainLayout from '../PointsSystem/components/MainLayout'

interface StoresPageProps {
  stores: Store[]
}

const statusColors = {
  [StoreStatus.OPERATING]: 'bg-green-100 text-green-700',
  [StoreStatus.RENOVATING]: 'bg-orange-100 text-orange-700',
  [StoreStatus.CLOSED]: 'bg-slate-100 text-slate-600',
}

const statusLabels = {
  [StoreStatus.OPERATING]: '营业中',
  [StoreStatus.RENOVATING]: '装修中',
  [StoreStatus.CLOSED]: '已关闭',
}

export default function StoresPage({ stores }: StoresPageProps) {
  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto bg-slate-50 p-6">
        <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">门店管理</h1>
            <p className="text-sm text-slate-500 mt-1">
              管理连锁酒店的各个门店信息、设施和运营状态
            </p>
          </div>
          <Button>新增门店</Button>
        </div>

        {/* 门店统计 */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-blue-600">{stores.length}</div>
              <div className="text-sm text-slate-600 mt-2">总门店数</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-green-600">
                {stores.filter((s) => s.status === StoreStatus.OPERATING).length}
              </div>
              <div className="text-sm text-slate-600 mt-2">营业中</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-purple-600">
                {stores.reduce((sum, s) => sum + s.totalRooms, 0)}
              </div>
              <div className="text-sm text-slate-600 mt-2">总房间数</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-orange-600">
                {Math.round(
                  stores.reduce((sum, s) => sum + s.rating, 0) / stores.length * 10
                ) / 10}
              </div>
              <div className="text-sm text-slate-600 mt-2">平均评分</div>
            </CardContent>
          </Card>
        </div>

        {/* 门店列表 */}
        <div className="grid grid-cols-1 gap-6">
          {stores.map((store) => (
            <Card key={store.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{store.name}</CardTitle>
                    <p className="text-sm text-slate-500 mt-1">{store.address}</p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      statusColors[store.status]
                    }`}
                  >
                    {statusLabels[store.status]}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  {/* 左侧:门店图片 */}
                  <div className="grid grid-cols-2 gap-2">
                    {store.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${store.name}-${index + 1}`}
                        className="w-full h-32 object-cover rounded"
                      />
                    ))}
                  </div>

                  {/* 右侧:门店信息 */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600">店长:</span>{' '}
                        <span className="font-medium">{store.manager}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">联系电话:</span>{' '}
                        <span className="font-medium">{store.phone}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">总房间数:</span>{' '}
                        <span className="font-semibold text-blue-600">
                          {store.totalRooms}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-600">可用房间:</span>{' '}
                        <span className="font-semibold text-green-600">
                          {store.availableRooms}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-600">入住率:</span>{' '}
                        <span className="font-semibold">
                          {Math.round(
                            ((store.totalRooms - store.availableRooms) /
                              store.totalRooms) *
                              100
                          )}
                          %
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-600">评分:</span>{' '}
                        <span className="font-semibold text-yellow-600">
                          ⭐ {store.rating}
                        </span>
                      </div>
                    </div>

                    {/* 设施标签 */}
                    <div>
                      <div className="text-xs text-slate-500 mb-2">门店设施</div>
                      <div className="flex flex-wrap gap-2">
                        {store.facilities.map((facility, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                          >
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm">
                        编辑
                      </Button>
                      <Button variant="outline" size="sm">
                        查看房间
                      </Button>
                      <Button variant="outline" size="sm">
                        查看员工
                      </Button>
                    </div>
                  </div>
                </div>

                {/* 门店描述 */}
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-sm text-slate-600">{store.description}</p>
                  <p className="text-xs text-slate-500 mt-2">
                    开业时间: {store.openedAt}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        </div>
        </div>
        </div>
    </MainLayout>
  )
}
