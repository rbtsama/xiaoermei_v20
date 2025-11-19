import { Form } from '@remix-run/react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { ChevronUp, ChevronDown } from 'lucide-react'
import MainLayout from '../PointsSystem/components/MainLayout'

interface StoreImagesPageProps {
  shareImage?: string
  shareTitle: string
  homeImages: string[]
}

export default function StoreImagesPage({ shareImage, shareTitle, homeImages }: StoreImagesPageProps) {
  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto bg-slate-50 p-6">
        <div className="space-y-6 max-w-4xl">
        <h1 className="text-2xl font-bold">门店图片</h1>

        <Form method="post" className="space-y-6">
          {/* 小程序分享图 */}
          <Card>
            <CardHeader>
              <CardTitle>小程序分享图</CardTitle>
              <p className="text-sm text-slate-500">
                用于将门店分享给客人时生成链接的封面图片和标题。(建议尺寸5:4,支持png、jpg格式)
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {shareImage && (
                <div className="relative w-64">
                  <img src={shareImage} alt="分享图" className="w-full border rounded" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                  >
                    删除
                  </Button>
                </div>
              )}
              <Input name="shareImage" type="url" placeholder="上传分享图URL" />

              <div>
                <label className="text-sm font-medium mb-2 block">小程序分享展示文案</label>
                <Input name="shareTitle" defaultValue={shareTitle} placeholder="桐庐原乡芦荻" />
              </div>
            </CardContent>
          </Card>

          {/* 门店主页首图 */}
          <Card>
            <CardHeader>
              <CardTitle>门店主页首图</CardTitle>
              <p className="text-sm text-slate-500">
                可以拖动图片顺序调整展现顺序(建议图片比例2:3,图片宽度1000px~2000px,最多5张,支持png、jpg格式,图片不大于5M。)
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-5 gap-4">
                {homeImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <img src={img} alt={`首图${index + 1}`} className="w-full h-48 object-cover border rounded" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                    >
                      删除
                    </Button>
                    <div className="absolute top-2 left-2 flex gap-1">
                      {index > 0 && (
                        <Button type="button" variant="secondary" size="sm" className="h-6 w-6 p-0">
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                      )}
                      {index < homeImages.length - 1 && (
                        <Button type="button" variant="secondary" size="sm" className="h-6 w-6 p-0">
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {homeImages.length < 5 && (
                <Input name="newHomeImage" type="url" placeholder="添加门店主页首图URL" />
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg">保存门店图片</Button>
          </div>
        </Form>
        </div>
        </div>
        </div>
    </MainLayout>
  )
}
