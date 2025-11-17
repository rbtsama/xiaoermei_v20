/**
 * 订单列表页面
 */

import { useState } from 'react'
import type { Order } from './types/order.types'
import { OrderStatus } from './types/order.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '../PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight, LogicCode } from '../PointsSystem/components/LogicPanel'
import OperationLogButton from '../PointsSystem/components/OperationLogButton'
import { orderStatusLabels, paymentMethodLabels } from './services/mocks/order.mock'

interface OrderListPageProps {
  orders: Order[]
}

export default function OrderListPage({ orders }: OrderListPageProps) {
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all')
  const [searchKeyword, setSearchKeyword] = useState('')

  const filteredOrders = orders.filter(order => {
    if (filterStatus !== 'all' && order.status !== filterStatus) return false
    if (searchKeyword && !order.orderId.includes(searchKeyword) && !order.userName.includes(searchKeyword)) return false
    return true
  })

  const getStatusColor = (status: OrderStatus) => {
    const colors: Record<OrderStatus, string> = {
      [OrderStatus.PENDING_PAYMENT]: 'bg-yellow-100 text-yellow-700',
      [OrderStatus.PENDING_CONFIRM]: 'bg-blue-100 text-blue-700',
      [OrderStatus.PENDING_CHECKIN]: 'bg-purple-100 text-purple-700',
      [OrderStatus.CHECKED_IN]: 'bg-green-100 text-green-700',
      [OrderStatus.COMPLETED]: 'bg-slate-100 text-slate-600',
      [OrderStatus.CANCELLED]: 'bg-red-100 text-red-700'
    }
    return colors[status]
  }

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">订单列表</h1>
                <p className="text-slate-600 mt-2">管理所有预订订单</p>
              </div>
              <OperationLogButton moduleName="订单列表" />
            </div>

            {/* 筛选栏 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as OrderStatus | 'all')}
                    className="px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="all">全部状态</option>
                    <option value={OrderStatus.PENDING_PAYMENT}>待支付</option>
                    <option value={OrderStatus.PENDING_CONFIRM}>待确认</option>
                    <option value={OrderStatus.PENDING_CHECKIN}>待入住</option>
                    <option value={OrderStatus.CHECKED_IN}>已入住</option>
                    <option value={OrderStatus.COMPLETED}>已完成</option>
                    <option value={OrderStatus.CANCELLED}>已取消</option>
                  </select>

                  <Input
                    placeholder="搜索订单号或用户名..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="flex-1"
                  />

                  <Button variant="outline">导出订单</Button>
                </div>
              </CardContent>
            </Card>

            {/* 订单列表 */}
            <Card>
              <CardHeader>
                <CardTitle>订单列表</CardTitle>
                <CardDescription>共 {filteredOrders.length} 个订单</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <div>订单号</div>
                        <div className="text-xs text-muted-foreground font-normal">唯一订单编号</div>
                      </TableHead>
                      <TableHead>
                        <div>下单时间</div>
                        <div className="text-xs text-muted-foreground font-normal">创建订单时间</div>
                      </TableHead>
                      <TableHead>
                        <div>房客</div>
                        <div className="text-xs text-muted-foreground font-normal">用户姓名和手机</div>
                      </TableHead>
                      <TableHead>
                        <div>酒店</div>
                        <div className="text-xs text-muted-foreground font-normal">酒店名称和房型</div>
                      </TableHead>
                      <TableHead>
                        <div>入住日期</div>
                        <div className="text-xs text-muted-foreground font-normal">入住-退房时间</div>
                      </TableHead>
                      <TableHead>
                        <div>间夜</div>
                        <div className="text-xs text-muted-foreground font-normal">入住天数</div>
                      </TableHead>
                      <TableHead className="text-right">
                        <div>实付金额</div>
                        <div className="text-xs text-muted-foreground font-normal">用户实际支付</div>
                      </TableHead>
                      <TableHead>
                        <div>状态</div>
                        <div className="text-xs text-muted-foreground font-normal">订单当前状态</div>
                      </TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.orderId}>
                        <TableCell className="font-mono text-sm text-blue-600">{order.orderId}</TableCell>
                        <TableCell className="text-sm text-slate-600">{order.createdAt}</TableCell>
                        <TableCell className="text-sm">
                          <div>{order.userName}</div>
                          <div className="text-xs text-slate-500">{order.userPhone}</div>
                        </TableCell>
                        <TableCell className="text-sm">
                          <div className="font-medium">{order.hotelName}</div>
                          <div className="text-xs text-slate-500">{order.roomType}</div>
                        </TableCell>
                        <TableCell className="text-sm">
                          <div>{order.checkInDate}</div>
                          <div className="text-xs text-slate-500">至 {order.checkOutDate}</div>
                        </TableCell>
                        <TableCell className="text-sm text-center">{order.nights}晚</TableCell>
                        <TableCell className="text-right font-medium text-green-600">
                          ¥{order.actualAmount}
                        </TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                            {orderStatusLabels[order.status]}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">查看详情</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 右侧：业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="订单列表"
            sections={[
              {
                title: '业务场景',
                content: (
                  <>
                    <p className="font-semibold mb-2">订单管理的核心作用：</p>
                    <LogicList
                      items={[
                        '客服查询：用户电话咨询订单状态',
                        '商家确认：酒店查看待确认订单',
                        '财务核算：统计佣金、退款',
                        '数据分析：订单量、转化率、取消率'
                      ]}
                    />
                  </>
                )
              },
              {
                title: '订单状态流转',
                content: (
                  <>
                    <LogicCode>
{`订单状态流转：

待支付 → 用户下单但未付款（15分钟未付自动取消）
   ↓ 支付
待确认 → 已支付，等酒店确认（酒店24小时内确认）
   ↓ 酒店确认
待入住 → 酒店已确认，等待入住日期
   ↓ 入住日到达
已入住 → 房客正在入住中
   ↓ 退房
已完成 → 订单完成，发放积分

任何环节都可能 → 已取消（用户/酒店取消）`}
                    </LogicCode>
                  </>
                )
              },
              {
                title: '价格明细计算',
                content: (
                  <>
                    <p className="font-semibold mb-2">价格计算逻辑：</p>
                    <LogicCode>
{`示例订单：
房费小计：¥1280（2晚×¥640）
优惠券：-¥0
积分抵扣：-¥10（1000积分）
会员折扣：-¥128（钻石会员9折，优惠10%）
─────────────────
实付金额：¥1142

平台佣金（5%）：¥57.1
商家实收：¥1084.9`}
                    </LogicCode>

                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>佣金计算基准</strong>：基于实付金额（不是房费原价）
                        <br />
                        原因：用户实际支付¥1142，平台按这个金额抽佣更合理
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '📱 用户端（C端）呈现',
                content: (
                  <>
                    <p className="font-semibold mb-2">后台订单数据如何影响用户端：</p>

                    <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                      <p className="font-semibold text-sm mb-2">📱 页面1：我的订单</p>
                      <div className="text-xs space-y-2">
                        <div className="border-b pb-2">
                          <div className="flex justify-between">
                            <span className="font-bold">亚朵酒店·上海新天地店</span>
                            <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">待入住</span>
                          </div>
                          <div className="text-slate-500 mt-1">入住：01/18 - 01/19（1晚）</div>
                          <div className="text-slate-500">实付：¥428</div>
                        </div>
                        <div className="text-slate-500 text-xs">→ 后台订单状态"待入住"映射到前端</div>
                      </div>
                    </div>

                    <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                      <p className="font-semibold text-sm mb-2">📱 页面2：订单详情</p>
                      <div className="text-xs space-y-1 text-slate-700">
                        <div className="font-bold border-b pb-1 mb-1">亚朵酒店·上海新天地店</div>
                        <div>订单号：ORD_20250116001</div>
                        <div>入住时间：01/18 14:00 - 01/19 12:00</div>
                        <div>房型：大床房 × 1晚</div>
                        <div className="border-t pt-1 mt-1">
                          <div className="flex justify-between"><span>房费小计</span><span>¥458</span></div>
                          <div className="flex justify-between text-red-600"><span>优惠券</span><span>-¥30</span></div>
                          <div className="flex justify-between font-bold"><span>实付金额</span><span className="text-red-600">¥428</span></div>
                        </div>
                        <div className="text-slate-500 text-xs mt-2">→ 后台的价格明细完整透出给用户</div>
                      </div>
                    </div>

                    <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                      <p className="font-semibold text-sm mb-2">📱 页面3：订单状态提醒</p>
                      <div className="text-xs space-y-1 text-slate-700">
                        <div>🔔 您的订单已确认，01/18可入住</div>
                        <div>📅 距离入住还有2天</div>
                        <div>📍 酒店地址：黄浦区马当路388号</div>
                        <div><button className="text-blue-600 underline">查看路线</button></div>
                        <div className="text-slate-500 text-xs mt-2">→ 后台状态"待入住"触发入住提醒</div>
                      </div>
                    </div>

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>后台→前端的映射关系：</strong>
                        <br />
                        • 后台状态"待入住" → 前端显示倒计时"距离入住还有2天"
                        <br />
                        • 后台状态"已入住" → 前端解锁"申请退款"按钮
                        <br />
                        • 后台状态"已完成" → 前端弹出"请评价"
                        <br />
                        • 后台价格明细 → 前端完整展示优惠明细
                      </p>
                    </LogicHighlight>
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
