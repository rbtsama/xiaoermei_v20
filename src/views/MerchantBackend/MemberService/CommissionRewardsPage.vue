<template>
  <sidebar>
    <div class="page-container">
      <!-- 页面标题 -->
      <div class="page-header">
        <a-button @click="handleGoBack" class="back-btn">
          <a-icon type="arrow-left" />
          返回
        </a-button>
        <h1 class="page-title">分销奖励</h1>
      </div>

      <!-- 说明提示 -->
      <a-alert
        message="受邀会员在平台下单，离店后，将会计入分销奖励"
        type="info"
        show-icon
        class="info-alert"
      />

      <!-- 列表卡片 -->
      <a-card :bordered="false" class="list-card">
        <a-table
          :columns="columns"
          :data-source="tableData"
          :loading="isLoading"
          :pagination="pagination"
          @change="handleTableChange"
          rowKey="id"
          class="custom-table"
        >
          <!-- 订单号 -->
          <template slot="orderNo" slot-scope="text">
            <span class="order-no">{{ text }}</span>
          </template>

          <!-- 受邀会员 -->
          <template slot="inviteePhone" slot-scope="text">
            <span class="phone-text">{{ text }}</span>
          </template>

          <!-- 下单时间 -->
          <template slot="orderTime" slot-scope="text">
            <div class="datetime-cell">
              <div class="date">{{ formatDate(text) }}</div>
              <div class="time">{{ formatTime(text) }}</div>
            </div>
          </template>

          <!-- 离店时间 -->
          <template slot="checkOutTime" slot-scope="text">
            <div class="datetime-cell">
              <div class="date">{{ formatDate(text) }}</div>
              <div class="time">{{ formatTime(text) }}</div>
            </div>
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
import { getCommissionRecords } from '@/api/memberService'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'CommissionRewardsPage',
  components: { Sidebar },
  setup(props, { root }) {
    const isLoading = ref(false)
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
        title: '订单号',
        dataIndex: 'orderNo',
        key: 'orderNo',
        width: 150,
        scopedSlots: { customRender: 'orderNo' }
      },
      {
        title: '受邀会员',
        dataIndex: 'inviteePhone',
        key: 'inviteePhone',
        width: 120,
        scopedSlots: { customRender: 'inviteePhone' }
      },
      {
        title: '下单时间',
        dataIndex: 'orderTime',
        key: 'orderTime',
        width: 120,
        scopedSlots: { customRender: 'orderTime' }
      },
      {
        title: '离店时间',
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

    const fetchData = async () => {
      isLoading.value = true
      try {
        const { records, total } = await getCommissionRecords(pagination.current, pagination.pageSize)
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

    const handleGoBack = () => {
      root.$router.push('/merchant-backend/old-customer/invite-member')
    }

    onMounted(() => {
      fetchData()
    })

    return {
      isLoading,
      tableData,
      pagination,
      columns,
      formatDate,
      formatTime,
      handleTableChange,
      handleGoBack
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.page-container {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;

  .back-btn {
    height: 36px;
    padding: 0 16px;
    border-radius: @border-radius-base;
  }

  .page-title {
    font-size: 24px;
    font-weight: @font-weight-semibold;
    color: @text-primary;
    margin: 0;
  }
}

.info-alert {
  margin-bottom: 20px;
  border-radius: @border-radius-base;

  :deep(.ant-alert-message) {
    font-size: @font-size-base;
    color: @text-primary;
  }
}

.list-card {
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;

  :deep(.ant-card-body) {
    padding: 0;
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

.order-no {
  font-family: @font-family;
  font-weight: @font-weight-medium;
  color: @text-primary;
}

.phone-text {
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

.amount-text {
  font-weight: @font-weight-semibold;
  color: @text-primary;
  font-size: @font-size-base;
}
</style>
