/**
 * 门店列表 Mock 数据
 * 用于活动管理中的门店选择功能
 */

export interface Store {
  id: string
  name: string
  pinyin: string  // 拼音，用于排序
}

/**
 * Mock门店列表（按拼音排序）
 * 共10个门店
 */
export const mockStores: Store[] = [
  { id: 'store-001', name: '山及云', pinyin: 'shanjiyun' },
  { id: 'store-002', name: '山水间客栈', pinyin: 'shanshuijiankezhan' },
  { id: 'store-003', name: '溪山行旅', pinyin: 'xishanxinglv' },
  { id: 'store-004', name: '原乡芦茨', pinyin: 'yuanxiangluci' },
  { id: 'store-005', name: '云栖山居', pinyin: 'yunqishanju' },
  { id: 'store-006', name: '竹里馆', pinyin: 'zhuliguan' },
  { id: 'store-007', name: '半山民宿', pinyin: 'banshanminsu' },
  { id: 'store-008', name: '桂花树下', pinyin: 'guihuashuxia' },
  { id: 'store-009', name: '江南小筑', pinyin: 'jiangnanxiaozhu' },
  { id: 'store-010', name: '悦溪居', pinyin: 'yuexiju' }
].sort((a, b) => a.pinyin.localeCompare(b.pinyin))

/**
 * 根据ID数组获取门店名称列表
 */
export function getStoreNamesByIds(storeIds: string[]): string[] {
  return storeIds
    .map(id => mockStores.find(s => s.id === id)?.name)
    .filter(Boolean) as string[]
}

/**
 * 获取所有门店（按拼音排序）
 */
export function getAllStores(): Store[] {
  return mockStores
}
