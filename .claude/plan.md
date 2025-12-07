# 订单列表页面优化实施计划

## 📋 PRD需求分析

### 5.1 筛选功能需求

| 筛选项 | PRD要求 | 当前实现 | 需要修改 |
|--------|---------|----------|----------|
| 订单状态 | 下拉单选：全部/待付款/待入住/进行中/已完成/已取消 | ✅ 已实现（含更多状态） | ⚠️ 需调整状态选项名称 |
| 下单时间 | 日期范围选择 | ❌ 当前是"订房日期" | ✅ 需新增 |
| 入住时间 | 日期范围选择 | ❌ 不存在 | ✅ 需新增 |
| 酒店名称 | 模糊搜索 | ❌ 当前是"房型" | ✅ 需替换 |
| 订单号/手机号 | 文本搜索（支持订单号或手机号） | ❌ 不存在 | ✅ 需新增 |

**问题**：
1. 当前筛选字段与PRD不一致
2. 缺少"下单时间"、"入住时间"、"订单号/手机号"筛选
3. "房型"筛选需改为"酒店名称"

---

### 5.2 列表展示需求

| 字段 | PRD要求 | 当前实现 | 需要修改 |
|------|---------|----------|----------|
| 订单号 | ✅ | ✅ | ✅ 无需修改 |
| 下单时间 | ✅ | ✅ | ✅ 无需修改 |
| 房型 | ✅ | ✅ | ✅ 无需修改 |
| 酒店名称 | ✅ | ❌ 缺失 | ✅ 需新增列 |
| 入住-离店时间 | ✅ | ✅ (显示为"入住日期") | ✅ 无需修改 |
| 下单人手机号 | ✅ | ✅ (在"订房人"中) | ✅ 无需修改 |
| 实付金额 | ✅ | ✅ (显示为"支付金额") | ✅ 无需修改 |
| 订单状态 | ✅ | ✅ | ⚠️ 需调整状态映射 |
| 操作 | 查询按钮 | ✅ 有"查询"和"详情"按钮 | ⚠️ 需简化为单个"查询"按钮 |

**问题**：
1. 缺少"酒店名称"列
2. 操作列有2个重复按钮，需简化
3. 订单状态名称需要调整（PRD用"待付款/进行中"，当前用"待支付/入住中"）

---

### 5.3 订单详情弹窗需求

#### 当前实现的模块：
- ✅ 5.3.1 订单基本信息
- ✅ 5.3.2 客人信息
- ✅ 5.3.3 费用明细

#### 缺失的模块：
- ❌ 5.3.4 积分服务（积分奖励 + 积分换购）
- ❌ 5.3.5 退款记录
- ❌ 5.3.6 商家备注

---

## 🎯 实施方案

### 方案1：完整重构（推荐）

**优点**：
- 完全符合PRD
- 数据结构清晰
- 易于维护

**缺点**：
- 需要修改types、mock、service、页面
- 工作量较大

**步骤**：
1. 更新 `order.types.ts` - 添加新字段
2. 更新 `order.mock.ts` - 添加丰富的Mock数据
3. 更新 `order.service.ts` - 支持新筛选条件
4. 更新 `OrderListPage.vue` - 重构筛选器和表格列
5. 更新 `OrderDetailDialog.vue` - 添加3个新模块

---

### 方案2：渐进式优化

**优点**：
- 风险小
- 可以分步验证

**缺点**：
- 时间较长
- 可能有遗漏

---

## 📐 详细设计

### 第一步：扩展数据模型

#### order.types.ts 需要添加的字段：

```typescript
export interface Order {
  // ... 现有字段 ...

  // 积分服务
  pointsServices?: {
    rewards: Array<{ name: string; points: number }>  // 积分奖励
    exchanges: Array<{ name: string; points: number }> // 积分换购
  }

  // 退款记录
  refundRecords?: Array<{
    status: '退款申请' | '门店退款' | '客人撤诉' | '平台支持退款'
    amount?: number  // 客人撤诉时为空
    time: string
  }>

  // 商家备注
  merchantNote?: string
}

export interface OrderFilterParams {
  // 新增筛选字段
  orderCreatedStart?: string  // 下单开始时间
  orderCreatedEnd?: string    // 下单结束时间
  checkInStart?: string       // 入住开始时间
  checkInEnd?: string         // 入住结束时间
  hotelName?: string          // 酒店名称（模糊搜索）
  searchKeyword?: string      // 订单号/手机号搜索

  // 移除的字段
  // roomType - 改为 hotelName
  // startDate/endDate - 改为明确的下单/入住时间
}
```

