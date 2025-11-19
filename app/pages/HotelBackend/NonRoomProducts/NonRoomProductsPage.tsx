import { useState } from 'react'
import { Form, useFetcher } from '@remix-run/react'
import type { NonRoomProduct } from './types/nonRoomProducts.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import { Checkbox } from '~/components/ui/checkbox'
import { Plus, Search, Pencil, Trash2 } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface NonRoomProductsPageProps {
  products: NonRoomProduct[]
  error: string | null
}

export default function NonRoomProductsPage({ products, error }: NonRoomProductsPageProps) {
  const [searchValue, setSearchValue] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const fetcher = useFetcher()

  const handleDelete = (id: string) => {
    if (confirm('确定要删除此产品吗？')) {
      const formData = new FormData()
      formData.append('intent', 'delete')
      formData.append('id', id)
      fetcher.submit(formData, { method: 'post' })
    }
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-destructive">错误: {error}</div>
      </div>
    )
  }

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="h-full overflow-y-auto p-6 bg-background">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>非房产品管理</CardTitle>
                <div className="flex gap-2">
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        新增
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>新增非房产品</DialogTitle>
                      </DialogHeader>
                      <Form method="post" className="space-y-4" onSubmit={() => setDialogOpen(false)}>
                        <input type="hidden" name="intent" value="create" />

                        <div className="space-y-2">
                          <Label htmlFor="productCategory">产品分类 *</Label>
                          <Select name="productCategory" required>
                            <SelectTrigger>
                              <SelectValue placeholder="请选择产品分类" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="酒店套餐">酒店套餐</SelectItem>
                              <SelectItem value="休闲娱乐">休闲娱乐</SelectItem>
                              <SelectItem value="餐饮服务">餐饮服务</SelectItem>
                              <SelectItem value="康养服务">康养服务</SelectItem>
                              <SelectItem value="交通服务">交通服务</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="productName">产品名 *</Label>
                          <Input
                            id="productName"
                            name="productName"
                            placeholder="请输入产品名称"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="productDescription">产品描述 *</Label>
                          <Textarea
                            id="productDescription"
                            name="productDescription"
                            placeholder="请输入产品描述"
                            required
                            rows={3}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="price">价格 *</Label>
                            <Input
                              id="price"
                              name="price"
                              type="number"
                              step="0.01"
                              placeholder="请输入价格"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="pricingType">计价方式 *</Label>
                            <Select name="pricingType" required>
                              <SelectTrigger>
                                <SelectValue placeholder="请选择计价方式" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="per_time">按次</SelectItem>
                                <SelectItem value="per_hour">按小时</SelectItem>
                                <SelectItem value="per_person">按人</SelectItem>
                                <SelectItem value="fixed">固定价</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="inventory">库存数量</Label>
                            <Input
                              id="inventory"
                              name="inventory"
                              type="number"
                              placeholder="每日可售数量"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="duration">服务时长（分钟）</Label>
                            <Input
                              id="duration"
                              name="duration"
                              type="number"
                              placeholder="例如：90"
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="needsAppointment" name="needsAppointment" />
                          <Label htmlFor="needsAppointment" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            需要预约
                          </Label>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="applyUseSettings">应用设置</Label>
                          <Input
                            id="applyUseSettings"
                            name="applyUseSettings"
                            placeholder="例如：免费使用2小时"
                          />
                        </div>

                        <input type="hidden" name="status" value="active" />

                        <div className="flex gap-2 justify-end pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setDialogOpen(false)}
                          >
                            取消
                          </Button>
                          <Button type="submit">确定</Button>
                        </div>
                      </Form>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    产品批量
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <Form method="get" className="mb-6 flex gap-3">
                  <div className="flex-1 relative">
                    <Input
                      name="search"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="搜索产品名称或描述"
                    />
                  </div>

                  <Select
                    name="productCategory"
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="产品分类" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部分类</SelectItem>
                      <SelectItem value="酒店套餐">酒店套餐</SelectItem>
                      <SelectItem value="休闲娱乐">休闲娱乐</SelectItem>
                      <SelectItem value="餐饮服务">餐饮服务</SelectItem>
                      <SelectItem value="康养服务">康养服务</SelectItem>
                      <SelectItem value="交通服务">交通服务</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button type="submit" variant="default">
                    <Search className="h-4 w-4 mr-2" />
                    筛选
                  </Button>
                </Form>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-20">编号</TableHead>
                      <TableHead className="w-32">产品分类</TableHead>
                      <TableHead className="w-40">产品名</TableHead>
                      <TableHead>产品描述</TableHead>
                      <TableHead className="w-24">价格</TableHead>
                      <TableHead className="w-48">应用设置</TableHead>
                      <TableHead className="w-32 text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="text-center">{product.sequenceNumber}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            {product.productCategory}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium">{product.productName}</TableCell>
                        <TableCell className="text-muted-foreground">{product.productDescription}</TableCell>
                        <TableCell className="font-semibold text-orange-600">
                          ¥{product.price}
                          {product.pricingType === 'per_hour' && '/小时'}
                          {product.pricingType === 'per_person' && '/人'}
                          {product.pricingType === 'per_time' && '/次'}
                        </TableCell>
                        <TableCell>
                          {product.applyUseSettings && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                              {product.applyUseSettings}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Pencil className="h-4 w-4 mr-1" />
                              修改
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDelete(product.id)}
                              disabled={fetcher.state !== 'idle'}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              删除
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {products.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    暂无非房产品数据
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
    </MainLayout>
  )
}
