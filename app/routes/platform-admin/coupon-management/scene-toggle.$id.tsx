/**
 * 场景发放配置 - 启用/停用 Action 路由
 */

import { redirect, type ActionFunctionArgs } from '@remix-run/node'
import CouponService from '~/pages/PlatformAdmin/CouponManagement/services/coupon.service'

/**
 * Action: 切换场景启用/停用状态
 */
export async function action({ params }: ActionFunctionArgs) {
  const { id } = params

  if (!id) {
    throw new Response('场景ID不能为空', { status: 400 })
  }

  try {
    await CouponService.toggleSceneDistributionStatus(id)
    return redirect('/platform-admin/coupon-management/scene-distribution')
  } catch (error) {
    console.error('Failed to toggle scene status:', error)
    throw new Response(error instanceof Error ? error.message : '操作失败', {
      status: 500,
    })
  }
}