---

### 第二步：更新Mock数据

需要为至少5个订单添加：
- ✅ 基础信息（已有）
- ✅ 积分服务示例（部分订单有，部分没有）
- ✅ 退款记录示例（部分订单有，部分没有）
- ✅ 商家备注（部分订单有，部分没有）

**示例数据**：

```typescript
{
  id: '1',
  orderNumber: '20251206001',
  // ... 基础字段 ...

  // 积分服务示例
  pointsServices: {
    rewards: [
      { name: '自带牙刷', points: 50 },
      { name: '自带毛巾', points: 50 }
    ],
    exchanges: [
      { name: '延迟退房2小时', points: 200 }
    ]
  },

  // 退款记录示例
  refundRecords: [
    {
      status: '平台支持退款',
      amount: 500,
      time: '2025-12-06 15:30:00'
    }
  ],

  // 商家备注
  merchantNote: '客人要求安静房间，已安排远离电梯的房间'
}
```

---

### 第三步：更新筛选器UI

#### 新筛选器布局：

```vue
<div class="grid grid-cols-12 gap-4">
  <!-- 第一行 -->
  <div class="col-span-2">订单状态（下拉）</div>
  <div class="col-span-4">下单时间（日期范围）</div>
  <div class="col-span-4">入住时间（日期范围）</div>
  <div class="col-span-2">酒店名称（输入框）</div>

  <!-- 第二行 -->
  <div class="col-span-3">订单号/手机号（输入框）</div>
  <div class="col-span-9">
    <搜索按钮> <重置按钮>
  </div>
</div>
```

**字段说明**：
- **订单状态**：下拉单选，选项：`全部/待付款/待入住/进行中/已完成/已取消`
  - PRD的"进行中" = 当前的"入住中"(CHECKED_IN)
  - PRD的"待付款" = 当前的"待支付"(PENDING_PAYMENT)

- **下单时间**：两个日期选择器，筛选`order.createdAt`
- **入住时间**：两个日期选择器，筛选`order.checkInDate`
- **酒店名称**：文本输入框，模糊匹配`order.hotelName`
- **订单号/手机号**：文本输入框，搜索`order.orderNumber`或`order.guestPhone`

---

### 第四步：更新表格列

#### 新表格列配置：

| 列名 | 字段 | 宽度 | 说明 |
|------|------|------|------|
| 订单号 | orderNumber | 140px | 等宽字体 |
| 下单时间 | createdAt | 160px | YYYY-MM-DD HH:mm:ss |
| 房型 | roomType | 180px | 房型名称 |
| 酒店名称 | hotelName | 150px | **新增** |
| 入住-离店 | checkInDate~checkOutDate | 200px | YYYY-MM-DD - YYYY-MM-DD |
| 下单人手机号 | guestPhone | 120px | |
| 实付金额 | actualAmount | 100px | ¥xxx |
| 订单状态 | status | 100px | 标签 |
| 操作 | - | 100px | 单个"查询"按钮 |

**变化**：
- ✅ 新增"酒店名称"列
- ✅ 移除"订房人"列（姓名），保留手机号
- ✅ 操作列简化为单个"查询"按钮

---

### 第五步：扩展订单详情弹窗

#### 新增3个模块（条件显示）：

##### 5.3.4 积分服务模块
```vue
<div v-if="order.pointsServices && (order.pointsServices.rewards.length > 0 || order.pointsServices.exchanges.length > 0)">
  <h3>积分服务</h3>

  <!-- 积分奖励 -->
  <div v-if="order.pointsServices.rewards.length > 0">
    <h4>积分奖励</h4>
    <ul>
      <li v-for="item in order.pointsServices.rewards">
        {{ item.name }}（+{{ item.points }}积分）
      </li>
    </ul>
  </div>

  <!-- 积分换购 -->
  <div v-if="order.pointsServices.exchanges.length > 0">
    <h4>积分换购</h4>
    <ul>
      <li v-for="item in order.pointsServices.exchanges">
        {{ item.name }}（-{{ item.points }}积分）
      </li>
    </ul>
  </div>
</div>
```

