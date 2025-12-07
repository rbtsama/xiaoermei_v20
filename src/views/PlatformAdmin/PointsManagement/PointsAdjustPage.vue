<template>
  <sidebar>
    <div class="page-container">
      <!-- 搜索卡片 -->
      <a-card class="search-card" :bordered="false">
        <div class="flex items-center justify-between">
          <a-form layout="inline" @submit.prevent="handleSearch">
            <a-form-item>
              <a-input
                v-model="phoneNumber"
                placeholder="请输入用户手机号"
                class="search-input"
                style="width: 240px"
              />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" :loading="loading">
                <a-icon type="search" />
                搜索
              </a-button>
            </a-form-item>
          </a-form>

          <a-button @click="goToOperationLogs">
            <a-icon type="file-text" />
            操作记录
          </a-button>
        </div>
      </a-card>

      <!-- 用户信息卡片 -->
      <a-card v-if="userAccount" class="user-info-card" :bordered="false">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-8">
            <div class="info-item">
              <div class="info-label">手机号</div>
              <div class="info-value">{{ userAccount.phoneNumber }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">VIP等级</div>
              <div class="info-value vip-level">VIP{{ userAccount.vipLevel }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">当前积分</div>
              <div class="info-value points-value">{{ userAccount.availablePoints }}</div>
            </div>
          </div>

          <a-button type="primary" @click="showAdjustDialog">
            手动调整积分
          </a-button>
        </div>
      </a-card>

      <!-- 积分变动历史 -->
      <a-card v-if="userAccount" title="积分变动历史" :bordered="false">
        <a-table
          :columns="columns"
          :data-source="changeLogs"
          :pagination="paginationConfig"
          :loading="loading"
          row-key="id"
          @change="handleTableChange"
        >
          <!-- 操作类型 -->
          <template slot="operationType" slot-scope="operationType">
            <a-tag :class="getOperationTypeClass(operationType)">
              {{ getOperationTypeLabel(operationType) }}
            </a-tag>
          </template>

          <!-- 积分数 -->
          <template slot="pointsAmount" slot-scope="pointsAmount, record">
            <span class="points-amount">
              {{ record.operationType === 'earn' || record.operationType === 'adjust' ? '+' : '-' }}{{ Math.abs(pointsAmount) }}
            </span>
          </template>

          <!-- 备注说明 -->
          <template slot="remark" slot-scope="remark">
            <span class="remark-text">{{ remark }}</span>
          </template>

          <!-- 变动前 -->
          <template slot="balanceBefore" slot-scope="balanceBefore">
            <span>{{ balanceBefore }}</span>
          </template>

          <!-- 变动后 -->
          <template slot="balanceAfter" slot-scope="balanceAfter">
            <span class="balance-after">{{ balanceAfter }}</span>
          </template>

          <!-- 操作时间 -->
          <template slot="operatedAt" slot-scope="operatedAt">
            <span class="text-sm text-slate-600">{{ operatedAt }}</span>
          </template>
        </a-table>
      </a-card>

      <!-- 调整积分弹窗 -->
      <a-modal
        v-model="isAdjustDialogVisible"
        title="手动调整用户积分"
        width="550px"
        :confirm-loading="adjusting"
        @ok="handleAdjustSubmit"
        @cancel="handleAdjustCancel"
      >
        <div class="adjust-dialog-content">
          <!-- 用户信息卡片 -->
          <div class="user-info-summary">
            <div class="summary-item">
              <div class="summary-label">手机号</div>
              <div class="summary-value">{{ userAccount ? userAccount.phoneNumber : '' }}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">VIP等级</div>
              <div class="summary-value vip">VIP{{ userAccount ? userAccount.vipLevel : '' }}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">当前积分</div>
              <div class="summary-value points">{{ userAccount ? userAccount.availablePoints : '' }}</div>
            </div>
          </div>

          <a-form-model ref="adjustForm" :model="adjustForm" :rules="adjustRules">
            <!-- 调整类型 -->
            <a-form-model-item label="调整类型" prop="type">
              <a-radio-group v-model="adjustForm.type">
                <a-radio value="add">
                  <a-icon type="plus-circle" style="color: #10b981" />
                  增加积分
                </a-radio>
                <a-radio value="deduct">
                  <a-icon type="minus-circle" style="color: #ef4444" />
                  减少积分
                </a-radio>
              </a-radio-group>
            </a-form-model-item>

            <!-- 调整积分 -->
            <a-form-model-item label="调整积分" prop="pointsAmount">
              <a-input-number
                v-model="adjustForm.pointsAmount"
                placeholder="请输入正整数"
                :min="1"
                :precision="0"
                style="width: 100%"
              />
            </a-form-model-item>

            <!-- 调整原因 -->
            <a-form-model-item label="调整原因" prop="remark">
              <a-textarea
                v-model="adjustForm.remark"
                placeholder="请填写调整原因"
                :rows="4"
                :maxLength="200"
                show-count
              />
            </a-form-model-item>
          </a-form-model>
        </div>
      </a-modal>
    </div>
  </sidebar>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import ValueAddedServiceService from './services/valueAddedService.service'
import type { UserPointsAccount, PointsChangeLog } from './types/valueAddedService.types'

export default defineComponent({
  name: 'PointsAdjustPage',
  components: {
    Sidebar
  },

  setup() {
    // ========== 状态管理 ==========
    const loading = ref(false)
    const adjusting = ref(false)
    const phoneNumber = ref('')
    const userAccount = ref<UserPointsAccount | null>(null)
    const changeLogs = ref<PointsChangeLog[]>([])
    const total = ref(0)
    const currentPage = ref(1)
    const pageSize = ref(20)
    const isAdjustDialogVisible = ref(false)

    // 调整表单
    const adjustForm = reactive({
      type: 'add' as 'add' | 'deduct',
      pointsAmount: undefined as number | undefined,
      remark: ''
    })

    // 表单验证规则
    const adjustRules = {
      type: [{ required: true, message: '请选择调整类型' }],
      pointsAmount: [
        { required: true, message: '请输入调整积分' },
        { type: 'number', min: 1, message: '请输入大于0的整数' }
      ],
      remark: [
        { required: true, message: '请填写调整原因', trigger: 'blur' },
        { max: 200, message: '调整原因不能超过200字符', trigger: 'blur' }
      ]
    }

    // ========== 表格配置 ==========
    const columns = [
      { title: '操作类型', dataIndex: 'operationType', scopedSlots: { customRender: 'operationType' }, width: 120 },
      { title: '积分数', dataIndex: 'pointsAmount', scopedSlots: { customRender: 'pointsAmount' }, width: 100 },
      { title: '备注说明', dataIndex: 'remark', scopedSlots: { customRender: 'remark' } },
      { title: '变动前', dataIndex: 'balanceBefore', scopedSlots: { customRender: 'balanceBefore' }, width: 100 },
      { title: '变动后', dataIndex: 'balanceAfter', scopedSlots: { customRender: 'balanceAfter' }, width: 100 },
      { title: '操作时间', dataIndex: 'operatedAt', scopedSlots: { customRender: 'operatedAt' }, width: 160 }
    ]

    // 分页配置
    const paginationConfig = computed(() => ({
      current: currentPage.value,
      pageSize: pageSize.value,
      total: total.value,
      showSizeChanger: false,
      showQuickJumper: false,
      showTotal: (total: number) => `共 ${total} 条`
    }))

    // ========== 数据加载 ==========
    const fetchChangeLogs = async () => {
      if (!userAccount.value) return

      loading.value = true
      try {
        const result = await ValueAddedServiceService.getPointsChangeLogsByUserId(
          userAccount.value.userId,
          pageSize.value,
          currentPage.value
        )
        changeLogs.value = result.data
        total.value = result.total
      } catch (error) {
        console.error('获取积分变动记录失败:', error)
      } finally {
        loading.value = false
      }
    }

    // ========== 事件处理 ==========
    const handleSearch = async () => {
      if (!phoneNumber.value || phoneNumber.value.trim().length === 0) {
        return
      }

      // 验证手机号格式
      const phoneRegex = /^1[3-9]\d{9}$/
      if (!phoneRegex.test(phoneNumber.value)) {
        return
      }

      loading.value = true
      try {
        const account = await ValueAddedServiceService.getUserAccountByPhone(phoneNumber.value)

        if (!account) {
          userAccount.value = null
          changeLogs.value = []
          total.value = 0
          return
        }

        userAccount.value = account
        currentPage.value = 1
        await fetchChangeLogs()
      } catch (error) {
        console.error('搜索用户失败:', error)
      } finally {
        loading.value = false
      }
    }

    const handleTableChange = (pagination: any) => {
      currentPage.value = pagination.current
      fetchChangeLogs()
    }

    const showAdjustDialog = () => {
      isAdjustDialogVisible.value = true
    }

    const handleAdjustCancel = () => {
      isAdjustDialogVisible.value = false
      adjustForm.type = 'add'
      adjustForm.pointsAmount = undefined
      adjustForm.remark = ''
    }

    const handleAdjustSubmit = async () => {
      if (!userAccount.value) return

      // 验证表单
      if (!adjustForm.pointsAmount || !adjustForm.remark) {
        return
      }

      const amount = adjustForm.pointsAmount
      if (isNaN(amount) || amount <= 0) {
        return
      }

      const signedAmount = adjustForm.type === 'add' ? amount : -amount

      adjusting.value = true
      try {
        await ValueAddedServiceService.adjustUserPoints(
          userAccount.value.id,
          signedAmount,
          adjustForm.remark,
          '兔子' // 操作人
        )

        // 刷新数据
        const account = await ValueAddedServiceService.getUserAccountByPhone(userAccount.value.phoneNumber)
        if (account) {
          userAccount.value = account
        }

        currentPage.value = 1
        await fetchChangeLogs()

        // 关闭弹窗
        handleAdjustCancel()
      } catch (error) {
        console.error('调整积分失败:', error)
      } finally {
        adjusting.value = false
      }
    }

    const goToOperationLogs = () => {
      // Vue Router 导航将在后续实现
      console.log('跳转到操作记录页面')
    }

    // ========== 样式辅助 ==========
    const getOperationTypeLabel = (type: string) => {
      const typeMap: Record<string, string> = {
        earn: '获得',
        deduct: '扣减',
        expire: '过期',
        adjust: '调整'
      }
      return typeMap[type] || type
    }

    const getOperationTypeClass = (type: string) => {
      const classMap: Record<string, string> = {
        earn: 'tag-earn',
        deduct: 'tag-deduct',
        expire: 'tag-expire',
        adjust: 'tag-adjust'
      }
      return classMap[type] || ''
    }

    return {
      // 状态
      loading,
      adjusting,
      phoneNumber,
      userAccount,
      changeLogs,
      isAdjustDialogVisible,
      adjustForm,
      adjustRules,

      // 表格
      columns,
      paginationConfig,

      // 方法
      handleSearch,
      handleTableChange,
      showAdjustDialog,
      handleAdjustCancel,
      handleAdjustSubmit,
      goToOperationLogs,
      getOperationTypeLabel,
      getOperationTypeClass
    }
  }
})
</script>

<style scoped lang="less">
.page-container {
  padding: 24px;
  background: #f0f2f5;
  min-height: calc(100vh - 64px);
}

.search-card,
.user-info-card {
  margin-bottom: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.search-input {
  height: 36px;
  border-color: #cbd5e1;
  border-radius: 6px;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
}

// 用户信息卡片样式
.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.gap-8 > * + * {
  margin-left: 32px;
}

.info-item {
  .info-label {
    font-size: 14px;
    color: #64748b;
    margin-bottom: 4px;
  }

  .info-value {
    font-size: 18px;
    font-weight: 600;
    color: #0f172a;

    &.vip-level {
      color: #f97316;
    }

    &.points-value {
      color: #10b981;
    }
  }
}

// 操作类型标签样式
.tag-earn {
  background-color: #dcfce7;
  color: #15803d;
  border-color: #86efac;
}

.tag-deduct {
  background-color: #fed7aa;
  color: #c2410c;
  border-color: #fdba74;
}

.tag-expire {
  background-color: #f1f5f9;
  color: #475569;
  border-color: #cbd5e1;
}

.tag-adjust {
  background-color: #dbeafe;
  color: #1e40af;
  border-color: #93c5fd;
}

// 表格内容样式
.points-amount {
  font-weight: 600;
  color: #0f172a;
}

.remark-text {
  color: #475569;
}

.balance-after {
  font-weight: 600;
  color: #0f172a;
}

// 调整弹窗样式
.adjust-dialog-content {
  padding-top: 16px;
}

.user-info-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  margin-bottom: 24px;

  .summary-item {
    .summary-label {
      font-size: 12px;
      color: #64748b;
      margin-bottom: 4px;
    }

    .summary-value {
      font-size: 14px;
      font-weight: 600;
      color: #0f172a;

      &.vip {
        color: #f97316;
      }

      &.points {
        color: #10b981;
      }
    }
  }
}

// 通用文本样式
.text-sm {
  font-size: 14px;
}

.text-slate-600 {
  color: #475569;
}
</style>
