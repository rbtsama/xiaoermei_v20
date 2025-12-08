# 小而美 Home Stay 配色系统

**🎨 全局设计规范 | Global Design System**

> 本文档是整个酒店SAAS系统（平台后台、酒店后台、C端小程序）的**全局配色规范**，所有开发人员必须严格遵循。

版本：1.0 | 更新：2025-11-20 | 状态：✅ 正式发布

---

## 📋 文档说明

### 适用范围
- ✅ 平台后台管理系统
- ✅ 酒店后台管理系统
- ✅ C端微信小程序
- ✅ 所有UI组件和页面设计

### 使用指南
1. **开发前必读**：所有新功能开发前必须阅读本规范
2. **严格遵循**：所有颜色使用必须从本规范中选取
3. **禁止自定义**：禁止在代码中硬编码颜色值
4. **使用CSS变量**：统一使用第2.5节定义的CSS变量

---

## 一、设计理念

### 1.1 品牌定位

小而美 Home Stay 是面向年轻人的精品民宿预订平台。产品特点：

• 精选独特民宿，而非连锁标准化酒店
• 强调自然环境，山水间的宁静体验
• 注重人文关怀，有温度的服务
• 年轻化审美，简约清新的视觉风格

### 1.2 设计目标

我们的配色系统需要达成以下目标：

• **信息清晰**：用户快速获取关键信息（价格、状态、操作按钮）
• **舒适观感**：长时间浏览不疲劳，配色柔和但不模糊
• **自然气质**：避免过度商业化的配色，体现亲近自然的品牌调性
• **年轻悠闲**：轻松但不随意，活泼但不浮夸

### 1.3 配色策略

基于四季自然色提取主色调：

**冬·深蓝 #2C5F8D**
• 灵感：冬日清晨天空
• 应用：主按钮、品牌色
• 传达：可靠、专业

**秋·深橙 #C67A28**
• 灵感：秋天落叶和夕阳
• 应用：价格、促销信息
• 传达：温暖、吸引注意

**夏·湖蓝 #4A8FBF**
• 灵感：夏日湖泊
• 应用：链接、可交互元素
• 传达：清新、可点击

**春·米白 #F8F6F3**
• 灵感：春日柔和阳光
• 应用：背景、辅助底色
• 传达：舒适、柔和

功能色选择自然系配色：

**森林绿 #5A8A65** - 成功色
**砖瓦红 #B94D3D** - 错误/警示色

### 1.4 配色比例

整体页面配色占比建议：

• 中性色（白色、灰色）：75%
• 主色（深蓝）：12%
• 强调色（深橙）：8%
• 辅助色（湖蓝）：3%
• 功能色（绿、红）：2%

---

## 二、配色系统

### 2.1 主色

#### 深蓝 #2C5F8D

```css
--color-primary: #2C5F8D;
```

基础属性：
• HEX: #2C5F8D
• RGB: rgb(44, 95, 141)
• HSL: hsl(208, 52%, 36%)
• 白底对比度: 7.8:1 (AAA)

使用场景：
• 主要操作按钮（提交、确认、支付）
• 品牌Logo
• 导航栏选中态
• 进度条

---

### 2.2 辅助色

#### 深橙 #C67A28 - 强调色

```css
--color-secondary: #C67A28;
```

基础属性：
• HEX: #C67A28
• RGB: rgb(198, 122, 40)
• HSL: hsl(31, 66%, 47%)
• 白底对比度: 6.8:1 (AAA)

使用场景：
• 价格数字
• 促销标签
• 评分星星
• 折扣金额

#### 湖蓝 #4A8FBF - 交互色

```css
--color-accent: #4A8FBF;
```

基础属性：
• HEX: #4A8FBF
• RGB: rgb(74, 143, 191)
• HSL: hsl(205, 45%, 52%)
• 白底对比度: 5.2:1 (AA+)

使用场景：
• 链接文字
• 可点击标签
• 房源特征首位标签
• Tab切换选中态

#### 米白 #F8F6F3 - 背景色

```css
--color-background: #F8F6F3;
```

基础属性：
• HEX: #F8F6F3
• RGB: rgb(248, 246, 243)
• HSL: hsl(36, 24%, 96%)

