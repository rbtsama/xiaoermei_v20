/**
 * 用户积分账户管理页面
 * 搜索用户、查看积分余额、手动调整积分、查看明细
 */

import { useState } from 'react'
import type { UserPointsAccount, PointsDetail } from './types/points.types'
import { PointsChangeType, ManualAdjustType, ManualAdjustReason } from './types/points.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from './components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight, LogicCode } from './components/LogicPanel'

interface UserAccountPageProps {
  accounts: UserPointsAccount[]
  details: PointsDetail[]
}

export default function UserAccountPage({ accounts, details }: UserAccountPageProps) {
  const [searchPhone, setSearchPhone] = useState('')
  const [selectedUser, setSelectedUser] = useState<UserPointsAccount | null>(null)
  const [userDetails, setUserDetails] = useState<PointsDetail[]>([])
  const [showAdjustDialog, setShowAdjustDialog] = useState(false)
  const [adjustType, setAdjustType] = useState<ManualAdjustType>(ManualAdjustType.INCREASE)
  const [adjustPoints, setAdjustPoints] = useState(100)
  const [adjustReason, setAdjustReason] = useState('')

  const handleSearch = () => {
    const user = accounts.find(u => u.phone === searchPhone)
    if (user) {
      setSelectedUser(user)
      // 筛选出该用户的明细
      const filtered = details.filter(d => d.userId === user.userId)
      setUserDetails(filtered)
    } else {
      alert('未找到该用户')
    }
  }

  const handleAdjust = () => {
    if (!adjustReason.trim()) {
      alert('请填写调整原因')
      return
    }
    alert(`成功${adjustType === 'increase' ? '增加' : '减少'} ${adjustPoints} 积分`)
    setShowAdjustDialog(false)
    setAdjustReason('')
  }

  const getChangeTypeColor = (type: PointsChangeType) => {
    const colors: Record<PointsChangeType, string> = {
      [PointsChangeType.ORDER_COMPLETE]: 'text-green-600',
      [PointsChangeType.REDEEM]: 'text-blue-600',
      [PointsChangeType.REFUND]: 'text-red-600',
      [PointsChangeType.EXPIRE]: 'text-orange-600',
      [PointsChangeType.MANUAL_ADJUST]: 'text-purple-600',
      [PointsChangeType.RETURN]: 'text-cyan-600'
    }
    return colors[type] || 'text-foreground'
  }

  const getChangeTypeLabel = (type: PointsChangeType) => {
    const labels: Record<PointsChangeType, string> = {
      [PointsChangeType.ORDER_COMPLETE]: '订单完成',
      [PointsChangeType.REDEEM]: '积分抵扣',
      [PointsChangeType.REFUND]: '订单退款',
      [PointsChangeType.EXPIRE]: '积分过期',
      [PointsChangeType.MANUAL_ADJUST]: '手动调整',
      [PointsChangeType.RETURN]: '积分退回'
    }
    return labels[type] || type
  }

  return (
    <MainLayout>
      <div className="flex h-full">
      {/* 左侧：实际后台界面 (60%) */}
      <div className="w-[60%] h-full overflow-y-auto p-6 bg-background">
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold">用户积分账户管理</h1>
            <p className="text-muted-foreground mt-2">
              搜索用户、查看积分余额、手动调整积分、查看流水明细
            </p>
          </div>

          {/* 搜索用户 */}
          <Card>
            <CardHeader>
              <CardTitle>搜索用户</CardTitle>
              <CardDescription>通过手机号快速查询用户积分账户</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="searchPhone">手机号</Label>
                  <Input
                    id="searchPhone"
                    placeholder="请输入手机号（例如：13812345678）"
                    value={searchPhone}
                    onChange={(e) => setSearchPhone(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleSearch}>搜索</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 用户积分账户卡片 */}
          {selectedUser && (
            <>
              <Card className="border-primary/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{selectedUser.userName}</CardTitle>
                      <CardDescription>
                        手机号：{selectedUser.phone} | 用户ID：{selectedUser.userId}
                      </CardDescription>
                    </div>
                    <Button onClick={() => setShowAdjustDialog(true)}>手动调整积分</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                      <p className="text-sm text-muted-foreground">当前可用积分</p>
                      <p className="text-3xl font-bold text-green-600">{selectedUser.availablePoints.toLocaleString()}</p>
                    </div>

                    <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
                      <p className="text-sm text-muted-foreground">冻结中积分</p>
                      <p className="text-3xl font-bold text-yellow-600">{selectedUser.frozenPoints.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground mt-1">待确认订单</p>
                    </div>

                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                      <p className="text-sm text-muted-foreground">累计获得</p>
                      <p className="text-3xl font-bold text-blue-600">{selectedUser.totalEarned.toLocaleString()}</p>
                    </div>

                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
                      <p className="text-sm text-muted-foreground">累计消耗</p>
                      <p className="text-3xl font-bold text-purple-600">{selectedUser.totalSpent.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">即将过期：</span>
                      <span className="font-medium text-orange-600 ml-2">
                        {selectedUser.expiringPoints} 积分
                      </span>
                      {selectedUser.expiringDate && (
                        <span className="text-xs text-muted-foreground ml-2">({selectedUser.expiringDate})</span>
                      )}
                    </div>
                    <div>
                      <span className="text-muted-foreground">注册日期：</span>
                      <span className="font-medium ml-2">{selectedUser.registerDate}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">订单总数：</span>
                      <span className="font-medium ml-2">{selectedUser.orderCount} 单</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 积分明细 */}
              <Card>
                <CardHeader>
                  <CardTitle>积分明细流水</CardTitle>
                  <CardDescription>
                    共 {userDetails.length} 条记录
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>时间</TableHead>
                        <TableHead>类型</TableHead>
                        <TableHead className="text-right">积分变动</TableHead>
                        <TableHead className="text-right">余额</TableHead>
                        <TableHead>关联订单</TableHead>
                        <TableHead>说明</TableHead>
                        <TableHead>操作人</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userDetails.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center text-muted-foreground">
                            暂无积分流水记录
                          </TableCell>
                        </TableRow>
                      ) : (
                        userDetails.slice(0, 15).map((detail) => (
                          <TableRow key={detail.id}>
                            <TableCell className="text-sm">{detail.createdAt}</TableCell>
                            <TableCell>
                              <span className={`text-sm font-medium ${getChangeTypeColor(detail.changeType)}`}>
                                {getChangeTypeLabel(detail.changeType)}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <span className={`font-semibold ${detail.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {detail.points > 0 ? '+' : ''}{detail.points}
                              </span>
                            </TableCell>
                            <TableCell className="text-right font-medium">{detail.balance.toLocaleString()}</TableCell>
                            <TableCell className="text-sm text-blue-600">
                              {detail.orderId || '-'}
                            </TableCell>
                            <TableCell className="text-sm max-w-xs truncate">{detail.description}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{detail.operator}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}

          {/* 手动调整积分对话框 */}
          {showAdjustDialog && selectedUser && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>手动调整积分</CardTitle>
                  <CardDescription>
                    用户：{selectedUser.userName} ({selectedUser.phone})
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>调整类型</Label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={adjustType === ManualAdjustType.INCREASE}
                          onChange={() => setAdjustType(ManualAdjustType.INCREASE)}
                        />
                        增加积分
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={adjustType === ManualAdjustType.DECREASE}
                          onChange={() => setAdjustType(ManualAdjustType.DECREASE)}
                        />
                        减少积分
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="adjustPoints">积分数量</Label>
                    <Input
                      id="adjustPoints"
                      type="number"
                      value={adjustPoints}
                      onChange={(e) => setAdjustPoints(Number(e.target.value))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="adjustReason">调整原因（必填）</Label>
                    <Input
                      id="adjustReason"
                      placeholder="例如：客服补偿-房间WiFi故障"
                      value={adjustReason}
                      onChange={(e) => setAdjustReason(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      常见原因：客服补偿、运营活动、异常扣除、系统错误修正
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm">
                      <span className="text-muted-foreground">当前可用积分：</span>
                      <span className="font-semibold">{selectedUser.availablePoints.toLocaleString()}</span>
                    </p>
                    <p className="text-sm mt-1">
                      <span className="text-muted-foreground">调整后积分：</span>
                      <span className="font-semibold">
                        {(selectedUser.availablePoints + (adjustType === 'increase' ? adjustPoints : -adjustPoints)).toLocaleString()}
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowAdjustDialog(false)} className="flex-1">
                      取消
                    </Button>
                    <Button onClick={handleAdjust} className="flex-1">
                      确认调整
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* 右侧：产品&业务逻辑说明 (40%) */}
      <div className="w-[40%] h-full border-l">
        <LogicPanel
          title="用户积分账户管理"
          sections={[
            {
              title: '业务场景',
              content: (
                <>
                  <p className="font-semibold mb-2">在酒店行业的使用场景：</p>
                  <LogicList
                    items={[
                      <><strong>携程客服后台</strong>：可查看用户积分余额、手动补偿积分（订单问题赔偿）</>,
                      <><strong>美团客服</strong>：用户投诉后，客服直接送积分（"补偿您100积分"）</>,
                      <><strong>华住会会员中心</strong>：会员可查看积分明细，按月汇总</>,
                      <><strong>万豪APP</strong>：积分明细可点击订单号跳转到订单详情</>
                    ]}
                  />
                </>
              )
            },
            {
              title: '解决的问题',
              content: (
                <>
                  <p className="font-semibold mb-2">客服场景：</p>
                  <LogicList
                    items={[
                      '用户电话咨询"我有多少积分可以用？"→ 客服快速查询',
                      '用户质疑"我明明订了房，为什么没加积分？"→ 查明细溯源',
                      '用户投诉房间问题 → 客服直接补偿积分安抚'
                    ]}
                  />

                  <p className="font-semibold mt-4 mb-2">运营场景：</p>
                  <LogicList
                    items={[
                      '针对高价值用户（高积分余额）进行精准营销',
                      '识别活跃用户（消耗率高）和沉睡用户（有积分但不用）',
                      '补偿积分给参与活动的用户'
                    ]}
                  />

                  <p className="font-semibold mt-4 mb-2">风控场景：</p>
                  <LogicList
                    items={[
                      '发现某用户积分异常暴增 → 查明细排查是否刷单',
                      '监控频繁退款用户，防止刷积分'
                    ]}
                  />
                </>
              )
            },
            {
              title: '产品逻辑',
              content: (
                <>
                  <p className="font-semibold mb-2">字段设计逻辑：</p>
                  <LogicTable
                    headers={['字段', '为什么需要？', '使用场景']}
                    rows={[
                      ['可用积分', '用户当前能立即使用的积分', '下单时选择抵扣'],
                      ['冻结积分', '订单待确认/退款中，暂时不可用', '防止用户重复使用'],
                      ['累计获得', '历史总共赚了多少积分', '判断用户价值（高积分=高价值用户）'],
                      ['累计消耗', '历史总共用了多少积分', '分析用户活跃度（消耗率高=活跃）'],
                      ['即将过期', '30天内要过期的积分', '触发营销（"快用积分订房，别浪费"）']
                    ]}
                  />

                  <p className="font-semibold mt-4 mb-2">手动调整规则：</p>
                  <LogicList
                    items={[
                      '必须选择类型：增加/减少',
                      '必须填写原因：客服补偿、运营活动、异常扣除、系统错误修正',
                      '操作记录留痕：记录操作人、操作时间、IP地址'
                    ]}
                  />

                  <LogicHighlight type="warning">
                    <p className="text-sm">
                      <strong>权限设计建议</strong>：
                      <br />
                      • 客服：只能查看，不能调整
                      <br />
                      • 运营主管：可调整±1000积分以内
                      <br />• 平台管理员：无限制
                    </p>
                  </LogicHighlight>
                </>
              )
            },
            {
              title: '积分明细类型',
              content: (
                <LogicTable
                  headers={['明细类型', '触发场景', '积分变动', '说明示例']}
                  rows={[
                    ['订单完成', '用户退房后，酒店确认订单完成', '+458', '入住"XX酒店"，消费¥458'],
                    ['积分抵扣', '用户下单时使用积分', '-500', '订单HT20250116002使用500积分抵扣¥5'],
                    ['订单退款', '用户取消订单，退款成功', '-238', '订单HT20250115001退款，扣回积分'],
                    ['积分过期', '12个月未使用的积分', '-200', '2024年1月获得的积分已过期'],
                    ['手动调整', '客服/运营手动操作', '+500', '客服补偿：房间设施问题'],
                    ['积分退回', '订单取消后，抵扣的积分退回', '+500', '订单HT20250116002取消，积分退回']
                  ]}
                />
              )
            },
            {
              title: '异常处理',
              content: (
                <>
                  <LogicTable
                    headers={['场景', '处理逻辑']}
                    rows={[
                      ['订单完成后才发现用户用了假证件', '手动扣除积分，备注"违规扣除"'],
                      ['用户取消订单但积分已使用抵扣', '积分退回到账户，可继续使用'],
                      ['用户投诉后补偿积分', '手动增加，备注"客服补偿-订单号XXX"'],
                      ['积分过期当天，用户刚好下单使用', '优先消耗即将过期的积分（先进先出FIFO）'],
                      ['手动调整时余额不足', '提示"用户积分余额不足，无法减少"']
                    ]}
                  />

                  <p className="font-semibold mt-4 mb-2">积分流水溯源流程：</p>
                  <LogicCode>
{`用户质疑"我明明订了房，为什么没加积分？"

客服操作：
1. 搜索用户手机号
2. 查看积分明细，筛选"订单完成"类型
3. 查找对应订单号

可能原因：
- 订单未完成（用户提前退房但商家未确认）
- 订单金额<50元（低于最低起算金额）
- 24小时延迟发放未到时间
- 系统发放失败（需查失败日志）`}
                  </LogicCode>
                </>
              )
            },
            {
              title: '行业最佳实践',
              content: (
                <>
                  <p className="font-semibold mb-2">华住会做法：</p>
                  <LogicList
                    items={[
                      'APP中积分明细可按月汇总，方便用户查看',
                      '即将过期积分会在APP首页红点提醒',
                      '客服后台有"积分补发"功能，专门处理系统异常'
                    ]}
                  />

                  <p className="font-semibold mt-4 mb-2">携程做法：</p>
                  <LogicList
                    items={[
                      '积分明细可导出Excel，方便企业用户报销',
                      '客服有"一键补偿"按钮，快速处理投诉',
                      '积分明细中的订单号可点击跳转，提升体验'
                    ]}
                  />

                  <LogicHighlight type="success">
                    <p className="text-sm">
                      <strong>你可以借鉴的点</strong>：
                      <br />
                      1. 积分明细支持按类型筛选（只看"订单完成"或"手动调整"）
                      <br />
                      2. 快速选择功能，方便客服测试
                      <br />
                      3. 手动调整时强制填写原因，确保可追溯
                      <br />
                      4. 高价值用户（积分余额&gt;10000）可标记"VIP"，优先服务
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
