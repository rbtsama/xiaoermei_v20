<template>
  <div class="tab3-container">
    <!-- 基本政策 -->
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <span class="section-title">基本政策</span>
      </template>

      <a-form-model
        :model="localData"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item label="当天最晚预订时间" required>
          <a-time-picker
            v-model="latestBookingTimeValue"
            format="HH:mm"
            placeholder="22:00"
            style="width: 100%"
            @change="handleLatestBookingTimeChange"
          />
          <div class="field-hint">客人当天预订的最晚时间</div>
        </a-form-model-item>

        <a-form-model-item label="开始办理入住时间" required>
          <a-time-picker
            v-model="checkInTimeValue"
            format="HH:mm"
            placeholder="15:00"
            style="width: 100%"
            @change="handleCheckInTimeChange"
          />
          <div class="field-hint">客人可以办理入住的最早时间</div>
        </a-form-model-item>

        <a-form-model-item label="最晚退房时间" required>
          <a-time-picker
            v-model="checkOutTimeValue"
            format="HH:mm"
            placeholder="12:00"
            style="width: 100%"
            @change="handleCheckOutTimeChange"
          />
          <div class="field-hint">客人必须完成退房的时间</div>
        </a-form-model-item>

        <a-form-model-item label="重要通知">
          <a-textarea
            v-model="localData.importantNotice"
            placeholder="示例：泳池维护中，12月30日前暂不可使用。"
            :rows="3"
            :maxLength="500"
            @change="handleChange"
          />
          <div class="char-count">{{ (localData.importantNotice || '').length }}/500</div>
        </a-form-model-item>

        <a-form-model-item label="取消政策" required>
          <a-textarea
            v-model="localData.cancellationPolicy"
            placeholder="示例：入住前10天可以免费取消，入住前3天取消将收取全额房费的30%作为损失补偿费用，之后不可取消，不可取消订单将扣除全部房费。"
            :rows="5"
            :maxLength="500"
            @change="handleChange"
          />
          <div class="char-count" :class="{ warning: (localData.cancellationPolicy || '').length < 50 }">
            {{ (localData.cancellationPolicy || '').length }}/500
            <span v-if="(localData.cancellationPolicy || '').length < 50" class="hint-text">（至少50字）</span>
          </div>
        </a-form-model-item>
      </a-form-model>
    </a-card>

    <!-- 入住年龄与儿童政策 -->
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <span class="section-title">入住年龄与儿童政策</span>
      </template>

      <a-form-model
        :model="localData"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item label="最小入住年龄" required>
          <a-select v-model="localData.checkInAge.minAge" @change="handleChange">
            <a-select-option v-for="opt in MIN_CHECK_IN_AGE_OPTIONS" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="是否接待儿童" required>
          <a-radio-group v-model="localData.childPolicy.acceptChildren" @change="handleChange">
            <a-radio :value="ChildPolicy.NOT_ACCEPT">不接待儿童</a-radio>
            <a-radio :value="ChildPolicy.ACCEPT">接待儿童</a-radio>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item
          v-if="localData.childPolicy.acceptChildren === ChildPolicy.ACCEPT"
          label="最小年龄要求"
          required
        >
          <a-select v-model="localData.childPolicy.minAge" @change="handleChange">
            <a-select-option v-for="opt in CHILD_MIN_AGE_OPTIONS" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-card>

    <!-- 押金与支付 -->
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <span class="section-title">押金与支付方式</span>
      </template>

      <a-form-model
        :model="localData"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item label="押金政策" required>
          <a-textarea
            v-model="localData.depositPolicy"
            placeholder="示例：固定收取1000元；可用支付方式：支持现金、信用卡和第三方支付平台；退还押金方式：退房当日原支付方式退还；或者填写：不收取押金"
            :rows="5"
            :maxLength="500"
            @change="handleChange"
          />
          <div class="char-count" :class="{ warning: (localData.depositPolicy || '').length < 20 }">
            {{ (localData.depositPolicy || '').length }}/500
            <span v-if="(localData.depositPolicy || '').length < 20" class="hint-text">（至少20字）</span>
          </div>
        </a-form-model-item>

        <a-form-model-item label="前台可用支付方式" required>
          <a-checkbox-group v-model="localData.paymentMethods" @change="handleChange" class="payment-methods">
            <a-checkbox v-for="opt in PAYMENT_METHOD_OPTIONS" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </a-checkbox>
          </a-checkbox-group>
          <div class="field-hint">请勾选前台支持的支付方式</div>
        </a-form-model-item>
      </a-form-model>
    </a-card>

    <!-- 早餐政策 -->
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <span class="section-title">早餐政策</span>
      </template>

      <a-form-model
        :model="localData.breakfastPolicy"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item label="是否提供早餐" required>
          <a-radio-group v-model="localData.breakfastPolicy.provided" @change="handleChange">
            <a-radio :value="BreakfastPolicy.NOT_PROVIDED">不提供早餐</a-radio>
            <a-radio :value="BreakfastPolicy.PROVIDED">提供早餐</a-radio>
          </a-radio-group>
        </a-form-model-item>

        <template v-if="localData.breakfastPolicy.provided === BreakfastPolicy.PROVIDED">
          <a-form-model-item label="早餐类型" required>
            <a-select v-model="localData.breakfastPolicy.breakfastType" @change="handleChange">
              <a-select-option v-for="opt in BREAKFAST_TYPE_OPTIONS" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item label="供应形式" required>
            <a-select v-model="localData.breakfastPolicy.servingStyle" @change="handleChange">
              <a-select-option v-for="opt in SERVING_STYLE_OPTIONS" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item label="供应时间" required>
            <a-row :gutter="12">
              <a-col :span="12">
                <a-time-picker
                  v-model="breakfastStartTimeValue"
                  format="HH:mm"
                  placeholder="07:30"
                  style="width: 100%"
                  @change="handleBreakfastStartTimeChange"
                />
              </a-col>
              <a-col :span="12">
                <a-time-picker
                  v-model="breakfastEndTimeValue"
                  format="HH:mm"
                  placeholder="10:00"
                  style="width: 100%"
                  @change="handleBreakfastEndTimeChange"
                />
              </a-col>
            </a-row>
          </a-form-model-item>

          <a-form-model-item label="加早费用（元/份）" required>
            <a-input-number
              v-model="localData.breakfastPolicy.extraFee"
              :min="0"
              :precision="2"
              placeholder="58"
              style="width: 100%"
              @change="handleChange"
            />
          </a-form-model-item>
        </template>
      </a-form-model>
    </a-card>

    <!-- 儿童早餐政策 -->
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <span class="section-title">儿童早餐政策</span>
      </template>

      <a-form-model
        :model="localData.childBreakfast"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item label="判断标准" required>
          <a-radio-group v-model="localData.childBreakfast.criteria" @change="handleChange">
            <a-radio :value="ChildCriteria.AGE">按年龄</a-radio>
            <a-radio :value="ChildCriteria.HEIGHT">按身高</a-radio>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item
          v-if="localData.childBreakfast.criteria === ChildCriteria.AGE"
          label="年龄标准"
          required
        >
          <a-select v-model="localData.childBreakfast.ageStandard" @change="handleChange">
            <a-select-option v-for="opt in CHILD_AGE_STANDARD_OPTIONS" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item
          v-if="localData.childBreakfast.criteria === ChildCriteria.HEIGHT"
          label="身高标准"
          required
        >
          <a-select v-model="localData.childBreakfast.heightStandard" @change="handleChange">
            <a-select-option v-for="opt in CHILD_HEIGHT_STANDARD_OPTIONS" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="收费方式" required>
          <a-radio-group v-model="localData.childBreakfast.chargeType" @change="handleChange">
            <a-radio :value="ChargeType.FREE">免费</a-radio>
            <a-radio :value="ChargeType.CHARGED">收费</a-radio>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item
          v-if="localData.childBreakfast.chargeType === ChargeType.CHARGED"
          label="收费金额（元/人）"
          required
        >
          <a-input-number
            v-model="localData.childBreakfast.fee"
            :min="0"
            :precision="2"
            placeholder="30"
            style="width: 100%"
            @change="handleChange"
          />
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watch } from '@vue/composition-api'
import moment from 'moment'
import {
  ChildPolicy,
  BreakfastPolicy,
  ChildCriteria,
  ChargeType,
  MIN_CHECK_IN_AGE_OPTIONS,
  CHILD_MIN_AGE_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  BREAKFAST_TYPE_OPTIONS,
  SERVING_STYLE_OPTIONS,
  CHILD_AGE_STANDARD_OPTIONS,
  CHILD_HEIGHT_STANDARD_OPTIONS
} from '@/types/storeDeployment'

