/**
 * 平台后台 - 优惠券列表路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import CouponListPage from '~/pages/PlatformAdmin/CouponManagement/CouponListPage'
import CouponService from '~/pages/PlatformAdmin/CouponManagement/services/coupon.service'
import type { Coupon } from '~/pages/PlatformAdmin/CouponManagement/types/coupon.types'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const page = Number(url.searchParams.get('page')) || 1
  const pageSize = 10

  try {
    const result = await CouponService.getCoupons({ page, pageSize })
    return json({ ...result, error: null })
  } catch (error) {
    console.error('Failed to load coupons:', error)
    return json({ data: [], total: 0, page: 1, pageSize: 10, totalPages: 0, error: 'Failed to load coupons data' }, { status: 500 })
  }
}

export default function CouponListRoute() {
  const data = useLoaderData<typeof loader>()
  return (
    <CouponListPage
      coupons={data.data as Coupon[]}
      total={data.total}
      page={data.page}
      pageSize={data.pageSize}
      totalPages={data.totalPages}
      error={data.error}
    />
  )
}
