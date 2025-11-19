/**
 * 会员体系 Mock 数据
 * 参考：万豪Bonvoy、华住会、希尔顿荣誉客会
 */

import type { MemberLevel, MemberBenefit } from '../../types/member.types'
import { MemberLevelStatus, BenefitType } from '../../types/member.types'

// ==================== 会员等级配置（0-9共10个等级） ====================

export const mockMemberLevels: MemberLevel[] = [
  {
    level: 0,
    internalName: 'LEVEL_0',
    externalName: '注册会员',
    validityYears: 1,
    upgradeNights: 0,
    maintainNights: 0,
    pointsMultiplier: 1.0,
    minDiscount: 100,
    cardCoverImage: '/cards/level0.jpg',
    cardBgColor: '#E5E7EB',
    trialCardCount: 0,
    trialCardDays: 0,
    price: 0,
    originalPrice: 0,
    promotionPrice: 0,
    status: MemberLevelStatus.ONLINE,
    createdAt: '01/01/24 00:00:00'
  },
  {
    level: 1,
    internalName: 'LEVEL_1',
    externalName: '银卡会员',
    validityYears: 1,
    upgradeNights: 5,
    maintainNights: 3,
    pointsMultiplier: 1.1,
    minDiscount: 98,
    cardCoverImage: '/cards/level1.jpg',
    cardBgColor: '#C0C0C0',
    trialCardCount: 3,
    trialCardDays: 7,
    price: 88,
    originalPrice: 128,
    promotionPrice: 68,
    status: MemberLevelStatus.ONLINE,
    createdAt: '01/01/24 00:00:00'
  },
  {
    level: 2,
    internalName: 'LEVEL_2',
    externalName: '金卡会员',
    validityYears: 1,
    upgradeNights: 10,
    maintainNights: 8,
    pointsMultiplier: 1.2,
    minDiscount: 95,
    cardCoverImage: '/cards/level2.jpg',
    cardBgColor: '#FFD700',
    trialCardCount: 5,
    trialCardDays: 15,
    price: 188,
    originalPrice: 298,
    promotionPrice: 158,
    status: MemberLevelStatus.ONLINE,
    createdAt: '01/01/24 00:00:00'
  },
  {
    level: 3,
    internalName: 'LEVEL_3',
    externalName: '白金会员',
    validityYears: 1,
    upgradeNights: 20,
    maintainNights: 15,
    pointsMultiplier: 1.3,
    minDiscount: 92,
    cardCoverImage: '/cards/level3.jpg',
    cardBgColor: '#E5E4E2',
    trialCardCount: 8,
    trialCardDays: 30,
    price: 388,
    originalPrice: 598,
    promotionPrice: 298,
    status: MemberLevelStatus.ONLINE,
    createdAt: '01/01/24 00:00:00'
  },
  {
    level: 4,
    internalName: 'LEVEL_4',
    externalName: '钻石会员',
    validityYears: 2,
    upgradeNights: 35,
    maintainNights: 25,
    pointsMultiplier: 1.4,
    minDiscount: 90,
    cardCoverImage: '/cards/level4.jpg',
    cardBgColor: '#B9F2FF',
    trialCardCount: 10,
    trialCardDays: 30,
    price: 688,
    originalPrice: 998,
    promotionPrice: 588,
    status: MemberLevelStatus.ONLINE,
    createdAt: '01/01/24 00:00:00'
  },
  {
    level: 5,
    internalName: 'LEVEL_5',
    externalName: '黑金会员',
    validityYears: 2,
    upgradeNights: 50,
    maintainNights: 35,
    pointsMultiplier: 1.5,
    minDiscount: 88,
    cardCoverImage: '/cards/level5.jpg',
    cardBgColor: '#1C1C1C',
    trialCardCount: 15,
    trialCardDays: 60,
    price: 1288,
    originalPrice: 1998,
    promotionPrice: 988,
    status: MemberLevelStatus.ONLINE,
    createdAt: '01/01/24 00:00:00'
  },
  {
    level: 6,
    internalName: 'LEVEL_6',
    externalName: '至尊会员',
    validityYears: 2,
    upgradeNights: 75,
    maintainNights: 50,
    pointsMultiplier: 1.6,
    minDiscount: 85,
    cardCoverImage: '/cards/level6.jpg',
    cardBgColor: '#8B4513',
    trialCardCount: 20,
    trialCardDays: 90,
    price: 2888,
    originalPrice: 4998,
    promotionPrice: 1888,
    status: MemberLevelStatus.ONLINE,
    createdAt: '01/01/24 00:00:00'
  },
  {
    level: 7,
    internalName: 'LEVEL_7',
    externalName: '荣耀会员',
    validityYears: 3,
    upgradeNights: 100,
    maintainNights: 75,
    pointsMultiplier: 1.75,
    minDiscount: 82,
    cardCoverImage: '/cards/level7.jpg',
    cardBgColor: '#9370DB',
    trialCardCount: 25,
    trialCardDays: 120,
    price: 5888,
    originalPrice: 9998,
    promotionPrice: 3888,
    status: MemberLevelStatus.ONLINE,
    createdAt: '01/01/24 00:00:00'
  },
  {
    level: 8,
    internalName: 'LEVEL_8',
    externalName: '传奇会员',
    validityYears: 3,
    upgradeNights: 150,
    maintainNights: 100,
    pointsMultiplier: 1.85,
    minDiscount: 80,
    cardCoverImage: '/cards/level8.jpg',
    cardBgColor: '#FF6347',
    trialCardCount: 30,
    trialCardDays: 180,
    price: 9888,
    originalPrice: 19998,
    promotionPrice: 6888,
    status: MemberLevelStatus.ONLINE,
    createdAt: '01/01/24 00:00:00'
  },
  {
    level: 9,
    internalName: 'LEVEL_9',
    externalName: '终身会员',
    validityYears: 99,
    upgradeNights: 200,
    maintainNights: 0,
    pointsMultiplier: 2.0,
    minDiscount: 75,
    cardCoverImage: '/cards/level9.jpg',
    cardBgColor: '#FFD700',
    trialCardCount: 50,
    trialCardDays: 365,
    price: 29888,
    originalPrice: 59998,
    promotionPrice: 19888,
    status: MemberLevelStatus.ONLINE,
    createdAt: '01/01/24 00:00:00'
  }
]

