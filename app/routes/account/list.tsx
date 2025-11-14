import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import AccountListPage from "~/pages/AccountManagement/AccountListPage"
import AccountService from "~/pages/AccountManagement/services/account.service"

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const accounts = await AccountService.getAllAccounts()
    const menuItems = await AccountService.getMenuItems()
    const operationLogs = await AccountService.getRecentLogs(10)

    return json({ accounts, menuItems, operationLogs, error: null })
  } catch (error) {
    return json({ accounts: [], menuItems: [], operationLogs: [], error: "Failed to load data" }, { status: 500 })
  }
}

export default function AccountListRoute() {
  const { accounts, menuItems, operationLogs, error } = useLoaderData<typeof loader>()

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>
  }

  return <AccountListPage accounts={accounts} menuItems={menuItems} operationLogs={operationLogs} />
}
