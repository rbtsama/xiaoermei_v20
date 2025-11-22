/**
 * 场景设计列表路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import ScenarioDesignPage from '~/pages/Architecture/ScenarioDesign/ScenarioDesignPage'
import ScenarioService from '~/pages/Architecture/ScenarioDesign/services/scenario.service'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const scenarios = await ScenarioService.getAll()
    return json({ scenarios, error: null })
  } catch (error) {
    return json(
      { scenarios: [], error: '加载场景列表失败' },
      { status: 500 }
    )
  }
}

export default function ScenarioRoute() {
  const { scenarios } = useLoaderData<typeof loader>()
  return <ScenarioDesignPage scenarios={scenarios} />
}
