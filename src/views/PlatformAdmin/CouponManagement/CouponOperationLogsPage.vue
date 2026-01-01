<template>
  <sidebar>
    <div class="operation-logs-page">
      <!-- 操作记录卡片 -->
      <a-card :bordered="false" class="logs-card">
        <template slot="title">
          <div class="header-container">
            <a-button @click="goBack" class="back-button">
              <a-icon type="arrow-left" />
              返回
            </a-button>
            <span class="title">优惠券操作记录</span>
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
          <!-- 优惠券ID -->
          <template slot="couponId" slot-scope="couponId">
            <span class="coupon-id">{{ couponId }}</span>
          </template>

          <!-- 操作 -->
          <template slot="operation" slot-scope="operation">
            <a-tag :class="getOperationClass(operation)">
              {{ getOperationText(operation) }}
            </a-tag>
          </template>

          <!-- 操作内容 -->
          <template slot="content" slot-scope="content">
            <div class="content-text">
              <div v-for="(change, index) in parseContent(content)" :key="index" class="change-item">
                {{ change }}
              </div>
            </div>
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
const mockOperationLogs = [
  {
    id: '1',
    couponId: 'CPN001',
    operation: 'create',
    content: '创建优惠券：新用户专享券',
    operatedAt: '2025-12-08 14:30:25',
    operator: '张三'
  },
  {
    id: '2',
    couponId: 'CPN001',
    operation: 'edit',
    content: '平台承担比例：20% → 25%\n最高优惠金额：50元 → 60元',
    operatedAt: '2025-12-08 11:20:10',
    operator: '李四'
  },
  {
    id: '3',
    couponId: 'CPN002',
    operation: 'create',
    content: '创建优惠券：周末特惠券',
    operatedAt: '2025-12-07 16:15:40',
    operator: '王五'
  },
  {
    id: '4',
    couponId: 'CPN001',
    operation: 'edit',
    content: '有效天数：30天 → 60天',
    operatedAt: '2025-12-07 10:05:18',
    operator: '张三'
  },
  {
    id: '5',
    couponId: 'CPN003',
    operation: 'create',
    content: '创建优惠券：首单立减券',
    operatedAt: '2025-12-06 15:22:33',
    operator: '李四'
  }
]

export default defineComponent({
  name: 'CouponOperationLogsPage',
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
          title: '优惠券ID',
          dataIndex: 'couponId',
          key: 'couponId',
          width: 120,
          scopedSlots: { customRender: 'couponId' }
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          width: 80,
          scopedSlots: { customRender: 'operation' }
        },
        {
          title: '操作内容',
          dataIndex: 'content',
          key: 'content',
          scopedSlots: { customRender: 'content' }
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

        // 使用Mock数据（操作时间倒序）
        const sortedData = [...mockOperationLogs].sort((a, b) =>
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
      this.$router.push('/platform-admin/coupon-management/list')
    },

    getOperationText(operation: string): string {
      const map: Record<string, string> = {
        create: '创建',
        edit: '编辑'
      }
      return map[operation] || operation
    },

    getOperationClass(operation: string): string {
      const map: Record<string, string> = {
        create: 'tag-green',
        edit: 'tag-blue'
      }
      return map[operation] || ''
    },

    parseContent(content: string): string[] {
      if (!content) return []
      return content.split('\n').filter(Boolean)
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

.operation-logs-page {
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

// 优惠券ID
.coupon-id {
  font-family: @font-family;
  font-weight: @font-weight-medium;
  color: @text-primary;
  font-size: @font-size-sm;
}

// 操作内容
.content-text {
  font-size: @font-size-sm;
  color: @text-primary;
  line-height: 1.6;

  .change-item {
    &:not(:last-child) {
      margin-bottom: 4px;
    }
  }
}

// 操作人
.operator-text {
  color: @text-secondary;
  font-size: @font-size-sm;
}

</style>
