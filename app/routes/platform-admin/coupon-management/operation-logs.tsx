/**
 * 平台后台 - 优惠券操作记录路由
 */

import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import CouponOperationLogsPage from '~/pages/PlatformAdmin/CouponManagement/CouponOperationLogsPage'
import CouponService from '~/pages/PlatformAdmin/CouponManagement/services/coupon.service'
import type { CouponOperationLog } from '~/pages/PlatformAdmin/CouponManagement/types/coupon.types'

export async function loader() {
  try {
    const logs = await CouponService.getOperationLogs()
    return json({ logs, error: null })
  } catch (error) {
    console.error('Failed to load operation logs:', error)
    return json({ logs: [], error: 'Failed to load operation logs' }, { status: 500 })
  }
}

export default function OperationLogsRoute() {
  const { logs, error } = useLoaderData<typeof loader>()
  return <CouponOperationLogsPage logs={logs as CouponOperationLog[]} error={error} />
}
