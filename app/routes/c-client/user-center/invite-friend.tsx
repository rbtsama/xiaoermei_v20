import { json } from '@remix-run/node'
import InviteFriendPage from '~/pages/CClient/UserCenter/InviteFriendPage'

export async function loader() {
  return json({})
}

export default function InviteFriendRoute() {
  return <InviteFriendPage />
}
