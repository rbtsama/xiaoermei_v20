/**
 * 系统架构脑图组件 - 紧凑版
 * 功能颗粒度：2-6个工作日，适合打印输出
 */

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import {
  Building2,
  Users,
  Smartphone,
  Settings,
  Database,
  ShoppingCart,
  Gift,
  Shield,
  TrendingUp,
  Package,
  Star,
  Award,
  Search,
  Activity,
  ArrowDown,
  ArrowRight,
} from 'lucide-react'

// 平台后台架构
const platformArchitecture = {
  name: '平台后台',
  modules: [
    {
      name: '酒店入驻',
      functions: [
        '加盟申请管理（查看/筛选/跟进/导出）',
        '合作酒店管理（查看/编辑/上下线/配置抽佣）',
        '协议模板管理（创建/编辑/版本控制）',
        '签约记录查询（查看/筛选/导出）',
      ],
    },
    {
      name: '酒店管理',
      functions: [
        '房态总览（7天日历视图/房间状态颜色标识/可用数统计）',
        '预订管理（预订列表/状态筛选/新增前台预订/详情查看）',
        '入住管理（待入住/在住客人/办理入住退房/续住/押金管理）',
        '房价管理（房价日历/内联编辑/周末节假日差价/批量设置）',
        '客房管理（房间列表/房型楼层筛选/设施配置/状态管理）',
      ],
    },
    {
      name: '会员管理',
      functions: [
        '会员等级配置（等级信息/升级条件/权益折扣/赠送规则/会员卡图片）',
        '会员列表管理（查看/筛选/详情/导出）',
        '会员邀请配置（规则设置/奖励配置/启用管理）',
        '会员邀请记录（查看/筛选/统计/导出/三级菜单查看）',
        '亲友卡规则配置（触发条件/赠送规则/体验设置）',
        '亲友卡使用统计（发放记录/转化统计/效果分析）',
      ],
    },
    {
      name: '积分优惠券',
      functions: [
        '积分规则配置（获得规则/兑换规则/有效期/积分倍数）',
        '积分奖励服务配置（环保激励/离店发放/新增编辑删除/启用禁用）',
        '积分换购服务配置（增值服务/下单扣除/新增编辑删除/启用禁用）',
        '用户积分账户（查看余额/流水明细/手动调整）',
        '优惠券配置（创建/编辑/规则设置/启用管理）',
        '优惠券发放（批量发放/定向发放/记录查询）',
        '核销记录管理（查看/筛选/统计/导出）',
      ],
    },
    {
      name: '订单售后',
      functions: [
        '订单列表管理（查看/筛选/详情/导出）',
        '退款管理（审核/同意拒绝/记录查询）',
        '仲裁案件管理（查看/分配委员/裁决执行）',
        '仲裁委员管理（添加/编辑/删除/统计）',
      ],
    },
    {
      name: '营销监控',
      functions: [
        '广告管理（广告位配置/内容管理/Banner设置）',
        '酒店监控（运营数据/趋势分析/异常标记）',
        '协议条款管理（编辑/版本控制/发布）',
        '标签配置（创建/编辑/使用统计）',
      ],
    },
    {
      name: '用户账号',
      functions: [
        '用户列表管理（查看/筛选/详情/封禁）',
        '账号管理（创建/编辑/权限配置/日志）',
      ],
    },
  ],
}

// 酒店后台架构
const hotelArchitecture = {
  name: '酒店后台',
  modules: [
    {
      name: '工作台',
      functions: [
        '数据看板（订单/营收/入住率/待办事项）',
        '欢迎指引（配置向导/进度追踪/快捷跳转）',
      ],
    },
    {
      name: '门店信息',
      functions: [
        '基本信息（门店身份锁定/联系方式/Logo/推荐标签/门店介绍/列表封面/视频素材/最新情报）',
        '政策相关（预订时间/取消规则/入住年龄/儿童宠物政策/押金政策/支付方式/担保银行卡）',
        '门店设施（亮点标签10选项/交通服务/清洁服务/安全安保/运动设施/康体设施/无障碍设施）',
        '周边信息（按类别分组/景点交通餐饮购物医疗/新增编辑/拖动排序）',
        '早餐政策（提供开关/早餐类型/菜系/时间/加餐价格/儿童收费规则列表）',
        '加床政策（按院落分组表格/加床婴儿床配置/条件字段显示）',
        '门店图片（小程序分享图文案/主图列表最多5张/排序删除）',
      ],
    },
    {
      name: '房型库存',
      functions: [
        '房型列表管理（查看/创建/编辑/删除）',
        '房型详情配置（分类/面积床型/设施/介绍）',
        '房型图片管理（上传/排序/主图设置）',
        '房间管理（添加/编辑/状态/批量导入）',
        '房价日历（查看/单日设置/批量设置/快捷调价）',
        '库存日历（查看/单日设置/批量设置/超售策略）',
      ],
    },
    {
      name: '订单管理',
      functions: [
        '订单列表（筛选/搜索/详情/取消/导出）',
        '订单详情（信息查看/办理入住退房/打印确认函）',
        '订单日历（月视图/入住率/筛选/导出）',
        '退款管理（查看/审核/同意拒绝/标记紧急）',
      ],
    },
    {
      name: '会员评价',
      functions: [
        '会员管理（列表/筛选/排序/历史订单）',
        '用户评价管理（查看/筛选/回复/导出）',
      ],
    },
    {
      name: '老客服务',
      functions: [
        '创建专属订单（填写信息/限制购买人/生成二维码/特惠价格）',
        '邀请会员（极简版/点击生成二维码/赠送VIP1体验卡7天）',
      ],
    },
    {
      name: '积分服务',
      functions: [
        '积分服务查看（积分奖励/积分换购/查看配置）',
        '积分服务启用禁用（状态开关/仅查看不可修改）',
      ],
    },
    {
      name: '商品对接',
      functions: [
        '非房商品管理（添加/编辑/价格库存/销售统计）',
        'PMS集成（配置/测试/同步/日志）',
      ],
    },
    {
      name: '员工管理',
      functions: [
        '员工账号管理（添加/编辑/启用禁用/删除）',
      ],
    },
  ],
}