export default defineComponent({
  name: 'Tab3OperationPolicy',
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    // 本地数据（使用安全的默认值）
    const localData = reactive({
      latestBookingTime: '22:00',
      checkInTime: '15:00',
      checkOutTime: '12:00',
      importantNotice: '',
      cancellationPolicy: '',
      checkInAge: {
        minAge: 'unlimited',
        maxAge: '不限制'
      },
      childPolicy: {
        acceptChildren: ChildPolicy.ACCEPT,
        minAge: 'unlimited'
      },
      depositPolicy: '',
      paymentMethods: [],
      breakfastPolicy: {
        provided: BreakfastPolicy.NOT_PROVIDED,
        breakfastType: '',
        servingStyle: '',
        startTime: '',
        endTime: '',
        extraFee: 0
      },
      childBreakfast: {
        criteria: ChildCriteria.AGE,
        ageStandard: '',
        heightStandard: '',
        chargeType: ChargeType.FREE,
        fee: 0
      },
      ...props.formData.operationPolicy
    })

    // 时间选择器的值（使用可选链安全访问）
    const latestBookingTimeValue = ref(localData.latestBookingTime ? moment(localData.latestBookingTime, 'HH:mm') : null)
    const checkInTimeValue = ref(localData.checkInTime ? moment(localData.checkInTime, 'HH:mm') : null)
    const checkOutTimeValue = ref(localData.checkOutTime ? moment(localData.checkOutTime, 'HH:mm') : null)
    const breakfastStartTimeValue = ref(localData.breakfastPolicy?.startTime ? moment(localData.breakfastPolicy.startTime, 'HH:mm') : null)
    const breakfastEndTimeValue = ref(localData.breakfastPolicy?.endTime ? moment(localData.breakfastPolicy.endTime, 'HH:mm') : null)

    // 监听props变化（添加安全检查）
    watch(
      () => props.formData.operationPolicy,
      (newData) => {
        if (!newData) return

        Object.assign(localData, newData)
        latestBookingTimeValue.value = newData.latestBookingTime ? moment(newData.latestBookingTime, 'HH:mm') : null
        checkInTimeValue.value = newData.checkInTime ? moment(newData.checkInTime, 'HH:mm') : null
        checkOutTimeValue.value = newData.checkOutTime ? moment(newData.checkOutTime, 'HH:mm') : null

        // 安全访问嵌套属性
        if (newData.breakfastPolicy) {
          breakfastStartTimeValue.value = newData.breakfastPolicy.startTime ? moment(newData.breakfastPolicy.startTime, 'HH:mm') : null
          breakfastEndTimeValue.value = newData.breakfastPolicy.endTime ? moment(newData.breakfastPolicy.endTime, 'HH:mm') : null
        }
      },
      { deep: true }
    )

    // 时间变更处理
    const handleLatestBookingTimeChange = (time) => {
      localData.latestBookingTime = time ? time.format('HH:mm') : ''
      handleChange()
    }

    const handleCheckInTimeChange = (time) => {
      localData.checkInTime = time ? time.format('HH:mm') : ''
      handleChange()
    }

    const handleCheckOutTimeChange = (time) => {
      localData.checkOutTime = time ? time.format('HH:mm') : ''
      handleChange()
    }

    const handleBreakfastStartTimeChange = (time) => {
      localData.breakfastPolicy.startTime = time ? time.format('HH:mm') : ''
      handleChange()
    }

    const handleBreakfastEndTimeChange = (time) => {
      localData.breakfastPolicy.endTime = time ? time.format('HH:mm') : ''
      handleChange()
    }

    // 处理数据变化
    const handleChange = () => {
      emit('update', {
        operationPolicy: localData
      })
    }

    return {
      localData,
      latestBookingTimeValue,
      checkInTimeValue,
      checkOutTimeValue,
      breakfastStartTimeValue,
      breakfastEndTimeValue,
      ChildPolicy,
      BreakfastPolicy,
      ChildCriteria,
      ChargeType,
      MIN_CHECK_IN_AGE_OPTIONS,
      CHILD_MIN_AGE_OPTIONS,
      PAYMENT_METHOD_OPTIONS,
      BREAKFAST_TYPE_OPTIONS,
      SERVING_STYLE_OPTIONS,
      CHILD_AGE_STANDARD_OPTIONS,
      CHILD_HEIGHT_STANDARD_OPTIONS,
      handleLatestBookingTimeChange,
      handleCheckInTimeChange,
      handleCheckOutTimeChange,
      handleBreakfastStartTimeChange,
      handleBreakfastEndTimeChange,
      handleChange
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.tab3-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-section-card {
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;

  :deep(.ant-card-head) {
    border-bottom: 1px solid @border-primary;
    padding: 16px 24px;
  }

  :deep(.ant-card-body) {
    padding: 32px 24px;
  }
}

.section-title {
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

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

  &.warning {
    color: @warning-color;
  }

  .hint-text {
    color: @warning-color;
    margin-left: 8px;
  }
}

.payment-methods {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  :deep(.ant-checkbox-wrapper) {
    margin: 0;
  }
}

:deep(.ant-form-item) {
  margin-bottom: 24px;
}

:deep(.ant-form-item-label) {
  font-weight: @font-weight-medium;
  color: @text-primary;

  & > label::after {
    content: '';
  }
}

:deep(.ant-input),
:deep(.ant-input-number),
:deep(.ant-select),
:deep(.ant-time-picker) {
  border-radius: @border-radius-base;

  .ant-input {
    border-radius: @border-radius-base;
  }
}
</style>
