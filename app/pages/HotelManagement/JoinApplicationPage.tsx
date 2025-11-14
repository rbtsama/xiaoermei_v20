/**
 * 加盟申请管理页面
 * BD跟进酒店入驻申请
 */

import { useState } from 'react'
import type { JoinApplication } from './types/hotel.types'
import { FollowUpStatus } from './types/hotel.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '../PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight, LogicCode } from '../PointsSystem/components/LogicPanel'
import OperationLogButton from '../PointsSystem/components/OperationLogButton'
import { followUpStatusLabels } from './services/mocks/hotel.mock'

interface JoinApplicationPageProps {
  applications: JoinApplication[]
}

export default function JoinApplicationPage({ applications }: JoinApplicationPageProps) {
  const [filterStatus, setFilterStatus] = useState<FollowUpStatus | 'all'>('all')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [currentApp, setCurrentApp] = useState<JoinApplication | null>(null)
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [currentImages, setCurrentImages] = useState<string[]>([])
  const [editingStatus, setEditingStatus] = useState<FollowUpStatus>(FollowUpStatus.TO_CONTACT)
  const [editingNotes, setEditingNotes] = useState('')
  const [showContractDialog, setShowContractDialog] = useState(false)

  const filteredApplications = applications.filter(app => {
    if (filterStatus !== 'all' && app.followUpStatus !== filterStatus) return false
    if (searchKeyword && !app.hotelName.includes(searchKeyword)) return false
    return true
  })

  const openDetail = (app: JoinApplication) => {
    setCurrentApp(app)
    setEditingStatus(app.followUpStatus)
    setEditingNotes(app.followUpNotes)
    setShowDetailDialog(true)
  }

  const openImages = (images: string[]) => {
    setCurrentImages(images)
    setShowImageDialog(true)
  }

  const handleSave = () => {
    alert(`已保存：${currentApp?.hotelName}\n跟进状态：${followUpStatusLabels[editingStatus]}\n跟进记录：${editingNotes}`)
    setShowDetailDialog(false)
  }

  const getStatusColor = (status: FollowUpStatus) => {
    const colors: Record<FollowUpStatus, string> = {
      [FollowUpStatus.TO_CONTACT]: 'bg-slate-100 text-slate-700',
      [FollowUpStatus.IN_NEGOTIATION]: 'bg-blue-100 text-blue-700',
      [FollowUpStatus.TO_SIGN]: 'bg-yellow-100 text-yellow-700',
      [FollowUpStatus.SIGNED]: 'bg-green-100 text-green-700',
      [FollowUpStatus.REJECTED]: 'bg-red-100 text-red-700'
    }
    return colors[status]
  }

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">加盟申请</h1>
                <p className="text-slate-600 mt-2">BD拓展的酒店入驻申请，跟进签约状态</p>
              </div>
              <OperationLogButton moduleName="加盟申请" />
            </div>

            {/* 筛选栏 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as FollowUpStatus | 'all')}
                    className="px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="all">全部状态</option>
                    <option value={FollowUpStatus.TO_CONTACT}>待联系</option>
                    <option value={FollowUpStatus.IN_NEGOTIATION}>洽谈中</option>
                    <option value={FollowUpStatus.TO_SIGN}>待签约</option>
                    <option value={FollowUpStatus.SIGNED}>已签约</option>
                    <option value={FollowUpStatus.REJECTED}>已拒绝</option>
                  </select>

                  <Input
                    placeholder="搜索酒店名称..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* 申请列表 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>申请列表</CardTitle>
                    <CardDescription>共 {filteredApplications.length} 个申请</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px]">留资时间</TableHead>
                      <TableHead>酒店名称</TableHead>
                      <TableHead className="w-[100px]">省市</TableHead>
                      <TableHead className="w-[110px]">联系方式</TableHead>
                      <TableHead className="w-[90px]">资质材料</TableHead>
                      <TableHead className="w-[80px]">跟进状态</TableHead>
                      <TableHead className="text-right w-[160px]">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((app) => (
                      <TableRow key={app.applicationId}>
                        <TableCell className="text-sm text-slate-600">{app.submittedAt}</TableCell>
                        <TableCell className="font-medium">{app.hotelName}</TableCell>
                        <TableCell className="text-sm text-slate-600">
                          <div>{app.province}</div>
                          <div className="text-xs text-slate-500">{app.city}</div>
                        </TableCell>
                        <TableCell className="text-sm">
                          <div className="truncate">{app.phone}</div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-0.5 text-xs">
                            <div className="flex items-center gap-1">
                              <span>{app.qualifications.businessLicense ? '✓' : '✗'}</span>
                              <span className={app.qualifications.businessLicense ? 'text-green-600' : 'text-slate-400'}>
                                营业执照
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>{app.qualifications.foodLicense ? '✓' : '✗'}</span>
                              <span className={app.qualifications.foodLicense ? 'text-green-600' : 'text-slate-400'}>
                                餐饮许可
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>{app.qualifications.hygieneLicense ? '✓' : '✗'}</span>
                              <span className={app.qualifications.hygieneLicense ? 'text-green-600' : 'text-slate-400'}>
                                卫生许可
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded ${getStatusColor(app.followUpStatus)}`}>
                            {followUpStatusLabels[app.followUpStatus]}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => openDetail(app)}>
                              查看详情
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => openImages(app.hotelImages)}>
                              查看图片
                            </Button>
                            {app.contractInfo && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-green-50 text-green-700 border-green-300"
                                onClick={() => {
                                  setCurrentApp(app)
                                  setShowContractDialog(true)
                                }}
                              >
                                查看签约
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 详情弹窗 */}
        {showDetailDialog && currentApp && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle>{currentApp.hotelName}</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setShowDetailDialog(false)}>✕</Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label>留资时间</Label>
                    <p className="text-slate-700">{currentApp.submittedAt}</p>
                  </div>
                  <div>
                    <Label>联系电话</Label>
                    <p className="text-slate-700">{currentApp.phone}</p>
                  </div>
                  <div>
                    <Label>邮箱</Label>
                    <p className="text-slate-700">{currentApp.email}</p>
                  </div>
                  <div className="col-span-2">
                    <Label>酒店地址</Label>
                    <p className="text-slate-700">{currentApp.address}</p>
                  </div>
                  <div className="col-span-2">
                    <Label>酒店状况</Label>
                    <p className="text-slate-700">{currentApp.hotelDescription}</p>
                  </div>
                </div>

                <div>
                  <Label>跟进状态</Label>
                  <select
                    value={editingStatus}
                    onChange={(e) => setEditingStatus(e.target.value as FollowUpStatus)}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  >
                    <option value={FollowUpStatus.TO_CONTACT}>待联系</option>
                    <option value={FollowUpStatus.IN_NEGOTIATION}>洽谈中</option>
                    <option value={FollowUpStatus.TO_SIGN}>待签约</option>
                    <option value={FollowUpStatus.SIGNED}>已签约</option>
                    <option value={FollowUpStatus.REJECTED}>已拒绝</option>
                  </select>
                </div>

                <div>
                  <Label>跟进记录</Label>
                  <textarea
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    rows={3}
                    placeholder="记录跟进情况..."
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowDetailDialog(false)}>取消</Button>
                  <Button onClick={handleSave}>保存</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 图片查看弹窗 */}
        {showImageDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">酒店图片</h3>
                <Button variant="outline" size="sm" onClick={() => setShowImageDialog(false)}>✕</Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {currentImages.map((img, index) => (
                  <div key={index} className="bg-slate-100 rounded-lg h-48 flex items-center justify-center">
                    <p className="text-slate-400 text-sm">{img}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 签约信息查看弹窗 */}
        {showContractDialog && currentApp && currentApp.contractInfo && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>签约信息 - {currentApp.hotelName}</CardTitle>
                    <CardDescription className="mt-1">
                      {currentApp.contractInfo.contractType} {currentApp.contractInfo.version}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setShowContractDialog(false)}>✕</Button>
                </div>
              </CardHeader>

              <CardContent className="pt-6 space-y-4">
                {/* 签约基本信息 */}
                <div className="grid grid-cols-4 gap-4 bg-slate-50 p-4 rounded-lg">
                  <div>
                    <Label className="text-xs text-slate-500">协议类型</Label>
                    <p className="font-medium">{currentApp.contractInfo.contractType}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">版本号</Label>
                    <p className="font-medium">{currentApp.contractInfo.version}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">签约人</Label>
                    <p className="font-medium">{currentApp.contractInfo.signerName}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">签约账号</Label>
                    <p className="font-mono text-sm">{currentApp.contractInfo.signerPhone}</p>
                  </div>
                  <div className="col-span-4">
                    <Label className="text-xs text-slate-500">签约时间</Label>
                    <p className="font-medium">{currentApp.contractInfo.signedAt}</p>
                  </div>
                </div>

                {/* 协议内容 */}
                <div>
                  <Label className="font-semibold">协议内容</Label>
                  <div className="mt-2 bg-white border rounded-lg p-6 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed">
                      {currentApp.contractInfo.contractContent}
                    </pre>
                  </div>
                </div>
              </CardContent>

              <div className="border-t p-4 flex justify-end">
                <Button variant="outline" onClick={() => setShowContractDialog(false)}>关闭</Button>
              </div>
            </Card>
          </div>
        )}

        {/* 右侧：业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="加盟申请"
            sections={[
              {
                title: '业务场景',
                content: (
                  <>
                    <p className="font-semibold mb-2">在酒店撮合平台的使用：</p>
                    <LogicList
                      items={[
                        'BD在外拓展新酒店后，酒店填写入驻申请表',
                        '平台审核资质材料（营业执照、餐饮许可证、卫生许可证）',
                        'BD跟进洽谈（协商抽佣比例、平台服务内容）',
                        '签约后，酒店进入"合作酒店"列表，开通账号'
                      ]}
                    />
                  </>
                )
              },
              {
                title: '解决的问题',
                content: (
                  <>
                    <p className="font-semibold mb-2">商家入驻管理：</p>
                    <LogicList
                      items={[
                        'BD团队需要清楚知道每个申请的跟进状态',
                        '避免遗漏高质量酒店（长时间无人跟进）',
                        '资质审核标准化（必须3证齐全）'
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">流程透明化：</p>
                    <LogicList
                      items={[
                        '每次跟进都有记录，方便交接',
                        '查看酒店图片，评估质量',
                        '签约后自动转入合作酒店'
                      ]}
                    />
                  </>
                )
              },
              {
                title: '产品逻辑',
                content: (
                  <>
                    <p className="font-semibold mb-2">跟进状态流转：</p>
                    <LogicCode>
{`待联系 → 洽谈中 → 待签约 → 已签约 → 转入合作酒店
   ↓
 已拒绝（终止流程）

状态说明：
• 待联系：BD刚拿到线索，还未联系
• 洽谈中：已接洽，协商合作细节
• 待签约：谈妥了，等法务签合同
• 已签约：合同签了，等财务开通
• 已拒绝：酒店不符合要求或对方拒绝`}
                    </LogicCode>

                    <p className="font-semibold mt-4 mb-2">资质材料检查：</p>
                    <LogicTable
                      headers={['证照', '必须性', '用途']}
                      rows={[
                        ['营业执照', '必须', '证明合法经营主体'],
                        ['餐饮经营许可证', '可选', '如提供早餐/餐饮需要'],
                        ['公共场所卫生许可证', '必须', '酒店必备资质']
                      ]}
                    />
                  </>
                )
              },
              {
                title: '字段说明',
                content: (
                  <LogicTable
                    headers={['字段', '含义', '示例']}
                    rows={[
                      ['submittedAt', '留资时间', '01/15/25 14:30:00'],
                      ['hotelName', '酒店名称', '云栖山居·莫干山店'],
                      ['phone', '联系电话', '13912345678'],
                      ['email', '邮箱', 'yunqi@hotel.com'],
                      ['qualifications', '资质材料', '{businessLicense:true, ...}'],
                      ['followUpStatus', '跟进状态', 'in_negotiation 洽谈中'],
                      ['followUpNotes', '跟进记录（BD备注）', '老板很有意向，要求抽佣降到4%']
                    ]}
                  />
                )
              }
            ]}
          />
        </div>
      </div>
    </MainLayout>
  )
}
