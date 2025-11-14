# 酒店SAAS学习平台 - 部署指南

## 项目概述

这是一个酒店预订平台的完整后台管理系统学习Demo，包含积分、会员、优惠券、酒店管理、订单管理等核心模块。

**技术栈**:
- Remix v2.15.0 + Vite
- TypeScript
- shadcn/ui + Tailwind CSS
- Mock数据（无需后端）

---

## 📦 部署到Vercel

### 方式1：通过GitHub自动部署（推荐）

#### 步骤1：推送到GitHub
```bash
# 1. 初始化Git仓库（如果还没有）
git init

# 2. 添加所有文件
git add .

# 3. 提交
git commit -m "feat: 酒店SAAS学习平台完整版"

# 4. 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/hotel-saas-demo.git

# 5. 推送
git push -u origin main
```

#### 步骤2：在Vercel部署
1. 访问 https://vercel.com
2. 点击"Import Project"
3. 选择你的GitHub仓库
4. Vercel会自动检测Remix项目
5. 点击"Deploy"

**Vercel会自动配置**：
- Build Command: `npm run build`
- Output Directory: `.output`
- Install Command: `npm install`

---

### 方式2：通过Vercel CLI部署

```bash
# 1. 安装Vercel CLI
npm install -g vercel

# 2. 登录Vercel
vercel login

# 3. 部署（首次会询问项目配置）
vercel

# 4. 生产环境部署
vercel --prod
```

---

## 🔧 环境变量配置

本项目不需要环境变量（全部使用Mock数据）。

如果后续需要连接真实后端API，可在Vercel中配置：
- `VITE_API_BASE_URL`
- `VITE_API_KEY`

---

## ✅ 部署前检查清单

### 1. 代码检查
```bash
# 类型检查
npm run typecheck

# 构建测试
npm run build
```

### 2. 文件检查
```bash
# 确保以下文件存在
✓ package.json
✓ vite.config.ts
✓ tsconfig.json
✓ tailwind.config.ts
✓ postcss.config.js
```

### 3. 依赖检查
```bash
# 确保所有依赖已安装
npm install
```

---

## 📂 项目结构

```
F:/pjs/module/
├── app/
│   ├── pages/           # 所有业务模块
│   │   ├── PointsSystem/        # 积分系统
│   │   ├── MemberSystem/        # 会员体系
│   │   ├── CouponSystem/        # 优惠券
│   │   ├── HotelManagement/     # 酒店管理
│   │   ├── OrderManagement/     # 订单管理
│   │   └── AccountManagement/   # 账号管理
│   ├── routes/          # 路由文件
│   ├── components/ui/   # shadcn/ui组件
│   ├── styles/          # 全局样式
│   └── root.tsx         # 根组件
├── public/              # 静态资源
├── package.json
├── vite.config.ts
├── tsconfig.json
├── README.md
├── CLAUDE.md            # 开发规范
└── DEPLOYMENT.md        # 本文件
```

---

## 🎯 已实现的功能模块

### 1. 积分系统 ✅
- 积分规则配置（获取、消耗、有效期）
- 用户积分管理（搜索、调整、明细）

### 2. 会员体系 ✅
- 会员等级配置（10个等级VIP0-9）
- 间夜数升降级、积分倍率、体验卡、售价

### 3. 优惠券 ✅
- 优惠券配置（满减、折扣、立减）
- 优惠券发放（手动/自动）
- 核销记录

### 4. 酒店管理 ✅
- 加盟申请（BD跟进、资质审核、签约）
- 合作酒店（上线/下线、抽佣比例）
- 协议模板管理（版本控制）
- 签约记录

### 5. 订单管理 ✅
- 订单列表（筛选、搜索）
- 订单详情（完整信息）
- 退款管理（审核、退款规则）

### 6. 账号管理 ✅
- 账号列表（增删改查）
- 权限配置（11个菜单×查看/编辑）
- 密码管理

---

## 🌐 访问地址

### 本地开发
```
http://localhost:3000
```

### Vercel部署后
```
https://你的项目名.vercel.app
```

---

## 🚀 快速开始

### 本地运行
```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 访问
http://localhost:3000
```

### 构建生产版本
```bash
# 构建
npm run build

# 预览构建结果
npm run start
```

---

## 📝 注意事项

### 1. Mock数据说明
- 所有数据都是Mock数据，不会持久化
- 刷新页面后手动修改会丢失
- 适合学习和演示，不适合生产环境

### 2. 浏览器兼容性
- Chrome/Edge（推荐）
- Firefox
- Safari

### 3. 性能优化
- 已启用Vite的HMR（热更新）
- 已优化Tailwind CSS（PurgeCSS）
- shadcn/ui组件按需加载

---

## 🐛 常见问题

### Q: 部署后页面空白
A: 检查浏览器控制台错误，可能是路由配置问题

### Q: 样式丢失
A: 确保 `tailwind.config.ts` 和 `postcss.config.js` 正确配置

### Q: 类型错误
A: 运行 `npm run typecheck` 检查TypeScript错误

---

## 📞 技术支持

如有问题：
1. 查看 `README.md` 了解项目功能
2. 查看 `CLAUDE.md` 了解开发规范
3. 查看浏览器控制台错误信息

---

## 🎓 学习建议

1. **先看README** → 了解项目概览
2. **访问首页** → 浏览所有模块
3. **重点看右侧** → 产品&业务逻辑教学
4. **对比真实平台** → 打开美团/携程APP对比学习

---

祝你学习愉快！🚀
