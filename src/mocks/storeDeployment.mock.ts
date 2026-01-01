/**
 * 门店部署 Mock 数据
 */

import {
  StoreDeploymentForm,
  ReviewStatus,
  ChildPolicy,
  BreakfastPolicy,
  ChildCriteria,
  ChargeType,
  AllowExtraGuest,
  EntityType,
  LicenseValidityType
} from '@/types/storeDeployment'

/**
 * 示例草稿数据（部分填写）
 */
export const mockDraftData: StoreDeploymentForm = {
  id: 'draft_001',
  status: ReviewStatus.DRAFT,
  accountInfo: {
    mainAccount: '13575481983',
    bookingPhone: '13575481983',
    bookingWechat: '',
    pmsSystem: '',
    pmsStoreCode: ''
  },
  storeBasicInfo: {
    storeName: '原乡芦茨',
    storeAddress: '浙江省杭州市桐庐县富春江镇芦茨村',
    roomCount: 21,
    openingYear: '2016年',
    recommendationTags: ['融于自然', '松弛自在'],
    slogan: '闭门深山，无计好眠。',
    storeDescription: ''
  },
  storeFacilities: {
    transportation: [],
    cleaning: [],
    security: [],
    entertainment: [],
    publicArea: [],
    frontDesk: [],
    catering: [],
    business: [],
    children: [],
    sports: [],
    wellness: [],
    accessibility: []
  },
  surroundingInfo: {
    transportation: [],
    attractions: [],
    food: []
  },
  operationPolicy: {
    latestBookingTime: '22:00',
    checkInTime: '15:00',
    checkOutTime: '12:00',
    importantNotice: '',
    cancellationPolicy: '',
    checkInAge: {
      minAge: 'unlimited',
      maxAge: '不限制'
    },
    childPolicy: {
      acceptChildren: ChildPolicy.ACCEPT,
      minAge: 'unlimited'
    },
    depositPolicy: '',
    paymentMethods: [],
    breakfastPolicy: {
      provided: BreakfastPolicy.NOT_PROVIDED,
      breakfastType: '',
      servingStyle: '',
      startTime: '',
      endTime: '',
      extraFee: 0
    },
    childBreakfast: {
      criteria: ChildCriteria.AGE,
      ageStandard: '',
      heightStandard: '',
      chargeType: ChargeType.FREE,
      fee: 0
    }
  },
  storeDisplay: {
    highlights: [],
    images: {
      logo: '',
      listCover: '',
      travelMap: '',
      homePageImages: []
    },
    videos: {}
  },
  paymentSettlement: {
    entityType: EntityType.COMPANY,
    companyInfo: {
      registerAccount: '',
      companyName: '',
      creditCode: '',
      licenseValidityType: LicenseValidityType.DATE,
      licenseValidityDate: '',
      legalPersonName: '',
      legalPersonIdCard: '',
      legalPersonAddress: '',
      legalPersonIdValidityType: LicenseValidityType.DATE,
      legalPersonIdValidityDate: '',
      storeRegion: '',
      storeDetailAddress: '',
      accountName: '',
      bankAccountNumber: '',
      openingBank: '',
      openingLocation: '',
      openingBankFullName: '',
      openingProof: '',
      merchantName: '',
      merchantShortName: '',
      contactName: '',
      contactIdCard: '',
      contactPhone: '',
      contactEmail: '',
      businessLicensePhoto: '',
      legalPersonIdPhoto: '',
      storeDoorPhoto: '',
      storeFrontDeskPhoto: '',
      storeInteriorPhoto: ''
    }
  },
  roomTypes: [],
  createdAt: '2025-12-10 14:30:00',
  updatedAt: '2025-12-10 15:45:00'
}

/**
 * 完整示例数据（已填写完整）
 */
