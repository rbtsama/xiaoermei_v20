import { json, type LoaderFunctionArgs } from "@remix-run/node";
import TechnicalArchitecturePage from "~/pages/Architecture/TechnicalArchitecture/TechnicalArchitecturePage";

export async function loader({ request }: LoaderFunctionArgs) {
  // 技术架构页面无需加载数据，纯展示
  return json({ success: true });
}

export default function TechnicalArchitectureRoute() {
  return <TechnicalArchitecturePage />;
}
