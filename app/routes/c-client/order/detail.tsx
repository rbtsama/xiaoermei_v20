import { json } from '@remix-run/node'
import OrderDetailPage from '~/pages/CClient/Order/OrderDetailPage'

export async function loader() {
  return json({})
}

export default function OrderDetailRoute() {
  return <OrderDetailPage />
}
