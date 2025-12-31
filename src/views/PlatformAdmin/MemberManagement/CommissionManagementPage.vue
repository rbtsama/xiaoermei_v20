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

        <!-- 说明提示 -->
        <a-alert
          message="受邀会员在平台下单，离店后，将会计入分销奖励"
          type="info"
          show-icon
          class="info-alert"
        />

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

export default defineComponent({
  name: 'CommissionManagementPage',
  components: { Sidebar },
  setup(props, { root }) {
    const isLoading = ref(false)
    const exporting = ref(false)
    const tableData = ref([])
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
      }
    ]

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
        tableData.value = records
        pagination.total = total
      } catch (error) {
        root.$message.error('加载数据失败')
        console.error(error)
      } finally {
        isLoading.value = false
      }
    }

    const handleTableChange = (pag) => {
      pagination.current = pag.current
      pagination.pageSize = pag.pageSize
      fetchData()
    }

    /**
     * 导出分销数据
     */
    const handleExport = async () => {
      try {
        exporting.value = true
        const blob = await exportCommissionRecords()
        // 创建下载链接
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `分销奖励数据_${dayjs().format('YYYYMMDD')}.csv`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
        root.$message.success('导出成功')
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
      pagination,
      columns,
      getOrderStatusLabel,
      getOrderStatusClass,
      handleTableChange,
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

.info-alert {
  margin: 16px 24px;
  border-radius: @border-radius-base;

  :deep(.ant-alert-message) {
    font-size: @font-size-base;
    color: @text-primary;
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
