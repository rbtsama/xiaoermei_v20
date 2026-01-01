/**
 * 门店部署相关类型定义
 */

// ==================== 枚举定义 ====================

/**
 * 审核状态
 */
export enum ReviewStatus {
  DRAFT = 'draft',              // 草稿
  PENDING = 'pending',          // 待审核
  REVIEWING = 'reviewing',      // 审核中
  APPROVED = 'approved',        // 审核通过
  REJECTED = 'rejected'         // 审核驳回
}

/**
 * Tab 状态
 */
export enum TabStatus {
  INCOMPLETE = 'incomplete',    // 未完成
  COMPLETE = 'complete',        // 已完成
  ACTIVE = 'active'             // 当前激活
}

/**
 * 儿童政策
 */
export enum ChildPolicy {
  NOT_ACCEPT = 'not_accept',    // 不接待儿童
  ACCEPT = 'accept'             // 接待儿童
}

/**
 * 早餐政策
 */
export enum BreakfastPolicy {
  NOT_PROVIDED = 'not_provided', // 不提供早餐
  PROVIDED = 'provided'          // 提供早餐
}

/**
 * 儿童判断标准
 */
export enum ChildCriteria {
  AGE = 'age',                   // 按年龄
  HEIGHT = 'height'              // 按身高
}

/**
 * 收费方式
 */
export enum ChargeType {
  FREE = 'free',                 // 免费
  CHARGED = 'charged'            // 收费
}

/**
 * 是否允许加客
 */
export enum AllowExtraGuest {
  NOT_ALLOWED = 'not_allowed',   // 不允许
  ALLOWED = 'allowed'            // 允许
}

// ==================== 接口定义 ====================

/**
 * Tab 1: 账号信息
 */
export interface AccountInfo {
  mainAccount: string           // 主账号（手机号）
  bookingPhone: string          // 预订电话
  bookingWechat?: string        // 预订微信
  pmsSystem?: string            // PMS房态管理系统
  pmsStoreCode?: string         // PMS系统门店编号
}

/**
 * Tab 1: 门店基本信息
 */
export interface StoreBasicInfo {
  storeName: string             // 门店名称
  storeAddress: string          // 详细地址
  roomCount: number             // 房间数量
  openingYear: string           // 开业时间
  recommendationTags?: string[] // 门店推荐标签（最多2项，非必填）
  slogan?: string               // slogan或门店推荐语
  storeDescription: string      // 门店介绍
}

/**
 * Tab 2: 门店设施（分类）
 */
export interface StoreFacilities {
  transportation: string[]      // 交通服务
  cleaning: string[]            // 清洁服务
  security: string[]            // 安全安保
  entertainment: string[]       // 娱乐设施
  publicArea: string[]          // 公共区域
  frontDesk: string[]           // 前台服务
  catering: string[]            // 餐饮服务
  business: string[]            // 商务服务
  children: string[]            // 儿童设施
  sports: string[]              // 运动设施
  wellness: string[]            // 康体设施
  accessibility: string[]       // 无障碍设施
}

/**
 * Tab 2: 周边信息单条
 */
export interface SurroundingItem {
  id: string                    // ID
  locationName: string          // 地点名称
  travelMode: 'driving' | 'walking'  // 交通方式（驾车/步行）
  distance: number              // 距离（公里）
  travelTime: number            // 时间（分钟）
  featured?: boolean            // 是否重点展示
}

/**
 * Tab 2: 周边信息
 */
export interface SurroundingInfo {
  transportation: SurroundingItem[]  // 交通
  attractions: SurroundingItem[]     // 景点
  food: SurroundingItem[]            // 逛吃
}

/**
 * Tab 3: 办理入住年龄
 */
export interface CheckInAge {
  minAge: string                // 最小入住年龄
  maxAge: string                // 最大入住年龄（固定"不限制"）
}

/**
 * Tab 3: 儿童政策
 */
export interface ChildPolicyInfo {
  acceptChildren: ChildPolicy   // 是否接待儿童
  minAge?: string               // 最小年龄要求
}

/**
 * Tab 3: 早餐政策
 */
export interface BreakfastPolicyInfo {
  provided: BreakfastPolicy     // 是否提供早餐
  breakfastType?: string        // 早餐类型（中式/西式/中西式）
  servingStyle?: string         // 供应形式（固定套餐/自助餐/单点）
  startTime?: string            // 开始时间（HH:MM）
  endTime?: string              // 结束时间（HH:MM）
  extraFee?: number             // 加早费用（元/份）
}

/**
 * Tab 3: 儿童早餐
 */
