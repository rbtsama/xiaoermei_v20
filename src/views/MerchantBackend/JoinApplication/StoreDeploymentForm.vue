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
      }, 600000) // 10分钟后自动保存
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

    /**
     * 计算并更新所有Tab的进度
     * 进度格式：
     * - "✓" 表示已完成
     * - "3/10" 表示已完成3项，共10项
     * - "0/10" 表示未开始
     */
    const updateProgress = () => {
      const progress = {
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

    // Tab5进度计算（房型设置）
    const calculateTab5Progress = () => {
      const total = 1
      const hasRooms = formData.roomTypes?.length > 0
      const roomCountMatch = formData.roomTypes?.reduce((sum, r) => sum + (r.roomCount || 0), 0) === formData.storeBasicInfo?.roomCount
      const completed = (hasRooms && roomCountMatch) ? 1 : 0
      return completed === total ? `✓` : `${completed}/${total}`
    }

    // Tab6进度计算（支付结算）
    const calculateTab6Progress = () => {
      let completed = 0
      const total = 20
      // 简化计算，实际应该检查所有字段
      return `${completed}/${total}`
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
    /**
     * 验证当前Tab的数据完整性
     * @returns {Promise<boolean>} 验证是否通过
     *
     * 验证规则：
     * - Tab1: 门店亮点≥3项，所有必填字段不为空
     * - Tab3: 必填时间字段 + 所有VIP等级的所有日期折扣都必须在规定范围内
     * - Tab5: 房型总数必须等于门店总房间数（可弹窗确认）
     *
     * 失败时会通过 toast 提示具体错误信息
     */
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
        // 门店介绍为选填，不做字数限制
      }

      // Tab5验证（房型设置）
      if (currentTab === 'tab5') {
        const totalRoomCount = formData.storeBasicInfo?.roomCount || 0
        const configuredCount = (formData.roomTypes || []).reduce((sum, r) => sum + (r.roomCount || 0), 0)

        if (totalRoomCount === 0) {
          root.$message.error('请先在Tab1中填写门店总房间数')
          return false
        }

        if (configuredCount !== totalRoomCount) {
          // 弹窗确认而不是强制禁止提交
          return new Promise((resolve) => {
            root.$confirm({
              title: '房间数量不足',
              content: `酒店共${totalRoomCount}间，已配置${configuredCount}间，是否确定提交？`,
              okText: '确定提交',
              cancelText: '取消',
              onOk: () => {
                resolve(true)
              },
              onCancel: () => {
                resolve(false)
              }
            })
          })
        }
      }

      // Tab3验证（运营政策）
      if (currentTab === 'tab3') {
        const policy = formData.operationPolicy

        // 检查必填时间字段
        if (!policy?.booking?.latestBookingTime) {
          root.$message.error('请设置最晚预订时间')
          return false
        }
        if (!policy?.booking?.checkInTime) {
          root.$message.error('请设置办理入住时间')
          return false
        }
        if (!policy?.booking?.checkOutTime) {
          root.$message.error('请设置最晚退房时间')
          return false
        }

        // 检查会员折扣（必填）
        if (!policy?.vipDiscounts) {
          root.$message.error('请设置会员折扣')
          return false
        }

        // 验证所有VIP等级的折扣是否在范围内
        const vipLevels = [
          { level: 'VIP0', min: 95, max: 100 },
          { level: 'VIP1', min: 90, max: 95 },
          { level: 'VIP2', min: 85, max: 90 },
          { level: 'VIP3', min: 80, max: 85 },
          { level: 'VIP4', min: 75, max: 80 },
          { level: 'VIP5', min: 70, max: 75 },
          { level: 'VIP6', min: 65, max: 70 }
        ]

        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'holiday']
        const dayNames = { monday: '周一', tuesday: '周二', wednesday: '周三', thursday: '周四', friday: '周五', saturday: '周六', sunday: '周日', holiday: '节假日' }

        for (const vipLevel of vipLevels) {
          const levelData = policy.vipDiscounts[vipLevel.level]
          if (!levelData) {
            root.$message.error(`请设置${vipLevel.level}的折扣`)
            return false
          }

          for (const day of days) {
            const value = levelData[day]

            if (value === null || value === undefined || value === '') {
              root.$message.error(`${vipLevel.level} ${dayNames[day]}折扣未填写`)
              return false
            }

            if (value < vipLevel.min || value > vipLevel.max) {
              root.$message.error(`${vipLevel.level} ${dayNames[day]}折扣必须在${vipLevel.min}%-${vipLevel.max}%范围内`)
              return false
            }
          }
        }
      }

      // TODO: 添加Tab2、Tab4、Tab6的验证逻辑

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
