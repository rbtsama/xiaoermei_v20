<template>
  <div class="form-content">
    <!-- Tab 1: 账号与门店信息 -->
    <Tab1AccountStoreInfo
      v-if="activeTab === 'tab1'"
      :form-data="formData"
      :is-locked="submittedTabs.tab1 && !editingTabs.tab1"
      @update="handleFormUpdate"
    />

    <!-- Tab 2: 设施与周边 -->
    <Tab2FacilitiesSurrounding
      v-if="activeTab === 'tab2'"
      :form-data="formData"
      :is-locked="submittedTabs.tab2 && !editingTabs.tab2"
      @update="handleFormUpdate"
    />

    <!-- Tab 3: 运营政策 -->
    <Tab3OperationPolicy
      v-if="activeTab === 'tab3'"
      :form-data="formData"
      :is-locked="submittedTabs.tab3 && !editingTabs.tab3"
      @update="handleFormUpdate"
    />

    <!-- Tab 4: 门店展示 -->
    <Tab4StoreDisplay
      v-if="activeTab === 'tab4'"
      :form-data="formData"
      :is-locked="submittedTabs.tab4 && !editingTabs.tab4"
      @update="handleFormUpdate"
    />

    <!-- Tab 5: 房型设置 -->
    <Tab5RoomTypeList
      v-if="activeTab === 'tab5'"
      :form-data="formData"
      :is-locked="submittedTabs.tab5 && !editingTabs.tab5"
      @update="handleFormUpdate"
    />

    <!-- Tab 6: 支付结算 -->
    <Tab6PaymentSettlement
      v-if="activeTab === 'tab6'"
      :form-data="formData"
      :is-locked="submittedTabs.tab6 && !editingTabs.tab6"
      @update="handleFormUpdate"
    />
  </div>
</template>

<script>
import { defineComponent, reactive, watch, onMounted, onBeforeUnmount } from '@vue/composition-api'
import { saveDraft, getDraftData } from '@/api/storeDeployment'
import { mockEmptyFormData } from '@/mocks/storeDeployment.mock'
import Tab1AccountStoreInfo from './components/Tab1AccountStoreInfo.vue'
import Tab2FacilitiesSurrounding from './components/Tab2FacilitiesSurrounding.vue'
import Tab3OperationPolicy from './components/Tab3OperationPolicy.vue'
import Tab4StoreDisplay from './components/Tab4StoreDisplay.vue'
import Tab5RoomTypeList from './components/Tab5RoomTypeList.vue'
import Tab6PaymentSettlement from './components/Tab6PaymentSettlement.vue'

