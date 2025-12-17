<template>
  <div class="tab3-container">
    <!-- 酒店政策 -->
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <span class="section-title">酒店政策</span>
      </template>

      <!-- 1. 重要通知 -->
      <div class="policy-section">
        <div class="subsection-title">重要通知</div>
        <div class="form-item">
          <a-textarea
            v-model="formValues.importantNotice"
            placeholder="临时性重要通知，如设施维护等。示例：泳池维护中，12月30日前暂不可使用。"
            :rows="3"
            :maxLength="500"
            :disabled="isLocked"
            @change="handleChange"
          />
        </div>
      </div>

      

      <!-- 2. 预订与取消 -->
      <div class="policy-section">
        <div class="subsection-title">预订与取消 <span class="required">*</span></div>

        <a-row :gutter="24">
          <a-col :span="8">
            <div class="form-item">
              <label class="form-label">最晚预订时间</label>
              <a-time-picker
                v-model="formValues.latestBookingTime"
                format="HH:mm"
                value-format="HH:mm"
                :minute-step="30"
                placeholder="入住日14:30"
                style="width: 100%"
                :disabled="isLocked"
                @change="handleChange"
              />
              <div class="field-hint">入住日当天的最晚预订时间</div>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="form-item">
              <label class="form-label">办理入住时间</label>
              <a-time-picker
                v-model="formValues.checkInTime"
                format="HH:mm"
                value-format="HH:mm"
                :minute-step="30"
                placeholder="入住日14:30"
                style="width: 100%"
                :disabled="isLocked"
                @change="handleChange"
              />
              <div class="field-hint">开始办理入住的时间</div>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="form-item">
              <label class="form-label">最晚退房时间</label>
              <a-time-picker
                v-model="formValues.checkOutTime"
                format="HH:mm"
                value-format="HH:mm"
                :minute-step="30"
                placeholder="离店日12:00"
                style="width: 100%"
                :disabled="isLocked"
                @change="handleChange"
              />
              <div class="field-hint">最晚退房的时间</div>
            </div>
          </a-col>
        </a-row>

        <div class="form-item form-item-spacing">
          <label class="form-label">最晚取消时间</label>
          <a-row :gutter="12" type="flex" align="middle">
            <a-col flex="none">
              <span>入住日前</span>
            </a-col>
            <a-col flex="120px">
              <a-input-number
                v-model="formValues.cancelDaysBeforeCheckIn"
                :min="0"
                :precision="0"
                placeholder="1"
                style="width: 100%"
                :disabled="isLocked"
                @change="handleChange"
              />
            </a-col>
            <a-col flex="none">
              <span>天</span>
            </a-col>
            <a-col flex="150px">
              <a-time-picker
                v-model="formValues.cancelTimeBeforeCheckIn"
                format="HH:mm"
                value-format="HH:mm"
                :minute-step="30"
                placeholder="18:00"
                style="width: 100%"
                :disabled="isLocked"
                @change="handleChange"
              />
            </a-col>
            <a-col flex="auto">
              <div class="field-hint">例如：入住日前1天18:00前可免费取消</div>
            </a-col>
          </a-row>
        </div>
      </div>

      

      <!-- 3. 入住政策 -->
      <div class="policy-section">
        <div class="subsection-title">入住政策 <span class="required">*</span></div>

        <!-- 成人年龄限制 -->
        <div class="form-item">
          <label class="form-label">成人年龄限制</label>
          <a-row :gutter="12" type="flex" align="middle">
            <a-col flex="none">
              <a-radio-group v-model="formValues.adultAgeRestriction" :disabled="isLocked" @change="handleChange">
                <a-radio value="none">不限制</a-radio>
                <a-radio value="restricted">限制</a-radio>
              </a-radio-group>
            </a-col>
            <a-col v-if="formValues.adultAgeRestriction === 'restricted'" flex="none">
              <span>，年龄达</span>
            </a-col>
            <a-col v-if="formValues.adultAgeRestriction === 'restricted'" flex="100px">
              <a-input-number
                v-model="formValues.adultMinAge"
                :min="1"
                :max="99"
                :precision="0"
                placeholder="18"
                style="width: 100%"
                :disabled="isLocked"
                @change="handleChange"
              />
            </a-col>
            <a-col v-if="formValues.adultAgeRestriction === 'restricted'" flex="none">
              <span>岁</span>
            </a-col>
          </a-row>
        </div>

        <!-- 儿童限制 -->
        <div class="form-item">
          <label class="form-label">儿童限制</label>
          <a-radio-group v-model="formValues.childRestriction" :disabled="isLocked" @change="handleChange">
            <a-radio value="not_accept">不接待儿童</a-radio>
            <a-radio value="accept">接待儿童</a-radio>
          </a-radio-group>
        </div>

        <!-- 儿童年龄限制（条件显示） -->
        <div v-if="formValues.childRestriction === 'accept'" class="form-item nested-item">
          <label class="form-label">儿童年龄限制</label>
          <a-row :gutter="12" type="flex" align="middle">
            <a-col flex="none">
              <a-radio-group v-model="formValues.childAgeRestriction" :disabled="isLocked" @change="handleChange">
                <a-radio value="none">不限制</a-radio>
                <a-radio value="restricted">限制</a-radio>
              </a-radio-group>
            </a-col>
            <a-col v-if="formValues.childAgeRestriction === 'restricted'" flex="none">
              <span>，年龄达</span>
            </a-col>
            <a-col v-if="formValues.childAgeRestriction === 'restricted'" flex="100px">
              <a-input-number
                v-model="formValues.childMinAge"
                :min="1"
                :max="18"
                :precision="0"
                placeholder="3"
                style="width: 100%"
                :disabled="isLocked"
                @change="handleChange"
              />
            </a-col>
            <a-col v-if="formValues.childAgeRestriction === 'restricted'" flex="none">
              <span>岁</span>
            </a-col>
          </a-row>
        </div>

        <!-- 入住押金 -->
        <div class="form-item">
          <label class="form-label">入住押金</label>
          <a-row :gutter="12" type="flex" align="middle">
            <a-col flex="none">
              <a-radio-group v-model="formValues.depositType" :disabled="isLocked" @change="handleChange">
                <a-radio value="none">不收取</a-radio>
                <a-radio value="once">一次性收取</a-radio>
                <a-radio value="daily">按天收取</a-radio>
                <a-radio value="room">按间收取</a-radio>
              </a-radio-group>
            </a-col>
            <a-col v-if="formValues.depositType !== 'none'" flex="150px">
              <a-input-number
                v-model="formValues.depositAmount"
                :min="0"
                :precision="0"
                placeholder="1000"
                style="width: 100%"
                :disabled="isLocked"
                @change="handleChange"
              />
            </a-col>
            <a-col v-if="formValues.depositType !== 'none'" flex="none">
              <span>元</span>
            </a-col>
          </a-row>
        </div>

        <!-- 前台可用支付方式 -->
        <div class="form-item">
          <label class="form-label">前台可用支付方式</label>
          <a-checkbox-group v-model="formValues.paymentMethods" :disabled="isLocked" @change="handleChange" style="width: 100%">
            <a-row :gutter="[16, 12]">
              <a-col :span="6"><a-checkbox value="unionpay" class="grid-checkbox">银联</a-checkbox></a-col>
              <a-col :span="6"><a-checkbox value="visa" class="grid-checkbox">VISA</a-checkbox></a-col>
              <a-col :span="6"><a-checkbox value="mastercard" class="grid-checkbox">Mastercard</a-checkbox></a-col>
              <a-col :span="6"><a-checkbox value="wechat" class="grid-checkbox">微信</a-checkbox></a-col>
              <a-col :span="6"><a-checkbox value="alipay" class="grid-checkbox">支付宝</a-checkbox></a-col>
              <a-col :span="6"><a-checkbox value="apple_pay" class="grid-checkbox">Apple Pay</a-checkbox></a-col>
              <a-col :span="6"><a-checkbox value="cash" class="grid-checkbox">现金</a-checkbox></a-col>
            </a-row>
          </a-checkbox-group>
        </div>
      </div>

      

      <!-- 4. 早餐政策 -->
      <div class="policy-section">
        <div class="subsection-title">早餐政策 <span class="required">*</span></div>

        <div class="form-item">
          <label class="form-label">提供早餐</label>
          <a-radio-group v-model="formValues.breakfastProvision" :disabled="isLocked" @change="handleChange">
            <a-radio value="not_provided">不提供</a-radio>
            <a-radio value="free">免费早餐</a-radio>
            <a-radio value="charged">收费早餐</a-radio>
          </a-radio-group>
        </div>

        <!-- 早餐详情（条件显示） -->
        <template v-if="formValues.breakfastProvision !== 'not_provided'">
          <!-- 早餐时间 -->
          <div class="form-item">
            <label class="form-label">早餐时间</label>
            <a-row :gutter="12" type="flex" align="middle">
              <a-col flex="150px">
                <a-time-picker
                  v-model="formValues.breakfastStartTime"
                  format="HH:mm"
                  value-format="HH:mm"
                  :minute-step="30"
                  placeholder="07:30"
                  style="width: 100%"
                  :disabled="isLocked"
                  @change="handleChange"
                />
              </a-col>
              <a-col flex="none">
                <span>~</span>
              </a-col>
              <a-col flex="150px">
                <a-time-picker
                  v-model="formValues.breakfastEndTime"
                  format="HH:mm"
                  value-format="HH:mm"
                  :minute-step="30"
                  placeholder="09:30"
                  style="width: 100%"
                  :disabled="isLocked"
                  @change="handleChange"
                />
              </a-col>
            </a-row>
          </div>

          <!-- 早餐类型 -->
          <div class="form-item">
            <label class="form-label">早餐类型</label>
            <a-checkbox-group v-model="formValues.breakfastTypes" :disabled="isLocked" @change="handleChange" style="width: 100%">
              <a-row :gutter="[16, 12]">
                <a-col :span="12"><a-checkbox value="chinese" class="grid-checkbox">中式</a-checkbox></a-col>
                <a-col :span="12"><a-checkbox value="western" class="grid-checkbox">西式</a-checkbox></a-col>
              </a-row>
            </a-checkbox-group>
          </div>

          <!-- 供应形式 -->
          <div class="form-item">
            <label class="form-label">供应形式</label>
            <a-checkbox-group v-model="formValues.servingStyles" :disabled="isLocked" @change="handleChange" style="width: 100%">
              <a-row :gutter="[16, 12]">
                <a-col :span="8"><a-checkbox value="set_meal" class="grid-checkbox">套餐</a-checkbox></a-col>
                <a-col :span="8"><a-checkbox value="buffet" class="grid-checkbox">自助餐</a-checkbox></a-col>
                <a-col :span="8"><a-checkbox value="a_la_carte" class="grid-checkbox">单点</a-checkbox></a-col>
              </a-row>
            </a-checkbox-group>
          </div>

          <!-- 加早费用 -->
          <div class="form-item">
            <label class="form-label">加早费用（元/份）</label>
            <a-input-number
              v-model="formValues.breakfastFee"
              :min="0"
              :precision="0"
              placeholder="0"
              style="width: 200px"
              :disabled="isLocked"
              @change="handleChange"
            >
              <template slot="addonAfter">元</template>
            </a-input-number>
            <span class="field-hint" style="margin-left: 12px;">默认为0，表示免费</span>
          </div>

          <!-- 儿童早餐政策 -->
          <div class="form-item">
            <label class="form-label">儿童早餐政策</label>
            <a-radio-group v-model="formValues.childBreakfastPolicy" :disabled="isLocked" @change="handleChange">
              <a-radio value="free">免费</a-radio>
              <a-radio value="age_based">超年龄按成人收费</a-radio>
              <a-radio value="height_based">超身高按成人收费</a-radio>
            </a-radio-group>
          </div>

          <!-- 年龄标准（条件显示） -->
          <div v-if="formValues.childBreakfastPolicy === 'age_based'" class="form-item nested-item">
            <label class="form-label">年龄标准</label>
            <a-row :gutter="12" type="flex" align="middle">
              <a-col flex="none">
                <span>年龄不超过</span>
              </a-col>
              <a-col flex="100px">
                <a-input-number
                  v-model="formValues.childBreakfastAgeLimit"
                  :min="1"
                  :max="18"
                  :precision="0"
                  placeholder="12"
                  style="width: 100%"
                  :disabled="isLocked"
                  @change="handleChange"
                />
              </a-col>
              <a-col flex="none">
                <span>岁</span>
              </a-col>
            </a-row>
          </div>

          <!-- 身高标准（条件显示） -->
          <div v-if="formValues.childBreakfastPolicy === 'height_based'" class="form-item nested-item">
            <label class="form-label">身高标准</label>
            <a-row :gutter="12" type="flex" align="middle">
              <a-col flex="none">
                <span>身高不超过</span>
              </a-col>
              <a-col flex="150px">
                <a-select
                  v-model="formValues.childBreakfastHeightLimit"
                  placeholder="请选择"
                  style="width: 100%"
                  :disabled="isLocked"
                  @change="handleChange"
                >
                  <a-select-option value="0.8">0.8米</a-select-option>
                  <a-select-option value="0.9">0.9米</a-select-option>
                  <a-select-option value="1.0">1.0米</a-select-option>
                  <a-select-option value="1.1">1.1米</a-select-option>
                  <a-select-option value="1.2">1.2米</a-select-option>
                  <a-select-option value="1.3">1.3米</a-select-option>
                  <a-select-option value="1.4">1.4米</a-select-option>
                  <a-select-option value="1.5">1.5米</a-select-option>
                  <a-select-option value="1.6">1.6米</a-select-option>
                </a-select>
              </a-col>
            </a-row>
          </div>
        </template>
      </div>
    </a-card>
  </div>
