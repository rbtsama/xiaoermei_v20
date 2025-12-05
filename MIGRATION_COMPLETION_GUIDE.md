# Vue 2 迁移完成指南

## ✅ 已完成的工作

### 阶段 1: 代码清理 ✅
- ✅ 删除了15个不在菜单的页面模块
- ✅ 删除了大量不需要的路由文件
- ✅ 保留了29个菜单页面的原始代码
- ✅ Git提交: `refactor: 清理不在导航菜单中的页面和路由`

### 阶段 2: 创建文档 ✅
- ✅ 创建 `CLAUDE_VUE2.md` - 完整的Vue 2开发规范
- ✅ 包含配置文件、开发流程、组件规范
- ✅ Git提交: `docs: 新增 Vue 2.6.12 架构文档`

### 阶段 3: 环境准备 ✅
- ✅ 卸载 Remix 相关依赖
- ✅ 卸载 Tailwind CSS 相关依赖
- ✅ 安装 Vue 2.6.12 + @vue/composition-api
- ✅ 安装 Ant Design Vue 1.7.8 + Less 4.2.0
- ✅ 安装 Vite 5.4.11 构建工具
- ✅ 创建 `src/` 目录结构

---

## 📋 剩余工作清单

### 需要创建的文件

#### 1. 配置文件 (必须)
```
项目根目录/
├── vite.config.js          ← 需要创建
├── index.html              ← 需要创建
└── package.json            ← 需要更新scripts
```

#### 2. 入口文件
```
src/
├── main.js                 ← 需要创建
├── App.vue                 ← 需要创建
└── styles/
    └── theme.less          ← 需要创建
```

#### 3. 布局组件
```
src/components/Layout/
├── Sidebar.vue             ← 需要创建 (基于app/pages/PointsSystem/components/Sidebar.tsx)
├── menuConfig.js           ← 需要创建
└── MainLayout.vue          ← 需要创建
```

#### 4. 路由配置
```
src/router/
└── index.js                ← 需要创建 (29个路由)
```

#### 5. 状态管理
```
src/store/
└── index.js                ← 需要创建
```

---

## 🚀 下一步执行步骤

### 步骤 1: 创建配置文件

参考 `CLAUDE_VUE2.md` 中的配置示例，创建以下文件:

1. **`vite.config.js`** (复制文档中的完整内容)
2. **`index.html`** (复制文档中的完整内容)
3. **`src/main.js`** (复制文档中的完整内容)
4. **`src/styles/theme.less`** (复制文档中的完整内容)

### 步骤 2: 更新 package.json

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

### 步骤 3: 创建布局组件

基于原有的 `app/pages/PointsSystem/components/Sidebar.tsx`:

1. 转换为 `src/components/Layout/Sidebar.vue`
2. 使用 Ant Design Vue 的 `<a-menu>` 组件
3. 保持原有的29个菜单项配置

### 步骤 4: 创建路由配置

在 `src/router/index.js` 中配置29个路由（参考菜单配置）

---

## 📖 页面迁移模板

### React/Remix 组件 → Vue 组件转换

**原始 Remix 页面 (React):**
```tsx
// app/pages/YourModule/YourModulePage.tsx
import { Card, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'

export default function YourModulePage() {
  const { data } = useLoaderData()
  const [search, setSearch] = useState('')

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>标题</CardTitle>
        </CardHeader>
        <Button onClick={() => console.log('click')}>
          按钮
        </Button>
      </Card>
    </div>
  )
}
```

**迁移后 Vue 页面:**
```vue
<!-- src/views/YourModule/YourModulePage.vue -->
<template>
  <div class="page-container">
    <a-card title="标题">
      <a-button type="primary" @click="handleClick">
        按钮
      </a-button>
    </a-card>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'YourModulePage',
  setup() {
    const search = ref('')

    const handleClick = () => {
      console.log('click')
    }

    return {
      search,
      handleClick
    }
  }
})
</script>

<style scoped lang="less">
.page-container {
  padding: 24px;
}
</style>
```

### 组件映射表

| Remix (shadcn/ui) | Vue (Ant Design Vue) | 说明 |
|-------------------|---------------------|------|
| `<Card>` | `<a-card>` | 卡片容器 |
| `<Button>` | `<a-button>` | 按钮 |
| `<Input>` | `<a-input>` | 输入框 |
| `<Select>` | `<a-select>` | 下拉选择 |
| `<Table>` | `<a-table>` | 表格 |
| `<Form>` | `<a-form-model>` | 表单 |
| `<Badge>` | `<a-tag>` | 标签/徽章 |
| `useLoaderData()` | `onMounted() + service` | 数据加载 |
| `useState()` | `ref()` | 响应式状态 |
| `useNavigation()` | `loading ref` | 加载状态 |

---

## 🔄 迁移工作流 (每个页面)

### 1. 保留原有代码作为参考
```bash
# 不要删除 app/pages/ 中的原始代码，直到迁移完成
```

### 2. 迁移顺序
对于每个模块:

