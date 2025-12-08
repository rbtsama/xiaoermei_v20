# Remix → Vue 2.6.12 迁移完整方案

> **目标**: 将当前 Remix + TypeScript 框架迁移到 Vue 2.6.12，保持所有功能、UI、交互、颜色和路由完全一致，以兼容线上系统。

---

## 📊 项目现状分析

### 当前技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| **框架** | Remix 2.15.0 | 全栈 React 框架 |
| **构建工具** | Vite 5.4.11 | 模块打包 |
| **语言** | TypeScript 5.6.3 | 类型系统 |
| **UI 库** | shadcn/ui + Radix | 组件库 |
| **样式** | Tailwind CSS 3.4.17 | 工具类 CSS |
| **状态管理** | React Context | 全局状态 |
| **路由** | Remix Routes (98 条) | 服务端路由 |
| **数据获取** | Remix Loader/Action | SSR |

### 项目规模

```
📦 总计: 410 个 TypeScript 文件
├── 98 个路由文件 (app/routes/)
├── 132 个页面组件 (app/pages/)
├── 16 个 UI 组件 (shadcn/ui)
├── 40+ 类型定义文件
├── 40+ 服务层文件
└── 40+ Mock 数据文件
```

### 主要业务模块 (21 个)

1. **PlatformAdmin** (平台后台) - 24 个文件
2. **HotelBackend** (酒店商户后台) - 33 个文件 ⭐ 最大模块
3. **MerchantBackend** (商户端) - 16 个文件
4. **CClient** (C 端小程序) - 10 个文件
5. **PointsSystem** (积分系统) - 5 个文件
6. Architecture, Marketing, Order, User... (其他模块)

---

## 🎯 迁移总体策略

### 核心原则

✅ **完全等价迁移** - 功能、UI、交互、颜色、路由 100% 一致
✅ **模块化迁移** - 按业务模块逐步迁移，降低风险
✅ **Vue 2.6.12** - 锁定版本以兼容线上系统
✅ **保持架构** - 继续使用 types → services → components 结构
✅ **保留 Mock** - 数据层完全复用

---

## 📋 迁移任务清单

### 阶段一: 项目初始化 (3-5 天)

#### 任务 1.1: 创建 Vue 2 项目

**方案 A: Vue CLI 4.x (推荐 ⭐)**

```bash
npm install -g @vue/cli@4.5.19
vue create homestay-vue2 --preset default
```

**优势:**
- ✅ 官方工具，稳定可靠
- ✅ 内置 TypeScript 支持
- ✅ 内置 Vue Router + Vuex
- ✅ 热更新，开发体验好
- ✅ 支持 Webpack 4/5，构建成熟

**劣势:**
- ❌ 配置相对复杂
- ❌ 构建速度比 Vite 慢

**配置选项:**
```
? Vue version: 2.x
? TypeScript: Yes
? Use class-style component syntax: No (使用 Composition API 兼容库)
? Babel: Yes
? Router: Yes (history mode)
? Vuex: Yes
? CSS Pre-processors: PostCSS + Tailwind
? Linter: ESLint + Prettier
```

---

**方案 B: Vite + Vue 2 (次选)**

```bash
npm create vite@latest homestay-vue2 -- --template vue
npm install vue@2.6.12 vue-template-compiler@2.6.12
npm install vue-router@3.5.4 vuex@3.6.2
```

**优势:**
- ✅ 开发启动速度极快 (< 1s)
- ✅ 热更新迅速
- ✅ 配置简洁
- ✅ 你的团队已熟悉 Vite

**劣势:**
- ❌ Vue 2 + Vite 集成不如 Vue 3 成熟
- ❌ 需要额外配置 `@vitejs/plugin-vue2`
- ❌ 某些插件可能不兼容

**所需插件:**
```json
{
  "devDependencies": {
    "vite": "^5.4.11",
    "@vitejs/plugin-vue2": "^2.3.1",
    "vue-template-compiler": "2.6.12"
  }
}
```

---

**方案 C: 纯 Webpack 配置 (不推荐)**

**优势:**
- ✅ 完全控制构建流程

**劣势:**
- ❌ 配置复杂，维护成本高
- ❌ 开发体验差
- ❌ 需要手动配置所有 loader

---

**💡 决策建议:**
- 如果追求**稳定性** → 选 **方案 A (Vue CLI)**
- 如果追求**开发速度** → 选 **方案 B (Vite + Vue 2)**
- 如果需要**完全自定义** → 选方案 C (不推荐)

---

#### 任务 1.2: 配置 TypeScript

**Vue 2 + TypeScript 方案选择:**

**方案 A: Vue.extend + TypeScript (官方推荐 ⭐)**

```vue
<script lang="ts">
import Vue from 'vue'
import { CouponService } from '@/services/coupon.service'
import type { Coupon } from '@/types/coupon.types'

export default Vue.extend({
  name: 'CouponListPage',
  data() {
    return {
      coupons: [] as Coupon[],
      loading: false
    }
  },
  async mounted() {
    this.loading = true
    this.coupons = await CouponService.getCoupons()
    this.loading = false
  },
  methods: {
    handleEdit(coupon: Coupon) {
      // ...
    }
  }
})
</script>
```

