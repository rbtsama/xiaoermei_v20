<template>
  <a-modal
    :visible="visible"
    :title="`活动码管理 - ${activity ? activity.name : ''}`"
    width="600px"
    :footer="null"
    @cancel="handleClose"
  >
    <div class="code-management-content">
      <!-- 说明文字 -->
      <div class="description">
        <a-icon type="info-circle" class="info-icon" />
        <span class="info-text">商户活动码用于推广活动，客户扫码后可领取活动优惠券</span>
      </div>

      <!-- 操作按钮区 -->
      <div class="actions">
        <!-- 下载活动码 -->
        <div class="action-item">
          <a-button
            type="primary"
            size="large"
            :loading="downloading"
            @click="handleDownloadCode"
            class="action-btn"
          >
            <a-icon type="download" />
            下载本店活动码
          </a-button>
          <div class="action-hint">下载本门店的专属活动推广二维码</div>
        </div>

        <!-- 上传活动码 -->
        <div class="action-item">
          <a-upload
            :before-upload="handleUploadCode"
            :show-upload-list="false"
            accept=".zip,.png,.jpg"
          >
            <a-button size="large" class="action-btn">
              <a-icon type="upload" />
              上传自定义活动码
            </a-button>
          </a-upload>
          <div class="action-hint">上传zip压缩包或单个图片文件进行校验</div>
        </div>
      </div>

      <!-- 当前活动码预览 -->
      <div class="preview-section">
        <div class="preview-label">当前活动码预览</div>
        <div class="qr-code-wrapper">
          <img :src="currentQRCode" alt="活动码" class="qr-code-image" />
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'
import type { Activity } from '../../../PlatformAdmin/ActivityManagement/types/activity.types'

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
    const downloading = ref(false)
    const currentQRCode = ref('')

    // ==================== 业务函数 ====================

    /**
     * 生成当前商户的活动码
     */
    const generateQRCode = () => {
      // TODO: 调用API生成当前商户的活动码
      // 这里使用占位二维码图片
      currentQRCode.value = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
    }

    /**
     * 下载活动码
     */
    const handleDownloadCode = () => {
      downloading.value = true

      try {
        // TODO: 调用API获取当前商户的活动码
        // 这里模拟下载
        const link = document.createElement('a')
        link.href = currentQRCode.value
        link.download = `${props.activity?.name || '活动'}_推广码.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        root.$message.success('活动码下载成功')
      } catch (error) {
        console.error('下载失败:', error)
        root.$message.error('下载失败，请重试')
      } finally {
        downloading.value = false
      }
    }

    /**
     * 上传活动码校验
     */
    const handleUploadCode = async (file: File) => {
      try {
        const fileName = file.name
        const fileSize = file.size

        // 校验文件格式
        const validFormats = ['.zip', '.png', '.jpg', '.jpeg']
        const isValidFormat = validFormats.some(format => fileName.toLowerCase().endsWith(format))

        if (!isValidFormat) {
          root.$message.error('文件格式不正确，仅支持zip、png、jpg格式')
          return false
        }

        // 校验文件大小（最大10MB）
        const maxSize = 10 * 1024 * 1024
        if (fileSize > maxSize) {
          root.$message.error('文件大小不能超过10MB')
          return false
        }

        // 校验通过
        root.$message.success('文件校验通过')

        // TODO: 调用API上传文件
        console.log('上传文件:', fileName, fileSize)
      } catch (error) {
        console.error('文件校验失败:', error)
        root.$message.error('文件校验失败')
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

    // 监听visible变化，生成二维码
    watch(() => props.visible, (visible) => {
      if (visible && props.activity) {
        generateQRCode()
      }
    })

    // ==================== 返回暴露的属性和方法 ====================

    return {
      downloading,
      currentQRCode,
      handleDownloadCode,
      handleUploadCode,
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

.description {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #e6f4ff;
  border: 1px solid #91caff;
  border-radius: @border-radius-base;
  margin-bottom: 24px;

  .info-icon {
    color: #1677ff;
    font-size: @font-size-base;
  }

  .info-text {
    color: @text-primary;
    font-size: @font-size-sm;
    line-height: 1.6;
  }
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 32px;

  .action-item {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .action-btn {
      width: 100%;
      height: 44px;
      font-size: @font-size-base;
      font-weight: @font-weight-medium;
      border-radius: @border-radius-base;
    }

    .action-hint {
      font-size: @font-size-xs;
      color: @text-secondary;
      padding-left: 4px;
    }
  }
}

.preview-section {
  .preview-label {
    font-size: @font-size-base;
    font-weight: @font-weight-medium;
    color: @text-primary;
    margin-bottom: 12px;
  }

  .qr-code-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
    background: @bg-secondary;
    border: 1px solid @border-primary;
    border-radius: @border-radius-base;

    .qr-code-image {
      width: 200px;
      height: 200px;
      border: 1px solid @border-primary;
      border-radius: @border-radius-sm;
    }
  }
}
</style>
