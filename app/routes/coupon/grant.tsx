import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import CouponGrantPage from "~/pages/CouponSystem/CouponGrantPage"
import { mockIssueRecords } from "~/pages/CouponSystem/services/mocks/coupon.mock"

export async function loader() {
  return json({ records: mockIssueRecords })
}

export default function CouponGrantRoute() {
  const { records } = useLoaderData<typeof loader>()
  return <CouponGrantPage records={records} />
}
