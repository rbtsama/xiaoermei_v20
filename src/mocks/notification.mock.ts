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
  NotificationType,
  NotificationStatus,
  OrderChangeType
} from '@/types/notification'

/**
 * 商户端收到的通知列表
 */
export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    type: NotificationType.NOTIFICATION,
    title: '系统维护通知',
    content: '平台将于2026年1月10日凌晨2:00-4:00进行系统维护，期间可能影响部分功能使用，请提前做好准备。',
    status: NotificationStatus.UNREAD,
    createdAt: '2026-01-07 10:30:00'
  },
  {
    id: 'notif-2',
    type: NotificationType.AGREEMENT_REQUIRED,
    title: '服务协议更新',
    content: '平台服务协议已更新，请仔细阅读并同意最新版本的服务协议，以便继续使用平台服务。',
    status: NotificationStatus.UNREAD,
    createdAt: '2026-01-06 15:20:00'
  },
  {
    id: 'notif-3',
    type: NotificationType.TASK,
    title: '完善门店信息',
    content: '您的门店信息尚未完善，请尽快补充门店照片和描述，以提升曝光率。',
    link: '/merchant-backend/store-config',
    status: NotificationStatus.UNREAD,
    createdAt: '2026-01-05 09:15:00'
  },
  {
    id: 'notif-4',
    type: NotificationType.NOTIFICATION,
    title: '春节营销活动',
    content: '平台将于1月20日启动春节营销活动，现已开放报名，参与活动可获得流量扶持和优惠券支持。',
    status: NotificationStatus.READ,
    createdAt: '2026-01-04 14:00:00'
  },
  {
    id: 'notif-5',
    type: NotificationType.AGREEMENT_REQUIRED,
    title: '隐私政策更新',
    content: '根据最新法律法规要求，平台隐私政策已更新，请仔细阅读并同意。',
    status: NotificationStatus.AGREED,
    createdAt: '2026-01-03 11:30:00'
  },
  {
    id: 'notif-6',
    type: NotificationType.TASK,
    title: '配置支付结算信息',
    content: '检测到您尚未配置支付结算信息，请尽快完成配置以便正常收款。',
    link: '/merchant-backend/store-config',
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
    orderNo: '20260107153022',
    guestNames: '钱晨，陈红',
    guestPhone: '15606122015',
    checkInDate: '2026-01-10',
    checkOutDate: '2026-01-13',
    nights: 3,
    roomType: '豪华大床房',
    totalAmount: 1833.24,
    createdAt: '2026-01-07 15:30:22'
  },
  {
    id: 'order-change-2',
    type: OrderChangeType.ORDER_CANCELLED,
    orderNo: '20260107142015',
    guestNames: '张伟',
    guestPhone: '13812345678',
    checkInDate: '2026-01-12',
    checkOutDate: '2026-01-14',
    nights: 2,
    roomType: '标准双床房',
    totalAmount: 980.00,
    createdAt: '2026-01-07 14:20:15'
  },
  {
    id: 'order-change-3',
    type: OrderChangeType.NEW_ORDER,
    orderNo: '20260107131045',
    guestNames: '李明，王芳，李小宝',
    guestPhone: '13698745632',
    checkInDate: '2026-01-15',
    checkOutDate: '2026-01-17',
    nights: 2,
    roomType: '家庭套房',
    totalAmount: 2580.00,
    createdAt: '2026-01-07 13:10:45'
  },
  {
    id: 'order-change-4',
    type: OrderChangeType.NEW_ORDER,
    orderNo: '20260107105530',
    guestNames: '赵敏',
    guestPhone: '18756432109',
    checkInDate: '2026-01-08',
    checkOutDate: '2026-01-11',
    nights: 3,
    roomType: '豪华大床房',
    totalAmount: 1950.00,
    createdAt: '2026-01-07 10:55:30'
  },
  {
    id: 'order-change-5',
    type: OrderChangeType.ORDER_CANCELLED,
    orderNo: '20260107092018',
    guestNames: '孙琳',
    guestPhone: '13523456789',
    checkInDate: '2026-01-09',
    checkOutDate: '2026-01-10',
    nights: 1,
    roomType: '标准大床房',
    totalAmount: 580.00,
    createdAt: '2026-01-07 09:20:18'
  },
  {
    id: 'order-change-6',
    type: OrderChangeType.NEW_ORDER,
    orderNo: '20260106183540',
    guestNames: '周杰，林心如',
    guestPhone: '15912345678',
    checkInDate: '2026-01-20',
    checkOutDate: '2026-01-25',
    nights: 5,
    roomType: '蜜月套房',
    totalAmount: 4680.00,
    createdAt: '2026-01-06 18:35:40'
  },
  {
    id: 'order-change-7',
    type: OrderChangeType.NEW_ORDER,
    orderNo: '20260106161022',
    guestNames: '吴彦祖',
    guestPhone: '13787654321',
    checkInDate: '2026-01-11',
    checkOutDate: '2026-01-12',
    nights: 1,
    roomType: '商务单间',
    totalAmount: 680.00,
    createdAt: '2026-01-06 16:10:22'
  },
  {
    id: 'order-change-8',
    type: OrderChangeType.ORDER_CANCELLED,
    orderNo: '20260106143015',
    guestNames: '刘德华，朱丽倩',
    guestPhone: '13665432187',
    checkInDate: '2026-01-18',
    checkOutDate: '2026-01-22',
    nights: 4,
    roomType: '总统套房',
    totalAmount: 8800.00,
    createdAt: '2026-01-06 14:30:15'
  }
]

/**
 * 平台后台历史发送记录
 */
export const mockNotificationRecords: NotificationRecord[] = [
  {
    id: 'record-1',
    type: NotificationType.NOTIFICATION,
    content: '平台将于2026年1月10日凌晨2:00-4:00进行系统维护，期间可能影响部分功能使用，请提前做好准备。',
    merchantList: ['原乡芦茨', '云栖山居', '溪山行旅', '桐庐山庄', '富春江畔'],
    merchantCount: 5,
    senderName: '张管理员',
    sentAt: '2026-01-07 10:30:00'
  },
  {
    id: 'record-2',
    type: NotificationType.AGREEMENT_REQUIRED,
    content: '平台服务协议已更新，请仔细阅读并同意最新版本的服务协议，以便继续使用平台服务。',
    merchantList: ['原乡芦茨', '云栖山居', '溪山行旅'],
    merchantCount: 3,
    senderName: '李运营',
    sentAt: '2026-01-06 15:20:00'
  },
  {
    id: 'record-3',
    type: NotificationType.TASK,
    content: '您的门店信息尚未完善，请尽快补充门店照片和描述，以提升曝光率。',
    link: '/merchant-backend/store-config',
    merchantList: ['原乡芦茨', '桐庐山庄'],
    merchantCount: 2,
    senderName: '王运营',
    sentAt: '2026-01-05 09:15:00'
  },
  {
    id: 'record-4',
    type: NotificationType.NOTIFICATION,
    content: '平台将于1月20日启动春节营销活动，现已开放报名，参与活动可获得流量扶持和优惠券支持。',
    merchantList: ['原乡芦茨', '云栖山居', '溪山行旅', '桐庐山庄', '富春江畔', '山水间', '竹林小筑', '梅岭客栈'],
    merchantCount: 8,
    senderName: '张管理员',
    sentAt: '2026-01-04 14:00:00'
  },
  {
    id: 'record-5',
    type: NotificationType.AGREEMENT_REQUIRED,
    content: '根据最新法律法规要求，平台隐私政策已更新，请仔细阅读并同意。',
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
