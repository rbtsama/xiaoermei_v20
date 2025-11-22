/**
 * 商户端 - 积分服务配置路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import PointsServiceConfigPage from '~/pages/MerchantBackend/PointsService/PointsServiceConfigPage'
import PointsServiceManagementService from '~/pages/MerchantBackend/PointsService/services/pointsService.service'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const storeId = 'store-1'
    const config = await PointsServiceManagementService.getConfig(storeId)
    return json({ config })
  } catch (error) {
    throw new Response('加载配置失败', { status: 500 })
  }
}

export default function PointsServiceConfigRoute() {
  const { config } = useLoaderData<typeof loader>()
  return <PointsServiceConfigPage config={config} />
}
