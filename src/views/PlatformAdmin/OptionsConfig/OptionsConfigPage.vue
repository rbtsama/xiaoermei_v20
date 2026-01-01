<template>
  <sidebar>
    <div class="page-container">
      <div class="page-layout">
        <!-- 左侧分类导航 -->
        <div class="category-nav">
          <div class="nav-section">
            <div class="nav-title">门店亮点</div>
            <div
              v-for="item in highlightCategories"
              :key="item.key"
              :class="['nav-item', { active: currentCategory === item.key }]"
              @click="currentCategory = item.key"
            >
              {{ item.title }}
              <span class="item-count">{{ item.options.length }}</span>
            </div>
          </div>

          <div class="nav-section">
            <div class="nav-title">门店设施</div>
            <div
              v-for="item in facilityCategories"
              :key="item.key"
              :class="['nav-item', { active: currentCategory === item.key }]"
              @click="currentCategory = item.key"
            >
              {{ item.title }}
              <span class="item-count">{{ item.options.length }}</span>
            </div>
          </div>
        </div>

        <!-- 右侧选项管理 -->
        <div class="content-area">
          <a-card :bordered="false" class="content-card">
            <div slot="title" class="content-header">
              <span class="content-title">{{ currentCategoryTitle }}</span>
              <a-button type="primary" @click="handleAdd">
                <a-icon type="plus" />添加选项
              </a-button>
            </div>

            <draggable v-model="currentOptions" handle=".drag-handle" @end="handleSortChange" class="options-grid">
              <div v-for="(item, index) in currentOptions" :key="item.id" class="option-tag">
                <a-icon type="menu" class="drag-handle" />
                <span class="tag-text" @dblclick="handleEdit(item)">{{ item.label }}</span>
                <a-icon type="close" class="close-icon" @click="handleDelete(item, index)" />
              </div>
            </draggable>

            <div v-if="currentOptions.length === 0" class="empty-state">
              <a-empty description="暂无选项">
                <a-button type="primary" @click="handleAdd">
                  <a-icon type="plus" />添加第一个选项
                </a-button>
              </a-empty>
            </div>
          </a-card>
        </div>
      </div>

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
            <div class="field-hint">最多20个字</div>
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, reactive, computed, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import draggable from 'vuedraggable'
import { saveCategoryOptions, initializeOptions } from '@/api/optionsConfig'
import {
  HIGHLIGHTS_ARCHITECTURE,
  HIGHLIGHTS_SERVICES,
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
  ACCESSIBILITY_FACILITIES,
  STORE_RECOMMENDATION_TAGS
} from '@/types/storeDeployment'

/**
 * 选项配置管理页面
 *
 * 设计：左右分栏布局
 * - 左侧：14个分类导航（门店亮点2个、门店设施12个）
 * - 右侧：当前分类的选项网格（4列）
 *
 * 功能：
 * - 拖拽排序（拖动☰图标）
 * - 双击编辑选项文本
 * - 点×删除选项
 * - 实时联动到商户端
 */
