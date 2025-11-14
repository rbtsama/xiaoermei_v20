import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import OrderDetailPage from "~/pages/OrderManagement/OrderDetailPage"
import { mockOrders } from "~/pages/OrderManagement/services/mocks/order.mock"

export async function loader() {
  // 默认显示第一个订单的详情
  return json({ order: mockOrders[0] })
}

export default function OrderDetailRoute() {
  const { order } = useLoaderData<typeof loader>()
  return <OrderDetailPage order={order} />
}
