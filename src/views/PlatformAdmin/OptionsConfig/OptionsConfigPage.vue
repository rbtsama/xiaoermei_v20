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
        </div>

        <!-- 12个门店设施分类 -->
        <div v-for="(category, idx) in facilityCategories" :key="category.key" class="option-category">
          <div class="category-header">
            <span class="category-title">{{ category.title }}</span>
            <a-button type="primary" size="small" @click="handleAdd(category.key)">
              <a-icon type="plus" />添加选项
            </a-button>
          </div>
          <draggable v-model="category.options" handle=".drag-handle" @end="handleSortChange(category.key)" class="options-grid">
            <div v-for="(item, index) in category.options" :key="item.id" class="option-tag">
              <a-icon type="menu" class="drag-handle" />
              <span class="tag-text" @dblclick="handleEdit(item, category.key)">{{ item.label }}</span>
              <a-icon type="close" class="close-icon" @click="handleDelete(item, index, category.key)" />
            </div>
          </draggable>
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
import {
  TRANSPORTATION_FACILITIES,
  CLEANING_FACILITIES,
  SECURITY_FACILITIES,
  PUBLIC_AREA_FACILITIES,
  FRONT_DESK_FACILITIES,
  ENTERTAINMENT_FACILITIES,
  CATERING_FACILITIES,
  BUSINESS_FACILITIES,
  CHILDREN_FACILITIES,
  SPORTS_FACILITIES,
  WELLNESS_FACILITIES,
  ACCESSIBILITY_FACILITIES
} from '@/types/storeDeployment'

export default defineComponent({
  name: 'OptionsConfigPage',
  components: { Sidebar, draggable },
  setup(props, { root }) {
    const architectureOptions = ref([...mockHighlightsArchitecture])
    const servicesOptions = ref([...mockHighlightsServices])

    // 12个门店设施分类
    const facilityCategories = ref([
      { key: 'transportation', title: '交通服务', options: TRANSPORTATION_FACILITIES.map((v, i) => ({ id: `t${i}`, label: v, sort: i+1 })) },
      { key: 'cleaning', title: '清洁服务', options: CLEANING_FACILITIES.map((v, i) => ({ id: `c${i}`, label: v, sort: i+1 })) },
      { key: 'security', title: '安全安保', options: SECURITY_FACILITIES.map((v, i) => ({ id: `s${i}`, label: v, sort: i+1 })) },
      { key: 'publicArea', title: '公共区域', options: PUBLIC_AREA_FACILITIES.map((v, i) => ({ id: `p${i}`, label: v, sort: i+1 })) },
      { key: 'frontDesk', title: '前台服务', options: FRONT_DESK_FACILITIES.map((v, i) => ({ id: `f${i}`, label: v, sort: i+1 })) },
      { key: 'entertainment', title: '娱乐设施', options: ENTERTAINMENT_FACILITIES.map((v, i) => ({ id: `e${i}`, label: v, sort: i+1 })) },
      { key: 'catering', title: '餐饮服务', options: CATERING_FACILITIES.map((v, i) => ({ id: `ca${i}`, label: v, sort: i+1 })) },
      { key: 'business', title: '商务设施', options: BUSINESS_FACILITIES.map((v, i) => ({ id: `b${i}`, label: v, sort: i+1 })) },
      { key: 'children', title: '儿童设施', options: CHILDREN_FACILITIES.map((v, i) => ({ id: `ch${i}`, label: v, sort: i+1 })) },
      { key: 'sports', title: '运动设施', options: SPORTS_FACILITIES.map((v, i) => ({ id: `sp${i}`, label: v, sort: i+1 })) },
      { key: 'wellness', title: '康养设施', options: WELLNESS_FACILITIES.map((v, i) => ({ id: `w${i}`, label: v, sort: i+1 })) },
      { key: 'accessibility', title: '无障碍设施', options: ACCESSIBILITY_FACILITIES.map((v, i) => ({ id: `a${i}`, label: v, sort: i+1 })) }
    ])

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
      facilityCategories,
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

.options-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px 16px;
}

.option-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: @bg-secondary;
  border: 1px solid @border-primary;
  border-radius: @border-radius-base;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: @brand-primary;
    background: rgba(59, 130, 246, 0.05);
  }
}

.drag-handle {
  font-size: 14px;
  color: @text-secondary;
  cursor: move;
  flex-shrink: 0;

  &:hover {
    color: @brand-primary;
  }
}

.tag-text {
  flex: 1;
  font-size: @font-size-sm;
  color: @text-primary;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.close-icon {
  font-size: 12px;
  color: @text-secondary;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    color: @error-color;
  }
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
