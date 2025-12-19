<template>
  <sidebar>
    <div class="page-container">
      <a-card :bordered="false" class="list-card">
        <div slot="title" class="card-header">
          <span class="card-title">商户上架审核</span>
        </div>

        <a-table
          :columns="columns"
          :data-source="tableData"
          :loading="isLoading"
          :pagination="pagination"
          @change="handleTableChange"
          rowKey="id"
          class="custom-table"
        >
          <template slot="submitTime" slot-scope="submitTime">
            <div class="datetime-cell">
              <div class="date">{{ formatDate(submitTime) }}</div>
              <div class="time">{{ formatTime(submitTime) }}</div>
            </div>
          </template>

          <template slot="action" slot-scope="text, record">
            <div class="action-btns">
              <a-button size="small" @click="handleView(record)">
                <a-icon type="eye" />查看门店信息
              </a-button>
              <a-button v-if="record.status === 'pending'" size="small" @click="handleApprove(record)">
                <a-icon type="check" />准许上架
              </a-button>
              <a-tag v-else color="green">已上架</a-tag>
            </div>
          </template>
        </a-table>
      </a-card>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'MerchantApprovalListPage',
  components: { Sidebar },
  setup(props, { root }) {
    const isLoading = ref(false)
    const tableData = ref([
      { id: '1', submitTime: '2025-12-18 15:30:00', storeName: '原乡芦茨', status: 'pending' },
      { id: '2', submitTime: '2025-12-17 10:20:00', storeName: '云舍·富春江', status: 'pending' }
    ])

    const pagination = reactive({
      current: 1,
      pageSize: 10,
      total: 2,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total) => `共 ${total} 条`,
      pageSizeOptions: ['10', '20', '50', '100']
    })

    const columns = [
      { title: '提交时间', dataIndex: 'submitTime', width: 160, scopedSlots: { customRender: 'submitTime' } },
      { title: '门店名称', dataIndex: 'storeName', width: 200 },
      { title: '操作', width: 300, fixed: 'right', scopedSlots: { customRender: 'action' } }
    ]

    const formatDate = (dt) => dt ? dayjs(dt).format('YYYY-MM-DD') : '-'
    const formatTime = (dt) => dt ? dayjs(dt).format('HH:mm:ss') : '-'

    const handleView = (record) => {
      // 跳转到门店信息页面（查看模式）
      root.$router.push({
        path: '/merchant-backend/join-application/apply',
        query: { applicationId: record.id, mode: 'view', from: 'approval' }
      })
    }

    const handleApprove = (record) => {
      root.$confirm({
        title: '准许上架',
        content: `确定准许"${record.storeName}"上架吗？`,
        onOk: () => {
          record.status = 'approved'
          root.$message.success('上架成功')
        }
      })
    }

    const handleTableChange = (pag) => {
      pagination.current = pag.current
      pagination.pageSize = pag.pageSize
    }

    return {
      isLoading,
      tableData,
      pagination,
      columns,
      formatDate,
      formatTime,
      handleView,
      handleApprove,
      handleTableChange
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

.list-card {
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;

  :deep(.ant-card-head) {
    border-bottom: 1px solid @border-primary;
    padding: 16px 24px;
  }

  :deep(.ant-card-body) {
    padding: 0;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.card-title {
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;
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
    &:hover > td { background: @bg-hover; }
    > td { border-bottom: 1px solid @border-primary; padding: 12px 16px; color: @text-primary; }
  }

  :deep(.ant-table-pagination) { padding: 16px 24px; }
}

.datetime-cell {
  .date { display: block; color: @text-primary; font-size: @font-size-base; line-height: 1.5; }
  .time { display: block; color: @text-secondary; font-size: @font-size-sm; line-height: 1.5; margin-top: 2px; }
}

.action-btns {
  display: flex;
  gap: 8px;
  justify-content: flex-start;
  align-items: center;

  .ant-btn-sm {
    height: 28px;
    padding: 0 12px;
    font-size: @font-size-sm;
  }

  :deep(.ant-tag) {
    margin: 0;
  }
}
</style>
