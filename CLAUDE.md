# 小而美 Home Stay - Vue 2 开发规范

## 目录

- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [核心原则](#核心原则)
- [开发流程](#开发流程)
- [设计规范](#设计规范)
- [表格标准](#表格标准)
- [开发检查清单](#开发检查清单)

---

## 技术栈

**核心框架**：Vue 2.6.12 + Vue Router 3.5.4 + Vuex 3.6.2 + Composition API 1.7.2

**构建工具**：Vite 5.4.11 + TypeScript 5.6.3

**UI 组件**：Ant Design Vue 1.7.8 + Less 4.2.0

**工具库**：Day.js 1.11.13 + Lodash 4.17.21

---

## 快速开始

```bash
npm install          # 安装依赖
npm run dev          # 启动开发 (http://localhost:3000)
npm run build        # 构建生产
npm run typecheck    # 类型检查
```

---

## 项目结构

```
homestay_v1/
├── src/
│   ├── views/              # 页面组件
│   │   ├── PlatformAdmin/  # 平台后台
│   │   └── MerchantBackend/# 商户端
│   ├── components/         # 公共组件
│   ├── router/             # 路由配置
│   ├── mocks/              # Mock 数据
│   ├── types/              # TypeScript 类型
│   ├── api/                # API 接口
│   └── styles/             # 样式文件
├── vite.config.js
└── package.json
```

---

## 核心原则

### 1. 模块化开发
- 每个业务模块独立，相互解耦
- 组件按功能划分，单一职责
- 公共组件放 `src/components/`

### 2. Mock 驱动开发
- Mock 数据集中管理在 `src/mocks/`
- 使用真实业务场景命名
- 类型定义放 `src/types/`

### 3. 组件大小控制
- **软限制**：< 300 行
- **硬限制**：< 500 行
- 超限时拆分子组件

### 4. 代码规范
- 使用 Composition API
- 变量 camelCase，常量 UPPER_SNAKE_CASE
- 事件处理函数用 `handle` 前缀

### 5. Git 提交规范 ⚠️ 重要
- **所有修改必须提交到 Git**
- 完成一个功能模块后立即提交
- 完成多个相关修改后统一提交
- 提交信息格式：
  - `feat: 添加XXX功能`
  - `fix: 修复XXX问题`
  - `refactor: 重构XXX模块`
  - `docs: 更新XXX文档`
- **绝不允许**遗漏提交，所有修改都要有记录

---

## 开发流程

### 新建模块标准流程

#### 1. 确定位置
```bash
src/views/PlatformAdmin/{ModuleName}/   # 平台后台
src/views/MerchantBackend/{ModuleName}/ # 商户端
```

#### 2. 创建类型（如需要）
**`src/types/moduleName.ts`**
```typescript
export enum ItemStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface ModuleItem {
  id: string
  name: string
  status: ItemStatus
  createdAt: string
  updatedAt: string
}
```

#### 3. 创建 Mock 数据
**`src/mocks/moduleName.mock.ts`**
```typescript
import { ModuleItem, ItemStatus } from '@/types/moduleName'

export const mockItems: ModuleItem[] = [
  {
    id: '1',
    name: '示例项目 A',
    status: ItemStatus.ACTIVE,
    createdAt: '2025-10-01 10:00:00',
    updatedAt: '2025-11-15 14:30:00',
  }
]
```

#### 4. 创建页面组件
**`src/views/.../ModuleListPage.vue`**
```vue
<template>
  <sidebar>
    <div class="page-container">
      <!-- 筛选器 -->
      <a-card :bordered="false" class="filter-card">
        <div class="filter-container">
          <a-input v-model="filters.keyword" placeholder="搜索" style="width: 200px">
            <a-icon slot="prefix" type="search" />
          </a-input>
          <a-button type="primary" @click="handleSearch">搜索</a-button>
          <a-button @click="handleReset">重置</a-button>
        </div>
      </a-card>

      <!-- 列表 -->
      <a-card :bordered="false" class="list-card">
        <div slot="title" class="card-header">
          <span class="card-title">数据列表</span>
          <a-button type="primary" @click="handleCreate">
            <a-icon type="plus" />新建
          </a-button>
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
          <!-- 日期时间 -->
          <template slot="createdAt" slot-scope="createdAt">
            <div class="datetime-cell">
              <div class="date">{{ formatDate(createdAt) }}</div>
              <div class="time">{{ formatTime(createdAt) }}</div>
            </div>
          </template>

          <!-- 状态标签 -->
          <template slot="status" slot-scope="status">
            <a-tag :class="status === 'active' ? 'tag-green' : 'tag-gray'">
              {{ status === 'active' ? '已启用' : '已停用' }}
            </a-tag>
          </template>

          <!-- 操作 -->
          <template slot="action" slot-scope="text, record">
            <div class="action-btns">
              <a-button size="small" @click="handleEdit(record)">
                <a-icon type="edit" />编辑
              </a-button>
              <a-button size="small" :type="record.status === 'active' ? 'danger' : 'primary'"
                @click="handleToggleStatus(record)">
                {{ record.status === 'active' ? '停用' : '启用' }}
              </a-button>
            </div>
          </template>
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
  name: 'ModuleListPage',
  components: { Sidebar },
  setup() {
    const isLoading = ref(false)
    const tableData = ref([])
    const filters = reactive({ keyword: '', status: '' })
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
      { title: 'ID', dataIndex: 'id', width: 100 },
      { title: '名称', dataIndex: 'name', width: 180 },
      { title: '状态', dataIndex: 'status', width: 80, scopedSlots: { customRender: 'status' } },
      { title: '创建时间', dataIndex: 'createdAt', width: 120, scopedSlots: { customRender: 'createdAt' } },
      { title: '操作', width: 140, fixed: 'right', scopedSlots: { customRender: 'action' } }
    ]

    const formatDate = (dt) => dt ? dayjs(dt).format('YYYY-MM-DD') : '-'
    const formatTime = (dt) => dt ? dayjs(dt).format('HH:mm:ss') : '-'

    const fetchData = async () => {
      isLoading.value = true
      try {
        // 加载数据逻辑
      } finally {
        isLoading.value = false
      }
    }

    onMounted(() => fetchData())

    return { isLoading, tableData, filters, pagination, columns, formatDate, formatTime }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.page-container {
  padding: 24px;
  max-width: 1800px;
  margin: 0 auto;
}

.filter-card {
  margin-bottom: 20px;
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;
  :deep(.ant-card-body) { padding: 20px 24px; }
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
  :deep(.ant-card-head) { border-bottom: 1px solid @bg-tertiary; padding: 16px 24px; }
  :deep(.ant-card-body) { padding: 0; }
}

.card-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.card-title {
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

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
    &:hover > td { background: @bg-hover; }
    > td { border-bottom: 1px solid @border-primary; padding: 12px 16px; color: @text-primary; }
  }

  :deep(.ant-table-pagination) { padding: 16px 24px; }
}

.datetime-cell {
  .date { display: block; color: @text-primary; font-size: @font-size-base; line-height: 1.5; }
  .time { display: block; color: @text-secondary; font-size: @font-size-sm; line-height: 1.5; margin-top: 2px; }
}

.tag-green { color: #15803d; background: #f0fdf4; border-color: #bbf7d0; }
.tag-gray { color: #64748b; background: #f8fafc; border-color: #cbd5e1; }

:deep(.ant-tag) {
  margin: 0;
  padding: 2px 8px;
  font-size: @font-size-xs;
  font-weight: @font-weight-medium;
  line-height: 20px;
  border-radius: @border-radius-sm;
  border-width: 1px;
}

.action-btns {
  display: flex;
  gap: 8px;
  justify-content: center;
  .ant-btn-sm { height: 28px; padding: 0 12px; font-size: @font-size-sm; }
}
</style>
```

#### 5. 配置路由
**`src/router/index.js`**
```javascript
{
  path: '/platform-admin/module-name/list',
  name: 'ModuleList',
  component: () => import('@/views/PlatformAdmin/ModuleName/ModuleListPage.vue'),
  meta: { title: '模块列表' }
}
```

---

## 设计规范

### 统一圆角规范（重要）
**所有组件圆角统一 6px，标签 4px，卡片 8px**

```css
.ant-btn, .ant-input, .ant-select-selector, .ant-picker { border-radius: 6px !important; }
.ant-tag { border-radius: 4px !important; }
.ant-card { border-radius: 8px; }
```

### 配色系统
```css
/* 品牌色 */
--brand-primary: #3b82f6;
--brand-primary-hover: #2563eb;

/* 功能色 */
--success-color: #10b981;
--warning-color: #f97316;
--error-color: #ef4444;

/* 文字色 */
--text-primary: rgba(0,0,0,0.9);   /* 主要内容 */
--text-secondary: #666666;         /* 辅助文字 */
--text-tertiary: #b1b1b1;          /* 暗提示文字 */

/* 背景色 */
--bg-primary: #ffffff;
--bg-secondary: #f8fafc;           /* 表头、只读字段 */
--bg-hover: #f1f5f9;

/* 边框色 */
--border-primary: #e2e8f0;
--border-focus: #3b82f6;
```

### 字体规范
```css
/* 字号 */
--font-size-xs: 12px;    /* 标签、辅助文字 */
--font-size-sm: 13px;
--font-size-base: 14px;  /* 基础文字 */
--font-size-lg: 16px;    /* 标题 */

/* 字重 */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
```

### 日期时间展示规范
**所有日期+时间必须分行显示**

```vue
<template slot="createdAt" slot-scope="datetime">
  <div class="datetime-cell">
    <div class="date">{{ formatDate(datetime) }}</div>
    <div class="time">{{ formatTime(datetime) }}</div>
  </div>
</template>
```

```less
.datetime-cell {
  .date { color: rgba(0,0,0,0.9); font-size: 14px; }
  .time { color: #666666; font-size: 13px; margin-top: 2px; }
}
```

### 标签颜色规范
```less
.tag-blue { color: #1d4ed8; background: #eff6ff; border-color: #bfdbfe; }
.tag-green { color: #15803d; background: #f0fdf4; border-color: #bbf7d0; }
.tag-orange { color: #c2410c; background: #fff7ed; border-color: #fed7aa; }
.tag-red { color: #b91c1c; background: #fee2e2; border-color: #fca5a5; }
.tag-purple { color: #7c3aed; background: #f5f3ff; border-color: #ddd6fe; }
.tag-gray { color: #64748b; background: #f8fafc; border-color: #cbd5e1; }
```

### 按钮规范
```css
/* 主按钮 */
background: #3b82f6; height: 32px; padding: 0 16px; border-radius: 6px;

/* 小按钮 */
height: 28px; padding: 0 12px; font-size: 13px;
```

### 间距系统
```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-base: 12px;
--spacing-md: 16px;
--spacing-lg: 20px;
--spacing-xl: 24px;
```

### 阴影系统
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.03);      /* 静态卡片 */
--shadow-md: 0 4px 6px rgba(0,0,0,0.07);      /* hover */
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1);     /* 弹窗 */
```

---

## 表格标准

### 标准列配置
```javascript
const columns = [
  { title: 'ID', dataIndex: 'id', width: 100 },
  { title: '类型', dataIndex: 'type', width: 100, scopedSlots: { customRender: 'type' } },
  { title: '名称', dataIndex: 'name', width: 180 },
  { title: '状态', dataIndex: 'status', width: 80, scopedSlots: { customRender: 'status' } },
  { title: '创建时间', dataIndex: 'createdAt', width: 120, scopedSlots: { customRender: 'createdAt' } },
  { title: '操作', width: 140, fixed: 'right', scopedSlots: { customRender: 'action' } }
]
```

**列宽度参考**：
- ID列: 100px
- 类型/状态标签: 80-100px
- 名称/标题: 150-200px
- 日期时间: 120px（分行显示）
- 操作列（2按钮）: 140px
- 操作列（3按钮）: 180px

### 标准操作按钮
```vue
<template slot="action" slot-scope="text, record">
  <div class="action-btns">
    <a-button size="small" @click="handleEdit(record)">
      <a-icon type="edit" />编辑
    </a-button>
    <a-button size="small" :type="record.status === 'enabled' ? 'danger' : 'primary'"
      @click="handleToggleStatus(record)">
      {{ record.status === 'enabled' ? '停用' : '启用' }}
    </a-button>
  </div>
</template>
```

### 标准分页配置
```javascript
pagination: {
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total) => `共 ${total} 条`,
  pageSizeOptions: ['10', '20', '50', '100']
}
```

---

## 开发检查清单

### 新建页面时
- [ ] 引入 `@import '@/styles/variables.less'`
- [ ] 所有按钮、输入框圆角 6px
- [ ] 标签圆角 4px，卡片圆角 8px
- [ ] 主文字 90% 黑，辅助文字 #666
- [ ] 日期时间分行显示
- [ ] 表头背景 `@bg-secondary`
- [ ] hover 背景 `@bg-hover`
- [ ] 组件大小 < 500 行

### 颜色使用
- [ ] 主按钮用品牌蓝 #3b82f6
- [ ] 成功状态用 #10b981
- [ ] 警告状态用 #f97316
- [ ] 错误状态用 #ef4444
- [ ] 无硬编码颜色值

### 表格规范
- [ ] 使用 `.custom-table` 类
- [ ] 日期时间用 `.datetime-cell` 结构
- [ ] 操作按钮用 `.action-btns` 容器
- [ ] 分页启用 showSizeChanger 和 showQuickJumper

---

## 常用命令

```bash
# 开发
npm run dev

# 构建
npm run build

# 类型检查
npm run typecheck

# 端口占用（Windows）
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# 端口占用（macOS/Linux）
lsof -ti:3000 | xargs kill -9
```

---

## 故障排查

### TypeScript 错误
检查 `tsconfig.json` paths 和 `vite.config.js` alias 配置

### Ant Design Vue 样式缺失
确认 `main.js` 导入了 `import 'ant-design-vue/dist/antd.css'`

### Mock 数据未显示
检查导入路径、数据格式、fetchData 调用

---

## 禁止行为

### 圆角
- ❌ 不要混用不同圆角大小
- ❌ 不要自定义圆角值

### 颜色
- ❌ 不要硬编码颜色值
- ❌ 不要使用纯黑 #000000（用 rgba(0,0,0,0.9)）

### 字体
- ❌ 不要使用等宽字体（monospace）
- ❌ 不要混用多种字体

### 间距
- ❌ 不要随意使用间距值
- ❌ 必须使用间距系统变量

---

## 资源链接

- **Vue 2**: https://v2.cn.vuejs.org/
- **Ant Design Vue 1.x**: https://1x.antdv.com/docs/vue/introduce-cn/
- **Vite**: https://cn.vitejs.dev/

---

**最后更新**: 2025-12-08
**项目**: 小而美 Home Stay 民宿管理系统
