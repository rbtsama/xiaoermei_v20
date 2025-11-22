/**
 * 场景详情路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import ScenarioDetailPage from '~/pages/Architecture/ScenarioDesign/ScenarioDetailPage'
import ScenarioService from '~/pages/Architecture/ScenarioDesign/services/scenario.service'

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params

  if (!id) {
    throw new Response('场景ID缺失', { status: 400 })
  }

  try {
    const scenario = await ScenarioService.getById(id)

    if (!scenario) {
      throw new Response('场景不存在', { status: 404 })
    }

    return json({ scenario })
  } catch (error) {
    throw new Response('加载场景详情失败', { status: 500 })
  }
}

export default function ScenarioDetailRoute() {
  const { scenario } = useLoaderData<typeof loader>()
  return <ScenarioDetailPage scenario={scenario} isLearningMode={true} />
}
