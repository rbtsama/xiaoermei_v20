<template>
  <a-modal
    :visible="visible"
    :title="mode === 'create' ? '创建活动' : '编辑活动'"
    width="720px"
    :confirm-loading="loading"
    @ok="handleSubmit"
    @cancel="handleClose"
    ok-text="确认"
    cancel-text="取消"
  >
    <a-form-model
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
    >
      <!-- 活动名称 -->
      <a-form-model-item label="活动名称" prop="name">
        <a-input
          v-model="form.name"
          placeholder="例如：春节新春大促、会员日专属福利"
          :maxLength="50"
        />
        <div class="field-hint">最多50个字符</div>
      </a-form-model-item>

      <!-- 活动时间 -->
      <a-form-model-item label="活动时间" prop="timeRange">
        <a-range-picker
          v-model="form.timeRange"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          style="width: 100%"
          :placeholder="['开始日期', '结束日期']"
        />
        <div class="field-hint">活动状态根据时间自动流转（开始日期0点至结束日期23:59）</div>
      </a-form-model-item>

      <!-- 活动规则 -->
      <a-form-model-item label="活动规则" prop="rules">
        <a-textarea
          v-model="form.rules"
          placeholder="活动期间，凡通过专属二维码预订的订单，均可享受专属优惠券。每个会员限领1次..."
          :rows="5"
          :maxLength="500"
        />
        <div class="char-count">{{ (form.rules || '').length }}/500</div>
      </a-form-model-item>

      <!-- 参与条件（会员等级多选） -->
      <a-form-model-item label="参与条件" prop="participationConditions">
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

      <!-- 派发优惠券 -->
      <a-form-model-item label="派发优惠券" prop="couponIds">
        <a-select
          v-model="form.couponIds"
          mode="multiple"
          placeholder="请选择要派发的优惠券"
          style="width: 100%"
          :max-tag-count="3"
        >
          <a-select-option
            v-for="coupon in enabledCoupons"
            :key="coupon.id"
            :value="coupon.id"
          >
            {{ coupon.name }} ({{ getCouponContent(coupon) }})
          </a-select-option>
        </a-select>
        <div class="field-hint">可选择多个优惠券，用户扫码后全部发放</div>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, onMounted } from '@vue/composition-api'
import ActivityService from '../services/activity.service'
import CouponService from '../../CouponManagement/services/coupon.service'
import type { Activity } from '../types/activity.types'
import type { Coupon } from '../../CouponManagement/types/coupon.types'

// VIP等级列表
const VIP_LEVELS = [
  { id: 'VIP0', name: '注册会员' },
  { id: 'VIP1', name: 'VIP1' },
  { id: 'VIP2', name: 'VIP2' },
  { id: 'VIP3', name: 'VIP3' }
]

