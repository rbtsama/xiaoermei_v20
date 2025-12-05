<template>
  <a-config-provider :locale="zhCN">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

export default defineComponent({
  name: 'App',
  setup() {
    return {
      zhCN
    }
  }
})
</script>

<style lang="less">
#app {
  min-height: 100vh;
  background: #f0f2f5;
}
</style>
