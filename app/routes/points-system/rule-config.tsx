import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import RuleConfigPage from "~/pages/PointsSystem/RuleConfigPage"
import PointsService from "~/pages/PointsSystem/services/points.service"

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const config = await PointsService.getRuleConfig()
    return json({ config, error: null })
  } catch (error) {
    return json({ config: null, error: "Failed to load config" }, { status: 500 })
  }
}

export default function RuleConfigRoute() {
  const { config, error } = useLoaderData<typeof loader>()

  if (error || !config) {
    return <div className="p-6 text-destructive">Error: {error}</div>
  }

  return <RuleConfigPage initialConfig={config} />
}
