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

## 表单填写规范 ⭐

**基于基本信息Tab（Tab1AccountStoreInfo）的标准交互规范**

### 1. 表单布局（左右布局）

```vue
<a-form-model
  :model="formData"
  :label-col="{ span: 6 }"
  :wrapper-col="{ span: 14 }"
>
  <!-- 字段标签占25%，输入区域占58% -->
</a-form-model>
```

**要点**：
- label-col: `span: 6` (25%)
- wrapper-col: `span: 14` (58%)
- 标签在左侧，输入框在右侧
- 标签文字左对齐
- 字段间距：`24px`

### 2. 必填标记

**方式一**：使用 `required` 属性（推荐）
```vue
<a-form-model-item label="门店名称" required>
  <a-input v-model="formData.storeName" />
  <div class="field-hint">门店对外展示的名称</div>
</a-form-model-item>
```

**方式二**：使用红色星号
```vue
<a-form-model-item label="门店名称">
  <span class="required-mark">*</span>
  <a-input v-model="formData.storeName" />
  <div class="field-hint">门店对外展示的名称</div>
</a-form-model-item>
```

**样式**：
```less
.required-mark {
  color: @error-color;
  font-size: @font-size-base;
  margin-right: 4px;
  font-weight: @font-weight-semibold;
}
```

### 3. 字段说明（field-hint）

**位置**：输入框下方

```vue
<a-form-model-item label="主账号" required>
  <a-input v-model="formData.mainAccount" placeholder="13575481983" />
  <div class="field-hint">系统最高权限者，用于登录</div>
</a-form-model-item>
```

**样式**：
```less
.field-hint {
  font-size: @font-size-xs;     // 12px
  color: @text-secondary;        // #666666
  margin-top: 4px;
  line-height: 1.4;
}
```

### 4. 错误提示（error-hint）

**位置**：输入框下方（替代field-hint）

```vue
<a-form-model-item label="预订电话" required>
  <a-input v-model="formData.bookingPhone" @blur="validatePhone" />
  <div v-if="phoneError" class="error-hint">{{ phoneError }}</div>
  <div v-else class="field-hint">客人预订时的联系电话</div>
</a-form-model-item>
```

**样式**：
```less
.error-hint {
  font-size: @font-size-xs;     // 12px
  color: @error-color;           // #ef4444 红色
  margin-top: 4px;
  line-height: 1.4;
}
```

### 5. 文本域字符计数

**位置**：文本域下方右对齐

```vue
<div class="textarea-container">
  <a-textarea
    v-model="formData.description"
    :rows="12"
    :maxLength="1000"
    class="description-textarea"
  />
  <div class="char-count" :class="{ warning: description.length > 1000 }">
    {{ description.length }}/1000 字
    <span v-if="description.length < 200" class="hint-text">（至少200字）</span>
  </div>
</div>
```

**样式**：
```less
.char-count {
  text-align: right;
  font-size: @font-size-xs;      // 12px
  color: @text-secondary;         // #666666
  margin-top: 8px;

  &.warning {
    color: @error-color;          // 超限时红色
  }

  .hint-text {
    color: @warning-color;        // 橙色提示
    margin-left: 8px;
  }
}
```

### 6. 多选框布局（卡片样式）

**一行5列**（门店亮点）：
```vue
<a-checkbox-group v-model="formData.highlights" class="checkbox-grid-5col">
  <a-checkbox value="老建筑">老建筑</a-checkbox>
  <a-checkbox value="特色民居">特色民居</a-checkbox>
  <!-- ... -->
</a-checkbox-group>
```

**一行4列**（房型设施）：
```vue
<a-checkbox-group v-model="formData.facilities" class="checkbox-grid">
  <!-- ... -->
</a-checkbox-group>
```

**一行2列**（房型特色）：
```vue
<a-checkbox-group v-model="formData.features" class="checkbox-grid-2col">
  <!-- ... -->
</a-checkbox-group>
```

**样式**（以5列为例）：
```less
.checkbox-grid-5col {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px 16px;              // 行间距12px，列间距16px
  align-items: stretch;

  :deep(.ant-checkbox-wrapper) {
    margin: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    padding: 10px 12px;
    border: 1px solid @border-primary;
    border-radius: @border-radius-base;  // 6px
    background: @bg-primary;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: @font-size-sm;    // 13px
    color: @text-primary;

    &:hover {
      border-color: @brand-primary;
      background: rgba(59, 130, 246, 0.05);
    }

    &.ant-checkbox-wrapper-checked {
      border-color: @brand-primary;
      background: rgba(59, 130, 246, 0.08);
    }

    .ant-checkbox {
      top: 0;
    }
  }
}
```

### 7. 卡片结构

```vue
<a-card :bordered="false" class="form-section-card">
  <template slot="title">
    <span class="section-title">账号信息</span>
  </template>

  <a-form-model :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
    <!-- 表单字段 -->
  </a-form-model>
</a-card>
```

