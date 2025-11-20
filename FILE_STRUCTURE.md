# 项目文件结构说明

## 完整文件树

```
F:/pjs/module/
│
├── 📄 README.md                         # 项目使用指南
├── 📄 CLAUDE.md                         # Remix开发规范（精简版）
├── 📄 PROJECT_SUMMARY.md                # 项目交付总结
├── 📄 FILE_STRUCTURE.md                 # 本文件
├── 📄 vite.config.ts                    # Vite配置（路由+路径别名）
│
└── app/
    ├── routes/                          # 路由文件
    │   ├── _index.tsx                   # 首页导航（模块入口）
    │   └── points-system/               # 积分系统路由
    │       ├── rule-config.tsx          # 规则配置路由
    │       └── user-account.tsx         # 用户账户路由
    │
    └── pages/                           # 页面模块
        └── PointsSystem/                # 积分系统模块
            ├── types/                   # 类型定义
            │   └── points.types.ts      # 积分系统所有类型（200+行）
            │
            ├── services/                # 服务层
            │   ├── mocks/               # Mock数据
            │   │   ├── points.mock.ts   # 真实酒店场景数据（250+行）
            │   │   └── index.ts         # 导出
            │   └── points.service.ts    # 服务层逻辑（180+行）
            │
            ├── components/              # 组件
            │   └── LogicPanel.tsx       # 右侧逻辑面板组件（120+行）
            │
            ├── RuleConfigPage.tsx       # 积分规则配置页面（550+行）
            └── UserAccountPage.tsx      # 用户积分账户管理页面（600+行）
```

---

## 文件说明

### 📄 根目录文档

#### README.md
- **用途**: 项目使用指南，给产品经理看的
- **包含内容**:
  - 项目概述
  - 核心功能模块介绍
  - 快速开始（安装、运行）
  - Mock数据说明
  - 学习重点
  - 常见问题FAQ

#### CLAUDE.md
- **用途**: Remix开发规范（精简版，从1247行缩减到717行）
- **包含内容**:
  - Remix + TypeScript项目设置
  - 架构原则
  - 模块结构规范
  - 开发工作流
  - Troubleshooting

#### PROJECT_SUMMARY.md
- **用途**: 项目交付总结，给开发者看的
- **包含内容**:
  - 已完成的工作清单
  - 代码统计
  - 学习价值
  - 使用场景
  - 扩展建议

#### FILE_STRUCTURE.md
- **用途**: 本文件，文件结构说明
- **包含内容**:
  - 完整文件树
  - 每个文件的说明
  - 核心代码文件详解

---

### ⚙️ 配置文件

#### vite.config.ts
- **用途**: Vite配置
- **包含内容**:
  - 路由配置（手动定义3条路由）
  - 路径别名配置（`~` → `./app`）
  - Remix插件配置

---

### 🎯 核心代码文件详解

#### 1. 类型定义 - `points.types.ts`

```typescript
// 包含的类型：
- PointsEarnRule          // 积分获取规则
- PointsRedeemRule        // 积分消耗规则
- PointsExpiryRule        // 积分有效期规则
- PointsRuleConfig        // 完整规则配置
- UserPointsAccount       // 用户积分账户
- PointsChangeType (枚举) // 积分变动类型
- PointsDetail            // 积分明细记录
- Hotel                   // 酒店信息
- Order                   // 订单信息
- ManualAdjustRequest     // 手动调整请求
- PointsDetailQuery       // 查询参数
- UserSearchParams        // 搜索参数
```

**行数**: ~200行
**特点**: 完整的TypeScript类型约束，参考酒店行业真实业务

---

#### 2. Mock数据 - `points.mock.ts`

