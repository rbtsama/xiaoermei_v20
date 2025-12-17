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

### 5. Git 提交规范 🚨 严格执行

**⚠️ 绝对要求：每次修改文件后必须立即提交到 Git，不得遗漏！**

#### **提交时机**
- ✅ 修改任何代码文件后**立即提交**
- ✅ 创建新文件后**立即提交**
- ✅ 删除文件后**立即提交**
- ✅ 修改配置文件后**立即提交**
- ✅ 更新文档后**立即提交**
- ❌ **绝不允许**遗漏提交
- ❌ **绝不允许**积累多个修改后才提交

#### **提交信息格式**
```bash
feat: 添加XXX功能           # 新功能
fix: 修复XXX问题            # Bug修复
refactor: 重构XXX模块       # 代码重构
style: 调整XXX样式          # 样式修改
docs: 更新XXX文档           # 文档更新
chore: XXX                  # 其他修改
```

#### **提交检查清单**
每次修改后必须：
1. [ ] `git add` 暂存修改的文件
2. [ ] `git commit` 提交并写清楚提交信息
3. [ ] 确认提交成功（查看commit hash）

#### **惩罚措施**
- 遗漏提交视为**严重失误**
- 所有修改必须有Git记录可追溯

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

## 表单填写设计规范 ⭐

**完整标准规范（基于Tab1AccountStoreInfo）**

**📄 独立文档**：根目录 `表单填写设计规范.md`

**⚠️ 重要**：修改表单规范时，必须同时更新两个文件：
1. `CLAUDE.md`（本文件）
2. `表单填写设计规范.md`（独立规范文档）

### 1. 卡片结构规范

#### **卡片基础样式**
```less
.form-section-card {
  border-radius: 8px;              // 卡片圆角
  border: 1px solid #e2e8f0;       // 边框颜色 @border-primary
  box-shadow: 0 1px 2px rgba(0,0,0,0.03); // 阴影 @shadow-sm
}
```

#### **卡片头部（标题区域）**
```less
:deep(.ant-card-head) {
  border-bottom: 1px solid #e2e8f0;  // 底部分割线
  padding: 16px 24px;                 // 上下16px，左右24px
}

.section-title {
  font-size: 16px;                    // @font-size-lg
  font-weight: 600;                   // @font-weight-semibold
  color: rgba(0,0,0,0.9);            // @text-primary
}
```

#### **卡片内容区域**
```less
:deep(.ant-card-body) {
  padding: 32px 24px;                 // 上下32px，左右24px
}
```

#### **卡片间距**
```less
.container {
  display: flex;
  flex-direction: column;
  gap: 24px;                          // 卡片之间间距24px
}
```

### 2. 表单布局（左右布局）

#### **布局比例**
```vue
<a-form-model
  :model="formData"
  :label-col="{ span: 6 }"           // 标签区域占25%
  :wrapper-col="{ span: 14 }"        // 输入区域占58%
>
  <!-- 剩余17%为右侧留白 -->
</a-form-model>
```

#### **字段间距**
```less
:deep(.ant-form-item) {
  margin-bottom: 24px;                // 字段之间间距24px
}
```

### 3. 字段标签规范

#### **标签位置和对齐**
- 位置：输入框**左侧**
- 对齐方式：**左对齐**
- 占比：25%（span: 6）

#### **标签文字样式**
```less
:deep(.ant-form-item-label) {
  font-weight: 400;                   // 正常字重，不加粗
  color: rgba(0,0,0,0.9);            // 黑色
  text-align: left;                   // 左对齐

  label::after {
    content: '';                      // 去除默认冒号
  }
}
```

- **字号**：14px（继承基础字号 @font-size-base）
- **字重**：400（正常，不加粗，避免与标题冲突）
- **颜色**：rgba(0,0,0,0.9)（黑色，简洁统一）

**设计理念**：通过位置、字号、间距建立层次，不通过加粗或颜色

### 4. 必填标记（红色星号）

#### **位置**：字段标签的**左侧**

#### **实现方式**：使用`required`属性（唯一标准方式）
```vue
<a-form-model-item label="门店名称" required>
  <!-- Ant Design自动在label左侧显示红色星号 -->
</a-form-model-item>
```

#### **特殊情况**：非form-model-item（如卡片标题、分类标题）
```vue
<!-- 仅用于非表单字段的标题 -->
<span class="category-title">交通服务 <span class="required">*</span></span>
```

**⚠️ 注意**：表单字段必须使用`required`属性，不得使用自定义星号

#### **样式定义**
```less
.required {
  color: #ef4444;                     // @error-color 红色
  margin-left: 2px;                   // 与文字间距2px
}
```

- **颜色**：#ef4444（错误色/红色）
- **位置**：紧跟在字段名称之后，左间距2px

### 5. 输入框规范

#### **位置**：字段标签的**右侧**
#### **占比**：58%（span: 14）

#### **输入框样式**
```less
:deep(.ant-input),
:deep(.ant-input-number),
:deep(.ant-select-selector),
:deep(.ant-picker) {
  border-radius: 6px;                 // @border-radius-base
  border-color: #e2e8f0;             // @border-primary

  &:hover {
    border-color: #2563eb;            // @brand-primary-hover
  }

  &:focus,
  &-focused {
    border-color: #3b82f6;            // @brand-primary
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
}

:deep(.ant-input-number) {
  width: 100%;                        // 数字输入框宽度100%
}
```