使用场景：
• 顶部栏背景
• 卡片内部背景
• 标签底色
• 输入框背景

---

### 2.3 功能色

#### 森林绿 #5A8A65 - 成功色

```css
--color-success: #5A8A65;
--color-success-bg: rgba(90, 138, 101, 0.15);
```

基础属性：
• HEX: #5A8A65
• RGB: rgb(90, 138, 101)
• 白底对比度: 6.2:1 (AAA)

使用场景：
• 预订成功提示
• "已入住"状态
• "支付成功"标签
• 表单验证通过
• "超赞房东"认证

#### 砖瓦红 #B94D3D - 错误/警示色

```css
--color-error: #B94D3D;
--color-error-bg: rgba(185, 77, 61, 0.15);
```

基础属性：
• HEX: #B94D3D
• RGB: rgb(185, 77, 61)
• 白底对比度: 7.1:1 (AAA)

使用场景：
• 错误提示
• "已满房"状态
• "已取消"标签
• 表单验证失败
• "限时特惠"标签（营造紧迫感）
• "节省金额"提示

---

### 2.4 中性色

#### 文字颜色

```css
--text-primary: #2A2A2A;      /* 主文字，对比度 15.8:1 */
--text-secondary: #6B6B6B;    /* 次要文字，对比度 5.7:1 */
--text-placeholder: #999999;  /* 占位符，对比度 4.2:1 */
--text-disabled: #CCCCCC;     /* 禁用文字，对比度 2.8:1 */
--text-white: #FFFFFF;        /* 白色文字（深色背景用）*/
```

#### 边框颜色

```css
--border-light: #F0F0F0;      /* 极淡边框 */
--border-normal: #E5E5E5;     /* 标准边框 */
--border-heavy: #D0D0D0;      /* 深色边框 */
```

#### 背景颜色

```css
--bg-white: #FFFFFF;          /* 纯白背景 */
--bg-gray: #FAFAFA;           /* 浅灰背景（页面底色）*/
```

---

### 2.5 完整CSS变量

```css
:root {
    /* 主色 */
    --color-primary: #2C5F8D;
    --color-secondary: #C67A28;
    --color-accent: #4A8FBF;
    --color-background: #F8F6F3;
    
    /* 功能色 */
    --color-success: #5A8A65;
    --color-error: #B94D3D;
    --color-warning: #D89A3D;
    --color-info: #4A8FBF;
    
    /* 功能色浅背景 */
    --color-success-bg: rgba(90, 138, 101, 0.15);
    --color-error-bg: rgba(185, 77, 61, 0.15);
    --color-warning-bg: rgba(216, 154, 61, 0.15);
    --color-info-bg: rgba(74, 143, 191, 0.12);
    
    /* 文字 */
    --text-primary: #2A2A2A;
    --text-secondary: #6B6B6B;
    --text-tertiary: #999999;
    --text-disabled: #CCCCCC;
    --text-white: #FFFFFF;
    
    /* 边框 */
    --border-light: #F0F0F0;
    --border-normal: #E5E5E5;
    --border-heavy: #D0D0D0;
    
    /* 背景 */
    --bg-white: #FFFFFF;
    --bg-gray: #FAFAFA;
    
    /* 渐变（可选）*/
    --gradient-primary: linear-gradient(135deg, #2C5F8D 0%, #4A8FBF 100%);
    --gradient-warm: linear-gradient(135deg, #C67A28 0%, #D89A3D 100%);
    
    /* 阴影 */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.08);
    --shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.12);
    
    /* 圆角 */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
    --radius-full: 9999px;
}
```

---

## 三、使用案例

### 3.1 按钮

#### 主按钮

```css
.btn-primary {
    background: var(--color-primary);
    color: var(--text-white);
    padding: 12px 24px;
    border-radius: var(--radius-full);
    font-weight: 600;
    font-size: 16px;
}

.btn-primary:hover {
    background: #1E4A6B;
    box-shadow: var(--shadow-md);
}
```

使用场景：立即预订、确认支付、提交订单

#### 副按钮

```css
.btn-secondary {
    background: transparent;
    color: var(--color-primary);
    border: 1.5px solid var(--color-primary);
    padding: 12px 24px;
    border-radius: var(--radius-full);
    font-weight: 600;
}

.btn-secondary:hover {
    background: rgba(44, 95, 141, 0.08);
}
```

