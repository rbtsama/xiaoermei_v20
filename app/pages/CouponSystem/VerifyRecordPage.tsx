/**
 * 优惠券核销记录页面
 */

import { useState } from 'react'
import type { UserCoupon } from './types/coupon.types'
import { VerifyStatus } from './types/coupon.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '../PointsSystem/components/MainLayout'
              <OperationLogButton moduleName="核销记录" />
            </div>

            <Card>
              <CardHeader>
                <div className="flex gap-2">
                  <Button
                    variant={filterStatus === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus('all')}
                  >
                    全部
                  </Button>
                  <Button
                    variant={filterStatus === VerifyStatus.UNUSED ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus(VerifyStatus.UNUSED)}
                  >
                    未使用
                  </Button>
                  <Button
                    variant={filterStatus === VerifyStatus.USED ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus(VerifyStatus.USED)}
                  >
                    已使用
                  </Button>
                  <Button
                    variant={filterStatus === VerifyStatus.EXPIRED ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus(VerifyStatus.EXPIRED)}
                  >
                    已过期
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>用户</TableHead>
                      <TableHead>优惠券名称</TableHead>
                      <TableHead>优惠内容</TableHead>
                      <TableHead>领取时间</TableHead>
                      <TableHead>过期时间</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>使用订单</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCoupons.map((coupon) => (
                      <TableRow key={coupon.userCouponId}>
                        <TableCell className="text-sm">{coupon.userName}</TableCell>
                        <TableCell className="font-medium">{coupon.couponName}</TableCell>
                        <TableCell className="text-sm text-red-600">{coupon.discountAmount}</TableCell>
                        <TableCell className="text-sm text-slate-600">{coupon.receivedAt}</TableCell>
                        <TableCell className="text-sm text-slate-600">{coupon.expireAt}</TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded ${
                            coupon.status === VerifyStatus.USED ? 'bg-green-100 text-green-700' :
                            coupon.status === VerifyStatus.EXPIRED ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {verifyStatusLabels[coupon.status]}
                          </span>
                        </TableCell>
                        <TableCell className="font-mono text-sm text-blue-600">{coupon.orderId || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="w-[40%] h-full border-l">
                      <div className="opacity-50">已使用于订单：ORD_20250116001</div>
                      <div className="text-slate-500">→ 后台核销记录同步到用户端</div>
                    </div>
                  </div>
                )
              }
            ]}
          />
        </div>
      </div>
    </MainLayout>
  )
}
