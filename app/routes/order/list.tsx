import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import OrderListPage from "~/pages/OrderManagement/OrderListPage"
import OrderService from "~/pages/OrderManagement/services/order.service"

export async function loader() {
  try {
    const orders = await OrderService.getAllOrders()
    return json({ orders, error: null })
  } catch (error) {
    return json({ orders: [], error: "Failed to load data" }, { status: 500 })
  }
}

export default function OrderListRoute() {
  const { orders } = useLoaderData<typeof loader>()
  return <OrderListPage orders={orders} />
}
