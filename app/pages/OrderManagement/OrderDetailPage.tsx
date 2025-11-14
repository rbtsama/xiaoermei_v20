/**
 * 订单详情页面
 */

import type { Order } from './types/order.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Label } from '~/components/ui/label'
import MainLayout from '../PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicCode } from '../PointsSystem/components/LogicPanel'
import OperationLogButton from '../PointsSystem/components/OperationLogButton'
import { orderStatusLabels, paymentMethodLabels } from './services/mocks/order.mock'

interface OrderDetailPageProps {
  order: Order
}

export default function OrderDetailPage({ order }: OrderDetailPageProps) {
  return (
    <MainLayout>
      <div className="flex h-full">
        <div className="w-[60%] h-full overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">订单详情</h1>
                <p className="text-slate-600 mt-2">订单号：{order.orderId}</p>
              </div>
              <OperationLogButton moduleName="订单详情" />
            </div>

            <Card>
              <CardHeader><CardTitle>订单信息</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-sm">
                <div><Label>订单状态</Label><p>{orderStatusLabels[order.status]}</p></div>
                <div><Label>下单时间</Label><p>{order.createdAt}</p></div>
                <div><Label>支付方式</Label><p>{paymentMethodLabels[order.paymentMethod]}</p></div>
                <div><Label>支付时间</Label><p>{order.paidAt || '-'}</p></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>房客信息</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-sm">
                <div><Label>姓名</Label><p>{order.userName}</p></div>
                <div><Label>手机号</Label><p>{order.userPhone}</p></div>
                <div><Label>入住人数</Label><p>{order.guestCount}人</p></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>酒店信息</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-sm">
                <div className="col-span-2"><Label>酒店名称</Label><p className="font-medium">{order.hotelName}</p></div>
                <div><Label>房型</Label><p>{order.roomType}</p></div>
                <div><Label>间夜数</Label><p>{order.nights}晚</p></div>
                <div><Label>入住日期</Label><p>{order.checkInDate}</p></div>
                <div><Label>退房日期</Label><p>{order.checkOutDate}</p></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>价格明细</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span>房费小计</span><span>¥{order.roomPrice}</span></div>
                <div className="flex justify-between text-red-600"><span>优惠券优惠</span><span>-¥{order.couponDiscount}</span></div>
                <div className="flex justify-between text-red-600"><span>积分抵扣</span><span>-¥{order.pointsDiscount}</span></div>
                <div className="flex justify-between text-red-600"><span>会员折扣</span><span>-¥{order.memberDiscount}</span></div>
                <div className="flex justify-between font-bold text-lg border-t pt-2"><span>实付金额</span><span className="text-red-600">¥{order.actualAmount}</span></div>
                <div className="border-t pt-2 text-xs text-slate-500">
                  <div className="flex justify-between"><span>平台佣金（5%）</span><span>¥{order.commission}</span></div>
                  <div className="flex justify-between"><span>商家实收</span><span>¥{order.merchantAmount}</span></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="订单详情"
            sections={[
              {
                title: '📱 用户端（C端）呈现',
                content: (
                  <>
                    <div className="bg-slate-50 border rounded-lg p-4">
                      <p className="font-semibold text-sm mb-2">📱 订单详情页</p>
                      <div className="text-xs space-y-1 text-slate-700">
                        <div className="font-bold">{order.hotelName}</div>
                        <div>入住：{order.checkInDate} - {order.checkOutDate}</div>
                        <div className="border-t pt-1 mt-1">
                          <div className="flex justify-between"><span>房费</span><span>¥{order.roomPrice}</span></div>
                          <div className="flex justify-between text-red-600"><span>优惠</span><span>-¥{order.couponDiscount + order.pointsDiscount + order.memberDiscount}</span></div>
                          <div className="flex justify-between font-bold"><span>实付</span><span className="text-red-600">¥{order.actualAmount}</span></div>
                        </div>
                        <div className="text-slate-500 mt-2">→ 价格明细与后台完全一致</div>
                      </div>
                    </div>
                  </>
                )
              }
            ]}
          />
        </div>
      </div>
    </MainLayout>
  )
}
