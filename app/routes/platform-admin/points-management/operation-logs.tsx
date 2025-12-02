/**
 * 平台后台 - 操作日志路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import OperationLogsPage from '~/pages/PlatformAdmin/PointsManagement/OperationLogsPage'
import ValueAddedServiceService from '~/pages/PlatformAdmin/PointsManagement/services/valueAddedService.service'

/**
 * Loader: 加载操作日志
 */
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url)
    const pageNum = parseInt(url.searchParams.get('pageNum') || '1', 10)

    const { data: operationLogs, total } = await ValueAddedServiceService.getOperationLogs(20, pageNum)

    return json({
      operationLogs,
      total,
      pageNum,
      error: null,
    })
  } catch (error) {
    console.error('加载操作日志失败:', error)
    return json(
      {
        operationLogs: [],
        total: 0,
        pageNum: 1,
        error: '加载操作日志失败',
      },
      { status: 500 }
    )
  }
}

/**
 * 路由组件
 */
export default function OperationLogsRoute() {
  const { operationLogs, total, pageNum, error } = useLoaderData<typeof loader>()

  return (
    <OperationLogsPage
      operationLogs={operationLogs as any}
      total={total}
      pageNum={pageNum}
      error={error}
    />
  )
}
