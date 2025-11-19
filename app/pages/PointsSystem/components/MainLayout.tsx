/**
 * 主布局组件：左侧菜单 + 右侧内容区
 * 支持侧边栏收起，内容区自适应宽度
 */

import Sidebar, { menuConfig } from './Sidebar'
import { useViewMode } from '~/contexts/ViewModeContext'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { isSidebarCollapsed } = useViewMode()

  return (
    <div className="flex h-screen bg-white">
      {/* 左侧菜单 */}
      <Sidebar menuItems={menuConfig} />

      {/* 右侧内容区 - 根据侧边栏状态自适应宽度 */}
      <div
        className={`flex-1 overflow-hidden transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-0' : 'ml-0'
        }`}
      >
        {children}
      </div>
    </div>
  )
}
