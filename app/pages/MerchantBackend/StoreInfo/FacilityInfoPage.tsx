import { useState, useEffect } from 'react'
import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'
import { Badge } from '~/components/ui/badge'
import EditableSection from './components/EditableSection'
import type { FacilityInfo } from './types/storeInfo.types'
import {
  HIGHLIGHT_TAGS,
  TRANSPORT_SERVICES,
  CLEANING_SERVICES,
  SAFETY_SERVICES,
  SPORTS_SERVICES,
  SPA_SERVICES,
  ACCESSIBILITY_SERVICES,
} from './types/storeInfo.types'

interface FacilityInfoPageProps {
  data: FacilityInfo
  onSave: (data: Partial<FacilityInfo>) => Promise<void>
}

export default function FacilityInfoPage({ data, onSave }: FacilityInfoPageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<FacilityInfo>(data)

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

  const toggleFacility = (field: keyof FacilityInfo, value: string) => {
    const currentList = formData[field] as string[]
    if (currentList.includes(value)) {
      setFormData((prev) => ({
        ...prev,
        [field]: currentList.filter((item) => item !== value),
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: [...currentList, value],
      }))
    }
  }

  // 渲染亮点标签（value/label结构）
  const renderHighlights = () => {
    const selectedValues = formData.highlights

    if (isEditing) {
      return (
        <div className="grid grid-cols-4 gap-4">
          {HIGHLIGHT_TAGS.map((tag) => (
            <div key={tag.value} className="flex items-center space-x-2">
              <Checkbox
                id={`highlight-${tag.value}`}
                checked={selectedValues.includes(tag.value)}
                onCheckedChange={() => toggleFacility('highlights', tag.value)}
              />
              <Label
                htmlFor={`highlight-${tag.value}`}
                className="font-normal cursor-pointer text-sm text-slate-700"
              >
                {tag.label}
              </Label>
            </div>
          ))}
        </div>
      )
    }

    // 查看状态：使用Badge显示
    return (
      <div className="flex flex-wrap gap-2">
        {selectedValues.length > 0 ? (
          selectedValues.map((value) => {
            const tag = HIGHLIGHT_TAGS.find((t) => t.value === value)
            return (
              <Badge
                key={value}
                variant="outline"
                className="border-slate-300 text-slate-700 bg-slate-50 font-normal"
              >
                {tag?.label || value}
              </Badge>
            )
          })
        ) : (
          <span className="text-slate-500">—</span>
        )}
      </div>
    )
  }

  // 渲染普通设施checkboxes（字符串数组）
  const renderFacilityCheckboxes = (
    field: keyof FacilityInfo,
    facilities: string[],
    gridCols: string = 'grid-cols-3'
  ) => {
    const selectedFacilities = formData[field] as string[]

    if (isEditing) {
      return (
        <div className={`grid ${gridCols} gap-4`}>
          {facilities.map((facility) => (
            <div key={facility} className="flex items-center space-x-2">
              <Checkbox
                id={`${field}-${facility}`}
                checked={selectedFacilities.includes(facility)}
                onCheckedChange={() => toggleFacility(field, facility)}
              />
              <Label
                htmlFor={`${field}-${facility}`}
                className="font-normal cursor-pointer text-sm text-slate-700"
              >
                {facility}
              </Label>
            </div>
          ))}
        </div>
      )
    }

    // 查看状态：使用Badge显示
    return (
      <div className="flex flex-wrap gap-2">
        {selectedFacilities.length > 0 ? (
          selectedFacilities.map((facility) => (
            <Badge
              key={facility}
              variant="outline"
              className="border-slate-300 text-slate-700 bg-slate-50 font-normal"
            >
              {facility}
            </Badge>
          ))
        ) : (
          <span className="text-slate-500">—</span>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 亮点标签 */}
      <EditableSection
        title="亮点标签"
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        isSaving={isSaving}
      >
        {renderHighlights()}
      </EditableSection>

      {/* 交通服务 */}
      <EditableSection title="交通服务" isEditing={isEditing} hideActions>
        {renderFacilityCheckboxes('transportServices', TRANSPORT_SERVICES)}
      </EditableSection>

      {/* 清洁服务 */}
      <EditableSection title="清洁服务" isEditing={isEditing} hideActions>
        {renderFacilityCheckboxes('cleaningServices', CLEANING_SERVICES)}
      </EditableSection>

      {/* 安全安保 */}
      <EditableSection title="安全安保" isEditing={isEditing} hideActions>
        {renderFacilityCheckboxes('safetyServices', SAFETY_SERVICES)}
      </EditableSection>

      {/* 运动设施 */}
      <EditableSection title="运动设施" isEditing={isEditing} hideActions>
        {renderFacilityCheckboxes('sportsServices', SPORTS_SERVICES, 'grid-cols-4')}
      </EditableSection>

      {/* 康体设施 */}
      <EditableSection title="康体设施" isEditing={isEditing} hideActions>
        {renderFacilityCheckboxes('spaServices', SPA_SERVICES)}
      </EditableSection>

      {/* 无障碍设施 */}
      <EditableSection title="无障碍设施" isEditing={isEditing} hideActions>
        {renderFacilityCheckboxes('accessibilityServices', ACCESSIBILITY_SERVICES)}
      </EditableSection>
    </div>
  )
}
