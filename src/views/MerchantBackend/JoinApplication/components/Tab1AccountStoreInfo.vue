<template>
  <div class="tab1-container">
    <!-- 账号信息 -->
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <span class="section-title">账号信息</span>
      </template>

      <a-form-model
        :model="localData.accountInfo"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item label="主账号" required>
          <div class="readonly-input">
            <a-icon type="phone" class="prefix-icon" />
            <span class="readonly-value">{{ localData.accountInfo.mainAccount || '-' }}</span>
          </div>
          <div class="field-hint">系统分配的登录账号，无法修改</div>
        </a-form-model-item>

        <a-form-model-item label="预订电话" required>
          <a-input
            v-model="localData.accountInfo.bookingPhone"
            :placeholder="localData.accountInfo.mainAccount || '13575481983'"
            :disabled="isLocked"
            @change="handleChange"
            @blur="validatePhone('bookingPhone')"
          >
            <a-icon slot="prefix" type="phone" />
          </a-input>
          <div v-if="phoneErrors.bookingPhone" class="error-hint">{{ phoneErrors.bookingPhone }}</div>
          <div v-else class="field-hint">客人预订时的联系电话</div>
        </a-form-model-item>

        <a-form-model-item label="预订微信">
          <a-input
            v-model="localData.accountInfo.bookingWechat"
            placeholder="13575481983"
            :maxLength="50"
            :disabled="isLocked"
            @change="handleChange"
          >
            <a-icon slot="prefix" type="wechat" />
          </a-input>
          <div class="field-hint">客人预订时的微信号</div>
        </a-form-model-item>

        <a-form-model-item label="PMS房态管理系统">
          <a-radio-group
            v-model="localData.accountInfo.pmsSystem"
            :disabled="isLocked"
            @change="handleChange"
          >
            <a-radio value="订单来了">订单来了</a-radio>
            <a-radio value="其他">其他</a-radio>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item
          v-if="localData.accountInfo.pmsSystem === '订单来了'"
          label="订单来了门店编号"
        >
          <a-input
            v-model="localData.accountInfo.pmsStoreCode"
            placeholder="69808093"
            :maxLength="50"
            :disabled="isLocked"
            @change="handleChange"
          />
        </a-form-model-item>
      </a-form-model>
    </a-card>

    <!-- 门店基本信息 -->
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <span class="section-title">门店基本信息</span>
      </template>

      <a-form-model
        :model="localData.storeBasicInfo"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item label="门店名称" required>
          <a-input
            v-model="localData.storeBasicInfo.storeName"
            placeholder="原乡芦茨"
            :maxLength="50"
            :disabled="isLocked"
            @change="handleChange"
          />
          <div class="field-hint">门店对外展示的名称</div>
        </a-form-model-item>

        <a-form-model-item label="详细地址" required>
          <a-row :gutter="12">
            <a-col flex="30%">
              <a-cascader
                v-model="localData.storeBasicInfo.storeRegionArray"
                :options="regionOptions"
                placeholder="请选择省市区（县）"
                @change="handleRegionChange"
                style="width: 100%"
                :disabled="isLocked"
              />
            </a-col>
            <a-col flex="70%">
              <a-input
                v-model="localData.storeBasicInfo.storeAddress"
                placeholder="请填写街道、门牌号等详细地址"
                :maxLength="200"
                :disabled="isLocked"
                @change="handleChange"
              />
            </a-col>
          </a-row>
          <div class="field-hint">先选择省市区（县），再填写街道门牌号</div>
        </a-form-model-item>

        <a-form-model-item label="房间数量" required>
          <a-input-number
            v-model="localData.storeBasicInfo.roomCount"
            :min="1"
            :max="500"
            placeholder="21"
            style="width: 100%"
            :disabled="isLocked"
            @change="handleChange"
          />
          <div class="field-hint">门店客房总数，此数字会影响后续房型配置提示</div>
        </a-form-model-item>

        <a-form-model-item label="开业时间" required>
          <a-input
            v-model="localData.storeBasicInfo.openingYear"
            placeholder="2016"
            :maxLength="20"
            :disabled="isLocked"
            @change="handleChange"
          />
          <div class="field-hint">门店开业年份</div>
        </a-form-model-item>

        <a-form-model-item label="slogan或门店推荐语">
          <a-input
            v-model="localData.storeBasicInfo.slogan"
            placeholder="闭门深山，无计好眠。"
            :maxLength="50"
            :disabled="isLocked"
            @change="handleChange"
          />
          <div class="field-hint">一句话介绍门店特色</div>
        </a-form-model-item>

        <a-form-model-item label="门店介绍">
          <div class="textarea-container">
            <a-textarea
              v-model="localData.storeBasicInfo.storeDescription"
              placeholder="详细介绍门店位置、建筑特色、房型分布、配套设施、周边环境等。请分段描述，让客人全面了解您的门店。