**优势:**
- ✅ Vue 2 官方支持
- ✅ 类型推断较好
- ✅ 代码简洁

**劣势:**
- ❌ TypeScript 支持有限
- ❌ 泛型支持不足
- ❌ 与 Vue 3 API 差异大

---

**方案 B: vue-class-component + vue-property-decorator (次选)**

```vue
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import type { Coupon } from '@/types/coupon.types'

@Component
export default class CouponListPage extends Vue {
  coupons: Coupon[] = []
  loading = false

  @Prop({ type: String, required: true })
  title!: string

  async mounted() {
    await this.loadCoupons()
  }

  async loadCoupons() {
    this.loading = true
    this.coupons = await CouponService.getCoupons()
    this.loading = false
  }

  handleEdit(coupon: Coupon) {
    // ...
  }
}
</script>
```

**优势:**
- ✅ 类似 Angular/TypeScript 写法
- ✅ 装饰器语法简洁
- ✅ TypeScript 支持较好

**劣势:**
- ❌ 装饰器是实验性特性
- ❌ 迁移到 Vue 3 困难
- ❌ 学习成本高

---

**方案 C: @vue/composition-api (推荐用于大型项目 ⭐⭐)**

```vue
<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import { CouponService } from '@/services/coupon.service'
import type { Coupon } from '@/types/coupon.types'

export default defineComponent({
  name: 'CouponListPage',
  setup() {
    const coupons = ref<Coupon[]>([])
    const loading = ref(false)

    const loadCoupons = async () => {
      loading.value = true
      coupons.value = await CouponService.getCoupons()
      loading.value = false
    }

    const handleEdit = (coupon: Coupon) => {
      // ...
    }

    onMounted(loadCoupons)

    return {
      coupons,
      loading,
      handleEdit
    }
  }
})
</script>
```

**优势:**
- ✅ 与 Vue 3 Composition API 语法完全一致
- ✅ TypeScript 支持最好
- ✅ 逻辑复用能力强
- ✅ 未来迁移 Vue 3 成本最低
- ✅ 代码组织更清晰

**劣势:**
- ❌ 需要额外安装 `@vue/composition-api`
- ❌ Vue 2.6 支持不完美（部分 API 缺失）

---

**💡 TypeScript 方案决策建议:**

| 场景 | 推荐方案 |
|------|---------|
| 小型项目 (< 50 个组件) | 方案 A: Vue.extend |
| 大型项目 + 未来迁移 Vue 3 | 方案 C: Composition API ⭐ |
| 团队熟悉装饰器语法 | 方案 B: Class Component |
| 当前项目 (410 个组件) | **方案 C: Composition API** |

---

#### 任务 1.3: 配置路由系统

**Vue Router 3.x 配置**

当前 Remix 路由 (98 条) → Vue Router 配置文件

```typescript
// src/router/index.ts
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  // Root
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue')
  },

  // Architecture Routes
  {
    path: '/architecture/product/overview',
    name: 'ArchitectureProductOverview',
    component: () => import('@/views/Architecture/Product/OverviewPage.vue')
  },
  {
    path: '/architecture/design/color-system',
    name: 'ColorSystem',
    component: () => import('@/views/Architecture/Design/ColorSystemPage.vue')
  },

  // Platform Admin
  {
    path: '/platform-admin',
    name: 'PlatformAdmin',
    component: () => import('@/views/PlatformAdmin/IndexPage.vue'),
    children: [
      // Hotel Monitoring
      {
        path: 'hotel-monitor',
        name: 'HotelMonitor',
        component: () => import('@/views/PlatformAdmin/HotelMonitorPage.vue')
      },
      // Coupon Management
      {
        path: 'coupon-management/list',
        name: 'CouponList',
        component: () => import('@/views/PlatformAdmin/CouponManagement/CouponListPage.vue')
      },
      {
        path: 'coupon-management/create',
        name: 'CouponCreate',
        component: () => import('@/views/PlatformAdmin/CouponManagement/CouponFormPage.vue')
      },
      {
        path: 'coupon-management/edit/:id',
        name: 'CouponEdit',
        component: () => import('@/views/PlatformAdmin/CouponManagement/CouponFormPage.vue')
      },
      // ... 其他 95 条路由
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
```

**路由迁移工作量:**
- ✅ 自动化脚本生成路由配置（从 vite.config.ts 提取）
- ✅ 保持路由路径 100% 一致
- ⚠️ 动态路由参数语法变化: `$id.tsx` → `:id`

---

#### 任务 1.4: 配置状态管理

**Vuex 3.x vs Pinia (Vue 2 兼容版)**

**方案 A: Vuex 3.x (官方推荐 ⭐)**

```typescript
// src/store/index.ts
import Vue from 'vue'
import Vuex from 'vuex'
import type { ViewModeState } from './types'

Vue.use(Vuex)

export default new Vuex.Store<ViewModeState>({
  state: {
    isSidebarCollapsed: false
  },
  mutations: {
    TOGGLE_SIDEBAR(state) {
      state.isSidebarCollapsed = !state.isSidebarCollapsed
      localStorage.setItem('sidebarCollapsed', JSON.stringify(state.isSidebarCollapsed))
    },
    SET_SIDEBAR_COLLAPSED(state, collapsed: boolean) {
      state.isSidebarCollapsed = collapsed
    }
  },
  actions: {
    toggleSidebar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    initSidebarState({ commit }) {
      const saved = localStorage.getItem('sidebarCollapsed')
      if (saved !== null) {
        commit('SET_SIDEBAR_COLLAPSED', JSON.parse(saved))
      }
    }
  },
  getters: {
    isSidebarCollapsed: (state) => state.isSidebarCollapsed
  }
})
```