// C端小程序架构
const miniprogramArchitecture = {
  name: 'C端小程序',
  modules: [
    {
      name: '首页搜索',
      functions: [
        '首页浏览（Banner/推荐/标签筛选/搜索入口）',
        'Pick Up好店（标签筛选/列表浏览/收藏）',
        '搜索门店（关键词/位置/结果展示）',
        '关于小而美（平台介绍/品牌故事）',
      ],
    },
    {
      name: '门店预订',
      functions: [
        '店铺首页（封面/房型/日期选择/礼赠说明）',
        '房间详情（图片/信息/设施/政策/加购物车）',
        '门店详情（介绍/设施/政策/周边/联系）',
        '购物车（查看/修改/优惠明细/结算）',
        '确认订单（填写信息/积分换购/积分抵扣/优惠券/支付）',
        '支付成功（结果/亲友卡/查看订单）',
        '老客专属订单（扫码查看/验证身份/支付/不含积分）',
      ],
    },
    {
      name: '会员系统',
      functions: [
        '会员礼遇（明信片/自定义赠言/分享）',
        '会员中心（等级卡/权益/升级进度/快捷开通/体验次数）',
        '开通会员（VIP2年卡/权益说明/FAQ/购买）',
        '会员邀请（定向/无限制/确认/记录）',
        '积分券包（余额/流水/规则/积分换购/积分抵扣）',
      ],
    },
    {
      name: '收藏历史',
      functions: [
        '收藏好店（列表/取消收藏/查看详情）',
        '浏览历史（列表/清除/查看详情）',
      ],
    },
    {
      name: '个人中心',
      functions: [
        '我的页面（会员卡/订单入口/功能菜单）',
        '编辑个人信息（昵称/性别/生日/地区/邮箱）',
      ],
    },
    {
      name: '订单管理',
      functions: [
        '我的订单（状态筛选/查看/删除）',
        '订单详情（信息/费用/确认函/取消/退款/评价）',
        '取消预定（政策/原因/确认/救济条款）',
        '订单评价（评分/文字/图片/提交）',
        '售后管理（状态/证据/处理结果/仲裁）',
      ],
    },
    {
      name: '其他',
      functions: [
        '登录注册（微信授权/协议确认）',
        '门店入驻（信息填写/证照上传/PMS选择/提交）',
        '协议条款（用户协议/隐私政策）',
      ],
    },
  ],
}

// 统计
const stats = {
  platform: {
    modules: platformArchitecture.modules.length,
    functions: platformArchitecture.modules.reduce((s, m) => s + m.functions.length, 0),
  },
  hotel: {
    modules: hotelArchitecture.modules.length,
    functions: hotelArchitecture.modules.reduce((s, m) => s + m.functions.length, 0),
  },
  miniprogram: {
    modules: miniprogramArchitecture.modules.length,
    functions: miniprogramArchitecture.modules.reduce((s, m) => s + m.functions.length, 0),
  },
}

const totalFunctions = stats.platform.functions + stats.hotel.functions + stats.miniprogram.functions

