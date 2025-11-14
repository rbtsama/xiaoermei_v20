/**
 * 操作日志按钮组件（通用）
 * 显示在每个页面标题右侧，点击打开日志弹窗
 */

import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import type { CommonOperationLog } from '../../AccountManagement/types/account.types'

interface OperationLogButtonProps {
  moduleName: string
  logs?: CommonOperationLog[]
}

export default function OperationLogButton({ moduleName, logs = [] }: OperationLogButtonProps) {
  const [showDialog, setShowDialog] = useState(false)

  // 模拟操作日志（如果没有传入）
  const displayLogs = logs.length > 0 ? logs : [
    {
      logId: 'LOG_DEMO_001',
      moduleName,
      operationType: '查看',
      description: `查看${moduleName}页面`,
      operatorName: '张总',
      operatedAt: '01/15/25 14:32:15'
    }
  ]

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowDialog(true)}
        className="text-slate-400 hover:text-slate-600 text-xs"
      >
        📋 操作记录
      </Button>

      {/* 操作日志弹窗 */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl max-h-[80vh] flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>操作记录 - {moduleName}</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setShowDialog(false)}>
                  ✕
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto pt-6">
              {displayLogs.length === 0 ? (
                <div className="text-center text-slate-400 py-8">暂无操作记录</div>
              ) : (
                <div className="space-y-2">
                  {displayLogs.map((log) => (
                    <div
                      key={log.logId}
                      className="flex items-start gap-4 p-3 bg-slate-50 rounded border border-slate-200 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex-shrink-0 w-36 text-xs text-slate-500">
                        {log.operatedAt}
                      </div>
                      <div className="flex-shrink-0 w-20">
                        <span className="text-xs font-medium text-slate-700">{log.operatorName}</span>
                      </div>
                      <div className="flex-1 text-sm text-slate-600">{log.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>

            <div className="border-t p-4 flex justify-end">
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                关闭
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