**优势:**
- ✅ Vue 2 官方状态管理
- ✅ 生态成熟，插件丰富
- ✅ DevTools 支持完善

**劣势:**
- ❌ TypeScript 支持不足
- ❌ 样板代码较多
- ❌ Vue 3 已废弃（推荐 Pinia）

---

**方案 B: Pinia 2.0 (Vue 2 兼容版) (次选)**

```typescript
// src/stores/viewMode.ts
import { defineStore } from 'pinia'

export const useViewModeStore = defineStore('viewMode', {
  state: () => ({
    isSidebarCollapsed: false
  }),
  actions: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed
      localStorage.setItem('sidebarCollapsed', JSON.stringify(this.isSidebarCollapsed))
    },
    initSidebarState() {
      const saved = localStorage.getItem('sidebarCollapsed')
      if (saved !== null) {
        this.isSidebarCollapsed = JSON.parse(saved)
      }
    }
  },
  getters: {
    sidebarState: (state) => state.isSidebarCollapsed
  }
})
```

**使用:**
```vue
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useViewModeStore } from '@/stores/viewMode'

export default defineComponent({
  setup() {
    const viewModeStore = useViewModeStore()

    return {
      toggleSidebar: viewModeStore.toggleSidebar,
      isSidebarCollapsed: viewModeStore.isSidebarCollapsed
    }
  }
})
</script>
```

**优势:**
- ✅ TypeScript 支持优秀
- ✅ API 简洁，无需 mutations
- ✅ 与 Vue 3 完全兼容
- ✅ DevTools 支持

**劣势:**
- ❌ Vue 2 支持是通过 `PiniaVuePlugin` 实现
- ❌ 部分功能在 Vue 2 中受限

---

**💡 状态管理决策建议:**
- 当前项目只有 **1 个全局状态** (侧边栏折叠) → **简单场景，用 Vuex 即可**
- 如果未来计划迁移 Vue 3 → **选 Pinia**

---

#### 任务 1.5: 配置样式系统

**Tailwind CSS 3.4.17 配置**

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        // shadcn/ui 颜色系统
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        // 配色系统 - 四季自然色
        'brand-primary': '#2C5F8D',    // 冬·深蓝
        'brand-secondary': '#C67A28',  // 秋·深橙
        'brand-accent': '#4A8FBF',     // 夏·湖蓝
        'brand-bg': '#F8F6F3',         // 春·米白
        'brand-success': '#5A8A65',    // 森林绿
        'brand-error': '#B94D3D',      // 砖瓦红
        // 中性色
        'text-primary': '#2A2A2A',
        'text-secondary': '#6B6B6B',
        'text-tertiary': '#999999',
        'text-disabled': '#CCCCCC',
        'border-normal': '#E5E5E5'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
```

**全局样式 (globals.css) 100% 复用**

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ... 其他 CSS 变量完全复制 */
  }
  .dark {
    /* ... 深色模式变量 */
  }
}

@layer utilities {
  /* 设计系统工具类 - 完全复用 */
  .text-display { @apply text-5xl font-bold tracking-tight; }
  .text-h1 { @apply text-3xl font-bold tracking-tight; }
  /* ... 其他 129 行完全复制 */
}
```

**⚠️ 注意事项:**
- ✅ Tailwind 配置可完全复用
- ✅ CSS 变量系统可完全复用
- ✅ 设计系统工具类可完全复用
- ⚠️ 确保 PostCSS 配置正确

---

#### 任务 1.6: 配置 UI 组件库

**shadcn/ui → Vue 2 组件库选择**

**问题:** shadcn/ui 基于 React + Radix UI，Vue 2 无法直接使用

**方案 A: Element UI 2.x (推荐 ⭐)**

```bash
npm install element-ui@2.15.14
```

**优势:**
- ✅ Vue 2 最成熟的组件库
- ✅ 中文文档完善
- ✅ 组件丰富 (60+ 组件)
- ✅ TypeScript 支持
- ✅ 主题定制能力强

**劣势:**
- ❌ UI 风格与 shadcn/ui 不同
- ❌ 需要重新适配设计系统
- ❌ 需要修改所有组件代码

**工作量评估:** 🔴 高 (需重写所有 UI 组件调用)

---

**方案 B: Ant Design Vue 1.x (次选)**

```bash
npm install ant-design-vue@1.7.8
```

**优势:**
- ✅ 组件质量高
- ✅ TypeScript 支持好
- ✅ 与 Ant Design React 设计一致

**劣势:**
- ❌ UI 风格与当前系统差异大
- ❌ 需要重新适配
- ❌ 学习成本

**工作量评估:** 🔴 高

---

**方案 C: 自定义组件库 (基于 Tailwind) (推荐 ⭐⭐)**

