/**
 * 权限矩阵组件
 * 展示所有菜单的查看和编辑权限
 */

import type { MenuItem, PermissionConfig } from '../types/account.types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'

interface PermissionMatrixProps {
  menuItems: MenuItem[]
  permissions: PermissionConfig
  onChange: (menuId: string, type: 'view' | 'edit', value: boolean) => void
  disabled?: boolean
}

export default function PermissionMatrix({ menuItems, permissions, onChange, disabled = false }: PermissionMatrixProps) {
  // 按一级菜单分组
  const groupedMenus = menuItems.reduce((acc, item) => {
    if (!acc[item.parentMenu]) {
      acc[item.parentMenu] = []
    }
    acc[item.parentMenu].push(item)
    return acc
  }, {} as Record<string, MenuItem[]>)

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead className="w-[35%]">一级菜单</TableHead>
            <TableHead className="w-[35%]">二级菜单</TableHead>
            <TableHead className="text-center w-[15%]">查看权限</TableHead>
            <TableHead className="text-center w-[15%]">编辑权限</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(groupedMenus).map(([parentMenu, items]) => (
            items.map((item, index) => (
              <TableRow key={item.menuId}>
                {/* 一级菜单（合并单元格效果通过只在第一行显示实现） */}
                {index === 0 && (
                  <TableCell rowSpan={items.length} className="font-medium bg-slate-50/50">
                    {parentMenu}
                  </TableCell>
                )}

                {/* 二级菜单 */}
                <TableCell className="text-sm">{item.menuName}</TableCell>

                {/* 查看权限 */}
                <TableCell className="text-center">
                  <input
                    type="checkbox"
                    checked={permissions[item.menuId]?.canView || false}
                    onChange={(e) => {
                      onChange(item.menuId, 'view', e.target.checked)
                      // 如果取消查看权限，自动取消编辑权限
                      if (!e.target.checked) {
                        onChange(item.menuId, 'edit', false)
                      }
                    }}
                    disabled={disabled}
                    className="w-4 h-4 rounded border-slate-300"
                  />
                </TableCell>

                {/* 编辑权限 */}
                <TableCell className="text-center">
                  <input
                    type="checkbox"
                    checked={permissions[item.menuId]?.canEdit || false}
                    onChange={(e) => {
                      onChange(item.menuId, 'edit', e.target.checked)
                      // 如果勾选编辑权限，自动勾选查看权限
                      if (e.target.checked) {
                        onChange(item.menuId, 'view', true)
                      }
                    }}
                    disabled={disabled || !permissions[item.menuId]?.canView}
                    className="w-4 h-4 rounded border-slate-300"
                  />
                </TableCell>
              </TableRow>
            ))
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

/**
 * 快捷操作：全选/全不选
 */
export function PermissionQuickActions({
  menuItems,
  onSelectAll,
  onClearAll,
  disabled = false
}: {
  menuItems: MenuItem[]
  onSelectAll: () => void
  onClearAll: () => void
  disabled?: boolean
}) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onSelectAll}
        disabled={disabled}
        className="text-sm text-blue-600 hover:text-blue-700 underline disabled:opacity-50"
      >
        全选
      </button>
      <span className="text-slate-300">|</span>
      <button
        onClick={onClearAll}
        disabled={disabled}
        className="text-sm text-slate-600 hover:text-slate-700 underline disabled:opacity-50"
      >
        清空
      </button>
    </div>
  )
}
