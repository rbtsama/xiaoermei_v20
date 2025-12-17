<template>
  <sidebar>
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">选项配置</h1>
        <p class="page-desc">管理门店亮点和设施的枚举选项，商户端会根据此配置显示可选项</p>
      </div>

      <!-- 门店亮点配置 -->
      <a-card :bordered="false" class="config-card">
        <div slot="title" class="card-header">
          <span class="card-title">门店亮点</span>
        </div>

        <!-- 建筑与景观 -->
        <div class="option-section">
          <div class="section-header">
            <span class="section-title">建筑与景观</span>
            <a-button type="primary" size="small" @click="handleAdd('highlights_architecture')">
              <a-icon type="plus" />添加选项
            </a-button>
          </div>
          <a-table
            :columns="columns"
            :data-source="highlightsArchitectureData"
            :pagination="false"
            rowKey="id"
            size="small"
            class="options-table"
          >
            <template slot="label" slot-scope="text">
              <a-tag color="blue">{{ text }}</a-tag>
            </template>
            <template slot="enabled" slot-scope="enabled">
              <a-tag :color="enabled ? 'green' : 'red'">
                {{ enabled ? '启用' : '停用' }}
              </a-tag>
            </template>
            <template slot="action" slot-scope="text, record">
              <div class="action-btns">
                <a-button size="small" @click="handleEdit(record)">编辑</a-button>
                <a-button size="small" :type="record.enabled ? 'danger' : 'primary'" @click="handleToggle(record)">
                  {{ record.enabled ? '停用' : '启用' }}
                </a-button>
                <a-button size="small" danger @click="handleDelete(record)">删除</a-button>
              </div>
            </template>
          </a-table>
        </div>

        <!-- 服务与设施 -->
        <div class="option-section">
          <div class="section-header">
            <span class="section-title">服务与设施</span>
            <a-button type="primary" size="small" @click="handleAdd('highlights_services')">
              <a-icon type="plus" />添加选项
            </a-button>
          </div>
          <a-table
            :columns="columns"
            :data-source="highlightsServicesData"
            :pagination="false"
            rowKey="id"
            size="small"
            class="options-table"
          >
            <template slot="label" slot-scope="text">
              <a-tag color="blue">{{ text }}</a-tag>
            </template>
            <template slot="enabled" slot-scope="enabled">
              <a-tag :color="enabled ? 'green' : 'red'">
                {{ enabled ? '启用' : '停用' }}
              </a-tag>
            </template>
            <template slot="action" slot-scope="text, record">
              <div class="action-btns">
                <a-button size="small" @click="handleEdit(record)">编辑</a-button>
                <a-button size="small" :type="record.enabled ? 'danger' : 'primary'" @click="handleToggle(record)">
                  {{ record.enabled ? '停用' : '启用' }}
                </a-button>
                <a-button size="small" danger @click="handleDelete(record)">删除</a-button>
              </div>
            </template>
          </a-table>
        </div>
      </a-card>

      <!-- 门店设施配置 -->
      <a-card :bordered="false" class="config-card">
        <div slot="title" class="card-header">
          <span class="card-title">门店设施</span>
          <span class="card-desc">包含交通服务、清洁服务、安全安保等12个分类</span>
        </div>

        <div class="facility-sections">
          <a-collapse :bordered="false" expand-icon-position="right">
            <a-collapse-panel key="transportation" header="交通服务">
              <div class="section-header">
                <a-button type="primary" size="small" @click="handleAdd('transportation')">
                  <a-icon type="plus" />添加选项
                </a-button>
              </div>
              <a-table
                :columns="columns"
                :data-source="transportationData"
                :pagination="false"
                rowKey="id"
                size="small"
                class="options-table"
              >
                <template slot="label" slot-scope="text">
                  <a-tag color="blue">{{ text }}</a-tag>
                </template>
                <template slot="enabled" slot-scope="enabled">
                  <a-tag :color="enabled ? 'green' : 'red'">
                    {{ enabled ? '启用' : '停用' }}
                  </a-tag>
                </template>
                <template slot="action" slot-scope="text, record">
                  <div class="action-btns">
                    <a-button size="small" @click="handleEdit(record)">编辑</a-button>
                    <a-button size="small" :type="record.enabled ? 'danger' : 'primary'" @click="handleToggle(record)">
                      {{ record.enabled ? '停用' : '启用' }}
                    </a-button>
                    <a-button size="small" danger @click="handleDelete(record)">删除</a-button>
                  </div>
                </template>
              </a-table>
            </a-collapse-panel>
          </a-collapse>
          <p class="collapse-hint">点击展开查看其他11个门店设施分类（清洁服务、安全安保、公共区域...）</p>
        </div>
      </a-card>

      <!-- 编辑弹窗 -->
      <a-modal
        :visible="editVisible"
        :title="editingItem ? '编辑选项' : '添加选项'"
        @ok="handleSave"
        @cancel="editVisible = false"
      >
        <a-form-model :model="editForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-form-model-item label="选项文本" required>
            <a-input v-model="editForm.label" placeholder="请输入选项文本" :maxLength="20" />
            <div class="field-hint">最多20个字</div>
          </a-form-model-item>
          <a-form-model-item label="排序" required>
            <a-input-number v-model="editForm.sort" :min="1" style="width: 100%" />
            <div class="field-hint">数字越小越靠前</div>
          </a-form-model-item>
          <a-form-model-item label="状态" required>
            <a-radio-group v-model="editForm.enabled">
              <a-radio :value="true">启用</a-radio>
              <a-radio :value="false">停用</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, reactive } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import { mockHighlightsArchitecture, mockHighlightsServices, mockTransportationFacilities } from '@/mocks/optionsConfig.mock'

