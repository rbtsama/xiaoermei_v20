<template>
  <sidebar>
    <div class="page-container">
      <div class="coming-soon">
        <a-icon type="calendar" class="icon" />
        <h2>订单列表</h2>
        <p>商户端订单列表正在开发中...</p>
      </div>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'

export default defineComponent({
  name: 'MerchantOrderListPage',
  components: {
    Sidebar
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.page-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: @bg-secondary;
}

.coming-soon {
  text-align: center;
  padding: 60px;
  background: @bg-primary;
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;

  .icon {
    font-size: 64px;
    color: @brand-primary;
    margin-bottom: 24px;
  }

  h2 {
    font-size: 24px;
    font-weight: @font-weight-semibold;
    color: @text-primary;
    margin-bottom: 12px;
  }

  p {
    font-size: @font-size-base;
    color: @text-secondary;
    margin: 0;
  }
}
</style>
