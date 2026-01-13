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

        <!-- 2. 内容区域（根据邀请方式显示不同内容） -->
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
              </a-select>
            </div>

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
            <!-- 会员等级设置 -->
            <div class="qrcode-vip-level">
              <label class="section-label">会员等级设置</label>
              <a-radio-group v-model="selectedVipLevel" class="vip-radio-group">
                <a-radio :value="1">VIP1</a-radio>
                <a-radio :value="2">VIP2</a-radio>
                <a-radio :value="3">VIP3</a-radio>
              </a-radio-group>
            </div>

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

            <div class="qrcode-wrapper">
              <div class="qrcode-placeholder">
                <a-icon type="qrcode" class="qr-icon" />
                <p class="placeholder-text">邀请二维码</p>
              </div>
            </div>
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
import * as XLSX from 'xlsx'
import dayjs from 'dayjs'

/**
 * 常量定义
 */
// Excel文件列索引常量（从0开始）
const EXCEL_COLUMN = {
  NAME: 0,       // 客户姓名
  PHONE: 1,      // 客户手机号（必填）
  GENDER: 2,     // 性别
  BIRTHDAY: 3,   // 生日
  PROVINCE: 4,   // 省
  CITY: 5,       // 市
  DISTRICT: 6,   // 区
  EMAIL: 7,      // 邮箱
  VIP_LEVEL: 8   // 会员等级（必填）
}

// 验证规则常量
const VALIDATION = {
  PHONE_LENGTH: 11,           // 手机号长度
  EMAIL_MAX_LENGTH: 30,       // 邮箱最大长度
  BIRTH_YEAR_MIN: 1900,       // 生日最小年份
  VIP_LEVEL_MIN: 1,           // VIP等级最小值
  VIP_LEVEL_MAX: 10,          // VIP等级最大值
  ERROR_DISPLAY_LIMIT: 5      // 错误提示显示最大数量
}

// 默认值常量
const DEFAULT_VIP_LEVEL = 'VIP1'

