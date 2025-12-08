<template>
  <a-card
    :bordered="false"
    class="editable-card"
  >
    <template slot="title">
      <div class="card-header">
        <span class="card-title">{{ title }}</span>
        <div v-if="!hideActions" class="action-buttons">
          <a-button
            v-if="!isEditing"
            type="primary"
            class="edit-button"
            @click="$emit('edit')"
          >
            编辑
          </a-button>
          <template v-else>
            <a-button
              class="cancel-button"
              :disabled="isSaving"
              @click="$emit('cancel')"
            >
              取消
            </a-button>
            <a-button
              type="primary"
              class="save-button"
              :loading="isSaving"
              @click="$emit('save')"
            >
              {{ isSaving ? '保存中...' : '保存' }}
            </a-button>
          </template>
        </div>
      </div>
    </template>
    <slot />
  </a-card>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'EditableSection',
  props: {
    title: {
      type: String,
      required: true
    },
    isEditing: {
      type: Boolean,
      default: false
    },
    isSaving: {
      type: Boolean,
      default: false
    },
    hideActions: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.editable-card {
  border-radius: @border-radius-xl;
  border: 1px solid @border-primary;
  background: @bg-primary;
  box-shadow: @shadow-sm;
  transition: @transition-base;

  &:hover {
    box-shadow: @shadow-md;
  }
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-title {
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

.action-buttons {
  display: flex;
  gap: @spacing-sm;
}

.edit-button,
.save-button {
  height: @button-height;
  padding: 0 @spacing-md;
  background: @brand-primary;
  border-color: @brand-primary;
  border-radius: @border-radius-base;
  font-weight: @font-weight-medium;
  transition: @transition-base;

  &:hover {
    background: @brand-primary-hover;
    border-color: @brand-primary-hover;
  }
}

.cancel-button {
  height: @button-height;
  padding: 0 @spacing-md;
  border-radius: @border-radius-base;
  border-color: @border-secondary;
  color: @text-secondary;
  transition: @transition-base;

  &:hover {
    border-color: @border-focus;
    color: @brand-primary;
  }
}
</style>
