# Vue 2.6.12 全量迁移执行计划 V2

> **迁移目标**: 从 Remix + React + shadcn/ui 迁移到 Vue 2.6.12 + Ant Design Vue 1.7.8
> **迁移策略**: 全量迁移，保持功能、逻辑、数据、UI、导航菜单完全一致

---

## 📋 导航菜单分析结果

### 当前导航菜单结构 (来自 `Sidebar.tsx`)

```
设计架构/
├─ 产品架构/
│  └─ 总图 (/architecture/product/overview)
└─ 设计规范/
   ├─ 配色系统 (/architecture/design/color-system)
   └─ 配色系统2 (/architecture/design/color-system-2)

平台后台/
├─ 订单管理/
│  ├─ 订单列表 (/order/list)
│  └─ 退款管理 (/dispute/refund-requests)
├─ 会员管理/
│  └─ 会员查询 (/platform-admin/member-management/members)
├─ 优惠券管理/
│  ├─ 优惠券列表 (/platform-admin/coupon-management/list)
│  └─ 优惠券发放 (/platform-admin/coupon-management/issue)
└─ 积分管理/
   ├─ 积分配置 (/platform-admin/points-management/config)
   └─ 积分调整 (/platform-admin/points-management/adjust)

商户端/
├─ 入驻平台/
│  └─ 入驻申请 (/merchant-backend/join-application/apply)
├─ 门店信息/
│  ├─ 基本信息 (/merchant-backend/store-info/basic)
│  ├─ 政策相关 (/merchant-backend/store-info/policy)
│  ├─ 门店设施 (/merchant-backend/store-info/facilities)
│  ├─ 周边信息 (/merchant-backend/store-info/surrounding)
│  ├─ 早餐政策 (/merchant-backend/store-info/breakfast)
│  ├─ 加床政策 (/merchant-backend/store-info/extra-bed)
│  └─ 门店图片 (/merchant-backend/store-info/images)
├─ 订单管理/
│  ├─ 订单列表 (/hotel-backend/order-list)
│  ├─ 订单日历 (/hotel-backend/order-calendar)
│  ├─ 客诉退款 (/hotel-backend/refund-management)
│  └─ 用户评价 (/hotel-backend/user-reviews)
├─ 房务管理/
│  ├─ 房价日历 (/hotel-backend/room-price-calendar)
│  ├─ 库存日历 (/hotel-backend/inventory-calendar)
│  ├─ 房型列表 (/hotel-backend/room-type-list)
│  ├─ 房型图片 (/hotel-backend/room-type-images)
│  ├─ 房间管理 (/hotel-backend/rooms)
│  └─ PMS对接 (/hotel-backend/pms-integration)
└─ 会员服务/
   ├─ 积分服务配置 * (/merchant-backend/points-service/config)
   ├─ VIP折扣配置 * (/merchant-backend/vip-discount/config)
   ├─ 代客下单 * (/merchant-backend/agent-order/create)
   └─ 邀请会员 * (/merchant-backend/old-customer/invite-member)
```

**需要迁移的页面总数**: **29个页面**

---

## 🗑️ 阶段 1: 清理无用代码

### 1.1 不在导航菜单中的页面（需要删除）

经过对比分析，以下页面/文件夹不在导航菜单中，需要删除：