export interface ChildBreakfast {
  criteria: ChildCriteria       // 判断标准（年龄/身高）
  ageStandard?: string          // 年龄标准
  heightStandard?: string       // 身高标准
  chargeType: ChargeType        // 收费方式（免费/收费）
  fee?: number                  // 收费金额
}

/**
 * Tab 3: 运营政策
 */
export interface OperationPolicy {
  latestBookingTime: string     // 当天最晚预订时间（HH:MM）
  checkInTime: string           // 开始办理入住时间（HH:MM）
  checkOutTime: string          // 最晚退房时间（HH:MM）
  importantNotice?: string      // 重要通知
  cancellationPolicy: string    // 取消政策
  checkInAge: CheckInAge        // 办理入住年龄
  childPolicy: ChildPolicyInfo  // 儿童政策
  depositPolicy: string         // 押金政策
  paymentMethods: string[]      // 前台可用支付方式
  breakfastPolicy: BreakfastPolicyInfo  // 早餐政策
  childBreakfast: ChildBreakfast        // 儿童早餐
}

/**
 * Tab 4: 门店图片
 */
export interface StoreImages {
  logo: string                  // 门店logo
  listCover: string             // 列表页封面
  miniProgramShareImage?: string // 小程序分享图（系统自动生成）
  travelMap: string             // 旅游交通图
  homePageImages: string[]      // 门店主页首图（最多5张）
}

/**
 * Tab 4: 视频素材
 */
export interface StoreVideos {
  video?: string                // 门店视频
  videoCover?: string           // 视频封面
  latestNews?: string           // 最新情报
}

/**
 * Tab 4: 门店展示
 */
export interface StoreDisplay {
  highlights: string[]          // 门店亮点（至少3项）
  images: StoreImages           // 门店图片
  videos: StoreVideos           // 视频素材
}

/**
 * 房型设施
 */
export interface RoomFacilities {
  roomFacilities: string[]      // 客房设施
  roomLayout: string[]          // 客房布局和家具
  bathroom: string[]            // 卫浴设施
  toiletries: string[]          // 洗浴用品
  bedding: string[]             // 床上用品
  convenience: string[]         // 便利设施
  mediaTech: string[]           // 媒体科技
  foodDrink: string[]           // 食品饮品
}

/**
 * 床型配置
 */
export interface BedConfig {
  bedIndex: number              // 床编号
  width: string                 // 宽度（米）0.8-2.4
  length: string                // 长度（米）1.6-2.4
}

/**
 * 卧室配置
 */
export interface BedroomConfig {
  bedroomIndex: number          // 卧室编号
  bedCount: number              // 床数量
  beds: BedConfig[]             // 床配置数组
}

/**
 * 房间布局
 */
export interface RoomLayout {
  livingRooms: number           // 客厅数量
  bathrooms: number             // 卫生间数量
  bedrooms: number              // 卧室数量
  bedroomConfigs: BedroomConfig[] // 卧室配置数组
}

/**
 * 房型设施
 */
export interface RoomFacilities {
  roomFacilities: string[]      // 客房设施
  roomLayout: string[]          // 客房布局和家具
  bathroom: string[]            // 卫浴设施
  toiletries: string[]          // 洗浴用品
  bedding: string[]             // 床上用品
  convenience: string[]         // 便利设施
  mediaTech: string[]           // 媒体科技
  foodDrink: string[]           // 食品饮品
}

/**
 * 房型信息
 */
export interface RoomType {
  id: string                    // 房型ID
  roomTypeName: string          // 房型名称（最多20字）
  roomDescription?: string      // 房型说明
  roomCount: number             // 该房型数量
  floor: string                 // 楼层（逗号分隔，例如：1,2,3）
  area: number                  // 面积（平方米）
  hasWindow: boolean            // 是否有窗
  nonSmoking: boolean           // 是否禁烟
  petsAllowed: boolean          // 携带宠物
  capacity: number              // 可住人数
  allowExtraGuest: AllowExtraGuest // 允许加客
  maxExtraGuests?: number       // 最多可加人数
  extraGuestFee?: number        // 加客费用（元/人）
  roomLayout: RoomLayout        // 房间布局
  roomFeatures: string[]        // 房型特色（有浴缸、有家庭套房、可加床、可拆分为双床）
  facilities: RoomFacilities    // 房型设施
  images: string[]              // 房型图片（最多10张）
}

/**
 * 主体类型
 */
export enum EntityType {
  COMPANY = 'company',           // 有限责任公司
  INDIVIDUAL = 'individual'      // 个体工商户
}

