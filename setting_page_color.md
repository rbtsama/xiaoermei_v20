# UI全面美化改动计划

## 1. 色彩方案定义

### 1.1 主色调体系

#### 品牌色
```css
--brand-primary: #3b82f6;     /* 品牌蓝 - 主要操作按钮、强调元素 */
--brand-primary-hover: #2563eb; /* 品牌蓝 hover */
--brand-primary-light: #dbeafe; /* 品牌蓝浅色背景 */
```

#### 链接色（与品牌色区分）
```css
--link-color: #8b5cf6;        /* 紫色链接 */
--link-hover: #7c3aed;        /* 紫色链接 hover */
```

#### 辅助色系
```css
--success: #10b981;           /* 成功/完成状态 */
--warning: #f97316;           /* 警告/待处理 */
--error: #ef4444;             /* 错误/危险操作 */
--info: #8b5cf6;              /* 信息提示 */
```

#### 文字色系
```css
--text-primary: #0f172a;      /* 主文字 (slate-900) */
--text-secondary: #475569;    /* 次要文字 (slate-600) */
--text-tertiary: #94a3b8;     /* 辅助文字 (slate-400) */
--text-disabled: #cbd5e1;     /* 禁用状态 (slate-300) */
```

#### 背景色系
```css
--bg-primary: #ffffff;        /* 主背景 */
--bg-secondary: #f8fafc;      /* 次要背景 (slate-50) */
--bg-tertiary: #f1f5f9;       /* 三级背景 (slate-100) */
--bg-hover: #f1f5f9;          /* hover背景 */
```

#### 边框色系
```css
--border-primary: #e2e8f0;    /* 主边框 (slate-200) */
--border-secondary: #cbd5e1;  /* 次要边框 (slate-300) */
--border-focus: #3b82f6;      /* 聚焦边框 (品牌蓝) */
```



---

## 2. 现代科技感设计

### 卡片组件升级

**当前样式：**
```tsx
className="rounded-xl border border-border bg-card shadow-sm"
```

**升级后：**
```tsx
className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
```

**添加特性：**
- 更精致的阴影
- hover渐变阴影效果
- 可选：顶部细微渐变条



---

## 3. 字体系统优化

### 3.1 字体栈定义

**中文优先：**
```css
font-family:
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  "Noto Sans SC",
  "Microsoft YaHei",
  sans-serif;
```

**等宽字体（数字/代码）：**
```css
font-family:
  "SF Mono",
  "Consolas",
  "Monaco",
  monospace;
```

### 3.2 字重使用规范

| 元素 | 字重 | Tailwind类 |
|------|------|-----------|
| 大标题 | 700 | font-bold |
| 小标题 | 600 | font-semibold |
| 正文 | 400 | font-normal |
| 辅助文字 | 400 | font-normal |
| 数字 | 500-600 | font-medium/semibold + font-mono |



---

## 4. 统一组件设计

### 4.1 按钮设计系统

**主要按钮 (Primary)：**
```tsx
className="h-9 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm hover:shadow transition-all"
```

**次要按钮 (Secondary)：**
```tsx
className="h-9 px-4 rounded-md border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 font-medium transition-all"
```

**危险按钮 (Destructive)：**
```tsx
className="h-9 px-4 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium shadow-sm hover:shadow transition-all"
```

**图标按钮：**
```tsx
className="h-8 w-8 rounded-md hover:bg-slate-100 flex items-center justify-center transition-colors"
```

### 4.2 标签设计 (Badge)

**空心标签（默认）：**

```tsx
className="px-2 py-0.5 rounded border border-slate-300 text-xs font-medium bg-transparent"
```

**实心标签：**
```tsx
className="px-2 py-0.5 rounded-sm text-xs font-medium bg-slate-100 text-slate-700"
```

**状态标签：**
- 成功：`border-green-300 text-green-700`
- 警告：`border-orange-300 text-orange-700`
- 错误：`border-red-300 text-red-700`

### 4.3 输入框设计

**统一样式：**
```tsx
className="h-9 px-3 rounded-md border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
```

**特点：**
- 圆角：rounded-md (6px)
- 聚焦蓝色边框 + ring
- 平滑过渡



---

## 5. 响应式布局优化

### 5.1 筛选器响应式

**当前：**
```tsx
<div className="flex gap-2">...</div>
```

**优化后：**
```tsx
<div className="flex flex-wrap gap-2 lg:flex-nowrap">...</div>
```

### 5.2 表格响应式

**添加：**
- 横向滚动优化
- 最小列宽限制
- 小屏幕下关键列优先

### 5.3 对话框响应式

**优化：**
```tsx
className="sm:max-w-[440px] w-full max-w-[95vw]"
```



---

## 6. 交互动画与过渡

### 6.1 按钮交互

**hover效果：**
```tsx
className="hover:scale-105 active:scale-95 transition-transform"
```

### 6.2 卡片交互

**hover效果：**
```tsx
className="hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
```

### 6.3 对话框动画

**进入动画：**
```tsx
className="animate-in fade-in-0 zoom-in-95 duration-200"
```

### 6.4 表格行交互

**hover效果：**
```tsx
className="hover:bg-slate-50 transition-colors cursor-pointer"
```

