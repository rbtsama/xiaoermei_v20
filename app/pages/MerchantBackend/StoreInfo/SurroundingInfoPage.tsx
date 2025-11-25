import { useState, useEffect } from 'react'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Trash2, Plus, ChevronUp, ChevronDown } from 'lucide-react'
import EditableSection from './components/EditableSection'
import type { SurroundingInfo, NearbyLocation } from './types/storeInfo.types'
import { LOCATION_CATEGORIES } from './types/storeInfo.types'

interface SurroundingInfoPageProps {
  data: SurroundingInfo
  onSave: (data: Partial<SurroundingInfo>) => Promise<void>
}

export default function SurroundingInfoPage({ data, onSave }: SurroundingInfoPageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<SurroundingInfo>(data)

  useEffect(() => {
    setFormData(data)
  }, [data])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    if (JSON.stringify(formData) !== JSON.stringify(data)) {
      if (!confirm('您有未保存的修改，确定要取消吗？')) {
        return
      }
    }
    setFormData(data)
    setIsEditing(false)
  }

  const handleSave = async () => {
    // 验证数据
    for (const location of formData.locations) {
      if (!location.name.trim()) {
        alert('请填写位置名称')
        return
      }
      if (!location.distance || location.distance < 0) {
        alert('请填写正确的距离')
        return
      }
    }

    setIsSaving(true)
    try {
      await onSave(formData)
      setIsEditing(false)
    } catch (error) {
      alert('保存失败，请重试')
    } finally {
      setIsSaving(false)
    }
  }

  const addLocation = (category: string) => {
    const newLocation: NearbyLocation = {
      id: `temp-${Date.now()}`,
      category: category as any,
      name: '',
      distance: 0,
      distanceType: 'straight',
    }
    setFormData((prev) => ({
      ...prev,
      locations: [...prev.locations, newLocation],
    }))
  }

  const removeLocation = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      locations: prev.locations.filter((loc) => loc.id !== id),
    }))
  }

  const updateLocation = (id: string, field: keyof NearbyLocation, value: any) => {
    setFormData((prev) => ({
      ...prev,
      locations: prev.locations.map((loc) =>
        loc.id === id ? { ...loc, [field]: value } : loc
      ),
    }))
  }

  const moveLocation = (id: string, direction: 'up' | 'down') => {
    setFormData((prev) => {
      const currentIndex = prev.locations.findIndex((loc) => loc.id === id)
      if (currentIndex === -1) return prev

      const newLocations = [...prev.locations]
      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

      if (targetIndex < 0 || targetIndex >= newLocations.length) return prev

      // Swap
      ;[newLocations[currentIndex], newLocations[targetIndex]] = [
        newLocations[targetIndex],
        newLocations[currentIndex],
      ]

      return {
        ...prev,
        locations: newLocations,
      }
    })
  }

  const getCategoryLabel = (value: string) => {
    return LOCATION_CATEGORIES.find((c) => c.value === value)?.label || value
  }

  // 按类别分组
  const groupedLocations = formData.locations.reduce(
    (acc, loc) => {
      if (!acc[loc.category]) {
        acc[loc.category] = []
      }
      acc[loc.category].push(loc)
      return acc
    },
    {} as Record<string, NearbyLocation[]>
  )

  return (
    <div className="space-y-6">
      <EditableSection
        title="周边位置信息"
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        isSaving={isSaving}
      >
        {isEditing ? (
          <div className="space-y-8">
            {LOCATION_CATEGORIES.map((category) => {
              const categoryLocations = formData.locations.filter(
                (loc) => loc.category === category.value
              )

              return (
                <div key={category.value} className="space-y-3">
                  {/* 分类标题 */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <h4 className="text-sm font-semibold text-slate-900">{category.label}</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addLocation(category.value)}
                      className="h-8 border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1.5" />
                      新增
                    </Button>
                  </div>

                  {/* 位置列表 */}
                  <div className="space-y-2">
                    {categoryLocations.length > 0 ? (
                      categoryLocations.map((location, index) => {
                        const globalIndex = formData.locations.findIndex(
                          (loc) => loc.id === location.id
                        )
                        return (
                          <div
                            key={location.id}
                            className="grid grid-cols-12 gap-3 items-center p-3 bg-slate-50 rounded border border-slate-200"
                          >
                            {/* 名称 */}
                            <div className="col-span-4">
                              <Input
                                value={location.name}
                                onChange={(e) =>
                                  updateLocation(location.id, 'name', e.target.value)
                                }
                                placeholder="位置名称"
                                className="h-9 border-slate-300 bg-white"
                              />
                            </div>

                            {/* 距离 */}
                            <div className="col-span-2">
                              <Input
                                type="number"
                                min="0"
                                value={location.distance}
                                onChange={(e) =>
                                  updateLocation(
                                    location.id,
                                    'distance',
                                    parseInt(e.target.value) || 0
                                  )
                                }
                                placeholder="距离(米)"
                                className="h-9 border-slate-300 bg-white"
                              />
                            </div>

                            {/* 距离类型 */}
                            <div className="col-span-3">
                              <Select
                                value={location.distanceType}
                                onValueChange={(value: 'straight' | 'driving') =>
                                  updateLocation(location.id, 'distanceType', value)
                                }
                              >
                                <SelectTrigger className="h-9 border-slate-300 bg-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="straight">直线距离</SelectItem>
                                  <SelectItem value="driving">驾车距离</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {/* 操作按钮 */}
                            <div className="col-span-3 flex items-center gap-1">
                              {/* 上移 */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => moveLocation(location.id, 'up')}
                                disabled={globalIndex === 0}
                                className="h-8 w-8 p-0 hover:bg-slate-200 disabled:opacity-30"
                                title="上移"
                              >
                                <ChevronUp className="h-4 w-4" />
                              </Button>

                              {/* 下移 */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => moveLocation(location.id, 'down')}
                                disabled={globalIndex === formData.locations.length - 1}
                                className="h-8 w-8 p-0 hover:bg-slate-200 disabled:opacity-30"
                                title="下移"
                              >
                                <ChevronDown className="h-4 w-4" />
                              </Button>

                              {/* 删除 */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeLocation(location.id)}
                                className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                                title="删除"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="text-center text-slate-400 py-4 text-sm">
                        暂无{category.label}信息，点击上方"新增"按钮添加
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="space-y-6">
            {LOCATION_CATEGORIES.map((category) => {
              const locations = groupedLocations[category.value] || []
              if (locations.length === 0) return null

              return (
                <div key={category.value}>
                  <h4 className="text-sm font-semibold text-slate-700 mb-3">
                    {category.label}
                  </h4>
                  <div className="space-y-2">
                    {locations.map((location) => (
                      <div
                        key={location.id}
                        className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded"
                      >
                        <span className="text-slate-900">{location.name}</span>
                        <span className="text-sm text-slate-600">
                          {location.distance >= 1000
                            ? `${(location.distance / 1000).toFixed(1)}km`
                            : `${location.distance}m`}{' '}
                          ({location.distanceType === 'straight' ? '直线' : '驾车'})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}

            {formData.locations.length === 0 && (
              <div className="text-center text-slate-500 py-8">暂无周边信息</div>
            )}
          </div>
        )}
      </EditableSection>
    </div>
  )
}
