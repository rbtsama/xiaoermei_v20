<template>
  <sidebar>
    <div class="page-container">
      <!-- ServiceItem Dialogs -->
      <service-item-dialog
        v-model="isRewardCreateDialogOpen"
        mode="create"
        type="reward"
        @success="handleDialogSuccess"
      />
      <service-item-dialog
        v-model="isRewardEditDialogOpen"
        mode="edit"
        type="reward"
        :item="editingRewardItem"
        @success="handleDialogSuccess"
      />
      <service-item-dialog
        v-model="isExchangeCreateDialogOpen"
        mode="create"
        type="exchange"
        @success="handleDialogSuccess"
      />
      <service-item-dialog
        v-model="isExchangeEditDialogOpen"
        mode="edit"
        type="exchange"
        :item="editingExchangeItem"
        @success="handleDialogSuccess"
      />

      <!-- Card 1: 基础规则配置 -->
      <a-card class="card-style" :bordered="false">
        <div slot="title" class="flex items-center justify-between">
          <span class="card-title">积分基础规则</span>
          <div v-if="!isEditingBaseRule">
            <a-button type="primary" class="btn-style" @click="isEditingBaseRule = true">
              编辑
            </a-button>
          </div>
          <div v-else class="flex gap-2">
            <a-button type="primary" class="btn-style" @click="handleSaveBaseRule">
              保存
            </a-button>
            <a-button class="btn-style-outline" @click="handleCancelEditBaseRule">
              取消
            </a-button>
          </div>
        </div>

        <!-- 第一行：5个基础配置 -->
        <div v-if="baseRule" class="grid-5 mb-6">
          <div class="field-item">
            <label>注册奖励</label>
            <div v-if="isEditingBaseRule" class="input-with-unit">
              <a-input-number
                v-model="baseRuleForm.registerReward"
                :min="0"
                class="input-style"
              />
              <span class="unit-text">积分</span>
            </div>
            <div v-else class="value-display">
              <span>{{ baseRule.registerReward }}积分</span>
            </div>
          </div>

          <div class="field-item">
            <label>邀请人奖励</label>
            <div v-if="isEditingBaseRule" class="input-with-unit">
              <a-input-number
                v-model="baseRuleForm.inviterReward"
                :min="0"
                class="input-style"
              />
              <span class="unit-text">积分</span>
            </div>
            <div v-else class="value-display">
              <span>{{ baseRule.inviterReward }}积分</span>
            </div>
          </div>

          <div class="field-item">
            <label>积分兑换汇率</label>
            <div v-if="isEditingBaseRule" class="input-with-unit">
              <a-input-number
                v-model="baseRuleForm.exchangeRate"
                :min="1"
                class="input-style"
              />
              <span class="unit-text">积分=1元</span>
            </div>
            <div v-else class="value-display">
              <span>{{ baseRule.exchangeRate }}积分=1元</span>
            </div>
          </div>

          <div class="field-item">
            <label>最大抵扣比例</label>
            <div v-if="isEditingBaseRule" class="input-with-unit">
              <a-input-number
                v-model="baseRuleForm.maxDeductionRatio"
                :min="0"
                :max="100"
                class="input-style"
              />
              <span class="unit-text">%</span>
            </div>
            <div v-else class="value-display">
              <span>{{ baseRule.maxDeductionRatio }}%</span>
            </div>
          </div>

          <div class="field-item">
            <label>积分有效期</label>
            <div v-if="isEditingBaseRule" class="input-with-unit">
              <a-input-number
                v-model="baseRuleForm.validityMonths"
                :min="1"
                class="input-style"
              />
              <span class="unit-text">月</span>
            </div>
            <div v-else class="value-display">
              <span>{{ baseRule.validityMonths }}个月</span>
            </div>
          </div>
        </div>

        <!-- 第二行：入住返还倍数 -->
        <div v-if="baseRule" class="vip-multipliers">
          <label class="mb-3 block">入住返还倍数</label>
          <div class="grid-10">
            <div v-for="idx in 10" :key="idx" class="vip-item">
              <div class="vip-label">VIP{{ idx - 1 }}</div>
              <div v-if="isEditingBaseRule">
                <a-input-number
                  v-model="baseRuleForm[`vip${idx - 1}`]"
                  :min="1"
                  :step="0.1"
                  class="vip-input"
                />
              </div>
              <div v-else class="vip-value">
                <span>{{ baseRule.vipMultipliers[`VIP${idx - 1}`]?.toFixed(1) }}</span>
              </div>
            </div>
          </div>
        </div>
      </a-card>

      <!-- Card 2: 积分奖励服务 -->
      <a-card class="card-style" :bordered="false">
        <div slot="title" class="flex items-center justify-between">
          <span class="card-title">积分奖励服务</span>
          <a-button type="primary" class="btn-style" @click="isRewardCreateDialogOpen = true">
            <a-icon type="plus" />
            新增
          </a-button>
        </div>

        <div class="table-wrapper">
          <a-table
            :columns="rewardColumns"
            :data-source="rewardServices"
            :pagination="false"
            row-key="id"
          >
            <template slot="order" slot-scope="text, record, index">
              <span>{{ index + 1 }}</span>
            </template>

            <template slot="serviceName" slot-scope="serviceName">
              <span class="font-medium">{{ serviceName }}</span>
            </template>

            <template slot="pointsReward" slot-scope="pointsReward">
              <span class="text-green-600 font-semibold">+{{ pointsReward }}</span>
            </template>

            <template slot="action" slot-scope="text, record, index">
              <div class="action-buttons">
                <a-button
                  size="small"
                  :disabled="index === 0"
                  @click="handleMoveReward(index, 'up')"
                >
                  <a-icon type="up" />
                </a-button>

                <a-button
                  size="small"
                  :disabled="index === rewardServices.length - 1"
                  @click="handleMoveReward(index, 'down')"
                >
                  <a-icon type="down" />
                </a-button>

                <a-button size="small" @click="handleEditReward(record)">
                  <a-icon type="edit" />编辑
                </a-button>

                <a-button size="small" class="btn-delete" @click="handleDeleteReward(record.id)">
                  <a-icon type="delete" />删除
                </a-button>
              </div>
            </template>
          </a-table>
        </div>
      </a-card>

      <!-- Card 3: 积分换购服务 -->
      <a-card class="card-style" :bordered="false">
        <div slot="title" class="flex items-center justify-between">
          <span class="card-title">积分换购服务</span>
          <a-button type="primary" class="btn-style" @click="isExchangeCreateDialogOpen = true">
            <a-icon type="plus" />
            新增
          </a-button>
        </div>

        <div class="table-wrapper">
          <a-table
            :columns="exchangeColumns"
            :data-source="exchangeServices"
            :pagination="false"
            row-key="id"
          >
            <template slot="order" slot-scope="text, record">
              <span>{{ record.序号 }}</span>
            </template>

            <template slot="serviceName" slot-scope="serviceName">
              <span class="font-medium">{{ serviceName }}</span>
            </template>

            <template slot="pointsCost" slot-scope="pointsCost">
              <span class="text-red-600 font-semibold">-{{ Math.abs(pointsCost) }}</span>
            </template>

            <template slot="action" slot-scope="text, record, index">
              <div class="action-buttons">
                <a-button
                  size="small"
                  :disabled="index === 0"
                  @click="handleMoveExchange(index, 'up')"
                >
                  <a-icon type="up" />
                </a-button>

                <a-button
                  size="small"
                  :disabled="index === exchangeServices.length - 1"
                  @click="handleMoveExchange(index, 'down')"
                >
                  <a-icon type="down" />
                </a-button>

                <a-button size="small" @click="handleEditExchange(record)">
                  <a-icon type="edit" />
                  编辑
                </a-button>

                <a-button size="small" class="btn-delete" @click="handleDeleteExchange(record.id)">
                  <a-icon type="delete" />
                  删除
                </a-button>
              </div>
            </template>
          </a-table>
        </div>
      </a-card>
    </div>
  </sidebar>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from '@vue/composition-api'