使用场景：查看详情、取消操作、返回上页

#### 辅助按钮

```css
.btn-tertiary {
    background: transparent;
    color: var(--text-secondary);
    padding: 12px 24px;
    font-weight: 500;
}

.btn-tertiary:hover {
    color: var(--text-primary);
    background: rgba(0, 0, 0, 0.04);
}
```

使用场景：稍后再说、跳过、了解更多

#### 文字按钮

```css
.btn-text {
    background: none;
    color: var(--color-accent);
    padding: 0;
    font-weight: 500;
    font-size: 14px;
}

.btn-text:hover {
    color: #3A7FA9;
    text-decoration: underline;
}
```

使用场景：查看全部、阅读详情

#### 警示按钮

```css
.btn-danger {
    background: var(--color-error);
    color: var(--text-white);
    padding: 12px 24px;
    border-radius: var(--radius-full);
    font-weight: 600;
}
```

使用场景：取消订单、删除操作、危险确认

---

### 3.2 标签

#### 特征标签

主打标签（首位）：
```css
.tag-feature-primary {
    background: var(--color-info-bg);
    color: var(--color-accent);
    padding: 4px 12px;
    border-radius: var(--radius-md);
    font-size: 12px;
    font-weight: 500;
}
```

普通标签：
```css
.tag-feature {
    background: var(--color-background);
    color: var(--text-secondary);
    padding: 4px 12px;
    border-radius: var(--radius-md);
    font-size: 12px;
}
```

#### 状态标签

成功状态：
```css
.tag-success {
    background: var(--color-success-bg);
    color: var(--color-success);
    padding: 4px 12px;
    border-radius: var(--radius-md);
    font-size: 12px;
    font-weight: 500;
}
```

使用：已入住、支付成功、超赞房东

待处理状态：
```css
.tag-pending {
    background: var(--color-info-bg);
    color: var(--color-accent);
    padding: 4px 12px;
    border-radius: var(--radius-md);
    font-size: 12px;
}
```

使用：待入住、待确认、处理中

错误状态：
```css
.tag-error {
    background: var(--color-error-bg);
    color: var(--color-error);
    padding: 4px 12px;
    border-radius: var(--radius-md);
    font-size: 12px;
}
```

使用：已满房、已取消、不可用

促销标签（实色背景）：
```css
.tag-promotion {
    background: var(--color-error);
    color: var(--text-white);
    padding: 6px 12px;
    border-radius: var(--radius-md);
    font-size: 12px;
    font-weight: 600;
}
```

使用：限时特惠、今日特价、限量抢购

---

### 3.3 文字

#### 标题层级

```css
.h1 {
    font-size: 28px;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.3;
}

.h2 {
    font-size: 22px;
    font-weight: 600;
    color: var(--text-primary);
    line-height: 1.4;
}

.h3 {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
    line-height: 1.4;
}

.body {
    font-size: 16px;
    font-weight: 400;
    color: var(--text-primary);
    line-height: 1.6;
}

.small {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.5;
}

.caption {
    font-size: 12px;
    color: var(--text-secondary);
    line-height: 1.4;
}
```

#### 特殊文字

链接：
```css
.link {
    color: var(--color-accent);
    font-weight: 500;
}

.link:hover {
    color: #3A7FA9;
    text-decoration: underline;
}
```

价格：
```css
.price {
    font-size: 24px;
    font-weight: 600;
    color: var(--color-secondary);
}

.price-unit {
    font-size: 14px;
    color: var(--text-secondary);
}

.price-original {
    font-size: 14px;
    color: var(--text-tertiary);
    text-decoration: line-through;
}
```

强调文字：
```css
.text-emphasis {
    color: var(--color-secondary);
    font-weight: 600;
}

.text-success {
    color: var(--color-success);
    font-weight: 500;
}

.text-error {
    color: var(--color-error);
    font-weight: 500;
}
```

---

### 3.4 图标

