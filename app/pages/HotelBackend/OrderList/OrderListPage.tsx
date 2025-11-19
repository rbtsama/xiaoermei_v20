import { useState } from 'react'
import { Form, Link, useNavigate } from '@remix-run/react'
import type { OrderListResponse } from './types/orderList.types'
import { CHECK_IN_STATUS_LABELS } from './types/orderList.types'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Search, Edit, FileText, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '~/lib/utils'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface OrderListPageProps {
  result: OrderListResponse | null
  error: string | null
}

export default function OrderListPage({ result, error }: OrderListPageProps) {
  const navigate = useNavigate()
  const [roomType, setRoomType] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')
  const [checkInStatus, setCheckInStatus] = useState('')
  const [refundStatus, setRefundStatus] = useState('')

  const orders = result?.orders || []
  const currentPage = result?.page || 1
  const totalPages = result?.totalPages || 1
  const total = result?.total || 0

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search)
    params.set('page', String(page))
    navigate(`?${params.toString()}`)
  }

  if (error) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="text-destructive">错误: {error}</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="h-full overflow-y-auto">
        <div className="p-6 space-y-6">
      {/* 筛选表单 */}
      <Card>
        <CardContent className="pt-6">
          <Form method="get" className="space-y-4">
            <div className="grid grid-cols-6 gap-4">
              {/* 房型 */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">房型</label>
                <Input
                  name="roomType"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  placeholder="请选择房型"
                />
              </div>

              {/* 订房日期 */}
              <div className="space-y-2 col-span-2">
                <label className="text-sm text-muted-foreground">订房日期</label>
                <div className="flex gap-2 items-center">
                  <Input
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="开始日期"
                  />
                  <span>-</span>
                  <Input
                    type="date"
                    name="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="结束日期"
                  />
                </div>
              </div>

              {/* 支付状态 */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">支付状态</label>
                <Select name="paymentStatus" value={paymentStatus} onValueChange={setPaymentStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="已支付" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="paid">已支付</SelectItem>
                    <SelectItem value="unpaid">未支付</SelectItem>
                    <SelectItem value="refunded">已退款</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 入住状态 */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">入住状态</label>
                <Select name="checkInStatus" value={checkInStatus} onValueChange={setCheckInStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="请选择入住状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="not-checked-in">待入住</SelectItem>
                    <SelectItem value="checked-in">已入住</SelectItem>
                    <SelectItem value="checked-out">已离店</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 退款状态 */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">退款状态</label>
                <Select name="refundStatus" value={refundStatus} onValueChange={setRefundStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="请选择退款状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="no-refund">无退款</SelectItem>
                    <SelectItem value="refund-pending">退款中</SelectItem>
                    <SelectItem value="refunded">已退款</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                搜索
              </Button>
              <Button type="button" variant="outline" onClick={() => window.location.href = '/hotel-backend/order-list'}>
                重置
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>

      {/* 订单列表 */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>订单号</TableHead>
                <TableHead>订房人</TableHead>
                <TableHead>房型</TableHead>
                <TableHead>入住日期</TableHead>
                <TableHead>支付金额</TableHead>
                <TableHead>订单状态</TableHead>
                <TableHead>下单时间</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm">{order.orderNumber}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{order.guestName}</div>
                      <div className="text-sm text-muted-foreground">{order.guestPhone}</div>
                    </div>
                  </TableCell>
                  <TableCell>{order.roomType}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {order.checkInDate} - {order.checkOutDate}
                  </TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "px-2 py-1 rounded text-xs font-medium",
                          order.refundStatus === 'refund-pending'
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        )}
                      >
                        {order.refundStatus === 'refund-pending' ? '退款完成' : CHECK_IN_STATUS_LABELS[order.checkInStatus]}
                      </span>
                      {order.hasRefundRequest && (
                        <span className="w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">
                          退
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{order.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        <Edit className="h-4 w-4 mr-1" />
                        取消订单
                      </Button>
                      <Link to={`/hotel-backend/order-list/${order.id}`}>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                          <FileText className="h-4 w-4 mr-1" />
                          查询
                        </Button>
                      </Link>
                      <Link to={`/hotel-backend/order-list/${order.id}/edit`}>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                          <Edit className="h-4 w-4 mr-1" />
                          详情
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {orders.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              暂无订单数据
            </div>
          )}

          {/* 分页 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <div className="text-sm text-muted-foreground">
                共 {total} 条，10条/页
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1
                  return (
                    <Button
                      key={page}
                      variant={page === currentPage ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  )
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2 ml-4">
                  <span className="text-sm text-muted-foreground">前往</span>
                  <Input
                    type="number"
                    min={1}
                    max={totalPages}
                    defaultValue={currentPage}
                    className="w-16 h-8 text-center"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const value = parseInt(e.currentTarget.value)
                        if (value >= 1 && value <= totalPages) {
                          handlePageChange(value)
                        }
                      }
                    }}
                  />
                  <span className="text-sm text-muted-foreground">页</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
          </div>
        </div>
    </MainLayout>
  )
}
