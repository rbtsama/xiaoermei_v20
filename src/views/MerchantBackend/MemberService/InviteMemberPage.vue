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
            <a-radio :value="0">注册会员</a-radio>
            <a-radio :value="1">VIP1</a-radio>
            <a-radio :value="2">VIP2</a-radio>
            <a-radio :value="3">VIP3</a-radio>
          </a-radio-group>

          <!-- VIP等级规则表格 -->
          <div class="vip-rules-table">
            <table>
              <thead>
                <tr>
                  <th>会员等级</th>
                  <th>获得等级条件</th>
                  <th>会员权益</th>
                  <th>等级有效期</th>
                  <th>保级规则</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="level-name">注册会员</td>
                  <td>注册即享</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td class="level-name">VIP1</td>
                  <td>预订1次及以上</td>
                  <td>获得等返回可购送亲友*1，消费1元累计1里程值</td>
                  <td>2年</td>
                  <td>预订1次及以上</td>
                </tr>
                <tr>
                  <td class="level-name">VIP2</td>
                  <td>预订5次及以上</td>
                  <td>获得等返回可购送亲友*2，消费1元累计1里程值</td>
                  <td>2年</td>
                  <td>预订3次及以上</td>
                </tr>
                <tr>
                  <td class="level-name">VIP3</td>
                  <td>预订10次及以上</td>
                  <td>获得等返回可购送亲友*3，消费1元累计1里程值</td>
                  <td>2年</td>
                  <td>预订6次及以上</td>
                </tr>
              </tbody>
            </table>
          </div>
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
                  上传邀请清单
                </a-button>
              </a-upload>
              <a class="download-template" @click="handleDownloadTemplate">
                <a-icon type="download" />
                下载模板
              </a>
            </div>
            <div v-if="!uploadedFileName" class="upload-requirement">
              <div class="requirement-item">• 客户姓名：非必填</div>
              <div class="requirement-item">• 客户手机号：必填，11位数字</div>
              <div class="requirement-item">• 性别：非必填，男/女</div>
              <div class="requirement-item">• 生日：非必填，格式 年/月/日（如"1997/09/07"）</div>
              <div class="requirement-item">• 省、市、区：非必填，分开填写，导入后合并为一个字段</div>
              <div class="requirement-item">• 邮箱：非必填，最长30位</div>
              <div class="requirement-item">• 会员等级：必填，格式为VIP1至VIP10</div>
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
              <label class="form-label">客户手机号 <span class="required">*</span></label>
              <a-input
                v-model="singleForm.phone"
                placeholder="请输入11位手机号"
                :maxLength="11"
              />
            </div>
            <div class="form-item">
              <label class="form-label">客户姓名</label>
              <a-input
                v-model="singleForm.name"
                placeholder="请输入姓名"
                :maxLength="50"
              />
            </div>
            <div class="form-item">
              <label class="form-label">性别</label>
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
            <div class="form-item">
              <label class="form-label">生日</label>
              <a-input
                v-model="singleForm.birthday"
                placeholder="格式：年/月/日（如1997/09/07）"
                :maxLength="10"
              />
            </div>
            <div class="form-item">
              <label class="form-label">地址</label>
              <div class="address-inputs">
                <a-input
                  v-model="singleForm.province"
                  placeholder="省"
                  :maxLength="20"
                  style="width: 120px;"
                />
                <a-input
                  v-model="singleForm.city"
                  placeholder="市"
                  :maxLength="20"
                  style="width: 120px;"
                />
                <a-input
                  v-model="singleForm.district"
                  placeholder="区"
                  :maxLength="20"
                  style="width: 120px;"
                />
              </div>
            </div>
            <div class="form-item">
              <label class="form-label">邮箱</label>
              <a-input
                v-model="singleForm.email"
                placeholder="请输入邮箱（最长30位）"
                :maxLength="30"
              />
            </div>
            <div class="form-item">
              <label class="form-label">会员等级 <span class="required">*</span></label>
              <a-select
                v-model="singleForm.vipLevel"
                placeholder="请选择会员等级"
                style="width: 200px;"
              >
                <a-select-option value="VIP1">VIP1</a-select-option>
                <a-select-option value="VIP2">VIP2</a-select-option>
                <a-select-option value="VIP3">VIP3</a-select-option>
                <a-select-option value="VIP4">VIP4</a-select-option>
                <a-select-option value="VIP5">VIP5</a-select-option>
                <a-select-option value="VIP6">VIP6</a-select-option>
                <a-select-option value="VIP7">VIP7</a-select-option>
                <a-select-option value="VIP8">VIP8</a-select-option>
                <a-select-option value="VIP9">VIP9</a-select-option>
                <a-select-option value="VIP10">VIP10</a-select-option>
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

    <!-- 导入结果弹窗 -->
    <import-result-dialog
      :visible.sync="resultDialogVisible"
      :success-count="importResult.successCount"
      :failed-count="importResult.failedCount"
      @close="handleResultDialogClose"
    />
  </sidebar>
