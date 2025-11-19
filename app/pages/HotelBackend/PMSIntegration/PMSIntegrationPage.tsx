import { useState, useEffect } from 'react'
import { Form, useFetcher } from '@remix-run/react'
import type { PMSIntegrationConfig } from './types/pmsIntegration.types'
import { PMS_PROVIDERS } from './types/pmsIntegration.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface PMSIntegrationPageProps {
  config: PMSIntegrationConfig | null
  error: string | null
}

export default function PMSIntegrationPage({ config: initialConfig, error }: PMSIntegrationPageProps) {
  const [isPMSEnabled, setIsPMSEnabled] = useState(initialConfig?.isPMSEnabled ?? false)
  const [pmsProvider, setPmsProvider] = useState(initialConfig?.pmsProvider ?? 'order-coming')
  const [pmsStoreId, setPmsStoreId] = useState(initialConfig?.pmsStoreId ?? '')
  const [mappings, setMappings] = useState(initialConfig?.roomTypeMappings ?? [])
  const fetcher = useFetcher()

  useEffect(() => {
    if (initialConfig) {
      setIsPMSEnabled(initialConfig.isPMSEnabled)
      setPmsProvider(initialConfig.pmsProvider ?? 'order-coming')
      setPmsStoreId(initialConfig.pmsStoreId ?? '')
      setMappings(initialConfig.roomTypeMappings)
    }
  }, [initialConfig])

  const handleSaveConfig = () => {
    const formData = new FormData()
    formData.append('intent', 'updateConfig')
    formData.append('isPMSEnabled', String(isPMSEnabled))
    if (isPMSEnabled) {
      formData.append('pmsProvider', pmsProvider)
      formData.append('pmsStoreId', pmsStoreId)
    }
    fetcher.submit(formData, { method: 'post' })
  }

  const handleSyncPMS = () => {
    const formData = new FormData()
    formData.append('intent', 'syncPMS')
    formData.append('pmsStoreId', pmsStoreId)
    fetcher.submit(formData, { method: 'post' })
  }

  const handleMappingChange = (mappingId: string, newPmsName: string) => {
    setMappings(prev =>
      prev.map(m => (m.id === mappingId ? { ...m, pmsRoomTypeName: newPmsName } : m))
    )
  }

  if (error) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="text-destructive">错误: {error}</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="h-full overflow-y-auto p-6 bg-background">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>PMS对接配置</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 是否对接PMS */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">是否对接PMS?</Label>
                  <RadioGroup
                    value={isPMSEnabled ? 'yes' : 'no'}
                    onValueChange={(value) => setIsPMSEnabled(value === 'yes')}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="pms-no" />
                      <Label htmlFor="pms-no" className="font-normal cursor-pointer">否</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="pms-yes" />
                      <Label htmlFor="pms-yes" className="font-normal cursor-pointer">是</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* PMS配置（仅在启用时显示） */}
                {isPMSEnabled && (
                  <>
                    {/* 选择对接的PMS */}
                    <div className="space-y-2">
                      <Label className="text-base font-medium">选择对接的PMS:</Label>
                      <Select value={pmsProvider} onValueChange={setPmsProvider}>
                        <SelectTrigger className="max-w-md">
                          <SelectValue placeholder="请选择PMS系统" />
                        </SelectTrigger>
                        <SelectContent>
                          {PMS_PROVIDERS.map((provider) => (
                            <SelectItem key={provider.value} value={provider.value}>
                              {provider.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 输入PMS门店ID */}
                    <div className="space-y-2">
                      <Label className="text-base font-medium">
                        <span className="text-destructive mr-1">*</span>
                        输入在PMS里的门店ID:
                      </Label>
                      <div className="flex gap-3 max-w-2xl">
                        <Input
                          value={pmsStoreId}
                          onChange={(e) => setPmsStoreId(e.target.value)}
                          placeholder="请输入门店ID"
                          className="flex-1"
                        />
                        <Button onClick={handleSyncPMS} disabled={!pmsStoreId || fetcher.state !== 'idle'}>
                          {fetcher.state === 'submitting' ? '同步中...' : '保存并刷新房型信息'}
                        </Button>
                      </div>
                    </div>

                    {/* 房型映射列表 */}
                    {mappings.length > 0 && (
                      <div className="space-y-4 pt-6 border-t">
                        <div className="grid grid-cols-2 gap-8">
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-3">小而美房型名称</h3>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-3">PMS房型名称</h3>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {mappings.map((mapping) => (
                            <div key={mapping.id} className="grid grid-cols-2 gap-8 items-center">
                              <div className="py-2.5 px-3 bg-muted/50 rounded-md">
                                <span className="text-sm">{mapping.localRoomTypeName}</span>
                              </div>
                              <div>
                                <Select
                                  value={mapping.pmsRoomTypeName}
                                  onValueChange={(value) => handleMappingChange(mapping.id, value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value={mapping.localRoomTypeName}>
                                      {mapping.localRoomTypeName}
                                    </SelectItem>
                                    {/* 可以添加其他PMS房型选项 */}
                                    {mapping.pmsRoomTypeName !== mapping.localRoomTypeName && (
                                      <SelectItem value={mapping.pmsRoomTypeName}>
                                        {mapping.pmsRoomTypeName}
                                      </SelectItem>
                                    )}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* 保存设置按钮 */}
                <div className="pt-4">
                  <Button
                    onClick={handleSaveConfig}
                    disabled={fetcher.state !== 'idle'}
                    size="lg"
                  >
                    {fetcher.state === 'submitting' ? '保存中...' : '保存设置'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
    </MainLayout>
  )
}
