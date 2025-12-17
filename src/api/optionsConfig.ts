/**
 * 选项配置 API
 *
 * 核心功能：
 * 1. 管理门店亮点和设施的枚举选项
 * 2. 提供选项的增删改查接口
 * 3. 实现平台配置→商户端实时联动
 *
 * 联动机制：
 * - 平台修改选项后，通过CustomEvent通知商户端
 * - 商户端监听事件，自动重新加载选项
 * - 使用localStorage作为临时存储（生产环境应使用后端API）
 */

import { OptionCategory } from '@/types/optionsConfig'

// 模拟延迟
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

// 选项配置数据存储（使用localStorage模拟后端）
const STORAGE_KEY = 'platform_options_config'

/**
 * 获取所有选项配置
 */
export const getAllOptions = async () => {
  await delay(100)
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : null
}

/**
 * 获取指定分类的选项
 */
export const getCategoryOptions = async (category: OptionCategory | string) => {
  await delay(50)
  const allOptions = await getAllOptions()
  return allOptions?.[category] || []
}

/**
 * 保存指定分类的选项
 */
export const saveCategoryOptions = async (category: string, options: any[]) => {
  await delay(100)
  const allOptions = (await getAllOptions()) || {}
  allOptions[category] = options
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allOptions))

  // 触发自定义事件，通知其他页面选项已更新
  window.dispatchEvent(new CustomEvent('optionsConfigUpdated', {
    detail: { category, options }
  }))
}

/**
 * 初始化选项配置（从storeDeployment.ts的常量初始化）
 */
export const initializeOptions = async (initialData: any) => {
  await delay(100)
  const existing = await getAllOptions()
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData))
  }
}
