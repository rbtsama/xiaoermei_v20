/**
 * 合作酒店管理页面
 * 管理已签约上线的酒店
 */

import { useState } from 'react'
import type { PartnerHotel } from './types/hotel.types'
import { HotelStatus } from './types/hotel.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '../PointsSystem/components/MainLayout'
              <OperationLogButton moduleName="合作酒店" />
            </div>

            {/* 筛选栏 */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                {/* 第一行：日期范围 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>开通时间（开始）</Label>
                    <Input
                      type="date"
                      value={dateStart}
                      onChange={(e) => setDateStart(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>开通时间（结束）</Label>
                    <Input
                      type="date"
                      value={dateEnd}
                      onChange={(e) => setDateEnd(e.target.value)}
                    />
                  </div>
                </div>

                {/* 第二行：省市区筛选 */}
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <Label>省份</Label>
                    <select
                      value={filterProvince}
                      onChange={(e) => {
                        setFilterProvince(e.target.value)
                        setFilterCity('')
                      }}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                    >
                      {availableProvinces.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>城市</Label>
                    <select
                      value={filterCity}
                      onChange={(e) => setFilterCity(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                      disabled={filterProvince === '全部'}
                    >
                      <option value="">全部</option>
                      {availableCities.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>配置状态</Label>
                    <select
                      value={filterOnboardingStatus}
                      onChange={(e) => setFilterOnboardingStatus(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                    >
                      <option value="">全部</option>
                      <option value={OnboardingStatus.NOT_STARTED}>未开始</option>
                      <option value={OnboardingStatus.CONFIGURING}>配置中</option>
                      <option value={OnboardingStatus.COMPLETED}>已完成</option>
                    </select>
                  </div>
                  <div>
                    <Label>酒店名称</Label>
                    <Input
                      placeholder="搜索酒店名称..."
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 酒店列表 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>酒店列表</CardTitle>
                    <CardDescription>共 {filteredHotels.length} 家酒店</CardDescription>
                  </div>
                  <Button>+ 新增酒店</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <div>开通时间</div>
                        <div className="text-xs text-muted-foreground font-normal">酒店上线日期</div>
                      </TableHead>
                      <TableHead>
                        <div>酒店名称</div>
                        <div className="text-xs text-muted-foreground font-normal">合作酒店名称</div>
                      </TableHead>
                      <TableHead>
                        <div>省市区</div>
                        <div className="text-xs text-muted-foreground font-normal">酒店所在地</div>
                      </TableHead>
                      <TableHead>
                        <div>管理员账号</div>
                        <div className="text-xs text-muted-foreground font-normal">酒店后台登录账号</div>
                      </TableHead>
                      <TableHead>
                        <div>抽佣比例</div>
                        <div className="text-xs text-muted-foreground font-normal">平台佣金比例</div>
                      </TableHead>
                      <TableHead>
                        <div>盛付通号</div>
                        <div className="text-xs text-muted-foreground font-normal">收款账户</div>
                      </TableHead>
                      <TableHead>
                        <div>状态</div>
                        <div className="text-xs text-muted-foreground font-normal">运营中/已停用</div>
                      </TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHotels.map((hotel) => (
                      <TableRow key={hotel.hotelId}>
                        <TableCell className="text-sm text-slate-600">{hotel.activatedAt}</TableCell>
                        <TableCell className="font-medium">{hotel.hotelName}</TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {hotel.province}/{hotel.city}/{hotel.district}
                        </TableCell>
                        <TableCell className="font-mono text-sm">{hotel.adminAccount}</TableCell>
                        <TableCell className="text-sm">{hotel.commissionRate}%</TableCell>
                        <TableCell className="font-mono text-sm text-blue-600">{hotel.shengfutongId}</TableCell>
                        <TableCell>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={hotel.status === HotelStatus.ONLINE}
                              className="sr-only peer"
                              onChange={() => alert(`切换酒店状态：${hotel.hotelName}`)}
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                          </label>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => openEditDialog(hotel)}>
                              编辑
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600"
                              onClick={() => {
                                if (confirm(`确定删除酒店 ${hotel.hotelName} 吗？`)) {
                                  alert('已删除')
                                }
                              }}
                            >
                              删除
                            </Button>
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

        {/* 编辑酒店弹窗 */}
        {showEditDialog && currentHotel && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle>编辑酒店</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setShowEditDialog(false)}>✕</Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>酒店名称</Label>
                    <Input value={currentHotel.hotelName} disabled className="bg-slate-50" />
                  </div>
                  <div>
                    <Label>管理员账号</Label>
                    <Input defaultValue={currentHotel.adminAccount} />
                  </div>
                  <div>
                    <Label>抽佣比例（%）</Label>
                    <Input type="number" defaultValue={currentHotel.commissionRate} step="0.1" />
                  </div>
                  <div>
                    <Label>盛付通号</Label>
                    <Input defaultValue={currentHotel.shengfutongId} />
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
                          <div className="text-slate-500">黄浦区 | 4.8分</div>
                          <div className="text-red-600 font-bold">¥458起</div>
                        </div>
                        <div className="text-slate-500 text-xs">→ 后台"上线"状态的酒店才会在列表显示</div>
                        <div className="text-slate-500 text-xs">→ 后台"下线"的酒店用户看不到</div>
                      </div>
                    </div>

                    <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                      <p className="font-semibold text-sm mb-2">📱 页面2：酒店详情</p>
                      <div className="text-xs space-y-1 text-slate-700">
                        <div className="font-bold">亚朵酒店·上海新天地店</div>
                        <div>📍 黄浦区马当路388号</div>
                        <div>🏨 中端商务酒店</div>
                        <div className="border-t pt-1 mt-1">
                          <div>大床房 <span className="text-red-600 font-bold">¥458</span>/晚</div>
                          <div className="text-xs text-green-600">会员95折起</div>
                        </div>
                        <div className="text-slate-500 text-xs mt-2">→ 后台的酒店基本信息完整展示</div>
                      </div>
                    </div>

                    <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                      <p className="font-semibold text-sm mb-2">📱 页面3：下单页</p>
                      <div className="text-xs space-y-1 text-slate-700">
                        <div className="font-bold">亚朵酒店·上海新天地店</div>
                        <div>房型：大床房</div>
                        <div>入住：01/18 - 01/19（1晚）</div>
                        <div>房费：¥458</div>
                        <div className="text-green-600">金卡会员95折：-¥23</div>
                        <div className="text-slate-500 text-xs">→ 后台配置的"会员最低折扣"自动计算优惠</div>
                      </div>
                    </div>

                        • 后台"上线"酒店 → 前端列表可见、可预订
                        <br />
                        • 后台"下线"酒店 → 前端隐藏、不可预订
                        <br />
                        • 后台"抽佣比例" → 前端不显示（用户不关心）
                        <br />
                        • 后台"省市区" → 前端支持地域筛选
                      </p>
                )
              }
            ]}
          />
        </div>
      </div>
    </MainLayout>
  )
}
