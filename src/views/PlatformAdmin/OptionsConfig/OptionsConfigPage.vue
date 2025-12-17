<template>
  <sidebar>
    <div class="page-container">
      <!-- 门店亮点配置 -->
      <a-card class="card-style" :bordered="false">
        <div slot="title" class="card-header">
          <span class="card-title">门店亮点</span>
          <span class="card-desc">配置商户端可选择的门店亮点选项</span>
        </div>

        <!-- 建筑与景观 -->
        <div class="option-category">
          <div class="category-header">
            <span class="category-title">建筑与景观</span>
            <a-button type="primary" size="small" @click="handleAdd('architecture')">
              <a-icon type="plus" />添加选项
            </a-button>
          </div>
          <draggable v-model="architectureOptions" handle=".drag-handle" @end="handleSortChange('architecture')">
            <div v-for="(item, index) in architectureOptions" :key="item.id" class="option-item">
              <a-icon type="menu" class="drag-handle" />
              <span class="option-label">{{ item.label }}</span>
              <div class="option-actions">
                <a-button size="small" @click="handleEdit(item, 'architecture')">
                  <a-icon type="edit" />编辑
                </a-button>
                <a-button size="small" danger @click="handleDelete(item, index, 'architecture')">
                  <a-icon type="delete" />删除
                </a-button>
              </div>
            </div>
          </draggable>
        </div>

        <!-- 服务与设施 -->
        <div class="option-category">
          <div class="category-header">
            <span class="category-title">服务与设施</span>
            <a-button type="primary" size="small" @click="handleAdd('services')">
              <a-icon type="plus" />添加选项
            </a-button>
          </div>
          <draggable v-model="servicesOptions" handle=".drag-handle" @end="handleSortChange('services')">
            <div v-for="(item, index) in servicesOptions" :key="item.id" class="option-item">
              <a-icon type="menu" class="drag-handle" />
              <span class="option-label">{{ item.label }}</span>
              <div class="option-actions">
                <a-button size="small" @click="handleEdit(item, 'services')">
                  <a-icon type="edit" />编辑
                </a-button>
                <a-button size="small" danger @click="handleDelete(item, index, 'services')">
                  <a-icon type="delete" />删除
                </a-button>
              </div>
            </div>
          </draggable>
        </div>
      </a-card>

      <!-- 门店设施配置 -->
      <a-card class="card-style" :bordered="false">
        <div slot="title" class="card-header">
          <span class="card-title">门店设施</span>
          <span class="card-desc">配置商户端可选择的门店设施选项（12个分类）</span>
        </div>

        <!-- 交通服务 -->
        <div class="option-category">
          <div class="category-header">
            <span class="category-title">交通服务</span>
            <a-button type="primary" size="small" @click="handleAdd('transportation')">
              <a-icon type="plus" />添加选项
            </a-button>
          </div>
          <draggable v-model="transportationOptions" handle=".drag-handle" @end="handleSortChange('transportation')">
            <div v-for="(item, index) in transportationOptions" :key="item.id" class="option-item">
              <a-icon type="menu" class="drag-handle" />
              <span class="option-label">{{ item.label }}</span>
              <div class="option-actions">
                <a-button size="small" @click="handleEdit(item, 'transportation')">
                  <a-icon type="edit" />编辑
                </a-button>
                <a-button size="small" danger @click="handleDelete(item, index, 'transportation')">
                  <a-icon type="delete" />删除
                </a-button>
              </div>
            </div>
          </draggable>
        </div>

        <!-- 其他11个分类提示 -->
        <div class="hint-section">
          <p>清洁服务、安全安保、公共区域等11个分类待完善...</p>
        </div>
      </a-card>

      <!-- 编辑弹窗 -->
      <a-modal
        :visible="editVisible"
        :title="editingItem ? '编辑选项' : '添加选项'"
        @ok="handleSave"
        @cancel="editVisible = false"
        width="500px"
      >
        <a-form-model :model="editForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-form-model-item label="选项文本" required>
            <a-input v-model="editForm.label" placeholder="请输入选项文本" :maxLength="20" />
            <div class="field-hint">最多20个字，商户端将显示此文本</div>
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, reactive } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import draggable from 'vuedraggable'
import { mockHighlightsArchitecture, mockHighlightsServices, mockTransportationFacilities } from '@/mocks/optionsConfig.mock'