export default defineComponent({
  name: 'InviteMemberPage',
  components: {
    Sidebar,
    ImportResultDialog
  },
  setup(props, { root }) {
    // ==================== 响应式数据 ====================

    // 邀请方式：batch批量邀请 | single单个邀请 | qrcode扫码邀请
    const inviteMode = ref('batch')

    // 选中的VIP等级：1-3=VIP1-VIP3（扫码模式使用）
    const selectedVipLevel = ref(1)

    // 提交中状态
    const submitting = ref(false)

    // 批量邀请数据
    const uploadedFileName = ref('')  // 上传的文件名
    const uploadedCount = ref(0)      // 上传的数据条数
    const uploadedData = ref([])      // 上传的数据内容

    // 单个邀请表单数据
    const singleForm = reactive({
      phone: '',                    // 手机号（必填）
      name: '',                     // 姓名
      gender: undefined,            // 性别：男/女
      birthday: undefined,          // 生日
      province: '',                 // 省
      city: '',                     // 市
      district: '',                 // 区
      email: '',                    // 邮箱
      vipLevel: DEFAULT_VIP_LEVEL   // 会员等级（必填）
    })

    // 导入结果弹窗数据
    const resultDialogVisible = ref(false)
    const importResult = reactive({
      successCount: 0,  // 成功数量
      failedCount: 0    // 失败数量
    })

    // ==================== 验证函数 ====================

    /**
     * 验证手机号格式
     * @param {string} phone - 手机号字符串
     * @returns {boolean} 是否合法
     * 规则：必须为11位数字，且以1开头，第二位为3-9
     */
    const validatePhone = (phone) => {
      if (!phone) return false
      const trimmed = String(phone).trim()
      // 中国大陆手机号格式：1开头，第二位3-9，共11位数字
      return /^1[3-9]\d{9}$/.test(trimmed)
    }

    /**
     * 验证性别格式
     * @param {string} gender - 性别字符串
     * @returns {string|undefined} 验证后的值（'男' | '女' | undefined）
     * 规则：只接受"男"或"女"，其他值视为无效返回undefined
     */
    const validateGender = (gender) => {
      if (!gender || gender.trim() === '') return undefined
      const trimmed = gender.trim()
      if (trimmed === '男' || trimmed === '女') return trimmed
      return undefined
    }

    /**
     * 验证生日格式
     * @param {string} birthday - 生日字符串
     * @returns {{valid: boolean, formatted?: string, error?: string}}
     * 规则：支持YYYY/MM/DD、YYYY-MM-DD等格式，年份范围1900-当前年
     */
    const validateBirthday = (birthday) => {
      if (!birthday || String(birthday).trim() === '') {
        return { valid: true, formatted: undefined }
      }

      const trimmed = String(birthday).trim()

      // 支持的日期格式
      const formats = ['YYYY/MM/DD', 'YYYY/M/D', 'YYYY-MM-DD', 'YYYY-M-D']
      let parsed = null

      // 尝试各种格式解析
      for (const format of formats) {
        parsed = dayjs(trimmed, format, true)
        if (parsed.isValid()) break
      }

      if (!parsed || !parsed.isValid()) {
        return { valid: false, error: '生日格式不正确，应为：年/月/日（如1997/09/07）' }
      }

      // 检查年份合理性
      const year = parsed.year()
      const currentYear = dayjs().year()
      if (year < VALIDATION.BIRTH_YEAR_MIN || year > currentYear) {
        return { valid: false, error: '生日年份不合理' }
      }

      return { valid: true, formatted: parsed.format('YYYY/MM/DD') }
    }

    /**
     * 验证邮箱格式
     * @param {string} email - 邮箱字符串
     * @returns {{valid: boolean, error?: string}}
     * 规则：标准邮箱格式，最大长度30位
     */
    const validateEmail = (email) => {
      if (!email || String(email).trim() === '') {
        return { valid: true }
      }

      const trimmed = String(email).trim()

      // 检查长度限制
      if (trimmed.length > VALIDATION.EMAIL_MAX_LENGTH) {
        return { valid: false, error: `邮箱长度不能超过${VALIDATION.EMAIL_MAX_LENGTH}位` }
      }

      // 标准邮箱格式验证
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (!emailRegex.test(trimmed)) {
        return { valid: false, error: '邮箱格式不正确' }
      }

      return { valid: true }
    }

    /**
     * 验证会员等级格式
     * @param {string} vipLevel - 会员等级字符串
     * @returns {{valid: boolean, level?: number, error?: string}}
     * 规则：必填，格式为VIP1至VIP10
     */
    const validateVipLevel = (vipLevel) => {
      if (!vipLevel || String(vipLevel).trim() === '') {
        return { valid: false, error: '会员等级为必填项' }
      }

      const trimmed = String(vipLevel).trim().toUpperCase()
      const match = trimmed.match(/^VIP(\d+)$/)

      if (!match) {
        return { valid: false, error: `会员等级格式不正确，应为VIP${VALIDATION.VIP_LEVEL_MIN}至VIP${VALIDATION.VIP_LEVEL_MAX}` }
      }

      const level = parseInt(match[1])
      if (level < VALIDATION.VIP_LEVEL_MIN || level > VALIDATION.VIP_LEVEL_MAX) {
        return { valid: false, error: `会员等级应为VIP${VALIDATION.VIP_LEVEL_MIN}至VIP${VALIDATION.VIP_LEVEL_MAX}` }
      }

      return { valid: true, level }
    }

    // ==================== 业务函数 ====================

    /**
     * 下载Excel模板
     * 触发浏览器下载public目录下的导入客户模板.xlsx文件
     */
    const handleDownloadTemplate = () => {
      const link = document.createElement('a')
      link.href = '/导入客户模板.xlsx'
      link.download = '导入客户模板.xlsx'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    /**
     * 处理Excel文件上传前的解析和验证
     * @param {File} file - 上传的Excel文件
     * @returns {boolean} false - 阻止自动上传
     *
     * 功能说明：
     * 1. 使用FileReader读取Excel文件
     * 2. 使用xlsx库解析文件内容
     * 3. 逐行验证数据格式
     * 4. 如有错误则提示，无错误则存储解析结果
     */
    const handleBeforeUpload = (file) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        try {
          // 读取Excel文件数据
          const data = new Uint8Array(e.target.result)
          const workbook = XLSX.read(data, { type: 'array' })

          // 获取第一个工作表
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]

          // 将工作表转换为JSON数组（包含标题行）
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

          // 检查是否有数据（至少需要标题行+数据行）
          if (jsonData.length < 2) {
            root.$message.error('Excel文件中没有数据')
            return
          }

          // 解析数据
          const parsedData = []
          const errors = []

          // 遍历数据行（跳过第一行标题）
          for (let i = 1; i < jsonData.length; i++) {
            const row = jsonData[i]
            const rowNum = i + 1 // Excel中的实际行号

            // 跳过完全空白的行
            if (!row || row.length === 0 || !row.some(cell => cell !== null && cell !== undefined && cell !== '')) {
              continue
            }

            // 构建数据项（使用常量定义的列索引）
            const item = {
              name: row[EXCEL_COLUMN.NAME] ? String(row[EXCEL_COLUMN.NAME]).trim() : '',
              phone: row[EXCEL_COLUMN.PHONE] ? String(row[EXCEL_COLUMN.PHONE]).trim() : '',
              gender: row[EXCEL_COLUMN.GENDER] ? String(row[EXCEL_COLUMN.GENDER]).trim() : '',
              birthday: row[EXCEL_COLUMN.BIRTHDAY] ? String(row[EXCEL_COLUMN.BIRTHDAY]).trim() : '',
              province: row[EXCEL_COLUMN.PROVINCE] ? String(row[EXCEL_COLUMN.PROVINCE]).trim() : '',
              city: row[EXCEL_COLUMN.CITY] ? String(row[EXCEL_COLUMN.CITY]).trim() : '',
              district: row[EXCEL_COLUMN.DISTRICT] ? String(row[EXCEL_COLUMN.DISTRICT]).trim() : '',
              email: row[EXCEL_COLUMN.EMAIL] ? String(row[EXCEL_COLUMN.EMAIL]).trim() : '',
              vipLevel: row[EXCEL_COLUMN.VIP_LEVEL] ? String(row[EXCEL_COLUMN.VIP_LEVEL]).trim() : '',
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

          // 如果有错误，显示错误信息（最多显示前N条）
          if (errors.length > 0) {
            const displayErrors = errors.slice(0, VALIDATION.ERROR_DISPLAY_LIMIT)
            const hasMore = errors.length > VALIDATION.ERROR_DISPLAY_LIMIT
            const errorMsg = `发现 ${errors.length} 条数据格式错误：\n${displayErrors.join('\n')}${hasMore ? '\n...' : ''}`

            root.$message.error({
              content: errorMsg,
              duration: 8
            })
            return
          }

          // 解析成功，保存数据
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
     * 获取VIP等级显示名称
     * @param {number} level - VIP等级数字 (0=注册会员, 1-10=VIP1-VIP10)
     * @returns {string} 显示名称
     */
    const getVipLevelName = (level) => {
      return `VIP${level}`
    }

    /**
     * 批量邀请会员（Excel）
     * 功能：
     * 1. 检查是否已上传文件
     * 2. 二次确认邀请操作
     * 3. 调用API执行批量邀请
     * 4. 显示结果弹窗
     * 5. 清空上传数据
     */
    const handleBatchInvite = async () => {
      if (!uploadedFileName.value) {
        root.$message.warning('请先上传Excel文件')
        return
      }

      // 二次确认弹窗
      root.$confirm({
        title: \'确认批量邀请\',
        content: `确定邀请 ${uploadedCount.value} 位会员吗？`,
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          try {
            submitting.value = true

            // TODO: 调用真实API进行批量邀请
            // const result = await batchInviteMembers({
            //   members: uploadedData.value,
            //   vipLevel: selectedVipLevel.value
            // })

            // 模拟API调用延迟
            await new Promise(resolve => setTimeout(resolve, 1000))

            // 模拟API返回结果（实际开发中应使用真实API返回的数据）
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
            console.error('批量邀请失败:', error)
          } finally {
            submitting.value = false
          }
        }
      })
    }

    /**
     * 重置单个邀请表单
     */
    const resetSingleForm = () => {
      singleForm.phone = ''
      singleForm.name = ''
      singleForm.gender = undefined
      singleForm.birthday = undefined
      singleForm.province = ''
      singleForm.city = ''
      singleForm.district = ''
      singleForm.email = ''
      singleForm.vipLevel = DEFAULT_VIP_LEVEL
    }

    /**
     * 单个邀请会员
     * 功能：
     * 1. 验证所有表单字段
     * 2. 调用API发送邀请
     * 3. 显示结果弹窗
     * 4. 清空表单
     */
    const handleSingleInvite = async () => {
      // 验证手机号（必填）
      if (!singleForm.phone) {
        root.$message.error('请输入手机号')
        return
      }
      if (!validatePhone(singleForm.phone)) {
        root.$message.error(`手机号格式不正确，应为${VALIDATION.PHONE_LENGTH}位数字`)
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

        // 构建地址字段（省市区合并，过滤空值）
        const address = [singleForm.province, singleForm.city, singleForm.district]
          .filter(item => item)
          .join('')

        // 构建邀请数据
        const inviteData = {
          name: singleForm.name,
          phone: singleForm.phone,
          gender: singleForm.gender,
          birthday: singleForm.birthday,
          address,
          email: singleForm.email,
          vipLevel: vipResult.level
        }

        // TODO: 调用真实API进行单个邀请
        // const result = await inviteSingleMember(inviteData)

        console.log('单个邀请数据:', inviteData)

        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 500))

        // 模拟API返回结果（实际开发中应使用真实API返回的数据）
        // 30%概率模拟客户已被其他商户导入的情况
        const isAlreadyImported = Math.random() > 0.7

        if (isAlreadyImported) {
          importResult.successCount = 0
          importResult.failedCount = 1
        } else {
          importResult.successCount = 1
          importResult.failedCount = 0
        }

        // 显示结果弹窗
        resultDialogVisible.value = true

        // 清空表单
        resetSingleForm()
      } catch (error) {
        root.$message.error('发送邀请失败')
        console.error('单个邀请失败:', error)
      } finally {
        submitting.value = false
      }
    }

    // ==================== 路由跳转函数 ====================

    /**
     * 跳转到邀请记录页面
     */
    const handleGoToRecords = () => {
      root.$router.push('/merchant-backend/invite-member/records')
    }

    /**
     * 跳转到分销奖励页面
     */
    const handleGoToCommission = () => {
      root.$router.push('/merchant-backend/invite-member/commission')
    }

    // ==================== 其他处理函数 ====================

    /**
     * 切换邀请模式时清空所有输入数据
     */
    const handleModeChange = () => {
      // 清空批量邀请数据
      uploadedFileName.value = ''
      uploadedCount.value = 0
      uploadedData.value = []

      // 清空单个邀请表单
      resetSingleForm()
    }

    /**
     * 下载邀请二维码
     * TODO: 接入真实API获取二维码图片
     */
    const handleDownloadQRCode = () => {
      root.$message.success('二维码下载成功（3天有效）')

      // TODO: 实现真实的二维码下载逻辑
      // const link = document.createElement('a')
      // link.href = `/api/invite-qrcode?vipLevel=${selectedVipLevel.value}`
      // link.download = `邀请二维码_${getVipLevelName(selectedVipLevel.value)}.png`
      // document.body.appendChild(link)
      // link.click()
      // document.body.removeChild(link)
    }

    /**
     * 关闭导入结果弹窗
     */
    const handleResultDialogClose = () => {
      resultDialogVisible.value = false
    }

    // ==================== 返回暴露的属性和方法 ====================

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
  margin-bottom: 24px;
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

          L0px;
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

    &:hover:not(:disabled) {
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
    }

    &:disabled {
      background: #f0f0f0 !important;
      border-color: #d9d9d9 !important;
      color: rgba(0, 0, 0, 0.25) !important;
      box-shadow: none !important;
      cursor: not-allowed;
      opacity: 1;
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

    &:hover:not(:disabled) {
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
    }

    &:disabled {
      background: #f0f0f0 !important;
      border-color: #d9d9d9 !important;
      color: rgba(0, 0, 0, 0.25) !important;
      box-shadow: none !important;
      cursor: not-allowed;
      opacity: 1;
    }
  }
}

.qrcode-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px 0;


  .qrcode-vip-level {
    width: 100%;
    margin-bottom: 32px;

    .section-label {
      display: block;
      font-size: @font-size-base;
      font-weight: @font-weight-semibold;
      color: @text-primary;
      margin-bottom: 16px;
      text-align: left;
    }


  .vip-rules-table {
    width: 100%;
    max-width: 1000px;
  }

    .vip-radio-group {
      justify-content: flex-start;
    }
  }

  .qrcode-wrapper {
    width: 180px;
    height: 180px;
    padding: 16px;
    background: @bg-secondary;
    border-radius: @border-radius-base;
    border: 1px solid @border-primary;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    align-self: center;

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
