<template>
  <a-modal
    :visible="visible"
    :title="`活动码管理 - ${activity ? activity.name : ''}`"
    width="900px"
    :footer="null"
    @cancel="handleClose"
  >
    <!-- 批量操作区 -->
    <div class="batch-actions">
      <a-checkbox
        :checked="allSelected"
        :indeterminate="indeterminate"
        @change="handleSelectAll"
      >
        全选
      </a-checkbox>
      <div class="action-btns">
        <a-button
          type="primary"
          :disabled="selectedMerchants.length === 0"
          :loading="downloadingZip"
          @click="handleBatchDownloadZip"
        >
          <a-icon type="download" />
          批量下载 ({{ selectedMerchants.length }})
        </a-button>
        <a-upload
          :before-upload="handleUploadZip"
          :show-upload-list="false"
          accept=".zip"
        >
          <a-button>
            <a-icon type="upload" />
            批量上传zip校验
          </a-button>
        </a-upload>
      </div>
    </div>

    <!-- 商户表格 -->
    <div class="table-container">
      <a-table
        :columns="columns"
        :data-source="merchants"
        :pagination="false"
        :scroll="{ y: 400 }"
        :loading="loading"
        row-key="merchantId"
        size="small"
        class="merchant-code-table"
      >
        <!-- 选择框 -->
        <template slot="selection" slot-scope="text, record">
          <a-checkbox
            :checked="selectedMerchants.includes(record.merchantId)"
            @change="handleSelectMerchant(record.merchantId)"
          />
        </template>

        <!-- 商户名称 -->
        <template slot="merchantName" slot-scope="merchantName">
          <span class="merchant-name">{{ merchantName }}</span>
        </template>

        <!-- 门店名称 -->
        <template slot="storeName" slot-scope="storeName">
          <span class="store-name">{{ storeName }}</span>
        </template>

        <!-- 二维码预览 -->
        <template slot="qrCode" slot-scope="qrCode">
          <div class="qr-code-preview">
            <img :src="qrCode" alt="二维码" class="qr-image" />
          </div>
        </template>

        <!-- 操作 -->
        <template slot="action" slot-scope="text, record">
          <a-button size="small" @click="handleDownloadSingle(record)">
            <a-icon type="download" />
            下载
          </a-button>
        </template>
      </a-table>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from '@vue/composition-api'
