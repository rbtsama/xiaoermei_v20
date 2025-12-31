<template>
  <sidebar>
    <div class="page-container">
      <!-- 页面标题和导出按钮 -->
      <a-card :bordered="false" class="list-card">
        <div slot="title" class="card-header">
          <span class="card-title">分销管理</span>
          <a-button type="primary" @click="handleExport" :loading="exporting">
            <a-icon type="download" />
            导出数据
          </a-button>
        </div>

        <!-- 筛选和说明 -->
        <div class="filter-section">
          <a-alert
            message="受邀会员在平台下单，离店后，将会计入分销奖励"
            type="info"
            show-icon
            class="info-alert"
          />
          <div class="filter-controls">
            <span class="filter-label">离店日期</span>
            <a-select
              v-model="filters.year"
              placeholder="年"
              style="width: 100px;"
              @change="handleFilterChange"
              allowClear
            >
              <a-select-option value="2025">2025年</a-select-option>
              <a-select-option value="2024">2024年</a-select-option>
            </a-select>
            <a-select
              v-model="filters.month"
              placeholder="月"
              style="width: 100px;"
              @change="handleFilterChange"
              allowClear
            >
              <a-select-option :value="1">1月</a-select-option>
              <a-select-option :value="2">2月</a-select-option>
              <a-select-option :value="3">3月</a-select-option>
              <a-select-option :value="4">4月</a-select-option>
              <a-select-option :value="5">5月</a-select-option>
              <a-select-option :value="6">6月</a-select-option>
              <a-select-option :value="7">7月</a-select-option>
              <a-select-option :value="8">8月</a-select-option>
              <a-select-option :value="9">9月</a-select-option>
              <a-select-option :value="10">10月</a-select-option>
              <a-select-option :value="11">11月</a-select-option>
              <a-select-option :value="12">12月</a-select-option>
            </a-select>
          </div>
        </div>

        <!-- 表格 -->
        <a-table
          :columns="columns"
          :data-source="tableData"
          :loading="isLoading"
          :pagination="pagination"
          @change="handleTableChange"
          rowKey="id"
          class="custom-table"
        >
          <!-- 商户名称 -->
          <template slot="merchantName" slot-scope="text">
            <span class="merchant-text">{{ text }}</span>
          </template>

          <!-- 受邀会员 -->
          <template slot="inviteePhone" slot-scope="text">
            <span class="phone-text">{{ text }}</span>
          </template>

          <!-- 订单号 -->
          <template slot="orderNo" slot-scope="text">
            <span class="order-no">{{ text }}</span>
          </template>

          <!-- 订单状态 -->
          <template slot="orderStatus" slot-scope="text">
            <a-tag :class="getOrderStatusClass(text)">
              {{ getOrderStatusLabel(text) }}
            </a-tag>
          </template>

          <!-- 下单人 -->
          <template slot="customerName" slot-scope="text">
            <span class="customer-text">{{ text }}</span>
          </template>

          <!-- 入住人 -->
          <template slot="guestName" slot-scope="text">
            <span class="guest-text">{{ text }}</span>
          </template>

          <!-- 下单时间 -->
          <template slot="orderTime" slot-scope="text">
            <div class="datetime-cell">
              <div class="date">{{ formatDate(text) }}</div>
              <div class="time">{{ formatTime(text) }}</div>
            </div>
          </template>

          <!-- 离店日期 -->
          <template slot="checkOutTime" slot-scope="text">
            <span class="checkout-date">{{ formatDate(text) }}</span>
          </template>

          <!-- 支付金额 -->
          <template slot="paymentAmount" slot-scope="text">
            <span class="amount-text">¥{{ text.toFixed(2) }}</span>
          </template>
        </a-table>
      </a-card>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import { getPlatformCommissionRecords, exportCommissionRecords } from '@/api/memberService'
