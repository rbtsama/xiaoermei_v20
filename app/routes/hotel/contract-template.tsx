import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import ContractTemplatePage from "~/pages/HotelManagement/ContractTemplatePage"
import ContractService from "~/pages/HotelManagement/services/contract.service"

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const templates = await ContractService.getAllTemplates()
    return json({ templates, error: null })
  } catch (error) {
    return json({ templates: [], error: "Failed to load data" }, { status: 500 })
  }
}

export default function ContractTemplateRoute() {
  const { templates, error } = useLoaderData<typeof loader>()

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>
  }

  return <ContractTemplatePage templates={templates} />
}