**删除的页面模块:**
```
app/pages/AccountManagement/          ❌ 账号管理 (不在菜单)
app/pages/DisputeManagement/          ❌ 争议管理 (已合并到订单管理)
app/pages/HotelBackend/Dashboard*     ❌ 仪表盘 (不在菜单)
app/pages/HotelBackend/Members*       ❌ 会员页面 (不在菜单)
app/pages/HotelBackend/Rooms*         ❌ 房间页面 (与房务管理重复)
app/pages/HotelBackend/RoomTypes*     ❌ 房型页面 (与房型列表重复)
app/pages/HotelBackend/Staff*         ❌ 员工管理 (不在菜单)
app/pages/HotelBackend/Stores*        ❌ 门店列表 (不在菜单)
app/pages/HotelBackend/StoreBenefits* ❌ 门店权益 (不在菜单)
app/pages/HotelBackend/BusinessManagement/ ❌ 经营分析 (不在菜单)
app/pages/HotelManagement/            ❌ 酒店管理 (不在菜单)
app/pages/HotelOnboarding/            ❌ 酒店入驻 (不在菜单)
app/pages/MarketingManagement/        ❌ 营销管理 (不在菜单)
app/pages/MemberInvitation/           ❌ 会员邀请 (不在菜单)
app/pages/MemberSystem/               ❌ 会员系统 (不在菜单)
app/pages/OrderManagement/            ❌ 订单管理 (重复,已有路由)
app/pages/PlatformAdmin/Hotel/        ❌ 酒店监控 (不在菜单)
app/pages/PlatformManagement/         ❌ 平台管理 (不在菜单)
app/pages/PointsSystem/               ❌ 积分系统 (不在菜单)
app/pages/SystemSettings/             ❌ 系统设置 (不在菜单)
app/pages/UserManagement/             ❌ 用户管理 (不在菜单)
app/pages/WechatMiniprogram/          ❌ 微信小程序 (不在菜单)
app/pages/FriendCard/                 ❌ 好友卡 (不在菜单)
app/pages/Architecture/ScenarioDesign/ ❌ 场景设计 (不在菜单)
app/pages/Architecture/TechnicalArchitecture/ ❌ 技术架构 (不在菜单)
app/pages/CClient/                    ❌ C端页面 (不在菜单)
```

**删除的路由文件:**
```
app/routes/hotel/                     ❌
app/routes/member/                    ❌
app/routes/marketing/                 ❌
app/routes/points-system/             ❌
app/routes/system/                    ❌
app/routes/architecture/              ✅ 保留 (设计架构在菜单中)
app/routes/platform-admin/hotel*      ❌
app/routes/platform-admin/user-management/ ❌
app/routes/hotel-backend/staff*       ❌
app/routes/hotel-backend/stores*      ❌
app/routes/hotel-backend/members*     ❌
app/routes/hotel-backend/dashboard*   ❌
app/routes/hotel-backend/business*    ❌
app/routes/hotel-backend/non-room*    ❌
app/routes/hotel-backend/member-invitation* ❌
app/routes/c-client/                  ❌
```

### 1.2 Git 提交点 1

```bash
# 删除所有不在菜单的代码
git add .
git commit -m "refactor: 清理不在导航菜单中的页面和路由

- 删除 AccountManagement, DisputeManagement 等24个模块
- 删除对应的路由文件
- 保留导航菜单中的29个页面
- 基于 Sidebar.tsx menuConfig 分析结果

迁移准备工作: 阶段1完成"
```

---

## 📝 阶段 2: 更新 CLAUDE.md

### 2.1 创建新的 Vue 2 架构文档

**文件**: `CLAUDE_VUE2.md`

**内容结构**:
```markdown
# Vue 2.6.12 + Ant Design Vue 1.7.8 项目开发规范

## Part 1: 项目设置
- 技术栈清单
- 依赖安装
- Vite 配置
- Less 主题配置

## Part 2: 架构规范
- 目录结构
- 模块组织
- 路由规范
- 状态管理

## Part 3: 开发流程
- Types → Mocks → Service → Components
- Vue 组件编写规范
- Ant Design 组件使用

## Part 4: 设计系统
- 配色系统 (保持原有)
- 组件规范
- 响应式规范
```

### 2.2 Git 提交点 2

```bash
git add CLAUDE_VUE2.md
git commit -m "docs: 新增 Vue 2.6.12 架构文档

- 创建 CLAUDE_VUE2.md
- 定义 Vue 2 + Ant Design 开发规范
- 定义目录结构和开发流程
- 保留原有配色系统

迁移准备工作: 阶段2完成"
```

---

## 🏗️ 阶段 3: 初始化 Vue 2 项目框架

### 3.1 创建新分支

```bash
git checkout -b feature/vue2-migration
```

### 3.2 安装依赖并配置

#### 3.2.1 清理旧依赖
```bash
npm uninstall @remix-run/react @remix-run/node @remix-run/dev @remix-run/serve
npm uninstall tailwindcss tailwind-merge clsx tailwindcss-animate
npm uninstall @radix-ui/react-* class-variance-authority
```

