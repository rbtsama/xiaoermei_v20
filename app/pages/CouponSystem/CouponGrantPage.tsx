/**
 * 优惠券发放页面
 */

import type { IssueRecord } from './types/coupon.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '../PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicList } from '../PointsSystem/components/LogicPanel'
import OperationLogButton from '../PointsSystem/components/OperationLogButton'
import { issueChannelLabels } from './services/mocks/coupon.mock'

interface CouponGrantPageProps {
  records: IssueRecord[]
}

export default function CouponGrantPage({ records }: CouponGrantPageProps) {
  return (
    <MainLayout>
      <div className="flex h-full">
        <div className="w-[60%] h-full overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">优惠券发放</h1>
                <p className="text-slate-600 mt-2">手动/自动发放优惠券</p>
              </div>
              <OperationLogButton moduleName="优惠券发放" />
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>发放记录</CardTitle>
                  <Button>+ 手动发放</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>发放时间</TableHead>
                      <TableHead>优惠券名称</TableHead>
                      <TableHead>发放渠道</TableHead>
                      <TableHead>发放数量</TableHead>
                      <TableHead>操作人</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.map((record) => (
                      <TableRow key={record.recordId}>
                        <TableCell className="text-sm text-slate-600">{record.issuedAt}</TableCell>
                        <TableCell className="font-medium">{record.couponName}</TableCell>
                        <TableCell>
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                            {issueChannelLabels[record.channel]}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm">{record.count}张</TableCell>
                        <TableCell className="text-sm text-slate-600">{record.operatorName}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="优惠券发放"
            sections={[
              {
                title: '业务场景',
                content: (
                  <>
                    <LogicTable
                      headers={['发放渠道', '触发时机', '用途']}
                      rows={[
                        ['新人注册', '用户首次注册自动发放', '拉新转化'],
                        ['会员升级', '用户升级到金卡时自动发放', '激励升级'],
                        ['活动发放', '运营手动批量发放', '促销活动'],
                        ['手动发放', '客服补偿单个用户', '用户补偿']
                      ]}
                    />
                  </>
                )
              },
              {
                title: '📱 用户端（C端）呈现',
                content: (
                  <>
                    <div className="bg-slate-50 border rounded-lg p-4">
                      <p className="font-semibold text-sm mb-2">📱 优惠券到账通知</p>
                      <div className="text-xs text-slate-700">
                        <div>🎁 恭喜您获得优惠券！</div>
                        <div>满200减30券 × 1张</div>
                        <div>有效期至：2025.02.14</div>
                        <button className="bg-red-500 text-white px-3 py-1 rounded mt-2 text-xs">立即使用</button>
                      </div>
                    </div>
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
