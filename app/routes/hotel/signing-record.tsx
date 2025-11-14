import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import SigningRecordPage from "~/pages/HotelManagement/SigningRecordPage"
import ContractService from "~/pages/HotelManagement/services/contract.service"

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const records = await ContractService.getAllSigningRecords()
    return json({ records, error: null })
  } catch (error) {
    return json({ records: [], error: "Failed to load data" }, { status: 500 })
  }
}

export default function SigningRecordRoute() {
  const { records, error } = useLoaderData<typeof loader>()

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>
  }

  return <SigningRecordPage records={records} />
}
