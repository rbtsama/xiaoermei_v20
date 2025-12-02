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
  const search = url.searchParams.get('search') || undefined
  const type = url.searchParams.get('type') || 'all'
  const status = url.searchParams.get('status') || 'all'

  try {
    const coupons = await CouponService.getCoupons({
      search,
      type: type as any,
      status: status as any,
    })

    return json({ coupons, error: null })
  } catch (error) {
    console.error('Failed to load coupons:', error)
    return json({ coupons: [], error: 'Failed to load coupons data' }, { status: 500 })
  }
}

export default function CouponListRoute() {
  const { coupons, error } = useLoaderData<typeof loader>()
  return <CouponListPage coupons={coupons as Coupon[]} error={error} />
}
