<template>
  <sidebar>
    <div class="page-container">
      <!-- 页面标题和操作按钮 -->
      <a-card :bordered="false" class="header-card">
        <div class="header-content">
          <h1 class="page-title">通知任务</h1>
          <a-button type="primary" @click="handleCreateTask">
            <a-icon type="plus" />
            创建通知任务
          </a-button>
        </div>
      </a-card>

      <!-- 历史发送记录 -->
      <a-card :bordered="false" class="list-card">
        <div slot="title" class="card-header">
          <span class="card-title">历史发送记录</span>
        </div>

        <a-table
          :columns="columns"
          :data-source="records"
          :pagination="pagination"
          :loading="loading"
          rowKey="id"
          class="custom-table"
        >
          <!-- 内容 -->
          <template slot="content" slot-scope="content">
            <div class="content-cell">
              {{ content }}
            </div>
          </template>

          <!-- 需要同意 -->
          <template slot="requireAgreement" slot-scope="requireAgreement">
            <a-tag v-if="requireAgreement" class="tag-orange">是</a-tag>
            <span v-else class="text-gray">否</span>
          </template>

          <!-- 跳转链接 -->
          <template slot="link" slot-scope="link">
            <span v-if="link" class="link-text">{{ link }}</span>
            <span v-else class="text-gray">无</span>
          </template>

          <!-- 发送商户 -->
          <template slot="merchantList" slot-scope="text, record">
            <div class="merchant-list">
              <span class="merchant-count" @click="handleShowMerchants(record)">
                {{ record.merchantCount }}个商户
              </span>
            </div>
          </template>

          <!-- 发送时间 -->
          <template slot="sentAt" slot-scope="sentAt">
            <div class="datetime-cell">
              <div class="date">{{ formatDate(sentAt) }}</div>
              <div class="time">{{ formatTime(sentAt) }}</div>
            </div>
          </template>
        </a-table>
      </a-card>

      <!-- 创建通知任务弹窗 -->
      <create-notification-dialog
        :visible.sync="dialogVisible"
        @success="handleCreateSuccess"
        @close="dialogVisible = false"
      />

      <!-- 商户列表弹窗 -->
      <a-modal
        :visible="merchantDialogVisible"
        title="发送商户"
        :width="500"
        :footer="null"
        @cancel="merchantDialogVisible = false"
      >
        <div class="merchant-dialog-content">
          {{ currentMerchantListText }}
        </div>
      </a-modal>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, reactive } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import CreateNotificationDialog from './CreateNotificationDialog.vue'
import { mockNotificationRecords } from '@/mocks/notification.mock'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'NotificationTaskPage',
  components: {
    Sidebar,
    CreateNotificationDialog
  },
  setup(props, { root }) {
    const loading = ref(false)
    const records = ref([...mockNotificationRecords])
    const dialogVisible = ref(false)
    const merchantDialogVisible = ref(false)
    const currentMerchantListText = ref('')

    const pagination = reactive({
      current: 1,
      pageSize: 10,
      total: records.value.length,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total) => `共 ${total} 条`,
      pageSizeOptions: ['10', '20', '50', '100']
    })

    const columns = [
      {
        title: '内容',
        dataIndex: 'content',
        scopedSlots: { customRender: 'content' }
      },
      {
        title: '需要同意',
        dataIndex: 'requireAgreement',
        width: 100,
        scopedSlots: { customRender: 'requireAgreement' }
      },
      {
        title: '跳转链接',
        dataIndex: 'link',
        width: 180,
        scopedSlots: { customRender: 'link' }
      },
      {
        title: '发送商户',
        width: 120,
        scopedSlots: { customRender: 'merchantList' }
      },
      {
        title: '发送人',
        dataIndex: 'senderName',
        width: 100
      },
      {
        title: '发送时间',
        dataIndex: 'sentAt',
        width: 140,
        scopedSlots: { customRender: 'sentAt' }
      }
    ]

    const formatDate = (datetime) => {
      return datetime ? dayjs(datetime).format('YYYY-MM-DD') : '-'
    }

    const formatTime = (datetime) => {
      return datetime ? dayjs(datetime).format('HH:mm:ss') : '-'
    }

    const handleCreateTask = () => {
      dialogVisible.value = true
    }

    const handleCreateSuccess = () => {
      // 刷新列表
      // TODO: 重新加载数据
      root.$message.success('通知任务创建成功')
    }

    const handleShowMerchants = (record) => {
      currentMerchantListText.value = record.merchantList.join('，')
      merchantDialogVisible.value = true
    }

    return {
      loading,
      records,
      pagination,
      columns,
      dialogVisible,
      merchantDialogVisible,
      currentMerchantListText,
      formatDate,
      formatTime,
      handleCreateTask,
      handleCreateSuccess,
      handleShowMerchants
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';
@import '@/styles/common.less';

.page-container {
  padding: 24px;
  max-width: 1800px;
  margin: 0 auto;
}

.header-card {
  margin-bottom: 20px;
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;

  :deep(.ant-card-body) {
    padding: 20px 24px;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .page-title {
      font-size: @font-size-2xl;
      font-weight: @font-weight-semibold;
      color: @text-primary;
      margin: 0;
    }
  }
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
  width: 100%;

  .card-title {
    font-size: @font-size-lg;
    font-weight: @font-weight-semibold;
    color: @text-primary;
  }
}

.content-cell {
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.5;
  color: @text-primary;
  font-size: @font-size-sm;
}

.merchant-list {
  .merchant-count {
    color: @brand-primary;
    cursor: pointer;
    font-size: @font-size-sm;

    &:hover {
      text-decoration: underline;
    }
  }
}

.merchant-dialog-content {
  font-size: @font-size-base;
  color: @text-primary;
  line-height: 1.8;
  padding: 8px 0;
}

.text-gray {
  color: @text-tertiary;
  font-size: @font-size-sm;
}

.link-text {
  color: @brand-primary;
  font-size: @font-size-sm;
  word-break: break-all;
}
</style>
