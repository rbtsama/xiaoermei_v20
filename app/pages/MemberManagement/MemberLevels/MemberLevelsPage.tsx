import { useState } from 'react'
import { Link } from '@remix-run/react'
import type { MemberLevel } from './types/memberLevels.types'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { useViewMode } from '~/contexts/ViewModeContext'
import Sidebar, { menuConfig } from '~/pages/PointsSystem/components/Sidebar'
import LogicPanel, { LogicTable, LogicList, LogicHighlight } from '~/pages/PointsSystem/components/LogicPanel'

interface MemberLevelsPageProps {
  levels: MemberLevel[]
  error: string | null
}

export default function MemberLevelsPage({ levels, error }: MemberLevelsPageProps) {
  const { isLearningMode } = useViewMode()
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // 全选/取消全选
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(levels.map(l => l.id))
    } else {
      setSelectedIds([])
    }
  }

  // 单选
  const handleSelect = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id])
    } else {
      setSelectedIds(selectedIds.filter(sid => sid !== id))
    }
  }

  // LogicPanel 配置
  const logicSections = [
    {
      title: '业务场景',
      content: (
        <div className="space-y-4">
          <p>会员等级体系是酒店会员管理的核心，通过差异化的等级权益提升客户粘性：</p>
          <LogicList items={[
            <><strong>提升复购率：</strong>等级权益激励客户持续消费，追求更高等级</>,
            <><strong>增强粘性：</strong>获得的会员等级和权益让客户不愿流失到竞品</>,
            <><strong>精准营销：</strong>针对不同等级会员提供差异化的营销活动</>,
            <><strong>收入增长：</strong>高等级会员通常有更高的消费频次和客单价</>
          ]} />
        </div>
      )
    },
    {
      title: '等级权益设计',
      content: (
        <div className="space-y-4">
          <p>每个会员等级包含以下权益配置：</p>
          <LogicList items={[
            <><strong>升级规则：</strong>预订次数、消费金额双重条件，灵活组合</>,
            <><strong>折扣权益：</strong>订房折扣范围和具体折扣，提升消费意愿</>,
            <><strong>积分汇率：</strong>不同等级享受不同的积分获取比例</>,
            <><strong>升级奖励：</strong>达到等级后赠送免费套餐，增加惊喜感</>
          ]} />
          <LogicHighlight type="success">
            <strong>最佳实践：</strong>等级设置3-4级最佳，权益递进明显但不宜差距过大，保持吸引力。
          </LogicHighlight>
        </div>
      )
    },
    {
      title: '升级规则说明',
      content: (
        <div className="space-y-4">
          <p>会员等级升级通常基于以下条件：</p>
          <LogicList items={[
            <><strong>预订次数：</strong>累计预订订单的次数（主要条件）</>,
            <><strong>消费金额：</strong>累计消费金额达到一定标准（辅助条件）</>,
            <><strong>有效期：</strong>等级有效期（如1年、2年、永久）</>,
            <><strong>组合条件：</strong>需同时满足预订次数和消费金额</>
          ]} />
          <LogicTable
            headers={['等级', '升级条件', '有效期']}
            rows={[
              ['注册会员', '注册即可获得', '永久'],
              ['VIP1', '预订 ≥ 1次 且 消费 ≥ ¥500', '2年'],
              ['VIP2', '预订 ≥ 5次 且 消费 ≥ ¥2000', '2年'],
              ['VIP3', '预订 ≥ 10次 且 消费 ≥ ¥5000', '2年']
            ]}
          />
        </div>
      )
    },
    {
      title: '折扣规则说明',
      content: (
        <div className="space-y-4">
          <p>折扣规则控制会员的订房优惠：</p>
          <LogicList items={[
            <><strong>折扣范围：</strong>设置可调整的折扣区间（如 80% ~ 95%）</>,
            <><strong>当前折扣：</strong>门店可在折扣范围内调整具体折扣</>,
            <><strong>应用范围：</strong>折扣适用于平台所有门店</>,
            <><strong>动态调整：</strong>平台可根据运营需要调整折扣范围</>
          ]} />
          <LogicTable
            headers={['等级', '折扣范围', '推荐折扣']}
            rows={[
              ['注册会员', '无折扣', '原价'],
              ['VIP1', '80% ~ 95%', '90% (9折)'],
              ['VIP2', '75% ~ 90%', '85% (8.5折)'],
              ['VIP3', '65% ~ 85%', '80% (8折)']
            ]}
          />
        </div>
      )
    },
    {
      title: '积分汇率说明',
      content: (
        <div className="space-y-4">
          <p>积分汇率决定会员消费后获得的积分数量：</p>
          <LogicList items={[
            <><strong>基础汇率：</strong>注册会员 1元 = 1积分</>,
            <><strong>VIP加成：</strong>高等级会员享受更高的积分倍率</>,
            <><strong>激励消费：</strong>通过积分差异激励会员升级</>,
            <><strong>积分价值：</strong>积分可用于兑换免费住宿、优惠券等</>
          ]} />
          <LogicTable
            headers={['等级', '积分汇率', '消费¥1000可得积分']}
            rows={[
              ['注册会员', '1 : 1', '1000积分'],
              ['VIP1', '1 : 1.2', '1200积分'],
              ['VIP2', '1 : 2', '2000积分'],
              ['VIP3', '1 : 3', '3000积分']
            ]}
          />
          <LogicHighlight type="info">
            <strong>提示：</strong>积分汇率差异要明显，让用户感受到升级的价值。
          </LogicHighlight>
        </div>
      )
    },
    {
      title: '字段说明',
      content: (
        <LogicTable
          headers={['字段', '说明', '示例']}
          rows={[
            ['等级名称', '会员等级的名称', 'VIP1'],
            ['升级条件', '达到该等级需满足的条件', '预订≥1次 且 消费≥¥500'],
            ['等级有效期', '等级的有效期限', '2年'],
            ['折扣范围', '可调整的折扣区间', '80% ~ 95%'],
            ['当前折扣', '具体的折扣百分比', '90% (9折)'],
            ['积分汇率', '消费1元可获得的积分', '1.2 (即1元=1.2积分)'],
            ['升级奖励', '达到等级后赠送的套餐数', '1套免费住宿']
          ]}
        />
      )
    }
  ]

  if (error) {
    return (
      <div className="flex h-screen">
        <Sidebar menuItems={menuConfig} />
        <div className="flex-1 p-6">
          <div className="text-destructive">错误: {error}</div>
        </div>
      </div>
    )
  }

  const mainContent = (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">会员等级设置</h1>
        <p className="text-sm text-slate-500 mt-1">
          配置会员等级、升级规则、折扣权益、积分汇率和升级奖励
        </p>
      </div>

      {/* 顶部操作栏 */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Link to="/member-management/levels/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              新增等级
            </Button>
          </Link>
          <Button
            variant="outline"
            disabled={selectedIds.length === 0}
            onClick={() => {
              if (confirm(`确定要删除选中的 ${selectedIds.length} 个等级吗？`)) {
                alert('删除功能待实现')
              }
            }}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            批量删除
          </Button>
        </div>
        <Badge variant="outline" className="text-sm">
          共 {levels.length} 个等级
        </Badge>
      </div>

      {/* 会员等级列表 */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={selectedIds.length === levels.length && levels.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </TableHead>
                  <TableHead className="min-w-[120px]">等级名称</TableHead>
                  <TableHead className="min-w-[180px]">升级条件</TableHead>
                  <TableHead className="min-w-[100px]">有效期</TableHead>
                  <TableHead className="min-w-[140px]">折扣范围</TableHead>
                  <TableHead className="min-w-[120px]">当前折扣</TableHead>
                  <TableHead className="min-w-[120px]">积分汇率</TableHead>
                  <TableHead className="min-w-[120px]">升级奖励</TableHead>
                  <TableHead className="min-w-[100px]">状态</TableHead>
                  <TableHead className="text-right min-w-[100px]">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {levels.map((level) => (
                  <TableRow key={level.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        checked={selectedIds.includes(level.id)}
                        onChange={(e) => handleSelect(level.id, e.target.checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{level.levelName}</div>
                        {level.isDefault && (
                          <Badge variant="secondary" className="text-xs">默认等级</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {level.requiredNights > 0 ? (
                          <>
                            <div>预订 ≥ {level.requiredNights}次</div>
                            {level.requiredAmount && level.requiredAmount > 0 && (
                              <div className="text-muted-foreground">消费 ≥ ¥{level.requiredAmount}</div>
                            )}
                          </>
                        ) : (
                          <div className="text-muted-foreground">注册即可</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{level.validityPeriod}</TableCell>
                    <TableCell className="text-center">
                      {level.discountRangeMin > 0 ? (
                        <div className="text-sm">
                          {level.discountRangeMin}% ~ {level.discountRangeMax}%
                        </div>
                      ) : (
                        <span className="text-muted-foreground">无折扣</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {level.discountPercentage > 0 ? (
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-medium text-primary">{level.discountPercentage}%</span>
                          <span className="text-xs text-muted-foreground">
                            ({(level.discountPercentage / 10).toFixed(1)}折)
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">无折扣</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {level.pointsEarnRatio > 0 ? (
                        <div className="text-sm">
                          <div className="font-medium">1 : {level.pointsEarnRatio}</div>
                          <div className="text-xs text-muted-foreground">
                            (¥1 = {level.pointsEarnRatio}积分)
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {level.upgradeGiftSets > 0 ? (
                        <div className="text-sm">
                          <span className="font-medium text-secondary">{level.upgradeGiftSets}套</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={level.status === 'active' ? 'default' : 'secondary'}>
                        {level.status === 'active' ? '启用中' : '已停用'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/member-management/levels/${level.id}/edit`}>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                          <Edit className="h-4 w-4 mr-1" />
                          编辑
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {levels.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              暂无会员等级数据
            </div>
          )}
        </CardContent>
      </Card>

      {/* 说明文字 */}
      <Card>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground space-y-2">
            <p className="font-medium text-foreground">配置说明：</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>升级规则：</strong>设置预订次数和消费金额两个条件，需同时满足才能升级</li>
              <li><strong>折扣范围：</strong>平台设定的折扣区间，门店可在此范围内调整具体折扣</li>
              <li><strong>积分汇率：</strong>不同等级会员消费相同金额可获得不同数量的积分</li>
              <li><strong>升级奖励：</strong>达到等级后系统自动赠送的免费住宿套餐数量</li>
              <li><strong>应用范围：</strong>所有配置将适用于平台所有门店的对应等级会员</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menuItems={menuConfig} />
      <div className={`flex-1 overflow-y-auto ${isLearningMode ? '' : ''}`}>
        {mainContent}
      </div>
      {isLearningMode && (
        <div className="w-[480px] border-l border-border overflow-hidden">
          <LogicPanel title="会员等级设置" sections={logicSections} />
        </div>
      )}
    </div>
  )
}
