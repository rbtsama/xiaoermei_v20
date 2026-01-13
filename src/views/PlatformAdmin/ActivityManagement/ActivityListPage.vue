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
          row-key="id"
          class="custom-table"
          @change="handleTableChange"
        >
          <!-- 活动名称 -->
          <template slot="name" slot-scope="name">
            <span class="name-text">{{ name }}</span>
          </template>

          <!-- 活动时间 -->
          <template slot="activityTime" slot-scope="text, record">
            <div class="time-range-cell">
              <div class="flex items-center gap-1">
                <span class="date-icon-start">起</span>
                <span class="text-primary">{{ formatDate(record.startTime) }}</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="date-icon-end">止</span>
                <span class="text-primary">{{ formatDate(record.endTime) }}</span>
              </div>
            </div>
          </template>

          <!-- 平台预算 -->
          <template slot="platformBudget" slot-scope="text, record">
            <span class="budget-text">
              {{ record.remainingBudget.toFixed(2) }}/{{ record.platformBudget }}
            </span>
          </template>

          <!-- 状态 -->
          <template slot="status" slot-scope="status">
            <a-tag :class="getStatusTagClass(status)">
              {{ getStatusText(status) }}
            </a-tag>
          </template>

          <!-- 创建人 -->
          <template slot="createdBy" slot-scope="createdBy">
            <span class="text-primary-content">{{ createdBy }}</span>
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
              <a-button
                size="small"
                :type="record.status === 'enabled' ? 'danger' : 'primary'"
                @click="handleToggleStatus(record)"
              >
                {{ record.status === 'enabled' ? '禁用' : '启用' }}
              </a-button>
              <a-button size="small" @click="handleEdit(record)">
                <a-icon type="edit" />
                编辑
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
import ActivityService from './services/activity.service'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'ActivityListPage',
  components: {
    Sidebar,
    CreateActivityDialog
  },
  setup(props, { root }) {
    // ==================== 响应式数据 ====================

    const loading = ref(false)
    const activities = ref([])

    // Dialog状态
    const isCreateDialogOpen = ref(false)
    const isEditDialogOpen = ref(false)
    const editingActivity = ref(null)

    // 表格列定义
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 100
      },
      {
        title: '活动名称',
        dataIndex: 'name',
        key: 'name',
        scopedSlots: { customRender: 'name' }
      },
      {
        title: '活动时间',
        key: 'activityTime',
        width: 150,
        scopedSlots: { customRender: 'activityTime' }
      },
      {
        title: '平台预算',
        key: 'platformBudget',
        width: 150,
        scopedSlots: { customRender: 'platformBudget' }
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 90,
        scopedSlots: { customRender: 'status' }
      },
      {
        title: '创建人',
        dataIndex: 'createdBy',
        key: 'createdBy',
        width: 120,
        scopedSlots: { customRender: 'createdBy' }
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 120,
        scopedSlots: { customRender: 'createdAt' }
      },
      {
        title: '操作',
        key: 'action',
        width: 140,
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
     * 格式化日期（只显示日期部分）
     */
    const formatDate = (datetime) => {
      return datetime ? dayjs(datetime).format('YYYY-MM-DD') : '-'
    }

    /**
     * 格式化时间（只显示时间部分）
     */
    const formatTime = (datetime) => {
      return datetime ? dayjs(datetime).format('HH:mm:ss') : '-'
    }

    /**
     * 获取状态标签样式类名
     */
    const getStatusTagClass = (status) => {
      return status === 'enabled' ? 'tag-green' : 'tag-gray'
    }

    /**
     * 获取状态显示文本
     */
    const getStatusText = (status) => {
      return status === 'enabled' ? '已启用' : '已禁用'
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
     * 切换活动状态（启用/禁用）
     */
    const handleToggleStatus = async (activity) => {
      const actionText = activity.status === 'enabled' ? '禁用' : '启用'

      root.$confirm({
        title: `确认${actionText}活动`,
        content: `确定要${actionText}活动"${activity.name}"吗？`,
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          try {
            await ActivityService.toggleActivityStatus(activity.id)
            root.$message.success(`活动已${actionText}`)
            fetchActivities()
          } catch (error) {
            root.$message.error(`${actionText}失败，请重试`)
          }
        }
      })
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
      editingActivity,
      formatDate,
      formatTime,
      getStatusTagClass,
      getStatusText,
      handleTableChange,
      handleCreate,
      handleEdit,
      handleToggleStatus,
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

.date-text {
  color: @text-primary;
  font-size: @font-size-sm;
}

.text-primary-content {
  color: @text-primary;
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
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: @font-size-xs;
    font-weight: @font-weight-semibold;
    color: @text-primary;
    background-color: @bg-tertiary;
    border-radius: 50%;
  }
}

.action-btns {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: nowrap;

  .ant-btn-sm {
    height: 28px;
    padding: 0 12px;
    font-size: @font-size-sm;
  }
}

.budget-text {
  color: @text-primary;
  font-size: @font-size-sm;
}
</style>
