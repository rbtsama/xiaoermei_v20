import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import CouponConfigPage from "~/pages/CouponSystem/CouponConfigPage"
import CouponService from "~/pages/CouponSystem/services/coupon.service"

export async function loader() {
  try {
    const coupons = await CouponService.getAllCoupons()
    return json({ coupons, error: null })
  } catch (error) {
    return json({ coupons: [], error: "Failed to load data" }, { status: 500 })
  }
}

export default function CouponConfigRoute() {
  const { coupons } = useLoaderData<typeof loader>()
  return <CouponConfigPage coupons={coupons} />
}
