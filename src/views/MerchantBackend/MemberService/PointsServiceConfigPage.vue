<template>
  <sidebar>
    <div class="h-screen overflow-y-auto bg-secondary">
      <div class="max-w-7xl mx-auto p-6">
        <!-- 页面头部 -->
        <div class="mb-6">
          <h1 class="page-title">积分服务配置</h1>
        </div>

        <!-- 积分奖励服务 -->
        <a-card :bordered="false" class="mb-6 service-card">
          <template #title>
            <div class="card-title">
              <a-icon type="gift" class="title-icon" />
              积分奖励
            </div>
          </template>

          <a-table
            :columns="rewardColumns"
            :data-source="config.ecoRewards"
            :pagination="false"
            :row-key="(record) => record.id"
            :loading="loading"
          >
            <template #serviceName="text">
              <span class="service-name">{{ text }}</span>
            </template>
            <template #description="text">
              <span class="description-text">{{ text || '-' }}</span>
            </template>
            <template #pointsAmount="text">
              <span class="points-amount">{{ Math.abs(text) }} 积分</span>
            </template>
            <template #enabled="enabled">
              <a-switch :checked="enabled" disabled />
            </template>
          </a-table>
        </a-card>

        <!-- 积分换购服务 -->
        <a-card :bordered="false" class="service-card">
          <template #title>
            <div class="card-title">
              <a-icon type="shopping" class="title-icon" />
              积分换购
            </div>
          </template>

          <a-table
            :columns="serviceColumns"
            :data-source="config.valueAddedServices"
            :pagination="false"
            :row-key="(record) => record.id"
            :loading="loading"
          >
            <template #serviceName="text">
              <span class="service-name">{{ text }}</span>
            </template>
            <template #description="text">
              <span class="description-text">{{ text || '-' }}</span>
            </template>
            <template #pointsAmount="text">
              <span class="points-amount">{{ text }} 积分</span>
            </template>
            <template #enabled="enabled">
              <a-switch :checked="enabled" disabled />
            </template>
          </a-table>
        </a-card>
      </div>
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
          width: 250,
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
          title: '启用',
          dataIndex: 'enabled',
          key: 'enabled',
          width: 100,
          scopedSlots: { customRender: 'enabled' },
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
          width: 250,
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
          title: '启用',
          dataIndex: 'enabled',
          key: 'enabled',
          width: 100,
          scopedSlots: { customRender: 'enabled' },
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
  },
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.bg-secondary {
  background-color: @bg-secondary;
}

.page-title {
  font-size: @font-size-2xl;
  font-weight: @font-weight-bold;
  color: @text-primary;
}

.service-card {
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;
  transition: @transition-base;

  &:hover {
    box-shadow: @shadow-md;
  }
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: @font-size-base;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

.title-icon {
  color: @brand-primary;
}

.service-name {
  font-weight: @font-weight-medium;
  color: @text-primary;
}

.description-text {
  font-size: @font-size-sm;
  color: @text-secondary;
}

.points-amount {
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

::v-deep .ant-card {
  border: 1px solid @border-primary;
}

::v-deep .ant-card-head {
  border-bottom: 1px solid @border-primary;
}

::v-deep .ant-table {
  font-size: @font-size-base;
}

::v-deep .ant-table-thead > tr > th {
  background-color: @bg-secondary;
  color: @text-secondary;
  font-weight: @font-weight-semibold;
  border-bottom: 1px solid @border-primary;
  padding: @spacing-base @spacing-md;
}

::v-deep .ant-table-tbody > tr {
  transition: @transition-base;

  &:hover {
    background-color: @bg-hover;
  }

  > td {
    border-bottom: 1px solid @border-primary;
    padding: @spacing-base @spacing-md;
  }
}

::v-deep .ant-switch-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
