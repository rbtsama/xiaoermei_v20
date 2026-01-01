<template>
  <sidebar>
    <div class="sms-config-page">
      <!-- 创建短信模板Dialog -->
      <sms-dialog
        :visible="isCreateDialogOpen"
        mode="create"
        @close="isCreateDialogOpen = false"
        @success="handleDialogSuccess"
      />

      <!-- 编辑短信模板Dialog -->
      <sms-dialog
        :visible="isEditDialogOpen"
        mode="edit"
        :template="editingTemplate"
        @close="isEditDialogOpen = false"
        @success="handleDialogSuccess"
      />

      <!-- 短信模板列表 -->
      <a-card :bordered="false" class="list-card">
        <div slot="title" class="card-header">
          <span class="card-title">短信配置</span>
          <div class="header-actions">
            <a-button type="primary" @click="isCreateDialogOpen = true">
              <a-icon type="plus" />
              创建短信模板
            </a-button>
          </div>
        </div>

        <a-table
          :columns="columns"
          :data-source="templates"
          :pagination="paginationConfig"
          :loading="loading"
          :scroll="{ x: 1000 }"
          row-key="templateId"
          class="custom-table"
          @change="handleTableChange"
        >
          <!-- 短信模板ID -->
          <template slot="templateId" slot-scope="templateId">
            <span class="template-id-text">{{ templateId }}</span>
          </template>

          <!-- 短信模板内容 -->
          <template slot="content" slot-scope="content">
            <span class="content-text" :title="content">
              {{ content }}
            </span>
          </template>

          <!-- 更新时间 -->
          <template slot="updatedAt" slot-scope="updatedAt">
            <div class="datetime-cell">
              <div class="date">{{ formatDate(updatedAt) }}</div>
              <div class="time">{{ formatTime(updatedAt) }}</div>
            </div>
          </template>

          <!-- 操作 -->
          <template slot="action" slot-scope="text, record">
            <div class="action-btns">
              <a-button size="small" @click="handleEdit(record)">
                <a-icon type="edit" />
                编辑
              </a-button>
              <a-button
                size="small"
                :type="record.status === 'enabled' ? 'danger' : 'primary'"
                @click="handleToggleStatus(record)"
              >
                {{ record.status === 'enabled' ? '停用' : '启用' }}
              </a-button>
              <a-popconfirm
                title="确定要删除这个短信模板吗？"
                ok-text="确定"
                cancel-text="取消"
                @confirm="handleDelete(record)"
              >
                <a-button size="small" type="danger">
                  <a-icon type="delete" />
                  删除
                </a-button>
              </a-popconfirm>
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
import SmsDialog from './components/SmsDialog.vue'
import SmsService from './services/sms.service'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'SmsConfigPage',
  components: {
    Sidebar,
    SmsDialog
  },
  setup(props, { root }) {
    const loading = ref(false)
    const templates = ref([])
    const total = ref(0)
    const currentPage = ref(1)
    const pageSize = ref(10)

    // Dialog状态
    const isCreateDialogOpen = ref(false)
    const isEditDialogOpen = ref(false)
    const editingTemplate = ref(null)

    // 表格列定义
    const columns = [
      {
        title: '短信模板ID',
        dataIndex: 'templateId',
        key: 'templateId',
        width: 180,
        scopedSlots: { customRender: 'templateId' }
      },
      {
        title: '短信模板内容',
        dataIndex: 'content',
        key: 'content',
        width: 400,
        scopedSlots: { customRender: 'content' }
      },
      {
        title: '更新时间',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        width: 120,
        scopedSlots: { customRender: 'updatedAt' }
      },
      {
        title: '操作',
        key: 'action',
        width: 220,
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

    // 获取短信模板列表
    const fetchTemplates = async () => {
      loading.value = true
      try {
        const result = await SmsService.getSmsTemplates({
          page: currentPage.value,
          pageSize: pageSize.value
        })
        templates.value = result.data
        total.value = result.total
        paginationConfig.total = result.total
        paginationConfig.current = result.page
      } catch (error) {
        root.$message.error('获取短信模板列表失败')
      } finally {
        loading.value = false
      }
    }

    // 表格变化处理
    const handleTableChange = (pagination) => {
      currentPage.value = pagination.current
      pageSize.value = pagination.pageSize
      fetchTemplates()
    }

    // 打开编辑Dialog
    const handleEdit = (template) => {
      editingTemplate.value = template
      isEditDialogOpen.value = true
    }

    // 切换状态
    const handleToggleStatus = async (template) => {
      try {
        await SmsService.toggleSmsTemplateStatus(template.templateId)
        root.$message.success(`已${template.status === 'enabled' ? '停用' : '启用'}短信模板`)
        fetchTemplates()
      } catch (error) {
        root.$message.error('操作失败')
      }
    }

    // 删除
    const handleDelete = async (template) => {
      try {
        await SmsService.deleteSmsTemplate(template.templateId)
        root.$message.success('删除成功')
        fetchTemplates()
      } catch (error) {
        root.$message.error('删除失败')
      }
    }

    // Dialog成功回调
    const handleDialogSuccess = () => {
      isCreateDialogOpen.value = false
      isEditDialogOpen.value = false
      fetchTemplates()
    }

    // 格式化日期
    const formatDate = (datetime) => {
      if (!datetime) return '-'
      return dayjs(datetime).format('YYYY-MM-DD')
    }

    // 格式化时间
    const formatTime = (datetime) => {
      if (!datetime) return '-'
      return dayjs(datetime).format('HH:mm:ss')
    }

    onMounted(() => {
      fetchTemplates()
    })

    return {
      loading,
      templates,
      columns,
      paginationConfig,
      isCreateDialogOpen,
      isEditDialogOpen,
      editingTemplate,
      handleTableChange,
      handleEdit,
      handleToggleStatus,
      handleDelete,
      handleDialogSuccess,
      formatDate,
      formatTime
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';
@import '@/styles/common.less';

.sms-config-page {
  padding: 24px;
  max-width: 1800px;
  margin: 0 auto;
}

// 卡片样式
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
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.card-title {
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

.header-actions {
  display: flex;
  gap: 8px;
}

// 自定义表格样式（继承common.less，仅覆盖特殊需求）
.custom-table {
  :deep(.ant-table) {
    font-size: @font-size-base;
  }
}

// ID 文本
.id-text {
  font-family: @font-family;
  font-weight: @font-weight-medium;
  color: @text-primary;
  font-size: @font-size-sm;
}

// 模板ID文本
.template-id-text {
  color: @text-primary;
  font-size: @font-size-base;
  font-family: 'Consolas', 'Monaco', monospace;
}

// 内容文本
.content-text {
  color: @text-primary;
  font-size: @font-size-sm;
  display: inline-block;
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}

// 操作按钮（自定义小尺寸样式）
:deep(.action-btns .ant-btn-sm) {
  height: 28px;
  padding: 0 12px;
  font-size: @font-size-sm;
}
</style>
