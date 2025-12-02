# ToggleButton 统一启用/停用按钮组件

## 📋 设计规范

### 视觉样式

**启用状态(当前已启用,点击后停用):**
- 文字颜色: `text-green-600`
- 边框颜色: `border-green-600`
- Hover背景: `hover:bg-green-50`
- 按钮文字: "停用"

**停用状态(当前已停用,点击后启用):**
- 文字颜色: `text-orange-600`
- 边框颜色: `border-orange-600`
- Hover背景: `hover:bg-orange-50`
- 按钮文字: "启用"

### 设计理念

- ✅ **直观**: 按钮文字显示的是"点击后的动作",而非当前状态
- ✅ **统一**: 全系统使用相同的颜色和交互模式
- ✅ **可访问**: 足够的对比度,清晰的hover反馈

## 🚀 使用方法

### 基础用法

```tsx
import { ToggleButton } from '~/components/common/ToggleButton'

// 在Form中使用
<Form method="post" action="/api/toggle">
  <ToggleButton
    isEnabled={item.status === 'enabled'}
    size="sm"
  />
</Form>
```

### Props说明

| Prop | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `isEnabled` | `boolean` | ✅ | - | 当前是否已启用 |
| `onToggle` | `() => void` | ❌ | - | 点击回调(用于客户端交互) |
| `enabledText` | `string` | ❌ | '停用' | 已启用时的按钮文字 |
| `disabledText` | `string` | ❌ | '启用' | 已停用时的按钮文字 |
| `disabled` | `boolean` | ❌ | `false` | 是否禁用按钮 |
| `size` | `'sm' \| 'default'` | ❌ | `'sm'` | 按钮尺寸 |
| `className` | `string` | ❌ | - | 额外的CSS类名 |

### 完整示例

#### 1. 在表格中使用

```tsx
{items.map((item) => (
  <TableRow key={item.id}>
    <TableCell>{item.name}</TableCell>
    <TableCell>
      <Form method="post" action={`/api/toggle/${item.id}`}>
        <ToggleButton
          isEnabled={item.status === 'enabled'}
          size="sm"
          className="h-7 px-3"
        />
      </Form>
    </TableCell>
  </TableRow>
))}
```

#### 2. 带禁用条件

```tsx
<Form method="post">
  <input type="hidden" name="id" value={item.id} />
  <ToggleButton
    isEnabled={item.status === 'enabled'}
    disabled={!item.isConfigured}  // 未配置时禁用
    size="sm"
  />
</Form>
```

#### 3. 自定义文字

```tsx
<ToggleButton
  isEnabled={user.isActive}
  enabledText="禁用用户"
  disabledText="激活用户"
/>
```

#### 4. 客户端交互(不使用Form)

```tsx
<ToggleButton
  isEnabled={isEnabled}
  onToggle={() => setIsEnabled(!isEnabled)}
  size="default"
/>
```

## 📦 组件变体

### ToggleFormButton (带表单提交)

自动包含form标签和hidden inputs:

```tsx
import { ToggleFormButton } from '~/components/common/ToggleButton'

<ToggleFormButton
  isEnabled={coupon.status === 'enabled'}
  itemId={coupon.id}
  size="sm"
/>
```

## ✅ 已更新的页面

- ✅ `app/pages/PlatformAdmin/CouponManagement/CouponListPage.tsx`
- ✅ `app/pages/PlatformAdmin/CouponManagement/SceneDistributionPage.tsx`
- ✅ `app/pages/PlatformAdmin/CouponManagement/CouponDistributionPage.tsx`

## 📝 迁移指南

### 旧代码模式

```tsx
// ❌ 旧写法 - 每个地方样式不一致
<Button
  variant="outline"
  size="sm"
  className={`${
    status === 'enabled'
      ? 'border-orange-300 text-orange-700 hover:bg-orange-50'
      : 'border-green-300 text-green-700 hover:bg-green-50'
  }`}
>
  {status === 'enabled' ? '停用' : '启用'}
</Button>
```

### 新代码模式

```tsx
// ✅ 新写法 - 统一使用ToggleButton
import { ToggleButton } from '~/components/common/ToggleButton'

<ToggleButton
  isEnabled={status === 'enabled'}
  size="sm"
  className="h-7 px-3"
/>
```

### 批量替换步骤

1. **导入组件**
```tsx
import { ToggleButton } from '~/components/common/ToggleButton'
```

2. **替换Button为ToggleButton**
   - 移除 `variant="outline"`
   - 移除自定义className中的颜色逻辑
   - 移除子元素中的三元表达式文字
   - 添加 `isEnabled` prop

3. **保留必要的属性**
   - `size` - 保留
   - `disabled` - 保留
   - `className` - 保留(但移除颜色相关)

## 🎨 颜色参考

### 绿色(启用状态)
```css
--color-green-600: #16a34a;
--color-green-50: #f0fdf4;
```

### 橙色(停用状态)
```css
--color-orange-600: #ea580c;
--color-orange-50: #fff7ed;
```

## 🔍 常见问题

### Q: 为什么已启用显示"停用",已停用显示"启用"?
A: 按钮文字表示的是**点击后的动作**,这是更符合用户认知的设计模式。

### Q: 可以自定义颜色吗?
A: 不建议。统一的颜色方案保证了系统的一致性和可访问性。

### Q: 如何处理loading状态?
A: 使用`disabled`prop,并在提交时设置:
```tsx
<ToggleButton
  isEnabled={item.status === 'enabled'}
  disabled={isSubmitting}
/>
```

### Q: 如何添加tooltip提示?
A: 使用shadcn/ui的Tooltip组件包裹:
```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <ToggleButton isEnabled={isEnabled} />
  </TooltipTrigger>
  <TooltipContent>点击停用该功能</TooltipContent>
</Tooltip>
```

## 📚 相关资源

- 组件源码: `app/components/common/ToggleButton.tsx`
- 设计规范: `CLAUDE.md` - Part 4: 后台页面UI规范
- shadcn/ui Button: https://ui.shadcn.com/docs/components/button
