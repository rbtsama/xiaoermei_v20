<template>
  <sidebar>
    <div class="h-screen overflow-y-auto bg-secondary">
      <div class="max-w-3xl mx-auto p-8 space-y-8">
        <!-- 页面标题 -->
        <div>
          <h1 class="page-title">创建专属订单</h1>
        </div>

        <!-- 订单信息卡片 -->
        <a-card :bordered="false" class="order-card">
          <a-form :model="formData" layout="vertical">
            <!-- 日期选择 -->
            <a-row :gutter="16">
              <a-col :span="12">
                <a-form-item label="入住日期" required>
                  <a-date-picker
                    v-model="formData.checkInDate"
                    :disabled-date="disabledCheckInDate"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="选择入住日期"
                    style="width: 100%"
                    @change="handleCheckInChange"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="离店日期" required>
                  <a-date-picker
                    v-model="formData.checkOutDate"
                    :disabled-date="disabledCheckOutDate"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="选择离店日期"
                    style="width: 100%"
                    :disabled="!formData.checkInDate"
                    @change="handleCheckOutChange"
                  />
                </a-form-item>
              </a-col>
            </a-row>

            <!-- 房型选择 -->
            <a-form-item label="房型" required>
              <a-select
                v-model="formData.roomType"
                placeholder="请先选择日期"
                :disabled="!formData.checkInDate || !formData.checkOutDate"
                @change="handleRoomTypeChange"
              >
                <a-select-option
                  v-for="room in roomTypes"
                  :key="room.id"
                  :value="room.id"
                  :disabled="!room.available"
                >
                  {{ room.name }} - ¥{{ room.price }}/晚
                  <span v-if="!room.available" class="unavailable-text">(已满房)</span>
                </a-select-option>
              </a-select>
            </a-form-item>

            <!-- 价格设置 -->
            <div class="price-section">
              <a-form-item label="售卖总价">
                <div class="sale-price">
                  {{ formData.salePrice ? `¥${formData.salePrice}` : '-' }}
                </div>
                <div v-if="formData.salePrice && calculateNights() > 0" class="price-detail">
                  {{ selectedRoom?.name }} × {{ calculateNights() }} 晚
                </div>
              </a-form-item>

              <a-form-item label="专属优惠总价" required>
                <a-input-number
                  v-model="formData.specialPrice"
                  :min="0"
                  :precision="2"
                  placeholder="0.00"
                  style="width: 200px"
                  addon-before="¥"
                />
              </a-form-item>
            </div>

            <!-- 限制购买人手机号 -->
            <a-form-item label="限制购买人手机号">
              <a-input
                v-model="formData.limitPhone"
                placeholder="仅限该手机号购买"
                :maxlength="11"
                @input="handlePhoneInput"
              />
            </a-form-item>

            <!-- 备注 -->
            <a-form-item label="备注">
              <a-textarea
                v-model="formData.notes"
                placeholder="填写备注信息"
                :rows="3"
                :maxlength="500"
                show-count
              />
            </a-form-item>
          </a-form>
        </a-card>

        <!-- 生成付款码按钮 -->
        <div class="flex justify-center">
          <a-button
            type="primary"
            size="large"
            :disabled="!isFormValid"
            @click="handleGenerate"
            class="generate-btn"
          >
            生成付款码
          </a-button>
        </div>

        <!-- 付款码弹窗 -->
        <a-modal
          v-model:visible="qrDialogOpen"
          title="付款二维码"
          :footer="null"
          width="400px"
          centered
          :body-style="{ padding: '24px' }"
        >
          <div class="qr-modal-content">
            <!-- 二维码 -->
            <div class="flex items-center justify-center">
              <div class="qr-placeholder">
                <a-icon type="qrcode" class="qr-icon" />
              </div>
            </div>

            <!-- 保存二维码按钮 -->
            <a-button block @click="handleDownloadQR" class="download-btn">
              <template #icon>
                <a-icon type="download" />
              </template>
              保存二维码
            </a-button>
          </div>
        </a-modal>
      </div>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, reactive, computed, watch } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import { message } from 'ant-design-vue'
