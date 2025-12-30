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
              <a-col :span="6"><a-checkbox value="cash" class="grid-checkbox">现金</a-checkbox></a-col>
              <a-col :span="6"><a-checkbox value="wechat" class="grid-checkbox">微信</a-checkbox></a-col>
              <a-col :span="6"><a-checkbox value="alipay" class="grid-checkbox">支付宝</a-checkbox></a-col>
              <a-col :span="6"><a-checkbox value="unionpay" class="grid-checkbox">银联</a-checkbox></a-col>
              <a-col :span="6"><a-checkbox value="visa" class="grid-checkbox">VISA</a-checkbox></a-col>
              <a-col :span="6"><a-checkbox value="mastercard" class="grid-checkbox">Mastercard</a-checkbox></a-col>
              <a-col :span="6"><a-checkbox value="apple_pay" class="grid-checkbox">Apple Pay</a-checkbox></a-col>
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
                <a-col :span="6"><a-checkbox value="chinese" class="grid-checkbox">中式</a-checkbox></a-col>
                <a-col :span="6"><a-checkbox value="western" class="grid-checkbox">西式</a-checkbox></a-col>
              </a-row>
            </a-checkbox-group>
          </div>

          <!-- 供应形式 -->
          <div class="form-item">
            <label class="form-label">供应形式</label>
            <a-checkbox-group v-model="formValues.servingStyles" :disabled="isLocked" @change="handleChange" style="width: 100%">
              <a-row :gutter="[16, 12]">
                <a-col :span="6"><a-checkbox value="set_meal" class="grid-checkbox">套餐</a-checkbox></a-col>
                <a-col :span="6"><a-checkbox value="buffet" class="grid-checkbox">自助餐</a-checkbox></a-col>
                <a-col :span="6"><a-checkbox value="a_la_carte" class="grid-checkbox">单点</a-checkbox></a-col>
              </a-row>
            </a-checkbox-group>
          </div>

          <!-- 免费份数 -->
          <div class="form-item">
            <label class="form-label">免费份数</label>
            <a-input-number
              v-model="formValues.freeBreakfastCount"
              :min="0"
              :precision="0"
              placeholder="2"
              style="width: 200px"
              :disabled="isLocked"
              @change="handleChange"
            >
              <template slot="addonAfter">份</template>
            </a-input-number>
            <span class="field-hint" style="margin-left: 12px;">每间房免费提供的早餐份数</span>
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
            <span class="field-hint" style="margin-left: 12px;">超过免费份数后，每份早餐的费用</span>
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

      <!-- 7. 会员折扣 -->
      <div class="policy-section">
        <div class="subsection-title">会员折扣 <span class="required">*</span></div>
        <ul class="vip-instruction-list" style="margin-bottom: 20px;">
          <li>设置本门店各会员等级的折扣，折扣范围仅允许在平台制定范围中设置</li>
          <li>本店折扣：商户可针对每周7天 + 节假日分别设置更优惠的折扣（必须 ≤ 平台折扣）</li>
          <li>节假日折扣优先级最高：当日期为节假日时，优先使用节假日折扣，否则使用对应星期的折扣</li>
        </ul>

        <!-- 会员折扣表格 -->
        <a-table
          :columns="vipDiscountColumns"
          :data-source="vipLevels"
          :pagination="false"
          row-key="level"
          class="vip-discount-table"
        >
          <!-- 等级列 -->
          <template slot="level" slot-scope="text">
            <span class="vip-level-text">{{ text }}</span>
          </template>

          <!-- 平台折扣范围列 -->
          <template slot="range" slot-scope="text, record">
            <span class="platform-range">{{ record.min }}% - {{ record.max }}%</span>
          </template>

          <!-- 周一 -->
          <template slot="mondayDiscount" slot-scope="text, record">
            <div class="discount-cell">
              <a-input-number
                v-model="formValues.vipDiscounts[record.level].monday"
                :precision="0"
                :disabled="isLocked"
                :class="{ 'input-error': vipDiscountErrors[record.level].monday }"
                @change="handleChange"
                style="width: 70px;"
                size="small"
              />
              <span class="percent-text">%</span>
            </div>
          </template>

          <!-- 周二 -->
          <template slot="tuesdayDiscount" slot-scope="text, record">
            <div class="discount-cell">
              <a-input-number
                v-model="formValues.vipDiscounts[record.level].tuesday"
                :precision="0"
                :disabled="isLocked"
                :class="{ 'input-error': vipDiscountErrors[record.level].tuesday }"
                @change="handleChange"
                style="width: 70px;"
                size="small"
              />
              <span class="percent-text">%</span>
            </div>
          </template>

          <!-- 周三 -->
          <template slot="wednesdayDiscount" slot-scope="text, record">
            <div class="discount-cell">
              <a-input-number
                v-model="formValues.vipDiscounts[record.level].wednesday"
                :precision="0"
                :disabled="isLocked"
                :class="{ 'input-error': vipDiscountErrors[record.level].wednesday }"
                @change="handleChange"
                style="width: 70px;"
                size="small"
              />
              <span class="percent-text">%</span>
            </div>
          </template>

          <!-- 周四 -->
          <template slot="thursdayDiscount" slot-scope="text, record">
            <div class="discount-cell">
              <a-input-number
                v-model="formValues.vipDiscounts[record.level].thursday"
                :precision="0"
                :disabled="isLocked"
                :class="{ 'input-error': vipDiscountErrors[record.level].thursday }"
                @change="handleChange"
                style="width: 70px;"
                size="small"
              />
              <span class="percent-text">%</span>
            </div>
          </template>

          <!-- 周五 -->
          <template slot="fridayDiscount" slot-scope="text, record">
            <div class="discount-cell">
              <a-input-number
                v-model="formValues.vipDiscounts[record.level].friday"
                :precision="0"
                :disabled="isLocked"
                :class="{ 'input-error': vipDiscountErrors[record.level].friday }"
                @change="handleChange"
                style="width: 70px;"
                size="small"
              />
              <span class="percent-text">%</span>
            </div>
          </template>

          <!-- 周六 -->
          <template slot="saturdayDiscount" slot-scope="text, record">
            <div class="discount-cell">
              <a-input-number
                v-model="formValues.vipDiscounts[record.level].saturday"
                :precision="0"
                :disabled="isLocked"
                :class="{ 'input-error': vipDiscountErrors[record.level].saturday }"
                @change="handleChange"
                style="width: 70px;"
                size="small"
              />
              <span class="percent-text">%</span>
            </div>
          </template>

          <!-- 周日 -->
          <template slot="sundayDiscount" slot-scope="text, record">
            <div class="discount-cell">
              <a-input-number
                v-model="formValues.vipDiscounts[record.level].sunday"
                :precision="0"
                :disabled="isLocked"
                :class="{ 'input-error': vipDiscountErrors[record.level].sunday }"
                @change="handleChange"
                style="width: 70px;"
                size="small"
              />
              <span class="percent-text">%</span>
            </div>
          </template>

          <!-- 节假日 -->
          <template slot="holidayDiscount" slot-scope="text, record">
            <div class="discount-cell">
              <a-input-number
                v-model="formValues.vipDiscounts[record.level].holiday"
                :precision="0"
                :disabled="isLocked"
                :class="{ 'input-error': vipDiscountErrors[record.level].holiday }"
                @change="handleChange"
                style="width: 70px;"
                size="small"
              />
              <span class="percent-text">%</span>
            </div>
          </template>
        </a-table>
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
    // VIP等级配置（模拟数据）
    const vipLevels = [
      { level: 'VIP0', min: 95, max: 100 },
      { level: 'VIP1', min: 90, max: 95 },
      { level: 'VIP2', min: 85, max: 90 },
      { level: 'VIP3', min: 80, max: 85 },
      { level: 'VIP4', min: 75, max: 80 },
      { level: 'VIP5', min: 70, max: 75 },
      { level: 'VIP6', min: 65, max: 70 }
    ]

    // 表格列配置
    const vipDiscountColumns = [
      {
        title: '等级',
        dataIndex: 'level',
        key: 'level',
        width: 80,
        scopedSlots: { customRender: 'level' }
      },
      {
        title: '折扣范围',
        dataIndex: 'range',
        key: 'range',
        width: 120,
        scopedSlots: { customRender: 'range' }
      },
      {
        title: '周一',
        dataIndex: 'mondayDiscount',
        key: 'mondayDiscount',
        align: 'center',
        scopedSlots: { customRender: 'mondayDiscount' }
      },
      {
        title: '周二',
        dataIndex: 'tuesdayDiscount',
        key: 'tuesdayDiscount',
        align: 'center',
        scopedSlots: { customRender: 'tuesdayDiscount' }
      },
      {
        title: '周三',
        dataIndex: 'wednesdayDiscount',
        key: 'wednesdayDiscount',
        align: 'center',
        scopedSlots: { customRender: 'wednesdayDiscount' }
      },
      {
        title: '周四',
        dataIndex: 'thursdayDiscount',
        key: 'thursdayDiscount',
        align: 'center',
        scopedSlots: { customRender: 'thursdayDiscount' }
      },
      {
        title: '周五',
        dataIndex: 'fridayDiscount',
        key: 'fridayDiscount',
        align: 'center',
        scopedSlots: { customRender: 'fridayDiscount' }
      },
      {
        title: '周六',
        dataIndex: 'saturdayDiscount',
        key: 'saturdayDiscount',
        align: 'center',
        scopedSlots: { customRender: 'saturdayDiscount' }
      },
      {
        title: '周日',
        dataIndex: 'sundayDiscount',
        key: 'sundayDiscount',
        align: 'center',
        scopedSlots: { customRender: 'sundayDiscount' }
      },
      {
        title: '节日(优先)',
        dataIndex: 'holidayDiscount',
        key: 'holidayDiscount',
        align: 'center',
        customHeaderCell: () => ({ style: { backgroundColor: '#dbeafe' } }),
        customCell: () => ({ style: { backgroundColor: '#eff6ff' } }),
        scopedSlots: { customRender: 'holidayDiscount' }
      }
    ]

    // VIP折扣错误提示（每个等级每天都有独立的错误状态）
    const vipDiscountErrors = reactive({
      'VIP0': { monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '', holiday: '' },
      'VIP1': { monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '', holiday: '' },
      'VIP2': { monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '', holiday: '' },
      'VIP3': { monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '', holiday: '' },
      'VIP4': { monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '', holiday: '' },
      'VIP5': { monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '', holiday: '' },
      'VIP6': { monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '', holiday: '' }
    })

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
      freeBreakfastCount: 2,
      breakfastFee: 0,
      childBreakfastPolicy: 'free',
      childBreakfastAgeLimit: 12,
      childBreakfastHeightLimit: '1.2',

      // 会员折扣（每个等级每天都可以设置不同折扣，默认为最大值）
      vipDiscounts: {
        'VIP0': { monday: 100, tuesday: 100, wednesday: 100, thursday: 100, friday: 100, saturday: 100, sunday: 100, holiday: 100 },
        'VIP1': { monday: 95, tuesday: 95, wednesday: 95, thursday: 95, friday: 95, saturday: 95, sunday: 95, holiday: 95 },
        'VIP2': { monday: 90, tuesday: 90, wednesday: 90, thursday: 90, friday: 90, saturday: 90, sunday: 90, holiday: 90 },
        'VIP3': { monday: 85, tuesday: 85, wednesday: 85, thursday: 85, friday: 85, saturday: 85, sunday: 85, holiday: 85 },
        'VIP4': { monday: 80, tuesday: 80, wednesday: 80, thursday: 80, friday: 80, saturday: 80, sunday: 80, holiday: 80 },
        'VIP5': { monday: 75, tuesday: 75, wednesday: 75, thursday: 75, friday: 75, saturday: 75, sunday: 75, holiday: 75 },
        'VIP6': { monday: 70, tuesday: 70, wednesday: 70, thursday: 70, friday: 70, saturday: 70, sunday: 70, holiday: 70 }
      }
    })

    // 初始化数据
    // TODO: 从props.formData中初始化

    /**
     * 验证VIP折扣是否在允许范围内
     * @param {string} level - VIP等级 (VIP0-VIP6)
     * @param {string} day - 星期 (monday-sunday, holiday)
     * @param {number} min - 最小折扣百分比
     * @param {number} max - 最大折扣百分比
     * @returns {boolean} 是否通过验证
     *
     * 业务规则：
     * - VIP等级越高，允许的折扣范围越小（折扣力度更大）
     * - 节假日折扣优先级高于普通日期
     * - 商户设置的折扣必须在平台规定范围内
     * - 错误时设置错误状态（输入框红色边框），但不toast提示（提交时才提示）
     */
    const validateVipDiscount = (level, day, min, max) => {
      const value = formValues.vipDiscounts[level][day]

      if (value === null || value === undefined || value === '') {
        vipDiscountErrors[level][day] = '请输入折扣'
        return false
      }

      if (value < min || value > max) {
        vipDiscountErrors[level][day] = `须在${min}%-${max}%内`
        return false
      }

      vipDiscountErrors[level][day] = ''
      handleChange()
      return true
    }

    /**
     * 数据变化处理 - 手动调用emit通知父组件
     * 将扁平化的 formValues 转换为嵌套的 operationPolicy 结构
     *
     * 重要：所有字段修改后都必须调用此函数，否则数据不会同步到父组件
     */
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
            freeCount: formValues.freeBreakfastCount,
            fee: formValues.breakfastFee,
            childPolicy: formValues.childBreakfastPolicy,
            childAgeLimit: formValues.childBreakfastAgeLimit,
            childHeightLimit: formValues.childBreakfastHeightLimit
          },
          // 会员折扣数据（新增）
          vipDiscounts: formValues.vipDiscounts
        }
      })
    }

    return {
      formValues,
      vipLevels,
      vipDiscountColumns,
      vipDiscountErrors,
      validateVipDiscount,
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

.error-hint {
  font-size: @font-size-xs;
  color: @error-color;
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

// 会员折扣说明列表
.vip-instruction-list {
  list-style: disc;
  list-style-position: inside;
  margin: 0 0 20px 8px;
  padding: 0;
  font-size: @font-size-sm;
  color: @text-secondary;

  li {
    margin-bottom: 4px;
    line-height: 1.6;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

// 会员折扣表格样式（与VIPDiscountConfigPage保持一致）
.vip-discount-table {
  :deep(.ant-table-thead > tr > th) {
    background-color: @bg-secondary;
    color: @text-primary;
    font-weight: @font-weight-semibold;
    border-bottom: 1px solid @border-primary;
    padding: 12px 16px;
  }

  :deep(.ant-table-tbody > tr) {
    &:hover {
      background-color: @bg-hover;
    }

    > td {
      border-bottom: 1px solid @border-primary;
      padding: 12px 16px;
      color: @text-primary;
    }
  }

  .vip-level-text {
    font-weight: @font-weight-medium;
    color: @text-primary;
  }

  .platform-range {
    font-size: @font-size-sm;
    font-weight: @font-weight-medium;
    color: @text-primary;
  }

  .discount-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;

    .percent-text {
      font-size: @font-size-base;
      color: @text-secondary;
    }
  }

  // 错误状态的输入框（红色边框）
  :deep(.input-error) {
    border-color: @error-color !important;

    &:focus,
    &.ant-input-number-focused {
      border-color: @error-color !important;
      box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1) !important;
    }
  }
}
</style>
