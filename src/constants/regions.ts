/**
 * 中国省市地区数据
 * 用于门店部署、支付结算等模块的地区选择
 */

export interface RegionOption {
  value: string
  label: string
}

/**
 * 省份列表
 */
export const PROVINCE_OPTIONS: RegionOption[] = [
  { value: 'beijing', label: '北京' },
  { value: 'shanghai', label: '上海' },
  { value: 'tianjin', label: '天津' },
  { value: 'chongqing', label: '重庆' },
  { value: 'hebei', label: '河北' },
  { value: 'shanxi', label: '山西' },
  { value: 'neimenggu', label: '内蒙古' },
  { value: 'liaoning', label: '辽宁' },
  { value: 'jilin', label: '吉林' },
  { value: 'heilongjiang', label: '黑龙江' },
  { value: 'jiangsu', label: '江苏' },
  { value: 'zhejiang', label: '浙江' },
  { value: 'anhui', label: '安徽' },
  { value: 'fujian', label: '福建' },
  { value: 'jiangxi', label: '江西' },
  { value: 'shandong', label: '山东' },
  { value: 'henan', label: '河南' },
  { value: 'hubei', label: '湖北' },
  { value: 'hunan', label: '湖南' },
  { value: 'guangdong', label: '广东' },
  { value: 'guangxi', label: '广西' },
  { value: 'hainan', label: '海南' },
  { value: 'sichuan', label: '四川' },
  { value: 'guizhou', label: '贵州' },
  { value: 'yunnan', label: '云南' },
  { value: 'xizang', label: '西藏' },
  { value: 'shaanxi', label: '陕西' },
  { value: 'gansu', label: '甘肃' },
  { value: 'qinghai', label: '青海' },
  { value: 'ningxia', label: '宁夏' },
  { value: 'xinjiang', label: '新疆' }
]

/**
 * 城市数据映射
 * 简化版，实际项目中应从API动态加载
 */
export const CITY_OPTIONS: Record<string, RegionOption[]> = {
  zhejiang: [
    { value: 'hangzhou', label: '杭州市' },
    { value: 'ningbo', label: '宁波市' },
    { value: 'wenzhou', label: '温州市' },
    { value: 'jiaxing', label: '嘉兴市' },
    { value: 'huzhou', label: '湖州市' },
    { value: 'shaoxing', label: '绍兴市' },
    { value: 'jinhua', label: '金华市' },
    { value: 'quzhou', label: '衢州市' },
    { value: 'zhoushan', label: '舟山市' },
    { value: 'taizhou', label: '台州市' },
    { value: 'lishui', label: '丽水市' }
  ],
  jiangsu: [
    { value: 'nanjing', label: '南京市' },
    { value: 'wuxi', label: '无锡市' },
    { value: 'xuzhou', label: '徐州市' },
    { value: 'changzhou', label: '常州市' },
    { value: 'suzhou', label: '苏州市' },
    { value: 'nantong', label: '南通市' },
    { value: 'lianyungang', label: '连云港市' },
    { value: 'huaian', label: '淮安市' },
    { value: 'yancheng', label: '盐城市' },
    { value: 'yangzhou', label: '扬州市' },
    { value: 'zhenjiang', label: '镇江市' },
    { value: 'taizhou_js', label: '泰州市' },
    { value: 'suqian', label: '宿迁市' }
  ]
}
