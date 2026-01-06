<template>
  <sidebar>
    <!-- 顶部导航栏 -->
    <div class="top-navbar">
      <div class="navbar-content">
        <h1 class="page-title">订单列表</h1>
        <div class="navbar-actions">
          <a-badge :count="unreadCount" :overflow-count="99">
            <a-icon type="bell" class="bell-icon" @click="handleOpenNotificationDrawer" />
          </a-badge>
        </div>
      </div>
    </div>

    <div class="p-6 space-y-6">
      <!-- 订单详情弹窗 -->
      <order-detail-dialog
        :visible="isDetailDialogOpen"
        :order="selectedOrder"
        @close="isDetailDialogOpen = false"
      />

      <!-- 商家备注弹窗 -->
      <merchant-note-dialog
        :visible="isNoteDialogOpen"
        :order-id="selectedOrderForNote ? selectedOrderForNote.id : ''"
        :current-note="selectedOrderForNote ? selectedOrderForNote.merchantNote : ''"
        @close="handleCloseNote"
        @save="handleSaveNote"
      />

      <!-- 订单变化弹窗 -->
      <order-notification-popup
        :visible.sync="orderPopupVisible"
        :order-data="currentOrderNotification"
        @mark-read="handleMarkOrderRead"
        @view-detail="handleViewOrderDetail"
        @close="orderPopupVisible = false"
      />

      <!-- 通知抽屉 -->
      <notification-drawer
        :visible.sync="notificationDrawerVisible"
        @view-order="handleViewOrderDetail"
        @close="notificationDrawerVisible = false"
      />

      <!-- 筛选表单 - 按PRD优化 -->
      <a-card class="rounded-lg border-slate-200 bg-white shadow-sm">
        <!-- 第一行：订单状态、下单时间、入住时间 -->
        <div class="flex gap-4 items-end">
          <!-- 订单状态 -->
          <div class="space-y-2" style="width: 160px">
            <label class="text-sm text-secondary">订单状态</label>
            <a-select
              v-model="filters.orderStatus"
              placeholder="全部"
              class="w-full h-9"
            >
              <a-select-option value="all">全部</a-select-option>
              <a-select-option :value="OrderStatus.PENDING_PAYMENT">待付款</a-select-option>
              <a-select-option :value="OrderStatus.PENDING_CHECKIN">待入住</a-select-option>
              <a-select-option :value="OrderStatus.CHECKED_IN">已入住</a-select-option>
              <a-select-option :value="OrderStatus.COMPLETED">已完成</a-select-option>
              <a-select-option :value="OrderStatus.CANCELLED">已取消</a-select-option>
            </a-select>
          </div>

          <!-- 下单时间 -->
          <div class="space-y-2 flex-1">
            <label class="text-sm text-secondary">下单时间</label>
            <a-range-picker
              v-model="orderCreatedRange"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              class="w-full"
              style="height: 36px"
            />
          </div>

          <!-- 入住时间 -->
          <div class="space-y-2 flex-1">
            <label class="text-sm text-secondary">入住时间</label>
            <a-range-picker
              v-model="checkInRange"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              class="w-full"
              style="height: 36px"
            />
          </div>
        </div>

        <!-- 第二行：房型、订单号、手机号、按钮 -->
        <div class="grid grid-cols-12 gap-4 mt-4">
          <!-- 房型 -->
          <div class="space-y-2 col-span-3">
            <label class="text-sm text-secondary">房型</label>
            <a-select
              v-model="filters.roomType"
              placeholder="全部房型"
              class="w-full h-9"
            >
              <a-select-option value="">全部房型</a-select-option>
              <a-select-option
                v-for="roomType in roomTypes"
                :key="roomType"
                :value="roomType"
              >
                {{ roomType }}
              </a-select-option>
            </a-select>
          </div>

          <!-- 订单号 -->
          <div class="space-y-2 col-span-3">
            <label class="text-sm text-secondary">订单号</label>
            <a-input
              v-model="filters.orderNumber"
              placeholder="输入订单号"
              class="h-9"
            />
          </div>

          <!-- 下单人手机号 -->
          <div class="space-y-2 col-span-3">
            <label class="text-sm text-secondary">下单人手机号</label>
            <a-input
              v-model="filters.guestPhone"
              placeholder="输入下单人手机号"
              class="h-9"
            />
          </div>

          <!-- 按钮区域 -->
          <div class="space-y-2 col-span-3">
            <label class="text-sm text-secondary" style="visibility: hidden;">占位</label>
            <div class="flex gap-2">
              <a-button type="primary" class="h-9 bg-blue-600" @click="handleSearch">
                <a-icon type="search" />
                搜索
              </a-button>
              <a-button class="h-9 border-slate-300" @click="handleReset">
                重置
              </a-button>
            </div>
          </div>
        </div>
      </a-card>

      <!-- 订单列表 -->
      <a-card class="rounded-lg border-slate-200 bg-white shadow-sm">
        <div slot="title" class="text-lg font-semibold text-primary">订单列表</div>

        <div class="border border-slate-200 rounded-lg overflow-hidden">
          <a-table
            :columns="columns"
            :data-source="orders"
            :pagination="paginationConfig"
            :loading="loading"
            :scroll="{ x: 1400 }"
            row-key="id"
            @change="handleTableChange"
          >
            <!-- 订单号 -->
            <template slot="orderNumber" slot-scope="orderNumber">
              <span class="text-sm text-primary">{{ orderNumber }}</span>
            </template>

            <!-- 入离日期（带icon标签） -->
            <template slot="checkInDates" slot-scope="text, record">
              <div class="text-sm space-y-1">
                <div class="flex items-center gap-1">
                  <span class="date-icon-in">入</span>
                  <span class="text-primary">{{ record.checkInDate }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <span class="date-icon-out">离</span>
                  <span class="text-primary">{{ record.checkOutDate }}</span>
                </div>
              </div>
            </template>

            <!-- 房型 -->
            <template slot="roomType" slot-scope="roomType">
              <span class="text-sm text-primary">{{ roomType }}</span>
            </template>

            <!-- 支付金额 -->
            <template slot="actualAmount" slot-scope="actualAmount">
              <span class="text-primary">¥{{ actualAmount }}</span>
            </template>

            <!-- 订单状态 -->
            <template slot="status" slot-scope="status">
              <a-tag :class="getStatusTagClass(status)">
                {{ ORDER_STATUS_LABELS[status] }}
              </a-tag>
            </template>

            <!-- 下单人信息 -->
            <template slot="userInfo" slot-scope="text, record">
              <div class="text-sm">
                <div class="text-primary">{{ record.userName }}</div>
                <div class="text-xs text-secondary">{{ record.userPhone }}</div>
              </div>
            </template>

            <!-- 入住人信息 -->
            <template slot="guestInfo" slot-scope="text, record">
              <span class="text-sm text-primary">{{ record.guestName }}</span>
            </template>

            <!-- 退款记录（状态标签+金额） -->
            <template slot="refundRecord" slot-scope="text, record">
              <div v-if="record.refundRecords && record.refundRecords.length > 0">
                <div class="flex flex-col gap-1">
                  <a-tag :class="getRefundStatusClass(getLatestRefundStatus(record.refundRecords))">
                    {{ getLatestRefundStatus(record.refundRecords) }}
                  </a-tag>
                  <span :class="getRefundAmountClass(getLatestRefundStatus(record.refundRecords))">
                    {{ getRefundAmountText(record.refundRecords) }}
                  </span>
                </div>
              </div>
              <span v-else class="text-tertiary text-sm">-</span>
            </template>

            <!-- 下单时间（日期和时间分两行） -->
            <template slot="createdAt" slot-scope="createdAt">
              <div class="text-sm">
                <div class="text-primary">{{ createdAt.split(' ')[0] }}</div>
                <div class="text-xs text-secondary">{{ createdAt.split(' ')[1] }}</div>
              </div>
            </template>

            <!-- 操作 -->
            <template slot="action" slot-scope="text, record">
              <div class="action-btns">
                <!-- 取消订单按钮（仅待入住状态显示） -->
                <a-button
                  v-if="record.status === OrderStatus.PENDING_CHECKIN"
                  size="small"
                  class="h-7"
                  @click="handleCancelOrder(record)"
                >
                  取消订单
                </a-button>

                <!-- 备注按钮 -->
                <a-button
                  size="small"
                  class="h-7"
                  @click="handleOpenNote(record)"
                >
                  备注
                </a-button>

                <!-- 详情按钮 -->
                <a-button
                  size="small"
                  class="h-7"
                  @click="handleViewDetail(record)"
                >
                  详情
                </a-button>
              </div>
            </template>
          </a-table>
        </div>
      </a-card>
    </div>
  </sidebar>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import OrderDetailDialog from './components/OrderDetailDialog.vue'
import MerchantNoteDialog from './components/MerchantNoteDialog.vue'
import OrderNotificationPopup from '@/views/MerchantBackend/components/OrderNotificationPopup.vue'
import NotificationDrawer from '@/views/MerchantBackend/components/NotificationDrawer.vue'
import OrderListService from './services/orderList.service'
import type { Order, OrderFilterParams } from '@/views/PlatformAdmin/OrderManagement/types/order.types'
import { OrderStatus, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/views/PlatformAdmin/OrderManagement/types/order.types'
import { mockOrderChangeNotifications, mockNotifications } from '@/mocks/notification.mock'
import { NotificationStatus } from '@/types/notification'

export default defineComponent({
  name: 'MerchantOrderListPage',
  components: {
    Sidebar,
    OrderDetailDialog,
    MerchantNoteDialog,
    OrderNotificationPopup,
    NotificationDrawer
  },

  setup(props, { root }) {
    // ========== 状态管理 ==========
    const loading = ref(false)
    const orders = ref<Order[]>([])
    const total = ref(0)
    const currentPage = ref(1)
    const pageSize = ref(10)

    // 日期范围（独立ref，避免响应式问题）
    const orderCreatedRange = ref<any[]>([])
    const checkInRange = ref<any[]>([])

    // 筛选条件（商户端：房型代替酒店）
    const filters = reactive({
      orderStatus: 'all',
      roomType: '',
      orderNumber: '',
      guestPhone: ''
    })

    // 房型列表
    const roomTypes = ref<string[]>([])

    // 详情弹窗
    const isDetailDialogOpen = ref(false)
    const selectedOrder = ref<Order | null>(null)

    // 备注弹窗
    const isNoteDialogOpen = ref(false)
    const selectedOrderForNote = ref<Order | null>(null)

    // ========== 通知系统 ==========
    // 未读通知数量
    const unreadCount = computed(() => {
      return mockNotifications.filter(n => n.status === NotificationStatus.UNREAD).length
    })

    // 订单变化弹窗
    const orderPopupVisible = ref(false)
    const currentOrderNotification = ref<any>({})

    // 通知抽屉
    const notificationDrawerVisible = ref(false)

    // 页面加载时随机显示一个订单变化通知
    const showRandomOrderNotification = () => {
      if (mockOrderChangeNotifications.length > 0) {
        const randomIndex = Math.floor(Math.random() * mockOrderChangeNotifications.length)
        currentOrderNotification.value = mockOrderChangeNotifications[randomIndex]
        orderPopupVisible.value = true
      }
    }

    // 打开通知抽屉
    const handleOpenNotificationDrawer = () => {
      notificationDrawerVisible.value = true
    }

    // 标记订单变化为已读
    const handleMarkOrderRead = (id: string) => {
      console.log('标记订单变化已读:', id)
      // TODO: 调用API标记已读
    }

    // 查看订单详情
    const handleViewOrderDetail = (orderNo: string) => {
      console.log('查看订单详情:', orderNo)
      // 查找订单数据
      const order = orders.value.find(o => o.orderNumber === orderNo)
      if (order) {
        selectedOrder.value = order
        isDetailDialogOpen.value = true
      } else {
        root.$message.warning('未找到订单信息')
      }
    }

    // ========== 表格配置（参考平台端，去掉酒店列，房型放在入住日期后面） ==========
    const columns = [
      { title: '订单号', dataIndex: 'orderNumber', width: 140, scopedSlots: { customRender: 'orderNumber' } },
      { title: '状态', dataIndex: 'status', width: 100, scopedSlots: { customRender: 'status' } },
      { title: '下单人', width: 140, scopedSlots: { customRender: 'userInfo' } },
      { title: '入住人', width: 100, scopedSlots: { customRender: 'guestInfo' } },
      { title: '下单时间', dataIndex: 'createdAt', width: 160, scopedSlots: { customRender: 'createdAt' } },
      { title: '入住日期', width: 160, scopedSlots: { customRender: 'checkInDates' } },
      { title: '房型', dataIndex: 'roomType', width: 180, scopedSlots: { customRender: 'roomType' } },
      { title: '支付金额', dataIndex: 'actualAmount', width: 100, scopedSlots: { customRender: 'actualAmount' } },
      { title: '退款记录', width: 120, scopedSlots: { customRender: 'refundRecord' } },
      { title: '操作', width: 200, scopedSlots: { customRender: 'action' } }
    ]

    // 分页配置
    const paginationConfig = computed(() => ({
      current: currentPage.value,
      pageSize: pageSize.value,
      total: total.value,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total: number) => `共 ${total} 条`
    }))

    // ========== 数据加载 ==========
    const fetchOrders = async () => {
      loading.value = true
      try {
        const params: any = {
          orderStatus: filters.orderStatus === 'all' ? undefined : filters.orderStatus,
          orderCreatedStart: orderCreatedRange.value?.[0] || undefined,
          orderCreatedEnd: orderCreatedRange.value?.[1] || undefined,
          checkInStart: checkInRange.value?.[0] || undefined,
          checkInEnd: checkInRange.value?.[1] || undefined,
          roomType: filters.roomType || undefined,
          // 订单号和手机号合并为searchKeyword传给service
          searchKeyword: filters.orderNumber || filters.guestPhone || undefined,
          page: currentPage.value,
          pageSize: pageSize.value
        }

        const response = await OrderListService.getOrderList(params)
        orders.value = response.orders
        total.value = response.total
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      } finally {
        loading.value = false
      }
    }

    // 获取房型列表
    const fetchRoomTypes = async () => {
      try {
        roomTypes.value = await OrderListService.getRoomTypes()
      } catch (error) {
        console.error('Failed to fetch room types:', error)
      }
    }

    // ========== 事件处理 ==========
    const handleSearch = () => {
      currentPage.value = 1
      fetchOrders()
    }

    const handleReset = () => {
      filters.orderStatus = 'all'
      orderCreatedRange.value = []
      checkInRange.value = []
      filters.roomType = ''
      filters.orderNumber = ''
      filters.guestPhone = ''
      currentPage.value = 1
      fetchOrders()
    }

    // 取消订单
    const handleCancelOrder = (order: Order) => {
      root.$confirm({
        title: '确认取消订单',
        content: `订单号：${order.orderNumber}\n取消后订单状态将变为"已取消"，确定要取消吗？`,
        okText: '确认取消',
        cancelText: '我再想想',
        onOk: async () => {
          try {
            await OrderListService.cancelOrder(order.id)
            root.$message.success('订单已取消')
            fetchOrders()
          } catch (error: any) {
            root.$message.error(error.message || '取消订单失败')
          }
        }
      })
    }

    // 打开备注弹窗
    const handleOpenNote = (order: Order) => {
      selectedOrderForNote.value = order
      isNoteDialogOpen.value = true
    }

    // 关闭备注弹窗
    const handleCloseNote = () => {
      isNoteDialogOpen.value = false
      selectedOrderForNote.value = null
    }

    // 保存备注
    const handleSaveNote = async (payload: { orderId: string; note: string }) => {
      try {
        await OrderListService.updateMerchantNote(payload.orderId, payload.note)
        root.$message.success('备注保存成功')
        handleCloseNote()
        fetchOrders()
      } catch (error) {
        root.$message.error('保存备注失败')
      }
    }

    const handleTableChange = (pagination: any) => {
      currentPage.value = pagination.current
      pageSize.value = pagination.pageSize
      fetchOrders()
    }

    const handleViewDetail = (order: Order) => {
      selectedOrder.value = order
      isDetailDialogOpen.value = true
    }

    // ========== 样式辅助 ==========
    const getStatusTagClass = (status: OrderStatus) => {
      const color = ORDER_STATUS_COLORS[status]
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
    const getRefundStatusClass = (status: string) => {
      const statusMap: Record<string, string> = {
        '客人发起申诉': 'bg-orange-100 text-orange-700 border-orange-300',  // 橙色
        '客人撤诉': 'bg-slate-100 text-slate-600 border-slate-300',          // 灰色
        '退款申请': 'bg-orange-100 text-orange-700 border-orange-300',       // 橙色
        '平台支持退款': 'bg-green-100 text-green-700 border-green-300',     // 绿色
        '门店退款': 'bg-green-100 text-green-700 border-green-300',         // 绿色
        '平台拒绝退款': 'bg-red-100 text-red-700 border-red-300'            // 红色
      }
      return statusMap[status] || 'bg-gray-100 text-gray-700 border-gray-300'
    }

    // 获取最新退款状态（取最后一条）
    const getLatestRefundStatus = (refundRecords: any[]) => {
      if (!refundRecords || refundRecords.length === 0) return ''
      return refundRecords[refundRecords.length - 1].status
    }

    // 获取最新退款金额
    const getLatestRefundAmount = (refundRecords: any[]) => {
      if (!refundRecords || refundRecords.length === 0) return 0
      const latestRecord = refundRecords[refundRecords.length - 1]
      return latestRecord.amount || 0
    }

    // 获取退款金额文本（带"申请"/"已退"前缀）
    const getRefundAmountText = (refundRecords: any[]) => {
      if (!refundRecords || refundRecords.length === 0) return '-'
      const latestRecord = refundRecords[refundRecords.length - 1]
      const status = latestRecord.status

      // 平台支持退款、门店退款：显示"已退XXX元"
      if (status === '平台支持退款' || status === '门店退款') {
        const amount = latestRecord.amount || 0
        return `已退¥${amount}`
      }

      // 其他所有情况（客人发起申诉、客人撤诉、平台拒绝退款）：显示"申请XXX元"
      const amount = latestRecord.requestAmount || 0
      return `申请¥${amount}`
    }

    // 获取退款金额显示样式（平台支持/门店退款红色，其他灰色）
    const getRefundAmountClass = (status: string) => {
      if (status === '平台支持退款' || status === '门店退款') {
        return 'refund-amount-red'
      }
      return 'refund-amount-gray'
    }

    // ========== 生命周期 ==========
    onMounted(() => {
      fetchOrders()
      fetchRoomTypes()
      // 页面加载后延迟1秒显示订单变化通知
      setTimeout(() => {
        showRandomOrderNotification()
      }, 1000)
    })

    return {
      // 状态
      loading,
      orders,
      filters,
      orderCreatedRange,
      checkInRange,
      roomTypes,
      isDetailDialogOpen,
      selectedOrder,
      isNoteDialogOpen,
      selectedOrderForNote,

      // 通知系统
      unreadCount,
      orderPopupVisible,
      currentOrderNotification,
      notificationDrawerVisible,

      // 表格
      columns,
      paginationConfig,

      // 枚举
      OrderStatus,
      ORDER_STATUS_LABELS,

      // 方法
      handleSearch,
      handleReset,
      handleTableChange,
      handleViewDetail,
      handleCancelOrder,
      handleOpenNote,
      handleCloseNote,
      handleSaveNote,
      getStatusTagClass,
      getRefundStatusClass,
      getLatestRefundStatus,
      getLatestRefundAmount,
      getRefundAmountText,
      getRefundAmountClass,

      // 通知方法
      handleOpenNotificationDrawer,
      handleMarkOrderRead,
      handleViewOrderDetail
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.p-6 {
  padding: 24px;
}

.space-y-6 > * + * {
  margin-top: 24px;
}

.space-y-2 > * + * {
  margin-top: 8px;
}

.space-y-1 > * + * {
  margin-top: 4px;
}

// ========================================
// 文字颜色系统（使用全局变量）
// ========================================
.text-primary {
  color: @text-primary;  // 90% 黑色 - 主文字
}

.text-secondary {
  color: @text-secondary;  // #666 - 辅助性文字（日期时间）
}

.text-tertiary {
  color: @text-tertiary;  // #B1B1B1 - 暗提示文字
}

// 入离日期icon标签样式（圆形浅灰底深灰字）
.date-icon-in,
.date-icon-out {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: @font-size-xs;
  font-weight: @font-weight-semibold;
  color: @text-primary;
  background-color: @bg-tertiary;
  border-radius: 50%;
}

.rounded-lg {
  border-radius: @border-radius-lg;
}

.border-slate-200 {
  border-color: @border-primary;
}

.bg-white {
  background-color: @bg-primary;
}

.shadow-sm {
  box-shadow: @shadow-sm;
}

.grid {
  display: grid;
}

.grid-cols-6 {
  grid-template-columns: repeat(6, minmax(0, 1fr));
}

.grid-cols-12 {
  grid-template-columns: repeat(12, minmax(0, 1fr));
}

.col-span-2 {
  grid-column: span 2 / span 2;
}

.col-span-3 {
  grid-column: span 3 / span 3;
}

.col-span-4 {
  grid-column: span 4 / span 4;
}

.col-span-9 {
  grid-column: span 9 / span 9;
}

.gap-2 {
  gap: 8px;
}

.gap-4 {
  gap: 16px;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-end {
  justify-content: flex-end;
}

.h-7 {
  height: 28px;
}

.h-9 {
  height: 36px;
}

.px-3 {
  padding-left: 12px;
  padding-right: 12px;
}

.text-sm {
  font-size: @font-size-base;
}

.text-xs {
  font-size: @font-size-xs;
}

.text-lg {
  font-size: @font-size-xl;
}

.font-semibold {
  font-weight: @font-weight-semibold;
}

.font-medium {
  font-weight: @font-weight-medium;
}

.text-blue-600 {
  color: @brand-primary-hover;
}

.border-blue-300 {
  border-color: @brand-primary-light;
}

.border-slate-300 {
  border-color: @border-secondary;
}

.bg-blue-600 {
  background-color: @brand-primary-hover;
}

.whitespace-nowrap {
  white-space: nowrap;
}

/* 状态标签样式 - 使用Tailwind utility类映射 */
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
  background-color: @brand-primary-light;
}
.text-blue-700 {
  color: #1d4ed8;
}

.bg-slate-100 {
  background-color: @bg-tertiary;
}
.text-slate-700 {
  color: #334155;
}
.text-slate-500 {
  color: #64748b;
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

// 退款记录颜色
.bg-green-100 {
  background-color: #dcfce7;
}
.text-green-700 {
  color: #15803d;
}
.border-green-300 {
  border-color: #86efac;
}

.text-slate-600 {
  color: #475569;
}

// 列表页退款金额样式
.refund-amount-red {
  font-size: @font-size-sm;
  color: @error-color;
  font-weight: @font-weight-semibold;
}

.refund-amount-gray {
  font-size: @font-size-sm;
  color: @text-tertiary;
  font-weight: @font-weight-medium;
}

.flex-col {
  flex-direction: column;
}

.gap-1 {
  gap: 4px;
}

.mt-4 {
  margin-top: 16px;
}

.w-full {
  width: 100%;
}

.flex-1 {
  flex: 1 1 0%;
}

// ========================================
// 表格样式优化
// ========================================
:deep(.ant-table) {
  thead tr {
    background-color: @bg-secondary;  // 表头背景色

    th {
      color: @text-primary;
      font-weight: @font-weight-semibold;
    }
  }

  tbody tr {
    transition: @transition-fast;

    &:hover {
      background-color: @bg-hover;  // hover 背景色
    }
  }
}

// 操作按钮样式（已在common.less中定义，此处可删除）
// .action-btns {
//   display: flex;
//   gap: 8px;
//   align-items: center;
//   justify-content: center;
// }

// ========== 顶部导航栏样式 ==========
.top-navbar {
  background: @bg-primary;
  border-bottom: 1px solid @border-primary;
  box-shadow: @shadow-sm;
  position: sticky;
  top: 0;
  z-index: 100;

  .navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    max-width: 1800px;
    margin: 0 auto;

    .page-title {
      font-size: @font-size-2xl;
      font-weight: @font-weight-semibold;
      color: @text-primary;
      margin: 0;
    }

    .navbar-actions {
      display: flex;
      align-items: center;
      gap: 16px;

      .bell-icon {
        font-size: 20px;
        color: @text-secondary;
        cursor: pointer;
        transition: color 0.2s;

        &:hover {
          color: @brand-primary;
        }
      }

      :deep(.ant-badge-count) {
        background-color: @error-color;
        box-shadow: 0 0 0 1px @bg-primary;
      }
    }
  }
}
</style>