export default defineComponent({
  name: 'OptionsConfigPage',
  components: { Sidebar, draggable },
  setup(props, { root }) {
    const architectureOptions = ref([...mockHighlightsArchitecture])
    const servicesOptions = ref([...mockHighlightsServices])
    const transportationOptions = ref([...mockTransportationFacilities])

    const editVisible = ref(false)
    const editingItem = ref(null)
    const editingCategory = ref('')
    const editForm = reactive({
      label: ''
    })

    const handleAdd = (category) => {
      editingItem.value = null
      editingCategory.value = category
      editForm.label = ''
      editVisible.value = true
    }

    const handleEdit = (item, category) => {
      editingItem.value = item
      editingCategory.value = category
      editForm.label = item.label
      editVisible.value = true
    }

    const handleSave = () => {
      if (!editForm.label.trim()) {
        root.$message.error('请输入选项文本')
        return
      }

      if (editingItem.value) {
        // 编辑
        editingItem.value.label = editForm.label
        root.$message.success('编辑成功')
      } else {
        // 新增
        const newItem = {
          id: `new_${Date.now()}`,
          label: editForm.label,
          sort: getMaxSort(editingCategory.value) + 1
        }
        getOptionsArray(editingCategory.value).push(newItem)
        root.$message.success('添加成功')
      }
      editVisible.value = false
    }

    const handleDelete = (item, index, category) => {
      root.$confirm({
        title: '确认删除',
        content: `确定要删除选项"${item.label}"吗？删除后商户端将不再显示此选项。`,
        onOk: () => {
          getOptionsArray(category).splice(index, 1)
          root.$message.success('删除成功')
        }
      })
    }

    const handleSortChange = (category) => {
      // 更新排序号
      const options = getOptionsArray(category)
      options.forEach((item, index) => {
        item.sort = index + 1
      })
      root.$message.success('排序已更新')
    }

    const getOptionsArray = (category) => {
      const map = {
        architecture: architectureOptions.value,
        services: servicesOptions.value,
        transportation: transportationOptions.value
      }
      return map[category] || []
    }

    const getMaxSort = (category) => {
      const options = getOptionsArray(category)
      return options.length > 0 ? Math.max(...options.map(o => o.sort || 0)) : 0
    }

    return {
      architectureOptions,
      servicesOptions,
      transportationOptions,
      editVisible,
      editingItem,
      editForm,
      handleAdd,
      handleEdit,
      handleSave,
      handleDelete,
      handleSortChange
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.page-container {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.card-style {
  margin-bottom: 24px;
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;

  :deep(.ant-card-head) {
    border-bottom: 1px solid @border-primary;
    padding: 16px 24px;
  }

  :deep(.ant-card-body) {
    padding: 32px 24px;
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-title {
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

.card-desc {
  font-size: @font-size-sm;
  color: @text-secondary;
}

.option-category {
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.category-title {
  font-size: @font-size-base;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin-bottom: 8px;
  background: @bg-primary;
  border: 1px solid @border-primary;
  border-radius: @border-radius-base;
  transition: all 0.2s;

  &:hover {
    border-color: @brand-primary;
    box-shadow: @shadow-md;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.drag-handle {
  font-size: 16px;
  color: @text-secondary;
  cursor: move;

  &:hover {
    color: @brand-primary;
  }
}

.option-label {
  flex: 1;
  font-size: @font-size-base;
  color: @text-primary;
}

.option-actions {
  display: flex;
  gap: 8px;
}

.field-hint {
  font-size: @font-size-xs;
  color: @text-secondary;
  margin-top: 4px;
  line-height: 1.4;
}

.hint-section {
  margin-top: 32px;
  padding: 24px;
  background: @bg-secondary;
  border-radius: @border-radius-base;
  text-align: center;

  p {
    margin: 0;
    font-size: @font-size-sm;
    color: @text-secondary;
  }
}
</style>
