import { json } from '@remix-run/node'
import MyPointsPage from '~/pages/CClient/UserCenter/MyPointsPage'

export async function loader() {
  return json({})
}

export default function MyPointsRoute() {
  return <MyPointsPage />
}