##### 5.3.5 退款记录模块
```vue
<div v-if="order.refundRecords && order.refundRecords.length > 0">
  <h3>退款记录</h3>
  <a-table>
    <tr v-for="record in order.refundRecords">
      <td>{{ record.status }}</td>
      <td v-if="record.status !== '客人撤诉'">¥{{ record.amount }}</td>
      <td v-else>-</td>
    </tr>
  </a-table>
</div>
```

##### 5.3.6 商家备注模块
```vue
<div v-if="order.merchantNote">
  <h3>商家备注</h3>
  <p>{{ order.merchantNote || '无' }}</p>
</div>
```

---

## 🔄 状态映射调整

### PRD状态 vs 当前状态

| PRD状态 | 当前OrderStatus枚举 | 需要调整 |
|---------|---------------------|----------|
| 待付款 | PENDING_PAYMENT (待支付) | ⚠️ 标签改为"待付款" |
| 待入住 | PENDING_CHECKIN (待入住) | ✅ 无需修改 |
| 进行中 | CHECKED_IN (入住中) | ⚠️ 标签改为"进行中" |
| 已完成 | COMPLETED (已完成) | ✅ 无需修改 |
| 已取消 | CANCELLED (已取消) | ✅ 无需修改 |

**注意**：
- PRD没有提到"已离店(CHECKED_OUT)"和"退款申请(REFUND_REQUESTED)"状态
- 建议保留这些状态，但不在筛选器下拉列表中显示
- 或者咨询用户是否需要这些状态

---

## 📝 实施步骤（详细）

### Step 1: 更新类型定义 (order.types.ts)

```typescript
// 1.1 添加积分服务类型
export interface PointsServiceItem {
  name: string
  points: number
}

export interface OrderPointsServices {
  rewards: PointsServiceItem[]    // 积分奖励
  exchanges: PointsServiceItem[]  // 积分换购
}

// 1.2 添加退款记录类型
export type RefundStatus = '退款申请' | '门店退款' | '客人撤诉' | '平台支持退款'

export interface RefundRecord {
  status: RefundStatus
  amount?: number  // 客人撤诉时不显示金额
  time: string
}

// 1.3 扩展Order接口
export interface Order {
  // ... 现有字段 ...

  pointsServices?: OrderPointsServices  // 积分服务（可选）
  refundRecords?: RefundRecord[]        // 退款记录（可选）
  merchantNote?: string                 // 商家备注（可选）
}

// 1.4 更新筛选参数
export interface OrderFilterParams {
  orderStatus?: string           // 订单状态
  orderCreatedStart?: string     // 下单开始时间
  orderCreatedEnd?: string       // 下单结束时间
  checkInStart?: string          // 入住开始时间
  checkInEnd?: string            // 入住结束时间
  hotelName?: string             // 酒店名称（模糊搜索）
  searchKeyword?: string         // 订单号/手机号搜索
  page?: number
  pageSize?: number
}
```

---

### Step 2: 更新Mock数据 (order.mock.ts)

需要创建至少**6个订单**，覆盖以下场景：

1. **订单1**：有积分服务 + 有退款记录 + 有商家备注（全部模块）
2. **订单2**：有积分服务 + 无退款 + 无备注
3. **订单3**：无积分服务 + 有退款记录 + 有商家备注
4. **订单4**：完全没有可选模块（基础订单）
5. **订单5**：只有商家备注
6. **订单6**：退款记录（客人撤诉，不显示金额）

**关键Mock数据**：
- 不同的酒店名称（至少3个不同的酒店）
- 不同的订单状态
- 不同的日期范围（用于测试筛选）

---

### Step 3: 更新Service层 (order.service.ts)

```typescript
async getOrderList(params: OrderFilterParams) {
  // 筛选逻辑
  let filtered = [...this.mockOrders]

  // 1. 订单状态筛选
  if (params.orderStatus) {
    filtered = filtered.filter(o => o.status === params.orderStatus)
  }

  // 2. 下单时间范围筛选
  if (params.orderCreatedStart) {
    filtered = filtered.filter(o => o.createdAt >= params.orderCreatedStart)
  }
  if (params.orderCreatedEnd) {
    filtered = filtered.filter(o => o.createdAt <= params.orderCreatedEnd)
  }

  // 3. 入住时间范围筛选
  if (params.checkInStart) {
    filtered = filtered.filter(o => o.checkInDate >= params.checkInStart)
  }
  if (params.checkInEnd) {
    filtered = filtered.filter(o => o.checkInDate <= params.checkInEnd)
  }

  // 4. 酒店名称模糊搜索
  if (params.hotelName) {
    filtered = filtered.filter(o =>
      o.hotelName.toLowerCase().includes(params.hotelName.toLowerCase())
    )
  }

  // 5. 订单号/手机号搜索
  if (params.searchKeyword) {
    filtered = filtered.filter(o =>
      o.orderNumber.includes(params.searchKeyword) ||
      o.guestPhone.includes(params.searchKeyword)
    )
  }

  // 分页...
}
```