```typescript
// 包含的数据：
- mockPointsRuleConfig    // 积分规则配置（1个）
- mockHotels              // 酒店数据（6家）
  - 亚朵酒店·上海新天地店
  - 全季酒店·北京三里屯店
  - 汉庭酒店·杭州西湖断桥店
  - 如家酒店·成都春熙路店
  - 山野·莫干山云栖民宿
  - 柏悦酒店·上海浦东店

- mockUserAccounts        // 用户账户（5个）
  - 张经理（高价值用户，15680积分）
  - 李女士（普通用户，880积分）
  - 王先生（新用户，0积分）
  - 陈总（钻石会员，28560积分）
  - 刘小姐（银卡会员，3200积分）

- mockPointsDetails       // 积分明细（15条）
  - 订单完成 +458积分
  - 积分抵扣 -500积分
  - 手动调整 +500积分
  - 订单退款 -238积分
  - 积分过期 -200积分
  - 积分退回 +500积分

- mockOrders              // 订单数据（3个）
```

**行数**: ~250行
**特点**: 模拟真实酒店场景，数据合理，覆盖所有业务类型

---

#### 3. 服务层 - `points.service.ts`

```typescript
// 核心方法：
class PointsService {
  getRuleConfig()                 // 获取积分规则配置
  updateRuleConfig(config)        // 更新积分规则配置
  searchUserAccount(params)       // 搜索用户账户
  getAllUserAccounts()            // 获取所有用户账户
  adjustUserPoints(request)       // 手动调整用户积分
  getUserPointsDetails(query)     // 查询用户积分明细
  getChangeTypeLabel(type)        // 获取变动类型中文标签
}
```

**行数**: ~180行
**特点**:
- 使用Mock数据，无需后端
- 模拟API延迟（300-600ms）
- 完整的业务逻辑校验
- 支持分页、筛选

---

#### 4. 右侧逻辑面板 - `LogicPanel.tsx`

```typescript
// 核心组件：
- LogicPanel        // 主面板（支持多个section）
- LogicTable        // 表格（字段说明）
- LogicList         // 列表（要点罗列）
- LogicCode         // 代码块（公式展示）
- LogicHighlight    // 高亮块（info/warning/success）
```

**行数**: ~120行
**特点**:
- 复用性强，可用于任何模块
- 支持Markdown式内容
- 左侧4px边框，突出重点

---

#### 5. 规则配置页面 - `RuleConfigPage.tsx`

```typescript
// 页面结构：
<左侧60%>
  - 积分获取规则卡片
    - 消费兑换比例（1元=?积分）
    - 最低起算金额
    - 发放时机（延迟小时）
    - 排除项（优惠券、佣金）

  - 积分消耗规则卡片
    - 积分兑换比例（?积分=1元）
    - 最低使用门槛
    - 抵扣上限（%）
    - 示例计算展示

  - 积分有效期规则卡片
    - 有效期（月）
    - 过期提醒（天）
</左侧>

<右侧40%>
  - 业务场景（华住会/万豪/美团/携程对比）
  - 解决的问题（用户/平台/商家）
  - 产品逻辑（设计理由+计算公式）
  - 字段说明（完整表格）
  - 异常处理（退款/过期/失败）
  - 功能优先级（P0/P1/P2）
</右侧>
```

**行数**: ~550行
**特点**:
- 左侧使用shadcn/ui组件（Card、Input、Label、Button）
- 右侧PRD风格文档
- 实时计算预览
- 参考真实竞品

---

#### 6. 用户账户管理页面 - `UserAccountPage.tsx`

```typescript
// 页面结构：
<左侧60%>
  - 搜索栏
    - 手机号搜索
    - 快速选择（3个预置用户）

  - 用户积分账户卡片（搜索后显示）
    - 当前可用积分（绿色）
    - 冻结中积分（黄色）
    - 累计获得（蓝色）
    - 累计消耗（紫色）
    - 即将过期、注册日期、订单总数
    - 手动调整积分按钮

  - 积分明细流水表格
    - 时间、类型、积分变动、余额
    - 关联订单号、说明、操作人
    - 类型颜色区分（绿色/蓝色/红色/橙色/紫色/青色）

  - 手动调整积分对话框（弹窗）
    - 类型选择（增加/减少）
    - 积分数量输入
    - 调整原因（必填）
    - 调整后积分预览
</左侧>

<右侧40%>
  - 业务场景（客服/运营/风控）
  - 解决的问题（咨询/补偿/监控）
  - 产品逻辑（字段设计/手动调整规则/权限）
  - 积分明细类型（6种完整说明）
  - 异常处理（溯源流程+边界情况）
  - 行业最佳实践（华住会/携程做法）
</右侧>
```

