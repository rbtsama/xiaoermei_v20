<template>
  <sidebar>
    <div class="page-container">
      <div class="coming-soon">
        <a-icon type="coffee" class="icon" />
        <h2>邀请会员功能</h2>
        <p>此功能正在重新开发中，敬请期待...</p>
      </div>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'

export default defineComponent({
  name: 'InviteMemberPage',
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
