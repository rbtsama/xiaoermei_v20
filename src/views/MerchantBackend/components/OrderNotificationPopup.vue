<template>
  <transition name="popup-slide">
    <div v-if="visible" class="order-notification-popup">
      <!-- 关闭按钮 -->
      <a-icon type="close" class="close-btn" @click="handleClose" />

      <!-- 标题 -->
      <div class="popup-header">
        <a-icon :type="titleIcon" :class="titleIconClass" />
        <span class="popup-title">{{ title }}</span>
      </div>

      <!-- 订单信息 -->
      <div class="popup-content">
        <div class="info-row">
          <span class="info-label">订单号：</span>
          <span class="info-value">{{ orderData.orderNo }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">入住人：</span>
          <span class="info-value guest-names">{{ orderData.guestNames }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">手机号：</span>
          <span class="info-value">{{ orderData.guestPhone }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">入离时间：</span>
          <span class="info-value">{{ checkInOutText }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">入住房型：</span>
          <span class="info-value">{{ orderData.roomType }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">支付总金额：</span>
          <span class="info-value amount">{{ formatAmount(orderData.totalAmount) }}</span>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="popup-footer">
        <a-button @click="handleViewDetail">查看详情</a-button>
        <a-button type="primary" @click="handleMarkRead">已读</a-button>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'
import { OrderChangeType } from '@/types/notification'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'OrderNotificationPopup',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    orderData: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit, root }) {
    const title = computed(() => {
      return props.orderData.type === OrderChangeType.NEW_ORDER ? '新订单' : '订单取消'
    })

    const titleIcon = computed(() => {
      return props.orderData.type === OrderChangeType.NEW_ORDER ? 'file-add' : 'close-circle'
    })

    const titleIconClass = computed(() => {
      return props.orderData.type === OrderChangeType.NEW_ORDER ? 'icon-new-order' : 'icon-cancelled'
    })

    const checkInOutText = computed(() => {
      if (!props.orderData.checkInDate || !props.orderData.checkOutDate) return '-'
      const checkIn = dayjs(props.orderData.checkInDate).format('YYYY/M/D')
      const checkOut = dayjs(props.orderData.checkOutDate).format('YYYY/M/D')
      const nights = props.orderData.nights || 0
      return `${checkIn}-${checkOut}（${nights}晚）`
    })

    const formatAmount = (amount) => {
      if (!amount && amount !== 0) return '-'
      return `¥${amount.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }

    const handleClose = () => {
      emit('update:visible', false)
      emit('close')
    }

    const handleMarkRead = () => {
      emit('mark-read', props.orderData.id)
      handleClose()
    }

    const handleViewDetail = () => {
      emit('view-detail', props.orderData.orderNo)
      handleClose()
    }

    return {
      title,
      titleIcon,
      titleIconClass,
      checkInOutText,
      formatAmount,
      handleClose,
      handleMarkRead,
      handleViewDetail
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.order-notification-popup {
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 400px;
  background: @bg-primary;
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 20px;
  z-index: 1000;

  .close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    font-size: @font-size-base;
    color: @text-tertiary;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: @text-primary;
    }
  }

  .popup-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    padding-right: 24px;

    .anticon {
      font-size: 20px;

      &.icon-new-order {
        color: @success-color;
      }

      &.icon-cancelled {
        color: @error-color;
      }
    }

    .popup-title {
      font-size: @font-size-lg;
      font-weight: @font-weight-semibold;
      color: @text-primary;
    }
  }

  .popup-content {
    margin-bottom: 16px;

    .info-row {
      display: flex;
      align-items: baseline;
      margin-bottom: 10px;
      line-height: 1.6;

      &:last-child {
        margin-bottom: 0;
      }

      .info-label {
        font-size: @font-size-sm;
        color: @text-secondary;
        white-space: nowrap;
        min-width: 85px;
      }

      .info-value {
        font-size: @font-size-base;
        color: @text-primary;
        flex: 1;

        &.amount {
          color: @error-color;
          font-weight: @font-weight-semibold;
          font-size: @font-size-lg;
        }
      }
    }
  }

  .popup-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding-top: 8px;
    border-top: 1px solid @border-primary;

    .ant-btn {
      height: 32px;
      padding: 0 16px;
      font-size: @font-size-sm;
      border-radius: @border-radius-base;
    }
  }
}

// 弹出动画
.popup-slide-enter-active,
.popup-slide-leave-active {
  transition: all 0.3s ease;
}

.popup-slide-enter {
  opacity: 0;
  transform: translateY(20px);
}

.popup-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