示例：
XXXX位于富春江畔毗邻芦茨湾，几幢青瓦白墙小楼依次坐落在芦茨湾边上，推门望江水，开窗见青山。

目前分为4栋，分别为1号院、2号院、3号院、5号院，共计21间客房。大大落地窗，独户一露台，足不出户坐看闲云。

设有餐厅、咖啡馆、茶空间和猫猫杂货铺，暖身暖胃，食住无忧。"
              :rows="12"
              :disabled="isLocked"
              @change="handleChange"
              class="description-textarea"
            />
            <div class="char-count">
              已输入 {{ descriptionLength }} 字
            </div>
          </div>
        </a-form-model-item>
      </a-form-model>
    </a-card>

    <!-- 门店亮点 -->
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <span class="section-title">门店亮点（至少选择3项）<span class="required">*</span></span>
      </template>

      <!-- 建筑与景观 -->
      <div class="highlight-category">
        <div class="category-title">建筑与景观</div>
        <a-checkbox-group v-model="localData.highlights" :disabled="isLocked" @change="handleChange" style="width: 100%">
          <a-row :gutter="[16, 12]">
            <a-col :span="6" v-for="item in HIGHLIGHTS_ARCHITECTURE" :key="item">
              <a-checkbox :value="item" class="grid-checkbox">
                {{ item }}
              </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </div>

      <!-- 服务与设施 -->
      <div class="highlight-category">
        <div class="category-title">服务与设施</div>
        <a-checkbox-group v-model="localData.highlights" :disabled="isLocked" @change="handleChange" style="width: 100%">
          <a-row :gutter="[16, 12]">
            <a-col :span="6" v-for="item in HIGHLIGHTS_SERVICES" :key="item">
              <a-checkbox :value="item" class="grid-checkbox">
                {{ item }}
              </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </div>
    </a-card>
  </div>
</template>

<script>
import { defineComponent, reactive, computed, watch, ref, onMounted, onBeforeUnmount } from '@vue/composition-api'
import { getCategoryOptions } from '@/api/optionsConfig'