#### 3.2.2 安装 Vue 2 依赖
```bash
# 核心
npm install vue@2.6.12 vue-router@3.5.4 vuex@3.6.2
npm install @vue/composition-api@1.7.2

# UI 框架
npm install ant-design-vue@1.7.8 moment@2.29.4

# 工具库
npm install dayjs@1.11.13 lodash@4.17.21

# 开发依赖
npm install -D vite@5.4.11 @vitejs/plugin-vue2@2.3.1
npm install -D vue-template-compiler@2.6.12
npm install -D less@4.2.0 less-loader@11.1.0
npm install -D typescript@5.6.3
```

#### 3.2.3 创建配置文件

**1. `vite.config.js`**
```javascript
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import path from 'path'

export default defineConfig({
  plugins: [createVuePlugin()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'src')
    }
  },

  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // 四季配色系统
          'primary-color': '#2C5F8D',
          'success-color': '#5A8A65',
          'error-color': '#B94D3D',
          'warning-color': '#C67A28',
          'info-color': '#4A8FBF',
          'border-radius-base': '8px',
          'font-size-base': '14px'
        }
      }
    }
  },

  server: {
    port: 3000
  }
})
```

**2. `src/main.js`**
```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueCompositionAPI from '@vue/composition-api'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/theme.less'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueCompositionAPI)
Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

**3. `src/styles/theme.less`**
```less
@import '~ant-design-vue/dist/antd.less';

// 四季自然配色系统
@primary-color: #2C5F8D;        // 冬·深蓝
@success-color: #5A8A65;        // 森林绿
@error-color: #B94D3D;          // 砖瓦红
@warning-color: #C67A28;        // 秋·深橙
@info-color: #4A8FBF;           // 夏·湖蓝

// 中性色
@text-color: #2A2A2A;
@text-color-secondary: #6B6B6B;
@border-color-base: #E5E5E5;
@background-color-base: #F8F6F3;

// 圆角和阴影
@border-radius-base: 8px;
@box-shadow-base: 0 2px 8px rgba(0, 0, 0, 0.08);

// 字体
@font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
@font-size-base: 14px;
```

**4. `index.html`**
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>小而美2.0 - 民宿管理系统</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

**5. `package.json` (更新 scripts)**
```json
{
  "scripts": {
    "dev": "vite --port 3000",
    "build": "vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit"
  }
}
```

#### 3.2.4 创建目录结构
```bash
mkdir -p src/views/{Architecture,PlatformAdmin,MerchantBackend}
mkdir -p src/views/Architecture/{ProductArchitecture,DesignSystem}
mkdir -p src/views/PlatformAdmin/{OrderManagement,MemberManagement,CouponManagement,PointsManagement}
mkdir -p src/views/MerchantBackend/{JoinApplication,StoreInfo,OrderManagement,RoomManagement,MemberService}
mkdir -p src/components
mkdir -p src/router
mkdir -p src/store
mkdir -p src/styles
mkdir -p src/utils
```

#### 3.2.5 创建布局组件

**`src/components/Layout/Sidebar.vue`**
```vue
<template>
  <div>
    <!-- 收起按钮 -->
    <div v-if="collapsed" class="fixed left-0 top-20 z-50">
      <a-button @click="toggleSidebar" size="small">
        <a-icon type="right" />
      </a-button>
    </div>

    <!-- 侧边栏 -->
    <a-layout-sider
      v-if="!collapsed"
      :width="256"
      theme="light"
      class="sidebar"
    >
      <div class="logo-container">
        <router-link to="/">
          <h1>小而美2.0</h1>
        </router-link>
        <a-button @click="toggleSidebar" size="small" icon="left" />
      </div>

      <a-menu
        mode="inline"
        :selected-keys="selectedKeys"
        :open-keys.sync="openKeys"
        @select="handleSelect"
      >
        <template v-for="item in menuItems">
          <a-sub-menu v-if="item.children" :key="item.title">
            <span slot="title">{{ item.title }}</span>
            <template v-for="child in item.children">
              <a-sub-menu v-if="child.children" :key="child.title">
                <span slot="title">{{ child.title }}</span>
                <a-menu-item
                  v-for="leaf in child.children"
                  :key="leaf.path"
                >
                  <router-link :to="leaf.path">
                    {{ leaf.title }}
                  </router-link>
                </a-menu-item>
              </a-sub-menu>
              <a-menu-item v-else :key="child.path">
                <router-link :to="child.path">
                  {{ child.title }}
                </router-link>
              </a-menu-item>
            </template>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from '@vue/composition-api'
