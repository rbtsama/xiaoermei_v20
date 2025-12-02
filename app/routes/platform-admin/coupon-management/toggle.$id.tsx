/**
 * 平台后台 - 启用/停用优惠券路由
 */

import { redirect, type ActionFunctionArgs } from '@remix-run/node'
import CouponService from '~/pages/PlatformAdmin/CouponManagement/services/coupon.service'

export async function action({ params }: ActionFunctionArgs) {
  const { id } = params

  if (!id) {
    throw new Response('Coupon ID is required', { status: 400 })
  }

  try {
    await CouponService.toggleCouponStatus(id)
    return redirect('/platform-admin/coupon-management/list')
  } catch (error) {
    console.error('Failed to toggle coupon status:', error)
    throw new Response('Failed to toggle coupon status', { status: 500 })
  }
}
