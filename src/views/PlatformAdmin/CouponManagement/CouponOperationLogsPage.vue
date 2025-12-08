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
          @change="handleTableChange"
          rowKey="id"
          class="custom-table"
        >
          <!-- 优惠券ID -->
          <template slot="couponId" slot-scope="couponId">
            <span class="coupon-id">{{ couponId }}</span>
          </template>

          <!-- 优惠券名称 -->
          <template slot="couponName" slot-scope="name">
            <span class="coupon-name">{{ name }}</span>
          </template>

          <!-- 操作类型 -->
          <template slot="operationType" slot-scope="text">
            <a-tag :class="getOperationTypeClass(text)">
              {{ getOperationTypeName(text) }}
            </a-tag>
          </template>

          <!-- 操作描述 -->
          <template slot="description" slot-scope="desc">
            <span class="desc-text">{{ desc }}</span>
          </template>

          <!-- 操作时间 -->
          <template slot="operatedAt" slot-scope="datetime">
            <div class="datetime-cell">
              <div class="date">{{ formatDate(datetime) }}</div>
              <div class="time">{{ formatTime(datetime) }}</div>
            </div>
          </template>

          <!-- 操作人 -->
          <template slot="operatedBy" slot-scope="operator">
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
import CouponService from './services/coupon.service'
import dayjs from 'dayjs'

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
          title: '优惠券名称',
          dataIndex: 'couponName',
          key: 'couponName',
          width: 180,
          scopedSlots: { customRender: 'couponName' }
        },
        {
          title: '操作类型',
          dataIndex: 'operationType',
          key: 'operationType',
          width: 90,
          scopedSlots: { customRender: 'operationType' }
        },
        {
          title: '操作描述',
          dataIndex: 'description',
          key: 'description',
          scopedSlots: { customRender: 'description' }
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
          dataIndex: 'operatedBy',
          key: 'operatedBy',
          width: 120,
          scopedSlots: { customRender: 'operatedBy' }
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
        const result = await CouponService.getOperationLogs({
          page: this.pagination.current,
          pageSize: this.pagination.pageSize
        })
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
      this.$router.push('/platform-admin/coupon-management/list')
    },

    getOperationTypeName(type: string): string {
      const map: Record<string, string> = {
        create: '创建',
        edit: '编辑',
        enable: '启用',
        disable: '停用',
        delete: '删除'
      }
      return map[type] || type
    },

    getOperationTypeClass(type: string): string {
      const map: Record<string, string> = {
        create: 'tag-green',
        edit: 'tag-blue',
        enable: 'tag-green',
        disable: 'tag-orange',
        delete: 'tag-red'
      }
      return map[type] || ''
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

// 优惠券ID
.coupon-id {
  font-family: @font-family;
  font-weight: @font-weight-medium;
  color: @text-primary;
  font-size: @font-size-sm;
}

// 优惠券名称
.coupon-name {
  color: @text-primary;
  font-size: @font-size-base;
}

// 操作描述
.desc-text {
  color: @text-primary;
  font-size: @font-size-sm;
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

// 操作类型标签
.tag-green {
  color: #15803d;
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.tag-blue {
  color: #1d4ed8;
  background: #eff6ff;
  border-color: #bfdbfe;
}

.tag-orange {
  color: #c2410c;
  background: #fff7ed;
  border-color: #fed7aa;
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
