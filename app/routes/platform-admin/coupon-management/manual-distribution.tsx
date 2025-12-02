/**
 * 优惠券手动发放路由
 */

import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import ManualDistributionPage from '~/pages/PlatformAdmin/CouponManagement/ManualDistributionPage'
import CouponService from '~/pages/PlatformAdmin/CouponManagement/services/coupon.service'

/**
 * Loader: 加载启用的优惠券列表和VIP等级列表
 */
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const [enabledCoupons, vipLevels] = await Promise.all([
      CouponService.getEnabledCoupons(),
      CouponService.getVipLevels(),
    ])

    return json({
      enabledCoupons,
      vipLevels,
      error: null,
    })
  } catch (error) {
    console.error('Failed to load data:', error)
    return json(
      {
        enabledCoupons: [],
        vipLevels: [],
        error: '加载数据失败',
      },
      { status: 500 }
    )
  }
}

/**
 * Action: 处理优惠券发放
 */
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const action = formData.get('action')

  if (action === 'distribute') {
    const distributionMode = formData.get('distributionMode') as 'by_phone' | 'by_vip_level'
    const couponId = formData.get('couponId') as string
    const smsNotify = formData.get('smsNotify') === 'true'

    // 验证必填字段
    if (!distributionMode || !couponId) {
      return json(
        {
          success: false,
          error: '缺少必填参数',
        },
        { status: 400 }
      )
    }

    try {
      if (distributionMode === 'by_phone') {
        // 按手机号发放
        const phonesStr = formData.get('phones') as string
        if (!phonesStr) {
          return json(
            {
              success: false,
              error: '请提供手机号',
            },
            { status: 400 }
          )
        }

        const phones = phonesStr.split(',').filter(Boolean)
        if (phones.length === 0) {
          return json(
            {
              success: false,
              error: '手机号列表为空',
            },
            { status: 400 }
          )
        }

        await CouponService.distributeByPhones({
          phones,
          couponId,
          smsNotify,
        })

        return redirect('/platform-admin/coupon-management/manual-distribution?success=true&mode=phone&count=' + phones.length)
      } else {
        // 按VIP等级发放
        const vipLevelIdsStr = formData.get('vipLevelIds') as string
        if (!vipLevelIdsStr) {
          return json(
            {
              success: false,
              error: '请选择VIP等级',
            },
            { status: 400 }
          )
        }

        const vipLevelIds = vipLevelIdsStr.split(',').filter(Boolean)
        if (vipLevelIds.length === 0) {
          return json(
            {
              success: false,
              error: 'VIP等级列表为空',
            },
            { status: 400 }
          )
        }

        await CouponService.distributeByVipLevels({
          vipLevelIds,
          couponId,
          smsNotify,
        })

        return redirect('/platform-admin/coupon-management/manual-distribution?success=true&mode=vip&count=' + vipLevelIds.length)
      }
    } catch (error) {
      console.error('Failed to distribute coupons:', error)
      return json(
        {
          success: false,
          error: error instanceof Error ? error.message : '发放失败',
        },
        { status: 500 }
      )
    }
  }

  return json(
    {
      success: false,
      error: '未知操作',
    },
    { status: 400 }
  )
}

/**
 * 路由组件
 */
export default function ManualDistributionRoute() {
  const data = useLoaderData<typeof loader>()

  if (data.error) {
    return (
      <div className="p-6">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          错误: {data.error}
        </div>
      </div>
    )
  }

  return <ManualDistributionPage enabledCoupons={data.enabledCoupons as any} vipLevels={data.vipLevels as any} error={data.error} />
}