1. **复制 types/**
   - 直接复制到 `src/views/YourModule/types/`
   - TypeScript类型定义通常无需修改

2. **复制 services/mocks/**
   - 复制到 `src/views/YourModule/services/mocks/`
   - Mock数据无需修改

3. **修改 service**
   - 复制到 `src/views/YourModule/services/`
   - 可能无需修改（已使用mocks）

4. **转换 Page 组件**
   - 从 `.tsx` 转换为 `.vue`
   - `template` 部分: React JSX → Vue template
   - `script` 部分: React hooks → Vue Composition API
   - `style` 部分: Tailwind classes → Less样式

5. **转换 子组件**
   - 按需转换 `components/` 下的子组件

6. **添加路由**
   - 在 `src/router/index.js` 中添加路由配置

7. **测试**
   - `npm run dev` 访问页面
   - 验证功能正常

---

## 📊 迁移进度追踪

### 设计架构模块 (3个页面)
- [ ] `/architecture/product/overview` - 产品架构总图
- [ ] `/architecture/design/color-system` - 配色系统
- [ ] `/architecture/design/color-system-2` - 配色系统2

### 平台后台模块 (7个页面)
#### 订单管理 (2个)
- [ ] `/order/list` - 订单列表
- [ ] `/dispute/refund-requests` - 退款管理

#### 会员管理 (1个)
- [ ] `/platform-admin/member-management/members` - 会员查询

#### 优惠券管理 (2个)
- [ ] `/platform-admin/coupon-management/list` - 优惠券列表
- [ ] `/platform-admin/coupon-management/issue` - 优惠券发放

#### 积分管理 (2个)
- [ ] `/platform-admin/points-management/config` - 积分配置
- [ ] `/platform-admin/points-management/adjust` - 积分调整

### 商户端模块 (19个页面)
#### 入驻平台 (1个)
- [ ] `/merchant-backend/join-application/apply` - 入驻申请

#### 门店信息 (7个)
- [ ] `/merchant-backend/store-info/basic` - 基本信息
- [ ] `/merchant-backend/store-info/policy` - 政策相关
- [ ] `/merchant-backend/store-info/facilities` - 门店设施
- [ ] `/merchant-backend/store-info/surrounding` - 周边信息
- [ ] `/merchant-backend/store-info/breakfast` - 早餐政策
- [ ] `/merchant-backend/store-info/extra-bed` - 加床政策
- [ ] `/merchant-backend/store-info/images` - 门店图片

#### 订单管理 (4个)
- [ ] `/hotel-backend/order-list` - 订单列表
- [ ] `/hotel-backend/order-calendar` - 订单日历
- [ ] `/hotel-backend/refund-management` - 客诉退款
- [ ] `/hotel-backend/user-reviews` - 用户评价

#### 房务管理 (6个)
- [ ] `/hotel-backend/room-price-calendar` - 房价日历
- [ ] `/hotel-backend/inventory-calendar` - 库存日历
- [ ] `/hotel-backend/room-type-list` - 房型列表
- [ ] `/hotel-backend/room-type-images` - 房型图片
- [ ] `/hotel-backend/rooms` - 房间管理
- [ ] `/hotel-backend/pms-integration` - PMS对接

#### 会员服务 (4个)
- [ ] `/merchant-backend/points-service/config` - 积分服务配置
- [ ] `/merchant-backend/vip-discount/config` - VIP折扣配置
- [ ] `/merchant-backend/agent-order/create` - 代客下单
- [ ] `/merchant-backend/old-customer/invite-member` - 邀请会员

---

## 🎯 关键注意事项

### 1. 保持原有功能一致
- ✅ 所有筛选器字段保持一致
- ✅ 表格列保持一致
- ✅ Mock数据保持一致
- ✅ 业务逻辑保持一致

### 2. 样式保持一致
- ✅ 使用Ant Design组件默认样式
- ✅ 通过Less变量自定义主题色
- ✅ 避免硬编码颜色值

### 3. Git提交规范
```bash
# 每完成一个模块立即提交
git add src/views/YourModule/
git commit -m "feat(module): 迁移YourModule模块

- 迁移 YourModulePage 页面
- 转换 React → Vue Composition API
- 使用 Ant Design Vue 组件
- 保持原有功能和UI一致"
```

---

## 🔧 调试技巧

### 常见问题

#### 1. "Cannot find module '@/views/...'"
**解决**: 确保 `vite.config.js` 中配置了路径别名

#### 2. Ant Design 样式未生效
**解决**: 确保在 `main.js` 中导入了 `theme.less`

#### 3. 路由跳转404
**解决**: 检查 `router/index.js` 中是否配置了对应路由

#### 4. 类型错误
**解决**: 运行 `npm run typecheck` 检查类型

---

## 📞 下一步行动

1. **立即行动**: 创建上述配置文件，启动项目
2. **按模块迁移**: 从简单的页面开始（如设计架构模块）
3. **渐进式验证**: 每完成一个页面立即测试
4. **持续提交**: 每完成一个模块立即Git提交

---

## ✅ 完成标志

当你完成所有29个页面迁移后:

1. 所有页面可以正常访问
2. 所有功能正常工作
3. 样式与原设计一致
4. `npm run typecheck` 无错误
5. `npm run build` 成功

**最终提交:**
```bash
git tag -a v2.0.0-vue2-migration-complete -m "完成 Vue 2 全量迁移"
git push origin master --tags
```

---

**祝迁移顺利！如有问题，参考 `CLAUDE_VUE2.md` 文档。** 🚀
