/**
 * 退款申请管理页面
 */

import { useState } from 'react'
import { Link } from '@remix-run/react'
import type { RefundRequest } from './types/dispute.types'
import { RefundStatus } from './types/dispute.types'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import { Eye, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import MainLayout from '../PointsSystem/components/MainLayout'

interface RefundRequestsPageProps {
  requests: RefundRequest[]
}

const statusLabels: Record<RefundStatus, string> = {
  [RefundStatus.PENDING_MERCHANT]: '待商家处理',
  [RefundStatus.ARBITRATING]: '仲裁中',
  [RefundStatus.REFUNDED]: '已退款',
  [RefundStatus.REJECTED]: '已驳回',
}

const statusStyles: Record<RefundStatus, string> = {
  [RefundStatus.PENDING_MERCHANT]: 'bg-orange-50 text-orange-700 border-orange-200',
  [RefundStatus.ARBITRATING]: 'bg-blue-50 text-blue-700 border-blue-200',
  [RefundStatus.REFUNDED]: 'bg-green-50 text-green-700 border-green-200',
  [RefundStatus.REJECTED]: 'bg-red-50 text-red-700 border-red-200',
}

export default function RefundRequestsPage({ requests }: RefundRequestsPageProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [jumpPage, setJumpPage] = useState('')

  // 筛选逻辑
  const filteredRequests = requests.filter((r) => {
    const matchStatus = selectedStatus === 'all' || r.status === selectedStatus
    const matchSearch = !searchKeyword ||
      r.orderNumber.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      r.userId.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      r.hotelName.toLowerCase().includes(searchKeyword.toLowerCase())
    return matchStatus && matchSearch
  })

  // 分页逻辑
  const totalItems = filteredRequests.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const currentRequests = filteredRequests.slice(startIndex, endIndex)

  // 页码数组
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      }
    }
    return pages
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1)
  }

  const handleJumpPage = () => {
    const page = parseInt(jumpPage, 10)
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      setJumpPage('')
    }
  }

  const handleSearch = () => {
    setCurrentPage(1)
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-7xl mx-auto p-8 space-y-6">
          {/* 页面标题 */}
          <div>
            <h1 className="text-2xl font-bold text-slate-900">退款申请</h1>
          </div>

          {/* 筛选器 */}
          <Card className="rounded-xl border-slate-200 bg-white shadow-md">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-3 items-end">
                <div className="flex-1 min-w-[200px]">
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">搜索</label>
                  <Input
                    placeholder="订单号 / 用户ID / 酒店名称"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="h-9 border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                  />
                </div>
                <div className="w-40">
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">状态</label>
                  <Select value={selectedStatus} onValueChange={(v) => { setSelectedStatus(v); setCurrentPage(1) }}>
                    <SelectTrigger className="h-9 border-slate-300">
                      <SelectValue placeholder="全部状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部状态</SelectItem>
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSearch} className="h-9 bg-blue-600 hover:bg-blue-700 text-white">
                  搜索
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 退款申请列表 */}
          <Card className="rounded-xl border-slate-200 bg-white shadow-md">
            <CardContent className="p-0">
              {filteredRequests.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  暂无退款申请
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200 bg-slate-50">
                      <TableHead className="text-slate-900 font-semibold">订单号</TableHead>
                      <TableHead className="text-slate-900 font-semibold">用户ID</TableHead>
                      <TableHead className="text-slate-900 font-semibold">酒店</TableHead>
                      <TableHead className="text-slate-900 font-semibold">申请退款金额</TableHead>
                      <TableHead className="text-slate-900 font-semibold">退款比例</TableHead>
                      <TableHead className="text-slate-900 font-semibold">状态</TableHead>
                      <TableHead className="text-slate-900 font-semibold">申请时间</TableHead>
                      <TableHead className="text-slate-900 font-semibold">更新时间</TableHead>
                      <TableHead className="text-slate-900 font-semibold">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentRequests.map((request) => (
                      <TableRow key={request.id} className="hover:bg-slate-50 transition-colors border-slate-200">
                        <TableCell className="font-mono text-sm text-slate-900">
                          {request.orderNumber}
                        </TableCell>
                        <TableCell className="text-sm text-slate-900">
                          {request.userId}
                        </TableCell>
                        <TableCell className="text-sm text-slate-900 max-w-[150px] truncate" title={request.hotelName}>
                          {request.hotelName}
                        </TableCell>
                        <TableCell className="text-sm font-medium text-slate-900">
                          ¥{request.refundAmount.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-sm text-slate-900">
                          {request.refundRatio}%
                        </TableCell>
                        <TableCell>
                          <Badge className={statusStyles[request.status]}>
                            {statusLabels[request.status]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {request.createdAt}
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {request.updatedAt}
                        </TableCell>
                        <TableCell>
                          <Link to={`/dispute/refund-requests/${request.id}`}>
                            <Button variant="outline" size="sm" className="h-8 px-3 border-slate-300 hover:border-blue-500 hover:text-blue-600">
                              <Eye className="w-4 h-4 mr-1" />
                              查看详情
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* 分页组件 */}
          {totalItems > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-lg border border-slate-200 p-4">
              <div className="text-sm text-slate-600">
                共 <span className="font-medium text-slate-900">{totalItems}</span> 条记录，
                显示第 <span className="font-medium text-slate-900">{startIndex + 1}</span> - <span className="font-medium text-slate-900">{endIndex}</span> 条
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0 border-slate-300 hover:border-slate-400 hover:bg-slate-50 disabled:opacity-50"
                  title="首页"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0 border-slate-300 hover:border-slate-400 hover:bg-slate-50 disabled:opacity-50"
                  title="上一页"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-slate-400">...</span>
                  ) : (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(page as number)}
                      className={`h-8 w-8 p-0 ${
                        currentPage === page
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      {page}
                    </Button>
                  )
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0 border-slate-300 hover:border-slate-400 hover:bg-slate-50 disabled:opacity-50"
                  title="下一页"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0 border-slate-300 hover:border-slate-400 hover:bg-slate-50 disabled:opacity-50"
                  title="末页"
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">每页</span>
                  <Select value={String(itemsPerPage)} onValueChange={handleItemsPerPageChange}>
                    <SelectTrigger className="h-8 w-20 border-slate-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-slate-600">条</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">跳至</span>
                  <Input
                    type="number"
                    min={1}
                    max={totalPages}
                    value={jumpPage}
                    onChange={(e) => setJumpPage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleJumpPage()}
                    className="h-8 w-16 text-center border-slate-300"
                  />
                  <span className="text-sm text-slate-600">页</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleJumpPage}
                    className="h-8 px-3 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
                  >
                    确定
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
