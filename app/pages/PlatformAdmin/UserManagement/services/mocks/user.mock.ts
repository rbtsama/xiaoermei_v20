/**
 * 用户管理 - Mock数据
 */

import type { User, UserDetail, MemberLevel } from '../../types/user.types'

// 用户列表数据（15个用户）
export const mockUsers: User[] = [
  {
    userId: '100000',
    nickname: '旅行达人',
    phone: '13812348888',
    memberLevel: '钻石会员',
    currentPoints: 12580,
    registeredAt: '2023-01-15 10:30:00',
    status: 'active'
  },
  {
    userId: '100001',
    nickname: '阳光少年',
    phone: '13923456666',
    memberLevel: '白金会员',
    currentPoints: 8650,
    registeredAt: '2023-02-20 14:20:00',
    status: 'active'
  },
  {
    userId: '100002',
    nickname: '微笑的猫咪',
    phone: '13634569999',
    memberLevel: '金卡会员',
    currentPoints: 4320,
    registeredAt: '2023-03-10 09:15:00',
    status: 'active'
  },
  {
    userId: '100003',
    nickname: '星空漫步',
    phone: '13745677777',
    memberLevel: '银卡会员',
    currentPoints: 2150,
    registeredAt: '2023-04-05 16:45:00',
    status: 'active'
  },
  {
    userId: '100004',
    nickname: '',
    phone: '13556785555',
    memberLevel: '普通会员',
    currentPoints: 850,
    registeredAt: '2023-05-12 11:00:00',
    status: 'active'
  },
  {
    userId: '100005',
    nickname: '咖啡时光',
    phone: '13367894444',
    memberLevel: '金卡会员',
    currentPoints: 5670,
    registeredAt: '2023-06-18 13:30:00',
    status: 'disabled'
  },
  {
    userId: '100006',
    nickname: '简单生活',
    phone: '18878903333',
    memberLevel: '白金会员',
    currentPoints: 9420,
    registeredAt: '2023-07-22 15:10:00',
    status: 'active'
  },
  {
    userId: '100007',
    nickname: '',
    phone: '18689012222',
    memberLevel: '银卡会员',
    currentPoints: 1980,
    registeredAt: '2023-08-08 10:25:00',
    status: 'active'
  },
  {
    userId: '100008',
    nickname: '梦想家',
    phone: '18590121111',
    memberLevel: '钻石会员',
    currentPoints: 15680,
    registeredAt: '2023-09-14 09:40:00',
    status: 'active'
  },
  {
    userId: '100009',
    nickname: '清风',
    phone: '15201238888',
    memberLevel: '普通会员',
    currentPoints: 520,
    registeredAt: '2023-10-20 14:55:00',
    status: 'active'
  },
  {
    userId: '100010',
    nickname: '夜猫子',
    phone: '15112347777',
    memberLevel: '金卡会员',
    currentPoints: 6830,
    registeredAt: '2023-11-05 16:20:00',
    status: 'active'
  },
  {
    userId: '100011',
    nickname: '都市行者',
    phone: '15023456666',
    memberLevel: '白金会员',
    currentPoints: 11250,
    registeredAt: '2023-12-10 11:35:00',
    status: 'active'
  },
  {
    userId: '100012',
    nickname: '',
    phone: '15934565555',
    memberLevel: '银卡会员',
    currentPoints: 2680,
    registeredAt: '2024-01-15 13:45:00',
    status: 'active'
  },
  {
    userId: '100013',
    nickname: '自由飞翔',
    phone: '15845674444',
    memberLevel: '普通会员',
    currentPoints: 320,
    registeredAt: '2024-02-20 10:15:00',
    status: 'disabled'
  },
  {
    userId: '100014',
    nickname: '山间清风',
    phone: '15756783333',
    memberLevel: '钻石会员',
    currentPoints: 18920,
    registeredAt: '2024-03-08 15:50:00',
    status: 'active'
  },
  {
    userId: '154655',
    nickname: '测试用户',
    phone: '13800138000',
    memberLevel: '白金会员',
    currentPoints: 6850,
    registeredAt: '2024-05-20 10:30:00',
    status: 'active'
  }
]

