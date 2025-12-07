<template>
  <a-modal
    :visible="visible"
    title="订单详情"
    width="900px"
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
            <span class="info-value">{{ order.createdAt }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">订单号</span>
            <span class="info-value">{{ order.orderNumber }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">订单状态</span>
            <a-tag :class="getStatusTagClass(order.status)">
              {{ ORDER_STATUS_LABELS[order.status] }}
            </a-tag>
          </div>
          <div v-if="order.paymentId" class="info-item">
            <span class="info-label">支付单号</span>
            <span class="info-value">{{ order.paymentId }}</span>
          </div>
          <div v-if="order.paidAt" class="info-item">
            <span class="info-label">支付时间</span>
            <span class="info-value">{{ order.paidAt }}</span>
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
          <div class="info-item">
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
          :row-class-name="() => 'refund-row'"
        >
          <!-- 退款状态 -->
          <template slot="status" slot-scope="status">
            <a-tag :class="getRefundStatusClass(status)">
              {{ status }}
            </a-tag>
          </template>

          <!-- 退款金额 -->
          <template slot="amount" slot-scope="amount, record">
            <span v-if="record.status === '客人撤诉' || record.status === '客人发起申诉'" class="text-slate-400">-</span>
            <span v-else class="refund-amount">¥{{ amount }}</span>
          </template>

          <!-- 处理时间 -->
          <template slot="time" slot-scope="time">
            <span class="time-value">{{ time }}</span>
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

    <template #footer>
      <a-button @click="handleClose">关闭</a-button>
    </template>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import type { Order } from '../types/order.types'
import type { RefundStatus } from '../types/order.types'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../types/order.types'

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
      { title: '退款状态', width: 150, scopedSlots: { customRender: 'status' } },
      { title: '退款金额', width: 120, scopedSlots: { customRender: 'amount' } },
      { title: '处理时间', scopedSlots: { customRender: 'time' } }
    ]

    // 样式辅助函数
    const getStatusTagClass = (status: string) => {
      const color = ORDER_STATUS_COLORS[status as keyof typeof ORDER_STATUS_COLORS]
      const colorMap: Record<string, string> = {
        'orange': 'bg-orange-100 text-orange-700 border-orange-300',
        'blue': 'bg-blue-100 text-blue-700 border-blue-300',
        'black': 'bg-slate-100 text-slate-700 border-slate-300',
        'slate': 'bg-slate-100 text-slate-500 border-slate-300',
        'red': 'bg-red-100 text-red-700 border-red-300'
      }
      return colorMap[color] || 'bg-gray-100 text-gray-700 border-gray-300'
    }

    // 退款记录状态颜色
    const getRefundStatusClass = (status: RefundStatus) => {
      const statusMap: Record<string, string> = {
        '客人发起申诉': 'bg-orange-100 text-orange-700 border-orange-300',   // 橙色
        '客人撤诉': 'bg-slate-100 text-slate-600 border-slate-300',           // 灰色
        '门店退款': 'bg-green-100 text-green-700 border-green-300',           // 绿色
        '平台支持退款': 'bg-green-100 text-green-700 border-green-300',       // 绿色
        '平台拒绝退款': 'bg-red-100 text-red-700 border-red-300',             // 红色
        '退款申请': 'bg-orange-100 text-orange-700 border-orange-300'         // 橙色（兼容）
      }
      return statusMap[status] || 'bg-gray-100 text-gray-700 border-gray-300'
    }

    const handleClose = () => {
      emit('close')
    }

    return {
      roomPricePerNight,
      refundColumns,
      ORDER_STATUS_LABELS,
      getStatusTagClass,
      getRefundStatusClass,
      handleClose
    }
  }
})
</script>

<style scoped lang="less">
// 弹窗容器
.detail-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

// 卡片样式
.detail-card {
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

// 卡片标题 - 统一16px
.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e2e8f0;
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
}

// 标签和值 - 统一14px
.info-label {
  font-size: 14px;
  color: #64748b;
}

.info-value {
  font-size: 14px;
  color: #0f172a;
  font-weight: 500;
}

// 支付明细样式
.payment-detail {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.payment-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }
}

.payment-label,
.payment-value {
  font-size: 14px;
}

.payment-label {
  color: #64748b;
}

.payment-value {
  color: #0f172a;
  font-weight: 500;

  &.discount {
    color: #16a34a;
  }
}

// 总计行
.total-row {
  margin-top: 8px;
  padding-top: 16px;
  border-top: 2px solid #e2e8f0 !important;
  border-bottom: none !important;
}

.payment-label-total {
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
}

.payment-value-total {
  font-size: 20px;
  font-weight: 700;
  color: #3b82f6;
}

// 佣金信息
.commission-info {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 32px;
}

.commission-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

// 积分服务样式
.points-section {
  &:not(:last-child) {
    margin-bottom: 16px;
  }
}

.section-subtitle {
  font-size: 14px;
  font-weight: 600;
  color: #475569;
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
  font-size: 14px;
}

.points-name {
  color: #0f172a;
}

.points-value-green {
  color: #16a34a;
  font-weight: 500;
  margin-left: 8px;
}

.points-value-red {
  color: #dc2626;
  font-weight: 500;
  margin-left: 8px;
}

// 退款记录表格样式
.refund-row {
  font-size: 14px;
}

.refund-amount {
  color: #dc2626;
  font-weight: 600;
  font-size: 14px;
}

.time-value {
  font-size: 14px;
  color: #0f172a;
}

// 商家备注样式
.merchant-note {
  font-size: 14px;
  color: #0f172a;
  line-height: 1.6;
  padding: 12px;
  background: #f8fafc;
  border-radius: 6px;
}

// 通用样式
.font-mono {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
}

.text-slate-400 {
  color: #94a3b8;
}

// 状态标签颜色
.bg-orange-100 {
  background-color: #ffedd5;
}
.text-orange-700 {
  color: #c2410c;
}
.border-orange-300 {
  border-color: #fdba74;
}

.bg-blue-100 {
  background-color: #dbeafe;
}
.text-blue-700 {
  color: #1d4ed8;
}
.border-blue-300 {
  border-color: #93c5fd;
}

.bg-slate-100 {
  background-color: #f1f5f9;
}
.text-slate-600 {
  color: #475569;
}
.text-slate-500 {
  color: #64748b;
}
.border-slate-300 {
  border-color: #cbd5e1;
}

.bg-red-100 {
  background-color: #fee2e2;
}
.text-red-700 {
  color: #b91c1c;
}
.border-red-300 {
  border-color: #fca5a5;
}

.bg-green-100 {
  background-color: #dcfce7;
}
.text-green-700 {
  color: #15803d;
}
.border-green-300 {
  border-color: #86efac;
}
</style>
