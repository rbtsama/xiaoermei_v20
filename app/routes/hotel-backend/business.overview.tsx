import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import BusinessOverviewPage from '~/pages/HotelBackend/BusinessManagement/BusinessOverviewPage'
import businessService from '~/pages/HotelBackend/BusinessManagement/services/business.service'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const data = await businessService.getOverview()
    return json({ data, error: null })
  } catch (error) {
    return json({ data: null, error: '获取经营数据失败' }, { status: 500 })
  }
}

export default function BusinessOverviewRoute() {
  const { data, error } = useLoaderData<typeof loader>()

  if (error || !data) {
    return (
      <div className="p-6">
        <div className="text-destructive">错误: {error || '数据加载失败'}</div>
      </div>
    )
  }

  return <BusinessOverviewPage data={data} />
}