// ==================== 会员权益配置 ====================

export const mockMemberBenefits: MemberBenefit[] = [
  {
    benefitId: 'BEN_001',
    applicableLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    benefitType: BenefitType.POINTS_MULTIPLIER,
    benefitName: '积分加成',
    description: '入住消费获得额外积分',
    benefitContent: JSON.stringify({
      description: '根据会员等级获得1.1倍-2.0倍积分'
    }),
    isActive: true,
    createdAt: '01/01/24 00:00:00',
    createdBy: '运营-李经理'
  },
  {
    benefitId: 'BEN_002',
    applicableLevels: [3, 4, 5, 6, 7, 8, 9],
    benefitType: BenefitType.LATE_CHECKOUT,
    benefitName: '延迟退房',
    description: '免费延迟退房至下午2点',
    benefitContent: JSON.stringify({
      checkoutTime: '14:00',
      description: '白金及以上会员享受延迟退房'
    }),
    isActive: true,
    createdAt: '01/01/24 00:00:00',
    createdBy: '运营-李经理'
  },
  {
    benefitId: 'BEN_003',
    applicableLevels: [4, 5, 6, 7, 8, 9],
    benefitType: BenefitType.FREE_UPGRADE,
    benefitName: '免费升房',
    description: '入住时免费升级房型（视房态）',
    benefitContent: JSON.stringify({
      upgradeType: '同等价位高一档房型',
      condition: '视当日房态而定'
    }),
    isActive: true,
    createdAt: '01/01/24 00:00:00',
    createdBy: '运营-李经理'
  },
  {
    benefitId: 'BEN_004',
    applicableLevels: [6, 7, 8, 9],
    benefitType: BenefitType.VIP_SERVICE,
    benefitName: '专属客服',
    description: '7×24小时专属客服热线',
    benefitContent: JSON.stringify({
      serviceHotline: '400-888-6666',
      description: '至尊及以上会员专属'
    }),
    isActive: true,
    createdAt: '01/01/24 00:00:00',
    createdBy: '运营-李经理'
  },
  {
    benefitId: 'BEN_005',
    applicableLevels: [9],
    benefitType: BenefitType.WELCOME_GIFT,
    benefitName: '欢迎礼',
    description: '入住时赠送欢迎礼品',
    benefitContent: JSON.stringify({
      gift: '水果拼盘+红酒',
      description: '终身会员专属'
    }),
    isActive: true,
    createdAt: '01/01/24 00:00:00',
    createdBy: '运营-李经理'
  }
]

// ==================== 状态标签 ====================

export const memberLevelStatusLabels: Record<MemberLevelStatus, string> = {
  [MemberLevelStatus.ONLINE]: '上线',
  [MemberLevelStatus.OFFLINE]: '下线'
}

export const benefitTypeLabels: Record<BenefitType, string> = {
  [BenefitType.POINTS_MULTIPLIER]: '积分加成',
  [BenefitType.DISCOUNT]: '折扣优惠',
  [BenefitType.FREE_UPGRADE]: '免费升房',
  [BenefitType.LATE_CHECKOUT]: '延迟退房',
  [BenefitType.WELCOME_GIFT]: '欢迎礼',
  [BenefitType.VIP_SERVICE]: '专属客服',
  [BenefitType.PRIORITY_BOOKING]: '优先预订'
}
