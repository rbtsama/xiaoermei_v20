/**
 * 平台后台 - 删除优惠券路由
 */

import { redirect, json, type ActionFunctionArgs } from '@remix-run/node'
import CouponService from '~/pages/PlatformAdmin/CouponManagement/services/coupon.service'

export async function action({ params }: ActionFunctionArgs) {
  const { id } = params

  if (!id) {
    throw new Response('Coupon ID is required', { status: 400 })
  }

  try {
    await CouponService.deleteCoupon(id)
    return redirect('/platform-admin/coupon-management/list')
  } catch (error: any) {
    console.error('Failed to delete coupon:', error)
    // 如果是业务错误（已有发放记录），返回错误信息
    if (error.message === '该券已有发放记录，无法删除') {
      return json({ error: error.message }, { status: 400 })
    }
    throw new Response('Failed to delete coupon', { status: 500 })
  }
}
