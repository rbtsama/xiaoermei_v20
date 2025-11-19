/**
 * 门店基本信息编辑页面
 */

import { Form, useNavigation } from '@remix-run/react'
import type { Store } from './types/hotel-backend.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import MainLayout from '../PointsSystem/components/MainLayout'

interface StoreBasicInfoPageProps {
  store: Store
}

export default function StoreBasicInfoPage({ store }: StoreBasicInfoPageProps) {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto bg-slate-50 p-6">
        <div className="space-y-6 max-w-5xl">
        {/* 页面标题 */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">门店基本信息</h1>
          <p className="text-sm text-slate-500 mt-1">
            编辑门店的基本信息、媒体资源和推荐内容
          </p>
        </div>

        <Form method="post" className="space-y-6">
          {/* 基本信息 */}
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* 名称 */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    名称 <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    门店名称，如：原乡芦荻（必填，最多30字）
                  </p>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={store.name}
                    placeholder="如: 原乡芦荻"
                    required
                  />
                </div>

                {/* 城市 */}
                <div className="space-y-2">
                  <Label htmlFor="city">
                    城市 <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    所在城市，如：桐庐（必填）
                  </p>
                  <Input
                    id="city"
                    name="city"
                    defaultValue={store.city}
                    placeholder="如: 桐庐"
                    required
                  />
                </div>

                {/* 电话 */}
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    电话 <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    门店联系电话，11位手机号（必填）
                  </p>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    defaultValue={store.phone}
                    placeholder="13575481983"
                    required
                  />
                </div>

                {/* 微信号 */}
                <div className="space-y-2">
                  <Label htmlFor="wechat">微信号</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    门店微信号，方便客户联系（选填）
                  </p>
                  <Input
                    id="wechat"
                    name="wechat"
                    defaultValue={store.wechat}
                    placeholder="13575481983"
                  />
                </div>
              </div>

              {/* 地址 */}
              <div className="space-y-2">
                <Label htmlFor="address">
                  地址 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="address"
                  name="address"
                  defaultValue={store.address}
                  placeholder="桐庐县芦茨村大母山"
                  required
                />
                <p className="text-xs text-slate-500">
                  名称、城市、地址为固定配置信息,如需修改可以联系平台。
                </p>
              </div>

              {/* 经纬度 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">纬度</Label>
                  <Input
                    id="latitude"
                    name="latitude"
                    type="number"
                    step="0.0000001"
                    defaultValue={store.latitude}
                    placeholder="29.6890704279134"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">经度</Label>
                  <Input
                    id="longitude"
                    name="longitude"
                    type="number"
                    step="0.0000001"
                    defaultValue={store.longitude}
                    placeholder="119.668437770"
                  />
                </div>
              </div>

              {/* 开业时间 */}
              <div className="space-y-2">
                <Label htmlFor="openedYear">
                  开业时间 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="openedYear"
                  name="openedYear"
                  defaultValue={store.openedYear}
                  placeholder="2016"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* 推荐信息 */}
          <Card>
            <CardHeader>
              <CardTitle>推荐信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* slogan */}
              <div className="space-y-2">
                <Label htmlFor="slogan">
                  slogan或门店推荐语 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="slogan"
                  name="slogan"
                  defaultValue={store.slogan}
                  placeholder="既是一间民宿，也是一种植根于山野的生活方式。"
                  required
                />
              </div>

              {/* 门店推荐标签 */}
              <div className="space-y-2">
                <Label>门店推荐标签</Label>
                <div className="flex flex-wrap gap-2">
                  {['文艺复古', '有烟火气', '亲子乐享', '奇妙有趣', '融于自然'].map(
                    (tag) => (
                      <label
                        key={tag}
                        className={`flex items-center gap-2 px-3 py-2 border rounded cursor-pointer transition-colors ${
                          store.tags.includes(tag)
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'bg-white border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="tags"
                          value={tag}
                          defaultChecked={store.tags.includes(tag)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{tag}</span>
                      </label>
                    )
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  注: 此处最多可选择两项,如需新增更多选项可以联系平台。
                </p>
              </div>

              {/* 门店介绍 */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  门店介绍 <span className="text-red-500">*</span>
                </Label>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={store.description}
                  className="w-full min-h-[200px] p-3 border border-slate-300 rounded-md resize-y"
                  placeholder="介绍门店特色、设施、房型等信息..."
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* 媒体资源 */}
          <Card>
            <CardHeader>
              <CardTitle>媒体资源</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 门店logo */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="logo">门店logo</Label>
                  <Input
                    id="logo"
                    name="logo"
                    type="url"
                    defaultValue={store.logo}
                    placeholder="图片URL"
                  />
                  {store.logo && (
                    <img
                      src={store.logo}
                      alt="Logo预览"
                      className="w-32 h-32 object-cover border rounded"
                    />
                  )}
                </div>

                {/* 列表封面 */}
                <div className="space-y-2">
                  <Label htmlFor="coverImage">列表封面</Label>
                  <Input
                    id="coverImage"
                    name="coverImage"
                    type="url"
                    defaultValue={store.coverImage}
                    placeholder="图片URL"
                  />
                  {store.coverImage && (
                    <img
                      src={store.coverImage}
                      alt="封面预览"
                      className="w-full h-32 object-cover border rounded"
                    />
                  )}
                </div>
              </div>

              {/* 门店视频 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="videoUrl">门店视频</Label>
                  <Input
                    id="videoUrl"
                    name="videoUrl"
                    type="url"
                    defaultValue={store.videoUrl}
                    placeholder="视频URL"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="videoCover">视频封面</Label>
                  <Input
                    id="videoCover"
                    name="videoCover"
                    type="url"
                    defaultValue={store.videoCover}
                    placeholder="封面图片URL"
                  />
                  {store.videoCover && (
                    <img
                      src={store.videoCover}
                      alt="视频封面"
                      className="w-full h-32 object-cover border rounded"
                    />
                  )}
                </div>
              </div>

              {/* 最新情报 */}
              <div className="space-y-2">
                <Label>最新情报 (多图)</Label>
                <div className="grid grid-cols-4 gap-3">
                  {store.newsImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`情报${index + 1}`}
                      className="w-full h-32 object-cover border rounded"
                    />
                  ))}
                </div>
                <Input
                  name="newsImages"
                  type="url"
                  placeholder="添加图片URL"
                />
              </div>
            </CardContent>
          </Card>

          {/* 保存按钮 */}
          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? '保存中...' : '保存修改'}
            </Button>
          </div>
        </Form>
        </div>
        </div>
        </div>
    </MainLayout>
  )
}