import { menuConfig } from './menuConfig'

export default defineComponent({
  name: 'Sidebar',
  setup(props, { root }) {
    const collapsed = ref(false)
    const openKeys = ref(['设计架构', '平台后台', '商户端'])

    const selectedKeys = computed(() => {
      return [root.$route.path]
    })

    const toggleSidebar = () => {
      collapsed.value = !collapsed.value
    }

    const handleSelect = ({ key }) => {
      root.$router.push(key)
    }

    return {
      collapsed,
      openKeys,
      selectedKeys,
      menuItems: menuConfig,
      toggleSidebar,
      handleSelect
    }
  }
})
</script>

<style scoped lang="less">
.sidebar {
  height: 100vh;
  border-right: 1px solid #e8e8e8;
  overflow-y: auto;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #e8e8e8;

  h1 {
    font-size: 18px;
    font-weight: bold;
    margin: 0;
  }
}
</style>
```

**`src/components/Layout/menuConfig.js`**
```javascript
export const menuConfig = [
  {
    title: '设计架构',
    children: [
      {
        title: '产品架构',
        children: [
          { title: '总图', path: '/architecture/product/overview' }
        ]
      },
      {
        title: '设计规范',
        children: [
          { title: '配色系统', path: '/architecture/design/color-system' },
          { title: '配色系统2', path: '/architecture/design/color-system-2' }
        ]
      }
    ]
  },
  {
    title: '平台后台',
    children: [
      {
        title: '订单管理',
        children: [
          { title: '订单列表', path: '/order/list' },
          { title: '退款管理', path: '/dispute/refund-requests' }
        ]
      },
      {
        title: '会员管理',
        children: [
          { title: '会员查询', path: '/platform-admin/member-management/members' }
        ]
      },
      {
        title: '优惠券管理',
        children: [
          { title: '优惠券列表', path: '/platform-admin/coupon-management/list' },
          { title: '优惠券发放', path: '/platform-admin/coupon-management/issue' }
        ]
      },
      {
        title: '积分管理',
        children: [
          { title: '积分配置', path: '/platform-admin/points-management/config' },
          { title: '积分调整', path: '/platform-admin/points-management/adjust' }
        ]
      }
    ]
  },
  {
    title: '商户端',
    children: [
      {
        title: '入驻平台',
        children: [
          { title: '入驻申请', path: '/merchant-backend/join-application/apply' }
        ]
      },
      {
        title: '门店信息',
        children: [
          { title: '基本信息', path: '/merchant-backend/store-info/basic' },
          { title: '政策相关', path: '/merchant-backend/store-info/policy' },
          { title: '门店设施', path: '/merchant-backend/store-info/facilities' },
          { title: '周边信息', path: '/merchant-backend/store-info/surrounding' },
          { title: '早餐政策', path: '/merchant-backend/store-info/breakfast' },
          { title: '加床政策', path: '/merchant-backend/store-info/extra-bed' },
          { title: '门店图片', path: '/merchant-backend/store-info/images' }
        ]
      },
      {
        title: '订单管理',
        children: [
          { title: '订单列表', path: '/hotel-backend/order-list' },
          { title: '订单日历', path: '/hotel-backend/order-calendar' },
          { title: '客诉退款', path: '/hotel-backend/refund-management' },
          { title: '用户评价', path: '/hotel-backend/user-reviews' }
        ]
      },
      {
        title: '房务管理',
        children: [
          { title: '房价日历', path: '/hotel-backend/room-price-calendar' },
          { title: '库存日历', path: '/hotel-backend/inventory-calendar' },
          { title: '房型列表', path: '/hotel-backend/room-type-list' },
          { title: '房型图片', path: '/hotel-backend/room-type-images' },
          { title: '房间管理', path: '/hotel-backend/rooms' },
          { title: 'PMS对接', path: '/hotel-backend/pms-integration' }
        ]
      },
      {
        title: '会员服务',
        children: [
          { title: '积分服务配置', path: '/merchant-backend/points-service/config' },
          { title: 'VIP折扣配置', path: '/merchant-backend/vip-discount/config' },
          { title: '代客下单', path: '/merchant-backend/agent-order/create' },
          { title: '邀请会员', path: '/merchant-backend/old-customer/invite-member' }
        ]
      }
    ]
  }
]
```

**`src/App.vue`**
```vue
<template>
  <a-config-provider :locale="zhCN">
    <a-layout id="app">
      <Sidebar />
      <a-layout-content class="main-content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-config-provider>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import Sidebar from '@/components/Layout/Sidebar.vue'