- **圆角**：6px
- **边框颜色**：#e2e8f0（默认）
- **Hover边框**：#2563eb（深蓝）
- **Focus边框**：#3b82f6（品牌蓝）+ 蓝色阴影

### 6. Placeholder（暗提示）

#### **颜色和样式**
```less
:deep(input::placeholder),
:deep(textarea::placeholder) {
  color: #b1b1b1;                     // @text-tertiary
  opacity: 1;
}
```

- **字号**：继承输入框字号（14px）
- **颜色**：#b1b1b1（暗提示文字色）
- **示例**：`placeholder="原乡芦茨"`

### 7. 字段说明（field-hint）

#### **位置**：输入框**下方**
#### **距离**：margin-top: **4px**

```vue
<a-form-model-item label="主账号" required>
  <a-input v-model="formData.mainAccount" />
  <div class="field-hint">系统最高权限者，用于登录</div>
</a-form-model-item>
```

#### **样式定义**
```less
.field-hint {
  font-size: 12px;                    // @font-size-xs
  color: #666666;                     // @text-secondary
  margin-top: 4px;                    // 与输入框距离4px
  line-height: 1.4;                   // 行高1.4
}
```

- **字号**：12px（小字）
- **颜色**：#666666（辅助文字色）
- **上边距**：4px
- **行高**：1.4

### 8. 错误提示（error-hint）

#### **位置**：输入框**下方**（替代field-hint显示）
#### **距离**：margin-top: **4px**

```vue
<a-form-model-item label="预订电话" required>
  <a-input v-model="formData.bookingPhone" @blur="validatePhone" />
  <div v-if="phoneError" class="error-hint">{{ phoneError }}</div>
  <div v-else class="field-hint">客人预订时的联系电话</div>
</a-form-model-item>
```

#### **样式定义**
```less
.error-hint {
  font-size: 12px;                    // @font-size-xs
  color: #ef4444;                     // @error-color 红色
  margin-top: 4px;                    // 与输入框距离4px
  line-height: 1.4;                   // 行高1.4
}
```

- **字号**：12px（与field-hint相同）
- **颜色**：#ef4444（红色，醒目）
- **上边距**：4px
- **行高**：1.4

### 9. 间距规范总览

#### **垂直间距**
```
卡片之间        24px    (.container gap)
卡片标题下方    0px     (由卡片头部padding控制)
字段之间        24px    (:deep(.ant-form-item) margin-bottom)
输入框到说明    4px     (.field-hint margin-top)
分类标题上方    32px    (.section-title.section-spacing margin-top)
分类标题下方    20px    (.section-title margin-bottom)
```

#### **水平间距**
```
标签与输入框    自动    (由label-col和wrapper-col的gap控制)
输入框组合间距  16px    (a-row gutter="16")
多选框列间距    16px    (checkbox-grid gap: 12px 16px)
多选框行间距    12px    (checkbox-grid gap: 12px 16px)
```

#### **内边距（Padding）**
```
卡片头部        16px 24px    (上下16px，左右24px)
卡片内容        32px 24px    (上下32px，左右24px)
输入框内部      4px 11px     (Ant Design默认)
多选框卡片      10px 12px    (checkbox-wrapper padding)
```

### 10. 文本域字符计数

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

### 11. 多选框布局（卡片样式）

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

### 12. 完整视觉规范总结

#### **颜色规范**
```
主文字色        rgba(0,0,0,0.9)     // 字段标签、输入内容
辅助文字色      #666666              // 字段说明
暗提示文字色    #b1b1b1              // placeholder
错误文字色      #ef4444              // 必填星号、错误提示
边框色          #e2e8f0              // 卡片边框、输入框边框
品牌蓝          #3b82f6              // Focus状态、主按钮
背景色          #ffffff              // 卡片背景
次要背景色      #f8fafc              // 表头、禁用字段
```

#### **字号规范**
```
卡片标题        16px    (@font-size-lg)      加粗600
分类标题        14px    (@font-size-base)    加粗600  黑色
字段标签        14px    (@font-size-base)    正常400  黑色
输入内容        14px    (@font-size-base)    正常400  黑色
字段说明        12px    (@font-size-xs)      正常400  灰色#666
错误提示        12px    (@font-size-xs)      正常400  红色#ef4444
Placeholder     14px    (继承输入框)         正常400  浅灰#b1b1b1
```

#### **圆角规范**
```
卡片圆角        8px     (@border-radius-lg)
输入框圆角      6px     (@border-radius-base)
标签圆角        4px     (@border-radius-sm)
按钮圆角        6px     (@border-radius-base)
```

### 13. 示例代码

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

### 14. 输入框图标前缀

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

### 15. 分类标题（可选）

```vue
<a-input v-model="formData.phone" placeholder="13575481983">
  <a-icon slot="prefix" type="phone" />
</a-input>
```

### 16. 检查清单

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

### 13. 完整代码示例

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

### 17. 开发检查清单

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

**完整规范详见**：`表单填写设计规范.md`

**规范符合度检查**：
- 提示文字：12px #666 margin-top:4px line-height:1.4
- 字段标签：14px 400 rgba(0,0,0,0.9)
- 字段间距：24px
- 卡片padding：头部16px 24px，内容32px 24px

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