import { OrderStatus } from '@/types/memberService'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'CommissionManagementPage',
  components: { Sidebar },
  setup(props, { root }) {
    const isLoading = ref(false)
    const exporting = ref(false)
    const tableData = ref([])
    const filters = reactive({
      year: undefined,
      month: undefined
    })
    const pagination = reactive({
      current: 1,
      pageSize: 10,
      total: 0,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total) => `共 ${total} 条`,
      pageSizeOptions: ['10', '20', '50', '100']
    })

    const columns = [
      {
        title: '商户名称',
        dataIndex: 'merchantName',
        key: 'merchantName',
        width: 150,
        scopedSlots: { customRender: 'merchantName' }
      },
      {
        title: '受邀会员',
        dataIndex: 'inviteePhone',
        key: 'inviteePhone',
        width: 120,
        scopedSlots: { customRender: 'inviteePhone' }
      },
      {
        title: '订单号',
        dataIndex: 'orderNo',
        key: 'orderNo',
        width: 150,
        scopedSlots: { customRender: 'orderNo' }
      },
      {
        title: '订单状态',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        width: 100,
        scopedSlots: { customRender: 'orderStatus' }
      },
      {
        title: '下单人',
        dataIndex: 'customerName',
        key: 'customerName',
        width: 100,
        scopedSlots: { customRender: 'customerName' }
      },
      {
        title: '入住人',
        dataIndex: 'guestName',
        key: 'guestName',
        width: 100,
        scopedSlots: { customRender: 'guestName' }
      },
      {
        title: '下单时间',
        dataIndex: 'orderTime',
        key: 'orderTime',
        width: 120,
        scopedSlots: { customRender: 'orderTime' }
      },
      {
        title: '离店日期',
        dataIndex: 'checkOutTime',
        key: 'checkOutTime',
        width: 120,
        scopedSlots: { customRender: 'checkOutTime' }
      },
      {
        title: '支付金额',
        dataIndex: 'paymentAmount',
        key: 'paymentAmount',
        width: 100,
        scopedSlots: { customRender: 'paymentAmount' }
      }
    ]

    const formatDate = (datetime) => datetime ? dayjs(datetime).format('YYYY-MM-DD') : '-'
    const formatTime = (datetime) => datetime ? dayjs(datetime).format('HH:mm:ss') : '-'

    const getOrderStatusLabel = (status) => {
      const labels = {
        [OrderStatus.PENDING]: '待确认',
        [OrderStatus.CONFIRMED]: '已确认',
        [OrderStatus.CHECKED_IN]: '已入住',
        [OrderStatus.CHECKED_OUT]: '已离店',
        [OrderStatus.CANCELLED]: '已取消'
      }
      return labels[status] || '-'
    }

    const getOrderStatusClass = (status) => {
      const classes = {
        [OrderStatus.PENDING]: 'tag-gray',
        [OrderStatus.CONFIRMED]: 'tag-blue',
        [OrderStatus.CHECKED_IN]: 'tag-purple',
        [OrderStatus.CHECKED_OUT]: 'tag-green',
        [OrderStatus.CANCELLED]: 'tag-red'
      }
      return classes[status] || 'tag-gray'
    }

    const fetchData = async () => {
      isLoading.value = true
      try {
        const { records, total } = await getPlatformCommissionRecords(pagination.current, pagination.pageSize)

        // 前端筛选（按离店时间年月）
        let filtered = records
        if (filters.year || filters.month) {
          filtered = records.filter(record => {
            const checkOutDate = new Date(record.checkOutTime)
            const year = checkOutDate.getFullYear()
            const month = checkOutDate.getMonth() + 1

            if (filters.year && year !== parseInt(filters.year)) {
              return false
            }
            if (filters.month && month !== filters.month) {
              return false
            }
            return true
          })
        }

        tableData.value = filtered
        pagination.total = filtered.length
      } catch (error) {
        root.$message.error('加载数据失败')
        console.error(error)
      } finally {
        isLoading.value = false
      }
    }

    const handleFilterChange = () => {
      pagination.current = 1
      fetchData()
    }

    const handleTableChange = (pag) => {
      pagination.current = pag.current
      pagination.pageSize = pag.pageSize
      fetchData()
    }

    /**
     * 导出分销数据（导出当前筛选后的数据，包含所有字段）
     */
    const handleExport = async () => {
      try {
        exporting.value = true

        // 构建CSV内容（使用当前筛选后的数据）
        const headers = ['商户名称', '受邀会员', '订单号', '订单状态', '下单人', '入住人', '下单时间', '离店日期', '支付金额']
        const csvRows = [headers.join(',')]

        // 导出当前tableData（已筛选）
        tableData.value.forEach(record => {
          const row = [
            record.merchantName || '',
            record.inviteePhone || '',
            record.orderNo || '',
            getOrderStatusLabel(record.orderStatus) || '',
            record.customerName || '',
            record.guestName || '',
            record.orderTime || '',
            formatDate(record.checkOutTime) || '',
            record.paymentAmount ? `¥${record.paymentAmount.toFixed(2)}` : ''
          ]
          csvRows.push(row.join(','))
        })

        const csvContent = '\uFEFF' + csvRows.join('\n') // BOM for Excel
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })

        // 创建下载链接
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `分销奖励数据_${dayjs().format('YYYYMMDD')}.csv`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)

        root.$message.success(`成功导出 ${tableData.value.length} 条数据`)
      } catch (error) {
        root.$message.error('导出失败')
        console.error(error)
      } finally {
        exporting.value = false
      }
    }

    onMounted(() => {
      fetchData()
    })

    return {
      isLoading,
      exporting,
      tableData,
      filters,
      pagination,
      columns,
      formatDate,
      formatTime,
      getOrderStatusLabel,
      getOrderStatusClass,
      handleTableChange,
      handleFilterChange,
      handleExport
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.page-container {
  padding: 24px;
  max-width: 1800px;
  margin: 0 auto;
}

.list-card {
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;

  :deep(.ant-card-head) {
    border-bottom: 1px solid @bg-tertiary;
    padding: 16px 24px;
  }

  :deep(.ant-card-body) {
    padding: 0;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.card-title {
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

.filter-section {
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  .info-alert {
    flex: 1;
    margin: 0;
    border-radius: @border-radius-base;

    :deep(.ant-alert-message) {
      font-size: @font-size-base;
      color: @text-primary;
    }
  }

  .filter-controls {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;

    .filter-label {
      font-size: @font-size-base;
      font-weight: @font-weight-medium;
      color: @text-primary;
      white-space: nowrap;
    }

    // 确保placeholder正常显示
    :deep(.ant-select-selection__placeholder) {
      color: @text-tertiary !important;
      opacity: 1 !important;
    }

    :deep(.ant-select-selection-selected-value) {
      color: @text-primary !important;
    }
  }
}

.custom-table {
  :deep(.ant-table-thead > tr > th) {
    background: @bg-secondary;
    border-bottom: 1px solid @border-primary;
    color: @text-primary;
    font-weight: @font-weight-semibold;
    font-size: @font-size-base;
    padding: 12px 16px;
  }

  :deep(.ant-table-tbody > tr) {
    &:hover > td {
      background: @bg-hover;
    }

    > td {
      border-bottom: 1px solid @border-primary;
      padding: 12px 16px;
      color: @text-primary;
    }
  }

  :deep(.ant-table-pagination) {
    padding: 16px 24px;
  }
}

.merchant-text {
  font-weight: @font-weight-medium;
  color: @text-primary;
}

.order-no {
  font-family: @font-family;
  font-weight: @font-weight-medium;
  color: @text-primary;
}

.phone-text {
  font-weight: @font-weight-medium;
  color: @text-primary;
}

.customer-text {
  font-weight: @font-weight-medium;
  color: @text-primary;
}

.guest-text {
  font-weight: @font-weight-medium;
  color: @text-primary;
}

.datetime-cell {
  .date {
    display: block;
    color: @text-primary;
    font-size: @font-size-base;
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

.checkout-date {
  color: @brand-primary;
  font-weight: @font-weight-medium;
  font-size: @font-size-base;
}

.amount-text {
  font-weight: @font-weight-semibold;
  color: @text-primary;
  font-size: @font-size-base;
}

.tag-green {
  color: #15803d;
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.tag-gray {
  color: #64748b;
  background: #f8fafc;
  border-color: #cbd5e1;
}

.tag-blue {
  color: #1d4ed8;
  background: #eff6ff;
  border-color: #bfdbfe;
}

.tag-purple {
  color: #7c3aed;
  background: #f5f3ff;
  border-color: #ddd6fe;
}

.tag-red {
  color: #b91c1c;
  background: #fee2e2;
  border-color: #fca5a5;
}

:deep(.ant-tag) {
  margin: 0;
  padding: 2px 8px;
  font-size: @font-size-xs;
  font-weight: @font-weight-medium;
  line-height: 20px;
  border-radius: @border-radius-sm;
  border-width: 1px;
}
</style>
