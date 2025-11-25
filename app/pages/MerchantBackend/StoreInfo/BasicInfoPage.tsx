import { useState, useEffect } from 'react'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { Badge } from '~/components/ui/badge'
import { X, Upload, ImageIcon, Video } from 'lucide-react'
import EditableSection from './components/EditableSection'
import FormField from './components/FormField'
import DisplayValue from './components/DisplayValue'
import type { BasicInfo } from './types/storeInfo.types'
import { RECOMMEND_TAGS } from './types/storeInfo.types'

interface BasicInfoPageProps {
  data: BasicInfo
  onSave: (data: Partial<BasicInfo>) => Promise<void>
}

export default function BasicInfoPage({ data, onSave }: BasicInfoPageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<BasicInfo>(data)

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
    // 验证必填项
    if (!formData.contactPhone?.trim()) {
      alert('请填写联系电话')
      return
    }
    if (!formData.contactName?.trim()) {
      alert('请填写联系人名称')
      return
    }
    if (!formData.recommendTags || formData.recommendTags.length === 0) {
      alert('请至少选择1个门店推荐标签')
      return
    }
    if (formData.recommendTags.length > 2) {
      alert('门店推荐标签最多选择2项')
      return
    }
    if (!formData.description?.trim()) {
      alert('请填写门店介绍')
      return
    }
    if (!formData.listCover?.trim()) {
      alert('请上传列表封面')
      return
    }

    // 验证电话格式
    const phoneRegex = /^[\d-]+$/
    if (!phoneRegex.test(formData.contactPhone)) {
      alert('联系电话格式不正确')
      return
    }

    // 验证邮箱格式
    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        alert('邮箱格式不正确')
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

  const updateField = <K extends keyof BasicInfo>(field: K, value: BasicInfo[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleTag = (tagValue: string) => {
    const currentTags = formData.recommendTags || []
    if (currentTags.includes(tagValue)) {
      updateField(
        'recommendTags',
        currentTags.filter((t) => t !== tagValue)
      )
    } else {
      if (currentTags.length >= 2) {
        alert('最多选择2个标签')
        return
      }
      updateField('recommendTags', [...currentTags, tagValue])
    }
  }

  const addNewsImage = () => {
    // 模拟添加图片（实际需要上传组件）
    const currentImages = formData.latestNews || []
    updateField('latestNews', [
      ...currentImages,
      `https://placehold.co/400x300?text=News+${currentImages.length + 1}`,
    ])
  }

  const removeNewsImage = (index: number) => {
    const currentImages = formData.latestNews || []
    updateField(
      'latestNews',
      currentImages.filter((_, i) => i !== index)
    )
  }

  return (
    <div className="space-y-6">
      {/* 门店身份 */}
      <EditableSection
        title="门店身份"
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        isSaving={isSaving}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="名称" required locked>
            <div className="min-h-[36px] flex items-center px-3 py-2 bg-slate-50 text-slate-700 rounded-md border border-slate-200">
              {formData.name}
            </div>
          </FormField>

          <FormField label="城市" required locked>
            <div className="min-h-[36px] flex items-center px-3 py-2 bg-slate-50 text-slate-700 rounded-md border border-slate-200">
              {formData.city}
            </div>
          </FormField>

          <FormField label="详细地址" required locked className="md:col-span-2">
            <div className="min-h-[36px] flex items-center px-3 py-2 bg-slate-50 text-slate-700 rounded-md border border-slate-200">
              {formData.address}
            </div>
          </FormField>

          <FormField label="类型" required locked>
            <div className="min-h-[36px] flex items-center px-3 py-2 bg-slate-50 text-slate-700 rounded-md border border-slate-200">
              {formData.hotelCategory}
            </div>
          </FormField>

          <FormField label="房间数" required locked>
            <div className="min-h-[36px] flex items-center px-3 py-2 bg-slate-50 text-slate-700 rounded-md border border-slate-200">
              {formData.roomCount}
            </div>
          </FormField>
        </div>
      </EditableSection>

      {/* 联系方式 */}
      <EditableSection title="联系方式" isEditing={isEditing} hideActions>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="联系电话" required>
            {isEditing ? (
              <Input
                value={formData.contactPhone}
                onChange={(e) => updateField('contactPhone', e.target.value)}
                placeholder="请输入联系电话"
                className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            ) : (
              <DisplayValue value={formData.contactPhone} />
            )}
          </FormField>

          <FormField label="联系人名称" required>
            {isEditing ? (
              <Input
                value={formData.contactName}
                onChange={(e) => updateField('contactName', e.target.value)}
                placeholder="请输入联系人名称"
                className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            ) : (
              <DisplayValue value={formData.contactName} />
            )}
          </FormField>

          <FormField label="邮箱地址" className="md:col-span-2">
            {isEditing ? (
              <Input
                value={formData.email || ''}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="请输入邮箱地址"
                type="email"
                className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            ) : (
              <DisplayValue value={formData.email} />
            )}
          </FormField>
        </div>
      </EditableSection>

      {/* 门店展示 */}
      <EditableSection title="门店展示" isEditing={isEditing} hideActions>
        <div className="space-y-6">
          {/* 门店Logo */}
          <FormField label="门店Logo">
            {isEditing ? (
              <div className="flex items-center gap-4">
                {formData.logo && (
                  <div className="relative w-24 h-24 border-2 border-slate-200 rounded-lg overflow-hidden">
                    <img
                      src={formData.logo}
                      alt="Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                    <p className="text-sm text-slate-600">点击上传Logo</p>
                    <p className="text-xs text-slate-400 mt-1">建议尺寸：200x200</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {formData.logo ? (
                  <div className="w-24 h-24 border-2 border-slate-200 rounded-lg overflow-hidden">
                    <img
                      src={formData.logo}
                      alt="Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <span className="text-slate-500">—</span>
                )}
              </div>
            )}
          </FormField>

          {/* Slogan */}
          <FormField label="Slogan/门店推荐语">
            {isEditing ? (
              <Input
                value={formData.slogan || ''}
                onChange={(e) => updateField('slogan', e.target.value)}
                placeholder="请输入门店推荐语"
                className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            ) : (
              <DisplayValue value={formData.slogan} />
            )}
          </FormField>

          {/* 门店推荐标签 */}
          <FormField label="门店推荐标签" required hint="最多选择2项">
            {isEditing ? (
              <div className="flex flex-wrap gap-2">
                {RECOMMEND_TAGS.map((tag) => {
                  const isSelected = formData.recommendTags?.includes(tag.value)
                  return (
                    <Badge
                      key={tag.value}
                      variant={isSelected ? 'default' : 'outline'}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
                          : 'border-slate-300 text-slate-700 hover:border-blue-400 hover:text-blue-600'
                      }`}
                      onClick={() => toggleTag(tag.value)}
                    >
                      {tag.label}
                    </Badge>
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {formData.recommendTags && formData.recommendTags.length > 0 ? (
                  formData.recommendTags.map((tagValue) => {
                    const tag = RECOMMEND_TAGS.find((t) => t.value === tagValue)
                    return tag ? (
                      <Badge key={tagValue} variant="default" className="bg-blue-600">
                        {tag.label}
                      </Badge>
                    ) : null
                  })
                ) : (
                  <span className="text-slate-500">—</span>
                )}
              </div>
            )}
          </FormField>

          {/* 门店介绍 */}
          <FormField label="门店介绍" required>
            {isEditing ? (
              <Textarea
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="请输入门店介绍，支持换行"
                rows={8}
                className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
              />
            ) : (
              <div className="text-slate-900 whitespace-pre-wrap leading-relaxed">
                {formData.description || '—'}
              </div>
            )}
          </FormField>
        </div>
      </EditableSection>

      {/* 列表展示 */}
      <EditableSection title="列表展示" isEditing={isEditing} hideActions>
        <FormField label="列表封面" required hint="用于平台列表页展示">
          {isEditing ? (
            <div className="flex items-center gap-4">
              {formData.listCover && (
                <div className="relative w-40 h-30 border-2 border-slate-200 rounded-lg overflow-hidden">
                  <img
                    src={formData.listCover}
                    alt="列表封面"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <ImageIcon className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                  <p className="text-sm text-slate-600">点击上传列表封面</p>
                  <p className="text-xs text-slate-400 mt-1">建议尺寸：800x600</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {formData.listCover ? (
                <div className="w-40 h-30 border-2 border-slate-200 rounded-lg overflow-hidden">
                  <img
                    src={formData.listCover}
                    alt="列表封面"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <span className="text-slate-500">—</span>
              )}
            </div>
          )}
        </FormField>
      </EditableSection>

      {/* 视频素材 */}
      <EditableSection title="视频素材" isEditing={isEditing} hideActions>
        <div className="space-y-6">
          {/* 门店视频 */}
          <FormField label="门店视频">
            {isEditing ? (
              <div className="space-y-4">
                {formData.video && (
                  <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded-md">
                    <p className="font-medium mb-1">当前视频：</p>
                    <p className="text-xs break-all text-slate-500">{formData.video}</p>
                  </div>
                )}
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Video className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                  <p className="text-sm text-slate-600">点击上传门店视频</p>
                  <p className="text-xs text-slate-400 mt-1">
                    支持MP4格式，大小不超过100MB
                  </p>
                </div>
              </div>
            ) : (
              <div>
                {formData.video ? (
                  <div className="text-sm text-slate-600">
                    <p className="text-xs break-all text-slate-500">{formData.video}</p>
                  </div>
                ) : (
                  <span className="text-slate-500">—</span>
                )}
              </div>
            )}
          </FormField>

          {/* 视频封面 */}
          <FormField label="视频封面" hint="视频未播放时显示">
            {isEditing ? (
              <div className="flex items-center gap-4">
                {formData.videoCover && (
                  <div className="relative w-40 h-30 border-2 border-slate-200 rounded-lg overflow-hidden">
                    <img
                      src={formData.videoCover}
                      alt="视频封面"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <ImageIcon className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                    <p className="text-sm text-slate-600">点击上传视频封面</p>
                    <p className="text-xs text-slate-400 mt-1">建议尺寸：800x600</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {formData.videoCover ? (
                  <div className="w-40 h-30 border-2 border-slate-200 rounded-lg overflow-hidden">
                    <img
                      src={formData.videoCover}
                      alt="视频封面"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <span className="text-slate-500">—</span>
                )}
              </div>
            )}
          </FormField>
        </div>
      </EditableSection>

      {/* 动态信息 */}
      <EditableSection title="动态信息" isEditing={isEditing} hideActions>
        <FormField label="最新情报" hint="支持多张">
          {isEditing ? (
            <div className="space-y-4">
              {/* 已上传的图片 */}
              {formData.latestNews && formData.latestNews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.latestNews.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="relative group border-2 border-slate-200 rounded-lg overflow-hidden aspect-[4/3]"
                    >
                      <img
                        src={imageUrl}
                        alt={`最新情报 ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewsImage(index)}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {/* 上传按钮 */}
              <div
                onClick={addNewsImage}
                className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
              >
                <ImageIcon className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                <p className="text-sm text-slate-600">点击添加最新情报图片</p>
                <p className="text-xs text-slate-400 mt-1">建议尺寸：400x300</p>
              </div>
            </div>
          ) : (
            <div>
              {formData.latestNews && formData.latestNews.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.latestNews.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="border-2 border-slate-200 rounded-lg overflow-hidden aspect-[4/3]"
                    >
                      <img
                        src={imageUrl}
                        alt={`最新情报 ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-slate-500">—</span>
              )}
            </div>
          )}
        </FormField>
      </EditableSection>
    </div>
  )
}
