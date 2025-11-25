import { useState, useEffect } from 'react'
import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'
import { Badge } from '~/components/ui/badge'
import EditableSection from './components/EditableSection'
import type { FacilityInfo } from './types/storeInfo.types'

interface FacilityInfoPageProps {
  data: FacilityInfo
  onSave: (data: Partial<FacilityInfo>) => Promise<void>
}

// 亮点标签选项
const HIGHLIGHT_OPTIONS = [
  '免费WiFi',
  '免费停车',
  '宠物友好',
  '近地铁',
  '含早',
  '亲子友好',
  '行李寄存',
  '网红打卡',
  '浴缸',
  '私汤温泉',
]

// 交通服务选项
const TRANSPORT_SERVICE_OPTIONS = [
  '叫车服务',
  '接送站服务',
  '接送机服务',
  '租车服务',
  '自行车租赁服务',
  '旅游交通图',
]

// 清洁服务选项
const CLEANING_SERVICE_OPTIONS = [
  '洗衣房',
  '洗漱用具',
  '晾衣架',
  '干衣机',
  '熨斗/挂烫机',
  '外送洗衣服务',
  '干洗服务',
]

// 安全安保选项
const SAFETY_SERVICE_OPTIONS = [
  '公共区域监控',
  '门禁系统',
  '医务室',
  '急救包',
  '安全报警器',
  '火灾报警器',
  '烟雾报警器',
]

// 运动设施选项
const SPORTS_SERVICE_OPTIONS = [
  '健身室',
  '教练',
  '瑜伽课',
  '瑜伽垫',
  '钓鱼',
  '骑马',
  '射击',
  '乒乓球',
  '足球场',
  '篮球场',
  '网球场',
  '模拟高尔夫',
  '高尔夫球场',
  '滑雪',
  '沙滩排球',
  '水上运动',
  '浮潜',
]

// 康体设施选项
const SPA_SERVICE_OPTIONS = ['温泉', '足浴', '桑拿', '按摩', 'SPA']

// 无障碍设施选项
const ACCESSIBILITY_SERVICE_OPTIONS = [
  '走廊扶手',
  '楼梯扶手',
  '泳池坡道',
  '无障碍客房',
  '无障碍通道',
  '助听设备',
  '手语服务',
  '提供轮椅',
]

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
        {renderFacilityCheckboxes('highlights', HIGHLIGHT_OPTIONS, 'grid-cols-4')}
      </EditableSection>

      {/* 交通服务 */}
      <EditableSection title="交通服务" isEditing={isEditing} hideActions>
        {renderFacilityCheckboxes('transportServices', TRANSPORT_SERVICE_OPTIONS)}
      </EditableSection>

      {/* 清洁服务 */}
      <EditableSection title="清洁服务" isEditing={isEditing} hideActions>
        {renderFacilityCheckboxes('cleaningServices', CLEANING_SERVICE_OPTIONS)}
      </EditableSection>

      {/* 安全安保 */}
      <EditableSection title="安全安保" isEditing={isEditing} hideActions>
        {renderFacilityCheckboxes('safetyServices', SAFETY_SERVICE_OPTIONS)}
      </EditableSection>

      {/* 运动设施 */}
      <EditableSection title="运动设施" isEditing={isEditing} hideActions>
        {renderFacilityCheckboxes('sportsServices', SPORTS_SERVICE_OPTIONS, 'grid-cols-4')}
      </EditableSection>

      {/* 康体设施 */}
      <EditableSection title="康体设施" isEditing={isEditing} hideActions>
        {renderFacilityCheckboxes('spaServices', SPA_SERVICE_OPTIONS)}
      </EditableSection>

      {/* 无障碍设施 */}
      <EditableSection title="无障碍设施" isEditing={isEditing} hideActions>
        {renderFacilityCheckboxes('accessibilityServices', ACCESSIBILITY_SERVICE_OPTIONS)}
      </EditableSection>
    </div>
  )
}
