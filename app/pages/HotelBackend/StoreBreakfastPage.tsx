import { useState } from 'react'
import { Form } from '@remix-run/react'
import type { BreakfastPolicy } from './types/hotel-backend.types'
import { BreakfastType, BreakfastTimeType, ChildPricingType } from './types/hotel-backend.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import MainLayout from '../PointsSystem/components/MainLayout'

interface StoreBreakfastPageProps {
  policy: BreakfastPolicy
}

export default function StoreBreakfastPage({ policy }: StoreBreakfastPageProps) {
  const [provided, setProvided] = useState(policy.provided)
  const [timeType, setTimeType] = useState(policy.timeType)

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto bg-slate-50 p-6">
        <div className="space-y-6 max-w-4xl">
        <h1 className="text-2xl font-bold">早餐政策</h1>

        <Form method="post" className="space-y-6">
          <Card>
            <CardHeader><CardTitle>是否提供早餐</CardTitle></CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="provided" value="true" checked={provided} onChange={() => setProvided(true)} className="w-4 h-4" />
                  <span>提供</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="provided" value="false" checked={!provided} onChange={() => setProvided(false)} className="w-4 h-4" />
                  <span>不提供</span>
                </label>
              </div>
            </CardContent>
          </Card>

          {provided && (
            <>
              <Card>
                <CardHeader><CardTitle>形式</CardTitle></CardHeader>
                <CardContent className="flex gap-4">
                  {[
                    { value: BreakfastType.A_LA_CARTE, label: '单点' },
                    { value: BreakfastType.BUFFET, label: '自助餐' },
                    { value: BreakfastType.SET_MEAL, label: '固定套餐' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2">
                      <input type="radio" name="type" value={opt.value} defaultChecked={policy.type === opt.value} className="w-4 h-4" />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>类型</CardTitle></CardHeader>
                <CardContent className="flex gap-3">
                  {['西式', '中式', '亚洲风味', '清真', '素食'].map((c) => (
                    <label key={c} className="flex items-center gap-2 px-3 py-2 border rounded">
                      <input type="checkbox" name="cuisines" value={c} defaultChecked={policy.cuisines.includes(c)} className="w-4 h-4" />
                      <span className="text-sm">{c}</span>
                    </label>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>早餐时间</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="timeType" value={BreakfastTimeType.ALL_DAY} checked={timeType === BreakfastTimeType.ALL_DAY} onChange={() => setTimeType(BreakfastTimeType.ALL_DAY)} className="w-4 h-4" />
                      <span>每日开放</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="timeType" value={BreakfastTimeType.SPECIFIC} checked={timeType === BreakfastTimeType.SPECIFIC} onChange={() => setTimeType(BreakfastTimeType.SPECIFIC)} className="w-4 h-4" />
                      <span>指定时间</span>
                    </label>
                  </div>
                  {timeType === BreakfastTimeType.SPECIFIC && (
                    <div className="flex items-center gap-2">
                      <Input type="time" name="startTime" defaultValue={policy.startTime} className="w-32" />
                      <span>-</span>
                      <Input type="time" name="endTime" defaultValue={policy.endTime} className="w-32" />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>加1份早餐</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Input type="number" name="extraPrice" defaultValue={policy.extraPrice} className="w-24" />
                    <span>元</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>儿童早餐收费详情</CardTitle>
                    <Button type="button" variant="outline" size="sm">+ 增加</Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="childPricingType" value={ChildPricingType.BY_AGE} defaultChecked={policy.childPricingType === ChildPricingType.BY_AGE} className="w-4 h-4" />
                      <span>按年龄定价</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="childPricingType" value={ChildPricingType.BY_HEIGHT} defaultChecked={policy.childPricingType === ChildPricingType.BY_HEIGHT} className="w-4 h-4" />
                      <span>按身高定价</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3 items-center text-sm font-medium text-slate-600 pb-2 border-b">
                    <div>最小年龄(岁)</div>
                    <div>最大年龄(岁)</div>
                    <div>费用</div>
                    <div>操作</div>
                  </div>

                  {policy.childRules.map((rule) => (
                    <div key={rule.id} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3 items-center">
                      <Input type="number" defaultValue={rule.minAge} className="w-full" />
                      <Input type="number" defaultValue={rule.maxAge} className="w-full" />
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-2">
                          <input type="radio" name={`fee-${rule.id}`} value="free" defaultChecked={rule.isFree} className="w-4 h-4" />
                          <span className="text-sm">免费</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" name={`fee-${rule.id}`} value="charge" defaultChecked={!rule.isFree} className="w-4 h-4" />
                          <span className="text-sm">收费</span>
                          {!rule.isFree && <Input type="number" defaultValue={rule.price} className="w-20" />}
                        </label>
                      </div>
                      <Button type="button" variant="ghost" size="sm">删除</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          )}

          <div className="flex justify-end">
            <Button type="submit" size="lg">保存早餐政策</Button>
          </div>
        </Form>
        </div>
        </div>
        </div>
    </MainLayout>
  )
}
