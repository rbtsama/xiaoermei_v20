/**
 * 优惠券发放页面
 */

import type { IssueRecord } from './types/coupon.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '../PointsSystem/components/MainLayout'
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
