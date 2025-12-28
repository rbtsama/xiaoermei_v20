<template>
  <sidebar>
    <div class="store-deployment-page">
      <!-- 吸顶Tab导航 -->
      <div class="sticky-tabs-container" :class="{ sticky: isSticky }">
        <div class="tabs-header">
          <!-- Tab列表 -->
          <div class="tabs-list">
            <div
              v-for="step in steps"
              :key="step.key"
              @click="activeTab = step.key"
              :class="['tab-item', { active: activeTab === step.key, submitted: submittedTabs[step.key] }]"
            >
              <span class="tab-title">{{ step.title }}</span>
              <!-- 未提交：红色感叹号 -->
              <a-icon v-if="!submittedTabs[step.key]" type="exclamation-circle" theme="filled" class="pending-icon" />
            </div>
          </div>

          <!-- 右侧操作按钮 -->
          <div class="header-actions">
            <!-- Tab1-6：未提交状态 -->
            <template v-if="!submittedTabs[activeTab]">
              <!-- 自动保存状态 -->
              <div class="save-status">
                <a-icon v-if="autoSaveStatus === 'saving'" type="loading" />
                <a-icon v-else-if="autoSaveStatus === 'saved'" type="check-circle" theme="filled" class="success-icon" />
                <span class="status-text">
                  <template v-if="autoSaveStatus === 'saving'">保存中...</template>
                  <template v-else-if="autoSaveStatus === 'saved'">{{ lastSaveTime }} 自动保存</template>
                </span>
              </div>

              <a-button @click="handleSaveDraft" size="large" class="action-btn">
                <a-icon type="save" />
                保存草稿
              </a-button>

              <a-button type="primary" @click="handleSubmitTab" size="large" class="action-btn primary-btn">
                <a-icon type="check" />
                提交本页
              </a-button>
            </template>

            <!-- Tab1-6：已提交，非编辑模式 -->
            <template v-else-if="!editingTabs[activeTab]">
              <a-button type="primary" @click="handleStartEdit" size="large" class="action-btn primary-btn">
                <a-icon type="edit" />
                编辑
              </a-button>
            </template>

            <!-- Tab1-6：已提交，编辑模式 -->
            <template v-else>
              <a-button @click="handleCancelEdit" size="large" class="action-btn">
                取消
              </a-button>
              <a-button type="primary" @click="handleSaveEdit" size="large" class="action-btn primary-btn">
                <a-icon type="save" />
                保存
              </a-button>
            </template>
          </div>
        </div>
      </div>

      <!-- Tab内容区域 -->
      <div class="tab-content-wrapper">
        <!-- Tab 1-6: 表单内容 -->
        <div class="tab-content">
          <store-deployment-form
            ref="formRef"
            :active-tab="activeTab"
            :submitted-tabs="submittedTabs"
            :editing-tabs="editingTabs"
            @progress-update="handleProgressUpdate"
            @save-success="handleSaveSuccess"
            @save-error="handleSaveError"
          />
        </div>
      </div>

      <!-- 首次填写指导弹窗 -->
      <first-time-guide-dialog
        :visible="showGuideDialog"
        @close="handleCloseGuide"
        @start="handleStartFilling"
      />
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, reactive, computed, onMounted, onBeforeMount } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import StoreDeploymentForm from './StoreDeploymentForm.vue'
import FirstTimeGuideDialog from './components/FirstTimeGuideDialog.vue'
import { AutoSaveStatus } from '@/types/storeDeployment'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'StoreDeploymentPage',
  components: {
    Sidebar,
    StoreDeploymentForm,
    FirstTimeGuideDialog
  },
  setup(props, { root }) {
    const activeTab = ref('tab1')
    const isSticky = ref(false)
    const autoSaveStatus = ref(AutoSaveStatus.IDLE)
    const lastSaveTime = ref('')
    const formRef = ref(null)
    const showGuideDialog = ref(false)

    // Tab提交状态（记录哪些Tab已提交）
    const submittedTabs = reactive({
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: false,
      tab5: false,
      tab6: false
    })

    // Tab编辑模式（记录哪些Tab处于编辑状态）
    const editingTabs = reactive({
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: false,
      tab5: false,
      tab6: false
    })

    // Tab进度统计
    const tabProgress = reactive({
      tab1: '0/10',
      tab2: '0/8',
      tab3: '0/12',
      tab4: '0/6',
      tab5: '0/20',
      tab6: '0/1'
    })

    // Steps配置
    const steps = computed(() => [
      { key: 'tab1', title: '基本信息', progress: tabProgress.tab1 },
      { key: 'tab2', title: '设施周边', progress: tabProgress.tab2 },
      { key: 'tab3', title: '运营政策', progress: tabProgress.tab3 },
      { key: 'tab4', title: '门店展示', progress: tabProgress.tab4 },
      { key: 'tab5', title: '房型设置', progress: tabProgress.tab5 },
      { key: 'tab6', title: '支付结算', progress: tabProgress.tab6 }
    ])

    // 判断步骤是否完成
    const isStepCompleted = (tabKey) => {
      return tabProgress[tabKey] === '✓'
    }

    // 监听滚动实现吸顶
    const handleScroll = () => {
      isSticky.value = window.scrollY > 100
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

    // 提交本页
    const handleSubmitTab = async () => {
      // 调用表单验证
      if (formRef.value && formRef.value.validateCurrentTab) {
        const isValid = await formRef.value.validateCurrentTab()
        if (!isValid) {
          return
        }
      }

      // 验证通过，提交
      try {
        root.$message.loading({ content: '正在提交...', key: 'submit', duration: 0 })

        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))

        // 提交成功，标记为已提交
        submittedTabs[activeTab.value] = true

        root.$message.success({ content: '提交成功！', key: 'submit', duration: 2 })
      } catch (error) {
        root.$message.error({ content: '提交失败，请检查必填项', key: 'submit', duration: 2 })
      }
    }

    // 开始编辑
    const handleStartEdit = () => {
      editingTabs[activeTab.value] = true
    }

    // 保存编辑
    const handleSaveEdit = async () => {

      try {
        root.$message.loading({ content: '正在保存...', key: 'save', duration: 0 })

        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 800))

        // 退出编辑模式
        editingTabs[activeTab.value] = false

        root.$message.success({ content: '保存成功！', key: 'save', duration: 2 })
      } catch (error) {
        root.$message.error({ content: '保存失败', key: 'save', duration: 2 })
      }
    }

    // 取消编辑
    const handleCancelEdit = () => {
      // TODO: 恢复原始数据
      editingTabs[activeTab.value] = false
      root.$message.info('已取消编辑')
    }

    // 进度更新
    const handleProgressUpdate = (progress) => {
      Object.assign(tabProgress, progress)
    }

    // 检测是否有未完成的tab（只要有任何一个tab未提交，就返回true）
    const hasUnfinishedTabs = () => {
      return Object.values(submittedTabs).some(status => status === false)
    }

    // 关闭指导弹窗
    const handleCloseGuide = () => {
      showGuideDialog.value = false
    }

    // 开始填写
    const handleStartFilling = () => {
      showGuideDialog.value = false
      root.$message.success('开始填写门店信息，祝您顺利！')
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)

      // 检测是否需要显示首次填写指导弹窗
      // 只要有任何tab未提交，就显示弹窗
      if (hasUnfinishedTabs()) {
        // 延迟500ms显示，让页面先渲染完成
        setTimeout(() => {
          showGuideDialog.value = true
        }, 500)
      }
    })

    onBeforeMount(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      activeTab,
      isSticky,
      autoSaveStatus,
      lastSaveTime,
      submittedTabs,
      editingTabs,
      tabProgress,
      steps,
      formRef,
      showGuideDialog,
      isStepCompleted,
      handleSaveDraft,
      handleSubmitTab,
      handleStartEdit,
      handleSaveEdit,
      handleCancelEdit,
      handleProgressUpdate,
      handleSaveSuccess,
      handleSaveError,
      handleCloseGuide,
      handleStartFilling
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

.tabs-list {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.tab-item {
  padding: 10px 18px;
  border-radius: @border-radius-base;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid transparent;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: transparent;
    transition: all 0.2s ease;
  }

  &:hover {
    background: rgba(59, 130, 246, 0.05);

    .tab-title {
      color: @brand-primary;
    }
  }

  &.active {
    background: rgba(59, 130, 246, 0.1);

    &::after {
      background: @brand-primary;
    }

    .tab-title {
      color: @brand-primary;
      font-weight: @font-weight-semibold;
    }
  }
}

.tab-title {
  font-size: @font-size-base;
  color: @text-primary;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.action-btn {
  height: 40px;
  padding: 0 24px;
  font-size: @font-size-base;
  font-weight: @font-weight-medium;
  border-radius: @border-radius-base;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: translateY(0);
  }
}

.primary-btn {
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);

  &:hover {
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
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

.save-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: @font-size-sm;
  color: @text-secondary;

  .success-icon {
    color: @success-color;
    font-size: 14px;
  }

  .error-icon {
    color: @error-color;
    font-size: 14px;
  }

  .status-text {
    white-space: nowrap;
    font-weight: @font-weight-medium;
  }
}

// Tab提交状态图标
.submitted-icon {
  color: @success-color;
  font-size: 16px;
  margin-left: 8px;
}

.pending-icon {
  color: @error-color;
  font-size: 16px;
  margin-left: 8px;
}
</style>
