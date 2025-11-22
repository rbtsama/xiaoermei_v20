import { json } from '@remix-run/node'
import HotelListPage from '~/pages/CClient/Hotel/HotelListPage'

export async function loader() {
  return json({})
}

export default function HotelListRoute() {
  return <HotelListPage />
}
