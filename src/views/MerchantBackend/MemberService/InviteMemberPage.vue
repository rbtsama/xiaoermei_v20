<template>
  <sidebar>
    <div class="page-container">
      <!-- 页面标题和操作按钮 -->
      <div class="page-header">
        <h1 class="page-title">邀请会员</h1>
        <div class="header-actions">
          <a-button @click="handleGoToRecords" class="action-btn">
            <a-icon type="unordered-list" />
            邀请记录
          </a-button>
          <a-button @click="handleGoToCommission" class="action-btn">
            <a-icon type="dollar" />
            分销奖励
          </a-button>
        </div>
      </div>

      <!-- 主内容区域 -->
      <a-card :bordered="false" class="main-card">
        <!-- 1. 邀请方式选择 -->
        <div class="section">
          <label class="section-label">邀请方式</label>
          <a-radio-group v-model="inviteMode" class="mode-radio-group" @change="handleModeChange">
            <a-radio value="batch">会员预注册批量导入</a-radio>
            <a-radio value="qrcode">扫码邀请</a-radio>
          </a-radio-group>
        </div>

        <!-- 2. 会员等级设置 -->
        <div class="section">
          <label class="section-label">会员等级设置</label>
          <a-radio-group v-model="selectedVipLevel" class="vip-radio-group">
            <a-radio :value="0">VIP0</a-radio>
            <a-radio :value="1">VIP1</a-radio>
            <a-radio :value="2">VIP2</a-radio>
            <a-radio :value="3">VIP3</a-radio>
          </a-radio-group>
        </div>

        <!-- 3. 内容区域（根据邀请方式显示不同内容） -->
        <div class="section">
          <!-- 批量导入模式 -->
          <div v-if="inviteMode === 'batch'" class="batch-content">
            <label class="section-label">手机号列表</label>
            <a-textarea
              v-model="phoneText"
              :rows="12"
              placeholder="每行输入一个受邀手机号"
              class="phone-textarea"
            />
            <div class="input-hint">
              已输入 {{ phoneCount }} 个手机号
            </div>
            <a-button
              type="primary"
              size="large"
              :loading="submitting"
              @click="handleBatchInvite"
              class="invite-btn"
            >
              <a-icon type="user-add" />
              批量邀请
            </a-button>
          </div>

          <!-- 扫码邀请模式 -->
          <div v-else class="qrcode-content">
            <div class="qrcode-wrapper">
              <div class="qrcode-placeholder">
                <a-icon type="qrcode" class="qr-icon" />
                <p class="placeholder-text">邀请二维码</p>
              </div>
            </div>
            <p class="qrcode-text">扫码即可成为会员并享受折扣</p>
            <p class="qrcode-hint">会员可在平台享受专属优惠价格</p>
            <a-button
              type="primary"
              @click="handleDownloadQRCode"
              class="download-btn"
            >
              <a-icon type="download" />
              下载邀请二维码（3天有效）
            </a-button>
          </div>
        </div>
      </a-card>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, computed } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import { batchInviteMembers } from '@/api/memberService'

