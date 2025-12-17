/**
 * 选项配置 Mock 数据
 */

import { OptionItem, OptionCategory } from '@/types/optionsConfig'

// 门店亮点-建筑与景观
export const mockHighlightsArchitecture: OptionItem[] = [
  { id: '1', category: OptionCategory.HIGHLIGHTS_ARCHITECTURE, value: '老建筑', label: '老建筑', sort: 1, enabled: true, createdAt: '2025-01-01 10:00:00', updatedAt: '2025-01-01 10:00:00' },
  { id: '2', category: OptionCategory.HIGHLIGHTS_ARCHITECTURE, value: '特色民居', label: '特色民居', sort: 2, enabled: true, createdAt: '2025-01-01 10:00:00', updatedAt: '2025-01-01 10:00:00' },
  { id: '3', category: OptionCategory.HIGHLIGHTS_ARCHITECTURE, value: '大师设计', label: '大师设计', sort: 3, enabled: true, createdAt: '2025-01-01 10:00:00', updatedAt: '2025-01-01 10:00:00' },
  { id: '4', category: OptionCategory.HIGHLIGHTS_ARCHITECTURE, value: '家庭房', label: '家庭房', sort: 4, enabled: true, createdAt: '2025-01-01 10:00:00', updatedAt: '2025-01-01 10:00:00' },
  { id: '5', category: OptionCategory.HIGHLIGHTS_ARCHITECTURE, value: '庭院景', label: '庭院景', sort: 5, enabled: true, createdAt: '2025-01-01 10:00:00', updatedAt: '2025-01-01 10:00:00' },
  { id: '6', category: OptionCategory.HIGHLIGHTS_ARCHITECTURE, value: '江景', label: '江景', sort: 6, enabled: true, createdAt: '2025-01-01 10:00:00', updatedAt: '2025-01-01 10:00:00' },
  { id: '7', category: OptionCategory.HIGHLIGHTS_ARCHITECTURE, value: '河景', label: '河景', sort: 7, enabled: true, createdAt: '2025-01-01 10:00:00', updatedAt: '2025-01-01 10:00:00' },
  { id: '8', category: OptionCategory.HIGHLIGHTS_ARCHITECTURE, value: '湖景', label: '湖景', sort: 8, enabled: true, createdAt: '2025-01-01 10:00:00', updatedAt: '2025-01-01 10:00:00' }
]

// 门店亮点-服务与设施
export const mockHighlightsServices: OptionItem[] = [
  { id: '9', category: OptionCategory.HIGHLIGHTS_SERVICES, value: '免费停车', label: '免费停车', sort: 1, enabled: true, createdAt: '2025-01-01 10:00:00', updatedAt: '2025-01-01 10:00:00' },
  { id: '10', category: OptionCategory.HIGHLIGHTS_SERVICES, value: '收费停车', label: '收费停车', sort: 2, enabled: true, createdAt: '2025-01-01 10:00:00', updatedAt: '2025-01-01 10:00:00' },
  { id: '11', category: OptionCategory.HIGHLIGHTS_SERVICES, value: '充电车位', label: '充电车位', sort: 3, enabled: true, createdAt: '2025-01-01 10:00:00', updatedAt: '2025-01-01 10:00:00' },
  { id: '12', category: OptionCategory.HIGHLIGHTS_SERVICES, value: '免费接机站', label: '免费接机站', sort: 4, enabled: true, createdAt: '2025-01-01 10:00:00', updatedAt: '2025-01-01 10:00:00' }
]

// 门店设施-交通服务
export const mockTransportationFacilities: OptionItem[] = [
  { id: '101', category: OptionCategory.TRANSPORTATION, value: '免费停车', label: '免费停车', sort: 1, enabled: true, createdAt: '2025-01-01 10:00:00', updatedAt: '2025-01-01 10:00:00' },
  { id: '102', category: OptionCategory.TRANSPORTATION, value: '收费停车', label: '收费停车', sort: 2, enabled: true, createdAt: '2025-01-01 10:00:00', updatedAt: '2025-01-01 10:00:00' },
  { id: '103', category: OptionCategory.TRANSPORTATION, value: '免费接机站', label: '免费接机站', sort: 3, enabled: true, createdAt: '2025-01-01 10:00:00', updatedAt: '2025-01-01 10:00:00' }
]