export default defineComponent({
  name: 'App',
  components: { Sidebar },
  setup() {
    return { zhCN }
  }
})
</script>

<style lang="less">
#app {
  min-height: 100vh;
}

.main-content {
  overflow-y: auto;
  background: #f0f2f5;
}
</style>
```

### 3.3 Git 提交点 3

```bash
git add .
git commit -m "feat: 初始化 Vue 2.6.12 项目框架

- 安装 Vue 2 + Ant Design Vue 依赖
- 配置 Vite + Less
- 创建目录结构
- 实现布局和侧边栏组件
- 配置导航菜单 (29个页面)

迁移准备工作: 阶段3完成"
```

---

## 🔄 阶段 4: 迁移页面 (设计架构 + 平台后台)

### 4.1 子模块 1: 设计架构 (3个页面)

#### 页面清单:
1. `/architecture/product/overview` - 产品架构总图
2. `/architecture/design/color-system` - 配色系统
3. `/architecture/design/color-system-2` - 配色系统2

#### 迁移步骤:
1. 创建 `src/views/Architecture/ProductArchitecture/OverviewPage.vue`
2. 创建 `src/views/Architecture/DesignSystem/ColorSystemPage.vue`
3. 创建 `src/views/Architecture/DesignSystem/ColorSystem2Page.vue`
4. 迁移原有 React 组件逻辑到 Vue
5. 替换 shadcn/ui 组件为 Ant Design
6. 保持原有布局和样式

#### Git 提交:
```bash
git add src/views/Architecture/
git commit -m "feat(architecture): 迁移设计架构模块

- 迁移产品架构总图页面
- 迁移配色系统页面
- 迁移配色系统2页面
- 使用 Ant Design 组件
- 保持原有功能和样式

模块进度: 3/29 页面完成"
```

### 4.2 子模块 2: 订单管理 (2个页面)

#### 页面清单:
1. `/order/list` - 订单列表
2. `/dispute/refund-requests` - 退款管理

#### 迁移内容:
- Types: 订单类型、退款类型
- Mocks: 订单mock数据、退款mock数据
- Service: 订单服务、退款服务
- Components: 订单列表组件、退款列表组件
- Filters: 筛选器组件
- Tables: 表格组件

#### Git 提交:
```bash
git add src/views/PlatformAdmin/OrderManagement/
git commit -m "feat(platform-admin): 迁移订单管理模块

- 迁移订单列表页面 (含types, mocks, service)
- 迁移退款管理页面
- 实现筛选器和表格
- 使用 a-table, a-form, a-button 等组件

模块进度: 5/29 页面完成"
```

### 4.3 子模块 3: 会员管理 (1个页面)

#### 页面清单:
1. `/platform-admin/member-management/members` - 会员查询

#### Git 提交:
```bash
git add src/views/PlatformAdmin/MemberManagement/
git commit -m "feat(platform-admin): 迁移会员管理模块

- 迁移会员查询页面
- 实现会员搜索和筛选
- 实现会员详情查看

模块进度: 6/29 页面完成"
```

### 4.4 子模块 4: 优惠券管理 (2个页面)

#### 页面清单:
1. `/platform-admin/coupon-management/list` - 优惠券列表
2. `/platform-admin/coupon-management/issue` - 优惠券发放

#### 迁移重点:
- 优惠券类型枚举
- 优惠券状态管理
- 优惠券发放表单
- 发放记录查询

#### Git 提交:
```bash
git add src/views/PlatformAdmin/CouponManagement/
git commit -m "feat(platform-admin): 迁移优惠券管理模块

- 迁移优惠券列表页面
- 迁移优惠券发放页面
- 实现优惠券创建/编辑表单
- 实现优惠券状态切换

模块进度: 8/29 页面完成"
```

### 4.5 子模块 5: 积分管理 (2个页面)

#### 页面清单:
1. `/platform-admin/points-management/config` - 积分配置
2. `/platform-admin/points-management/adjust` - 积分调整

#### Git 提交:
```bash
git add src/views/PlatformAdmin/PointsManagement/
git commit -m "feat(platform-admin): 迁移积分管理模块

