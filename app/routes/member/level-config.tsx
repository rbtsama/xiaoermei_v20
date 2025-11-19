import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import MemberLevelPage from "~/pages/MemberSystem/MemberLevelPage"
import MemberService from "~/pages/MemberSystem/services/member.service"

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const levels = await MemberService.getAllLevels()
    return json({ levels, error: null })
  } catch (error) {
    return json({ levels: [], error: "Failed to load data" }, { status: 500 })
  }
}

export default function MemberLevelRoute() {
  const { levels, error } = useLoaderData<typeof loader>()

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>
  }

  return <MemberLevelPage levels={levels} />
}
