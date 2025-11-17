/**
 * 优惠券配置页面
 * 配置优惠券规则、使用条件
 */

import { useState } from 'react'
import type { CouponConfig } from './types/coupon.types'
import { CouponType, CouponStatus } from './types/coupon.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '../PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight, LogicCode } from '../PointsSystem/components/LogicPanel'
import OperationLogButton from '../PointsSystem/components/OperationLogButton'
import { couponTypeLabels, couponStatusLabels } from './services/mocks/coupon.mock'

interface CouponConfigPageProps {
  coupons: CouponConfig[]
}

export default function CouponConfigPage({ coupons }: CouponConfigPageProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [selectedType, setSelectedType] = useState<CouponType>(CouponType.FULL_REDUCTION)

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">优惠券配置</h1>
                <p className="text-slate-600 mt-2">创建和管理平台优惠券</p>
              </div>
              <OperationLogButton moduleName="优惠券配置" />
            </div>

            {/* 优惠券列表 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>优惠券列表</CardTitle>
                    <CardDescription>共 {coupons.length} 个优惠券</CardDescription>
                  </div>
                  <Button onClick={() => setShowCreateDialog(true)}>+ 创建优惠券</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <div>券名称</div>
                        <div className="text-xs text-muted-foreground font-normal">优惠券名称</div>
                      </TableHead>
                      <TableHead>
                        <div>类型</div>
                        <div className="text-xs text-muted-foreground font-normal">满减/折扣/立减</div>
                      </TableHead>
                      <TableHead>
                        <div>优惠内容</div>
                        <div className="text-xs text-muted-foreground font-normal">具体优惠规则</div>
                      </TableHead>
                      <TableHead>
                        <div>有效期</div>
                        <div className="text-xs text-muted-foreground font-normal">领取后有效天数</div>
                      </TableHead>
                      <TableHead>
                        <div>发放/使用</div>
                        <div className="text-xs text-muted-foreground font-normal">已发/已用数量</div>
                      </TableHead>
                      <TableHead>
                        <div>叠加规则</div>
                        <div className="text-xs text-muted-foreground font-normal">能否与积分/会员折扣叠加</div>
                      </TableHead>
                      <TableHead>
                        <div>状态</div>
                        <div className="text-xs text-muted-foreground font-normal">生效中/已停用</div>
                      </TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {coupons.map((coupon) => (
                      <TableRow key={coupon.couponId}>
                        <TableCell className="font-medium">{coupon.couponName}</TableCell>
                        <TableCell>
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                            {couponTypeLabels[coupon.couponType]}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm">
                          {coupon.couponType === CouponType.FULL_REDUCTION && `满${coupon.threshold}减${coupon.reductionAmount}`}
                          {coupon.couponType === CouponType.DISCOUNT && `${coupon.discountRate! / 10}折`}
                          {coupon.couponType === CouponType.DIRECT_REDUCTION && `立减${coupon.directAmount}元`}
                        </TableCell>
                        <TableCell className="text-sm">{coupon.validDays}天</TableCell>
                        <TableCell className="text-sm">
                          <div>{coupon.issuedCount} / {coupon.totalCount}</div>
                          <div className="text-xs text-green-600">已用：{coupon.usedCount}</div>
                        </TableCell>
                        <TableCell className="text-xs">
                          <div>{coupon.stackWithPoints ? '✓' : '✗'} 积分</div>
                          <div>{coupon.stackWithMemberDiscount ? '✓' : '✗'} 会员</div>
                        </TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded ${
                            coupon.status === CouponStatus.ACTIVE ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {couponStatusLabels[coupon.status]}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">编辑</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 创建优惠券弹窗 */}
        {showCreateDialog && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl">
              <CardHeader className="border-b">
                <CardTitle>创建优惠券</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label>优惠券名称</Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      清晰描述优惠内容，如：新人专享券-满200减30（必填，最多30字）
                    </p>
                    <Input placeholder="例如：新人专享券-满200减30" />
                  </div>
                  <div>
                    <Label>优惠券类型</Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      满减券提升客单价，折扣券简单直接，立减券吸引力强
                    </p>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value as CouponType)}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value={CouponType.FULL_REDUCTION}>满减券</option>
                      <option value={CouponType.DISCOUNT}>折扣券</option>
                      <option value={CouponType.DIRECT_REDUCTION}>立减券</option>
                    </select>
                  </div>
                  <div>
                    <Label>有效天数</Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      用户领取后多少天内有效，建议7-30天
                    </p>
                    <Input type="number" placeholder="领取后多久过期" />
                  </div>

                  {selectedType === CouponType.FULL_REDUCTION && (
                    <>
                      <div>
                        <Label>满X元</Label>
                        <p className="text-xs text-muted-foreground mb-2">
                          订单满多少元可用，如：200元
                        </p>
                        <Input type="number" placeholder="门槛金额" />
                      </div>
                      <div>
                        <Label>减Y元</Label>
                        <p className="text-xs text-muted-foreground mb-2">
                          优惠金额，如：减30元
                        </p>
                        <Input type="number" placeholder="优惠金额" />
                      </div>
                    </>
                  )}

                  {selectedType === CouponType.DISCOUNT && (
                    <div className="col-span-2">
                      <Label>折扣（例如：85表示8.5折）</Label>
                      <p className="text-xs text-muted-foreground mb-2">
                        填写折扣数值，85=8.5折，90=9折
                      </p>
                      <Input type="number" placeholder="85" />
                    </div>
                  )}

                  {selectedType === CouponType.DIRECT_REDUCTION && (
                    <div className="col-span-2">
                      <Label>立减金额</Label>
                      <p className="text-xs text-muted-foreground mb-2">
                        无门槛立减，如：立减50元
                      </p>
                      <Input type="number" placeholder="例如：50" />
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>取消</Button>
                  <Button onClick={() => { alert('创建成功'); setShowCreateDialog(false); }}>创建</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 右侧：业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="优惠券配置"
            sections={[
              {
                title: '业务场景',
                content: (
                  <>
                    <p className="font-semibold mb-2">优惠券在酒店行业的使用：</p>
                    <LogicList
                      items={[
                        <><strong>拉新</strong>：新人注册送满200减30券，促进首单转化</>,
                        <><strong>促活</strong>：周末特惠券，提升周末入住率</>,
                        <><strong>留存</strong>：会员升级赠券，增加粘性</>,
                        <><strong>清库存</strong>：特定酒店/房型的优惠券，消化尾房</>
                      ]}
                    />
                  </>
                )
              },
              {
                title: '优惠券类型设计',
                content: (
                  <>
                    <LogicTable
                      headers={['类型', '使用场景', '示例']}
                      rows={[
                        ['满减券', '提高客单价（用户为了用券会订更贵的房）', '满200减30'],
                        ['折扣券', '通用促销，简单直接', '8.5折'],
                        ['立减券', '吸引力最强，成本最高', '立减50元']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">叠加规则设计：</p>
                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>为什么要限制叠加？</strong>
                        <br />
                        场景：房价¥300
                        <br />
                        如果允许无限叠加：
                        <br />
                        • 8.5折券：¥300 × 0.85 = ¥255
                        <br />
                        • 会员9折：¥255 × 0.9 = ¥229.5
                        <br />
                        • 积分抵扣30%：¥229.5 × 0.7 = ¥160.65
                        <br />
                        → 优惠过度，平台/商家亏损
                        <br />
                        <br />
                        <strong>建议</strong>：优惠券和会员折扣二选一，积分可叠加
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '字段说明',
                content: (
                  <LogicTable
                    headers={['字段', '含义', '示例']}
                    rows={[
                      ['couponName', '优惠券名称', '新人专享券-满200减30'],
                      ['couponType', '券类型', 'full_reduction满减 / discount折扣 / direct_reduction立减'],
                      ['threshold', '【满减券】门槛金额', '200（满200元可用）'],
                      ['reductionAmount', '【满减券】优惠金额', '30（减30元）'],
                      ['discountRate', '【折扣券】折扣', '85（8.5折）'],
                      ['directAmount', '【立减券】立减金额', '50（立减50元）'],
                      ['validDays', '有效天数', '30（领取后30天过期）'],
                      ['stackWithPoints', '能否与积分叠加', 'true可以 / false不可以'],
                      ['stackWithMemberDiscount', '能否与会员折扣叠加', 'true可以 / false不可以'],
                      ['totalCount', '总发行量', '10000（最多发1万张）'],
                      ['issuedCount', '已发放数量', '3580'],
                      ['usedCount', '已使用数量', '1256']
                    ]}
                  />
                )
              },
              {
                title: '📱 用户端（C端）呈现',
                content: (
                  <>
                    <p className="font-semibold mb-2">后台配置如何影响用户端：</p>

                    <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                      <p className="font-semibold text-sm mb-2">📱 页面1：优惠券中心</p>
                      <div className="text-xs space-y-2">
                        <div className="bg-red-50 border-l-4 border-red-500 p-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-bold text-red-600">满200减30</div>
                              <div className="text-slate-500 text-xs">新人专享券</div>
                            </div>
                            <button className="bg-red-500 text-white px-3 py-1 rounded text-xs">立即领取</button>
                          </div>
                          <div className="text-slate-500 text-xs mt-1">有效期30天 | 全场可用</div>
                        </div>
                        <div className="text-slate-500 text-xs">→ 后台配置的"满200减30"和"有效期30天"</div>
                      </div>
                    </div>

                    <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                      <p className="font-semibold text-sm mb-2">📱 页面2：我的优惠券</p>
                      <div className="text-xs space-y-2">
                        <div className="border p-2 rounded">
                          <div className="font-bold">满200减30</div>
                          <div className="text-slate-500">2025.02.14过期</div>
                          <div className="mt-1">
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">未使用</span>
                          </div>
                        </div>
                        <div className="text-slate-500 text-xs">→ 后台配置的"有效期30天"自动计算过期时间</div>
                      </div>
                    </div>

                    <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                      <p className="font-semibold text-sm mb-2">📱 页面3：下单页-选择优惠券</p>
                      <div className="text-xs space-y-1 text-slate-700">
                        <div>房费：¥358</div>
                        <div>优惠券：<span className="text-red-600">-¥0</span> <button className="text-blue-600 underline text-xs">选择优惠券</button></div>
                        <div className="text-orange-600 text-xs">⚠️ 不满足满200减30的使用条件</div>
                        <div className="text-slate-500">→ 后台配置的"满200"门槛，前端自动校验</div>
                      </div>
                    </div>

                    <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                      <p className="font-semibold text-sm mb-2">📱 页面4：支付页-优惠叠加</p>
                      <div className="text-xs space-y-1 text-slate-700">
                        <div>房费：¥500</div>
                        <div>周末8.5折：-¥75</div>
                        <div>会员95折：<span className="text-slate-400">不可叠加（二选一）</span></div>
                        <div>积分抵扣：-¥10 ✓ 可叠加</div>
                        <div>实付：<span className="text-red-600 font-bold">¥415</span></div>
                        <div className="text-slate-500">→ 后台配置的"叠加规则"决定哪些优惠可以一起用</div>
                      </div>
                    </div>

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>后台→前端的映射关系：</strong>
                        <br />
                        • 后台设置"满200减30" → 前端校验"房费需≥¥200"
                        <br />
                        • 后台设置"有效期30天" → 前端显示"2025.02.14过期"
                        <br />
                        • 后台设置"可叠加积分" → 前端允许同时使用积分
                        <br />
                        • 后台设置"限定上海/北京" → 前端提示"仅限上海、北京使用"
                      </p>
                    </LogicHighlight>
                  </>
                )
              }
            ]}
          />
        </div>
      </div>
    </MainLayout>
  )
}