// 用户详情数据
export const mockUserDetails: Record<string, UserDetail> = {
  '100000': {
    userId: '100000',
    nickname: '旅行达人',
    phone: '13812348888',
    memberLevel: '钻石会员',
    currentPoints: 12580,
    registeredAt: '2023-01-15 10:30:00',
    status: 'active',
    memberInfo: {
      level: '钻石会员',
      levelProgress: {
        current: 25000,
        required: 25000,
        percentage: 100
      },
      retentionProgress: {
        current: 18500,
        required: 20000,
        percentage: 92.5
      },
      validUntil: '2025-12-31',
      joinedAt: '2023-06-20 14:30:00'
    },
    pointsInfo: {
      current: 12580,
      totalEarned: 28650,
      totalSpent: 16070,
      deductibleAmount: 125.80,
      lastUpdated: '2024-11-20 16:45:00'
    },
    recentOrders: [
      {
        orderId: '12511201234',
        hotelName: '北京三里屯亚朵酒店',
        roomType: '豪华大床房',
        checkIn: '2024-11-15',
        checkOut: '2024-11-17',
        amount: 1288,
        pointsEarned: 1546,
        status: 'completed'
      },
      {
        orderId: '12511155678',
        hotelName: '上海外滩全季酒店',
        roomType: '高级双床房',
        checkIn: '2024-11-10',
        checkOut: '2024-11-12',
        amount: 968,
        pointsEarned: 1162,
        status: 'completed'
      },
      {
        orderId: '12511089012',
        hotelName: '杭州西湖希尔顿酒店',
        roomType: '行政套房',
        checkIn: '2024-12-01',
        checkOut: '2024-12-03',
        amount: 2588,
        pointsEarned: 3106,
        status: 'upcoming'
      }
    ]
  },
  '100001': {
    userId: '100001',
    nickname: '阳光少年',
    phone: '13923456666',
    memberLevel: '白金会员',
    currentPoints: 8650,
    registeredAt: '2023-02-20 14:20:00',
    status: 'active',
    memberInfo: {
      level: '白金会员',
      levelProgress: {
        current: 12500,
        required: 15000,
        percentage: 83.3
      },
      retentionProgress: {
        current: 9200,
        required: 12000,
        percentage: 76.7
      },
      validUntil: '2025-12-31',
      joinedAt: '2023-08-10 11:20:00'
    },
    pointsInfo: {
      current: 8650,
      totalEarned: 18920,
      totalSpent: 10270,
      deductibleAmount: 86.50,
      lastUpdated: '2024-11-18 14:20:00'
    },
    recentOrders: [
      {
        orderId: '12511183456',
        hotelName: '深圳南山维也纳酒店',
        roomType: '商务大床房',
        checkIn: '2024-11-12',
        checkOut: '2024-11-14',
        amount: 688,
        pointsEarned: 756,
        status: 'completed'
      },
      {
        orderId: '12511057890',
        hotelName: '广州天河宜必思酒店',
        roomType: '标准双床房',
        checkIn: '2024-11-05',
        checkOut: '2024-11-06',
        amount: 398,
        pointsEarned: 438,
        status: 'completed'
      }
    ]
  },
  '100002': {
    userId: '100002',
    nickname: '微笑的猫咪',
    phone: '13634569999',
    memberLevel: '金卡会员',
    currentPoints: 4320,
    registeredAt: '2023-03-10 09:15:00',
    status: 'active',
    memberInfo: {
      level: '金卡会员',
      levelProgress: {
        current: 6500,
        required: 8000,
        percentage: 81.3
      },
      retentionProgress: {
        current: 4200,
        required: 5000,
        percentage: 84.0
      },
      validUntil: '2025-12-31',
      joinedAt: '2023-10-05 16:45:00'
    },
    pointsInfo: {
      current: 4320,
      totalEarned: 9850,
      totalSpent: 5530,
      deductibleAmount: 43.20,
      lastUpdated: '2024-11-16 10:30:00'
    },
    recentOrders: [
      {
        orderId: '12511161234',
        hotelName: '成都春熙路如家酒店',
        roomType: '经济大床房',
        checkIn: '2024-11-10',
        checkOut: '2024-11-11',
        amount: 298,
        pointsEarned: 328,
        status: 'completed'
      }
    ]
  },
  '100003': {
    userId: '100003',
    nickname: '星空漫步',
    phone: '13745677777',
    memberLevel: '银卡会员',
    currentPoints: 2150,
    registeredAt: '2023-04-05 16:45:00',
    status: 'active',
    memberInfo: {
      level: '银卡会员',
      levelProgress: {
        current: 2800,
        required: 3000,
        percentage: 93.3
      },
      retentionProgress: {
        current: 1850,
        required: 2000,
        percentage: 92.5
      },
      validUntil: '2025-12-31',
      joinedAt: '2023-12-15 13:20:00'
    },
    pointsInfo: {
      current: 2150,
      totalEarned: 4680,
      totalSpent: 2530,
      deductibleAmount: 21.50,
      lastUpdated: '2024-11-14 09:15:00'
    },
    recentOrders: [
      {
        orderId: '12511145678',
        hotelName: '西安钟楼7天酒店',
        roomType: '标准大床房',
        checkIn: '2024-11-08',
        checkOut: '2024-11-09',
        amount: 228,
        pointsEarned: 228,
        status: 'completed'
      }
    ]
  },
  '100004': {
    userId: '100004',
    nickname: '',
    phone: '13556785555',
    memberLevel: '普通会员',
    currentPoints: 850,
    registeredAt: '2023-05-12 11:00:00',
    status: 'active',
    memberInfo: {
      level: '普通会员',
      levelProgress: {
        current: 800,
        required: 1000,
        percentage: 80.0
      },
      retentionProgress: {
        current: 0,
        required: 0,
        percentage: 0
      },
      validUntil: '-',
      joinedAt: '2023-05-12 11:00:00'
    },
    pointsInfo: {
      current: 850,
      totalEarned: 1680,
      totalSpent: 830,
      deductibleAmount: 8.50,
      lastUpdated: '2024-11-10 15:20:00'
    },
    recentOrders: [
      {
        orderId: '12511109012',
        hotelName: '重庆解放碑汉庭酒店',
        roomType: '特惠房',
        checkIn: '2024-11-05',
        checkOut: '2024-11-06',
        amount: 188,
        pointsEarned: 188,
        status: 'completed'
      }
    ]
  },
  '154655': {
    userId: '154655',
    nickname: '测试用户',
    phone: '13800138000',
    memberLevel: '白金会员',
    currentPoints: 6850,
    registeredAt: '2024-05-20 10:30:00',
    status: 'active',
    memberInfo: {
      level: '白金会员',
      levelProgress: {
        current: 10500,
        required: 15000,
        percentage: 70.0
      },
      retentionProgress: {
        current: 8200,
        required: 12000,
        percentage: 68.3
      },
      validUntil: '2025-12-31',
      joinedAt: '2024-05-20 10:30:00'
    },
    pointsInfo: {
      current: 6850,
      totalEarned: 15620,
      totalSpent: 8770,
      deductibleAmount: 68.50,
      lastUpdated: '2024-11-24 18:30:00'
    },
    recentOrders: [
      {
        orderId: '12511243210',
        hotelName: '北京朝阳亚朵酒店',
        roomType: '豪华大床房',
        checkIn: '2024-11-20',
        checkOut: '2024-11-22',
        amount: 1176,
        pointsEarned: 1294,
        status: 'completed'
      },
      {
        orderId: '12511185432',
        hotelName: '上海浦东全季酒店',
        roomType: '高级双床房',
        checkIn: '2024-11-15',
        checkOut: '2024-11-17',
        amount: 856,
        pointsEarned: 942,
        status: 'completed'
      },
      {
        orderId: '12511126789',
        hotelName: '深圳福田维也纳酒店',
        roomType: '商务大床房',
        checkIn: '2024-12-01',
        checkOut: '2024-12-03',
        amount: 1288,
        pointsEarned: 1417,
        status: 'upcoming'
      }
    ]
  }
}

// 会员等级列表（用于筛选）
export const memberLevels: MemberLevel[] = [
  '普通会员',
  '银卡会员',
  '金卡会员',
  '白金会员',
  '钻石会员'
]
