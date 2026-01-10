<template>
  <a-modal
    :visible="visible"
    :title="mode === 'create' ? '创建优惠券' : '编辑优惠券'"
    width="640px"
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
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <!-- 优惠券名称 -->
      <a-form-model-item label="优惠券名称" prop="name">
        <a-input
          v-model="form.name"
          placeholder="例如：新用户专享券、周末特惠券"
          :maxLength="50"
        />
        <div class="field-hint">最多50个字符</div>
      </a-form-model-item>

      <!-- 优惠券类型 - 单选按钮组 -->
      <a-form-model-item label="优惠券类型" prop="type">
        <a-radio-group v-model="form.type" button-style="solid" @change="handleTypeChange">
          <a-radio-button value="full_reduction">满减券</a-radio-button>
          <a-radio-button value="discount">折扣券</a-radio-button>
          <a-radio-button value="instant_reduction">立减券</a-radio-button>
        </a-radio-group>
        <div class="type-hint">
          <span v-if="form.type === 'full_reduction'">满X元减Y元（例如：满300减50）</span>
          <span v-else-if="form.type === 'discount'">打X折，最高优惠Y元（例如：85折，最高优惠100元）</span>
          <span v-else-if="form.type === 'instant_reduction'">直接减Y元（例如：立减30元）</span>
        </div>
      </a-form-model-item>

      <!-- 满减券字段 -->
      <a-row v-if="form.type === 'full_reduction'" :gutter="16">
        <a-col :span="12">
          <a-form-model-item label="使用门槛" prop="threshold" :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
            <a-input-number
              v-model="form.threshold"
              placeholder="300"
              :min="0"
              style="width: 100%"
            >
              <span slot="addonAfter">元</span>
            </a-input-number>
            <div class="field-hint">订单满多少元可用</div>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="减免金额" prop="amount" :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
            <a-input-number
              v-model="form.amount"
              placeholder="50"
              :min="0"
              style="width: 100%"
            >
              <span slot="addonAfter">元</span>
            </a-input-number>
            <div class="field-hint">减免多少元</div>
          </a-form-model-item>
        </a-col>
      </a-row>

      <!-- 折扣券字段 -->
      <a-row v-if="form.type === 'discount'" :gutter="16">
        <a-col :span="12">
          <a-form-model-item label="折扣率" prop="discount" :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
            <a-input-number
              v-model="form.discount"
              placeholder="85"
              :min="1"
              :max="99"
              style="width: 100%"
            >
              <span slot="addonAfter">折</span>
            </a-input-number>
            <div class="field-hint">85表示打8.5折</div>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="最高优惠" prop="maxDiscount" :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
            <a-input-number
              v-model="form.maxDiscount"
              placeholder="100"
              :min="0"
              style="width: 100%"
            >
              <span slot="addonAfter">元</span>
            </a-input-number>
            <div class="field-hint">最多减免金额</div>
          </a-form-model-item>
        </a-col>
      </a-row>

      <!-- 立减券字段 -->
      <template v-if="form.type === 'instant_reduction'">
        <a-form-model-item label="减免金额" prop="amount">
          <a-input-number
            v-model="form.amount"
            placeholder="30"
            :min="0"
            style="width: 200px"
          >
            <span slot="addonAfter">元</span>
          </a-input-number>
          <div class="field-hint">直接减免多少元</div>
        </a-form-model-item>
      </template>

      <!-- 费用承担 - 一行两个字段 -->
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-model-item label="平台承担" prop="platformRatio" :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
            <a-input-number
              v-model="form.platformRatio"
              :min="0"
              :max="100"
              placeholder="50"
              style="width: 100%"
            >
              <span slot="addonAfter">%</span>
            </a-input-number>
            <div class="field-hint">平台承担比例</div>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="商户承担" :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
            <a-input-number
              :value="merchantRatio"
              disabled
              style="width: 100%"
              class="merchant-ratio-input"
            >
              <span slot="addonAfter">%</span>
            </a-input-number>
            <div class="field-hint">自动计算</div>
          </a-form-model-item>
        </a-col>
      </a-row>

      <!-- 有效期类型选择 -->
      <a-form-model-item label="有效期类型" prop="validityType">
        <a-radio-group v-model="form.validityType" @change="handleValidityTypeChange">
          <a-radio value="days">有效天数</a-radio>
          <a-radio value="dateRange">有效日期</a-radio>
        </a-radio-group>
      </a-form-model-item>

      <!-- 有效天数 -->
      <a-form-model-item v-if="form.validityType === 'days'" label="有效天数" prop="validDays">
        <a-input-number
          v-model="form.validDays"
          :min="0"
          placeholder="30"
          style="width: 200px"
        >
          <span slot="addonAfter">天</span>
        </a-input-number>
        <span class="field-hint">发放后N天23:59过期，0表示永久有效</span>
      </a-form-model-item>

      <!-- 有效日期 -->
      <a-form-model-item v-if="form.validityType === 'dateRange'" label="有效日期" prop="validDateRange">
        <a-range-picker
          v-model="form.validDateRange"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          style="width: 100%"
          :show-time="false"
        />
        <span class="field-hint">仅在此日期范围内可用（从开始日期0点到结束日期23:59:59）</span>
      </a-form-model-item>

      <!-- 库存 -->
      <a-form-model-item label="库存" prop="stock" required>
        <a-input-number
          v-model="form.stock"
          :min="0"
          placeholder="请输入库存数量"
          style="width: 200px"
        />
        <div class="field-hint">0为不限制</div>
      </a-form-model-item>

      <!-- 使用规则 -->
      <a-form-model-item label="使用规则" prop="usageRules">
        <a-textarea
          v-model="form.usageRules"
          placeholder="用户可见的使用规则说明，例如：限周末使用、不可与其他优惠同享等"
          :rows="3"
          :maxLength="200"
        />
        <div class="char-count">{{ (form.usageRules || '').length }}/200</div>
      </a-form-model-item>

      <!-- 备注说明 -->
      <a-form-model-item label="备注说明" prop="remark">
        <a-textarea
          v-model="form.remark"
          placeholder="仅后台可见，可用于备注优惠券用途、活动信息等"
          :rows="3"
          :maxLength="200"
        />
        <div class="char-count">{{ (form.remark || '').length }}/200</div>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, watch } from '@vue/composition-api'
