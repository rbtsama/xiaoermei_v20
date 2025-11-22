import { json } from '@remix-run/node'
import PaymentSuccessPage from '~/pages/CClient/Order/PaymentSuccessPage'

export async function loader() {
  return json({})
}

export default function PaymentSuccessRoute() {
  return <PaymentSuccessPage />
}
