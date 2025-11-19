/**
 * 订单详情页面
 */

import type { Order } from './types/order.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Label } from '~/components/ui/label'
import MainLayout from '../PointsSystem/components/MainLayout'
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
