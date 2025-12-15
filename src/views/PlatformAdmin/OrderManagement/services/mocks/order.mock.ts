import type { Order } from '../../types/order.types'
import { OrderStatus, PaymentStatus, CheckInStatus } from '../../types/order.types'

/**
 * 平台后台订单列表Mock数据（按PRD优化）
 * 6个订单覆盖不同场景，测试所有功能
 */
export const mockOrderListData: Order[] = [
  // 订单1：全部模块（积分服务 + 多条退款记录 + 商家备注）
  {
    id: '1',
    orderNumber: '20251206100001',
    createdAt: '2025-12-06 10:30:15',
    userId: 'user001',
    userName: '张三',
    userPhone: '13800010001',
    hotelId: 'hotel001',
    hotelName: '西湖山居民宿',
    roomTypeId: 'room001',
    roomTypeName: '湖景大床房',
    roomType: '湖景大床房',
    roomNumber: '101',
    checkInDate: '2025-12-10',
    checkOutDate: '2025-12-12',
    nights: 2,
    roomCount: 1,
    guestCount: 2,
    guestName: '张三',
    guestPhone: '13800010001',
    roomPrice: 800,
    couponDiscount: 50,
    pointsDiscount: 100,
    memberDiscount: 0,
    actualAmount: 650,
    totalAmount: 800,
    commission: 32.5,
    merchantAmount: 617.5,
    status: OrderStatus.CHECKED_OUT,
    paymentStatus: PaymentStatus.PAID,
    checkInStatus: CheckInStatus.CHECKED_OUT,
    paidAt: '2025-12-06 10:35:20',
    checkedOutAt: '2025-12-12 12:00:00',
    hasRefundRequest: true,
    refundRequestedAt: '2025-12-12 14:00:00',
    refundAmount: 300,
    // PRD新增字段
    pointsServices: {
      rewards: [
        { name: '自带牙刷', points: 50 },
        { name: '自带毛巾', points: 50 }
      ],
      exchanges: [
        { name: '延迟退房2小时', points: 200 }
      ]
    },
    refundRecords: [
      {
        status: '客人发起申诉',
        requestAmount: 300,  // 申请退款300元
        time: '2025-12-12 14:00:00'
      },
      {
        status: '平台支持退款',
        requestAmount: 300,  // 申请金额
        amount: 300,         // 实际退款300元
        time: '2025-12-13 15:30:00'
      }
    ],
    merchantNote: '客人要求安静房间，已安排远离电梯的房间。VIP客户，服务态度需特别注意。'
  },

  // 订单2：只有积分服务
  {
    id: '2',
    orderNumber: '20251205093025',
    createdAt: '2025-12-05 09:30:25',
    userId: 'user002',
    userName: '李四',
    userPhone: '18800020002',
    hotelId: 'hotel002',
    hotelName: '云栖小筑',
    roomTypeId: 'room002',
    roomTypeName: '山景套房',
    roomType: '山景套房',
    checkInDate: '2025-12-08',
    checkOutDate: '2025-12-10',
    nights: 2,
    roomCount: 1,
    guestCount: 3,
    guestName: '李四',
    guestPhone: '18800020002',
    roomPrice: 1200,
    couponDiscount: 0,
    pointsDiscount: 0,
    memberDiscount: 60,
    actualAmount: 1140,
    totalAmount: 1200,
    commission: 57,
    merchantAmount: 1083,
    status: OrderStatus.PENDING_CHECKIN,
    paymentStatus: PaymentStatus.PAID,
    checkInStatus: CheckInStatus.NOT_CHECKED_IN,
    paidAt: '2025-12-05 09:32:10',
    hasRefundRequest: false,
    // PRD新增字段
    pointsServices: {
      rewards: [
        { name: '自带拖鞋', points: 30 }
      ],
      exchanges: []
    }
  },

  // 订单3：退款记录（客人撤诉）+ 商家备注
  {
    id: '3',
    orderNumber: '20251204153010',
    createdAt: '2025-12-04 15:30:10',
    userId: 'user003',
    userName: '王五',
    userPhone: '18100030003',
    hotelId: 'hotel001',
    hotelName: '西湖山居民宿',
    roomTypeId: 'room003',
    roomTypeName: '庭院标准间',
    roomType: '庭院标准间',
    checkInDate: '2025-12-05',
    checkOutDate: '2025-12-06',
    nights: 1,
    roomCount: 1,
    guestCount: 2,
    guestName: '王五',
    guestPhone: '18100030003',
    roomPrice: 400,
    couponDiscount: 0,
    pointsDiscount: 0,
    memberDiscount: 0,
    actualAmount: 400,
    totalAmount: 400,
    commission: 20,
    merchantAmount: 380,
    status: OrderStatus.COMPLETED,
    paymentStatus: PaymentStatus.PAID,
    checkInStatus: CheckInStatus.CHECKED_OUT,
    paidAt: '2025-12-04 15:31:50',
    checkedInAt: '2025-12-05 14:00:00',
    checkedOutAt: '2025-12-06 12:00:00',
    completedAt: '2025-12-09 00:00:00',
    hasRefundRequest: true,
    // PRD新增字段
    refundRecords: [
      {
        status: '客人撤诉',
        requestAmount: 200,  // 原申请200元，但已撤诉，不显示实际退款
        time: '2025-12-07 16:20:00'
      }
    ],
    merchantNote: '客人对房间很满意，主动撤回了退款申请'
  },

  // 订单4：基础订单（无可选模块）
  {
    id: '4',
    orderNumber: '20251203112048',
    createdAt: '2025-12-03 11:20:48',
    userId: 'user004',
    userName: '赵六',
    userPhone: '16600040004',
    hotelId: 'hotel003',
    hotelName: '山水间客栈',
    roomTypeId: 'room004',
    roomTypeName: '豪华双床房',
    roomType: '豪华双床房',
    checkInDate: '2025-12-15',
    checkOutDate: '2025-12-17',
    nights: 2,
    roomCount: 1,
    guestCount: 2,
    guestName: '赵六',
    guestPhone: '16600040004',
    roomPrice: 900,
    couponDiscount: 0,
    pointsDiscount: 0,
    memberDiscount: 0,
    actualAmount: 900,
    totalAmount: 900,
    commission: 45,
    merchantAmount: 855,
    status: OrderStatus.PENDING_CHECKIN,
    paymentStatus: PaymentStatus.PAID,
    checkInStatus: CheckInStatus.NOT_CHECKED_IN,
    paidAt: '2025-12-03 11:22:30',
    hasRefundRequest: false
    // 无积分服务、退款记录、商家备注
  },

  // 订单5：门店退款 + 只有商家备注
  {
    id: '5',
    orderNumber: '20251202085530',
    createdAt: '2025-12-02 08:55:30',
    userId: 'user005',
    userName: '孙七',
    userPhone: '18100050005',
    hotelId: 'hotel002',
    hotelName: '云栖小筑',
    roomTypeId: 'room005',
    roomTypeName: '复式loft',
    roomType: '复式loft',
    checkInDate: '2025-12-03',
    checkOutDate: '2025-12-05',
    nights: 2,
    roomCount: 1,
    guestCount: 4,
    guestName: '孙七',
    guestPhone: '18100050005',
    roomPrice: 1600,
    couponDiscount: 100,
    pointsDiscount: 0,
    memberDiscount: 0,
    actualAmount: 1500,
    totalAmount: 1600,
    commission: 75,
    merchantAmount: 1425,
    status: OrderStatus.COMPLETED,
    paymentStatus: PaymentStatus.PAID,
    checkInStatus: CheckInStatus.CHECKED_OUT,
    paidAt: '2025-12-02 08:57:15',
    checkedInAt: '2025-12-03 15:30:00',
    checkedOutAt: '2025-12-05 11:00:00',
    completedAt: '2025-12-08 00:00:00',
    hasRefundRequest: true,
    // PRD新增字段
    refundRecords: [
      {
        status: '门店退款',
        requestAmount: 800,  // 申请金额
        amount: 800,         // 实际退款800元
        time: '2025-12-06 10:00:00'
      }
    ],
    merchantNote: '客人因家中急事需提前离店，商家主动退款处理'
  },

  // 订单6：待付款订单
  {
    id: '6',
    orderNumber: '20251206163520',
    createdAt: '2025-12-06 16:35:20',
    userId: 'user006',
    userName: '周八',
    userPhone: '16600060006',
    hotelId: 'hotel003',
    hotelName: '山水间客栈',
    roomTypeId: 'room006',
    roomTypeName: '观景大床房',
    roomType: '观景大床房',
    checkInDate: '2025-12-20',
    checkOutDate: '2025-12-22',
    nights: 2,
    roomCount: 1,
    guestCount: 2,
    guestName: '周八',
    guestPhone: '16600060006',
    roomPrice: 700,
    couponDiscount: 0,
    pointsDiscount: 0,
    memberDiscount: 0,
    actualAmount: 700,
    totalAmount: 700,
    commission: 35,
    merchantAmount: 665,
    status: OrderStatus.PENDING_PAYMENT,
    paymentStatus: PaymentStatus.UNPAID,
    checkInStatus: CheckInStatus.NOT_CHECKED_IN,
    hasRefundRequest: false
    // 无可选模块
  },

  // 订单7：已入住订单 + 积分换购
  {
    id: '7',
    orderNumber: '20251201091235',
    createdAt: '2025-12-01 09:12:35',
    userId: 'user007',
    userName: '吴九',
    userPhone: '18100070007',
    hotelId: 'hotel001',
    hotelName: '西湖山居民宿',
    roomTypeId: 'room002',
    roomTypeName: '湖景大床房',
    roomType: '湖景大床房',
    roomNumber: '203',
    checkInDate: '2025-12-06',
    checkOutDate: '2025-12-09',
    nights: 3,
    roomCount: 1,
    guestCount: 2,
    guestName: '吴九',
    guestPhone: '18100070007',
    roomPrice: 1200,
    couponDiscount: 0,
    pointsDiscount: 50,
    memberDiscount: 0,
    actualAmount: 1150,
    totalAmount: 1200,
    commission: 57.5,
    merchantAmount: 1092.5,
    status: OrderStatus.CHECKED_IN,
    paymentStatus: PaymentStatus.PAID,
    checkInStatus: CheckInStatus.CHECKED_IN,
    paidAt: '2025-12-01 09:14:10',
    checkedInAt: '2025-12-06 14:30:00',
    hasRefundRequest: false,
    // PRD新增字段
    pointsServices: {
      rewards: [],
      exchanges: [
        { name: '延迟退房2小时', points: 200 },
        { name: '免费早餐升级', points: 150 }
      ]
    },
    merchantNote: '客人是回头客，服务标准按VIP处理'
  },

  // 订单8：平台拒绝退款场景
  {
    id: '8',
    orderNumber: '20251130142055',
    createdAt: '2025-11-30 14:20:55',
    userId: 'user008',
    userName: '郑十',
    userPhone: '18100080008',
    hotelId: 'hotel002',
    hotelName: '云栖小筑',
    roomTypeId: 'room003',
    roomTypeName: '庭院标准间',
    roomType: '庭院标准间',
    checkInDate: '2025-12-02',
    checkOutDate: '2025-12-03',
    nights: 1,
    roomCount: 1,
    guestCount: 1,
    guestName: '郑十',
    guestPhone: '18100080008',
    roomPrice: 350,
    couponDiscount: 0,
    pointsDiscount: 0,
    memberDiscount: 0,
    actualAmount: 350,
    totalAmount: 350,
    commission: 17.5,
    merchantAmount: 332.5,
    status: OrderStatus.COMPLETED,
    paymentStatus: PaymentStatus.PAID,
    checkInStatus: CheckInStatus.CHECKED_OUT,
    paidAt: '2025-11-30 14:22:10',
    checkedInAt: '2025-12-02 14:00:00',
    checkedOutAt: '2025-12-03 12:00:00',
    completedAt: '2025-12-06 00:00:00',
    hasRefundRequest: true,
    // PRD新增字段
    refundRecords: [
      {
        status: '客人发起申诉',
        requestAmount: 500,  // 申请退款500元
        time: '2025-12-03 16:00:00'
      },
      {
        status: '平台拒绝退款',
        requestAmount: 500,  // 申请金额（平台拒绝，不显示实际退款）
        time: '2025-12-04 10:30:00'
      }
    ]
  },

  // 订单9：门店退款（展示最终退款金额）
  {
    id: '9',
    orderNumber: '20251129083015',
    createdAt: '2025-11-29 08:30:15',
    userId: 'user009',
    userName: '钱十一',
    userPhone: '18100090009',
    hotelId: 'hotel003',
    hotelName: '山水间客栈',
    roomTypeId: 'room007',
    roomTypeName: '家庭套房',
    roomType: '家庭套房',
    checkInDate: '2025-11-30',
    checkOutDate: '2025-12-02',
    nights: 2,
    roomCount: 1,
    guestCount: 4,
    guestName: '钱十一',
    guestPhone: '18100090009',
    roomPrice: 1400,
    couponDiscount: 0,
    pointsDiscount: 0,
    memberDiscount: 0,
    actualAmount: 1400,
    totalAmount: 1400,
    commission: 70,
    merchantAmount: 1330,
    status: OrderStatus.COMPLETED,
    paymentStatus: PaymentStatus.PAID,
    checkInStatus: CheckInStatus.CHECKED_OUT,
    paidAt: '2025-11-29 08:32:00',
    checkedInAt: '2025-11-30 15:00:00',
    checkedOutAt: '2025-12-02 11:00:00',
    completedAt: '2025-12-05 00:00:00',
    hasRefundRequest: true,
    // PRD新增字段
    refundRecords: [
      {
        status: '客人发起申诉',
        requestAmount: 700,  // 申请退款700元
        time: '2025-12-02 18:00:00'
      },
      {
        status: '门店退款',
        requestAmount: 700,  // 申请金额
        amount: 700,         // 实际退款700元
        time: '2025-12-03 09:15:00'
      }
    ],
    merchantNote: '客人反映房间设施有问题，商家主动退款一半金额以示诚意'
  }
]
