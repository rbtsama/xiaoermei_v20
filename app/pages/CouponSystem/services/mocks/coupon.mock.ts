/**
 * 优惠券系统 Mock 数据
 */

import type { CouponConfig, IssueRecord, UserCoupon } from '../../types/coupon.types'
import { CouponType, CouponStatus, IssueChannel, VerifyStatus } from '../../types/coupon.types'

// ==================== 优惠券配置 ====================

export const mockCouponConfigs: CouponConfig[] = [
  {
    couponId: 'CPN_001',
    couponName: '新人专享券-满200减30',
    couponType: CouponType.FULL_REDUCTION,
    threshold: 200,
    reductionAmount: 30,
    validDays: 30,
    stackWithPoints: true,
    stackWithMemberDiscount: false,
    limitedCities: [],
    limitedHotels: [],
    totalCount: 10000,
    issuedCount: 3580,
    usedCount: 1256,
    status: CouponStatus.ACTIVE,
    createdAt: '01/01/25 10:00:00',
    createdBy: '运营-李经理'
  },
  {
    couponId: 'CPN_002',
    couponName: '周末特惠-8.5折',
    couponType: CouponType.DISCOUNT,
    discountRate: 85,
    validDays: 7,
    stackWithPoints: true,
    stackWithMemberDiscount: true,
    limitedCities: ['上海', '北京', '杭州'],
    limitedHotels: [],
    totalCount: 5000,
    issuedCount: 4200,
    usedCount: 2850,
    status: CouponStatus.ACTIVE,
    createdAt: '01/10/25 09:00:00',
    createdBy: '运营-李经理'
  },
  {
    couponId: 'CPN_003',
    couponName: '立减50元券',
    couponType: CouponType.DIRECT_REDUCTION,
    directAmount: 50,
    validDays: 60,
    stackWithPoints: false,
    stackWithMemberDiscount: false,
    limitedCities: [],
    limitedHotels: [],
    totalCount: 2000,
    issuedCount: 1850,
    usedCount: 980,
    status: CouponStatus.ACTIVE,
    createdAt: '12/20/24 10:00:00',
    createdBy: '运营-王主管'
  }
]

// ==================== 发放记录 ====================

export const mockIssueRecords: IssueRecord[] = [
  {
    recordId: 'ISS_20250115001',
    couponId: 'CPN_001',
    couponName: '新人专享券-满200减30',
    channel: IssueChannel.NEW_USER,
    count: 350,
    issuedAt: '01/15/25 00:00:00',
    operatorName: '系统自动'
  },
  {
    recordId: 'ISS_20250114002',
    couponId: 'CPN_002',
    couponName: '周末特惠-8.5折',
    channel: IssueChannel.ACTIVITY,
    count: 1000,
    issuedAt: '01/14/25 10:00:00',
    operatorName: '运营-李经理'
  },
  {
    recordId: 'ISS_20250110003',
    couponId: 'CPN_003',
    couponName: '立减50元券',
    channel: IssueChannel.MANUAL,
    count: 50,
    targetUsers: ['张经理', '李女士', '陈总'],
    issuedAt: '01/10/25 14:30:00',
    operatorName: '客服-王小美'
  }
]

// ==================== 用户优惠券（核销记录） ====================

export const mockUserCoupons: UserCoupon[] = [
  {
    userCouponId: 'UC_001',
    userId: 'UID_2025001',
    userName: '张经理',
    couponId: 'CPN_001',
    couponName: '新人专享券-满200减30',
    couponType: CouponType.FULL_REDUCTION,
    discountAmount: '满200减30',
    receivedAt: '01/15/25 10:00:00',
    expireAt: '02/14/25 23:59:59',
    status: VerifyStatus.USED,
    usedAt: '01/16/25 14:30:00',
    orderId: 'ORD_20250116001'
  },
  {
    userCouponId: 'UC_002',
    userId: 'UID_2025128',
    userName: '李女士',
    couponId: 'CPN_002',
    couponName: '周末特惠-8.5折',
    couponType: CouponType.DISCOUNT,
    discountAmount: '8.5折',
    receivedAt: '01/14/25 11:00:00',
    expireAt: '01/21/25 23:59:59',
    status: VerifyStatus.UNUSED,
  },
  {
    userCouponId: 'UC_003',
    userId: 'UID_2024888',
    userName: '陈总',
    couponId: 'CPN_003',
    couponName: '立减50元券',
    couponType: CouponType.DIRECT_REDUCTION,
    discountAmount: '立减50元',
    receivedAt: '12/25/24 10:00:00',
    expireAt: '12/31/24 23:59:59',
    status: VerifyStatus.EXPIRED
  }
]

// ==================== 标签映射 ====================

export const couponTypeLabels: Record<CouponType, string> = {
  [CouponType.FULL_REDUCTION]: '满减券',
  [CouponType.DISCOUNT]: '折扣券',
  [CouponType.DIRECT_REDUCTION]: '立减券'
}

export const couponStatusLabels: Record<CouponStatus, string> = {
  [CouponStatus.DRAFT]: '草稿',
  [CouponStatus.ACTIVE]: '进行中',
  [CouponStatus.ENDED]: '已结束'
}

export const issueChannelLabels: Record<IssueChannel, string> = {
  [IssueChannel.MANUAL]: '手动发放',
  [IssueChannel.NEW_USER]: '新人注册',
  [IssueChannel.MEMBER_UPGRADE]: '会员升级',
  [IssueChannel.ACTIVITY]: '活动发放'
}

export const verifyStatusLabels: Record<VerifyStatus, string> = {
  [VerifyStatus.UNUSED]: '未使用',
  [VerifyStatus.USED]: '已使用',
  [VerifyStatus.EXPIRED]: '已过期'
}