**样式**：
```less
.form-section-card {
  border-radius: @border-radius-lg;   // 8px
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;

  :deep(.ant-card-head) {
    border-bottom: 1px solid @border-primary;
    padding: 16px 24px;
  }

  :deep(.ant-card-body) {
    padding: 32px 24px;
  }
}

.section-title {
  font-size: @font-size-lg;           // 16px
  font-weight: @font-weight-semibold; // 600
  color: @text-primary;
}
```

**卡片间距**：
```less
.container {
  display: flex;
  flex-direction: column;
  gap: 24px;                          // 卡片之间24px间距
}
```

### 8. 输入框样式

```less
:deep(.ant-input),
:deep(.ant-input-number),
:deep(.ant-select-selector),
:deep(.ant-picker) {
  border-radius: @border-radius-base;  // 6px
  border-color: @border-primary;

  &:hover {
    border-color: @brand-primary-hover;
  }

  &:focus,
  &-focused {
    border-color: @brand-primary;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
}

:deep(.ant-input-number) {
  width: 100%;
}
```

### 9. 输入框图标前缀

```vue
<a-input v-model="formData.phone" placeholder="13575481983">
  <a-icon slot="prefix" type="phone" />
</a-input>
```

### 10. 分类标题（可选）

用于卡片内的二级分类：

```vue
<div class="highlight-category">
  <div class="category-title">建筑与景观类</div>
  <a-checkbox-group v-model="formData.highlights">
    <!-- ... -->
  </a-checkbox-group>
</div>
```

**样式**：
```less
.category-title {
  font-size: @font-size-base;         // 14px
  font-weight: @font-weight-semibold; // 600
  color: @text-primary;
  margin-bottom: 16px;
}
```

### 11. 完整示例

```vue
<template>
  <div class="page-container">
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <span class="section-title">基本信息</span>
      </template>

      <a-form-model
        :model="formData"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 14 }"
      >
        <!-- 普通输入框 + 必填 + 说明 -->
        <a-form-model-item label="门店名称" required>
          <a-input
            v-model="formData.storeName"
            placeholder="原乡芦茨"
            :maxLength="50"
          />
          <div class="field-hint">门店对外展示的名称</div>
        </a-form-model-item>

        <!-- 数字输入框 -->
        <a-form-model-item label="房间数量" required>
          <a-input-number
            v-model="formData.roomCount"
            :min="1"
            :max="500"
            placeholder="21"
            style="width: 100%"
          />
          <div class="field-hint">门店客房总数</div>
        </a-form-model-item>

        <!-- 带图标的输入框 + 错误提示 -->
        <a-form-model-item label="联系电话" required>
          <a-input
            v-model="formData.phone"
            placeholder="13575481983"
            @blur="validatePhone"
          >
            <a-icon slot="prefix" type="phone" />
          </a-input>
          <div v-if="phoneError" class="error-hint">{{ phoneError }}</div>
          <div v-else class="field-hint">客人预订时的联系电话</div>
        </a-form-model-item>

        <!-- 多选框（5列） -->
        <a-form-model-item label="门店亮点" required>
          <a-checkbox-group v-model="formData.highlights" class="checkbox-grid-5col">
            <a-checkbox value="老建筑">老建筑</a-checkbox>
            <a-checkbox value="特色民居">特色民居</a-checkbox>
            <a-checkbox value="大师设计">大师设计</a-checkbox>
            <!-- ... -->
          </a-checkbox-group>
          <div class="field-hint">至少选择3项</div>
        </a-form-model-item>

        <!-- 文本域 + 字符计数 -->
        <a-form-model-item label="门店介绍" required>
          <div class="textarea-container">
            <a-textarea
              v-model="formData.description"
              :rows="12"
              :maxLength="1000"
              placeholder="详细介绍门店..."
              class="description-textarea"
            />
            <div class="char-count" :class="{ warning: descriptionLength > 1000 }">
              {{ descriptionLength }}/1000 字
              <span v-if="descriptionLength < 200" class="hint-text">（至少200字）</span>
            </div>
          </div>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>

<style scoped lang="less">
@import '@/styles/variables.less';

.page-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-section-card { /* 见上面的样式定义 */ }
.section-title { /* 见上面的样式定义 */ }
.field-hint { /* 见上面的样式定义 */ }
.error-hint { /* 见上面的样式定义 */ }
.char-count { /* 见上面的样式定义 */ }
.checkbox-grid-5col { /* 见上面的样式定义 */ }
</style>
```

### 12. 检查清单

表单填写页面开发时，必须检查：

- [ ] 使用左右布局（label-col: 6, wrapper-col: 14）
- [ ] 必填字段标记 `required` 或红色星号
- [ ] 所有输入框下方添加 `field-hint` 说明
- [ ] 错误提示使用 `error-hint` 类
- [ ] 文本域配置字符计数
- [ ] 多选框使用卡片样式（checkbox-grid-*col）
- [ ] 卡片间距 24px
- [ ] 字段间距 24px
- [ ] 输入框圆角 6px
- [ ] 卡片圆角 8px
- [ ] 引入 `@import '@/styles/variables.less'`

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

**最后更新**: 2025-12-17
**项目**: 小而美 Home Stay 民宿管理系统
