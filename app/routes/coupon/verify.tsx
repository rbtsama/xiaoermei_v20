import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import VerifyRecordPage from "~/pages/CouponSystem/VerifyRecordPage"
import { mockUserCoupons } from "~/pages/CouponSystem/services/mocks/coupon.mock"

export async function loader() {
  return json({ coupons: mockUserCoupons })
}

export default function VerifyRecordRoute() {
  const { coupons } = useLoaderData<typeof loader>()
  return <VerifyRecordPage coupons={coupons} />
}