</template>

<script>
import { defineComponent, ref, reactive } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import ImportResultDialog from './ImportResultDialog.vue'
import { batchInviteMembers } from '@/api/memberService'
import * as XLSX from 'xlsx'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'InviteMemberPage',
  components: {
    Sidebar,
    ImportResultDialog
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
      gender: undefined,
      birthday: undefined,
      province: '',
      city: '',
      district: '',
      email: '',
      vipLevel: 'VIP1'
    })

    // 导入结果弹窗
    const resultDialogVisible = ref(false)
    const importResult = reactive({
      successCount: 0,
      failedCount: 0
    })

    /**
     * 验证手机号格式
     * @param phone - 手机号字符串
     * @returns 是否合法
     */
    const validatePhone = (phone) => {
      if (!phone) return false
      const trimmed = String(phone).trim()
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
     * 验证生日格式
     * @param birthday - 生日字符串（年/月/日 如 1997/09/07）
     * @returns { valid: boolean, formatted?: string, error?: string }
     */
    const validateBirthday = (birthday) => {
      if (!birthday || String(birthday).trim() === '') {
        return { valid: true, formatted: undefined }
      }

      const trimmed = String(birthday).trim()

      // 尝试多种格式解析
      const formats = ['YYYY/MM/DD', 'YYYY/M/D', 'YYYY-MM-DD', 'YYYY-M-D']
      let parsed = null

      for (const format of formats) {
        parsed = dayjs(trimmed, format, true)
        if (parsed.isValid()) break
      }

      if (!parsed || !parsed.isValid()) {
        return { valid: false, error: '生日格式不正确，应为：年/月/日（如1997/09/07）' }
      }

      // 检查日期合理性
      const year = parsed.year()
      const currentYear = dayjs().year()
      if (year < 1900 || year > currentYear) {
        return { valid: false, error: '生日年份不合理' }
      }

      return { valid: true, formatted: parsed.format('YYYY/MM/DD') }
    }

    /**
     * 验证邮箱格式
     * @param email - 邮箱字符串
     * @returns { valid: boolean, error?: string }
     */
    const validateEmail = (email) => {
      if (!email || String(email).trim() === '') {
        return { valid: true }
      }

      const trimmed = String(email).trim()

      if (trimmed.length > 30) {
        return { valid: false, error: '邮箱长度不能超过30位' }
      }

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (!emailRegex.test(trimmed)) {
        return { valid: false, error: '邮箱格式不正确' }
      }

      return { valid: true }
    }

    /**
     * 验证会员等级格式
     * @param vipLevel - 会员等级字符串
     * @returns { valid: boolean, level?: number, error?: string }
     */
    const validateVipLevel = (vipLevel) => {
      if (!vipLevel || String(vipLevel).trim() === '') {
        return { valid: false, error: '会员等级为必填项' }
      }

      const trimmed = String(vipLevel).trim().toUpperCase()
      const match = trimmed.match(/^VIP(\d+)$/)

      if (!match) {
        return { valid: false, error: '会员等级格式不正确，应为VIP1至VIP10' }
      }

      const level = parseInt(match[1])
      if (level < 1 || level > 10) {
        return { valid: false, error: '会员等级应为VIP1至VIP10' }
      }

      return { valid: true, level }
    }

    /**
     * 下载Excel模板
     */
    const handleDownloadTemplate = () => {
      // 直接下载根目录的导入客户模板.xlsx文件
      const link = document.createElement('a')
      link.href = '/导入客户模板.xlsx'
      link.download = '导入客户模板.xlsx'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    /**
     * 处理Excel文件上传前
     */
    const handleBeforeUpload = (file) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result)
          const workbook = XLSX.read(data, { type: 'array' })

          // 读取第一个sheet
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]

          // 转换为JSON（从第2行开始读取，第1行是标题）
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

          if (jsonData.length < 2) {
            root.$message.error('Excel文件中没有数据')
            return
          }

          // 解析数据（跳过第1行标题）
          const parsedData = []
          const errors = []

          for (let i = 1; i < jsonData.length; i++) {
            const row = jsonData[i]
            const rowNum = i + 1

            // 跳过空行
            if (!row || row.length === 0 || !row.some(cell => cell !== null && cell !== undefined && cell !== '')) {
              continue
            }

            const item = {
              name: row[0] ? String(row[0]).trim() : '',
              phone: row[1] ? String(row[1]).trim() : '',
              gender: row[2] ? String(row[2]).trim() : '',
              birthday: row[3] ? String(row[3]).trim() : '',
              province: row[4] ? String(row[4]).trim() : '',
              city: row[5] ? String(row[5]).trim() : '',
              district: row[6] ? String(row[6]).trim() : '',
              email: row[7] ? String(row[7]).trim() : '',
              vipLevel: row[8] ? String(row[8]).trim() : '',
              rowNum,
              errors: []
            }

            // 验证手机号（必填）
            if (!item.phone) {
              item.errors.push('手机号为必填项')
            } else if (!validatePhone(item.phone)) {
              item.errors.push('手机号格式不正确，应为11位数字')
            }

            // 验证性别（非必填）
            if (item.gender) {
              const validGender = validateGender(item.gender)
              if (!validGender) {
                item.errors.push('性别格式不正确，应为"男"或"女"')
              } else {
                item.gender = validGender
              }
            }

            // 验证生日（非必填）
            if (item.birthday) {
              const birthdayResult = validateBirthday(item.birthday)
              if (!birthdayResult.valid) {
                item.errors.push(birthdayResult.error)
              } else {
                item.birthday = birthdayResult.formatted
              }
            }

            // 验证邮箱（非必填）
            if (item.email) {
              const emailResult = validateEmail(item.email)
              if (!emailResult.valid) {
                item.errors.push(emailResult.error)
              }
            }

            // 验证会员等级（必填）
            const vipResult = validateVipLevel(item.vipLevel)
            if (!vipResult.valid) {
              item.errors.push(vipResult.error)
            } else {
              item.vipLevel = vipResult.level
            }

            parsedData.push(item)

            // 收集错误
            if (item.errors.length > 0) {
              errors.push(`第${rowNum}行: ${item.errors.join('; ')}`)
            }
          }

          if (parsedData.length === 0) {
            root.$message.error('Excel文件中没有有效数据')
            return
          }

          // 如果有错误，显示错误信息
          if (errors.length > 0) {
            const errorMsg = `发现 ${errors.length} 条数据格式错误：\n${errors.slice(0, 5).join('\n')}${errors.length > 5 ? '\n...' : ''}`
            root.$message.error({
              content: errorMsg,
              duration: 8
            })
            return
          }

          // 成功
          uploadedFileName.value = file.name
          uploadedCount.value = parsedData.length
          uploadedData.value = parsedData

          root.$message.success(`文件解析成功，共 ${parsedData.length} 条数据`)
        } catch (error) {
          console.error('Excel解析失败:', error)
          root.$message.error('Excel文件解析失败，请检查文件格式')
        }
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
            // TODO: 调用API批量邀请，检测重复
            await new Promise(resolve => setTimeout(resolve, 1000))

            // 模拟API返回结果：部分成功，部分失败
            const mockFailedCount = 2
            const mockSuccessCount = uploadedCount.value - mockFailedCount

            // 设置结果并显示弹窗
            importResult.successCount = mockSuccessCount
            importResult.failedCount = mockFailedCount
            resultDialogVisible.value = true

            // 清空上传数据
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
      // 验证手机号（必填）
      if (!singleForm.phone) {
        root.$message.error('请输入手机号')
        return
      }
      if (!validatePhone(singleForm.phone)) {
        root.$message.error('手机号格式不正确，应为11位数字')
        return
      }

      // 验证性别（非必填）
      if (singleForm.gender) {
        const validGender = validateGender(singleForm.gender)
        if (!validGender) {
          root.$message.error('性别格式不正确，应为"男"或"女"')
          return
        }
      }

      // 验证生日（非必填）
      if (singleForm.birthday) {
        const birthdayResult = validateBirthday(singleForm.birthday)
        if (!birthdayResult.valid) {
          root.$message.error(birthdayResult.error)
          return
        }
      }

      // 验证邮箱（非必填）
      if (singleForm.email) {
        const emailResult = validateEmail(singleForm.email)
        if (!emailResult.valid) {
          root.$message.error(emailResult.error)
          return
        }
      }

      // 验证会员等级（必填）
      const vipResult = validateVipLevel(singleForm.vipLevel)
      if (!vipResult.valid) {
        root.$message.error(vipResult.error)
        return
      }

      try {
        submitting.value = true

        // 构建地址字段（省市区合并）
        const address = [singleForm.province, singleForm.city, singleForm.district]
          .filter(item => item)
          .join('')

        // TODO: 调用API单个邀请，检测重复
        const inviteData = {
          name: singleForm.name,
          phone: singleForm.phone,
          gender: singleForm.gender,
          birthday: singleForm.birthday,
          address,
          email: singleForm.email,
          vipLevel: vipResult.level
        }

        console.log('单个邀请数据:', inviteData)

        await new Promise(resolve => setTimeout(resolve, 500))

        // 模拟API返回结果：随机成功或失败
        const isAlreadyImported = Math.random() > 0.7 // 30%概率已被导入

        if (isAlreadyImported) {
          // 失败：已被其他商户导入
          importResult.successCount = 0
          importResult.failedCount = 1
        } else {
          // 成功
          importResult.successCount = 1
          importResult.failedCount = 0
        }

        // 显示结果弹窗
        resultDialogVisible.value = true

        // 清空表单
        singleForm.phone = ''
        singleForm.name = ''
        singleForm.gender = undefined
        singleForm.birthday = undefined
        singleForm.province = ''
        singleForm.city = ''
        singleForm.district = ''
        singleForm.email = ''
        singleForm.vipLevel = 'VIP1'
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
      singleForm.birthday = undefined
      singleForm.province = ''
      singleForm.city = ''
      singleForm.district = ''
      singleForm.email = ''
      singleForm.vipLevel = 'VIP1'
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

    /**
     * 关闭结果弹窗
     */
    const handleResultDialogClose = () => {
      resultDialogVisible.value = false
    }

    return {
      inviteMode,
      selectedVipLevel,
      submitting,
      uploadedFileName,
      uploadedCount,
      singleForm,
      resultDialogVisible,
      importResult,
      handleDownloadTemplate,
      handleBeforeUpload,
      handleBatchInvite,
      handleSingleInvite,
      handleGoToRecords,
      handleGoToCommission,
      handleModeChange,
      handleDownloadQRCode,
      handleResultDialogClose
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
  justify-content: space-between;
  margin-bottom: 24px;

  .page-title {
    font-size: @font-size-2xl;
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
  margin-bottom: 20px;

  :deep(.ant-radio-wrapper) {
    font-size: @font-size-base;
    color: @text-primary;
  }
}

.vip-rules-table {
  margin-top: 16px;
  border-radius: @border-radius-base;
  border: 1px solid @border-primary;
  overflow: hidden;

  table {
    width: 100%;
    border-collapse: collapse;

    thead {
      background: @bg-secondary;

      tr {
        th {
          padding: 12px 16px;
          text-align: left;
          font-size: @font-size-base;
          font-weight: @font-weight-semibold;
          color: @text-primary;
          border-bottom: 1px solid @border-primary;

          &:first-child {
            width: 120px;
          }

          &:nth-child(2) {
            width: 150px;
          }

          &:nth-child(3) {
            min-width: 280px;
          }

          &:nth-child(4) {
            width: 100px;
          }

          &:nth-child(5) {
            width: 150px;
          }
        }
      }
    }

    tbody {
      tr {
        transition: background 0.2s;

        &:hover {
          background: @bg-hover;
        }

        &:not(:last-child) {
          td {
            border-bottom: 1px solid @border-primary;
          }
        }

        td {
          padding: 12px 16px;
          font-size: @font-size-sm;
          color: @text-primary;
          line-height: 1.6;

          &.level-name {
            font-weight: @font-weight-medium;
            color: @brand-primary;
          }
        }
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
      color: @brand-primary;
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;

      &:hover {
        color: @brand-primary-hover;
        text-decoration: underline;
      }

      .anticon {
        margin-right: 4px;
      }
    }
  }

  .upload-requirement {
    margin-bottom: 20px;
    padding: 12px 0;

    .requirement-item {
      font-size: @font-size-sm;
      color: @text-secondary;
      line-height: 1.8;
      margin-bottom: 4px;

      &:last-child {
        margin-bottom: 0;
      }
    }
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
      font-size: @font-size-xl;
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

  .address-inputs {
    display: flex;
    gap: 12px;
    align-items: center;
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
        font-size: @font-size-4xl;
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
