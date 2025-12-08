<template>
  <sidebar>
    <div class="page-container space-y-6">
      <EditableSection
        title="周边位置信息"
        :is-editing="isEditing"
        :is-saving="isSaving"
        @edit="handleEdit"
        @save="handleSave"
        @cancel="handleCancel"
      >
        <!-- 编辑状态 -->
        <div v-if="isEditing" class="space-y-8">
          <div
            v-for="category in LOCATION_CATEGORIES"
            :key="category.value"
            class="space-y-3"
          >
            <!-- 分类标题 -->
            <div class="category-header">
              <h4 class="category-title">{{ category.label }}</h4>
              <a-button
                size="small"
                class="add-button"
                @click="addLocation(category.value)"
              >
                <a-icon type="plus" />
                新增
              </a-button>
            </div>

            <!-- 位置列表 -->
            <div class="space-y-2">
              <template v-if="getCategoryLocations(category.value).length > 0">
                <div
                  v-for="location in getCategoryLocations(category.value)"
                  :key="location.id"
                  class="location-item"
                >
                  <div class="col-span-4">
                    <a-input
                      v-model="location.name"
                      placeholder="位置名称"
                      class="input-field"
                    />
                  </div>
                  <div class="col-span-2">
                    <a-input-number
                      v-model="location.distance"
                      :min="0"
                      placeholder="距离(米)"
                      class="w-full input-field"
                    />
                  </div>
                  <div class="col-span-3">
                    <a-select
                      v-model="location.distanceType"
                      class="w-full select-field"
                    >
                      <a-select-option value="straight">直线距离</a-select-option>
                      <a-select-option value="driving">驾车距离</a-select-option>
                    </a-select>
                  </div>
                  <div class="col-span-3 flex items-center gap-1">
                    <a-button
                      size="small"
                      :disabled="getGlobalIndex(location.id) === 0"
                      @click="moveLocation(location.id, 'up')"
                    >
                      <a-icon type="up" />
                    </a-button>
                    <a-button
                      size="small"
                      :disabled="getGlobalIndex(location.id) === formData.locations.length - 1"
                      @click="moveLocation(location.id, 'down')"
                    >
                      <a-icon type="down" />
                    </a-button>
                    <a-button
                      size="small"
                      type="danger"
                      @click="removeLocation(location.id)"
                    >
                      <a-icon type="delete" />
                    </a-button>
                  </div>
                </div>
              </template>
              <div v-else class="empty-tip">
                暂无{{ category.label }}信息，点击上方"新增"按钮添加
              </div>
            </div>
          </div>
        </div>

        <!-- 查看状态 -->
        <div v-else class="space-y-6">
          <div
            v-for="category in LOCATION_CATEGORIES"
            :key="category.value"
          >
            <template v-if="getGroupedLocations(category.value).length > 0">
              <h4 class="view-category-title">{{ category.label }}</h4>
              <div class="space-y-2">
                <div
                  v-for="location in getGroupedLocations(category.value)"
                  :key="location.id"
                  class="location-view-item"
                >
                  <span class="location-name">{{ location.name }}</span>
                  <span class="location-distance">
                    {{ formatDistance(location.distance) }}
                    ({{ location.distanceType === 'straight' ? '直线' : '驾车' }})
                  </span>
                </div>
              </div>
            </template>
          </div>

          <div v-if="formData.locations.length === 0" class="empty-state">
            暂无周边信息
          </div>
        </div>
      </EditableSection>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import EditableSection from './components/EditableSection.vue'
import { LOCATION_CATEGORIES } from './types/storeInfo.types'
import storeInfoService from './services/storeInfo.service'