**策略:** 手动将当前 16 个 shadcn/ui 组件迁移到 Vue 2

```vue
<!-- src/components/ui/Button.vue -->
<template>
  <button
    :class="buttonClass"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export default defineComponent({
  name: 'Button',
  props: {
    variant: {
      type: String as () => VariantProps<typeof buttonVariants>['variant'],
      default: 'default'
    },
    size: {
      type: String as () => VariantProps<typeof buttonVariants>['size'],
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const buttonClass = computed(() =>
      buttonVariants({ variant: props.variant, size: props.size })
    )

    return {
      buttonClass
    }
  }
})
</script>
```

**需要迁移的 16 个组件:**
1. Button
2. Card
3. Table
4. Input
5. Label
6. Select
7. Badge
8. Pagination
9. Dialog
10. Checkbox
11. Radio Group
12. Progress
13. Switch
14. Tabs
15. Textarea
16. Sheet

**优势:**
- ✅ 完全控制组件实现
- ✅ UI 风格 100% 一致
- ✅ 基于 Tailwind，样式复用
- ✅ 使用 CVA (class-variance-authority) 保持样式逻辑一致

**劣势:**
- ⚠️ 需要手动实现 16 个组件
- ⚠️ 维护成本

**工作量评估:** 🟡 中等 (每个组件 2-4 小时，总计 32-64 小时)

---

**方案 D: Headless UI + Tailwind (最佳 ⭐⭐⭐)**

**策略:** 使用 Headless UI Vue 2 版本 + Tailwind

```bash
npm install @headlessui/vue@1.7.19
```

**示例:**
```vue
<template>
  <Menu as="div" class="relative">
    <MenuButton class="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3">
      Options
    </MenuButton>
    <MenuItems class="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg">
      <MenuItem v-slot="{ active }">
        <button :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm']">
          Edit
        </button>
      </MenuItem>
    </MenuItems>
  </Menu>
</template>

<script lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

export default {
  components: { Menu, MenuButton, MenuItems, MenuItem }
}
</script>
```

**优势:**
- ✅ 无样式组件库，完全可定制
- ✅ 与 shadcn/ui 底层理念一致 (都基于 Radix/Headless UI)
- ✅ TypeScript 支持好
- ✅ 可访问性 (A11y) 内置
- ✅ 官方维护，质量有保证

**劣势:**
- ⚠️ 仍需手动实现部分组件 (如 Table, Card 等容器组件)

**工作量评估:** 🟢 低-中等 (20-40 小时)

---

**💡 UI 组件库决策建议:**

| 方案 | 适用场景 | 工作量 | UI 一致性 |
|------|---------|--------|----------|
| Element UI | 快速开发，不在意 UI 差异 | 🟡 中 | ❌ 不一致 |
| Ant Design Vue | 快速开发，设计风格改变 | 🟡 中 | ❌ 不一致 |
| 自定义组件库 | 完全控制，UI 100% 一致 | 🔴 高 | ✅ 完全一致 |
| Headless UI + Tailwind | 平衡开发效率和一致性 | 🟢 低-中 | ✅ 高度一致 |

**推荐:** **方案 D (Headless UI) + 部分自定义组件**

**实施策略:**
- 使用 Headless UI 实现: Dialog, Select, Switch, Tabs
- 自定义实现: Button, Card, Table, Input, Badge (简单组件)
- 总工作量: 约 30-50 小时

---

### 阶段二: 核心架构迁移 (5-7 天)

#### 任务 2.1: 目录结构规划

**Remix 结构 → Vue 2 结构映射**

```
# Remix 结构
app/
├── routes/           # 路由文件 (98 个)
├── pages/            # 业务模块 (132 个组件)
├── components/ui/    # shadcn/ui 组件
├── lib/utils.ts      # 工具函数
├── styles/           # 全局样式
└── root.tsx          # 根组件

# Vue 2 结构
src/
├── router/           # Vue Router 配置
│   ├── index.ts      # 主路由文件
│   └── modules/      # 路由模块拆分
│       ├── platform-admin.ts
│       ├── hotel-backend.ts
│       └── merchant-backend.ts
├── views/            # 页面组件 (原 pages/)
│   ├── PlatformAdmin/
│   │   ├── CouponManagement/
│   │   │   ├── types/
│   │   │   ├── services/
│   │   │   ├── components/
│   │   │   ├── CouponListPage.vue
│   │   │   └── CouponFormPage.vue
│   │   └── ...
│   ├── HotelBackend/
│   └── ...
├── components/       # 全局组件
│   ├── ui/           # UI 组件库 (迁移后)
│   │   ├── Button.vue
│   │   ├── Card.vue
│   │   └── ...
│   └── common/       # 业务通用组件
│       └── ToggleButton.vue
├── store/            # Vuex/Pinia
│   └── index.ts
├── styles/           # 全局样式 (复用)
│   └── globals.css
├── utils/            # 工具函数 (复用)
│   └── cn.ts
├── types/            # 全局类型定义
├── App.vue           # 根组件
└── main.ts           # 入口文件
```

**迁移映射表:**

