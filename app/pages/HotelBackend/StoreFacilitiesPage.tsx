/**
 * 门店设施配置页面
 */

import { useState } from 'react'
import { Form, useNavigation } from '@remix-run/react'
import { FACILITY_CATEGORIES } from './constants/facilities'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import MainLayout from '../PointsSystem/components/MainLayout'

interface StoreFacilitiesPageProps {
  selectedFacilities: string[]
}

export default function StoreFacilitiesPage({ selectedFacilities }: StoreFacilitiesPageProps) {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const [selected, setSelected] = useState<string[]>(selectedFacilities)

  const toggleFacility = (facility: string) => {
    setSelected((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    )
  }

  const selectAllInCategory = (categoryOptions: string[]) => {
    const allSelected = categoryOptions.every((opt) => selected.includes(opt))
    if (allSelected) {
      // 取消全选
      setSelected((prev) => prev.filter((f) => !categoryOptions.includes(f)))
    } else {
      // 全选
      const newSelected = [...new Set([...selected, ...categoryOptions])]
      setSelected(newSelected)
    }
  }

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto bg-slate-50 p-6">
        <div className="space-y-6 max-w-7xl">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">门店设施</h1>
            <p className="text-sm text-slate-500 mt-1">
              配置门店拥有的设施和服务,已选择 {selected.length} 项
            </p>
          </div>
        </div>

        <Form method="post">
          <div className="space-y-6">
            {FACILITY_CATEGORIES.map((category) => {
              const categorySelected = category.options.filter((opt) =>
                selected.includes(opt)
              ).length
              const isAllSelected = categorySelected === category.options.length

              return (
                <Card key={category.key}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>
                          {category.name}
                          <span className="ml-3 text-sm font-normal text-slate-500">
                            已选 {categorySelected} / {category.options.length}
                          </span>
                        </CardTitle>
                        {category.note && (
                          <p className="text-sm text-red-500 mt-1">{category.note}</p>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => selectAllInCategory(category.options)}
                      >
                        {isAllSelected ? '取消全选' : '全选'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-6 gap-3">
                      {category.options.map((option) => (
                        <label
                          key={option}
                          className={`flex items-center gap-2 px-3 py-2 border rounded cursor-pointer transition-colors ${
                            selected.includes(option)
                              ? 'bg-blue-50 border-blue-500 text-blue-700'
                              : 'bg-white border-slate-300 hover:bg-slate-50'
                          }`}
                          onClick={() => toggleFacility(option)}
                        >
                          <input
                            type="checkbox"
                            name="facilities"
                            value={option}
                            checked={selected.includes(option)}
                            onChange={() => {}} // 由onClick处理
                            className="w-4 h-4"
                          />
                          <span className="text-sm">{option}</span>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* 保存按钮 */}
          <div className="flex justify-end mt-6">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? '保存中...' : '保存设施配置'}
            </Button>
          </div>
        </Form>
        </div>
        </div>
        </div>
    </MainLayout>
  )
}
