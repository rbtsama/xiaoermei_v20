import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import UserAccountPage from "~/pages/PointsSystem/UserAccountPage"
import PointsService from "~/pages/PointsSystem/services/points.service"

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const accounts = await PointsService.getAllUserAccounts()
    const details = await PointsService.getUserPointsDetails({
      userId: 'UID_2025001', // 默认显示第一个用户的明细
      pageSize: 100
    })

    return json({ accounts, details: details.details, error: null })
  } catch (error) {
    return json({ accounts: [], details: [], error: "Failed to load data" }, { status: 500 })
  }
}

export default function UserAccountRoute() {
  const { accounts, details, error } = useLoaderData<typeof loader>()

  if (error) {
    return <div className="p-6 text-destructive">Error: {error}</div>
  }

  return <UserAccountPage accounts={accounts} details={details} />
}
