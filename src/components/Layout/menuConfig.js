export const menuConfig = [
  {
    title: '平台后台',
    key: 'platform-admin',
    children: [
      {
        title: '订单管理',
        key: 'order-management',
        children: [
          { title: '订单列表', path: '/order/list', key: 'order-list' }
        ]
      },
      {
        title: '会员管理',
        key: 'member-management',
        children: [
          { title: '会员查询', path: '/platform-admin/member-management/members', key: 'members' }
        ]
      },
      {
        title: '优惠券管理',
        key: 'coupon-management',
        children: [
          { title: '优惠券列表', path: '/platform-admin/coupon-management/list', key: 'coupon-list' },
          { title: '优惠券发放', path: '/platform-admin/coupon-management/issue', key: 'coupon-issue' }
        ]
      },
      {
        title: '积分管理',
        key: 'points-management',
        children: [
          { title: '积分配置', path: '/platform-admin/points-management/config', key: 'points-config' },
          { title: '积分调整', path: '/platform-admin/points-management/adjust', key: 'points-adjust' }
        ]
      },
      {
        title: '短信配置',
        key: 'sms-config',
        path: '/platform-admin/sms-config'
      }
    ]
  },
  {
    title: '商户端',
    key: 'merchant-backend',
    children: [
      { title: '订单列表', path: '/hotel-backend/order-list', key: 'hotel-order-list' },
      {
        title: '门店管理',
        key: 'store-management',
        children: [
          { title: '门店信息配置', path: '/merchant-backend/join-application/apply', key: 'store-config' }
        ]
      },
      {
        title: '会员服务',
        key: 'member-service',
        children: [
          { title: '积分服务配置', path: '/merchant-backend/points-service/config', key: 'points-service' },
          { title: 'VIP折扣配置', path: '/merchant-backend/vip-discount/config', key: 'vip-discount' },
          { title: '代客下单', path: '/merchant-backend/agent-order/create', key: 'agent-order' },
          { title: '邀请会员', path: '/merchant-backend/old-customer/invite-member', key: 'invite-member' }
        ]
      }
    ]
  }
]
