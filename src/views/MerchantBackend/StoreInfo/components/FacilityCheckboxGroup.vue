<template>
  <div v-if="isEditing" :class="`grid ${gridCols} gap-4`">
    <div
      v-for="facility in options"
      :key="facility"
      class="flex items-center space-x-2"
    >
      <a-checkbox
        :checked="selected.includes(facility)"
        @change="() => $emit('toggle', facility)"
      >
        <span class="checkbox-text">{{ facility }}</span>
      </a-checkbox>
    </div>
  </div>
  <div v-else class="flex flex-wrap gap-2">
    <template v-if="selected.length > 0">
      <a-tag
        v-for="facility in selected"
        :key="facility"
        class="facility-tag"
      >
        {{ facility }}
      </a-tag>
    </template>
    <span v-else class="empty-text">—</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isEditing: boolean
  selected: string[]
  options: string[]
  gridCols?: string
}

withDefaults(defineProps<Props>(), {
  gridCols: 'grid-cols-3',
})

defineEmits<{
  toggle: [value: string]
}>()
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.grid {
  display: grid;
}

.grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.gap-2 {
  gap: @spacing-sm;
}

.gap-4 {
  gap: @spacing-md;
}

.flex {
  display: flex;
}

.flex-wrap {
  flex-wrap: wrap;
}

.items-center {
  align-items: center;
}

.space-x-2 > * + * {
  margin-left: @spacing-sm;
}

.checkbox-text {
  font-size: @font-size-sm;
  color: @text-primary;
}

.facility-tag {
  border-color: @border-secondary;
  color: @text-primary;
  background: @bg-tertiary;
}

.empty-text {
  color: @text-tertiary;
}
</style>
