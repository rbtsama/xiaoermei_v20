<template>
  <a-modal
    :visible="visible"
    :title="`${activity ? activity.name : ''} - 数据统计`"
    width="700px"
    :footer="null"
    @cancel="handleClose"
  >
    <!-- T-1数据提示 -->
    <a-alert
      message="数据说明"
      :description="`数据统计截止至 ${t1Date} 23:59，今日数据将在明日更新`"
      type="info"
      show-icon
      class="data-tip"
    />

    <!-- 优惠券发放明细表格 -->
    <div class="table-container">
      <a-table
        :columns="dataColumns"
        :data-source="distributionDetails"
        :pagination="false"
        :loading="loading"
        row-key="couponId"
        size="small"
        class="data-table"
      >
        <!-- 优惠券名称 -->
        <template slot="couponName" slot-scope="couponName">
          <span class="coupon-name">{{ couponName }}</span>
        </template>

        <!-- 发放数量 -->
        <template slot="distributionCount" slot-scope="count">
          <span class="count-text">{{ count }}</span>
        </template>
      </a-table>
    </div>

    <!-- 累计发放统计 -->
    <div v-if="distributionDetails.length > 0" class="total-row">
      <span class="total-label">累计发放：</span>
      <span class="total-count">{{ totalDistribution }} 张</span>
    </div>

    <!-- 暂无数据提示 -->
    <div v-if="!loading && distributionDetails.length === 0" class="no-data">
      <a-icon type="bar-chart" class="no-data-icon" />
      <p class="no-data-text">暂无发放数据</p>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from '@vue/composition-api'
import ActivityService from '../services/activity.service'
import type { Activity, CouponDistributionDetail } from '../types/activity.types'

export default defineComponent({
  name: 'ActivityDataDialog',

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    activity: {
      type: Object as () => Activity | null,
      default: null
    }
  },

  setup(props, { emit, root }) {
    const loading = ref(false)
    const distributionDetails = ref<CouponDistributionDetail[]>([])

    // 表格列定义
    const dataColumns = [
      {
        title: '优惠券名称',
        dataIndex: 'couponName',
        key: 'couponName',
        scopedSlots: { customRender: 'couponName' }
      },
      {
        title: '发放数量',
        dataIndex: 'distributionCount',
        key: 'distributionCount',
        width: 150,
        align: 'right',
        scopedSlots: { customRender: 'distributionCount' }
      }
    ]

    // ==================== 计算属性 ====================

    /**
     * T-1日期（昨日）
     */
    const t1Date = computed(() => {
      return ActivityService.getT1Date()
    })

    /**
     * 累计发放总数
     */
    const totalDistribution = computed(() => {
      return distributionDetails.value.reduce((sum, item) => sum + item.distributionCount, 0)
    })

    // ==================== 业务函数 ====================

    /**
     * 加载优惠券发放明细
     */
    const loadDistributionDetails = async () => {
      if (!props.activity) return

      loading.value = true
      try {
        const details = await ActivityService.getCouponDistributionDetails(props.activity.id)
        distributionDetails.value = details
      } catch (error) {
        root.$message.error('加载数据失败')
        console.error('加载优惠券发放明细失败:', error)
      } finally {
        loading.value = false
      }
    }

    /**
     * 关闭弹窗
     */
    const handleClose = () => {
      emit('close')
    }

    // ==================== 监听器 ====================

    // 监听visible变化，加载数据
    watch(() => props.visible, (visible) => {
      if (visible && props.activity) {
        loadDistributionDetails()
      } else {
        distributionDetails.value = []
      }
    })

    // ==================== 返回暴露的属性和方法 ====================

    return {
      loading,
      distributionDetails,
      dataColumns,
      t1Date,
      totalDistribution,
      handleClose
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.data-tip {
  margin-bottom: 16px;
  border-radius: @border-radius-base;

  :deep(.ant-alert-message) {
    color: @text-primary;
    font-weight: @font-weight-medium;
  }

  :deep(.ant-alert-description) {
    color: @text-secondary;
    font-size: @font-size-sm;
  }
}

.table-container {
  border: 1px solid @border-primary;
  border-radius: @border-radius-base;
  overflow: hidden;
  margin-bottom: 16px;

  :deep(.ant-table) {
    .ant-table-thead > tr > th {
      background: @bg-secondary;
      border-bottom: 1px solid @border-primary;
      color: @text-primary;
      font-weight: @font-weight-semibold;
      font-size: @font-size-sm;
      padding: 12px 16px;
    }

    .ant-table-tbody > tr {
      &:hover > td {
        background: @bg-hover;
      }

      > td {
        border-bottom: 1px solid @border-primary;
        padding: 12px 16px;
        font-size: @font-size-sm;
      }
    }
  }
}

.coupon-name {
  color: @text-primary;
  font-weight: @font-weight-medium;
}

.count-text {
  color: @brand-primary;
  font-weight: @font-weight-semibold;
  font-size: @font-size-base;
}

.total-row {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 16px;
  background: @bg-secondary;
  border-radius: @border-radius-base;

  .total-label {
    font-size: @font-size-base;
    color: @text-secondary;
    margin-right: 8px;
  }

  .total-count {
    font-size: @font-size-lg;
    color: @brand-primary;
    font-weight: @font-weight-semibold;
  }
}

.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;

  .no-data-icon {
    font-size: 48px;
    color: @text-tertiary;
    margin-bottom: 16px;
  }

  .no-data-text {
    font-size: @font-size-base;
    color: @text-secondary;
    margin: 0;
  }
}
</style>