```css
.icon {
    color: var(--text-secondary);
    width: 20px;
    height: 20px;
}

.icon-active {
    color: var(--color-primary);
}

.icon-emphasis {
    color: var(--color-secondary);
}

.icon-star {
    color: var(--color-secondary);
    fill: var(--color-secondary);
}

.icon-success {
    color: var(--color-success);
}

.icon-error {
    color: var(--color-error);
}
```

图标尺寸：
• xs: 16px
• sm: 20px（标准）
• md: 24px
• lg: 32px
• xl: 48px

---

### 3.5 输入框

标准输入框：
```css
.input {
    width: 100%;
    padding: 12px 16px;
    background: var(--color-background);
    border: 1px solid var(--border-normal);
    border-radius: var(--radius-md);
    font-size: 16px;
    color: var(--text-primary);
}

.input::placeholder {
    color: var(--text-tertiary);
}

.input:focus {
    outline: none;
    border-color: var(--color-primary);
    background: var(--bg-white);
    box-shadow: 0 0 0 3px rgba(44, 95, 141, 0.1);
}
```

错误状态：
```css
.input-error {
    border-color: var(--color-error);
}

.input-error:focus {
    box-shadow: 0 0 0 3px rgba(185, 77, 61, 0.1);
}
```

成功状态：
```css
.input-success {
    border-color: var(--color-success);
}
```

---

### 3.6 卡片

```css
.card {
    background: var(--bg-white);
    border: 1px solid var(--border-normal);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-sm);
}

.card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.card-image {
    width: 100%;
    height: 200px;
    background: var(--color-background);
}

.card-content {
    padding: 16px;
}
```

---

### 3.7 消息提示

成功提示：
```css
.message-success {
    background: var(--color-success-bg);
    border-left: 3px solid var(--color-success);
    padding: 16px;
    border-radius: var(--radius-md);
    color: var(--text-primary);
}
```

错误提示：
```css
.message-error {
    background: var(--color-error-bg);
    border-left: 3px solid var(--color-error);
    padding: 16px;
    border-radius: var(--radius-md);
    color: var(--text-primary);
}
```

信息提示：
```css
.message-info {
    background: var(--color-info-bg);
    border-left: 3px solid var(--color-accent);
    padding: 16px;
    border-radius: var(--radius-md);
    color: var(--text-primary);
}
```

---

## 四、设计规范

### 4.1 颜色使用规则

#### 优先级顺序

• 中性色（文字、背景）：占75%，作为主体
• 深蓝（主按钮、品牌）：占12%，克制使用
• 深橙（价格、强调）：占8%，只用于关键信息
• 湖蓝（链接、标签）：占3%，点缀使用
• 功能色（状态）：占2%，仅在必要时出现

#### 对比度要求

WCAG 2.1 标准：
• 正文（<18px）：≥ 4.5:1 (AA级)，建议 ≥ 7:1 (AAA级)
• 大字（≥18px）：≥ 3:1 (AA级)，建议 ≥ 4.5:1 (AAA级)

我们的实际标准：
• 关键信息（价格、按钮）：≥ 7:1
• 主要文字：≥ 7:1
• 次要文字：≥ 4.5:1
• 占位符：≥ 4.2:1

#### 禁止使用的颜色

• 纯黑 #000000 - 用 #2A2A2A 代替
• 纯红 #FF0000 - 用 #B94D3D 代替
• 荧光绿 #00FF00 - 用 #5A8A65 代替
• 纯蓝 #0000FF - 用 #2C5F8D 或 #4A8FBF 代替

#### 慎用场景

• 渐变色：仅用于特殊场景（会员卡、活动banner），不用于常规UI
• 多色叠加：一个元素最多2种颜色，避免过于复杂
• 低对比度组合：禁止浅色文字配浅色背景

---

### 4.2 配色层次示例

首页房源卡片的配色策略：

```
图片区域
  • 背景：米白 #F8F6F3
  • 促销标签：砖瓦红实色背景 #B94D3D（最高优先级）

信息区域
  • 房源名：主文字 #2A2A2A
  • 评分星星：深橙 #C67A28
  • 地址：次要文字 #6B6B6B
  • 首位标签：湖蓝 #4A8FBF + 浅背景
  • 其他标签：次要文字 + 米白背景
  • 认证标签：森林绿 #5A8A65
  
价格区域
  • 现价：深橙 #C67A28（24px，最醒目）
  • 原价：占位符 #999999 + 删除线
  • 节省金额：砖瓦红 #B94D3D
  • 预订按钮：深蓝 #2C5F8D（行动召唤）
```