**行数**: ~600行
**特点**:
- 真实的客服后台操作流程
- 完整的积分明细展示
- 支持手动调整（含校验）
- 6种积分变动类型颜色区分
- 关联订单号展示

---

#### 7. 路由文件

##### `routes/_index.tsx` - 首页导航
```typescript
// 页面结构：
- 标题区（项目名称+说明）
- 模块卡片网格
  - 积分系统卡片（已完成）
    - 规则配置链接
    - 用户账户链接
  - 会员体系卡片（即将推出）
  - 优惠券系统卡片（即将推出）
  - 订单系统卡片（即将推出）
```

**行数**: ~120行
**特点**: 清晰的模块导航，卡片式布局

##### `routes/points-system/rule-config.tsx` - 规则配置路由
```typescript
// Loader函数：
- 调用PointsService.getRuleConfig()
- 返回JSON数据

// Component：
- 使用useLoaderData获取数据
- 渲染RuleConfigPage组件
```

**行数**: ~20行
**特点**: 标准Remix Loader模式

##### `routes/points-system/user-account.tsx` - 用户账户路由
```typescript
// Loader函数：
- 调用PointsService.getAllUserAccounts()
- 调用PointsService.getUserPointsDetails()
- 返回JSON数据

// Component：
- 使用useLoaderData获取数据
- 渲染UserAccountPage组件
```

**行数**: ~25行
**特点**: 标准Remix Loader模式，预加载第一个用户的明细

---

## 🎯 核心文件优先级

### P0（必须理解）
1. `README.md` - 了解项目概览
2. `RuleConfigPage.tsx` - 理解左60%+右40%布局
3. `points.types.ts` - 理解数据结构
4. `points.mock.ts` - 看真实业务数据

### P1（深入学习）
1. `UserAccountPage.tsx` - 学习客服后台操作
2. `points.service.ts` - 学习服务层逻辑
3. `PROJECT_SUMMARY.md` - 查看完整总结

### P2（扩展阅读）
1. `LogicPanel.tsx` - 了解组件设计
2. `CLAUDE.md` - 学习Remix规范
3. `vite.config.ts` - 了解路由配置

---

## 💡 如何快速上手

### 1. 先看文档（5分钟）
```
README.md → 了解项目是干什么的
PROJECT_SUMMARY.md → 看交付了什么
```

### 2. 再看代码（10分钟）
```
points.types.ts → 看数据结构长什么样
points.mock.ts → 看Mock数据有哪些
```

### 3. 跑起来看效果（5分钟）
```
按README的"快速开始"步骤
先看首页 → 点击"积分规则配置" → 重点看右侧
```

### 4. 深入学习（30分钟）
```
RuleConfigPage.tsx → 理解为什么这样设计
UserAccountPage.tsx → 学习客服后台操作
对比华住会/携程APP → 看真实产品
```

---

## ✅ 验收清单

- [ ] 能看到首页导航（3个模块卡片）
- [ ] 能打开"积分规则配置"页面
- [ ] 左侧能看到3个配置卡片
- [ ] 右侧能看到6个逻辑说明section
- [ ] 能打开"用户积分管理"页面
- [ ] 能搜索"138****8888"查到张经理
- [ ] 能看到积分明细表格（15条）
- [ ] 能打开"手动调整积分"对话框
- [ ] Mock数据都是真实场景（亚朵、汉庭、民宿）
- [ ] 右侧逻辑说明清晰易懂

---

## 📞 帮助

如有问题，请查看：
1. `README.md` 的"常见问题"部分
2. `CLAUDE.md` 的"Troubleshooting"部分
3. `PROJECT_SUMMARY.md` 的"注意事项"部分
