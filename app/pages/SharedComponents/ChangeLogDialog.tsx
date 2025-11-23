/**
 * 修改记录弹窗组件
 * 展示设置页面的修改历史记录，支持分页
 */

import { useState } from 'react'
import type { ChangeLogEntry } from '~/pages/SharedTypes/changeLog.types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ChangeLogDialogProps {
  open: boolean
  onClose: () => void
  logs: ChangeLogEntry[]
  title?: string
}

export default function ChangeLogDialog({ open, onClose, logs, title = '修改记录' }: ChangeLogDialogProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const totalPages = Math.ceil(logs.length / pageSize)

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentLogs = logs.slice(startIndex, endIndex)

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {currentLogs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              暂无修改记录
            </div>
          ) : (
            <div className="space-y-4">
              {currentLogs.map((log) => (
                <div
                  key={log.id}
                  className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="grid grid-cols-12 gap-4">
                    {/* 修改内容 - 占据更多空间 */}
                    <div className="col-span-7">
                      <div className="text-xs text-muted-foreground mb-2">修改内容</div>
                      <div className="space-y-2">
                        {log.changes.map((change, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-medium text-slate-700">{change.field}：</span>
                            <div className="ml-2 mt-1">
                              <div className="flex items-center gap-2">
                                <span className="text-red-600 line-through">{change.oldValue}</span>
                                <span className="text-muted-foreground">→</span>
                                <span className="text-green-600 font-medium">{change.newValue}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 修改人 */}
                    <div className="col-span-2">
                      <div className="text-xs text-muted-foreground mb-2">修改人</div>
                      <div className="text-sm font-medium text-slate-900">{log.operator}</div>
                    </div>

                    {/* 修改时间 */}
                    <div className="col-span-3">
                      <div className="text-xs text-muted-foreground mb-2">修改时间</div>
                      <div className="text-sm text-slate-600">{log.operatedAt}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 分页控制 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div className="text-sm text-muted-foreground">
              共 {logs.length} 条记录，第 {currentPage} / {totalPages} 页
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                上一页
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                下一页
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
