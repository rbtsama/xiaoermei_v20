/**
 * 退款管理页面
 */

import type { RefundRequest } from './types/order.types'
import { RefundStatus } from './types/order.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '../PointsSystem/components/MainLayout'
              <OperationLogButton moduleName="退款管理" />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>退款申请列表</CardTitle>
                <CardDescription>共 {refunds.length} 个申请</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>申请时间</TableHead>
                      <TableHead>订单号</TableHead>
                      <TableHead>用户</TableHead>
                      <TableHead>酒店</TableHead>
                      <TableHead>退款原因</TableHead>
                      <TableHead className="text-right">申请金额</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {refunds.map((refund) => (
                      <TableRow key={refund.refundId}>
                        <TableCell className="text-sm text-slate-600">{refund.requestedAt}</TableCell>
                        <TableCell className="font-mono text-sm text-blue-600">{refund.orderId}</TableCell>
                        <TableCell className="text-sm">{refund.userName}</TableCell>
                        <TableCell className="text-sm">{refund.hotelName}</TableCell>
                        <TableCell className="text-sm max-w-xs truncate">{refund.reason}</TableCell>
                        <TableCell className="text-right font-medium text-red-600">¥{refund.requestAmount}</TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded ${
                            refund.status === RefundStatus.PENDING ? 'bg-yellow-100 text-yellow-700' :
                            refund.status === RefundStatus.APPROVED ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {refundStatusLabels[refund.status]}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {refund.status === RefundStatus.PENDING && (
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="text-green-600">同意</Button>
                              <Button variant="outline" size="sm" className="text-red-600">拒绝</Button>
                            </div>
                          )}
                          {refund.status !== RefundStatus.PENDING && (
                            <Button variant="outline" size="sm">查看详情</Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="w-[40%] h-full border-l">
                      <div>实付：¥1299</div>
                      <div className="border-t pt-1 mt-1">
                        <div>预计退款：<span className="text-green-600 font-bold">¥1039.20</span></div>
                        <div className="text-orange-600 text-xs">距离入住5天，按80%退款</div>
                      </div>
                      <div className="text-slate-500 mt-2">→ 后台退款规则自动计算退款金额</div>
                    </div>
                  </div>
                )
              }
            ]}
          />
        </div>
      </div>
    </MainLayout>
  )
}
