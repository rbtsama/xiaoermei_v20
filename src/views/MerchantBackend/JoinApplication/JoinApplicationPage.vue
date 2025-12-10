<template>
  <sidebar>
    <div class="store-deployment-page">
      <!-- 温馨提示（固定在顶部Tab之前） -->
      <div class="tip-container">
        <a-alert
          message="表单会自动保存，您可以随时退出，稍后继续填写。建议您先准备好所有材料，以便一次性完成填写。"
          type="info"
          show-icon
          class="tip-alert"
        />
      </div>

      <!-- 吸顶Tab导航 -->
      <div class="sticky-tabs-container" :class="{ sticky: isSticky }">
        <a-tabs
          v-model="activeTab"
          type="card"
          class="deployment-tabs"
        >
          <!-- Tab 0: 准备清单 -->
          <a-tab-pane key="tab0">
            <span slot="tab" class="tab-label">
              准备清单
              <span class="tab-progress">{{ tabProgress.tab0 }}</span>
            </span>
          </a-tab-pane>

          <!-- Tab 1: 账号与门店信息 -->
          <a-tab-pane key="tab1">
            <span slot="tab" class="tab-label">
              账号与门店信息
              <span class="tab-progress">{{ tabProgress.tab1 }}</span>
            </span>
          </a-tab-pane>

          <!-- Tab 2: 设施与周边 -->
          <a-tab-pane key="tab2">
            <span slot="tab" class="tab-label">
              设施与周边
              <span class="tab-progress">{{ tabProgress.tab2 }}</span>
            </span>
          </a-tab-pane>

          <!-- Tab 3: 运营政策 -->
          <a-tab-pane key="tab3">
            <span slot="tab" class="tab-label">
              运营政策
              <span class="tab-progress">{{ tabProgress.tab3 }}</span>
            </span>
          </a-tab-pane>

          <!-- Tab 4: 门店展示 -->
          <a-tab-pane key="tab4">
            <span slot="tab" class="tab-label">
              门店展示
              <span class="tab-progress">{{ tabProgress.tab4 }}</span>
            </span>
          </a-tab-pane>

          <!-- Tab 5: 房型配置 -->
          <a-tab-pane key="tab5">
            <span slot="tab" class="tab-label">
              房型配置
              <span class="tab-progress">{{ tabProgress.tab5 }}</span>
            </span>
          </a-tab-pane>
        </a-tabs>
      </div>

      <!-- Tab内容区域 -->
      <div class="tab-content-wrapper">
        <!-- Tab 0: 准备清单 -->
        <div v-show="activeTab === 'tab0'" class="tab-content">
          <checklist-content />
        </div>

        <!-- Tab 1-5: 表单内容 -->
        <div v-show="activeTab !== 'tab0'" class="tab-content">
          <store-deployment-form
            :active-tab="activeTab"
            @progress-update="handleProgressUpdate"
            @save-success="handleSaveSuccess"
            @save-error="handleSaveError"
          />
        </div>
      </div>

      <!-- 底部操作栏 -->
      <div class="bottom-action-bar">
        <div class="action-content">
          <a-button
            v-if="activeTab !== 'tab0'"
            size="large"
            @click="handlePrevTab"
          >
            <a-icon type="left" />
            上一步
          </a-button>
          <div style="flex: 1"></div>

          <!-- 自动保存状态 -->
          <div v-if="activeTab !== 'tab0'" class="save-status">
            <a-icon v-if="autoSaveStatus === 'saving'" type="loading" />
            <a-icon v-else-if="autoSaveStatus === 'saved'" type="check-circle" theme="filled" class="success-icon" />
            <a-icon v-else-if="autoSaveStatus === 'error'" type="close-circle" theme="filled" class="error-icon" />
            <span class="status-text">
              <template v-if="autoSaveStatus === 'saving'">正在保存...</template>
              <template v-else-if="autoSaveStatus === 'saved'">已保存 {{ lastSaveTime }}</template>
              <template v-else-if="autoSaveStatus === 'error'">保存失败</template>
            </span>
          </div>

          <a-button v-if="activeTab !== 'tab0'" size="large" @click="handleSaveDraft">
            保存草稿
          </a-button>
          <a-button
            type="primary"
            size="large"
            @click="handleNextTab"
          >
            <template v-if="activeTab === 'tab5'">提交审核</template>
            <template v-else>
              下一步
              <a-icon type="right" />
            </template>
          </a-button>
        </div>
      </div>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, reactive, computed, onMounted, onBeforeMount } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import ChecklistContent from './components/ChecklistContent.vue'
