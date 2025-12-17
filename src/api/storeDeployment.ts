/**
 * 门店部署 API 服务层
 */

import { StoreDeploymentForm, RoomType } from '@/types/storeDeployment'
import {
  mockDraftData,
  mockCompleteData,
  mockEmptyFormData
} from '@/mocks/storeDeployment.mock'

/**
 * 模拟延迟
 */
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * 清理无效的blob URL
 *
 * 问题：模拟上传返回的blob URL被保存到localStorage后，
 * 页面刷新时blob URL失效，导致ERR_FILE_NOT_FOUND错误
 *
 * 解决：递归清理所有blob:开头的URL
 */
const cleanBlobUrls = (obj: any): any => {
  if (!obj) return obj
  if (typeof obj === 'string') {
    return obj.startsWith('blob:') ? '' : obj
  }
  if (Array.isArray(obj)) {
    return obj.map(cleanBlobUrls).filter(item => item !== '')
  }
  if (typeof obj === 'object') {
    const cleaned: any = {}
    for (const key in obj) {
      cleaned[key] = cleanBlobUrls(obj[key])
    }
    return cleaned
  }
  return obj
}

/**
 * 获取草稿数据
 */
export const getDraftData = async (): Promise<StoreDeploymentForm | null> => {
  await delay()
  // 模拟从 localStorage 获取草稿
  const draftStr = localStorage.getItem('store_deployment_draft')
  if (draftStr) {
    try {
      const draft = JSON.parse(draftStr)
      // 清理无效的blob URL
      return cleanBlobUrls(draft)
    } catch (e) {
      console.error('Failed to parse draft data:', e)
      return null
    }
  }
  return null
}

/**
 * 保存草稿
 */
export const saveDraft = async (data: Partial<StoreDeploymentForm>): Promise<void> => {
  await delay(100)
  // 获取现有草稿
  const existing = await getDraftData()
  // 合并数据
  const merged = {
    ...mockEmptyFormData,
    ...existing,
    ...data,
    updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
  }
  // 保存到 localStorage
  localStorage.setItem('store_deployment_draft', JSON.stringify(merged))
}

/**
 * 清除草稿
 */
export const clearDraft = async (): Promise<void> => {
  await delay(100)
  localStorage.removeItem('store_deployment_draft')
}

/**
 * 提交审核
 */
export const submitForReview = async (data: StoreDeploymentForm): Promise<{
  success: boolean
  applicationId?: string
  message?: string
}> => {
  await delay(500)

  // 模拟提交成功
  const applicationId = `APP${Date.now()}`

  // 清除草稿
  localStorage.removeItem('store_deployment_draft')

  // 保存提交的数据到 localStorage（模拟后端存储）
  localStorage.setItem(`store_deployment_${applicationId}`, JSON.stringify({
    ...data,
    id: applicationId,
    submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
  }))

  return {
    success: true,
    applicationId,
    message: '提交成功'
  }
}

/**
 * 获取申请详情
 */
export const getApplicationDetail = async (id: string): Promise<StoreDeploymentForm | null> => {
  await delay()
  const dataStr = localStorage.getItem(`store_deployment_${id}`)
  if (dataStr) {
    try {
      return JSON.parse(dataStr)
    } catch (e) {
      console.error('Failed to parse application data:', e)
      return null
    }
  }
  return null
}

/**
 * 上传图片
 * @param file 图片文件
 * @returns 图片URL
 */
export const uploadImage = async (file: File): Promise<string> => {
  await delay(800)
  // 模拟上传成功，返回临时URL
  return URL.createObjectURL(file)
}

/**
 * 批量上传图片
 */
export const uploadImages = async (files: File[]): Promise<string[]> => {
  await delay(1000)
  return Promise.all(files.map(file => uploadImage(file)))
}

/**
 * 上传视频
 */
export const uploadVideo = async (file: File): Promise<{
  url: string
  duration: number
}> => {
  await delay(2000)
  // 模拟上传成功
  return {
    url: URL.createObjectURL(file),
    duration: 120 // 模拟视频时长（秒）
  }
}

/**
 * 删除图片
 */
export const deleteImage = async (url: string): Promise<void> => {
  await delay(200)
  // 模拟删除成功
  console.log('Deleted image:', url)
}

/**
 * 删除视频
 */
export const deleteVideo = async (url: string): Promise<void> => {
  await delay(200)
  // 模拟删除成功
  console.log('Deleted video:', url)
}

/**
 * 复制房型
 */
