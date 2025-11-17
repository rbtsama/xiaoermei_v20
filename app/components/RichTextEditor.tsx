/**
 * 富文本编辑器组件
 * 基于 react-quill，支持加粗、斜体、下划线、列表等
 */

import { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'

// 动态导入
let ReactQuill: any = null
if (typeof window !== 'undefined') {
  ReactQuill = require('react-quill').default
}

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = '请输入内容...',
  className = ''
}: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !ReactQuill) {
    return (
      <div className={`border rounded-md p-4 bg-slate-50 ${className}`}>
        <p className="text-sm text-muted-foreground">编辑器加载中...</p>
      </div>
    )
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link'],
      ['clean']
    ]
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'color',
    'background',
    'align',
    'link'
  ]

  return (
    <div className={className}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="bg-white rounded-md"
      />
    </div>
  )
}
