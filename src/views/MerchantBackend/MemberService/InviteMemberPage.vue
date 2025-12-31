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
            <a-radio value="batch">批量邀请客户</a-radio>
            <a-radio value="single">单个邀请客户</a-radio>
            <a-radio value="qrcode">邀请客户扫码</a-radio>
          </a-radio-group>
        </div>

        <!-- 2. 会员等级设置 -->
        <div class="section">
          <label class="section-label">会员等级设置</label>
          <a-radio-group v-model="selectedVipLevel" class="vip-radio-group">
            <a-radio :value="0">
              <span class="vip-level-with-tip">
                注册会员
                <a-tooltip placement="top" overlayClassName="vip-tooltip">
                  <template slot="title">
                    <div class="vip-info-content">
                      <div class="info-row">
                        <span class="info-label">获得等级条件：</span>
                        <span class="info-value">注册即享</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">会员权益：</span>
                        <span class="info-value">-</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">等级有效期：</span>
                        <span class="info-value">-</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">保级规则：</span>
                        <span class="info-value">-</span>
                      </div>
                    </div>
                  </template>
                  <a-icon type="question-circle" class="vip-help-icon" />
                </a-tooltip>
              </span>
            </a-radio>
            <a-radio :value="1">
              <span class="vip-level-with-tip">
                VIP1
                <a-tooltip placement="top" overlayClassName="vip-tooltip">
                  <template slot="title">
                    <div class="vip-info-content">
                      <div class="info-row">
                        <span class="info-label">获得等级条件：</span>
                        <span class="info-value">预订1次及以上</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">会员权益：</span>
                        <span class="info-value">获得等返回可购送亲友*1，消费1元累计1里程值</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">等级有效期：</span>
                        <span class="info-value">2年</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">保级规则：</span>
                        <span class="info-value">预订1次及以上</span>
                      </div>
                    </div>
                  </template>
                  <a-icon type="question-circle" class="vip-help-icon" />
                </a-tooltip>
              </span>
            </a-radio>
            <a-radio :value="2">
              <span class="vip-level-with-tip">
                VIP2
                <a-tooltip placement="top" overlayClassName="vip-tooltip">
                  <template slot="title">
                    <div class="vip-info-content">
                      <div class="info-row">
                        <span class="info-label">获得等级条件：</span>
                        <span class="info-value">预订5次及以上</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">会员权益：</span>
                        <span class="info-value">获得等返回可购送亲友*2，消费1元累计1里程值</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">等级有效期：</span>
                        <span class="info-value">2年</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">保级规则：</span>
                        <span class="info-value">预订3次及以上</span>
                      </div>
                    </div>
                  </template>
                  <a-icon type="question-circle" class="vip-help-icon" />
                </a-tooltip>
              </span>
            </a-radio>
            <a-radio :value="3">
              <span class="vip-level-with-tip">
                VIP3
                <a-tooltip placement="top" overlayClassName="vip-tooltip">
                  <template slot="title">
                    <div class="vip-info-content">
                      <div class="info-row">
                        <span class="info-label">获得等级条件：</span>
                        <span class="info-value">预订10次及以上</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">会员权益：</span>
                        <span class="info-value">获得等返回可购送亲友*3，消费1元累计1里程值</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">等级有效期：</span>
                        <span class="info-value">2年</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">保级规则：</span>
                        <span class="info-value">预订6次及以上</span>
                      </div>
                    </div>
                  </template>
                  <a-icon type="question-circle" class="vip-help-icon" />
                </a-tooltip>
              </span>
            </a-radio>
          </a-radio-group>
        </div>

        <!-- 3. 内容区域（根据邀请方式显示不同内容） -->
        <div class="section">
          <!-- 批量邀请模式（Excel上传） -->
          <div v-if="inviteMode === 'batch'" class="batch-content">
            <label class="section-label">上传会员名单</label>
            <div class="upload-area">
              <a-upload
                :before-upload="handleBeforeUpload"
                :show-upload-list="false"
                accept=".xlsx,.xls"
              >
                <a-button size="large">
                  <a-icon type="upload" />
                  选择Excel文件
                </a-button>
              </a-upload>
              <a class="download-template" @click="handleDownloadTemplate">
                <a-icon type="download" />
                下载模板
              </a>
            </div>
            <div v-if="!uploadedFileName" class="upload-hint">
              请先上传Excel文件，或点击"下载模板"查看文件格式要求
            </div>
            <div v-if="uploadedFileName" class="upload-result">
              <a-icon type="file-excel" class="file-icon" />
              <span class="file-name">{{ uploadedFileName }}</span>
              <span class="file-count">（{{ uploadedCount }}条数据）</span>
            </div>
            <a-button
              type="primary"
              size="large"
              :loading="submitting"
              :disabled="!uploadedFileName"
              @click="handleBatchInvite"
              class="invite-btn"
            >
              <a-icon type="user-add" />
              批量邀请
            </a-button>
          </div>

          <!-- 单个邀请模式 -->
          <div v-else-if="inviteMode === 'single'" class="single-content">
            <div class="form-item">
              <label class="form-label">注册手机号 <span class="required">*</span></label>
              <a-input
                v-model="singleForm.phone"
                placeholder="请输入手机号"
                :maxLength="11"
              />
            </div>
            <div class="form-item">
              <label class="form-label">姓名（选填）</label>
              <a-input
                v-model="singleForm.name"
                placeholder="请输入姓名"
                :maxLength="20"
              />
            </div>
            <div class="form-item">
              <label class="form-label">性别（选填）</label>
              <a-select
                v-model="singleForm.gender"
                placeholder="请选择性别"
                style="width: 200px;"
                allowClear
              >
                <a-select-option value="男">男</a-select-option>
                <a-select-option value="女">女</a-select-option>
              </a-select>
            </div>
            <a-button
              type="primary"
              size="large"
              :loading="submitting"
              @click="handleSingleInvite"
              class="invite-btn"
            >
              <a-icon type="user-add" />
              发送邀请
            </a-button>
          </div>

          <!-- 客户扫码模式 -->
          <div v-else-if="inviteMode === 'qrcode'" class="qrcode-content">
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
    const inviteMode = ref('batch') // 'batch' | 'single' | 'qrcode'
    const selectedVipLevel = ref(0)
    const submitting = ref(false)

    // 批量邀请数据
    const uploadedFileName = ref('')
    const uploadedCount = ref(0)
    const uploadedData = ref([])

    // 单个邀请表单
    const singleForm = reactive({
      phone: '',
      name: '',
      gender: undefined
    })

    /**
     * 验证手机号格式
     * @param phone - 手机号字符串
     * @returns 是否合法
     */
    const validatePhone = (phone) => {
      const trimmed = phone.trim()
      // 11位数字，1开头
      return /^1[3-9]\d{9}$/.test(trimmed)
    }

    /**
     * 验证性别格式
     * @param gender - 性别字符串
     * @returns 验证后的值（男/女/undefined）
     */
    const validateGender = (gender) => {
      if (!gender || gender.trim() === '') return undefined
      const trimmed = gender.trim()
      if (trimmed === '男' || trimmed === '女') return trimmed
      return undefined // 不符合要求，当做空处理
    }

    /**
     * 下载Excel模板
     */
    const handleDownloadTemplate = () => {
      // 创建CSV模板
      const headers = ['注册手机号', '姓名（选填）', '性别（选填）']
      const example = ['13800138000', '张三', '男']
      const csvContent = '\uFEFF' + [headers.join(','), example.join(',')].join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = '会员邀请模板.csv'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    }

    /**
     * 处理Excel文件上传前
     */
    const handleBeforeUpload = (file) => {
      // TODO: 解析Excel文件
      // 这里使用模拟数据
      const reader = new FileReader()

      reader.onload = (e) => {
        // 模拟解析结果
        uploadedFileName.value = file.name
        uploadedCount.value = 10 // 模拟10条数据
        uploadedData.value = [] // TODO: 解析后的数据

        root.$message.success('文件上传成功，请点击批量邀请')
      }

      reader.readAsArrayBuffer(file)

      return false // 阻止自动上传
    }

    /**
     * 批量邀请会员（Excel）
     */
    const handleBatchInvite = async () => {
      if (!uploadedFileName.value) {
        root.$message.warning('请先上传Excel文件')
        return
      }

      // 二次确认弹窗
      root.$confirm({
        title: '确认批量邀请',
        content: `确定邀请 ${uploadedCount.value} 位会员，并设置等级为 ${selectedVipLevel.value === 0 ? '注册会员' : 'VIP' + selectedVipLevel.value} 吗？`,
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          try {
            submitting.value = true
            // TODO: 调用API批量邀请
            await new Promise(resolve => setTimeout(resolve, 1000))
            root.$message.success(`成功邀请 ${uploadedCount.value} 位会员`)
            // 清空
            uploadedFileName.value = ''
            uploadedCount.value = 0
            uploadedData.value = []
          } catch (error) {
            root.$message.error('邀请失败，请重试')
            console.error(error)
          } finally {
            submitting.value = false
          }
        }
      })
    }

    /**
     * 单个邀请会员
     */
    const handleSingleInvite = async () => {
      // 验证手机号
      if (!singleForm.phone) {
        root.$message.error('请输入手机号')
        return
      }
      if (!validatePhone(singleForm.phone)) {
        root.$message.error('手机号格式不正确')
        return
      }

      // 验证性别（如果填写了）
      const validGender = validateGender(singleForm.gender)

      try {
        submitting.value = true
        // TODO: 调用API单个邀请
        await new Promise(resolve => setTimeout(resolve, 500))
        const levelName = selectedVipLevel.value === 0 ? '注册会员' : 'VIP' + selectedVipLevel.value
        root.$message.success(`成功发送邀请给 ${singleForm.phone}，等级：${levelName}`)
        // 清空表单
        singleForm.phone = ''
        singleForm.name = ''
        singleForm.gender = undefined
      } catch (error) {
        root.$message.error('发送邀请失败')
        console.error(error)
      } finally {
        submitting.value = false
      }
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
      uploadedFileName.value = ''
      uploadedCount.value = 0
      uploadedData.value = []
      singleForm.phone = ''
      singleForm.name = ''
      singleForm.gender = undefined
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
      selectedVipLevel,
      submitting,
      uploadedFileName,
      uploadedCount,
      singleForm,
      handleDownloadTemplate,
      handleBeforeUpload,
      handleBatchInvite,
      handleSingleInvite,
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

  .vip-level-with-tip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;

    .vip-help-icon {
      font-size: 14px;
      color: @text-tertiary;
      cursor: help;
      transition: color 0.2s;

      &:hover {
        color: @brand-primary;
      }
    }
  }
}