import CouponService from '../services/coupon.service'
import type { Coupon, CouponType } from '../types/coupon.types'

export default defineComponent({
  name: 'CouponDialog',

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String as () => 'create' | 'edit',
      required: true
    },
    coupon: {
      type: Object as () => Coupon | null,
      default: null
    }
  },

  setup(props, { emit, root }) {
    const loading = ref(false)
    const formRef = ref<any>(null)

    const form = reactive({
      name: '',
      type: 'full_reduction' as CouponType,
      threshold: undefined as number | undefined,
      amount: undefined as number | undefined,
      discount: undefined as number | undefined,
      maxDiscount: undefined as number | undefined,
      platformRatio: 50,
      validityType: 'days' as 'days' | 'dateRange',
      validDays: 30 as number | undefined,
      validDateRange: undefined as [string, string] | undefined,
      stock: undefined as number | undefined,
      usageRules: '',
      remark: ''
    })

    const rules = reactive({
      name: [
        { required: true, message: '请输入优惠券名称', trigger: 'blur' },
        { max: 50, message: '名称不能超过50字符', trigger: 'blur' }
      ],
      type: [
        { required: true, message: '请选择优惠券类型' }
      ],
      threshold: [
        { required: true, message: '请输入使用门槛', trigger: 'blur', type: 'number' }
      ],
      amount: [
        { required: true, message: '请输入减免金额', trigger: 'blur', type: 'number' }
      ],
      discount: [
        { required: true, message: '请输入折扣率', trigger: 'blur', type: 'number' },
        { type: 'number', min: 1, max: 99, message: '折扣率必须在1-99之间', trigger: 'blur' }
      ],
      maxDiscount: [
        { required: true, message: '请输入最高优惠金额', trigger: 'blur', type: 'number' }
      ],
      platformRatio: [
        { required: true, message: '请输入平台承担比例', type: 'number' },
        { type: 'number', min: 0, max: 100, message: '比例必须在0-100之间' }
      ],
      validityType: [
        { required: true, message: '请选择有效期类型' }
      ],
      stock: [
        { required: true, message: '请输入库存', trigger: 'blur', type: 'number' },
        { type: 'number', min: 0, message: '库存不能小于0', trigger: 'blur' }
      ]
    })

    const merchantRatio = computed(() => 100 - (form.platformRatio || 0))

    // 监听coupon变化，更新表单
    watch(() => props.coupon, (newCoupon) => {
      if (newCoupon && props.mode === 'edit') {
        form.name = newCoupon.name
        form.type = newCoupon.type
        form.threshold = newCoupon.threshold
        form.amount = newCoupon.amount
        form.discount = newCoupon.discount
        form.maxDiscount = newCoupon.maxDiscount
        form.platformRatio = newCoupon.platformRatio

        // 判断有效期类型
        if (newCoupon.validDateRange) {
          form.validityType = 'dateRange'
          form.validDateRange = newCoupon.validDateRange
          form.validDays = undefined
        } else {
          form.validityType = 'days'
          form.validDays = newCoupon.validDays
          form.validDateRange = undefined
        }

        form.stock = newCoupon.stock
        form.usageRules = newCoupon.usageRules || ''
        form.remark = newCoupon.remark || ''
      }
    }, { immediate: true })

    // 监听visible变化，重置表单
    watch(() => props.visible, (visible) => {
      if (!visible) {
        form.name = ''
        form.type = 'full_reduction'
        form.threshold = undefined
        form.amount = undefined
        form.discount = undefined
        form.maxDiscount = undefined
        form.platformRatio = 50
        form.validityType = 'days'
        form.validDays = 30
        form.validDateRange = undefined
        form.stock = undefined
        form.usageRules = ''
        form.remark = ''
        formRef.value?.resetFields()
      } else if (visible && props.mode === 'create') {
        form.name = ''
        form.type = 'full_reduction'
        form.threshold = undefined
        form.amount = undefined
        form.discount = undefined
        form.maxDiscount = undefined
        form.platformRatio = 50
        form.validityType = 'days'
        form.validDays = 30
        form.validDateRange = undefined
        form.stock = undefined
        form.usageRules = ''
        form.remark = ''
      }
    })

    const handleTypeChange = () => {
      // 切换类型时清空相关字段
      form.threshold = undefined
      form.amount = undefined
      form.discount = undefined
      form.maxDiscount = undefined
    }

    const handleValidityTypeChange = () => {
      // 切换有效期类型时清空对应字段
      if (form.validityType === 'days') {
        form.validDateRange = undefined
        form.validDays = 30
      } else {
        form.validDays = undefined
        form.validDateRange = undefined
      }
    }

    const handleSubmit = async () => {
      try {
        await formRef.value?.validate()

        // 手动验证有效期
        if (form.validityType === 'days') {
          if (form.validDays === undefined || form.validDays === null) {
            root.$message.error('请输入有效天数')
            return
          }
        } else if (form.validityType === 'dateRange') {
          if (!form.validDateRange || form.validDateRange.length !== 2) {
            root.$message.error('请选择有效日期范围')
            return
          }
        }

        loading.value = true

        const couponData: any = {
          name: form.name,
          type: form.type,
          platformRatio: form.platformRatio,
          merchantRatio: merchantRatio.value,
          stock: form.stock,
          usageRules: form.usageRules,
          remark: form.remark,
          smsNotify: false
        }

        // 根据有效期类型添加对应字段
        if (form.validityType === 'days') {
          couponData.validDays = form.validDays
        } else {
          couponData.validDateRange = form.validDateRange
        }

        // 根据类型添加对应字段
        if (form.type === 'full_reduction') {
          couponData.threshold = form.threshold
          couponData.amount = form.amount
        } else if (form.type === 'discount') {
          couponData.discount = form.discount
          couponData.maxDiscount = form.maxDiscount
        } else if (form.type === 'instant_reduction') {
          couponData.amount = form.amount
        }

        if (props.mode === 'create') {
          await CouponService.createCoupon(couponData)
        } else {
          if (!props.coupon) return
          await CouponService.updateCoupon(props.coupon.id, couponData)
        }

        emit('close')
        emit('success')
      } catch (error) {
        console.error('提交失败:', error)
      } finally {
        loading.value = false
      }
    }

    const handleClose = () => {
      emit('close')
    }

    return {
      loading,
      formRef,
      form,
      rules,
      merchantRatio,
      handleTypeChange,
      handleValidityTypeChange,
      handleSubmit,
      handleClose
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

// 类型提示
.type-hint {
  font-size: @font-size-xs;
  color: @text-tertiary;
  margin-top: 8px;
  display: block;
}

// 字段提示
.field-hint {
  font-size: @font-size-xs;
  color: @text-tertiary;
  margin-top: 4px;
  display: block;
}

// 字符计数
.char-count {
  text-align: right;
  font-size: @font-size-xs;
  color: @text-tertiary;
  margin-top: 4px;
}

// 商户承担输入框（禁用状态）
.merchant-ratio-input {
  :deep(.ant-input-number-input) {
    background-color: @bg-secondary;
    color: @text-primary;
    cursor: not-allowed;
  }

  :deep(.ant-input-number-handler-wrap) {
    display: none;
  }
}

// 优化单选按钮组样式
:deep(.ant-radio-group-solid) {
  .ant-radio-button-wrapper {
    height: 32px;
    line-height: 30px;
    font-size: @font-size-sm;
    border-color: @border-secondary;

    &:hover {
      color: @brand-primary;
    }
  }

  .ant-radio-button-wrapper-checked {
    background: @brand-primary;
    border-color: @brand-primary;

    &:hover {
      background: @brand-primary-hover;
      border-color: @brand-primary-hover;
    }
  }
}

// 优化输入框样式
:deep(.ant-input),
:deep(.ant-input-number),
:deep(.ant-textarea) {
  border-radius: @border-radius-base;
  border-color: @border-secondary;
  font-size: @font-size-base;

  &:hover {
    border-color: @text-disabled;
  }

  &:focus {
    border-color: @brand-primary;
    box-shadow: 0 0 0 2px @brand-primary-light;
  }

  &::placeholder {
    color: @text-tertiary;
  }
}

:deep(.ant-input-number-handler-wrap) {
  border-radius: 0 @border-radius-base @border-radius-base 0;
}

// 优化表单项间距
:deep(.ant-form-item) {
  margin-bottom: 20px;
}

// 优化弹窗样式
:deep(.ant-modal-header) {
  border-bottom: 1px solid @bg-hover;
  padding: 16px 24px;
}

:deep(.ant-modal-title) {
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

:deep(.ant-modal-body) {
  padding: 24px;
}

:deep(.ant-modal-footer) {
  border-top: 1px solid @bg-hover;
  padding: 12px 16px;
}

// 优化按钮样式
:deep(.ant-btn) {
  height: 32px;
  padding: 0 16px;
  font-size: @font-size-base;
  border-radius: @border-radius-base;

  &.ant-btn-primary {
    background: @brand-primary;
    border-color: @brand-primary;

    &:hover {
      background: @brand-primary-hover;
      border-color: @brand-primary-hover;
    }
  }
}
</style>