/**
 * 营业执照有效期类型
 */
export enum LicenseValidityType {
  DATE = 'date',                 // 日期选择
  PERMANENT = 'permanent'        // 永久有效
}

/**
 * 支付结算信息 - 有限责任公司
 */
export interface CompanyPaymentInfo {
  registerAccount: string        // 注册账号（手机号或邮箱）
  companyName: string           // 营业执照上的公司名称
  creditCode: string            // 统一社会信用代码
  licenseValidityType: LicenseValidityType  // 营业执照有效期类型
  licenseValidityDate?: string  // 营业执照有效期（日期）
  legalPersonName: string       // 法人姓名
  legalPersonIdCard: string     // 法人身份证号
  legalPersonAddress: string    // 法人居住地址
  legalPersonIdValidityType: LicenseValidityType  // 身份证有效期类型
  legalPersonIdValidityDate?: string  // 身份证有效期
  storeRegion: string           // 门店所在地区
  storeDetailAddress: string    // 门店详细地址
  accountName: string           // 账户名称
  bankAccountNumber: string     // 对公账户银行账号
  openingBank: string           // 开户银行
  openingLocation: string       // 开户地
  openingBankFullName: string   // 开户银行全称
  openingProof: string          // 开户证明（图片URL）
  merchantName: string          // 商户名称
  merchantShortName: string     // 账户简称
  contactName: string           // 联系人姓名
  contactIdCard: string         // 联系人身份证号码
  contactPhone: string          // 联系人手机号码
  contactEmail: string          // 联系人常用邮箱
  businessLicensePhoto: string  // 营业执照照片
  legalPersonIdPhoto: string    // 法人身份证照片
  storeDoorPhoto: string        // 门店门头照片
  storeFrontDeskPhoto: string   // 前台照片
  storeInteriorPhoto: string    // 店铺内景照片
}

/**
 * 支付结算信息 - 个体工商户
 */
export interface IndividualPaymentInfo {
  registerAccount: string        // 注册账号
  ownerName: string             // 营业执照上的经营者姓名
  creditCode: string            // 统一社会信用代码
  licenseValidityType: LicenseValidityType
  licenseValidityDate?: string
  idCardName: string            // 姓名
  idCardNumber: string          // 身份证号
  idCardAddress: string         // 居住地址
  idCardValidityType: LicenseValidityType
  idCardValidityDate?: string
  storeRegion: string
  storeDetailAddress: string
  accountName: string           // 账户名称
  bankCardNumber: string        // 银行账号
  bankName: string              // 开户行
  bankLocation: string          // 开户地
  bankFullName: string          // 开户银行全称
  bankCardPhoto: string         // 法人银行卡照片
  merchantName: string
  merchantShortName: string
  contactName: string
  contactIdCard: string
  contactPhone: string
  contactEmail: string
  businessLicensePhoto: string
  idCardPhoto: string
  storeDoorPhoto: string
  storeFrontDeskPhoto: string
  storeInteriorPhoto: string
}

/**
 * 支付结算信息
 */
export interface PaymentSettlement {
  entityType: EntityType        // 主体类型
  companyInfo?: CompanyPaymentInfo  // 有限责任公司信息
  individualInfo?: IndividualPaymentInfo  // 个体工商户信息
}

/**
 * 完整的门店部署表单数据
 */
export interface StoreDeploymentForm {
  id?: string                   // 草稿/申请ID
  accountInfo: AccountInfo      // 账号信息
  storeBasicInfo: StoreBasicInfo // 门店基本信息
  storeFacilities: StoreFacilities // 门店设施
  surroundingInfo: SurroundingInfo // 周边信息
  operationPolicy: OperationPolicy // 运营政策
  storeDisplay: StoreDisplay    // 门店展示
  paymentSettlement: PaymentSettlement  // 支付结算
  roomTypes: RoomType[]         // 房型列表
  status: ReviewStatus          // 审核状态
  createdAt?: string            // 创建时间
  updatedAt?: string            // 更新时间
  submittedAt?: string          // 提交时间
  rejectionReason?: string      // 驳回原因
}

/**
 * Tab 完成状态
 */
export interface TabCompletionStatus {
  tab1: boolean                 // 账号与门店信息
  tab2: boolean                 // 设施与周边
  tab3: boolean                 // 运营政策
  tab4: boolean                 // 门店展示
  tab5: boolean                 // 房型配置
}

/**
 * 自动保存状态
 */
export enum AutoSaveStatus {
  IDLE = 'idle',                // 空闲
  SAVING = 'saving',            // 保存中
  SAVED = 'saved',              // 已保存
  ERROR = 'error'               // 保存失败
}