.batch-content {
  .upload-area {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;

    .download-template {
      font-size: @font-size-sm;
      color: @text-tertiary;
      cursor: pointer;
      transition: color 0.2s;
      text-decoration: none;

      &:hover {
        color: @brand-primary;
        text-decoration: underline;
      }

      .anticon {
        margin-right: 4px;
      }
    }
  }

  .upload-hint {
    padding: 12px 16px;
    background: #fffbeb;
    border: 1px solid #fde68a;
    border-radius: @border-radius-base;
    font-size: @font-size-sm;
    color: #78350f;
    margin-bottom: 20px;
    line-height: 1.6;
  }

  .upload-result {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: @bg-secondary;
    border-radius: @border-radius-base;
    margin-bottom: 20px;

    .file-icon {
      font-size: 20px;
      color: @success-color;
    }

    .file-name {
      font-size: @font-size-base;
      color: @text-primary;
      font-weight: @font-weight-medium;
    }

    .file-count {
      font-size: @font-size-sm;
      color: @text-secondary;
    }
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

    &:disabled {
      box-shadow: none;
    }
  }
}

.single-content {
  .form-item {
    margin-bottom: 24px;

    .form-label {
      display: block;
      font-size: @font-size-base;
      font-weight: @font-weight-medium;
      color: @text-primary;
      margin-bottom: 8px;

      .required {
        color: @error-color;
        margin-left: 2px;
      }
    }
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

// VIP等级提示Tooltip样式（全局样式，与Tab3保持一致）
:global(.vip-tooltip) {
  max-width: 500px;

  :deep(.ant-tooltip-inner) {
    padding: 16px 20px;
    background: #ffffff;
    border: 1px solid @border-primary;
    box-shadow: @shadow-lg;
    color: @text-primary;
  }

  :deep(.ant-tooltip-arrow::before) {
    background: #ffffff;
    border: 1px solid @border-primary;
  }

  .vip-info-content {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .info-row {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      line-height: 1.5;

      .info-label {
        font-size: @font-size-sm;
        font-weight: @font-weight-semibold;
        color: @text-primary;
        white-space: nowrap;
        flex-shrink: 0;
      }

      .info-value {
        font-size: @font-size-sm;
        color: @text-primary;
        flex: 1;
      }
    }
  }
}
</style>
