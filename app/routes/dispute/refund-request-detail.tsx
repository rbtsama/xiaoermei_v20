/**
 * 退款申请详情路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import RefundRequestDetailPage from '~/pages/DisputeManagement/RefundRequestDetailPage'
import { mockRefundRequests } from '~/pages/DisputeManagement/services/mocks'

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params

  try {
    // 模拟异步加载
    await new Promise((resolve) => setTimeout(resolve, 300))

    const request = mockRefundRequests.find((r) => r.id === id)

    if (!request) {
      throw new Response('退款申请不存在', { status: 404 })
    }

    return json({
      request,
      error: null,
    })
  } catch (error) {
    if (error instanceof Response) {
      throw error
    }
    return json({
      request: null,
      error: '加载失败',
    }, { status: 500 })
  }
}

export default function RefundRequestDetailRoute() {
  const data = useLoaderData<typeof loader>()

  if (data.error || !data.request) {
    return (
      <div className="p-6">
        <div className="text-red-600">错误: {data.error || '数据不存在'}</div>
      </div>
    )
  }

  return <RefundRequestDetailPage request={data.request as any} />
}
