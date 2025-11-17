/**
 * 设计缺陷清单组件
 * 展示所有已发现的设计问题，带编号便于讨论和修复
 */

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { AlertTriangle, XCircle, CheckCircle2 } from 'lucide-react'

export default function DefectsList() {
  const defects = {
    p0: [
      {
        id: '#001',
        title: '订单管理功能重复且数据孤岛',
        description: '平台后台和酒店后台都有订单管理，数据可能不一致，权限不清晰',
        impact: '数据混乱、财务对账失败、用户体验差',
        solution: '统一订单表，通过 hotel_id 区分，删除重复页面或明确职责分工',
        status: 'open'
      },
      {
        id: '#002',
        title: '会员体系定位混乱',
        description: '平台会员 vs 酒店会员？定位不清。用户在A酒店是VIP，到B酒店也是VIP吗？',
        impact: '用户困惑、权益冲突、数据割裂',
        solution: '明确采用"平台统一会员"模式（参考携程），删除酒店后台的会员管理',
        status: 'open'
      },
      {
        id: '#003',
        title: '非房产品缺少价格和库存',
        description: '产品只有名称描述，没有价格字段，无法售卖',
        impact: '业务闭环断裂，产品无法交易',
        solution: '添加 price、pricingType、inventory 等核心字段',
        status: 'fixed'
      },
      {
        id: '#004',
        title: '库存扣减逻辑错误（推测）',
        description: '下单立即扣库存，未支付也占用，导致假性满房',
        impact: '收入损失、用户投诉、高峰期损失大量订单',
        solution: '使用Redis临时占用（软锁定15分钟）或超售策略',
        status: 'open'
      },
      {
        id: '#005',
        title: '会员升级条件不合理',
        description: 'VIP1只需预订1次（门槛太低），只看次数不看金额',
        impact: '会员权益贬值、利润下降、用户粘性未提升',
        solution: '综合消费金额+预订次数+间夜数，门槛调整为3/10/30次，增加保级机制',
        status: 'open'
      },
      {
        id: '#006',
        title: '房间管理与房型管理关系不清',
        description: '有房型（RoomType）和房间（Rooms），但缺少房间分配功能',
        impact: '无法灵活分配房间、客人偏好无法满足、维修房可能被分配',
        solution: '补充"房间分配"功能，前台可选择具体房号',
        status: 'open'
      },
      {
        id: '#007',
        title: '缺少房态管理（Housekeeping）',
        description: '没有房态看板（VC/VD/OC/OD/OOO），库存与实际房态脱节',
        impact: '可售房间可能未打扫，客人到店无房可住',
        solution: '新增房态管理模块，库存与房态联动（只有VC可售）',
        status: 'open'
      }
    ],
    p1: [
      {
        id: '#008',
        title: '非房产品定价模型过于简单',
        description: '只有固定价格，缺少会员价、套餐价、时段价、动态定价',
        impact: '无法支持复杂的营销策略',
        solution: '参考电商SKU模型，支持多价格档位',
        status: 'open'
      },
      {
        id: '#009',
        title: '三个日历页面割裂',
        description: '房价/库存/订单日历是独立页面，需频繁切换',
        impact: '操作效率低，用时增加30%',
        solution: '合并为一个"房务日历"页面，Tab切换三个视图',
        status: 'open'
      },
      {
        id: '#010',
        title: '订单状态流转不完整',
        description: '只有5种状态，缺少待确认、待分配、预到店、预离店等关键状态',
        impact: '无法支撑真实业务流程，前台操作不便',
        solution: '补充完整的14种订单状态',
        status: 'open'
      },
      {
        id: '#011',
        title: '缺少财务闭环',
        description: '没有财务报表、对账单、结算管理',
        impact: '酒店老板不知道赚了多少钱，无法对账',
        solution: '新增财务模块：日报/月报/对账单/数据分析',
        status: 'open'
      },
      {
        id: '#012',
        title: 'PMS对接功能不完整',
        description: '缺少同步状态监控、同步日志、手动同步、数据对账',
        impact: '同步失败无感知，可能导致超售',
        solution: '添加同步监控、日志、手动同步、定时对账功能',
        status: 'open'
      },
      {
        id: '#013',
        title: '退款流程不完整',
        description: '缺少商家处理表单、证据上传、平台仲裁流程',
        impact: '退款处理是黑盒，无法真正操作',
        solution: '补充完整的退款处理流程（同意/拒绝/仲裁/追踪）',
        status: 'open'
      },
      {
        id: '#014',
        title: '缺少数据大屏（Dashboard）',
        description: '42个页面但没有首页概览，数据分散',
        impact: '用户不知道从哪开始，重要信息被埋没',
        solution: '新增Dashboard：数据概览+快捷操作+趋势图',
        status: 'open'
      },
      {
        id: '#015',
        title: '缺少客史档案（Guest Profile）',
        description: '无法记录客人历史、偏好、备注',
        impact: 'VIP客人无法享受个性化服务',
        solution: '新增客史档案模块，记录偏好和历史',
        status: 'open'
      },
      {
        id: '#016',
        title: '缺少夜审（Night Audit）功能',
        description: '没有日结算、数据对账、房态切换功能',
        impact: '数据不准确，缺少"日"的概念',
        solution: '新增夜审模块，每日凌晨自动执行',
        status: 'open'
      }
    ],
    p2: [
      {
        id: '#017',
        title: '缺少消息通知和待办事项',
        description: '用户要主动查看退款/差评，容易遗漏',
        impact: '响应不及时',
        solution: '新增消息中心和待办列表',
        status: 'open'
      },
      {
        id: '#018',
        title: '缺少数据导出功能',
        description: '所有列表页无法导出Excel',
        impact: '财务对账不便',
        solution: '添加导出按钮',
        status: 'open'
      },
      {
        id: '#019',
        title: '缺少批量操作',
        description: '无法批量修改房价、调整库存',
        impact: '操作繁琐',
        solution: '添加批量操作功能',
        status: 'open'
      },
      {
        id: '#020',
        title: '用户评价系统不完整',
        description: '缺少评价统计、差评预警、趋势分析',
        impact: '数据价值未发挥',
        solution: '补充评价分析功能',
        status: 'open'
      }
    ]
  }

  const totalDefects = defects.p0.length + defects.p1.length + defects.p2.length
  const fixedDefects = [...defects.p0, ...defects.p1, ...defects.p2].filter(d => d.status === 'fixed').length

  return (
    <div className="space-y-8">
      {/* 统计概览 */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border-2 border-red-300">
          <div className="text-3xl font-bold text-red-600">{defects.p0.length}</div>
          <div className="text-sm text-red-600">P0 致命缺陷</div>
        </div>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border-2 border-yellow-300">
          <div className="text-3xl font-bold text-yellow-600">{defects.p1.length}</div>
          <div className="text-sm text-yellow-600">P1 严重问题</div>
        </div>
        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border-2 border-blue-300">
          <div className="text-3xl font-bold text-blue-600">{defects.p2.length}</div>
          <div className="text-sm text-blue-600">P2 次要问题</div>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border-2 border-green-300">
          <div className="text-3xl font-bold text-green-600">{fixedDefects}/{totalDefects}</div>
          <div className="text-sm text-green-600">已修复</div>
        </div>
      </div>

      {/* P0 致命缺陷 */}
      <Card className="border-4 border-red-500">
        <CardHeader className="bg-red-500 text-white">
          <CardTitle className="text-2xl flex items-center gap-3">
            <XCircle className="w-7 h-7" />
            P0级 - 致命缺陷（{defects.p0.length}个）
          </CardTitle>
          <p className="text-white/80 text-sm">严重影响业务闭环，必须修复</p>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {defects.p0.map((defect) => (
            <div key={defect.id} className="p-5 bg-red-50 dark:bg-red-950 rounded-lg border-l-4 border-red-500">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Badge className="bg-red-600 text-white font-mono text-sm px-3 py-1">
                    {defect.id}
                  </Badge>
                  <h4 className="text-lg font-bold">{defect.title}</h4>
                </div>
                {defect.status === 'fixed' ? (
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    已修复
                  </Badge>
                ) : (
                  <Badge variant="destructive">待修复</Badge>
                )}
              </div>

              <div className="space-y-3 text-sm">
                <div className="p-3 bg-white dark:bg-slate-900 rounded">
                  <p className="font-semibold mb-1 text-muted-foreground">问题描述：</p>
                  <p>{defect.description}</p>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded">
                  <p className="font-semibold mb-1 text-red-600">影响：</p>
                  <p>{defect.impact}</p>
                </div>

                <div className="p-3 bg-green-50 dark:bg-green-950 rounded border border-green-300">
                  <p className="font-semibold mb-1 text-green-700">建议方案：</p>
                  <p>{defect.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* P1 严重问题 */}
      <Card className="border-4 border-yellow-500">
        <CardHeader className="bg-yellow-500 text-white">
          <CardTitle className="text-2xl flex items-center gap-3">
            <AlertTriangle className="w-7 h-7" />
            P1级 - 严重问题（{defects.p1.length}个）
          </CardTitle>
          <p className="text-white/80 text-sm">影响体验和效率，建议尽快修复</p>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {defects.p1.map((defect) => (
            <div key={defect.id} className="p-5 bg-yellow-50 dark:bg-yellow-950 rounded-lg border-l-4 border-yellow-500">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Badge className="bg-yellow-600 text-white font-mono text-sm px-3 py-1">
                    {defect.id}
                  </Badge>
                  <h4 className="text-lg font-bold">{defect.title}</h4>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="p-3 bg-white dark:bg-slate-900 rounded">
                  <p className="font-semibold mb-1 text-muted-foreground text-xs">问题：</p>
                  <p className="text-xs">{defect.description}</p>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded">
                  <p className="font-semibold mb-1 text-yellow-600 text-xs">影响：</p>
                  <p className="text-xs">{defect.impact}</p>
                </div>

                <div className="p-3 bg-green-50 dark:bg-green-950 rounded border border-green-300">
                  <p className="font-semibold mb-1 text-green-700 text-xs">方案：</p>
                  <p className="text-xs">{defect.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* P2 次要问题 */}
      <Card className="border-2 border-blue-300">
        <CardHeader className="bg-blue-100 dark:bg-blue-900">
          <CardTitle className="text-xl flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-blue-600" />
            P2级 - 次要问题（{defects.p2.length}个）
          </CardTitle>
          <p className="text-blue-700 dark:text-blue-300 text-sm">锦上添花，长期优化</p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {defects.p2.map((defect) => (
              <div key={defect.id} className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-600 text-white font-mono text-xs">
                    {defect.id}
                  </Badge>
                  <h4 className="font-bold text-sm">{defect.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{defect.description}</p>
                <p className="text-xs text-green-700 dark:text-green-400">→ {defect.solution}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 修复指引 */}
      <Card className="border-2 border-purple-500">
        <CardHeader className="bg-purple-500 text-white">
          <CardTitle className="text-xl">📋 如何使用此清单</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
            <p className="font-semibold mb-3">请告诉我要修复哪些问题：</p>
            <div className="space-y-2 text-sm">
              <p>示例1："请修复 #001 和 #002"</p>
              <p>示例2："请优化所有P0问题"</p>
              <p>示例3："暂时不修复 #009，我觉得三个日历分开挺好的"</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-2">建议优先级：</p>
              <ol className="space-y-1 ml-4 text-xs">
                <li>1. #001 订单重复</li>
                <li>2. #002 会员混乱</li>
                <li>3. #004 库存逻辑</li>
                <li>4. #005 升级条件</li>
              </ol>
            </div>

            <div>
              <p className="font-semibold mb-2">可选修复：</p>
              <ol className="space-y-1 ml-4 text-xs">
                <li>1. #009 三日历合并</li>
                <li>2. #014 Dashboard</li>
                <li>3. #011 财务模块</li>
              </ol>
            </div>

            <div>
              <p className="font-semibold mb-2">可暂缓：</p>
              <ol className="space-y-1 ml-4 text-xs">
                <li>1. #007 房态管理（复杂）</li>
                <li>2. #015 客史档案（复杂）</li>
                <li>3. #016 夜审（复杂）</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