| Remix | Vue 2 | 说明 |
|-------|-------|------|
| `app/routes/` | `src/router/` | 路由配置 |
| `app/pages/` | `src/views/` | 页面组件 |
| `app/components/ui/` | `src/components/ui/` | UI 组件 |
| `app/lib/utils.ts` | `src/utils/cn.ts` | 工具函数 |
| `app/styles/` | `src/styles/` | 样式文件 |
| `app/root.tsx` | `src/App.vue` | 根组件 |
| `app/contexts/` | `src/store/` | 状态管理 |

---

#### 任务 2.2: 类型系统迁移

**TypeScript 配置**

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "types": ["node", "vue", "vue-router", "vuex"]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue"
  ],
  "exclude": ["node_modules"]
}
```

**类型文件迁移 (40+ 文件)**

✅ **可以 100% 复用** - 所有 `.types.ts` 文件无需修改

```typescript
// 示例: coupon.types.ts (完全复用)
export type CouponType = 'full_reduction' | 'discount' | 'instant_reduction'
export type CouponStatus = 'enabled' | 'disabled'

export interface Coupon {
  id: string
  name: string
  type: CouponType
  // ... 其他字段完全一致
}
```

---

#### 任务 2.3: 服务层迁移

**Service 文件迁移 (40+ 文件)**

✅ **可以 100% 复用** - 所有 `.service.ts` 文件无需修改

```typescript
// coupon.service.ts (完全复用)
import type { Coupon, CouponFilterParams, PaginatedResult } from '../types/coupon.types'
import { mockCoupons } from './mocks'

class CouponService {
  private mockData = [...mockCoupons]

  async getCoupons(params: CouponFilterParams): Promise<PaginatedResult<Coupon>> {
    await new Promise(resolve => setTimeout(resolve, 500))
    // ... 逻辑完全一致
    return result
  }

  async getCouponById(id: string): Promise<Coupon | null> {
    // ... 逻辑完全一致
  }

  // ... 其他方法
}

export default new CouponService()
```

---

#### 任务 2.4: Mock 数据迁移

**Mock 文件迁移 (40+ 文件)**

✅ **可以 100% 复用** - 所有 `.mock.ts` 文件无需修改

```typescript
// coupon.mock.ts (完全复用)
import type { Coupon } from '../../types/coupon.types'

export const mockCoupons: Coupon[] = [
  {
    id: 'cp1001',
    name: '新人专享立减券',
    type: 'instant_reduction',
    amount: 50,
    // ... 其他数据完全一致
  },
  // ...
]
```

---

### 阶段三: 组件迁移 (最大工作量，15-25 天)

#### 任务 3.1: 根组件迁移

**Remix root.tsx → Vue App.vue**

```vue
<!-- src/App.vue -->
<template>
  <div id="app" class="min-h-screen bg-background text-foreground">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()

    onMounted(() => {
      // 初始化侧边栏状态
      store.dispatch('initSidebarState')
    })

    return {}
  }
})
</script>

<style>
@import './styles/globals.css';
</style>
```

---

#### 任务 3.2: 页面组件迁移模板

**Remix 组件 → Vue 组件 示例**

**Remix 版本 (CouponListPage.tsx):**

```tsx
import { useState } from 'react'
import { Form, Link } from '@remix-run/react'
import type { Coupon } from './types/coupon.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'

interface CouponListPageProps {
  coupons: Coupon[]
  total: number
}

export default function CouponListPage({ coupons, total }: CouponListPageProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>优惠券列表</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsDialogOpen(true)}>
              创建优惠券
            </Button>
            <Table>
              {/* ... */}
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
```

---

**Vue 版本 (CouponListPage.vue):**

```vue
<template>
  <MainLayout>
    <div class="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>优惠券列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Button @click="isDialogOpen = true">
            创建优惠券
          </Button>
          <Table>
            <!-- ... -->
          </Table>
        </CardContent>
      </Card>
    </div>
  </MainLayout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import type { Coupon } from './types/coupon.types'
import CouponService from './services/coupon.service'
import MainLayout from '@/components/layouts/MainLayout.vue'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'

export default defineComponent({
  name: 'CouponListPage',
  components: {
    MainLayout,
    Card,
    Button
  },
  setup() {
    const coupons = ref<Coupon[]>([])
    const total = ref(0)
    const isDialogOpen = ref(false)

    const loadCoupons = async () => {
      const result = await CouponService.getCoupons({ page: 1, pageSize: 10 })
      coupons.value = result.data
      total.value = result.total
    }

    onMounted(loadCoupons)

    return {
      coupons,
      total,
      isDialogOpen
    }
  }
})
</script>
```

---

**迁移对照表:**

| React/Remix | Vue 2 Composition API |
|-------------|----------------------|
| `import { useState }` | `import { ref }` |
| `const [value, setValue] = useState(0)` | `const value = ref(0)` |
| `useEffect(() => {}, [])` | `onMounted(() => {})` |
| `useLoaderData<typeof loader>()` | `await Service.getData()` (在 onMounted 中) |
| `<Form method="post">` | `<form @submit.prevent="handleSubmit">` |
| `<Link to="/path">` | `<router-link to="/path">` |
| `onClick={() => {}}` | `@click=""` |
| `className="..."` | `class="..."` |
| `{value}` | `{{ value }}` |
| `{items.map(item => ...)}` | `<div v-for="item in items" :key="item.id">` |

---

#### 任务 3.3: 数据获取迁移

**Remix Loader → Vue onMounted + Service**

**Remix 方式 (SSR):**

```tsx
// routes/platform-admin/coupon-management/list.tsx
export async function loader({ request }: LoaderFunctionArgs) {
  const result = await CouponService.getCoupons({ page: 1, pageSize: 10 })
  return json(result)
}

