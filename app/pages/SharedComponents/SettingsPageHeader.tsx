/**
 * 设置页面通用头部组件
 * 包含修改设置、保存、取消、修改记录按钮
 */

import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Edit, Save, X, History } from 'lucide-react'
import ChangeLogDialog from './ChangeLogDialog'
import type { ChangeLogEntry } from '~/pages/SharedTypes/changeLog.types'

interface SettingsPageHeaderProps {
  title: string
  description?: string
  isEditing: boolean
  onEditToggle: () => void
  onSave: () => void
  onCancel: () => void
  changeLogs?: ChangeLogEntry[]
  changeLogTitle?: string
}

export default function SettingsPageHeader({
  title,
  description,
  isEditing,
  onEditToggle,
  onSave,
  onCancel,
  changeLogs = [],
  changeLogTitle
}: SettingsPageHeaderProps) {
  const [showChangeLog, setShowChangeLog] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSave = () => {
    setShowConfirm(true)
  }

  const confirmSave = () => {
    setShowConfirm(false)
    onSave()
  }

  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          {description && (
            <p className="text-sm text-slate-500 mt-1">{description}</p>
          )}
        </div>

        <div className="flex gap-2">
          {!isEditing ? (
            <>
              {/* 默认状态：修改设置 + 修改记录 */}
              <Button onClick={onEditToggle}>
                <Edit className="h-4 w-4 mr-2" />
                修改设置
              </Button>
              <Button variant="outline" onClick={() => setShowChangeLog(true)}>
                <History className="h-4 w-4 mr-2" />
                修改记录
              </Button>
            </>
          ) : (
            <>
              {/* 编辑状态：保存 + 取消 */}
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                保存设置
              </Button>
              <Button variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                取消
              </Button>
            </>
          )}
        </div>
      </div>

      {/* 修改记录弹窗 */}
      <ChangeLogDialog
        open={showChangeLog}
        onClose={() => setShowChangeLog(false)}
        logs={changeLogs}
        title={changeLogTitle || `${title} - 修改记录`}
      />

      {/* 保存确认对话框 */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold mb-2">确认保存</h3>
            <p className="text-sm text-slate-600 mb-6">
              确定要保存这些修改吗？修改将立即生效。
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirm(false)}
              >
                取消
              </Button>
              <Button onClick={confirmSave}>
                确认保存
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
