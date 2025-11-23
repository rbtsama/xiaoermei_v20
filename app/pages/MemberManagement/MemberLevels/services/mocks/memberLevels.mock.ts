import type { MemberLevel } from '../../types/memberLevels.types'

// 模拟会员等级数据
export const mockMemberLevelsData: MemberLevel[] = [
  {
    id: '1',
    isDefault: true,
    levelName: '注册会员',
    upgradeCondition: '注册即享',
    levelBenefits: '基础积分权益',
    validityPeriod: '永久',
    requiredNights: 0,
    discountRangeMin: 0,
    discountRangeMax: 0,
    discountPercentage: 0,
    pointsEarnRatio: 1, // 1元=1积分
    upgradeGiftSets: 0,
    status: 'active',
    createdAt: '2025-01-01 00:00:00'
  },
  {
    id: '2',
    isDefault: false,
    levelName: 'VIP1',
    upgradeCondition: '预订1次及以上',
    levelBenefits: '享受订房折扣、额外积分奖励',
    validityPeriod: '2年',
    requiredNights: 1,
    requiredAmount: 500,
    discountRangeMin: 80,
    discountRangeMax: 95,
    discountPercentage: 90, // 9折
    pointsEarnRatio: 1.2, // 1元=1.2积分
    upgradeGiftSets: 1,
    status: 'active',
    createdAt: '2025-01-05 10:00:00',
    updatedAt: '2025-01-10 14:30:00'
  },
  {
    id: '3',
    isDefault: false,
    levelName: 'VIP2',
    upgradeCondition: '预订5次及以上',
    levelBenefits: '更高折扣、双倍积分、优先预订',
    validityPeriod: '2年',
    requiredNights: 5,
    requiredAmount: 2000,
    discountRangeMin: 75,
    discountRangeMax: 90,
    discountPercentage: 85, // 8.5折
    pointsEarnRatio: 2, // 1元=2积分
    upgradeGiftSets: 2,
    status: 'active',
    createdAt: '2025-01-05 10:05:00',
    updatedAt: '2025-01-10 14:35:00'
  },
  {
    id: '4',
    isDefault: false,
    levelName: 'VIP3',
    upgradeCondition: '预订10次及以上',
    levelBenefits: '最高折扣、三倍积分、专属客服、免费升级',
    validityPeriod: '2年',
    requiredNights: 10,
    requiredAmount: 5000,
    discountRangeMin: 65,
    discountRangeMax: 85,
    discountPercentage: 80, // 8折
    pointsEarnRatio: 3, // 1元=3积分
    upgradeGiftSets: 3,
    status: 'active',
    createdAt: '2025-01-05 10:10:00',
    updatedAt: '2025-01-10 14:40:00'
  }
]
