<template>
  <div class="tab5-container">
    <!-- 配置进度提示 -->
    <a-alert
      :message="progressMessage"
      :type="progressType"
      show-icon
      class="progress-alert"
    />

    <!-- 房型列表 -->
    <div v-if="localData.length > 0" class="room-type-list">
      <div
        v-for="(room, index) in localData"
        :key="room.id"
        class="room-type-card"
      >
        <div class="room-header">
          <h3 class="room-name">{{ room.roomTypeName || '未命名房型' }}</h3>
          <div class="room-actions">
            <a-button size="small" @click="handleEdit(room)">
              <a-icon type="edit" />编辑
            </a-button>
            <a-button size="small" @click="handleDuplicate(room)">
              <a-icon type="copy" />复制
            </a-button>
            <a-button size="small" danger @click="handleDelete(index)">
              <a-icon type="delete" />删除
            </a-button>
          </div>
        </div>

        <div class="room-info">
          <div class="info-item">
            <span class="info-label">房间数量：</span>
            <span class="info-value">{{ room.roomCount }} 间</span>
          </div>
          <div class="info-item">
            <span class="info-label">可住人数：</span>
            <span class="info-value">{{ room.capacity }} 人</span>
          </div>
          <div class="info-item">
            <span class="info-label">面积：</span>
            <span class="info-value">{{ room.area || '-' }} ㎡</span>
          </div>
          <div class="info-item">
            <span class="info-label">楼层：</span>
            <span class="info-value">{{ room.floor || '-' }}</span>
          </div>
        </div>

        <!-- 房型图片预览 -->
        <div v-if="room.images.length > 0" class="room-images">
          <img
            v-for="(img, imgIndex) in room.images.slice(0, 4)"
            :key="imgIndex"
            :src="img"
            :alt="`房型图${imgIndex + 1}`"
            class="room-image-thumb"
          />
          <div v-if="room.images.length > 4" class="more-images">
            +{{ room.images.length - 4 }}
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <a-empty v-else description="暂无房型，请添加房型信息" class="empty-state">
      <a-button type="primary" @click="handleAdd">
        <a-icon type="plus" />添加房型
      </a-button>
    </a-empty>

    <!-- 添加房型按钮 -->
    <div v-if="localData.length > 0" class="add-room-btn-container">
      <a-button type="dashed" size="large" block @click="handleAdd" class="add-room-btn">
        <a-icon type="plus" />添加房型
      </a-button>
    </div>

    <!-- 房型编辑弹窗 -->
    <room-type-edit
      :visible="editVisible"
      :room-type="editingRoom"
      @save="handleSaveRoom"
      @cancel="editVisible = false"
    />
  </div>
</template>

<script>
import { defineComponent, ref, reactive, computed, watch } from '@vue/composition-api'
import RoomTypeEdit from './RoomTypeEdit.vue'
import { duplicateRoomType } from '@/api/storeDeployment'

