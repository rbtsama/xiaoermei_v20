import { useState } from 'react'
import { Form, Link } from '@remix-run/react'
import type { RoomTypeInventory } from './types/inventoryCalendar.types'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { cn } from '~/lib/utils'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface InventoryCalendarPageProps {
  inventoryCalendar: RoomTypeInventory[]
  error: string | null
}

export default function InventoryCalendarPage({ inventoryCalendar, error }: InventoryCalendarPageProps) {
  const [startDate, setStartDate] = useState('2025-11-17')

  // 获取日期范围
  const dates = inventoryCalendar[0]?.dailyInventories || []

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

  if (error) {
    return (
      <div className="p-6">
        <div className="text-destructive">错误: {error}</div>
      </div>
    )
  }

  return (
    <MainLayout>
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
              <Button variant="outline" className="ml-auto text-green-600 border-green-600 hover:bg-green-50">
                批量修改
              </Button>
            </div>

            {/* 库存日历表格 */}
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
                        <th className="border-b p-3 text-center min-w-[80px]">
                          总房间数
                        </th>
                        {dates.map((dateInfo, index) => (
                          <th
                            key={index}
                            className="border-b p-2 text-center min-w-[90px]"
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
                      {inventoryCalendar.map((roomType) => (
                        <tr key={roomType.id} className="hover:bg-muted/30">
                          <td className="sticky left-0 z-10 bg-background border-r border-b p-3">
                            <div className="text-sm font-medium">{roomType.roomTypeName}</div>
                          </td>
                          <td className="border-b p-3 text-center">
                            <div className="text-sm font-medium">{roomType.totalRooms}</div>
                          </td>
                          {roomType.dailyInventories.map((dailyInv, index) => (
                            <td
                              key={index}
                              className={cn(
                                "border-b p-2 text-center",
                                dailyInv.status === 'sold-out' && "bg-blue-500 text-white",
                                dailyInv.status === 'limited' && "bg-yellow-400 text-black"
                              )}
                            >
                              <div className="space-y-1">
                                {dailyInv.status === 'sold-out' ? (
                                  <div className="text-xs font-medium">已定 {dailyInv.totalRooms}</div>
                                ) : dailyInv.status === 'limited' ? (
                                  <div className="text-xs font-medium">已定 {dailyInv.bookedRooms}</div>
                                ) : (
                                  <div className="text-xs font-medium">可定 {dailyInv.availableRooms}间</div>
                                )}
                                <div className="text-xs">
                                  {dailyInv.status === 'sold-out' ? (
                                    <span className="font-medium">(¥ {index === 0 ? '1' : dailyInv.totalRooms})</span>
                                  ) : dailyInv.status === 'limited' ? (
                                    <span className="font-medium">(¥ {dailyInv.bookedRooms > 0 ? '748' : dailyInv.availableRooms})</span>
                                  ) : (
                                    <>
                                      总: {dailyInv.totalRooms}
                                    </>
                                  )}
                                </div>
                                <Link
                                  to="#"
                                  className={cn(
                                    "text-xs hover:underline",
                                    dailyInv.status === 'sold-out' ? "text-white" : "text-blue-600"
                                  )}
                                >
                                  设置
                                </Link>
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

            {inventoryCalendar.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                暂无库存数据
              </div>
            )}
          </div>
        </div>
    </MainLayout>
  )
}
