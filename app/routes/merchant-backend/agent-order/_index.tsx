/**
 * 商户端 - 代客下单列表路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import AgentOrderListPage from '~/pages/MerchantBackend/AgentOrder/AgentOrderListPage'
import AgentOrderService from '~/pages/MerchantBackend/AgentOrder/services/agentOrder.service'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const orders = await AgentOrderService.getList()
    return json({ orders })
  } catch (error) {
    throw new Response('加载订单列表失败', { status: 500 })
  }
}

export default function AgentOrderListRoute() {
  const { orders } = useLoaderData<typeof loader>()
  return <AgentOrderListPage orders={orders} />
}