</template>

<script>
import { defineComponent, reactive, watch, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'Tab3OperationPolicy',
  props: {
    formData: {
      type: Object,
      required: true
    },
    isLocked: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    // 扁平化的表单数据 - 使用字符串而不是moment对象
    const formValues = reactive({
      // 重要通知
      importantNotice: '',

      // 预订与取消
      latestBookingTime: '14:30',
      checkInTime: '14:30',
      checkOutTime: '12:00',
      cancelDaysBeforeCheckIn: 1,
      cancelTimeBeforeCheckIn: '18:00',

      // 入住政策
      adultAgeRestriction: 'none',
      adultMinAge: 18,
      childRestriction: 'not_accept',
      childAgeRestriction: 'none',
      childMinAge: 3,
      depositType: 'none',  // none: 不收取, once: 一次性收取, daily: 按天收取, room: 按间收取
      depositAmount: 1000,
      paymentMethods: [],

      // 早餐政策
      breakfastProvision: 'not_provided',
      breakfastStartTime: '07:30',
      breakfastEndTime: '09:30',
      breakfastTypes: [],
      servingStyles: [],
      breakfastFee: 0,
      childBreakfastPolicy: 'free',
      childBreakfastAgeLimit: 12,
      childBreakfastHeightLimit: '1.2'
    })

    // 初始化数据
    // TODO: 从props.formData中初始化

    // 数据变化处理 - 不使用watch，改用手动调用
    const handleChange = () => {
      emit('update', {
        operationPolicy: {
          importantNotice: formValues.importantNotice,
          booking: {
            latestBookingTime: formValues.latestBookingTime || '',
            checkInTime: formValues.checkInTime || '',
            checkOutTime: formValues.checkOutTime || '',
            cancelDaysBeforeCheckIn: formValues.cancelDaysBeforeCheckIn,
            cancelTimeBeforeCheckIn: formValues.cancelTimeBeforeCheckIn || ''
          },
          checkInPolicy: {
            adultAgeRestriction: formValues.adultAgeRestriction,
            adultMinAge: formValues.adultMinAge,
            childRestriction: formValues.childRestriction,
            childAgeRestriction: formValues.childAgeRestriction,
            childMinAge: formValues.childMinAge,
            depositType: formValues.depositType,
            depositAmount: formValues.depositAmount,
            paymentMethods: formValues.paymentMethods
          },
          breakfastPolicy: {
            provision: formValues.breakfastProvision,
            startTime: formValues.breakfastStartTime || '',
            endTime: formValues.breakfastEndTime || '',
            types: formValues.breakfastTypes,
            servingStyles: formValues.servingStyles,
            fee: formValues.breakfastFee,
            childPolicy: formValues.childBreakfastPolicy,
            childAgeLimit: formValues.childBreakfastAgeLimit,
            childHeightLimit: formValues.childBreakfastHeightLimit
          }
        }
      })
    }

    return {
      formValues,
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
  padding-bottom: 24px;  // 底部留白，避免滚动抖动
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

.policy-section {
  margin-top: 32px;      // 分类之间用间距替代分割线
  margin-bottom: 32px;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.subsection-title {
  font-size: @font-size-base;
  font-weight: @font-weight-semibold;
  color: @text-primary;
  margin-bottom: 20px;
  padding-bottom: 8px;
  border-bottom: 2px solid @bg-secondary;

  .required {
    color: @error-color;
    margin-left: 2px;
  }
}

.form-item {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }

  &.nested-item {
    margin-left: 24px;
    padding-left: 24px;
    border-left: 3px solid @bg-secondary;
  }

  &.form-item-spacing {
    margin-top: 32px;
  }
}

.form-label {
  display: block;
  font-size: @font-size-base;          // 14px
  font-weight: 400;                    // 正常字重，不加粗
  color: rgba(0,0,0,0.9);             // 黑色
  margin-bottom: 8px;

  .required {
    color: @error-color;
    margin-left: 2px;
  }
}

.field-hint {
  font-size: @font-size-xs;
  color: @text-secondary;
  margin-top: 4px;
  line-height: 1.4;
}

// 使用Row/Col布局的checkbox样式
:deep(.grid-checkbox) {
  margin: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding: 10px 12px;
  border: 1px solid @border-primary;
  border-radius: @border-radius-base;
  background: @bg-primary;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  width: 100%;
  font-size: @font-size-sm;
  color: @text-primary;

  &:hover {
    border-color: @brand-primary;
    background: rgba(59, 130, 246, 0.05);
  }

  &.ant-checkbox-wrapper-checked {
    border-color: @brand-primary;
    background: rgba(59, 130, 246, 0.08);
  }

  .ant-checkbox {
    top: 0;
  }
}

:deep(.ant-divider) {
  margin: 32px 0;
}

:deep(.ant-input),
:deep(.ant-input-number),
:deep(.ant-select),
:deep(.ant-textarea),
:deep(.ant-time-picker) {
  border-radius: @border-radius-base;
}

:deep(.ant-time-picker) {
  width: 100%;
}
</style>