// ==================== 常量定义 ====================

/**
 * 最小入住年龄选项
 */
export const MIN_CHECK_IN_AGE_OPTIONS = [
  { label: '不限制', value: 'unlimited' },
  { label: '16岁以上', value: '16+' },
  { label: '18岁以上', value: '18+' },
  { label: '21岁以上', value: '21+' }
]

/**
 * 儿童最小年龄要求选项
 */
export const CHILD_MIN_AGE_OPTIONS = [
  { label: '不限制', value: 'unlimited' },
  { label: '1岁以上', value: '1+' },
  { label: '3岁以上', value: '3+' },
  { label: '6岁以上', value: '6+' },
  { label: '12岁以上', value: '12+' }
]

/**
 * 早餐类型选项
 */
export const BREAKFAST_TYPE_OPTIONS = [
  { label: '中式', value: 'chinese' },
  { label: '西式', value: 'western' },
  { label: '中西式', value: 'mixed' }
]

/**
 * 供应形式选项
 */
export const SERVING_STYLE_OPTIONS = [
  { label: '固定套餐', value: 'set_meal' },
  { label: '自助餐', value: 'buffet' },
  { label: '单点', value: 'a_la_carte' }
]

/**
 * 儿童年龄标准选项
 */
export const CHILD_AGE_STANDARD_OPTIONS = [
  { label: '6岁以下', value: 'under_6' },
  { label: '12岁以下', value: 'under_12' },
  { label: '16岁以下', value: 'under_16' },
  { label: '18岁以下', value: 'under_18' }
]

/**
 * 儿童身高标准选项
 */
export const CHILD_HEIGHT_STANDARD_OPTIONS = [
  { label: '1.2米以下', value: 'under_1.2' },
  { label: '1.4米以下', value: 'under_1.4' },
  { label: '1.5米以下', value: 'under_1.5' }
]

/**
 * 前台支付方式选项
 */
export const PAYMENT_METHOD_OPTIONS = [
  { label: '现金', value: 'cash' },
  { label: '微信', value: 'wechat' },
  { label: '支付宝', value: 'alipay' },
  { label: '银联', value: 'unionpay' },
  { label: 'VISA', value: 'visa' },
  { label: 'Mastercard', value: 'mastercard' },
  { label: 'Apple Pay', value: 'apple_pay' }
]

/**
 * 门店设施 - 交通服务
 */
export const TRANSPORTATION_FACILITIES = [
  '充电桩', '叫车服务', '接送站服务', '接送机服务',
  '租车服务', '自行车租赁服务', '旅游交通图'
]

/**
 * 门店设施 - 清洁服务
 */
export const CLEANING_FACILITIES = [
  '洗衣房', '洗涤用具', '晾衣架', '干衣机',
  '熨斗/挂烫机', '外送洗衣服务', '干洗服务'
]

/**
 * 门店设施 - 安全安保
 */
export const SECURITY_FACILITIES = [
  '公共区域监控', '一氧化碳报警器', '门禁系统', '灭火器',
  '医务室', '安保人员', '急救包', '安全报警器',
  '火灾报警器', '烟雾报警器'
]

/**
 * 门店设施 - 娱乐设施
 */
export const ENTERTAINMENT_FACILITIES = [
  '茶室', '种植采摘', '酒吧', '手工活动', '泳池', '景观泳池',
  '恒温泳池', '亲近动物', '桌面足球', '投影设备', '家庭影院',
  '水上乐园', '露天电影', '海滩', '户外篝火', '徒步旅行',
  '壁炉烤火', '棋牌桌', '桌游'
]

/**
 * 门店设施 - 公共区域
 */
export const PUBLIC_AREA_FACILITIES = [
  '公用WIFI', '吸烟区', '电梯', '户外家具', '非经营休息区',
  '图书室', '花园', '加湿器', '野餐区', '净水机', '礼品廊',
  '音响', '厨房', '新风系统', '烧烤设施', '禁烟'
]

/**
 * 门店设施 - 前台服务
 */
export const FRONT_DESK_FACILITIES = [
  '保险柜', '储物柜', '电子身份证', '信用卡结算'
]

/**
 * 门店设施 - 餐饮服务
 */
export const CATERING_FACILITIES = [
  '早餐送餐', '咖啡厅', '小吃吧', '便利店', '清真饮食'
]

/**
 * 门店设施 - 商务服务
 */
