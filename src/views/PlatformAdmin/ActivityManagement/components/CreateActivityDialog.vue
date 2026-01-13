<template>
  <a-modal
    :visible="visible"
    :title="mode === 'create' ? '创建活动' : '编辑活动'"
    width="1000px"
    @cancel="handleCancel"
    @ok="handleSubmit"
    :confirmLoading="isSubmitting"
    :maskClosable="false"
  >
    <a-form-model
      ref="formRef"
      :model="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      :rules="formRules"
    >
      <!-- 基本信息 -->
      <div class="form-section">
        <div class="section-title">基本信息</div>
        <a-form-model-item label="活动名称" prop="name" required>
          <a-input
            v-model="form.name"
            placeholder="请输入活动名称"
            :maxLength="50"
          />
        </a-form-model-item>

        <a-form-model-item label="活动时间" prop="timeRange" required>
          <a-range-picker
            v-model="form.timeRange"
            format="YYYY-MM-DD"
            valueFormat="YYYY-MM-DD"
            style="width: 100%"
            :disabled-date="disabledDate"
          />
        </a-form-model-item>

        <a-form-model-item label="会员等级" prop="participationConditions" required>
          <div class="checkbox-grid-5col">
            <a-checkbox
              v-for="level in vipLevels"
              :key="level.id"
              :checked="form.participationConditions.includes(level.id)"
              @change="handleVipLevelToggle(level.id)"
            >
              {{ level.name }}
            </a-checkbox>
          </div>
          <div class="field-hint">选择可参与活动的会员等级</div>
        </a-form-model-item>
      </div>

      <div class="section-divider"></div>

      <!-- 策略配置 -->
      <div class="form-section">
        <div class="section-title">策略配置</div>

        <a-form-model-item label="平台预算（元）" prop="platformBudget" required>
          <a-input-number
            v-model="form.platformBudget"
            :min="0"
            :max="10000000"
            :precision="0"
            style="width: 100%"
            placeholder="请输入平台预算"
          />
        </a-form-model-item>
        <a-form-model-item label="优惠策略" required>
          <div class="strategies-container">
            <div
              v-for="(strategy, index) in form.strategies"
              :key="index"
              class="strategy-item"
            >
              <div class="strategy-row">
                <div class="strategy-name-display">{{ strategy.name }}</div>
                <span class="field-label">平台补贴挂牌价的比例</span>
                <a-input-number
                  v-model="strategy.platformDiscount"
                  :min="0"
                  :max="100"
                  :precision="2"
                  style="width: 120px"
                >
                  <template slot="addonAfter">%</template>
                </a-input-number>
                <span class="field-label">商户补贴挂牌价的比例</span>
                <a-input-number
                  v-model="strategy.merchantDiscount"
                  :min="0"
                  :max="100"
                  :precision="2"
                  style="width: 120px"
                >
                  <template slot="addonAfter">%</template>
                </a-input-number>
                <a-button
                  type="danger"
                  size="small"
                  @click="handleRemoveStrategy(index)"
                  :disabled="index === 0"
                >
                  <a-icon type="delete" />删除
                </a-button>
              </div>
            </div>
            <a-button
              type="dashed"
              block
              @click="handleAddStrategy"
              class="add-btn"
            >
              <a-icon type="plus" />增加策略
            </a-button>
          </div>
        </a-form-model-item>
      </div>

      <div class="section-divider"></div>

      <!-- 预订限制 -->
      <div class="form-section">
        <div class="section-title">预订限制</div>

        <a-form-model-item label="适用门店" required>
          <a-input
            :value="getStoreDisplayText()"
            placeholder="请选择适用门店"
            read-only
            @click="showStoreDialog = true"
            style="cursor: pointer"
          >
            <a-icon slot="suffix" type="shop" />
          </a-input>
          <div class="field-hint">点击选择适用门店</div>
        </a-form-model-item>

        <a-form-model-item label="入住日期限制" required>
          <div class="restrictions-container">
            <div
              v-for="(restriction, index) in form.bookingRestrictions"
              :key="index"
              class="restriction-item"
            >
              <div class="restriction-row">
                <a-range-picker
                  v-model="restriction.dateRange"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  :placeholder="['开始日期', '结束日期']"
                  style="width: 380px"
                  @change="() => validateDateOverlap(index)"
                />
                <span class="field-label">补贴策略</span>
                <a-select
                  v-model="restriction.strategyName"
                  placeholder="选择策略"
                  style="width: 180px"
                >
                  <a-select-option
                    v-for="strategy in form.strategies"
                    :key="strategy.name"
                    :value="strategy.name"
                  >
                    {{ strategy.name }}
                  </a-select-option>
                </a-select>
                <a-button
                  type="danger"
                  size="small"
                  @click="handleRemoveRestriction(index)"
                  :disabled="form.bookingRestrictions.length === 1"
                >
                  <a-icon type="delete" />删除
                </a-button>
              </div>
              <div v-if="restriction.dateError" class="error-hint">
                {{ restriction.dateError }}
              </div>
            </div>
            <a-button
              type="dashed"
              block
              @click="handleAddRestriction"
              class="add-btn"
            >
              <a-icon type="plus" />增加限制
            </a-button>
          </div>
        </a-form-model-item>
      </div>
    </a-form-model>

    <!-- 门店选择对话框 -->
    <StoreSelectDialog
      :visible="showStoreDialog"
      :value="form.applicableStores"
      @confirm="handleStoreChange"
      @cancel="showStoreDialog = false"
    />
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, PropType } from '@vue/composition-api'
import StoreSelectDialog from './StoreSelectDialog.vue'
import ActivityService from '../services/activity.service'
import { getStoreNamesByIds } from '../services/mocks/store.mock'
import type { Activity, DiscountStrategy, BookingRestriction } from '../types/activity.types'
import dayjs from 'dayjs'

