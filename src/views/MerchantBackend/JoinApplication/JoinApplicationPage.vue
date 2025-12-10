<template>
  <sidebar>
    <div class="store-deployment-page">
      <!-- 吸顶进度条导航 -->
      <div class="sticky-tabs-container" :class="{ sticky: isSticky }">
        <div class="tabs-header">
          <div class="steps-container">
            <div
              v-for="(step, index) in steps"
              :key="step.key"
              @click="activeTab = step.key"
              :class="['step-item', {
                active: activeTab === step.key,
                completed: isStepCompleted(step.key)
              }]"
            >
              <div class="step-node">
                <span v-if="isStepCompleted(step.key)" class="step-icon">
                  <a-icon type="check" />
                </span>
                <span v-else class="step-number">{{ index + 1 }}</span>
              </div>
              <div class="step-content">
                <div class="step-title">{{ step.title }}</div>
                <div v-if="step.progress !== '-'" class="step-progress">{{ step.progress }}</div>
              </div>
              <div v-if="index < steps.length - 1" class="step-line"></div>
            </div>
          </div>

          <div class="header-actions">
            <!-- 自动保存状态 -->
            <div v-if="activeTab !== 'tab0'" class="save-status">
              <a-icon v-if="autoSaveStatus === 'saving'" type="loading" />
              <a-icon v-else-if="autoSaveStatus === 'saved'" type="check-circle" theme="filled" class="success-icon" />
              <a-icon v-else-if="autoSaveStatus === 'error'" type="close-circle" theme="filled" class="error-icon" />
              <span class="status-text">
                <template v-if="autoSaveStatus === 'saving'">保存中</template>
                <template v-else-if="autoSaveStatus === 'saved'">{{ lastSaveTime }}</template>
                <template v-else-if="autoSaveStatus === 'error'">失败</template>
              </span>
            </div>

            <a-button v-if="activeTab !== 'tab0'" @click="handleSaveDraft">
              <a-icon type="save" />
              保存草稿
            </a-button>
            <a-button
              type="primary"
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

    // Steps配置
    const steps = computed(() => [
      { key: 'tab0', title: '准备清单', progress: tabProgress.tab0 },
      { key: 'tab1', title: '基本信息', progress: tabProgress.tab1 },
      { key: 'tab2', title: '设施周边', progress: tabProgress.tab2 },
      { key: 'tab3', title: '运营政策', progress: tabProgress.tab3 },
      { key: 'tab4', title: '门店展示', progress: tabProgress.tab4 },
      { key: 'tab5', title: '房型设置', progress: tabProgress.tab5 }
    ])

    // 判断步骤是否完成
    const isStepCompleted = (tabKey) => {
      return tabProgress[tabKey] === '✓'
    }

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
      steps,
      isStepCompleted,
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
  padding-bottom: 24px;
}

.sticky-tabs-container {
  background: @bg-primary;
  transition: all 0.3s ease;
  z-index: 99;
  border-bottom: 1px solid @border-primary;

  &.sticky {
    position: fixed;
    top: 0;
    left: 256px;
    right: 0;
    box-shadow: @shadow-md;
  }
}

.tabs-header {
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.steps-container {
  flex: 1;
  display: flex;
  align-items: center;
}

.step-item {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  flex: 1;

  &:last-child {
    flex: 0;
  }

  &:hover .step-node {
    border-color: @brand-primary;
  }

  &:hover .step-title {
    color: @brand-primary;
  }

  &.active .step-node {
    border-color: @brand-primary;
    background: @brand-primary;
    color: @bg-primary;
    font-weight: @font-weight-semibold;
  }

  &.active .step-title {
    color: @brand-primary;
    font-weight: @font-weight-semibold;
  }

  &.active .step-progress {
    color: @brand-primary;
    font-weight: @font-weight-medium;
  }

  &.completed .step-node {
    border-color: @success-color;
    background: @success-color;
    color: @bg-primary;
  }

  &.completed .step-title {
    color: @success-color;
  }
}

.step-node {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid @border-primary;
  background: @bg-primary;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: @font-size-sm;
  color: @text-secondary;
  font-weight: @font-weight-medium;
  transition: all 0.2s ease;
  flex-shrink: 0;
  z-index: 1;
}

.step-icon {
  font-size: 16px;
}

.step-number {
  font-size: @font-size-sm;
}

.step-content {
  margin-left: 12px;
  margin-right: 12px;
  flex-shrink: 0;
}

.step-title {
  font-size: @font-size-sm;
  color: @text-primary;
  line-height: 1.4;
  transition: all 0.2s ease;
}

.step-progress {
  font-size: @font-size-xs;
  color: @text-tertiary;
  margin-top: 2px;
  transition: all 0.2s ease;
}

.step-line {
  flex: 1;
  height: 2px;
  background: @border-primary;
  margin: 0 8px;
  transition: all 0.2s ease;

  .step-item.completed & {
    background: @success-color;
  }

  .step-item.active & {
    background: linear-gradient(to right, @brand-primary 0%, @border-primary 100%);
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.tab-content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.tab-content {
  padding: 24px 0;
}

.save-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: @font-size-xs;
  color: @text-secondary;

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
