import { json } from '@remix-run/node'
import HotelDetailPage from '~/pages/CClient/Hotel/HotelDetailPage'

export async function loader() {
  return json({})
}

export default function HotelDetailRoute() {
  return <HotelDetailPage />
}
