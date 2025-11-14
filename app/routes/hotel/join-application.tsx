import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import JoinApplicationPage from "~/pages/HotelManagement/JoinApplicationPage"
import HotelService from "~/pages/HotelManagement/services/hotel.service"

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const applications = await HotelService.getJoinApplications()
    return json({ applications, error: null })
  } catch (error) {
    return json({ applications: [], error: "Failed to load data" }, { status: 500 })
  }
}

export default function JoinApplicationRoute() {
  const { applications, error } = useLoaderData<typeof loader>()

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>
  }

  return <JoinApplicationPage applications={applications} />
}
