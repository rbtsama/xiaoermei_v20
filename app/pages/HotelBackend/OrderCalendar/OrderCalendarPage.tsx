import { useState } from 'react'
import { Form } from '@remix-run/react'
import type { RoomTypeOrders, OrderBooking } from './types/orderCalendar.types'
import { ORDER_STATUS_COLORS } from './types/orderCalendar.types'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { cn } from '~/lib/utils'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface OrderCalendarPageProps {
  orderCalendar: RoomTypeOrders[]
  error: string | null
}

export default function OrderCalendarPage({ orderCalendar, error }: OrderCalendarPageProps) {
  const [startDate, setStartDate] = useState('2025-11-17')

  // 生成日期范围（14天）
  const generateDateRange = (start: string, days: number) => {
    const dates: { date: string; dayOfWeek: string }[] = []
    const startDate = new Date(start)
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

    for (let i = 0; i < days; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)
      dates.push({
        date: currentDate.toISOString().split('T')[0],
        dayOfWeek: weekdays[currentDate.getDay()]
      })
    }
    return dates
  }

  const dates = generateDateRange(startDate, 14)

  const handlePrevWeek = () => {
    const current = new Date(startDate)
    current.setDate(current.getDate() - 7)
    setStartDate(current.toISOString().split('T')[0])
  }

  const handleNextWeek = () => {
    const current = new Date(startDate)
    current.setDate(current.getDate() + 7)
    setStartDate(current.toISOString().split('T')[0])
  }

  const handleToday = () => {
    setStartDate(new Date().toISOString().split('T')[0])
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}-${date.getDate()}`
  }

  // 计算订单在日历中的位置和宽度
  const getBookingStyle = (booking: OrderBooking, dateIndex: number) => {
    const bookingStart = new Date(booking.startDate)
    const bookingEnd = new Date(booking.endDate)
    const cellDate = new Date(dates[dateIndex].date)

    // 检查订单是否在当前单元格范围内
    if (cellDate < bookingStart || cellDate >= bookingEnd) {
      return null
    }

    // 计算订单开始位置
    const startIndex = dates.findIndex(d => d.date === booking.startDate)
    if (startIndex === -1 || startIndex > dateIndex) return null

    // 只在订单开始的单元格显示
    if (startIndex !== dateIndex) return null

    // 计算跨越的天数
    const spanDays = Math.min(
      booking.nights,
      dates.length - startIndex
    )

    return {
      gridColumnStart: 1,
      gridColumnEnd: spanDays + 1,
      width: `${spanDays * 100}%`
    }
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-destructive">错误: {error}</div>
      </div>
    )
  }

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="h-full overflow-y-auto p-6 bg-background">
          <div className="space-y-4">
            {/* 顶部工具栏 */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">开始日期</span>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-40"
                />
              </div>
              <Form method="get">
                <input type="hidden" name="startDate" value={startDate} />
                <Button type="submit">
                  <Calendar className="h-4 w-4 mr-2" />
                  搜索
                </Button>
              </Form>
              <Button variant="outline" onClick={handleToday}>
                今日
              </Button>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" onClick={handlePrevWeek}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleNextWeek}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* 订单日历表格 */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="sticky left-0 z-20 bg-muted/50 border-r border-b p-3 text-left min-w-[200px]">
                          <div className="flex items-center gap-2">
                            <ChevronLeft className="h-4 w-4" />
                            <span>房型</span>
                          </div>
                        </th>
                        {dates.map((dateInfo, index) => (
                          <th
                            key={index}
                            className="border-b p-2 text-center min-w-[80px]"
                          >
                            <div className="text-xs space-y-1">
                              <div className="font-medium">{formatDate(dateInfo.date)}</div>
                              <div className="text-muted-foreground">{dateInfo.dayOfWeek}</div>
                            </div>
                          </th>
                        ))}
                        <th className="border-b p-3 text-center min-w-[90px]">
                          <ChevronRight className="h-4 w-4 mx-auto" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderCalendar.map((roomType) => (
                        <tr key={roomType.id} className="hover:bg-muted/30">
                          <td className="sticky left-0 z-10 bg-background border-r border-b p-3">
                            <div className="text-sm font-medium">{roomType.roomTypeName}</div>
                          </td>
                          {dates.map((dateInfo, dateIndex) => (
                            <td
                              key={dateIndex}
                              className="border-b p-1 relative"
                              style={{ minHeight: '50px' }}
                            >
                              <div className="relative h-full min-h-[40px]">
                                {roomType.bookings.map((booking) => {
                                  const style = getBookingStyle(booking, dateIndex)
                                  if (!style) return null

                                  return (
                                    <div
                                      key={booking.id}
                                      className={cn(
                                        "absolute inset-0 rounded px-2 py-1 text-white text-xs flex items-center justify-between",
                                        booking.orderStatus === 'checked-in' ? 'bg-green-500' : 'bg-gray-400'
                                      )}
                                      style={{
                                        width: style.width,
                                        left: 0
                                      }}
                                    >
                                      <span className="truncate">{booking.guestName}</span>
                                      {booking.hasSpecialMark && (
                                        <span className="flex-shrink-0 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center ml-1">
                                          退
                                        </span>
                                      )}
                                    </div>
                                  )
                                })}
                              </div>
                            </td>
                          ))}
                          <td className="border-b p-2"></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {orderCalendar.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                暂无订单数据
              </div>
            )}
          </div>
        </div>
        </div>
    </MainLayout>
  )
}