export default defineComponent({
  name: 'CreateActivityDialog',

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String as () => 'create' | 'edit',
      required: true
    },
    activity: {
      type: Object as () => Activity | null,
      default: null
    }
  },

  setup(props, { emit, root }) {
    const loading = ref(false)
    const formRef = ref<any>(null)
    const vipLevels = ref(VIP_LEVELS)
    const enabledCoupons = ref<Coupon[]>([])

    // 表单数据
    const form = reactive({
      name: '',
      timeRange: undefined as [string, string] | undefined,
      rules: '',
      participationConditions: [] as string[],
      couponIds: [] as string[]
    })

    // 表单验证规则
    const rules = reactive({
      name: [
        { required: true, message: '请输入活动名称', trigger: 'blur' },
        { max: 50, message: '名称不能超过50字符', trigger: 'blur' }
      ],
      timeRange: [
        { required: true, message: '请选择活动时间', trigger: 'change', type: 'array' }
      ],
      rules: [
        { required: true, message: '请输入活动规则', trigger: 'blur' },
        { max: 500, message: '规则不能超过500字符', trigger: 'blur' }
      ],
      participationConditions: [
        { required: true, message: '请选择参与条件', trigger: 'change', type: 'array' },
        { type: 'array', min: 1, message: '至少选择一个会员等级', trigger: 'change' }
      ],
      couponIds: [
        { required: true, message: '请选择派发优惠券', trigger: 'change', type: 'array' },
        { type: 'array', min: 1, message: '至少选择一个优惠券', trigger: 'change' }
      ]
    })

    // ==================== 工具函数 ====================

    /**
     * 获取优惠券内容描述
     */
    const getCouponContent = (coupon: Coupon): string => {
      if (coupon.type === 'full_reduction') {
        return `满${coupon.threshold}减${coupon.amount}`
      } else if (coupon.type === 'discount') {
        return `${coupon.discount}折，最高${coupon.maxDiscount}元`
      } else if (coupon.type === 'instant_reduction') {
        return `立减${coupon.amount}元`
      }
      return '-'
    }

    /**
     * 会员等级切换
     */
    const handleVipLevelToggle = (levelId: string) => {
      const index = form.participationConditions.indexOf(levelId)
      if (index > -1) {
        form.participationConditions.splice(index, 1)
      } else {
        form.participationConditions.push(levelId)
      }
    }

    /**
     * 加载已启用的优惠券
     */
    const loadEnabledCoupons = async () => {
      try {
        const coupons = await CouponService.getEnabledCoupons()
        enabledCoupons.value = coupons
      } catch (error) {
        console.error('加载优惠券失败:', error)
      }
    }

    /**
     * 重置表单
     */
    const resetForm = () => {
      form.name = ''
      form.timeRange = undefined
      form.rules = ''
      form.participationConditions = []
      form.couponIds = []
      formRef.value?.resetFields()
    }

    // ==================== 事件处理 ====================

    /**
     * 提交表单
     */
    const handleSubmit = async () => {
      try {
        await formRef.value?.validate()

        loading.value = true

        // 将日期补充为完整时间：开始日期00:00:00，结束日期23:59:59
        const activityData: any = {
          name: form.name,
          startTime: `${form.timeRange![0]} 00:00:00`,
          endTime: `${form.timeRange![1]} 23:59:59`,
          rules: form.rules,
          participationConditions: form.participationConditions,
          couponIds: form.couponIds
        }

        if (props.mode === 'create') {
          await ActivityService.createActivity(activityData)
          root.$message.success('活动创建成功')
        } else {
          if (!props.activity) return
          await ActivityService.updateActivity(props.activity.id, activityData)
          root.$message.success('活动更新成功')
        }

        emit('close')
        emit('success')
      } catch (error: any) {
        console.error('提交失败:', error)
        root.$message.error(error.message || '操作失败，请重试')
      } finally {
        loading.value = false
      }
    }

    /**
     * 关闭弹窗
     */
    const handleClose = () => {
      emit('close')
    }

    // ==================== 监听器 ====================

    // 监听activity变化，更新表单（编辑模式）
    watch(() => props.activity, (newActivity) => {
      if (newActivity && props.mode === 'edit') {
        form.name = newActivity.name
        // 将完整时间格式转换为日期格式（YYYY-MM-DD HH:mm:ss -> YYYY-MM-DD）
        form.timeRange = [
          newActivity.startTime.split(' ')[0],
          newActivity.endTime.split(' ')[0]
        ]
        form.rules = newActivity.rules
        form.participationConditions = [...newActivity.participationConditions]
        form.couponIds = [...newActivity.couponIds]
      }
    }, { immediate: true })

    // 监听visible变化，重置表单
    watch(() => props.visible, (visible) => {
      if (!visible) {
        resetForm()
      } else {
        if (props.mode === 'create') {
          resetForm()
        }
        // 加载优惠券列表
        loadEnabledCoupons()
      }
    })

    // ==================== 生命周期 ====================

    onMounted(() => {
      loadEnabledCoupons()
    })

    // ==================== 返回暴露的属性和方法 ====================

    return {
      loading,
      formRef,
      form,
      rules,
      vipLevels,
      enabledCoupons,
      getCouponContent,
      handleVipLevelToggle,
      handleSubmit,
      handleClose
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.field-hint {
  font-size: @font-size-xs;
  color: @text-secondary;
  margin-top: 4px;
  line-height: 1.4;
}

.char-count {
  text-align: right;
  font-size: @font-size-xs;
  color: @text-secondary;
  margin-top: 8px;
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
    transition: @transition-base;

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