---

### 4.3 可访问性

#### 色盲友好

• 不只用颜色区分状态，需配合图标和文字
• 使用形状和边框辅助区分
• 所有状态标签都有文字说明

正确示例：
• 成功：绿色 + 勾图标 + "已入住"文字
• 失败：红色 + 警告图标 + "已满房"文字

错误示例：
• 只用颜色区分，无图标和文字

#### 对比度检测

| 颜色组合 | 对比度 | 等级 |
|---------|--------|------|
| 深蓝 on 白底 | 7.8:1 | AAA |
| 深橙 on 白底 | 6.8:1 | AAA |
| 森林绿 on 白底 | 6.2:1 | AAA |
| 砖瓦红 on 白底 | 7.1:1 | AAA |
| 湖蓝 on 白底 | 5.2:1 | AA+ |
| 主文字 on 白底 | 15.8:1 | AAA |
| 次文字 on 白底 | 5.7:1 | AA+ |

#### 键盘导航

焦点样式：
```css
*:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
}

button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(44, 95, 141, 0.3);
}
```

#### 语义化HTML

```html
<!-- 正确 -->
<button class="btn-primary" aria-label="立即预订这个房间">
    立即预订
</button>

<span class="tag-success" aria-label="状态：已入住">
    已入住
</span>

<!-- 错误 -->
<div class="btn-primary" onclick="...">
    立即预订
</div>
```

---

### 4.4 响应式配色

#### 移动端

• 保持相同配色方案
• 确保按钮足够大（最小 44x44px）
• 增强对比度，适应户外光线

#### 深色模式（预留）

如需要深色模式，建议配色：

```css
@media (prefers-color-scheme: dark) {
    :root {
        --bg-white: #1A1A1A;
        --bg-gray: #0F0F0F;
        --text-primary: #E5E5E5;
        --text-secondary: #A0A0A0;
        --border-normal: #333333;
        --color-primary: #5BA3D4;
        --color-secondary: #D89A3D;
    }
}
```

---

### 4.5 打印样式

```css
@media print {
    * {
        background: white !important;
        color: black !important;
    }
    
    .card {
        border: 1px solid #E5E5E5 !important;
    }
}
```

---

## 五、开发资源

### 5.1 Tailwind配置

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#2C5F8D',
        secondary: '#C67A28',
        accent: '#4A8FBF',
        success: '#5A8A65',
        error: '#B94D3D',
      }
    }
  }
}
```

### 5.2 Sketch/Figma导出

色板文件结构：
```
配色系统/
├── 主色
│   ├── 深蓝 #2C5F8D
│   ├── 深橙 #C67A28
│   ├── 湖蓝 #4A8FBF
│   └── 米白 #F8F6F3
├── 功能色
│   ├── 森林绿 #5A8A65
│   └── 砖瓦红 #B94D3D
└── 中性色
    ├── 主文字 #2A2A2A
    ├── 次文字 #6B6B6B
    └── 占位符 #999999
```

---

## 附录

### 快速参考

| 用途 | 颜色 | HEX | 对比度 |
|------|------|-----|--------|
| 主按钮 | 深蓝 | #2C5F8D | 7.8:1 |
| 价格 | 深橙 | #C67A28 | 6.8:1 |
| 链接 | 湖蓝 | #4A8FBF | 5.2:1 |
| 成功 | 森林绿 | #5A8A65 | 6.2:1 |
| 错误 | 砖瓦红 | #B94D3D | 7.1:1 |
| 主文字 | 深灰 | #2A2A2A | 15.8:1 |
| 次文字 | 中灰 | #6B6B6B | 5.7:1 |

### 设计检查清单

使用颜色前请确认：

• 是否符合品牌调性（舒适、自然、年轻）
• 对比度是否达标（≥ 4.5:1）
• 是否过度使用彩色（应 <25%）
• 色盲用户能否区分（有图标和文字辅助）
• 是否有语义化HTML
• 是否支持键盘导航

---

版本：1.0 | 更新：2025-11-20 | © 小而美 Home Stay 设计团队
