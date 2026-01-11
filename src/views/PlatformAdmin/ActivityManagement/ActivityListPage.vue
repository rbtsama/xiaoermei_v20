<template>
  <sidebar>
    <div class="activity-list-page">
      <!-- 创建活动Dialog -->
      <create-activity-dialog
        :visible="isCreateDialogOpen"
        mode="create"
        @close="isCreateDialogOpen = false"
        @success="handleDialogSuccess"
      />

      <!-- 编辑活动Dialog -->
      <create-activity-dialog
        :visible="isEditDialogOpen"
        mode="edit"
        :activity="editingActivity"
        @close="isEditDialogOpen = false"
        @success="handleDialogSuccess"
      />

      <!-- 活动码管理Dialog -->
      <merchant-code-dialog
        :visible="isMerchantCodeDialogOpen"
        :activity="selectedActivity"
        @close="isMerchantCodeDialogOpen = false"
      />

      <!-- 查看数据Dialog -->
      <activity-data-dialog
        :visible="isDataDialogOpen"
        :activity="selectedActivity"
        @close="isDataDialogOpen = false"
      />

      <!-- 活动列表 -->
      <a-card :bordered="false" class="list-card">
        <div slot="title" class="card-header">
          <span class="card-title">活动列表</span>
          <a-button type="primary" @click="handleCreate">
            <a-icon type="plus" />
            创建活动
          </a-button>
        </div>

        <a-table
          :columns="columns"
          :data-source="activities"
          :pagination="paginationConfig"
          :loading="loading"
          :scroll="{ x: 1480 }"
          row-key="id"
          class="custom-table"
          @change="handleTableChange"
        >
          <!-- 活动ID -->
          <template slot="id" slot-scope="id">
            <span class="id-text">{{ id }}</span>
          </template>

          <!-- 活动名称 -->
          <template slot="name" slot-scope="name">
            <span class="name-text">{{ name }}</span>
          </template>

          <!-- 开始时间 -->
          <template slot="startTime" slot-scope="startTime">
            <div class="datetime-cell">
              <div class="date">{{ formatDate(startTime) }}</div>
              <div class="time">{{ formatTime(startTime) }}</div>
            </div>
          </template>

          <!-- 结束时间 -->
          <template slot="endTime" slot-scope="endTime">
            <div class="datetime-cell">
              <div class="date">{{ formatDate(endTime) }}</div>
              <div class="time">{{ formatTime(endTime) }}</div>
            </div>
          </template>

          <!-- 状态 -->
          <template slot="status" slot-scope="status">
            <a-tag :class="getStatusTagClass(status)">
              {{ getStatusText(status) }}
            </a-tag>
          </template>

          <!-- 参与条件 -->
          <template slot="participationConditions" slot-scope="conditions">
            <span class="conditions-text">{{ conditions.length }}个等级</span>
          </template>

          <!-- 派发优惠券 -->
          <template slot="couponIds" slot-scope="couponIds">
            <span class="coupons-text">{{ couponIds.length }}张券</span>
          </template>

          <!-- 创建时间 -->
          <template slot="createdAt" slot-scope="createdAt">
            <div class="datetime-cell">
              <div class="date">{{ formatDate(createdAt) }}</div>
              <div class="time">{{ formatTime(createdAt) }}</div>
            </div>
          </template>

          <!-- 操作 -->
          <template slot="action" slot-scope="text, record">
            <div class="action-btns">
              <a-button size="small" @click="handleManageCodes(record)">
                <a-icon type="qrcode" />
                活动码
              </a-button>
              <a-button size="small" @click="handleView(record)">
                <a-icon type="eye" />
                查看
              </a-button>
              <a-button
                v-if="record.status === 'not_started'"
                size="small"
                @click="handleEdit(record)"
              >
                <a-icon type="edit" />
                编辑
              </a-button>
              <a-button
                v-if="record.status !== 'not_started'"
                size="small"
                @click="handleViewData(record)"
              >
                <a-icon type="bar-chart" />
                数据
              </a-button>
            </div>
          </template>
        </a-table>
      </a-card>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import CreateActivityDialog from './components/CreateActivityDialog.vue'
