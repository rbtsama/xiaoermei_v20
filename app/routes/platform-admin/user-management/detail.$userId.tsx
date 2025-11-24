/**
 * 平台后台 - 用户详情路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import UserDetailPage from '~/pages/PlatformAdmin/UserManagement/UserDetailPage'
import { mockUserDetails } from '~/pages/PlatformAdmin/UserManagement/services/mocks/user.mock'

export async function loader({ params }: LoaderFunctionArgs) {
  const { userId } = params

  try {
    if (!userId) {
      throw new Error('用户ID不能为空')
    }

    const userDetail = mockUserDetails[userId]

    if (!userDetail) {
      throw new Error('用户不存在')
    }

    return json({ user: userDetail })
  } catch (error) {
    throw new Response('用户不存在', { status: 404 })
  }
}

export default function UserDetailRoute() {
  const { user } = useLoaderData<typeof loader>()
  return <UserDetailPage user={user} />
}
