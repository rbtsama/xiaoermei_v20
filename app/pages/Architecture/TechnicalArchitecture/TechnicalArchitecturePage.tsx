/**
 * 技术架构页面
 * 包含：技术栈、时序图、API设计、数据库设计
 * 配色系统：#2C5F8D(主色) #C67A28(强调) #4A8FBF(辅助) #5A8A65(成功)
 */

import Sidebar, { menuConfig } from '~/pages/PointsSystem/components/Sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import {
  Code, Database, Server, Smartphone, Cloud, GitBranch,
  ArrowRight, ArrowDown, Users, ShoppingCart, CreditCard,
  Check, X, Bell, Calendar, Lock, Key
} from 'lucide-react'
import { useViewMode } from '~/contexts/ViewModeContext'

export default function TechnicalArchitecturePage() {
  const { isSidebarCollapsed } = useViewMode()

  return (
    <div className="flex h-screen overflow-hidden bg-brand-bg">
      <Sidebar menuItems={menuConfig} />
      <div className="flex-1 overflow-y-auto transition-all duration-300">
        <div className="p-8 space-y-8 max-w-[1800px] mx-auto">
          {/* 页面标题 */}
          <div className="text-center space-y-4 py-6">
            <h1 className="text-5xl font-bold text-text-primary tracking-tight">
              技术架构设计
            </h1>
            <p className="text-xl text-text-secondary font-medium">
              全栈技术选型 & 核心业务时序图 & API/数据库设计
            </p>
          </div>

          {/* 技术栈架构 */}
          <Card className="border-2 border-brand-primary rounded-xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-brand-primary to-brand-accent text-white py-5 rounded-t-xl">
              <CardTitle className="text-2xl flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Code className="w-7 h-7" />
                </div>
                全栈技术架构
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-white">
              <div className="grid grid-cols-3 gap-6">
                {/* 前端技术栈 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-brand-primary flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    前端技术栈
                  </h3>
                  <div className="space-y-3">
                    <TechItem category="框架" name="React 18 + Remix v2" reason="SSR优先，性能优化" />
                    <TechItem category="语言" name="TypeScript 5.6" reason="类型安全，代码质量" />
                    <TechItem category="样式" name="Tailwind CSS 3.4" reason="原子化CSS，快速开发" />
                    <TechItem category="组件库" name="shadcn/ui" reason="可定制Radix UI组件" />
                    <TechItem category="状态管理" name="React Context" reason="轻量级，内置支持" />
                    <TechItem category="构建工具" name="Vite 5.4" reason="极速构建，HMR" />
                    <TechItem category="小程序" name="微信原生框架" reason="性能最优，能力完整" />
                  </div>
                </div>

                {/* 后端技术栈 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-brand-success flex items-center gap-2">
                    <Server className="w-5 h-5" />
                    后端技术栈
                  </h3>
                  <div className="space-y-3">
                    <TechItem category="框架" name="Node.js + Express" reason="高性能，生态丰富" />
                    <TechItem category="语言" name="TypeScript" reason="前后端类型共享" />
                    <TechItem category="数据库" name="PostgreSQL 15" reason="关系型，事务支持" />
                    <TechItem category="缓存" name="Redis 7" reason="高性能缓存，分布式锁" />
                    <TechItem category="搜索" name="Elasticsearch" reason="全文检索，日志分析" />
                    <TechItem category="对象存储" name="阿里云 OSS" reason="图片视频存储" />
                    <TechItem category="消息队列" name="RabbitMQ" reason="异步解耦，削峰填谷" />
                  </div>
                </div>

                {/* 运维 & 中间件 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-brand-secondary flex items-center gap-2">
                    <Cloud className="w-5 h-5" />
                    运维 & 中间件
                  </h3>
                  <div className="space-y-3">
                    <TechItem category="容器化" name="Docker + K8s" reason="容器编排，弹性伸缩" />
                    <TechItem category="CI/CD" name="GitHub Actions" reason="自动化部署，代码检查" />
                    <TechItem category="监控" name="Prometheus + Grafana" reason="性能监控，告警" />
                    <TechItem category="日志" name="ELK Stack" reason="集中日志，可视化" />
                    <TechItem category="网关" name="Nginx" reason="负载均衡，反向代理" />
                    <TechItem category="支付" name="微信支付 + 支付宝" reason="第三方支付集成" />
                    <TechItem category="短信" name="阿里云短信" reason="验证码，通知" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 核心业务时序图 */}
          <Card className="border-2 border-brand-secondary rounded-xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-brand-secondary to-brand-error text-white py-5 rounded-t-xl">
              <CardTitle className="text-2xl flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <GitBranch className="w-7 h-7" />
                </div>
                核心业务时序图
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-white space-y-6">
              {/* 用户预订流程 */}
              <div>
                <h4 className="text-lg font-bold text-brand-primary mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  1. 用户预订流程（C端小程序）
                </h4>
                <SequenceDiagram
                  steps={[
                    { actor: "用户", action: "选择门店/房型/日期", target: "C端小程序", color: "brand-accent" },
                    { actor: "C端小程序", action: "GET /api/rooms/availability?date=xxx", target: "后端API", color: "brand-primary" },
                    { actor: "后端API", action: "查询库存&价格", target: "PostgreSQL", color: "brand-success" },
                    { actor: "PostgreSQL", action: "返回可用房型&价格", target: "后端API", color: "brand-success" },
                    { actor: "后端API", action: "返回房型列表", target: "C端小程序", color: "brand-primary" },
                    { actor: "用户", action: "确认订单&支付", target: "C端小程序", color: "brand-accent" },
                    { actor: "C端小程序", action: "POST /api/orders (创建订单)", target: "后端API", color: "brand-primary" },
                    { actor: "后端API", action: "锁定库存（乐观锁）", target: "PostgreSQL", color: "brand-success" },
                    { actor: "后端API", action: "发起支付请求", target: "微信支付", color: "brand-secondary" },
                    { actor: "微信支付", action: "返回支付二维码/链接", target: "后端API", color: "brand-secondary" },
                    { actor: "用户", action: "完成支付", target: "微信支付", color: "brand-accent" },
                    { actor: "微信支付", action: "支付回调", target: "后端API", color: "brand-secondary" },
                    { actor: "后端API", action: "更新订单状态&减库存", target: "PostgreSQL", color: "brand-success" },
                    { actor: "后端API", action: "发送MQ消息（订单确认）", target: "RabbitMQ", color: "brand-error" },
                    { actor: "RabbitMQ", action: "通知酒店后台", target: "酒店后台", color: "brand-success" },
                    { actor: "后端API", action: "发送订单确认短信/微信消息", target: "用户", color: "brand-primary" },
                  ]}
                />
              </div>

              {/* 酒店接单流程 */}
              <div>
                <h4 className="text-lg font-bold text-brand-success mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  2. 酒店接单流程（酒店后台）
                </h4>
                <SequenceDiagram
                  steps={[
                    { actor: "酒店后台", action: "WebSocket连接", target: "后端API", color: "brand-success" },
                    { actor: "后端API", action: "推送新订单通知", target: "酒店后台", color: "brand-primary" },
                    { actor: "酒店", action: "查看订单详情", target: "酒店后台", color: "brand-success" },
                    { actor: "酒店后台", action: "GET /api/hotel/orders/:id", target: "后端API", color: "brand-primary" },
                    { actor: "后端API", action: "查询订单&用户信息", target: "PostgreSQL", color: "brand-success" },
                    { actor: "酒店", action: "确认接单", target: "酒店后台", color: "brand-success" },
                    { actor: "酒店后台", action: "PUT /api/hotel/orders/:id/confirm", target: "后端API", color: "brand-primary" },
                    { actor: "后端API", action: "更新订单状态&同步PMS", target: "PMS系统", color: "brand-accent" },
                    { actor: "后端API", action: "发送MQ消息（接单成功）", target: "RabbitMQ", color: "brand-error" },
                    { actor: "RabbitMQ", action: "推送用户微信消息", target: "C端小程序", color: "brand-accent" },
                  ]}
                />
              </div>

              {/* 退款仲裁流程 */}
              <div>
                <h4 className="text-lg font-bold text-brand-error mb-4 flex items-center gap-2">
                  <X className="w-5 h-5" />
                  3. 退款仲裁流程（平台后台）
                </h4>
                <SequenceDiagram
                  steps={[
                    { actor: "用户", action: "申请退款&上传凭证", target: "C端小程序", color: "brand-accent" },
                    { actor: "C端小程序", action: "POST /api/refunds (创建退款)", target: "后端API", color: "brand-primary" },
                    { actor: "后端API", action: "保存退款申请&冻结订单", target: "PostgreSQL", color: "brand-success" },
                    { actor: "后端API", action: "通知酒店&平台", target: "RabbitMQ", color: "brand-error" },
                    { actor: "酒店", action: "同意/拒绝退款", target: "酒店后台", color: "brand-success" },
                    { actor: "酒店后台", action: "PUT /api/hotel/refunds/:id/respond", target: "后端API", color: "brand-primary" },
                    { actor: "后端API", action: "记录处理结果", target: "PostgreSQL", color: "brand-success" },
                    { actor: "后端API", action: "如拒绝→升级仲裁", target: "平台后台", color: "brand-primary" },
                    { actor: "仲裁员", action: "审核证据&裁决", target: "平台后台", color: "brand-secondary" },
                    { actor: "平台后台", action: "PUT /api/admin/refunds/:id/arbitrate", target: "后端API", color: "brand-primary" },
                    { actor: "后端API", action: "执行退款（微信原路退回）", target: "微信支付", color: "brand-secondary" },
                    { actor: "后端API", action: "更新订单&库存", target: "PostgreSQL", color: "brand-success" },
                    { actor: "后端API", action: "发送退款结果通知", target: "用户&酒店", color: "brand-primary" },
                  ]}
                />
              </div>
            </CardContent>
          </Card>

          {/* API设计 */}
          <Card className="border-2 border-brand-accent rounded-xl shadow-lg">
            <CardHeader className="bg-brand-accent text-white py-5 rounded-t-xl">
              <CardTitle className="text-2xl flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Server className="w-7 h-7" />
                </div>
                RESTful API 设计
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-white">
              <div className="grid grid-cols-2 gap-6">
                {/* C端API */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-brand-accent">C端小程序 API</h4>
                  <div className="space-y-2 text-sm">
                    <APIEndpoint method="POST" path="/api/auth/wechat-login" desc="微信登录授权" />
                    <APIEndpoint method="GET" path="/api/hotels?city=xxx&date=xxx" desc="搜索门店（支持筛选）" />
                    <APIEndpoint method="GET" path="/api/hotels/:id" desc="门店详情（含房型、设施）" />
                    <APIEndpoint method="GET" path="/api/rooms/availability" desc="查询房型库存&价格" />
                    <APIEndpoint method="POST" path="/api/orders" desc="创建订单" />
                    <APIEndpoint method="GET" path="/api/orders/:id" desc="订单详情" />
                    <APIEndpoint method="GET" path="/api/orders" desc="我的订单列表" />
                    <APIEndpoint method="POST" path="/api/orders/:id/cancel" desc="取消订单" />
                    <APIEndpoint method="POST" path="/api/refunds" desc="申请退款" />
                    <APIEndpoint method="POST" path="/api/reviews" desc="提交评价" />
                    <APIEndpoint method="GET" path="/api/users/me" desc="获取用户信息" />
                    <APIEndpoint method="PUT" path="/api/users/me" desc="更新用户信息" />
                    <APIEndpoint method="GET" path="/api/members/benefits" desc="会员权益查询" />
                    <APIEndpoint method="GET" path="/api/points/balance" desc="里程值余额" />
                    <APIEndpoint method="GET" path="/api/coupons/available" desc="可用优惠券" />
                  </div>
                </div>

                {/* 酒店后台API */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-brand-success">酒店后台 API</h4>
                  <div className="space-y-2 text-sm">
                    <APIEndpoint method="POST" path="/api/hotel/auth/login" desc="酒店账号登录" />
                    <APIEndpoint method="GET" path="/api/hotel/dashboard" desc="工作台数据看板" />
                    <APIEndpoint method="GET" path="/api/hotel/orders" desc="订单列表（支持筛选）" />
                    <APIEndpoint method="GET" path="/api/hotel/orders/:id" desc="订单详情" />
                    <APIEndpoint method="PUT" path="/api/hotel/orders/:id/confirm" desc="确认订单" />
                    <APIEndpoint method="PUT" path="/api/hotel/orders/:id/check-in" desc="办理入住" />
                    <APIEndpoint method="PUT" path="/api/hotel/orders/:id/check-out" desc="办理退房" />
                    <APIEndpoint method="GET" path="/api/hotel/rooms" desc="房型&房间管理" />
                    <APIEndpoint method="POST" path="/api/hotel/rooms" desc="创建房型" />
                    <APIEndpoint method="PUT" path="/api/hotel/prices" desc="批量更新房价" />
                    <APIEndpoint method="PUT" path="/api/hotel/inventory" desc="批量更新库存" />
                    <APIEndpoint method="GET" path="/api/hotel/refunds" desc="退款申请列表" />
                    <APIEndpoint method="PUT" path="/api/hotel/refunds/:id/respond" desc="处理退款申请" />
                    <APIEndpoint method="GET" path="/api/hotel/reviews" desc="用户评价列表" />
                    <APIEndpoint method="POST" path="/api/hotel/reviews/:id/reply" desc="回复评价" />
                    <APIEndpoint method="GET" path="/api/hotel/business/overview" desc="经营概览数据" />
                  </div>
                </div>
              </div>

              {/* 平台后台API */}
              <div className="mt-6 space-y-4">
                <h4 className="text-lg font-bold text-brand-primary">平台后台 API</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="space-y-2">
                    <p className="font-semibold text-text-primary">酒店管理</p>
                    <APIEndpoint method="GET" path="/api/admin/hotels" desc="合作酒店列表" />
                    <APIEndpoint method="POST" path="/api/admin/hotels" desc="创建酒店" />
                    <APIEndpoint method="PUT" path="/api/admin/hotels/:id" desc="编辑酒店信息" />
                    <APIEndpoint method="GET" path="/api/admin/applications" desc="加盟申请列表" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-text-primary">订单&争议</p>
                    <APIEndpoint method="GET" path="/api/admin/orders" desc="全平台订单" />
                    <APIEndpoint method="GET" path="/api/admin/refunds" desc="退款申请列表" />
                    <APIEndpoint method="PUT" path="/api/admin/refunds/:id/arbitrate" desc="仲裁裁决" />
                    <APIEndpoint method="GET" path="/api/admin/arbitrators" desc="仲裁员管理" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-text-primary">会员&营销</p>
                    <APIEndpoint method="GET" path="/api/admin/members" desc="会员列表" />
                    <APIEndpoint method="POST" path="/api/admin/coupons" desc="创建优惠券" />
                    <APIEndpoint method="POST" path="/api/admin/coupons/grant" desc="发放优惠券" />
                    <APIEndpoint method="GET" path="/api/admin/points/rules" desc="里程值规则" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 数据库设计 */}
          <Card className="border-2 border-brand-success rounded-xl shadow-lg">
            <CardHeader className="bg-brand-success text-white py-5 rounded-t-xl">
              <CardTitle className="text-2xl flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Database className="w-7 h-7" />
                </div>
                数据库设计（PostgreSQL）
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-white">
              <div className="grid grid-cols-2 gap-6">
                {/* 核心业务表 */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-brand-primary">核心业务表</h4>
                  <div className="space-y-3">
                    <DatabaseTable
                      name="users"
                      desc="用户表"
                      fields={[
                        "id (UUID PK)",
                        "wechat_openid (微信OpenID)",
                        "nickname, avatar, gender, birthday",
                        "phone, email (可选)",
                        "member_level (会员等级)",
                        "points_balance (里程值余额)",
                        "created_at, updated_at"
                      ]}
                    />
                    <DatabaseTable
                      name="hotels"
                      desc="门店表"
                      fields={[
                        "id (UUID PK)",
                        "name, address, city, district",
                        "latitude, longitude (坐标)",
                        "images (图片数组 JSONB)",
                        "facilities (设施数组 JSONB)",
                        "policies (政策 JSONB)",
                        "status (上线/下线)",
                        "commission_rate (抽佣比例)",
                        "created_at, updated_at"
                      ]}
                    />
                    <DatabaseTable
                      name="room_types"
                      desc="房型表"
                      fields={[
                        "id (UUID PK)",
                        "hotel_id (FK → hotels)",
                        "name, area, bed_type",
                        "max_guests (最大入住人数)",
                        "images (图片数组 JSONB)",
                        "amenities (设施 JSONB)",
                        "base_price (基础价格)",
                        "created_at, updated_at"
                      ]}
                    />
                    <DatabaseTable
                      name="orders"
                      desc="订单表（核心）"
                      fields={[
                        "id (UUID PK)",
                        "order_no (订单号 UNIQUE)",
                        "user_id (FK → users)",
                        "hotel_id (FK → hotels)",
                        "room_type_id (FK → room_types)",
                        "check_in_date, check_out_date",
                        "guests_count, nights",
                        "total_amount, discount_amount",
                        "actual_amount (实际支付)",
                        "status (待支付/已支付/已入住/已完成/已取消)",
                        "payment_status, payment_method",
                        "created_at, updated_at"
                      ]}
                    />
                  </div>
                </div>

                {/* 辅助业务表 */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-brand-success">辅助业务表</h4>
                  <div className="space-y-3">
                    <DatabaseTable
                      name="refunds"
                      desc="退款表"
                      fields={[
                        "id (UUID PK)",
                        "order_id (FK → orders)",
                        "user_id (FK → users)",
                        "refund_amount (退款金额)",
                        "reason (退款原因)",
                        "evidence (证据 JSONB)",
                        "status (待处理/已同意/已拒绝/仲裁中/已完成)",
                        "hotel_response (酒店回复)",
                        "arbitrator_id (仲裁员 FK)",
                        "arbitration_result (仲裁结果)",
                        "created_at, updated_at"
                      ]}
                    />
                    <DatabaseTable
                      name="reviews"
                      desc="评价表"
                      fields={[
                        "id (UUID PK)",
                        "order_id (FK → orders)",
                        "user_id (FK → users)",
                        "hotel_id (FK → hotels)",
                        "rating (评分 1-5)",
                        "content (评价内容)",
                        "images (图片 JSONB)",
                        "hotel_reply (酒店回复)",
                        "created_at"
                      ]}
                    />
                    <DatabaseTable
                      name="inventory"
                      desc="库存表（核心）"
                      fields={[
                        "id (UUID PK)",
                        "room_type_id (FK → room_types)",
                        "date (日期 DATE)",
                        "total_rooms (总房间数)",
                        "booked_rooms (已预订)",
                        "locked_rooms (锁定中)",
                        "available_rooms (可售)",
                        "price (当日价格)",
                        "updated_at"
                      ]}
                    />
                    <DatabaseTable
                      name="coupons"
                      desc="优惠券表"
                      fields={[
                        "id (UUID PK)",
                        "name, description",
                        "discount_type (满减/折扣)",
                        "discount_value (优惠金额/折扣)",
                        "min_order_amount (最低订单金额)",
                        "valid_from, valid_to",
                        "total_quantity, used_quantity",
                        "status (启用/禁用)",
                        "created_at"
                      ]}
                    />
                    <DatabaseTable
                      name="user_coupons"
                      desc="用户优惠券关联表"
                      fields={[
                        "id (UUID PK)",
                        "user_id (FK → users)",
                        "coupon_id (FK → coupons)",
                        "status (未使用/已使用/已过期)",
                        "used_at, order_id (FK → orders)",
                        "received_at"
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* 关键索引设计 */}
              <div className="mt-6 p-4 bg-brand-primary/5 rounded-lg border border-brand-primary/20">
                <h4 className="text-lg font-bold text-brand-primary mb-3 flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  关键索引设计
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-text-primary mb-2">用户相关</p>
                    <ul className="space-y-1 text-text-secondary">
                      <li>• users(wechat_openid) UNIQUE</li>
                      <li>• users(phone) UNIQUE</li>
                      <li>• users(member_level)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary mb-2">订单相关</p>
                    <ul className="space-y-1 text-text-secondary">
                      <li>• orders(order_no) UNIQUE</li>
                      <li>• orders(user_id, status)</li>
                      <li>• orders(hotel_id, status)</li>
                      <li>• orders(check_in_date)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary mb-2">库存相关</p>
                    <ul className="space-y-1 text-text-secondary">
                      <li>• inventory(room_type_id, date) UNIQUE</li>
                      <li>• inventory(date, available_rooms)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}

// ==================== 子组件 ====================

// 技术栈项
function TechItem({ category, name, reason }: { category: string; name: string; reason: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-border-normal hover:border-brand-primary/40 transition-colors">
      <div className="flex-shrink-0 w-16 text-xs font-semibold text-text-secondary">
        {category}
      </div>
      <div className="flex-1 space-y-1">
        <p className="font-semibold text-sm text-text-primary">{name}</p>
        <p className="text-xs text-text-tertiary">{reason}</p>
      </div>
    </div>
  )
}

// 时序图
function SequenceDiagram({ steps }: {
  steps: Array<{
    actor: string
    action: string
    target: string
    color: 'brand-primary' | 'brand-secondary' | 'brand-accent' | 'brand-success' | 'brand-error'
  }>
}) {
  const colorMap = {
    'brand-primary': { bg: 'bg-brand-primary', bgLight: 'bg-brand-primary/20', text: 'text-brand-primary' },
    'brand-secondary': { bg: 'bg-brand-secondary', bgLight: 'bg-brand-secondary/20', text: 'text-brand-secondary' },
    'brand-accent': { bg: 'bg-brand-accent', bgLight: 'bg-brand-accent/20', text: 'text-brand-accent' },
    'brand-success': { bg: 'bg-brand-success', bgLight: 'bg-brand-success/20', text: 'text-brand-success' },
    'brand-error': { bg: 'bg-brand-error', bgLight: 'bg-brand-error/20', text: 'text-brand-error' },
  }

  return (
    <div className="space-y-2 p-4 bg-gray-50 rounded-lg border border-border-normal">
      {steps.map((step, i) => {
        const colors = colorMap[step.color]
        return (
          <div key={i} className="flex items-center gap-3 text-xs">
            <Badge className={`${colors.bg} text-white w-28 justify-center`}>
              {step.actor}
            </Badge>
            <ArrowRight className="w-4 h-4 text-text-tertiary flex-shrink-0" />
            <span className="flex-1 text-text-secondary">{step.action}</span>
            <ArrowRight className="w-4 h-4 text-text-tertiary flex-shrink-0" />
            <Badge className={`${colors.bgLight} ${colors.text} w-28 justify-center`}>
              {step.target}
            </Badge>
          </div>
        )
      })}
    </div>
  )
}

// API端点
function APIEndpoint({ method, path, desc }: { method: string; path: string; desc: string }) {
  const methodColors: Record<string, string> = {
    GET: 'bg-brand-accent text-white',
    POST: 'bg-brand-success text-white',
    PUT: 'bg-brand-secondary text-white',
    DELETE: 'bg-brand-error text-white',
  }

  return (
    <div className="flex items-start gap-2 p-2 bg-gray-50 rounded border border-border-normal hover:border-brand-primary/40 transition-colors">
      <Badge className={`${methodColors[method]} text-xs font-mono w-14 justify-center`}>
        {method}
      </Badge>
      <code className="flex-1 text-xs font-mono text-text-primary">{path}</code>
      <span className="text-xs text-text-tertiary">{desc}</span>
    </div>
  )
}

// 数据库表
function DatabaseTable({ name, desc, fields }: { name: string; desc: string; fields: string[] }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-border-normal hover:border-brand-success/40 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div>
          <code className="text-sm font-bold text-brand-success">{name}</code>
          <p className="text-xs text-text-tertiary mt-1">{desc}</p>
        </div>
        <Database className="w-5 h-5 text-brand-success/40" />
      </div>
      <div className="space-y-1">
        {fields.map((field, i) => (
          <div key={i} className="text-xs text-text-secondary flex items-start gap-2">
            <span className="text-brand-success">•</span>
            <code className="flex-1">{field}</code>
          </div>
        ))}
      </div>
    </div>
  )
}
