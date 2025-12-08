<template>
  <sidebar>
    <div class="points-service-page">
      <!-- 积分奖励服务 -->
      <a-card :bordered="false" class="service-card">
        <div slot="title" class="card-header">
          <span class="card-title">
            <a-icon type="gift" class="title-icon" />
            积分奖励
          </span>
        </div>

        <a-table
          :columns="rewardColumns"
          :data-source="config.ecoRewards"
          :pagination="false"
          :row-key="(record) => record.id"
          :loading="loading"
          class="custom-table"
        >
          <template slot="serviceName" slot-scope="text">
            <span class="service-name">{{ text }}</span>
          </template>

          <template slot="description" slot-scope="text">
            <span class="description-text">{{ text || '—' }}</span>
          </template>

          <template slot="pointsAmount" slot-scope="text">
            <span class="points-amount">{{ Math.abs(text) }} 积分</span>
          </template>

          <template slot="enabled" slot-scope="enabled, record">
            <a-tag :class="enabled ? 'tag-green' : 'tag-gray'">
              {{ enabled ? '已启用' : '已停用' }}
            </a-tag>
          </template>

          <template slot="action" slot-scope="text, record">
            <div class="action-btns">
              <a-button
                size="small"
                :type="record.enabled ? 'danger' : 'primary'"
                @click="handleToggleService(record)"
              >
                {{ record.enabled ? '停用' : '启用' }}
              </a-button>
            </div>
          </template>
        </a-table>
      </a-card>

      <!-- 积分换购服务 -->
      <a-card :bordered="false" class="service-card">
        <div slot="title" class="card-header">
          <span class="card-title">
            <a-icon type="shopping" class="title-icon" />
            积分换购
          </span>
        </div>

        <a-table
          :columns="serviceColumns"
          :data-source="config.valueAddedServices"
          :pagination="false"
          :row-key="(record) => record.id"
          :loading="loading"
          class="custom-table"
        >
          <template slot="serviceName" slot-scope="text">
            <span class="service-name">{{ text }}</span>
          </template>

          <template slot="description" slot-scope="text">
            <span class="description-text">{{ text || '—' }}</span>
          </template>

          <template slot="pointsAmount" slot-scope="text">
            <span class="points-amount">{{ text }} 积分</span>
          </template>

          <template slot="enabled" slot-scope="enabled, record">
            <a-tag :class="enabled ? 'tag-green' : 'tag-gray'">
              {{ enabled ? '已启用' : '已停用' }}
            </a-tag>
          </template>

          <template slot="action" slot-scope="text, record">
            <div class="action-btns">
              <a-button
                size="small"
                :type="record.enabled ? 'danger' : 'primary'"
                @click="handleToggleService(record)"
              >
                {{ record.enabled ? '停用' : '启用' }}
              </a-button>
            </div>
          </template>
        </a-table>
      </a-card>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import { getPointsServiceConfig } from '@/api/memberService'

export default defineComponent({
  name: 'PointsServiceConfigPage',
  components: {
    Sidebar,
  },
  data() {
    return {
      loading: false,
      config: {
        storeId: '',
        storeName: '',
        ecoRewards: [],
        valueAddedServices: [],
      },
      rewardColumns: [
        {
          title: '服务名称',
          dataIndex: 'serviceName',
          key: 'serviceName',
          width: 150,
          scopedSlots: { customRender: 'serviceName' },
        },
        {
          title: '服务说明',
          dataIndex: 'description',
          key: 'description',
          scopedSlots: { customRender: 'description' },
        },
        {
          title: '奖励积分',
          dataIndex: 'pointsAmount',
          key: 'pointsAmount',
          width: 120,
          scopedSlots: { customRender: 'pointsAmount' },
        },
        {
          title: '状态',
          dataIndex: 'enabled',
          key: 'enabled',
          width: 90,
          scopedSlots: { customRender: 'enabled' },
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          fixed: 'right',
          scopedSlots: { customRender: 'action' },
        },
      ],
      serviceColumns: [
        {
          title: '服务名称',
          dataIndex: 'serviceName',
          key: 'serviceName',
          width: 150,
          scopedSlots: { customRender: 'serviceName' },
        },
        {
          title: '服务说明',
          dataIndex: 'description',
          key: 'description',
          scopedSlots: { customRender: 'description' },
        },
        {
          title: '消耗积分',
          dataIndex: 'pointsAmount',
          key: 'pointsAmount',
          width: 120,
          scopedSlots: { customRender: 'pointsAmount' },
        },
        {
          title: '状态',
          dataIndex: 'enabled',
          key: 'enabled',
          width: 90,
          scopedSlots: { customRender: 'enabled' },
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          fixed: 'right',
          scopedSlots: { customRender: 'action' },
        },
      ],
    }
  },
  mounted() {
    this.loadConfig()
  },
  methods: {
    async loadConfig() {
      this.loading = true
      try {
        this.config = await getPointsServiceConfig()
      } catch (error) {
        this.$message.error('加载配置失败')
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async handleToggleService(record) {
      try {
        // 这里应该调用API切换服务状态
        // await togglePointsService(record.id)
        this.$message.success(`已${record.enabled ? '停用' : '启用'}服务`)
        this.loadConfig()
      } catch (error) {
        this.$message.error('操作失败')
      }
    },
  },
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.points-service-page {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

// 卡片样式
.service-card {
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;

  :deep(.ant-card-head) {
    border-bottom: 1px solid @bg-tertiary;
    padding: 16px 24px;
  }

  :deep(.ant-card-body) {
    padding: 0;
  }
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;

  .title-icon {
    color: @brand-primary;
    font-size: 16px;
  }
}

// 自定义表格样式
.custom-table {
  :deep(.ant-table-thead > tr > th) {
    background: @bg-secondary;
    border-bottom: 1px solid @border-primary;
    color: @text-primary;
    font-weight: @font-weight-semibold;
    font-size: @font-size-base;
    padding: 12px 16px;
  }

  :deep(.ant-table-tbody > tr) {
    &:hover > td {
      background: @bg-hover;
    }

    > td {
      border-bottom: 1px solid @border-primary;
      padding: 12px 16px;
      color: @text-primary;
    }
  }
}

// 服务名称
.service-name {
  font-weight: @font-weight-medium;
  color: @text-primary;
  font-size: @font-size-base;
}

// 描述文字
.description-text {
  font-size: @font-size-sm;
  color: @text-secondary;
}

// 积分数量
.points-amount {
  font-weight: @font-weight-semibold;
  color: @text-primary;
  font-size: @font-size-base;
}

// 标签样式
.tag-green {
  color: #15803d;
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.tag-gray {
  color: #64748b;
  background: #f8fafc;
  border-color: #cbd5e1;
}

:deep(.ant-tag) {
  margin: 0;
  padding: 2px 8px;
  font-size: @font-size-xs;
  font-weight: @font-weight-medium;
  line-height: 20px;
  border-radius: @border-radius-sm;
  border-width: 1px;
}

// 操作按钮
.action-btns {
  display: flex;
  gap: 8px;
  justify-content: center;

  .ant-btn-sm {
    height: 28px;
    padding: 0 12px;
    font-size: @font-size-sm;
  }
}
</style>
