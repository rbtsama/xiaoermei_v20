/**
 * 选项配置相关类型定义
 */

// 配置项类型
export enum OptionCategory {
  HIGHLIGHTS_ARCHITECTURE = 'highlights_architecture',  // 门店亮点-建筑与景观
  HIGHLIGHTS_SERVICES = 'highlights_services',          // 门店亮点-服务与设施
  TRANSPORTATION = 'transportation',                    // 门店设施-交通服务
  CLEANING = 'cleaning',                                // 门店设施-清洁服务
  SECURITY = 'security',                                // 门店设施-安全安保
  PUBLIC_AREA = 'public_area',                          // 门店设施-公共区域
  FRONT_DESK = 'front_desk',                            // 门店设施-前台服务
  ENTERTAINMENT = 'entertainment',                      // 门店设施-娱乐设施
  CATERING = 'catering',                                // 门店设施-餐饮服务
  BUSINESS = 'business',                                // 门店设施-商务设施
  CHILDREN = 'children',                                // 门店设施-儿童设施
  SPORTS = 'sports',                                    // 门店设施-运动设施
  WELLNESS = 'wellness',                                // 门店设施-康养设施
  ACCESSIBILITY = 'accessibility'                       // 门店设施-无障碍设施
}

// 配置项
export interface OptionItem {
  id: string
  category: OptionCategory
  value: string          // 选项值
  label: string          // 显示文本
  sort: number           // 排序
  enabled: boolean       // 是否启用
  createdAt: string
  updatedAt: string
}

// 配置分组
export interface OptionGroup {
  category: OptionCategory
  categoryName: string
  description: string
  items: OptionItem[]
  count: number
}
