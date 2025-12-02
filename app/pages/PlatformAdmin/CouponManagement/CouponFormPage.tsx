/**
 * 优惠券创建/编辑页面组件
 * 用于新增和编辑优惠券
 */

import { useState, useEffect } from 'react'
import { Form, useNavigation, Link } from '@remix-run/react'
import type { Coupon, CouponType } from './types/coupon.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Textarea } from '~/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { ArrowLeft } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface CouponFormPageProps {
  coupon?: Coupon
  errors?: Record<string, string>
}

// 优惠券类型选项
const COUPON_TYPE_OPTIONS: Array<{ value: CouponType; label: string; desc: string }> = [
  { value: 'full_reduction', label: '满减券', desc: '满X元减Y元' },
  { value: 'discount', label: '折扣券', desc: '打Z折' },
  { value: 'instant_reduction', label: '立减券', desc: '直接减Y元' },
]

export default function CouponFormPage({ coupon, errors }: CouponFormPageProps) {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const isEditing = !!coupon

  // 表单状态
  const [name, setName] = useState(coupon?.name || '')
  const [type, setType] = useState<CouponType>(coupon?.type || 'full_reduction')
  const [threshold, setThreshold] = useState(coupon?.threshold?.toString() || '')
  const [amount, setAmount] = useState(coupon?.amount?.toString() || '')
  const [discount, setDiscount] = useState(coupon?.discount?.toString() || '')
  const [maxDiscount, setMaxDiscount] = useState(coupon?.maxDiscount?.toString() || '')
  const [validDays, setValidDays] = useState(coupon?.validDays?.toString() || '0')
  const [platformRatio, setPlatformRatio] = useState(coupon?.platformRatio?.toString() || '50')
  const [remark, setRemark] = useState(coupon?.remark || '')

  // 计算商户承担比例
  const merchantRatio = 100 - Number(platformRatio || 0)

  // 当类型改变时，重置相关字段
  useEffect(() => {
    if (type === 'full_reduction') {
      // 满减券需要门槛和金额
      setDiscount('')
      setMaxDiscount('')
    } else if (type === 'discount') {
      // 折扣券需要折扣率和最高优惠金额
      setThreshold('')
      setAmount('')
    } else if (type === 'instant_reduction') {
      // 立减券只需要金额
      setThreshold('')
      setDiscount('')
      setMaxDiscount('')
    }
  }, [type])

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* 返回按钮 */}
        <Link
          to="/platform-admin/coupon-management"
          className="inline-flex items-center gap-2 text-sm text-slate-900 hover:text-slate-700"
        >
          <ArrowLeft className="w-4 h-4" />
          返回优惠券列表
        </Link>

        {/* 页面标题 */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {isEditing ? '编辑优惠券' : '新增优惠券'}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {isEditing ? '修改优惠券信息和规则' : '创建新的优惠券并设置规则'}
          </p>
        </div>

        <Form method="post" className="space-y-6">
        {/* 优惠券信息 */}
        <Card className="rounded-xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">优惠券信息</CardTitle>
            <CardDescription>设置优惠券的基本信息和规则</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 优惠券名称 */}
            <div className="space-y-2">
              <Label htmlFor="name">优惠券名称 *</Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="如：新用户专享券、周末特惠券"
                required
                maxLength={50}
                className={`h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${
                  errors?.name ? 'border-red-500' : ''
                }`}
              />
              <p className="text-xs text-slate-500">用户可见的优惠券名称，最多50个字符</p>
              {errors?.name && <p className="text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* 优惠券类型 */}
            <div className="space-y-2">
              <Label>优惠券类型 *</Label>
              <RadioGroup value={type} onValueChange={(v) => setType(v as CouponType)}>
                <div className="grid grid-cols-3 gap-4">
                  {COUPON_TYPE_OPTIONS.map((option) => (
                    <div
                      key={option.value}
                      className={`flex items-start space-x-2 border rounded-lg p-3 cursor-pointer transition-colors ${
                        type === option.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                      onClick={() => setType(option.value)}
                    >
                      <RadioGroupItem value={option.value} id={option.value} className="mt-0.5" />
                      <div className="flex-1">
                        <Label htmlFor={option.value} className="font-medium cursor-pointer">
                          {option.label}
                        </Label>
                        <p className="text-xs text-slate-500 mt-0.5">{option.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
              <input type="hidden" name="type" value={type} />
            </div>

            {/* 满减券字段 */}
            {type === 'full_reduction' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="threshold">使用门槛 *</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">满</span>
                    <Input
                      id="threshold"
                      name="threshold"
                      type="number"
                      min="0"
                      step="1"
                      value={threshold}
                      onChange={(e) => setThreshold(e.target.value)}
                      placeholder="0"
                      required
                      className={`h-9 flex-1 border-slate-300 ${errors?.threshold ? 'border-red-500' : ''}`}
                    />
                    <span className="text-sm text-slate-600">元</span>
                  </div>
                  {errors?.threshold && <p className="text-sm text-red-600">{errors.threshold}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">减免金额 *</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">减</span>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      min="0"
                      step="1"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0"
                      required
                      className={`h-9 flex-1 border-slate-300 ${errors?.amount ? 'border-red-500' : ''}`}
                    />
                    <span className="text-sm text-slate-600">元</span>
                  </div>
                  {errors?.amount && <p className="text-sm text-red-600">{errors.amount}</p>}
                </div>
              </div>
            )}

            {/* 折扣券字段 */}
            {type === 'discount' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discount">折扣率 *</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="discount"
                      name="discount"
                      type="number"
                      min="1"
                      max="99"
                      step="1"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      placeholder="85"
                      required
                      className={`h-9 w-32 border-slate-300 ${errors?.discount ? 'border-red-500' : ''}`}
                    />
                    <span className="text-sm text-slate-600">
                      % ({discount ? (Number(discount) / 10).toFixed(1) : '0.0'}折)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">输入1-99之间的数字，如85表示8.5折</p>
                  {errors?.discount && <p className="text-sm text-red-600">{errors.discount}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxDiscount">最高优惠金额 *</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">最多减</span>
                    <Input
                      id="maxDiscount"
                      name="maxDiscount"
                      type="number"
                      min="0"
                      step="1"
                      value={maxDiscount}
                      onChange={(e) => setMaxDiscount(e.target.value)}
                      placeholder="100"
                      required
                      className={`h-9 flex-1 border-slate-300 ${errors?.maxDiscount ? 'border-red-500' : ''}`}
                    />
                    <span className="text-sm text-slate-600">元</span>
                  </div>
                  <p className="text-xs text-slate-500">折扣券最高优惠金额上限</p>
                  {errors?.maxDiscount && <p className="text-sm text-red-600">{errors.maxDiscount}</p>}
                </div>
              </div>
            )}

            {/* 立减券字段 */}
            {type === 'instant_reduction' && (
              <div className="space-y-2">
                <Label htmlFor="amount">减免金额 *</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">减</span>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    min="0"
                    step="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    required
                    className={`h-9 w-32 border-slate-300 ${errors?.amount ? 'border-red-500' : ''}`}
                  />
                  <span className="text-sm text-slate-600">元</span>
                </div>
                {errors?.amount && <p className="text-sm text-red-600">{errors.amount}</p>}
              </div>
            )}

            {/* 平台承担比例 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="platformRatio">平台承担比例 *</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="platformRatio"
                    name="platformRatio"
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={platformRatio}
                    onChange={(e) => setPlatformRatio(e.target.value)}
                    required
                    className={`h-9 w-32 border-slate-300 ${errors?.platformRatio ? 'border-red-500' : ''}`}
                  />
                  <span className="text-sm text-slate-600">%</span>
                </div>
                {errors?.platformRatio && <p className="text-sm text-red-600">{errors.platformRatio}</p>}
              </div>
              <div className="space-y-2">
                <Label>商户承担比例</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={merchantRatio}
                    disabled
                    className="h-9 w-32 bg-slate-50 text-slate-700 cursor-not-allowed border-0"
                  />
                  <span className="text-sm text-slate-600">%</span>
                </div>
                <p className="text-xs text-slate-500">自动计算 = 100% - 平台比例</p>
              </div>
            </div>

            {/* 有效天数 */}
            <div className="space-y-2">
              <Label htmlFor="validDays">有效天数 *</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">发放后</span>
                <Input
                  id="validDays"
                  name="validDays"
                  type="number"
                  min="0"
                  max="365"
                  step="1"
                  value={validDays}
                  onChange={(e) => setValidDays(e.target.value)}
                  placeholder="0"
                  required
                  className={`h-9 w-32 border-slate-300 ${errors?.validDays ? 'border-red-500' : ''}`}
                />
                <span className="text-sm text-slate-600">天内有效</span>
              </div>
              <p className="text-xs text-slate-500">0表示永久有效，其他表示发放后N天的23:59过期</p>
              {errors?.validDays && <p className="text-sm text-red-600">{errors.validDays}</p>}
            </div>

            {/* 备注说明 */}
            <div className="space-y-2">
              <Label htmlFor="remark">备注说明</Label>
              <Textarea
                id="remark"
                name="remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="仅后台可见，用于管理和区分优惠券"
                rows={3}
                maxLength={200}
                className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              <p className="text-xs text-slate-500">仅后台可见，最多200个字符</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-700">
                <strong>提示：</strong>创建后优惠券为停用状态，需要手动启用才能使用。启用后不可编辑，只能停用。
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 错误提示 */}
        {errors?.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700">{errors.general}</p>
          </div>
        )}

        {/* 底部按钮 */}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="h-9 border-slate-300 hover:border-slate-400"
            asChild
          >
            <Link to="/platform-admin/coupon-management">取消</Link>
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-9 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm"
          >
            {isSubmitting ? '保存中...' : '保存'}
          </Button>
        </div>
      </Form>
      </div>
    </MainLayout>
  )
}
