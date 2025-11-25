import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import BasicInfoPage from './BasicInfoPage'
import PolicyInfoPage from './PolicyInfoPage'
import FacilityInfoPage from './FacilityInfoPage'
import SurroundingInfoPage from './SurroundingInfoPage'
import BreakfastPolicyPage from './BreakfastPolicyPage'
import ExtraBedPolicyPage from './ExtraBedPolicyPage'
import ImageInfoPage from './ImageInfoPage'
import type {
  StoreInfo,
  BasicInfo,
  PolicyInfo,
  FacilityInfo,
  SurroundingInfo,
  BreakfastPolicy,
  ExtraBedPolicy,
  ImageInfo,
} from './types/storeInfo.types'

interface StoreInfoMainPageProps {
  data: StoreInfo
  onUpdateBasicInfo: (data: Partial<BasicInfo>) => Promise<void>
  onUpdatePolicyInfo: (data: Partial<PolicyInfo>) => Promise<void>
  onUpdateFacilityInfo: (data: Partial<FacilityInfo>) => Promise<void>
  onUpdateSurroundingInfo: (data: Partial<SurroundingInfo>) => Promise<void>
  onUpdateBreakfastPolicy: (data: Partial<BreakfastPolicy>) => Promise<void>
  onUpdateExtraBedPolicy: (data: Partial<ExtraBedPolicy>) => Promise<void>
  onUpdateImageInfo: (data: Partial<ImageInfo>) => Promise<void>
  onUpdateShareText?: (text: string) => Promise<void>
}

export default function StoreInfoMainPage({
  data,
  onUpdateBasicInfo,
  onUpdatePolicyInfo,
  onUpdateFacilityInfo,
  onUpdateSurroundingInfo,
  onUpdateBreakfastPolicy,
  onUpdateExtraBedPolicy,
  onUpdateImageInfo,
  onUpdateShareText,
}: StoreInfoMainPageProps) {
  const [activeTab, setActiveTab] = useState('basic')

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">门店信息</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-slate-100 p-1">
          <TabsTrigger value="basic" className="data-[state=active]:bg-white">
            基本信息
          </TabsTrigger>
          <TabsTrigger value="policy" className="data-[state=active]:bg-white">
            政策相关
          </TabsTrigger>
          <TabsTrigger value="facility" className="data-[state=active]:bg-white">
            门店设施
          </TabsTrigger>
          <TabsTrigger value="surrounding" className="data-[state=active]:bg-white">
            周边信息
          </TabsTrigger>
          <TabsTrigger value="breakfast" className="data-[state=active]:bg-white">
            早餐政策
          </TabsTrigger>
          <TabsTrigger value="extrabed" className="data-[state=active]:bg-white">
            加床政策
          </TabsTrigger>
          <TabsTrigger value="images" className="data-[state=active]:bg-white">
            门店图片
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-0">
          <BasicInfoPage data={data.basicInfo} onSave={onUpdateBasicInfo} />
        </TabsContent>

        <TabsContent value="policy" className="mt-0">
          <PolicyInfoPage data={data.policyInfo} onSave={onUpdatePolicyInfo} />
        </TabsContent>

        <TabsContent value="facility" className="mt-0">
          <FacilityInfoPage data={data.facilityInfo} onSave={onUpdateFacilityInfo} />
        </TabsContent>

        <TabsContent value="surrounding" className="mt-0">
          <SurroundingInfoPage
            data={data.surroundingInfo}
            onSave={onUpdateSurroundingInfo}
          />
        </TabsContent>

        <TabsContent value="breakfast" className="mt-0">
          <BreakfastPolicyPage
            data={data.breakfastPolicy}
            onSave={onUpdateBreakfastPolicy}
          />
        </TabsContent>

        <TabsContent value="extrabed" className="mt-0">
          <ExtraBedPolicyPage
            data={data.extraBedPolicy}
            onSave={onUpdateExtraBedPolicy}
          />
        </TabsContent>

        <TabsContent value="images" className="mt-0">
          <ImageInfoPage
            data={data.imageInfo}
            onSave={onUpdateImageInfo}
            onSaveShareText={onUpdateShareText}
          />
        </TabsContent>
      </Tabs>

      {data.updatedAt && (
        <div className="mt-6 text-right text-sm text-slate-500">
          最后更新时间：{data.updatedAt}
        </div>
      )}
    </div>
  )
}
