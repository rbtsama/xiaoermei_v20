<template>
  <a-modal
    :visible="visible"
    title="活动码管理"
    width="560px"
    :footer="null"
    @cancel="handleClose"
  >
    <div class="code-management-content">
      <!-- 说明文字 -->
      <div class="description">
        <a-icon type="info-circle" class="info-icon" />
        <span class="info-text">本店活动追踪码用于推广活动，活动海报用于宣传展示</span>
      </div>

      <!-- 操作按钮区 -->
      <div class="actions">
        <!-- 下载本店活动追踪码 -->
        <div class="action-item">
          <a-button
            type="primary"
            size="large"
            :loading="downloadingTracking"
            @click="handleDownloadTrackingCode"
            class="action-btn"
          >
            <a-icon type="download" />
            下载本店活动追踪码
          </a-button>
          <div class="action-hint">下载本门店的专属活动推广二维码</div>
        </div>

        <!-- 上传本店活动海报 -->
        <div class="action-item">
          <a-upload
            :before-upload="handleUploadPoster"
            :show-upload-list="false"
            accept=".png,.jpg,.jpeg"
          >
            <a-button size="large" class="action-btn">
              <a-icon type="upload" />
              上传本店活动海报
            </a-button>
          </a-upload>
          <div class="action-hint">上传本门店的活动海报图片并校验（支持png、jpg格式）</div>
        </div>
      </div>

      <!-- 说明信息 -->
      <div class="info-section">
        <div class="info-title">文件要求</div>
        <div class="info-content">
          <p>• 追踪码：系统生成的专属二维码，客户扫码后可领取活动优惠券</p>
          <p>• 海报：支持png、jpg格式，建议尺寸800x1200px</p>
          <p>• 单个文件大小不超过10MB</p>
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
    const downloadingTracking = ref(false)
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
     * 下载本店活动追踪码
     */
    const handleDownloadTrackingCode = () => {
      downloadingTracking.value = true

      try {
        // TODO: 调用API获取当前商户的活动码
        const link = document.createElement('a')
        link.href = currentQRCode.value
        link.download = '本店活动追踪码.png'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        root.$message.success('活动码下载成功')
      } catch (error) {
        console.error('下载失败:', error)
        root.$message.error('下载失败，请重试')
      } finally {
        downloadingTracking.value = false
      }
    }

    /**
     * 上传本店活动海报并校验
     */
    const handleUploadPoster = async (file: File) => {
      try {
        const fileName = file.name
        const fileSize = file.size

        // 校验文件格式
        const validFormats = ['.png', '.jpg', '.jpeg']
        const isValidFormat = validFormats.some(format => fileName.toLowerCase().endsWith(format))

        if (!isValidFormat) {
          root.$message.error('文件格式不正确，仅支持png、jpg格式')
          return false
        }

        // 校验文件大小（最大10MB）
        const maxSize = 10 * 1024 * 1024
        if (fileSize > maxSize) {
          root.$message.error('文件大小不能超过10MB')
          return false
        }

        // 校验通过
        root.$message.success('海报上传成功，已校验通过')

        // TODO: 调用API上传文件
        console.log('上传海报:', fileName, fileSize)
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
      downloadingTracking,
      handleDownloadTrackingCode,
      handleUploadPoster,
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
  margin-bottom: 32px;

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
  gap: 24px;
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