import StoreDeploymentForm from './StoreDeploymentForm.vue'
import { AutoSaveStatus } from '@/types/storeDeployment'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'StoreDeploymentPage',
  components: {
    Sidebar,
    ChecklistContent,
    StoreDeploymentForm
  },
  setup(props, { root }) {
    const activeTab = ref('tab0')
    const isSticky = ref(false)
    const autoSaveStatus = ref(AutoSaveStatus.IDLE)
    const lastSaveTime = ref('')

    // Tab进度统计
    const tabProgress = reactive({
      tab0: '-',  // 准备清单不显示进度
      tab1: '0/10',
      tab2: '0/8',
      tab3: '0/12',
      tab4: '0/6',
      tab5: '0/1'
    })

    // 监听滚动实现吸顶
    const handleScroll = () => {
      isSticky.value = window.scrollY > 100
    }

    // Tab切换
    const handlePrevTab = () => {
      const tabs = ['tab0', 'tab1', 'tab2', 'tab3', 'tab4', 'tab5']
      const currentIndex = tabs.indexOf(activeTab.value)
      if (currentIndex > 0) {
        activeTab.value = tabs[currentIndex - 1]
      }
    }

    const handleNextTab = () => {
      const tabs = ['tab0', 'tab1', 'tab2', 'tab3', 'tab4', 'tab5']
      const currentIndex = tabs.indexOf(activeTab.value)
      if (currentIndex < tabs.length - 1) {
        activeTab.value = tabs[currentIndex + 1]
      } else {
        // 最后一个Tab，提交审核
        handleSubmit()
      }
    }

    // 保存草稿
    const handleSaveDraft = () => {
      root.$message.success('草稿已保存')
    }

    // 保存成功
    const handleSaveSuccess = () => {
      autoSaveStatus.value = AutoSaveStatus.SAVED
      lastSaveTime.value = dayjs().format('HH:mm')
    }

    // 保存失败
    const handleSaveError = () => {
      autoSaveStatus.value = AutoSaveStatus.ERROR
    }

    // 提交审核
    const handleSubmit = () => {
      root.$message.info('提交审核功能开发中...')
    }

    // 进度更新
    const handleProgressUpdate = (progress) => {
      Object.assign(tabProgress, progress)
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onBeforeMount(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      activeTab,
      isSticky,
      autoSaveStatus,
      lastSaveTime,
      tabProgress,
      handlePrevTab,
      handleNextTab,
      handleSaveDraft,
      handleSubmit,
      handleProgressUpdate,
      handleSaveSuccess,
      handleSaveError
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.store-deployment-page {
  min-height: 100vh;
  background: @bg-tertiary;
  padding-bottom: 80px;
}

.tip-container {
  padding: 20px 20px 0;
  max-width: 1400px;
  margin: 0 auto;
}

.tip-alert {
  border-radius: @border-radius-base;
  padding: 16px 20px;

  :deep(.ant-alert-message) {
    font-size: @font-size-base;
    color: @text-primary;
    line-height: 1.8;
    font-weight: @font-weight-medium;
  }

  :deep(.ant-alert-icon) {
    font-size: 18px;
  }
}

.sticky-tabs-container {
  background: @bg-primary;
  transition: all 0.3s ease;
  z-index: 99;

  &.sticky {
    position: fixed;
    top: 0;
    left: 256px;
    right: 0;
    box-shadow: @shadow-md;
  }
}

.deployment-tabs {
  max-width: 1400px;
  margin: 0 auto;
  padding: 12px 20px 0;

  :deep(.ant-tabs-bar) {
    margin-bottom: 0;
    border-bottom: 2px solid @border-primary;
  }

  :deep(.ant-tabs-nav) {
    display: flex;
    gap: 4px;
  }

  :deep(.ant-tabs-tab) {
    border: none !important;
    background: transparent !important;
    color: @text-secondary !important;
    font-size: @font-size-base;
    padding: 10px 20px;
    margin: 0 !important;
    border-radius: @border-radius-base @border-radius-base 0 0;
    transition: all 0.2s ease;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: transparent;
      transition: background 0.2s ease;
    }

    &:hover {
      background: rgba(59, 130, 246, 0.05) !important;
      color: @brand-primary !important;
    }

    &.ant-tabs-tab-active {
      background: @bg-primary !important;
      color: @brand-primary !important;
      font-weight: @font-weight-semibold;

      &::after {
        background: @brand-primary;
      }
    }
  }

  :deep(.ant-tabs-content) {
    display: none;
  }
}

.tab-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tab-progress {
  font-size: @font-size-xs;
  color: @text-secondary;
  font-weight: @font-weight-normal;
  padding: 2px 6px;
  background: @bg-secondary;
  border-radius: @border-radius-sm;

  .ant-tabs-tab-active & {
    color: @brand-primary;
    background: rgba(59, 130, 246, 0.1);
    font-weight: @font-weight-medium;
  }
}

.tab-content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.tab-content {
  padding: 24px 0;
}

.bottom-action-bar {
  position: fixed;
  bottom: 0;
  left: 256px;
  right: 0;
  height: 72px;
  background: @bg-primary;
  border-top: 1px solid @border-primary;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
  z-index: 98;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-content {
  max-width: 1400px;
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.save-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: @font-size-sm;
  color: @text-secondary;
  margin-right: 8px;

  .success-icon {
    color: @success-color;
  }

  .error-icon {
    color: @error-color;
  }

  .status-text {
    white-space: nowrap;
  }
}
</style>
