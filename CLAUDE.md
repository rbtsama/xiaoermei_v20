# 小而美 Home Stay - Vue 2 开发规范

## 目录

### Part 1: 项目概述
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [项目结构](#项目结构)

### Part 2: 开发规范
- [核心原则](#核心原则)
- [目录规范](#目录规范)
- [模块结构](#模块结构)
- [命名规范](#命名规范)

### Part 3: 开发指南
- [开发流程](#开发流程)
- [路由配置](#路由配置)
- [Mock 数据](#mock-数据)
- [组件开发](#组件开发)

### Part 4: UI 规范
- [配色系统](#配色系统)
- [Ant Design Vue 使用](#ant-design-vue-使用)
- [响应式设计](#响应式设计)

### Part 5: 前端设计规范
- [核心设计原则](#核心设计原则)
- [配色系统](#配色系统-1)
- [组件尺寸规范](#组件尺寸规范)
- [字体规范](#字体规范)
- [日期时间展示规范](#日期时间展示规范)
- [标签颜色规范](#标签颜色规范)
- [卡片样式规范](#卡片样式规范)
- [按钮规范](#按钮规范)
- [表格规范](#表格规范-1)
- [表单规范](#表单规范)
- [交互规范](#交互规范)
- [侧边栏规范](#侧边栏规范)
- [阴影系统](#阴影系统)
- [间距系统](#间距系统)
- [最佳实践](#最佳实践-1)

### Part 6: 表格设计标准
- [核心原则](#核心原则-1)
- [标准表格样式](#标准表格样式标杆订单列表)
- [标准标签样式](#标准标签样式标杆优惠券类型)
- [标准日期时间显示](#标准日期时间显示标杆创建时间)
- [标准操作按钮](#标准操作按钮标杆编辑启用停用)
- [完整表格示例](#完整表格示例标准模板)
- [表格列定义规范](#表格列定义规范)
- [分页器配置](#分页器配置)
- [筛选器规范](#筛选器规范)
- [最佳实践示例](#最佳实践示例)
- [快速复制模板](#快速复制模板)
- [开发检查清单](#开发检查清单-1)

### Quick Reference
- [常用命令](#常用命令)
- [开发检查清单](#开发检查清单-2)
- [故障排查](#故障排查)

---

## 技术栈

**核心框架**：
- **Vue 2.6.12** - 渐进式 JavaScript 框架
- **Vue Router 3.5.4** - 官方路由管理器
- **Vuex 3.6.2** - 状态管理
- **@vue/composition-api 1.7.2** - Composition API 支持

**构建工具**：
- **Vite 5.4.11** - 下一代前端构建工具
- **vite-plugin-vue2** - Vue 2 的 Vite 插件
- **TypeScript 5.6.3** - 类型系统

**UI 组件库**：
- **Ant Design Vue 1.7.8** - 企业级 UI 组件库
- **Less 4.2.0** - CSS 预处理器

**工具库**：
- **Day.js 1.11.13** - 轻量级日期处理
- **Lodash 4.17.21** - 实用工具库
- **Moment.js 2.29.4** - 日期处理（兼容）

---

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
# 访问 http://localhost:3000
```

### 构建生产版本

```bash
npm run build
```

### 类型检查

```bash
npm run typecheck
```

### 预览生产构建

```bash
npm run preview
```

---

## 项目结构

```
homestay_v1/
├── src/                          # 源代码目录
│   ├── main.js                   # 应用入口文件
│   ├── App.vue                   # 根组件
│   │
│   ├── views/                    # 页面组件（业务模块）
│   │   ├── PlatformAdmin/        # 平台后台
│   │   │   ├── CouponManagement/      # 优惠券管理
│   │   │   ├── MemberManagement/      # 会员管理
│   │   │   ├── PointsManagement/      # 积分管理
│   │   │   └── OrderManagement/       # 订单管理
│   │   │
│   │   ├── MerchantBackend/      # 商户端
│   │   │   ├── StoreInfo/             # 门店信息
│   │   │   ├── JoinApplication/       # 入驻申请
│   │   │   ├── MemberService/         # 会员服务
│   │   │   └── OrderManagement/       # 订单管理
│   │   │
│   │   └── Architecture/         # 架构展示
│   │       ├── ProductArchitecture/   # 产品架构
│   │       └── DesignSystem/          # 设计系统
│   │
│   ├── components/               # 公共组件
│   │   └── Layout/               # 布局组件
│   │       └── Sidebar.vue       # 侧边栏
│   │
│   ├── router/                   # 路由配置
│   │   └── index.js              # 路由定义
│   │
│   ├── store/                    # Vuex 状态管理
│   │   ├── index.js              # Store 入口
│   │   └── modules/              # Store 模块
│   │
│   ├── api/                      # API 接口封装
│   │   └── request.js            # 请求拦截器
│   │
│   ├── mocks/                    # Mock 数据
│   │   └── memberService.mock.ts # 会员服务 Mock
│   │
│   ├── types/                    # TypeScript 类型定义
│   │   └── memberService.ts      # 会员服务类型
│   │
│   ├── utils/                    # 工具函数
│   │   └── helpers.js            # 通用辅助函数
│   │
│   └── styles/                   # 样式文件
│       ├── theme.less            # 主题变量
│       └── global.less           # 全局样式
│
├── public/                       # 静态资源
├── vite.config.js                # Vite 配置
├── package.json                  # 项目依赖
├── tsconfig.json                 # TypeScript 配置
└── index.html                    # HTML 模板
```

---

## 核心原则

### 1. 模块化开发
- 每个业务模块独立开发，相互解耦
- 组件按功能划分，单一职责原则
- 公共组件抽取到 `src/components/` 目录

### 2. Mock 驱动开发
- 前端开发完全依赖 Mock 数据
- Mock 数据在 `src/mocks/` 目录下集中管理
- 使用真实业务场景命名（如 "Acme Corp"，而非 "Test 1"）

### 3. 类型安全
- 优先使用 TypeScript 定义类型
- 类型定义文件放在 `src/types/` 目录
- 复杂数据结构必须有类型定义

### 4. 组件大小控制
- **软性限制**：单个组件 < 300 行
- **硬性限制**：单个组件 < 500 行
- 超过限制时拆分为多个子组件

### 5. 代码规范
- 使用 Composition API（通过 `@vue/composition-api`）
- 优先使用 `<script setup>` 语法（如果支持）
- 遵循 Vue 官方风格指南

---

## 目录规范

### ✅ 可以修改的目录

**主要开发区域**：
- `src/views/` - 业务页面组件（主要工作区）
- `src/components/` - 公共组件
- `src/router/` - 路由配置
- `src/mocks/` - Mock 数据
- `src/types/` - 类型定义
- `src/api/` - API 接口（如需对接后端）
- `src/store/` - Vuex 状态管理

**配置文件**：
- `vite.config.js` - Vite 配置（添加路由、插件等）
- `src/styles/` - 全局样式

### ❌ 不要修改的文件

- `src/main.js` - 入口文件（除非必要）
- `src/App.vue` - 根组件（除非必要）
- `package.json` - 依赖管理（添加依赖请确认）

---

## 模块结构

### 标准模块目录结构

以 `MerchantBackend/StoreInfo` 为例：

```
src/views/MerchantBackend/StoreInfo/
├── BasicInfoPage.vue           # 基本信息页面
├── PolicyPage.vue              # 政策相关页面
├── FacilitiesPage.vue          # 门店设施页面
├── SurroundingPage.vue         # 周边信息页面
├── BreakfastPage.vue           # 早餐政策页面
├── ExtraBedPage.vue            # 加床政策页面
├── ImagesPage.vue              # 门店图片页面
└── components/                 # 模块内组件
    ├── DisplayValue.vue        # 展示值组件
    ├── EditableSection.vue     # 可编辑区域组件
    ├── FormField.vue           # 表单字段组件
    ├── FacilityCheckboxGroup.vue # 设施选择组件
    └── PolicyInfoContent.vue   # 政策信息内容
```

### 模块组件拆分原则

**何时拆分子组件**：
1. 重复使用的 UI 片段（如 `DisplayValue.vue`）
2. 复杂的表单区域（如 `EditableSection.vue`）
3. 独立的业务逻辑单元（如 `PolicyInfoContent.vue`）
4. 超过 100 行的 template 代码块

**子组件命名**：
- 使用 PascalCase（如 `DisplayValue.vue`）
- 名称描述组件功能（如 `EditableSection`）
- 避免通用名称（如 `Item.vue`，应改为 `FacilityItem.vue`）

---

## 命名规范

### 文件命名

**页面组件**：
```
PointsConfigPage.vue          # 积分配置页面
CouponListPage.vue            # 优惠券列表页面
MembersPage.vue               # 会员查询页面
```
格式：`{功能名}Page.vue`

**子组件**：
```
CouponDialog.vue              # 优惠券弹窗
ServiceItemDialog.vue         # 服务项弹窗
FacilityCheckboxGroup.vue     # 设施选择组
```
格式：`{功能名}{组件类型}.vue`

**Mock 文件**：
```
memberService.mock.ts         # 会员服务 Mock
coupon.mock.ts                # 优惠券 Mock
```
格式：`{模块名}.mock.ts`

**类型文件**：
```
memberService.ts              # 会员服务类型
storeInfo.ts                  # 门店信息类型
```
格式：`{模块名}.ts`

### 变量命名

**组件内变量**：
```javascript
// 使用 camelCase
const formData = ref({})
const isLoading = ref(false)
const selectedItems = ref([])

// 常量使用 UPPER_SNAKE_CASE
const MAX_UPLOAD_SIZE = 5 * 1024 * 1024
const RECOMMEND_TAGS = [...]
```

**函数命名**：
```javascript
// 事件处理函数使用 handle 前缀
const handleEdit = () => {}
const handleSave = () => {}
const handleCancel = () => {}

// 业务逻辑函数使用动词开头
const fetchData = async () => {}
const validateForm = () => {}
const toggleTag = (tagValue) => {}
```

---

## 开发流程

### 新建模块的标准流程

#### 1. 确定模块位置

```bash
# 平台后台模块
src/views/PlatformAdmin/{ModuleName}/

# 商户端模块
src/views/MerchantBackend/{ModuleName}/
```

#### 2. 创建类型定义（如需要）

**`src/types/moduleName.ts`**：
```typescript
/**
 * 模块类型定义
 */

// 枚举类型
export enum ItemStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

// 数据接口
export interface ModuleItem {
  id: string
  name: string
  status: ItemStatus
  createdAt: string
  updatedAt: string
}

// 筛选参数
export interface ModuleFilterParams {
  search?: string
  status?: ItemStatus
  page?: number
  pageSize?: number
}
```

#### 3. 创建 Mock 数据

**`src/mocks/moduleName.mock.ts`**：
```typescript
import { ModuleItem, ItemStatus } from '@/types/moduleName'

/**
 * 模块 Mock 数据
 */
export const mockModuleItems: ModuleItem[] = [
  {
    id: '1',
    name: '示例项目 A',
    status: ItemStatus.ACTIVE,
    createdAt: '2025-10-01 10:00:00',
    updatedAt: '2025-11-15 14:30:00',
  },
  {
    id: '2',
    name: '示例项目 B',
    status: ItemStatus.INACTIVE,
    createdAt: '2025-10-05 11:20:00',
    updatedAt: '2025-11-20 09:15:00',
  },
  // 添加更多真实的业务数据...
]
```

#### 4. 创建页面组件

**`src/views/PlatformAdmin/ModuleName/ModuleListPage.vue`**：
```vue
<template>
  <sidebar>
    <div class="page-container">
      <!-- 筛选器 -->
      <a-card class="filter-card">
        <a-form layout="inline">
          <a-form-item label="搜索">
            <a-input
              v-model="filters.search"
              placeholder="请输入关键词"
              style="width: 200px"
              @pressEnter="handleSearch"
            />
          </a-form-item>

          <a-form-item label="状态">
            <a-select v-model="filters.status" placeholder="全部" style="width: 120px">
              <a-select-option value="">全部</a-select-option>
              <a-select-option value="active">启用</a-select-option>
              <a-select-option value="inactive">禁用</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" @click="handleSearch">
              <a-icon type="search" />
              搜索
            </a-button>
            <a-button style="margin-left: 8px" @click="handleReset">
              重置
            </a-button>
          </a-form-item>
        </a-form>
      </a-card>

      <!-- 数据表格 -->
      <a-card class="table-card">
        <div class="table-header">
          <h3>数据列表</h3>
          <a-button type="primary" @click="handleCreate">
            <a-icon type="plus" />
            新建
          </a-button>
        </div>

        <a-table
          :columns="columns"
          :data-source="dataList"
          :loading="loading"
          :pagination="pagination"
          row-key="id"
          @change="handleTableChange"
        >
          <template #status="text, record">
            <a-tag :color="record.status === 'active' ? 'green' : 'default'">
              {{ record.status === 'active' ? '启用' : '禁用' }}
            </a-tag>
          </template>

          <template #action="text, record">
            <a-space>
              <a @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical" />
              <a @click="handleDelete(record)">删除</a>
            </a-space>
          </template>
        </a-table>
      </a-card>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import { mockModuleItems } from '@/mocks/moduleName.mock'

export default defineComponent({
  name: 'ModuleListPage',

  components: {
    Sidebar,
  },

  setup() {
    // 状态定义
    const loading = ref(false)
    const dataList = ref([])
    const filters = reactive({
      search: '',
      status: '',
    })

    const pagination = reactive({
      current: 1,
      pageSize: 10,
      total: 0,
    })

    // 表格列配置
    const columns = [
      { title: 'ID', dataIndex: 'id', width: 80 },
      { title: '名称', dataIndex: 'name' },
      { title: '状态', dataIndex: 'status', width: 100, scopedSlots: { customRender: 'status' } },
      { title: '创建时间', dataIndex: 'createdAt', width: 180 },
      { title: '操作', width: 150, scopedSlots: { customRender: 'action' } },
    ]

    // 获取数据
    const fetchData = async () => {
      loading.value = true
      try {
        // 模拟 API 延迟
        await new Promise(resolve => setTimeout(resolve, 500))

        // 使用 Mock 数据
        let filteredData = [...mockModuleItems]

        // 应用筛选
        if (filters.search) {
          filteredData = filteredData.filter(item =>
            item.name.toLowerCase().includes(filters.search.toLowerCase())
          )
        }
        if (filters.status) {
          filteredData = filteredData.filter(item => item.status === filters.status)
        }

        dataList.value = filteredData
        pagination.total = filteredData.length
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        loading.value = false
      }
    }

    // 事件处理
    const handleSearch = () => {
      pagination.current = 1
      fetchData()
    }

    const handleReset = () => {
      filters.search = ''
      filters.status = ''
      pagination.current = 1
      fetchData()
    }

    const handleTableChange = (pag) => {
      pagination.current = pag.current
      pagination.pageSize = pag.pageSize
      fetchData()
    }

    const handleCreate = () => {
      console.log('Create new item')
    }

    const handleEdit = (record) => {
      console.log('Edit item:', record)
    }

    const handleDelete = (record) => {
      console.log('Delete item:', record)
    }

    // 初始化
    onMounted(() => {
      fetchData()
    })

    return {
      loading,
      dataList,
      filters,
      pagination,
      columns,
      handleSearch,
      handleReset,
      handleTableChange,
      handleCreate,
      handleEdit,
      handleDelete,
    }
  },
})
</script>

<style scoped lang="less">
.page-container {
  padding: 24px;
}

.filter-card {
  margin-bottom: 16px;
}

.table-card {
  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>
```

#### 5. 配置路由

**`src/router/index.js`**：
```javascript
// 添加新路由
{
  path: '/platform-admin/module-name/list',
  name: 'ModuleList',
  component: () => import('@/views/PlatformAdmin/ModuleName/ModuleListPage.vue'),
  meta: { title: '模块列表' }
},
```

#### 6. 测试验证

```bash
# 运行开发服务器
npm run dev

# 访问页面
http://localhost:3000/platform-admin/module-name/list

# 类型检查
npm run typecheck
```

---

## 路由配置

### 路由文件位置

**`src/router/index.js`**

### 路由配置示例

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/architecture/product/overview'
  },

  // 设计架构模块
  {
    path: '/architecture/product/overview',
    name: 'ProductOverview',
    component: () => import('@/views/Architecture/ProductArchitecture/OverviewPage.vue'),
    meta: { title: '产品架构总图' }
  },

  // 平台后台 - 优惠券管理
  {
    path: '/platform-admin/coupon-management/list',
    name: 'CouponList',
    component: () => import('@/views/PlatformAdmin/CouponManagement/CouponListPage.vue'),
    meta: { title: '优惠券列表' }
  },
  {
    path: '/platform-admin/coupon-management/issue',
    name: 'CouponIssue',
    component: () => import('@/views/PlatformAdmin/CouponManagement/CouponIssuePage.vue'),
    meta: { title: '优惠券发放' }
  },

  // 商户端 - 门店信息
  {
    path: '/merchant-backend/store-info/basic',
    name: 'StoreBasicInfo',
    component: () => import('@/views/MerchantBackend/StoreInfo/BasicInfoPage.vue'),
    meta: { title: '基本信息' }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router
```

### 路由命名规范

- 使用 PascalCase（如 `CouponList`）
- 名称与组件名保持一致
- meta.title 用于页面标题

---

## Mock 数据

### Mock 数据规范

**位置**：`src/mocks/`

**命名**：`{模块名}.mock.ts`

**原则**：
1. 使用真实业务场景数据
2. 包含边界情况（空数据、长文本、特殊字符）
3. 使用符合业务的日期格式（`MM/DD/YY HH:mm:ss` 或 `YYYY-MM-DD HH:mm:ss`）
4. 枚举值使用有意义的字符串（如 `'active'`, `'inactive'`）

### Mock 数据示例

**`src/mocks/memberService.mock.ts`**：
```typescript
import type {
  PointsServiceItem,
  VIPLevelDiscount,
} from '@/types/memberService'
import { PointsServiceType } from '@/types/memberService'

/**
 * 环保奖励服务 Mock
 */
export const mockEcoRewards: PointsServiceItem[] = [
  {
    id: 'eco-1',
    type: PointsServiceType.ECO_REWARD,
    typeName: '环保奖励',
    serviceName: '自带拖鞋',
    pointsAmount: -5, // 负数表示奖励
    description: '支持环保，自带拖鞋可获得积分奖励',
    enabled: true,
    createdAt: '2025-10-01 10:00:00',
    updatedAt: '2025-11-01 14:30:00',
  },
  {
    id: 'eco-2',
    type: PointsServiceType.ECO_REWARD,
    typeName: '环保奖励',
    serviceName: '自带牙刷',
    pointsAmount: -3,
    description: '环保从小事做起，自带牙刷获得积分',
    enabled: true,
    createdAt: '2025-10-01 10:00:00',
    updatedAt: '2025-11-01 14:30:00',
  },
]

/**
 * VIP 等级折扣 Mock
 */
export const mockVIPLevelDiscounts: VIPLevelDiscount[] = [
  { vipLevel: 'VIP1', discountRate: 0.95 }, // 95折
  { vipLevel: 'VIP2', discountRate: 0.92 }, // 92折
  { vipLevel: 'VIP3', discountRate: 0.90 }, // 90折
  { vipLevel: 'VIP4', discountRate: 0.88 }, // 88折
  { vipLevel: 'VIP5', discountRate: 0.85 }, // 85折
]
```

### Mock 数据在组件中使用

```vue
<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import { mockEcoRewards } from '@/mocks/memberService.mock'

export default defineComponent({
  setup() {
    const dataList = ref([])

    const fetchData = async () => {
      // 模拟 API 延迟
      await new Promise(resolve => setTimeout(resolve, 500))

      // 使用 Mock 数据
      dataList.value = [...mockEcoRewards]
    }

    onMounted(() => {
      fetchData()
    })

    return {
      dataList,
    }
  },
})
</script>
```

---

## 组件开发

### 组件模板结构

```vue
<template>
  <div class="component-name">
    <!-- 组件内容 -->
  </div>
</template>

<script>
import { defineComponent, ref, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'ComponentName',

  props: {
    // Props 定义
    value: {
      type: String,
      default: '',
    },
  },

  emits: ['change', 'update'],

  setup(props, { emit }) {
    // 响应式数据
    const localValue = ref('')

    // 计算属性
    const displayValue = computed(() => {
      return localValue.value || '—'
    })

    // 方法
    const handleChange = (val) => {
      localValue.value = val
      emit('change', val)
    }

    return {
      localValue,
      displayValue,
      handleChange,
    }
  },
})
</script>

<style scoped lang="less">
.component-name {
  // 样式
}
</style>
```

### 使用 Composition API

```javascript
import { defineComponent, ref, reactive, computed, watch, onMounted } from '@vue/composition-api'

export default defineComponent({
  setup() {
    // 响应式数据
    const count = ref(0)
    const formData = reactive({
      name: '',
      email: '',
    })

    // 计算属性
    const doubleCount = computed(() => count.value * 2)

    // 监听
    watch(() => formData.name, (newVal, oldVal) => {
      console.log('Name changed:', newVal)
    })

    // 生命周期
    onMounted(() => {
      console.log('Component mounted')
    })

    // 方法
    const increment = () => {
      count.value++
    }

    return {
      count,
      formData,
      doubleCount,
      increment,
    }
  },
})
```

### 组件间通信

**父传子 (Props)**：
```vue
<!-- Parent.vue -->
<template>
  <child-component :value="parentValue" />
</template>

<!-- Child.vue -->
<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
}
</script>
```

**子传父 (Emit)**：
```vue
<!-- Child.vue -->
<script>
export default {
  setup(props, { emit }) {
    const handleClick = () => {
      emit('change', 'new value')
    }

    return { handleClick }
  },
}
</script>

<!-- Parent.vue -->
<template>
  <child-component @change="handleChange" />
</template>
```

---

## 配色系统

### 全局配色变量

配置在 **`vite.config.js`** 的 Less 变量中：

```javascript
css: {
  preprocessorOptions: {
    less: {
      javascriptEnabled: true,
      modifyVars: {
        // 四季配色系统
        'primary-color': '#2C5F8D',      // 冬·深蓝
        'success-color': '#5A8A65',      // 森林绿
        'error-color': '#B94D3D',        // 砖瓦红
        'warning-color': '#C67A28',      // 秋·深橙
        'info-color': '#4A8FBF',         // 夏·湖蓝
        'border-radius-base': '8px',
        'font-size-base': '14px',
        'text-color': '#2A2A2A',
        'text-color-secondary': '#6B6B6B',
        'border-color-base': '#E5E5E5',
        'background-color-base': '#F8F6F3',
      },
    },
  },
},
```

### 配色使用规范

**主色 - 冬·深蓝 `#2C5F8D`**：
- 主按钮
- 品牌色
- 重要操作

**强调色 - 秋·深橙 `#C67A28`**：
- 价格标签
- 促销信息
- 重点强调

**辅助色 - 夏·湖蓝 `#4A8FBF`**：
- 链接
- 次要按钮
- 信息提示

**成功色 - 森林绿 `#5A8A65`**：
- 成功状态
- 完成提示
- 启用标签

**错误色 - 砖瓦红 `#B94D3D`**：
- 错误提示
- 警告信息
- 删除操作

### 配色示例

```vue
<template>
  <!-- 主按钮 -->
  <a-button type="primary">确认</a-button>

  <!-- 状态标签 -->
  <a-tag color="success">已启用</a-tag>
  <a-tag color="error">已禁用</a-tag>

  <!-- 价格显示 -->
  <span style="color: #C67A28; font-weight: 600">¥388</span>
</template>
```

详细配色规范请参考：
- **`homestay-color-system.md`** - 完整配色系统文档
- **`setting_page_color.md`** - 后台页面配色规范

---

## Ant Design Vue 使用

### 常用组件

**表格 (Table)**：
```vue
<a-table
  :columns="columns"
  :data-source="dataSource"
  :loading="loading"
  :pagination="pagination"
  row-key="id"
  @change="handleTableChange"
>
  <!-- 自定义列 -->
  <template #status="text, record">
    <a-tag :color="record.status === 'active' ? 'green' : 'default'">
      {{ record.status === 'active' ? '启用' : '禁用' }}
    </a-tag>
  </template>

  <template #action="text, record">
    <a @click="handleEdit(record)">编辑</a>
  </template>
</a-table>
```

**表单 (Form)**：
```vue
<a-form :model="formData" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
  <a-form-item label="名称" :required="true">
    <a-input v-model="formData.name" placeholder="请输入名称" />
  </a-form-item>

  <a-form-item label="状态">
    <a-select v-model="formData.status" placeholder="请选择状态">
      <a-select-option value="active">启用</a-select-option>
      <a-select-option value="inactive">禁用</a-select-option>
    </a-select>
  </a-form-item>

  <a-form-item :wrapper-col="{ span: 18, offset: 6 }">
    <a-button type="primary" @click="handleSubmit">提交</a-button>
    <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
  </a-form-item>
</a-form>
```

**对话框 (Modal)**：
```vue
<a-modal
  v-model="visible"
  title="编辑信息"
  :width="600"
  @ok="handleOk"
  @cancel="handleCancel"
>
  <a-form :model="formData">
    <!-- 表单内容 -->
  </a-form>
</a-modal>
```

**卡片 (Card)**：
```vue
<a-card title="卡片标题" :bordered="false">
  <template #extra>
    <a-button type="link">更多</a-button>
  </template>

  <!-- 卡片内容 -->
</a-card>
```

**标签 (Tag)**：
```vue
<a-tag color="blue">标签</a-tag>
<a-tag color="green">已启用</a-tag>
<a-tag color="red">已禁用</a-tag>
<a-tag closable @close="handleClose">可关闭</a-tag>
```

**开关 (Switch)**：
```vue
<a-switch
  v-model="enabled"
  checked-children="开"
  un-checked-children="关"
  @change="handleChange"
/>
```

### Ant Design Vue 文档

官方文档：https://1x.antdv.com/docs/vue/introduce-cn/

---

## 响应式设计

### 布局容器

```vue
<template>
  <div class="page-container">
    <a-row :gutter="16">
      <a-col :xs="24" :sm="12" :md="8" :lg="6">
        <!-- 列内容 -->
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="less">
.page-container {
  padding: 24px;
  max-width: 1800px;
  margin: 0 auto;
}

// 响应式断点
@media (max-width: 768px) {
  .page-container {
    padding: 16px;
  }
}
</style>
```

### 响应式断点

Ant Design Vue 的栅格断点：
- **xs**: < 576px（手机）
- **sm**: ≥ 576px（平板）
- **md**: ≥ 768px（小桌面）
- **lg**: ≥ 992px（大桌面）
- **xl**: ≥ 1200px（超大桌面）
- **xxl**: ≥ 1600px（超超大桌面）

---

## 常用命令

### 开发

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# TypeScript 类型检查
npm run typecheck
```

### 端口管理

项目固定使用 **3000** 端口。

如果端口被占用：

**Windows**：
```bash
# 查找占用 3000 端口的进程
netstat -ano | findstr :3000

# 杀死进程（替换 <PID>）
taskkill /PID <PID> /F
```

**macOS/Linux**：
```bash
# 查找并杀死占用 3000 端口的进程
lsof -ti:3000 | xargs kill -9
```

---

## 开发检查清单

### 新建模块时

- [ ] 在 `src/views/` 下创建模块目录
- [ ] 如需类型定义，在 `src/types/` 创建类型文件
- [ ] 创建 Mock 数据文件在 `src/mocks/`
- [ ] 创建页面组件（以 `Page.vue` 结尾）
- [ ] 在 `src/router/index.js` 添加路由配置
- [ ] 组件大小 < 500 行（硬性规则）
- [ ] 运行 `npm run typecheck` 检查类型错误
- [ ] 测试页面功能正常

### 代码规范检查

- [ ] 使用 Composition API
- [ ] Props 和 Emits 明确定义
- [ ] 变量命名使用 camelCase
- [ ] 常量命名使用 UPPER_SNAKE_CASE
- [ ] 事件处理函数使用 `handle` 前缀
- [ ] 组件命名使用 PascalCase
- [ ] 样式使用 `scoped` 隔离

### UI 规范检查

- [ ] 使用 Ant Design Vue 组件
- [ ] 遵循配色系统规范
- [ ] 主按钮使用主色（冬·深蓝）
- [ ] 状态标签使用对应功能色
- [ ] 价格使用强调色（秋·深橙）
- [ ] 添加 hover/focus 交互效果
- [ ] 响应式布局适配

---

## 故障排查

### TypeScript 类型错误

**问题**：`Cannot find module '@/xxx'`

**解决**：
1. 检查 `tsconfig.json` 中的 `paths` 配置：
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

2. 检查 `vite.config.js` 中的 `alias` 配置：
```javascript
resolve: {
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
},
```

### 组件导入失败

**问题**：`Failed to resolve component`

**解决**：
- 确认组件文件存在且路径正确
- 检查组件是否正确导出
- 在 `components` 选项中注册组件

### Ant Design Vue 样式不生效

**问题**：组件样式缺失

**解决**：
1. 确认在 `main.js` 中导入了 Ant Design Vue CSS：
```javascript
import 'ant-design-vue/dist/antd.css'
```

2. 检查 Less 变量配置是否正确

### Mock 数据未显示

**问题**：页面加载不出数据

**解决**：
- 检查 Mock 文件导入路径是否正确
- 确认 Mock 数据格式与类型定义一致
- 检查 `fetchData` 函数是否在 `onMounted` 中调用

---

## 项目信息

**项目名称**：小而美 Home Stay - 民宿管理系统

**当前版本**：2.0（Vue 2 版本）

**开发时区**：Pacific Time (PST/PDT)

**日期格式**：`MM/DD/YY HH:mm:ss` 或 `YYYY-MM-DD HH:mm:ss`

**语言**：中文（注释和文档）+ English（代码和技术术语）

---

## 资源链接

**框架文档**：
- Vue 2: https://v2.cn.vuejs.org/
- Vue Router 3: https://v3.router.vuejs.org/zh/
- Vuex 3: https://v3.vuex.vuejs.org/zh/
- Composition API: https://github.com/vuejs/composition-api

**UI 组件库**：
- Ant Design Vue 1.x: https://1x.antdv.com/docs/vue/introduce-cn/

**构建工具**：
- Vite: https://cn.vitejs.dev/

**配色系统**：
- 详见项目内 `homestay-color-system.md`
- 详见项目内 `setting_page_color.md`

---

**最后更新时间**：2025-12-08

---

# Part 5: 前端设计规范

**适用项目**: 小而美 Home Stay 民宿管理系统
**技术栈**: Vue 2 + Ant Design Vue
**最后更新**: 2025-12-08

---

## 核心设计原则

### 统一圆角规范（重要）

**所有组件圆角统一为 6px，无例外**

```css
/* 所有输入框、筛选组件、按钮 - 圆角统一 6px */
.ant-btn { border-radius: 6px !important; }
.ant-input { border-radius: 6px !important; }
.ant-select-selector { border-radius: 6px !important; }
.ant-picker { border-radius: 6px !important; }
.ant-textarea { border-radius: 6px !important; }
.ant-input-number { border-radius: 6px !important; }
.ant-cascader-picker { border-radius: 6px !important; }
.ant-radio-group-solid .ant-radio-button-wrapper { border-radius: 6px !important; }
.ant-pagination-item { border-radius: 6px !important; }
.ant-dropdown-menu { border-radius: 6px !important; }
.ant-select-dropdown { border-radius: 6px !important; }

/* 唯一例外：标签保持 4px（更小巧） */
.ant-tag { border-radius: 4px !important; }

/* 卡片使用 8px（更大气） */
.ant-card { border-radius: 8px; }
```

**❌ 禁止行为**:
- ❌ 不要使用不同的圆角值
- ❌ 不要有的组件圆有的组件方
- ❌ 不要自定义圆角大小

---

## 配色系统

### 品牌色
```css
--brand-primary: #3b82f6;        /* 品牌蓝 - 主按钮、选中态 */
--brand-primary-hover: #2563eb;  /* hover 状态 */
--brand-primary-light: #dbeafe;  /* 浅色背景 */
```

### 功能色
```css
--success-color: #10b981;        /* 成功/完成 */
--warning-color: #f97316;        /* 警告/待处理 */
--error-color: #ef4444;          /* 错误/危险 */
--info-color: #8b5cf6;           /* 信息提示 */
```

### 文字色系统（核心）
```css
--text-primary: rgba(0,0,0,0.9); /* 90% 黑色 - 主要内容 */
--text-secondary: #666666;       /* 辅助文字（时间、标签、说明） */
--text-tertiary: #b1b1b1;        /* 暗提示文字（占位符、禁用） */
--text-disabled: #cbd5e1;        /* 禁用状态 */
```

### 背景色
```css
--bg-primary: #ffffff;           /* 主背景 */
--bg-secondary: #f8fafc;         /* 次要背景（表头、只读字段） */
--bg-tertiary: #f1f5f9;          /* 三级背景（hover） */
--bg-hover: #f1f5f9;             /* hover 背景 */
```

### 边框色
```css
--border-primary: #e2e8f0;       /* 主边框（卡片、表格） */
--border-secondary: #cbd5e1;     /* 次要边框（输入框） */
--border-focus: #3b82f6;         /* 聚焦边框（品牌蓝） */
```

---

## 组件尺寸规范

### 按钮
```css
/* 普通按钮 */
height: 32px;
padding: 0 16px;
font-size: 14px;
border-radius: 6px;

/* 小按钮 */
height: 28px;
padding: 0 12px;
font-size: 13px;

/* 大按钮 */
height: 40px;
padding: 0 24px;
font-size: 14px;
```

### 输入框
```css
/* 普通输入框 */
height: 32px;
border-radius: 6px;
font-size: 14px;

/* 大输入框 */
height: 36px;
border-radius: 6px;
```

### 表格
```css
/* 表头 */
background: #f8fafc;
padding: 12px 16px;
font-weight: 600;
color: rgba(0,0,0,0.9);

/* 表格行 */
padding: 12px 16px;
color: rgba(0,0,0,0.9);

/* hover */
background: #f1f5f9;
```

### 标签
```css
padding: 2px 8px;
font-size: 12px;
border-radius: 4px;  /* 标签特殊：4px */
border-width: 1px;
```

---

## 字体规范

### 字体栈
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
             "Noto Sans SC", "Microsoft YaHei", sans-serif;
```

### 字号系统
```css
--font-size-xs: 12px;    /* 标签、辅助文字 */
--font-size-sm: 13px;    /* 小文字 */
--font-size-base: 14px;  /* 基础文字 */
--font-size-lg: 16px;    /* 标题 */
--font-size-xl: 18px;    /* 大标题 */
--font-size-2xl: 24px;   /* 页面标题 */
```

### 字重系统
```css
--font-weight-normal: 400;    /* 普通文字 */
--font-weight-medium: 500;    /* 强调文字 */
--font-weight-semibold: 600;  /* 标题 */
--font-weight-bold: 700;      /* 重要标题 */
```

### 特殊字段字体规范
**重要**: 订单号、手机号、ID等数字字段**不使用等宽字体**，统一使用普通字体：
```css
.order-number,
.phone-number,
.id-number {
  font-family: @font-family;  /* 普通字体，不用 monospace */
  font-weight: 500;
}
```

---

## 日期时间展示规范

### 表格中的日期时间
**所有日期+时间字段必须分行显示**:

```vue
<template slot="createdAt" slot-scope="datetime">
  <div class="datetime-cell">
    <div class="date">{{ formatDate(datetime) }}</div>
    <div class="time">{{ formatTime(datetime) }}</div>
  </div>
</template>
```

**样式**:
```less
.datetime-cell {
  .date {
    display: block;
    color: rgba(0,0,0,0.9);  /* 90% 黑色 */
    font-size: 14px;
    line-height: 1.5;
  }

  .time {
    display: block;
    color: #666666;           /* 辅助色 */
    font-size: 13px;
    line-height: 1.5;
    margin-top: 2px;
  }
}
```

**格式化函数**:
```javascript
formatDate(datetime) {
  if (!datetime) return '-'
  return dayjs(datetime).format('YYYY-MM-DD')
}

formatTime(datetime) {
  if (!datetime) return '-'
  return dayjs(datetime).format('HH:mm:ss')
}
```

---

## 标签颜色规范

### 状态标签
```vue
<!-- 成功/启用 -->
<a-tag color="success">已启用</a-tag>

<!-- 警告/待处理 -->
<a-tag color="warning">待处理</a-tag>

<!-- 错误/禁用 -->
<a-tag color="error">已禁用</a-tag>

<!-- 进行中 -->
<a-tag color="processing">进行中</a-tag>
```

### 自定义彩色标签
```less
// 蓝色标签
.tag-blue {
  color: #1d4ed8;
  background: #eff6ff;
  border-color: #bfdbfe;
}

// 绿色标签
.tag-green {
  color: #15803d;
  background: #f0fdf4;
  border-color: #bbf7d0;
}

// 橙色标签
.tag-orange {
  color: #c2410c;
  background: #fff7ed;
  border-color: #fed7aa;
}

// 红色标签
.tag-red {
  color: #b91c1c;
  background: #fee2e2;
  border-color: #fca5a5;
}

// 紫色标签
.tag-purple {
  color: #7c3aed;
  background: #f5f3ff;
  border-color: #ddd6fe;
}
```

---

## 卡片样式规范

### 标准卡片
```less
.ant-card {
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);

  .ant-card-head {
    border-bottom: 1px solid #f1f5f9;
    padding: 16px 24px;
  }

  .ant-card-body {
    padding: 24px;
  }
}
```

### 卡片标题
```less
.card-title {
  font-size: 16px;
  font-weight: 600;
  color: rgba(0,0,0,0.9);
}
```

---

## 按钮规范

### 主按钮（Primary）
```vue
<a-button type="primary">确认</a-button>
```

**样式**:
```css
background: #3b82f6;
border-color: #3b82f6;
color: #ffffff;
border-radius: 6px;
height: 32px;

/* hover */
background: #2563eb;
border-color: #2563eb;
```

### 次要按钮（Default）
```vue
<a-button>取消</a-button>
```

**样式**:
```css
border-color: #cbd5e1;
color: rgba(0,0,0,0.9);
border-radius: 6px;

/* hover */
border-color: #3b82f6;
color: #3b82f6;
```

### 危险按钮（Danger）
```vue
<a-button type="danger">删除</a-button>
```

**样式**:
```css
background: #ef4444;
border-color: #ef4444;
color: #ffffff;
border-radius: 6px;
```

---

## 表格规范

### 表头样式
```css
background: #f8fafc;          /* 浅灰背景 */
color: rgba(0,0,0,0.9);       /* 90% 黑色 */
font-weight: 600;             /* 半粗体 */
font-size: 14px;
padding: 12px 16px;
border-bottom: 1px solid #e2e8f0;
```

### 表格行样式
```css
padding: 12px 16px;
color: rgba(0,0,0,0.9);
border-bottom: 1px solid #e2e8f0;

/* hover */
background: #f1f5f9;
transition: background 0.2s;
```

### 表格文字
- **主要内容**: 90% 黑色（#000000 rgba(0,0,0,0.9)）
- **辅助内容**: #666666
- **日期**: 90% 黑色
- **时间**: #666666（分行显示）

---

## 表单规范

### 表单标签
```css
color: rgba(0,0,0,0.9);
font-weight: 500;
font-size: 14px;
```

### 必填标记
```vue
<label>
  字段名称 <span style="color: #ef4444">*</span>
</label>
```

### 提示文字
```css
font-size: 12px;
color: #b1b1b1;
margin-top: 4px;
```

### 只读字段
```css
background: #f8fafc;
color: rgba(0,0,0,0.9);
border: 1px solid #e2e8f0;
border-radius: 6px;
cursor: not-allowed;
```

---

## 交互规范

### Hover 效果
```css
/* 按钮 */
transition: all 0.2s ease;

/* 卡片 */
box-shadow: 0 1px 2px rgba(0,0,0,0.03);  /* 默认 */
box-shadow: 0 4px 6px rgba(0,0,0,0.07);  /* hover */

/* 表格行 */
background: transparent;  /* 默认 */
background: #f1f5f9;      /* hover */
```

### Focus 效果
```css
/* 输入框聚焦 */
border-color: #3b82f6;
box-shadow: 0 0 0 2px rgba(59,130,246,0.1);
```

### 过渡动画
```css
/* 标准过渡 */
transition: all 0.2s ease;

/* 快速过渡 */
transition: all 0.15s ease;

/* 慢速过渡 */
transition: all 0.3s ease;
```

---

## 侧边栏规范

### 黑色主题
```css
background: #001529;         /* 深蓝黑 */
Logo背景: #002140;           /* 稍深 */
选中项: #3b82f6;             /* 品牌蓝高亮 */
hover: rgba(255,255,255,0.08); /* 半透明白 */
```

### 菜单规范
- **默认状态**: 所有一级和二级菜单全部展开
- **选中效果**: 品牌蓝背景，白色文字
- **状态记忆**: LocalStorage 保存展开状态和折叠状态
- **圆角**: 菜单项 6px

---

## 阴影系统

```css
/* 小阴影 - 静态卡片 */
box-shadow: 0 1px 2px rgba(0,0,0,0.03);

/* 基础阴影 - 普通元素 */
box-shadow: 0 1px 3px rgba(0,0,0,0.1);

/* 中阴影 - hover 卡片 */
box-shadow: 0 4px 6px rgba(0,0,0,0.07);

/* 大阴影 - 弹窗 */
box-shadow: 0 10px 15px rgba(0,0,0,0.1);
```

---

## 间距系统

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-base: 12px;
--spacing-md: 16px;
--spacing-lg: 20px;
--spacing-xl: 24px;
--spacing-2xl: 32px;
```

### 页面容器
```css
padding: 24px;
max-width: 1800px;
margin: 0 auto;
```

### 卡片间距
```css
margin-bottom: 20px;
```

### 表单项间距
```css
margin-bottom: 20px;
```

---

## 标签颜色使用场景

### 账号状态
```javascript
'pre_register' → color="processing"  // 蓝色（预注册）
'registered'   → color="success"     // 绿色（已注册）
'disabled'     → color="error"       // 红色（已禁用）
```

### 获得方式（使用自定义类）
```javascript
'purchase' → class="tag-blue"    // 蓝色（购买）
'gift'     → class="tag-purple"  // 紫色（赠送）
'upgrade'  → class="tag-green"   // 绿色（升级）
'import'   → class="tag-orange"  // 橙色（导入）
```

### 优惠券类型
```javascript
'full_reduction'     → class="tag-orange"  // 橙色（满减券）
'discount'           → class="tag-green"   // 绿色（折扣券）
'instant_reduction'  → class="tag-blue"    // 蓝色（立减券）
```

### 订单状态
```javascript
'pending_payment'  → color="orange"   // 橙色（待支付）
'pending_checkin'  → color="orange"   // 橙色（待入住）
'checked_in'       → color="blue"     // 蓝色（入住中）
'checked_out'      → color="blue"     // 蓝色（已离店）
'completed'        → color="default"  // 灰色（已完成）
'cancelled'        → color="default"  // 灰色（已取消）
'refund_requested' → color="error"    // 红色（退款申请）
```

---

## 响应式规范

### 筛选器响应式
```vue
<div class="filter-container">
  <!-- 小屏自动换行，大屏单行 -->
</div>
```

```css
.filter-container {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}
```

### 表格响应式
```vue
<a-table :scroll="{ x: 1400 }">
```

---

## 最佳实践

### 1. 使用全局样式变量
```less
@import '@/styles/variables.less';

.my-component {
  color: @text-primary;
  background: @bg-primary;
  border-radius: @border-radius-base;
  padding: @spacing-md;
}
```

### 2. 日期时间分行显示
```vue
<template slot="datetime" slot-scope="dt">
  <div class="datetime-cell">
    <div class="date">{{ formatDate(dt) }}</div>
    <div class="time">{{ formatTime(dt) }}</div>
  </div>
</template>
```

### 3. 统一标签样式
```vue
<a-tag :class="getTagClass(type)">
  {{ getLabel(type) }}
</a-tag>
```

### 4. 表格统一样式
```less
.custom-table {
  :deep(.ant-table-thead > tr > th) {
    background: @bg-secondary;
    color: @text-primary;
    font-weight: @font-weight-semibold;
  }

  :deep(.ant-table-tbody > tr:hover > td) {
    background: @bg-hover;
  }
}
```

---

## 开发检查清单

### 创建新页面时
- [ ] 引入全局样式 `@import '@/styles/variables.less'`
- [ ] 所有按钮、输入框、筛选组件圆角 6px
- [ ] 标签圆角 4px
- [ ] 卡片圆角 8px
- [ ] 主文字颜色 90% 黑
- [ ] 辅助文字颜色 #666
- [ ] 提示文字颜色 #B1B1B1
- [ ] 日期时间分行显示
- [ ] 不使用等宽字体
- [ ] 表格表头使用 `@bg-secondary`
- [ ] 表格 hover 使用 `@bg-hover`

### 颜色使用检查
- [ ] 主按钮使用品牌蓝 #3b82f6
- [ ] 成功状态使用 #10b981
- [ ] 警告状态使用 #f97316
- [ ] 错误状态使用 #ef4444
- [ ] 无硬编码颜色值

### 交互检查
- [ ] 所有交互元素有 hover 效果
- [ ] 输入框有 focus 效果
- [ ] 过渡动画流畅（0.2s）
- [ ] 无抖动现象

---

## 禁止行为

### 圆角
- ❌ 不要混用不同的圆角大小
- ❌ 不要有的圆有的方
- ❌ 不要自定义圆角值

### 颜色
- ❌ 不要硬编码颜色值
- ❌ 不要使用纯黑 #000000（用 rgba(0,0,0,0.9)）
- ❌ 不要使用低对比度颜色

### 字体
- ❌ 不要使用等宽字体（monospace）
- ❌ 不要使用特殊字体
- ❌ 不要混用多种字体

### 间距
- ❌ 不要随意使用间距值
- ❌ 不要使用奇数间距（如 13px、17px）
- ❌ 必须使用间距系统变量

---

# Part 6: 表格设计标准规范

**基于**: 订单列表页面 & 优惠券列表页面（最佳实践）
**更新时间**: 2025-12-08

---

## 核心原则

**所有列表页面必须遵循以下标准，保持视觉统一**

---

## 标准表格样式（标杆：订单列表）

### 表格基础样式

```vue
<a-table
  :columns="columns"
  :data-source="tableData"
  :loading="isLoading"
  :pagination="pagination"
  @change="handleTableChange"
  rowKey="id"
  class="custom-table"
>
  <!-- 列模板 -->
</a-table>
```

### 表格样式定义

```less
@import '@/styles/variables.less';

// 自定义表格样式
.custom-table {
  :deep(.ant-table-thead > tr > th) {
    background: @bg-secondary;           // #f8fafc 浅灰
    border-bottom: 1px solid @border-primary;
    color: @text-primary;                // 90% 黑色
    font-weight: @font-weight-semibold;  // 600
    font-size: @font-size-base;          // 14px
    padding: 12px 16px;                  // 固定间距
  }

  :deep(.ant-table-tbody > tr) {
    &:hover > td {
      background: @bg-hover;             // #f1f5f9 hover背景
    }

    > td {
      border-bottom: 1px solid @border-primary;
      padding: 12px 16px;                // 固定间距
      color: @text-primary;              // 90% 黑色
    }
  }

  :deep(.ant-table-pagination) {
    padding: 16px 24px;
  }
}
```

---

## 标准标签样式（标杆：优惠券类型）

### 彩色标签模板

```vue
<!-- 优惠券类型 -->
<template slot="type" slot-scope="type">
  <a-tag :class="getCouponTypeBadgeClass(type)">
    {{ getCouponTypeText(type) }}
  </a-tag>
</template>
```

### 标签样式定义

```less
// 标签样式 - 统一规范
.tag-orange {
  color: #c2410c;
  background: #fff7ed;
  border-color: #fed7aa;
}

.tag-green {
  color: #15803d;
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.tag-blue {
  color: #1d4ed8;
  background: #eff6ff;
  border-color: #bfdbfe;
}

.tag-purple {
  color: #7c3aed;
  background: #f5f3ff;
  border-color: #ddd6fe;
}

.tag-red {
  color: #b91c1c;
  background: #fee2e2;
  border-color: #fca5a5;
}

.tag-gray {
  color: #64748b;
  background: #f8fafc;
  border-color: #cbd5e1;
}

:deep(.ant-tag) {
  margin: 0;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  border-radius: 4px;
  border-width: 1px;
}
```

### 标签使用函数

```javascript
// 获取标签类名
getCouponTypeBadgeClass(type) {
  const classMap = {
    full_reduction: 'tag-orange',      // 满减券 - 橙色
    discount: 'tag-green',             // 折扣券 - 绿色
    instant_reduction: 'tag-blue'      // 立减券 - 蓝色
  }
  return classMap[type] || ''
}

// 获取标签文本
getCouponTypeText(type) {
  const map = {
    full_reduction: '满减券',
    discount: '折扣券',
    instant_reduction: '立减券'
  }
  return map[type] || type
}
```

---

## 标准日期时间显示（标杆：创建时间）

### 日期时间模板

```vue
<!-- 创建时间 -->
<template slot="createdAt" slot-scope="createdAt">
  <div class="datetime-cell">
    <div class="date">{{ formatDate(createdAt) }}</div>
    <div class="time">{{ formatTime(createdAt) }}</div>
  </div>
</template>
```

### 日期时间样式

```less
// 日期时间单元格 - 标准样式
.datetime-cell {
  .date {
    display: block;
    color: @text-primary;      // 90% 黑色
    font-size: @font-size-base; // 14px
    line-height: 1.5;
  }

  .time {
    display: block;
    color: @text-secondary;    // #666666
    font-size: @font-size-sm;  // 13px
    line-height: 1.5;
    margin-top: 2px;
  }
}
```

### 格式化函数

```javascript
import dayjs from 'dayjs'

// 格式化日期
formatDate(datetime) {
  if (!datetime) return '-'
  return dayjs(datetime).format('YYYY-MM-DD')
}

// 格式化时间
formatTime(datetime) {
  if (!datetime) return '-'
  return dayjs(datetime).format('HH:mm:ss')
}
```

---

## 标准操作按钮（标杆：编辑+启用/停用）

### 操作列模板

```vue
<!-- 操作 -->
<template slot="action" slot-scope="text, record">
  <div class="action-btns">
    <!-- 编辑按钮 -->
    <a-button size="small" @click="handleEdit(record)">
      <a-icon type="edit" />
      编辑
    </a-button>

    <!-- 启用/停用按钮（动态type） -->
    <a-button
      size="small"
      :type="record.status === 'enabled' ? 'danger' : 'primary'"
      @click="handleToggleStatus(record)"
    >
      {{ record.status === 'enabled' ? '停用' : '启用' }}
    </a-button>
  </div>
</template>
```

### 操作按钮样式

```less
// 操作按钮容器 - 标准样式
.action-btns {
  display: flex;
  gap: 8px;
  justify-content: center;

  .ant-btn-sm {
    height: 28px;
    padding: 0 12px;
    font-size: 13px;
    border-radius: 6px;
  }
}
```

### 按钮颜色规则

- **编辑按钮**: Default（白底灰边）
- **删除按钮**: Danger（红色）
- **启用按钮**: Primary（品牌蓝）
- **停用按钮**: Danger（红色）
- **查看按钮**: Default（白底灰边）

---

## 完整表格示例（标准模板）

### Vue 模板

```vue
<template>
  <sidebar>
    <div class="page-container">
      <!-- 列表卡片 -->
      <a-card :bordered="false" class="list-card">
        <div slot="title" class="card-header">
          <span class="card-title">数据列表</span>
          <div class="header-actions">
            <a-button type="primary" @click="handleCreate">
              <a-icon type="plus" />
              创建
            </a-button>
          </div>
        </div>

        <a-table
          :columns="columns"
          :data-source="tableData"
          :loading="isLoading"
          :pagination="pagination"
          @change="handleTableChange"
          rowKey="id"
          class="custom-table"
        >
          <!-- ID列 -->
          <template slot="id" slot-scope="id">
            <span class="id-text">{{ id }}</span>
          </template>

          <!-- 类型标签 -->
          <template slot="type" slot-scope="type">
            <a-tag :class="getTypeClass(type)">
              {{ getTypeText(type) }}
            </a-tag>
          </template>

          <!-- 状态标签 -->
          <template slot="status" slot-scope="status">
            <a-tag :class="status === 'enabled' ? 'tag-green' : 'tag-gray'">
              {{ status === 'enabled' ? '已启用' : '已停用' }}
            </a-tag>
          </template>

          <!-- 日期时间 -->
          <template slot="createdAt" slot-scope="createdAt">
            <div class="datetime-cell">
              <div class="date">{{ formatDate(createdAt) }}</div>
              <div class="time">{{ formatTime(createdAt) }}</div>
            </div>
          </template>

          <!-- 操作按钮 -->
          <template slot="action" slot-scope="text, record">
            <div class="action-btns">
              <a-button size="small" @click="handleEdit(record)">
                <a-icon type="edit" />
                编辑
              </a-button>
              <a-button
                size="small"
                :type="record.status === 'enabled' ? 'danger' : 'primary'"
                @click="handleToggleStatus(record)"
              >
                {{ record.status === 'enabled' ? '停用' : '启用' }}
              </a-button>
            </div>
          </template>
        </a-table>
      </a-card>
    </div>
  </sidebar>
</template>
```

### 完整样式（Less）

```less
@import '@/styles/variables.less';

.page-container {
  padding: 24px;
  max-width: 1800px;
  margin: 0 auto;
}

// 卡片样式
.list-card {
  border-radius: @border-radius-lg;    // 8px
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;

  :deep(.ant-card-head) {
    border-bottom: 1px solid @bg-tertiary;
    padding: 16px 24px;
  }

  :deep(.ant-card-body) {
    padding: 0;  // 表格卡片body无padding
  }
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.card-title {
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

.header-actions {
  display: flex;
  gap: 8px;
}

// 自定义表格样式（标准）
.custom-table {
  :deep(.ant-table-thead > tr > th) {
    background: @bg-secondary;
    border-bottom: 1px solid @border-primary;
    color: @text-primary;
    font-weight: @font-weight-semibold;
    font-size: @font-size-base;
    padding: 12px 16px;
  }

  :deep(.ant-table-tbody > tr) {
    &:hover > td {
      background: @bg-hover;
    }

    > td {
      border-bottom: 1px solid @border-primary;
      padding: 12px 16px;
      color: @text-primary;
    }
  }

  :deep(.ant-table-pagination) {
    padding: 16px 24px;
  }
}

// ID文本（不使用等宽字体）
.id-text {
  font-family: @font-family;
  font-weight: @font-weight-medium;
  color: @text-primary;
  font-size: @font-size-sm;
}

// 日期时间单元格
.datetime-cell {
  .date {
    display: block;
    color: @text-primary;
    font-size: @font-size-base;
    line-height: 1.5;
  }

  .time {
    display: block;
    color: @text-secondary;
    font-size: @font-size-sm;
    line-height: 1.5;
    margin-top: 2px;
  }
}

// 标签样式
.tag-orange {
  color: #c2410c;
  background: #fff7ed;
  border-color: #fed7aa;
}

.tag-green {
  color: #15803d;
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.tag-blue {
  color: #1d4ed8;
  background: #eff6ff;
  border-color: #bfdbfe;
}

.tag-purple {
  color: #7c3aed;
  background: #f5f3ff;
  border-color: #ddd6fe;
}

.tag-red {
  color: #b91c1c;
  background: #fee2e2;
  border-color: #fca5a5;
}

.tag-gray {
  color: #64748b;
  background: #f8fafc;
  border-color: #cbd5e1;
}

:deep(.ant-tag) {
  margin: 0;
  padding: 2px 8px;
  font-size: @font-size-xs;
  font-weight: @font-weight-medium;
  line-height: 20px;
  border-radius: @border-radius-sm;  // 4px
  border-width: 1px;
}

// 操作按钮
.action-btns {
  display: flex;
  gap: 8px;
  justify-content: center;

  .ant-btn-sm {
    height: 28px;
    padding: 0 12px;
    font-size: @font-size-sm;
  }
}
```

---

## 表格列定义规范

### 标准列配置

```javascript
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 100,                        // 固定宽度
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    width: 100,
    scopedSlots: { customRender: 'type' }
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 180,
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 80,
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 120,                        // 日期时间列固定120px
    scopedSlots: { customRender: 'createdAt' }
  },
  {
    title: '创建人',
    dataIndex: 'createdBy',
    key: 'createdBy',
    width: 100
  },
  {
    title: '操作',
    key: 'action',
    width: 140,                        // 两个按钮：140px
    fixed: 'right',                    // 固定在右侧
    scopedSlots: { customRender: 'action' }
  }
]
```

### 列宽度参考

- **ID列**: 100px
- **类型/状态标签**: 80-100px
- **名称/标题**: 150-200px
- **短文本**: 100-120px
- **日期时间**: 120px（分行显示）
- **操作列（2按钮）**: 140px
- **操作列（3按钮）**: 180px

---

## 分页器配置

### 标准分页配置

```javascript
pagination: {
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,          // 显示每页数量切换
  showQuickJumper: true,          // 显示快速跳转
  showTotal: (total) => `共 ${total} 条`,
  pageSizeOptions: ['10', '20', '50', '100']
}
```

---

## 筛选器规范

### 筛选器布局

```vue
<a-card :bordered="false" class="filter-card">
  <div class="filter-container">
    <a-input
      v-model="filters.keyword"
      placeholder="搜索关键词"
      style="width: 200px"
      @pressEnter="handleSearch"
    >
      <a-icon slot="prefix" type="search" />
    </a-input>

    <a-select
      v-model="filters.status"
      style="width: 140px"
      placeholder="全部状态"
      @change="handleSearch"
    >
      <a-select-option value="all">全部状态</a-select-option>
      <a-select-option value="enabled">已启用</a-select-option>
      <a-select-option value="disabled">已停用</a-select-option>
    </a-select>

    <a-button type="primary" @click="handleSearch" :loading="isLoading">
      <a-icon type="search" />
      搜索
    </a-button>

    <a-button @click="handleReset">重置</a-button>
  </div>
</a-card>
```

### 筛选器样式

```less
.filter-card {
  margin-bottom: 20px;
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;

  :deep(.ant-card-body) {
    padding: 20px 24px;
  }
}

.filter-container {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}
```

---

## 最佳实践示例

### 示例1：优惠券列表（完美实现）

**亮点**:
- ✅ 优惠券类型使用彩色标签（橙/绿/蓝）
- ✅ 创建时间分行显示（日期90%黑，时间#666）
- ✅ 操作按钮：编辑+启用/停用（动态type）
- ✅ 表格样式完美（表头、hover、间距）

### 示例2：订单列表（完美实现）

**亮点**:
- ✅ 表格样式标准（浅灰表头、hover效果）
- ✅ 下单时间分行显示
- ✅ 订单号使用普通字体
- ✅ 状态标签颜色丰富

### 示例3：会员列表（完美实现）

**亮点**:
- ✅ VIP等级橙色高亮（#f97316）
- ✅ 获得方式彩色标签（蓝/紫/绿/橙）
- ✅ 更新时间分行显示
- ✅ 导出按钮使用绿色（#10b981）

---

## 快速复制模板

### 1. 表格页面完整模板

```vue
<template>
  <sidebar>
    <div class="your-page">
      <!-- 筛选器 -->
      <a-card :bordered="false" class="filter-card">
        <div class="filter-container">
          <!-- 筛选组件 -->
        </div>
      </a-card>

      <!-- 列表 -->
      <a-card :bordered="false" class="list-card">
        <div slot="title" class="card-header">
          <span class="card-title">列表标题</span>
          <div class="header-actions">
            <a-button type="primary" @click="handleCreate">
              <a-icon type="plus" />
              创建
            </a-button>
          </div>
        </div>

        <a-table
          :columns="columns"
          :data-source="tableData"
          :loading="isLoading"
          :pagination="pagination"
          @change="handleTableChange"
          rowKey="id"
          class="custom-table"
        >
          <!-- 自定义列模板 -->
        </a-table>
      </a-card>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'YourPage',
  components: { Sidebar },
  setup(props, { root }) {
    const isLoading = ref(false)
    const tableData = ref([])

    const pagination = reactive({
      current: 1,
      pageSize: 10,
      total: 0,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total) => `共 ${total} 条`,
      pageSizeOptions: ['10', '20', '50', '100']
    })

    const columns = [
      // 列定义
    ]

    const fetchData = async () => {
      isLoading.value = true
      try {
        // 加载数据
      } finally {
        isLoading.value = false
      }
    }

    const formatDate = (datetime) => {
      if (!datetime) return '-'
      return dayjs(datetime).format('YYYY-MM-DD')
    }

    const formatTime = (datetime) => {
      if (!datetime) return '-'
      return dayjs(datetime).format('HH:mm:ss')
    }

    onMounted(() => {
      fetchData()
    })

    return {
      isLoading,
      tableData,
      pagination,
      columns,
      formatDate,
      formatTime
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.your-page {
  padding: 24px;
  max-width: 1800px;
  margin: 0 auto;

  .filter-card {
    margin-bottom: 20px;
    border-radius: @border-radius-lg;
    border: 1px solid @border-primary;
    box-shadow: @shadow-sm;

    :deep(.ant-card-body) {
      padding: 20px 24px;
    }
  }

  .filter-container {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  }

  .list-card {
    border-radius: @border-radius-lg;
    border: 1px solid @border-primary;
    box-shadow: @shadow-sm;

    :deep(.ant-card-head) {
      border-bottom: 1px solid @bg-tertiary;
      padding: 16px 24px;
    }

    :deep(.ant-card-body) {
      padding: 0;
    }
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .card-title {
    font-size: @font-size-lg;
    font-weight: @font-weight-semibold;
    color: @text-primary;
  }

  .header-actions {
    display: flex;
    gap: 8px;
  }
}

// 自定义表格样式
.custom-table {
  :deep(.ant-table-thead > tr > th) {
    background: @bg-secondary;
    border-bottom: 1px solid @border-primary;
    color: @text-primary;
    font-weight: @font-weight-semibold;
    font-size: @font-size-base;
    padding: 12px 16px;
  }

  :deep(.ant-table-tbody > tr) {
    &:hover > td {
      background: @bg-hover;
    }

    > td {
      border-bottom: 1px solid @border-primary;
      padding: 12px 16px;
      color: @text-primary;
    }
  }

  :deep(.ant-table-pagination) {
    padding: 16px 24px;
  }
}

// ID文本
.id-text {
  font-family: @font-family;
  font-weight: @font-weight-medium;
  color: @text-primary;
  font-size: @font-size-sm;
}

// 日期时间单元格
.datetime-cell {
  .date {
    display: block;
    color: @text-primary;
    font-size: @font-size-base;
    line-height: 1.5;
  }

  .time {
    display: block;
    color: @text-secondary;
    font-size: @font-size-sm;
    line-height: 1.5;
    margin-top: 2px;
  }
}

// 标签样式
.tag-green {
  color: #15803d;
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.tag-gray {
  color: #64748b;
  background: #f8fafc;
  border-color: #cbd5e1;
}

:deep(.ant-tag) {
  margin: 0;
  padding: 2px 8px;
  font-size: @font-size-xs;
  font-weight: @font-weight-medium;
  line-height: 20px;
  border-radius: @border-radius-sm;
  border-width: 1px;
}

// 操作按钮
.action-btns {
  display: flex;
  gap: 8px;
  justify-content: center;

  .ant-btn-sm {
    height: 28px;
    padding: 0 12px;
    font-size: @font-size-sm;
  }
}
</style>
```

---

## 开发检查清单

创建新的列表页面时，确保：

### 结构
- [ ] 使用 Sidebar 组件包裹
- [ ] 页面容器：`padding: 24px; max-width: 1800px; margin: 0 auto;`
- [ ] 筛选器卡片在上，列表卡片在下
- [ ] 列表卡片 body 的 padding 为 0

### 样式
- [ ] 引入 `@import '@/styles/variables.less'`
- [ ] 使用 `.custom-table` 类名
- [ ] 表格表头背景 `@bg-secondary`
- [ ] 表格 hover 背景 `@bg-hover`
- [ ] 行间距 `12px 16px`

### 日期时间
- [ ] 使用 `.datetime-cell` 结构
- [ ] 日期一行（90%黑，14px）
- [ ] 时间第二行（#666，13px）
- [ ] 导入 dayjs 库

### 标签
- [ ] 使用自定义类（tag-green、tag-blue等）
- [ ] 不使用 `color="default"`（看不清）
- [ ] 标签圆角 4px

### 操作按钮
- [ ] 使用 `.action-btns` 容器
- [ ] 按钮 size="small"（高度28px）
- [ ] gap: 8px
- [ ] 编辑按钮 + 状态切换按钮（动态type）

### 分页
- [ ] showSizeChanger: true
- [ ] showQuickJumper: true
- [ ] showTotal 显示总数

---

## 禁止行为

- ❌ 不要使用 `size="middle"` 或 `size="large"`（统一不设置，使用默认）
- ❌ 不要使用 `color="default"`（灰色标签看不清）
- ❌ 不要混合日期时间在一行
- ❌ 不要使用等宽字体显示ID
- ❌ 不要自定义表格行间距（统一12px 16px）
- ❌ 不要使用硬编码颜色

---

## 参考页面

**完美示例**:
1. `src/views/PlatformAdmin/OrderManagement/OrderListPage.vue` - 表格样式标杆
2. `src/views/PlatformAdmin/CouponManagement/CouponListPage.vue` - 标签和按钮标杆
3. `src/views/PlatformAdmin/MemberManagement/MembersPage.vue` - 综合示例

---

**最后更新**: 2025-12-08
**适用范围**: 所有列表页面
