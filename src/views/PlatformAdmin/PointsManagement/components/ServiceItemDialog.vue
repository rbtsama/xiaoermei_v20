<template>
  <a-modal
    :visible="value"
    :title="title"
    width="500px"
    :confirm-loading="loading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-form-model ref="formRef" :model="form" :rules="rules">
      <!-- 服务内容 -->
      <a-form-model-item label="服务内容" prop="serviceName">
        <a-input
          v-model="form.serviceName"
          placeholder="请输入服务内容（最多50字符）"
          :maxLength="50"
        />
      </a-form-model-item>

      <!-- 积分数量 -->
      <a-form-model-item :label="pointsLabel" prop="pointsAmount">
        <a-input-number
          v-model="form.pointsAmount"
          :min="1"
          :precision="0"
          placeholder="请输入积分数量（正整数）"
          style="width: 100%"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, watch } from '@vue/composition-api'
import ValueAddedServiceService from '../services/valueAddedService.service'
import type { PointsRewardItem, PointsExchangeItem } from '../types/valueAddedService.types'

export default defineComponent({
  name: 'ServiceItemDialog',

  props: {
    value: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String as () => 'create' | 'edit',
      required: true
    },
    type: {
      type: String as () => 'reward' | 'exchange',
      required: true
    },
    item: {
      type: Object as () => PointsRewardItem | PointsExchangeItem | null,
      default: null
    }
  },

  setup(props, { emit }) {
    const loading = ref(false)
    const formRef = ref<any>(null)

    const form = reactive({
      serviceName: '',
      pointsAmount: undefined as number | undefined
    })

    const rules = {
      serviceName: [
        { required: true, message: '请输入服务内容', trigger: 'blur' },
        { max: 50, message: '服务内容不能超过50字符', trigger: 'blur' }
      ],
      pointsAmount: [
        { required: true, message: '请输入积分数量', trigger: 'blur' },
        { type: 'number', min: 1, message: '积分数量必须大于0', trigger: 'blur' }
      ]
    }

    const isReward = computed(() => props.type === 'reward')
    const title = computed(() => {
      const typeText = isReward.value ? '积分奖励' : '积分换购'
      return props.mode === 'create' ? `新增${typeText}服务` : `编辑${typeText}服务`
    })
    const pointsLabel = computed(() => isReward.value ? '奖励积分' : '消耗积分')

    // 监听item变化，更新表单
    watch(() => props.item, (newItem) => {
      if (newItem && props.mode === 'edit') {
        form.serviceName = newItem.serviceName
        if (isReward.value) {
          form.pointsAmount = (newItem as PointsRewardItem).pointsReward
        } else {
          form.pointsAmount = (newItem as PointsExchangeItem).pointsCost
        }
      }
    }, { immediate: true })

    // 监听visible变化，重置表单
    watch(() => props.value, (visible) => {
      if (!visible) {
        form.serviceName = ''
        form.pointsAmount = undefined
        formRef.value?.resetFields()
      } else if (visible && props.mode === 'create') {
        form.serviceName = ''
        form.pointsAmount = undefined
      }
    })

    const handleSubmit = async () => {
      try {
        await formRef.value?.validate()

        loading.value = true

        if (props.mode === 'create') {
          // 创建
          if (isReward.value) {
            await ValueAddedServiceService.createRewardService({
              serviceName: form.serviceName,
              pointsReward: form.pointsAmount!,
              status: 'active'
            })
          } else {
            await ValueAddedServiceService.createExchangeService({
              serviceName: form.serviceName,
              pointsCost: form.pointsAmount!,
              status: 'active'
            })
          }
        } else {
          // 编辑
          if (!props.item) return

          if (isReward.value) {
            await ValueAddedServiceService.updateRewardService(props.item.id, {
              serviceName: form.serviceName,
              pointsReward: form.pointsAmount!
            })
          } else {
            await ValueAddedServiceService.updateExchangeService(props.item.id, {
              serviceName: form.serviceName,
              pointsCost: form.pointsAmount!
            })
          }
        }

        emit('input', false)
        emit('success')
      } catch (error) {
        console.error('提交失败:', error)
      } finally {
        loading.value = false
      }
    }

    const handleCancel = () => {
      emit('input', false)
    }

    return {
      loading,
      formRef,
      form,
      rules,
      title,
      pointsLabel,
      handleSubmit,
      handleCancel
    }
  }
})
</script>

<style scoped lang="less">
// 自定义样式
</style>
