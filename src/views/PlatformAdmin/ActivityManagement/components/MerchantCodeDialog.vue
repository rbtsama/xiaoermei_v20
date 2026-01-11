<template>
  <a-modal
    :visible="visible"
    title="活动码管理"
    width="560px"
    :footer="null"
    @cancel="handleClose"
  >
    <div class="code-management-content">
      <!-- 操作按钮区 -->
      <div class="actions">
        <!-- 下载商户活动追踪码 -->
        <div class="action-item">
          <a-button
            size="large"
            :loading="downloadingTracking"
            @click="handleDownloadTrackingCodes"
            class="action-btn"
          >
            <a-icon type="download" />
            下载商户活动追踪码.zip
          </a-button>
          <div class="action-hint">下载所有商户的活动推广二维码（zip压缩包）</div>
        </div>

        <!-- 上传商户活动海报 -->
        <div class="action-item">
          <a-upload
            :before-upload="handleUploadPosters"
            :show-upload-list="false"
            accept=".zip"
            class="upload-full-width"
          >
            <a-button size="large" class="action-btn">
              <a-icon type="upload" />
              上传商户活动海报.zip
            </a-button>
          </a-upload>
          <div class="action-hint">上传所有商户的活动海报图片（zip压缩包）并校验</div>
        </div>
      </div>

      <!-- 说明信息 -->
      <div class="info-section">
        <div class="info-title">文件要求</div>
        <div class="info-content">
          <p>• 追踪码文件名：商户名.png（如"原乡芦茨.png"）</p>
          <p>• 海报文件名：商户名.png 或 商户名.jpg（如"原乡芦茨.png"）</p>
          <p>• 单个文件大小不超过10MB</p>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'
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
    const downloadingTracking = ref(false)
    const merchants = ref<MerchantActivityCode[]>([])

    // ==================== 业务函数 ====================

    /**
     * 加载商户活动码列表
     */
    const loadMerchantCodes = async () => {
      if (!props.activity) return

      try {
        const codes = await ActivityService.getMerchantCodes(props.activity.id)
        merchants.value = codes
      } catch (error) {
        console.error('加载商户活动码失败:', error)
      }
    }

    /**
     * 下载商户活动追踪码.zip
     */
    const handleDownloadTrackingCodes = async () => {
      try {
        downloadingTracking.value = true

        const zip = new JSZip()

        // 为所有商户添加二维码到zip（文件名：商户名.png）
        merchants.value.forEach(merchant => {
          const base64Data = merchant.qrCode.split(',')[1] || merchant.qrCode
          zip.file(`${merchant.storeName}.png`, base64Data, { base64: true })
        })

        // 生成zip文件
        const blob = await zip.generateAsync({ type: 'blob' })

        // 触发下载
        saveAs(blob, '商户活动追踪码.zip')

        root.$message.success(`已打包下载 ${merchants.value.length} 个商户活动码`)
      } catch (error) {
        console.error('下载失败:', error)
        root.$message.error('下载失败，请重试')
      } finally {
        downloadingTracking.value = false
      }
    }

    /**
     * 上传商户活动海报.zip并校验
     */
    const handleUploadPosters = async (file: File) => {
      try {
        const zip = new JSZip()
        const content = await zip.loadAsync(file)

        const files = Object.keys(content.files)
        const errors: string[] = []
        let successCount = 0
        let failedCount = 0

        // 校验文件数量
        const expectedCount = merchants.value.length
        if (files.length !== expectedCount) {
          root.$message.warning(
            `文件数量不匹配：期望 ${expectedCount} 个，实际 ${files.length} 个`
          )
        }

        // 校验每个商户的海报文件是否存在（文件名：商户名.png或商户名.jpg）
        merchants.value.forEach(merchant => {
          const pngFileName = `${merchant.storeName}.png`
          const jpgFileName = `${merchant.storeName}.jpg`
          const jpegFileName = `${merchant.storeName}.jpeg`

          const fileExists = files.some(f =>
            f === pngFileName ||
            f === jpgFileName ||
            f === jpegFileName
          )

          if (fileExists) {
            successCount++
          } else {
            failedCount++
            errors.push(`${merchant.storeName}.png`)
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
      }
    })

    // ==================== 返回暴露的属性和方法 ====================

    return {
      downloadingTracking,
      handleDownloadTrackingCodes,
      handleUploadPosters,
      handleClose
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.code-management-content {
  padding: 8px 0;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;

  .action-item {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .upload-full-width {
      width: 100%;
      display: block;

      :deep(.ant-upload) {
        width: 100%;
        display: block;
      }
    }

    .action-btn {
      width: 100%;
      height: 44px;
      font-size: @font-size-base;
      font-weight: @font-weight-medium;
      border-radius: @border-radius-base;
      background: @bg-primary;
      border: 1px solid @border-primary;
      color: @text-primary;
      transition: @transition-base;

      &:hover {
        border-color: @brand-primary;
        color: @brand-primary;
      }
    }

    .action-hint {
      font-size: @font-size-xs;
      color: @text-secondary;
      padding-left: 4px;
    }
  }
}

.info-section {
  padding: 16px;
  background: @bg-secondary;
  border-radius: @border-radius-base;

  .info-title {
    font-size: @font-size-base;
    font-weight: @font-weight-semibold;
    color: @text-primary;
    margin-bottom: 12px;
  }

  .info-content {
    p {
      margin: 0;
      padding: 4px 0;
      font-size: @font-size-sm;
      color: @text-secondary;
      line-height: 1.6;

      &:first-child {
        padding-top: 0;
      }

      &:last-child {
        padding-bottom: 0;
      }
    }
  }
}
</style>
