<template>
  <sidebar>
    <div class="page-container">
      <!-- 页面标题 -->
      <div class="page-header">
        <h1 class="page-title">代客下单</h1>
      </div>

      <!-- 订单信息卡片 -->
      <a-card :bordered="false" class="form-card">
        <template slot="title">
          <span class="card-title">订单信息</span>
        </template>

        <a-form-model
          :model="formData"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }"
        >
          <!-- 入住日期 -->
          <a-form-model-item label="入住日期" required>
            <a-date-picker
              v-model="formData.checkInDate"
              :disabled-date="disabledCheckInDate"
              :locale="locale"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              placeholder="选择入住日期"
              style="width: 100%;"
              @change="handleCheckInChange"
            />
          </a-form-model-item>

          <!-- 离店日期 -->
          <a-form-model-item label="离店日期" required>
            <a-date-picker
              v-model="formData.checkOutDate"
              :disabled-date="disabledCheckOutDate"
              :locale="locale"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              placeholder="选择离店日期"
              style="width: 100%;"
              :disabled="!formData.checkInDate"
              @change="handleCheckOutChange"
            />
            <div class="field-hint">
              共 {{ calculateNights() }} 晚
            </div>
          </a-form-model-item>

          <!-- 房型选择 -->
          <a-form-model-item label="房型" required>
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
          </a-form-model-item>

          <!-- 售卖总价 -->
          <a-form-model-item label="售卖总价">
            <div class="price-display">
              <span class="price-value">{{ formData.salePrice ? `¥${formData.salePrice.toFixed(2)}` : '-' }}</span>
              <span v-if="formData.salePrice && calculateNights() > 0" class="price-detail">
                （{{ selectedRoom?.name }} × {{ calculateNights() }}晚）
              </span>
            </div>
          </a-form-model-item>

          <!-- 专属总价 -->
          <a-form-model-item label="专属总价（元）" required>
            <a-input-number
              v-model="formData.specialPrice"
              :min="0"
              :precision="2"
              placeholder="988.46"
              style="width: 100%;"
            />
          </a-form-model-item>

          <!-- 限制购买人手机号 -->
          <a-form-model-item label="限制购买人手机号">
            <a-input
              v-model="formData.limitPhone"
              placeholder="仅限该手机号购买，不填则不限制"
              :maxLength="11"
            />
            <div class="field-hint">
              填写后只有该手机号可以购买此订单
            </div>
          </a-form-model-item>

          <!-- 备注 -->
          <a-form-model-item label="备注" :wrapper-col="{ span: 14 }">
            <a-textarea
              v-model="formData.notes"
              placeholder="订单备注信息"
              :rows="3"
              :maxLength="200"
            />
          </a-form-model-item>

          <!-- 提交按钮 -->
          <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
            <a-button
              type="primary"
              size="large"
              :loading="submitting"
              @click="handleSubmit"
              class="submit-btn"
            >
              <a-icon type="qrcode" />
              生成付款二维码
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-card>

      <!-- 付款二维码弹窗 -->
      <a-modal
        v-model="qrModalVisible"
        title="付款二维码"
        :footer="null"
        width="400px"
        centered
      >
        <div class="qr-modal-content">
          <div class="qr-wrapper">
            <div class="qr-placeholder">
              <a-icon type="qrcode" class="qr-icon" />
              <p class="qr-text">付款二维码</p>
            </div>
          </div>
          <div class="qr-info">
            <p class="info-row">
              <span class="info-label">订单金额：</span>
              <span class="info-value">¥{{ formData.specialPrice }}</span>
            </p>
            <p class="info-row">
              <span class="info-label">有效期：</span>
              <span class="info-value">24小时</span>
            </p>
          </div>
          <a-button type="primary" block @click="handleDownloadQR">
            <a-icon type="download" />
            下载二维码
          </a-button>
        </div>
      </a-modal>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, reactive, computed } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import { generateAgentOrderQRCode } from '@/api/memberService'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'

// 设置dayjs全局中文
dayjs.locale('zh-cn')

