/**
 * 协议模板管理页面
 * 法务管理协议模板，版本控制
 */

import { useState } from 'react'
import type { ContractTemplate } from './types/contract.types'
import { TemplateStatus } from './types/contract.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '../PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight, LogicCode } from '../PointsSystem/components/LogicPanel'
import OperationLogButton from '../PointsSystem/components/OperationLogButton'
import { templateStatusLabels } from './services/mocks/contract.mock'

interface ContractTemplatePageProps {
  templates: ContractTemplate[]
}

export default function ContractTemplatePage({ templates }: ContractTemplatePageProps) {
  const [filterStatus, setFilterStatus] = useState<TemplateStatus | 'all'>('all')
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [currentTemplate, setCurrentTemplate] = useState<ContractTemplate | null>(null)
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)

  const filteredTemplates = templates.filter(tpl => {
    if (filterStatus !== 'all' && tpl.status !== filterStatus) return false
    return true
  })

  const openEdit = (template: ContractTemplate) => {
    setCurrentTemplate(template)
    setShowEditDialog(true)
  }

  const openPreview = (template: ContractTemplate) => {
    setCurrentTemplate(template)
    setShowPreviewDialog(true)
  }

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">协议模板管理</h1>
                <p className="text-slate-600 mt-2">管理平台协议模板，版本控制</p>
              </div>
              <OperationLogButton moduleName="协议模板管理" />
            </div>

            {/* 筛选栏 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as TemplateStatus | 'all')}
                    className="px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="all">全部状态</option>
                    <option value={TemplateStatus.DRAFT}>草稿</option>
                    <option value={TemplateStatus.ACTIVE}>生效中</option>
                    <option value={TemplateStatus.INACTIVE}>已停用</option>
                  </select>

                  <div className="flex-1"></div>

                  <Button>+ 新建模板</Button>
                </div>
              </CardContent>
            </Card>

            {/* 模板列表 */}
            <Card>
              <CardHeader>
                <CardTitle>模板列表</CardTitle>
                <CardDescription>共 {filteredTemplates.length} 个模板</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>协议类型</TableHead>
                      <TableHead>版本号</TableHead>
                      <TableHead>生效日期</TableHead>
                      <TableHead>使用次数</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>最后修改</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTemplates.map((tpl) => (
                      <TableRow key={tpl.templateId}>
                        <TableCell className="font-medium">{tpl.contractType}</TableCell>
                        <TableCell className="font-mono text-sm">{tpl.version}</TableCell>
                        <TableCell className="text-sm text-slate-600">{tpl.effectiveDate}</TableCell>
                        <TableCell className="text-sm">
                          <span className="text-blue-600">{tpl.usageCount}</span> 次
                        </TableCell>
                        <TableCell>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              tpl.status === TemplateStatus.ACTIVE
                                ? 'bg-green-100 text-green-700'
                                : tpl.status === TemplateStatus.DRAFT
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {templateStatusLabels[tpl.status]}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">
                          <div>{tpl.updatedAt || tpl.createdAt}</div>
                          <div className="text-xs text-slate-400">{tpl.updatedBy || tpl.createdBy}</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => openPreview(tpl)}>
                              预览
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => openEdit(tpl)}>
                              编辑
                            </Button>
                            {tpl.status !== TemplateStatus.ACTIVE && (
                              <Button variant="outline" size="sm" className="text-green-600">
                                启用
                              </Button>
                            )}
                            {tpl.status === TemplateStatus.ACTIVE && (
                              <Button variant="outline" size="sm" className="text-orange-600">
                                停用
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

        {/* 预览弹窗 */}
        {showPreviewDialog && currentTemplate && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{currentTemplate.title}</CardTitle>
                    <CardDescription>{currentTemplate.contractType} {currentTemplate.version}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setShowPreviewDialog(false)}>✕</Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto pt-6">
                <pre className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed">
                  {currentTemplate.content}
                </pre>
              </CardContent>
              <div className="border-t p-4 flex justify-end">
                <Button variant="outline" onClick={() => setShowPreviewDialog(false)}>关闭</Button>
              </div>
            </Card>
          </div>
        )}

        {/* 编辑弹窗 */}
        {showEditDialog && currentTemplate && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <Card className="w-full max-w-5xl max-h-[90vh] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle>编辑协议模板</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setShowEditDialog(false)}>✕</Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>协议类型</Label>
                    <Input defaultValue={currentTemplate.contractType} />
                  </div>
                  <div>
                    <Label>版本号</Label>
                    <Input defaultValue={currentTemplate.version} placeholder="例如：V2.1" />
                  </div>
                  <div className="col-span-2">
                    <Label>协议标题</Label>
                    <Input defaultValue={currentTemplate.title} />
                  </div>
                  <div className="col-span-2">
                    <Label>协议内容</Label>
                    <textarea
                      defaultValue={currentTemplate.content}
                      className="w-full mt-1 px-3 py-2 border rounded-md font-mono text-sm"
                      rows={15}
                    />
                  </div>
                </div>
              </CardContent>
              <div className="border-t p-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>取消</Button>
                <Button onClick={() => { alert('保存成功'); setShowEditDialog(false); }}>保存</Button>
              </div>
            </Card>
          </div>
        )}

        {/* 右侧：业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="协议模板管理"
            sections={[
              {
                title: '业务场景',
                content: (
                  <>
                    <p className="font-semibold mb-2">为什么需要协议模板管理？</p>
                    <LogicList
                      items={[
                        '法律条款会变更（例如：新电商法出台，协议需要更新）',
                        '不同时期签约的商家，用的是不同版本的协议',
                        '需要追溯"某个商家签的是哪个版本的协议"',
                        '协议修改需要版本控制（V1.0 → V2.0 → V2.1）'
                      ]}
                    />
                  </>
                )
              },
              {
                title: '产品逻辑',
                content: (
                  <>
                    <p className="font-semibold mb-2">版本管理逻辑：</p>
                    <LogicCode>
{`版本演进：
V1.0（2024.1.1生效） → 使用28次 → 已停用
V2.0（2024.7.1生效） → 使用15次 → 已停用
V2.1（2025.1.1生效） → 使用3次  → 生效中 ✓

为什么不删除旧版本？
→ 历史签约记录需要查看当时的协议内容
→ 法务审计需要追溯
→ 纠纷处理需要还原当时的约定`}
                    </LogicCode>

                    <p className="font-semibold mt-4 mb-2">协议修改流程：</p>
                    <LogicList
                      items={[
                        '法务创建新版本（V2.1）→ 状态：草稿',
                        '法务审核通过 → 状态：生效中',
                        '旧版本自动停用 → 状态：已停用',
                        '新商家签约使用V2.1，老商家继续使用历史版本'
                      ]}
                    />

                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>重要</strong>：停用旧版本≠删除！
                        <br />
                        已签约的商家继续适用签约时的版本（合同不溯及既往原则）
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
                      ['templateId', '模板唯一标识', 'TPL_001'],
                      ['contractType', '协议类型', '商家服务协议/用户服务协议'],
                      ['version', '版本号', 'V2.1'],
                      ['content', '协议完整文本', '《小而美商家服务协议》...'],
                      ['status', '模板状态', 'active生效中 / inactive已停用'],
                      ['effectiveDate', '生效日期', '01/01/25'],
                      ['usageCount', '使用次数', '3（3个商家签署了这个版本）']
                    ]}
                  />
                )
              },
              {
                title: '行业最佳实践',
                content: (
                  <>
                    <p className="font-semibold mb-2">美团做法：</p>
                    <LogicList
                      items={[
                        '协议变更提前30天公告',
                        '老商家可选择续签新协议或继续执行旧协议',
                        '重大条款变更（如抽佣比例）需商家重新签署'
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">携程做法：</p>
                    <LogicList
                      items={[
                        '协议分类管理（商家协议、分销协议、API对接协议）',
                        '每个版本有"变更说明"（记录改了什么）',
                        '法务审批流程（修改→审核→发布）'
                      ]}
                    />
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
