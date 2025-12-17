<template>
  <div class="tab6-container">
      <!-- 营业主体信息 -->
      <a-card :bordered="false" class="form-section-card">
        <template slot="title">
          <span class="section-title">营业主体信息</span>
        </template>

        <a-form-model
          :model="companyData"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }"
        >
          <!-- 主体类型 -->
          <a-form-model-item label="主体类型" required>
            <a-radio-group v-model="localData.entityType" @change="handleEntityTypeChange">
              <a-radio :value="EntityType.COMPANY">有限责任公司</a-radio>
              <a-radio :value="EntityType.INDIVIDUAL">个体工商户</a-radio>
            </a-radio-group>
          </a-form-model-item>

          <!-- 注册账号类型选择 -->
          <a-form-model-item label="注册账号类型" required>
            <a-radio-group v-model="companyData.registerAccountType" @change="handleChange">
              <a-radio value="phone">手机号</a-radio>
              <a-radio value="email">邮箱</a-radio>
            </a-radio-group>
          </a-form-model-item>

          <a-form-model-item label="注册账号" required>
            <a-input
              v-model="companyData.registerAccount"
              :placeholder="companyData.registerAccountType === 'phone' ? '请输入商户手机号（请留意接收后续信息，包括签约地址和账户初始密码）' : '请输入商户邮箱（请留意接收后续信息，包括签约地址和账户初始密码）'"
              @change="handleChange"
            />
            <div class="field-hint">请留意接收后续信息，包括签约地址和账户初始密码</div>
          </a-form-model-item>

          <a-form-model-item label="营业主体" required>
            <a-input
              v-model="companyData.companyName"
              placeholder="营业执照上的公司名称"
              @change="handleChange"
            />
            <div class="field-hint">营业执照上的公司名称</div>
          </a-form-model-item>

          <a-form-model-item label="统一社会信用代码" required>
            <a-input
              v-model="companyData.creditCode"
              placeholder="示例：91330108MAEN56Q88T"
              :maxLength="18"
              @change="handleChange"
            />
            <div class="field-hint">营业执照上的统一社会信用代码</div>
          </a-form-model-item>

          <a-form-model-item label="营业执照有效期" required>
            <a-radio-group v-model="companyData.licenseValidityType" @change="handleChange">
              <a-radio :value="LicenseValidityType.DATE">日期选择</a-radio>
              <a-radio :value="LicenseValidityType.PERMANENT">永久有效</a-radio>
            </a-radio-group>
            <a-date-picker
              v-if="companyData.licenseValidityType === LicenseValidityType.DATE"
              v-model="licenseDateValue"
              placeholder="选择有效期"
              style="width: 100%; margin-top: 8px"
              @change="handleLicenseDateChange"
            />
          </a-form-model-item>

          <a-form-model-item label="营业执照照片" required>
            <div class="field-hint">请保持营业照片的主体和门店主体一致。照片需要面清晰，文字可辨认。</div>
            <image-upload
              v-model="companyData.businessLicensePhoto"
              :multiple="false"
              :maxSize="10"
              compact
              @change="handleChange"
            />
          </a-form-model-item>
        </a-form-model>
      </a-card>

      <!-- 法人身份证 -->
      <a-card :bordered="false" class="form-section-card">
        <template slot="title">
          <span class="section-title">法人身份证</span>
        </template>

        <a-form-model
          :model="companyData"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-form-model-item label="姓名" required>
            <a-input
              v-model="companyData.legalPersonName"
              @change="handleChange"
            />
          </a-form-model-item>

          <a-form-model-item label="身份证号" required>
            <a-input
              v-model="companyData.legalPersonIdCard"
              placeholder="请输入18位身份证号"
              :maxLength="18"
              @change="handleChange"
            />
          </a-form-model-item>

          <a-form-model-item label="居住地址" required>
            <a-input
              v-model="companyData.legalPersonAddress"
              @change="handleChange"
            />
          </a-form-model-item>

          <a-form-model-item label="身份证有效期" required>
            <a-radio-group v-model="companyData.legalPersonIdValidityType" @change="handleChange">
              <a-radio :value="LicenseValidityType.DATE">日期选择</a-radio>
              <a-radio :value="LicenseValidityType.PERMANENT">永久有效</a-radio>
            </a-radio-group>
            <a-date-picker
              v-if="companyData.legalPersonIdValidityType === LicenseValidityType.DATE"
              v-model="idCardDateValue"
              placeholder="选择有效期"
              style="width: 100%; margin-top: 8px"
              @change="handleIdCardDateChange"
            />
          </a-form-model-item>

          <a-form-model-item label="法人身份证照片" required>
            <div class="id-card-uploads">
              <div class="upload-item">
                <div class="upload-label">正面照</div>
                <div class="upload-hint">请上传最新有效身份证件，身份证请勿遮挡，保持俯视90度拍摄，照片需要画面清晰，文字可辨认。</div>
                <image-upload
                  v-model="companyData.legalPersonIdPhotoFront"
                  :multiple="false"
                  :maxSize="10"
                  compact
                  @change="handleChange"
                />
              </div>
              <div class="upload-item">
                <div class="upload-label">国徽面照</div>
                <div class="upload-hint">请上传最新有效身份证件，身份证请勿遮挡，保持俯视90度拍摄，照片需要画面清晰，文字可辨认。</div>
                <image-upload
                  v-model="companyData.legalPersonIdPhotoBack"
                  :multiple="false"
                  :maxSize="10"
                  compact
                  @change="handleChange"
                />
              </div>
            </div>
          </a-form-model-item>
        </a-form-model>
      </a-card>

      <!-- 门店地址 -->
      <a-card :bordered="false" class="form-section-card">
        <template slot="title">
          <span class="section-title">门店地址</span>
        </template>

        <a-form-model
          :model="companyData"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-form-model-item label="门店所在地区" required>
            <a-cascader
              v-model="companyData.storeRegionArray"
              :options="regionOptions"
              placeholder="请选择省市区"
              @change="handleRegionChange"
              style="width: 100%"
            />
            <div class="field-hint">请选择门店所在的省市区</div>
          </a-form-model-item>

          <a-form-model-item label="门店详细地址" required>
            <a-input
              v-model="companyData.storeDetailAddress"
              placeholder="示例：富春江镇芦茨村芦茨乡芦茨"
              @change="handleChange"
            />
          </a-form-model-item>
        </a-form-model>
      </a-card>

      <!-- 结算信息 -->
      <a-card :bordered="false" class="form-section-card">
        <template slot="title">
          <span class="section-title">结算信息</span>
        </template>

        <a-form-model
          :model="companyData"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-form-model-item label="账户名称" required>
            <a-input
              v-model="companyData.accountName"
              @change="handleChange"
            />
            <div class="field-hint">结算账户的名称</div>
          </a-form-model-item>

          <!-- 有限责任公司：对公账户银行账号 -->
          <a-form-model-item v-if="localData.entityType === EntityType.COMPANY" label="对公账户银行账号" required>
            <a-input
              v-model="companyData.bankAccountNumber"
              @change="handleChange"
            />
            <div class="field-hint">公司对公银行账号</div>
          </a-form-model-item>

          <!-- 个体工商户：银行账号 -->
          <a-form-model-item v-else label="银行账号" required>
            <a-input
              v-model="companyData.personalBankAccountNumber"
              @change="handleChange"
            />
            <div class="field-hint">个人银行账号</div>
          </a-form-model-item>

          <a-form-model-item label="开户银行" required>
            <a-input
              v-model="companyData.openingBank"
              @change="handleChange"
            />
            <div class="field-hint">开户银行名称</div>
          </a-form-model-item>

          <a-form-model-item label="开户地" required>
            <a-input
              v-model="companyData.openingLocation"
              @change="handleChange"
            />
            <div class="field-hint">银行开户的城市</div>
          </a-form-model-item>

          <a-form-model-item label="开户银行全称" required>
            <a-input
              v-model="companyData.openingBankFullName"
              placeholder="需要精确到支行（例：杭州银行股份有限公司西溪支行）"
              @change="handleChange"
            />
            <div class="field-hint">需要精确到支行</div>
          </a-form-model-item>

          <!-- 有限责任公司：开户证明 -->
          <a-form-model-item v-if="localData.entityType === EntityType.COMPANY" label="开户证明" required>
            <div class="upload-hint-text">
              有效凭证包括（任选其中一种即可）：
              1.开户许可证；2.银行回执；3.银行打印纸质结算账户（盖章）；4.基本存款账户信息单；5.汇款凭证
            </div>
            <image-upload
              v-model="companyData.openingProof"
              :multiple="false"
              :maxSize="10"
              compact
              @change="handleChange"
            />
          </a-form-model-item>

          <!-- 个体工商户：法人银行卡照片 -->
          <a-form-model-item v-else label="法人银行卡照片" required>
            <image-upload
              v-model="companyData.legalPersonBankCardPhoto"
              :multiple="false"
              :maxSize="10"
              compact
              @change="handleChange"
            />
          </a-form-model-item>

          <a-form-model-item label="商户名称" required>
            <a-input
              v-model="companyData.merchantName"
              placeholder="该名称将用于支付完成页面向用户展示，建议和品牌名称一致。"
              @change="handleChange"
            />
            <div class="field-hint">用于支付完成页面向用户展示，建议和品牌名称一致</div>
          </a-form-model-item>

          <a-form-model-item label="账户简称" required>
            <a-input
              v-model="companyData.merchantShortName"
              placeholder="用于后台查看和管理账户"
              @change="handleChange"
            />
            <div class="field-hint">用于后台查看和管理账户</div>
          </a-form-model-item>
        </a-form-model>
      </a-card>

      <!-- 联系人信息 -->
      <a-card :bordered="false" class="form-section-card">
        <template slot="title">
          <span class="section-title">联系人信息（不需要法人，门店任一人都可以）</span>
        </template>

        <a-form-model
          :model="companyData"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-form-model-item label="联系人姓名" required>
            <a-input
              v-model="companyData.contactName"
              @change="handleChange"
            />
            <div class="field-hint">联系人的真实姓名</div>
          </a-form-model-item>

          <a-form-model-item label="联系人身份证号码" required>
            <a-input
              v-model="companyData.contactIdCard"
              placeholder="请输入18位身份证号"
              :maxLength="18"
              @change="handleChange"
            />
            <div class="field-hint">联系人的18位身份证号码</div>
          </a-form-model-item>

          <a-form-model-item label="联系人手机号码" required>
            <a-input
              v-model="companyData.contactPhone"
              placeholder="请输入11位手机号"
              :maxLength="11"
              @change="handleChange"
            />
            <div class="field-hint">联系人的11位手机号码</div>
          </a-form-model-item>

          <a-form-model-item label="联系人常用邮箱" required>
            <a-input
              v-model="companyData.contactEmail"
              type="email"
              @change="handleChange"
            />
            <div class="field-hint">联系人的常用邮箱地址</div>
          </a-form-model-item>
        </a-form-model>
      </a-card>

      <!-- 照片上传 -->
      <a-card :bordered="false" class="form-section-card">
        <template slot="title">
          <span class="section-title">相关照片</span>
        </template>

        <div class="photos-grid">
          <!-- 门店门头 -->
          <div class="photo-upload-item">
            <div class="upload-label">
              <span class="label-text">门店门头 <span class="required">*</span></span>
            </div>
            <p class="upload-hint">实体经营场所正面（含门店招牌和周围环境）近期实景</p>
            <image-upload
              v-model="companyData.storeDoorPhoto"
              :multiple="false"
              :maxSize="10"
              compact
              @change="handleChange"
            />
          </div>

          <!-- 前台照片 -->
          <div class="photo-upload-item">
            <div class="upload-label">
              <span class="label-text">前台照片 <span class="required">*</span></span>
            </div>
            <p class="upload-hint">前台照片</p>
            <image-upload
              v-model="companyData.storeFrontDeskPhoto"
              :multiple="false"
              :maxSize="10"
              compact
              @change="handleChange"
            />
          </div>

          <!-- 店铺内景 -->
          <div class="photo-upload-item">
            <div class="upload-label">
              <span class="label-text">店铺内景 <span class="required">*</span></span>
            </div>
            <p class="upload-hint">店铺内景照片</p>
            <image-upload
              v-model="companyData.storeInteriorPhoto"
              :multiple="false"
              :maxSize="10"
              compact
              @change="handleChange"
            />
          </div>
        </div>
      </a-card>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watch } from '@vue/composition-api'