export default defineComponent({
  name: 'InviteMemberPage',
  components: {
    Sidebar
  },
  setup(props, { root }) {
    const inviteMode = ref('batch') // 'batch' | 'qrcode'
    const phoneText = ref('')
    const selectedVipLevel = ref(0)
    const submitting = ref(false)

    // 计算手机号数量
    const phoneCount = computed(() => {
      const phones = phoneText.value.trim().split('\n').filter(p => p.trim())
      return phones.length
    })

    /**
     * 验证手机号格式
     * @param phone - 手机号字符串
     * @returns 是否合法
     */
    const validatePhone = (phone) => {
      const trimmed = phone.trim()
      // 11位数字
      return /^1[3-9]\d{9}$/.test(trimmed)
    }

    /**
     * 批量邀请会员
     */
    const handleBatchInvite = async () => {
      // 解析手机号列表
      const lines = phoneText.value.trim().split('\n')
      const phones = []
      const errors = []

      lines.forEach((line, index) => {
        const phone = line.trim()
        if (!phone) return // 跳过空行

        if (!validatePhone(phone)) {
          errors.push(`第${index + 1}行手机号格式不正确`)
        } else {
          phones.push(phone)
        }
      })

      // 校验失败
      if (errors.length > 0) {
        root.$message.error(errors[0]) // 只显示第一个错误
        return
      }

      // 没有手机号
      if (phones.length === 0) {
        root.$message.warning('请输入至少一个手机号')
        return
      }

      // 二次确认弹窗
      root.$confirm({
        title: '确认批量邀请',
        content: `确定邀请 ${phones.length} 位会员，并赠与 VIP${selectedVipLevel.value} 吗？`,
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          try {
            submitting.value = true
            await batchInviteMembers(phones, selectedVipLevel.value)
            root.$message.success(`成功邀请 ${phones.length} 位会员`)
            // 清空输入
            phoneText.value = ''
            selectedVipLevel.value = 0
          } catch (error) {
            root.$message.error('邀请失败，请重试')
            console.error(error)
          } finally {
            submitting.value = false
          }
        }
      })
    }

    // 跳转到邀请记录页面
    const handleGoToRecords = () => {
      root.$router.push('/merchant-backend/invite-member/records')
    }

    // 跳转到分销奖励页面
    const handleGoToCommission = () => {
      root.$router.push('/merchant-backend/invite-member/commission')
    }

    // 切换邀请模式时清空输入
    const handleModeChange = () => {
      phoneText.value = ''
    }

    /**
     * 下载邀请二维码
     */
    const handleDownloadQRCode = () => {
      // TODO: 接入真实API获取二维码图片
      // 这里使用占位符下载示例
      root.$message.success('二维码下载成功（3天有效）')

      // 实际下载逻辑（后续替换真实图片）
      // const link = document.createElement('a')
      // link.href = '/images/invite-qrcode.png'
      // link.download = `邀请二维码_VIP${selectedVipLevel.value}.png`
      // document.body.appendChild(link)
      // link.click()
      // document.body.removeChild(link)
    }

    return {
      inviteMode,
      phoneText,
      selectedVipLevel,
      submitting,
      phoneCount,
      handleBatchInvite,
      handleGoToRecords,
      handleGoToCommission,
      handleModeChange,
      handleDownloadQRCode
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.page-container {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  .page-title {
    font-size: 24px;
    font-weight: @font-weight-semibold;
    color: @text-primary;
    margin: 0;
  }

  .header-actions {
    display: flex;
    gap: 12px;

    .action-btn {
      height: 36px;
      padding: 0 20px;
      font-size: @font-size-base;
      border-radius: @border-radius-base;
    }
  }
}

.main-card {
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;

  :deep(.ant-card-body) {
    padding: 32px;
  }
}

.section {
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }

  .section-label {
    display: block;
    font-size: @font-size-base;
    font-weight: @font-weight-semibold;
    color: @text-primary;
    margin-bottom: 16px;
  }
}

.mode-radio-group {
  display: flex;
  gap: 32px;

  :deep(.ant-radio-wrapper) {
    font-size: @font-size-base;
    color: @text-primary;
  }
}

.phone-textarea {
  font-family: @font-family;
  font-size: @font-size-base;
  line-height: 1.6;

  &::placeholder {
    color: @text-tertiary;
  }
}


.vip-radio-group {
  display: flex;
  gap: 24px;

  :deep(.ant-radio-wrapper) {
    font-size: @font-size-base;
    color: @text-primary;
  }
}

.batch-content {
  .phone-textarea {
    margin-bottom: 8px;
  }

  .input-hint {
    margin-bottom: 20px;
    font-size: @font-size-sm;
    color: @text-secondary;
  }

  .invite-btn {
    width: 100%;
    height: 44px;
    font-size: @font-size-base;
    font-weight: @font-weight-medium;
    border-radius: @border-radius-base;
    box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);

    &:hover {
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
    }
  }
}

.qrcode-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;

  .qrcode-wrapper {
    width: 240px;
    height: 240px;
    padding: 16px;
    background: @bg-secondary;
    border-radius: @border-radius-base;
    border: 1px solid @border-primary;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    .qrcode-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;

      .qr-icon {
        font-size: 80px;
        color: @text-tertiary;
        margin-bottom: 12px;
      }

      .placeholder-text {
        margin: 0;
        font-size: @font-size-sm;
        color: @text-secondary;
      }
    }

    .qrcode-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .qrcode-text {
    font-size: @font-size-lg;
    font-weight: @font-weight-medium;
    color: @text-primary;
    margin: 0 0 8px 0;
  }

  .qrcode-hint {
    font-size: @font-size-sm;
    color: @text-secondary;
    margin: 0 0 24px 0;
  }

  .download-btn {
    height: 40px;
    padding: 0 24px;
    font-size: @font-size-base;
    border-radius: @border-radius-base;
    box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);

    &:hover {
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
    }
  }
}
</style>
