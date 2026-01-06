<template>
  <a-modal
    :visible="visible"
    title="创建通知任务"
    :width="700"
    :maskClosable="false"
    @cancel="handleCancel"
  >
    <a-form-model
      ref="formRef"
      :model="formData"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <!-- 通知类型 -->
      <a-form-model-item label="通知类型" required>
        <a-radio-group v-model="formData.type" @change="handleTypeChange">
          <a-radio :value="NotificationType.NOTIFICATION">通知</a-radio>
          <a-radio :value="NotificationType.AGREEMENT_REQUIRED">需同意通知</a-radio>
          <a-radio :value="NotificationType.TASK">任务</a-radio>
        </a-radio-group>
      </a-form-model-item>

      <!-- 通知内容 -->
      <a-form-model-item label="通知内容" required>
        <a-textarea
          v-model="formData.content"
          :rows="4"
          :maxLength="500"
          placeholder="请输入通知内容"
        />
        <div class="char-count">{{ formData.content.length }}/500</div>
      </a-form-model-item>

      <!-- 任务链接（仅任务类型显示） -->
      <a-form-model-item v-if="formData.type === NotificationType.TASK" label="跳转链接" required>
        <a-input
          v-model="formData.link"
          placeholder="/merchant-backend/store-config"
          :maxLength="200"
        />
        <div class="field-hint">点击"去查看"后的跳转地址</div>
      </a-form-model-item>

      <!-- 通知商户 -->
      <a-form-model-item label="通知商户" required>
        <div class="merchant-table-container">
          <a-table
            :columns="merchantColumns"
            :data-source="merchants"
            :row-selection="{
              selectedRowKeys: formData.merchantIds,
              onChange: handleSelectionChange
            }"
            :pagination="false"
            :scroll="{ y: 300 }"
            size="small"
            rowKey="id"
          >
            <template slot="storeName" slot-scope="storeName">
              <span class="store-name">{{ storeName }}</span>
            </template>
            <template slot="onlineTime" slot-scope="onlineTime">
              <span class="online-time">{{ formatDateTime(onlineTime) }}</span>
            </template>
          </a-table>
          <div class="selected-count">已选择 {{ formData.merchantIds.length }} 个商户</div>
        </div>
      </a-form-model-item>
    </a-form-model>

    <template slot="footer">
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" :loading="submitting" @click="handleSubmit">
        发送通知任务
      </a-button>
    </template>
  </a-modal>
</template>

<script>
import { defineComponent, ref, reactive, computed } from '@vue/composition-api'
import { NotificationType } from '@/types/notification'
import { mockMerchantList } from '@/mocks/notification.mock'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'CreateNotificationDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit, root }) {
    const formRef = ref(null)
    const submitting = ref(false)

    const formData = reactive({
      type: NotificationType.NOTIFICATION,
      content: '',
      link: '',
      merchantIds: []
    })

    // 商户列表（按上线时间倒序）
    const merchants = ref(
      [...mockMerchantList].sort((a, b) => {
        return dayjs(b.onlineTime).unix() - dayjs(a.onlineTime).unix()
      })
    )

    // 商户表格列配置
    const merchantColumns = [
      {
        title: '门店名称',
        dataIndex: 'storeName',
        scopedSlots: { customRender: 'storeName' }
      },
      {
        title: '上线时间',
        dataIndex: 'onlineTime',
        width: 180,
        scopedSlots: { customRender: 'onlineTime' }
      }
    ]

    const formatDateTime = (datetime) => {
      return datetime ? dayjs(datetime).format('YYYY-MM-DD HH:mm') : '-'
    }

    const handleTypeChange = () => {
      // 切换类型时清空链接
      if (formData.type !== NotificationType.TASK) {
        formData.link = ''
      }
    }

    const handleSelectionChange = (selectedRowKeys) => {
      formData.merchantIds = selectedRowKeys
    }

    const handleSubmit = async () => {
      // 验证
      if (!formData.content.trim()) {
        root.$message.error('请输入通知内容')
        return
      }

      if (formData.type === NotificationType.TASK && !formData.link.trim()) {
        root.$message.error('请输入跳转链接')
        return
      }

      if (formData.merchantIds.length === 0) {
        root.$message.error('请选择至少一个商户')
        return
      }

      try {
        submitting.value = true
        // TODO: 调用API发送通知任务
        await new Promise(resolve => setTimeout(resolve, 1000))

        root.$message.success(`成功发送通知任务给 ${formData.merchantIds.length} 个商户`)
        emit('success')
        handleCancel()
      } catch (error) {
        root.$message.error('发送失败，请重试')
        console.error(error)
      } finally {
        submitting.value = false
      }
    }

    const handleCancel = () => {
      // 重置表单
      formData.type = NotificationType.NOTIFICATION
      formData.content = ''
      formData.link = ''
      formData.merchantIds = []

      emit('update:visible', false)
      emit('close')
    }

    return {
      formRef,
      submitting,
      formData,
      merchants,
      merchantColumns,
      NotificationType,
      formatDateTime,
      handleTypeChange,
      handleSelectionChange,
      handleSubmit,
      handleCancel
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

:deep(.ant-modal-header) {
  padding: 20px 24px;
  border-bottom: 1px solid @border-primary;
}

:deep(.ant-modal-title) {
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

:deep(.ant-modal-body) {
  padding: 24px;
  max-height: 600px;
  overflow-y: auto;
}

.char-count {
  text-align: right;
  font-size: @font-size-xs;
  color: @text-tertiary;
  margin-top: 4px;
}

.field-hint {
  font-size: @font-size-xs;
  color: @text-secondary;
  margin-top: 4px;
  line-height: 1.4;
}

.merchant-table-container {
  border: 1px solid @border-primary;
  border-radius: @border-radius-base;
  overflow: hidden;

  :deep(.ant-table) {
    .ant-table-thead > tr > th {
      background: @bg-secondary;
      border-bottom: 1px solid @border-primary;
      color: @text-primary;
      font-weight: @font-weight-semibold;
      font-size: @font-size-sm;
      padding: 10px 12px;
    }

    .ant-table-tbody > tr {
      &:hover > td {
        background: @bg-hover;
      }

      > td {
        border-bottom: 1px solid @border-primary;
        padding: 10px 12px;
        font-size: @font-size-sm;
        color: @text-primary;
      }
    }
  }

  .store-name {
    font-size: @font-size-sm;
    color: @text-primary;
  }

  .online-time {
    font-size: @font-size-sm;
    color: @text-secondary;
  }

  .selected-count {
    padding: 10px 12px;
    background: @bg-primary;
    border-top: 1px solid @border-primary;
    font-size: @font-size-sm;
    color: @text-secondary;
    text-align: right;
  }
}
</style>
