import { vitePlugin as remix } from "@remix-run/dev"
import { defineConfig } from "vite"
import path from "path"

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      routes(defineRoutes) {
        return defineRoutes((route) => {
          // Root
          route("/", "routes/_index.tsx", { index: true })

          // Points System Routes
          route("/points-system/rule-config", "routes/points-system/rule-config.tsx")
          route("/points-system/user-account", "routes/points-system/user-account.tsx")

          // Account Management Routes
          route("/account/list", "routes/account/list.tsx")

          // Hotel Management Routes
          route("/hotel/join-application", "routes/hotel/join-application.tsx")
          route("/hotel/partner-list", "routes/hotel/partner-list.tsx")
          route("/hotel/contract-template", "routes/hotel/contract-template.tsx")
          route("/hotel/signing-record", "routes/hotel/signing-record.tsx")

          // Member System Routes
          route("/member/level-config", "routes/member/level-config.tsx")

          // Coupon System Routes
          route("/coupon/config", "routes/coupon/config.tsx")
          route("/coupon/grant", "routes/coupon/grant.tsx")
          route("/coupon/verify", "routes/coupon/verify.tsx")

          // Order Management Routes
          route("/order/list", "routes/order/list.tsx")
          route("/order/detail", "routes/order/detail.tsx")
          route("/order/refund", "routes/order/refund.tsx")
        })
      },
    }),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./app"),
    },
  },
})