export const BUSINESS_FACILITIES = [
  '会议室', '商务中心', '多功能厅', '共享办公', '专用展览厅',
  '商务服务', '婚宴服务', '快递服务', '多媒体演示系统', '传真/复印'
]

/**
 * 门店设施 - 儿童设施
 */
export const CHILDREN_FACILITIES = [
  '室内游乐区', '儿童书籍', '桌面游戏', '儿童洗漱用品',
  '儿童拖鞋', '婴儿床', '床边护栏', '儿童防滑凳', '儿童餐椅'
]

/**
 * 门店设施 - 运动设施
 */
export const SPORTS_FACILITIES = [
  '健身室', '篮球场', '教练', '网球场', '瑜伽课', '模拟高尔夫',
  '瑜伽垫', '钓鱼', '高尔夫球场', '骑马', '滑雪', '射击',
  '沙滩排球', '乒乓球', '水上运动', '足球场', '浮潜'
]

/**
 * 门店设施 - 康体设施
 */
export const WELLNESS_FACILITIES = [
  '温泉', '足浴', '桑拿', '按摩', 'SPA'
]

/**
 * 门店设施 - 无障碍设施
 */
export const ACCESSIBILITY_FACILITIES = [
  '走廊扶手', '楼梯扶手', '泳池坡道', '无障碍客房',
  '无障碍通道', '助听设备', '手语服务', '提供轮椅'
]

/**
 * 门店亮点 - 建筑与景观类
 */
export const HIGHLIGHTS_ARCHITECTURE = [
  '老建筑', '特色民居', '大师设计', '家庭房', '庭院景', '花园景',
  '山景', '湖景', '江景', '河景', '海景', '草原', '雪山',
  '沙漠', '戈壁', '热带雨林'
]

/**
 * 门店亮点 - 服务与设施类
 */
export const HIGHLIGHTS_SERVICES = [
  '免费停车', '收费停车', '充电车位', '行李寄存', '免费接机站',
  '收费接机站', '餐厅', '茶室', '咖啡厅', '会议室', '儿童乐园',
  '酒吧', '洗衣房', '泳池', '大草坪', '徒步旅行', '温泉',
  '艺术空间', '健身房', 'SPA', '手工体验'
]

/**
 * 门店推荐标签（其他配置）
 * 用于商户端门店基本信息，最多选择2项
 */
export const STORE_RECOMMENDATION_TAGS = [
  '亲子乐享',
  '文艺复古',
  '理想乡居',
  '服务暖心',
  '有烟火气',
  '融于自然',
  '松弛自在',
  '宠物友好'
]

/**
 * 房型设施 - 客房设施
 */
export const ROOM_FACILITIES = [
  '空调', '冰箱', '地暖', '阳台', '暖气', '露台', '风扇',
  '遮光帘', '空气净化器', 'WIFI', '供氧设施'
]

/**
 * 房型设施 - 客房布局和家具
 */
export const ROOM_LAYOUT_FURNITURE = [
  '沙发', '私人温泉', '休闲椅', '私人泳池', '茶几', '书桌',
  '花园/庭院', '餐桌', '私人入口', '衣柜', '连通房', '壁炉'
]

/**
 * 房型设施 - 卫浴设施
 */
export const BATHROOM_FACILITIES = [
  '独立卫浴', '共用卫浴', '24小时热水', '智能马桶', '非24小时热水',
  '吹风机', '化妆镜', '淋浴', '浴袍', '浴缸', '毛巾',
  '淋浴和浴缸', '浴巾', '拖鞋'
]

/**
 * 房型设施 - 洗浴用品
 */
export const TOILETRIES = [
  '牙具', '梳子', '浴帽', '须刨', '洗发水',
  '护发素', '沐浴露', '润肤露', '香皂'
]

/**
 * 房型设施 - 床上用品
 */
export const BEDDING = [
  '备选枕头', '备用毯子', '备用床具'
]

/**
 * 房型设施 - 便利设施
 */
export const CONVENIENCE_FACILITIES = [
  '保险箱', '针线包', '衣架', '雨伞', '户外桌椅',
  '电子秤', '插座', '厨具'
]

/**
 * 房型设施 - 媒体科技
 */
export const MEDIA_TECH = [
  '电视', '音响', '智能锁', '投影仪', '电脑', 'iPad', '游戏机'
]

/**
 * 房型设施 - 食品饮品
 */
export const FOOD_DRINK = [
  '水果', '挂耳咖啡', '瓶装水', '软饮', '电热水壶', '酒精饮料',
  '咖啡壶/茶壶', '饮水机', 'mini吧', '咖啡机', '速食品', '茶叶', '小食'
]
