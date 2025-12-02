/**
 * 平台后台 - 优惠券列表页面
 */

import { useState } from 'react'
import { Form, Link, useNavigation } from '@remix-run/react'
import type { Coupon, CouponType } from './types/coupon.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import { Switch } from '~/components/ui/switch'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface CouponListPageProps {
  coupons: Coupon[]
  error: string | null
}

/**
 * 获取优惠券类型文本
 */
function getCouponTypeText(type: string): string {
  const map: Record<string, string> = {
    full_reduction: '满减券',
    discount: '折扣券',
    instant_reduction: '立减券',
  }
  return map[type] || type
}

/**
 * 获取优惠券类型颜色样式
 */
function getCouponTypeBadgeClass(type: string): string {
  const classMap: Record<string, string> = {
    full_reduction: 'bg-orange-50 text-orange-700 border-orange-300',
    discount: 'bg-green-50 text-green-700 border-green-300',
    instant_reduction: 'bg-blue-50 text-blue-700 border-blue-300',
  }
  return classMap[type] || 'border-slate-300 text-slate-700'
}

/**
 * 获取有效期描述
 */
function getValidDaysText(days: number): string {
  if (days === 0) return '永久'
  return `发放后${days}天`
}

export default function CouponListPage({ coupons, error }: CouponListPageProps) {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading' || navigation.state === 'submitting'

  // Dialog弹窗状态
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // 表单状态
  const [name, setName] = useState('')
  const [type, setType] = useState<CouponType>('full_reduction')
  const [threshold, setThreshold] = useState('')
  const [amount, setAmount] = useState('')
  const [discount, setDiscount] = useState('')
  const [maxDiscount, setMaxDiscount] = useState('')
  const [platformRatio, setPlatformRatio] = useState('50')
  const [validDays, setValidDays] = useState('30')
  const [remark, setRemark] = useState('')

  // 计算商户承担比例
  const merchantRatio = 100 - Number(platformRatio || 0)

  if (error) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            错误: {error}
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
      {/* 筛选器 */}
      <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6">
          <Form method="get" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                name="search"
                placeholder="搜索优惠券名称或ID"
                className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />

              <Select name="type" defaultValue="all">
                <SelectTrigger className="h-9 border-slate-300">
                  <SelectValue placeholder="优惠券类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem value="full_reduction">满减券</SelectItem>
                  <SelectItem value="discount">折扣券</SelectItem>
                  <SelectItem value="instant_reduction">立减券</SelectItem>
                </SelectContent>
              </Select>

              <Select name="status" defaultValue="all">
                <SelectTrigger className="h-9 border-slate-300">
                  <SelectValue placeholder="状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="enabled">启用</SelectItem>
                  <SelectItem value="disabled">停用</SelectItem>
                </SelectContent>
              </Select>

              <Button type="submit" disabled={isLoading} className="h-9 bg-blue-600 hover:bg-blue-700">
                <Search className="w-4 h-4 mr-2" />
                {isLoading ? '搜索中...' : '搜索'}
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>

      {/* 优惠券列表 */}
      <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">优惠券列表</CardTitle>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="h-9 bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                创建优惠券
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-slate-900">创建优惠券</DialogTitle>
              </DialogHeader>

              <Form method="post" action="/platform-admin/coupon-management/create" className="space-y-6">
                {/* 优惠券名称 */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                    优惠券名称 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="请输入优惠券名称（最多50字符）"
                    maxLength={50}
                    required
                    className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* 优惠券类型 */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    优惠券类型 <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    name="type"
                    value={type}
                    onValueChange={(value) => {
                      setType(value as CouponType)
                      // 切换类型时清空相关字段
                      setThreshold('')
                      setAmount('')
                      setDiscount('')
                      setMaxDiscount('')
                    }}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="full_reduction" id="type-full" />
                      <Label htmlFor="type-full" className="font-normal cursor-pointer">
                        满减券 <span className="text-slate-500 text-xs">(满X元减Y元)</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="discount" id="type-discount" />
                      <Label htmlFor="type-discount" className="font-normal cursor-pointer">
                        折扣券 <span className="text-slate-500 text-xs">(打Z折)</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="instant_reduction" id="type-instant" />
                      <Label htmlFor="type-instant" className="font-normal cursor-pointer">
                        立减券 <span className="text-slate-500 text-xs">(直接减Y元)</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* 满减券字段 */}
                {type === 'full_reduction' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="threshold" className="text-sm font-medium text-slate-700">
                        使用门槛(元) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="threshold"
                        name="threshold"
                        type="number"
                        value={threshold}
                        onChange={(e) => setThreshold(e.target.value)}
                        placeholder="如：300"
                        required
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount" className="text-sm font-medium text-slate-700">
                        减免金额(元) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="如：50"
                        required
                        className="h-9"
                      />
                    </div>
                  </div>
                )}

                {/* 折扣券字段 */}
                {type === 'discount' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="discount" className="text-sm font-medium text-slate-700">
                        折扣率(几折) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="discount"
                        name="discount"
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        placeholder="输入1-99"
                        min={1}
                        max={99}
                        required
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxDiscount" className="text-sm font-medium text-slate-700">
                        最高优惠金额(元) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="maxDiscount"
                        name="maxDiscount"
                        type="number"
                        value={maxDiscount}
                        onChange={(e) => setMaxDiscount(e.target.value)}
                        placeholder="如：100"
                        min={0}
                        required
                        className="h-9"
                      />
                    </div>
                  </div>
                )}

                {/* 立减券字段 */}
                {type === 'instant_reduction' && (
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-sm font-medium text-slate-700">
                      减免金额(元) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="如：30"
                      required
                      className="h-9"
                    />
                  </div>
                )}

                {/* 费用承担 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="platformRatio" className="text-sm font-medium text-slate-700">
                      平台承担比例(%) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="platformRatio"
                      name="platformRatio"
                      type="number"
                      value={platformRatio}
                      onChange={(e) => {
                        const value = Math.min(100, Math.max(0, Number(e.target.value)))
                        setPlatformRatio(value.toString())
                      }}
                      min={0}
                      max={100}
                      required
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">商户承担比例(%)</Label>
                    <Input
                      value={merchantRatio}
                      disabled
                      className="h-9 bg-slate-50 text-slate-700 cursor-not-allowed border-slate-300"
                    />
                  </div>
                </div>

                {/* 有效天数 */}
                <div className="space-y-2">
                  <Label htmlFor="validDays" className="text-sm font-medium text-slate-700">
                    有效天数 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="validDays"
                    name="validDays"
                    type="number"
                    value={validDays}
                    onChange={(e) => setValidDays(e.target.value)}
                    placeholder="0表示永久，其他表示发放后N天23:59过期"
                    min={0}
                    required
                    className="h-9"
                  />
                  <p className="text-xs text-slate-500">0表示永久有效，其他数字表示发放后N天23:59过期</p>
                </div>

                {/* 备注说明 */}
                <div className="space-y-2">
                  <Label htmlFor="remark" className="text-sm font-medium text-slate-700">备注说明</Label>
                  <Textarea
                    id="remark"
                    name="remark"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="仅后台可见，最多200字符"
                    maxLength={200}
                    rows={3}
                    className="resize-none border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* 按钮组 */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                    className="h-9 border-slate-300"
                  >
                    取消
                  </Button>
                  <Button
                    type="submit"
                    className="h-9 bg-blue-600 hover:bg-blue-700"
                  >
                    创建
                  </Button>
                </div>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 bg-slate-50">
                  <TableHead className="text-slate-600 font-semibold">优惠券ID</TableHead>
                  <TableHead className="text-slate-600 font-semibold">优惠券类型</TableHead>
                  <TableHead className="text-slate-600 font-semibold">优惠券名称</TableHead>
                  <TableHead className="text-slate-600 font-semibold">备注说明</TableHead>
                  <TableHead className="text-slate-600 font-semibold">有效期</TableHead>
                  <TableHead className="text-slate-600 font-semibold">费用承担</TableHead>
                  <TableHead className="text-slate-600 font-semibold text-center">短信通知</TableHead>
                  <TableHead className="text-slate-600 font-semibold text-center">状态</TableHead>
                  <TableHead className="text-slate-600 font-semibold">创建时间</TableHead>
                  <TableHead className="text-slate-600 font-semibold">创建人</TableHead>
                  <TableHead className="text-slate-600 font-semibold text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center text-slate-500 py-8">
                      暂无数据
                    </TableCell>
                  </TableRow>
                ) : (
                  coupons.map((coupon) => (
                    <TableRow key={coupon.id} className="hover:bg-slate-50 transition-colors">
                      <TableCell className="text-slate-900 font-medium">{coupon.id}</TableCell>
                      <TableCell>
                        <Badge className={`${getCouponTypeBadgeClass(coupon.type)} border`}>
                          {getCouponTypeText(coupon.type)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-900">{coupon.name}</TableCell>
                      <TableCell className="text-slate-600 text-sm max-w-[150px] truncate" title={coupon.remark || '-'}>
                        {coupon.remark || '-'}
                      </TableCell>
                      <TableCell className="text-slate-600 text-sm">
                        {getValidDaysText(coupon.validDays)}
                      </TableCell>
                      <TableCell className="text-slate-600 text-sm">
                        平台{coupon.platformRatio}% / 商户{coupon.merchantRatio}%
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={coupon.smsNotify ? "text-green-700" : "text-slate-600"}>
                          {coupon.smsNotify ? '是' : '否'}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Form method="post" action={`/platform-admin/coupon-management/toggle/${coupon.id}`}>
                          <Switch
                            checked={coupon.status === 'enabled'}
                            onCheckedChange={(checked) => {
                              const form = document.querySelector(`form[action="/platform-admin/coupon-management/toggle/${coupon.id}"]`) as HTMLFormElement
                              if (form) form.requestSubmit()
                            }}
                          />
                        </Form>
                      </TableCell>
                      <TableCell className="text-slate-600 text-sm">{coupon.createdAt}</TableCell>
                      <TableCell className="text-slate-600 text-sm">{coupon.createdBy}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          {/* 编辑按钮 - 始终可点击 */}
                          <Link to={`/platform-admin/coupon-management/edit/${coupon.id}`}>
                            <Button variant="outline" size="sm" className="h-7 px-2 border-slate-300">
                              <Edit className="w-3 h-3" />
                            </Button>
                          </Link>

                          {/* 删除按钮 - 始终可点击，删除前检查是否有发放记录 */}
                          <Form
                            method="post"
                            action={`/platform-admin/coupon-management/delete/${coupon.id}`}
                            onSubmit={(e) => {
                              if (!confirm('确定要删除该优惠券吗？删除后不可恢复。')) {
                                e.preventDefault()
                              }
                            }}
                          >
                            <Button variant="outline" size="sm" className="h-7 px-2 border-red-300 text-red-700 hover:bg-red-50">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </Form>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      </div>
    </MainLayout>
  )
}