---

### Step 4: 重构OrderListPage.vue筛选器

**新筛选器布局**（2行）：

```vue
<!-- 第一行：5个主要筛选 -->
<div class="grid grid-cols-12 gap-4">
  <div class="col-span-2">
    <label>订单状态</label>
    <a-select v-model="filters.orderStatus">
      <a-select-option value="all">全部</a-select-option>
      <a-select-option value="pending_payment">待付款</a-select-option>
      <a-select-option value="pending_checkin">待入住</a-select-option>
      <a-select-option value="checked_in">已入住</a-select-option>
      <a-select-option value="completed">已完成</a-select-option>
      <a-select-option value="cancelled">已取消</a-select-option>
    </a-select>
  </div>

  <div class="col-span-4">
    <label>下单时间</label>
    <a-range-picker v-model="filters.orderCreatedRange" />
  </div>

  <div class="col-span-4">
    <label>入住时间</label>
    <a-range-picker v-model="filters.checkInRange" />
  </div>

  <div class="col-span-2">
    <label>酒店名称</label>
    <a-input v-model="filters.hotelName" placeholder="搜索酒店" />
  </div>
</div>

<!-- 第二行：搜索关键词 + 按钮 -->
<div class="grid grid-cols-12 gap-4 mt-4">
  <div class="col-span-3">
    <label>订单号/手机号</label>
    <a-input v-model="filters.searchKeyword" placeholder="订单号或手机号" />
  </div>

  <div class="col-span-9 flex items-end gap-2">
    <a-button type="primary" @click="handleSearch">搜索</a-button>
    <a-button @click="handleReset">重置</a-button>
  </div>
</div>
```

---

### Step 5: 更新表格列配置

```vue
const columns = [
  { title: '订单号', dataIndex: 'orderNumber', width: 140 },
  { title: '下单时间', dataIndex: 'createdAt', width: 160 },
  { title: '房型', dataIndex: 'roomType', width: 180 },
  { title: '酒店名称', dataIndex: 'hotelName', width: 150 },  // 新增
  { title: '入住-离店', scopedSlots: { customRender: 'checkInDates' }, width: 200 },
  { title: '下单人手机号', dataIndex: 'guestPhone', width: 120 },
  { title: '实付金额', dataIndex: 'actualAmount', width: 100 },
  { title: '订单状态', dataIndex: 'status', width: 100 },
  { title: '操作', scopedSlots: { customRender: 'action' }, width: 100, align: 'right' }
]
```

**操作列简化**：
```vue
<template slot="action" slot-scope="text, record">
  <a-button size="small" @click="handleViewDetail(record)">
    查询
  </a-button>
</template>
```

---

### Step 6: 扩展OrderDetailDialog.vue

**新增3个条件模块**：

```vue
<!-- 现有模块 -->
<div>订单基本信息</div>
<div>客人信息</div>
<div>房间信息</div>
<div>费用明细</div>

<!-- 新增模块1: 积分服务（条件显示） -->
<div v-if="hasPointsServices">
  <h3>积分服务</h3>
  <div v-if="order.pointsServices.rewards.length > 0">
    <h4 class="text-sm font-semibold mb-2">积分奖励</h4>
    <ul class="list-disc pl-5 space-y-1">
      <li v-for="item in order.pointsServices.rewards" :key="item.name">
        {{ item.name }}（<span class="text-green-600">+{{ item.points }}积分</span>）
      </li>
    </ul>
  </div>
  <div v-if="order.pointsServices.exchanges.length > 0" class="mt-3">
    <h4 class="text-sm font-semibold mb-2">积分换购</h4>
    <ul class="list-disc pl-5 space-y-1">
      <li v-for="item in order.pointsServices.exchanges" :key="item.name">
        {{ item.name }}（<span class="text-red-600">-{{ item.points }}积分</span>）
      </li>
    </ul>
  </div>
</div>

<!-- 新增模块2: 退款记录（条件显示） -->
<div v-if="order.refundRecords && order.refundRecords.length > 0">
  <h3>退款记录</h3>
  <div class="border border-slate-200 rounded-lg overflow-hidden">
    <a-table
      :columns="refundColumns"
      :data-source="order.refundRecords"
      :pagination="false"
      size="small"
    >
      <template slot="amount" slot-scope="amount, record">
        <span v-if="record.status === '客人撤诉'">-</span>
        <span v-else class="text-red-600">¥{{ amount }}</span>
      </template>
    </a-table>
  </div>
</div>

<!-- 新增模块3: 商家备注（条件显示） -->
<div v-if="order.merchantNote">
  <h3>商家备注</h3>
  <div class="border border-slate-200 rounded-lg p-4 bg-slate-50">
    <p class="text-sm text-slate-900">{{ order.merchantNote }}</p>
  </div>
</div>
```

