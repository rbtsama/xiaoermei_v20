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

### Quick Reference
- [常用命令](#常用命令)
- [开发检查清单](#开发检查清单)
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
