import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import RefundManagementPage from "~/pages/OrderManagement/RefundManagementPage"
import { mockRefundRequests } from "~/pages/OrderManagement/services/mocks/order.mock"

export async function loader() {
  return json({ refunds: mockRefundRequests })
}

export default function RefundManagementRoute() {
  const { refunds } = useLoaderData<typeof loader>()
  return <RefundManagementPage refunds={refunds} />
}