import ActivityService from '../services/activity.service'
import type { Activity, MerchantActivityCode } from '../types/activity.types'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export default defineComponent({
  name: 'MerchantCodeDialog',

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    activity: {
      type: Object as () => Activity | null,
      default: null
    }
  },

  setup(props, { emit, root }) {
    const loading = ref(false)
    const downloadingZip = ref(false)
    const merchants = ref<MerchantActivityCode[]>([])
    const selectedMerchants = ref<string[]>([])

    // 表格列定义
    const columns = [
      {
        title: '',
        key: 'selection',
        width: 60,
        scopedSlots: { customRender: 'selection' }
      },
      {
        title: '商户名称',
        dataIndex: 'merchantName',
        key: 'merchantName',
        width: 150,
        scopedSlots: { customRender: 'merchantName' }
      },
      {
        title: '门店名称',
        dataIndex: 'storeName',
        key: 'storeName',
        width: 150,
        scopedSlots: { customRender: 'storeName' }
      },
      {
        title: '二维码',
        dataIndex: 'qrCode',
        key: 'qrCode',
        width: 100,
        scopedSlots: { customRender: 'qrCode' }
      },
      {
        title: '操作',
        key: 'action',
        width: 80,
        scopedSlots: { customRender: 'action' }
      }
    ]

    // ==================== 计算属性 ====================

    /**
     * 是否全选
     */
    const allSelected = computed(() => {
      return merchants.value.length > 0 && selectedMerchants.value.length === merchants.value.length
    })

    /**
     * 是否半选状态
     */
    const indeterminate = computed(() => {
      return selectedMerchants.value.length > 0 && selectedMerchants.value.length < merchants.value.length
    })

    // ==================== 业务函数 ====================

    /**
     * 加载商户活动码列表
     */
    const loadMerchantCodes = async () => {
      if (!props.activity) return

      loading.value = true
      try {
        const codes = await ActivityService.getMerchantCodes(props.activity.id)
        merchants.value = codes
      } catch (error) {
        root.$message.error('加载商户活动码失败')
        console.error('加载商户活动码失败:', error)
      } finally {
        loading.value = false
      }
    }

    /**
     * 全选/取消全选
     */
    const handleSelectAll = (e: any) => {
      if (e.target.checked) {
        selectedMerchants.value = merchants.value.map(m => m.merchantId)
      } else {
        selectedMerchants.value = []
      }
    }

    /**
     * 单个商户选择切换
     */
    const handleSelectMerchant = (merchantId: string) => {
      const index = selectedMerchants.value.indexOf(merchantId)
      if (index > -1) {
        selectedMerchants.value.splice(index, 1)
      } else {
        selectedMerchants.value.push(merchantId)
      }
    }

    /**
     * 单个下载
     */
    const handleDownloadSingle = (merchant: MerchantActivityCode) => {
      const link = document.createElement('a')
      link.href = merchant.qrCode
      link.download = `${merchant.storeName}_活动码.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      root.$message.success('二维码下载成功')
    }

    /**
     * 批量下载zip
     */
    const handleBatchDownloadZip = async () => {
      if (selectedMerchants.value.length === 0) {
        root.$message.warning('请先选择商户')
        return
      }

      try {
        downloadingZip.value = true

        const zip = new JSZip()

        // 遍历选中的商户，添加二维码到zip
        selectedMerchants.value.forEach(merchantId => {
          const merchant = merchants.value.find(m => m.merchantId === merchantId)
          if (merchant) {
            // 将base64图片添加到zip（去掉data:image/png;base64,前缀）
            const base64Data = merchant.qrCode.split(',')[1] || merchant.qrCode
            zip.file(`${merchant.storeName}_活动码.png`, base64Data, { base64: true })
          }
        })

        // 生成zip文件
        const blob = await zip.generateAsync({ type: 'blob' })

        // 触发下载
        const activityName = props.activity?.name || '活动'
        saveAs(blob, `${activityName}_活动码_${selectedMerchants.value.length}个.zip`)

        root.$message.success(`已打包下载 ${selectedMerchants.value.length} 个活动码`)
      } catch (error) {
        console.error('批量下载失败:', error)
        root.$message.error('批量下载失败，请重试')
      } finally {
        downloadingZip.value = false
      }
    }

    /**
     * 批量上传zip校验
     */
    const handleUploadZip = async (file: File) => {
      try {
        const zip = new JSZip()
        const content = await zip.loadAsync(file)

        const files = Object.keys(content.files)
        const errors: string[] = []
        let successCount = 0
        let failedCount = 0

        // 校验文件数量
        if (files.length !== merchants.value.length) {
          root.$message.warning(
            `文件数量不匹配：期望 ${merchants.value.length} 个，实际 ${files.length} 个`
          )
        }

        // 校验每个商户的文件是否存在
        merchants.value.forEach(merchant => {
          const expectedFileName = `${merchant.storeName}_活动码.png`
          const fileExists = files.some(f =>
            f === expectedFileName ||
            f.endsWith('.png') && f.includes(merchant.storeName) ||
            f.endsWith('.jpg') && f.includes(merchant.storeName)
          )

          if (fileExists) {
            successCount++
          } else {
            failedCount++
            errors.push(expectedFileName)
          }
        })

        // 显示校验结果
        const failedList = errors.slice(0, 5).join(', ')
        const moreText = errors.length > 5 ? ` 等${errors.length}个` : ''

        let contentHtml = `<p>上传成功 <strong>${successCount}</strong> 个，失败 <strong>${failedCount}</strong> 个</p>`
        if (failedCount > 0) {
          contentHtml += `
            <div style="margin-top: 12px;">
              <p style="color: #ef4444;">失败文件：</p>
              <p style="color: #666; line-height: 1.6;">${failedList}${moreText}</p>
            </div>
          `
        }

        root.$confirm({
          title: '校验结果',
          width: 500,
          content: (h) => h('div', { domProps: { innerHTML: contentHtml } }),
          okText: '确定',
          cancelButtonProps: { style: { display: 'none' } }
        })
      } catch (error) {
        console.error('解析zip文件失败:', error)
        root.$message.error('解析zip文件失败，请检查文件格式')
      }

      return false // 阻止自动上传
    }

    /**
     * 关闭弹窗
     */
    const handleClose = () => {
      emit('close')
    }

    // ==================== 监听器 ====================

    // 监听visible变化，加载数据
    watch(() => props.visible, (visible) => {
      if (visible && props.activity) {
        loadMerchantCodes()
        selectedMerchants.value = []
      }
    })

    // ==================== 返回暴露的属性和方法 ====================

    return {
      loading,
      downloadingZip,
      merchants,
      selectedMerchants,
      columns,
      allSelected,
      indeterminate,
      handleSelectAll,
      handleSelectMerchant,
      handleDownloadSingle,
      handleBatchDownloadZip,
      handleUploadZip,
      handleClose
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.batch-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: @bg-secondary;
  border-radius: @border-radius-base;
  margin-bottom: 16px;

  .action-btns {
    display: flex;
    gap: 12px;
  }
}

.table-container {
  border: 1px solid @border-primary;
  border-radius: @border-radius-base;
  overflow: hidden;

  :deep(.ant-table) {
    .ant-table-thead > tr > th {
      background: @bg-secondary;
      border-bottom: 1px solid @border-primary;
      color: @text-primary;
      font-weight: @font-weight-semibold;
      font-size: @font-size-sm;
      padding: 12px 16px;
    }

    .ant-table-tbody > tr {
      &:hover > td {
        background: @bg-hover;
      }

      > td {
        border-bottom: 1px solid @border-primary;
        padding: 12px 16px;
        font-size: @font-size-sm;
      }
    }
  }
}

.merchant-name {
  color: @text-primary;
  font-weight: @font-weight-medium;
}

.store-name {
  color: @text-secondary;
}

.qr-code-preview {
  display: flex;
  justify-content: center;
  align-items: center;

  .qr-image {
    width: 60px;
    height: 60px;
    border: 1px solid @border-primary;
    border-radius: @border-radius-sm;
    cursor: pointer;
    transition: @transition-base;

    &:hover {
      transform: scale(1.1);
      box-shadow: @shadow-md;
    }
  }
}
</style>
