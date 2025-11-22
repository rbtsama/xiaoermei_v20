/**
 * 学习内容弹窗组件
 * 用于展示页面的学习内容（仅在学习模式下显示）
 */

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { BookOpen } from 'lucide-react'

interface LearningModalProps {
  title: string
  children: React.ReactNode
  isLearningMode?: boolean
}

export default function LearningModal({ title, children, isLearningMode = true }: LearningModalProps) {
  const [open, setOpen] = useState(false)

  // 展示模式下不显示学习按钮
  if (!isLearningMode) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <BookOpen className="w-4 h-4" />
          学习
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 prose prose-slate max-w-none">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}
