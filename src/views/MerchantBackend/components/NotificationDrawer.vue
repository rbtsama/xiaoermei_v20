<template>
  <a-drawer
    :visible="visible"
    :width="480"
    placement="right"
    @close="handleClose"
    class="notification-drawer"
  >
    <!-- 标题栏 -->
    <div slot="title" class="drawer-header">
      <span class="drawer-title">通知</span>
      <a-button size="small" @click="handleMarkAllRead">全部已读</a-button>
    </div>

    <!-- 通知列表 -->
    <div class="notification-list">
      <div
        v-for="item in notifications"
        :key="item.id"
        class="notification-item"
        :class="{ 'notification-unread': item.status === NotificationStatus.UNREAD }"
      >
        <!-- 通知头部 -->
        <div class="notification-header">
          <span class="notification-title">{{ item.title }}</span>
          <span class="notification-time">{{ formatTime(item.createdAt) }}</span>
        </div>

        <!-- 通知内容 -->
        <div class="notification-content">
          {{ item.content }}
        </div>

        <!-- 通知操作按钮 -->
        <div class="notification-actions">
          <!-- 普通通知：已读按钮 -->
          <template v-if="item.type === NotificationType.NOTIFICATION">
            <a-button
              v-if="item.status === NotificationStatus.UNREAD"
              size="small"
              @click="handleMarkRead(item.id)"
            >
              已读
            </a-button>
            <span v-else class="read-tag">已读</span>
          </template>

          <!-- 需同意通知：同意按钮 -->
          <template v-else-if="item.type === NotificationType.AGREEMENT_REQUIRED">
            <a-button
              v-if="item.status === NotificationStatus.UNREAD"
              type="primary"
              size="small"
              @click="handleAgree(item.id)"
            >
              同意
            </a-button>
            <span v-else class="agreed-tag">已同意</span>
          </template>

          <!-- 任务：去查看按钮 -->
          <template v-else-if="item.type === NotificationType.TASK">
            <a-button
              v-if="item.status === NotificationStatus.UNREAD"
              type="primary"
              size="small"
              @click="handleViewTask(item.id, item.link)"
            >
              去查看
            </a-button>
            <span v-else class="read-tag">已完成</span>
          </template>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="notifications.length === 0" class="empty-state">
        <a-icon type="bell" class="empty-icon" />
        <p class="empty-text">暂无通知</p>
      </div>
    </div>
  </a-drawer>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import { NotificationType, NotificationStatus } from '@/types/notification'
import { mockNotifications } from '@/mocks/notification.mock'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'NotificationDrawer',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit, root }) {
    // 使用Mock数据
    const notifications = ref([...mockNotifications])

    const formatTime = (time) => {
      if (!time) return ''
      const now = dayjs()
      const target = dayjs(time)
      const diffDays = now.diff(target, 'day')

      if (diffDays === 0) {
        return target.format('今天 HH:mm')
      } else if (diffDays === 1) {
        return target.format('昨天 HH:mm')
      } else if (diffDays < 7) {
        return `${diffDays}天前`
      } else {
        return target.format('YYYY-MM-DD HH:mm')
      }
    }

    const handleClose = () => {
      emit('update:visible', false)
      emit('close')
    }

    const handleMarkAllRead = () => {
      // 标记所有普通通知为已读
      notifications.value = notifications.value.map(item => {
        if (item.type === NotificationType.NOTIFICATION && item.status === NotificationStatus.UNREAD) {
          return { ...item, status: NotificationStatus.READ }
        }
        return item
      })
      root.$message.success('已全部标记为已读')
      // TODO: 调用API更新已读状态
    }

    const handleMarkRead = (id) => {
      const item = notifications.value.find(n => n.id === id)
      if (item) {
        item.status = NotificationStatus.READ
        root.$message.success('已标记为已读')
        // TODO: 调用API更新已读状态
      }
    }

    const handleAgree = (id) => {
      const item = notifications.value.find(n => n.id === id)
      if (item) {
        item.status = NotificationStatus.AGREED
        root.$message.success('已同意')
        // TODO: 调用API更新同意状态
      }
    }

    const handleViewTask = (id, link) => {
      const item = notifications.value.find(n => n.id === id)
      if (item) {
        item.status = NotificationStatus.READ
        // TODO: 调用API更新已读状态
        if (link) {
          root.$router.push(link)
        }
      }
    }

    return {
      notifications,
      NotificationType,
      NotificationStatus,
      formatTime,
      handleClose,
      handleMarkAllRead,
      handleMarkRead,
      handleAgree,
      handleViewTask
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.notification-drawer {
  :deep(.ant-drawer-header) {
    padding: 16px 24px;
    border-bottom: 1px solid @border-primary;
  }

  :deep(.ant-drawer-body) {
    padding: 0;
  }

  .drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .drawer-title {
      font-size: @font-size-lg;
      font-weight: @font-weight-semibold;
      color: @text-primary;
    }
  }
}

.notification-list {
  padding: 12px 0;

  .notification-item {
    padding: 16px 24px;
    border-bottom: 1px solid @border-primary;
    transition: background-color 0.2s;

    &.notification-unread {
      background-color: rgba(59, 130, 246, 0.03);
    }

    &:hover {
      background-color: @bg-hover;
    }

    .notification-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;

      .notification-title {
        font-size: @font-size-base;
        font-weight: @font-weight-semibold;
        color: @text-primary;
        flex: 1;
        margin-right: 12px;
      }

      .notification-time {
        font-size: @font-size-xs;
        color: @text-tertiary;
        white-space: nowrap;
      }
    }

    .notification-content {
      font-size: @font-size-sm;
      color: @text-secondary;
      line-height: 1.6;
      margin-bottom: 12px;
      word-break: break-word;
    }

    .notification-actions {
      display: flex;
      justify-content: flex-end;

      .ant-btn-sm {
        height: 28px;
        padding: 0 12px;
        font-size: @font-size-sm;
        border-radius: @border-radius-base;
      }

      .read-tag,
      .agreed-tag {
        font-size: @font-size-xs;
        color: @text-tertiary;
        padding: 4px 8px;
      }

      .agreed-tag {
        color: @success-color;
      }
    }
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 24px;

    .empty-icon {
      font-size: 64px;
      color: @text-tertiary;
      margin-bottom: 16px;
    }

    .empty-text {
      font-size: @font-size-base;
      color: @text-secondary;
      margin: 0;
    }
  }
}
</style>