export default defineComponent({
  name: 'Tab1AccountStoreInfo',
  props: {
    formData: {
      type: Object,
      required: true
    },
    isLocked: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    // 门店亮点选项（从API动态加载）
    const HIGHLIGHTS_ARCHITECTURE = ref([])
    const HIGHLIGHTS_SERVICES = ref([])

    // 省市区（县）数据（简化版，实际应使用完整的地区数据）
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
              { value: '余杭区', label: '余杭区' },
              { value: '富阳区', label: '富阳区' },
              { value: '临安区', label: '临安区' },
              { value: '桐庐县', label: '桐庐县' },
              { value: '淳安县', label: '淳安县' },
              { value: '建德市', label: '建德市' }
            ]
          },
          {
            value: '宁波市',
            label: '宁波市',
            children: [
              { value: '海曙区', label: '海曙区' },
              { value: '江北区', label: '江北区' },
              { value: '镇海区', label: '镇海区' },
              { value: '北仑区', label: '北仑区' }
            ]
          },
          {
            value: '温州市',
            label: '温州市',
            children: [
              { value: '鹿城区', label: '鹿城区' },
              { value: '龙湾区', label: '龙湾区' },
              { value: '瓯海区', label: '瓯海区' }
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
              { value: '玄武区', label: '玄武区' },
              { value: '建邺区', label: '建邺区' }
            ]
          },
          {
            value: '苏州市',
            label: '苏州市',
            children: [
              { value: '姑苏区', label: '姑苏区' },
              { value: '吴中区', label: '吴中区' },
              { value: '相城区', label: '相城区' }
            ]
          }
        ]
      },
      {
        value: '上海市',
        label: '上海市',
        children: [
          {
            value: '上海市',
            label: '上海市',
            children: [
              { value: '黄浦区', label: '黄浦区' },
              { value: '徐汇区', label: '徐汇区' },
              { value: '长宁区', label: '长宁区' },
              { value: '静安区', label: '静安区' },
              { value: '普陀区', label: '普陀区' },
              { value: '虹口区', label: '虹口区' },
              { value: '杨浦区', label: '杨浦区' }
            ]
          }
        ]
      }
    ])

    // 本地数据（用于双向绑定）
    const localData = reactive({
      accountInfo: { ...props.formData.accountInfo },
      storeBasicInfo: {
        ...props.formData.storeBasicInfo,
        storeRegionArray: props.formData.storeBasicInfo?.storeRegionArray || []
      },
      highlights: [...(props.formData.storeDisplay?.highlights || [])]
    })

    // 加载门店亮点选项
    const loadHighlightOptions = async () => {
      try {
        const arch = await getCategoryOptions('architecture')
        const serv = await getCategoryOptions('services')
        HIGHLIGHTS_ARCHITECTURE.value = arch.map(o => o.label)
        HIGHLIGHTS_SERVICES.value = serv.map(o => o.label)
      } catch (error) {
        console.error('加载门店亮点选项失败:', error)
      }
    }

    // 监听选项配置更新
    const handleOptionsUpdate = (event) => {
      const { category } = event.detail
      if (category === 'architecture' || category === 'services') {
        loadHighlightOptions()
      }
    }

    onMounted(() => {
      loadHighlightOptions()
      window.addEventListener('optionsConfigUpdated', handleOptionsUpdate)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('optionsConfigUpdated', handleOptionsUpdate)
    })

    // 手机号校验错误
    const phoneErrors = reactive({
      mainAccount: '',
      bookingPhone: ''
    })

    // 门店介绍字数统计
    const descriptionLength = computed(() => {
      return localData.storeBasicInfo.storeDescription?.length || 0
    })

    // 手机号校验
    const validatePhone = (field) => {
      const value = localData.accountInfo[field]
      if (!value) {
        phoneErrors[field] = ''
        return
      }
      if (!/^1[3-9]\d{9}$/.test(value)) {
        phoneErrors[field] = '请输入正确的11位手机号'
      } else {
        phoneErrors[field] = ''
      }
    }

    // 监听props变化
    watch(
      () => props.formData,
      (newData) => {
        localData.accountInfo = { ...newData.accountInfo }
        localData.storeBasicInfo = {
          ...newData.storeBasicInfo,
          storeRegionArray: newData.storeBasicInfo?.storeRegionArray || []
        }
        localData.highlights = [...(newData.storeDisplay?.highlights || [])]
      },
      { deep: true }
    )

    // 处理地区选择变化
    const handleRegionChange = (value) => {
      if (value && value.length === 3) {
        localData.storeBasicInfo.storeRegion = value.join('')
      } else {
        localData.storeBasicInfo.storeRegion = ''
      }
      handleChange()
    }

    // 处理数据变化
    const handleChange = () => {
      emit('update', {
        accountInfo: localData.accountInfo,
        storeBasicInfo: localData.storeBasicInfo,
        storeDisplay: {
          ...props.formData.storeDisplay,
          highlights: localData.highlights
        }
      })
    }

    return {
      localData,
      phoneErrors,
      descriptionLength,
      validatePhone,
      handleChange,
      handleRegionChange,
      regionOptions,
      HIGHLIGHTS_ARCHITECTURE,
      HIGHLIGHTS_SERVICES
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.tab1-container {
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

.field-hint {
  font-size: @font-size-xs;
  color: @text-secondary;
  margin-top: 4px;
  line-height: 1.4;
}

.error-hint {
  font-size: @font-size-xs;
  color: @error-color;
  margin-top: 4px;
  line-height: 1.4;
}

.textarea-container {
  position: relative;
}

.description-textarea {
  :deep(textarea) {
    font-size: @font-size-sm;
    line-height: 1.8;
    resize: vertical;
    border-radius: @border-radius-base;

    &::placeholder {
      color: @text-tertiary;
      line-height: 1.8;
    }
  }
}

.char-count {
  text-align: right;
  font-size: @font-size-xs;
  color: @text-secondary;
  margin-top: 8px;

  &.warning {
    color: @error-color;
  }

  .hint-text {
    color: @warning-color;
    margin-left: 8px;
  }
}

:deep(.ant-form-item) {
  margin-bottom: 24px;
}

:deep(.ant-form-item-label) {
  font-weight: 400;           // 正常字重，不加粗
  color: rgba(0,0,0,0.9);    // 黑色
  text-align: left;

  &> label::after {
    content: '';
  }
}

:deep(.ant-input),
:deep(.ant-input-number) {
  border-radius: @border-radius-base;
  border-color: @border-primary;

  &:hover {
    border-color: @brand-primary-hover;
  }

  &:focus {
    border-color: @brand-primary;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }

  // 禁用状态不置灰，保持可读性
  &:disabled,
  &[disabled] {
    color: rgba(0,0,0,0.9);
    background-color: @bg-primary;
    cursor: not-allowed;
    opacity: 1;
  }
}

:deep(.ant-input-number) {
  width: 100%;
}

:deep(.ant-input-affix-wrapper) {
  border-radius: @border-radius-base;

  &:hover {
    border-color: @brand-primary-hover;
  }

  &:focus,
  &-focused {
    border-color: @brand-primary;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
}

// 只读文本输入框样式
.readonly-input {
  display: flex;
  align-items: center;
  padding: 4px 11px;
  border: 1px solid @border-primary;
  border-radius: @border-radius-base;
  background: @bg-secondary;
  min-height: 32px;

  .prefix-icon {
    color: @text-secondary;
    margin-right: 8px;
    font-size: @font-size-base;
  }

  .readonly-value {
    color: @text-primary;
    font-size: @font-size-base;
    flex: 1;
  }
}

// 门店亮点样式
.highlight-category {
  margin-top: 24px;  // 分类之间增加间距

  &:first-child {
    margin-top: 0;
  }

  .category-title {
    font-size: @font-size-base;
    font-weight: @font-weight-semibold;
    color: @text-primary;
    margin-bottom: 16px;
  }
}

// 使用Row/Col布局的checkbox样式
:deep(.grid-checkbox) {
  margin: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding: 10px 12px;
  border: 1px solid @border-primary;
  border-radius: @border-radius-base;
  background: @bg-primary;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  width: 100%;
  font-size: @font-size-sm;
  color: @text-primary;

  &:hover {
    border-color: @brand-primary;
    background: rgba(59, 130, 246, 0.05);
  }

  &.ant-checkbox-wrapper-checked {
    border-color: @brand-primary;
    background: rgba(59, 130, 246, 0.08);
  }

  .ant-checkbox {
    top: 0;
  }
}

.warning-text {
  color: @error-color;
  font-weight: @font-weight-semibold;
}

.required {
  color: @error-color;
  margin-left: 2px;
}
</style>