export default function CouponListRoute() {
  const data = useLoaderData<typeof loader>()
  return <CouponListPage coupons={data.data} total={data.total} />
}
```

---

**Vue 方式 (CSR):**

```vue
<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import CouponService from './services/coupon.service'

export default defineComponent({
  setup() {
    const coupons = ref([])
    const loading = ref(false)

    const loadData = async () => {
      loading.value = true
      try {
        const result = await CouponService.getCoupons({ page: 1, pageSize: 10 })
        coupons.value = result.data
      } catch (error) {
        console.error('Failed to load coupons:', error)
      } finally {
        loading.value = false
      }
    }

    onMounted(loadData)

    return { coupons, loading, loadData }
  }
})
</script>
```

**⚠️ 重要变化:**
- ❌ 失去服务端渲染 (SSR) 能力
- ❌ 首屏加载速度可能变慢
- ✅ 客户端交互更灵活
- ✅ 服务端压力减小

---

#### 任务 3.4: 表单处理迁移

**Remix Form → Vue Form**

**Remix 方式:**

```tsx
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const name = formData.get('name')

  if (!name) {
    return json({ errors: { name: 'Name is required' } }, { status: 400 })
  }

  await CouponService.create({ name })
  return redirect('/coupons')
}

export default function CreateCouponRoute() {
  const actionData = useActionData<typeof action>()

  return (
    <Form method="post">
      <Input name="name" />
      {actionData?.errors?.name && <span>{actionData.errors.name}</span>}
      <Button type="submit">Create</Button>
    </Form>
  )
}
```

---

**Vue 方式:**

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <Input v-model="formData.name" />
    <span v-if="errors.name" class="text-red-500">{{ errors.name }}</span>
    <Button type="submit" :disabled="loading">
      {{ loading ? '创建中...' : '创建' }}
    </Button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { useRouter } from 'vue-router/composables'
import CouponService from './services/coupon.service'

export default defineComponent({
  setup() {
    const router = useRouter()
    const formData = ref({ name: '' })
    const errors = ref<Record<string, string>>({})
    const loading = ref(false)

    const handleSubmit = async () => {
      errors.value = {}

      if (!formData.value.name) {
        errors.value.name = 'Name is required'
        return
      }

      loading.value = true
      try {
        await CouponService.create(formData.value)
        router.push('/coupons')
      } catch (error) {
        errors.value.general = 'Failed to create coupon'
      } finally {
        loading.value = false
      }
    }

    return {
      formData,
      errors,
      loading,
      handleSubmit
    }
  }
})
</script>
```

---

#### 任务 3.5: 组件迁移工作量估算

**132 个页面组件迁移工时:**

| 模块 | 组件数 | 平均工时 | 总工时 |
|------|--------|---------|--------|
| PlatformAdmin | 24 | 2h | 48h |
| HotelBackend | 33 | 2h | 66h |
| MerchantBackend | 16 | 2h | 32h |
| CClient | 10 | 1.5h | 15h |
| PointsSystem | 5 | 2h | 10h |
| Architecture | 8 | 1h | 8h |
| 其他模块 | 36 | 1.5h | 54h |
| **总计** | **132** | - | **233h** |

**换算:** 233h ÷ 8h/天 = **29 工作日 (约 6 周)**

**并行开发 (2-3 人):** 10-15 工作日

---

### 阶段四: 路由和导航迁移 (3-5 天)

#### 任务 4.1: 路由配置生成

**自动化脚本: 从 vite.config.ts 提取路由**

```typescript
// scripts/generate-vue-routes.ts
import fs from 'fs'
import path from 'path'

// 读取 vite.config.ts
const viteConfig = fs.readFileSync('vite.config.ts', 'utf-8')

// 正则提取所有 route() 调用
const routeRegex = /route\("([^"]+)",\s*"routes\/([^"]+)"/g
const routes: Array<{ path: string; file: string }> = []

let match
while ((match = routeRegex.exec(viteConfig)) !== null) {
  routes.push({
    path: match[1],
    file: match[2]
  })
}

// 生成 Vue Router 配置
const vueRoutes = routes.map(route => {
  const componentPath = route.file
    .replace('.tsx', '.vue')
    .replace('routes/', 'views/')
    .replace('$', ':')  // 动态参数转换

  const routeName = route.path
    .replace(/\//g, '-')
    .replace(/:/g, '')

  return `  {
    path: '${route.path}',
    name: '${routeName}',
    component: () => import('@/${componentPath}')
  }`
}).join(',\n')

// 输出到文件
const output = `
import VueRouter from 'vue-router'

const routes = [
${vueRoutes}
]

export default new VueRouter({
  mode: 'history',
  routes
})
`

fs.writeFileSync('src/router/index.ts', output)
console.log(`✅ 生成了 ${routes.length} 条路由配置`)
```

