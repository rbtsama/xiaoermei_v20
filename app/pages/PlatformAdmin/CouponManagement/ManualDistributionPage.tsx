/**
 * 手动发放优惠券页面
 */

import { useState } from 'react'
import { Form, useNavigation } from '@remix-run/react'
import type { Coupon, VipLevel } from './types/coupon.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Textarea } from '~/components/ui/textarea'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Switch } from '~/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Checkbox } from '~/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '~/components/ui/dialog'
import { Send } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface ManualDistributionPageProps {
  enabledCoupons: Coupon[]
  vipLevels: VipLevel[]
  error: string | null
}

export default function ManualDistributionPage({ enabledCoupons, vipLevels, error }: ManualDistributionPageProps) {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  // 按手机号发放状态
  const [phoneText, setPhoneText] = useState('')
  const [phonesCouponId, setPhonesCouponId] = useState('')
  const [phonesSms, setPhonesSms] = useState(true)

  // 按VIP等级发放状态
  const [selectedVipLevels, setSelectedVipLevels] = useState<string[]>([])
  const [vipCouponId, setVipCouponId] = useState('')
  const [vipSms, setVipSms] = useState(true)

  // 确认弹窗
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmData, setConfirmData] = useState<{
    type: 'phone' | 'vip'
    phones?: string[]
    vipLevels?: string[]
    couponId: string
    smsNotify: boolean
  } | null>(null)

  if (error) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
            错误: {error}
          </div>
        </div>
      </MainLayout>
    )
  }

  const handleVipLevelToggle = (levelId: string) => {
    setSelectedVipLevels((prev) =>
      prev.includes(levelId) ? prev.filter((id) => id !== levelId) : [...prev, levelId]
    )
  }

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const phones = phoneText.split('\n').map(p => p.trim()).filter(Boolean)
    if (phones.length === 0 || !phonesCouponId) return

    setConfirmData({
      type: 'phone',
      phones,
      couponId: phonesCouponId,
      smsNotify: phonesSms,
    })
    setConfirmOpen(true)
  }

  const handleVipSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedVipLevels.length === 0 || !vipCouponId) return

    setConfirmData({
      type: 'vip',
      vipLevels: selectedVipLevels,
      couponId: vipCouponId,
      smsNotify: vipSms,
    })
    setConfirmOpen(true)
  }

  const getCouponDisplayText = (couponId: string) => {
    const coupon = enabledCoupons.find(c => c.id === couponId)
    return coupon ? `${coupon.id}（${coupon.remark || coupon.name}）` : couponId
  }

  return (
    <MainLayout>
      <div className="p-6">
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">手动发放优惠券</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="phone" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="phone">按手机号发放</TabsTrigger>
              <TabsTrigger value="vip">按VIP等级发放</TabsTrigger>
            </TabsList>

            {/* 按手机号发放 */}
            <TabsContent value="phone" className="space-y-4">
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneText">手机号列表 *</Label>
                  <Textarea
                    id="phoneText"
                    value={phoneText}
                    onChange={(e) => setPhoneText(e.target.value)}
                    placeholder="请输入手机号，一行一个&#10;13800138000&#10;13900139000"
                    rows={8}
                    className="border-slate-300 font-mono text-sm"
                  />
                  <p className="text-xs text-slate-500">每行一个手机号，支持多个</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phonesCouponId">选择派发优惠券 *</Label>
                  <Select value={phonesCouponId} onValueChange={setPhonesCouponId} required>
                    <SelectTrigger className="h-9 border-slate-300">
                      <SelectValue placeholder="选择优惠券" />
                    </SelectTrigger>
                    <SelectContent>
                      {enabledCoupons.map((coupon) => (
                        <SelectItem key={coupon.id} value={coupon.id}>
                          {coupon.id}（{coupon.remark || coupon.name}）
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="phonesSms">短信通知</Label>
                  <Switch id="phonesSms" checked={phonesSms} onCheckedChange={setPhonesSms} />
                </div>

                <Button
                  type="submit"
                  className="h-9 bg-blue-600 hover:bg-blue-700"
                  disabled={!phoneText || !phonesCouponId}
                >
                  <Send className="w-4 h-4 mr-2" />
                  开始派发
                </Button>
              </form>
            </TabsContent>

            {/* 按VIP等级发放 */}
            <TabsContent value="vip" className="space-y-4">
              <form onSubmit={handleVipSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>VIP等级 *</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {vipLevels.map((level) => (
                      <div key={level.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`vip-${level.id}`}
                          checked={selectedVipLevels.includes(level.id)}
                          onCheckedChange={() => handleVipLevelToggle(level.id)}
                        />
                        <Label htmlFor={`vip-${level.id}`} className="text-sm cursor-pointer">
                          {level.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500">可多选，将发放给所选等级的所有用户</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vipCouponId">选择派发优惠券 *</Label>
                  <Select value={vipCouponId} onValueChange={setVipCouponId} required>
                    <SelectTrigger className="h-9 border-slate-300">
                      <SelectValue placeholder="选择优惠券" />
                    </SelectTrigger>
                    <SelectContent>
                      {enabledCoupons.map((coupon) => (
                        <SelectItem key={coupon.id} value={coupon.id}>
                          {coupon.id}（{coupon.remark || coupon.name}）
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="vipSms">短信通知</Label>
                  <Switch id="vipSms" checked={vipSms} onCheckedChange={setVipSms} />
                </div>

                <Button
                  type="submit"
                  className="h-9 bg-blue-600 hover:bg-blue-700"
                  disabled={selectedVipLevels.length === 0 || !vipCouponId}
                >
                  <Send className="w-4 h-4 mr-2" />
                  开始派发
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 确认弹窗 */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认发放优惠券</DialogTitle>
            <DialogDescription>请确认以下发放信息</DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-4">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">发放方式：</span>
              <span className="text-sm font-medium">
                {confirmData?.type === 'phone' ? '按手机号' : '按VIP等级'}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-slate-600">目标用户：</span>
              <span className="text-sm font-medium">
                {confirmData?.type === 'phone'
                  ? confirmData.phones && confirmData.phones.length > 3
                    ? `${confirmData.phones.slice(0, 3).join(', ')}...`
                    : confirmData.phones?.join(', ')
                  : confirmData?.vipLevels?.map(id => vipLevels.find(v => v.id === id)?.name).join(', ')}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-slate-600">发放优惠券：</span>
              <span className="text-sm font-medium">
                {confirmData && getCouponDisplayText(confirmData.couponId)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-slate-600">短信通知：</span>
              <span className="text-sm font-medium">{confirmData?.smsNotify ? '是' : '否'}</span>
            </div>
          </div>

          <DialogFooter>
            <Form method="post">
              <input type="hidden" name="_action" value="distribute" />
              <input type="hidden" name="type" value={confirmData?.type} />
              <input type="hidden" name="couponId" value={confirmData?.couponId} />
              <input type="hidden" name="smsNotify" value={confirmData?.smsNotify ? 'true' : 'false'} />
              {confirmData?.type === 'phone' && (
                <input type="hidden" name="phones" value={JSON.stringify(confirmData.phones)} />
              )}
              {confirmData?.type === 'vip' && (
                <input type="hidden" name="vipLevelIds" value={JSON.stringify(confirmData.vipLevels)} />
              )}
              <Button
                type="button"
                variant="outline"
                onClick={() => setConfirmOpen(false)}
                className="h-9 border-slate-300 mr-2"
              >
                取消
              </Button>
              <Button type="submit" disabled={isSubmitting} className="h-9 bg-blue-600 hover:bg-blue-700">
                {isSubmitting ? '发放中...' : '确认发放'}
              </Button>
            </Form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </MainLayout>
  )
}
