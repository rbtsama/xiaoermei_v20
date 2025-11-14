import { redirect } from "@remix-run/node"

export async function loader() {
  // 首页直接跳转到第一个模块
  return redirect("/points-system/rule-config")
}
