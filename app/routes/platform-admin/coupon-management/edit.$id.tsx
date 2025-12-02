import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node"
import { useLoaderData, useActionData } from "@remix-run/react"
import CouponFormPage from "~/pages/PlatformAdmin/CouponManagement/CouponFormPage"
import CouponService from "~/pages/PlatformAdmin/CouponManagement/services/coupon.service"
import type { Coupon, CouponType } from "~/pages/PlatformAdmin/CouponManagement/types/coupon.types"

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params

  if (!id) {
    throw new Response("Not Found", { status: 404 })
  }

  try {
    const coupon = await CouponService.getCouponById(id)

    if (!coupon) {
      throw new Response("Not Found", { status: 404 })
    }

    // 不再检查启用状态，允许所有状态的优惠券编辑

    return json({ coupon, error: null })
  } catch (error) {
    if (error instanceof Response && error.status === 302) {
      throw error
    }
    return json({ coupon: null, error: "加载优惠券失败" }, { status: 500 })
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const { id } = params

  if (!id) {
    return json({ errors: { general: "缺少优惠券ID" } }, { status: 400 })
  }

  const formData = await request.formData()

  const name = formData.get("name") as string
  const type = formData.get("type") as CouponType
  const threshold = formData.get("threshold") as string | null
  const amount = formData.get("amount") as string | null
  const discount = formData.get("discount") as string | null
  const maxDiscount = formData.get("maxDiscount") as string | null
  const validDays = formData.get("validDays") as string
  const platformRatio = formData.get("platformRatio") as string
  const remark = formData.get("remark") as string | null

  // 验证
  const errors: Record<string, string> = {}

  // 名称验证
  if (!name || name.trim().length === 0) {
    errors.name = "优惠券名称不能为空"
  } else if (name.length > 50) {
    errors.name = "优惠券名称不能超过50个字符"
  }

  // 类型相关验证
  if (type === 'full_reduction') {
    if (!threshold || Number(threshold) <= 0) {
      errors.threshold = "使用门槛必须大于0"
    }
    if (!amount || Number(amount) <= 0) {
      errors.amount = "减免金额必须大于0"
    }
    if (threshold && amount && Number(amount) >= Number(threshold)) {
      errors.amount = "减免金额必须小于使用门槛"
    }
  } else if (type === 'discount') {
    if (!discount || Number(discount) < 1 || Number(discount) > 99) {
      errors.discount = "折扣率必须在1-99之间"
    }
    if (!maxDiscount || Number(maxDiscount) <= 0) {
      errors.maxDiscount = "最高优惠金额必须大于0"
    }
  } else if (type === 'instant_reduction') {
    if (!amount || Number(amount) <= 0) {
      errors.amount = "减免金额必须大于0"
    }
  }

  // 有效天数验证
  if (!validDays || Number(validDays) < 1 || Number(validDays) > 365) {
    errors.validDays = "有效天数必须在1-365之间"
  }

  // 平台承担比例验证
  if (!platformRatio || Number(platformRatio) < 0 || Number(platformRatio) > 100) {
    errors.platformRatio = "平台承担比例必须在0-100之间"
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 })
  }

  // 构建优惠券数据
  const couponData: any = {
    name,
    type,
    validDays: Number(validDays),
    platformRatio: Number(platformRatio),
    merchantRatio: 100 - Number(platformRatio),
    remark: remark || undefined,
  }

  // 根据类型添加字段
  if (type === 'full_reduction') {
    couponData.threshold = Number(threshold)
    couponData.amount = Number(amount)
  } else if (type === 'discount') {
    couponData.discount = Number(discount)
    couponData.maxDiscount = Number(maxDiscount)
  } else if (type === 'instant_reduction') {
    couponData.amount = Number(amount)
  }

  try {
    await CouponService.updateCoupon(id, couponData)
    return redirect("/platform-admin/coupon-management")
  } catch (error) {
    if (error instanceof Error) {
      return json({ errors: { general: error.message } }, { status: 400 })
    }
    return json({ errors: { general: "保存失败，请稍后重试" } }, { status: 500 })
  }
}

export default function EditCouponRoute() {
  const { coupon } = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()

  if (!coupon) {
    return (
      <div className="p-6">
        <div className="text-red-600">优惠券不存在</div>
      </div>
    )
  }

  return <CouponFormPage coupon={coupon as Coupon} errors={actionData?.errors} />
}
