/**
 * 商户端 - VIP折扣配置路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import VIPDiscountConfigPage from '~/pages/MerchantBackend/VIPDiscount/VIPDiscountConfigPage'
import VIPDiscountService from '~/pages/MerchantBackend/VIPDiscount/services/vipDiscount.service'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const storeId = 'store-1'
    const config = await VIPDiscountService.getConfig(storeId)
    return json({ config })
  } catch (error) {
    throw new Response('加载配置失败', { status: 500 })
  }
}

export default function VIPDiscountConfigRoute() {
  const { config } = useLoaderData<typeof loader>()
  return <VIPDiscountConfigPage config={config} />
}
