/**
 * 场景发放配置 - 路由
 */

import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import SceneDistributionPage from '~/pages/PlatformAdmin/CouponManagement/SceneDistributionPage'
import CouponService from '~/pages/PlatformAdmin/CouponManagement/services/coupon.service'
import type { SceneDistribution, Coupon } from '~/pages/PlatformAdmin/CouponManagement/types/coupon.types'

/**
 * Loader: 加载场景配置列表和启用的优惠券
 */
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const [scenes, enabledCoupons] = await Promise.all([
      CouponService.getSceneDistributions(),
      CouponService.getEnabledCoupons(),
    ])

    return json({ scenes, enabledCoupons, error: null })
  } catch (error) {
    console.error('Failed to load scene distributions:', error)
    return json(
      {
        scenes: [],
        enabledCoupons: [],
        error: error instanceof Error ? error.message : '加载场景配置失败',
      },
      { status: 500 }
    )
  }
}

/**
 * Action: 处理场景配置编辑
 */
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const sceneId = formData.get('sceneId')
  const couponId = formData.get('couponId')
  const smsNotify = formData.get('smsNotify')

  // 验证必填字段
  const errors: Record<string, string> = {}
  if (!sceneId || typeof sceneId !== 'string') {
    errors.sceneId = '场景ID不能为空'
  }
  if (!couponId || typeof couponId !== 'string') {
    errors.couponId = '请选择优惠券'
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 })
  }

  try {
    await CouponService.updateSceneDistribution(sceneId as string, {
      couponId: couponId as string,
      smsNotify: smsNotify === 'true',
    })

    return redirect('/platform-admin/coupon-management/scene-distribution')
  } catch (error) {
    console.error('Failed to update scene distribution:', error)
    return json(
      {
        errors: {
          general: error instanceof Error ? error.message : '保存场景配置失败',
        },
      },
      { status: 500 }
    )
  }
}

export default function SceneDistributionRoute() {
  const data = useLoaderData<typeof loader>()
  return (
    <SceneDistributionPage
      scenes={(data.scenes || []) as SceneDistribution[]}
      enabledCoupons={(data.enabledCoupons || []) as Coupon[]}
      error={data.error}
    />
  )
}
