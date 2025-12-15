<template>
  <sidebar>
    <div class="points-logs-page">
      <!-- 操作记录卡片 -->
      <a-card :bordered="false" class="logs-card">
        <template slot="title">
          <div class="header-container">
            <a-button @click="goBack" class="back-button">
              <a-icon type="arrow-left" />
              返回
            </a-button>
            <span class="title">积分调整操作记录</span>
          </div>
        </template>

        <a-table
          :columns="columns"
          :data-source="tableData"
          :loading="isLoading"
          :pagination="pagination"
          :scroll="{ x: 1200 }"
          @change="handleTableChange"
          rowKey="id"
          class="custom-table"
        >
          <!-- 操作手机号 -->
          <template slot="phone" slot-scope="phone">
            <span class="phone-text">{{ phone }}</span>
          </template>

          <!-- 积分变化 -->
          <template slot="pointsChange" slot-scope="change">
            <span :class="change > 0 ? 'points-positive' : 'points-negative'">
              {{ change > 0 ? `+${change}` : change }}
            </span>
          </template>

          <!-- 积分余额 -->
          <template slot="balance" slot-scope="balance">
            <span class="balance-text">{{ balance }}</span>
          </template>

          <!-- 调整备注 -->
          <template slot="remark" slot-scope="remark">
            <span class="remark-text" :title="remark || '—'">
              {{ remark || '—' }}
            </span>
          </template>

          <!-- 操作时间 -->
          <template slot="operatedAt" slot-scope="datetime">
            <div class="datetime-cell">
              <div class="date">{{ formatDate(datetime) }}</div>
              <div class="time">{{ formatTime(datetime) }}</div>
            </div>
          </template>

          <!-- 操作人 -->
          <template slot="operator" slot-scope="operator">
            <span class="operator-text">{{ operator }}</span>
          </template>
        </a-table>
      </a-card>
    </div>
  </sidebar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import ValueAddedServiceService from './services/valueAddedService.service'
import type { OperationLog } from './types/valueAddedService.types'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'PointsOperationLogsPage',
  components: { Sidebar },

  data() {
    return {
      tableData: [] as OperationLog[],
      isLoading: false,
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        showTotal: (total: number) => `共 ${total} 条`
      },
      columns: [
        {
          title: '操作类型',
          dataIndex: 'operationType',
          key: 'operationType',
          width: 180
        },
        {
          title: '操作详情',
          dataIndex: 'operationDetails',
          key: 'operationDetails',
          scopedSlots: { customRender: 'remark' }
        },
        {
          title: '操作时间',
          dataIndex: 'operatedAt',
          key: 'operatedAt',
          width: 120,
          scopedSlots: { customRender: 'operatedAt' }
        },
        {
          title: '操作人',
          dataIndex: 'operator',
          key: 'operator',
          width: 100,
          scopedSlots: { customRender: 'operator' }
        }
      ]
    }
  },

  async mounted() {
    await this.loadData()
  },

  methods: {
    async loadData() {
      this.isLoading = true
      try {
        const result = await ValueAddedServiceService.getOperationLogs(
          this.pagination.pageSize,
          this.pagination.current
        )

        this.tableData = result.data
        this.pagination.total = result.total
      } catch (error) {
        console.error('Failed to load operation logs:', error)
        this.$message.error('加载操作记录失败')
      } finally {
        this.isLoading = false
      }
    },

    async handleTableChange(pagination: any) {
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      await this.loadData()
    },

    goBack() {
      // 恢复之前的搜索状态
      const savedPhone = localStorage.getItem('points_adjust_phone')
      if (savedPhone) {
        this.$router.push({
          path: '/platform-admin/points-management/adjust',
          query: { phone: savedPhone }
        })
      } else {
        this.$router.push('/platform-admin/points-management/adjust')
      }
    },

    formatDate(datetime: string): string {
      if (!datetime) return '-'
      return dayjs(datetime).format('YYYY-MM-DD')
    },

    formatTime(datetime: string): string {
      if (!datetime) return '-'
      return dayjs(datetime).format('HH:mm:ss')
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.points-logs-page {
  padding: 24px;
  max-width: 1800px;
  margin: 0 auto;

  .logs-card {
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

  .header-container {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .back-button {
    height: 32px;
    padding: 0 12px;
  }

  .title {
    font-size: @font-size-lg;
    font-weight: @font-weight-semibold;
    color: @text-primary;
  }
}

// 自定义表格样式
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

// 手机号文本
.phone-text {
  font-family: @font-family;
  font-weight: @font-weight-medium;
  color: @text-primary;
  font-size: @font-size-base;
}

// 积分变化（正数绿色，负数红色）
.points-positive {
  color: @success-color;
  font-weight: @font-weight-semibold;
  font-size: @font-size-base;
}

.points-negative {
  color: @error-color;
  font-weight: @font-weight-semibold;
  font-size: @font-size-base;
}

// 积分余额
.balance-text {
  color: @text-primary;
  font-weight: @font-weight-medium;
  font-size: @font-size-base;
}

// 调整备注
.remark-text {
  color: @text-primary;
  font-size: @font-size-sm;
  max-width: 300px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 操作人
.operator-text {
  color: @text-secondary;
  font-size: @font-size-sm;
}

// 日期时间单元格
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
</style>