export default function SystemArchitecture() {
  return (
    <div className="space-y-6">
      {/* 精简统计卡片 - 使用配色系统 */}
      <Card className="border-2 border-brand-secondary">
        <CardHeader className="bg-gradient-to-r from-brand-secondary to-brand-error text-white py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">三端系统功能架构</CardTitle>
            <div className="flex gap-4 text-sm">
              <Badge className="bg-white/20 text-white text-base px-3 py-1">3个产品端</Badge>
              <Badge className="bg-white/20 text-white text-base px-3 py-1">{totalFunctions}个功能模块</Badge>
              <Badge className="bg-white/20 text-white text-base px-3 py-1">
                {(totalFunctions * 4).toFixed(0)}工作日
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 三端架构图 - 紧凑布局 */}
      <div className="grid grid-cols-3 gap-4">
        {/* 平台后台 - 使用主色 brand-primary */}
        <Card className="border-2 border-brand-primary">
          <CardHeader className="bg-brand-primary text-white py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                <CardTitle className="text-lg">{platformArchitecture.name}</CardTitle>
              </div>
              <Badge className="bg-brand-primary/80 text-white">
                {stats.platform.functions}个功能
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {platformArchitecture.modules.map((module, i) => (
                <div key={i} className="bg-brand-primary/5 rounded p-3 border border-brand-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-sm text-brand-primary">
                      {module.name}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {module.functions.length}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    {module.functions.map((func, j) => (
                      <div key={j} className="text-xs text-text-secondary flex items-start gap-1">
                        <span className="text-brand-primary flex-shrink-0">•</span>
                        <span>{func}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 酒店后台 - 使用成功色 brand-success */}
        <Card className="border-2 border-brand-success">
          <CardHeader className="bg-brand-success text-white py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                <CardTitle className="text-lg">{hotelArchitecture.name}</CardTitle>
              </div>
              <Badge className="bg-brand-success/80 text-white">
                {stats.hotel.functions}个功能
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {hotelArchitecture.modules.map((module, i) => (
                <div key={i} className="bg-brand-success/5 rounded p-3 border border-brand-success/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-sm text-brand-success">
                      {module.name}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {module.functions.length}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    {module.functions.map((func, j) => (
                      <div key={j} className="text-xs text-text-secondary flex items-start gap-1">
                        <span className="text-brand-success flex-shrink-0">•</span>
                        <span>{func}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* C端小程序 - 使用辅助色 brand-accent */}
        <Card className="border-2 border-brand-accent">
          <CardHeader className="bg-brand-accent text-white py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                <CardTitle className="text-lg">{miniprogramArchitecture.name}</CardTitle>
              </div>
              <Badge className="bg-brand-accent/80 text-white">
                {stats.miniprogram.functions}个功能
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {miniprogramArchitecture.modules.map((module, i) => (
                <div key={i} className="bg-brand-accent/5 rounded p-3 border border-brand-accent/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-sm text-brand-accent">
                      {module.name}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {module.functions.length}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    {module.functions.map((func, j) => (
                      <div key={j} className="text-xs text-text-secondary flex items-start gap-1">
                        <span className="text-brand-accent flex-shrink-0">•</span>
                        <span>{func}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 数据流向图 - 使用配色系统 */}
      <Card className="border-2 border-border-normal">
        <CardHeader className="bg-text-primary text-white py-3">
          <CardTitle className="text-lg">核心业务数据流</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {/* 预订流程 */}
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-brand-accent">用户预订流程</h4>
              <div className="flex items-center gap-2 text-xs">
                <Badge className="bg-brand-accent text-white">C端</Badge>
                <ArrowRight className="w-3 h-3" />
                <span className="text-text-secondary">浏览门店</span>
                <ArrowRight className="w-3 h-3" />
                <Badge className="bg-brand-secondary text-white">查库存价格</Badge>
                <ArrowRight className="w-3 h-3" />
                <span className="text-text-secondary">下单支付</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Badge className="bg-brand-secondary text-white">订单创建</Badge>
                <ArrowRight className="w-3 h-3" />
                <Badge className="bg-brand-success text-white">锁定库存</Badge>
                <ArrowRight className="w-3 h-3" />
                <Badge className="bg-brand-primary text-white">通知平台</Badge>
                <ArrowRight className="w-3 h-3" />
                <Badge className="bg-brand-success text-white">酒店可见</Badge>
              </div>
            </div>

            {/* 管理流程 */}
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-brand-success">酒店管理流程</h4>
              <div className="flex items-center gap-2 text-xs">
                <Badge className="bg-brand-success text-white">酒店后台</Badge>
                <ArrowRight className="w-3 h-3" />
                <span className="text-text-secondary">更新价格库存</span>
                <ArrowRight className="w-3 h-3" />
                <Badge className="bg-brand-secondary text-white">实时同步</Badge>
                <ArrowRight className="w-3 h-3" />
                <Badge className="bg-brand-accent text-white">C端可见</Badge>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Badge className="bg-brand-accent text-white">PMS系统</Badge>
                <ArrowRight className="w-3 h-3" />
                <Badge className="bg-brand-success text-white">自动同步</Badge>
                <ArrowRight className="w-3 h-3" />
                <Badge className="bg-brand-secondary text-white">更新库存</Badge>
                <ArrowRight className="w-3 h-3" />
                <Badge className="bg-brand-primary text-white">多端共享</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
