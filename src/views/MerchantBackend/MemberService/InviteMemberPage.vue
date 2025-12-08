<template>
  <sidebar>
    <div class="h-screen overflow-y-auto bg-secondary">
      <div class="max-w-5xl mx-auto p-8 space-y-8">
        <!-- 页面标题 -->
        <div class="flex items-center justify-between">
          <h1 class="page-title">邀请会员</h1>
          <a-button type="primary" size="large" @click="handleShowQR" class="invite-btn">
            邀请会员
          </a-button>
        </div>

        <!-- 邀请记录列表 -->
        <a-card :bordered="false" class="record-card">
          <div slot="title" class="card-title">邀请记录</div>

          <a-table
            :columns="columns"
            :data-source="sortedRecords"
            :pagination="false"
            :loading="loading"
            row-key="id"
            class="custom-table"
          >
            <!-- 受邀人 -->
            <template #inviteeId="{ text }">
              <span class="invitee-name">{{ text }}</span>
            </template>

            <!-- 受邀时间 -->
            <template #invitedAt="{ text }">
              <span class="invited-time">{{ text }}</span>
            </template>
          </a-table>

          <!-- 空状态 -->
          <a-empty v-if="sortedRecords.length === 0" description="暂无邀请记录" />
        </a-card>

        <!-- 邀请二维码弹窗 -->
        <a-modal
          v-model:visible="qrDialogOpen"
          title="邀请会员二维码"
          :footer="null"
          width="400px"
          centered
          :body-style="{ padding: '24px' }"
        >
          <div class="qr-modal-content">
            <!-- 二维码 -->
            <div class="flex items-center justify-center">
              <div class="qr-placeholder">
                <a-icon type="qrcode" class="qr-icon" />
              </div>
            </div>

            <!-- 保存图片按钮 -->
            <a-button block @click="handleDownloadQR" class="download-btn">
              <template #icon>
                <a-icon type="download" />
              </template>
              保存图片
            </a-button>
          </div>
        </a-modal>
      </div>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import { message } from 'ant-design-vue'
import { getInviteRecords, generateInviteQRCode } from '@/api/memberService'

export default defineComponent({
  name: 'InviteMemberPage',
  components: { Sidebar },
  setup() {
    const loading = ref(false)
    const qrDialogOpen = ref(false)
    const records = ref([])

    const columns = [
      {
        title: '受邀人',
        dataIndex: 'inviteeId',
        key: 'inviteeId',
        width: 150,
        slots: { customRender: 'inviteeId' }
      },
      {
        title: '受邀时间',
        dataIndex: 'invitedAt',
        key: 'invitedAt',
        width: 180,
        slots: { customRender: 'invitedAt' }
      }
    ]

    // 按受邀时间倒序排列
    const sortedRecords = computed(() => {
      return [...records.value].sort((a, b) => {
        const dateA = new Date(a.invitedAt.replace(/\//g, '-'))
        const dateB = new Date(b.invitedAt.replace(/\//g, '-'))
        return dateB - dateA
      })
    })

    // 获取邀请记录
    const fetchRecords = async () => {
      loading.value = true
      try {
        const data = await getInviteRecords()
        records.value = data
      } catch (error) {
        message.error('获取邀请记录失败')
        console.error(error)
      } finally {
        loading.value = false
      }
    }

    // 显示邀请二维码
    const handleShowQR = async () => {
      try {
        await generateInviteQRCode()
        qrDialogOpen.value = true
      } catch (error) {
        message.error('生成邀请二维码失败')
        console.error(error)
      }
    }

    // 下载二维码
    const handleDownloadQR = () => {
      message.success('二维码已保存')
      console.log('下载二维码')
    }

    onMounted(() => {
      fetchRecords()
    })

    return {
      loading,
      qrDialogOpen,
      records,
      columns,
      sortedRecords,
      handleShowQR,
      handleDownloadQR
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.bg-secondary {
  background-color: @bg-secondary;
}

.page-title {
  font-size: @font-size-2xl;
  font-weight: @font-weight-bold;
  color: @text-primary;
}

.invite-btn {
  height: 44px;
  background-color: @brand-primary;
  border-color: @brand-primary;
  color: #ffffff;
  font-weight: @font-weight-medium;
  box-shadow: @shadow-sm;
  transition: @transition-base;

  &:hover {
    background-color: @brand-primary-hover;
    border-color: @brand-primary-hover;
  }
}

.record-card {
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

.card-title {
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

.invitee-name {
  font-weight: @font-weight-medium;
  color: @text-primary;
}

.invited-time {
  color: @text-secondary;
}

.qr-modal-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.qr-placeholder {
  width: 256px;
  height: 256px;
  background-color: @bg-tertiary;
  border-radius: @border-radius-lg;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-icon {
  color: @text-tertiary;
  font-size: 192px;
}

.download-btn {
  height: 36px;
  border-color: @border-secondary;
  color: @text-primary;
  transition: @transition-base;

  &:hover {
    border-color: @border-focus;
    background-color: @bg-hover;
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
}

:deep(.ant-empty) {
  color: @text-tertiary;
}
</style>
