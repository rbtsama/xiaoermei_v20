import { json } from '@remix-run/node'
import MemberCenterPage from '~/pages/CClient/UserCenter/MemberCenterPage'

export async function loader() {
  return json({})
}

export default function MemberCenterRoute() {
  return <MemberCenterPage />
}
