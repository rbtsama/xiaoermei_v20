<template>
  <a-modal
    :visible="visible"
    :title="mode === 'create' ? '创建短信模板' : '编辑短信模板'"
    width="640px"
    :confirm-loading="loading"
    @ok="handleSubmit"
    @cancel="handleClose"
    ok-text="确认"
    cancel-text="取消"
  >
    <a-form-model
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <!-- 短信模板ID（仅编辑时显示，只读） -->
      <a-form-model-item v-if="mode === 'edit'" label="短信模板ID">
        <a-input
          v-model="form.templateId"
          disabled
        />
        <div class="field-hint">系统自动生成，不可修改</div>
      </a-form-model-item>

      <!-- 短信模板内容 -->
      <a-form-model-item label="短信模板内容" prop="content">
        <a-textarea
          v-model="form.content"
          placeholder="例如：【小而美民宿】验证码：${code}，您正在进行身份验证，5分钟内有效，请勿泄露。"
          :rows="4"
          :maxLength="500"
        />
        <div class="char-count">{{ (form.content || '').length }}/500</div>
        <div class="field-hint">支持变量：${变量名}，具体变量请参考短信平台文档</div>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from '@vue/composition-api'
import SmsService from '../services/sms.service'
import type { SmsTemplate } from '../types/sms.types'

export default defineComponent({
  name: 'SmsDialog',

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String as () => 'create' | 'edit',
      required: true
    },
    template: {
      type: Object as () => SmsTemplate | null,
      default: null
    }
  },

  setup(props, { emit }) {
    const loading = ref(false)
    const formRef = ref<any>(null)

    const form = reactive({
      templateId: '',
      content: ''
    })

    const rules = {
      content: [
        { required: true, message: '请输入短信模板内容', trigger: 'blur' },
        { max: 500, message: '内容不能超过500字符', trigger: 'blur' }
      ]
    }

    // 监听template变化，更新表单
    watch(() => props.template, (newTemplate) => {
      if (newTemplate && props.mode === 'edit') {
        form.templateId = newTemplate.templateId
        form.content = newTemplate.content
      }
    }, { immediate: true })

    // 监听visible变化，重置表单
    watch(() => props.visible, (visible) => {
      if (!visible) {
        form.templateId = ''
        form.content = ''
        formRef.value?.resetFields()
      } else if (visible && props.mode === 'create') {
        form.templateId = ''
        form.content = ''
      }
    })

    const handleSubmit = async () => {
      try {
        await formRef.value?.validate()

        loading.value = true

        const templateData = {
          content: form.content
        }

        if (props.mode === 'create') {
          await SmsService.createSmsTemplate(templateData)
        } else {
          if (!props.template) return
          await SmsService.updateSmsTemplate(props.template.templateId, templateData)
        }

        emit('close')
        emit('success')
      } catch (error) {
        console.error('提交失败:', error)
      } finally {
        loading.value = false
      }
    }

    const handleClose = () => {
      emit('close')
    }

    return {
      loading,
      formRef,
      form,
      rules,
      handleSubmit,
      handleClose
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';
@import '@/styles/common.less';

// 字符计数（覆盖common.less的默认左对齐）
.char-count {
  margin-top: 4px;
}

// 优化输入框样式
:deep(.ant-input),
:deep(.ant-textarea) {
  border-radius: @border-radius-base;
  border-color: @border-secondary;
  font-size: @font-size-base;

  &:hover {
    border-color: @border-primary;
  }

  &:focus {
    border-color: @brand-primary;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: @text-tertiary;
  }
}

// 优化表单项间距
:deep(.ant-form-item) {
  margin-bottom: 20px;
}

// 优化弹窗样式
:deep(.ant-modal-header) {
  border-bottom: 1px solid @border-primary;
  padding: 16px 24px;
}

:deep(.ant-modal-title) {
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

:deep(.ant-modal-body) {
  padding: 24px;
}

:deep(.ant-modal-footer) {
  border-top: 1px solid @border-primary;
  padding: 12px 16px;
}

// 优化按钮样式
:deep(.ant-btn) {
  height: 32px;
  padding: 0 16px;
  font-size: @font-size-base;
  border-radius: @border-radius-base;

  &.ant-btn-primary {
    background: @brand-primary;
    border-color: @brand-primary;

    &:hover {
      background: @brand-primary-hover;
      border-color: @brand-primary-hover;
    }
  }
}
</style>
