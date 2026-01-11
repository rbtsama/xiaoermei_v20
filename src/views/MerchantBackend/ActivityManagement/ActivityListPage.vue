<template>
  <sidebar>
    <div class="merchant-activity-page">
      <!-- 活动码管理Dialog -->
      <merchant-code-dialog
        :visible="isMerchantCodeDialogOpen"
        :activity="selectedActivity"
        @close="isMerchantCodeDialogOpen = false"
      />

      <!-- 活动列表 -->
      <a-card :bordered="false" class="list-card">
        <div slot="title" class="card-header">
          <span class="card-title">活动列表</span>
        </div>

        <a-table
          :columns="columns"
          :data-source="activities"
          :pagination="false"
          :loading="loading"
          :scroll="{ x: 1340 }"
          row-key="id"
          class="custom-table"
        >
          <!-- 活动名称 -->
          <template slot="name" slot-scope="name">
            <span class="name-text">{{ name }}</span>
          </template>

          <!-- 活动时间 -->
          <template slot="activityTime" slot-scope="text, record">
            <div class="time-range-cell">
              <div class="flex items-center gap-1">
                <span class="date-icon-start">始</span>
                <span class="text-primary">{{ formatDate(record.startTime) }}</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="date-icon-end">止</span>
                <span class="text-primary">{{ formatDate(record.endTime) }}</span>
              </div>
            </div>
          </template>

          <!-- 会员限制 -->
          <template slot="participationConditions" slot-scope="conditions">
            <span class="conditions-text">{{ formatVipLevels(conditions) }}</span>
          </template>

          <!-- 派发优惠券 -->
          <template slot="couponIds" slot-scope="couponIds">
            <span class="coupons-text">{{ formatCouponNames(couponIds) }}</span>
          </template>

          <!-- 创建人 -->
          <template slot="createdBy" slot-scope="createdBy">
            <span class="creator-text">{{ createdBy }}</span>
          </template>

          <!-- 状态 -->
          <template slot="status" slot-scope="status">
            <a-tag :class="status === 'enabled' ? 'tag-green' : 'tag-gray'">
              {{ status === 'enabled' ? '已启用' : '已停用' }}
            </a-tag>
          </template>

          <!-- 操作 -->
          <template slot="action" slot-scope="text, record">
            <div class="action-btns">
              <a-button size="small" class="qrcode-btn" @click="handleManageCodes(record)">
                <a-icon type="qrcode" />
                活动码
              </a-button>
              <a-button
                size="small"
                :type="record.status === 'enabled' ? 'danger' : 'primary'"
                @click="handleToggleStatus(record)"
              >
                {{ record.status === 'enabled' ? '停用' : '启用' }}
              </a-button>
            </div>
          </template>
        </a-table>
      </a-card>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import MerchantCodeDialog from './components/MerchantCodeDialog.vue'
import MerchantActivityService from './services/activity.service'
import CouponService from '../../PlatformAdmin/CouponManagement/services/coupon.service'
import dayjs from 'dayjs'

// VIP等级名称映射
const VIP_LEVEL_NAMES = {
  VIP0: '注册会员',
  VIP1: 'VIP1',
  VIP2: 'VIP2',
  VIP3: 'VIP3'
}

