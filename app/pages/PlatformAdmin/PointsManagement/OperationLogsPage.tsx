/**
 * 平台后台 - 积分调整操作记录页面
 */

import type { OperationLog } from './types/valueAddedService.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '~/components/ui/pagination'
import { ArrowLeft } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import { Link } from '@remix-run/react'

interface OperationLogsPageProps {
  operationLogs: OperationLog[]
  total: number
  pageNum: number
  error: string | null
}

export default function OperationLogsPage({
  operationLogs,
  total,
  pageNum,
  error,
}: OperationLogsPageProps) {
  const pageSize = 20
  const totalPages = Math.ceil(total / pageSize)

  if (error) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
            错误: {error}
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <div className="flex items-center gap-3">
              <Link to="/platform-admin/points-management/adjust">
                <Button variant="outline" size="sm" className="h-8 border-slate-300">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  返回
                </Button>
              </Link>
              <CardTitle className="text-lg font-semibold text-slate-900">积分调整操作记录</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 bg-slate-50">
                  <TableHead className="text-slate-900 font-semibold">手机号</TableHead>
                  <TableHead className="text-slate-900 font-semibold">调整积分</TableHead>
                  <TableHead className="text-slate-900 font-semibold">调整原因</TableHead>
                  <TableHead className="text-slate-900 font-semibold">操作人</TableHead>
                  <TableHead className="text-slate-900 font-semibold">操作时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {operationLogs.map((log) => {
                  // 解析操作详情: 格式为 "手机号: XXX, +/-XXX 积分, 原因: XXX"
                  const phoneMatch = log.operationDetails.match(/手机号[:：]?\s*(\d+)/)
                  const pointsMatch = log.operationDetails.match(/([+-]\d+)\s*积分/)
                  const reasonMatch = log.operationDetails.match(/原因[:：]?\s*(.+)$/)

                  const phone = phoneMatch ? phoneMatch[1] : '-'
                  const points = pointsMatch ? parseInt(pointsMatch[1]) : 0
                  const reason = reasonMatch ? reasonMatch[1] : '-'

                  return (
                    <TableRow key={log.id} className="hover:bg-slate-50 transition-colors border-slate-200">
                      <TableCell className="text-slate-900 font-medium">{phone}</TableCell>
                      <TableCell className={points > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                        {points > 0 ? `+${points}` : points}
                      </TableCell>
                      <TableCell className="text-slate-900 text-sm">{reason}</TableCell>
                      <TableCell className="text-slate-600 text-sm">{log.operator}</TableCell>
                      <TableCell className="text-slate-600 text-sm">{log.operatedAt}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>

            {/* 统计和分页 */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-slate-600 whitespace-nowrap">共 {total} 条</div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href={pageNum > 1 ? `?pageNum=${pageNum - 1}` : '#'}
                        className={pageNum === 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>

                    {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink href={`?pageNum=${page}`} isActive={page === pageNum}>
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        href={pageNum < totalPages ? `?pageNum=${pageNum + 1}` : '#'}
                        className={pageNum === totalPages ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
