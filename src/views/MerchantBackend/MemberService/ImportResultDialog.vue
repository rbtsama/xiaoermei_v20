<template>
  <a-modal
    :visible="visible"
    title="导入结果"
    :width="400"
    :footer="null"
    @cancel="handleClose"
    class="import-result-dialog"
  >
    <div class="result-text">
      已成功导入会员{{ successCount }}人，失败{{ failedCount }}人。
    </div>

    <div class="dialog-footer">
      <a-button type="primary" @click="handleClose">
        确定
      </a-button>
    </div>
  </a-modal>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'ImportResultDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    successCount: {
      type: Number,
      default: 0
    },
    failedCount: {
      type: Number,
      default: 0
    }
  },
  setup(props, { emit }) {
    const handleClose = () => {
      emit('update:visible', false)
      emit('close')
    }

    return {
      handleClose
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.import-result-dialog {
  :deep(.ant-modal-body) {
    padding: 32px 24px;
  }
}

.result-text {
  font-size: @font-size-base;
  color: @text-primary;
  line-height: 1.8;
  text-align: center;
  margin-bottom: 24px;
}

.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
