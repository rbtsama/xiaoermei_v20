<template>
  <sidebar>
    <div class="page-container">
      <!-- 页面标题 -->
      <div class="page-header">
        <a-button @click="handleGoBack" class="back-btn">
          <a-icon type="arrow-left" />
          返回
        </a-button>
        <h1 class="page-title">邀请记录</h1>
      </div>

      <!-- 列表卡片 -->
      <a-card :bordered="false" class="list-card">
        <a-table
          :columns="columns"
          :data-source="tableData"
          :loading="isLoading"
          :pagination="pagination"
          @change="handleTableChange"
          rowKey="id"
          class="custom-table"
        >
          <!-- 受邀会员 -->
          <template slot="inviteePhone" slot-scope="text">
            <span class="phone-text">{{ text }}</span>
          </template>

          <!-- 邀请时间 -->
          <template slot="invitedAt" slot-scope="text">
            <div class="datetime-cell">
              <div class="date">{{ formatDate(text) }}</div>
              <div class="time">{{ formatTime(text) }}</div>
            </div>
          </template>

          <!-- 账号状态 -->
          <template slot="accountStatus" slot-scope="text">
            <a-tag :class="text === 'registered' ? 'tag-green' : 'tag-gray'">
              {{ text === 'registered' ? '已注册' : '预注册' }}
            </a-tag>
          </template>

          <!-- 会员等级 -->
          <template slot="vipLevel" slot-scope="text">
            <a-tag :class="getVipTagClass(text)">
              VIP{{ text }}
            </a-tag>
          </template>
        </a-table>
      </a-card>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import { getInviteRecords } from '@/api/memberService'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'InviteRecordsPage',
  components: { Sidebar },
  setup(props, { root }) {
    const isLoading = ref(false)
    const tableData = ref([])
    const pagination = reactive({
      current: 1,
      pageSize: 10,
      total: 0,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total) => `共 ${total} 条`,
      pageSizeOptions: ['10', '20', '50', '100']
    })

    const columns = [
      {
        title: '受邀会员',
        dataIndex: 'inviteePhone',
        key: 'inviteePhone',
        width: 120,
        scopedSlots: { customRender: 'inviteePhone' }
      },
      {
        title: '邀请时间',
        dataIndex: 'invitedAt',
        key: 'invitedAt',
        width: 120,
        scopedSlots: { customRender: 'invitedAt' }
      },
      {
        title: '账号状态',
        dataIndex: 'accountStatus',
        key: 'accountStatus',
        width: 100,
        scopedSlots: { customRender: 'accountStatus' }
      },
      {
        title: '会员等级',
        dataIndex: 'vipLevel',
        key: 'vipLevel',
        width: 100,
        scopedSlots: { customRender: 'vipLevel' }
      }
    ]

    const formatDate = (datetime) => datetime ? dayjs(datetime).format('YYYY-MM-DD') : '-'
    const formatTime = (datetime) => datetime ? dayjs(datetime).format('HH:mm:ss') : '-'

    const getVipTagClass = (level) => {
      const classMap = {
        0: 'tag-gray',
        1: 'tag-blue',
        2: 'tag-purple',
        3: 'tag-orange'
      }
      return classMap[level] || 'tag-gray'
    }

    const fetchData = async () => {
      isLoading.value = true
      try {
        const { records, total } = await getInviteRecords(pagination.current, pagination.pageSize)
        tableData.value = records
        pagination.total = total
      } catch (error) {
        root.$message.error('加载数据失败')
        console.error(error)
      } finally {
        isLoading.value = false
      }
    }

    const handleTableChange = (pag) => {
      pagination.current = pag.current
      pagination.pageSize = pag.pageSize
      fetchData()
    }

    const handleGoBack = () => {
      root.$router.push('/merchant-backend/old-customer/invite-member')
    }

    onMounted(() => {
      fetchData()
    })

    return {
      isLoading,
      tableData,
      pagination,
      columns,
      formatDate,
      formatTime,
      getVipTagClass,
      handleTableChange,
      handleGoBack
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';
@import '@/styles/common.less';

.page-container {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;

  .back-btn {
    height: 36px;
    padding: 0 16px;
    border-radius: @border-radius-base;
  }

  .page-title {
    font-size: @font-size-2xl;
    font-weight: @font-weight-semibold;
    color: @text-primary;
    margin: 0;
  }
}

.list-card {
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;

  :deep(.ant-card-body) {
    padding: 0;
  }
}

.phone-text {
  font-weight: @font-weight-medium;
  color: @text-primary;
}
</style>