export const mockCompleteData: StoreDeploymentForm = {
  id: 'application_001',
  status: ReviewStatus.PENDING,
  accountInfo: {
    mainAccount: '13575481983',
    bookingPhone: '13575481983',
    bookingWechat: '13575481983',
    pmsSystem: '订单来了',
    pmsStoreCode: '69808093'
  },
  storeBasicInfo: {
    storeName: '原乡芦茨',
    storeAddress: '浙江省杭州市桐庐县富春江镇芦茨村芦茨湾',
    roomCount: 21,
    openingYear: '2016年',
    recommendationTags: ['融于自然', '松弛自在'],
    slogan: '闭门深山，无计好眠。',
    storeDescription: `原乡芦茨位于富春江畔毗邻芦茨湾，几幢青瓦白墙小楼依次坐落在芦茨湾边上，推门望江水，开窗见青山。

目前分为4栋，分别为1号院、2号院、3号院、5号院，共计21间客房。大大落地窗，独户一露台，足不出户坐看闲云。

设有餐厅、咖啡馆、茶空间和猫猫杂货铺，暖身暖胃，食住无忧。

1号院7间房，落成于2016年春，装修偏日式风格，木质系，设有茶室。2号院5间房，落成于2022年夏，装修偏现代，主要功能区有餐厅、咖啡馆，户外大露台等超大公区。3号院9间房，落成于2019年夏，装修偏现代，院内设有泳池。5号院为猫猫杂货铺、员工生活区。`
  },
  storeFacilities: {
    transportation: ['充电桩', '接送站服务', '自行车租赁服务', '旅游交通图'],
    cleaning: ['洗衣房', '洗涤用具', '晾衣架'],
    security: ['公共区域监控', '门禁系统', '灭火器', '急救包', '火灾报警器', '烟雾报警器'],
    entertainment: ['茶室', '泳池', '景观泳池', '投影设备', '棋牌桌', '桌游'],
    publicArea: ['公用WIFI', '电梯', '户外家具', '非经营休息区', '图书室', '花园', '野餐区', '禁烟'],
    frontDesk: ['保险柜', '储物柜', '信用卡结算'],
    catering: ['咖啡厅', '小吃吧'],
    business: [],
    children: ['室内游乐区', '儿童书籍', '桌面游戏'],
    sports: [],
    wellness: [],
    accessibility: []
  },
  surroundingInfo: {
    transportation: [
      {
        id: 'trans_001',
        locationName: '桐庐站',
        distance: 24,
        drivingTime: 25,
        featured: true
      },
      {
        id: 'trans_002',
        locationName: '杭州东站',
        distance: 68,
        drivingTime: 65,
        featured: false
      }
    ],
    attractions: [
      {
        id: 'attr_001',
        locationName: '富春江镇',
        distance: 12,
        drivingTime: 15,
        featured: true
      },
      {
        id: 'attr_002',
        locationName: '芦茨湾',
        distance: 0.5,
        drivingTime: 2,
        featured: false
      }
    ],
    food: [
      {
        id: 'food_001',
        locationName: '芦茨村',
        distance: 2,
        drivingTime: 10,
        featured: false
      }
    ]
  },
  operationPolicy: {
    latestBookingTime: '22:00',
    checkInTime: '15:00',
    checkOutTime: '12:00',
    importantNotice: '泳池维护中，12月30日前暂不可使用。',
    cancellationPolicy: '入住前10天可以免费取消，入住前3天取消将收取全额房费的30%作为损失补偿费用，之后不可取消，不可取消订单将扣除全部房费。',
    checkInAge: {
      minAge: '18+',
      maxAge: '不限制'
    },
    childPolicy: {
      acceptChildren: ChildPolicy.ACCEPT,
      minAge: '3+'
    },
    depositPolicy: '固定收取1000元；可用支付方式：支持现金、信用卡和第三方支付平台；退还押金方式：退房当日原支付方式退还。',
    paymentMethods: ['unionpay', 'visa', 'mastercard', 'wechat', 'alipay', 'cash'],
    breakfastPolicy: {
      provided: BreakfastPolicy.PROVIDED,
      breakfastType: 'mixed',
      servingStyle: 'set_meal',
      startTime: '07:30',
      endTime: '10:00',
      extraFee: 58
    },
    childBreakfast: {
      criteria: ChildCriteria.AGE,
      ageStandard: 'under_12',
      chargeType: ChargeType.FREE
    }
  },
  storeDisplay: {
    highlights: [
      '特色民居', '江景', '花园景', '免费停车', '餐厅', '茶室',
      '咖啡厅', '泳池', '大草坪', '艺术空间', '手工体验'
    ],
    images: {
      logo: 'https://example.com/images/logo.jpg',
      listCover: 'https://example.com/images/cover.jpg',
      miniProgramShareImage: 'https://example.com/images/share.jpg',
      travelMap: 'https://example.com/images/map.jpg',
      homePageImages: [
        'https://example.com/images/home1.jpg',
        'https://example.com/images/home2.jpg',
        'https://example.com/images/home3.jpg',
        'https://example.com/images/home4.jpg',
        'https://example.com/images/home5.jpg'
      ]
    },
    videos: {
      video: 'https://example.com/videos/store.mp4',
      videoCover: 'https://example.com/images/video_cover.jpg',
      latestNews: 'https://example.com/images/news.jpg'
    }
  },
  paymentSettlement: {
    entityType: EntityType.COMPANY,
    companyInfo: {
      registerAccount: '13575481983',
      companyName: '杭州原乡芦茨酒店管理有限公司',
      creditCode: '91330108MAEN56Q88T',
      licenseValidityType: LicenseValidityType.PERMANENT,
      legalPersonName: '张三',
      legalPersonIdCard: '330106199001011234',
      legalPersonAddress: '浙江省杭州市西湖区',
      legalPersonIdValidityType: LicenseValidityType.DATE,
      legalPersonIdValidityDate: '2030-12-31',
      storeRegion: '浙江省杭州市桐庐县',
      storeDetailAddress: '富春江镇芦茨村芦茨湾',
      accountName: '杭州原乡芦茨酒店管理有限公司',
      bankAccountNumber: '1234567890123456789',
      openingBank: '中国工商银行',
      openingLocation: '杭州市',
      openingBankFullName: '中国工商银行股份有限公司杭州西湖支行',
      openingProof: 'https://example.com/opening_proof.jpg',
      merchantName: '原乡芦茨',
      merchantShortName: '原乡芦茨',
      contactName: '李四',
      contactIdCard: '330106199002022345',
      contactPhone: '13800138000',
      contactEmail: 'contact@example.com',
      businessLicensePhoto: 'https://example.com/license.jpg',
      legalPersonIdPhoto: 'https://example.com/id_card.jpg',
      storeDoorPhoto: 'https://example.com/door.jpg',
      storeFrontDeskPhoto: 'https://example.com/front_desk.jpg',
      storeInteriorPhoto: 'https://example.com/interior.jpg'
    }
  },
  roomTypes: [
    {
      id: 'room_001',
      roomTypeName: '山景大床房',
      roomDescription: '临江独立阳台，超开阔视野',
      roomCount: 5,
      floor: '2',
      area: 35,
      hasWindow: true,
      nonSmoking: true,
      petsAllowed: false,
      capacity: 2,
      allowExtraGuest: AllowExtraGuest.ALLOWED,
      maxExtraGuests: 1,
      extraGuestFee: 200,
      roomLayout: {
        livingRooms: 0,
        bathrooms: 1,
        bedrooms: 1,
        bedroomConfigs: [
          {
            bedroomIndex: 1,
            bedCount: 1,
            beds: [
              {
                bedIndex: 1,
                width: '1.8',
                length: '2.0'
              }
            ]
          }
        ]
      },
      roomFeatures: ['有浴缸'],
      facilities: {
        roomFacilities: ['空调', '冰箱', '地暖', '阳台', 'WIFI'],
        roomLayout: ['沙发', '休闲椅', '茶几', '书桌', '衣柜'],
        bathroom: ['独立卫浴', '24小时热水', '智能马桶', '吹风机', '淋浴'],
        toiletries: ['牙具', '梳子', '洗发水', '护发素', '沐浴露'],
        bedding: ['备选枕头', '备用毯子'],
        convenience: ['衣架', '雨伞', '插座'],
        mediaTech: ['电视', '智能锁'],
        foodDrink: ['瓶装水', '电热水壶', '茶叶']
      },
      images: [
        'https://example.com/images/room1_1.jpg',
        'https://example.com/images/room1_2.jpg',
        'https://example.com/images/room1_3.jpg'
      ],
      freeAdultBreakfast: 2,
      freeChildBreakfast: 1
    },
    {
      id: 'room_002',
      roomTypeName: '江景双床房',
      roomDescription: '双床房，适合朋友或家庭入住',
      roomCount: 8,
      floor: '2,3',
      area: 32,
      hasWindow: true,
      nonSmoking: true,
      petsAllowed: false,
      capacity: 2,
      allowExtraGuest: AllowExtraGuest.NOT_ALLOWED,
      roomLayout: {
        livingRooms: 0,
        bathrooms: 1,
        bedrooms: 1,
        bedroomConfigs: [
          {
            bedroomIndex: 1,
            bedCount: 2,
            beds: [
              {
                bedIndex: 1,
                width: '1.5',
                length: '2.0'
              },
              {
                bedIndex: 2,
                width: '1.5',
                length: '2.0'
              }
            ]
          }
        ]
      },
      roomFeatures: ['可拆分为双床'],
      facilities: {
        roomFacilities: ['空调', 'WIFI', '暖气', '遮光帘'],
        roomLayout: ['书桌', '衣柜', '休闲椅'],
        bathroom: ['独立卫浴', '24小时热水', '吹风机', '淋浴', '毛巾'],
        toiletries: ['牙具', '洗发水', '沐浴露', '香皂'],
        bedding: ['备选枕头'],
        convenience: ['保险箱', '衣架', '雨伞'],
        mediaTech: ['电视'],
        foodDrink: ['瓶装水', '电热水壶']
      },
      images: [
        'https://example.com/images/room2_1.jpg',
        'https://example.com/images/room2_2.jpg',
        'https://example.com/images/room2_3.jpg'
      ],
      freeAdultBreakfast: 2,
      freeChildBreakfast: 0
    },
    {
      id: 'room_003',
      roomTypeName: '家庭套房',
      roomDescription: '超大家庭套房，两室一厅设计，独立花园',
      roomCount: 8,
      floor: '3',
      area: 55,
      hasWindow: true,
      nonSmoking: true,
      petsAllowed: true,
      capacity: 4,
      allowExtraGuest: AllowExtraGuest.ALLOWED,
      maxExtraGuests: 2,
      extraGuestFee: 150,
      roomLayout: {
        livingRooms: 1,
        bathrooms: 1,
        bedrooms: 2,
        bedroomConfigs: [
          {
            bedroomIndex: 1,
            bedCount: 1,
            beds: [
              {
                bedIndex: 1,
                width: '1.8',
                length: '2.0'
              }
            ]
          },
          {
            bedroomIndex: 2,
            bedCount: 1,
            beds: [
              {
                bedIndex: 1,
                width: '1.5',
                length: '2.0'
              }
            ]
          }
        ]
      },
      roomFeatures: ['有浴缸', '有家庭套房', '可加床'],
      facilities: {
        roomFacilities: ['空调', '冰箱', '地暖', '阳台', '露台', 'WIFI'],
        roomLayout: ['沙发', '私人花园', '休闲椅', '茶几', '书桌', '餐桌', '衣柜'],
        bathroom: ['独立卫浴', '24小时热水', '智能马桶', '吹风机', '化妆镜', '淋浴', '浴缸'],
        toiletries: ['牙具', '梳子', '浴帽', '洗发水', '护发素', '沐浴露', '润肤露'],
        bedding: ['备选枕头', '备用毯子', '备用床具'],
        convenience: ['保险箱', '针线包', '衣架', '雨伞', '户外桌椅', '电子秤'],
        mediaTech: ['电视', '音响', '智能锁', '投影仪'],
        foodDrink: ['水果', '瓶装水', '软饮', '电热水壶', '咖啡壶/茶壶', '茶叶', '小食']
      },
      images: [
        'https://example.com/images/room3_1.jpg',
        'https://example.com/images/room3_2.jpg',
        'https://example.com/images/room3_3.jpg',
        'https://example.com/images/room3_4.jpg',
        'https://example.com/images/room3_5.jpg',
        'https://example.com/images/room3_6.jpg',
        'https://example.com/images/room3_7.jpg',
        'https://example.com/images/room3_8.jpg'
      ],
      freeAdultBreakfast: 4,
      freeChildBreakfast: 2
    }
  ],
  createdAt: '2025-12-08 10:00:00',
  updatedAt: '2025-12-10 16:30:00',
  submittedAt: '2025-12-10 16:30:00'
}

