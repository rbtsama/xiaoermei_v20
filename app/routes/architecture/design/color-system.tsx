import { json } from "@remix-run/node"
import ColorSystemPage from "~/pages/Architecture/DesignSystem/ColorSystemPage"

export async function loader() {
  return json({})
}

export default function ColorSystemRoute() {
  return <ColorSystemPage />
}