---

#### 任务 4.2: 导航组件迁移

**Remix Link → Vue router-link**

```tsx
// Remix
<Link to="/platform-admin/coupons">优惠券</Link>
```

```vue
<!-- Vue -->
<router-link to="/platform-admin/coupons">优惠券</router-link>
```

---

#### 任务 4.3: 路由守卫配置

**路由权限控制 (如果需要)**

```typescript
// src/router/index.ts
router.beforeEach((to, from, next) => {
  // 权限检查
  const isAuthenticated = checkAuth()

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
```

---

### 阶段五: 构建和部署配置 (2-3 天)

#### 任务 5.1: Vite 构建配置

```typescript
// vite.config.ts (Vue 2 版本)
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'vuex'],
          'ui': ['@headlessui/vue']
        }
      }
    }
  }
})
```

---

#### 任务 5.2: 环境变量配置

```bash
# .env.development
VITE_APP_TITLE=民宿管理系统
VITE_APP_API_BASE_URL=http://localhost:5000/api
VITE_APP_PORT=3000

# .env.production
VITE_APP_TITLE=民宿管理系统
VITE_APP_API_BASE_URL=https://api.example.com
```

---

#### 任务 5.3: 部署脚本

```json
// package.json
{
  "scripts": {
    "dev": "vite --port 3000",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .vue,.ts,.tsx",
    "type-check": "vue-tsc --noEmit"
  }
}
```

---

### 阶段六: 测试和验证 (5-7 天)

#### 任务 6.1: 功能测试清单

**每个模块都需要测试:**

- [ ] 页面渲染正常
- [ ] 数据加载正常
- [ ] 筛选功能正常
- [ ] 表单提交正常
- [ ] 分页功能正常
- [ ] 路由跳转正常
- [ ] 弹窗/对话框正常
- [ ] 按钮交互正常
- [ ] 样式显示正常
- [ ] 响应式布局正常

**总计:** 132 个页面 × 10 项 = **1320 个测试点**

---

#### 任务 6.2: UI 对比验证

**工具:** Percy, Chromatic, 或手动截图对比

**验证项:**
- 颜色是否一致
- 字体大小是否一致
- 间距是否一致
- 圆角是否一致
- 阴影是否一致
- 动画是否一致

---

#### 任务 6.3: 性能对比测试

| 指标 | Remix (SSR) | Vue 2 (CSR) | 说明 |
|------|-------------|-------------|------|
| 首屏加载 (FCP) | ~800ms | ~1200ms | SSR 优势 |
| 可交互时间 (TTI) | ~1500ms | ~1800ms | 相差不大 |
| 路由切换速度 | ~100ms | ~50ms | CSR 更快 |
| 内存占用 | ~80MB | ~70MB | 相差不大 |

---

## 🔄 迁移风险和挑战

### 高风险项 ⚠️

| 风险 | 影响 | 缓解措施 |
|------|------|---------|
| **SSR → CSR** | 首屏性能下降 | 使用骨架屏、代码分割 |
| **UI 组件库差异** | UI 不一致 | 手动实现组件，严格对比 |
| **TypeScript 支持** | 类型提示变弱 | 使用 Composition API |
| **工作量大** | 开发周期长 | 并行开发、自动化脚本 |

---

### 中风险项 ⚠️

| 风险 | 影响 | 缓解措施 |
|------|------|---------|
| **路由配置复杂** | 配置错误 | 自动化脚本生成 |
| **表单验证逻辑** | 验证遗漏 | 统一表单验证库 |
| **状态管理迁移** | 状态丢失 | 完整测试 |
| **依赖版本冲突** | 构建失败 | 锁定版本号 |

---

### 低风险项 ✅

| 项目 | 说明 |
|------|------|
| **类型定义** | 100% 复用 |
| **服务层** | 100% 复用 |
| **Mock 数据** | 100% 复用 |
| **样式系统** | 100% 复用 (Tailwind + CSS 变量) |
| **工具函数** | 100% 复用 |

---

## 📊 工作量总估算

| 阶段 | 任务 | 工时 (小时) | 工时 (天) |
|------|------|------------|----------|
| **阶段一** | 项目初始化 | 32 | 4 |
| **阶段二** | 核心架构迁移 | 40 | 5 |
| **阶段三** | 组件迁移 (132 个) | 233 | 29 |
| **阶段四** | 路由和导航 | 32 | 4 |
| **阶段五** | 构建和部署 | 16 | 2 |
| **阶段六** | 测试和验证 | 48 | 6 |
| **缓冲时间** | Bug 修复、调整 | 40 | 5 |
| **总计** | - | **441** | **55** |

**换算:**
- **1 人开发:** 55 工作日 (约 **11 周**)
- **2 人并行:** 30 工作日 (约 **6 周**)
- **3 人并行:** 20 工作日 (约 **4 周**)

---

## 🎯 关键决策点

### 决策 1: 构建工具

**选项:**
- A: Vue CLI 4.x (稳定性 ⭐⭐⭐⭐⭐)
- B: Vite + Vue 2 (开发体验 ⭐⭐⭐⭐⭐)

