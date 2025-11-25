import { useState, useEffect } from 'react'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Upload, X, MoveUp, MoveDown } from 'lucide-react'
import EditableSection from './components/EditableSection'
import FormField from './components/FormField'
import type { ImageInfo, StoreImage } from './types/storeInfo.types'

interface ImageInfoPageProps {
  data: ImageInfo
  onSave: (data: Partial<ImageInfo>) => Promise<void>
  onSaveShareText?: (text: string) => Promise<void>
}

export default function ImageInfoPage({ data, onSave, onSaveShareText }: ImageInfoPageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isSavingShareText, setIsSavingShareText] = useState(false)
  const [formData, setFormData] = useState<ImageInfo>(data)
  const [shareTextValue, setShareTextValue] = useState(data.shareText || '')

  useEffect(() => {
    setFormData(data)
    setShareTextValue(data.shareText || '')
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
    setShareTextValue(data.shareText || '')
    setIsEditing(false)
  }

  const handleSave = async () => {
    // 验证主页首图必须至少有一张
    if (!formData.mainImages || formData.mainImages.length === 0) {
      alert('门店主页首图至少需要上传一张图片')
      return
    }

    // 验证不超过5张
    if (formData.mainImages.length > 5) {
      alert('门店主页首图最多上传5张图片')
      return
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

  const handleSaveShareTextOnly = async () => {
    if (!shareTextValue.trim()) {
      alert('请填写分享展示文案')
      return
    }

    setIsSavingShareText(true)
    try {
      if (onSaveShareText) {
        await onSaveShareText(shareTextValue)
        alert('分享文案保存成功')
      }
    } catch (error) {
      alert('保存失败，请重试')
    } finally {
      setIsSavingShareText(false)
    }
  }

  const updateField = <K extends keyof ImageInfo>(field: K, value: ImageInfo[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // 模拟图片上传（实际项目中需要调用真实的上传API）
  const handleShareImageUpload = () => {
    // 1:1 比例的占位图
    const mockImageUrl = `https://placehold.co/600x600/2C5F8D/white?text=Share+Image`
    updateField('shareImage', mockImageUrl)
  }

  const handleMainImageUpload = () => {
    if (formData.mainImages.length >= 5) {
      alert('最多上传5张图片')
      return
    }

    // 2:3 比例的占位图
    const newImage: StoreImage = {
      id: `img-${Date.now()}`,
      url: `https://placehold.co/1000x1500/2C5F8D/white?text=Main+${formData.mainImages.length + 1}`,
      sortOrder: formData.mainImages.length + 1,
    }

    updateField('mainImages', [...formData.mainImages, newImage])
  }

  const removeMainImage = (id: string) => {
    const updatedImages = formData.mainImages
      .filter((img) => img.id !== id)
      .map((img, index) => ({ ...img, sortOrder: index + 1 }))
    updateField('mainImages', updatedImages)
  }

  const moveMainImage = (id: string, direction: 'up' | 'down') => {
    const currentIndex = formData.mainImages.findIndex((img) => img.id === id)
    if (currentIndex === -1) return

    if (direction === 'up' && currentIndex === 0) return
    if (direction === 'down' && currentIndex === formData.mainImages.length - 1) return

    const newImages = [...formData.mainImages]
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

    ;[newImages[currentIndex], newImages[targetIndex]] = [
      newImages[targetIndex],
      newImages[currentIndex],
    ]

    const reorderedImages = newImages.map((img, index) => ({ ...img, sortOrder: index + 1 }))
    updateField('mainImages', reorderedImages)
  }

  return (
    <div className="space-y-6">
      {/* 小程序分享图 */}
      <EditableSection
        title="小程序分享图"
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        isSaving={isSaving}
      >
        <div className="space-y-6">
          {/* 分享封面图 */}
          <FormField label="分享封面图" hint="建议比例1:1，宽度500px~800px，支持png、jpg格式">
            {isEditing ? (
              <div className="space-y-3">
                {formData.shareImage && (
                  <div className="relative w-48 h-48 border-2 border-slate-200 rounded overflow-hidden">
                    <img
                      src={formData.shareImage}
                      alt="分享封面图"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 h-6 w-6 p-0"
                      onClick={() => updateField('shareImage', undefined)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                {!formData.shareImage && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleShareImageUpload}
                    className="h-48 w-48 border-2 border-dashed border-slate-300 hover:border-blue-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-slate-400" />
                      <span className="text-sm text-slate-600">点击上传图片</span>
                      <span className="text-xs text-slate-500">1:1 比例</span>
                    </div>
                  </Button>
                )}
              </div>
            ) : (
              <div>
                {formData.shareImage ? (
                  <img
                    src={formData.shareImage}
                    alt="分享封面图"
                    className="w-48 h-48 object-cover border border-slate-200 rounded"
                  />
                ) : (
                  <span className="text-slate-500">未上传</span>
                )}
              </div>
            )}
          </FormField>

          {/* 分享展示文案 */}
          <FormField label="分享展示文案" hint="分享链接时显示的标题">
            <div className="flex items-center gap-3">
              <Input
                value={shareTextValue}
                onChange={(e) => setShareTextValue(e.target.value)}
                placeholder="请输入分享展示文案"
                disabled={!isEditing && !onSaveShareText}
                className={
                  isEditing || onSaveShareText
                    ? 'h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                    : 'h-9 bg-slate-50 text-slate-700 cursor-not-allowed border-0'
                }
              />
              {onSaveShareText && !isEditing && (
                <Button
                  onClick={handleSaveShareTextOnly}
                  disabled={isSavingShareText}
                  className="h-9 bg-green-600 hover:bg-green-700 text-white font-medium shadow-sm flex-shrink-0"
                >
                  {isSavingShareText ? '保存中...' : '保存'}
                </Button>
              )}
            </div>
          </FormField>
        </div>
      </EditableSection>

      {/* 门店主页首图 */}
      <EditableSection title="门店主页首图" isEditing={isEditing} hideActions>
        <FormField
          label="图片列表"
          required
          hint="建议比例2:3，宽度1000px~2000px，最多5张，支持png、jpg格式，单张不大于5M"
        >
          {isEditing ? (
            <div className="space-y-4">
              {/* 图片列表 - 横向排列 */}
              <div className="flex flex-wrap gap-4">
                {formData.mainImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="relative border-2 border-slate-200 rounded overflow-hidden w-40 h-60 group flex-shrink-0"
                  >
                    <img
                      src={image.url}
                      alt={`主页图片 ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {/* 序号标签 */}
                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      {index + 1}
                    </div>
                    {/* 操作按钮（hover显示） */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => moveMainImage(image.id, 'up')}
                        disabled={index === 0}
                        title="向前移动"
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => moveMainImage(image.id, 'down')}
                        disabled={index === formData.mainImages.length - 1}
                        title="向后移动"
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => removeMainImage(image.id)}
                        title="删除"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* 上传按钮 */}
                {formData.mainImages.length < 5 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleMainImageUpload}
                    className="w-40 h-60 border-2 border-dashed border-slate-300 hover:border-blue-500 flex-shrink-0"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-slate-400" />
                      <span className="text-sm text-slate-600">上传图片</span>
                      <span className="text-xs text-slate-500">
                        {formData.mainImages.length}/5
                      </span>
                      <span className="text-xs text-slate-500">2:3 比例</span>
                    </div>
                  </Button>
                )}
              </div>

              <p className="text-sm text-slate-600">
                提示：点击图片上的按钮可调整顺序或删除，第一张图片将作为门店封面
              </p>
            </div>
          ) : (
            <div>
              {formData.mainImages.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {formData.mainImages.map((image, index) => (
                    <div
                      key={image.id}
                      className="relative w-40 h-60 rounded overflow-hidden flex-shrink-0"
                    >
                      <img
                        src={image.url}
                        alt={`主页图片 ${index + 1}`}
                        className="w-full h-full object-cover border border-slate-200"
                      />
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-slate-500">未上传</span>
              )}
            </div>
          )}
        </FormField>
      </EditableSection>
    </div>
  )
}
