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
import dayjs from 'dayjs'

// Mock数据
const mockPointsLogs = [
  {
    id: '1',
    phone: '13800138000',
    pointsChange: 100,
    balance: 1500,
    remark: '新用户注册奖励',
    operatedAt: '2025-12-08 10:30:15',
    operator: '系统'
  },
  {
    id: '2',
    phone: '13900139000',
    pointsChange: -50,
    balance: 450,
    remark: '兑换优惠券',
    operatedAt: '2025-12-08 09:20:30',
    operator: '系统'
  },
  {
    id: '3',
    phone: '13700137000',
    pointsChange: 200,
    balance: 800,
    remark: '管理员手动调整 - 补偿积分',
    operatedAt: '2025-12-07 16:45:22',
    operator: '张三'
  },
  {
    id: '4',
    phone: '13600136000',
    pointsChange: -100,
    balance: 300,
    remark: '积分过期自动扣除',
    operatedAt: '2025-12-07 14:10:05',
    operator: '系统'
  },
  {
    id: '5',
    phone: '13500135000',
    pointsChange: 50,
    balance: 650,
    remark: '邀请好友奖励',
    operatedAt: '2025-12-07 11:25:40',
    operator: '系统'
  }
]

export default defineComponent({
  name: 'PointsOperationLogsPage',
  components: { Sidebar },

  data() {
    return {
      tableData: [],
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
          title: '操作手机号',
          dataIndex: 'phone',
          key: 'phone',
          width: 120,
          scopedSlots: { customRender: 'phone' }
        },
        {
          title: '积分变化',
          dataIndex: 'pointsChange',
          key: 'pointsChange',
          width: 100,
          scopedSlots: { customRender: 'pointsChange' }
        },
        {
          title: '积分余额',
          dataIndex: 'balance',
          key: 'balance',
          width: 100,
          scopedSlots: { customRender: 'balance' }
        },
        {
          title: '调整备注',
          dataIndex: 'remark',
          key: 'remark',
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
        // 模拟API延迟
        await new Promise(resolve => setTimeout(resolve, 300))

        // 使用Mock数据（按操作时间倒序）
        const sortedData = [...mockPointsLogs].sort((a, b) =>
          new Date(b.operatedAt).getTime() - new Date(a.operatedAt).getTime()
        )

        this.tableData = sortedData
        this.pagination.total = sortedData.length
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
      this.$router.push('/platform-admin/points-management/adjust')
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