**我的建议:** **选 B (Vite)**，理由:
1. 你的团队已熟悉 Vite
2. 开发速度快，热更新迅速
3. 配置简单，易于维护
4. Vue 2 + Vite 插件已成熟 (`@vitejs/plugin-vue2`)

---

### 决策 2: TypeScript 方案

**选项:**
- A: Vue.extend
- B: Class Component
- C: Composition API

**我的建议:** **选 C (Composition API)**，理由:
1. TypeScript 支持最好
2. 与 Vue 3 语法一致，未来迁移成本低
3. 逻辑复用能力强
4. 代码组织更清晰

---

### 决策 3: UI 组件库

**选项:**
- A: Element UI (快速开发)
- B: Ant Design Vue (高质量)
- C: 自定义组件库 (完全一致)
- D: Headless UI + 自定义 (平衡)

**我的建议:** **选 D (Headless UI + 自定义)**，理由:
1. UI 风格高度一致
2. 开发工作量可控 (30-50 小时)
3. 基于 Tailwind，样式复用度高
4. Headless UI 提供无障碍支持

---

### 决策 4: 状态管理

**选项:**
- A: Vuex 3.x
- B: Pinia 2.0 (Vue 2 兼容)

**我的建议:** **选 A (Vuex)**，理由:
1. 当前只有 1 个全局状态 (侧边栏折叠)
2. Vuex 3 稳定可靠
3. 如果未来计划迁移 Vue 3，再换 Pinia

---

## 📝 实施建议

### 并行开发策略 (3 人团队)

**人员分工:**

**开发者 A (前端架构师):**
- 项目初始化和配置
- UI 组件库开发 (16 个组件)
- 核心架构搭建
- 路由系统配置

**开发者 B (模块开发):**
- PlatformAdmin 模块 (24 个组件)
- MerchantBackend 模块 (16 个组件)
- PointsSystem 模块 (5 个组件)

**开发者 C (模块开发):**
- HotelBackend 模块 (33 个组件)
- CClient 模块 (10 个组件)
- Architecture 模块 (8 个组件)

---

### 迁移顺序建议

**阶段 1 (第 1-2 周):**
1. 项目初始化 (A)
2. UI 组件库开发 (A)
3. 核心架构搭建 (A)

**阶段 2 (第 3-5 周):**
1. 简单模块先行 (Architecture, PointsSystem)
2. 核心模块 (PlatformAdmin, HotelBackend)
3. 逐步完善 UI 组件

**阶段 3 (第 6 周):**
1. 测试和验证
2. Bug 修复
3. 性能优化

---

## 🚀 迁移后优势

### 兼容性 ✅

- ✅ Vue 2.6.12 与线上系统完全兼容
- ✅ 可以与现有 Vue 2 项目共享组件
- ✅ 可以与现有团队技能栈对齐

### 技术优势 ✅

- ✅ 打包体积更小 (Vue 2 体积 ~30KB)
- ✅ 客户端路由切换更快
- ✅ 状态管理更灵活
- ✅ 开发体验好 (Vite HMR)

### 代码复用 ✅

- ✅ 类型定义 100% 复用 (40+ 文件)
- ✅ 服务层 100% 复用 (40+ 文件)
- ✅ Mock 数据 100% 复用 (40+ 文件)
- ✅ 样式系统 100% 复用 (Tailwind + CSS 变量)
- ✅ 工具函数 100% 复用

---

## 🛠️ 自动化工具建议

### 工具 1: 路由配置生成器

```bash
node scripts/generate-vue-routes.ts
# 从 vite.config.ts 自动提取 98 条路由
```

### 工具 2: 组件迁移辅助脚本

```bash
node scripts/convert-component.ts app/pages/PlatformAdmin/CouponManagement/CouponListPage.tsx
# 自动生成 Vue 组件模板
```

### 工具 3: Import 路径转换

```bash
node scripts/fix-imports.ts src/
# 自动替换: ~/pages -> @/views
```

---

## 📚 参考资源

- [Vue 2.6 官方文档](https://v2.vuejs.org/)
- [Vue Router 3.x 文档](https://v3.router.vuejs.org/)
- [Vuex 3.x 文档](https://v3.vuex.vuejs.org/)
- [@vue/composition-api](https://github.com/vuejs/composition-api)
- [Vite + Vue 2 插件](https://github.com/vitejs/vite-plugin-vue2)
- [Headless UI Vue](https://headlessui.com/vue/menu)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

---

## 📞 下一步行动

请根据以上分析，对以下**关键决策**做出选择：

1. **构建工具**: A (Vue CLI) 还是 B (Vite)？
2. **TypeScript 方案**: A (Vue.extend) / B (Class) / C (Composition API)？
3. **UI 组件库**: A (Element UI) / B (Ant Design) / C (自定义) / D (Headless UI)？
4. **状态管理**: A (Vuex) 还是 B (Pinia)？
5. **团队配置**: 1 人 / 2 人 / 3 人？
6. **预期时间**: 4 周 / 6 周 / 11 周？

**确认后，我将:**
1. 生成详细的实施计划
2. 提供示例代码和模板
3. 编写自动化脚本
4. 创建迁移检查清单

---

**文档版本:** v1.0
**创建时间:** 2025-12-05
**作者:** Claude Code
**状态:** 待决策
