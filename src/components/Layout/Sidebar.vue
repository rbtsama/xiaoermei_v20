<template>
  <a-layout style="min-height: 100vh">
    <!-- 侧边栏 -->
    <a-layout-sider
      v-model="collapsed"
      :trigger="null"
      collapsible
      :width="256"
      theme="light"
      style="overflow: auto; height: 100vh; position: fixed; left: 0"
    >
      <!-- Logo 区域 -->
      <div class="logo-container">
        <router-link to="/" class="logo-link">
          <h1 v-if="!collapsed" class="logo-title">小而美2.0</h1>
          <h1 v-else class="logo-title-collapsed">小</h1>
        </router-link>
      </div>

      <!-- 菜单 -->
      <a-menu
        :default-selected-keys="selectedKeys"
        :default-open-keys="openKeys"
        :selected-keys="selectedKeys"
        :open-keys="openKeys"
        mode="inline"
        theme="light"
        @openChange="onOpenChange"
      >
        <template v-for="item in menuItems">
          <a-sub-menu v-if="item.children" :key="item.key">
            <span slot="title">{{ item.title }}</span>
            <template v-for="child in item.children">
              <a-sub-menu v-if="child.children" :key="child.key">
                <span slot="title">{{ child.title }}</span>
                <a-menu-item
                  v-for="leaf in child.children"
                  :key="leaf.key"
                  @click="handleMenuClick(leaf.path)"
                >
                  {{ leaf.title }}
                </a-menu-item>
              </a-sub-menu>
              <a-menu-item
                v-else
                :key="child.key"
                @click="handleMenuClick(child.path)"
              >
                {{ child.title }}
              </a-menu-item>
            </template>
          </a-sub-menu>
        </template>
      </a-menu>

      <!-- 折叠按钮 -->
      <div class="collapse-trigger" @click="collapsed = !collapsed">
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
      </div>
    </a-layout-sider>

    <!-- 主内容区 -->
    <a-layout :style="{ marginLeft: collapsed ? '80px' : '256px', transition: 'margin-left 0.2s' }">
      <a-layout-content style="margin: 0; min-height: 280px; background: #f0f2f5">
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { defineComponent, ref, computed, watch } from '@vue/composition-api'
import { menuConfig } from './menuConfig'

export default defineComponent({
  name: 'Sidebar',
  setup(props, { root }) {
    const collapsed = ref(false)
    const openKeys = ref(['architecture', 'platform-admin', 'merchant-backend'])

    // 计算当前选中的菜单项
    const selectedKeys = computed(() => {
      const path = root.$route.path
      // 从菜单配置中找到匹配的key
      const findKey = (items) => {
        for (const item of items) {
          if (item.path === path) {
            return [item.key]
          }
          if (item.children) {
            const childKey = findKey(item.children)
            if (childKey) return childKey
          }
        }
        return []
      }
      return findKey(menuConfig)
    })

    // 监听路由变化
    watch(() => root.$route.path, () => {
      // 路由变化时可以做一些处理
    })

    const onOpenChange = (keys) => {
      openKeys.value = keys
    }

    const handleMenuClick = (path) => {
      if (path && root.$route.path !== path) {
        root.$router.push(path)
      }
    }

    return {
      collapsed,
      openKeys,
      selectedKeys,
      menuItems: menuConfig,
      onOpenChange,
      handleMenuClick
    }
  }
})
</script>

<style scoped lang="less">
.logo-container {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #f0f0f0;

  .logo-link {
    text-decoration: none;
    color: inherit;
  }

  .logo-title {
    font-size: 20px;
    font-weight: bold;
    color: #2C5F8D;
    margin: 0;
  }

  .logo-title-collapsed {
    font-size: 24px;
    font-weight: bold;
    color: #2C5F8D;
    margin: 0;
  }
}

.collapse-trigger {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;

  &:hover {
    color: #2C5F8D;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  i {
    font-size: 18px;
  }
}

:deep(.ant-layout-sider) {
  background: #fff;
}

:deep(.ant-menu) {
  border-right: none;
}

:deep(.ant-menu-item-selected) {
  background-color: #e6f7ff;
  color: #2C5F8D;
}

:deep(.ant-menu-item):hover {
  color: #2C5F8D;
}
</style>
