<template>
  <a-modal
    :visible="visible"
    title="选择适用门店"
    width="600px"
    @ok="handleConfirm"
    @cancel="handleCancel"
    ok-text="确认"
    cancel-text="取消"
  >
    <div class="store-select-content">
      <div class="select-all-bar">
        <a-checkbox
          :checked="isAllSelected"
          :indeterminate="isIndeterminate"
          @change="handleSelectAll"
        >
          全选
        </a-checkbox>
        <span class="selected-count">已选择 {{ selectedStoreIds.length }} / {{ stores.length }} 个门店</span>
      </div>

      <div class="store-list">
        <a-checkbox
          v-for="store in stores"
          :key="store.id"
          :checked="selectedStoreIds.includes(store.id)"
          @change="handleStoreToggle(store.id)"
          class="store-item"
        >
          {{ store.name }}
        </a-checkbox>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from '@vue/composition-api'
import { mockStores } from '../services/mocks/store.mock'
import type { Store } from '../types/activity.types'

export default defineComponent({
  name: 'StoreSelectDialog',

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array as () => string[],
      default: () => []
    }
  },

  setup(props, { emit }) {
    // 门店列表（已按拼音排序）
    const stores = ref<Store[]>(mockStores)

    // 当前选中的门店ID数组
    const selectedStoreIds = ref<string[]>([...props.value])

    // 是否全选
    const isAllSelected = computed(() => {
      return selectedStoreIds.value.length === stores.value.length && stores.value.length > 0
    })

    // 是否部分选中
    const isIndeterminate = computed(() => {
      const count = selectedStoreIds.value.length
      return count > 0 && count < stores.value.length
    })

    /**
     * 切换门店选中状态
     */
    const handleStoreToggle = (storeId: string) => {
      const index = selectedStoreIds.value.indexOf(storeId)
      if (index > -1) {
        selectedStoreIds.value.splice(index, 1)
      } else {
        selectedStoreIds.value.push(storeId)
      }
    }

    /**
     * 全选/取消全选
     */
    const handleSelectAll = (e: any) => {
      if (e.target.checked) {
        selectedStoreIds.value = stores.value.map(s => s.id)
      } else {
        selectedStoreIds.value = []
      }
    }

    /**
     * 确认选择
     */
    const handleConfirm = () => {
      emit('confirm', [...selectedStoreIds.value])
    }

    /**
     * 取消选择
     */
    const handleCancel = () => {
      // 重置为原始值
      selectedStoreIds.value = [...props.value]
      emit('cancel')
    }

    // 监听外部value变化，同步到内部
    watch(() => props.value, (newValue) => {
      selectedStoreIds.value = [...newValue]
    })

    // 监听visible变化，重置选中状态
    watch(() => props.visible, (visible) => {
      if (visible) {
        selectedStoreIds.value = [...props.value]
      }
    })

    return {
      stores,
      selectedStoreIds,
      isAllSelected,
      isIndeterminate,
      handleStoreToggle,
      handleSelectAll,
      handleConfirm,
      handleCancel
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.store-select-content {
  max-height: 500px;
  display: flex;
  flex-direction: column;
}

.select-all-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: @bg-secondary;
  border-radius: @border-radius-base;
  margin-bottom: 16px;

  .selected-count {
    font-size: @font-size-sm;
    color: @text-secondary;
  }
}

.store-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px 16px;
  max-height: 400px;
  overflow-y: auto;
  padding: 4px;

  .store-item {
    padding: 10px 12px;
    border: 1px solid @border-primary;
    border-radius: @border-radius-base;
    transition: all 0.2s;
    margin: 0;

    &:hover {
      border-color: @brand-primary;
      background: rgba(59, 130, 246, 0.05);
    }

    :deep(.ant-checkbox) {
      margin-right: 8px;
    }

    :deep(.ant-checkbox-checked .ant-checkbox-inner) {
      background-color: @brand-primary;
      border-color: @brand-primary;
    }
  }
}
</style>
