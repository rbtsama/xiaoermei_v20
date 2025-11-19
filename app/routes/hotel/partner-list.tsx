import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import PartnerHotelPage from "~/pages/HotelManagement/PartnerHotelPage"
import HotelService from "~/pages/HotelManagement/services/hotel.service"

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const hotels = await HotelService.getPartnerHotels()
    return json({ hotels, error: null })
  } catch (error) {
    return json({ hotels: [], error: "Failed to load data" }, { status: 500 })
  }
}

export default function PartnerHotelRoute() {
  const { hotels, error } = useLoaderData<typeof loader>()

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>
  }

  return <PartnerHotelPage hotels={hotels} />
}
