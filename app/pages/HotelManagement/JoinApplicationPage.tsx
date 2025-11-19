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
                      <TableHead className="w-[120px]">
                        <div>留资时间</div>
                        <div className="text-xs text-muted-foreground font-normal">提交申请时间</div>
                      </TableHead>
                      <TableHead>
                        <div>酒店名称</div>
                        <div className="text-xs text-muted-foreground font-normal">待入驻酒店名</div>
                      </TableHead>
                      <TableHead className="w-[100px]">
                        <div>省市</div>
                        <div className="text-xs text-muted-foreground font-normal">所在地区</div>
                      </TableHead>
                      <TableHead className="w-[110px]">
                        <div>联系方式</div>
                        <div className="text-xs text-muted-foreground font-normal">负责人手机号</div>
                      </TableHead>
                      <TableHead className="w-[90px]">
                        <div>资质材料</div>
                        <div className="text-xs text-muted-foreground font-normal">营业执照等</div>
                      </TableHead>
                      <TableHead className="w-[80px]">
                        <div>跟进状态</div>
                        <div className="text-xs text-muted-foreground font-normal">BD跟进进度</div>
                      </TableHead>
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
        </div>
      </div>
    </MainLayout>
  )
}
