<template>
  <div :class="`form-field ${className}`">
    <div class="field-label">
      <label class="label-text">
        <span v-if="required" class="required-mark">*</span>
        {{ label }}
      </label>
      <span v-if="locked" class="lock-info">
        <a-icon type="info-circle" class="info-icon" />
        {{ lockMessage }}
      </span>
      <span v-if="hint" class="hint-text">
        <a-icon type="info-circle" class="info-icon" />
        {{ hint }}
      </span>
    </div>
    <slot />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'FormField',
  props: {
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    locked: {
      type: Boolean,
      default: false
    },
    lockMessage: {
      type: String,
      default: '修改需联系平台'
    },
    hint: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.form-field {
  display: flex;
  flex-direction: column;
  gap: @spacing-sm;
}

.field-label {
  display: flex;
  align-items: center;
  gap: @spacing-sm;
}

.label-text {
  font-size: @font-size-sm;
  font-weight: @font-weight-medium;
  color: @text-primary;
}

.required-mark {
  color: @error-color;
  margin-right: @spacing-xs;
}

.lock-info {
  font-size: @font-size-xs;
  color: @text-tertiary;
  display: flex;
  align-items: center;
  gap: @spacing-xs;
}

.hint-text {
  font-size: @font-size-xs;
  color: @text-tertiary;
  display: flex;
  align-items: center;
  gap: @spacing-xs;
}

.info-icon {
  font-size: @font-size-xs;
}
</style>
