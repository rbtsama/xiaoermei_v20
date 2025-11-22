import { json } from '@remix-run/node'
import OrderConfirmPage from '~/pages/CClient/Hotel/OrderConfirmPage'

export async function loader() {
  return json({})
}

export default function OrderConfirmRoute() {
  return <OrderConfirmPage />
}