export default defineComponent({
  name: 'SurroundingPage',
  components: {
    Sidebar,
    EditableSection,
  },
  setup() {
    const isEditing = ref(false)
    const isSaving = ref(false)
    const originalData = ref(null)
    const formData = ref({ locations: [] })

    const loadData = async () => {
      const data = await storeInfoService.getSurroundingInfo()
      originalData.value = JSON.parse(JSON.stringify(data))
      formData.value = JSON.parse(JSON.stringify(data))
    }

    const handleEdit = () => {
      isEditing.value = true
    }

    const handleCancel = () => {
      if (JSON.stringify(formData.value) !== JSON.stringify(originalData.value)) {
        if (!confirm('您有未保存的修改，确定要取消吗？')) {
          return
        }
      }
      formData.value = JSON.parse(JSON.stringify(originalData.value))
      isEditing.value = false
    }

    const handleSave = async () => {
      for (const location of formData.value.locations) {
        if (!location.name.trim()) {
          alert('请填写位置名称')
          return
        }
        if (!location.distance || location.distance < 0) {
          alert('请填写正确的距离')
          return
        }
      }

      isSaving.value = true
      try {
        await storeInfoService.updateSurroundingInfo(formData.value)
        originalData.value = JSON.parse(JSON.stringify(formData.value))
        isEditing.value = false
      } catch (error) {
        alert('保存失败，请重试')
      } finally {
        isSaving.value = false
      }
    }

    const addLocation = (category) => {
      const newLocation = {
        id: `temp-${Date.now()}`,
        category,
        name: '',
        distance: 0,
        distanceType: 'straight',
      }
      formData.value.locations.push(newLocation)
    }

    const removeLocation = (id) => {
      formData.value.locations = formData.value.locations.filter((loc) => loc.id !== id)
    }

    const moveLocation = (id, direction) => {
      const currentIndex = formData.value.locations.findIndex((loc) => loc.id === id)
      if (currentIndex === -1) return

      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
      if (targetIndex < 0 || targetIndex >= formData.value.locations.length) return

      const newLocations = [...formData.value.locations]
      ;[newLocations[currentIndex], newLocations[targetIndex]] = [
        newLocations[targetIndex],
        newLocations[currentIndex],
      ]
      formData.value.locations = newLocations
    }

    const getCategoryLocations = (category) => {
      return formData.value.locations.filter((loc) => loc.category === category)
    }

    const getGroupedLocations = (category) => {
      return formData.value.locations.filter((loc) => loc.category === category)
    }

    const getGlobalIndex = (id) => {
      return formData.value.locations.findIndex((loc) => loc.id === id)
    }

    const formatDistance = (distance) => {
      return distance >= 1000 ? `${(distance / 1000).toFixed(1)}km` : `${distance}m`
    }

    onMounted(() => {
      loadData()
    })

    return {
      isEditing,
      isSaving,
      formData,
      LOCATION_CATEGORIES,
      handleEdit,
      handleCancel,
      handleSave,
      addLocation,
      removeLocation,
      moveLocation,
      getCategoryLocations,
      getGroupedLocations,
      getGlobalIndex,
      formatDistance,
    }
  },
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.page-container {
  padding: @spacing-xl;
  background: @bg-secondary;
  min-height: calc(100vh - 0px);
}

.space-y-6 > * + * {
  margin-top: @spacing-xl;
}

.space-y-8 > * + * {
  margin-top: @spacing-2xl;
}

.space-y-3 > * + * {
  margin-top: @spacing-base;
}

.space-y-2 > * + * {
  margin-top: @spacing-sm;
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: @spacing-sm;
  border-bottom: 1px solid @border-primary;
}

.category-title {
  font-size: @font-size-sm;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

.add-button {
  border-color: @brand-primary;
  color: @brand-primary;

  &:hover {
    background: @brand-primary-light;
  }
}

.location-item {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: @spacing-base;
  align-items: center;
  padding: @spacing-base;
  background: @bg-tertiary;
  border-radius: @border-radius-base;
  border: 1px solid @border-primary;
}

.col-span-2 {
  grid-column: span 2 / span 2;
}

.col-span-3 {
  grid-column: span 3 / span 3;
}

.col-span-4 {
  grid-column: span 4 / span 4;
}

.w-full {
  width: 100%;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.gap-1 {
  gap: @spacing-xs;
}

.input-field {
  height: @input-height;
  border-radius: @border-radius-base;
}

.select-field {
  height: @input-height;
}

.empty-tip {
  text-align: center;
  color: @text-tertiary;
  padding: @spacing-md 0;
  font-size: @font-size-sm;
}

.view-category-title {
  font-size: @font-size-sm;
  font-weight: @font-weight-semibold;
  color: @text-primary;
  margin-bottom: @spacing-base;
}

.location-view-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: @spacing-sm @spacing-base;
  background: @bg-tertiary;
  border-radius: @border-radius-base;
}

.location-name {
  color: @text-primary;
}

.location-distance {
  font-size: @font-size-sm;
  color: @text-secondary;
}

.empty-state {
  text-align: center;
  color: @text-tertiary;
  padding: @spacing-2xl 0;
}
</style>