---

## ⚠️ 需要用户确认的问题

### 问题1：订单状态名称修正 ✅已确认

**用户反馈**：正确的状态名称应该是：
- "待付款" (不是"待支付")
- "已入住" (不是"进行中"，也不是"入住中")

**实施方案**：
- 保持enum不变，只修改 `ORDER_STATUS_LABELS`
- `PENDING_PAYMENT: '待付款'`
- `CHECKED_IN: '已入住'`

### 问题2：缺失的状态如何处理

PRD筛选器只有5个状态，但系统实际有8个状态：
- 待支付/待入住/入住中/已离店/已完成/支付取消/已取消/退款申请

**选项A**：筛选器只显示PRD的5个状态
- 其他状态的订单只能通过"全部"看到

**选项B**：保留所有8个状态在筛选器中
- 更灵活，但与PRD不一致

### 问题3：积分服务数据来源

PRD中积分服务示例：
- 自带牙刷（+50积分）
- 自带毛巾（+50积分）
- 延迟退房2小时（-200积分）

这些服务与"积分管理 > 积分配置"中的"积分奖励服务"和"积分换购服务"是否关联？

**选项A**：关联（推荐）
- 订单中的积分服务从积分配置中选择
- Mock数据引用积分配置中的服务

**选项B**：独立
- 订单中的积分服务独立存储
- 与积分配置无关联

---

## 📊 工作量评估

### 文件修改清单

| 文件 | 修改内容 | 预计行数 |
|------|----------|----------|
| order.types.ts | 添加3个新接口 + 更新FilterParams | +50行 |
| order.mock.ts | 扩展6个订单Mock数据 | +200行 |
| order.service.ts | 更新筛选逻辑 | +50行 |
| OrderListPage.vue | 重构筛选器（5→5新字段）+ 表格列（8→9列） | ±100行 |
| OrderDetailDialog.vue | 添加3个条件模块 | +150行 |

**总计**：约550行代码修改

---

## 🎯 推荐方案

**采用方案1：完整重构**

**实施顺序**：
1. ✅ types定义（添加新字段）
2. ✅ mock数据（创建丰富场景）
3. ✅ service层（实现新筛选逻辑）
4. ✅ OrderListPage筛选器（重构UI和逻辑）
5. ✅ OrderListPage表格列（新增酒店名称列，简化操作）
6. ✅ OrderDetailDialog（添加3个条件模块）
7. ✅ 测试所有筛选和详情功能
8. ✅ Git提交

**关键决策需要用户确认**：
1. 状态名称："待支付"改为"待付款"，"入住中"改为"进行中"？
2. 筛选器状态选项：只显示PRD的5个，还是保留所有8个？
3. 积分服务：是否关联积分配置模块？

---

## 📋 实施清单

- [ ] 用户确认3个关键问题
- [ ] Step 1: 更新types (order.types.ts)
- [ ] Step 2: 更新mock (order.mock.ts, 6个订单)
- [ ] Step 3: 更新service (order.service.ts, 5个新筛选)
- [ ] Step 4: 重构筛选器 (OrderListPage.vue, 2行5字段)
- [ ] Step 5: 更新表格列 (OrderListPage.vue, 9列)
- [ ] Step 6: 扩展详情弹窗 (OrderDetailDialog.vue, 3个新模块)
- [ ] Step 7: 测试所有功能
- [ ] Step 8: Git提交