interface FormData {
  name: string
  timeRange: [string, string] | undefined
  participationConditions: string[]
  platformBudget: number
  remainingBudget: number
  strategies: DiscountStrategy[]
  applicableStores: string[]
  bookingRestrictions: (BookingRestriction & { dateError?: string })[]
}


// VIP等级列表
const VIP_LEVELS = [
  { id: 'VIP0', name: '注册会员' },
  { id: 'VIP1', name: 'VIP1' },
  { id: 'VIP2', name: 'VIP2' },
  { id: 'VIP3', name: 'VIP3' },
  { id: 'VIP4', name: 'VIP4' },
  { id: 'VIP5', name: 'VIP5' },
  { id: 'VIP6', name: 'VIP6' },
  { id: 'VIP7', name: 'VIP7' },
  { id: 'VIP8', name: 'VIP8' },
  { id: 'VIP9', name: 'VIP9' }
]

export default defineComponent({
  name: 'CreateActivityDialog',
  components: {
    StoreSelectDialog
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    mode: {
      type: String,
      default: 'create'
    },
    activity: {
      type: Object,
      default: () => null
    }
  },
  setup(props, { emit }) {
    const formRef = ref<any>(null)
    const vipLevels = ref(VIP_LEVELS)
    const isSubmitting = ref(false)
    const showStoreDialog = ref(false)

    const form = reactive<FormData>({
      name: '',
      timeRange: undefined,
      participationConditions: [],
      platformBudget: 0,
      remainingBudget: 0,
      strategies: [
        {
          name: '策略1',
          platformDiscount: 0,
          merchantDiscount: 0
        }
      ],
      applicableStores: [],
      bookingRestrictions: [
        {
          dateRange: undefined,
          strategyName: '',
          dateError: ''
        }
      ]
    })

    const formRules = {
      name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
      timeRange: [{ required: true, message: '请选择活动时间', trigger: 'change' }],
      participationConditions: [
        { required: true, message: '请选择参与条件', trigger: 'change', type: 'array' },
        { type: 'array', min: 1, message: '至少选择一个会员等级', trigger: 'change' }
      ],
      platformBudget: [{ required: true, message: '请输入平台预算', trigger: 'blur' }]
    }

    // 禁用过去的日期
    function disabledDate(current: any): boolean {
      return current && current < dayjs().startOf('day')
    }

    // 获取门店显示文本
    function getStoreDisplayText(): string {
      if (form.applicableStores.length === 0) {
        return ''
      }
      const names = getStoreNamesByIds(form.applicableStores)
      return names.join('、')
    }


    // 会员等级切换
    function handleVipLevelToggle(levelId: string): void {
      const index = form.participationConditions.indexOf(levelId)
      if (index > -1) {
        form.participationConditions.splice(index, 1)
      } else {
        form.participationConditions.push(levelId)
      }
    }

    // 添加策略
    function handleAddStrategy(): void {
      const nextNumber = form.strategies.length + 1
      form.strategies.push({
        name: `策略${nextNumber}`,
        platformDiscount: 0,
        merchantDiscount: 0
      })
    }

    // 删除策略
    function handleRemoveStrategy(index: number): void {
      if (form.strategies.length === 1) {
        return
      }

      const strategyId = form.strategies[index].id
      const isReferenced = form.bookingRestrictions.some(
        (restriction) => restriction.strategyId === strategyId
      )

      if (isReferenced) {
        ;(window as any).$message.warning('该策略已被日期限制引用，无法删除')
        return
      }

      form.strategies.splice(index, 1)
    }

    // 添加限制
    function handleAddRestriction(): void {
      form.bookingRestrictions.push({
        dateRange: undefined,
        strategyName: '',
        dateError: ''
      })
    }

    // 删除限制
    function handleRemoveRestriction(index: number): void {
      if (form.bookingRestrictions.length === 1) {
        return
      }
      form.bookingRestrictions.splice(index, 1)
    }

    // 校验日期重叠
    function validateDateOverlap(index: number): void {
      const current = form.bookingRestrictions[index]

      // 清除当前错误
      current.dateError = undefined

      if (!current.dateRange || !current.dateRange[0] || !current.dateRange[1]) {
        return
      }

      const currentStart = dayjs(current.dateRange[0])
      const currentEnd = dayjs(current.dateRange[1])

      // 检查开始日期是否大于结束日期
      if (currentStart.isAfter(currentEnd)) {
        current.dateError = '开始日期不能晚于结束日期'
        return
      }

      // 检查是否与其他日期限制重叠
      for (let i = 0; i < form.bookingRestrictions.length; i++) {
        if (i === index) continue

        const other = form.bookingRestrictions[i]
        if (!other.startDate || !other.endDate) continue

        const otherStart = dayjs(other.dateRange[0])
        const otherEnd = dayjs(other.dateRange[1])

        // 检查日期范围是否重叠
        const isOverlap =
          (currentStart.isSameOrBefore(otherEnd) && currentEnd.isSameOrAfter(otherStart)) ||
          (otherStart.isSameOrBefore(currentEnd) && otherEnd.isSameOrAfter(currentStart))

        if (isOverlap) {
          current.dateError = `日期范围与限制${i + 1}重叠`
          return
        }
      }
    }

    // 处理门店选择
    function handleStoreChange(storeIds: string[]): void {
      form.applicableStores = storeIds
      showStoreDialog.value = false
    }

    // 表单提交
    async function handleSubmit(): Promise<void> {
      // 校验表单基本信息
      const isValid = await new Promise((resolve) => {
        formRef.value.validate((valid: boolean) => {
          resolve(valid)
        })
      })

      if (!isValid) {
        return
      }

      // 校验门店
      if (form.applicableStores.length === 0) {
        ;(window as any).$message.warning('请选择适用门店')
        return
      }

      // 校验策略
      const hasInvalidStrategy = form.strategies.some(
        (strategy) =>
          !strategy.name ||
          strategy.platformDiscount === undefined ||
          strategy.merchantDiscount === undefined
      )

      if (hasInvalidStrategy) {
        ;(window as any).$message.warning('请完善所有策略信息')
        return
      }

      // 校验日期限制
      const hasInvalidRestriction = form.bookingRestrictions.some(
        (restriction) =>
          !restriction.dateRange ||
          !restriction.dateRange[0] ||
          !restriction.dateRange[1] ||
          !restriction.strategyName ||
          restriction.dateError
      )

      if (hasInvalidRestriction) {
        ;(window as any).$message.warning('请完善所有日期限制信息，并确保日期无重叠')
        return
      }

      // 构建提交数据
      const activityData: Partial<Activity> = {
        name: form.name,
        startDate: form.timeRange![0],
        endDate: form.timeRange![1],
        platformBudget: form.platformBudget,
        remainingBudget: form.remainingBudget,
        strategies: form.strategies.map((s) => ({
          id: s.id,
          name: s.name,
          platformDiscount: s.platformDiscount,
          merchantDiscount: s.merchantDiscount
        })),
        applicableStores: form.applicableStores,
        bookingRestrictions: form.bookingRestrictions.map((r) => ({
          dateRange: r.dateRange,
          strategyName: r.strategyName
        }))
      }

      try {
        isSubmitting.value = true

        if (props.mode === 'create') {
          await ActivityService.createActivity(activityData)
          ;(window as any).$message.success('活动创建成功')
        } else if (props.activity) {
          await ActivityService.updateActivity(props.activity.id, activityData)
          ;(window as any).$message.success('活动更新成功')
        }

        emit('success')
        handleCancel()
      } catch (error) {
        console.error('提交失败:', error)
        ;(window as any).$message.error('操作失败，请重试')
      } finally {
        isSubmitting.value = false
      }
    }

    // 取消
    function handleCancel(): void {
      emit('close')
      resetForm()
    }

    // 重置表单
    function resetForm(): void {
      form.name = ''
      form.timeRange = undefined
      form.participationConditions = []
      form.platformBudget = 0
      form.remainingBudget = 0
      form.strategies = [
        {
          name: '策略1',
          platformDiscount: 0,
          merchantDiscount: 0
        }
      ]
      form.applicableStores = []
      form.bookingRestrictions = [
        {
          dateRange: undefined,
          strategyName: '',
          dateError: ''
        }
      ]

      if (formRef.value) {
        formRef.value.clearValidate()
      }
    }

    // 监听activity变化，编辑模式下填充数据
    watch(
      () => props.activity,
      (newActivity) => {
        if (newActivity && props.mode === 'edit' && props.visible) {
          form.name = newActivity.name
          form.timeRange = [newActivity.startTime.split(' ')[0], newActivity.endTime.split(' ')[0]]
          form.participationConditions = [...newActivity.participationConditions]
          form.platformBudget = newActivity.platformBudget
          form.remainingBudget = newActivity.remainingBudget
          form.strategies = newActivity.strategies.map((s) => ({ ...s }))
          form.applicableStores = [...newActivity.applicableStores]
          form.bookingRestrictions = newActivity.bookingRestrictions.map((r) => ({
            ...r,
            dateError: undefined
          }))
        }
      },
      { immediate: true }
    )

    // 监听visible变化，关闭时重置表单
    watch(
      () => props.visible,
      (newVisible) => {
        if (!newVisible) {
          setTimeout(() => {
            resetForm()
          }, 300)
        }
      }
    )

    return {
      formRef,
      isSubmitting,
      showStoreDialog,
      vipLevels,
      form,
      formRules,
      disabledDate,
      getStoreDisplayText,
      handleVipLevelToggle,
      handleAddStrategy,
      handleRemoveStrategy,
      handleAddRestriction,
      handleRemoveRestriction,
      validateDateOverlap,
      handleStoreChange,
      handleSubmit,
      handleCancel
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.form-section {
  margin-bottom: 24px;

  .section-title {
    font-size: @font-size-lg;
    font-weight: @font-weight-semibold;
    color: @text-primary;
    padding-left: 12px;
    border-left: 3px solid @brand-primary;
    margin-bottom: 20px;
  }
}

.section-divider {
  height: 1px;
  background: @border-primary;
  margin: 24px 0;
}

.field-hint {
  font-size: @font-size-xs;
  color: @text-secondary;
  margin-top: 4px;
  line-height: 1.4;
}

.error-hint {
  font-size: @font-size-xs;
  color: @error-color;
  margin-top: 4px;
  line-height: 1.4;
}

.strategies-container,
.restrictions-container {
  background: @bg-secondary;
  border-radius: @border-radius-base;
  padding: 16px;
}

.strategy-item,
.restriction-item {
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 16px;
  }
}

.strategy-row,
.restriction-row {
  display: flex;
  gap: 12px;
  align-items: center;
}

.strategy-name-display {
  font-size: @font-size-sm;
  color: @text-primary;
  font-weight: @font-weight-medium;
  min-width: 80px;
}

.field-label {
  font-size: @font-size-sm;
  color: @text-secondary;
  white-space: nowrap;
}

.add-btn {
  color: @brand-primary;
  border-color: @brand-primary;
  border-style: dashed;
  border-radius: @border-radius-base;

  &:hover {
    color: @brand-primary-hover;
    border-color: @brand-primary-hover;
  }
}

:deep(.ant-input),
:deep(.ant-input-number),
:deep(.ant-select-selector),
:deep(.ant-picker) {
  border-radius: @border-radius-base;
}

:deep(.ant-btn) {
  border-radius: @border-radius-base;
}

:deep(.ant-modal-body) {
  max-height: 70vh;
  overflow-y: auto;
}

// 会员等级多选网格（5列）
.checkbox-grid-5col {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px 16px;

  :deep(.ant-checkbox-wrapper) {
    padding: 10px 12px;
    border: 1px solid @border-primary;
    border-radius: @border-radius-base;
    transition: all 0.2s;

    &:hover {
      border-color: @brand-primary;
      background: rgba(59, 130, 246, 0.05);
    }

    .ant-checkbox {
      margin-right: 6px;
    }
  }
}

</style>
