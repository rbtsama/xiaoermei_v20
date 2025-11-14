/**
 * 主布局组件：左侧菜单 + 右侧内容区
 */

import Sidebar, { menuConfig } from './Sidebar'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-white">
      {/* 左侧菜单 */}
      <Sidebar menuItems={menuConfig} />

      {/* 右侧内容区 */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  )
}
