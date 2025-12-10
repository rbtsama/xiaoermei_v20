<template>
  <sidebar>
    <div class="page-container">
      <!-- 订单列表页面 - 待开发 -->
    </div>
  </sidebar>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'

export default defineComponent({
  name: 'MerchantOrderListPage',
  components: { Sidebar },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.page-container {
  padding: 24px;
  max-width: 1800px;
  margin: 0 auto;
}
</style>
