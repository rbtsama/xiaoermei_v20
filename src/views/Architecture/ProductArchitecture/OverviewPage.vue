<template>
  <sidebar>
    <div class="page-container">
      <a-card title="产品架构总图" :bordered="false">
        <div class="overview-content">
          <a-alert
            message="产品架构说明"
            description="这是产品架构总图页面，展示整个系统的模块结构和关系。"
            type="info"
            show-icon
            style="margin-bottom: 24px"
          />

          <a-row :gutter="[16, 16]">
            <a-col :span="8">
              <a-card title="平台后台" size="small" :bordered="true">
                <p>订单管理</p>
                <p>会员管理</p>
                <p>优惠券管理</p>
                <p>积分管理</p>
              </a-card>
            </a-col>

            <a-col :span="8">
              <a-card title="商户端" size="small" :bordered="true">
                <p>入驻申请</p>
                <p>门店信息</p>
                <p>订单管理</p>
                <p>房务管理</p>
                <p>会员服务</p>
              </a-card>
            </a-col>

            <a-col :span="8">
              <a-card title="设计规范" size="small" :bordered="true">
                <p>配色系统</p>
                <p>组件规范</p>
                <p>交互规范</p>
              </a-card>
            </a-col>
          </a-row>

          <div class="architecture-diagram" style="margin-top: 32px">
            <a-card title="系统架构" :bordered="true">
              <div style="text-align: center; padding: 40px; background: #fafafa">
                <h3>民宿管理系统</h3>
                <a-divider />
                <p style="font-size: 16px; color: #666">
                  <a-icon type="arrow-down" style="font-size: 24px; color: #2C5F8D" />
                </p>
                <a-row :gutter="16">
                  <a-col :span="12">
                    <a-tag color="blue" style="padding: 8px 16px; font-size: 14px">
                      平台后台
                    </a-tag>
                  </a-col>
                  <a-col :span="12">
                    <a-tag color="green" style="padding: 8px 16px; font-size: 14px">
                      商户端
                    </a-tag>
                  </a-col>
                </a-row>
              </div>
            </a-card>
          </div>
        </div>
      </a-card>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'

export default defineComponent({
  name: 'OverviewPage',
  components: {
    Sidebar
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.page-container {
  padding: 24px;
  background: #f0f2f5;
  min-height: calc(100vh - 0px);
}

.overview-content {
  p {
    margin: 8px 0;
    color: #666;
  }
}

.architecture-diagram {
  h3 {
    color: #2C5F8D;
    font-size: 24px;
    margin-bottom: 16px;
  }
}
</style>