export default defineComponent({
  name: 'AgentOrderCreatePage',
  components: { Sidebar },
  setup(props, { root }) {
    const submitting = ref(false)
    const qrModalVisible = ref(false)

    const formData = reactive({
      checkInDate: null,
      checkOutDate: null,
      roomType: null,
      salePrice: 0,
      specialPrice: null,
      limitPhone: '',
      notes: ''
    })

    // 模拟房型数据
    const roomTypes = ref([
      { id: 'room-1', name: '豪华大床房', price: 800, available: true },
      { id: 'room-2', name: '豪华双床房', price: 850, available: true },
      { id: 'room-3', name: '高级套房', price: 1200, available: false }
    ])

    const selectedRoom = computed(() => {
      return roomTypes.value.find(r => r.id === formData.roomType)
    })

    // 计算住宿晚数
    const calculateNights = () => {
      if (!formData.checkInDate || !formData.checkOutDate) return 0
      const checkIn = dayjs(formData.checkInDate)
      const checkOut = dayjs(formData.checkOutDate)
      return checkOut.diff(checkIn, 'day')
    }

    // 禁用入住日期（不能选择过去的日期）
    const disabledCheckInDate = (current) => {
      return current && current < dayjs().startOf('day')
    }

    // 禁用离店日期（必须在入住日期之后）
    const disabledCheckOutDate = (current) => {
      if (!formData.checkInDate) return true
      return current && current <= dayjs(formData.checkInDate)
    }

    // 入住日期变化
    const handleCheckInChange = () => {
      // 如果离店日期早于或等于入住日期，清空离店日期
      if (formData.checkOutDate && formData.checkOutDate <= formData.checkInDate) {
        formData.checkOutDate = null
      }
      formData.roomType = null
      formData.salePrice = 0
    }

    // 离店日期变化
    const handleCheckOutChange = () => {
      formData.roomType = null
      formData.salePrice = 0
    }

    // 房型变化
    const handleRoomTypeChange = () => {
      if (selectedRoom.value) {
        const nights = calculateNights()
        formData.salePrice = selectedRoom.value.price * nights
        formData.specialPrice = formData.salePrice // 默认专属价等于原价
      }
    }

    // 提交表单
    const handleSubmit = async () => {
      // 验证
      if (!formData.checkInDate) {
        root.$message.error('请选择入住日期')
        return
      }
      if (!formData.checkOutDate) {
        root.$message.error('请选择离店日期')
        return
      }
      if (!formData.roomType) {
        root.$message.error('请选择房型')
        return
      }
      if (!formData.specialPrice) {
        root.$message.error('请输入专属优惠总价')
        return
      }
      if (formData.limitPhone && !validatePhone(formData.limitPhone)) {
        root.$message.error('限制购买人手机号格式不正确')
        return
      }

      try {
        submitting.value = true
        await generateAgentOrderQRCode(formData)
        qrModalVisible.value = true
      } catch (error) {
        root.$message.error('生成二维码失败')
        console.error(error)
      } finally {
        submitting.value = false
      }
    }

    // 验证手机号
    const validatePhone = (phone) => {
      return /^1[3-9]\d{9}$/.test(phone)
    }

    // 下载二维码
    const handleDownloadQR = () => {
      root.$message.success('二维码下载成功')
      // TODO: 实际下载逻辑
    }

    return {
      formData,
      submitting,
      qrModalVisible,
      locale, // DatePicker的中文locale
      roomTypes,
      selectedRoom,
      calculateNights,
      disabledCheckInDate,
      disabledCheckOutDate,
      handleCheckInChange,
      handleCheckOutChange,
      handleRoomTypeChange,
      handleSubmit,
      handleDownloadQR
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.page-container {
  padding: 24px;
  max-width: 1000px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 24px;

  .page-title {
    font-size: 24px;
    font-weight: @font-weight-semibold;
    color: @text-primary;
    margin: 0;
  }
}

.form-card {
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;

  :deep(.ant-card-head) {
    border-bottom: 1px solid @bg-tertiary;
    padding: 16px 24px;
  }

  :deep(.ant-card-body) {
    padding: 32px 24px;
  }
}

.card-title {
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

.unavailable-text {
  color: @text-tertiary;
  font-size: @font-size-xs;
  margin-left: 8px;
}

.price-display {
  .price-value {
    font-size: 20px;
    font-weight: @font-weight-semibold;
    color: @brand-primary;
  }

  .price-detail {
    font-size: @font-size-sm;
    color: @text-secondary;
    margin-left: 12px;
  }
}

.submit-btn {
  width: 100%;
  height: 44px;
  font-size: @font-size-base;
  font-weight: @font-weight-medium;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);

  &:hover {
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }
}

.qr-modal-content {
  padding: 24px 0;
  text-align: center;

  .qr-wrapper {
    width: 240px;
    height: 240px;
    margin: 0 auto 24px;
    padding: 16px;
    background: @bg-secondary;
    border-radius: @border-radius-base;
    border: 1px solid @border-primary;
    display: flex;
    align-items: center;
    justify-content: center;

    .qr-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .qr-icon {
        font-size: 80px;
        color: @text-tertiary;
        margin-bottom: 12px;
      }

      .qr-text {
        margin: 0;
        font-size: @font-size-sm;
        color: @text-secondary;
      }
    }
  }

  .qr-info {
    margin-bottom: 24px;
    text-align: left;

    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: @font-size-base;

      .info-label {
        color: @text-secondary;
      }

      .info-value {
        font-weight: @font-weight-semibold;
        color: @text-primary;
      }
    }
  }
}
</style>
