/**
 * 优惠券记录页面
 */

import { useNavigation } from '@remix-run/react'
import type { CouponRecord } from './types/coupon.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface CouponRecordsPageProps {
  records: CouponRecord[]
  error: string | null
}

/**
 * 获取优惠券类型文本
 */
function getCouponTypeText(type: string): string {
  const map: Record<string, string> = {
    full_reduction: '满减券',
    discount: '折扣券',
    instant_reduction: '立减券',
  }
  return map[type] || type
}

/**
 * 获取优惠券类型颜色样式
 */
function getCouponTypeBadgeClass(type: string): string {
  const classMap: Record<string, string> = {
    full_reduction: 'bg-orange-50 text-orange-700 border-orange-300',
    discount: 'bg-green-50 text-green-700 border-green-300',
    instant_reduction: 'bg-blue-50 text-blue-700 border-blue-300',
  }
  return classMap[type] || 'border-slate-300 text-slate-700'
}

/**
 * 获取发放类型文本
 */
function getDistributionTypeText(type: string): string {
  const map: Record<string, string> = {
    registration: '注册发放',
    checkout: '离店发放',
    manual_vip: '手动(VIP)',
    manual_phone: '手动(手机号)',
  }
  return map[type] || type
}

/**
 * 获取VIP等级文本
 */
function getVipLevelText(vipLevel: string): string {
  const map: Record<string, string> = {
    VIP1: '普通会员',
    VIP2: '黄金会员',
    VIP3: '白金会员',
    VIP4: '钻石会员',
  }
  return map[vipLevel] || vipLevel
}

export default function CouponRecordsPage({ records, error }: CouponRecordsPageProps) {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  if (error) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
            错误: {error}
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="p-6">
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">
            优惠券记录 ({records.length}条)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 bg-slate-50">
                  <TableHead className="text-slate-600 font-semibold">优惠券ID</TableHead>
                  <TableHead className="text-slate-600 font-semibold">优惠券类型</TableHead>
                  <TableHead className="text-slate-600 font-semibold">优惠券名称</TableHead>
                  <TableHead className="text-slate-600 font-semibold">发放类型</TableHead>
                  <TableHead className="text-slate-600 font-semibold">用户手机号</TableHead>
                  <TableHead className="text-slate-600 font-semibold">VIP等级</TableHead>
                  <TableHead className="text-slate-600 font-semibold">操作时间</TableHead>
                  <TableHead className="text-slate-600 font-semibold">操作人</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-slate-500 py-8">
                      暂无记录
                    </TableCell>
                  </TableRow>
                ) : (
                  records.map((record, index) => (
                    <TableRow key={`${record.couponId}-${record.operatedAt}-${index}`} className="hover:bg-slate-50 transition-colors">
                      <TableCell className="text-slate-900 font-medium">{record.couponId}</TableCell>
                      <TableCell>
                        <Badge className={`${getCouponTypeBadgeClass(record.couponType)} border`}>
                          {getCouponTypeText(record.couponType)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-900">{record.couponName}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            record.distributionType === 'registration' || record.distributionType === 'checkout'
                              ? 'border-blue-300 text-blue-700 bg-blue-50'
                              : 'border-purple-300 text-purple-700 bg-purple-50'
                          }
                        >
                          {getDistributionTypeText(record.distributionType)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-700 font-mono text-sm">
                        {record.userPhone}
                      </TableCell>
                      <TableCell className="text-slate-700">
                        {getVipLevelText(record.vipLevel)}
                      </TableCell>
                      <TableCell className="text-slate-600 text-sm">{record.operatedAt}</TableCell>
                      <TableCell className="text-slate-600 text-sm">{record.operatedBy}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {isLoading && (
            <div className="text-center text-slate-500 py-4">
              加载中...
            </div>
          )}
        </CardContent>
      </Card>
      </div>
    </MainLayout>
  )
}
