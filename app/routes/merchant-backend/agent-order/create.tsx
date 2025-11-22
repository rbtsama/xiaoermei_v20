/**
 * 商户端 - 创建代客下单路由
 */

import { json } from '@remix-run/node'
import AgentOrderCreatePage from '~/pages/MerchantBackend/AgentOrder/AgentOrderCreatePage'

export async function loader() {
  return json({})
}

export default function AgentOrderCreateRoute() {
  return <AgentOrderCreatePage />
}
