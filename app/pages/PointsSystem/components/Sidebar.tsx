/**
 * 左侧导航菜单组件
 */

import { Link, useLocation } from '@remix-run/react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface MenuItem {
  title: string
  path?: string
  children?: MenuItem[]
}

interface SidebarProps {
  menuItems: MenuItem[]
}

export default function Sidebar({ menuItems }: SidebarProps) {
  const location = useLocation()
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    '积分系统': true // 默认展开积分系统
  })

  const toggleMenu = (title: string) => {
    setExpandedMenus(prev => ({ ...prev, [title]: !prev[title] }))
  }

  const isActive = (path?: string) => {
    if (!path) return false
    return location.pathname === path
  }

  return (
    <div className="w-64 h-screen bg-slate-50 border-r border-slate-200 flex flex-col">
      {/* Logo区域 */}
      <div className="p-4 border-b border-slate-200">
        <Link to="/" className="block">
          <h1 className="text-xl font-bold text-slate-900">酒店SAAS学习平台</h1>
          <p className="text-xs text-slate-500 mt-1">模块化设计参考</p>
        </Link>
      </div>

      {/* 菜单区域 */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.title}>
              {/* 一级菜单 */}
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                  >
                    <span>{item.title}</span>
                    {expandedMenus[item.title] ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>

                  {/* 二级菜单 */}
                  {expandedMenus[item.title] && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path || '#'}
                          className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                            isActive(child.path)
                              ? 'bg-blue-50 text-blue-700 font-medium'
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path || '#'}
                  className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* 底部信息 */}
      <div className="p-4 border-t border-slate-200">
        <p className="text-xs text-slate-500">
          参考：美团、携程、华住会
        </p>
      </div>
    </div>
  )
}

/**
 * 菜单配置
 */
export const menuConfig: MenuItem[] = [
  {
    title: '积分系统',
    children: [
      { title: '积分规则配置', path: '/points-system/rule-config' },
      { title: '用户积分管理', path: '/points-system/user-account' }
    ]
  },
  {
    title: '会员体系',
    children: [
      { title: '会员等级配置', path: '/member/level-config' },
      { title: '会员权益管理', path: '/member/benefits' }
    ]
  },
  {
    title: '优惠券',
    children: [
      { title: '优惠券配置', path: '/coupon/config' },
      { title: '优惠券发放', path: '/coupon/grant' },
      { title: '核销记录', path: '/coupon/verify' }
    ]
  },
  {
    title: '酒店管理',
    children: [
      { title: '加盟申请', path: '/hotel/join-application' },
      { title: '合作酒店', path: '/hotel/partner-list' },
      { title: '协议模板管理', path: '/hotel/contract-template' },
      { title: '签约记录', path: '/hotel/signing-record' }
    ]
  },
  {
    title: '订单管理',
    children: [
      { title: '订单列表', path: '/order/list' },
      { title: '订单详情', path: '/order/detail' },
      { title: '退款管理', path: '/order/refund' }
    ]
  },
  {
    title: '账号管理',
    children: [
      { title: '账号列表', path: '/account/list' }
    ]
  }
]
