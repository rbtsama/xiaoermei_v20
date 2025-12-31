<template>
  <a-modal
    :visible="visible"
    title="商家备注"
    width="600px"
    @cancel="handleCancel"
    @ok="handleSave"
  >
    <div class="note-dialog-content">
      <!-- 当前备注展示 -->
      <div class="current-note-section">
        <div class="field-label">当前备注</div>
        <div class="current-note-display">
          {{ currentNote || '暂无备注' }}
        </div>
      </div>

      <!-- 修改备注输入 -->
      <div class="edit-note-section">
        <div class="field-label">修改备注</div>
        <a-textarea
          v-model="editedNote"
          :rows="6"
          :maxLength="500"
          placeholder="请输入商家备注（最多500字）"
          class="note-textarea"
        />
        <div class="char-count">{{ editedNote.length }}/500</div>
      </div>
    </div>

    <template slot="footer">
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" @click="handleSave">保存</a-button>
    </template>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'

export default defineComponent({
  name: 'MerchantNoteDialog',

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    orderId: {
      type: String,
      default: ''
    },
    currentNote: {
      type: String,
      default: ''
    }
  },

  setup(props, { emit }) {
    const editedNote = ref('')

    // 监听弹窗打开，初始化编辑内容为当前备注
    watch(() => props.visible, (newVal) => {
      if (newVal) {
        editedNote.value = props.currentNote || ''
      }
    })

    const handleCancel = () => {
      emit('close')
    }

    const handleSave = () => {
      emit('save', {
        orderId: props.orderId,
        note: editedNote.value
      })
    }

    return {
      editedNote,
      handleCancel,
      handleSave
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.note-dialog-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

// 当前备注展示区域
.current-note-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-size: 14px;
  font-weight: 500;
  color: @text-primary;
}

.current-note-display {
  padding: 12px 16px;
  background: @bg-secondary;
  border-radius: @border-radius-base;
  color: @text-primary;
  font-size: 14px;
  line-height: 1.6;
  min-height: 60px;
  white-space: pre-wrap;
  word-break: break-all;
}

// 编辑备注区域
.edit-note-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.note-textarea {
  border-radius: @border-radius-base;
  border: 1px solid @border-primary;
  font-size: 14px;
  color: @text-primary;
  resize: none;

  &:focus {
    border-color: @brand-primary;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: @text-tertiary;
  }
}

// 字数统计
.char-count {
  text-align: right;
  font-size: 12px;
  color: @text-secondary;
  margin-top: 4px;
}
</style>