export const duplicateRoomType = async (roomType: RoomType): Promise<RoomType> => {
  await delay(300)
  // 创建副本，深拷贝images数组
  const duplicate: RoomType = {
    ...roomType,
    id: `room_${Date.now()}`,
    roomTypeName: `${roomType.roomTypeName}-副本`,
    images: [...(roomType.images || [])]  // 深拷贝图片数组
  }
  return duplicate
}

/**
 * 校验手机号是否已注册
 */
export const checkPhoneExists = async (phone: string): Promise<{
  exists: boolean
  message?: string
}> => {
  await delay(300)
  // 模拟校验
  if (phone === '13800138000') {
    return {
      exists: true,
      message: '该手机号已被注册'
    }
  }
  return {
    exists: false
  }
}

/**
 * 校验表单（提交前）
 */
export const validateForm = async (data: StoreDeploymentForm): Promise<{
  valid: boolean
  errors?: Array<{
    tab: string
    field: string
    message: string
  }>
}> => {
  await delay(200)

  const errors: Array<{ tab: string; field: string; message: string }> = []

  // Tab 1 校验
  if (!data.accountInfo.mainAccount) {
    errors.push({ tab: 'Tab1', field: 'mainAccount', message: '主账号未填写' })
  }
  if (!data.storeBasicInfo.storeName) {
    errors.push({ tab: 'Tab1', field: 'storeName', message: '门店名称未填写' })
  }
  if (data.storeBasicInfo.storeDescription.length < 200) {
    errors.push({ tab: 'Tab1', field: 'storeDescription', message: '门店介绍至少200字' })
  }

  // Tab 2 校验
  const facilitiesCount = Object.values(data.storeFacilities).reduce(
    (sum, arr) => sum + arr.length, 0
  )
  if (facilitiesCount === 0) {
    errors.push({ tab: 'Tab2', field: 'storeFacilities', message: '至少选择一项门店设施' })
  }

  if (data.surroundingInfo.transportation.length === 0) {
    errors.push({ tab: 'Tab2', field: 'transportation', message: '至少添加一条交通信息' })
  }
  if (data.surroundingInfo.attractions.length === 0) {
    errors.push({ tab: 'Tab2', field: 'attractions', message: '至少添加一条景点信息' })
  }
  if (data.surroundingInfo.food.length === 0) {
    errors.push({ tab: 'Tab2', field: 'food', message: '至少添加一条逛吃信息' })
  }

  // Tab 3 校验
  if (!data.operationPolicy.cancellationPolicy || data.operationPolicy.cancellationPolicy.length < 50) {
    errors.push({ tab: 'Tab3', field: 'cancellationPolicy', message: '取消政策至少50字' })
  }
  if (!data.operationPolicy.depositPolicy || data.operationPolicy.depositPolicy.length < 20) {
    errors.push({ tab: 'Tab3', field: 'depositPolicy', message: '押金政策至少20字' })
  }

  // Tab 4 校验
  if (data.storeDisplay.highlights.length < 3) {
    errors.push({ tab: 'Tab4', field: 'highlights', message: '门店亮点至少选择3项' })
  }
  if (!data.storeDisplay.images.logo) {
    errors.push({ tab: 'Tab4', field: 'logo', message: '门店logo未上传' })
  }
  if (!data.storeDisplay.images.listCover) {
    errors.push({ tab: 'Tab4', field: 'listCover', message: '列表页封面未上传' })
  }
  if (!data.storeDisplay.images.travelMap) {
    errors.push({ tab: 'Tab4', field: 'travelMap', message: '旅游交通图未上传' })
  }
  if (data.storeDisplay.images.homePageImages.length === 0) {
    errors.push({ tab: 'Tab4', field: 'homePageImages', message: '门店主页首图至少上传1张' })
  }

  // Tab 5 校验
  if (data.roomTypes.length === 0) {
    errors.push({ tab: 'Tab5', field: 'roomTypes', message: '至少配置一个房型' })
  }

  const totalRoomCount = data.roomTypes.reduce((sum, room) => sum + room.roomCount, 0)
  if (totalRoomCount !== data.storeBasicInfo.roomCount) {
    errors.push({
      tab: 'Tab5',
      field: 'roomCount',
      message: `房型总数为${totalRoomCount}间，但门店总房间数为${data.storeBasicInfo.roomCount}间，数量不一致`
    })
  }

  if (errors.length > 0) {
    return {
      valid: false,
      errors
    }
  }

  return {
    valid: true
  }
}

/**
 * 获取示例数据（用于开发测试）
 */
export const getExampleData = async (type: 'draft' | 'complete' | 'empty' = 'empty'): Promise<StoreDeploymentForm> => {
  await delay()
  switch (type) {
    case 'draft':
      return mockDraftData
    case 'complete':
      return mockCompleteData
    case 'empty':
    default:
      return mockEmptyFormData
  }
}