export default defineComponent({
  name: 'StoreDeploymentForm',
  components: {
    Tab1AccountStoreInfo,
    Tab2FacilitiesSurrounding,
    Tab3OperationPolicy,
    Tab4StoreDisplay,
    Tab5RoomTypeList,
    Tab6PaymentSettlement
  },
  props: {
    activeTab: {
      type: String,
      required: true
    },
    submittedTabs: {
      type: Object,
      required: true
    },
    editingTabs: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit, root }) {
    const formData = reactive({ ...mockEmptyFormData })
    let autoSaveTimer = null

    // 加载草稿数据
    const loadDraft = async () => {
      try {
        const draft = await getDraftData()
        if (draft) {
          Object.assign(formData, draft)
        }
      } catch (error) {
        console.error('Load draft error:', error)
      }
    }

    // 自动保存
    const triggerAutoSave = () => {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer)
      }
      autoSaveTimer = setTimeout(async () => {
        await performSave()
      }, 30000) // 30秒后自动保存
    }

    // 执行保存
    const performSave = async () => {
      try {
        await saveDraft(formData)
        emit('save-success')
      } catch (error) {
        emit('save-error')
        console.error('Save error:', error)
      }
    }

    // 表单更新处理
    const handleFormUpdate = (updates) => {
      Object.assign(formData, updates)
      triggerAutoSave()
      // 计算并更新进度
      updateProgress()
    }

    // 计算进度
    const updateProgress = () => {
      const progress = {
        tab0: '-',
        tab1: calculateTab1Progress(),
        tab2: calculateTab2Progress(),
        tab3: calculateTab3Progress(),
        tab4: calculateTab4Progress(),
        tab5: calculateTab5Progress(),
        tab6: calculateTab6Progress()
      }
      emit('progress-update', progress)
    }

    // Tab1进度计算
    const calculateTab1Progress = () => {
      let completed = 0
      const total = 10
      if (formData.accountInfo?.mainAccount) completed++
      if (formData.accountInfo?.bookingPhone) completed++
      if (formData.storeBasicInfo?.storeName) completed++
      if (formData.storeBasicInfo?.storeAddress) completed++
      if (formData.storeBasicInfo?.roomCount) completed++
      if (formData.storeBasicInfo?.openingYear) completed++
      if (formData.storeBasicInfo?.storeDescription?.length >= 200) completed++
      return completed === total ? `✓` : `${completed}/${total}`
    }

    // Tab2进度计算（简化版）
    const calculateTab2Progress = () => {
      let completed = 0
      const total = 8
      // 这里应该有详细的计算逻辑，暂时简化
      return `${completed}/${total}`
    }

    // Tab3进度计算（简化版）
    const calculateTab3Progress = () => {
      let completed = 0
      const total = 12
      return `${completed}/${total}`
    }

    // Tab4进度计算（简化版）
    const calculateTab4Progress = () => {
      let completed = 0
      const total = 6
      return `${completed}/${total}`
    }

    // Tab5进度计算（支付结算）
    const calculateTab5Progress = () => {
      let completed = 0
      const total = 20
      // 简化计算，实际应该检查所有字段
      return `${completed}/${total}`
    }

    // Tab6进度计算（房型设置）
    const calculateTab6Progress = () => {
      const total = 1
      const hasRooms = formData.roomTypes?.length > 0
      const roomCountMatch = formData.roomTypes?.reduce((sum, r) => sum + (r.roomCount || 0), 0) === formData.storeBasicInfo?.roomCount
      const completed = (hasRooms && roomCountMatch) ? 1 : 0
      return completed === total ? `✓` : `${completed}/${total}`
    }

    // 监听activeTab变化
    watch(
      () => props.activeTab,
      () => {
        if (props.activeTab !== 'tab0') {
          updateProgress()
        }
      }
    )

    // 验证当前Tab
    const validateCurrentTab = async () => {
      const currentTab = props.activeTab

      // Tab1验证
      if (currentTab === 'tab1') {
        // 检查门店亮点是否至少选择3项
        const highlights = formData.storeDisplay?.highlights || []
        if (highlights.length < 3) {
          root.$message.error('门店亮点至少需要选择3项')
          return false
        }

        // 检查其他必填项
        if (!formData.accountInfo?.mainAccount) {
          root.$message.error('请填写主账号')
          return false
        }
        if (!formData.accountInfo?.bookingPhone) {
          root.$message.error('请填写预订电话')
          return false
        }
        if (!formData.storeBasicInfo?.storeName) {
          root.$message.error('请填写门店名称')
          return false
        }
        if (!formData.storeBasicInfo?.storeAddress) {
          root.$message.error('请填写详细地址')
          return false
        }
        if (!formData.storeBasicInfo?.roomCount) {
          root.$message.error('请填写房间数量')
          return false
        }
        if (!formData.storeBasicInfo?.openingYear) {
          root.$message.error('请填写开业时间')
          return false
        }
        if (!formData.storeBasicInfo?.storeDescription || formData.storeBasicInfo.storeDescription.length < 200) {
          root.$message.error('门店介绍至少需要200字')
          return false
        }
      }

      // TODO: 添加Tab2-6的验证逻辑

      return true
    }

    onMounted(() => {
      loadDraft()
      updateProgress()
    })

    onBeforeUnmount(() => {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer)
      }
    })

    return {
      formData,
      handleFormUpdate,
      validateCurrentTab
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.form-content {
  // 无额外样式，由各Tab组件自己控制样式
}
</style>
