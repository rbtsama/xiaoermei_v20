/**
 * 商户端 - VIP折扣 Mock 数据
 */

import type { VIPLevelDiscount, MerchantVIPDiscountConfig } from '../../types/vipDiscount.types'

/**
 * VIP等级折扣配置 Mock
 *
 * 业务规则：
 * - platformDiscount: 平台设定的会员折扣（只读，商户不可修改）
 * - weekdayDiscount: 商户设置的平日折扣（必须 <= platformDiscount）
 * - weekendDiscount: 商户设置的周末折扣（必须 <= platformDiscount）
 * - holidayDiscount: 商户设置的节假日折扣（必须 <= platformDiscount）
 * - 默认值：三种折扣 = platformDiscount（无额外优惠）
 */
export const mockVIPLevelDiscounts: VIPLevelDiscount[] = [
  {
    id: 'vip-discount-0',
    level: 0,
    levelName: 'VIP0',
    platformDiscount: 1.0,
    weekdayDiscount: 1.0,
    weekendDiscount: 1.0,
    holidayDiscount: 1.0,
    updatedAt: '2025-11-01 10:00:00',
  },
  {
    id: 'vip-discount-1',
    level: 1,
    levelName: 'VIP1',
    platformDiscount: 0.95,
    weekdayDiscount: 0.9,  // 平日更优惠5%
    weekendDiscount: 0.95, // 周末使用平台折扣
    holidayDiscount: 0.95, // 节假日使用平台折扣
    updatedAt: '2025-11-01 10:00:00',
  },
  {
    id: 'vip-discount-2',
    level: 2,
    levelName: 'VIP2',
    platformDiscount: 0.93,
    weekdayDiscount: 0.88, // 平日更优惠5%
    weekendDiscount: 0.93, // 周末使用平台折扣
    holidayDiscount: 0.93, // 节假日使用平台折扣
    updatedAt: '2025-11-01 10:00:00',
  },
  {
    id: 'vip-discount-3',
    level: 3,
    levelName: 'VIP3',
    platformDiscount: 0.9,
    weekdayDiscount: 0.85, // 平日更优惠5%
    weekendDiscount: 0.9,  // 周末使用平台折扣
    holidayDiscount: 0.9,  // 节假日使用平台折扣
    updatedAt: '2025-11-01 10:00:00',
  },
  {
    id: 'vip-discount-4',
    level: 4,
    levelName: 'VIP4',
    platformDiscount: 0.88,
    weekdayDiscount: 0.82, // 平日更优惠6%
    weekendDiscount: 0.88, // 周末使用平台折扣
    holidayDiscount: 0.88, // 节假日使用平台折扣
    updatedAt: '2025-11-01 10:00:00',
  },
  {
    id: 'vip-discount-5',
    level: 5,
    levelName: 'VIP5',
    platformDiscount: 0.85,
    weekdayDiscount: 0.8,  // 平日更优惠5%
    weekendDiscount: 0.85, // 周末使用平台折扣
    holidayDiscount: 0.85, // 节假日使用平台折扣
    updatedAt: '2025-11-01 10:00:00',
  },
  {
    id: 'vip-discount-6',
    level: 6,
    levelName: 'VIP6',
    platformDiscount: 0.82,
    weekdayDiscount: 0.75, // 平日更优惠7%
    weekendDiscount: 0.82, // 周末使用平台折扣
    holidayDiscount: 0.82, // 节假日使用平台折扣
    updatedAt: '2025-11-01 10:00:00',
  },
  {
    id: 'vip-discount-7',
    level: 7,
    levelName: 'VIP7',
    platformDiscount: 0.8,
    weekdayDiscount: 0.72, // 平日更优惠8%
    weekendDiscount: 0.8,  // 周末使用平台折扣
    holidayDiscount: 0.8,  // 节假日使用平台折扣
    updatedAt: '2025-11-01 10:00:00',
  },
  {
    id: 'vip-discount-8',
    level: 8,
    levelName: 'VIP8',
    platformDiscount: 0.75,
    weekdayDiscount: 0.68, // 平日更优惠7%
    weekendDiscount: 0.75, // 周末使用平台折扣
    holidayDiscount: 0.75, // 节假日使用平台折扣
    updatedAt: '2025-11-01 10:00:00',
  },
  {
    id: 'vip-discount-9',
    level: 9,
    levelName: 'VIP9',
    platformDiscount: 0.7,
    weekdayDiscount: 0.65, // 平日更优惠5%
    weekendDiscount: 0.7,  // 周末使用平台折扣
    holidayDiscount: 0.7,  // 节假日使用平台折扣
    updatedAt: '2025-11-01 10:00:00',
  },
]

/**
 * 商户VIP折扣配置 Mock
 */
export const mockMerchantVIPDiscountConfig: MerchantVIPDiscountConfig = {
  storeId: 'store-1',
  storeName: 'XX豪华酒店',
  discounts: mockVIPLevelDiscounts,
}