export default defineComponent({
  name: 'MerchantActivityListPage',
  components: {
    Sidebar,
    MerchantCodeDialog
  },
  setup(props, { root }) {
    // ==================== 响应式数据 ====================

    const loading = ref(false)
    const activities = ref([])
    const allCoupons = ref([]) // 优惠券列表（用于显示名称）

    // Dialog状态
    const isMerchantCodeDialogOpen = ref(false)
    const selectedActivity = ref(null)

    // 表格列定义
    const columns = [
      {
        title: '活动名称',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        scopedSlots: { customRender: 'name' }
      },
      {
        title: '活动时间',
        key: 'activityTime',
        width: 200,
        scopedSlots: { customRender: 'activityTime' }
      },
      {
        title: '会员限制',
        dataIndex: 'participationConditions',
        key: 'participationConditions',
        width: 200,
        scopedSlots: { customRender: 'participationConditions' }
      },
      {
        title: '派发优惠券',
        dataIndex: 'couponIds',
        key: 'couponIds',
        width: 280,
        scopedSlots: { customRender: 'couponIds' }
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        scopedSlots: { customRender: 'status' }
      },
      {
        title: '创建人',
        dataIndex: 'createdBy',
        key: 'createdBy',
        width: 100,
        scopedSlots: { customRender: 'createdBy' }
      },
      {
        title: '操作',
        key: 'action',
        width: 160,
        fixed: 'right',
        scopedSlots: { customRender: 'action' }
      }
    ]

    // ==================== 工具函数 ====================

    /**
     * 格式化日期（只显示日期部分）
     */
    const formatDate = (datetime) => {
      return datetime ? dayjs(datetime).format('YYYY-MM-DD') : '-'
    }

    /**
     * 格式化VIP等级列表
     */
    const formatVipLevels = (conditions) => {
      if (!conditions || conditions.length === 0) return '无限制'
      return conditions.map(id => VIP_LEVEL_NAMES[id] || id).join(', ')
    }

    /**
     * 格式化优惠券名称列表
     */
    const formatCouponNames = (couponIds) => {
      if (!couponIds || couponIds.length === 0) return '-'
      return couponIds.map(id => {
        const coupon = allCoupons.value.find(c => c.id === id)
        return coupon ? coupon.name : id
      }).join(', ')
    }

    // ==================== 业务函数 ====================

    /**
     * 加载优惠券列表
     */
    const loadCoupons = async () => {
      try {
        const result = await CouponService.getCoupons()
        allCoupons.value = result.data || []
      } catch (error) {
        console.error('加载优惠券列表失败:', error)
      }
    }

    /**
     * 加载活动列表
     */
    const fetchActivities = async () => {
      loading.value = true
      try {
        const result = await MerchantActivityService.getActivities()
        activities.value = result
      } catch (error) {
        root.$message.error('加载活动列表失败')
        console.error('加载活动列表失败:', error)
      } finally {
        loading.value = false
      }
    }

    /**
     * 管理活动码
     */
    const handleManageCodes = (activity) => {
      selectedActivity.value = activity
      isMerchantCodeDialogOpen.value = true
    }

    /**
     * 切换启用/停用状态
     */
    const handleToggleStatus = async (activity) => {
      const actionText = activity.status === 'enabled' ? '停用' : '启用'
      const confirmText = activity.status === 'enabled'
        ? '停用后，客户将无法通过活动码参与此活动，确定要停用吗？'
        : '启用后，客户可通过活动码参与此活动，确定要启用吗？'

      root.$confirm({
        title: `${actionText}活动`,
        content: confirmText,
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          try {
            await MerchantActivityService.toggleActivityStatus(activity.id)
            root.$message.success(`活动${actionText}成功`)
            await fetchActivities()
          } catch (error) {
            root.$message.error(`活动${actionText}失败`)
            console.error('切换状态失败:', error)
          }
        }
      })
    }

    // ==================== 生命周期 ====================

    onMounted(() => {
      loadCoupons()
      fetchActivities()
    })

    // ==================== 返回暴露的属性和方法 ====================

    return {
      loading,
      activities,
      columns,
      isMerchantCodeDialogOpen,
      selectedActivity,
      formatDate,
      formatVipLevels,
      formatCouponNames,
      handleManageCodes,
      handleToggleStatus
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';
@import '@/styles/common.less';

.merchant-activity-page {
  padding: 24px;
  max-width: 1800px;
  margin: 0 auto;
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
  align-items: center;
  width: 100%;

  .card-title {
    font-size: @font-size-lg;
    font-weight: @font-weight-semibold;
    color: @text-primary;
  }
}

.id-text {
  font-family: 'Courier New', monospace;
  color: @text-secondary;
  font-size: @font-size-sm;
}

.name-text {
  color: @text-primary;
  font-weight: @font-weight-medium;
}

.date-text {
  color: @text-primary;
  font-size: @font-size-sm;
}

.conditions-text,
.coupons-text {
  color: @text-secondary;
  font-size: @font-size-sm;
}

.creator-text {
  color: @text-secondary;
  font-size: @font-size-sm;
}

.time-range-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: @font-size-sm;

  .flex {
    display: flex;
  }

  .items-center {
    align-items: center;
  }

  .gap-1 {
    gap: 4px;
  }

  .text-primary {
    color: @text-primary;
  }

  .date-icon-start,
  .date-icon-end {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 20px;
    font-size: @font-size-xs;
    font-weight: @font-weight-medium;
    border-radius: @border-radius-sm;
  }

  .date-icon-start {
    color: #15803d;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
  }

  .date-icon-end {
    color: #c2410c;
    background: #fff7ed;
    border: 1px solid #fed7aa;
  }
}

.action-btns {
  display: flex;
  gap: 6px;
  justify-content: center;
  flex-wrap: nowrap;

  .ant-btn-sm {
    height: 28px;
    padding: 0 10px;
    font-size: @font-size-sm;
  }

  // 活动码按钮 - 清淡渐变背景
  .qrcode-btn {
    background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%);
    border: 1px solid #93c5fd;
    color: #1e40af;
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, #bfdbfe 0%, #c7d2fe 100%);
      border-color: #60a5fa;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(59, 130, 246, 0.2);
      color: #1e40af;
    }

    &:active {
      transform: translateY(0);
    }

    .anticon {
      color: #1e40af;
    }
  }
}
</style>
