<template>
  <sidebar>
    <div class="issue-records-page">
      <!-- 发放记录卡片 -->
      <a-card :bordered="false" class="records-card">
        <template slot="title">
          <div class="header-container">
            <a-button @click="goBack" class="back-button">
              <a-icon type="arrow-left" />
              返回
            </a-button>
            <span class="title">优惠券发放记录</span>
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
          <!-- 优惠券 -->
          <template slot="couponId" slot-scope="couponId">
            <span class="coupon-text">{{ couponId }}</span>
          </template>

          <!-- 发放方式 -->
          <template slot="distributionType" slot-scope="text">
            <a-tag>{{ getDistributionTypeName(text) }}</a-tag>
          </template>

          <!-- 目标用户 -->
          <template slot="targetUsers" slot-scope="text">
            <div class="target-users" :title="text">{{ text }}</div>
          </template>

          <!-- 发放数量 -->
          <template slot="count" slot-scope="count">
            <span class="count-text">{{ count }}</span>
          </template>

          <!-- 发放时间 -->
          <template slot="createdAt" slot-scope="datetime">
            <div class="datetime-cell">
              <div class="date">{{ formatDate(datetime) }}</div>
              <div class="time">{{ formatTime(datetime) }}</div>
            </div>
          </template>

          <!-- 操作人 -->
          <template slot="createdBy" slot-scope="createdBy">
            <span class="creator-text">{{ createdBy }}</span>
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
  name: 'CouponIssueRecordsPage',
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
          title: '优惠券',
          dataIndex: 'couponId',
          key: 'couponId',
          width: 180,
          scopedSlots: { customRender: 'couponId' }
        },
        {
          title: '发放方式',
          dataIndex: 'distributionType',
          key: 'distributionType',
          width: 100,
          scopedSlots: { customRender: 'distributionType' }
        },
        {
          title: '目标用户',
          dataIndex: 'targetUsers',
          key: 'targetUsers',
          scopedSlots: { customRender: 'targetUsers' }
        },
        {
          title: '发放数量',
          dataIndex: 'count',
          key: 'count',
          width: 100,
          scopedSlots: { customRender: 'count' }
        },
        {
          title: '发放时间',
          dataIndex: 'createdAt',
          key: 'createdAt',
          width: 120,
          scopedSlots: { customRender: 'createdAt' }
        },
        {
          title: '操作人',
          dataIndex: 'createdBy',
          key: 'createdBy',
          width: 120,
          scopedSlots: { customRender: 'createdBy' }
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
        const result = await CouponService.getIssueRecords({
          page: this.pagination.current,
          pageSize: this.pagination.pageSize
        })
        this.tableData = result.data
        this.pagination.total = result.total
      } catch (error) {
        console.error('Failed to load issue records:', error)
        this.$message.error('加载发放记录失败')
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
      this.$router.push('/platform-admin/coupon-management/issue')
    },

    getDistributionTypeName(type: string): string {
      const map: Record<string, string> = {
        manual_phone: '手机号',
        manual_vip: 'VIP等级',
        auto: '自动发放'
      }
      return map[type] || type
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

.issue-records-page {
  padding: 24px;
  max-width: 1800px;
  margin: 0 auto;

  .records-card {
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

// 优惠券文本
.coupon-text {
  font-family: @font-family;
  font-weight: @font-weight-medium;
  color: @text-primary;
  font-size: @font-size-base;
}

// 目标用户
.target-users {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: @font-size-sm;
  color: @text-primary;
}

// 数量文本
.count-text {
  font-family: @font-family;
  font-weight: @font-weight-medium;
  color: @text-primary;
  font-size: @font-size-base;
}

// 操作人文本
.creator-text {
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
