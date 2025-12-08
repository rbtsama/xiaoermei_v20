<template>
  <sidebar>
    <div class="h-screen overflow-y-auto bg-secondary">
      <div class="max-w-7xl mx-auto p-8 space-y-8">
        <!-- 页面标题 -->
        <div class="flex items-center justify-between">
          <h1 class="page-title">会员折扣设置</h1>
          <div class="flex gap-2">
            <a-button v-if="!isEditMode" type="primary" class="action-btn" @click="handleEditToggle">
              编辑
            </a-button>
            <template v-else>
              <a-button class="cancel-btn" @click="handleCancel">取消</a-button>
              <a-button type="primary" class="action-btn" @click="handleSave">保存</a-button>
            </template>
          </div>
        </div>

        <!-- 折扣配置表格 -->
        <a-card :bordered="false" class="discount-card">
          <a-table
            :columns="columns"
            :data-source="config.discounts"
            :pagination="false"
            :loading="loading"
            row-key="id"
          >
            <!-- 等级 -->
            <template #levelName="{ text }">
              <span class="level-name">{{ text }}</span>
            </template>

            <!-- 平台折扣 -->
            <template #platformDiscount="{ text }">
              <span class="platform-discount">{{ formatPercent(text) }}</span>
            </template>

            <!-- 周一到周日和节假日 - 动态生成 -->
            <template
              v-for="day in ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'holiday']"
              #[`${day}Discount`]="{ text, record }"
            >
              <div :key="day" class="flex items-center justify-center gap-1">
                <a-input-number
                  v-model="record[`${day}Discount`]"
                  :min="0"
                  :max="record.platformDiscount"
                  :step="0.01"
                  :precision="2"
                  :disabled="!isEditMode"
                  :class="!isEditMode ? 'input-readonly' : ''"
                  style="width: 70px"
                  size="small"
                />
              </div>
            </template>
          </a-table>
        </a-card>

        <!-- 说明 -->
        <a-card :bordered="false" class="instruction-card">
          <div class="instruction-content">
            <p class="instruction-title">配置说明：</p>
            <ul class="instruction-list">
              <li>平台折扣：平台设定的会员折扣，商户必须接受，不可拒绝</li>
              <li>本店折扣：商户可针对<strong>每周7天 + 节假日</strong>分别设置更优惠的折扣（必须 ≤ 平台折扣）</li>
              <li>节假日折扣优先级最高：当日期为节假日时，优先使用节假日折扣，否则使用对应星期的折扣</li>
              <li>折扣值越小越优惠（如0.80比0.95更优惠）</li>
              <li>输入框最大值自动限制为平台折扣，确保不会超出范围</li>
            </ul>
          </div>
        </a-card>
      </div>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import { getMerchantVIPDiscountConfig, saveMerchantVIPDiscountConfig } from '@/api/memberService'
import { message } from 'ant-design-vue'