import { Modal } from 'ant-design-vue'
import Sidebar from '@/components/Layout/Sidebar.vue'
import ServiceItemDialog from './components/ServiceItemDialog.vue'
import ValueAddedServiceService from './services/valueAddedService.service'
import type { PointsBaseRule, PointsRewardItem, PointsExchangeItem } from './types/valueAddedService.types'

export default defineComponent({
  name: 'PointsConfigPage',
  components: {
    Sidebar,
    ServiceItemDialog
  },

  setup() {
    // ========== 数据状态 ==========
    const baseRule = ref<PointsBaseRule | null>(null)
    const rewardServices = ref<PointsRewardItem[]>([])
    const exchangeServices = ref<PointsExchangeItem[]>([])

    // ========== 基础规则编辑 ==========
    const isEditingBaseRule = ref(false)
    const baseRuleForm = reactive({
      registerReward: 0,
      inviterReward: 0,
      exchangeRate: 0,
      maxDeductionRatio: 0,
      validityMonths: 0,
      vip0: 1.0,
      vip1: 1.2,
      vip2: 1.4,
      vip3: 1.6,
      vip4: 1.8,
      vip5: 2.0,
      vip6: 2.3,
      vip7: 2.6,
      vip8: 2.9,
      vip9: 3.2
    })

    // ========== Dialog状态 ==========
    const isRewardCreateDialogOpen = ref(false)
    const isRewardEditDialogOpen = ref(false)
    const editingRewardItem = ref<PointsRewardItem | null>(null)

    const isExchangeCreateDialogOpen = ref(false)
    const isExchangeEditDialogOpen = ref(false)
    const editingExchangeItem = ref<PointsExchangeItem | null>(null)

    // ========== 表格配置 ==========
    const rewardColumns = [
      { title: '序号', width: 80, scopedSlots: { customRender: 'order' } },
      { title: '服务内容', dataIndex: 'serviceName', scopedSlots: { customRender: 'serviceName' } },
      { title: '奖励积分', dataIndex: 'pointsReward', width: 120, scopedSlots: { customRender: 'pointsReward' } },
      { title: '操作', width: 280, align: 'center', scopedSlots: { customRender: 'action' } }
    ]

    const exchangeColumns = [
      { title: '序号', width: 80, scopedSlots: { customRender: 'order' } },
      { title: '服务内容', dataIndex: 'serviceName', scopedSlots: { customRender: 'serviceName' } },
      { title: '消耗积分', dataIndex: 'pointsCost', width: 120, scopedSlots: { customRender: 'pointsCost' } },
      { title: '操作', width: 340, align: 'center', scopedSlots: { customRender: 'action' } }
    ]

    // ========== 数据加载 ==========
    const loadData = async () => {
      try {
        const [rule, rewards, exchanges] = await Promise.all([
          ValueAddedServiceService.getBaseRule(),
          ValueAddedServiceService.getRewardServices(),
          ValueAddedServiceService.getExchangeServices()
        ])

        baseRule.value = rule
        rewardServices.value = rewards
        exchangeServices.value = exchanges

        // 初始化表单
        if (rule) {
          baseRuleForm.registerReward = rule.registerReward
          baseRuleForm.inviterReward = rule.inviterReward
          baseRuleForm.exchangeRate = rule.exchangeRate
          baseRuleForm.maxDeductionRatio = rule.maxDeductionRatio
          baseRuleForm.validityMonths = rule.validityMonths
          baseRuleForm.vip0 = rule.vipMultipliers['VIP0'] || 1.0
          baseRuleForm.vip1 = rule.vipMultipliers['VIP1'] || 1.2
          baseRuleForm.vip2 = rule.vipMultipliers['VIP2'] || 1.4
          baseRuleForm.vip3 = rule.vipMultipliers['VIP3'] || 1.6
          baseRuleForm.vip4 = rule.vipMultipliers['VIP4'] || 1.8
          baseRuleForm.vip5 = rule.vipMultipliers['VIP5'] || 2.0
          baseRuleForm.vip6 = rule.vipMultipliers['VIP6'] || 2.3
          baseRuleForm.vip7 = rule.vipMultipliers['VIP7'] || 2.6
          baseRuleForm.vip8 = rule.vipMultipliers['VIP8'] || 2.9
          baseRuleForm.vip9 = rule.vipMultipliers['VIP9'] || 3.2
        }
      } catch (error) {
        console.error('加载数据失败:', error)
      }
    }

    // ========== 基础规则操作 ==========
    const handleSaveBaseRule = async () => {
      if (!baseRule.value) return

      try {
        const vipMultipliers: Record<string, number> = {}
        for (let i = 0; i <= 9; i++) {
          vipMultipliers[`VIP${i}`] = baseRuleForm[`vip${i}` as keyof typeof baseRuleForm] as number
        }

        await ValueAddedServiceService.updateBaseRule(
          {
            registerReward: baseRuleForm.registerReward,
            inviterReward: baseRuleForm.inviterReward,
            exchangeRate: baseRuleForm.exchangeRate,
            maxDeductionRatio: baseRuleForm.maxDeductionRatio,
            validityMonths: baseRuleForm.validityMonths,
            vipMultipliers
          },
          '兔子'
        )

        isEditingBaseRule.value = false
        await loadData()
      } catch (error) {
        console.error('保存失败:', error)
      }
    }

    const handleCancelEditBaseRule = () => {
      if (!baseRule.value) return

      isEditingBaseRule.value = false
      baseRuleForm.registerReward = baseRule.value.registerReward
      baseRuleForm.inviterReward = baseRule.value.inviterReward
      baseRuleForm.exchangeRate = baseRule.value.exchangeRate
      baseRuleForm.maxDeductionRatio = baseRule.value.maxDeductionRatio
      baseRuleForm.validityMonths = baseRule.value.validityMonths
      baseRuleForm.vip0 = baseRule.value.vipMultipliers['VIP0'] || 1.0
      baseRuleForm.vip1 = baseRule.value.vipMultipliers['VIP1'] || 1.2
      baseRuleForm.vip2 = baseRule.value.vipMultipliers['VIP2'] || 1.4
      baseRuleForm.vip3 = baseRule.value.vipMultipliers['VIP3'] || 1.6
      baseRuleForm.vip4 = baseRule.value.vipMultipliers['VIP4'] || 1.8
      baseRuleForm.vip5 = baseRule.value.vipMultipliers['VIP5'] || 2.0
      baseRuleForm.vip6 = baseRule.value.vipMultipliers['VIP6'] || 2.3
      baseRuleForm.vip7 = baseRule.value.vipMultipliers['VIP7'] || 2.6
      baseRuleForm.vip8 = baseRule.value.vipMultipliers['VIP8'] || 2.9
      baseRuleForm.vip9 = baseRule.value.vipMultipliers['VIP9'] || 3.2
    }

    // ========== 奖励服务操作 ==========
    const handleEditReward = (item: PointsRewardItem) => {
      editingRewardItem.value = item
      isRewardEditDialogOpen.value = true
    }

    const handleDeleteReward = (id: string) => {
      Modal.confirm({
        title: '确认删除',
        content: '确定要删除该积分奖励服务吗？删除后无法恢复。',
        okText: '确认删除',
        okType: 'danger',
        cancelText: '取消',
        onOk: async () => {
          try {
            await ValueAddedServiceService.deleteRewardService(id)
            root.$message.success('删除成功')
            await loadData()
          } catch (error) {
            root.$message.error('删除失败')
            console.error('删除失败:', error)
          }
        }
      })
    }

    const handleMoveReward = async (index: number, direction: 'up' | 'down') => {
      if (direction === 'up' && index === 0) return
      if (direction === 'down' && index === rewardServices.value.length - 1) return

      const newList = [...rewardServices.value]
      const targetIndex = direction === 'up' ? index - 1 : index + 1
      ;[newList[index], newList[targetIndex]] = [newList[targetIndex], newList[index]]

      const ids = newList.map(item => item.id)

      try {
        await ValueAddedServiceService.reorderRewardServices(ids)
        await loadData()
      } catch (error) {
        console.error('排序失败:', error)
      }
    }

    // ========== 换购服务操作 ==========
    const handleEditExchange = (item: PointsExchangeItem) => {
      editingExchangeItem.value = item
      isExchangeEditDialogOpen.value = true
    }

    const handleDeleteExchange = (id: string) => {
      Modal.confirm({
        title: '确认删除',
        content: '确定要删除该积分换购服务吗？删除后无法恢复。',
        okText: '确认删除',
        okType: 'danger',
        cancelText: '取消',
        onOk: async () => {
          try {
            await ValueAddedServiceService.deleteExchangeService(id)
            root.$message.success('删除成功')
            await loadData()
          } catch (error) {
            root.$message.error('删除失败')
            console.error('删除失败:', error)
          }
        }
      })
    }

    const handleMoveExchange = async (index: number, direction: 'up' | 'down') => {
      if (direction === 'up' && index === 0) return
      if (direction === 'down' && index === exchangeServices.value.length - 1) return

      const newList = [...exchangeServices.value]
      const targetIndex = direction === 'up' ? index - 1 : index + 1
      ;[newList[index], newList[targetIndex]] = [newList[targetIndex], newList[index]]

      const ids = newList.map(item => item.id)

      try {
        await ValueAddedServiceService.reorderExchangeServices(ids)
        await loadData()
      } catch (error) {
        console.error('排序失败:', error)
      }
    }

    // ========== Dialog回调 ==========
    const handleDialogSuccess = async () => {
      await loadData()
    }

    // ========== 生命周期 ==========
    onMounted(() => {
      loadData()
    })

    return {
      // 数据
      baseRule,
      rewardServices,
      exchangeServices,

      // 基础规则
      isEditingBaseRule,
      baseRuleForm,
      handleSaveBaseRule,
      handleCancelEditBaseRule,

      // Dialog
      isRewardCreateDialogOpen,
      isRewardEditDialogOpen,
      editingRewardItem,
      isExchangeCreateDialogOpen,
      isExchangeEditDialogOpen,
      editingExchangeItem,

      // 表格
      rewardColumns,
      exchangeColumns,

      // 方法
      handleEditReward,
      handleDeleteReward,
      handleMoveReward,
      handleEditExchange,
      handleDeleteExchange,
      handleMoveExchange,
      handleDialogSuccess
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.page-container {
  padding: @spacing-xl;
  background: @bg-secondary;
  min-height: calc(100vh - 64px);
}

.card-style {
  margin-bottom: @spacing-xl;
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;
}

.card-title {
  font-size: @font-size-xl;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

.btn-style {
  height: @button-height;
  border-radius: @border-radius-base;
  background-color: @brand-primary;
  border-color: @brand-primary;
  transition: @transition-base;

  &:hover {
    background-color: @brand-primary-hover;
    border-color: @brand-primary-hover;
  }
}

.btn-style-outline {
  height: @button-height;
  border-radius: @border-radius-base;
  border-color: @border-secondary;
  transition: @transition-base;

  &:hover {
    border-color: @text-secondary;
  }
}

// 布局
.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.gap-2 > * + * {
  margin-left: @spacing-sm;
}

.mb-6 {
  margin-bottom: @spacing-xl;
}

.mb-3 {
  margin-bottom: @spacing-base;
}

.block {
  display: block;
}

// Grid布局
.grid-5 {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: @spacing-xl;
}

.grid-10 {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: @spacing-base;
}

// 字段样式
.field-item {
  label {
    display: block;
    font-size: @font-size-base;
    font-weight: @font-weight-medium;
    color: @text-secondary;
    margin-bottom: @spacing-sm;
  }
}

.input-with-unit {
  display: flex;
  align-items: center;
  gap: @spacing-xs;

  .input-style {
    flex: 1;
    height: @input-height-lg;
    border-radius: @border-radius-base;
  }

  .unit-text {
    font-size: @font-size-xs;
    color: @text-secondary;
    white-space: nowrap;
  }
}

.value-display {
  height: @input-height-lg;
  display: flex;
  align-items: center;

  span {
    font-weight: @font-weight-normal;
    color: @text-primary;
    font-size: @font-size-base;
  }
}

// VIP倍数
.vip-multipliers {
  padding-top: @spacing-base;
  border-top: 1px solid @border-primary;

  label {
    font-size: @font-size-base;
    font-weight: @font-weight-medium;
    color: @text-secondary;
  }
}

.vip-item {
  .vip-label {
    font-size: @font-size-xs;
    color: @text-secondary;
    text-align: center;
    margin-bottom: 6px;
  }

  .vip-input {
    width: 100%;
    height: @button-height;
    border-radius: @border-radius-base;
    font-size: @font-size-xs;
    text-align: center;
  }

  .vip-value {
    height: @button-height;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-weight: @font-weight-normal;
      color: @text-primary;
      font-size: @font-size-base;
    }
  }
}

// 表格样式
.table-wrapper {
  border: 1px solid @border-primary;
  border-radius: @border-radius-lg;
  overflow: hidden;

  :deep(.ant-table) {
    font-size: @font-size-base;

    .ant-table-thead > tr > th {
      background: @bg-secondary;
      color: @text-primary;
      font-weight: @font-weight-semibold;
      padding: @spacing-base @spacing-md;
      border-bottom: 1px solid @border-primary;
    }

    .ant-table-tbody > tr {
      transition: @transition-fast;

      &:hover {
        background: @bg-hover;
      }

      > td {
        padding: @spacing-base @spacing-md;
        color: @text-primary;
        border-bottom: 1px solid @border-primary;
      }
    }
  }
}

.action-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: @spacing-sm;

  .ant-btn {
    border-radius: @border-radius-base;
    transition: @transition-base;
  }
}

.btn-delete {
  border-color: @error-color;
  color: @error-color;

  &:hover {
    background-color: fade(@error-color, 10%);
    border-color: @error-color;
    color: @error-color;
  }
}

// 颜色类
.text-green-600 {
  color: @success-color;
  font-weight: @font-weight-normal;
}

.text-red-600 {
  color: @error-color;
  font-weight: @font-weight-normal;
}

.font-medium {
  font-weight: @font-weight-medium;
  color: @text-primary;
}

.font-semibold {
  font-weight: @font-weight-semibold;
  color: @text-primary;
}
</style>
