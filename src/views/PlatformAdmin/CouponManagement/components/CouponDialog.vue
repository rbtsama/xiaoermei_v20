<template>
  <a-modal
    :visible="visible"
    :title="mode === 'create' ? '创建优惠券' : '编辑优惠券'"
    width="700px"
    :confirm-loading="loading"
    @ok="handleSubmit"
    @cancel="handleClose"
  >
    <a-form-model ref="formRef" :model="form" :rules="rules" label-col-style="width: 120px">
      <!-- 优惠券名称 -->
      <a-form-model-item label="优惠券名称" prop="name">
        <a-input
          v-model="form.name"
          placeholder="请输入优惠券名称（最多50字符）"
          :maxLength="50"
        />
      </a-form-model-item>

      <!-- 优惠券类型 - 框式选择器 -->
      <a-form-model-item label="优惠券类型" prop="type">
        <div class="type-selector">
          <div
            class="type-card"
            :class="{ 'type-card-active': form.type === 'full_reduction' }"
            @click="handleTypeChange('full_reduction')"
          >
            <div class="type-card-title">满减券</div>
            <div class="type-card-desc">满X元减Y元</div>
          </div>
          <div
            class="type-card"
            :class="{ 'type-card-active': form.type === 'discount' }"
            @click="handleTypeChange('discount')"
          >
            <div class="type-card-title">折扣券</div>
            <div class="type-card-desc">打X折，最高Y元</div>
          </div>
          <div
            class="type-card"
            :class="{ 'type-card-active': form.type === 'instant_reduction' }"
            @click="handleTypeChange('instant_reduction')"
          >
            <div class="type-card-title">立减券</div>
            <div class="type-card-desc">直接减Y元</div>
          </div>
        </div>
      </a-form-model-item>

      <!-- 满减券字段 -->
      <template v-if="form.type === 'full_reduction'">
        <a-form-model-item label="使用门槛" prop="threshold">
          <a-input-number
            v-model="form.threshold"
            placeholder="如：300"
            :min="0"
            style="width: 100%"
          >
            <span slot="addonAfter">元</span>
          </a-input-number>
        </a-form-model-item>
        <a-form-model-item label="减免金额" prop="amount">
          <a-input-number
            v-model="form.amount"
            placeholder="如：50"
            :min="0"
            style="width: 100%"
          >
            <span slot="addonAfter">元</span>
          </a-input-number>
        </a-form-model-item>
      </template>

      <!-- 折扣券字段 -->
      <template v-if="form.type === 'discount'">
        <a-form-model-item label="折扣率" prop="discount">
          <a-input-number
            v-model="form.discount"
            placeholder="如：85"
            :min="1"
            :max="99"
            style="width: 100%"
          >
            <span slot="addonAfter">%</span>
          </a-input-number>
          <div class="text-xs text-slate-500 mt-1">输入折扣百分比，如85表示85%折扣</div>
        </a-form-model-item>
        <a-form-model-item label="最高优惠金额" prop="maxDiscount">
          <a-input-number
            v-model="form.maxDiscount"
            placeholder="如：100"
            :min="0"
            style="width: 100%"
          >
            <span slot="addonAfter">元</span>
          </a-input-number>
        </a-form-model-item>
      </template>

      <!-- 立减券字段 -->
      <template v-if="form.type === 'instant_reduction'">
        <a-form-model-item label="减免金额" prop="amount">
          <a-input-number
            v-model="form.amount"
            placeholder="如：30"
            :min="0"
            style="width: 100%"
          >
            <span slot="addonAfter">元</span>
          </a-input-number>
        </a-form-model-item>
      </template>

      <!-- 费用承担 -->
      <a-form-model-item label="平台承担比例" prop="platformRatio">
        <div class="ratio-input-group">
          <a-input-number
            v-model="form.platformRatio"
            :min="0"
            :max="100"
            style="width: 48%"
          >
            <span slot="addonAfter">%</span>
          </a-input-number>
          <span class="ratio-divider">商户承担</span>
          <a-input-number
            :value="merchantRatio"
            disabled
            style="width: 48%"
            class="merchant-ratio-input"
          >
            <span slot="addonAfter">%</span>
          </a-input-number>
        </div>
      </a-form-model-item>

      <!-- 有效天数 -->
      <a-form-model-item label="有效天数" prop="validDays">
        <a-input-number
          v-model="form.validDays"
          :min="0"
          placeholder="0表示永久有效"
          style="width: 100%"
        >
          <span slot="addonAfter">天</span>
        </a-input-number>
        <div class="text-xs text-slate-500 mt-1">0表示永久有效，其他数字表示发放后N天23:59过期</div>
      </a-form-model-item>

      <!-- 备注说明 -->
      <a-form-model-item label="备注说明" prop="remark">
        <a-textarea
          v-model="form.remark"
          placeholder="仅后台可见，最多200字符"
          :rows="3"
          :maxLength="200"
          show-count
        />
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

  setup(props, { emit }) {
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
      validDays: 30,
      remark: ''
    })

    const rules = {
      name: [
        { required: true, message: '请输入优惠券名称', trigger: 'blur' },
        { max: 50, message: '优惠券名称不能超过50字符', trigger: 'blur' }
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
      validDays: [
        { required: true, message: '请输入有效天数', type: 'number' }
      ]
    }

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
        form.validDays = newCoupon.validDays
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
        form.validDays = 30
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
        form.validDays = 30
        form.remark = ''
      }
    })

    const handleTypeChange = (type: CouponType) => {
      form.type = type
      // 切换类型时清空相关字段
      form.threshold = undefined
      form.amount = undefined
      form.discount = undefined
      form.maxDiscount = undefined
    }

    const handleSubmit = async () => {
      try {
        await formRef.value?.validate()

        loading.value = true

        const couponData: any = {
          name: form.name,
          type: form.type,
          platformRatio: form.platformRatio,
          merchantRatio: merchantRatio.value,
          validDays: form.validDays,
          remark: form.remark,
          smsNotify: false
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
      handleSubmit,
      handleClose
    }
  }
})
</script>

<style scoped lang="less">
// 类型选择器
.type-selector {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.type-card {
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  background: white;
  text-align: center;
  transition: all 0.2s;

  &:hover {
    border-color: #cbd5e1;
  }

  &.type-card-active {
    border-color: #3b82f6;
    background-color: #eff6ff;

    .type-card-title {
      color: #1e40af;
    }
  }
}

.type-card-title {
  font-weight: 600;
  margin-bottom: 4px;
  color: #475569;
}

.type-card-desc {
  font-size: 12px;
  color: #94a3b8;
}

// 费用承担输入组
.ratio-input-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ratio-divider {
  font-size: 14px;
  color: #64748b;
}

.merchant-ratio-input {
  :deep(.ant-input-number-input) {
    background-color: #f8fafc;
    color: #475569;
    cursor: not-allowed;
  }
}

// 通用样式
.text-xs {
  font-size: 12px;
}

.text-slate-500 {
  color: #64748b;
}

.mt-1 {
  margin-top: 4px;
}
</style>