export default defineComponent({
  name: 'Tab5RoomTypeList',
  components: {
    RoomTypeEdit
  },
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit, root }) {
    // 本地房型列表
    const localData = reactive([...props.formData.roomTypes])

    // 编辑状态
    const editVisible = ref(false)
    const editingRoom = ref(null)

    // 配置进度
    const totalRoomCount = computed(() => {
      return props.formData.storeBasicInfo?.roomCount || 0
    })

    const configuredCount = computed(() => {
      return localData.reduce((sum, room) => sum + (room.roomCount || 0), 0)
    })

    const remainingCount = computed(() => {
      return totalRoomCount.value - configuredCount.value
    })

    const progressMessage = computed(() => {
      if (totalRoomCount.value === 0) {
        return '请先在Tab1中填写门店总房间数'
      }
      if (configuredCount.value < totalRoomCount.value) {
        return `您在Tab1中填写的房间数量为${totalRoomCount.value}间，已配置${configuredCount.value}间，还需配置${remainingCount.value}间`
      }
      if (configuredCount.value === totalRoomCount.value) {
        return `已配置${configuredCount.value}间，与门店总房间数一致 ✓`
      }
      return `已配置${configuredCount.value}间，超出门店总房间数${configuredCount.value - totalRoomCount.value}间，请调整`
    })

    const progressType = computed(() => {
      if (totalRoomCount.value === 0) return 'warning'
      if (configuredCount.value < totalRoomCount.value) return 'info'
      if (configuredCount.value === totalRoomCount.value) return 'success'
      return 'error'
    })

    // 监听props变化
    watch(
      () => props.formData.roomTypes,
      (newRoomTypes) => {
        localData.splice(0, localData.length, ...newRoomTypes)
      },
      { deep: true }
    )

    // 添加房型
    const handleAdd = () => {
      editingRoom.value = null
      editVisible.value = true
    }

    // 编辑房型
    const handleEdit = (room) => {
      editingRoom.value = { ...room }
      editVisible.value = true
    }

    // 删除房型
    const handleDelete = (index) => {
      root.$confirm({
        title: '确认删除',
        content: `确定要删除房型"${localData[index].roomTypeName}"吗？`,
        onOk: () => {
          localData.splice(index, 1)
          handleChange()
          root.$message.success('房型已删除')
        }
      })
    }

    // 复制房型
    const handleDuplicate = async (room) => {
      try {
        const duplicate = await duplicateRoomType(room)
        localData.push(duplicate)
        handleChange()
        root.$message.success('房型复制成功')

        // 自动打开编辑弹窗
        editingRoom.value = { ...duplicate }
        editVisible.value = true
      } catch (error) {
        root.$message.error('复制失败')
        console.error(error)
      }
    }

    // 保存房型
    const handleSaveRoom = (roomData) => {
      const existingIndex = localData.findIndex(r => r.id === roomData.id)
      if (existingIndex !== -1) {
        // 更新现有房型
        localData.splice(existingIndex, 1, roomData)
      } else {
        // 添加新房型
        localData.push(roomData)
      }
      editVisible.value = false
      handleChange()
    }

    // 处理数据变化
    const handleChange = () => {
      emit('update', {
        roomTypes: [...localData]
      })
    }

    return {
      localData,
      editVisible,
      editingRoom,
      totalRoomCount,
      configuredCount,
      remainingCount,
      progressMessage,
      progressType,
      handleAdd,
      handleEdit,
      handleDelete,
      handleDuplicate,
      handleSaveRoom
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.tab5-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.progress-alert {
  border-radius: @border-radius-base;
  margin-bottom: 8px;

  :deep(.ant-alert-message) {
    font-size: @font-size-base;
    font-weight: @font-weight-medium;
  }
}

.room-type-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.room-type-card {
  border: 1px solid @border-primary;
  border-radius: @border-radius-lg;
  padding: 20px;
  background: @bg-primary;
  transition: all 0.2s;

  &:hover {
    box-shadow: @shadow-md;
    border-color: @brand-primary;
  }
}

.room-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.room-name {
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;
  margin: 0;
}

.room-actions {
  display: flex;
  gap: 8px;
}

.room-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.info-item {
  font-size: @font-size-sm;
}

.info-label {
  color: @text-secondary;
}

.info-value {
  color: @text-primary;
  font-weight: @font-weight-medium;
}

.room-images {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  position: relative;
}

.room-image-thumb {
  width: 100%;
  aspect-ratio: 3/2;
  object-fit: cover;
  border-radius: @border-radius-base;
  border: 1px solid @border-primary;
}

.more-images {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: @bg-primary;
  padding: 4px 8px;
  border-radius: @border-radius-sm;
  font-size: @font-size-xs;
}

.empty-state {
  padding: 60px 0;
}

.add-room-btn-container {
  margin-top: 8px;
}

.add-room-btn {
  height: 48px;
  font-size: @font-size-base;
  color: @brand-primary;
  border-color: @brand-primary;
  border-style: dashed;

  &:hover {
    color: @brand-primary-hover;
    border-color: @brand-primary-hover;
  }
}
</style>