import { generateAgentOrderQRCode } from '@/api/memberService'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'AgentOrderCreatePage',
  components: { Sidebar },
  setup() {
    const formData = reactive({
      checkInDate: null,
      checkOutDate: null,
      roomType: undefined,
      salePrice: null,
      specialPrice: null,
      limitPhone: '',
      notes: ''
    })

    const qrDialogOpen = ref(false)
    const roomTypes = ref([])

    // 禁用入住日期（今天之前的日期）
    const disabledCheckInDate = (current) => {
      return current && current < dayjs().startOf('day')
    }

    // 禁用离店日期（入住日期及之前的日期）
    const disabledCheckOutDate = (current) => {
      if (!formData.checkInDate) return true
      return current && current <= dayjs(formData.checkInDate)
    }

    // 计算间夜数
    const calculateNights = () => {
      if (!formData.checkInDate || !formData.checkOutDate) return 0
      const checkIn = dayjs(formData.checkInDate)
      const checkOut = dayjs(formData.checkOutDate)
      return checkOut.diff(checkIn, 'day')
    }

    // 选中的房型
    const selectedRoom = computed(() => {
      return roomTypes.value.find(r => r.id === formData.roomType)
    })

    // 表单是否有效
    const isFormValid = computed(() => {
      return formData.checkInDate &&
             formData.checkOutDate &&
             formData.roomType &&
             formData.specialPrice != null &&
             formData.specialPrice > 0
    })

    // 入住日期变化
    const handleCheckInChange = () => {
      formData.checkOutDate = null
      formData.roomType = undefined
      formData.salePrice = null
      fetchRoomTypes()
    }

    // 离店日期变化
    const handleCheckOutChange = () => {
      formData.roomType = undefined
      formData.salePrice = null
      fetchRoomTypes()
    }

    // 房型变化
    const handleRoomTypeChange = () => {
      if (formData.roomType && formData.checkInDate && formData.checkOutDate) {
        const room = selectedRoom.value
        const nights = calculateNights()
        if (room && nights > 0) {
          formData.salePrice = room.price * nights
        }
      }
    }

    // 手机号输入处理（只允许数字）
    const handlePhoneInput = () => {
      formData.limitPhone = formData.limitPhone.replace(/\D/g, '')
    }

    // 获取可售房型
    const fetchRoomTypes = () => {
      if (formData.checkInDate && formData.checkOutDate) {
        // 模拟获取房型数据
        roomTypes.value = [
          { id: 'deluxe-king', name: '豪华大床房', price: 588, available: true },
          { id: 'deluxe-twin', name: '豪华双床房', price: 588, available: true },
          { id: 'executive-suite', name: '行政套房', price: 988, available: false },
          { id: 'presidential-suite', name: '总统套房', price: 1888, available: true }
        ]
      }
    }

    // 生成付款码
    const handleGenerate = async () => {
      if (!isFormValid.value) {
        message.error('请填写必填项')
        return
      }

      try {
        await generateAgentOrderQRCode(formData)
        qrDialogOpen.value = true
      } catch (error) {
        message.error('生成付款码失败')
        console.error(error)
      }
    }

    // 下载二维码
    const handleDownloadQR = () => {
      message.success('二维码已保存')
      console.log('下载二维码')
    }

    return {
      formData,
      qrDialogOpen,
      roomTypes,
      selectedRoom,
      isFormValid,
      disabledCheckInDate,
      disabledCheckOutDate,
      calculateNights,
      handleCheckInChange,
      handleCheckOutChange,
      handleRoomTypeChange,
      handlePhoneInput,
      handleGenerate,
      handleDownloadQR
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

.order-card {
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;
  transition: @transition-base;

  &:hover {
    box-shadow: @shadow-md;
  }
}

.price-section {
  margin-top: 16px;
}

.sale-price {
  font-size: @font-size-2xl;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

.price-detail {
  font-size: @font-size-xs;
  color: @text-tertiary;
  margin-top: 4px;
}

.unavailable-text {
  color: @text-tertiary;
}

.generate-btn {
  width: 100%;
  max-width: 28rem;
  height: 44px;
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

  &:disabled {
    background-color: @text-disabled;
    border-color: @text-disabled;
    cursor: not-allowed;
  }
}

.qr-modal-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.qr-placeholder {
  width: 256px;
  height: 256px;
  background-color: @bg-tertiary;
  border-radius: @border-radius-lg;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-icon {
  color: @text-tertiary;
  font-size: 192px;
}

.download-btn {
  height: 36px;
  border-color: @border-secondary;
  color: @text-primary;
  transition: @transition-base;

  &:hover {
    border-color: @border-focus;
    background-color: @bg-hover;
  }
}

:deep(.ant-form-item-label > label) {
  font-weight: @font-weight-medium;
  color: @text-primary;
}

:deep(.ant-input-number) {
  width: 100%;
}

:deep(.ant-input),
:deep(.ant-select-selector),
:deep(.ant-input-number),
:deep(.ant-picker) {
  border-color: @border-primary;
  color: @text-primary;

  &:hover {
    border-color: @border-focus;
  }

  &:focus,
  &.ant-input-focused,
  &.ant-select-focused .ant-select-selector {
    border-color: @border-focus;
    box-shadow: 0 0 0 2px @brand-primary-light;
  }
}

:deep(.ant-input::placeholder),
:deep(.ant-select-selection-placeholder) {
  color: @text-tertiary;
}
</style>
