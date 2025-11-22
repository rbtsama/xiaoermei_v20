import { json } from '@remix-run/node'
import OrderListPage from '~/pages/CClient/Order/OrderListPage'

export async function loader() {
  return json({})
}

export default function OrderListRoute() {
  return <OrderListPage />
}
