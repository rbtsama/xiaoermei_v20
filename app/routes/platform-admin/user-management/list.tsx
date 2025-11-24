/**
 * 平台后台 - 用户列表路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import UserListPage from '~/pages/PlatformAdmin/UserManagement/UserListPage'
import { mockUsers, memberLevels } from '~/pages/PlatformAdmin/UserManagement/services/mocks/user.mock'
import type { UserFilterParams } from '~/pages/PlatformAdmin/UserManagement/types/user.types'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const search = url.searchParams.get('search') || undefined
  const memberLevel = url.searchParams.get('memberLevel') || undefined
  const status = url.searchParams.get('status') || undefined
  const registeredFrom = url.searchParams.get('registeredFrom') || undefined
  const registeredTo = url.searchParams.get('registeredTo') || undefined

  try {
    // 筛选用户
    let filteredUsers = [...mockUsers]

    // 搜索筛选（用户ID、手机号、姓名）
    if (search) {
      const searchLower = search.toLowerCase()
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.userId.toLowerCase().includes(searchLower) ||
          user.phone.includes(search) ||
          user.name.toLowerCase().includes(searchLower)
      )
    }

    // 会员等级筛选
    if (memberLevel && memberLevel !== 'all') {
      filteredUsers = filteredUsers.filter((user) => user.memberLevel === memberLevel)
    }

    // 状态筛选
    if (status && status !== 'all') {
      filteredUsers = filteredUsers.filter((user) => user.status === status)
    }

    // 注册时间筛选
    if (registeredFrom) {
      filteredUsers = filteredUsers.filter((user) => user.registeredAt >= registeredFrom)
    }
    if (registeredTo) {
      filteredUsers = filteredUsers.filter((user) => user.registeredAt <= registeredTo + ' 23:59:59')
    }

    return json({ users: filteredUsers, memberLevels })
  } catch (error) {
    return json({ users: [], memberLevels }, { status: 500 })
  }
}

export default function UserListRoute() {
  const { users, memberLevels } = useLoaderData<typeof loader>()
  return <UserListPage users={users} memberLevels={memberLevels} />
}
