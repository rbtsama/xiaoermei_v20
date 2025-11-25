import { useState, useEffect } from 'react'
import { Card, CardContent } from '~/components/ui/card'
import { Checkbox } from '~/components/ui/checkbox'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import EditableSection from './components/EditableSection'
import type { ExtraBedPolicy, RoomExtraBedPolicy } from './types/storeInfo.types'
import { EXTRA_BED_TYPES } from './types/storeInfo.types'

interface ExtraBedPolicyPageProps {
  data: ExtraBedPolicy
  onSave: (data: Partial<ExtraBedPolicy>) => Promise<void>
}

export default function ExtraBedPolicyPage({ data, onSave }: ExtraBedPolicyPageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<ExtraBedPolicy>(data)

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
    for (const policy of formData.roomPolicies) {
      if (policy.extraBedProvided) {
        if (!policy.extraBedType) {
          alert(`${policy.roomTypeName}：请选择加床床型`)
          return
        }
        if (!policy.extraBedCount || policy.extraBedCount < 0) {
          alert(`${policy.roomTypeName}：请填写加床数量`)
          return
        }
        if (policy.extraBedPrice === undefined || policy.extraBedPrice < 0) {
          alert(`${policy.roomTypeName}：请填写加床价格`)
          return
        }
      }

      if (policy.cribProvided) {
        if (!policy.cribCount || policy.cribCount < 0) {
          alert(`${policy.roomTypeName}：请填写婴儿床数量`)
          return
        }
        if (policy.cribPrice === undefined || policy.cribPrice < 0) {
          alert(`${policy.roomTypeName}：请填写婴儿床价格`)
          return
        }
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

  const updateRoomPolicy = (
    roomTypeId: string,
    field: keyof RoomExtraBedPolicy,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      roomPolicies: prev.roomPolicies.map((policy) =>
        policy.roomTypeId === roomTypeId ? { ...policy, [field]: value } : policy
      ),
    }))
  }

  // 按院落分组
  const groupedPolicies = formData.roomPolicies.reduce(
    (acc, policy) => {
      if (!acc[policy.courtyard]) {
        acc[policy.courtyard] = []
      }
      acc[policy.courtyard].push(policy)
      return acc
    },
    {} as Record<string, RoomExtraBedPolicy[]>
  )

  const courtyards = Object.keys(groupedPolicies).sort()

  return (
    <div className="space-y-6">
      <EditableSection
        title="加床政策配置"
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        isSaving={isSaving}
      >
        <div className="space-y-6">
          {courtyards.map((courtyard) => (
            <Card key={courtyard} className="rounded-xl border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-base font-semibold text-slate-900 mb-4">{courtyard}</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-200">
                        <TableHead className="text-slate-600 font-semibold w-[180px]">
                          房型名称
                        </TableHead>
                        <TableHead className="text-slate-600 font-semibold text-center" colSpan={4}>
                          加床配置
                        </TableHead>
                        <TableHead className="text-slate-600 font-semibold text-center" colSpan={3}>
                          婴儿床配置
                        </TableHead>
                      </TableRow>
                      <TableRow className="border-slate-200 bg-slate-50">
                        <TableHead className="text-slate-600 font-medium"></TableHead>
                        <TableHead className="text-slate-600 font-medium w-[100px]">
                          提供加床
                        </TableHead>
                        <TableHead className="text-slate-600 font-medium w-[120px]">
                          床型
                        </TableHead>
                        <TableHead className="text-slate-600 font-medium w-[100px]">
                          数量
                        </TableHead>
                        <TableHead className="text-slate-600 font-medium w-[120px]">
                          价格(元)
                        </TableHead>
                        <TableHead className="text-slate-600 font-medium w-[100px]">
                          提供婴儿床
                        </TableHead>
                        <TableHead className="text-slate-600 font-medium w-[100px]">
                          数量
                        </TableHead>
                        <TableHead className="text-slate-600 font-medium w-[120px]">
                          价格(元)
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {groupedPolicies[courtyard].map((policy) => (
                        <TableRow
                          key={policy.roomTypeId}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          {/* 房型名称 */}
                          <TableCell className="font-medium text-slate-900">
                            {policy.roomTypeName}
                          </TableCell>

                          {/* 提供加床 */}
                          <TableCell className="text-center">
                            {isEditing ? (
                              <div className="flex justify-center">
                                <Checkbox
                                  checked={policy.extraBedProvided}
                                  onCheckedChange={(checked) =>
                                    updateRoomPolicy(
                                      policy.roomTypeId,
                                      'extraBedProvided',
                                      checked === true
                                    )
                                  }
                                  className="border-slate-300"
                                />
                              </div>
                            ) : (
                              <span className="text-slate-900">
                                {policy.extraBedProvided ? '✓' : '—'}
                              </span>
                            )}
                          </TableCell>

                          {/* 加床床型 */}
                          <TableCell>
                            {policy.extraBedProvided ? (
                              isEditing ? (
                                <Select
                                  value={policy.extraBedType || ''}
                                  onValueChange={(value: 'single' | 'double') =>
                                    updateRoomPolicy(policy.roomTypeId, 'extraBedType', value)
                                  }
                                >
                                  <SelectTrigger className="h-9 border-slate-300">
                                    <SelectValue placeholder="选择床型" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {EXTRA_BED_TYPES.map((type) => (
                                      <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <span className="text-slate-900">
                                  {EXTRA_BED_TYPES.find((t) => t.value === policy.extraBedType)
                                    ?.label || '—'}
                                </span>
                              )
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </TableCell>

                          {/* 加床数量 */}
                          <TableCell>
                            {policy.extraBedProvided ? (
                              isEditing ? (
                                <Input
                                  type="number"
                                  min="0"
                                  max="10"
                                  value={policy.extraBedCount || ''}
                                  onChange={(e) =>
                                    updateRoomPolicy(
                                      policy.roomTypeId,
                                      'extraBedCount',
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  className="h-9 border-slate-300"
                                  placeholder="数量"
                                />
                              ) : (
                                <span className="text-slate-900">{policy.extraBedCount || '—'}</span>
                              )
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </TableCell>

                          {/* 加床价格 */}
                          <TableCell>
                            {policy.extraBedProvided ? (
                              isEditing ? (
                                <Input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={policy.extraBedPrice ?? ''}
                                  onChange={(e) =>
                                    updateRoomPolicy(
                                      policy.roomTypeId,
                                      'extraBedPrice',
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                  className="h-9 border-slate-300"
                                  placeholder="价格"
                                />
                              ) : (
                                <span className="text-slate-900">
                                  {policy.extraBedPrice !== undefined
                                    ? `¥${policy.extraBedPrice.toFixed(2)}`
                                    : '—'}
                                </span>
                              )
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </TableCell>

                          {/* 提供婴儿床 */}
                          <TableCell className="text-center">
                            {isEditing ? (
                              <div className="flex justify-center">
                                <Checkbox
                                  checked={policy.cribProvided}
                                  onCheckedChange={(checked) =>
                                    updateRoomPolicy(
                                      policy.roomTypeId,
                                      'cribProvided',
                                      checked === true
                                    )
                                  }
                                  className="border-slate-300"
                                />
                              </div>
                            ) : (
                              <span className="text-slate-900">
                                {policy.cribProvided ? '✓' : '—'}
                              </span>
                            )}
                          </TableCell>

                          {/* 婴儿床数量 */}
                          <TableCell>
                            {policy.cribProvided ? (
                              isEditing ? (
                                <Input
                                  type="number"
                                  min="0"
                                  max="10"
                                  value={policy.cribCount || ''}
                                  onChange={(e) =>
                                    updateRoomPolicy(
                                      policy.roomTypeId,
                                      'cribCount',
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  className="h-9 border-slate-300"
                                  placeholder="数量"
                                />
                              ) : (
                                <span className="text-slate-900">{policy.cribCount || '—'}</span>
                              )
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </TableCell>

                          {/* 婴儿床价格 */}
                          <TableCell>
                            {policy.cribProvided ? (
                              isEditing ? (
                                <Input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={policy.cribPrice ?? ''}
                                  onChange={(e) =>
                                    updateRoomPolicy(
                                      policy.roomTypeId,
                                      'cribPrice',
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                  className="h-9 border-slate-300"
                                  placeholder="价格"
                                />
                              ) : (
                                <span className="text-slate-900">
                                  {policy.cribPrice !== undefined
                                    ? `¥${policy.cribPrice.toFixed(2)}`
                                    : '—'}
                                </span>
                              )
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          ))}

          {courtyards.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              暂无房型数据，请先在房型管理模块添加房型
            </div>
          )}
        </div>
      </EditableSection>
    </div>
  )
}
