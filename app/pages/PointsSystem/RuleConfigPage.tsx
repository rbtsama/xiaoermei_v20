/**
 * 积分规则配置页面
 * 展示和配置积分获取、消耗、有效期规则
 */

import { useState } from 'react'
import type { PointsRuleConfig } from './types/points.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import MainLayout from './components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight, LogicCode } from './components/LogicPanel'
import OperationLogButton from './components/OperationLogButton'

interface RuleConfigPageProps {
  initialConfig: PointsRuleConfig
}

export default function RuleConfigPage({ initialConfig }: RuleConfigPageProps) {
  const [config, setConfig] = useState(initialConfig)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert('配置保存成功！')
  }

  return (
    <MainLayout>
      <div className="flex h-full">
      {/* 左侧：实际后台界面 (60%) */}
      <div className="w-[60%] h-full overflow-y-auto p-6 bg-background">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold">积分规则配置</h1>
            <p className="text-muted-foreground mt-2">
              配置平台积分的获取、消耗和有效期规则
            </p>
          </div>

          {/* 积分获取规则 */}
          <Card>
            <CardHeader>
              <CardTitle>积分获取规则</CardTitle>
              <CardDescription>配置用户订单完成后如何获得积分</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="earnRatio">消费兑换比例</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">消费 1 元 =</span>
                    <Input
                      id="earnRatio"
                      type="number"
                      value={config.earnRule.earnRatio}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          earnRule: { ...config.earnRule, earnRatio: Number(e.target.value) }
                        })
                      }
                      className="w-24"
                    />
                    <span className="text-sm">积分</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    参考：美团 1:1，京东 1:2
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minOrderAmount">最低起算金额</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">订单满</span>
                    <Input
                      id="minOrderAmount"
                      type="number"
                      value={config.earnRule.minOrderAmount}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          earnRule: { ...config.earnRule, minOrderAmount: Number(e.target.value) }
                        })
                      }
                      className="w-24"
                    />
                    <span className="text-sm">元起算</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="delayHours">发放时机</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">订单完成后</span>
                  <Input
                    id="delayHours"
                    type="number"
                    value={config.earnRule.delayHours}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        earnRule: { ...config.earnRule, delayHours: Number(e.target.value) }
                      })
                    }
                    className="w-24"
                  />
                  <span className="text-sm">小时发放积分</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  建议24小时（给风控系统留出检测时间）
                </p>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-2">排除项设置</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={config.earnRule.excludeCoupon}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          earnRule: { ...config.earnRule, excludeCoupon: e.target.checked }
                        })
                      }
                      className="rounded"
                    />
                    优惠券抵扣金额不计入积分
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={config.earnRule.excludeCommission}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          earnRule: { ...config.earnRule, excludeCommission: e.target.checked }
                        })
                      }
                      className="rounded"
                    />
                    平台佣金不计入积分
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 积分消耗规则 */}
          <Card>
            <CardHeader>
              <CardTitle>积分消耗规则</CardTitle>
              <CardDescription>配置用户如何使用积分抵扣房费</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="redeemRatio">积分兑换比例</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="redeemRatio"
                      type="number"
                      value={config.redeemRule.redeemRatio}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          redeemRule: { ...config.redeemRule, redeemRatio: Number(e.target.value) }
                        })
                      }
                      className="w-24"
                    />
                    <span className="text-sm">积分 = 1 元</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    参考：京东 100:1，美团 100:1
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minRedeemPoints">最低使用门槛</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">至少</span>
                    <Input
                      id="minRedeemPoints"
                      type="number"
                      value={config.redeemRule.minRedeemPoints}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          redeemRule: { ...config.redeemRule, minRedeemPoints: Number(e.target.value) }
                        })
                      }
                      className="w-24"
                    />
                    <span className="text-sm">积分起用</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxRedeemPercent">单笔订单抵扣上限</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">最多抵扣订单金额的</span>
                  <Input
                    id="maxRedeemPercent"
                    type="number"
                    value={config.redeemRule.maxRedeemPercent}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        redeemRule: { ...config.redeemRule, maxRedeemPercent: Number(e.target.value) }
                      })
                    }
                    className="w-24"
                  />
                  <span className="text-sm">%</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  建议20-30%（防止用户纯用积分白嫖）
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">示例计算</p>
                <p className="text-sm text-muted-foreground">
                  订单金额：¥358 | 用户使用：500积分
                  <br />
                  可抵扣金额：500 ÷ {config.redeemRule.redeemRatio} = ¥{(500 / config.redeemRule.redeemRatio).toFixed(2)}
                  <br />
                  抵扣上限：358 × {config.redeemRule.maxRedeemPercent}% = ¥{(358 * config.redeemRule.maxRedeemPercent / 100).toFixed(2)}
                  <br />
                  实际抵扣：¥{Math.min(500 / config.redeemRule.redeemRatio, 358 * config.redeemRule.maxRedeemPercent / 100).toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 积分有效期规则 */}
          <Card>
            <CardHeader>
              <CardTitle>积分有效期规则</CardTitle>
              <CardDescription>配置积分的过期时间和提醒</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 基础有效期 */}
              <div className="space-y-2">
                <Label htmlFor="baseExpiryMonths">基础有效期</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">积分至少有效</span>
                  <Input
                    id="baseExpiryMonths"
                    type="number"
                    value={config.expiryRule.baseExpiryMonths}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        expiryRule: { ...config.expiryRule, baseExpiryMonths: Number(e.target.value) }
                      })
                    }
                    className="w-24"
                  />
                  <span className="text-sm">个月</span>
                </div>
                <p className="text-xs text-slate-500">
                  保证用户获得的积分至少有12个月使用时间
                </p>
              </div>

              {/* 统一过期节点 */}
              <div className="space-y-2">
                <Label>统一过期节点</Label>
                <div className="mt-2 space-y-2">
                  {config.expiryRule.expiryNodes?.map((node, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-50 p-3 rounded border">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">{node.month}月{node.day}日</span>
                        <span className="text-xs text-slate-500">({node.label})</span>
                      </div>
                      <Button variant="outline" size="sm" className="text-red-600">
                        删除
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  + 添加节点
                </Button>
                <p className="text-xs text-slate-500 mt-2">
                  当前设置：每年1月1日、7月1日统一过期
                </p>
              </div>

              {/* 计算规则说明 */}
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">📐 计算规则</p>
                <p className="text-sm text-slate-700">
                  过期日期 = 获得日期 + 基础有效期（{config.expiryRule.baseExpiryMonths}个月）+ 之后最近的过期节点
                </p>
              </div>

              {/* 示例计算 */}
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg space-y-2">
                <p className="text-sm font-medium mb-2">💡 示例计算</p>
                <div className="text-xs space-y-1 text-slate-700">
                  <div>24年3月28日获得 → 25年3月28日（+12个月）→ 25年7月1日过期（最近节点）</div>
                  <div>24年8月15日获得 → 25年8月15日（+12个月）→ 26年1月1日过期（最近节点）</div>
                  <div>24年12月20日获得 → 25年12月20日（+12个月）→ 26年1月1日过期（最近节点）</div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  ✅ 保证最低有效期12个月，实际有效期12-18个月
                </p>
              </div>

              {/* 过期提醒天数 */}
              <div className="space-y-2">
                <Label htmlFor="reminderDays">过期提醒</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">到期前</span>
                  <Input
                    id="reminderDays"
                    type="number"
                    value={config.expiryRule.reminderDays}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        expiryRule: { ...config.expiryRule, reminderDays: Number(e.target.value) }
                      })
                    }
                    className="w-24"
                  />
                  <span className="text-sm">天提醒</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 操作按钮 */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              最后更新：{config.updatedAt} | 操作人：{config.updatedBy}
            </div>
            <Button onClick={handleSave} disabled={isSaving} size="lg">
              {isSaving ? '保存中...' : '保存配置'}
            </Button>
          </div>
        </div>
      </div>

      {/* 右侧：产品&业务逻辑说明 (40%) */}
      <div className="w-[40%] h-full border-l">
        <LogicPanel
          title="积分规则配置中心"
          sections={[
            {
              title: '业务场景',
              content: (
                <>
                  <p className="font-semibold mb-2">在酒店行业的使用场景：</p>
                  <LogicList
                    items={[
                      <><strong>华住会</strong>：消费1元=10积分，10000积分=100元房费（10:1兑换比）</>,
                      <><strong>万豪</strong>：高端房消费1美元=10积分，积分可换免费房（变动兑换比）</>,
                      <><strong>美团</strong>：消费1元=1积分，100积分=1元抵扣（100:1兑换比）</>,
                      <><strong>携程</strong>：通常限制抵扣20-30%，防止纯积分白嫖</>
                    ]}
                  />
                  <LogicHighlight type="warning">
                    <p className="text-sm">
                      <strong>你的平台特殊性</strong>：商家是入驻制，平台只赚5%佣金，积分成本需要从佣金中承担。建议从5%佣金中拿出1%作为积分成本（例如：订单¥100，佣金¥5，积分成本¥1，实际利润¥4）
                    </p>
                  </LogicHighlight>
                </>
              )
            },
            {
              title: '解决的问题',
              content: (
                <>
                  <p className="font-semibold mb-2">用户痛点：</p>
                  <LogicList items={['在撮合平台订房，没有品牌归属感，容易流失到美团/携程', '没有消费回报，缺乏复购动力']} />

                  <p className="font-semibold mt-4 mb-2">平台价值：</p>
                  <LogicList
                    items={[
                      '用积分创造"沉没成本"，有积分的用户更倾向于继续在平台消费',
                      '提高复购率："再订一单就能凑够500积分抵扣50元"',
                      '数据资产：积分账户=用户画像（高积分用户=高价值用户）'
                    ]}
                  />

                  <p className="font-semibold mt-4 mb-2">商家诉求：</p>
                  <LogicList items={['平台统一承担积分成本，商家无需额外投入', '吸引平台高价值用户（高积分用户）入住']} />
                </>
              )
            },
            {
              title: '产品逻辑',
              content: (
                <>
                  <p className="font-semibold mb-2">为什么这样设计？</p>
                  <LogicTable
                    headers={['配置项', '设计理由', '行业参考']}
                    rows={[
                      ['1元=1积分', '简单易懂，用户心智成本低', '行业常见做法'],
                      ['100积分=1元', '降低积分价值感知，避免过度消耗', '京东（100京豆=1元，可确认）'],
                      ['最多抵扣30%', '防止羊毛党纯用积分白嫖，保证现金流', '行业通常20-30%'],
                      ['有效期12个月', '促进用户复购（"积分快过期了，赶紧用"）', '各平台1-2年不等'],
                      ['发放延迟24小时', '给风控系统留出检测刷单的时间', '基于风控考虑的常规做法']
                    ]}
                  />

                  <p className="font-semibold mt-4 mb-2">核心计算公式：</p>
                  <LogicCode>
{`订单完成后发放积分 =
  (订单实付金额 - 优惠券抵扣 - 平台佣金) × 兑换比例

示例：
订单金额：¥458
优惠券：¥0
平台佣金（5%）：¥22.9
兑换比例：1元=1积分

发放积分 = (458 - 0 - 22.9) × 1 = 435 积分`}
                  </LogicCode>

                  <LogicCode>
{`积分抵扣金额 =
  MIN(用户使用积分 ÷ 兑换比例, 订单金额 × 抵扣上限%)

示例：
订单金额：¥358
用户使用：500积分
兑换比例：100积分=¥1
抵扣上限：30%

计算：
500 ÷ 100 = ¥5（用户想抵扣¥5）
358 × 30% = ¥107.4（最多可抵扣¥107.4）
实际抵扣 = MIN(5, 107.4) = ¥5 ✅`}
                  </LogicCode>
                </>
              )
            },
            {
              title: '字段说明',
              content: (
                <LogicTable
                  headers={['字段名', '类型', '含义', '示例']}
                  rows={[
                    ['earnRatio', 'number', '消费金额与积分的兑换比例', '1（1元=1积分）'],
                    ['minOrderAmount', 'number', '最低起算金额（元）', '50（订单满50元才计算积分）'],
                    ['delayHours', 'number', '发放延迟时间（小时）', '24（订单完成后24小时发放）'],
                    ['redeemRatio', 'number', '积分与金额的兑换比例', '100（100积分=1元）'],
                    ['maxRedeemPercent', 'number', '单笔订单最多抵扣比例（%）', '30（最多抵扣30%）'],
                    ['minRedeemPoints', 'number', '单次最少使用积分', '100（至少100积分起用）'],
                    ['baseExpiryMonths', 'number', '基础有效期（月）', '12（保证至少12个月）'],
                    ['expiryNodes', 'array', '统一过期节点列表', '[{month:1,day:1},{month:7,day:1}]'],
                    ['calcRule', 'string', '计算规则', 'base_plus_node（基础有效期+最近节点）'],
                    ['reminderDays', 'number', '到期提醒天数', '30（到期前30天提醒）']
                  ]}
                />
              )
            },
            {
              title: '💡 统一过期节点设计（重点）',
              content: (
                <>
                  <p className="font-semibold mb-2">传统按月计算的问题：</p>
                  <LogicHighlight type="warning">
                    <p className="text-sm">
                      如果用户一年内订房20次，按月计算会产生20个不同的过期日期，导致：
                      <br />
                      • 每次过期都要提醒一次（一年20次提醒，用户烦）
                      <br />
                      • 用户心智负担重（记不住哪批积分什么时候过期）
                      <br />• 系统复杂度高（需要为每批积分单独计时）
                    </p>
                  </LogicHighlight>

                  <p className="font-semibold mt-4 mb-2">统一过期节点方案：</p>
                  <LogicList
                    items={[
                      '设置每年固定的过期日期（例如：1月1日、7月1日）',
                      '用户获得积分后，自动对齐到未来第N个过期节点',
                      '所有积分统一在节点日期过期，一年最多2次提醒',
                      '用户心智负担低（只需记住1/1、7/1）'
                    ]}
                  />

                  <p className="font-semibold mt-4 mb-2">计算示例（nodeOffset=2）：</p>
                  <LogicCode>
{`过期节点：每年1月1日、7月1日
nodeOffset=2（跨2个节点才过期）

示例1：用户在3月15日获得积分
  下一个节点：7月1日
  第2个节点：次年1月1日 ← 在这个日期过期
  有效期：约9.5个月

示例2：用户在8月20日获得积分
  下一个节点：次年1月1日
  第2个节点：次年7月1日 ← 在这个日期过期
  有效期：约10.5个月

示例3：用户在12月25日获得积分
  下一个节点：次年1月1日
  第2个节点：次年7月1日 ← 在这个日期过期
  有效期：约6个月`}
                  </LogicCode>

                  <p className="font-semibold mt-4 mb-2">我们采用的方案（基础有效期+统一节点）：</p>
                  <LogicCode>
{`优势：
1. 公平性 → 保证最低有效期12个月
2. 用户体验 → 一年最多2次提醒（1/1、7/1）
3. 灵活性 → 实际有效期12-18个月（给用户额外时间）

计算公式：
过期日期 = MAX(
  获得日期 + 12个月,
  之后最近的过期节点
)

示例（更准确的计算）：
24年3月28日获得：
  → 24年3月28日 + 12个月 = 25年3月28日（基础到期）
  → 25年3月28日之后最近节点 = 25年7月1日
  → 过期日期：25年7月1日（实际有效期约15个月）✓

24年12月20日获得：
  → 24年12月20日 + 12个月 = 25年12月20日（基础到期）
  → 25年12月20日之后最近节点 = 26年1月1日
  → 过期日期：26年1月1日（实际有效期约12.5个月）✓`}
                  </LogicCode>

                  <LogicHighlight type="success">
                    <p className="text-sm">
                      <strong>这样设计的好处：</strong>
                      <br />
                      1. 公平：每个用户至少有12个月使用时间
                      <br />
                      2. 体验好：一年最多2次过期提醒
                      <br />
                      3. 简单：用户只需记住1/1、7/1两个日期
                      <br />
                      4. 灵活：节点可动态增删（可改为3个、4个节点）
                    </p>
                  </LogicHighlight>
                </>
              )
            },
            {
              title: '异常处理',
              content: (
                <>
                  <LogicTable
                    headers={['场景', '处理逻辑']}
                    rows={[
                      ['订单退款', '已发放积分全额扣回；如积分已使用，先退回积分再退款'],
                      ['部分退款', '按比例扣回积分（例如：退50%房费，扣回50%积分）'],
                      ['积分过期', '自动扣除，并发送通知；过期积分不可退回'],
                      ['用户积分不足', '下单时提示可用积分不足，不允许超额使用'],
                      ['积分发放失败', '自动重试3次；重试失败记录到失败日志，人工补发']
                    ]}
                  />

                  <LogicHighlight type="info">
                    <p className="text-sm">
                      <strong>风控建议</strong>：如发现用户频繁下单→退款刷积分，应加入黑名单，禁止获取积分
                    </p>
                  </LogicHighlight>
                </>
              )
            },
            {
              title: '功能优先级',
              content: (
                <>
                  <p className="mb-2">
                    <strong className="text-green-600">P0（必须有）</strong>
                  </p>
                  <LogicList items={['获取比例配置', '抵扣比例配置', '有效期配置']} />

                  <p className="mt-4 mb-2">
                    <strong className="text-yellow-600">P1（重要）</strong>
                  </p>
                  <LogicList items={['抵扣上限设置', '最低使用门槛', '发放时机配置']} />

                  <p className="mt-4 mb-2">
                    <strong className="text-blue-600">P2（优化）</strong>
                  </p>
                  <LogicList items={['排除项设置（优惠券、佣金）', '过期提醒功能', '实时计算预览']} />
                </>
              )
            },
            {
              title: '📱 用户端（C端）呈现',
              content: (
                <>
                  <p className="font-semibold mb-2">后台配置如何影响用户端：</p>

                  <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                    <p className="font-semibold text-sm mb-2">📱 页面1：我的积分</p>
                    <div className="text-xs space-y-1 text-slate-700">
                      <div>• 当前可用积分：<span className="text-blue-600 font-bold">15,680</span></div>
                      <div>• 即将过期：<span className="text-orange-600">200积分将于01/01过期</span></div>
                      <div className="text-slate-500">→ 后台配置的"过期节点1/1"决定提醒时间</div>
                    </div>
                  </div>

                  <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                    <p className="font-semibold text-sm mb-2">📱 页面2：积分明细</p>
                    <div className="text-xs space-y-1 text-slate-700">
                      <div>• 01/15 订单完成 +458积分</div>
                      <div>• 01/14 积分抵扣 -500积分</div>
                      <div>• 12/15 积分过期 -200积分</div>
                      <div className="text-slate-500">→ 后台配置的"有效期规则"决定何时过期</div>
                    </div>
                  </div>

                  <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                    <p className="font-semibold text-sm mb-2">📱 页面3：下单页-积分抵扣</p>
                    <div className="text-xs space-y-1 text-slate-700">
                      <div>房费：¥358</div>
                      <div>使用积分：<input className="border px-1 w-16 text-xs" placeholder="500" /> 积分</div>
                      <div>可抵扣：¥5（最多可抵¥107，您只用了500积分）</div>
                      <div>实付：<span className="text-red-600 font-bold">¥353</span></div>
                      <div className="text-slate-500">→ 后台配置的"抵扣上限30%"限制最多抵扣金额</div>
                      <div className="text-slate-500">→ 后台配置的"100积分=1元"决定兑换比例</div>
                    </div>
                  </div>

                  <LogicHighlight type="success">
                    <p className="text-sm">
                      <strong>后台→前端的映射关系：</strong>
                      <br />
                      • 后台设置"获取比例1:1" → 前端显示"消费¥100得100积分"
                      <br />
                      • 后台设置"抽佣5%" → 前端不显示（用户不关心）
                      <br />
                      • 后台设置"过期节点1/1、7/1" → 前端提醒"您的积分将于1月1日过期"
                      <br />
                      • 后台设置"抵扣上限30%" → 前端提示"最多可抵扣¥107"
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
