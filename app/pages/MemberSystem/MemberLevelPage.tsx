/**
 * 会员等级配置页面
 * 配置10个会员等级，参考万豪Bonvoy、华住会
 */

import { useState } from 'react'
import type { MemberLevel } from './types/member.types'
import { MemberLevelStatus } from './types/member.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '../PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight, LogicCode } from '../PointsSystem/components/LogicPanel'
import OperationLogButton from '../PointsSystem/components/OperationLogButton'

interface MemberLevelPageProps {
  levels: MemberLevel[]
}

export default function MemberLevelPage({ levels }: MemberLevelPageProps) {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [currentLevel, setCurrentLevel] = useState<MemberLevel | null>(null)
  const [editingOriginalPrice, setEditingOriginalPrice] = useState(0)
  const [editingPromotionPrice, setEditingPromotionPrice] = useState(0)

  const openEdit = (level: MemberLevel) => {
    setCurrentLevel(level)
    setEditingOriginalPrice(level.originalPrice)
    setEditingPromotionPrice(level.promotionPrice)
    setShowEditDialog(true)
  }

  // 计算折扣（促销价/划线价），四舍五入，一位小数，小数点后是0不展示
  const calculateDiscount = (promotionPrice: number, originalPrice: number): string => {
    if (!originalPrice || originalPrice === 0) return '-'
    const ratio = (promotionPrice / originalPrice) * 10
    const rounded = Math.round(ratio * 10) / 10
    return rounded % 1 === 0 ? `${Math.round(rounded)}折` : `${rounded}折`
  }

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">会员等级配置</h1>
                <p className="text-slate-600 mt-2">配置会员等级体系，参考万豪、华住会</p>
              </div>
              <OperationLogButton moduleName="会员等级配置" />
            </div>

            {/* 会员等级列表 */}
            <Card>
              <CardHeader>
                <CardTitle>会员等级列表</CardTitle>
                <CardDescription>共 {levels.length} 个等级（0-9）</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">等级</TableHead>
                      <TableHead>外部名称</TableHead>
                      <TableHead className="w-[80px]">有效期</TableHead>
                      <TableHead className="w-[80px]">升级间夜</TableHead>
                      <TableHead className="w-[80px]">保级间夜</TableHead>
                      <TableHead className="w-[80px]">积分倍率</TableHead>
                      <TableHead className="w-[90px]">最低折扣</TableHead>
                      <TableHead className="w-[60px]">状态</TableHead>
                      <TableHead className="text-right w-[120px]">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {levels.map((level) => (
                      <TableRow key={level.level}>
                        <TableCell className="font-mono font-bold text-center">{level.level}</TableCell>
                        <TableCell className="font-medium">{level.externalName}</TableCell>
                        <TableCell className="text-sm">{level.validityYears}年</TableCell>
                        <TableCell className="text-sm text-center">{level.upgradeNights}</TableCell>
                        <TableCell className="text-sm text-center">{level.maintainNights}</TableCell>
                        <TableCell className="text-sm text-center">
                          <span className="font-medium text-blue-600">{level.pointsMultiplier}×</span>
                        </TableCell>
                        <TableCell className="text-sm text-center">
                          <span className="font-medium text-green-600">{level.minDiscount}%</span>
                        </TableCell>
                        <TableCell>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={level.status === MemberLevelStatus.ONLINE}
                              className="sr-only peer"
                              onChange={() => alert(`切换等级${level.level}状态`)}
                            />
                            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                          </label>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => openEdit(level)}>
                            编辑
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* 会员卡预览 */}
            <Card>
              <CardHeader>
                <CardTitle>会员卡预览</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-4">
                  {levels.slice(0, 5).map((level) => (
                    <div
                      key={level.level}
                      className="rounded-lg p-4 text-white shadow-lg"
                      style={{ backgroundColor: level.cardBgColor }}
                    >
                      <div className="text-xs opacity-80">VIP {level.level}</div>
                      <div className="font-bold mt-1">{level.externalName}</div>
                      <div className="text-xs mt-2 opacity-80">{level.pointsMultiplier}× 积分</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 编辑弹窗 */}
        {showEditDialog && currentLevel && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle>编辑会员等级 - VIP{currentLevel.level}</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setShowEditDialog(false)}>✕</Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>内部名称</Label>
                    <Input defaultValue={currentLevel.internalName} placeholder="例如：LEVEL_1" />
                  </div>
                  <div>
                    <Label>外部名称</Label>
                    <Input defaultValue={currentLevel.externalName} placeholder="例如：银卡会员" />
                  </div>
                  <div>
                    <Label>有效期（年）</Label>
                    <Input type="number" defaultValue={currentLevel.validityYears} />
                  </div>
                  <div>
                    <Label>升级所需间夜数</Label>
                    <Input type="number" defaultValue={currentLevel.upgradeNights} />
                  </div>
                  <div>
                    <Label>保级所需间夜数</Label>
                    <Input type="number" defaultValue={currentLevel.maintainNights} />
                  </div>
                  <div>
                    <Label>积分倍率（1.0-2.0）</Label>
                    <Input type="number" step="0.1" defaultValue={currentLevel.pointsMultiplier} />
                  </div>
                  <div>
                    <Label>最低折扣（%）</Label>
                    <Input type="number" defaultValue={currentLevel.minDiscount} placeholder="例如：90表示最低9折" />
                    <p className="text-xs text-slate-500 mt-1">
                      商家可在此基础上给更低折扣
                    </p>
                  </div>
                </div>

                {/* 体验卡配置 */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">体验卡赠送</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>赠送数量</Label>
                      <Input type="number" defaultValue={currentLevel.trialCardCount} placeholder="可赠送几张体验卡" />
                    </div>
                    <div>
                      <Label>有效天数</Label>
                      <Input type="number" defaultValue={currentLevel.trialCardDays} placeholder="体验卡有效期（天）" />
                    </div>
                  </div>
                </div>

                {/* 售价配置 */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">会员卡售价</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>售价（元）</Label>
                      <Input type="number" defaultValue={currentLevel.price} />
                    </div>
                    <div>
                      <Label>划线价（元）</Label>
                      <Input
                        type="number"
                        value={editingOriginalPrice}
                        onChange={(e) => setEditingOriginalPrice(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label>促销价（元）</Label>
                      <Input
                        type="number"
                        value={editingPromotionPrice}
                        onChange={(e) => setEditingPromotionPrice(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  {/* 折扣自动计算 */}
                  <div className="mt-3 bg-blue-50 border border-blue-200 p-3 rounded-lg">
                    <p className="text-sm">
                      <span className="text-slate-600">折扣：</span>
                      <span className="font-bold text-blue-600 text-lg ml-2">
                        {calculateDiscount(editingPromotionPrice, editingOriginalPrice)}
                      </span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      计算公式：促销价 ÷ 划线价 × 10 = {editingPromotionPrice} ÷ {editingOriginalPrice} × 10 = {calculateDiscount(editingPromotionPrice, editingOriginalPrice)}
                    </p>
                  </div>
                </div>

                {/* 会员卡图片 */}
                <div className="border-t pt-4">
                  <Label>会员卡封面图片</Label>
                  <div className="mt-2 flex gap-4">
                    <div className="w-40 h-24 bg-slate-100 rounded border flex items-center justify-center">
                      <p className="text-xs text-slate-400">图片预览</p>
                    </div>
                    <div className="flex-1">
                      <Input defaultValue={currentLevel.cardCoverImage} placeholder="/cards/level1.jpg" />
                      <Button variant="outline" size="sm" className="mt-2">选择图片</Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>取消</Button>
                  <Button onClick={() => { alert('保存成功'); setShowEditDialog(false); }}>保存</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 右侧：业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="会员等级配置"
            sections={[
              {
                title: '业务场景（参考万豪、华住会）',
                content: (
                  <>
                    <p className="font-semibold mb-2">万豪Bonvoy会员体系：</p>
                    <LogicList
                      items={[
                        '会员（Member）→ 银卡（Silver Elite，10晚）→ 金卡（Gold Elite，25晚）',
                        '白金（Platinum，50晚）→ 钛金（Titanium，75晚）→ 大使（Ambassador，100晚+消费2万美元）',
                        '保级要求：每年需达到对应间夜数，否则降级',
                        '积分价值：高等级会员积分更值钱（可换更好的房间）'
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">华住会会员体系：</p>
                    <LogicList
                      items={[
                        '银卡（5晚）→ 金卡（20晚）→ 铂金（50晚）→ 黑金（100晚）',
                        '有效期1年，每年需重新累计间夜数保级',
                        '积分倍率：金卡1.5倍、铂金2倍、黑金2.5倍',
                        '折扣权益：等级越高，房价折扣越大'
                      ]}
                    />
                  </>
                )
              },
              {
                title: '解决的问题',
                content: (
                  <>
                    <p className="font-semibold mb-2">用户留存：</p>
                    <LogicList
                      items={[
                        '用户为了保级，会持续在平台订房（"我是金卡，不能掉级"）',
                        '等级越高，沉没成本越大，流失率越低',
                        '给高价值用户差异化服务（VIP待遇）'
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">商家价值：</p>
                    <LogicList
                      items={[
                        '高等级会员=高消费用户，商家愿意给折扣',
                        '平台给商家带来优质客源（不是价格敏感型用户）',
                        '会员忠诚度高，复购稳定'
                      ]}
                    />
                  </>
                )
              },
              {
                title: '产品逻辑',
                content: (
                  <>
                    <p className="font-semibold mb-2">为什么是"间夜数"而不是"订单数"？</p>
                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>间夜数</strong>（Night Stay）= 入住天数
                        <br />
                        示例：订1间房住3天 = 3间夜
                        <br />
                        <br />
                        为什么用间夜？
                        <br />
                        • 订单数不公平：住1天和住10天都算1单
                        <br />
                        • 间夜数更公平：住得越久，贡献越大
                        <br />• 行业标准：万豪、希尔顿、华住都用间夜数
                      </p>
                    </LogicHighlight>

                    <p className="font-semibold mt-4 mb-2">升级 vs 保级的区别：</p>
                    <LogicTable
                      headers={['对比项', '升级间夜', '保级间夜']}
                      rows={[
                        ['定义', '从低等级升到这个等级需要的间夜', '维持当前等级需要的年间夜'],
                        ['示例', '金卡升级需要10间夜', '金卡保级需要8间夜/年'],
                        ['逻辑', '累计达到即升级', '每年未达到则降级'],
                        ['特点', '一次性要求', '持续性要求']
                      ]}
                    />

                    <LogicCode>
{`示例：用户升级到金卡后的保级逻辑

2024年累计10间夜 → 升级到金卡（VIP2）
2025年只住了5间夜 < 8间夜（保级要求）
  → 2026年1月1日自动降级到银卡（VIP1）

2026年累计12间夜 > 8间夜
  → 保持金卡等级`}
                    </LogicCode>

                    <p className="font-semibold mt-4 mb-2">积分倍率设计：</p>
                    <LogicTable
                      headers={['等级', '倍率', '示例']}
                      rows={[
                        ['注册会员（VIP0）', '1.0×', '消费¥100 = 100积分'],
                        ['银卡（VIP1）', '1.1×', '消费¥100 = 110积分'],
                        ['金卡（VIP2）', '1.2×', '消费¥100 = 120积分'],
                        ['钻石（VIP4）', '1.4×', '消费¥100 = 140积分'],
                        ['终身会员（VIP9）', '2.0×', '消费¥100 = 200积分']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">最低折扣设计：</p>
                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>平台设置"最低折扣"，商家可在此基础上给更低折扣</strong>
                        <br />
                        <br />
                        示例：白金会员（VIP3）
                        <br />
                        平台要求：最低92%（即至少9.2折）
                        <br />
                        商家A设置：92%（按平台要求）
                        <br />
                        商家B设置：85%（给白金会员8.5折，更优惠）
                        <br />
                        <br />
                        逻辑：
                        <br />
                        • 平台保证会员基础权益（至少9.2折）
                        <br />• 商家可自主决定给更多优惠（吸引高等级会员）
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
                      ['level', '等级编号（0-9）', '2（金卡）'],
                      ['internalName', '内部名称（系统用）', 'LEVEL_2'],
                      ['externalName', '外部名称（用户看到）', '金卡会员'],
                      ['validityYears', '会员有效期（年）', '1（1年后需保级）'],
                      ['upgradeNights', '升级所需间夜数', '10（累计住10晚升金卡）'],
                      ['maintainNights', '保级所需间夜数', '8（每年住8晚保持金卡）'],
                      ['pointsMultiplier', '积分倍率', '1.2（积分×1.2倍）'],
                      ['minDiscount', '平台最低折扣（%）', '95（至少95折，商家可更低）'],
                      ['cardBgColor', '会员卡背景色', '#FFD700（金色）'],
                      ['status', '上线/下线', 'online上线 / offline下线']
                    ]}
                  />
                )
              },
              {
                title: '等级体系设计参考',
                content: (
                  <>
                    <p className="font-semibold mb-2">10个等级梯度设计：</p>
                    <LogicTable
                      headers={['等级', '名称', '升级间夜', '保级间夜', '积分倍率', '折扣']}
                      rows={[
                        ['VIP0', '注册会员', '0', '0', '1.0×', '100%'],
                        ['VIP1', '银卡', '5', '3', '1.1×', '98%'],
                        ['VIP2', '金卡', '10', '8', '1.2×', '95%'],
                        ['VIP3', '白金', '20', '15', '1.3×', '92%'],
                        ['VIP4', '钻石', '35', '25', '1.4×', '90%'],
                        ['VIP5', '黑金', '50', '35', '1.5×', '88%'],
                        ['VIP6', '至尊', '75', '50', '1.6×', '85%'],
                        ['VIP7', '荣耀', '100', '75', '1.75×', '82%'],
                        ['VIP8', '传奇', '150', '100', '1.85×', '80%'],
                        ['VIP9', '终身', '200', '0', '2.0×', '75%']
                      ]}
                    />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>设计思路</strong>：
                        <br />
                        1. 间夜数梯度递增（5→10→20→35...）
                        <br />
                        2. 保级要求略低于升级（避免频繁掉级）
                        <br />
                        3. 积分倍率线性增长（1.0→2.0）
                        <br />
                        4. 折扣越高级越大（100%→75%）
                        <br />
                        5. 高等级有效期更长（VIP4+有效期2-3年）
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '业务逻辑细节',
                content: (
                  <>
                    <p className="font-semibold mb-2">自动升降级时机：</p>
                    <LogicCode>
{`升级：实时检查
→ 用户完成订单后，系统自动累计间夜数
→ 达到升级要求，立即升级并通知用户

降级：年度检查
→ 每年1月1日凌晨，批量检查所有会员
→ 本年度间夜数 < 保级要求 → 自动降级
→ 发送降级通知邮件/短信`}
                    </LogicCode>

                    <p className="font-semibold mt-4 mb-2">终身会员特殊规则：</p>
                    <LogicList
                      items={[
                        '有效期99年（实际=终身）',
                        '保级间夜=0（不需要保级，永久有效）',
                        '达到200间夜自动获得终身会员',
                        '万豪做法：终身白金、终身钛金、终身大使'
                      ]}
                    />
                  </>
                )
              },
              {
                title: '异常处理',
                content: (
                  <LogicTable
                    headers={['场景', '处理逻辑']}
                    rows={[
                      ['用户退房后间夜数如何累计', '订单完成后24小时，确认无退款再累计'],
                      ['订单退款如何处理间夜', '已累计的间夜数扣回'],
                      ['跨年度间夜如何计算', '每年1月1日重置为0，重新累计'],
                      ['手动调整间夜数', '支持运营手动增减（需填写原因）'],
                      ['降级后的权益', '立即失效，但历史订单享受的权益不追溯'],
                      ['上线/下线等级', '下线等级暂停升级，已有用户保持等级不变']
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
                      <p className="font-semibold text-sm mb-2">📱 页面1：我的会员中心</p>
                      <div className="text-xs space-y-2">
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-3 rounded">
                          <div className="text-xs opacity-80">VIP 2</div>
                          <div className="font-bold">金卡会员</div>
                          <div className="text-xs mt-1">1.2× 积分加成</div>
                        </div>
                        <div className="text-slate-700">
                          <div>• 本年度已住：<span className="font-bold">8</span> 晚</div>
                          <div>• 升级到白金还需：<span className="text-orange-600 font-bold">12</span> 晚</div>
                          <div className="text-slate-500 text-xs">→ 后台配置的"白金升级20晚"决定升级要求</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                      <p className="font-semibold text-sm mb-2">📱 页面2：会员权益</p>
                      <div className="text-xs space-y-1 text-slate-700">
                        <div>✓ 积分1.2倍加成</div>
                        <div>✓ 最低95折优惠</div>
                        <div>✓ 赠送5张体验卡（15天有效）</div>
                        <div>✗ 延迟退房（需白金以上）</div>
                        <div>✗ 免费升房（需钻石以上）</div>
                        <div className="text-slate-500">→ 后台配置的"适用等级"决定哪些权益可用</div>
                      </div>
                    </div>

                    <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                      <p className="font-semibold text-sm mb-2">📱 页面3：会员商城-购买会员卡</p>
                      <div className="text-xs space-y-1 text-slate-700">
                        <div className="border-b pb-2 mb-2">
                          <div className="font-bold">金卡会员</div>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-red-600 font-bold text-lg">¥158</span>
                            <span className="text-slate-400 line-through text-xs">¥298</span>
                            <span className="bg-red-100 text-red-600 px-1.5 rounded text-xs">5.3折</span>
                          </div>
                        </div>
                        <div className="text-slate-500">→ 后台配置的"促销价¥158"和"划线价¥298"</div>
                        <div className="text-slate-500">→ 自动计算折扣：158÷298×10=5.3折</div>
                      </div>
                    </div>

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>后台→前端的映射关系：</strong>
                        <br />
                        • 后台设置"金卡升级10晚" → 前端显示进度条"8/10晚"
                        <br />
                        • 后台设置"积分倍率1.2×" → 前端提示"本次订单将获得120积分（1.2倍加成）"
                        <br />
                        • 后台设置"最低折扣95%" → 前端显示"会员专享95折起"
                        <br />
                        • 后台设置"体验卡5张/15天" → 前端显示"赠送5张15天体验卡"
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
