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
          <!-- 通知类型 -->
          <template slot="type" slot-scope="type">
            <a-tag :class="getTypeTagClass(type)">
              {{ getTypeName(type) }}
            </a-tag>
          </template>

          <!-- 内容 -->
          <template slot="content" slot-scope="content">
            <div class="content-cell">
              {{ content }}
            </div>
          </template>

          <!-- 发送商户 -->
          <template slot="merchantList" slot-scope="text, record">
            <div class="merchant-list">
              <a-tooltip placement="top">
                <template slot="title">
                  <div class="merchant-tooltip">
                    <div v-for="(merchant, index) in record.merchantList" :key="index" class="merchant-item">
                      {{ index + 1 }}. {{ merchant }}
                    </div>
                  </div>
                </template>
                <span class="merchant-count">{{ record.merchantCount }}个商户</span>
              </a-tooltip>
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
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, reactive } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import CreateNotificationDialog from './CreateNotificationDialog.vue'
import { mockNotificationRecords } from '@/mocks/notification.mock'
import { NotificationType } from '@/types/notification'
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
        title: '类型',
        dataIndex: 'type',
        width: 120,
        scopedSlots: { customRender: 'type' }
      },
      {
        title: '内容',
        dataIndex: 'content',
        scopedSlots: { customRender: 'content' }
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

    const getTypeName = (type) => {
      const typeMap = {
        [NotificationType.NOTIFICATION]: '通知',
        [NotificationType.AGREEMENT_REQUIRED]: '需同意通知',
        [NotificationType.TASK]: '任务'
      }
      return typeMap[type] || '-'
    }

    const getTypeTagClass = (type) => {
      const classMap = {
        [NotificationType.NOTIFICATION]: 'tag-blue',
        [NotificationType.AGREEMENT_REQUIRED]: 'tag-orange',
        [NotificationType.TASK]: 'tag-purple'
      }
      return classMap[type] || 'tag-gray'
    }

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

    return {
      loading,
      records,
      pagination,
      columns,
      dialogVisible,
      getTypeName,
      getTypeTagClass,
      formatDate,
      formatTime,
      handleCreateTask,
      handleCreateSuccess
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

.merchant-tooltip {
  max-height: 300px;
  overflow-y: auto;

  .merchant-item {
    padding: 4px 0;
    font-size: @font-size-sm;
    color: @text-primary;
    line-height: 1.5;
  }
}
</style>