export default defineComponent({
  name: 'OptionsConfigPage',
  components: { Sidebar },
  setup(props, { root }) {
    const highlightsArchitectureData = ref([...mockHighlightsArchitecture])
    const highlightsServicesData = ref([...mockHighlightsServices])
    const transportationData = ref([...mockTransportationFacilities])

    const columns = [
      { title: '选项', dataIndex: 'label', width: 200, scopedSlots: { customRender: 'label' } },
      { title: '排序', dataIndex: 'sort', width: 80 },
      { title: '状态', dataIndex: 'enabled', width: 80, scopedSlots: { customRender: 'enabled' } },
      { title: '更新时间', dataIndex: 'updatedAt', width: 160 },
      { title: '操作', width: 200, scopedSlots: { customRender: 'action' } }
    ]

    const editVisible = ref(false)
    const editingItem = ref(null)
    const editingCategory = ref('')
    const editForm = reactive({
      label: '',
      sort: 1,
      enabled: true
    })

    const handleAdd = (category) => {
      editingItem.value = null
      editingCategory.value = category
      editForm.label = ''
      editForm.sort = 1
      editForm.enabled = true
      editVisible.value = true
    }

    const handleEdit = (item) => {
      editingItem.value = item
      editForm.label = item.label
      editForm.sort = item.sort
      editForm.enabled = item.enabled
      editVisible.value = true
    }

    const handleSave = () => {
      if (!editForm.label) {
        root.$message.error('请输入选项文本')
        return
      }
      root.$message.success('保存成功')
      editVisible.value = false
    }

    const handleToggle = (item) => {
      item.enabled = !item.enabled
      root.$message.success(item.enabled ? '已启用' : '已停用')
    }

    const handleDelete = (item) => {
      root.$confirm({
        title: '确认删除',
        content: `确定要删除选项"${item.label}"吗？`,
        onOk: () => {
          root.$message.success('删除成功')
        }
      })
    }

    return {
      highlightsArchitectureData,
      highlightsServicesData,
      transportationData,
      columns,
      editVisible,
      editingItem,
      editForm,
      handleAdd,
      handleEdit,
      handleSave,
      handleToggle,
      handleDelete
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.page-container {
  padding: 24px;
  max-width: 1600px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: @text-primary;
  margin-bottom: 8px;
}

.page-desc {
  font-size: @font-size-sm;
  color: @text-secondary;
  margin: 0;
}

.config-card {
  margin-bottom: 24px;
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;

  :deep(.ant-card-head) {
    border-bottom: 1px solid @border-primary;
    padding: 16px 24px;
  }

  :deep(.ant-card-body) {
    padding: 24px;
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-title {
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

.card-desc {
  font-size: @font-size-sm;
  color: @text-secondary;
}

.option-section {
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-size: @font-size-base;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

.options-table {
  :deep(.ant-table-thead > tr > th) {
    background: @bg-secondary;
    font-weight: @font-weight-semibold;
  }
}

.action-btns {
  display: flex;
  gap: 8px;
}

.collapse-hint {
  margin-top: 16px;
  font-size: @font-size-sm;
  color: @text-secondary;
  text-align: center;
}

.field-hint {
  font-size: @font-size-xs;
  color: @text-secondary;
  margin-top: 4px;
  line-height: 1.4;
}
</style>