export default defineComponent({
  name: 'OptionsConfigPage',
  components: { Sidebar, draggable },
  setup(props, { root }) {
    // 当前选中的分类
    const currentCategory = ref('architecture')

    // 门店亮点分类
    const highlightCategories = ref([
      { key: 'architecture', title: '建筑与景观', options: HIGHLIGHTS_ARCHITECTURE.map((v, i) => ({ id: `arch_${i}`, label: v })) },
      { key: 'services', title: '服务与设施', options: HIGHLIGHTS_SERVICES.map((v, i) => ({ id: `serv_${i}`, label: v })) },
      { key: 'store_tags', title: '门店推荐标签', options: STORE_RECOMMENDATION_TAGS.map((v, i) => ({ id: `tag_${i}`, label: v })) }
    ])

    // 门店设施分类
    const facilityCategories = ref([
      { key: 'transportation', title: '交通服务', options: TRANSPORTATION_FACILITIES.map((v, i) => ({ id: `trans_${i}`, label: v })) },
      { key: 'cleaning', title: '清洁服务', options: CLEANING_FACILITIES.map((v, i) => ({ id: `clean_${i}`, label: v })) },
      { key: 'security', title: '安全安保', options: SECURITY_FACILITIES.map((v, i) => ({ id: `sec_${i}`, label: v })) },
      { key: 'publicArea', title: '公共区域', options: PUBLIC_AREA_FACILITIES.map((v, i) => ({ id: `pub_${i}`, label: v })) },
      { key: 'frontDesk', title: '前台服务', options: FRONT_DESK_FACILITIES.map((v, i) => ({ id: `front_${i}`, label: v })) },
      { key: 'entertainment', title: '娱乐设施', options: ENTERTAINMENT_FACILITIES.map((v, i) => ({ id: `ent_${i}`, label: v })) },
      { key: 'catering', title: '餐饮服务', options: CATERING_FACILITIES.map((v, i) => ({ id: `cat_${i}`, label: v })) },
      { key: 'business', title: '商务设施', options: BUSINESS_FACILITIES.map((v, i) => ({ id: `bus_${i}`, label: v })) },
      { key: 'children', title: '儿童设施', options: CHILDREN_FACILITIES.map((v, i) => ({ id: `child_${i}`, label: v })) },
      { key: 'sports', title: '运动设施', options: SPORTS_FACILITIES.map((v, i) => ({ id: `sport_${i}`, label: v })) },
      { key: 'wellness', title: '康养设施', options: WELLNESS_FACILITIES.map((v, i) => ({ id: `well_${i}`, label: v })) },
      { key: 'accessibility', title: '无障碍设施', options: ACCESSIBILITY_FACILITIES.map((v, i) => ({ id: `acc_${i}`, label: v })) }
    ])

    // 当前选中分类的标题
    const currentCategoryTitle = computed(() => {
      const all = [...highlightCategories.value, ...facilityCategories.value]
      const found = all.find(c => c.key === currentCategory.value)
      return found ? found.title : ''
    })

    // 当前选中分类的选项
    const currentOptions = computed({
      get: () => {
        const all = [...highlightCategories.value, ...facilityCategories.value]
        const found = all.find(c => c.key === currentCategory.value)
        return found ? found.options : []
      },
      set: (val) => {
        const all = [...highlightCategories.value, ...facilityCategories.value]
        const found = all.find(c => c.key === currentCategory.value)
        if (found) {
          found.options = val
        }
      }
    })

    const editVisible = ref(false)
    const editingItem = ref(null)
    const editForm = reactive({
      label: ''
    })

    const handleAdd = () => {
      editingItem.value = null
      editForm.label = ''
      editVisible.value = true
    }

    const handleEdit = (item) => {
      editingItem.value = item
      editForm.label = item.label
      editVisible.value = true
    }

    const handleSave = () => {
      if (!editForm.label.trim()) {
        root.$message.error('请输入选项文本')
        return
      }

      if (editingItem.value) {
        editingItem.value.label = editForm.label
        root.$message.success('编辑成功')
      } else {
        currentOptions.value.push({
          id: `new_${Date.now()}`,
          label: editForm.label
        })
        root.$message.success('添加成功')
      }
      editVisible.value = false
    }

    const handleDelete = (item, index) => {
      root.$confirm({
        title: '确认删除',
        content: `确定要删除选项"${item.label}"吗？`,
        onOk: () => {
          currentOptions.value.splice(index, 1)
          root.$message.success('删除成功')
        }
      })
    }

    const handleSortChange = async () => {
      // 保存到后端，触发联动
      await saveCategoryOptions(currentCategory.value, currentOptions.value)
      root.$message.success('排序已更新')
    }

    // 初始化选项配置
    onMounted(async () => {
      const initialData = {}
      highlightCategories.value.forEach(cat => {
        initialData[cat.key] = cat.options
      })
      facilityCategories.value.forEach(cat => {
        initialData[cat.key] = cat.options
      })
      await initializeOptions(initialData)

      // 确保新增的分类被初始化（如store_tags）
      const allOptions = await import('@/api/optionsConfig').then(m => m.getAllOptions())
      const currentData = await allOptions
      if (currentData && !currentData['store_tags']) {
        await saveCategoryOptions('store_tags', highlightCategories.value.find(c => c.key === 'store_tags')?.options || [])
      }
    })

    return {
      currentCategory,
      highlightCategories,
      facilityCategories,
      currentCategoryTitle,
      currentOptions,
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
@import '@/styles/common.less';

.page-container {
  padding: 24px;
  height: calc(100vh - 48px);
}

.page-layout {
  display: flex;
  gap: 24px;
  height: 100%;
}

.category-nav {
  width: 240px;
  background: @bg-primary;
  border: 1px solid @border-primary;
  border-radius: @border-radius-lg;
  padding: 16px;
  overflow-y: auto;
  flex-shrink: 0;
}

.nav-section {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
}

.nav-title {
  font-size: @font-size-base;
  font-weight: @font-weight-semibold;
  color: @text-primary;
  margin-bottom: 12px;
  padding: 0 12px;
}

.nav-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  margin-bottom: 4px;
  border-radius: @border-radius-base;
  font-size: @font-size-sm;
  color: @text-primary;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: @bg-hover;
  }

  &.active {
    background: rgba(59, 130, 246, 0.1);
    color: @brand-primary;
    font-weight: @font-weight-medium;
  }
}

.item-count {
  font-size: @font-size-xs;
  color: @text-secondary;
  padding: 2px 6px;
  background: @bg-secondary;
  border-radius: @border-radius-sm;
}

.content-area {
  flex: 1;
  overflow-y: auto;
}

.content-card {
  height: 100%;
  border: 1px solid @border-primary;
  border-radius: @border-radius-lg;
  box-shadow: @shadow-sm;

  :deep(.ant-card-head) {
    border-bottom: 1px solid @border-primary;
    padding: 16px 24px;
  }

  :deep(.ant-card-body) {
    padding: 24px;
    min-height: 400px;
  }
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.content-title {
  font-size: @font-size-lg;
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

  &:hover {
    border-color: @brand-primary;
    background: rgba(59, 130, 246, 0.05);

    .drag-handle,
    .close-icon {
      opacity: 1;
    }
  }
}

.drag-handle {
  font-size: @font-size-base;
  color: @text-secondary;
  cursor: move;
  flex-shrink: 0;
  opacity: 0.3;
  transition: opacity 0.2s;

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
  cursor: pointer;
}

.close-icon {
  font-size: @font-size-xs;
  color: @text-secondary;
  cursor: pointer;
  flex-shrink: 0;
  opacity: 0.3;
  transition: opacity 0.2s;

  &:hover {
    color: @error-color;
  }
}

.empty-state {
  padding: 60px 24px;
  text-align: center;
}

</style>
