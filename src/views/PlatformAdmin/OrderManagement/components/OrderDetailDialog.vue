<template>
  <a-modal
    :visible="visible"
    title="订单详情"
    width="880px"
    :footer="null"
    @cancel="handleClose"
  >
    <div v-if="order" class="detail-container">
      <!-- 模块1: 基础信息 -->
      <a-card class="detail-card" :bordered="false">
        <h3 class="card-title">基础信息</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">下单时间</span>
            <div class="datetime-value">
              <div class="date">{{ formatDate(order.createdAt) }}</div>
              <div class="time">{{ formatTime(order.createdAt) }}</div>
            </div>
          </div>
          <div class="info-item">
            <span class="info-label">订单号</span>
            <span class="info-value">{{ order.orderNumber }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">订单状态</span>
            <a-tag :color="getStatusColor(order.status)">
              {{ ORDER_STATUS_LABELS[order.status] }}
            </a-tag>
          </div>
          <div v-if="order.paymentId" class="info-item">
            <span class="info-label">支付单号</span>
            <span class="info-value">{{ order.paymentId }}</span>
          </div>
          <div v-if="order.paidAt" class="info-item">
            <span class="info-label">支付时间</span>
            <div class="datetime-value">
              <div class="date">{{ formatDate(order.paidAt) }}</div>
              <div class="time">{{ formatTime(order.paidAt) }}</div>
            </div>
          </div>
        </div>
      </a-card>

      <!-- 模块2: 入住信息 -->
      <a-card class="detail-card" :bordered="false">
        <h3 class="card-title">入住信息</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">酒店名称</span>
            <span class="info-value">{{ order.hotelName }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">房型名称</span>
            <span class="info-value">{{ order.roomType }}</span>
          </div>
          <div class="info-item full-width">
            <span class="info-label">入住日期</span>
            <span class="info-value">{{ order.checkInDate }} - {{ order.checkOutDate }}（共 {{ order.nights }} 晚）</span>
          </div>
          <div class="info-item">
            <span class="info-label">预订间数</span>
            <span class="info-value">{{ order.roomCount }} 间</span>
          </div>
          <div class="info-item">
            <span class="info-label">入住人数</span>
            <span class="info-value">{{ order.guestCount }} 人</span>
          </div>
          <div class="info-item">
            <span class="info-label">联系人</span>
            <span class="info-value">{{ order.guestName }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">联系电话</span>
            <span class="info-value">{{ order.guestPhone }}</span>
          </div>
          <div v-if="order.roomNumber" class="info-item">
            <span class="info-label">房间号</span>
            <span class="info-value">{{ order.roomNumber }}</span>
          </div>
        </div>
      </a-card>

      <!-- 模块3: 支付明细 -->
      <a-card class="detail-card" :bordered="false">
        <h3 class="card-title">支付明细</h3>
        <div class="payment-detail">
          <div class="payment-row">
            <span class="payment-label">房费小计（{{ order.nights }} 晚 × ¥{{ roomPricePerNight }}）</span>
            <span class="payment-value">¥{{ order.roomPrice }}</span>
          </div>
          <div v-if="order.couponDiscount > 0" class="payment-row">
            <span class="payment-label">优惠券优惠</span>
            <span class="payment-value discount">-¥{{ order.couponDiscount }}</span>
          </div>
          <div v-if="order.pointsDiscount > 0" class="payment-row">
            <span class="payment-label">积分抵扣</span>
            <span class="payment-value discount">-¥{{ order.pointsDiscount }}</span>
          </div>
          <div v-if="order.memberDiscount > 0" class="payment-row">
            <span class="payment-label">会员折扣</span>
            <span class="payment-value discount">-¥{{ order.memberDiscount }}</span>
          </div>
          <div class="payment-row total-row">
            <span class="payment-label-total">实付金额</span>
            <span class="payment-value-total">¥{{ order.actualAmount }}</span>
          </div>
        </div>
      </a-card>

      <!-- 模块4: 积分服务（条件显示） -->
      <a-card
        v-if="order.pointsServices && (order.pointsServices.rewards.length > 0 || order.pointsServices.exchanges.length > 0)"
        class="detail-card"
        :bordered="false"
      >
        <h3 class="card-title">积分服务</h3>

        <!-- 积分奖励 -->
        <div v-if="order.pointsServices.rewards.length > 0" class="points-section">
          <h4 class="section-subtitle">积分奖励</h4>
          <ul class="points-list">
            <li v-for="(item, idx) in order.pointsServices.rewards" :key="`reward-${idx}`">
              <span class="points-name">{{ item.name }}</span>
              <span class="points-value-green">(+{{ item.points }}积分)</span>
            </li>
          </ul>
        </div>

        <!-- 积分换购 -->
        <div v-if="order.pointsServices.exchanges.length > 0" class="points-section">
          <h4 class="section-subtitle">积分换购</h4>
          <ul class="points-list">
            <li v-for="(item, idx) in order.pointsServices.exchanges" :key="`exchange-${idx}`">
              <span class="points-name">{{ item.name }}</span>
              <span class="points-value-red">(-{{ item.points }}积分)</span>
            </li>
          </ul>
        </div>
      </a-card>

      <!-- 模块5: 退款记录（条件显示） -->
      <a-card
        v-if="order.refundRecords && order.refundRecords.length > 0"
        class="detail-card"
        :bordered="false"
      >
        <h3 class="card-title">退款记录</h3>
        <a-table
          :columns="refundColumns"
          :data-source="order.refundRecords"
          :pagination="false"
          size="small"
          :row-key="(record, index) => `refund-${index}`"
          class="refund-table"
        >
          <!-- 退款状态 -->
          <template slot="status" slot-scope="status">
            <a-tag :color="getRefundStatusColor(status)">
              {{ status }}
            </a-tag>
          </template>

          <!-- 退款金额 -->
          <template slot="amount" slot-scope="amount, record">
            <span v-if="record.status === '客人撤诉' || record.status === '客人发起申诉'" class="empty-amount">-</span>
            <span v-else class="refund-amount">¥{{ amount }}</span>
          </template>

          <!-- 处理时间 -->
          <template slot="time" slot-scope="time">
            <div class="datetime-value">
              <div class="date">{{ formatDate(time) }}</div>
              <div class="time">{{ formatTime(time) }}</div>
            </div>
          </template>
        </a-table>
      </a-card>

      <!-- 模块6: 商家备注（条件显示） -->
      <a-card
        v-if="order.merchantNote"
        class="detail-card"
        :bordered="false"
      >
        <h3 class="card-title">商家备注</h3>
        <div class="merchant-note">
          {{ order.merchantNote }}
        </div>
      </a-card>
    </div>

    <template slot="footer">
      <a-button @click="handleClose" size="large">关闭</a-button>
    </template>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import type { Order } from '../types/order.types'
import type { RefundStatus } from '../types/order.types'
import { ORDER_STATUS_LABELS } from '../types/order.types'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'OrderDetailDialog',

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    order: {
      type: Object as () => Order | null,
      default: null
    }
  },

  setup(props, { emit }) {
    // 计算每晚房价
    const roomPricePerNight = computed(() => {
      if (!props.order || props.order.nights === 0) return 0
      return (props.order.roomPrice / props.order.nights).toFixed(2)
    })

    // 退款记录表格列
    const refundColumns = [
      { title: '退款状态', width: 140, scopedSlots: { customRender: 'status' } },
      { title: '退款金额', width: 120, scopedSlots: { customRender: 'amount' } },
      { title: '处理时间', scopedSlots: { customRender: 'time' } }
    ]

    // 状态颜色映射
    const getStatusColor = (status: string) => {
      const colorMap: Record<string, string> = {
        'pending_payment': 'orange',
        'paid': 'blue',
        'confirmed': 'cyan',
        'checked_in': 'green',
        'checked_out': 'default',
        'cancelled': 'red',
        'refunded': 'purple'
      }
      return colorMap[status] || 'default'
    }

    // 退款状态颜色
    const getRefundStatusColor = (status: RefundStatus) => {
      const statusMap: Record<string, string> = {
        '客人发起申诉': 'orange',
        '客人撤诉': 'default',
        '门店退款': 'success',
        '平台支持退款': 'success',
        '平台拒绝退款': 'error',
        '退款申请': 'orange'
      }
      return statusMap[status] || 'default'
    }

    const formatDate = (datetime: string) => {
      if (!datetime) return '-'
      return dayjs(datetime).format('YYYY-MM-DD')
    }

    const formatTime = (datetime: string) => {
      if (!datetime) return '-'
      return dayjs(datetime).format('HH:mm:ss')
    }

    const handleClose = () => {
      emit('close')
    }

    return {
      roomPricePerNight,
      refundColumns,
      ORDER_STATUS_LABELS,
      getStatusColor,
      getRefundStatusColor,
      formatDate,
      formatTime,
      handleClose
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

// 弹窗容器
.detail-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

// 卡片样式
.detail-card {
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  background: #ffffff;
  box-shadow: @shadow-sm;

  :deep(.ant-card-body) {
    padding: 20px;
  }
}

// 卡片标题
.card-title {
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid @border-primary;
}

// 信息网格布局
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px 24px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;

  &.full-width {
    grid-column: span 2;
  }
}

// 标签和值
.info-label {
  font-size: @font-size-sm;
  color: @text-secondary;
}

.info-value {
  font-family: @font-family;
  font-size: @font-size-base;
  color: @text-primary;
  font-weight: @font-weight-medium;
}

// 日期时间值
.datetime-value {
  .date {
    display: block;
    color: @text-primary;
    font-size: @font-size-base;
    font-weight: @font-weight-medium;
    line-height: 1.5;
  }

  .time {
    display: block;
    color: @text-secondary;
    font-size: @font-size-sm;
    line-height: 1.5;
    margin-top: 2px;
  }
}

// 支付明细样式
.payment-detail {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.payment-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid @bg-tertiary;

  &:last-child {
    border-bottom: none;
  }
}

.payment-label,
.payment-value {
  font-size: @font-size-base;
}

.payment-label {
  color: @text-secondary;
}

.payment-value {
  color: @text-primary;
  font-weight: @font-weight-medium;

  &.discount {
    color: @success-color;
  }
}

// 总计行
.total-row {
  margin-top: 8px;
  padding-top: 16px;
  border-top: 2px solid @border-primary !important;
  border-bottom: none !important;
}

.payment-label-total {
  font-size: @font-size-xl;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

.payment-value-total {
  font-size: 20px;
  font-weight: @font-weight-bold;
  color: @brand-primary;
}

// 积分服务样式
.points-section {
  &:not(:last-child) {
    margin-bottom: 16px;
  }
}

.section-subtitle {
  font-size: @font-size-base;
  font-weight: @font-weight-semibold;
  color: @text-secondary;
  margin-bottom: 10px;
}

.points-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.points-list li {
  display: flex;
  align-items: center;
  font-size: @font-size-base;
}

.points-name {
  color: @text-primary;
}

.points-value-green {
  color: @success-color;
  font-weight: @font-weight-medium;
  margin-left: 8px;
}

.points-value-red {
  color: @error-color;
  font-weight: @font-weight-medium;
  margin-left: 8px;
}

// 退款记录表格
.refund-table {
  :deep(.ant-table-thead > tr > th) {
    background: @bg-secondary;
    color: @text-primary;
    font-weight: @font-weight-semibold;
    font-size: @font-size-base;
  }

  :deep(.ant-table-tbody > tr > td) {
    color: @text-primary;
  }
}

.refund-amount {
  color: @error-color;
  font-weight: @font-weight-semibold;
  font-size: @font-size-base;
}

.empty-amount {
  color: @text-tertiary;
}

// 商家备注样式
.merchant-note {
  font-size: @font-size-base;
  color: @text-primary;
  line-height: 1.6;
  padding: 12px;
  background: @bg-secondary;
  border-radius: @border-radius-base;
}
</style>