- 迁移积分配置页面
- 迁移积分调整页面
- 实现积分规则配置表单
- 实现手动调整积分功能

模块进度: 10/29 页面完成
平台后台模块: 全部完成 ✅"
```

---

## 🏪 阶段 5: 迁移商户端模块 (19个页面)

### 5.1 子模块 1: 入驻平台 (1个页面)

#### 页面清单:
1. `/merchant-backend/join-application/apply` - 入驻申请

#### Git 提交:
```bash
git add src/views/MerchantBackend/JoinApplication/
git commit -m "feat(merchant-backend): 迁移入驻平台模块

- 迁移入驻申请页面
- 实现多步骤表单
- 实现资料上传功能

模块进度: 11/29 页面完成"
```

### 5.2 子模块 2: 门店信息 (7个页面)

#### 页面清单:
1. `/merchant-backend/store-info/basic` - 基本信息
2. `/merchant-backend/store-info/policy` - 政策相关
3. `/merchant-backend/store-info/facilities` - 门店设施
4. `/merchant-backend/store-info/surrounding` - 周边信息
5. `/merchant-backend/store-info/breakfast` - 早餐政策
6. `/merchant-backend/store-info/extra-bed` - 加床政策
7. `/merchant-backend/store-info/images` - 门店图片

#### 迁移策略:
- 使用 Tabs 组件组织7个页面
- 每个 Tab 对应一个子页面
- 共享 store-info 状态

#### Git 提交:
```bash
git add src/views/MerchantBackend/StoreInfo/
git commit -m "feat(merchant-backend): 迁移门店信息模块

- 迁移7个门店信息子页面
- 使用 a-tabs 组织页面结构
- 实现图片上传功能
- 实现设施多选功能

模块进度: 18/29 页面完成"
```

### 5.3 子模块 3: 订单管理 (4个页面)

#### 页面清单:
1. `/hotel-backend/order-list` - 订单列表
2. `/hotel-backend/order-calendar` - 订单日历
3. `/hotel-backend/refund-management` - 客诉退款
4. `/hotel-backend/user-reviews` - 用户评价

#### 特殊组件:
- 订单日历: 使用 `a-calendar` 或自定义日历组件

#### Git 提交:
```bash
git add src/views/MerchantBackend/OrderManagement/
git commit -m "feat(merchant-backend): 迁移订单管理模块

- 迁移订单列表页面
- 迁移订单日历页面 (使用 a-calendar)
- 迁移退款管理页面
- 迁移用户评价页面

模块进度: 22/29 页面完成"
```

### 5.4 子模块 4: 房务管理 (6个页面)

#### 页面清单:
1. `/hotel-backend/room-price-calendar` - 房价日历
2. `/hotel-backend/inventory-calendar` - 库存日历
3. `/hotel-backend/room-type-list` - 房型列表
4. `/hotel-backend/room-type-images` - 房型图片
5. `/hotel-backend/rooms` - 房间管理
6. `/hotel-backend/pms-integration` - PMS对接

#### 复杂组件:
- 房价日历: 日历表格组件
- 库存日历: 日历表格组件

#### Git 提交:
```bash
git add src/views/MerchantBackend/RoomManagement/
git commit -m "feat(merchant-backend): 迁移房务管理模块

- 迁移房价日历页面
- 迁移库存日历页面
- 迁移房型列表页面
- 迁移房型图片上传页面
- 迁移房间管理页面
- 迁移PMS对接页面

模块进度: 28/29 页面完成"
```

### 5.5 子模块 5: 会员服务 (4个页面)

#### 页面清单:
1. `/merchant-backend/points-service/config` - 积分服务配置 *
2. `/merchant-backend/vip-discount/config` - VIP折扣配置 *
3. `/merchant-backend/agent-order/create` - 代客下单 *
4. `/merchant-backend/old-customer/invite-member` - 邀请会员 *

#### 注意:
- 这些页面标记了 `*` (待完善)
- 优先实现基础框架

#### Git 提交:
```bash
git add src/views/MerchantBackend/MemberService/
git commit -m "feat(merchant-backend): 迁移会员服务模块

- 迁移积分服务配置页面
- 迁移VIP折扣配置页面
- 迁移代客下单页面
- 迁移邀请会员页面

