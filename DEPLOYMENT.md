# 部署指南

**项目名称**: 小而美 Home Stay 2.0
**技术栈**: Vue 2 + Vite + Ant Design Vue
**部署平台**: Vercel

---

## 🚀 Vercel 自动部署

### GitHub 仓库
```
git@github.com:rbtsama/xiaoermei_v20.git
```

### Vercel 配置

项目已包含 `vercel.json` 配置文件：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 自动部署流程

1. **推送代码到 GitHub**
   ```bash
   git push vercel master
   ```

2. **Vercel 自动构建**
   - 检测到 GitHub 仓库更新
   - 自动运行 `npm run build`
   - 输出到 `dist/` 目录

3. **自动发布**
   - 部署到 Vercel CDN
   - 生成预览 URL
   - 生产环境 URL

---

## 📦 构建验证

### 本地构建测试

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### 构建产物

```
dist/
├── index.html
├── assets/
│   ├── *.js (代码分割后的chunk)
│   ├── *.css (样式文件)
│   └── *.svg (图标资源)
└── vite.svg
```

### 构建统计

- **总大小**: ~1.7 MB（未压缩）
- **Gzip后**: ~520 KB
- **主chunk**: index-*.js (1.67 MB)
- **代码分割**: 23+ chunks

---

## 🔧 环境配置

### Node.js 版本

```json
"engines": {
  "node": ">=18.0.0"
}
```

### 依赖管理

```bash
# 安装依赖
npm install

# 锁定版本
package-lock.json
```

---

## 🌐 路由配置

### History Mode

项目使用 Vue Router history 模式：

```javascript
const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})
```

### Vercel Rewrites

所有路由重定向到 `index.html`（已配置在 vercel.json）:

```json
"rewrites": [
  {
    "source": "/(.*)",
    "destination": "/index.html"
  }
]
```

---

## 📝 部署检查清单

### 构建前检查

- [x] TypeScript 类型检查通过 (`npm run typecheck`)
- [x] 本地构建成功 (`npm run build`)
- [x] 预览构建无错误 (`npm run preview`)
- [x] 所有 Mock 数据正常工作
- [x] 所有路由可访问

### Vercel 配置检查

- [x] `vercel.json` 配置正确
- [x] `.gitignore` 忽略构建产物
- [x] `package.json` scripts 完整
- [x] Node.js 版本要求明确

### GitHub 检查

- [x] 代码已推送到 GitHub
- [x] 仓库地址正确
- [x] 所有文件已提交

---

## 🎯 Mock 数据说明

### 数据来源

项目使用 Mock 数据，位于：
- `src/mocks/` - 公共 Mock 数据
- `src/views/**/services/mocks/` - 模块 Mock 数据

### Mock 数据列表

1. **优惠券管理**
   - `src/views/PlatformAdmin/CouponManagement/services/mocks/coupon.mock.ts`

2. **会员管理**
   - `src/views/PlatformAdmin/MemberManagement/services/mocks/member.mock.ts`

3. **积分管理**
   - `src/views/PlatformAdmin/PointsManagement/services/mocks/points.mock.ts`

4. **订单管理**
   - `src/views/PlatformAdmin/OrderManagement/services/mocks/order.mock.ts`

5. **门店信息**
   - `src/views/MerchantBackend/StoreInfo/services/mocks/storeInfo.mock.ts`

6. **会员服务**
   - `src/mocks/memberService.mock.ts`

### Mock 数据特点

- ✅ 真实业务场景
- ✅ 完整字段定义
- ✅ 边界情况考虑
- ✅ 时间格式统一

---

## 🔗 部署后访问

### 预览地址
- Vercel 自动生成预览 URL
- 格式: `https://xiaoermei-v20-*.vercel.app`

### 生产地址
- 主分支自动部署
- 格式: `https://xiaoermei-v20.vercel.app`

### 首页路由
```
/ → 自动重定向到 /platform-admin/coupon-management/list
```

---

## 📋 部署后验证

### 功能验证清单

- [ ] 首页正常加载
- [ ] 侧边栏菜单正常展开
- [ ] 所有页面可访问
- [ ] 表格数据正常显示
- [ ] 表单提交正常工作
- [ ] 弹窗正常打开关闭
- [ ] 路由跳转正常
- [ ] 样式显示正确

### 性能验证

- [ ] 首屏加载时间 < 3s
- [ ] 页面切换流畅
- [ ] 表格渲染快速
- [ ] 无控制台错误

---

## 🛠️ 故障排查

### 构建失败

**问题**: `npm run build` 失败

**解决**:
1. 检查 Node.js 版本 >= 18
2. 删除 `node_modules` 和 `package-lock.json`
3. 重新安装: `npm install`
4. 再次构建: `npm run build`

### 路由404

**问题**: 刷新页面出现404

**解决**:
- 确认 `vercel.json` 中的 rewrites 配置正确
- 所有路由都重定向到 `/index.html`

### 样式丢失

**问题**: 部署后样式不显示

**解决**:
- 检查 `vite.config.js` 中的 Less 配置
- 确认 `src/main.js` 导入了所有样式文件
- 检查 CSS 文件是否正确构建到 `dist/assets/`

---

## 📞 联系方式

**仓库地址**: https://github.com/rbtsama/xiaoermei_v20
**技术文档**: CLAUDE.md
**配色规范**: setting_page_color.md

---

**最后更新**: 2025-12-08
**版本**: 2.0
**状态**: 生产就绪 ✅
