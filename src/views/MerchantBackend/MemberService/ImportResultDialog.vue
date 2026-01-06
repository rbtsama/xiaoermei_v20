<template>
  <a-modal
    :visible="visible"
    title="导入结果"
    :width="600"
    :footer="null"
    @cancel="handleClose"
    class="import-result-dialog"
  >
    <!-- 统计摘要 -->
    <div class="result-summary">
      <div class="summary-item success">
        <a-icon type="check-circle" class="summary-icon" />
        <div class="summary-content">
          <div class="summary-label">成功导入</div>
          <div class="summary-value">{{ successCount }}人</div>
        </div>
      </div>
      <div class="summary-item failed">
        <a-icon type="close-circle" class="summary-icon" />
        <div class="summary-content">
          <div class="summary-label">导入失败</div>
          <div class="summary-value">{{ failedCount }}人</div>
        </div>
      </div>
    </div>

    <!-- 失败明细（如果有失败记录） -->
    <div v-if="failedCount > 0" class="failed-details">
      <div class="details-header">
        <span class="details-title">失败明细</span>
        <a-button size="small" @click="handleDownloadFailed">
          <a-icon type="download" />
          下载失败记录
        </a-button>
      </div>
      <div class="details-table">
        <a-table
          :columns="columns"
          :data-source="failedList"
          :pagination="false"
          :scroll="{ y: 240 }"
          size="small"
          rowKey="phone"
        >
          <template slot="index" slot-scope="text, record, index">
            {{ index + 1 }}
          </template>
          <template slot="reason" slot-scope="reason">
            <span class="reason-text">{{ reason }}</span>
          </template>
        </a-table>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="dialog-footer">
      <a-button type="primary" size="large" @click="handleClose">
        确定
      </a-button>
    </div>
  </a-modal>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'ImportResultDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    successCount: {
      type: Number,
      default: 0
    },
    failedList: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit, root }) {
    const failedCount = computed(() => props.failedList.length)

    const columns = [
      {
        title: '序号',
        width: 60,
        align: 'center',
        scopedSlots: { customRender: 'index' }
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        width: 120
      },
      {
        title: '失败原因',
        dataIndex: 'reason',
        scopedSlots: { customRender: 'reason' }
      }
    ]

    const handleClose = () => {
      emit('update:visible', false)
      emit('close')
    }

    /**
     * 下载失败记录（CSV格式）
     */
    const handleDownloadFailed = () => {
      if (props.failedList.length === 0) return

      const headers = ['序号', '手机号', '姓名', '失败原因']
      const rows = props.failedList.map((item, index) => [
        index + 1,
        item.phone,
        item.name || '-',
        item.reason
      ])
      const csvContent = '\uFEFF' + [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `会员导入失败记录_${new Date().getTime()}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      root.$message.success('失败记录已下载')
    }

    return {
      failedCount,
      columns,
      handleClose,
      handleDownloadFailed
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.import-result-dialog {
  :deep(.ant-modal-header) {
    padding: 20px 24px;
    border-bottom: 1px solid @border-primary;
  }

  :deep(.ant-modal-title) {
    font-size: @font-size-lg;
    font-weight: @font-weight-semibold;
    color: @text-primary;
  }

  :deep(.ant-modal-body) {
    padding: 24px;
  }

  :deep(.ant-modal-close-x) {
    width: 56px;
    height: 56px;
    line-height: 56px;
  }
}

.result-summary {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  .summary-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    border-radius: @border-radius-base;
    border: 1px solid @border-primary;

    &.success {
      background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
      border-color: #bbf7d0;

      .summary-icon {
        font-size: 32px;
        color: @success-color;
      }
    }

    &.failed {
      background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%);
      border-color: #fecaca;

      .summary-icon {
        font-size: 32px;
        color: @error-color;
      }
    }

    .summary-content {
      flex: 1;

      .summary-label {
        font-size: @font-size-sm;
        color: @text-secondary;
        margin-bottom: 4px;
      }

      .summary-value {
        font-size: @font-size-2xl;
        font-weight: @font-weight-semibold;
        color: @text-primary;
      }
    }
  }
}

.failed-details {
  margin-bottom: 24px;

  .details-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    .details-title {
      font-size: @font-size-base;
      font-weight: @font-weight-semibold;
      color: @text-primary;
    }
  }

  .details-table {
    border: 1px solid @border-primary;
    border-radius: @border-radius-base;

    :deep(.ant-table) {
      border-radius: @border-radius-base;
    }

    :deep(.ant-table-thead > tr > th) {
      background: @bg-secondary;
      border-bottom: 1px solid @border-primary;
      color: @text-primary;
      font-weight: @font-weight-semibold;
      font-size: @font-size-sm;
      padding: 10px 12px;
    }

    :deep(.ant-table-tbody > tr > td) {
      border-bottom: 1px solid @border-primary;
      padding: 10px 12px;
      font-size: @font-size-sm;
      color: @text-primary;
    }

    :deep(.ant-table-tbody > tr:last-child > td) {
      border-bottom: none;
    }

    .reason-text {
      color: @error-color;
      font-size: @font-size-sm;
    }
  }
}

.dialog-footer {
  display: flex;
  justify-content: center;
  padding-top: 8px;

  .ant-btn-lg {
    height: 40px;
    padding: 0 32px;
    font-size: @font-size-base;
    border-radius: @border-radius-base;
  }
}
</style>