模块进度: 29/29 页面完成 ✅
所有页面迁移完成!"
```

---

## ✅ 阶段 6: 验证和提交

### 6.1 功能验证清单

#### 导航测试:
- [ ] 左侧菜单展开/收起正常
- [ ] 三级菜单展开/折叠正常
- [ ] 点击菜单项跳转正常
- [ ] 当前路由高亮显示正常
- [ ] 菜单滚动位置保持

#### 页面测试 (每个页面):
- [ ] 页面加载正常
- [ ] 筛选器功能正常
- [ ] 表格显示正常
- [ ] 分页功能正常
- [ ] 表单提交正常
- [ ] Mock 数据加载正常
- [ ] 样式显示正确

#### 样式测试:
- [ ] 配色系统应用正确
- [ ] 后台页面使用品牌蓝
- [ ] 组件圆角、阴影正确
- [ ] 响应式布局正常

### 6.2 性能检查

```bash
# 开发环境启动速度
npm run dev  # 应该 < 2秒

# 构建检查
npm run build  # 检查打包体积

# 类型检查
npm run typecheck  # 确保无类型错误
```

### 6.3 最终提交

```bash
# 合并到主分支
git checkout master
git merge feature/vue2-migration

# 创建迁移完成标签
git tag -a v2.0.0-vue2-migration -m "完成 Remix 到 Vue 2.6.12 全量迁移

迁移内容:
- 删除24个不在菜单的模块
- 保留并迁移29个菜单页面
- 技术栈: Vue 2.6.12 + Ant Design Vue 1.7.8
- 构建工具: Vite 5.4.11
- 样式: Less + 四季配色系统
- 状态管理: Vuex + Composition API

所有功能、逻辑、数据、UI、导航完全一致"

git push origin master --tags
```

---

## 📊 迁移统计

### 删除的代码量
```
删除模块: 24个
删除页面: ~80个 tsx 文件
删除路由: ~60个路由文件
代码行数: ~15,000 行
```

### 新增的代码量
```
新增页面: 29个 .vue 文件
新增路由: 29个路由
新增配置: 5个配置文件
代码行数: ~8,000 行
```

### 依赖变化
```
删除: 15个 React/Remix 相关包
删除: 8个 Tailwind 相关包
新增: 12个 Vue/Ant Design 相关包
```

---

## ⏱️ 预估时间

```
阶段1: 清理无用代码        2小时
阶段2: 更新文档            1小时
阶段3: 初始化项目          2小时
阶段4: 平台后台迁移        8小时
  - 设计架构 (3页)        1.5小时
  - 订单管理 (2页)        2小时
  - 会员管理 (1页)        1小时
  - 优惠券管理 (2页)      2小时
  - 积分管理 (2页)        1.5小时
阶段5: 商户端迁移          12小时
  - 入驻平台 (1页)        1小时
  - 门店信息 (7页)        4小时
  - 订单管理 (4页)        3小时
  - 房务管理 (6页)        3小时
  - 会员服务 (4页)        1小时
阶段6: 验证和提交          2小时
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
总计:                      27小时
实际工作日:                3-4天
```

---

## 🎯 关键成功因素

### 1. 严格遵循菜单配置
- ✅ 只迁移 Sidebar.tsx menuConfig 中的页面
- ✅ 保持路由路径完全一致
- ✅ 保持菜单层级结构一致

### 2. 保持功能和UI一致
- ✅ 每个页面的功能必须完全复现
- ✅ 表格列、筛选器字段保持一致
- ✅ Mock数据保持一致
- ✅ 配色系统应用一致

### 3. Git 提交规范
- ✅ 每完成一个子模块立即提交
- ✅ 提交信息清晰描述迁移内容
- ✅ 关键节点创建 tag

### 4. 渐进式验证
- ✅ 每迁移一个页面立即测试
- ✅ 不等到最后再统一测试
- ✅ 发现问题立即修复

---

## 📞 下一步行动

**请确认:**
1. ✅ 是否同意删除24个不在菜单的模块?
2. ✅ 是否同意迁移29个菜单页面?
3. ✅ 是否同意使用 Vue 2.6.12 + Ant Design Vue 1.7.8?
4. ✅ 是否准备好开始执行?

**回复 "开始执行阶段1"**, 我将立即开始清理无用代码! 🚀