import MerchantCodeDialog from './components/MerchantCodeDialog.vue'
import ActivityDataDialog from './components/ActivityDataDialog.vue'
import ActivityService from './services/activity.service'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'ActivityListPage',
  components: {
    Sidebar,
    CreateActivityDialog,
    MerchantCodeDialog,
    ActivityDataDialog
  },
  setup(props, { root }) {
    // ==================== 响应式数据 ====================

    const loading = ref(false)
    const activities = ref([])

    // Dialog状态
    const isCreateDialogOpen = ref(false)
    const isEditDialogOpen = ref(false)
    const isMerchantCodeDialogOpen = ref(false)
    const isDataDialogOpen = ref(false)
    const editingActivity = ref(null)
    const selectedActivity = ref(null)

    // 表格列定义
    const columns = [
      {
        title: '活动ID',
        dataIndex: 'id',
        key: 'id',
        width: 100,
        scopedSlots: { customRender: 'id' }
      },
      {
        title: '活动名称',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        scopedSlots: { customRender: 'name' }
      },
      {
        title: '开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
        width: 160,
        scopedSlots: { customRender: 'startTime' }
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
        width: 160,
        scopedSlots: { customRender: 'endTime' }
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        scopedSlots: { customRender: 'status' }
      },
      {
        title: '参与条件',
        dataIndex: 'participationConditions',
        key: 'participationConditions',
        width: 110,
        scopedSlots: { customRender: 'participationConditions' }
      },
      {
        title: '派发优惠券',
        dataIndex: 'couponIds',
        key: 'couponIds',
        width: 120,
        scopedSlots: { customRender: 'couponIds' }
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 140,
        scopedSlots: { customRender: 'createdAt' }
      },
      {
        title: '操作',
        key: 'action',
        width: 260,
        fixed: 'right',
        scopedSlots: { customRender: 'action' }
      }
    ]

    // 分页配置
    const paginationConfig = reactive({
      current: 1,
      pageSize: 10,
      total: 0,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total) => `共 ${total} 条`,
      pageSizeOptions: ['10', '20', '50', '100']
    })

    // ==================== 工具函数 ====================

    /**
     * 格式化日期
     */
    const formatDate = (datetime) => {
      return datetime ? dayjs(datetime).format('YYYY-MM-DD') : '-'
    }

    /**
     * 格式化时间
     */
    const formatTime = (datetime) => {
      return datetime ? dayjs(datetime).format('HH:mm:ss') : '-'
    }

    /**
     * 获取状态标签样式类名
     */
    const getStatusTagClass = (status) => {
      const map = {
        not_started: 'tag-blue',   // 蓝色：未开始
        in_progress: 'tag-green',  // 绿色：进行中
        ended: 'tag-gray'          // 灰色：已结束
      }
      return map[status] || 'tag-gray'
    }

    /**
     * 获取状态显示文本
     */
    const getStatusText = (status) => {
      const map = {
        not_started: '未开始',
        in_progress: '进行中',
        ended: '已结束'
      }
      return map[status] || status
    }

    // ==================== 业务函数 ====================

    /**
     * 加载活动列表
     */
    const fetchActivities = async () => {
      loading.value = true
      try {
        const result = await ActivityService.getActivities({
          page: paginationConfig.current,
          pageSize: paginationConfig.pageSize
        })

        activities.value = result.data
        paginationConfig.total = result.total
      } catch (error) {
        root.$message.error('加载活动列表失败')
        console.error('加载活动列表失败:', error)
      } finally {
        loading.value = false
      }
    }

    /**
     * 表格分页变化处理
     */
    const handleTableChange = (pagination) => {
      paginationConfig.current = pagination.current
      paginationConfig.pageSize = pagination.pageSize
      fetchActivities()
    }

    /**
     * 创建活动
     */
    const handleCreate = () => {
      isCreateDialogOpen.value = true
    }

    /**
     * 编辑活动
     */
    const handleEdit = (activity) => {
      editingActivity.value = activity
      isEditDialogOpen.value = true
    }

    /**
     * 查看活动
     */
    const handleView = (activity) => {
      const content = `
        <div>
          <p><strong>活动时间：</strong>${activity.startTime} 至 ${activity.endTime}</p>
          <p><strong>活动规则：</strong></p>
          <div style="white-space: pre-wrap; line-height: 1.6;">${activity.rules}</div>
          <p><strong>参与条件：</strong>${activity.participationConditions.join(', ')}</p>
          <p><strong>派发优惠券：</strong>${activity.couponIds.length}张</p>
        </div>
      `

      root.$confirm({
        title: activity.name,
        width: 600,
        content: (h) => h('div', { domProps: { innerHTML: content } }),
        okText: '确定',
        cancelButtonProps: { style: { display: 'none' } }
      })
    }

    /**
     * 管理活动码
     */
    const handleManageCodes = (activity) => {
      selectedActivity.value = activity
      isMerchantCodeDialogOpen.value = true
    }

    /**
     * 查看数据
     */
    const handleViewData = (activity) => {
      selectedActivity.value = activity
      isDataDialogOpen.value = true
    }

    /**
     * Dialog操作成功回调
     */
    const handleDialogSuccess = () => {
      fetchActivities()
    }

    // ==================== 生命周期 ====================

    onMounted(() => {
      fetchActivities()
    })

    // ==================== 返回暴露的属性和方法 ====================

    return {
      loading,
      activities,
      columns,
      paginationConfig,
      isCreateDialogOpen,
      isEditDialogOpen,
      isMerchantCodeDialogOpen,
      isDataDialogOpen,
      editingActivity,
      selectedActivity,
      formatDate,
      formatTime,
      getStatusTagClass,
      getStatusText,
      handleTableChange,
      handleCreate,
      handleEdit,
      handleView,
      handleManageCodes,
      handleViewData,
      handleDialogSuccess
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';
@import '@/styles/common.less';

.activity-list-page {
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

.conditions-text,
.coupons-text {
  color: @text-secondary;
  font-size: @font-size-sm;
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
}
</style>