import moment from 'moment'
import ImageUpload from '@/components/StoreDeployment/ImageUpload.vue'
import {
  EntityType,
  LicenseValidityType
} from '@/types/storeDeployment'

export default defineComponent({
  name: 'Tab6PaymentSettlement',
  components: {
    ImageUpload
  },
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    // 本地数据
    const localData = reactive({
      entityType: props.formData.paymentSettlement?.entityType || EntityType.COMPANY
    })

    // 有限责任公司数据
    const companyData = reactive({
      registerAccountType: 'phone', // 注册账号类型：phone或email
      registerAccount: '',
      companyName: '',
      creditCode: '',
      licenseValidityType: LicenseValidityType.DATE,
      licenseValidityDate: '',
      legalPersonName: '',
      legalPersonIdCard: '',
      legalPersonAddress: '',
      legalPersonIdValidityType: LicenseValidityType.DATE,
      legalPersonIdValidityDate: '',
      storeRegionArray: [], // 省市区数组
      storeRegion: '', // 省市区字符串
      storeDetailAddress: '',
      accountName: '',
      bankAccountNumber: '',              // 对公账户银行账号（有限责任公司）
      personalBankAccountNumber: '',      // 银行账号（个体工商户）
      openingBank: '',
      openingLocation: '',
      openingBankFullName: '',
      openingProof: '',                   // 开户证明（有限责任公司）
      legalPersonBankCardPhoto: '',       // 法人银行卡照片（个体工商户）
      merchantName: '',
      merchantShortName: '',
      contactName: '',
      contactIdCard: '',
      contactPhone: '',
      contactEmail: '',
      businessLicensePhoto: '', // 营业执照照片
      legalPersonIdPhotoFront: '', // 法人身份证正面照
      legalPersonIdPhotoBack: '', // 法人身份证国徽面照
      storeDoorPhoto: '',
      storeFrontDeskPhoto: '',
      storeInteriorPhoto: ''
    })

    // 省市区数据（简化版，实际应使用完整的地区数据）
    const regionOptions = ref([
      {
        value: '浙江省',
        label: '浙江省',
        children: [
          {
            value: '杭州市',
            label: '杭州市',
            children: [
              { value: '西湖区', label: '西湖区' },
              { value: '滨江区', label: '滨江区' },
              { value: '余杭区', label: '余杭区' }
            ]
          },
          {
            value: '宁波市',
            label: '宁波市',
            children: [
              { value: '海曙区', label: '海曙区' },
              { value: '江北区', label: '江北区' }
            ]
          }
        ]
      },
      {
        value: '江苏省',
        label: '江苏省',
        children: [
          {
            value: '南京市',
            label: '南京市',
            children: [
              { value: '鼓楼区', label: '鼓楼区' },
              { value: '玄武区', label: '玄武区' }
            ]
          }
        ]
      }
    ])

    // 日期选择器的值
    const licenseDateValue = ref(null)
    const idCardDateValue = ref(null)

    // 主体类型切换
    const handleEntityTypeChange = () => {
      handleChange()
    }

    // 日期变更
    const handleLicenseDateChange = (date) => {
      companyData.licenseValidityDate = date ? date.format('YYYY-MM-DD') : ''
      handleChange()
    }

    const handleIdCardDateChange = (date) => {
      companyData.legalPersonIdValidityDate = date ? date.format('YYYY-MM-DD') : ''
      handleChange()
    }

    // 处理地区选择变化
    const handleRegionChange = (value) => {
      if (value && value.length === 3) {
        companyData.storeRegion = value.join('')
      } else {
        companyData.storeRegion = ''
      }
      handleChange()
    }

    // 处理数据变化
    const handleChange = () => {
      emit('update', {
        paymentSettlement: {
          entityType: localData.entityType,
          companyInfo: companyData
        }
      })
    }

    return {
      localData,
      companyData,
      licenseDateValue,
      idCardDateValue,
      regionOptions,
      EntityType,
      LicenseValidityType,
      handleEntityTypeChange,
      handleLicenseDateChange,
      handleIdCardDateChange,
      handleRegionChange,
      handleChange
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.tab6-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-section-card {
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;

  :deep(.ant-card-head) {
    border-bottom: 1px solid @border-primary;
    padding: 16px 24px;
  }

  :deep(.ant-card-body) {
    padding: 32px 24px;
  }
}

.section-title {
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

.entity-type-group {
  display: flex;
  gap: 32px;

  .radio-label {
    font-size: @font-size-base;
    font-weight: @font-weight-medium;
  }
}

.field-hint {
  font-size: @font-size-xs;
  color: @text-secondary;
  margin-top: 4px;
}

.upload-hint-text {
  font-size: @font-size-sm;
  color: @text-secondary;
  line-height: 1.8;
  margin-bottom: 12px;
  padding: 12px;
  background: @bg-secondary;
  border-radius: @border-radius-base;
  border-left: 3px solid @brand-primary;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.photo-upload-item {
  // 照片上传项容器
}

.upload-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.label-text {
  font-size: @font-size-base;
  font-weight: @font-weight-medium;
  color: @text-primary;
}

.upload-hint {
  font-size: @font-size-sm;
  color: @text-secondary;
  margin-bottom: 12px;
  line-height: 1.6;
}

:deep(.ant-form-item) {
  margin-bottom: 24px;
}

:deep(.ant-form-item-label) {
  font-weight: @font-weight-medium;
  color: @text-primary;

  label::after {
    content: '';
  }
}

.required {
  color: @error-color;
  margin-left: 2px;
}

.id-card-uploads {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  .upload-item {
    .upload-label {
      font-size: @font-size-sm;
      font-weight: @font-weight-medium;
      color: @text-primary;
      margin-bottom: 8px;
    }

    .upload-hint {
      font-size: @font-size-xs;
      color: @text-secondary;
      margin-bottom: 12px;
      line-height: 1.6;
    }
  }
}
</style>