export default defineComponent({
  name: 'VIPDiscountConfigPage',
  components: { Sidebar },
  setup() {
    const loading = ref(false)
    const isEditMode = ref(false)
    const config = reactive({
      storeId: '',
      storeName: '',
      discounts: []
    })
    const originalConfig = ref(null)

    const columns = [
      { title: '等级', dataIndex: 'levelName', key: 'levelName', width: 80, slots: { customRender: 'levelName' } },
      { title: '平台折扣', dataIndex: 'platformDiscount', key: 'platformDiscount', width: 90, slots: { customRender: 'platformDiscount' } },
      { title: '周一', dataIndex: 'mondayDiscount', key: 'mondayDiscount', align: 'center', slots: { customRender: 'mondayDiscount' } },
      { title: '周二', dataIndex: 'tuesdayDiscount', key: 'tuesdayDiscount', align: 'center', slots: { customRender: 'tuesdayDiscount' } },
      { title: '周三', dataIndex: 'wednesdayDiscount', key: 'wednesdayDiscount', align: 'center', slots: { customRender: 'wednesdayDiscount' } },
      { title: '周四', dataIndex: 'thursdayDiscount', key: 'thursdayDiscount', align: 'center', slots: { customRender: 'thursdayDiscount' } },
      { title: '周五', dataIndex: 'fridayDiscount', key: 'fridayDiscount', align: 'center', slots: { customRender: 'fridayDiscount' } },
      { title: '周六', dataIndex: 'saturdayDiscount', key: 'saturdayDiscount', align: 'center', slots: { customRender: 'saturdayDiscount' } },
      { title: '周日', dataIndex: 'sundayDiscount', key: 'sundayDiscount', align: 'center', slots: { customRender: 'sundayDiscount' } },
      {
        title: '节日(优先)',
        dataIndex: 'holidayDiscount',
        key: 'holidayDiscount',
        align: 'center',
        customHeaderCell: () => ({ style: { backgroundColor: '#dbeafe' } }),
        customCell: () => ({ style: { backgroundColor: '#eff6ff' } }),
        slots: { customRender: 'holidayDiscount' }
      }
    ]

    const fetchConfig = async () => {
      loading.value = true
      try {
        const data = await getMerchantVIPDiscountConfig()
        config.storeId = data.storeId
        config.storeName = data.storeName
        config.discounts = data.discounts
        originalConfig.value = JSON.parse(JSON.stringify(data))
      } catch (error) {
        message.error('获取VIP折扣配置失败')
        console.error(error)
      } finally {
        loading.value = false
      }
    }

    const handleEditToggle = () => {
      isEditMode.value = true
    }

    const handleCancel = () => {
      isEditMode.value = false
      if (originalConfig.value) {
        config.storeId = originalConfig.value.storeId
        config.storeName = originalConfig.value.storeName
        config.discounts = JSON.parse(JSON.stringify(originalConfig.value.discounts))
      }
    }

    const handleSave = async () => {
      try {
        await saveMerchantVIPDiscountConfig(config)
        message.success('保存成功')
        isEditMode.value = false
        originalConfig.value = JSON.parse(JSON.stringify(config))
      } catch (error) {
        message.error('保存失败')
        console.error(error)
      }
    }

    const formatPercent = (value) => {
      return `${Math.round(value * 100)}%`
    }

    onMounted(() => {
      fetchConfig()
    })

    return {
      loading,
      isEditMode,
      config,
      columns,
      handleEditToggle,
      handleCancel,
      handleSave,
      formatPercent
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.bg-secondary {
  background-color: @bg-secondary;
}

.page-title {
  font-size: @font-size-2xl;
  font-weight: @font-weight-bold;
  color: @text-primary;
}

.action-btn {
  height: 36px;
  background-color: @brand-primary;
  border-color: @brand-primary;
  color: #ffffff;
  font-weight: @font-weight-medium;
  box-shadow: @shadow-sm;
  transition: @transition-base;

  &:hover {
    background-color: @brand-primary-hover;
    border-color: @brand-primary-hover;
  }
}

.cancel-btn {
  height: 36px;
  border-color: @border-secondary;
  color: @text-primary;
  font-weight: @font-weight-medium;
  transition: @transition-base;

  &:hover {
    border-color: @border-focus;
    color: @brand-primary;
  }
}

.discount-card {
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;

  :deep(.ant-card-body) {
    padding: 0;
  }
}

.instruction-card {
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;
}

.instruction-content {
  font-size: @font-size-sm;
  color: @text-secondary;
}

.instruction-title {
  font-weight: @font-weight-medium;
  color: @text-primary;
  margin-bottom: 8px;
}

.instruction-list {
  list-style: disc;
  list-style-position: inside;
  margin-left: 8px;

  li {
    margin-bottom: 4px;
  }
}

.level-name {
  font-weight: @font-weight-medium;
  color: @text-primary;
}

.platform-discount {
  font-size: @font-size-sm;
  font-weight: @font-weight-medium;
  color: @text-primary;
}

:deep(.input-readonly .ant-input-number-input) {
  background-color: @bg-secondary;
  color: @text-secondary;
  cursor: not-allowed;
}

:deep(.input-readonly) {
  border-color: transparent;
}

:deep(.ant-table) {
  .ant-table-thead > tr > th {
    background-color: @bg-secondary;
    color: @text-primary;
    font-weight: @font-weight-semibold;
    border-bottom: 1px solid @border-primary;
    padding: 12px 16px;
  }

  .ant-table-tbody > tr {
    &:hover {
      background-color: @bg-hover;
    }

    > td {
      border-bottom: 1px solid @border-primary;
      padding: 12px 16px;
      color: @text-primary;
    }
  }
}
</style>
