/**
 * 通知系统 Mock 数据
 */

import type {
  NotificationItem,
  OrderChangeNotification,
  NotificationRecord,
  MerchantInfo
} from '@/types/notification'
import {
  NotificationStatus,
  OrderChangeType
} from '@/types/notification'

/**
 * 商户端收到的通知列表
 */
export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '系统维护通知',
    content: '平台将于2026年1月10日凌晨2:00-4:00进行系统维护，期间可能影响部分功能使用，请提前做好准备。',
    requireAgreement: false,
    status: NotificationStatus.UNREAD,
    createdAt: '2026-01-07 10:30:00'
  },
  {
    id: 'notif-2',
    title: '服务协议更新',
    content: '平台服务协议已更新，请仔细阅读并同意最新版本的服务协议，以便继续使用平台服务。',
    requireAgreement: true,
    status: NotificationStatus.UNREAD,
    createdAt: '2026-01-06 15:20:00'
  },
  {
    id: 'notif-3',
    title: '完善门店信息',
    content: '您的门店信息尚未完善，请尽快补充门店照片和描述，以提升曝光率。',
    requireAgreement: false,
    link: '/merchant-backend/join-application/apply',
    status: NotificationStatus.UNREAD,
    createdAt: '2026-01-05 09:15:00'
  },
  {
    id: 'notif-4',
    title: '春节营销活动',
    content: '平台将于1月20日启动春节营销活动，现已开放报名，参与活动可获得流量扶持和优惠券支持。',
    requireAgreement: false,
    status: NotificationStatus.READ,
    createdAt: '2026-01-04 14:00:00'
  },
  {
    id: 'notif-5',
    title: '隐私政策更新',
    content: '根据最新法律法规要求，平台隐私政策已更新，请仔细阅读并同意。',
    requireAgreement: true,
    status: NotificationStatus.AGREED,
    createdAt: '2026-01-03 11:30:00'
  },
  {
    id: 'notif-6',
    title: '配置支付结算信息',
    content: '检测到您尚未配置支付结算信息，请尽快完成配置以便正常收款。',
    requireAgreement: false,
    link: '/merchant-backend/join-application/apply',
    status: NotificationStatus.READ,
    createdAt: '2026-01-02 16:45:00'
  }
]

/**
 * 订单变化通知列表
 */
export const mockOrderChangeNotifications: OrderChangeNotification[] = [
  {
    id: 'order-change-1',
    type: OrderChangeType.NEW_ORDER,
    orderNo: '20251205100880',
    guestNames: '王五',
    guestPhone: '18100030003',
    checkInDate: '2025-12-08',
    checkOutDate: '2025-12-09',
    nights: 1,
    roomType: '竹林大床房【1号院】',
    totalAmount: 493,
    createdAt: '2025-12-05 16:38:55'
  },
  {
    id: 'order-change-2',
    type: OrderChangeType.ORDER_CANCELLED,
    orderNo: '20251205100696',
    guestNames: '赵六',
    guestPhone: '16600040004',
    checkInDate: '2025-12-10',
    checkOutDate: '2025-12-11',
    nights: 1,
    roomType: '景观双床房【1号院】',
    totalAmount: 578,
    createdAt: '2025-12-05 16:31:13'
  }
]

/**
 * 平台后台历史发送记录
 */
export const mockNotificationRecords: NotificationRecord[] = [
  {
    id: 'record-1',
    content: '平台将于2026年1月10日凌晨2:00-4:00进行系统维护，期间可能影响部分功能使用，请提前做好准备。',
    requireAgreement: false,
    merchantList: ['原乡芦茨', '云栖山居', '溪山行旅', '桐庐山庄', '富春江畔'],
    merchantCount: 5,
    senderName: '张管理员',
    sentAt: '2026-01-07 10:30:00'
  },
  {
    id: 'record-2',
    content: '平台服务协议已更新，请仔细阅读并同意最新版本的服务协议，以便继续使用平台服务。',
    requireAgreement: true,
    merchantList: ['原乡芦茨', '云栖山居', '溪山行旅'],
    merchantCount: 3,
    senderName: '李运营',
    sentAt: '2026-01-06 15:20:00'
  },
  {
    id: 'record-3',
    content: '您的门店信息尚未完善，请尽快补充门店照片和描述，以提升曝光率。',
    requireAgreement: false,
    link: '/merchant-backend/join-application/apply',
    merchantList: ['原乡芦茨', '桐庐山庄'],
    merchantCount: 2,
    senderName: '王运营',
    sentAt: '2026-01-05 09:15:00'
  },
  {
    id: 'record-4',
    content: '平台将于1月20日启动春节营销活动，现已开放报名，参与活动可获得流量扶持和优惠券支持。',
    requireAgreement: false,
    merchantList: ['原乡芦茨', '云栖山居', '溪山行旅', '桐庐山庄', '富春江畔', '山水间', '竹林小筑', '梅岭客栈'],
    merchantCount: 8,
    senderName: '张管理员',
    sentAt: '2026-01-04 14:00:00'
  },
  {
    id: 'record-5',
    content: '根据最新法律法规要求，平台隐私政策已更新，请仔细阅读并同意。',
    requireAgreement: true,
    merchantList: ['原乡芦茨', '云栖山居', '溪山行旅', '桐庐山庄', '富春江畔', '山水间'],
    merchantCount: 6,
    senderName: '李运营',
    sentAt: '2026-01-03 11:30:00'
  }
]

/**
 * 商户信息列表（用于选择发送对象）
 */
export const mockMerchantList: MerchantInfo[] = [
  {
    id: 'merchant-1',
    storeName: '原乡芦茨',
    mainAccount: '13575481983',
    onlineTime: '2025-12-15 10:00:00'
  },
  {
    id: 'merchant-2',
    storeName: '云栖山居',
    mainAccount: '13812345678',
    onlineTime: '2025-12-10 14:30:00'
  },
  {
    id: 'merchant-3',
    storeName: '溪山行旅',
    mainAccount: '13698745632',
    onlineTime: '2025-12-05 09:20:00'
  },
  {
    id: 'merchant-4',
    storeName: '桐庐山庄',
    mainAccount: '13523456789',
    onlineTime: '2025-11-28 16:45:00'
  },
  {
    id: 'merchant-5',
    storeName: '富春江畔',
    mainAccount: '15912345678',
    onlineTime: '2025-11-20 11:00:00'
  },
  {
    id: 'merchant-6',
    storeName: '山水间',
    mainAccount: '13787654321',
    onlineTime: '2025-11-15 13:30:00'
  },
  {
    id: 'merchant-7',
    storeName: '竹林小筑',
    mainAccount: '13665432187',
    onlineTime: '2025-11-08 15:20:00'
  },
  {
    id: 'merchant-8',
    storeName: '梅岭客栈',
    mainAccount: '18756432109',
    onlineTime: '2025-10-30 10:15:00'
  }
]