/**
 * 审核通过的示例数据
 */
export const mockApprovedData: StoreDeploymentForm = {
  ...mockCompleteData,
  id: 'application_002',
  status: ReviewStatus.APPROVED
}

/**
 * 审核驳回的示例数据
 */
export const mockRejectedData: StoreDeploymentForm = {
  ...mockCompleteData,
  id: 'application_003',
  status: ReviewStatus.REJECTED,
  rejectionReason: `以下内容需要修改：
1. Tab1 - 门店介绍：字数不足200字，请补充详细介绍
2. Tab2 - 门店设施：安全安保设施至少需要选择3项
3. Tab4 - 门店主页首图：至少需要上传3张图片
4. 房型配置：房型总数为16间，但门店总房间数为21间，还需配置5间`
}

/**
 * 空白表单数据（用于新建申请）
 */
export const mockEmptyFormData: StoreDeploymentForm = {
  status: ReviewStatus.DRAFT,
  accountInfo: {
    mainAccount: '',
    bookingPhone: '',
    bookingWechat: '',
    pmsSystem: '',
    pmsStoreCode: ''
  },
  storeBasicInfo: {
    storeName: '',
    storeAddress: '',
    roomCount: 0,
    openingYear: '',
    recommendationTags: [],
    slogan: '',
    storeDescription: ''
  },
  storeFacilities: {
    transportation: [],
    cleaning: [],
    security: [],
    entertainment: [],
    publicArea: [],
    frontDesk: [],
    catering: [],
    business: [],
    children: [],
    sports: [],
    wellness: [],
    accessibility: []
  },
  surroundingInfo: {
    transportation: [],
    attractions: [],
    food: []
  },
  operationPolicy: {
    latestBookingTime: '22:00',
    checkInTime: '15:00',
    checkOutTime: '12:00',
    importantNotice: '',
    cancellationPolicy: '',
    checkInAge: {
      minAge: 'unlimited',
      maxAge: '不限制'
    },
    childPolicy: {
      acceptChildren: ChildPolicy.ACCEPT,
      minAge: 'unlimited'
    },
    depositPolicy: '',
    paymentMethods: [],
    breakfastPolicy: {
      provided: BreakfastPolicy.NOT_PROVIDED,
      breakfastType: '',
      servingStyle: '',
      startTime: '',
      endTime: '',
      extraFee: 0
    },
    childBreakfast: {
      criteria: ChildCriteria.AGE,
      ageStandard: '',
      heightStandard: '',
      chargeType: ChargeType.FREE,
      fee: 0
    }
  },
  storeDisplay: {
    highlights: [],
    images: {
      logo: '',
      listCover: '',
      travelMap: '',
      homePageImages: []
    },
    videos: {}
  },
  paymentSettlement: {
    entityType: EntityType.COMPANY,
    companyInfo: {
      registerAccount: '',
      companyName: '',
      creditCode: '',
      licenseValidityType: LicenseValidityType.DATE,
      licenseValidityDate: '',
      legalPersonName: '',
      legalPersonIdCard: '',
      legalPersonAddress: '',
      legalPersonIdValidityType: LicenseValidityType.DATE,
      legalPersonIdValidityDate: '',
      storeRegion: '',
      storeDetailAddress: '',
      accountName: '',
      bankAccountNumber: '',
      openingBank: '',
      openingLocation: '',
      openingBankFullName: '',
      openingProof: '',
      merchantName: '',
      merchantShortName: '',
      contactName: '',
      contactIdCard: '',
      contactPhone: '',
      contactEmail: '',
      businessLicensePhoto: '',
      legalPersonIdPhoto: '',
      storeDoorPhoto: '',
      storeFrontDeskPhoto: '',
      storeInteriorPhoto: ''
    }
  },
  roomTypes: []
}
