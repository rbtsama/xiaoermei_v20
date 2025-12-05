<template>
  <sidebar>
    <div class="page-container">
      <a-card title="订单列表" :bordered="false">
        <a-alert message="页面开发中" type="info" show-icon />
      </a-card>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'

export default defineComponent({
  name: 'HotelOrderListPage',
  components: { Sidebar }
})
</script>

<style scoped lang="less">
.page-container {
  padding: 24px;
  background: #f0f2f5;
  min-height: calc(100vh - 0px);
}
</style>
