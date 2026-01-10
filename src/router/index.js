import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/platform-admin/coupon-management/list'
  },

  // 平台后台 - 订单管理
  {
    path: '/platform-admin/order-management/list',
    name: 'OrderList',
    component: () => import('@/views/PlatformAdmin/OrderManagement/OrderListPage.vue'),
    meta: { title: '订单列表' }
  },

  // 平台后台 - 会员管理
  {
    path: '/platform-admin/member-management/members',
    name: 'MemberManagement',
    component: () => import('@/views/PlatformAdmin/MemberManagement/MembersPage.vue'),
    meta: { title: '会员查询' }
  },
  {
    path: '/platform-admin/member-management/commission',
    name: 'CommissionManagement',
    component: () => import('@/views/PlatformAdmin/MemberManagement/CommissionManagementPage.vue'),
    meta: { title: '分销管理' }
  },

  // 平台后台 - 优惠券管理
  {
    path: '/platform-admin/coupon-management/list',
    name: 'CouponList',
    component: () => import('@/views/PlatformAdmin/CouponManagement/CouponListPage.vue'),
    meta: { title: '优惠券列表' }
  },
  {
    path: '/platform-admin/coupon-management/issue',
    name: 'CouponIssue',
    component: () => import('@/views/PlatformAdmin/CouponManagement/CouponIssuePage.vue'),
    meta: { title: '优惠券发放' }
  },
  {
    path: '/platform-admin/coupon-management/issue-records',
    name: 'CouponIssueRecords',
    component: () => import('@/views/PlatformAdmin/CouponManagement/CouponIssueRecordsPage.vue'),
    meta: { title: '发放记录' }
  },
  {
    path: '/platform-admin/coupon-management/operation-logs',
    name: 'CouponOperationLogs',
    component: () => import('@/views/PlatformAdmin/CouponManagement/CouponOperationLogsPage.vue'),
    meta: { title: '操作记录' }
  },

  // 平台后台 - 活动管理
  {
    path: '/platform-admin/activity-management/list',
    name: 'ActivityList',
    component: () => import('@/views/PlatformAdmin/ActivityManagement/ActivityListPage.vue'),
    meta: { title: '活动列表' }
  },

  // 平台后台 - 积分管理
  {
    path: '/platform-admin/points-management/config',
    name: 'PointsConfig',
    component: () => import('@/views/PlatformAdmin/PointsManagement/PointsConfigPage.vue'),
    meta: { title: '积分配置' }
  },
  {
    path: '/platform-admin/points-management/adjust',
    name: 'PointsAdjust',
    component: () => import('@/views/PlatformAdmin/PointsManagement/PointsAdjustPage.vue'),
    meta: { title: '积分调整' }
  },
  {
    path: '/platform-admin/points-management/operation-logs',
    name: 'PointsOperationLogs',
    component: () => import('@/views/PlatformAdmin/PointsManagement/PointsOperationLogsPage.vue'),
    meta: { title: '积分操作记录' }
  },

  // 平台后台 - 通知管理
  {
    path: '/platform-admin/notification-management/task',
    name: 'NotificationTask',
    component: () => import('@/views/PlatformAdmin/NotificationManagement/NotificationTaskPage.vue'),
    meta: { title: '通知任务' }
  },

  // 平台后台 - 短信配置
  {
    path: '/platform-admin/sms-config',
    name: 'SmsConfig',
    component: () => import('@/views/PlatformAdmin/SmsConfig/SmsConfigPage.vue'),
    meta: { title: '短信配置' }
  },
  {
    path: '/platform-admin/options-config',
    name: 'OptionsConfig',
    component: () => import('@/views/PlatformAdmin/OptionsConfig/OptionsConfigPage.vue'),
    meta: { title: '选项配置' }
  },
  {
    path: '/platform-admin/merchant-approval',
    name: 'MerchantApproval',
    component: () => import('@/views/PlatformAdmin/MerchantApproval/MerchantApprovalListPage.vue'),
    meta: { title: '商户上架' }
  },

  // 商户端 - 门店信息
  {
    path: '/merchant-backend/join-application/apply',
    name: 'JoinApplication',
    component: () => import('@/views/MerchantBackend/JoinApplication/JoinApplicationPage.vue'),
    meta: { title: '门店信息' }
  },

  // 商户端 - 订单管理
  {
    path: '/merchant-backend/order-management/list',
    name: 'MerchantOrderList',
    component: () => import('@/views/MerchantBackend/OrderManagement/OrderListPage.vue'),
    meta: { title: '订单列表' }
  },

  // 商户端 - 会员服务
  {
    path: '/merchant-backend/points-service/config',
    name: 'PointsServiceConfig',
    component: () => import('@/views/MerchantBackend/MemberService/PointsServiceConfigPage.vue'),
    meta: { title: '积分服务配置（未完成）' }
  },
  {
    path: '/merchant-backend/agent-order/create',
    name: 'AgentOrderCreate',
    component: () => import('@/views/MerchantBackend/MemberService/AgentOrderCreatePage.vue'),
    meta: { title: '代客下单（未完成）' }
  },
  {
    path: '/merchant-backend/old-customer/invite-member',
    name: 'InviteMember',
    component: () => import('@/views/MerchantBackend/MemberService/InviteMemberPage.vue'),
    meta: { title: '邀请会员' }
  },
  {
    path: '/merchant-backend/invite-member/records',
    name: 'InviteRecords',
    component: () => import('@/views/MerchantBackend/MemberService/InviteRecordsPage.vue'),
    meta: { title: '邀请记录' }
  },
  {
    path: '/merchant-backend/invite-member/commission',
    name: 'CommissionRewards',
    component: () => import('@/views/MerchantBackend/MemberService/CommissionRewardsPage.vue'),
    meta: { title: '分销奖励' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router
