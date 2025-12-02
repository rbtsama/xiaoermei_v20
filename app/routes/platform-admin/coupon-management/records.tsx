/**
 * 优惠券记录路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import CouponRecordsPage from '~/pages/PlatformAdmin/CouponManagement/CouponRecordsPage'
import CouponService from '~/pages/PlatformAdmin/CouponManagement/services/coupon.service'
import type { CouponRecord } from '~/pages/PlatformAdmin/CouponManagement/types/coupon.types'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // 获取所有记录列表（不需要筛选参数）
    const records = await CouponService.getCouponRecords()

    return json({ records, error: null })
  } catch (error) {
    console.error('Failed to load coupon records:', error)
    return json(
      {
        records: [],
        error: '加载优惠券记录失败',
      },
      { status: 500 }
    )
  }
}

export default function CouponRecordsRoute() {
  const data = useLoaderData<typeof loader>()
  return (
    <CouponRecordsPage
      records={data.records as CouponRecord[]}
      error={data.error}
    />
  )
}
