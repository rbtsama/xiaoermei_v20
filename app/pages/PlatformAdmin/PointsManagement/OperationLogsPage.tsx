/**
 * 平台后台 - 操作日志页面
 */

import type { OperationLog } from './types/valueAddedService.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { ArrowLeft } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import { useNavigate } from '@remix-run/react'

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
  const navigate = useNavigate()
  const pageSize = 20
  const totalPages = Math.ceil(total / pageSize)

  if (error) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            错误: {error}
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6 overflow-y-auto h-full">
        {/* 返回按钮 */}
        <div>
          <Button
            variant="outline"
            className="h-9 border-slate-300"
            onClick={() => navigate('/platform-admin/points-management/adjust')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回
          </Button>
        </div>

        {/* 操作日志表格 */}
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">操作日志</CardTitle>
          </CardHeader>
          <CardContent>
            {operationLogs.length === 0 ? (
              <div className="text-center text-slate-500 py-8">
                暂无操作日志
              </div>
            ) : (
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-200 bg-slate-50">
                        <TableHead className="text-slate-600 font-semibold w-[150px]">操作类型</TableHead>
                        <TableHead className="text-slate-600 font-semibold">操作详情</TableHead>
                        <TableHead className="text-slate-600 font-semibold w-[100px]">操作人</TableHead>
                        <TableHead className="text-slate-600 font-semibold w-[160px]">操作时间</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {operationLogs.map((log) => (
                        <TableRow key={log.id} className="hover:bg-slate-50 transition-colors">
                          <TableCell className="text-slate-900 font-medium">{log.operationType}</TableCell>
                          <TableCell className="text-slate-700">{log.operationDetails}</TableCell>
                          <TableCell className="text-slate-600">{log.operator}</TableCell>
                          <TableCell className="text-slate-600 text-sm">{log.operatedAt}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* 分页 */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 pt-4">
                    {pageNum > 1 && (
                      <Button
                        variant="outline"
                        className="h-8 px-2 text-xs border-slate-300"
                        onClick={() => navigate(`/platform-admin/points-management/operation-logs?pageNum=${pageNum - 1}`)}
                      >
                        上一页
                      </Button>
                    )}

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={page === pageNum ? 'default' : 'outline'}
                        className={`h-8 px-2 text-xs ${
                          page === pageNum
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'border-slate-300'
                        }`}
                        onClick={() => {
                          if (page !== pageNum) {
                            navigate(`/platform-admin/points-management/operation-logs?pageNum=${page}`)
                          }
                        }}
                      >
                        {page}
                      </Button>
                    ))}

                    {pageNum < totalPages && (
                      <Button
                        variant="outline"
                        className="h-8 px-2 text-xs border-slate-300"
                        onClick={() => navigate(`/platform-admin/points-management/operation-logs?pageNum=${pageNum + 1}`)}
                      >
                        下一页
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
